import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../supabase'
import Logo from '../components/Logo'

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

export default function ResetPassword() {
  const navigate  = useNavigate()
  useLocation()

  const [password,  setPassword]  = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [status,    setStatus]    = useState('checking') // 'checking' | 'ready' | 'invalid'

  useEffect(() => {
    let resolved = false

    const resolve = (ready) => {
      if (resolved) return
      resolved = true
      setStatus(ready ? 'ready' : 'invalid')
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        resolve(true)
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (resolved) return
      if (session) resolve(true)
    })

    const hash = window.location.hash
    if (hash.includes('access_token')) {
      const params       = new URLSearchParams(hash.slice(1))
      const accessToken  = params.get('access_token')
      const refreshToken = params.get('refresh_token') ?? ''
      const type         = params.get('type')

      if (accessToken && type === 'recovery') {
        supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
          .then(({ data, error: sessErr }) => {
            if (!resolved) resolve(!sessErr && !!data?.session)
          })
      }
    }

    const timer = setTimeout(() => resolve(false), 4000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (updateError) {
      setError('Gagal mengubah password: ' + updateError.message)
      return
    }

    await supabase.auth.signOut()
    navigate('/login', {
      replace: true,
      state: { successMessage: 'Password berhasil diubah. Silakan login.' },
    })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      {/* Background */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
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
            Reset Password
          </p>
        </div>

        {/* Checking state */}
        {status === 'checking' && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Memverifikasi link...</p>
          </div>
        )}

        {/* Invalid/expired link */}
        {status === 'invalid' && (
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '32px', textAlign: 'center' }}>
            <p style={{ color: '#f87171', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
              Link reset password tidak valid atau sudah kadaluarsa.<br />
              Silakan minta link reset password baru.
            </p>
            <button
              onClick={() => navigate('/login')}
              style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
            >
              Kembali ke Login
            </button>
          </div>
        )}

        {/* Form */}
        {status === 'ready' && (
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
                  autoFocus
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
                />
              </div>

              {error && <p style={S_ERR}>{error}</p>}

              <button
                type="submit"
                disabled={loading}
                style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, marginTop: '4px' }}
              >
                {loading ? 'Menyimpan...' : 'Simpan Password Baru →'}
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
