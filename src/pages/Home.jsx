import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Logo from '../components/Logo'
import { HARGA_TES, formatRupiah } from '../config/pricing'
import { TES_BARU } from '../tes-baru/definisi'

const TESTS = [
  {
    id: 'MBTI',
    route: '/tes',
    nama: 'MBTI',
    full: 'Tes Kepribadian MBTI',
    desc: '16 tipe kepribadian berdasarkan empat preferensi dasar.',
    meta: ['60 soal', '~15 menit'],
  },
  {
    id: 'DISC',
    route: '/tes-disc',
    nama: 'DISC',
    full: 'Tes Kepribadian DISC',
    desc: 'Gaya perilaku: Dominance, Influence, Steadiness, Conscientiousness.',
    meta: ['24 soal', '~7 menit'],
  },
  {
    id: 'PAPI',
    route: '/tes-papi',
    nama: 'PAPI Kostick',
    full: 'Tes PAPI Kostick',
    desc: 'Kebutuhan dan preferensi kerja dalam 20 skala.',
    meta: ['90 pasangan', '~20 menit'],
  },
  {
    id: 'DASS',
    route: '/tes-dass',
    nama: 'DASS-21',
    full: 'Tes DASS-21',
    desc: 'Skrining tingkat depresi, kecemasan, dan stres.',
    meta: ['21 pernyataan', '~5 menit'],
  },
  {
    id: 'MSDT',
    route: '/tes-msdt',
    nama: 'MSDT',
    full: 'Tes Gaya Manajemen MSDT',
    desc: 'Delapan gaya manajemen dan kepemimpinan.',
    meta: ['64 soal', '~20 menit'],
  },
  {
    id: 'Love Language',
    route: '/tes-love-language',
    nama: 'Love Language',
    full: 'Tes Love Language',
    desc: 'Cara Anda paling menghargai dan merasa dihargai.',
    meta: ['30 pasangan', '~8 menit'],
  },
  // Tes baru (beta) -- data dari tes-baru/definisi.js
  ...Object.values(TES_BARU).map(t => ({
    id: t.testType,
    route: t.route,
    nama: t.singkat,
    full: t.judul,
    desc: t.intro,
    meta: [`${t.soal.length} pernyataan`, t.durasi],
    beta: true,
  })),
]

const LANGKAH = [
  { judul: 'Pilih tes', isi: 'Tentukan tes yang sesuai kebutuhan Anda. Semua tes dapat dikerjakan gratis.' },
  { judul: 'Kerjakan online', isi: 'Isi data diri singkat, lalu jawab pernyataan dari laptop maupun ponsel.' },
  { judul: 'Lihat hasil', isi: 'Ringkasan hasil langsung tampil. Laporan lengkap dapat dibuka bila diperlukan.' },
]

const EMAIL_KONTAK  = 'psikologikantor@proton.me'
const ALAMAT_USAHA  = 'Jl. Kramat Asem Raya No. 3 RT 5 RW 12, Utan Kayu Selatan, Kec. Matraman, Jakarta Timur'

const BADGE_PERCAYA = [
  { ikon: '🔒', teks: 'Data & hasil 100% rahasia' },
  { ikon: '⚡', teks: 'Hasil ringkas tampil instan' },
  { ikon: '🎓', teks: 'Berbasis kerangka psikometri teruji' },
  { ikon: '💳', teks: 'Gratis dikerjakan, bayar hanya jika ingin laporan lengkap' },
]

const ALASAN = [
  {
    ikon: '🧭',
    judul: 'Kenali diri lebih dalam',
    isi: 'Bukan sekadar label kepribadian — tiap laporan menguraikan cara Anda bekerja, mengambil keputusan, dan berinteraksi, agar lebih mudah mengenali pola diri sendiri.',
  },
  {
    ikon: '🎯',
    judul: 'Tahu kekuatan & yang perlu dilatih',
    isi: 'Setiap hasil menunjukkan kekuatan sekaligus bagian yang masih bisa dikembangkan, lengkap dengan saran praktis — jadi Anda tahu dari mana sebaiknya mulai berlatih.',
  },
  {
    ikon: '🤝',
    judul: 'Cocok untuk berbagai kebutuhan',
    isi: 'Bisa dipakai untuk refleksi pribadi, latihan sebelum tes seleksi kerja (termasuk CPNS dan BUMN), persiapan wawancara, maupun kebutuhan HR dalam memahami gaya kerja tim.',
  },
]

