import { useLocation, useNavigate } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'
import { LaporanPage, LaporanBar, LaporanHero, Kartu, Bar, Cincin, Chip, Sorot, Catatan, AksiBawah, TanpaData } from '../components/Laporan'

/* ── Tabel norma DASS-21 (skor sudah dikali 2) ──────────────────── */
function getKategori(skala, skor) {
  const tabel = {
    D: [
      { max: 9,  label: 'Normal',       warna: 'emerald' },
      { max: 13, label: 'Ringan',       warna: 'lime'    },
      { max: 20, label: 'Sedang',       warna: 'amber'   },
      { max: 27, label: 'Berat',        warna: 'orange'  },
      { max: 42, label: 'Sangat Berat', warna: 'rose'    },
    ],
    A: [
      { max: 7,  label: 'Normal',       warna: 'emerald' },
      { max: 9,  label: 'Ringan',       warna: 'lime'    },
      { max: 14, label: 'Sedang',       warna: 'amber'   },
      { max: 19, label: 'Berat',        warna: 'orange'  },
      { max: 42, label: 'Sangat Berat', warna: 'rose'    },
    ],
    S: [
      { max: 14, label: 'Normal',       warna: 'emerald' },
      { max: 18, label: 'Ringan',       warna: 'lime'    },
      { max: 25, label: 'Sedang',       warna: 'amber'   },
      { max: 33, label: 'Berat',        warna: 'orange'  },
      { max: 42, label: 'Sangat Berat', warna: 'rose'    },
    ],
  }
  return tabel[skala].find(t => skor <= t.max) ?? tabel[skala].at(-1)
}

const severityOrder = ['Normal', 'Ringan', 'Sedang', 'Berat', 'Sangat Berat']

/* ── Informasi per skala ──────────────────────────────────────────── */
const skalaInfo = {
  D: {
    nama: 'Depresi',
    emoji: '💙',
    thresholds: 'Normal: 0–9 · Ringan: 10–13 · Sedang: 14–20 · Berat: 21–27 · Sangat Berat: ≥28',
    narasi: {
      Normal:
        'Tidak menunjukkan gejala depresi yang signifikan. Kondisi afektif dalam batas sehat dan wajar.',
      Ringan:
        'Terdapat beberapa gejala depresi ringan seperti penurunan suasana hati atau berkurangnya antusiasme. Perlu perhatian agar tidak berlanjut.',
      Sedang:
        'Gejala depresi pada tingkat sedang yang dapat mulai mempengaruhi motivasi, energi, dan produktivitas kerja sehari-hari.',
      Berat:
        'Gejala depresi yang cukup intens. Mungkin mengalami kesulitan menjalankan fungsi sehari-hari. Perlu dukungan profesional segera.',
      'Sangat Berat':
        'Gejala depresi yang sangat berat dan sangat mengganggu. Memerlukan penanganan segera dari psikolog atau psikiater.',
    },
  },
  A: {
    nama: 'Kecemasan',
    emoji: '⚡',
    thresholds: 'Normal: 0–7 · Ringan: 8–9 · Sedang: 10–14 · Berat: 15–19 · Sangat Berat: ≥20',
    narasi: {
      Normal:
        'Tidak ada indikasi kecemasan yang signifikan. Respons emosional terhadap situasi sehari-hari tergolong sehat dan proporsional.',
      Ringan:
        'Kecemasan pada tingkat ringan yang masih dapat dikelola sendiri. Perlu strategi koping dan teknik relaksasi yang lebih teratur.',
      Sedang:
        'Kecemasan pada tingkat sedang yang dapat mempengaruhi fokus, pengambilan keputusan, dan interaksi sosial di lingkungan kerja.',
      Berat:
        'Kecemasan yang cukup intens, mungkin disertai gejala fisik. Berdampak pada kualitas kerja dan kesehatan. Perlu intervensi profesional.',
      'Sangat Berat':
        'Kecemasan yang sangat tinggi. Memerlukan penanganan segera dari tenaga kesehatan mental untuk mencegah dampak yang lebih lanjut.',
    },
  },
  S: {
    nama: 'Stres',
    emoji: '🌊',
    thresholds: 'Normal: 0–14 · Ringan: 15–18 · Sedang: 19–25 · Berat: 26–33 · Sangat Berat: ≥34',
    narasi: {
      Normal:
        'Tingkat stres dalam batas yang dapat dikelola. Kemampuan adaptasi terhadap tekanan dan tuntutan pekerjaan tergolong baik.',
      Ringan:
        'Stres pada tingkat ringan. Disarankan memperkuat manajemen waktu, teknik relaksasi, dan keseimbangan antara kerja dan kehidupan pribadi.',
      Sedang:
        'Stres pada tingkat sedang yang dapat mempengaruhi konsentrasi, kreativitas, dan hubungan interpersonal di tempat kerja.',
      Berat:
        'Stres yang cukup tinggi dan berisiko mengganggu kesehatan fisik maupun mental. Perlu dukungan konseling dan evaluasi beban kerja.',
      'Sangat Berat':
        'Stres yang sangat tinggi. Memerlukan penanganan segera, termasuk kemungkinan penyesuaian temporer atas beban dan lingkungan kerja.',
    },
  },
}

