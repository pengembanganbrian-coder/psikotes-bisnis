import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../supabase'
import Logo from '../components/Logo'

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

export default function ResetPassword() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [ready,     setReady]     = useState(false)
  const [initError, setInitError] = useState('')

  useEffect(() => {
    async function initSession() {
      // Tokens passed via navigate state (from Home redirect)
      const state = location.state
      if (state?.access_token) {
        const { error } = await supabase.auth.setSession({
          access_token:  state.access_token,
          refresh_token: state.refresh_token ?? '',
        })
        if (error) {
          setInitError('Link reset password tidak valid atau sudah kadaluarsa. Silakan minta link baru.')
        } else {
          setReady(true)
        }
        return
      }

      // Fallback: tokens in hash (if Supabase redirects directly to /reset-password)
      const hash = window.location.hash
      if (hash.includes('access_token')) {
        const params = new URLSearchParams(hash.slice(1))
        const access_token  = params.get('access_token')
        const refresh_token = params.get('refresh_token') ?? ''
        if (access_token) {
          const { error } = await supabase.auth.setSession({ access_token, refresh_token })
          if (error) {
            setInitError('Link reset password tidak valid atau sudah kadaluarsa. Silakan minta link baru.')
          } else {
            setReady(true)
          }
          return
        }
      }

      setInitError('Link reset password tidak valid. Silakan minta link baru dari halaman login.')
    }

    initSession()
  }, [location.state])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password minimal 8 karakter.')
      return
    }
    if (password !== confirm) {
      setError('Konfirmasi password tidak cocok.')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (error) {
      setError('Gagal mengubah password. Coba minta link reset baru.')
      return
    }

    await supabase.auth.signOut()
    navigate('/login', { replace: true, state: { successMessage: 'Password berhasil diubah. Silakan login.' } })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      {/* Background */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>

        {/* Logo block */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Logo size="md" dark />
          <p style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: '10px', letterSpacing: '0.24em',
            color: 'var(--accent)', textTransform: 'uppercase',
            marginTop: '18px', marginBottom: '6px',
          }}>
            Assess · Insight · Grow
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.04em' }}>
            Reset Password
          </p>
        </div>

        {/* Error state: invalid/expired link */}
        {initError ? (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
            <p style={{ color: '#f87171', fontSize: '14px', lineHeight: '1.65', marginBottom: '24px' }}>
              {initError}
            </p>
            <button
              onClick={() => navigate('/login')}
              style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Kembali ke Login
            </button>
          </div>
        ) : (
          /* Form card */
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px' }}>

            <div className="section-rule" style={{ marginBottom: '28px' }}>
              <span className="section-rule-pip" />
              <span className="section-rule-label">Buat Password Baru</span>
              <span className="section-rule-line" />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <div>
                <label style={S_LABEL}>Password Baru</label>
                <input
                  className="field"
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="Minimal 8 karakter"
                  autoComplete="new-password"
                  disabled={!ready}
                />
              </div>

              <div>
                <label style={S_LABEL}>Konfirmasi Password</label>
                <input
                  className="field"
                  type="password"
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setError('') }}
                  placeholder="Ulangi password baru"
                  autoComplete="new-password"
                  disabled={!ready}
                />
              </div>

              {error && <p style={S_ERR}>{error}</p>}

              <button
                type="submit"
                disabled={loading || !ready}
                style={{
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
                  cursor: loading || !ready ? 'not-allowed' : 'pointer',
                  opacity: loading || !ready ? 0.6 : 1,
                  marginTop: '4px',
                }}
              >
                {loading ? 'Menyimpan...' : 'Simpan Password Baru'}
              </button>

            </form>
          </div>
        )}

        <button
          onClick={() => navigate('/login')}
          style={{ display: 'block', margin: '20px auto 0', color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Kembali ke Login
        </button>
      </div>
    </div>
  )
}
