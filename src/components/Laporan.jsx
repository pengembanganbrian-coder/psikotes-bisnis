import { Link } from 'react-router-dom'
import Logo from './Logo'

// Kerangka visual bersama untuk semua halaman laporan hasil tes:
// bilah atas, hero bergradasi, kartu bagian, bar skor, daftar poin,
// catatan, dan tombol aksi. Gaya ada di index.css (awalan .rpt-).

const tanggalHariIni = () =>
  new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

/** Pembungkus halaman laporan. */
export function LaporanPage({ bar, children, lebar = 900 }) {
  return (
    <div className="rpt-page">
      {bar}
      <div className="rpt-body" style={{ maxWidth: lebar }}>
        {children}
      </div>
    </div>
  )
}

/** Bilah atas lengket: logo, tombol kembali, cetak. */
export function LaporanBar({ kembali, onKembali }) {
  return (
    <div className="rpt-bar print-hide">
      <div className="rpt-bar-inner">
        <Link to="/" aria-label="Beranda"><Logo size="sm" /></Link>
        <div style={{ display: 'flex', gap: '8px' }}>
          {kembali && <button className="rpt-btn ghost sm" onClick={onKembali}>{kembali}</button>}
          <button className="rpt-btn sm" onClick={() => window.print()}>Unduh PDF</button>
        </div>
      </div>
    </div>
  )
}

/**
 * Hero laporan: pita gradien dengan nama peserta dan hasil utama.
 * `children` = sorotan hasil (huruf tipe, skor, dsb.).
 */
export function LaporanHero({ tes, sub, nama, tanggal, tersimpan, warna = '#4f46e5', warna2 = '#7c3aed', watermark, children }) {
  return (
    <section className="rpt-hero" style={{ '--h1': warna, '--h2': warna2 }}>
      <div className="rpt-hero-deco" aria-hidden="true" />
      {watermark && <div className="rpt-hero-wm" aria-hidden="true">{watermark}</div>}
      <div className="rpt-hero-top">
        <span className="rpt-hero-tag">Laporan {tes}</span>
        <span className="rpt-hero-date">{tanggal || tanggalHariIni()}</span>
      </div>
      <p className="rpt-hero-sub">{sub}</p>
      <h1 className="rpt-hero-nama">{nama || 'Peserta'}</h1>
      {tersimpan && <p className="rpt-hero-saved print-hide">✓ Hasil tersimpan</p>}
      {children && <div className="rpt-hero-panel">{children}</div>}
    </section>
  )
}

/** Kartu bagian dengan ikon dan judul. */
export function Kartu({ ikon, judul, sub, aksen, no, children, style, className = '' }) {
  return (
    <section className={`rpt-card ${className}`} style={{ ...(aksen ? { '--aksen': aksen } : {}), ...style }}>
      {(judul || ikon) && (
        <header className="rpt-card-head">
          {ikon && <span className="rpt-card-ikon">{ikon}</span>}
          <div style={{ minWidth: 0, flex: 1 }}>
            {no && <p className="rpt-card-no">Bagian {String(no).padStart(2, '0')}</p>}
            {judul && <h2 className="rpt-card-judul">{judul}</h2>}
            {sub && <p className="rpt-card-sub">{sub}</p>}
          </div>
        </header>
      )}
      {children}
    </section>
  )
}

/** Bar skor horizontal (isi bergradasi, tumbuh saat tampil). */
export function Bar({ nilai, maks = 100, min = 0, warna = 'var(--accent)', tinggi = 10 }) {
  const pct = Math.max(0, Math.min(100, ((nilai - min) / (maks - min)) * 100))
  return (
    <div className="rpt-track print-bar-track" style={{ height: tinggi }}>
      <div className="rpt-fill print-bar-fill" style={{ width: `${pct}%`, '--c': warna }} />
    </div>
  )
}

