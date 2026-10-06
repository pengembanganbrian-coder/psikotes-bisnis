import { useId } from 'react'

// Menggambar satu sel matriks figural (lihat kemampuan/kognitif.js).
// sel: { bentuk, jumlah, isi: 'kosong'|'setengah'|'penuh', putar } atau null
// (kotak kosong bertanda tanya). Putaran 0° = menghadap ke atas, searah
// jarum jam.

const POSISI = {
  1: [[50, 50]],
  2: [[30, 50], [70, 50]],
  3: [[50, 28], [28, 70], [72, 70]],
  4: [[30, 30], [70, 30], [30, 70], [70, 70]],
  5: [[26, 26], [74, 26], [50, 50], [26, 74], [74, 74]],
  6: [[28, 30], [50, 30], [72, 30], [28, 70], [50, 70], [72, 70]],
}

function Bentuk({ bentuk, x, y, r, putar, fill }) {
  const t = `rotate(${putar} ${x} ${y})`
  const umum = { fill, stroke: 'currentColor', strokeWidth: 2.5, strokeLinejoin: 'round' }
  switch (bentuk) {
    case 'lingkaran':
      return <circle cx={x} cy={y} r={r} {...umum} />
    case 'persegi':
      return <rect x={x - r * 0.88} y={y - r * 0.88} width={r * 1.76} height={r * 1.76} transform={t} {...umum} />
    case 'belahketupat':
      return <polygon points={`${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`} transform={t} {...umum} />
    case 'segitiga':
      return <polygon points={`${x},${y - r} ${x + r * 0.95},${y + r * 0.7} ${x - r * 0.95},${y + r * 0.7}`} transform={t} {...umum} />
    case 'panah': {
      const w = r * 0.38
      return (
        <polygon
          points={`${x},${y - r} ${x + r * 0.8},${y - r * 0.1} ${x + w},${y - r * 0.1} ${x + w},${y + r} ${x - w},${y + r} ${x - w},${y - r * 0.1} ${x - r * 0.8},${y - r * 0.1}`}
          transform={t} {...umum}
        />
      )
    }
    default:
      return null
  }
}

export default function SelFigural({ sel, ukuran = 72 }) {
  const id = useId().replace(/:/g, '')
  if (!sel) {
    return (
      <svg viewBox="0 0 100 100" width={ukuran} height={ukuran} role="img" aria-label="Kotak yang harus diisi">
        <text x="50" y="64" textAnchor="middle" fontSize="44" fontWeight="700" fill="var(--accent)">?</text>
      </svg>
    )
  }
  const { bentuk, jumlah, isi, putar } = sel
  const fill = isi === 'penuh' ? 'currentColor' : isi === 'setengah' ? `url(#setengah-${id})` : 'none'

  let isiSel
  if (bentuk === 'garis') {
    const jarak = 16
    const awal = 50 - ((jumlah - 1) * jarak) / 2
    isiSel = (
      <g transform={`rotate(${putar} 50 50)`} stroke="currentColor" strokeWidth="4" strokeLinecap="round">
        {Array.from({ length: jumlah }, (_, i) => <line key={i} x1={awal + i * jarak} y1="20" x2={awal + i * jarak} y2="80" />)}
      </g>
    )
  } else {
    const r = { 1: 26, 2: 17, 3: 16, 4: 14, 5: 12, 6: 10 }[jumlah] || 10
    isiSel = POSISI[jumlah].map(([x, y], i) => (
      <Bentuk key={i} bentuk={bentuk} x={x} y={y} r={r} putar={putar} fill={fill} />
    ))
  }

  return (
    <svg viewBox="0 0 100 100" width={ukuran} height={ukuran} role="img" aria-label="Gambar" style={{ color: 'var(--text)' }}>
      <defs>
        <linearGradient id={`setengah-${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {isiSel}
    </svg>
  )
}
