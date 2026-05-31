import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate, useLocation } from 'react-router-dom'
import Logo from '../components/Logo'

const LABEL_STYLE = {
  display: 'block',
  fontFamily: 'Syne, sans-serif',
  fontWeight: 700,
  fontSize: '10px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '8px',
}

const GOLD_BTN = {
  background: 'var(--accent)',
  color: '#09090f',
  fontFamily: 'Syne, sans-serif',
  fontWeight: 800,
  fontSize: '12px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  padding: '14px',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer',
  width: '100%',
  marginTop: '4px',
}

export default function Login() {
  const [view,     setView]     = useState('login')  // 'login' | 'forgot'
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [info,     setInfo]     = useState('')
  const [loading,  setLoading]  = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.successMessage ?? ''

  /* ── Login ── */
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email atau password salah. Silakan coba lagi.')
    else navigate('/dashboard')
    setLoading(false)
  }

  /* ── Forgot password — kirim email dengan redirectTo yang benar ── */
  const handleForgot = async (e) => {
    e.preventDefault()
    if (!email.trim()) { setError('Masukkan email terlebih dahulu.'); return }
    setLoading(true)
    setError('')
    setInfo('')

    const redirectTo = `${window.location.origin}/reset-password`
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo })

    if (error) {
      setError('Gagal mengirim email: ' + error.message)
    } else {
      setInfo(`Email reset password dikirim ke ${email}.\nKlik link di email untuk membuat password baru.\n\nLink akan mengarah ke /reset-password (bukan homepage).`)
    }
    setLoading(false)
  }

  const switchView = (v) => { setView(v); setError(''); setInfo('') }

  /* ── Shared banners ── */
  const Banner = ({ msg, color, bg, border }) => msg ? (
    <div style={{ border: `1px solid ${border}`, background: bg, borderRadius: '10px', padding: '12px 16px', marginBottom: '20px' }}>
      <p style={{ color, fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-line' }}>{msg}</p>
    </div>
  ) : null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      {/* Background */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Logo size="md" dark />
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.24em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '18px', marginBottom: '6px' }}>
            Assess · Insight · Grow
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.04em' }}>
            Portal Administrasi
          </p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '36px' }}>

          {view === 'login' ? (
            <>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '22px', color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: '6px' }}>
                Selamat Datang
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '28px', lineHeight: '1.5' }}>
                Masuk ke panel administrasi data tes
              </p>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)', marginBottom: '28px', opacity: 0.7 }} />

              <Banner msg={successMessage} color="var(--accent)" bg="rgba(212,168,83,0.08)" border="rgba(212,168,83,0.3)" />
              <Banner msg={error}          color="#f87171"        bg="rgba(239,68,68,0.06)"  border="rgba(239,68,68,0.25)" />

              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={LABEL_STYLE}>Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="field" placeholder="email@domain.com" required />
                </div>
                <div>
                  <label style={LABEL_STYLE}>Password</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="field" placeholder="••••••••" required />
                </div>

                <button type="submit" disabled={loading} style={{ ...GOLD_BTN, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard →'}
                </button>
              </form>

              <button
                onClick={() => switchView('forgot')}
                style={{ display: 'block', margin: '16px auto 0', color: 'var(--text-muted)', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Lupa password?
              </button>
            </>
          ) : (
            <>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '20px', color: 'var(--text)', marginBottom: '6px' }}>
                Lupa Password
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '28px', lineHeight: '1.5' }}>
                Masukkan email admin. Link reset password akan dikirim ke inbox kamu dan langsung mengarah ke halaman /reset-password.
              </p>
              <div style={{ width: '32px', height: '2px', background: 'var(--accent)', marginBottom: '28px', opacity: 0.7 }} />

              <Banner msg={error} color="#f87171"        bg="rgba(239,68,68,0.06)"  border="rgba(239,68,68,0.25)" />
              <Banner msg={info}  color="var(--accent)"  bg="rgba(212,168,83,0.08)" border="rgba(212,168,83,0.3)" />

              <form onSubmit={handleForgot} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={LABEL_STYLE}>Email Admin</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="field" placeholder="email@domain.com" autoFocus />
                </div>

                <button type="submit" disabled={loading} style={{ ...GOLD_BTN, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? 'Mengirim...' : 'Kirim Link Reset Password →'}
                </button>
              </form>

              <button
                onClick={() => switchView('login')}
                style={{ display: 'block', margin: '16px auto 0', color: 'var(--text-muted)', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ← Kembali ke Login
              </button>
            </>
          )}

          <div style={{ borderTop: '1px solid var(--border)', marginTop: '24px', paddingTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => navigate('/')}
              style={{ color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ← Kembali ke Halaman Tes
            </button>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '11px', opacity: 0.4, textAlign: 'center', marginTop: '24px', letterSpacing: '0.06em' }}>
          © 2026 · AssesIN
        </p>
      </div>
    </div>
  )
}
