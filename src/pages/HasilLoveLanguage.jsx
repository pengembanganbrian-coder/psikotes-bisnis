import { useLocation, useNavigate } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'

const llInfo = {
  W: {
    nama:   'Words of Affirmation',
    emoji:  '💬',
    warna:  'blue',
    description:
      'You feel most valued when appreciation is spoken aloud — sincere praise, genuine gratitude, ' +
      'words of encouragement, or a heartfelt message. Verbal recognition isn\'t just pleasant for you; ' +
      'it\'s essential. Harsh or dismissive language, on the other hand, can cut deep and linger long after the moment has passed.',
    atWork:
      'Verbal acknowledgment from a manager or colleague is one of your greatest motivators. ' +
      'You thrive in environments where contributions are recognized openly — a genuine "great work" ' +
      'or a public shout-out in a team meeting can significantly elevate your engagement and performance.',
    forLeaders:
      'Offer verbal recognition consistently and specifically — not generic praise, but acknowledgment ' +
      'tied to the actual contribution. A sincere "the way you handled that situation was exceptional" ' +
      'lands far more powerfully than a vague compliment. Written recognition matters too — even a brief, ' +
      'thoughtful message carries real weight for this person.',
  },
  Q: {
    nama:   'Quality Time',
    emoji:  '⏳',
    warna:  'green',
    description:
      'You feel most valued when someone gives you their full, undivided attention. Not merely physical ' +
      'presence, but genuine engagement — eyes off the screen, mind in the conversation. ' +
      'Distracted togetherness registers as disconnection; presence without attention is absence.',
    atWork:
      'You value focused one-on-one conversations, meaningful discussions, and moments of true ' +
      'collaboration. A leader who carves out dedicated time to listen to your ideas and concerns ' +
      'makes you feel genuinely seen — and seen people do their best work.',
    forLeaders:
      'Schedule regular, distraction-free one-on-one sessions. Put the phone away. Ask thoughtful ' +
      'questions and listen actively without rushing to the next agenda item. Involve this person in ' +
      'key discussions — their engagement soars when they feel their voice truly shapes outcomes.',
  },
  G: {
    nama:   'Receiving Gifts',
    emoji:  '🎁',
    warna:  'purple',
    description:
      'You feel most appreciated through tangible tokens of thoughtfulness — not because of material ' +
      'value, but because a gift is proof that someone thought of you deliberately and made the effort ' +
      'to show it. An unexpected, well-chosen gesture speaks louder than a thousand empty words.',
    atWork:
      'Tangible recognition matters deeply to you — a certificate, a personalized award, or even a ' +
      'small but thoughtful gesture can be profoundly meaningful. Physical acknowledgment of performance ' +
      'makes you feel genuinely valued in ways that verbal praise alone cannot replicate.',
    forLeaders:
      'Mark milestones with something tangible: a handwritten card, a meaningful gift on a work ' +
      'anniversary, or a certificate of recognition. The size of the gesture is less important than ' +
      'the intention behind it — thoughtfulness and specificity are everything. A generic gift feels ' +
      'hollow; a chosen one feels like you were truly seen.',
  },
  A: {
    nama:   'Acts of Service',
    emoji:  '🤝',
    warna:  'amber',
    description:
      'You feel most valued when people demonstrate care through action — helping lighten your load, ' +
      'taking something off your plate proactively, or solving a problem before you even have to ask. ' +
      'For you, actions speak with unmistakable clarity that words simply cannot match.',
    atWork:
      'Practical support from colleagues or leadership — stepping in during a high-pressure deadline, ' +
      'removing unnecessary friction, or proactively offering resources — makes you feel genuinely ' +
      'backed. Lip service without follow-through feels hollow and erodes trust quickly.',
    forLeaders:
      'Show support through concrete action. Remove obstacles from this person\'s path before being ' +
      'asked. Offer to help when workload spikes rather than waiting for a signal. The message ' +
      '"I\'ve got your back" means everything when it\'s demonstrated — not just said. Streamlining ' +
      'processes and eliminating unnecessary bureaucracy is one of the most powerful gifts you can give.',
  },
  P: {
    nama:   'Physical Touch',
    emoji:  '🤲',
    warna:  'rose',
    description:
      'You feel most connected through warm, sincere physical contact — a firm handshake, a reassuring ' +
      'hand on the shoulder, or a celebratory high-five. Appropriate physical gestures create a sense ' +
      'of safety, closeness, and genuine human connection that words alone cannot replicate.',
    atWork:
      'Professionally appropriate physical cues — a confident handshake when meeting, a brief pat on ' +
      'the back in a moment of recognition, or a team high-five celebrating a win — carry real meaning ' +
      'for you. They signal warmth, trust, and genuine connection in a way that transcends formal interaction.',
    forLeaders:
      'In a professional setting, be attuned to culturally appropriate and consent-aware physical ' +
      'gestures — a sincere handshake, a brief shoulder acknowledgment during a moment of praise. ' +
      'Always respect individual comfort levels and cultural norms. For this person, these small, ' +
      'intentional gestures carry significant relational weight and signal genuine presence.',
  },
}

