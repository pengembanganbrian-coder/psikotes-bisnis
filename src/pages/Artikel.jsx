import { Link, useParams } from 'react-router-dom'
import Logo from '../components/Logo'
import NotFound from './NotFound'
import { ARTIKEL, ARTIKEL_BY_SLUG } from '../artikel/data'
import { SITE_URL } from '../config/seo'

const WRAP = { maxWidth: '720px', margin: '0 auto' }
const KARTU = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px' }

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

function Kepala() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', gap: '12px' }}>
      <Link to="/" aria-label="Beranda AssesIN"><Logo size="sm" dark /></Link>
      <Link to="/#tes" className="btn-ghost" style={{ fontSize: '13px', padding: '8px 14px' }}>Pilih tes</Link>
    </div>
  )
}

function KartuArtikel({ a }) {
  return (
    <Link to={`/artikel/${a.slug}`} className="card-test" style={{ ...KARTU, display: 'block', padding: '22px', textDecoration: 'none' }}>
      <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.4, marginBottom: '8px' }}>{a.judul}</h2>
      <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.6, marginBottom: '10px' }}>{a.ringkas}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{a.menit} menit baca</p>
    </Link>
  )
}

/** Daftar artikel (/artikel). */
export function DaftarArtikel() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px var(--px) 64px' }}>
      <div style={WRAP}>
        <Kepala />
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: '8px' }}>Artikel</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>
          Panduan menghadapi psikotes kerja, CPNS, dan BUMN, serta penjelasan tes kepribadian yang sering dipakai.
        </p>
        <div style={{ display: 'grid', gap: '14px' }}>
          {ARTIKEL.map(a => <KartuArtikel key={a.slug} a={a} />)}
        </div>
      </div>
    </div>
  )
}

function Blok({ b }) {
  if (b.h) return <h2 style={{ fontSize: '21px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.35, margin: '32px 0 12px' }}>{b.h}</h2>
  if (b.p) return <p style={{ color: 'var(--text-sub)', fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>{b.p}</p>
  if (b.ul) return (
    <ul style={{ margin: '0 0 18px', paddingLeft: '22px', display: 'grid', gap: '8px', listStyle: 'disc' }}>
      {b.ul.map(t => <li key={t} style={{ color: 'var(--text-sub)', fontSize: '16px', lineHeight: 1.7 }}>{t}</li>)}
    </ul>
  )
  return null
}

/** Satu artikel (/artikel/:slug). */
export function BacaArtikel() {
  const { slug } = useParams()
  const a = ARTIKEL_BY_SLUG[slug]
  if (!a) return <NotFound />

  const tujuanTes = a.tes.hash ? `${a.tes.route}#${a.tes.hash}` : a.tes.route
  const lainnya = ARTIKEL.filter(x => x.slug !== a.slug)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.judul,
    description: a.deskripsi,
    datePublished: a.tanggal,
    inLanguage: 'id-ID',
    mainEntityOfPage: `${SITE_URL}/artikel/${a.slug}`,
    publisher: { '@type': 'Organization', name: 'AssesIN', url: `${SITE_URL}/` },
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px var(--px) 64px' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article style={WRAP}>
        <Kepala />
        <Link to="/artikel" style={{ color: 'var(--accent)', fontSize: '13px', textDecoration: 'none' }}>← Semua artikel</Link>
        <h1 style={{ fontSize: 'clamp(26px, 4.5vw, 34px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, letterSpacing: '-0.01em', margin: '12px 0 10px' }}>{a.judul}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '28px' }}>
          {formatTanggal(a.tanggal)} · {a.menit} menit baca
        </p>

        {a.isi.map((b, i) => b.cta ? (
          <div key={i} style={{ ...KARTU, padding: '24px', margin: '28px 0' }}>
            <p style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>Kenali pola Anda sebelum tes sebenarnya</p>
            <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>Gratis dikerjakan, hasil ringkas langsung tampil.</p>
            <Link to={tujuanTes} className="btn-cta">{a.tes.label} <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </div>
        ) : <Blok key={i} b={b} />)}

        {lainnya.length > 0 && (
          <section style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '14px' }}>Artikel lainnya</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {lainnya.map(x => <KartuArtikel key={x.slug} a={x} />)}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}
