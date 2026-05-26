/**
 * AssesIN Logo Component
 * Gunakan: <Logo /> atau <Logo size="sm|md|lg" dark />
 */

export default function Logo({ size = 'md', dark = false, iconOnly = false }) {
  const sizes = {
    sm: { icon: 28, text: 'text-lg',  gap: 'gap-2' },
    md: { icon: 36, text: 'text-xl',  gap: 'gap-2.5' },
    lg: { icon: 48, text: 'text-3xl', gap: 'gap-3' },
    xl: { icon: 64, text: 'text-4xl', gap: 'gap-4' },
  }
  const s = sizes[size] || sizes.md
  const d = s.icon

  return (
    <div className={`inline-flex items-center ${s.gap} select-none`}>
      {/* Icon */}
      <svg width={d} height={d} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="assesGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB"/>
            <stop offset="100%" stopColor="#4F46E5"/>
          </linearGradient>
          <linearGradient id="assesGradLight" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6"/>
            <stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
        </defs>

        {/* Background rounded square */}
        <rect width="48" height="48" rx="12" fill="url(#assesGrad)"/>

        {/* Otak kiri-kanan (stilisasi) — dua busur melambangkan dua belahan otak/pikiran */}
        {/* Garis dasar */}
        <line x1="10" y1="35" x2="38" y2="35" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Huruf A — tengah */}
        <path
          d="M24 12 L15 34 M24 12 L33 34 M17.5 27 L30.5 27"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Titik aksen di atas A — melambangkan insight/penilaian */}
        <circle cx="24" cy="8.5" r="2.5" fill="white" opacity="0.9"/>

        {/* Garis kecil bawah kanan — aksen "IN" */}
        <rect x="30" y="31" width="7" height="2.5" rx="1.25" fill="white" opacity="0.7"/>
      </svg>

      {/* Wordmark */}
      {!iconOnly && (
        <span className={`font-black ${s.text} tracking-tight leading-none`}>
          <span className={dark ? 'text-white' : 'text-gray-800'}>Asses</span>
          <span className="text-blue-600">IN</span>
        </span>
      )}
    </div>
  )
}
