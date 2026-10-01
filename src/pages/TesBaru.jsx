import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { supabase } from '../supabase'
import PrivacyCheckbox from '../components/PrivacyCheckbox'
import { TES_BARU, YA_TIDAK } from '../tes-baru/definisi'

// Mesin tes bersama untuk Big Five, RIASEC, Resiliensi, dan Peran dalam
// Tim (lihat tes-baru/definisi.js). Tampilan mengikuti TesDass.

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

export default function TesBaru({ kode }) {
  const def = TES_BARU[kode]
  const navigate = useNavigate()
  const [step, setStep]             = useState('form')
  const [nama, setNama]             = useState('')
  const [email, setEmail]           = useState('')
  const [usia, setUsia]             = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [jawaban, setJawaban]       = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [setujuPrivasi, setSetujuPrivasi] = useState(false)
  const [mengirim, setMengirim]     = useState(false)

  const total    = def.soal.length
  const answered = Object.keys(jawaban).length
  const progress = (answered / total) * 100
  const yaTidak  = def.format === YA_TIDAK

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
    if (answered < total) {
      const belum = def.soal.find(s => jawaban[s.id] === undefined)
      if (belum) document.getElementById(`soal-${belum.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setMengirim(true)
    const skor = def.hitung(jawaban)
    const jabatan = `${usia} th · ${jenisKelamin}`
    const state = { skor, jawaban, nama, email, jabatan }
    // id dibuat di klien supaya tidak perlu izin SELECT bagi pengunjung
    // anonim (RLS hanya mengizinkan INSERT).
    const pesertaId = crypto.randomUUID()
    try {
      const { error: e1 } = await supabase.from(def.tabel.peserta).insert([{ id: pesertaId, nama, nip: email, jabatan }])
      if (e1) throw e1
      const { error: e2 } = await supabase.from(def.tabel.hasil).insert([{
        peserta_id: pesertaId, skor, ringkasan: def.ringkasan(skor), jawaban,
      }])
      if (e2) throw e2
      navigate(def.hasilRoute, { state: { ...state, pesertaId } })
    } catch {
      navigate(def.hasilRoute, { state })
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
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>AssesIN · Beta</p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>{def.judul}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{total} pernyataan · {def.durasi}</p>
        </div>

        <div className="dark-card" style={{ padding: '32px', marginBottom: '16px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.65', marginBottom: '24px', borderLeft: '2px solid var(--accent-border)', paddingLeft: '12px' }}>
            {def.intro}
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
              id={`privacy-${def.kode}`}
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
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,15,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>{def.judul}</p>
            <p className="tes-header-name" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{nama} · {answered}/{total} terjawab</p>
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
        <div className="dark-card" style={{ padding: '20px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, lineHeight: '1.6' }}>{def.petunjuk}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {def.soal.map((s, idx) => {
            const val  = jawaban[s.id]
            const done = val !== undefined
            return (
              <div id={`soal-${s.id}`} key={s.id} className="dark-card" style={{ padding: '20px', borderColor: done ? 'var(--accent-border)' : 'var(--border)' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 700, background: done ? 'var(--accent)' : 'var(--surface-2)', color: done ? '#09090f' : 'var(--text-muted)', border: '1px solid ' + (done ? 'var(--accent)' : 'var(--border)') }}>
                    {idx + 1}
                  </span>
                  <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: '1.65' }}>{s.teks}</p>
                </div>
                <div className="rating-grid" style={yaTidak ? { gridTemplateColumns: 'repeat(2, 1fr)' } : { gridTemplateColumns: 'repeat(5, 1fr)' }}>
                  {def.format.map(({ val: n, label }, i) => (
                    <button key={n} onClick={() => setJawaban(j => ({...j, [s.id]: n}))} className={`rating-btn r${Math.min(i, 3)} ${val === n ? 'sel' : ''}`}>
                      {!yaTidak && <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px' }}>{n}</span>}
                      <span style={{ fontSize: yaTidak ? '13px' : '9px', fontWeight: yaTidak ? 700 : 400, textAlign: 'center', lineHeight: '1.3' }}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: '28px' }}>
          {answered < total && (
            <p style={{ textAlign: 'center', color: '#fbbf24', fontSize: '13px', marginBottom: '12px' }}>
              Masih {total - answered} pernyataan belum dijawab
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={mengirim}
            style={{ width: '100%', background: answered === total ? 'var(--accent)' : 'var(--surface-2)', color: answered === total ? '#09090f' : 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: '1px solid ' + (answered === total ? 'var(--accent)' : 'var(--border)'), cursor: answered === total ? 'pointer' : 'not-allowed' }}
          >
            {mengirim ? 'Menyimpan…' : answered === total ? 'Lihat Hasil →' : `${answered} / ${total} terjawab`}
          </button>
        </div>
      </div>
    </div>
  )
}