/* ── Konfigurasi warna per tingkat keparahan ────────────────────── */
const warnaConfig = {
  emerald: { hex: '#22c55e' },
  lime:    { hex: '#84cc16' },
  amber:   { hex: '#f59e0b' },
  orange:  { hex: '#f97316' },
  rose:    { hex: '#f43f5e' },
}

/* ── Rekomendasi HR per tingkat keparahan tertinggi ─────────────── */
const rekomendasiHR = {
  Normal: {
    label: 'Kondisi Baik',
    icon: '✅',
    warna: 'emerald',
    tindakan: [
      'Pertahankan gaya hidup sehat dan keseimbangan antara kerja dan kehidupan pribadi.',
      'Ikuti program kesejahteraan yang tersedia sebagai pemeliharaan kesehatan mental rutin.',
      'Jadwalkan asesmen ulang secara berkala (minimal 1 tahun sekali).',
    ],
  },
  Ringan: {
    label: 'Perlu Perhatian',
    icon: '👁️',
    warna: 'lime',
    tindakan: [
      'Dorong penerapan teknik relaksasi dan manajemen stres sederhana dalam rutinitas sehari-hari.',
      'Pastikan beban kerja dalam batas wajar dan ada dukungan sosial yang memadai dari rekan kerja.',
      'Lakukan pemantauan kondisi secara berkala dalam 3–6 bulan ke depan.',
    ],
  },
  Sedang: {
    label: 'Perlu Dukungan',
    icon: '🤝',
    warna: 'amber',
    tindakan: [
      'Rekomendasikan sesi konseling atau coaching dengan psikolog atau konselor organisasi.',
      'Tinjau kembali distribusi beban kerja dan kejelasan peran dalam jabatan.',
      'Berikan dukungan sosial aktif dari atasan langsung dan rekan kerja terdekat.',
      'Jadwalkan evaluasi ulang kondisi dalam 1–3 bulan ke depan.',
    ],
  },
  Berat: {
    label: 'Perlu Intervensi',
    icon: '🏥',
    warna: 'orange',
    tindakan: [
      'Segera rujuk ke psikolog atau konselor profesional untuk intervensi terstruktur.',
      'Pertimbangkan penyesuaian sementara atas beban kerja dan tanggung jawab yang diemban.',
      'Aktifkan jaringan dukungan: atasan langsung, rekan kerja, serta keluarga.',
      'Lakukan pemantauan intensif dan evaluasi ulang dalam 2–4 minggu ke depan.',
    ],
  },
  'Sangat Berat': {
    label: 'Butuh Penanganan Segera',
    icon: '🚨',
    warna: 'rose',
    tindakan: [
      'Segera rujuk ke tenaga kesehatan mental profesional (psikolog klinis atau psikiater).',
      'Pertimbangkan cuti medis atau pengurangan beban kerja sementara sesuai rekomendasi medis.',
      'Pastikan mendapat dukungan penuh dari keluarga dan lingkungan sosial terdekat.',
      'Koordinasikan dengan tim HR/People dan profesional kesehatan untuk tindak lanjut yang komprehensif.',
    ],
  },
}

/* ════════════════════════════════════════════════════════════════════
   KOMPONEN UTAMA
═══════════════════════════════════════════════════════════════════ */
/* ── Konten premium DASS ────────────────────────────────────── */
function RekomendasiDASS({ rekHR }) {
  const hex = warnaConfig[rekHR.warna]?.hex ?? '#4f46e5'
  return (
    <Kartu ikon={rekHR.icon} judul="Rekomendasi tindak lanjut" sub={`Status keseluruhan: ${rekHR.label}`} aksen={hex}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {rekHR.tindakan.map((t, i) => (
          <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: 'var(--text-sub)', lineHeight: '1.65' }}>
            <span style={{ flexShrink: 0, width: '24px', height: '24px', borderRadius: '99px', background: hex, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
              {i + 1}
            </span>
            {t}
          </li>
        ))}
      </ol>
    </Kartu>
  )
}

