import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import FormPeserta from '../components/FormPeserta'
import { JUMLAH_INTERVAL, DETIK_PER_INTERVAL, angkaAcak, kunciPauli, hitungPauli, ringkasanPauli } from '../kemampuan/pauli'

const SOAL_LATIHAN = 10
const DURASI_MS = JUMLAH_INTERVAL * DETIK_PER_INTERVAL * 1000

const intervalKosong = () => Array.from({ length: JUMLAH_INTERVAL }, () => ({ jumlah: 0, benar: 0, salah: 0 }))

function Pasangan({ atas, bawah }) {
  const kotak = { fontSize: 'clamp(56px, 16vw, 88px)', fontWeight: 800, lineHeight: 1.1, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '12px 40px', borderRadius: '20px', background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
      <span style={kotak}>{atas}</span>
      <span style={{ width: '64px', height: '3px', background: 'var(--border)', borderRadius: '99px', margin: '4px 0' }} />
      <span style={kotak}>{bawah}</span>
    </div>
  )
}

function TombolJawab({ onJawab, disabled }) {
  const gaya = { flex: 1, padding: '22px 12px', fontSize: '20px', fontWeight: 800, borderRadius: '16px', border: '2px solid var(--accent-border)', background: 'var(--surface)', color: 'var(--text)', cursor: 'pointer', touchAction: 'manipulation', userSelect: 'none' }
  return (
    <div style={{ display: 'flex', gap: '12px', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
      <button type="button" disabled={disabled} style={gaya} onClick={() => onJawab('ganjil')}>GANJIL</button>
      <button type="button" disabled={disabled} style={gaya} onClick={() => onJawab('genap')}>GENAP</button>
    </div>
  )
}

/** Tombol keyboard: ← / A / 1 = ganjil, → / L / 2 = genap. */
function useKeyboard(aktif, onJawab) {
  useEffect(() => {
    if (!aktif) return
    const tekan = e => {
      if (e.repeat) return
      const k = e.key.toLowerCase()
      if (k === 'arrowleft' || k === 'a' || k === '1') { e.preventDefault(); onJawab('ganjil') }
      if (k === 'arrowright' || k === 'l' || k === '2') { e.preventDefault(); onJawab('genap') }
    }
    window.addEventListener('keydown', tekan)
    return () => window.removeEventListener('keydown', tekan)
  }, [aktif, onJawab])
}

export default function TesPauli() {
  const navigate = useNavigate()
  const [step, setStep]       = useState('form')
  const [peserta, setPeserta] = useState(null)
  const [pasangan, setPasangan] = useState(() => [angkaAcak(), angkaAcak()])

  // Latihan
  const [latihanKe, setLatihanKe] = useState(0)
  const [umpan, setUmpan]         = useState(null)

  // Tes
  const mulaiRef    = useRef(0)
  const intervalRef = useRef(intervalKosong())
  const selesaiRef  = useRef(false)
  const [sisaMs, setSisaMs]       = useState(DURASI_MS)
  const [jumlahKerja, setJumlahKerja] = useState(0)
  const [menyimpan, setMenyimpan] = useState(false)

  const lanjutPasangan = () => setPasangan(([, bawah]) => [bawah, angkaAcak()])

  const jawabLatihan = useCallback(pilihan => {
    const [a, b] = pasangan
    const kunci = kunciPauli(a, b)
    setUmpan(pilihan === kunci ? { benar: true, teks: 'Benar' } : { benar: false, teks: `Kurang tepat: ${a} + ${b} = ${a + b} (${kunci})` })
    setLatihanKe(n => n + 1)
    lanjutPasangan()
  }, [pasangan])

  const selesai = useCallback(async () => {
    if (selesaiRef.current) return
    selesaiRef.current = true
    setMenyimpan(true)
    const skor = hitungPauli(intervalRef.current)
    const state = { skor, ...peserta }
    const pesertaId = crypto.randomUUID()
    try {
      const { error: e1 } = await supabase.from('peserta_pauli').insert([{ id: pesertaId, nama: peserta.nama, nip: peserta.email, jabatan: peserta.jabatan }])
      if (e1) throw e1
      const { error: e2 } = await supabase.from('hasil_pauli').insert([{ peserta_id: pesertaId, skor, ringkasan: ringkasanPauli(skor) }])
      if (e2) throw e2
      navigate('/hasil-pauli', { state: { ...state, pesertaId } })
    } catch {
      navigate('/hasil-pauli', { state })
    }
  }, [navigate, peserta])

  const jawabTes = useCallback(pilihan => {
    if (selesaiRef.current) return
    const lewat = performance.now() - mulaiRef.current
    if (lewat >= DURASI_MS) return
    const idx = Math.min(JUMLAH_INTERVAL - 1, Math.floor(lewat / (DETIK_PER_INTERVAL * 1000)))
    const iv = intervalRef.current[idx]
    iv.jumlah++
    if (pilihan === kunciPauli(pasangan[0], pasangan[1])) iv.benar++
    else iv.salah++
    setJumlahKerja(n => n + 1)
    lanjutPasangan()
  }, [pasangan])

  // Jam tes
  useEffect(() => {
    if (step !== 'tes') return
    mulaiRef.current = performance.now()
    const t = setInterval(() => {
      const sisa = DURASI_MS - (performance.now() - mulaiRef.current)
      setSisaMs(Math.max(0, sisa))
      if (sisa <= 0) { clearInterval(t); selesai() }
    }, 200)
    return () => clearInterval(t)
  }, [step, selesai])

  useKeyboard(step === 'latihan' && latihanKe < SOAL_LATIHAN, jawabLatihan)
  useKeyboard(step === 'tes' && !menyimpan, jawabTes)

  if (step === 'form') return (
    <FormPeserta
      id="pauli" judul="Tes Pauli Digital" meta={`${JUMLAH_INTERVAL} menit · ganjil-genap`}
      intro="Mengukur kecepatan, ketelitian, kestabilan, dan daya tahan kerja Anda pada tugas hitung sederhana yang berulang — aspek yang dilihat pada tes Pauli dan Kraepelin dalam seleksi kerja."
      onMulai={p => { setPeserta(p); setStep('latihan'); window.scrollTo(0, 0) }}
    />
  )

  const wadah = { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)', textAlign: 'center', gap: '24px' }

  if (step === 'latihan') return (
    <div style={wadah}>
      <div style={{ maxWidth: '520px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px' }}>Petunjuk</h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '15px', lineHeight: 1.7 }}>
          Jumlahkan dua angka yang tampil, lalu tekan <strong>GANJIL</strong> atau <strong>GENAP</strong> sesuai hasilnya.
          Angka bawah akan naik menjadi angka atas pada soal berikutnya. Kerjakan secepat dan seteliti mungkin selama {JUMLAH_INTERVAL} menit tanpa berhenti.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}>Di laptop: tombol ← atau A = ganjil, → atau L = genap.</p>
      </div>

      {latihanKe < SOAL_LATIHAN ? (
        <>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>Latihan {latihanKe + 1} / {SOAL_LATIHAN}</p>
          <Pasangan atas={pasangan[0]} bawah={pasangan[1]} />
          <TombolJawab onJawab={jawabLatihan} />
          <p style={{ minHeight: '20px', fontSize: '14px', fontWeight: 600, color: umpan?.benar ? '#16a34a' : '#dc2626' }}>{umpan?.teks}</p>
        </>
      ) : (
        <div className="dark-card" style={{ padding: '28px', maxWidth: '420px' }}>
          <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>Latihan selesai</p>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
            Tes sebenarnya berjalan {JUMLAH_INTERVAL} menit dan tidak bisa dijeda. Pastikan Anda siap dan tidak akan terganggu.
          </p>
          <button className="btn-cta block" onClick={() => { setPasangan([angkaAcak(), angkaAcak()]); setStep('tes'); window.scrollTo(0, 0) }}>
            Mulai tes <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  )

  const detik = Math.ceil(sisaMs / 1000)
  const menitKe = Math.min(JUMLAH_INTERVAL, Math.floor((DURASI_MS - sisaMs) / (DETIK_PER_INTERVAL * 1000)) + 1)

  return (
    <div style={wadah}>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', fontSize: '14px', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
        <span>Menit <strong style={{ color: 'var(--text)' }}>{menitKe}</strong> / {JUMLAH_INTERVAL}</span>
        <span>Sisa <strong style={{ color: 'var(--text)' }}>{Math.floor(detik / 60)}:{String(detik % 60).padStart(2, '0')}</strong></span>
        <span>Dikerjakan <strong style={{ color: 'var(--text)' }}>{jumlahKerja}</strong></span>
      </div>
      <div style={{ width: '100%', maxWidth: '420px', height: '6px', background: 'var(--track)', borderRadius: '99px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${100 - (sisaMs / DURASI_MS) * 100}%`, background: 'var(--accent)' }} />
      </div>
      {menyimpan ? (
        <p style={{ fontSize: '16px', color: 'var(--text-sub)' }}>Waktu habis. Menyimpan hasil…</p>
      ) : (
        <>
          <Pasangan atas={pasangan[0]} bawah={pasangan[1]} />
          <TombolJawab onJawab={jawabTes} />
        </>
      )}
    </div>
  )
}
