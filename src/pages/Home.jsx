import { useNavigate, Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { HARGA_TES, formatRupiah } from '../config/pricing'

const TESTS = [
  {
    id: 'MBTI',
    route: '/tes',
    abbr: 'MBTI',
    full: 'Tes Kepribadian MBTI',
    desc: 'Myers-Briggs Type Indicator · 16 tipe kepribadian',
    tags: ['60 soal', '~15 menit', 'E · I · S · N · T · F · J · P'],
  },
  {
    id: 'DISC',
    route: '/tes-disc',
    abbr: 'DISC',
    full: 'Tes Kepribadian DISC',
    desc: 'Dominance · Influence · Steadiness · Conscientiousness',
    tags: ['24 soal', '~7 menit', 'D · I · S · C'],
  },
  {
    id: 'PAPI',
    route: '/tes-papi',
    abbr: 'PAPI',
    full: 'Tes PAPI Kostick',
    desc: 'Personality and Preference Inventory · 20 skala',
    tags: ['90 pasangan soal', '~20 menit'],
  },
  {
    id: 'DASS',
    route: '/tes-dass',
    abbr: 'DASS',
    full: 'Tes DASS-21',
    desc: 'Depression · Anxiety · Stress Scales',
    tags: ['21 pernyataan', '~5 menit', 'D · A · S'],
  },
  {
    id: 'MSDT',
    route: '/tes-msdt',
    abbr: 'MSDT',
    full: 'Tes Gaya Manajemen MSDT',
    desc: 'Management Style Diagnostic Test · 8 gaya kepemimpinan',
    tags: ['64 soal', '~20 menit', '8 gaya'],
  },
  {
    id: 'Love Language',
    route: '/tes-love-language',
    abbr: 'LOVE',
    full: 'Tes Love Language',
    desc: 'Bahasa Kasih · Gaya Apresiasi & Motivasi',
    tags: ['30 pasangan', '~8 menit', 'W · Q · G · A · P'],
  },
]

const EMAIL_KONTAK  = 'admin@assesin.net'
const TELEPON_ADMIN = '(Admin) 087872150877'
const ALAMAT_USAHA  = 'Jl. Kramat Asem Raya No. 3 RT 5 RW 12, Utan Kayu Selatan, Kec. Matraman, Jakarta Timur'

export default function Home() {
  const navigate = useNavigate()

  // Supabase auto-parses #access_token&type=recovery on load and fires PASSWORD_RECOVERY
  // via onAuthStateChange — the global AuthListener in App.jsx handles the redirect.
  // Nothing to do here for the recovery flow.

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Background layers ── */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-15%', left: '50%', transform: 'translateX(-50%)',
          width: '900px', height: '500px',
          background: 'radial-gradient(ellipse at center top, rgba(212,168,83,0.08) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20%', right: '-10%',
          width: '700px', height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(20,20,60,0.6) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse 90% 55% at 50% 0%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 55% at 50% 0%, black 0%, transparent 100%)',
        }} />
      </div>

      {/* ── Navbar ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        borderBottom: '1px solid var(--border)',
        background: 'rgba(9,9,15,0.82)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        padding: '0 var(--px)',
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Logo size="sm" dark />
            <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }} className="hidden md:flex">
              {['6 Instrumen Terstandar', 'Mulai Gratis', 'Hasil Instan', 'Data Aman'].map((label) => (
                <span key={label} style={{ color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.08em' }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <Link
            to="/kontak"
            style={{
              color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.06em',
              textDecoration: 'none', border: '1px solid var(--border)',
              padding: '7px 18px', borderRadius: '99px', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-border)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            Kontak
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: '80px var(--px) 64px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', textAlign: 'center' }}>

          <p className="anim-up" style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 700,
            fontSize: '10px', letterSpacing: '0.26em',
            color: 'var(--accent)', textTransform: 'uppercase',
            marginBottom: '24px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
          }}>
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
            Assess · Insight · Grow
            <span style={{ width: '20px', height: '1px', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
          </p>

          <h1 className="anim-up anim-delay-hero" style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: 'clamp(44px, 7vw, 82px)',
            lineHeight: 1.0, letterSpacing: '-0.025em',
            marginBottom: '28px',
          }}>
            <span style={{ color: 'var(--text)', display: 'block' }}>Asesmen</span>
            <span className="gold-shimmer" style={{ display: 'block' }}>Psikologi</span>
            <span style={{ color: 'var(--text)', display: 'block' }}>Digital.</span>
          </h1>

          <p className="anim-up anim-delay-sub" style={{
            color: 'var(--text-sub)', fontSize: '16px', lineHeight: 1.75,
            maxWidth: '520px', margin: '0 auto 36px',
          }}>
            Platform asesmen psikologi berbasis web untuk pemetaan potensi dan kepribadian individu maupun organisasi.
          </p>

          <div className="anim-up anim-delay-badges"
               style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {['6 Instrumen Terstandar', 'Mulai Gratis', 'Hasil Otomatis & Instan', 'Data Peserta Terlindungi'].map((label) => (
              <span key={label} style={{
                border: '1px solid var(--border)', color: 'var(--text-sub)',
                fontSize: '14px', letterSpacing: '0.03em',
                padding: '9px 20px', borderRadius: '99px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
              }}>
                <span style={{ width: 5, height: 5, background: 'var(--accent)', borderRadius: '50%', flexShrink: 0, opacity: 0.8 }} />
                {label}
              </span>
            ))}
          </div>

          <div className="anim-up" style={{ marginTop: '36px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { const el = document.getElementById('instrumen'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}
              style={{
                background: 'var(--accent)', color: '#09090f',
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '14px 36px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              }}
            >
              Mulai Tes Sekarang →
            </button>
          </div>

        </div>
      </section>

      {/* ── Instruments ── */}
      <section id="instrumen" style={{ padding: '0 var(--px) 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          <div className="section-rule anim-up anim-delay-section">
            <span className="section-rule-pip" />
            <span className="section-rule-label">Instrumen Asesmen</span>
            <span className="section-rule-line" />
          </div>

          <div className="cards-grid">
            {TESTS.map((test, idx) => (
              <button
                key={test.id}
                onClick={() => navigate(test.route)}
                className={`card-test anim-up anim-delay-${idx + 1}`}
                style={{ textAlign: 'left', padding: '36px', width: '100%' }}
              >
                {/* Card header */}
                <div style={{ marginBottom: '20px' }}>
                  <p style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: '10px', letterSpacing: '0.18em',
                    color: 'var(--accent)', textTransform: 'uppercase',
                    marginBottom: '6px', opacity: 0.7,
                  }}>
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 800,
                    fontSize: '34px', color: 'var(--text)',
                    letterSpacing: '-0.02em', lineHeight: 1,
                  }}>
                    {test.abbr}
                  </span>
                </div>

                <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '17px', marginBottom: '8px' }}>
                  {test.full}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.6', marginBottom: '20px' }}>
                  {test.desc}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                  {test.tags.map((tag) => (
                    <span key={tag} style={{
                      border: '1px solid var(--border)', color: 'var(--text-sub)',
                      fontSize: '15px', letterSpacing: '0.02em',
                      padding: '8px 16px', borderRadius: '99px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Harga laporan */}
                <div style={{
                  background: 'rgba(212,168,83,0.06)', border: '1px solid rgba(212,168,83,0.15)',
                  borderRadius: '10px', padding: '12px 16px', marginBottom: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '2px' }}>Laporan Lengkap</p>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', color: 'var(--accent)', lineHeight: 1 }}>
                      {formatRupiah(HARGA_TES[test.id])}
                    </p>
                  </div>
                  <span style={{
                    background: 'rgba(212,168,83,0.12)', border: '1px solid rgba(212,168,83,0.2)',
                    color: 'var(--accent)', fontSize: '10px', fontFamily: 'Syne, sans-serif',
                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '5px 12px', borderRadius: '99px',
                  }}>
                    Tes Gratis
                  </span>
                </div>

                <div style={{
                  borderTop: '1px solid var(--border)', paddingTop: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: '12px', letterSpacing: '0.12em',
                    color: 'var(--accent)', textTransform: 'uppercase',
                  }}>
                    <span className="card-cta-arrow">Mulai Tes →</span>
                  </span>
                  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="17" cy="17" r="16.5" stroke="var(--accent-border)" />
                    <path d="M13 17h8M18 14l3 3-3 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ── Why AssesIN ── */}
      <section style={{
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        padding: '72px var(--px)', position: 'relative', zIndex: 1,
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          <div className="section-rule">
            <span className="section-rule-pip" />
            <span className="section-rule-label">Mengapa AssesIN</span>
            <span className="section-rule-line" />
          </div>

          <div className="features-grid">
            {[
              { num: '01', title: 'Terstandar & Terpercaya', body: 'Instrumen psikologi tervalidasi yang digunakan oleh profesional HRD di seluruh dunia.' },
              { num: '02', title: 'Mudah Diakses',           body: 'Berbasis web, bisa dikerjakan dari laptop, tablet, maupun smartphone tanpa instalasi.' },
              { num: '03', title: 'Laporan Komprehensif',    body: 'Hasil analisis mendalam dengan skor, interpretasi, dan visualisasi yang mudah dipahami.' },
            ].map((f) => (
              <div key={f.num}>
                <p style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '56px',
                  color: 'var(--accent)', opacity: 0.18, lineHeight: 1,
                  marginBottom: '16px', letterSpacing: '-0.03em',
                }}>
                  {f.num}
                </p>
                <h4 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '15px', marginBottom: '10px' }}>
                  {f.title}
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.75' }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Disclaimer ── */}
      <div style={{ padding: '32px var(--px)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{
            border: '1px solid rgba(212,168,83,0.18)',
            background: 'rgba(212,168,83,0.04)',
            borderRadius: '12px', padding: '16px 24px', textAlign: 'center',
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.65' }}>
              Hasil tes bersifat <strong style={{ color: 'var(--text-sub)', fontWeight: 600 }}>rahasia</strong> dan digunakan
              untuk kepentingan pengembangan diri dan profesional Anda. Kerjakan dengan jujur untuk hasil yang akurat.
            </p>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px var(--px) 32px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>
            {/* Brand */}
            <div style={{ maxWidth: '280px' }}>
              <Logo size="sm" dark />
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.7', marginTop: '12px' }}>
                Platform asesmen psikologi digital untuk pemetaan potensi dan kepribadian individu maupun organisasi.
              </p>
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <a href={`mailto:${EMAIL_KONTAK}`} style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <span style={{ opacity: 0.5 }}>✉</span> {EMAIL_KONTAK}
                </a>
                <a href="tel:087872150877" style={{ color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <span style={{ opacity: 0.5 }}>☎</span> {TELEPON_ADMIN}
                </a>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ opacity: 0.5, flexShrink: 0 }}>📍</span> {ALAMAT_USAHA}
                </p>
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>Layanan</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { label: 'Tes MBTI', to: '/tes' },
                    { label: 'Tes DISC', to: '/tes-disc' },
                    { label: 'Tes PAPI Kostick', to: '/tes-papi' },
                    { label: 'Tes DASS-21', to: '/tes-dass' },
                    { label: 'Tes Love Language', to: '/tes-love-language' },
                    { label: 'Tes MSDT', to: '/tes-msdt' },
                  ].map(l => (
                    <Link key={l.to} to={l.to} style={{ color: 'var(--text-muted)', fontSize: '13px', textDecoration: 'none' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                    >{l.label}</Link>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '14px' }}>Legal & Info</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', fontSize: '13px', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >Kebijakan Privasi</Link>
                  <Link to="/terms" style={{ color: 'var(--text-muted)', fontSize: '13px', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >Syarat & Ketentuan</Link>
                  <Link to="/kontak" style={{ color: 'var(--text-muted)', fontSize: '13px', textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >Kontak</Link>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
              © 2026 AssesIN. All rights reserved.
            </p>
          </div>

        </div>
      </footer>

    </div>
  )
}
