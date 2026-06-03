import { useId } from 'react'

export default function Logo({ size = 'md', dark = false, iconOnly = false }) {
  const uid = useId().replace(/:/g, '')
  const gradId   = `aiGrad-${uid}`
  const sizes = {
    sm: { icon: 30, text: 'text-lg',  gap: 'gap-2'   },
    md: { icon: 38, text: 'text-2xl', gap: 'gap-2.5' },
    lg: { icon: 50, text: 'text-3xl', gap: 'gap-3'   },
    xl: { icon: 64, text: 'text-4xl', gap: 'gap-4'   },
  }
  const s = sizes[size] || sizes.md
  const d  = s.icon

  return (
    <div className={`inline-flex items-center ${s.gap} select-none`}>

      {/* ── Icon ─────────────────────────────────── */}
      <svg width={d} height={d} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#1D4ED8"/>
            <stop offset="100%" stopColor="#4338CA"/>
          </linearGradient>
        </defs>

        {/* Background — rounded square */}
        <rect width="48" height="48" rx="13" fill={`url(#${gradId})`}/>

        {/* Garis dasar / base line */}
        <rect x="8" y="37" width="32" height="2" rx="1" fill="white" opacity="0.25"/>

        {/* Bar 1 — pendek (kiri) */}
        <rect x="9" y="28" width="8" height="9" rx="2.5" fill="white" opacity="0.45"/>

        {/* Bar 2 — sedang (tengah) */}
        <rect x="20" y="19" width="8" height="18" rx="2.5" fill="white" opacity="0.72"/>

        {/* Bar 3 — tinggi (kanan) — paling terang */}
        <rect x="31" y="10" width="8" height="27" rx="2.5" fill="white"/>

        {/* Titik bulat di atas tiap bar */}
        <circle cx="13" cy="25.5" r="2" fill="white" opacity="0.45"/>
        <circle cx="24" cy="16.5" r="2" fill="white" opacity="0.72"/>
        <circle cx="35" cy="7.5"  r="2.5" fill="white"/>

        {/* Garis tren naik (kecil) yang menghubungkan titik */}
        <path
          d="M13 25.5 L24 16.5 L35 7.5"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
          strokeDasharray="2 2"
        />
      </svg>

      {/* ── Wordmark ──────────────────────────────── */}
      {!iconOnly && (
        <span className={`font-black ${s.text} tracking-tight leading-none`}>
          <span className={dark ? 'text-white' : 'text-gray-900'}>Asses</span>
          <span className={dark ? 'text-blue-300' : 'text-blue-600'}>IN</span>
        </span>
      )}

    </div>
  )
}
