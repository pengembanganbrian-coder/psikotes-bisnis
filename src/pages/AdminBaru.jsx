/**
 * DARURAT: Buat akun admin baru
 * Hapus route ini dari App.jsx setelah berhasil masuk.
 * Secret: RESET-ASSESIN-2024
 */
import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

const SECRET = 'RESET-ASSESIN-2024'

export default function AdminBaru() {
  const navigate = useNavigate()
  const [secret,   setSecret]   = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [msg,      setMsg]      = useState(null) // { ok: bool, text: string }
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg(null)

    if (secret !== SECRET) { setMsg({ ok: false, text: 'Secret key salah.' }); return }
    if (password.length < 8) { setMsg({ ok: false, text: 'Password minimal 8 karakter.' }); return }

    setLoading(true)

    // Daftar akun baru
    const { error: signUpErr } = await supabase.auth.signUp({ email, password })
    if (signUpErr) {
      setMsg({ ok: false, text: 'Gagal daftar: ' + signUpErr.message })
      setLoading(false)
      return
    }

    // Langsung coba login
    const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password })
    if (loginErr) {
      // Kemungkinan perlu konfirmasi email dulu
      setMsg({
        ok: true,
        text: `Akun dibuat! Tapi perlu konfirmasi email dulu.\n\nCek inbox ${email} → klik link konfirmasi → balik ke /login dan login dengan:\nEmail: ${email}\nPassword: yang tadi diisi`,
      })
      setLoading(false)
      return
    }

    // Langsung masuk
    setMsg({ ok: true, text: 'Berhasil! Masuk ke dashboard...' })
    setTimeout(() => navigate('/dashboard'), 1500)
    setLoading(false)
  }

  const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>Darurat</p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', color: 'var(--text)' }}>Buat Admin Baru</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>Hapus route ini setelah berhasil masuk</p>
        </div>

        <div className="dark-card" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={S_LABEL}>Secret Key</label>
              <input className="field" type="password" value={secret} onChange={e => setSecret(e.target.value)} placeholder="••••••••••••" autoComplete="off" />
            </div>
            <div>
              <label style={S_LABEL}>Email Admin Baru</label>
              <input className="field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@email.com" />
            </div>
            <div>
              <label style={S_LABEL}>Password Baru (min 8 karakter)</label>
              <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
            </div>

            {msg && (
              <div style={{ background: msg.ok ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)', border: `1px solid ${msg.ok ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`, borderRadius: '10px', padding: '14px 16px' }}>
                <p style={{ color: msg.ok ? '#4ade80' : '#f87171', fontSize: '13px', lineHeight: '1.7', whiteSpace: 'pre-line' }}>{msg.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
            >
              {loading ? 'Memproses...' : 'Buat & Masuk Sekarang →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
