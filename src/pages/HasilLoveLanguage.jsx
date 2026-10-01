import { useLocation, useNavigate } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'
import { LaporanPage, LaporanBar, LaporanHero, Kartu, BarisSkor, Radar, Sorot, Catatan, AksiBawah, TanpaData } from '../components/Laporan'

const llInfo = {
  W: {
    nama:  'Words of Affirmation',
    arti:  'Kata-kata penghargaan',
    emoji: '💬',
    warna: '#2563eb',
    deskripsi:
      'Anda paling merasa dihargai ketika apresiasi diucapkan: pujian yang tulus, ucapan terima kasih, kata-kata penyemangat, atau pesan yang sepenuh hati. ' +
      'Pengakuan secara lisan bukan sekadar menyenangkan bagi Anda, melainkan penting. Sebaliknya, kata-kata yang kasar atau meremehkan bisa sangat membekas.',
    diKantor:
      'Pengakuan lisan dari atasan atau rekan adalah salah satu motivator terbesar Anda. Anda berkembang di lingkungan yang menghargai kontribusi secara terbuka; ' +
      'ucapan "kerja bagus" yang tulus atau apresiasi di depan tim dapat meningkatkan semangat dan kinerja Anda secara nyata.',
    untukAtasan:
      'Berikan pengakuan secara konsisten dan spesifik, bukan pujian umum, tetapi apresiasi yang terkait dengan kontribusi nyata. ' +
      'Kalimat seperti "cara Anda menangani situasi itu luar biasa" jauh lebih berarti daripada pujian samar. Apresiasi tertulis, bahkan pesan singkat yang tulus, juga sangat bermakna.',
  },
  Q: {
    nama:  'Quality Time',
    arti:  'Waktu berkualitas',
    emoji: '⏳',
    warna: '#059669',
    deskripsi:
      'Anda paling merasa dihargai ketika seseorang memberi perhatian penuh, bukan sekadar hadir, melainkan benar-benar terlibat: mata lepas dari layar, pikiran ada di percakapan. ' +
      'Kebersamaan yang terdistraksi terasa seperti jarak bagi Anda.',
    diKantor:
      'Anda menghargai percakapan empat mata yang fokus, diskusi bermakna, dan kolaborasi yang sungguh-sungguh. ' +
      'Atasan yang meluangkan waktu khusus untuk mendengarkan ide dan kekhawatiran Anda membuat Anda merasa benar-benar diperhatikan.',
    untukAtasan:
      'Jadwalkan sesi empat mata yang rutin dan bebas gangguan. Simpan ponsel, ajukan pertanyaan yang bermakna, dan dengarkan tanpa terburu-buru. ' +
      'Libatkan orang ini dalam diskusi penting; keterlibatannya meningkat ketika ia merasa suaranya ikut menentukan hasil.',
  },
  G: {
    nama:  'Receiving Gifts',
    arti:  'Tanda penghargaan nyata',
    emoji: '🎁',
    warna: '#7c3aed',
    deskripsi:
      'Anda paling merasa dihargai lewat tanda perhatian yang nyata, bukan karena nilai materinya, tetapi karena hadiah adalah bukti bahwa seseorang sengaja memikirkan Anda. ' +
      'Gestur tak terduga yang dipilih dengan cermat terasa lebih bermakna daripada banyak kata.',
    diKantor:
      'Pengakuan yang berwujud sangat berarti bagi Anda: sertifikat, penghargaan yang dipersonalisasi, atau gestur kecil yang penuh perhatian. ' +
      'Bentuk penghargaan nyata atas kinerja membuat Anda merasa dihargai dengan cara yang tidak tergantikan oleh pujian lisan saja.',
    untukAtasan:
      'Rayakan pencapaian dengan sesuatu yang berwujud: kartu tulisan tangan, kenang-kenangan pada ulang tahun kerja, atau sertifikat penghargaan. ' +
      'Besar kecilnya tidak terlalu penting; niat dan kekhususannya yang berarti. Hadiah generik terasa hampa, hadiah yang dipilih khusus terasa tulus.',
  },
  A: {
    nama:  'Acts of Service',
    arti:  'Bantuan nyata',
    emoji: '🤝',
    warna: '#d97706',
    deskripsi:
      'Anda paling merasa dihargai ketika orang menunjukkan kepedulian lewat tindakan: membantu meringankan beban, mengambil alih sebagian tugas tanpa diminta, atau menyelesaikan masalah sebelum Anda sempat meminta. ' +
      'Bagi Anda, tindakan berbicara lebih jelas daripada kata-kata.',
    diKantor:
      'Dukungan praktis dari rekan atau atasan, misalnya turun tangan saat tenggat ketat, menghilangkan hambatan, atau menawarkan sumber daya, membuat Anda merasa didukung. ' +
      'Janji tanpa tindak lanjut terasa hampa dan cepat mengikis kepercayaan.',
    untukAtasan:
      'Tunjukkan dukungan lewat tindakan nyata. Singkirkan hambatan dari jalan orang ini sebelum diminta, tawarkan bantuan saat beban kerja memuncak. ' +
      'Pesan "saya mendukung Anda" sangat berarti bila dibuktikan, bukan hanya diucapkan. Menyederhanakan proses dan birokrasi adalah bentuk penghargaan yang kuat.',
  },
  P: {
    nama:  'Physical Touch',
    arti:  'Sentuhan & kehadiran fisik',
    emoji: '🤲',
    warna: '#e11d48',
    deskripsi:
      'Anda paling merasa terhubung lewat kontak fisik yang hangat dan tulus, seperti jabat tangan yang mantap, tepukan di bahu, atau tos merayakan keberhasilan. ' +
      'Gestur fisik yang pantas menciptakan rasa aman, kedekatan, dan keterhubungan yang sulit digantikan kata-kata.',
    diKantor:
      'Isyarat fisik yang profesional, seperti jabat tangan saat bertemu, tepukan singkat di punggung saat diapresiasi, atau tos tim saat merayakan keberhasilan, bermakna bagi Anda. ' +
      'Hal ini menandakan kehangatan dan kepercayaan.',
    untukAtasan:
      'Dalam suasana profesional, gunakan gestur fisik yang sopan dan sesuai budaya, misalnya jabat tangan yang tulus. Selalu hormati batas kenyamanan dan norma setiap orang. ' +
      'Kehadiran langsung, seperti menghampiri meja untuk berterima kasih, juga sangat berarti bagi orang ini.',
  },
}

