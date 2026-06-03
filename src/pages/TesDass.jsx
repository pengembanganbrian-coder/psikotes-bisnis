import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { supabase } from '../supabase'
import PrivacyCheckbox from '../components/PrivacyCheckbox'

// 21 pernyataan DASS-21 (versi Bahasa Indonesia yang tervalidasi)
// Skala: D = Depresi, A = Kecemasan (Anxiety), S = Stres
// Petunjuk: dirasakan dalam 1 minggu terakhir
const soal = [
  { id: 1,  teks: "Saya merasa sulit untuk menenangkan diri",                                                                                                     skala: "S" },
  { id: 2,  teks: "Saya merasakan mulut saya terasa kering",                                                                                                      skala: "A" },
  { id: 3,  teks: "Saya tidak dapat merasakan perasaan positif sama sekali",                                                                                      skala: "D" },
  { id: 4,  teks: "Saya mengalami kesulitan bernapas (misalnya: napas terlalu cepat atau sesak tanpa aktivitas fisik)",                                           skala: "A" },
  { id: 5,  teks: "Saya merasa kesulitan untuk berinisiatif melakukan sesuatu",                                                                                   skala: "D" },
  { id: 6,  teks: "Saya cenderung bereaksi berlebihan terhadap suatu situasi",                                                                                    skala: "S" },
  { id: 7,  teks: "Saya mengalami gemetar (misalnya: pada tangan)",                                                                                               skala: "A" },
  { id: 8,  teks: "Saya merasa banyak menghabiskan energi karena kecemasan",                                                                                      skala: "S" },
  { id: 9,  teks: "Saya khawatir berada dalam situasi di mana saya mungkin panik dan mempermalukan diri sendiri",                                                 skala: "A" },
  { id: 10, teks: "Saya merasa tidak ada hal yang dapat diharapkan ke depan",                                                                                     skala: "D" },
  { id: 11, teks: "Saya merasa mudah menjadi gelisah",                                                                                                            skala: "S" },
  { id: 12, teks: "Saya merasa sulit untuk rileks",                                                                                                               skala: "S" },
  { id: 13, teks: "Saya merasa sedih dan tertekan",                                                                                                               skala: "D" },
  { id: 14, teks: "Saya tidak sabar terhadap hal-hal yang menghalangi saya dalam melakukan sesuatu",                                                             skala: "S" },
  { id: 15, teks: "Saya merasa hampir panik",                                                                                                                     skala: "A" },
  { id: 16, teks: "Saya tidak mampu merasa antusias terhadap apapun",                                                                                             skala: "D" },
  { id: 17, teks: "Saya merasa diri saya tidak berharga sebagai seorang manusia",                                                                                 skala: "D" },
  { id: 18, teks: "Saya merasa mudah tersinggung",                                                                                                                skala: "S" },
  { id: 19, teks: "Saya menyadari detak jantung saya meskipun tanpa aktivitas fisik (misalnya: detak jantung meningkat atau berdebar)",                          skala: "A" },
  { id: 20, teks: "Saya merasa ketakutan tanpa alasan yang jelas",                                                                                                skala: "A" },
  { id: 21, teks: "Saya merasa hidup tidak berarti",                                                                                                              skala: "D" },
]

// Depresi items:  3, 5, 10, 13, 16, 17, 21  (7 items × 2 = max 42)
// Kecemasan items: 2, 4, 7, 9, 15, 19, 20  (7 items × 2 = max 42)
// Stres items:    1, 6, 8, 11, 12, 14, 18  (7 items × 2 = max 42)

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

