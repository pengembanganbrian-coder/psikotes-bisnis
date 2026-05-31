import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Login() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email atau password salah. Silakan coba lagi.')
    else navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      {/* Background geometry */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>

        {/* Logo block */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Logo size="md" dark />
          <p style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '10px',
            letterSpacing: '0.24em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            marginTop: '18px',
            marginBottom: '6px',
          }}>
            Assess · Insight · Grow
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.04em' }}>
            Portal Administrasi
          </p>
        </div>

        {/* Form card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '36px',
        }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '22px',
            color: 'var(--text)',
            letterSpacing: '-0.01em',
            marginBottom: '6px',
          }}>
            Selamat Datang
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '28px', lineHeight: '1.5' }}>
            Masuk ke panel administrasi data tes
          </p>

          {/* Divider under heading */}
          <div style={{ width: '32px', height: '2px', background: 'var(--accent)', marginBottom: '28px', opacity: 0.7 }} />

          {error && (
            <div style={{
              border: '1px solid rgba(239,68,68,0.25)',
              background: 'rgba(239,68,68,0.06)',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '20px',
            }}>
              <p style={{ color: '#f87171', fontSize: '13px', lineHeight: '1.5' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
                placeholder="email@domain.com"
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '10px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '8px',
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'var(--surface-2)' : 'var(--accent)',
                color:      loading ? 'var(--text-muted)' : '#09090f',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '14px',
                borderRadius: '10px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s, background 0.2s',
                width: '100%',
                marginTop: '4px',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              {loading ? 'Memverifikasi...' : 'Masuk ke Dashboard →'}
            </button>
          </form>

          <div style={{ borderTop: '1px solid var(--border)', marginTop: '24px', paddingTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => navigate('/')}
              style={{ color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-sub)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
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