/**
 * Cincin skor (donut). `terang` = versi putih untuk di dalam hero.
 * `tampil` menggantikan angka di tengah bila perlu format lain.
 */
export function Cincin({ nilai, maks = 100, warna = 'var(--accent)', ukuran = 120, tebal = 11, tampil, label, terang }) {
  const r = (ukuran - tebal) / 2
  const keliling = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(1, nilai / maks))
  return (
    <div className="rpt-cincin" style={{ width: ukuran, height: ukuran }}>
      <svg width={ukuran} height={ukuran} viewBox={`0 0 ${ukuran} ${ukuran}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={ukuran / 2} cy={ukuran / 2} r={r} fill="none" strokeWidth={tebal}
          stroke={terang ? 'rgba(255,255,255,0.16)' : 'var(--track)'} />
        <circle cx={ukuran / 2} cy={ukuran / 2} r={r} fill="none" strokeWidth={tebal} strokeLinecap="round"
          stroke={terang ? '#fff' : warna} strokeDasharray={keliling}
          className="rpt-cincin-isi" style={{ '--penuh': keliling, strokeDashoffset: keliling * (1 - pct) }} />
      </svg>
      <div className="rpt-cincin-teks" style={{ color: terang ? '#fff' : 'var(--text)' }}>
        <span style={{ fontSize: ukuran * 0.26 }}>{tampil ?? nilai}</span>
        {label && <small style={{ color: terang ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)' }}>{label}</small>}
      </div>
    </div>
  )
}

/** Grafik radar SVG. data: [{ label, nilai, tampil?, warna? }], skala 0..maks. */
export function Radar({ data, maks = 100, warna = '#4f46e5', ukuran = 400 }) {
  const n = data.length
  const c = ukuran / 2
  const R = c - 74
  const titik = (i, v) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2
    const r = (Math.max(0, Math.min(v, maks)) / maks) * R
    return [c + r * Math.cos(a), c + r * Math.sin(a)]
  }
  const poligon = f => data.map((_, i) => titik(i, f(i)).map(x => x.toFixed(1)).join(',')).join(' ')
  const gid = `rg-${String(warna).replace(/[^a-z0-9]/gi, '')}-${n}`
  return (
    <svg viewBox={`0 0 ${ukuran} ${ukuran}`} style={{ width: '100%', maxWidth: ukuran, display: 'block', margin: '0 auto', overflow: 'visible' }}>
      <defs>
        <radialGradient id={gid}>
          <stop offset="0%" stopColor={warna} stopOpacity="0.12" />
          <stop offset="100%" stopColor={warna} stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {[1, 0.75, 0.5, 0.25].map(k => (
        <polygon key={k} points={poligon(() => k * maks)} fill={k === 1 ? '#f8fafc' : 'none'} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {data.map((_, i) => {
        const [x, y] = titik(i, maks)
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#e2e8f0" strokeWidth="1" />
      })}
      <polygon className="rpt-radar-area" points={poligon(i => data[i].nilai)} fill={`url(#${gid})`} stroke={warna} strokeWidth="2.5" strokeLinejoin="round" />
      {data.map((d, i) => {
        const [x, y] = titik(i, d.nilai)
        return <circle key={i} cx={x} cy={y} r="5" fill={d.warna || warna} stroke="#fff" strokeWidth="2" />
      })}
      {data.map((d, i) => {
        const a = (Math.PI * 2 * i) / n - Math.PI / 2
        const lx = c + (R + 18) * Math.cos(a)
        const ly = c + (R + 18) * Math.sin(a)
        const anchor = Math.abs(Math.cos(a)) < 0.3 ? 'middle' : Math.cos(a) > 0 ? 'start' : 'end'
        const dy = Math.sin(a) < -0.7 ? -10 : Math.sin(a) > 0.7 ? 6 : 0
        return (
          <g key={d.label}>
            <text x={lx} y={ly + dy - 2} textAnchor={anchor} fontSize="11.5" fontWeight="700" fill="#334155">{d.label}</text>
            <text x={lx} y={ly + dy + 12} textAnchor={anchor} fontSize="11.5" fontWeight="800" fill={d.warna || warna}>{d.tampil ?? d.nilai}</text>
          </g>
        )
      })}
    </svg>
  )
}

/** Deretan angka ringkas di dalam hero. */
export function StatHero({ items }) {
  return (
    <div className="rpt-stat">
      {items.map(({ label, nilai, ket }) => (
        <div key={label}>
          <p className="rpt-stat-label">{label}</p>
          <p className="rpt-stat-nilai">{nilai}</p>
          {ket && <p className="rpt-stat-ket">{ket}</p>}
        </div>
      ))}
    </div>
  )
}

/** Baris skor: label kiri, nilai kanan, bar, keterangan opsional. */
export function BarisSkor({ label, sub, nilai, tampil, maks = 100, min = 0, warna, lencana, ket }) {
  return (
    <div className="rpt-skor">
      <div className="rpt-skor-head">
        <p className="rpt-skor-label">{label}{sub && <span> · {sub}</span>}</p>
        <p className="rpt-skor-nilai" style={{ color: warna }}>
          {tampil ?? nilai}
          {lencana && <span className="rpt-chip" style={{ '--c': warna }}>{lencana}</span>}
        </p>
      </div>
      <Bar nilai={nilai} maks={maks} min={min} warna={warna} />
      {ket && <p className="rpt-skor-ket">{ket}</p>}
    </div>
  )
}

/** Lencana kecil. */
export function Chip({ children, warna = 'var(--accent)', besar }) {
  return <span className={`rpt-chip${besar ? ' lg' : ''}`} style={{ '--c': warna }}>{children}</span>
}

/** Daftar poin bertanda warna. */
export function Poin({ items, warna = 'var(--accent)', judul }) {
  const isi = (items || []).filter(Boolean)
  if (!isi.length) return null
  return (
    <div className="rpt-poin" style={{ '--c': warna }}>
      {judul && <p className="rpt-poin-judul">{judul}</p>}
      <ul>{isi.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  )
}

/** Kotak sorotan berwarna lembut (saran, catatan khusus). */
export function Sorot({ judul, warna = 'var(--accent)', children }) {
  return (
    <div className="rpt-sorot" style={{ '--c': warna }}>
      {judul && <p className="rpt-sorot-judul">{judul}</p>}
      <div className="rpt-sorot-isi">{children}</div>
    </div>
  )
}

/** Catatan penutup / disclaimer. */
export function Catatan({ children }) {
  return (
    <div className="rpt-catatan">
      <p className="rpt-catatan-judul">Catatan penting</p>
      <p>{children}</p>
    </div>
  )
}

/** Tombol aksi di akhir laporan. */
export function AksiBawah({ kembali, onKembali, ulang, onUlang }) {
  return (
    <>
      <div className="rpt-aksi print-hide">
        {kembali && <button className="rpt-btn ghost" onClick={onKembali}>← {kembali}</button>}
        {ulang && <button className="rpt-btn ghost" onClick={onUlang}>{ulang}</button>}
        <button className="rpt-btn" onClick={() => window.print()}>Unduh / Cetak PDF</button>
      </div>
      <p className="rpt-foot">© 2026 AssesIN · assesin.net · Laporan ini bersifat rahasia</p>
    </>
  )
}

/** Tampilan saat data hasil tidak ada (mis. halaman dibuka langsung). */
export function TanpaData({ onKembali }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div className="rpt-card" style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <p style={{ fontSize: '32px', marginBottom: '8px' }}>📄</p>
        <p style={{ color: 'var(--text)', fontWeight: 700, marginBottom: '6px' }}>Data hasil tidak ditemukan</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Silakan kerjakan tes terlebih dahulu.</p>
        <button className="rpt-btn" onClick={onKembali}>Kerjakan tes</button>
      </div>
    </div>
  )
}
