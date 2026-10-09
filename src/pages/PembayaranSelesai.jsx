import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { NAMA_TES } from '../config/pricing'
import { RUTE_TES, sesiTertunda } from '../kemampuan/sesiBayar'

export default function PembayaranSelesai() {
  const navigate = useNavigate()
  // Tes kemampuan dibayar di awal: bila ada tes yang belum dikerjakan,
  // arahkan peserta ke sana, bukan ke beranda.
  const [tesTertunda] = sesiTertunda()

  useEffect(() => {
    if (tesTertunda) return
    // Auto redirect ke beranda setelah 8 detik
    const t = setTimeout(() => navigate('/'), 8000)
    return () => clearTimeout(t)
  }, [navigate, tesTertunda])

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

        <h1 style={{ fontFamily: 'inherit', fontWeight: 700, fontSize: '24px', color: 'var(--text)', marginBottom: '12px' }}>
          Pembayaran Berhasil!
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', marginBottom: '32px' }}>
          {tesTertunda
            ? `Pembayaran ${NAMA_TES[tesTertunda]} diterima. Silakan lanjutkan untuk mulai mengerjakan tes.`
            : 'Laporan lengkap Anda sudah terbuka. Silakan kembali ke halaman hasil tes untuk mengakses laporan Anda.'}
        </p>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--accent-border)', borderRadius: '12px', padding: '16px 20px', marginBottom: '28px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.65' }}>
            {tesTertunda ? (
              <>Tombol mulai tes muncul setelah pembayaran tercatat, biasanya dalam beberapa detik. Pembayaran berlaku untuk satu kali tes. Butuh bantuan? Hubungi{' '}</>
            ) : (
              <>
                Jika laporan belum terbuka, coba segarkan halaman hasil tes Anda. Halaman hasil sudah tertutup?
                Buka lagi lewat{' '}
                <Link to="/laporan-saya" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Laporan saya</Link>
                {' '}dengan email yang Anda pakai saat tes. Butuh bantuan? Hubungi{' '}
              </>
            )}
            <a href="mailto:psikologikantor@proton.me" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              psikologikantor@proton.me
            </a>
          </p>
        </div>

        {tesTertunda && (
          <button className="btn-cta block" style={{ width: '100%', marginBottom: '12px' }} onClick={() => navigate(RUTE_TES[tesTertunda])}>
            Lanjutkan ke {NAMA_TES[tesTertunda]} <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        )}

        <button
          onClick={() => navigate('/')}
          style={{ background: 'var(--accent)', color: 'var(--on-accent)', fontFamily: 'inherit', fontWeight: 700, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 40px', borderRadius: '10px', border: 'none', cursor: 'pointer', width: '100%' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          ← Kembali ke Beranda
        </button>

        {!tesTertunda && (
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '16px' }}>
            Otomatis redirect dalam beberapa detik...
          </p>
        )}

      </div>
    </div>
  )
}
