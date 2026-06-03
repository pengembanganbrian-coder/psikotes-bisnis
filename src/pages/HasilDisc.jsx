import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import PaymentGate from '../components/PaymentGate'

const profilDISC = {
  D: { nama: "Developer", tipe: "D", deskripsi: "selalu akan mencari solusi-solusi baru dari tiap persoalan yang dihadapi. Ia memiliki internal motif yang kuat dan memiliki kecepatan kerja untuk mencapai tujuannya, serta mampu membuat keputusan dengan mudah walaupun dalam suasana penuh tekanan. Ia adalah seorang yang kreatif dan percaya diri, ia cenderung menggunakan keseimbangan antara intuisi dan fakta ketika mengambil keputusan. Ia memiliki kekuatan ego yang besar, cenderung sangat individualistis dan selalu mencari pandangan-pandangan baru karenanya ia tidak menyukai berada dibawah atasan yang penuh kontrol.", karakteristik: ["Mengambil keputusan","Langsung/direct","Kekuatan ego yang besar","Memecahkan masalah","Berani mengambil resiko","Dominan","Penggerak"], perilakuKerja: { kekuatan: ["Tidak takut bersaing","Kreatif dan memiliki banyak ide","Percaya diri dan mandiri","Berani mengambil risiko"], kelemahan: ["Kurang peka terhadap perasaan orang lain","Terlalu cepat mengambil keputusan","Cenderung mendominasi"] }, suasanaEmosi: { kekuatan: ["Percaya diri","Berkemauan keras","Tekun dan ulet","Berani dan tegar"], kelemahan: ["Pendiriannya sangat keras","Tidak sabaran, suka menekan","Memaksakan kehendak"] }, kekuatan: ["Percaya diri","Berkemauan keras","Tekun dan ulet","Berani dan tegar","Menghadapi hidup tanpa kompromi","Organisator dan promotor","Cepat bertindak","Berani memutuskan dalam keadaan mendesak","Mampu memberikan solusi","Memiliki inisiatif","Mampu bekerja dengan cepat","Memotivasi orang lain","Cepat membuat keputusan","Berani mengambil resiko"], kelemahan: ["Pendiriannya sangat keras","Terlalu cepat mengambil keputusan","Tidak sabaran, suka menekan","Kurang peka terhadap perasaan orang lain","Terlalu percaya diri","Kurang menghargai pendapat orang lain","Cenderung mendominasi","Memaksakan kehendak","Cenderung egois"], gayaKepemimpinan: ["Mengendalikan orang lain","Cepat bertindak","Percaya diri","Mencari perubahan","Persuasif","Kompetitif","Berani mengambil resiko"], pekerjaan: ["Pekerjaan yang membutuhkan pengambilan keputusan secara cepat","Pekerjaan yang berorientasi kepada hasil","Pekerjaan yang kompetitif dan banyak tantangan","Bebas dari pekerjaan detail dan spesifik","Menggunakan kekuasaan dan wewenang","Mengambil suatu gagasan dan menjalankannya","Beragam kegiatan","Bebas dari pengawasan langsung","Memunculkan ide-ide baru","Mengkoordinir kegiatan"], karir: ["Director","Entrepreneur","Manager","Sales Manager","Executive"] },
  I: { nama: "Promoter", tipe: "I", deskripsi: "menunjukkan sikap yang antusias dan optimis, ia akan menyelesaikan tugas melalui orang lain. Senang berada diantara orang banyak, tidak suka menyendiri. Kemampuan komunikasinya sangat dominan. Karena ia lebih tertarik pada partisipasi dan interaksi dengan orang lain dalam setiap aktivitas, menyebabkan dirinya kurang fokus pada penyelesaian tugas.", karakteristik: ["Komunikator yang baik","Menciptakan kesan yang menyenangkan","Antusias","Optimis","Persuasif"], perilakuKerja: { kekuatan: ["Pandai berkomunikasi dan bersosialisasi","Mampu memotivasi orang lain","Kreatif dan inovatif","Antusias dan enerjik"], kelemahan: ["Kurang fokus pada penyelesaian tugas","Kurang terorganisir","Mudah terdistraksi"] }, suasanaEmosi: { kekuatan: ["Hangat dan bersemangat","Berkarisma","Antusias","Ekspresif"], kelemahan: ["Terlalu reaktif","Keputusannya sering berdasarkan emosi","Tidak ketat dalam disiplin diri"] }, kekuatan: ["Hangat dan bersemangat","Berkarisma","Antusias","Ekspresif","Aktif","Enerjik","Meyakinkan","Memberikan semangat","Aktif berbicara","Senang membina hubungan sosial","Optimis","Humoris","Mampu menyampaikan dengan jelas"], kelemahan: ["Terlalu reaktif","Kurang tenang","Cenderung melebih-lebihkan sesuatu","Keputusannya sering berdasarkan emosi","Tidak teratur","Tidak ketat dalam disiplin diri","Banyak waktu terbuang karena mengobrol berlebihan","Sulit mengingat nama orang dan hal detail","Impulsif"], gayaKepemimpinan: ["Fleksibel","Senang melakukan hal-hal baru","Antusias","Mudah menyesuaikan diri","Penuh inspirasi","Komunikator","Optimis","Demonstratif","Persuasif"], pekerjaan: ["Banyak berhubungan dengan orang lain","Pekerjaan yang memerlukan pendekatan persuasif","Melakukan verbalisasi yang inspiratif","Aktif dan mobilitas tinggi","Kesempatan untuk mempresentasikan konsep baru","Mengembangkan kegiatan baru yang berbeda","Pekerjaan yang cepat berubah-ubah","Melakukan pembinaan dan arahan kepada orang lain","Menangani keluhan pelanggan"], karir: ["Public Relations","Sales","Event Organizer","Trainer","Konsultan"] },
  S: { nama: "Specialist", tipe: "S", deskripsi: "adalah individu yang konsisten, tekun bekerja dalam lingkungan yang tidak berubah. Ia dapat bekerjasama dengan berbagai model perilaku karena mampu menampilkan perilaku yang diharapkan. Ia adalah orang yang memperhatikan orang lain, sabar dan selalu bersedia membantu orang.", karakteristik: ["Pendengar yang baik","Peserta tim","Posesif","Tenang","Mudah diprediksi","Memahami orang lain","Penuh persahabatan","Mampu berempati"], perilakuKerja: { kekuatan: ["Konsisten dan dapat diandalkan","Sabar dan telaten","Setia terhadap organisasi","Pendengar yang baik"], kelemahan: ["Sulit beradaptasi dengan perubahan","Sulit berkata tidak","Lamban dalam bergerak"] }, suasanaEmosi: { kekuatan: ["Tenang, cinta damai","Ramah","Sopan santun","Sabar","Setia"], kelemahan: ["Kurang percaya diri","Cenderung pemalu","Lamban, statis","Menghindari konflik"] }, kekuatan: ["Tenang, cinta damai","Ramah","Sopan santun","Baik hati/lembut hati","Tidak emosional","Sabar","Setia","Tekun","Praktis, sederhana dalam bekerja","Mampu melibatkan orang lain","Terbuka pada gagasan orang lain","Memiliki kesabaran dan ketenangan dalam bekerja","Memiliki Empati yang tinggi"], kelemahan: ["Kurang percaya diri","Cenderung pemalu","Pesimis, penakut, selalu khawatir","Kompromistis","Lamban, statis","Terlalu hati-hati","Cenderung menghindari resiko","Menolak/takut pada perubahan","Sulit memutuskan sesuatu","Sulit menolak permintaan orang lain","Santai dalam bekerja","Menghindari konflik","Kurang ekspresif"], gayaKepemimpinan: ["Pemikir","Idealis","Percaya pada orang lain","Loyal","Mau membantu dan menolong","Kooperatif","Santai/rileks","Konsisten","Perilakunya mudah diramalkan","Pendengar yang baik","Tulus","Empati yang tinggi"], pekerjaan: ["Pekerjaan yang menuntut kesabaran","Mengikuti prosedur baku","Klarifikasi kebijakan sebelum melangkah","Mengumpulkan informasi, fakta dan data","Melakukan penyiapan bahan-bahan pendukung","Menyimpan dan memelihara dokumen","Pekerjaan rutin dan administratif","Melaksanakan, mengelola pekerjaan sesuai peraturan","Pekerjaan yang memerlukan konsistensi dalam jangka waktu panjang"], karir: ["Administrator","Customer Service","HR Specialist","Konselor","Perawat"] },
  C: { nama: "Objective Thinker", tipe: "C", deskripsi: "adalah seorang pekerja yang sangat taat pada peraturan dan prosedur. Ia akan menjalankan tugas dan tanggung jawabnya berdasarkan uraian tugas yang jelas. Ia juga mampu merencanakan, mengendalikan diri, penuh perhitungan dan sangat menuntut akurasi dalam bekerja.", karakteristik: ["Akurat","Analitis","Hati-hati","Penuh Kesadaran","Menemukan fakta","Ketepatan","Standar tinggi","Sistematis"], perilakuKerja: { kekuatan: ["Pemikir dan menganalisa","Kreatif dan memiliki intelektual tinggi","Berbakat dan cerdas","Rapi, tertib, teratur","Konservatif"], kelemahan: ["Ragu untuk berinovasi","Terlalu banyak menganalisa","Terlalu banyak berpikir","Perlu waktu untuk menyetujui sesuatu","Menolak/takut pada perubahan"] }, suasanaEmosi: { kekuatan: ["Waspada","Mematuhi aturan","Sadar akan mutu","Ramah","Setia"], kelemahan: ["Sulit memutuskan","Cenderung Rigid","Sedih tanpa alasan","Cenderung pemalu","Kompromistis"] }, kekuatan: ["Konservatif","Pemikir","Sadar akan mutu","Mematuhi aturan","Diplomatis","Waspada","Perfeksionis","Senang pada detail","Senang pada rincian yang rumit","Mampu mengorganisasikan tugas","Memiliki perencanaan jangka panjang","Menentukan standar yang tinggi dan ideal","Mampu menganalisa secara mendalam","Bekerja dengan akurasi tinggi","Konsisten menjaga kualitas"], kelemahan: ["Menyalahkan diri sendiri","Cenderung Rigid","Pesimis, seringkali berpikir negatif","Sedih tanpa alasan","Sangat berhati-hati","Over Sensitif","Sulit memutuskan","Tidak tegas","Terlalu banyak teori, kurang praktis","Mudah tersinggung","Terlalu banyak waktu digunakan untuk persiapan","Terlalu fokus pada hal detail","Mengingat hal-hal negatif","Menaruh curiga kepada orang lain"], gayaKepemimpinan: ["Tekun dan Ulet","Praktis","Penuh perhitungan","Menjaga jarak","Menyampaikan fakta","Selalu melakukan evaluasi dan monitoring","Analitis","Ketepatan","Kualitas","Rinci","Berpikir kritis","Hati-hati","Sistematis","Cermat","Sensitif","Standar Tinggi","Perfeksionis"], pekerjaan: ["Pekerjaan yang menuntut akurasi dan ketepatan","Menganalisa masalah secara mendalam","Pendekatan kritis dalam menyelesaikan masalah","Menjelaskan secara menyeluruh dan sistematis tentang tugas","Mentaati prosedur operasi standar","Merancang dan mengembangkan program","Mengumpulkan informasi secara rinci","Melakukan evaluasi program","Verifikasi, validasi dan pengendalian pekerjaan"], karir: ["Researcher","Akuntan","Analis","Computer Programmer","Quality Control","IT Management"] },
}