const MAKS = 12 // tiap bahasa muncul di 12 pasangan dari 30 soal

function LaporanLengkapLL({ skor, utama, kedua }) {
  const u = llInfo[utama]
  const k = llInfo[kedua]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Kartu ikon={k.emoji} judul={`Bahasa kedua: ${k.nama}`} sub={`${k.arti} · skor ${skor[kedua]}/${MAKS}`} aksen={k.warna}>
        <p className="rpt-teks">{k.deskripsi}</p>
      </Kartu>

      <Kartu ikon="🏢" judul="Bagaimana ini tampak di tempat kerja">
        <p className="rpt-teks">{u.diKantor}</p>
      </Kartu>

      <Kartu ikon="🧭" judul="Panduan untuk atasan & rekan kerja">
        <Sorot judul={`Cara menghargai pemilik ${u.nama}`} warna={u.warna}>{u.untukAtasan}</Sorot>
      </Kartu>

      <Kartu ikon="📚" judul="Mengenal kelima bahasa apresiasi">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Object.entries(llInfo).map(([key, info]) => (
            <div key={key} style={{ borderRadius: '14px', padding: '14px 16px', background: key === utama ? `${info.warna}12` : 'var(--surface-2)', borderLeft: `4px solid ${info.warna}` }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)', marginBottom: '4px' }}>
                {info.emoji} {info.nama} <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>· {info.arti}</span>
                {key === utama && <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: 700, color: info.warna }}>ANDA</span>}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-sub)', lineHeight: '1.65' }}>{info.deskripsi}</p>
            </div>
          ))}
        </div>
      </Kartu>
    </div>
  )
}

export default function HasilLoveLanguage() {
  const { state } = useLocation()
  const navigate  = useNavigate()

  if (!state?.skor || !llInfo[state.utama]) return <TanpaData onKembali={() => navigate('/tes-love-language')} />

  const { skor, utama, kedua, nama, email, pesertaId, fromDashboard } = state
  const u = llInfo[utama]
  const ranking = Object.entries(skor).sort((a, b) => b[1] - a[1])
  const keBelakang = () => navigate(fromDashboard ? '/dashboard' : '/')
  const laporan = <LaporanLengkapLL skor={skor} utama={utama} kedua={kedua} />

  return (
    <LaporanPage bar={<LaporanBar kembali={fromDashboard ? '← Dashboard' : null} onKembali={keBelakang} />}>
      <LaporanHero tes="Love Language" sub="Bahasa apresiasi di tempat kerja" nama={nama} tersimpan={!!pesertaId} warna="#db2777" warna2="#7c3aed" watermark="♥">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span className="rpt-tile" style={{ fontSize: '32px' }}>{u.emoji}</span>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p className="rpt-label">Bahasa apresiasi utama Anda</p>
            <p className="rpt-besar" style={{ fontSize: '28px' }}>{u.nama}</p>
            <p style={{ fontSize: '14px', opacity: 0.9 }}>{u.arti} · skor {skor[utama]}/{MAKS}</p>
          </div>
        </div>
        <p className="rpt-ket" style={{ marginTop: '14px' }}>{u.deskripsi}</p>
      </LaporanHero>

      <Kartu no={1} ikon="📊" judul="Profil bahasa apresiasi" sub={`Skor tiap bahasa, maksimum ${MAKS}`} aksen="#db2777">
        <div style={{ marginBottom: '24px' }}>
          <Radar maks={MAKS} warna="#db2777" data={Object.keys(llInfo).map(k => ({ label: llInfo[k].arti, nilai: skor[k] ?? 0, warna: llInfo[k].warna }))} />
        </div>
        {ranking.map(([key, val], i) => (
          <BarisSkor key={key} label={`${llInfo[key].emoji} ${llInfo[key].nama}`} sub={llInfo[key].arti} nilai={val} maks={MAKS} tampil={val}
            warna={llInfo[key].warna} lencana={i === 0 ? 'Utama' : i === 1 ? 'Kedua' : null} />
        ))}
      </Kartu>

      {fromDashboard ? laporan : (
        <PaymentGate testType="Love Language" pesertaId={pesertaId} nama={nama} email={email}>{laporan}</PaymentGate>
      )}

      <Catatan>
        Hasil ini bersifat indikatif dan menggambarkan cara Anda paling mudah merasa dihargai, bukan ukuran baik-buruk.
        Setiap orang membutuhkan kelima bahasa dalam kadar berbeda. Hasil bersifat rahasia.
      </Catatan>

      <AksiBawah kembali={fromDashboard ? 'Dashboard' : 'Beranda'} onKembali={keBelakang} />
    </LaporanPage>
  )
}
