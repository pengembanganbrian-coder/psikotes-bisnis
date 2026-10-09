import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Logo from '../components/Logo'
import FormPeserta from '../components/FormPeserta'
import PaymentGate from '../components/PaymentGate'
import { HARGA_TES, formatRupiah } from '../config/pricing'
import { ambilSesi, simpanSesi, hapusSesi } from '../kemampuan/sesiBayar'
import { JUMLAH_INTERVAL, DETIK_PER_INTERVAL, angkaAcak, kunciPauli, hitungPauli, ringkasanPauli } from '../kemampuan/pauli'
import '../kemampuan/pauli.css'

const SOAL_LATIHAN = 10
const DURASI_MS = JUMLAH_INTERVAL * DETIK_PER_INTERVAL * 1000
const MS_INTERVAL = DETIK_PER_INTERVAL * 1000

const BERBAYAR = HARGA_TES.Pauli > 0
// Satu pembayaran = satu tes, dengan satu kesempatan mengulang bila tes
// terputus (halaman tertutup, koneksi/perangkat bermasalah).
const MAKS_MULAI = 2

const intervalKosong = () => Array.from({ length: JUMLAH_INTERVAL }, () => ({ jumlah: 0, benar: 0, salah: 0 }))

// Latihan memakai urutan tetap supaya peserta pasti bertemu jumlah di atas 9
// (yang dilihat angka terakhirnya) sekaligus jumlah satu digit.
const ANGKA_LATIHAN = [8, 7, 4, 3, 9, 6, 2, 5, 9, 8, 1]

/** "8 + 7 = 15 → angka terakhir 5 → ganjil" */
function uraian(a, b) {
  const j = a + b
  const k = kunciPauli(a, b).toUpperCase()
  return j > 9 ? `${a} + ${b} = ${j} → angka terakhir ${j % 10} → ${k}` : `${a} + ${b} = ${j} → ${k}`
}

function BarAtas({ kanan }) {
  return (
    <div className="pl-atas">
      <Logo size="sm" dark />
      <p className="pl-atas-judul" style={{ textAlign: 'right' }}><span>Tes Kemampuan</span>{kanan}</p>
    </div>
  )
}

function Kolom({ lalu, atas, bawah, nomor, umpan }) {
  return (
    <div className="pl-kolom" data-umpan={umpan || undefined} aria-live="polite">
      <span className="pl-lalu" aria-hidden="true">{lalu ?? ''}</span>
      <div key={nomor} className="pl-geser" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <span className="pl-angka">{atas}</span>
        <span className="pl-garis" aria-hidden="true">+</span>
        <span className="pl-angka">{bawah}</span>
      </div>
    </div>
  )
}

function TombolJawab({ onJawab, disabled, ditekan }) {
  // onPointerDown supaya terasa instan di layar sentuh (tanpa jeda klik).
  const tekan = pilihan => e => { e.preventDefault(); if (!disabled) onJawab(pilihan) }
  return (
    <div className="pl-tombol">
      <button type="button" className={`pl-btn${ditekan === 'ganjil' ? ' ditekan' : ''}`} disabled={disabled}
        onPointerDown={tekan('ganjil')} onKeyDown={e => e.key === 'Enter' && onJawab('ganjil')}>
        GANJIL<small><span className="pl-kbd">←</span> atau <span className="pl-kbd">A</span></small>
      </button>
      <button type="button" className={`pl-btn${ditekan === 'genap' ? ' ditekan' : ''}`} disabled={disabled}
        onPointerDown={tekan('genap')} onKeyDown={e => e.key === 'Enter' && onJawab('genap')}>
        GENAP<small><span className="pl-kbd">→</span> atau <span className="pl-kbd">L</span></small>
      </button>
    </div>
  )
}

/** Tombol keyboard: ← / A / 1 = ganjil, → / L / 2 = genap. */
function useKeyboard(aktif, onJawab, setDitekan) {
  useEffect(() => {
    if (!aktif) return
    const tekan = e => {
      if (e.repeat) return
      const k = e.key.toLowerCase()
      let pilihan = null
      if (k === 'arrowleft' || k === 'a' || k === '1') pilihan = 'ganjil'
      if (k === 'arrowright' || k === 'l' || k === '2') pilihan = 'genap'
      if (!pilihan) return
      e.preventDefault()
      setDitekan(pilihan)
      onJawab(pilihan)
    }
    const lepas = () => setDitekan(null)
    window.addEventListener('keydown', tekan)
    window.addEventListener('keyup', lepas)
    return () => { window.removeEventListener('keydown', tekan); window.removeEventListener('keyup', lepas) }
  }, [aktif, onJawab, setDitekan])
}