const FAQ = [
  {
    q: 'Apakah tesnya benar-benar gratis?',
    a: 'Ya. Semua tes dapat dikerjakan penuh tanpa biaya, dan ringkasan hasil langsung tampil setelah selesai. Biaya hanya dikenakan jika Anda ingin membuka laporan lengkap dengan uraian dan saran pengembangan yang lebih rinci.',
  },
  {
    q: 'Apakah data dan hasil tes saya aman?',
    a: 'Aman. Data peserta bersifat rahasia dan hanya digunakan untuk menampilkan hasil tes Anda sendiri — tidak dibagikan ke pihak lain.',
  },
  {
    q: 'Berapa lama laporan lengkap bisa diakses setelah bayar?',
    a: 'Laporan terbuka otomatis begitu pembayaran berhasil dikonfirmasi — tanpa perlu menunggu, dan bisa diunduh sebagai PDF kapan saja.',
  },
  {
    q: 'Hasil tes ini untuk apa saja?',
    a: 'Untuk pengembangan diri, persiapan karier, atau kebutuhan tim/HR. Hasil menggambarkan kecenderungan saat mengerjakan tes dan bukan merupakan diagnosis klinis.',
  },
  {
    q: 'Apakah bisa dipakai untuk latihan tes CPNS, BUMN, atau melamar kerja?',
    a: 'Bisa. Banyak yang memakai AssesIN untuk mengenali gaya kerja dan kepribadian sendiri sebelum menghadapi tes psikologi di seleksi CPNS, BUMN, atau rekrutmen kerja — sekaligus melihat bagian mana yang masih perlu dilatih. Perlu diingat, ini adalah tes untuk latihan dan pengembangan diri, bukan simulasi resmi dari instansi atau perusahaan tertentu.',
  },
]

const WRAP = { maxWidth: '1200px', margin: '0 auto' }
const BTN_UTAMA = {
  background: 'var(--accent)', color: 'var(--on-accent)', fontWeight: 600, fontSize: '15px',
  padding: '12px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', textDecoration: 'none',
  display: 'inline-block',
}
const BTN_KEDUA = {
  background: 'var(--surface)', color: 'var(--text)', fontWeight: 600, fontSize: '15px',
  padding: '12px 22px', borderRadius: '10px', border: '1px solid var(--border)', cursor: 'pointer',
  textDecoration: 'none', display: 'inline-block',
}
const LINK_KECIL = { color: 'var(--text-muted)', fontSize: '14px', textDecoration: 'none' }

