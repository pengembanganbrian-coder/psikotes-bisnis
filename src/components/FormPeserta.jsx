import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
import PrivacyCheckbox from './PrivacyCheckbox'

// Form data diri untuk tes di ruang Tes Kemampuan. Tampilannya sama dengan
// form di TesBaru/TesDass. onMulai menerima { nama, email, jabatan }.

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#dc2626', fontSize: '12px', marginTop: '6px' }

export default function FormPeserta({ id, judul, meta, intro, onMulai }) {
  const navigate = useNavigate()
  const [nama, setNama]             = useState('')
  const [email, setEmail]           = useState('')
  const [usia, setUsia]             = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [setujuPrivasi, setSetujuPrivasi] = useState(false)
  const [err, setErr]               = useState({})

  function mulai() {
    const e = {}
    if (!nama.trim())  e.nama  = 'Nama lengkap wajib diisi.'
    if (!email.trim()) e.email = 'Email wajib diisi.'
    if (!usia)         e.usia  = 'Usia wajib diisi.'
    if (!jenisKelamin) e.jenisKelamin = 'Jenis kelamin wajib dipilih.'
    if (!setujuPrivasi) e.privasi = 'Wajib menyetujui Kebijakan Privasi untuk melanjutkan.'
    setErr(e)
    if (Object.keys(e).length === 0) onMulai({ nama: nama.trim(), email: email.trim(), jabatan: `${usia} th · ${jenisKelamin}` })
  }

  const ubah = (set, kunci) => ev => { set(ev.target.value); setErr(p => ({ ...p, [kunci]: '' })) }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)' }}>
      <div className="anim-up" style={{ width: '100%', maxWidth: '440px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>Tes Kemampuan</p>
          <p style={{ fontWeight: 700, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>{judul}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{meta}</p>
        </div>

        <div className="dark-card" style={{ padding: '32px', marginBottom: '16px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.65', marginBottom: '24px', borderLeft: '2px solid var(--accent-border)', paddingLeft: '12px' }}>
            {intro}
          </p>
          <div className="section-rule" style={{ marginBottom: '28px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Data Diri</span><span className="section-rule-line" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={S_LABEL}>Nama Lengkap <span style={{ color: '#dc2626' }}>*</span></label>
              <input className="field" value={nama} onChange={ubah(setNama, 'nama')} placeholder="Nama lengkap" autoComplete="name" />
              {err.nama && <p style={S_ERR}>{err.nama}</p>}
            </div>
            <div>
              <label style={S_LABEL}>Email <span style={{ color: '#dc2626' }}>*</span></label>
              <input className="field" type="email" value={email} onChange={ubah(setEmail, 'email')} placeholder="email@contoh.com" autoComplete="email" />
              {err.email && <p style={S_ERR}>{err.email}</p>}
            </div>
            <div className="form-grid-2">
              <div>
                <label style={S_LABEL}>Usia <span style={{ color: '#dc2626' }}>*</span></label>
                <input className="field" type="number" min="10" max="100" value={usia} onChange={ubah(setUsia, 'usia')} placeholder="Tahun" />
                {err.usia && <p style={S_ERR}>{err.usia}</p>}
              </div>
              <div>
                <label style={S_LABEL}>Jenis Kelamin <span style={{ color: '#dc2626' }}>*</span></label>
                <select className="field" value={jenisKelamin} onChange={ubah(setJenisKelamin, 'jenisKelamin')}>
                  <option value="">— Pilih —</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {err.jenisKelamin && <p style={S_ERR}>{err.jenisKelamin}</p>}
              </div>
            </div>
            <PrivacyCheckbox
              id={`privacy-${id}`}
              checked={setujuPrivasi}
              onChange={v => { setSetujuPrivasi(v); setErr(p => ({ ...p, privasi: '' })) }}
              error={err.privasi}
            />
            <button onClick={mulai} className="btn-cta block">
              Lanjut <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <button onClick={() => navigate('/kemampuan')} style={{ display: 'block', margin: '0 auto', color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Kembali ke Tes Kemampuan
        </button>
      </div>
    </div>
  )
}
