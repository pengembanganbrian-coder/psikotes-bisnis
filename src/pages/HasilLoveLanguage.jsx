import { useLocation, useNavigate } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'

const llInfo = {
  W: {
    nama:   'Words of Affirmation',
    indo:   'Kata-kata Penegasan',
    emoji:  '💬',
    warna:  'blue',
    deskripsi:
      'Anda merasa paling dihargai melalui ungkapan verbal — pujian tulus, ucapan terima kasih, ' +
      'kata-kata semangat, atau pesan singkat yang bermakna. Kritik yang kasar bisa terasa sangat ' +
      'menyakitkan bagi Anda.',
    ditempat_kerja:
      'Apresiasi verbal dari atasan atau rekan kerja sangat memotivasi Anda. Anda berkembang pesat ' +
      'dalam lingkungan yang sering memberikan umpan balik positif dan pengakuan atas kontribusi Anda.',
    tips_hr:
      'Berikan pengakuan verbal secara langsung maupun tertulis. Ucapan "kerja bagus" atau apresiasi ' +
      'di depan tim dapat meningkatkan motivasi dan kinerja pegawai ini secara signifikan.',
  },
  Q: {
    nama:   'Quality Time',
    indo:   'Waktu Berkualitas',
    emoji:  '⏳',
    warna:  'green',
    deskripsi:
      'Anda merasa paling dihargai ketika seseorang memberikan perhatian penuh dan hadir sepenuhnya ' +
      'bersama Anda. Bukan sekadar berada di tempat yang sama, tetapi benar-benar fokus dan terlibat ' +
      'dalam interaksi bersama Anda.',
    ditempat_kerja:
      'Anda menghargai rapat one-on-one yang fokus, diskusi mendalam, dan momen kolaborasi yang ' +
      'bermakna. Atasan yang meluangkan waktu untuk mendengar pendapat Anda membuat Anda merasa sangat dihargai.',
    tips_hr:
      'Jadwalkan sesi one-on-one secara rutin. Pastikan pertemuan berlangsung tanpa gangguan dan ' +
      'penuh keterlibatan. Libatkan pegawai ini dalam diskusi dan pengambilan keputusan tim.',
  },
  G: {
    nama:   'Receiving Gifts',
    indo:   'Menerima Hadiah',
    emoji:  '🎁',
    warna:  'purple',
    deskripsi:
      'Anda merasa paling dihargai melalui hadiah atau simbol perhatian fisik — bukan karena nilai ' +
      'materialnya, melainkan karena hadiah tersebut menunjukkan bahwa seseorang memikirkan Anda ' +
      'dan meluangkan usaha untuk menunjukkan kepedulian.',
    ditempat_kerja:
      'Penghargaan nyata seperti sertifikat, plakat, cendera mata, atau bahkan oleh-oleh kecil dari ' +
      'perjalanan dinas sangat bermakna bagi Anda. Pengakuan fisik atas kinerja membuat Anda termotivasi.',
    tips_hr:
      'Berikan penghargaan yang dapat dipegang secara fisik — sertifikat, trofi kecil, atau hadiah ' +
      'ulang tahun. Gestur kecil yang terencana jauh lebih berkesan daripada bonus tanpa sentuhan personal.',
  },
  A: {
    nama:   'Acts of Service',
    indo:   'Tindakan Pelayanan',
    emoji:  '🤝',
    warna:  'amber',
    deskripsi:
      'Anda merasa paling dihargai ketika seseorang bertindak nyata untuk meringankan beban Anda — ' +
      'membantu pekerjaan, mengambil alih tugas tertentu, atau menyelesaikan masalah secara proaktif. ' +
      'Bagi Anda, tindakan berbicara lebih keras dari kata-kata.',
    ditempat_kerja:
      'Dukungan praktis dari rekan kerja atau atasan — seperti membantu saat deadline ketat atau ' +
      'menyingkirkan hambatan pekerjaan — membuat Anda merasa benar-benar didukung dan dihargai.',
    tips_hr:
      'Tawarkan bantuan konkret saat beban kerja meningkat. Tunjukkan dukungan melalui tindakan ' +
      'nyata: hapus birokrasi yang tidak perlu, fasilitasi kebutuhan pekerjaan, dan berikan dukungan ' +
      'operasional yang aktif.',
  },
  P: {
    nama:   'Physical Touch',
    indo:   'Sentuhan Fisik',
    emoji:  '🤲',
    warna:  'rose',
    deskripsi:
      'Anda merasa paling terhubung melalui kontak fisik yang hangat dan tulus — jabat tangan erat, ' +
      'tepukan di bahu, atau high-five. Sentuhan fisik yang tepat menciptakan rasa aman, ' +
      'kedekatan, dan keterhubungan yang bermakna.',
    ditempat_kerja:
      'Interaksi fisik yang sopan dan profesional seperti jabat tangan saat bertemu, tepukan di ' +
      'bahu saat memberi semangat, atau high-five saat merayakan keberhasilan tim terasa sangat ' +
      'bermakna bagi Anda.',
    tips_hr:
      'Dalam konteks profesional, perhatikan isyarat fisik yang tepat — jabat tangan yang tulus ' +
      'saat bertemu, tepukan di bahu saat memberi apresiasi. Tetap perhatikan batas profesional ' +
      'dan budaya organisasi.',
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

  // Urutan dari tertinggi ke terendah
  const ranking = Object.entries(skor).sort((a, b) => b[1] - a[1])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '48px' }}>

      {/* Header */}
      <div style={{ background: 'rgba(9,9,15,0.97)', borderBottom: '1px solid var(--border)', padding: '28px var(--px)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="section-rule" style={{ marginBottom: '20px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Laporan Love Language</span><span className="section-rule-line" />
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '26px', color: 'var(--text)', marginBottom: '6px' }}>{nama}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Tes Love Language · {jabatan}</p>
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px var(--px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Bahasa Kasih Utama */}
        <div className="dark-card" style={{ padding: '28px', borderColor: 'var(--accent-border)' }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '20px', opacity: 0.8 }}>Bahasa Kasih Utama</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
            <span style={{ fontSize: '48px' }}>{infoUtama.emoji}</span>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>{infoUtama.indo}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontStyle: 'italic' }}>{infoUtama.nama}</p>
            </div>
            <div style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '18px', padding: '8px 16px', borderRadius: '10px', flexShrink: 0 }}>
              {skor[utama]}/12
            </div>
          </div>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{infoUtama.deskripsi}</p>
        </div>

        {/* Skor Semua LL */}
        <div className="dark-card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '15px', marginBottom: '20px' }}>Skor Semua Bahasa Kasih</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {ranking.map(([key, val], idx) => {
              const info = llInfo[key]
              const pct  = Math.round((val / maxSkor) * 100)
              const isMain = idx === 0
              return (
                <div key={key}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{info.emoji}</span>
                      <span style={{ color: isMain ? 'var(--text)' : 'var(--text-sub)', fontSize: '14px', fontWeight: isMain ? 700 : 400 }}>{info.indo}</span>
                      {isMain && <span style={{ background: 'var(--accent-dim)', color: 'var(--accent)', border: '1px solid var(--accent-border)', fontSize: '10px', fontFamily: 'Syne, sans-serif', fontWeight: 700, padding: '2px 8px', borderRadius: '99px', letterSpacing: '0.08em' }}>UTAMA</span>}
                    </div>
                    <span style={{ color: isMain ? 'var(--accent)' : 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px' }}>{val}</span>
                  </div>
                  <div style={{ height: '4px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: isMain ? 'var(--accent)' : 'rgba(255,255,255,0.15)', width: `${pct}%`, borderRadius: '99px' }} />
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
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px' }}>Bahasa Kasih Kedua</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{info2.emoji}</span>
                <div>
                  <h3 style={{ color: 'var(--text)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '2px' }}>{info2.indo}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontStyle: 'italic' }}>{info2.nama} · Skor: {skor[kedua]}/12</p>
                </div>
              </div>
              <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{info2.deskripsi}</p>
            </div>
          )
        })()}

        {/* Implikasi di Tempat Kerja */}
        <div className="dark-card" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '15px', marginBottom: '12px' }}>Implikasi di Tempat Kerja</h3>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{infoUtama.ditempat_kerja}</p>
        </div>

        {/* Rekomendasi HR */}
        <div className="dark-card" style={{ padding: '24px', borderColor: 'var(--accent-border)', background: 'rgba(212,168,83,0.04)' }}>
          <h3 style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>Rekomendasi untuk HR / Atasan</h3>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{infoUtama.tips_hr}</p>
        </div>

        {/* Deskripsi Semua LL */}
        <div className="dark-card" style={{ padding: '24px' }}>
          <h3 style={{ color: 'var(--text)', fontWeight: 600, fontSize: '15px', marginBottom: '20px' }}>Deskripsi Lengkap 5 Bahasa Kasih</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(llInfo).map(([key, info]) => (
              <div key={key} className="dark-card" style={{ padding: '16px', background: 'var(--surface-2)', borderColor: key === utama ? 'var(--accent-border)' : 'var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span>{info.emoji}</span>
                  <span style={{ color: key === utama ? 'var(--accent)' : 'var(--text-sub)', fontWeight: 600, fontSize: '14px' }}>{info.indo}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '12px', fontStyle: 'italic' }}>— {info.nama}</span>
                  {key === utama && <span style={{ marginLeft: 'auto', background: 'var(--accent)', color: '#09090f', fontSize: '10px', fontFamily: 'Syne, sans-serif', fontWeight: 700, padding: '2px 8px', borderRadius: '99px' }}>ANDA</span>}
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.65' }}>{info.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
        </PremiumSection>

        <button
          onClick={() => navigate('/')}
          style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: 'none', cursor: 'pointer', width: '100%' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          ← Kembali ke Beranda
        </button>

      </div>
    </div>
  )
}
