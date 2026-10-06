import { useLocation, useNavigate } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'
import { LaporanPage, LaporanBar, LaporanHero, Kartu, BarisSkor, Cincin, Chip, Sorot, Catatan, AksiBawah, TanpaData } from '../components/Laporan'

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

const PETA = [
  { label: 'Executive',           to: true,  ro: true,  e: true  },
  { label: 'Compromiser',         to: true,  ro: true,  e: false },
  { label: 'Benevolent Autocrat', to: true,  ro: false, e: true  },
  { label: 'Autocrat',            to: true,  ro: false, e: false },
  { label: 'Developer',           to: false, ro: true,  e: true  },
  { label: 'Missionary',          to: false, ro: true,  e: false },
  { label: 'Bureaucrat',          to: false, ro: false, e: true  },
  { label: 'Deserter',            to: false, ro: false, e: false },
]

const fmt = v => (v ?? 0).toFixed(1).replace('.', ',')

function LaporanLengkapMSDT({ gaya, info, TO, RO, E_raw, konversi }) {
  const baris = [
    ['Task Orientation (TO)', TO, konversi && fmt(konversi.TO)],
    ['Relationship Orientation (RO)', RO, konversi && fmt(konversi.RO)],
    ['Effectiveness (E)', E_raw, konversi && fmt(konversi.E)],
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Kartu ikon="💼" judul="Implikasi & rekomendasi pengembangan" sub={`Gaya ${gaya}`}>
        <Sorot judul="Rekomendasi">{info.implikasi}</Sorot>
      </Kartu>
      <Kartu ikon="📋" judul="Ringkasan skor">
        <div style={{ overflowX: 'auto' }}>
          <table className="rpt-tabel">
            <thead><tr><th>Dimensi</th><th style={{ textAlign: 'center' }}>Skor</th><th style={{ textAlign: 'right' }}>Konversi (0–4)</th></tr></thead>
            <tbody>
              {baris.map(([nama, nilai, konv]) => (
                <tr key={nama}>
                  <td>{nama}</td>
                  <td style={{ textAlign: 'center', fontWeight: 800, color: 'var(--text)' }}>{nilai ?? '—'}</td>
                  <td style={{ textAlign: 'right' }}>{konv ? <Chip warna="#4f46e5">{konv}</Chip> : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Kartu>
    </div>
  )
}

export default function HasilMsdt() {
  const { state } = useLocation()
  const navigate  = useNavigate()

  if (!state?.hasil) return <TanpaData onKembali={() => navigate('/tes-msdt')} />

  const { hasil, nama, email, pesertaId, fromDashboard } = state
  // Data lama dari server hanya menyimpan TO, RO, skor E & gaya; gayaSkor
  // (8 gaya) hanya tersedia untuk tes yang baru dikerjakan.
  const { TO, RO, E_raw, E_score, gaya, gayaSkor, gayaSeri = [] } = hasil
  const konversi = hasil.konversi || (E_score != null ? { E: E_score } : null)
  const info  = gayaInfo[gaya] || gayaInfo.Deserter
  const ciri  = PETA.find(p => p.label === gaya) || PETA.at(-1)
  const safeE = E_score ?? 0
  const urutGaya = gayaSkor ? Object.entries(gayaSkor).sort((a, b) => b[1] - a[1]) : []
  const maksGaya = Math.max(16, ...urutGaya.map(([, v]) => v))
  const keBelakang = () => navigate(fromDashboard ? '/dashboard' : '/')
  const laporan = <LaporanLengkapMSDT {...{ gaya, info, TO, RO, E_raw, konversi }} />

  return (
    <LaporanPage bar={<LaporanBar kembali={fromDashboard ? '← Dashboard' : null} onKembali={keBelakang} />}>
      <LaporanHero tes="MSDT" sub="Management Style Diagnostic Test" nama={nama} tersimpan={!!pesertaId} warna="#1e40af" warna2="#4f46e5" watermark="MSDT">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Cincin nilai={safeE} maks={4} terang ukuran={112} tampil={fmt(safeE)} label="efektivitas" />
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p className="rpt-label">{info.emoji} Gaya manajemen Anda</p>
            <p className="rpt-besar" style={{ fontSize: '28px' }}>{gaya}</p>
          </div>
        </div>
        <div className="rpt-chips" style={{ marginTop: '14px' }}>
          {[`Orientasi tugas: ${ciri.to ? 'Tinggi' : 'Rendah'}`, `Orientasi hubungan: ${ciri.ro ? 'Tinggi' : 'Rendah'}`, ciri.e ? 'Efektif' : 'Kurang efektif'].map(t => (
            <span key={t} style={{ fontSize: '12.5px', fontWeight: 700, padding: '5px 12px', borderRadius: '99px', background: 'rgba(255,255,255,0.2)' }}>{t}</span>
          ))}
        </div>
        <p className="rpt-ket" style={{ marginTop: '14px' }}>{info.deskripsi}</p>
      </LaporanHero>

      <Kartu no={1} ikon="📊" judul="Skor gaya manajemen" sub="Gaya dominan = skor tertinggi dari delapan gaya">
        {urutGaya.length > 0 ? urutGaya.map(([nama, nilai]) => (
          <BarisSkor key={nama} label={`${gayaInfo[nama].emoji} ${nama}`} nilai={nilai} maks={maksGaya}
            warna={nama === gaya ? 'var(--accent)' : '#94a3b8'} lencana={nama === gaya ? 'Dominan' : null} />
        )) : (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Rincian delapan gaya tidak tersimpan untuk hasil ini.</p>
        )}
        {gayaSeri.length > 0 && (
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '8px' }}>
            Skor {gaya} sama tinggi dengan {gayaSeri.join(', ')}. Gaya-gaya ini sama kuatnya dalam diri Anda.
          </p>
        )}
      </Kartu>

      <Kartu no={2} ikon="🗺️" judul="Peta gaya manajemen" sub="Delapan gaya berdasarkan orientasi tugas, hubungan, dan efektivitas">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
          {PETA.map(item => {
            const aktif = item.label === gaya
            return (
              <div key={item.label} style={{ borderRadius: '14px', padding: '12px', background: aktif ? 'var(--accent)' : 'var(--surface-2)', color: aktif ? '#fff' : 'var(--text-sub)', boxShadow: aktif ? '0 8px 20px -10px var(--accent)' : 'none' }}>
                <p style={{ fontSize: '14px', fontWeight: 700 }}>{gayaInfo[item.label].emoji} {item.label}</p>
                <p style={{ fontSize: '11.5px', opacity: 0.8, marginTop: '4px' }}>
                  TO {item.to ? 'T' : 'R'} · RO {item.ro ? 'T' : 'R'} · {item.e ? 'Efektif' : 'Kurang'}
                </p>
              </div>
            )
          })}
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>T = tinggi · R = rendah</p>
      </Kartu>

      {fromDashboard ? laporan : (
        <PaymentGate testType="MSDT" pesertaId={pesertaId} nama={nama} email={email}>{laporan}</PaymentGate>
      )}

      <Catatan>
        MSDT adalah alat diagnostik gaya manajemen, bukan penilaian mutlak kualitas kepemimpinan. Gaya manajemen dapat berkembang dan menyesuaikan konteks.
        Hasil bersifat rahasia dan ditujukan untuk pengembangan diri dan profesional Anda.
      </Catatan>

      <AksiBawah kembali={fromDashboard ? 'Dashboard' : 'Beranda'} onKembali={keBelakang} ulang={fromDashboard ? null : 'Ulangi tes'} onUlang={() => navigate('/tes-msdt')} />
    </LaporanPage>
  )
}
