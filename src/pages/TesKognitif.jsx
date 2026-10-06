import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import FormPeserta from '../components/FormPeserta'
import { TampilSoal, TampilOpsi } from '../components/SoalKognitif'
import { SUBTES, TOTAL_SOAL, hitungKognitif, ringkasanKognitif } from '../kemampuan/kognitif'

const TOTAL_MENIT = Math.round(SUBTES.reduce((t, s) => t + s.detik, 0) / 60)

export default function TesKognitif() {
  const navigate = useNavigate()
  const [step, setStep]       = useState('form')     // form | intro | soal | simpan
  const [peserta, setPeserta] = useState(null)
  const [stIdx, setStIdx]     = useState(0)
  const [soalIdx, setSoalIdx] = useState(0)
  const [jawaban, setJawaban] = useState({})
  const [sisa, setSisa]       = useState(0)
  const jawabanRef = useRef({})
  const akhirRef   = useRef(0)

  const st = SUBTES[stIdx]
  const soal = st.soal[soalIdx]

  const simpan = useCallback(async () => {
    setStep('simpan')
    const skor = hitungKognitif(jawabanRef.current)
    const state = { skor, jawaban: jawabanRef.current, ...peserta }
    const pesertaId = crypto.randomUUID()
    try {
      const { error: e1 } = await supabase.from('peserta_kognitif').insert([{ id: pesertaId, nama: peserta.nama, nip: peserta.email, jabatan: peserta.jabatan }])
      if (e1) throw e1
      const { error: e2 } = await supabase.from('hasil_kognitif').insert([{ peserta_id: pesertaId, skor, ringkasan: ringkasanKognitif(skor), jawaban: jawabanRef.current }])
      if (e2) throw e2
      navigate('/hasil-kognitif', { state: { ...state, pesertaId } })
    } catch {
      navigate('/hasil-kognitif', { state })
    }
  }, [navigate, peserta])

  const subtesSelesai = useCallback(() => {
    if (stIdx < SUBTES.length - 1) {
      setStIdx(i => i + 1)
      setSoalIdx(0)
      setStep('intro')
      window.scrollTo(0, 0)
    } else {
      simpan()
    }
  }, [stIdx, simpan])

  // Jam per subtes
  useEffect(() => {
    if (step !== 'soal') return
    const t = setInterval(() => {
      const s = Math.max(0, Math.ceil((akhirRef.current - performance.now()) / 1000))
      setSisa(s)
      if (s <= 0) { clearInterval(t); subtesSelesai() }
    }, 250)
    return () => clearInterval(t)
  }, [step, subtesSelesai])

  function pilih(idx) {
    jawabanRef.current = { ...jawabanRef.current, [soal.id]: idx }
    setJawaban(jawabanRef.current)
    if (soalIdx < st.soal.length - 1) setTimeout(() => setSoalIdx(i => i + 1), 180)
  }

  if (step === 'form') return (
    <FormPeserta
      id="kognitif" judul="Tes Kemampuan Kognitif" meta={`${TOTAL_SOAL} soal · ${SUBTES.length} subtes · ${TOTAL_MENIT} menit`}
      intro="Latihan kemampuan berpikir yang sering muncul di psikotes kerja, BUMN, dan CPNS: deret angka, analogi kata, penalaran logis, dan matriks gambar. Setiap subtes punya batas waktu sendiri."
      onMulai={p => { setPeserta(p); setStep('intro'); window.scrollTo(0, 0) }}
    />
  )

  const wadah = { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)', textAlign: 'center', gap: '22px' }

  if (step === 'simpan') return <div style={wadah}><p style={{ color: 'var(--text-sub)' }}>Menyimpan hasil…</p></div>

  if (step === 'intro') return (
    <div style={wadah}>
      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>Subtes {stIdx + 1} dari {SUBTES.length}</p>
      <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)' }}>{st.nama}</h1>
      <div className="dark-card" style={{ padding: '24px 28px', maxWidth: '480px' }}>
        <p style={{ color: 'var(--text-sub)', fontSize: '15px', lineHeight: 1.7, marginBottom: '14px' }}>{st.petunjuk}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{st.soal.length} soal · {Math.round(st.detik / 60)} menit. Soal yang belum dijawab saat waktu habis dihitung salah.</p>
      </div>
      <button className="btn-cta" onClick={() => { akhirRef.current = performance.now() + st.detik * 1000; setSisa(st.detik); setStep('soal'); window.scrollTo(0, 0) }}>
        Mulai {st.nama} <span className="btn-arrow" aria-hidden="true">→</span>
      </button>
    </div>
  )

  const dijawab = st.soal.filter(s => jawaban[s.id] !== undefined).length
  const matriks = soal.jenis === 'matriks'

  return (
    <div style={{ ...wadah, justifyContent: 'flex-start', paddingTop: '28px' }}>
      <div style={{ width: '100%', maxWidth: '640px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
        <span>{st.nama} · <strong style={{ color: 'var(--text)' }}>{soalIdx + 1}</strong>/{st.soal.length}</span>
        <span style={{ fontWeight: 700, color: sisa <= 30 ? '#dc2626' : 'var(--text)' }}>{Math.floor(sisa / 60)}:{String(sisa % 60).padStart(2, '0')}</span>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {st.soal.map((s, i) => (
          <button key={s.id} onClick={() => setSoalIdx(i)} aria-label={`Soal ${i + 1}`}
            style={{ width: '30px', height: '30px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              border: i === soalIdx ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: jawaban[s.id] !== undefined ? 'var(--accent-dim)' : 'var(--surface)', color: 'var(--text)' }}>
            {i + 1}
          </button>
        ))}
      </div>

      <div style={{ minHeight: matriks ? 0 : '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <TampilSoal soal={soal} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: matriks ? 'repeat(5, auto)' : '1fr', gap: '10px', width: '100%', maxWidth: matriks ? 'none' : '560px', justifyContent: 'center' }}>
        {soal.opsi.map((o, i) => {
          const aktif = jawaban[soal.id] === i
          return (
            <button key={i} onClick={() => pilih(i)} className={`answer-btn ${aktif ? 'selected' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: matriks ? 'center' : 'flex-start', padding: matriks ? '6px' : undefined, flexDirection: matriks ? 'column' : 'row' }}>
              <span style={{ fontWeight: 800, color: 'var(--accent)', minWidth: '16px' }}>{'ABCDE'[i]}</span>
              <TampilOpsi soal={soal} opsi={o} />
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-ghost" disabled={soalIdx === 0} onClick={() => setSoalIdx(i => i - 1)}>← Sebelumnya</button>
        {soalIdx < st.soal.length - 1
          ? <button className="btn-ghost" onClick={() => setSoalIdx(i => i + 1)}>Berikutnya →</button>
          : <button className="btn-cta" onClick={subtesSelesai}>
              {stIdx < SUBTES.length - 1 ? 'Selesai, lanjut subtes' : 'Selesai & lihat hasil'} ({dijawab}/{st.soal.length})
            </button>}
      </div>
    </div>
  )
}