export default function HasilDass() {
  const { state } = useLocation()
  const navigate  = useNavigate()

  // Penyimpanan ke database dilakukan di TesDass sebelum berpindah ke
  // halaman ini; halaman hasil hanya menampilkan.
  if (!state?.skor) return <TanpaData onKembali={() => navigate('/tes-dass')} />

  const { skor, nama, email, pesertaId, fromDashboard } = state

  const kD = getKategori('D', skor.D)
  const kA = getKategori('A', skor.A)
  const kS = getKategori('S', skor.S)

  /* Keparahan tertinggi menentukan rekomendasi keseluruhan */
  const worstIdx   = Math.max(...[kD, kA, kS].map(k => severityOrder.indexOf(k.label)))
  const rekHR      = rekomendasiHR[severityOrder[worstIdx]]
  const statusHex  = warnaConfig[rekHR.warna]?.hex ?? '#4f46e5'

  const skalaData = [
    { key: 'D', skor: skor.D, kat: kD },
    { key: 'A', skor: skor.A, kat: kA },
    { key: 'S', skor: skor.S, kat: kS },
  ]
  const keBelakang = () => navigate(fromDashboard ? '/dashboard' : '/')

  return (
    <LaporanPage bar={<LaporanBar kembali={fromDashboard ? '← Dashboard' : null} onKembali={keBelakang} />}>
      <LaporanHero tes="DASS-21" sub="Depression · Anxiety · Stress Scales" nama={nama} tersimpan={!!pesertaId} warna="#0f766e" warna2="#0284c7" watermark="DASS">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '40px' }}>{rekHR.icon}</span>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p className="rpt-label">Status kesejahteraan psikologis</p>
            <p className="rpt-besar" style={{ fontSize: '28px' }}>{rekHR.label}</p>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', gap: '12px', flexWrap: 'wrap', marginTop: '20px' }}>
          {skalaData.map(({ key, skor: s, kat }) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <Cincin nilai={s} maks={42} terang ukuran={104} tebal={9} label="dari 42" />
              <p style={{ fontSize: '14px', fontWeight: 700, marginTop: '8px' }}>{skalaInfo[key].nama}</p>
              <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.75)' }}>{kat.label}</p>
            </div>
          ))}
        </div>
      </LaporanHero>

      {skalaData.map(({ key, skor: s, kat }) => {
        const info = skalaInfo[key]
        const hex  = warnaConfig[kat.warna]?.hex ?? '#64748b'
        return (
          <Kartu key={key} ikon={info.emoji} judul={info.nama} sub={info.thresholds} aksen={hex}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
              <p style={{ fontSize: '30px', fontWeight: 800, color: hex, lineHeight: 1 }}>{s}<span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 600 }}> / 42</span></p>
              <Chip warna={hex} besar>{kat.label}</Chip>
            </div>
            <Bar nilai={s} maks={42} warna={hex} />
            <p className="rpt-teks" style={{ marginTop: '12px' }}>{info.narasi[kat.label]}</p>
          </Kartu>
        )
      })}

      {fromDashboard ? (
        <RekomendasiDASS rekHR={rekHR} />
      ) : (
        <PaymentGate testType="DASS" pesertaId={pesertaId} nama={nama} email={email}>
          <RekomendasiDASS rekHR={rekHR} />
        </PaymentGate>
      )}

      {worstIdx >= 3 && (
        <Sorot judul="Anda tidak sendirian" warna={statusHex}>
          Bila perasaan ini terasa berat, bicarakan dengan orang yang Anda percaya atau tenaga profesional (psikolog, dokter, atau layanan kesehatan jiwa terdekat). Meminta bantuan adalah langkah yang berani.
        </Sorot>
      )}

      <Catatan>
        DASS-21 adalah alat skrining psikologis, bukan instrumen diagnostik klinis. Hasil ini mencerminkan kondisi emosional yang dilaporkan dalam 1 minggu terakhir.
        Interpretasi dan tindak lanjut sebaiknya dilakukan bersama tenaga profesional yang berwenang. Hasil bersifat rahasia.
      </Catatan>

      <AksiBawah kembali={fromDashboard ? 'Dashboard' : 'Beranda'} onKembali={keBelakang} />
    </LaporanPage>
  )
}