const getProfilInfo = (profil) => {
  const dominan = profil[0]
  const base = profilDISC[dominan]
  const namaKombinasi = {
    DI: "Inspirational", DIS: "Director", DIC: "Chancellor", DC: "Challenger", DS: "Achiever", DSC: "Achiever", DSI: "Achiever",
    ID: "Persuader", IDC: "Leader", IDS: "Reformer", IS: "Agent", ISC: "Governor", ISD: "Motivator", IC: "Appraiser", ICD: "Appraiser", ICS: "Governor",
    SD: "Achiever", SDC: "Achiever", SDI: "Agent", SI: "Agent", SIC: "Advocate", SID: "Agent", SC: "Investigator", SCD: "Inquirer", SCI: "Advocate",
    CD: "Creative", CDI: "Creative", CDS: "Contemplator", CI: "Appraiser", CID: "Creative", CIS: "Mediator", CS: "Perfectionist", CSD: "Perfectionist", CSI: "Practitioner",
  }
  return { ...base, nama: namaKombinasi[profil] || base.nama }
}

const warnaMap = {
  D: { bg: 'bg-red-600', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', bar: 'bg-red-500', hex: '#ef4444' },
  I: { bg: 'bg-yellow-500', light: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', bar: 'bg-yellow-400', hex: '#f59e0b' },
  S: { bg: 'bg-green-600', light: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', bar: 'bg-green-500', hex: '#22c55e' },
  C: { bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', bar: 'bg-blue-500', hex: '#3b82f6' },
}

const DC = {
  D: { hex: '#ef4444', dim: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', label: 'Dominance'        },
  I: { hex: '#f59e0b', dim: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', label: 'Influence'       },
  S: { hex: '#22c55e', dim: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.35)',  label: 'Steadiness'      },
  C: { hex: '#3b82f6', dim: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', label: 'Conscientiousness'},
}

function GrafikDISC({ title, subtitle, data, maxVal = 24 }) {
  const zeroMb = `${(Math.abs(Math.min(...data.map(d => d.val), 0)) / maxVal) * 100}%`
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', color: 'var(--text-sub)', textTransform: 'uppercase' }}>{title}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '10px', fontStyle: 'italic', marginTop: '2px' }}>{subtitle}</p>
      </div>
      <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', padding: '6px 0', borderBottom: '1px solid var(--border)' }}>
          {['D','I','S','C'].map(d => (
            <div key={d} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '13px', color: DC[d].hex }}>{d}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', height: '120px', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pointerEvents: 'none' }}>
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)', width: '100%', marginBottom: zeroMb }} />
          </div>
          {data.map(d => {
            const isPos = d.val >= 0
            const pct   = Math.abs(d.val) / maxVal * 100
            return (
              <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '4px 3px', position: 'relative' }}>
                <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', color: d.val !== 0 ? DC[d.label].hex : 'var(--text-muted)', marginBottom: '4px' }}>
                  {d.val > 0 ? '+' : ''}{d.val}
                </span>
                {isPos ? (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '80px' }}>
                    <div style={{ width: '100%', borderRadius: '3px 3px 0 0', background: DC[d.label].hex, height: `${Math.max(pct, 2)}%`, minHeight: d.val !== 0 ? '3px' : '0', opacity: 0.85 }} />
                  </div>
                ) : (
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '80px' }}>
                    <div style={{ width: '100%', borderRadius: '0 0 3px 3px', background: DC[d.label].hex, height: `${Math.max(pct, 2)}%`, minHeight: '3px', opacity: 0.45 }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const DkList = ({ items, color }) => (
  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
    {items.map((k, i) => (
      <li key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text-sub)', lineHeight: '1.55' }}>
        <span style={{ color, flexShrink: 0 }}>•</span>{k}
      </li>
    ))}
  </ul>
)

function PremiumContentDISC({ info, dominanHex }) {
  const color = dominanHex || 'var(--accent)'
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Karakteristik */}
      <div className="dark-card" style={{ padding: '22px' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '14px' }}>Karakteristik Perilaku</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {info.karakteristik.map((k, i) => (
            <span key={i} style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '99px', border: `1px solid ${color}44`, color, background: `${color}10`, fontWeight: 500 }}>• {k}</span>
          ))}
        </div>
      </div>

      {/* Perilaku & Emosi */}
      <div className="hasil-grid-2" style={{ gap: '12px' }}>
        {[
          { label: 'Perilaku Kerja — Kekuatan',  items: info.perilakuKerja.kekuatan,  color: '#22c55e' },
          { label: 'Perilaku Kerja — Kelemahan',  items: info.perilakuKerja.kelemahan,  color: '#f59e0b' },
          { label: 'Suasana Emosi — Kekuatan',    items: info.suasanaEmosi.kekuatan,    color: '#22c55e' },
          { label: 'Suasana Emosi — Kelemahan',   items: info.suasanaEmosi.kelemahan,   color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="dark-card" style={{ padding: '18px', background: 'var(--surface-2)' }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.12em', color: s.color, textTransform: 'uppercase', marginBottom: '10px', borderLeft: `2px solid ${s.color}`, paddingLeft: '8px' }}>{s.label}</p>
            <DkList items={s.items} color={s.color} />
          </div>
        ))}
      </div>

      {/* Kekuatan & Kelemahan */}
      <div className="hasil-grid-2" style={{ gap: '12px' }}>
        <div className="dark-card" style={{ padding: '18px', background: 'var(--surface-2)' }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.12em', color: '#22c55e', textTransform: 'uppercase', marginBottom: '10px', borderLeft: '2px solid #22c55e', paddingLeft: '8px' }}>Kekuatan</p>
          <DkList items={info.kekuatan.slice(0, 8)} color="#22c55e" />
        </div>
        <div className="dark-card" style={{ padding: '18px', background: 'var(--surface-2)' }}>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.12em', color: '#ef4444', textTransform: 'uppercase', marginBottom: '10px', borderLeft: '2px solid #ef4444', paddingLeft: '8px' }}>Kelemahan</p>
          <DkList items={info.kelemahan.slice(0, 8)} color="#ef4444" />
        </div>
      </div>

      {/* Gaya Kepemimpinan */}
      <div className="dark-card" style={{ padding: '20px' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.12em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '12px' }}>Gaya Kepemimpinan</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {info.gayaKepemimpinan.map((k, i) => (
            <span key={i} style={{ fontSize: '12px', padding: '5px 12px', borderRadius: '99px', border: '1px solid var(--accent-border)', color: 'var(--accent)', background: 'var(--accent-dim)' }}>• {k}</span>
          ))}
        </div>
      </div>

      {/* Pekerjaan */}
      <div className="dark-card" style={{ padding: '20px' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.12em', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '12px' }}>Pekerjaan yang Sesuai</p>
        <div style={{ columns: 2, gap: '12px' }}>
          {info.pekerjaan.map((k, i) => (
            <p key={i} style={{ fontSize: '13px', color: 'var(--text-sub)', lineHeight: '1.55', marginBottom: '6px', breakInside: 'avoid', display: 'flex', gap: '6px' }}>
              <span style={{ color: '#3b82f6' }}>•</span>{k}
            </p>
          ))}
        </div>
      </div>

      {/* Karir */}
      <div className="dark-card" style={{ padding: '20px' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Rekomendasi Jalur Karir</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {info.karir.map((k, i) => (
            <span key={i} style={{ fontSize: '13px', padding: '7px 16px', borderRadius: '99px', border: `1px solid ${color}44`, color, background: `${color}10`, fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>{k}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function HasilDisc() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [jpmScore, setJpmScore] = useState(null)
  const [jpmDetail, setJpmDetail] = useState(null)

  useEffect(() => {
    supabase.from('job_profile').select('*').order('nama_jabatan').then(({ data }) => setJobs(data || []))
  }, [])

  if (!state?.hasil) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="dark-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Data hasil tidak ditemukan. Silakan kerjakan tes terlebih dahulu.</p>
          <button onClick={() => navigate('/tes-disc')} style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Kembali ke Tes
          </button>
        </div>
      </div>
    )
  }

  const { hasil, nama, pesertaId, fromDashboard } = state

  const hitungJPM = (job) => {
    const peserta = {
      D: hasil?.changeD || 0,
      I: hasil?.changeI || 0,
      S: hasil?.changeS || 0,
      C: hasil?.changeC || 0,
    }
    const jobProfile = {
      D: job.skor_d,
      I: job.skor_i,
      S: job.skor_s,
      C: job.skor_c,
    }
    const totalJob = Object.values(jobProfile).reduce((a, b) => a + b, 0)
    if (totalJob === 0) return { score: 0, detail: [] }

    let totalMatch = 0
    const detail = ['D','I','S','C'].map(dim => {
      const jobVal = jobProfile[dim]
      const pesertaVal = Math.max(peserta[dim], 0)
      const match = jobVal > 0 ? Math.min(pesertaVal / jobVal, 1) * jobVal : 0
      totalMatch += match
      return { dim, jobVal, pesertaVal, match, pct: jobVal > 0 ? Math.round((pesertaVal / jobVal) * 100) : 0 }
    })

    return { score: Math.round((totalMatch / totalJob) * 100), detail }
  }

  const handleSelectJob = (job) => {
    setSelectedJob(job)
    const { score, detail } = hitungJPM(job)
    setJpmScore(score)
    setJpmDetail(detail)
  }

  const getJpmColor = (score) => {
    if (score >= 80) return { bg: 'bg-green-600', text: 'text-green-700', light: 'bg-green-50', label: 'Sangat Sesuai' }
    if (score >= 60) return { bg: 'bg-blue-600', text: 'text-blue-700', light: 'bg-blue-50', label: 'Sesuai' }
    if (score >= 40) return { bg: 'bg-yellow-500', text: 'text-yellow-700', light: 'bg-yellow-50', label: 'Cukup Sesuai' }
    return { bg: 'bg-red-500', text: 'text-red-700', light: 'bg-red-50', label: 'Kurang Sesuai' }
  }

  // Deteksi kondisi profil khusus
  const deteksiProfilKhusus = () => {
    const scores = [
      hasil?.changeD || 0,
      hasil?.changeI || 0,
      hasil?.changeS || 0,
      hasil?.changeC || 0,
    ]
    const max = Math.max(...scores)
    const min = Math.min(...scores)
    const avg = scores.reduce((a, b) => a + b, 0) / 4
    const selisih = max - min
    const semuaNegatif = scores.every(s => s <= 0)
    const semuaPositif = scores.every(s => s >= 0)
    const kondisi = []

    if (selisih <= 2) {
      kondisi.push({
        label: 'TIGHT PROFILE',
        warna: 'bg-orange-50 border-orange-300 text-orange-800',
        icon: '⚠️',
        deskripsi: 'Selisih skor antar dimensi sangat kecil (≤2 poin). Profil ini sulit diinterpretasi karena tidak ada dimensi yang benar-benar dominan. Peserta mungkin sedang dalam kondisi tidak nyaman saat mengisi tes, atau memang memiliki kepribadian yang sangat adaptif. Disarankan untuk melakukan wawancara lanjutan.',
      })
    }

    if (semuaNegatif) {
      kondisi.push({
        label: 'UNDER SHIFT',
        warna: 'bg-red-50 border-red-300 text-red-800',
        icon: '🔻',
        deskripsi: 'Semua skor dimensi Change bernilai negatif atau nol. Ini menunjukkan bahwa peserta sedang dalam kondisi tekanan tinggi atau merasa tidak nyaman dengan lingkungannya. Kepribadian yang ditampilkan (Graph 1) sangat berbeda dari kepribadian aslinya. Perlu perhatian khusus dari HRD.',
      })
    }

    if (semuaPositif && avg > 5) {
      kondisi.push({
        label: 'UPPER SHIFT',
        warna: 'bg-blue-50 border-blue-300 text-blue-800',
        icon: '🔺',
        deskripsi: 'Semua skor dimensi Change bernilai positif dan tinggi. Peserta menampilkan energi yang sangat besar di semua dimensi. Ini bisa menunjukkan bahwa peserta sangat antusias dan termotivasi, atau sedang berusaha menampilkan diri sebaik mungkin saat tes.',
      })
    }

    return kondisi
  }

  const profilKhusus = deteksiProfilKhusus()

  const profil = hasil?.profil || 'D'
  const dominan = profil[0]
  const info = getProfilInfo(profil)
  const warna = warnaMap[dominan]

  const mostData = [
    { label: 'D', val: hasil?.mostD || 0 },
    { label: 'I', val: hasil?.mostI || 0 },
    { label: 'S', val: hasil?.mostS || 0 },
    { label: 'C', val: hasil?.mostC || 0 },
  ]
  const leastData = [
    { label: 'D', val: hasil?.leastD || 0 },
    { label: 'I', val: hasil?.leastI || 0 },
    { label: 'S', val: hasil?.leastS || 0 },
    { label: 'C', val: hasil?.leastC || 0 },
  ]
  const changeData = [
    { label: 'D', val: hasil?.changeD || 0 },
    { label: 'I', val: hasil?.changeI || 0 },
    { label: 'S', val: hasil?.changeS || 0 },
    { label: 'C', val: hasil?.changeC || 0 },
  ]

  const maxMost = Math.max(...mostData.map(d => d.val), 1)
  const maxLeast = Math.max(...leastData.map(d => d.val), 1)
  const maxChange = Math.max(...changeData.map(d => Math.abs(d.val)), 1)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '48px' }} className="print:bg-white">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 print:hidden" style={{ background: 'rgba(9,9,15,0.92)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => navigate('/tes-disc')} style={{ color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← Ulangi Tes
          </button>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', color: 'var(--accent)', textTransform: 'uppercase' }}>DISC · AssesIN</span>
          <button onClick={() => window.print()} style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', padding: '6px 14px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
            🖨️ Cetak / PDF
          </button>
        </div>
      </div>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '28px var(--px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Print-Only Header */}
        <div className="print-only" style={{ display: 'none', textAlign: 'center', paddingBottom: '20px', borderBottom: '2px solid #a67c00', marginBottom: '4px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '28px', letterSpacing: '0.22em', color: '#a67c00', marginBottom: '4px' }}>ASSESIN</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888' }}>Platform Asesmen Psikologi Digital · ASSESS · INSIGHT · GROW</div>
          <div style={{ marginTop: '16px', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '18px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#111' }}>LAPORAN DISC</div>
          <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>Dominance · Influence · Steadiness · Conscientiousness</div>
          <div style={{ marginTop: '8px', fontSize: '11px', color: '#444' }}>Peserta: <strong>{nama}</strong></div>
        </div>

        {/* ── Header / Profil ── */}
        <div className="dark-card" style={{ padding: '32px', textAlign: 'center' }}>
          <div className="section-rule" style={{ marginBottom: '24px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Laporan DISC</span><span className="section-rule-line" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '10px' }}>
            AssesIN — Platform Asesmen Psikologi Digital · Bersifat Rahasia
          </p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '28px' }}>{nama}</p>

          {/* Profil letters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
            {profil.split('').map((h, i) => (
              <div key={i} style={{ width: '72px', height: '72px', borderRadius: '14px', background: DC[h].dim, border: `2px solid ${DC[h].border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '32px', color: DC[h].hex }}>
                {h}
              </div>
            ))}
          </div>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>{info.nama}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>Profil Dominan: {profil}</p>

          <div className="dark-card" style={{ padding: '20px', textAlign: 'left', background: 'var(--surface-2)' }}>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.14em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Uraian Kepribadian</p>
            <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.75' }}>
              <strong style={{ color: 'var(--text)' }}>Sdr. {nama}</strong> {info.deskripsi}
            </p>
          </div>
        </div>

        {/* ── Personality Graphs ── */}
        <div className="dark-card" style={{ padding: '24px' }}>
          <div className="section-rule" style={{ marginBottom: '20px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Personality Graphs Form</span><span className="section-rule-line" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '20px' }}>Tiga grafik menunjukkan perilaku dari sudut pandang berbeda</p>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <GrafikDISC title="Graph 1 — MOST" subtitle="Mask / Public Self" data={mostData} maxVal={maxMost} />
            <GrafikDISC title="Graph 2 — LEAST" subtitle="Under Stress" data={leastData} maxVal={maxLeast} />
            <GrafikDISC title="Graph 3 — CHANGE" subtitle="Core / Private Self" data={changeData} maxVal={maxChange} />
          </div>

          {/* Summary table */}
          <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
            <table style={{ width: '100%', fontSize: '13px', textAlign: 'center', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Grafik</th>
                  {['D','I','S','C'].map(d => <th key={d} style={{ padding: '8px 12px', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '13px', color: DC[d].hex }}>{d}</th>)}
                  <th style={{ padding: '8px 12px', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Profil</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Graph 1 — Most',   data: mostData,   alt: false },
                  { label: 'Graph 2 — Least',  data: leastData,  alt: true  },
                  { label: 'Graph 3 — Change', data: changeData, alt: false },
                ].map(({ label, data, alt }) => (
                  <tr key={label} style={{ borderTop: '1px solid var(--border)', background: alt ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--text-sub)', fontSize: '13px' }}>{label}</td>
                    {data.map(d => (
                      <td key={d.label} style={{ padding: '10px 12px', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: d.val !== 0 ? DC[d.label].hex : 'var(--text-muted)' }}>
                        {d.val > 0 ? '+' : ''}{d.val}
                      </td>
                    ))}
                    <td style={{ padding: '10px 12px', fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'var(--accent)' }}>
                      {[...data].sort((a,b) => b.val - a.val)[0].label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="hasil-grid-3" style={{ gap: '8px' }}>
            {[
              { title: 'Graph 1 — MOST',   sub: 'Mask / Public Self',    note: 'Tampilan saat ini' },
              { title: 'Graph 2 — LEAST',  sub: 'Under Stress',          note: 'Perilaku saat tertekan' },
              { title: 'Graph 3 — CHANGE', sub: 'Core / Private Self',   note: 'Kepribadian sesungguhnya' },
            ].map(l => (
              <div key={l.title} style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', color: 'var(--text-sub)', marginBottom: '4px' }}>{l.title}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px' }}>{l.sub}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '10px', fontStyle: 'italic', marginTop: '2px' }}>{l.note}</p>
              </div>
            ))}
          </div>

          {/* Profil khusus warning */}
          {profilKhusus.length > 0 && (
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.14em', color: '#f59e0b', textTransform: 'uppercase' }}>Catatan Profil Khusus</p>
              {profilKhusus.map((k, i) => (
                <div key={i} style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '10px', padding: '16px' }}>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#f59e0b', fontSize: '13px', marginBottom: '6px' }}>{k.icon} {k.label}</p>
                  <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.65' }}>{k.deskripsi}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── JPM ── */}
        <div className="dark-card" style={{ padding: '24px' }}>
          <div className="section-rule" style={{ marginBottom: '20px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Job Person Match</span><span className="section-rule-line" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '20px' }}>Hitung kesesuaian profil kepribadian dengan jabatan</p>

          {jobs.length === 0 ? (
            <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
              <p style={{ color: '#f59e0b', fontSize: '13px' }}>Belum ada job profile. HRD perlu menambahkan job profile terlebih dahulu.</p>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '12px' }}>Pilih Jabatan:</p>
              <div className="hasil-grid-2" style={{ gap: '8px', marginBottom: '20px' }}>
                {jobs.map(job => {
                  const dom = ['D','I','S','C'].reduce((a, b) => job[`skor_${a.toLowerCase()}`] >= job[`skor_${b.toLowerCase()}`] ? a : b)
                  const selected = selectedJob?.id === job.id
                  return (
                    <button key={job.id} onClick={() => handleSelectJob(job)} style={{ padding: '12px', borderRadius: '10px', border: `1px solid ${selected ? DC[dom].border : 'var(--border)'}`, background: selected ? DC[dom].dim : 'var(--surface-2)', textAlign: 'left', cursor: 'pointer', transition: 'all 0.18s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '13px', color: DC[dom].hex, padding: '3px 8px', background: `${DC[dom].hex}15`, borderRadius: '6px' }}>{dom}</span>
                        <span style={{ color: 'var(--text-sub)', fontSize: '13px' }}>{job.nama_jabatan}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {selectedJob && jpmScore !== null && (() => {
                const jc = getJpmColor(jpmScore)
                const jcHex = jpmScore >= 80 ? '#22c55e' : jpmScore >= 60 ? '#3b82f6' : jpmScore >= 40 ? '#f59e0b' : '#ef4444'
                return (
                  <div style={{ background: `${jcHex}08`, border: `1px solid ${jcHex}30`, borderRadius: '12px', padding: '20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '6px' }}>Kesesuaian dengan</p>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--text)', marginBottom: '16px' }}>{selectedJob.nama_jabatan}</p>
                      <div style={{ display: 'inline-block', background: `${jcHex}18`, border: `2px solid ${jcHex}50`, borderRadius: '14px', padding: '20px 32px' }}>
                        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '48px', color: jcHex, lineHeight: 1 }}>{jpmScore}%</p>
                        <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', color: jcHex, marginTop: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{jc.label}</p>
                      </div>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}>
                      <div style={{ height: '100%', background: jcHex, width: `${jpmScore}%`, borderRadius: '99px', transition: 'width 0.7s' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginBottom: '20px' }}>
                      <span>0%</span><span>Kurang</span><span>Cukup</span><span>Sesuai</span><span>100%</span>
                    </div>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '12px' }}>Detail per Dimensi</p>
                    {jpmDetail?.map(d => {
                      const pct = Math.min(d.pct, 100)
                      return (
                        <div key={d.dim} style={{ marginBottom: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
                            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: DC[d.dim].hex }}>{d.dim} — {DC[d.dim].label}</span>
                            <span style={{ color: 'var(--text-muted)' }}>Peserta {d.pesertaVal} / Job {d.jobVal} = <strong style={{ color: 'var(--text-sub)' }}>{pct}%</strong></span>
                          </div>
                          <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: DC[d.dim].hex, width: `${pct}%`, borderRadius: '99px', opacity: 0.8 }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })()}
            </>
          )}
        </div>

        {/* ── Konten Premium ── */}
        {fromDashboard ? (
          <PremiumContentDISC info={info} dominanHex={DC[dominan].hex} />
        ) : (
          <PaymentGate testType="DISC" pesertaId={pesertaId} nama={nama}>
            <PremiumContentDISC info={info} dominanHex={DC[dominan].hex} />
          </PaymentGate>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', letterSpacing: '0.1em', opacity: 0.4 }}>© 2026 · AssesIN · Platform Asesmen Psikologi Digital</p>
        </div>

        {/* Tombol */}
        <div className="print:hidden" style={{ display: 'flex', gap: '12px', position: 'sticky', bottom: '16px' }}>
          <button onClick={() => navigate('/tes-disc')} style={{ flex: 1, background: 'var(--surface)', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', padding: '14px', borderRadius: '10px', border: '1px solid var(--border)', cursor: 'pointer' }}>← Ulangi Tes</button>
          <button onClick={() => window.print()} style={{ flex: 1, background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}>🖨️ Cetak / PDF</button>
        </div>
      </div>
    </div>
  )
}

export default HasilDisc