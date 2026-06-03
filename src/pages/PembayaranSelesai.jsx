import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

export default function PembayaranSelesai() {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto redirect ke beranda setelah 8 detik
    const t = setTimeout(() => navigate('/'), 8000)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '440px', width: '100%' }}>

        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <Logo size="sm" dark />
        </div>

        {/* Icon */}
        <div style={{ width: '72px', height: '72px', borderRadius: '99px', background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '32px' }}>
          ✅
        </div>

        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
          Pembayaran Berhasil!
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', marginBottom: '32px' }}>
          Laporan lengkap Anda sudah terbuka. Silakan kembali ke halaman hasil tes untuk mengakses laporan Anda.
        </p>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--accent-border)', borderRadius: '12px', padding: '16px 20px', marginBottom: '28px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.65' }}>
            Jika laporan belum terbuka, coba segarkan halaman hasil tes Anda.
            Butuh bantuan? Hubungi{' '}
            <a href="mailto:pengembangan.brian@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              pengembangan.brian@gmail.com
            </a>
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 40px', borderRadius: '10px', border: 'none', cursor: 'pointer', width: '100%' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          ← Kembali ke Beranda
        </button>

        <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '16px' }}>
          Otomatis redirect dalam beberapa detik...
        </p>

      </div>
    </div>
  )
}
