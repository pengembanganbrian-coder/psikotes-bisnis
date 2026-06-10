import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const KONTAK = {
  email:   'admin@assesin.net',
  telepon: '087872150877',
  alamat:  'Jl. Kramat Asem Raya No. 3 RT 5 RW 12, Utan Kayu Selatan, Kec. Matraman, Jakarta Timur',
}

export default function Kontak() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>

      {/* ── Navbar ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(9,9,15,0.82)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        padding: '0 var(--px)',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo size="sm" dark />
          </Link>
          <Link to="/" style={{
            color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.06em',
            textDecoration: 'none', border: '1px solid var(--border)',
            padding: '7px 18px', borderRadius: '99px',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-border)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            ← Kembali
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: '64px var(--px) 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          <div className="section-rule anim-up">
            <span className="section-rule-pip" />
            <span className="section-rule-label">Kontak & Dukungan</span>
            <span className="section-rule-line" />
          </div>

          <h1 className="anim-up" style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1,
            letterSpacing: '-0.025em', color: 'var(--text)',
            marginBottom: '16px',
          }}>
            Hubungi Kami
          </h1>
          <p className="anim-up" style={{
            color: 'var(--text-sub)', fontSize: '16px', lineHeight: 1.75,
            maxWidth: '480px', marginBottom: '48px',
          }}>
            Ada pertanyaan tentang tes atau laporan? Tim admin AssesIN siap membantu Anda.
          </p>

          {/* ── Kartu Kontak ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', maxWidth: '900px' }}>

            {/* Email */}
            <a href={`mailto:${KONTAK.email}`} style={{ textDecoration: 'none' }}>
              <div className="dark-card anim-up" style={{
                padding: '32px 28px', cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '40px', height: '40px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '16px' }}>
                  ✉
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Email Admin
                </p>
                <p style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>
                  {KONTAK.email}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  Balas dalam 1×24 jam kerja
                </p>
              </div>
            </a>

            {/* Telepon / WhatsApp */}
            <a href={`tel:${KONTAK.telepon}`} style={{ textDecoration: 'none' }}>
              <div className="dark-card anim-up" style={{
                padding: '32px 28px', cursor: 'pointer',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '40px', height: '40px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '16px' }}>
                  ☎
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Telepon Admin
                </p>
                <p style={{ color: 'var(--accent)', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>
                  {KONTAK.telepon}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                  Senin – Jumat, 09.00 – 17.00 WIB
                </p>
              </div>
            </a>

            {/* Alamat */}
            <div className="dark-card anim-up" style={{ padding: '32px 28px' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', marginBottom: '16px' }}>
                📍
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Alamat Usaha
              </p>
              <p style={{ color: 'var(--text)', fontSize: '14px', lineHeight: 1.7 }}>
                {KONTAK.alamat}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', padding: '28px var(--px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>© 2026 AssesIN. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >Kebijakan Privasi</Link>
            <Link to="/terms" style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >Syarat & Ketentuan</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
