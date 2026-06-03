import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import PaymentGate from '../components/PaymentGate'

/* ── Deskripsi 8 gaya manajemen ──────────────────────────────────── */
const gayaInfo = {
  Executive: {
    emoji: '🌟',
    labelTO: 'Tinggi', labelRO: 'Tinggi', labelE: 'Efektif',
    deskripsi:
      'Pemimpin paling efektif yang mampu memaksimalkan produktivitas tim sekaligus menjaga hubungan antar manusia yang baik. Menggunakan standar tinggi yang berbeda untuk setiap individu, mendorong team work, dan memperlakukan setiap orang sesuai kebutuhan uniknya. Gaya ideal dalam kepemimpinan modern.',
    implikasi:
      'Cocok untuk posisi kepemimpinan kunci. Pertahankan dan kembangkan lebih lanjut. Jadikan sebagai mentor bagi pemimpin yang sedang berkembang.',
    warna: 'amber',
  },
  Compromiser: {
    emoji: '⚖️',
    labelTO: 'Tinggi', labelRO: 'Tinggi', labelE: 'Kurang Efektif',
    deskripsi:
      'Pemimpin yang menyadari pentingnya orientasi tugas dan hubungan, tetapi sering mengambil jalan tengah yang kurang optimal. Mudah dipengaruhi tekanan jangka pendek dan cenderung membuat keputusan yang menyenangkan semua pihak tanpa memikirkan efektivitas jangka panjang.',
    implikasi:
      'Perlu pelatihan pengambilan keputusan yang tegas dan berani. Kembangkan kemampuan memprioritaskan tujuan organisasi di atas popularitas pribadi.',
    warna: 'yellow',
  },
  'Benevolent Autocrat': {
    emoji: '💪',
    labelTO: 'Tinggi', labelRO: 'Rendah', labelE: 'Efektif',
    deskripsi:
      'Pemimpin yang sangat berorientasi pada tugas dan sangat efektif dalam mencapai hasil. Tahu bagaimana membuat orang bekerja keras tanpa menimbulkan kebencian. Cenderung mengambil keputusan sendiri namun bawahan tetap menghormatinya karena konsisten dan kompeten.',
    implikasi:
      'Efektif untuk lingkungan kerja yang menuntut hasil cepat. Perlu dikembangkan kemampuan mendengarkan dan membangun hubungan yang lebih hangat.',
    warna: 'orange',
  },
  Autocrat: {
    emoji: '⚡',
    labelTO: 'Tinggi', labelRO: 'Rendah', labelE: 'Kurang Efektif',
    deskripsi:
      'Pemimpin yang mengutamakan tugas dan hasil di atas segalanya dengan mengorbankan hubungan manusia. Memberikan perintah tanpa penjelasan, tidak mempercayai bawahan, dan menciptakan suasana kerja yang tegang. Efektif jangka pendek namun merusak moral tim jangka panjang.',
    implikasi:
      'Perlu pelatihan kepemimpinan yang berfokus pada kecerdasan emosional dan komunikasi. Risiko tinggi terhadap turnover anggota tim.',
    warna: 'red',
  },
  Developer: {
    emoji: '🌱',
    labelTO: 'Rendah', labelRO: 'Tinggi', labelE: 'Efektif',
    deskripsi:
      'Pemimpin yang sangat percaya pada kemampuan bawahan dan berfokus pada pengembangan mereka. Menciptakan lingkungan kerja yang mendukung kreativitas dan pertumbuhan. Mendelegasikan wewenang dengan baik dan membangun kepercayaan yang tinggi.',
    implikasi:
      'Sangat efektif untuk lingkungan inovatif dan tim yang berpengalaman. Perlu perhatian agar pencapaian tugas tidak terabaikan.',
    warna: 'green',
  },
  Missionary: {
    emoji: '🤝',
    labelTO: 'Rendah', labelRO: 'Tinggi', labelE: 'Kurang Efektif',
    deskripsi:
      'Pemimpin yang sangat memperhatikan keharmonisan dan hubungan antar manusia, namun mengabaikan tuntutan tugas dan produktivitas. Menghindari konflik dan cenderung terlalu lunak dalam menegakkan standar kerja.',
    implikasi:
      'Perlu pelatihan manajemen kinerja dan keberanian mengambil keputusan sulit. Cocok jika dikombinasikan dengan mentor yang task-oriented.',
    warna: 'teal',
  },
  Bureaucrat: {
    emoji: '📋',
    labelTO: 'Rendah', labelRO: 'Rendah', labelE: 'Efektif',
    deskripsi:
      'Pemimpin yang mengikuti prosedur, peraturan, dan sistem dengan sangat ketat. Dapat diandalkan dan konsisten, namun kurang fleksibel dan kurang memperhatikan pengembangan tim. Efektif dalam lingkungan yang membutuhkan kepatuhan prosedur tinggi.',
    implikasi:
      'Cocok untuk posisi yang membutuhkan kepatuhan regulasi tinggi. Perlu dikembangkan kemampuan beradaptasi dan kepemimpinan manusia.',
    warna: 'blue',
  },
  Deserter: {
    emoji: '❌',
    labelTO: 'Rendah', labelRO: 'Rendah', labelE: 'Kurang Efektif',
    deskripsi:
      'Pemimpin yang menghindari tanggung jawab dan tidak peduli terhadap tugas maupun hubungan dengan bawahan. Pasif, membiarkan masalah berjalan sendiri, dan tidak memberikan kontribusi nyata pada tim. Gaya paling tidak efektif dalam kepemimpinan.',
    implikasi:
      'Membutuhkan intervensi segera berupa coaching intensif. Evaluasi kesesuaian posisi kepemimpinan. Tidak cocok untuk posisi manajerial tanpa pengembangan signifikan.',
    warna: 'gray',
  },
}