export default function TesDass() {
  const navigate = useNavigate()
  const [step, setStep]             = useState('form')
  const [nama, setNama]             = useState('')
  const [email, setEmail]           = useState('')
  const [usia, setUsia]             = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [jawaban, setJawaban]       = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [setujuPrivasi, setSetujuPrivasi] = useState(false)

  const answered = Object.keys(jawaban).length
  const progress  = (answered / 21) * 100

  function hitungDASS() {
    const D = soal.filter(s => s.skala === 'D').reduce((sum, s) => sum + (jawaban[s.id] ?? 0), 0) * 2
    const A = soal.filter(s => s.skala === 'A').reduce((sum, s) => sum + (jawaban[s.id] ?? 0), 0) * 2
    const S = soal.filter(s => s.skala === 'S').reduce((sum, s) => sum + (jawaban[s.id] ?? 0), 0) * 2
    return { D, A, S }
  }

  function validateForm() {
    const errs = {}
    if (!nama.trim())  errs.nama  = 'Nama lengkap wajib diisi.'
    if (!email.trim()) errs.email = 'Email wajib diisi.'
    if (!usia)         errs.usia  = 'Usia wajib diisi.'
    if (!jenisKelamin) errs.jenisKelamin = 'Jenis kelamin wajib dipilih.'
    if (!setujuPrivasi) errs.privasi = 'Wajib menyetujui Kebijakan Privasi untuk melanjutkan.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit() {
    if (answered < 21) {
      const belum = soal.find(s => jawaban[s.id] === undefined)
      if (belum) document.getElementById(`soal-${belum.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const { D, A, S } = hitungDASS()
    const jabatan = `${usia} th · ${jenisKelamin}`
    try {
      const { data: peserta, error: e1 } = await supabase
        .from('peserta_dass')
        .insert([{ nama, nip: email, jabatan }])
        .select()
        .single()

      if (e1 || !peserta) throw e1 || new Error('Gagal menyimpan')

      const kategori = (skor, batas) => {
        if (skor <= batas[0]) return 'Normal'
        if (skor <= batas[1]) return 'Ringan'
        if (skor <= batas[2]) return 'Sedang'
        if (skor <= batas[3]) return 'Berat'
        return 'Sangat Berat'
      }

      await supabase.from('hasil_dass').insert([{
        peserta_id:       peserta.id,
        skor_depresi:     D, skor_anxietas: A, skor_stres: S,
        kategori_depresi:   kategori(D, [9, 13, 20, 27]),
        kategori_anxietas:  kategori(A, [7, 9, 14, 19]),
        kategori_stres:     kategori(S, [14, 18, 25, 33]),
      }])

      navigate('/hasil-dass', { state: { skor: { D, A, S }, nama, email, jabatan, jawaban, pesertaId: peserta.id } })
    } catch {
      navigate('/hasil-dass', { state: { skor: { D, A, S }, nama, email, jabatan, jawaban } })
    }
  }

  /* ── FORM ── */
  if (step === 'form') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>AssesIN</p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>Tes DASS-21</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>21 pernyataan · ~5 menit</p>
        </div>

        <div className="dark-card" style={{ padding: '32px', marginBottom: '16px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.65', marginBottom: '24px', borderLeft: '2px solid var(--accent-border)', paddingLeft: '12px' }}>
            Ukur tingkat <strong style={{ color: 'var(--text-sub)' }}>depresi</strong>, <strong style={{ color: 'var(--text-sub)' }}>kecemasan</strong>, dan <strong style={{ color: 'var(--text-sub)' }}>stres</strong> yang Anda rasakan dalam <strong style={{ color: 'var(--text-sub)' }}>1 minggu terakhir</strong>.
          </p>
          <div className="section-rule" style={{ marginBottom: '28px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Data Diri</span><span className="section-rule-line" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={S_LABEL}>Nama Lengkap <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" value={nama} onChange={e => { setNama(e.target.value); setFormErrors(p => ({...p, nama: ''})) }} placeholder="Nama lengkap" autoComplete="name" />
              {formErrors.nama && <p style={S_ERR}>{formErrors.nama}</p>}
            </div>
            <div>
              <label style={S_LABEL}>Email <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" type="email" value={email} onChange={e => { setEmail(e.target.value); setFormErrors(p => ({...p, email: ''})) }} placeholder="email@contoh.com" autoComplete="email" />
              {formErrors.email && <p style={S_ERR}>{formErrors.email}</p>}
            </div>
            <div className="form-grid-2">
              <div>
                <label style={S_LABEL}>Usia <span style={{ color: '#f87171' }}>*</span></label>
                <input className="field" type="number" min="10" max="100" value={usia} onChange={e => { setUsia(e.target.value); setFormErrors(p => ({...p, usia: ''})) }} placeholder="Tahun" />
                {formErrors.usia && <p style={S_ERR}>{formErrors.usia}</p>}
              </div>
              <div>
                <label style={S_LABEL}>Jenis Kelamin <span style={{ color: '#f87171' }}>*</span></label>
                <select className="field" value={jenisKelamin} onChange={e => { setJenisKelamin(e.target.value); setFormErrors(p => ({...p, jenisKelamin: ''})) }}>
                  <option value="">— Pilih —</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {formErrors.jenisKelamin && <p style={S_ERR}>{formErrors.jenisKelamin}</p>}
              </div>
            </div>
            <PrivacyCheckbox
              id="privacy-dass"
              checked={setujuPrivasi}
              onChange={v => { setSetujuPrivasi(v); setFormErrors(p => ({...p, privasi: ''})) }}
              error={formErrors.privasi}
            />
            <button
              onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
              style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', width: '100%', marginTop: '8px' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Mulai Tes →
            </button>
          </div>
        </div>

        <button onClick={() => navigate('/')} style={{ display: 'block', margin: '0 auto', color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Kembali ke beranda
        </button>
      </div>
    </div>
  )

  /* ── TES ── */
  const LABELS = ['Tidak\npernah', 'Kadang-\nkadang', 'Sering', 'Hampir\nselalu']

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,15,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>Tes DASS-21</p>
            <p className="tes-header-name" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{nama} · {answered}/21 terjawab</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '120px', height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.5s' }} />
            </div>
            <span style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px' }}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '28px var(--px)' }}>

        {/* Legenda */}
        <div className="dark-card" style={{ padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '14px' }}>Pilih frekuensi yang paling menggambarkan kondisi Anda dalam <strong>1 minggu terakhir</strong>:</p>
          <div className="rating-grid">
            {[{n:0,label:'Tidak pernah',cls:'r0'},{n:1,label:'Kadang-kadang',cls:'r1'},{n:2,label:'Sering',cls:'r2'},{n:3,label:'Hampir selalu',cls:'r3'}].map(({n, label, cls}) => (
              <div key={n} className={`rating-btn ${cls} sel`} style={{ cursor: 'default' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px' }}>{n}</span>
                <span style={{ fontSize: '10px', textAlign: 'center', lineHeight: '1.3' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Soal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {soal.map(s => {
            const val  = jawaban[s.id]
            const done = val !== undefined
            return (
              <div id={`soal-${s.id}`} key={s.id} className="dark-card" style={{ padding: '20px', borderColor: done ? 'var(--accent-border)' : 'var(--border)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 700, background: done ? 'var(--accent)' : 'var(--surface-2)', color: done ? '#09090f' : 'var(--text-muted)', border: '1px solid ' + (done ? 'var(--accent)' : 'var(--border)') }}>
                    {s.id}
                  </span>
                  <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: '1.65' }}>{s.teks}</p>
                </div>
                <div className="rating-grid">
                  {[0, 1, 2, 3].map(n => (
                    <button key={n} onClick={() => setJawaban(j => ({...j, [s.id]: n}))} className={`rating-btn r${n} ${val === n ? 'sel' : ''}`}>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px' }}>{n}</span>
                      <span style={{ fontSize: '9px', textAlign: 'center', lineHeight: '1.3', whiteSpace: 'pre-line' }}>{LABELS[n]}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: '28px' }}>
          {answered < 21 && (
            <p style={{ textAlign: 'center', color: '#fbbf24', fontSize: '13px', marginBottom: '12px' }}>
              Masih {21 - answered} pertanyaan belum dijawab
            </p>
          )}
          <button
            onClick={handleSubmit}
            style={{ width: '100%', background: answered === 21 ? 'var(--accent)' : 'var(--surface-2)', color: answered === 21 ? '#09090f' : 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: '1px solid ' + (answered === 21 ? 'var(--accent)' : 'var(--border)'), cursor: answered === 21 ? 'pointer' : 'not-allowed' }}
          >
            {answered === 21 ? 'Lihat Hasil →' : `${answered} / 21 terjawab`}
          </button>
        </div>
      </div>
    </div>
  )
}