const gulirKe = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Home() {
  const navigate = useNavigate()
  const [faqTerbuka, setFaqTerbuka] = useState(0)

  // Supabase auto-parses #access_token&type=recovery on load and fires PASSWORD_RECOVERY
  // via onAuthStateChange — the global AuthListener in App.jsx handles the redirect.

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* ── Navbar ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid var(--border)',
        background: 'var(--overlay)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        padding: '0 var(--px)',
      }}>
        <div style={{ ...WRAP, height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <Link to="/" style={{ textDecoration: 'none' }}><Logo size="sm" /></Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button onClick={() => gulirKe('tes')} className="hidden sm:inline" style={{ ...LINK_KECIL, background: 'none', border: 'none', cursor: 'pointer' }}>Tes</button>
            <button onClick={() => gulirKe('cara-kerja')} className="hidden sm:inline" style={{ ...LINK_KECIL, background: 'none', border: 'none', cursor: 'pointer' }}>Cara kerja</button>
            <Link to="/kontak" style={LINK_KECIL}>Kontak</Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section style={{ padding: 'clamp(48px, 7vw, 88px) var(--px) clamp(40px, 6vw, 64px)' }}>
        <div style={{ ...WRAP, maxWidth: '720px', textAlign: 'center' }} className="anim-up">
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '16px' }}>
            Kenali kepribadian dan potensi Anda
          </h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '17px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto 32px' }}>
            Asesmen psikologi online untuk mengenal diri lebih dalam — cocok untuk berlatih menghadapi tes seleksi CPNS, BUMN, dan rekrutmen kerja, maupun pengembangan diri sehari-hari. Kerjakan gratis, hasil ringkas langsung tampil.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => gulirKe('tes')} style={BTN_UTAMA}>Pilih tes</button>
            <button onClick={() => gulirKe('cara-kerja')} style={BTN_KEDUA}>Cara kerja</button>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '20px' }}>
            {TESTS.length} jenis tes · Tanpa instalasi · Data peserta bersifat rahasia
          </p>
        </div>

        {/* ── Badge kepercayaan ── */}
        <div className="anim-up anim-delay-1" style={{
          ...WRAP, marginTop: '40px',
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px',
        }}>
          {BADGE_PERCAYA.map(b => (
            <span key={b.teks} style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '99px', padding: '8px 16px',
              fontSize: '12.5px', fontWeight: 500, color: 'var(--text-sub)',
            }}>
              <span aria-hidden="true">{b.ikon}</span>{b.teks}
            </span>
          ))}
        </div>
      </section>

      {/* ── Kenapa AssesIN ── */}
      <section style={{ padding: '0 var(--px) 64px' }}>
        <div style={WRAP}>
          <div className="section-rule anim-up">
            <span className="section-rule-pip" />
            <span className="section-rule-label">Kenapa AssesIN</span>
            <span className="section-rule-line" />
          </div>
          <div className="features-grid">
            {ALASAN.map(a => (
              <div key={a.judul} className="anim-up">
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'var(--accent-dim)', border: '1px solid var(--accent-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', marginBottom: '16px',
                }}>
                  {a.ikon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>{a.judul}</h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.7 }}>{a.isi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Daftar tes ── */}
      <section id="tes" style={{ padding: '0 var(--px) 64px', scrollMarginTop: '80px' }}>
        <div style={WRAP}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>Pilih tes</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '24px' }}>
            Semua tes gratis dikerjakan. Laporan lengkap dapat dibuka dengan biaya yang tertera.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {TESTS.map(test => (
              <button
                key={test.id}
                onClick={() => navigate(test.route)}
                className="card-test"
                style={{ textAlign: 'left', padding: '24px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)' }}>{test.nama}</h3>
                  {test.beta && (
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: '99px' }}>Beta</span>
                  )}
                </div>
                <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.6, flex: 1 }}>{test.desc}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{test.meta.join(' · ')}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Laporan lengkap <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{formatRupiah(HARGA_TES[test.id])}</strong>
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent)' }}>
                    Mulai <span className="card-cta-arrow">→</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cara kerja ── */}
      <section id="cara-kerja" style={{ padding: '56px var(--px)', background: 'var(--surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', scrollMarginTop: '64px' }}>
        <div style={WRAP}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '32px' }}>Cara kerja</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            {LANGKAH.map((l, i) => (
              <div key={l.judul}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '99px', background: 'var(--accent-dim)', color: 'var(--accent)', fontWeight: 700, fontSize: '14px', marginBottom: '14px' }}>
                  {i + 1}
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>{l.judul}</h3>
                <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.7 }}>{l.isi}</p>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: 1.7, marginTop: '40px', maxWidth: '720px' }}>
            Hasil tes menggambarkan kecenderungan saat Anda mengerjakan tes dan digunakan untuk pengembangan diri, bukan diagnosis.
            Hasil bersifat rahasia. Kerjakan dengan jujur agar hasilnya mencerminkan diri Anda.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '56px var(--px)' }}>
        <div style={{ ...WRAP, maxWidth: '760px' }}>
          <div className="section-rule anim-up">
            <span className="section-rule-pip" />
            <span className="section-rule-label">Pertanyaan umum</span>
            <span className="section-rule-line" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {FAQ.map((f, i) => {
              const terbuka = faqTerbuka === i
              return (
                <div key={f.q} className="dark-card anim-up" style={{ overflow: 'hidden' }}>
                  <button
                    onClick={() => setFaqTerbuka(terbuka ? -1 : i)}
                    style={{
                      width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '18px 22px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    }}
                  >
                    <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--text)' }}>{f.q}</span>
                    <span style={{
                      flexShrink: 0, color: 'var(--accent)', fontSize: '18px', fontWeight: 300,
                      transform: terbuka ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s',
                    }}>+</span>
                  </button>
                  {terbuka && (
                    <p style={{ padding: '0 22px 20px', color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.75 }}>
                      {f.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ padding: '48px var(--px) 32px', marginTop: 'auto' }}>
        <div style={WRAP}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>
            <div style={{ maxWidth: '320px' }}>
              <Logo size="sm" />
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7, marginTop: '12px' }}>
                Platform asesmen psikologi digital untuk individu dan organisasi.
              </p>
              <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <a href={`mailto:${EMAIL_KONTAK}`} style={{ ...LINK_KECIL, fontSize: '13px' }}>{EMAIL_KONTAK}</a>
                <span style={{ lineHeight: 1.6 }}>{ALAMAT_USAHA}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text)', marginBottom: '12px' }}>Tes</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', columnGap: '28px', rowGap: '8px' }}>
                  {TESTS.map(t => <Link key={t.route} to={t.route} style={{ ...LINK_KECIL, fontSize: '13px' }}>{t.nama}</Link>)}
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text)', marginBottom: '12px' }}>Informasi</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Link to="/privacy-policy" style={{ ...LINK_KECIL, fontSize: '13px' }}>Kebijakan Privasi</Link>
                  <Link to="/terms" style={{ ...LINK_KECIL, fontSize: '13px' }}>Syarat &amp; Ketentuan</Link>
                  <Link to="/kontak" style={{ ...LINK_KECIL, fontSize: '13px' }}>Kontak</Link>
                </div>
              </div>
            </div>
          </div>

          <p style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
            © 2026 AssesIN
          </p>
        </div>
      </footer>
    </div>
  )
}