const warnaClass = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-800',   bar: 'bg-blue-500',   title: 'text-blue-700'   },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-800',  bar: 'bg-green-500',  title: 'text-green-700'  },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800', bar: 'bg-purple-500', title: 'text-purple-700' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  badge: 'bg-amber-100 text-amber-800',  bar: 'bg-amber-500',  title: 'text-amber-700'  },
  rose:   { bg: 'bg-rose-50',   border: 'border-rose-200',   badge: 'bg-rose-100 text-rose-800',    bar: 'bg-rose-500',   title: 'text-rose-700'   },
}

function PremiumSection({ show, testType, pesertaId, nama, children }) {
  if (show) return <>{children}</>
  return (
    <PaymentGate testType={testType} pesertaId={pesertaId} nama={nama}>
      {children}
    </PaymentGate>
  )
}

export default function HasilLoveLanguage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state    = location.state

  if (!state?.skor) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="dark-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px' }}>Data hasil tidak ditemukan.</p>
          <button onClick={() => navigate('/tes-love-language')} style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Kembali ke Tes
          </button>
        </div>
      </div>
    )
  }

  const { skor, utama, kedua, nama, nip, jabatan, pesertaId, fromDashboard } = state
  const infoUtama = llInfo[utama]
  const warna     = warnaClass[infoUtama.warna]
  const maxSkor   = 12 // max per LL = 12 (setiap LL muncul di 12 pasangan dari 30 soal)
  const tanggal   = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  const handlePrint = () => window.print()

  // Urutan dari tertinggi ke terendah
  const ranking = Object.entries(skor).sort((a, b) => b[1] - a[1])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '48px' }}>

      {/* Print stylesheet */}
      <style>{`
        @media print {
          .ll-page-header { background: white !important; border-bottom: 2px solid #a67c00 !important; }
          .ll-bar-fill[data-ll-type="W"] { background: #2563eb !important; }
          .ll-bar-fill[data-ll-type="Q"] { background: #16a34a !important; }
          .ll-bar-fill[data-ll-type="G"] { background: #7c3aed !important; }
          .ll-bar-fill[data-ll-type="A"] { background: #d97706 !important; }
          .ll-bar-fill[data-ll-type="P"] { background: #e11d48 !important; }
          .ll-type-card[data-ll-type="W"] { border-left: 4px solid #2563eb !important; }
          .ll-type-card[data-ll-type="Q"] { border-left: 4px solid #16a34a !important; }
          .ll-type-card[data-ll-type="G"] { border-left: 4px solid #7c3aed !important; }
          .ll-type-card[data-ll-type="A"] { border-left: 4px solid #d97706 !important; }
          .ll-type-card[data-ll-type="P"] { border-left: 4px solid #e11d48 !important; }
          .ll-primary-badge { background: #a67c00 !important; color: white !important; }
          .ll-you-badge { background: #a67c00 !important; color: white !important; }
        }
      `}</style>

      {/* Header */}
      <div className="ll-page-header" style={{ background: 'rgba(9,9,15,0.97)', borderBottom: '1px solid var(--border)', padding: '28px var(--px)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative' }}>
          <div className="section-rule print-hide" style={{ marginBottom: '20px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Love Language Report</span><span className="section-rule-line" />
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '26px', color: 'var(--text)', marginBottom: '6px' }}>{nama}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Love Language Assessment · {jabatan}</p>
          <button onClick={handlePrint} className="print-hide" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            🖨️ Cetak / PDF
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px var(--px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* ── Print-Only Header ─────────────────────────────────── */}
        <div className="print-only" style={{ display: 'none', textAlign: 'center', paddingBottom: '20px', borderBottom: '2px solid #a67c00', marginBottom: '4px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '28px', letterSpacing: '0.22em', color: '#a67c00', marginBottom: '4px' }}>ASSESIN</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888' }}>Platform Asesmen Psikologi Digital</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: '#aaa', marginTop: '2px' }}>ASSESS · INSIGHT · GROW</div>
          <div style={{ marginTop: '18px', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '18px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#111' }}>LOVE LANGUAGE REPORT</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#444', maxWidth: '480px', margin: '8px auto 0' }}>
            <span>Peserta: <strong>{nama}</strong></span>
            <span>Tanggal: {tanggal}</span>
          </div>
        </div>

        {/* Bahasa Kasih Utama */}
        <div className="dark-card" style={{ padding: '28px', borderColor: 'var(--accent-border)' }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px', opacity: 0.8 }}>Primary Love Language</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '48px' }}>{infoUtama.emoji}</span>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>{infoUtama.nama}</h2>
            </div>
            <div style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', padding: '8px 16px', borderRadius: '10px', flexShrink: 0 }}>
              {skor[utama]}/12
            </div>
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{infoUtama.description}</p>
        </div>

        {/* Skor Semua LL */}
        <div className="dark-card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '15px', marginBottom: '20px' }}>Your Love Language Profile</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {ranking.map(([key, val], idx) => {
              const info = llInfo[key]
              const pct  = Math.round((val / maxSkor) * 100)
              const isMain = idx === 0
              return (
                <div key={key} data-ll-type={key}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{info.emoji}</span>
                      <span style={{ color: isMain ? 'var(--text)' : 'var(--text-sub)', fontSize: '14px', fontWeight: isMain ? 700 : 400 }}>{info.nama}</span>
                      {isMain && <span className="ll-primary-badge" style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)', fontSize: '10px', fontFamily: 'Syne, sans-serif', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', letterSpacing: '0.08em' }}>PRIMARY</span>}
                    </div>
                    <span style={{ color: isMain ? 'var(--accent)' : 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px' }}>{val}</span>
                  </div>
                  <div className="print-bar-track" style={{ height: '4px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div className="ll-bar-fill print-bar-fill" data-ll-type={key} style={{ height: '100%', background: isMain ? 'var(--accent)' : 'rgba(255,255,255,0.15)', width: `${pct}%`, borderRadius: '99px' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <PremiumSection show={!!fromDashboard} testType="Love Language" pesertaId={pesertaId} nama={nama}>
        {/* Bahasa Kasih Kedua */}
        {(() => {
          const info2 = llInfo[kedua]
          return (
            <div className="dark-card" style={{ padding: '24px' }}>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>Secondary Love Language</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{info2.emoji}</span>
                <div>
                  <h3 style={{ color: 'var(--text)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '2px' }}>{info2.nama}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Score: {skor[kedua]}/12</p>
                </div>
              </div>
              <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{info2.description}</p>
            </div>
          )
        })()}

        {/* Implikasi di Tempat Kerja */}
        <div className="dark-card" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '15px', marginBottom: '12px' }}>How It Shows at Work</h3>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{infoUtama.atWork}</p>
        </div>

        {/* Rekomendasi HR */}
        <div className="dark-card" style={{ padding: '24px', borderColor: 'var(--accent-border)', background: 'rgba(212,168,83,0.04)' }}>
          <h3 style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>For Leaders &amp; Managers</h3>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{infoUtama.forLeaders}</p>
        </div>

        {/* Deskripsi Semua LL */}
        <div className="dark-card" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '15px', marginBottom: '20px' }}>The Five Love Languages</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(llInfo).map(([key, info]) => (
              <div key={key} className="dark-card ll-type-card" data-ll-type={key} style={{ padding: '16px', background: 'var(--surface-2)', borderColor: key === utama ? 'var(--accent-border)' : 'var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span>{info.emoji}</span>
                  <span style={{ color: key === utama ? 'var(--accent)' : 'var(--text-sub)', fontWeight: 600, fontSize: '14px' }}>{info.nama}</span>
                  {key === utama && <span className="ll-you-badge" style={{ marginLeft: 'auto', background: 'var(--accent)', color: '#09090f', fontSize: '10px', fontFamily: 'Syne, sans-serif', fontWeight: 700, padding: '2px 8px', borderRadius: '99px' }}>YOU</span>}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.65' }}>{info.description}</p>
              </div>
            ))}
          </div>
        </div>
        </PremiumSection>

        {/* Print-Only Footer */}
        <div className="print-only" style={{ display: 'none', paddingTop: '16px', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#777', lineHeight: '1.6' }}>
            Hasil ini bersifat indikatif dan tidak menggantikan asesmen profesional oleh psikolog berlisensi.
          </p>
          <p style={{ fontSize: '10px', color: '#bbb', marginTop: '4px' }}>
            © 2026 AssesIN · assesin.com · Laporan ini bersifat rahasia
          </p>
        </div>

        {/* Tombol navigasi (hidden in print) */}
        <div className="print-hide" style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/')}
            style={{ flex: 1, background: 'var(--surface-2)', color: 'var(--text-sub)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer' }}
          >
            ← Beranda
          </button>
          <button
            onClick={handlePrint}
            style={{ flex: 1, background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            🖨️ Cetak / PDF
          </button>
        </div>

      </div>
    </div>
  )
}