function Petunjuk({ onLanjut }) {
  return (
    <div className="pl-layar">
      <BarAtas kanan="Tes Pauli Digital" />
      <div className="pl-isi anim-up">
        <div className="pl-kartu">
          <p className="pl-label">Petunjuk</p>
          <ul className="pl-langkah">
            <li><span className="pl-no">1</span><span>Jumlahkan <b>dua angka</b> yang bersusun di layar.</span></li>
            <li><span className="pl-no">2</span><span>Jika hasilnya <b>lebih dari 9</b>, cukup lihat <b>angka terakhirnya</b>. Contoh: 8 + 7 = 15, angka terakhirnya 5.</span></li>
            <li><span className="pl-no">3</span><span>Tekan <b>GANJIL</b> bila angka itu 1, 3, 5, 7, 9 dan <b>GENAP</b> bila 0, 2, 4, 6, 8.</span></li>
            <li><span className="pl-no">4</span><span>Angka bawah lalu <b>naik menjadi angka atas</b>, dan muncul angka baru di bawahnya — persis seperti menghitung satu kolom panjang di lembar Pauli.</span></li>
            <li><span className="pl-no">5</span><span>Tes berjalan <b>{JUMLAH_INTERVAL} menit tanpa jeda</b>. Setiap menit ada tanda pergantian. Kerjakan secepat dan seteliti mungkin dengan tempo yang stabil.</span></li>
          </ul>

          <div className="pl-contoh-grid">
          <div className="pl-contoh" aria-label="Contoh: 8 ditambah 7 sama dengan 15, angka terakhir 5, ganjil">
            <div className="pl-contoh-kolom"><span>8</span><i /><span>7</span></div>
            <span className="pl-contoh-panah">→</span>
            <span className="pl-contoh-hasil">15 → angka terakhir <b>5</b> <strong>GANJIL</strong></span>
          </div>
          <div className="pl-contoh" aria-label="Contoh: 4 ditambah 2 sama dengan 6, genap">
            <div className="pl-contoh-kolom"><span>4</span><i /><span>2</span></div>
            <span className="pl-contoh-panah">→</span>
            <span className="pl-contoh-hasil">6<strong>GENAP</strong></span>
          </div>
          </div>

          <p className="pl-catatan" style={{ marginBottom: '18px' }}>
            Di ponsel: ketuk tombol di bagian bawah layar. Di laptop: <span className="pl-kbd">←</span>/<span className="pl-kbd">A</span> = ganjil,{' '}
            <span className="pl-kbd">→</span>/<span className="pl-kbd">L</span> = genap.
          </p>
          <button className="btn-cta block" onClick={onLanjut}>
            Coba {SOAL_LATIHAN} soal latihan <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TesPauli() {
  const navigate = useNavigate()
  // Sesi yang sudah dibuat (mis. kembali dari halaman pembayaran Mayar)
  // langsung dilanjutkan ke langkah pembayaran/mulai tes.
  const [sesi, setSesi]       = useState(() => ambilSesi('Pauli'))
  const [step, setStep]       = useState(() => (sesi ? 'bayar' : 'form'))
  const peserta = sesi?.peserta ?? null
  const [pasangan, setPasangan] = useState(() => [angkaAcak(), angkaAcak()])
  const [lalu, setLalu]       = useState(null)
  const [nomor, setNomor]     = useState(0)
  const [ditekan, setDitekan] = useState(null)

  // Latihan
  const [hasilLatihan, setHasilLatihan] = useState([])
  const [umpan, setUmpan]               = useState(null)
  const [kilat, setKilat]               = useState(null)

  // Tes
  const mulaiRef    = useRef(0)
  const intervalRef = useRef(intervalKosong())
  const selesaiRef  = useRef(false)
  const [sisaMs, setSisaMs]       = useState(DURASI_MS)
  const [jumlahKerja, setJumlahKerja] = useState(0)
  const [menyimpan, setMenyimpan] = useState(false)
  const [tandaMenit, setTandaMenit] = useState(null)

  const latihanKe = hasilLatihan.length

  // Bingkai hijau/merah hanya berkedip sebentar, supaya tidak terbaca
  // sebagai penilaian untuk soal berikutnya yang sudah tampil.
  useEffect(() => {
    if (!kilat) return
    const t = setTimeout(() => setKilat(null), 450)
    return () => clearTimeout(t)
  }, [kilat, latihanKe])

  // Angka bawah naik ke atas; angka atas lama tetap terlihat samar di atasnya.
  const geser = useCallback(baru => {
    setLalu(pasangan[0])
    setPasangan([pasangan[1], baru])
    setNomor(n => n + 1)
  }, [pasangan])

  const mulaiLatihan = () => {
    setHasilLatihan([]); setUmpan(null); setKilat(null); setLalu(null)
    setPasangan([ANGKA_LATIHAN[0], ANGKA_LATIHAN[1]])
    setStep('latihan'); window.scrollTo(0, 0)
  }

  const jawabLatihan = useCallback(pilihan => {
    const [a, b] = pasangan
    const benar = pilihan === kunciPauli(a, b)
    setUmpan({ benar, teks: benar ? `Benar — ${uraian(a, b)}` : `Kurang tepat: ${uraian(a, b)}` })
    setHasilLatihan(h => [...h, benar])
    setKilat(benar ? 'benar' : 'salah')
    geser(ANGKA_LATIHAN[latihanKe + 2] ?? angkaAcak())
  }, [pasangan, latihanKe, geser])

  const selesai = useCallback(async () => {
    if (selesaiRef.current) return
    selesaiRef.current = true
    setMenyimpan(true)
    const skor = hitungPauli(intervalRef.current)
    // pesertaId tetap dikirim walau penyimpanan gagal: pembayaran terikat ke
    // ID ini, jadi laporan tetap terbuka di halaman hasil.
    const { pesertaId } = sesi
    const state = { skor, ...peserta, pesertaId }
    try {
      const { error: e1 } = await supabase.from('peserta_pauli').insert([{ id: pesertaId, nama: peserta.nama, nip: peserta.email, jabatan: peserta.jabatan }])
      // 23505 = baris peserta sudah ada dari percobaan simpan sebelumnya.
      if (e1 && e1.code !== '23505') throw e1
      const { error: e2 } = await supabase.from('hasil_pauli').insert([{ peserta_id: pesertaId, skor, ringkasan: ringkasanPauli(skor) }])
      if (e2) throw e2
      hapusSesi('Pauli')
      navigate('/hasil-pauli', { state: { ...state, tersimpan: true } })
    } catch {
      hapusSesi('Pauli')
      navigate('/hasil-pauli', { state: { ...state, tersimpan: false } })
    }
  }, [navigate, peserta, sesi])

  const jawabTes = useCallback(pilihan => {
    if (selesaiRef.current) return
    const lewat = performance.now() - mulaiRef.current
    if (lewat >= DURASI_MS) return
    const idx = Math.min(JUMLAH_INTERVAL - 1, Math.floor(lewat / MS_INTERVAL))
    const iv = intervalRef.current[idx]
    iv.jumlah++
    if (pilihan === kunciPauli(pasangan[0], pasangan[1])) iv.benar++
    else iv.salah++
    setJumlahKerja(n => n + 1)
    geser(angkaAcak())
  }, [pasangan, geser])

  // Jam tes + tanda pergantian menit
  useEffect(() => {
    if (step !== 'tes') return
    mulaiRef.current = performance.now()
    let menitTerakhir = 0
    const t = setInterval(() => {
      const lewat = performance.now() - mulaiRef.current
      const sisa = DURASI_MS - lewat
      setSisaMs(Math.max(0, sisa))
      const menit = Math.floor(lewat / MS_INTERVAL)
      if (menit > menitTerakhir && menit < JUMLAH_INTERVAL) {
        menitTerakhir = menit
        setTandaMenit(menit + 1)
      }
      if (sisa <= 0) { clearInterval(t); selesai() }
    }, 200)
    return () => clearInterval(t)
  }, [step, selesai])

  // Peringatan bila halaman ditutup/di-refresh saat tes berjalan
  useEffect(() => {
    if (step !== 'tes' || menyimpan) return
    const cegah = e => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', cegah)
    return () => window.removeEventListener('beforeunload', cegah)
  }, [step, menyimpan])

  useKeyboard(step === 'latihan' && latihanKe < SOAL_LATIHAN, jawabLatihan, setDitekan)
  useKeyboard(step === 'tes' && !menyimpan, jawabTes, setDitekan)

  if (step === 'form') return (
    <FormPeserta
      id="pauli" judul="Tes Pauli Digital" meta={`${JUMLAH_INTERVAL} menit · ganjil-genap`}
      intro="Mengukur kecepatan, ketelitian, kestabilan, dan daya tahan kerja Anda pada tugas hitung sederhana yang berulang — aspek yang dilihat pada tes Pauli dan Kraepelin dalam seleksi kerja."
      onMulai={p => {
        const baru = { pesertaId: crypto.randomUUID(), peserta: p }
        simpanSesi('Pauli', baru); setSesi(baru)
        setStep('petunjuk'); window.scrollTo(0, 0)
      }}
    />
  )

  if (step === 'petunjuk') return <Petunjuk onLanjut={mulaiLatihan} />

  if (step === 'latihan') {
    const jumlahBenar = hasilLatihan.filter(Boolean).length
    return (
      <div className="pl-layar">
        <BarAtas kanan="Latihan" />
        {latihanKe < SOAL_LATIHAN ? (
          <div className="pl-isi">
            <p className="pl-label">Latihan {latihanKe + 1} / {SOAL_LATIHAN}</p>
            <div className="pl-titik" aria-hidden="true">
              {Array.from({ length: SOAL_LATIHAN }, (_, i) => (
                <span key={i} className={i < latihanKe ? (hasilLatihan[i] ? 'benar' : 'salah') : i === latihanKe ? 'kini' : ''} />
              ))}
            </div>
            <Kolom lalu={lalu} atas={pasangan[0]} bawah={pasangan[1]} nomor={nomor} umpan={kilat} />
            <p className={`pl-umpan ${umpan?.benar ? 'benar' : 'salah'}`}>{umpan?.teks ?? 'Jumlah di atas 9? Lihat angka terakhirnya saja.'}</p>
            <TombolJawab onJawab={jawabLatihan} ditekan={ditekan} />
          </div>
        ) : (
          <div className="pl-isi anim-up">
            <div className="pl-kartu">
              <p className="pl-label">Latihan selesai</p>
              <div className="pl-ringkas">
                <div><b>{jumlahBenar} / {SOAL_LATIHAN}</b><small>jawaban benar</small></div>
                <div><b>{JUMLAH_INTERVAL} menit</b><small>tes sebenarnya</small></div>
              </div>
              <p className="pl-teks" style={{ marginBottom: '8px' }}>
                {jumlahBenar >= 8
                  ? 'Bagus, Anda sudah memahami caranya.'
                  : 'Ingat: jumlahkan kedua angka, dan bila hasilnya lebih dari 9 lihat angka terakhirnya saja. Anda boleh mengulang latihan.'}
              </p>
              <p className="pl-teks" style={{ marginBottom: '20px' }}>
                Saat tes, <b>tidak ada tanda benar/salah</b> dan waktu <b>tidak bisa dijeda</b>. Pastikan Anda siap dan tidak akan terganggu.
              </p>
              <button className="btn-cta block" onClick={() => { setStep('bayar'); window.scrollTo(0, 0) }}>
                {BERBAYAR ? `Lanjut ke tes — ${formatRupiah(HARGA_TES.Pauli)}` : `Lanjut ke tes ${JUMLAH_INTERVAL} menit`} <span className="btn-arrow" aria-hidden="true">→</span>
              </button>
              <button className="btn-ghost block" style={{ marginTop: '10px', width: '100%' }} onClick={mulaiLatihan}>Ulangi latihan</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (step === 'bayar') return (
    <div className="pl-layar">
      <BarAtas kanan="Tes Pauli Digital" />
      <div className="pl-isi anim-up" style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
        <PaymentGate testType="Pauli" mode="awal" pesertaId={sesi.pesertaId} nama={peserta.nama} email={peserta.email}>
          <div className="pl-kartu">
            <p className="pl-label">Siap mulai</p>
            <p className="pl-teks" style={{ margin: '12px 0 8px' }}>
              Tes berjalan <b>{JUMLAH_INTERVAL} menit tanpa jeda</b> dan tidak ada tanda benar/salah. Jumlahkan dua angka; bila lebih dari 9,
              lihat angka terakhirnya, lalu tekan GANJIL atau GENAP.
            </p>
            {(sesi.mulai ?? 0) > 0 && (sesi.mulai ?? 0) < MAKS_MULAI && (
              <p className="pl-teks" style={{ marginBottom: '8px', color: '#b45309' }}>Tes sebelumnya terputus. Anda masih punya 1 kesempatan mengulang.</p>
            )}
            <p className="pl-catatan" style={{ marginBottom: '20px' }}>Pembayaran ini berlaku untuk satu kali tes. Jangan menutup atau me-refresh halaman selama tes.</p>
            {(sesi.mulai ?? 0) >= MAKS_MULAI ? (
              <p className="pl-teks" style={{ color: '#b91c1c' }}>
                Kesempatan tes untuk pembayaran ini sudah terpakai. Bila tes terputus karena kendala teknis, hubungi{' '}
                <a href="mailto:psikologikantor@proton.me" style={{ color: 'var(--accent)', fontWeight: 600 }}>psikologikantor@proton.me</a>.
              </p>
            ) : (
            <button className="btn-cta block" onClick={() => {
              const s2 = { ...sesi, mulai: (sesi.mulai ?? 0) + 1 }
              simpanSesi('Pauli', s2); setSesi(s2)
              setPasangan([angkaAcak(), angkaAcak()]); setLalu(null); setDitekan(null); setStep('tes'); window.scrollTo(0, 0)
            }}>
              Mulai tes {JUMLAH_INTERVAL} menit <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
            )}
            <button className="btn-ghost block" style={{ marginTop: '10px', width: '100%' }} onClick={() => setStep('petunjuk')}>Lihat petunjuk & latihan lagi</button>
          </div>
        </PaymentGate>
      </div>
    </div>
  )

  const detik = Math.ceil(sisaMs / 1000)
  const lewatMs = DURASI_MS - sisaMs
  const menitKe = Math.min(JUMLAH_INTERVAL, Math.floor(lewatMs / MS_INTERVAL) + 1)

  return (
    <div className="pl-layar">
      {tandaMenit && <div key={tandaMenit} className="pl-ganti" role="status">Menit ke-{tandaMenit} · jaga tempo Anda</div>}
      <div className="pl-panel">
        <div className="pl-statistik">
          <div><small>Menit</small><b>{menitKe}</b> / {JUMLAH_INTERVAL}</div>
          <div className={`pl-jam${detik <= 30 ? ' mepet' : ''}`} aria-label={`Sisa waktu ${detik} detik`}>
            {Math.floor(detik / 60)}:{String(detik % 60).padStart(2, '0')}
          </div>
          <div><small>Dikerjakan</small><b>{jumlahKerja}</b></div>
        </div>
        <div className="pl-segmen" aria-hidden="true">
          {Array.from({ length: JUMLAH_INTERVAL }, (_, i) => {
            const isi = Math.max(0, Math.min(1, (lewatMs - i * MS_INTERVAL) / MS_INTERVAL))
            return <span key={i}><i style={{ width: `${isi * 100}%` }} /></span>
          })}
        </div>
      </div>

      {menyimpan ? (
        <div className="pl-isi"><p className="pl-teks">Waktu habis. Menyimpan hasil…</p></div>
      ) : (
        <div className="pl-isi">
          <Kolom lalu={lalu} atas={pasangan[0]} bawah={pasangan[1]} nomor={nomor} />
          <p className="pl-catatan">Lebih dari 9? Lihat angka terakhirnya.</p>
          <TombolJawab onJawab={jawabTes} ditekan={ditekan} />
        </div>
      )}
    </div>
  )
}
