/**
 * EMERGENCY ADMIN PASSWORD RESET
 * Protected by secret key. Disables itself (localStorage flag) after one use.
 * REMOVE this route from App.jsx after resetting.
 *
 * Requires VITE_SUPABASE_SERVICE_KEY in .env.local (service_role key from
 * Supabase Dashboard → Settings → API → service_role).
 *
 * Secret: RESET-ASSESIN-2024
 */
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

const SECRET       = 'RESET-ASSESIN-2024'
const DISABLED_KEY = '__admin_reset_done__'

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '13px', marginTop: '8px', lineHeight: '1.5' }
const S_OK    = { color: '#4ade80', fontSize: '13px', marginTop: '8px', lineHeight: '1.5' }

export default function AdminReset() {
  const navigate = useNavigate()

  const [secretKey,  setSecretKey]  = useState('')
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [confirm,    setConfirm]    = useState('')
  const [message,    setMessage]    = useState(null)  // { type: 'error'|'ok', text }
  const [loading,    setLoading]    = useState(false)
  const [alreadyUsed, setAlreadyUsed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISABLED_KEY)) setAlreadyUsed(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (secretKey !== SECRET) {
      setMessage({ type: 'error', text: 'Secret key salah.' })
      return
    }
    if (!email.includes('@')) {
      setMessage({ type: 'error', text: 'Email tidak valid.' })
      return
    }
    if (password.length < 8) {
      setMessage({ type: 'error', text: 'Password minimal 8 karakter.' })
      return
    }
    if (password !== confirm) {
      setMessage({ type: 'error', text: 'Konfirmasi password tidak cocok.' })
      return
    }

    const serviceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY
    if (!serviceKey) {
      setMessage({
        type: 'error',
        text: 'VITE_SUPABASE_SERVICE_KEY tidak ditemukan di .env.local\n\nCara menambahkan:\n1. Buka Supabase Dashboard → Settings → API\n2. Copy "service_role" key\n3. Buat file .env.local di root project\n4. Isi: VITE_SUPABASE_SERVICE_KEY=eyJ...\n5. Restart dev server (npm run dev)',
      })
      return
    }

    setLoading(true)
    try {
      const admin = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        serviceKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      )

      // Find user by email
      const { data: { users }, error: listErr } = await admin.auth.admin.listUsers({ perPage: 1000 })
      if (listErr) throw listErr

      const user = users.find(u => u.email?.toLowerCase() === email.toLowerCase())
      if (!user) throw new Error(`User "${email}" tidak ditemukan di Supabase Auth.`)

      // Update password
      const { error: updateErr } = await admin.auth.admin.updateUserById(user.id, { password })
      if (updateErr) throw updateErr

      // Disable page
      localStorage.setItem(DISABLED_KEY, '1')
      setAlreadyUsed(true)
      setMessage({
        type: 'ok',
        text: `Password untuk ${email} berhasil diubah.\nHalaman ini sekarang dinonaktifkan.\nRedirect ke login dalam 3 detik...`,
      })
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setLoading(false)
    }
  }

  /* ── Already used ── */
  if (alreadyUsed && !message?.type === 'ok') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="dark-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '420px', width: '100%' }}>
          <p style={{ color: '#f87171', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
            Halaman ini sudah digunakan dan tidak bisa diakses lagi.<br />
            Silakan hapus route /admin-reset dari App.jsx.
          </p>
          <button onClick={() => navigate('/login')} style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Ke Login
          </button>
        </div>
      </div>
    )
  }

  /* ── Form ── */
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: '#f87171', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>
            Emergency Access
          </p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', color: 'var(--text)', marginBottom: '4px' }}>Admin Password Reset</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Satu kali pakai · Hapus route setelah digunakan</p>
        </div>

        <div className="dark-card" style={{ padding: '32px', borderColor: 'rgba(248,113,113,0.25)' }}>
          <div className="section-rule" style={{ marginBottom: '28px' }}>
            <span className="section-rule-pip" style={{ background: '#f87171' }} />
            <span className="section-rule-label">Reset Password</span>
            <span className="section-rule-line" />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={S_LABEL}>Secret Key <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" type="password" value={secretKey} onChange={e => setSecretKey(e.target.value)} placeholder="••••••••••••••••••" autoComplete="off" />
            </div>
            <div>
              <label style={S_LABEL}>Email Admin <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@email.com" autoComplete="off" />
            </div>
            <div>
              <label style={S_LABEL}>Password Baru <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimal 8 karakter" autoComplete="new-password" />
            </div>
            <div>
              <label style={S_LABEL}>Konfirmasi Password <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Ulangi password baru" autoComplete="new-password" />
            </div>

            {message && (
              <p style={{ ...(message.type === 'error' ? S_ERR : S_OK), whiteSpace: 'pre-line' }}>
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || alreadyUsed}
              style={{ background: '#ef4444', color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px', borderRadius: '10px', border: 'none', cursor: loading || alreadyUsed ? 'not-allowed' : 'pointer', opacity: loading || alreadyUsed ? 0.5 : 1, marginTop: '4px' }}
            >
              {loading ? 'Memproses...' : 'Reset Password Sekarang'}
            </button>
          </form>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '11px', textAlign: 'center', marginTop: '16px', lineHeight: '1.6', opacity: 0.5 }}>
          Halaman ini akan otomatis dinonaktifkan setelah berhasil digunakan.<br />
          Hapus route /admin-reset dari App.jsx setelah selesai.
        </p>
      </div>
    </div>
  )
}