const warnaConfig = {
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-300',  badge: 'bg-amber-100 text-amber-800',  bar: 'bg-amber-500',  title: 'text-amber-700',  btn: 'bg-amber-600 hover:bg-amber-700',   grad: 'from-amber-600 to-orange-600'  },
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-300', badge: 'bg-yellow-100 text-yellow-800',bar: 'bg-yellow-500', title: 'text-yellow-700', btn: 'bg-yellow-600 hover:bg-yellow-700', grad: 'from-yellow-600 to-amber-600'   },
  orange: { bg: 'bg-orange-50', border: 'border-orange-300', badge: 'bg-orange-100 text-orange-800',bar: 'bg-orange-500', title: 'text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700', grad: 'from-orange-600 to-red-600'     },
  red:    { bg: 'bg-red-50',    border: 'border-red-300',    badge: 'bg-red-100 text-red-800',      bar: 'bg-red-500',    title: 'text-red-700',    btn: 'bg-red-600 hover:bg-red-700',       grad: 'from-red-700 to-rose-700'      },
  green:  { bg: 'bg-green-50',  border: 'border-green-300',  badge: 'bg-green-100 text-green-800',  bar: 'bg-green-500',  title: 'text-green-700',  btn: 'bg-green-600 hover:bg-green-700',   grad: 'from-green-700 to-emerald-700' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-300',   badge: 'bg-teal-100 text-teal-800',    bar: 'bg-teal-500',   title: 'text-teal-700',   btn: 'bg-teal-600 hover:bg-teal-700',     grad: 'from-teal-700 to-cyan-700'     },
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-300',   badge: 'bg-blue-100 text-blue-800',    bar: 'bg-blue-500',   title: 'text-blue-700',   btn: 'bg-blue-600 hover:bg-blue-700',     grad: 'from-blue-700 to-indigo-700'   },
  gray:   { bg: 'bg-gray-50',   border: 'border-gray-300',   badge: 'bg-gray-100 text-gray-700',    bar: 'bg-gray-500',   title: 'text-gray-700',   btn: 'bg-gray-600 hover:bg-gray-700',     grad: 'from-gray-700 to-slate-700'    },
}

function PremiumSection({ show, testType, pesertaId, nama, children }) {
  if (show) return <>{children}</>
  return (
    <PaymentGate testType={testType} pesertaId={pesertaId} nama={nama}>
      {children}
    </PaymentGate>
  )
}

export default function HasilMsdt() {
  const location = useLocation()
  const navigate = useNavigate()
  const state    = location.state

  /* Guard: state tidak ada */
  if (!state?.hasil) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="dark-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Data hasil tidak ditemukan. Silakan kerjakan tes terlebih dahulu.</p>
          <button onClick={() => navigate('/tes-msdt')} style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Kembali ke Tes
          </button>
        </div>
      </div>
    )
  }

  const { hasil, nama, nip, unitKerja, pesertaId, fromDashboard } = state
  const { TO, RO, E_score, grandTotal, gaya, toTinggi, roTinggi, eTinggi } = hasil ?? {}

  const info = gayaInfo[gaya] || gayaInfo['Deserter']
  const w    = warnaConfig[info.warna]

  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const safeE = E_score ?? 0

  /* Bar helper: TO range 3–19, RO range 1–17 */
  const toPct = Math.min(100, Math.max(0, ((TO - 3) / (19 - 3)) * 100))
  const roPct = Math.min(100, Math.max(0, ((RO - 1) / (17 - 1)) * 100))
  const ePct  = (safeE / 4.0) * 100
  const gtPct = Math.min(100, Math.max(0, (grandTotal / 50) * 100))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '48px' }}>

      {/* Print stylesheet */}
      <style>{`
        @media print {
          .msdt-header { background: white !important; border-bottom: 2px solid #a67c00 !important; }
        }
      `}</style>

      {/* Header */}
      <div className="msdt-header" style={{ background: 'rgba(9,9,15,0.97)', borderBottom: '1px solid var(--border)', padding: '28px var(--px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          <div className="section-rule print-hide" style={{ marginBottom: '20px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Laporan MSDT</span><span className="section-rule-line" />
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '26px', color: 'var(--text)', marginBottom: '6px' }}>Laporan MSDT</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '14px' }}>Management Style Diagnostic Test</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ color: 'var(--text-sub)', fontSize: '13px' }}>👤 <strong style={{ color: 'var(--text)' }}>{nama}</strong></span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>📅 {tanggal}</span>
          </div>
          <button onClick={() => window.print()} className="print-hide" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            🖨️ Cetak / PDF
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Print-Only Header */}
        <div className="print-only" style={{ display: 'none', textAlign: 'center', paddingBottom: '20px', borderBottom: '2px solid #a67c00', marginBottom: '4px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '28px', letterSpacing: '0.22em', color: '#a67c00', marginBottom: '4px' }}>ASSESIN</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888' }}>Platform Asesmen Psikologi Digital · ASSESS · INSIGHT · GROW</div>
          <div style={{ marginTop: '16px', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '18px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#111' }}>LAPORAN MSDT</div>
          <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>Management Style Diagnostic Test</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#444', maxWidth: '600px', margin: '8px auto 0' }}>
            <span>Peserta: <strong>{nama}</strong></span>
            <span>Tanggal: {tanggal}</span>
          </div>
        </div>

        {/* ── Kartu Gaya Utama ──────────────────────────────────── */}
        <div className="dark-card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '44px' }}>{info.emoji}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Gaya Manajemen Anda</p>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '28px', color: 'var(--accent)', marginBottom: '10px' }}>{gaya}</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '99px', background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                  TO: {info.labelTO}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '99px', background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                  RO: {info.labelRO}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', borderRadius: '99px', background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                  Efektivitas: {info.labelE}
                </span>
              </div>
            </div>
          </div>
          <div style={{ padding: '0 24px 24px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-sub)', lineHeight: '1.75' }}>{info.deskripsi}</p>
          </div>
        </div>

        {/* ── Grid Skor ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* TO */}
          <div className="dark-card" style={{ padding: '20px' }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Task Orientation (TO)</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Orientasi pada tugas · range 3–19</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '30px', fontFamily: 'Syne, sans-serif', fontWeight: 900, color: 'var(--text)' }}>{TO}</p>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: toTinggi ? 'rgba(249,115,22,0.15)' : 'rgba(59,130,246,0.15)', color: toTinggi ? '#fb923c' : '#60a5fa' }}>
                  {toTinggi ? 'Tinggi' : 'Rendah'}
                </span>
              </div>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: toTinggi ? '#f97316' : '#3b82f6', width: `${toPct}%`, borderRadius: '99px', transition: 'width 0.7s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>3</span>
              <span>Threshold: 11</span>
              <span>19</span>
            </div>
          </div>

          {/* RO */}
          <div className="dark-card" style={{ padding: '20px' }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Relationship Orientation (RO)</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Orientasi pada hubungan · range 1–17</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '30px', fontFamily: 'Syne, sans-serif', fontWeight: 900, color: 'var(--text)' }}>{RO}</p>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: roTinggi ? 'rgba(249,115,22,0.15)' : 'rgba(59,130,246,0.15)', color: roTinggi ? '#fb923c' : '#60a5fa' }}>
                  {roTinggi ? 'Tinggi' : 'Rendah'}
                </span>
              </div>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: roTinggi ? '#f97316' : '#3b82f6', width: `${roPct}%`, borderRadius: '99px', transition: 'width 0.7s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>1</span>
              <span>Threshold: 9</span>
              <span>17</span>
            </div>
          </div>

          {/* E Score */}
          <div className="dark-card" style={{ padding: '20px' }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Skor Efektivitas (E)</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Konversi dari Grand Total · range 0–4</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '30px', fontFamily: 'Syne, sans-serif', fontWeight: 900, color: 'var(--text)' }}>{safeE.toFixed(1)}</p>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: eTinggi ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)', color: eTinggi ? '#4ade80' : 'var(--text-muted)' }}>
                  {eTinggi ? 'Efektif (≥2.0)' : 'Kurang Efektif'}
                </span>
              </div>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: eTinggi ? '#22c55e' : '#6b7280', width: `${ePct}%`, borderRadius: '99px', transition: 'width 0.7s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>0</span>
              <span>Threshold: 2.0</span>
              <span>4.0</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="dark-card" style={{ padding: '20px' }}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Grand Total</p>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>TO + RO + E_raw + O_raw</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '30px', fontFamily: 'Syne, sans-serif', fontWeight: 900, color: 'var(--text)' }}>{grandTotal}</p>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'rgba(212,168,83,0.15)', color: 'var(--accent)' }}>
                  Skor Total
                </span>
              </div>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--accent)', width: `${gtPct}%`, borderRadius: '99px', transition: 'width 0.7s' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
              <span>0</span>
              <span>Dasar E-score</span>
              <span>50</span>
            </div>
          </div>
        </div>

        {/* ── Decision Tree Visual ───────────────────────────────── */}
        <div className="dark-card" style={{ overflow: 'hidden' }}>
          <div style={{ background: 'var(--surface-2)', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '13px' }}>Peta Gaya Manajemen (Decision Tree)</h3>
          </div>
          <div style={{ padding: '24px' }}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Executive',           emoji: '🌟', to: true,  ro: true,  e: true  },
                { label: 'Compromiser',          emoji: '⚖️', to: true,  ro: true,  e: false },
                { label: 'Benevolent Autocrat',  emoji: '💪', to: true,  ro: false, e: true  },
                { label: 'Autocrat',             emoji: '⚡', to: true,  ro: false, e: false },
                { label: 'Developer',            emoji: '🌱', to: false, ro: true,  e: true  },
                { label: 'Missionary',           emoji: '🤝', to: false, ro: true,  e: false },
                { label: 'Bureaucrat',           emoji: '📋', to: false, ro: false, e: true  },
                { label: 'Deserter',             emoji: '❌', to: false, ro: false, e: false },
              ].map(item => {
                const isActive = item.label === gaya
                return (
                  <div
                    key={item.label}
                    style={{
                      borderRadius: '10px',
                      padding: '12px',
                      border: isActive ? '2px solid var(--accent-border)' : '1px solid var(--border)',
                      background: isActive ? 'var(--accent-dim)' : 'var(--surface-2)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span>{item.emoji}</span>
                      <span style={{ fontSize: '12px', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--accent)' : 'var(--text-sub)' }}>{item.label}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, background: item.to ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)', color: item.to ? '#fb923c' : 'var(--text-muted)' }}>
                        TO: {item.to ? 'T' : 'R'}
                      </span>
                      <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, background: item.ro ? 'rgba(249,115,22,0.15)' : 'rgba(255,255,255,0.05)', color: item.ro ? '#fb923c' : 'var(--text-muted)' }}>
                        RO: {item.ro ? 'T' : 'R'}
                      </span>
                      <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', fontWeight: 600, background: item.e ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)', color: item.e ? '#4ade80' : 'var(--text-muted)' }}>
                        E: {item.e ? '≥2' : '<2'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>T = Tinggi · R = Rendah · E = Skor Efektivitas</p>
          </div>
        </div>

        <PremiumSection show={!!fromDashboard} testType="MSDT" pesertaId={pesertaId} nama={nama}>
        {/* ── Implikasi HR ───────────────────────────────────────── */}
        <div className="dark-card" style={{ overflow: 'hidden' }}>
          <div style={{ background: 'var(--surface-2)', padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>💼</span>
            <div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>Implikasi & Rekomendasi HR</h3>
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '99px', background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                Gaya: {gaya}
              </span>
            </div>
          </div>
          <div style={{ padding: '20px 24px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-sub)', lineHeight: '1.75' }}>{info.implikasi}</p>
          </div>
        </div>

        {/* ── Ringkasan Skor ─────────────────────────────────────── */}
        <div className="dark-card" style={{ overflow: 'hidden' }}>
          <div style={{ background: 'var(--surface-2)', padding: '12px 24px', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Ringkasan Skor</h3>
          </div>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '10px 24px', textAlign: 'left' }}>Dimensi</th>
                <th style={{ padding: '10px 24px', textAlign: 'center' }}>Skor</th>
                <th style={{ padding: '10px 24px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 24px', color: 'var(--text-sub)' }}>Task Orientation (TO)</td>
                <td style={{ padding: '12px 24px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>{TO}</td>
                <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: toTinggi ? 'rgba(249,115,22,0.15)' : 'rgba(59,130,246,0.15)', color: toTinggi ? '#fb923c' : '#60a5fa' }}>
                    {toTinggi ? 'Tinggi (>11)' : 'Rendah (≤11)'}
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 24px', color: 'var(--text-sub)' }}>Relationship Orientation (RO)</td>
                <td style={{ padding: '12px 24px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>{RO}</td>
                <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: roTinggi ? 'rgba(249,115,22,0.15)' : 'rgba(59,130,246,0.15)', color: roTinggi ? '#fb923c' : '#60a5fa' }}>
                    {roTinggi ? 'Tinggi (>9)' : 'Rendah (≤9)'}
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px 24px', color: 'var(--text-sub)' }}>Grand Total</td>
                <td style={{ padding: '12px 24px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>{grandTotal}</td>
                <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
                    Dasar E-score
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 24px', color: 'var(--text-sub)' }}>Skor Efektivitas (E)</td>
                <td style={{ padding: '12px 24px', textAlign: 'center', fontWeight: 700, color: 'var(--text)' }}>{safeE.toFixed(1)}</td>
                <td style={{ padding: '12px 24px', textAlign: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: eTinggi ? 'rgba(34,197,94,0.15)' : 'rgba(107,114,128,0.15)', color: eTinggi ? '#4ade80' : '#9ca3af' }}>
                    {eTinggi ? 'Efektif (≥2.0)' : 'Kurang Efektif (<2.0)'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </PremiumSection>

        {/* ── Catatan ────────────────────────────────────────────── */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '14px', padding: '20px' }}>
          <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', color: 'var(--text-sub)', letterSpacing: '0.08em', marginBottom: '10px' }}>⚠️ CATATAN PENTING</h4>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.75' }}>
            MSDT adalah alat <strong style={{ color: 'var(--text-sub)' }}>diagnostik gaya manajemen</strong>, bukan penilaian mutlak kualitas kepemimpinan.
            Gaya manajemen dapat berkembang dan beradaptasi sesuai konteks dan situasi.
            Interpretasi dan tindak lanjut harus dilakukan oleh profesional HR yang berwenang.
            Hasil bersifat <strong style={{ color: 'var(--text-sub)' }}>rahasia</strong> dan hanya digunakan untuk kepentingan pengembangan diri dan profesional Anda.
          </p>
        </div>

        {/* Print-Only Footer */}
        <div className="print-only" style={{ display: 'none', paddingTop: '16px', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#777', lineHeight: '1.6' }}>MSDT adalah alat diagnostik gaya manajemen. Gaya manajemen dapat berkembang dan beradaptasi sesuai konteks dan situasi.</p>
          <p style={{ fontSize: '10px', color: '#bbb', marginTop: '4px' }}>© 2026 AssesIN · assesin.com · Laporan ini bersifat rahasia</p>
        </div>

        {/* ── Navigasi (hidden in print) ─────────────────────────── */}
        <div className="print-hide" style={{ display: 'flex', gap: '10px', justifyContent: 'center', paddingTop: '8px' }}>
          {!fromDashboard && (
            <button
              onClick={() => navigate('/tes-msdt')}
              style={{ padding: '12px 24px', background: 'var(--surface-2)', color: 'var(--text-sub)', borderRadius: '10px', fontWeight: 600, fontSize: '13px', border: '1px solid var(--border)', cursor: 'pointer' }}
            >
              Ulangi Tes
            </button>
          )}
          <button
            onClick={() => navigate(fromDashboard ? '/dashboard' : '/')}
            style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
          >
            {fromDashboard ? '← Dashboard' : '← Beranda'}
          </button>
          <button
            onClick={() => window.print()}
            style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px 28px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
          >
            🖨️ Cetak / PDF
          </button>
        </div>

      </div>
    </div>
  )
}
