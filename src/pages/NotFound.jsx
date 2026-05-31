import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

      <div className="anim-up" style={{ textAlign: 'center', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
        <p style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(96px, 18vw, 140px)',
          color: 'var(--text)',
          opacity: 0.035,
          lineHeight: 1,
          letterSpacing: '-0.06em',
          userSelect: 'none',
          marginBottom: '-16px',
        }}>
          404
        </p>

        <div style={{ width: '24px', height: '2px', background: 'var(--accent)', margin: '0 auto 20px', opacity: 0.7 }} />

        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          color: 'var(--text)',
          fontSize: '20px',
          marginBottom: '12px',
          letterSpacing: '-0.01em',
        }}>
          Halaman Tidak Ditemukan
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '36px', lineHeight: '1.65' }}>
          Halaman yang Anda cari tidak ada atau sudah dipindahkan.
          Silakan kembali ke beranda.
        </p>

        <button
          onClick={() => navigate('/')}
          style={{
            background: 'var(--accent)',
            color: '#09090f',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: '12px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '12px 28px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
        >
          ← Kembali ke Beranda
        </button>
      </div>

      <p style={{ color: 'var(--text-muted)', fontSize: '11px', opacity: 0.35, marginTop: '56px', letterSpacing: '0.08em' }}>
        © 2026 · AssesIN
      </p>
    </div>
  )
}
