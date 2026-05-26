import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

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
  D: { bg: 'bg-red-600', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', bar: 'bg-red-500', hex: '#dc2626' },
  I: { bg: 'bg-yellow-500', light: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', bar: 'bg-yellow-400', hex: '#eab308' },
  S: { bg: 'bg-green-600', light: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', bar: 'bg-green-500', hex: '#16a34a' },
  C: { bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', bar: 'bg-blue-500', hex: '#2563eb' },
}

function GrafikDISC({ title, subtitle, data, maxVal = 24 }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="text-center mb-2">
        <p className="text-xs font-bold text-gray-700">{title}</p>
        <p className="text-xs text-gray-400 italic">{subtitle}</p>
      </div>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
          {['D','I','S','C'].map(d => (
            <div key={d} className="text-center py-1">
              <span className={`text-xs font-black ${warnaMap[d].text}`}>{d}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 h-40 bg-white relative">
          <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-end pointer-events-none">
            <div className="h-px bg-gray-300 w-full" style={{ marginBottom: `${(Math.abs(Math.min(...data.map(d=>d.val), 0)) / maxVal) * 100}%` }} />
          </div>
          {data.map((d) => {
            const w = warnaMap[d.label]
            const isPos = d.val >= 0
            const pct = Math.abs(d.val) / maxVal * 100
            return (
              <div key={d.label} className="flex flex-col items-center justify-end px-1 py-1 relative">
                <span className="text-xs font-bold text-gray-600 mb-1">{d.val > 0 ? '+' : ''}{d.val}</span>
                {isPos ? (
                  <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
                    <div className={`w-full rounded-t-sm ${w.bar}`} style={{ height: `${Math.max(pct, 2)}%`, minHeight: d.val !== 0 ? '4px' : '0' }} />
                  </div>
                ) : (
                  <div className="w-full flex flex-col justify-start" style={{ height: '100px' }}>
                    <div className={`w-full rounded-b-sm ${w.bar} opacity-50`} style={{ height: `${Math.max(pct, 2)}%`, minHeight: '4px' }} />
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

function HasilDisc() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { hasil, nama } = state || {}

  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [jpmScore, setJpmScore] = useState(null)
  const [jpmDetail, setJpmDetail] = useState(null)

  useEffect(() => {
    supabase.from('job_profile').select('*').order('nama_jabatan').then(({ data }) => setJobs(data || []))
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 print:bg-white">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100 px-4 py-3 print:hidden">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/tes-disc')} className="text-sm text-gray-400 hover:text-green-600 transition">
            ← Ulangi Tes
          </button>
          <span className="text-xs font-bold text-green-700 tracking-widest uppercase">DISC · Platform Asesmen AssesIN</span>
          <button onClick={() => window.print()} className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition">
            🖨️ Cetak
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-8 px-4">

        {/* HEADER */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 print:shadow-none print:border">
          <div className="text-center mb-5">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">LAPORAN PROFIL KEPRIBADIAN</p>
            <p className="text-xs text-gray-400 mb-3">AssesIN — Platform Asesmen Psikologi — Bersifat RAHASIA</p>
            <h2 className="text-xl font-bold text-gray-800">{nama}</h2>
          </div>
          <div className={`${warna.bg} text-white rounded-2xl py-6 px-6 text-center mb-5 shadow-lg`}>
            <p className="text-xs font-semibold opacity-75 mb-2 uppercase tracking-widest">Profil Kepribadian</p>
            <div className="flex justify-center gap-2 mb-2">
              {profil.split('').map((h, i) => (
                <div key={i} className="w-12 h-12 rounded-xl bg-white font-black text-xl flex items-center justify-center shadow" style={{ color: warnaMap[h].hex }}>
                  {h}
                </div>
              ))}
            </div>
            <p className="text-lg font-bold">{info.nama}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Uraian Kepribadian</p>
            <p className="text-sm text-gray-700 leading-relaxed"><strong>Sdr. {nama}</strong> {info.deskripsi}</p>
          </div>
        </div>

        {/* PERSONALITY GRAPHS */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 print:shadow-none print:border">
          <h3 className="font-bold text-gray-700 mb-1">Personality Graphs Form</h3>
          <p className="text-xs text-gray-400 mb-4">Tiga grafik menunjukkan perilaku dari sudut pandang berbeda</p>
          <div className="flex gap-3">
            <GrafikDISC title="Graph 1 — MOST" subtitle="Mask / Public Self" data={mostData} maxVal={maxMost} />
            <GrafikDISC title="Graph 2 — LEAST" subtitle="Under Stress" data={leastData} maxVal={maxLeast} />
            <GrafikDISC title="Graph 3 — CHANGE" subtitle="Core / Private Self" data={changeData} maxVal={maxChange} />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-gray-500 text-xs">Grafik</th>
                  {['D','I','S','C'].map(d => <th key={d} className={`px-3 py-2 text-xs font-black ${warnaMap[d].text}`}>{d}</th>)}
                  <th className="px-3 py-2 text-xs text-gray-500">Profil</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-3 py-2 text-xs text-left text-gray-600">Graph 1 — Most</td>
                  {mostData.map(d => <td key={d.label} className="px-3 py-2 font-semibold">{d.val}</td>)}
                  <td className="px-3 py-2 text-xs font-bold text-gray-600">{[...mostData].sort((a,b) => b.val - a.val)[0].label}</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-3 py-2 text-xs text-left text-gray-600">Graph 2 — Least</td>
                  {leastData.map(d => <td key={d.label} className="px-3 py-2 font-semibold">{d.val}</td>)}
                  <td className="px-3 py-2 text-xs font-bold text-gray-600">{[...leastData].sort((a,b) => b.val - a.val)[0].label}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-3 py-2 text-xs text-left text-gray-600">Graph 3 — Change</td>
                  {changeData.map(d => <td key={d.label} className={`px-3 py-2 font-bold ${d.val > 0 ? warnaMap[d.label].text : 'text-gray-400'}`}>{d.val > 0 ? '+' : ''}{d.val}</td>)}
                  <td className={`px-3 py-2 text-xs font-black ${warna.text}`}>{profil}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-center text-gray-400">
            <div className="bg-gray-50 rounded-lg p-2"><p className="font-semibold text-gray-600">Graph 1 — MOST</p><p>Mask / Public Self</p><p className="italic">Tampilan saat ini</p></div>
            <div className="bg-gray-50 rounded-lg p-2"><p className="font-semibold text-gray-600">Graph 2 — LEAST</p><p>Under Stress</p><p className="italic">Perilaku saat tertekan</p></div>
            <div className="bg-gray-50 rounded-lg p-2"><p className="font-semibold text-gray-600">Graph 3 — CHANGE</p><p>Core / Private Self</p><p className="italic">Kepribadian sesungguhnya</p></div>
          </div>

          {/* WARNING BOX — Tight Profile / Under Shift / Upper Shift */}
          {profilKhusus.length > 0 && (
            <div className="mt-4 space-y-3">
              <p className="text-xs font-semibold uppercase text-gray-500">⚠️ Catatan Profil Khusus</p>
              {profilKhusus.map((k, i) => (
                <div key={i} className={`border rounded-xl p-4 ${k.warna}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{k.icon}</span>
                    <span className="font-bold text-sm">{k.label}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{k.deskripsi}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* JPM — JOB PERSON MATCH */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 print:shadow-none print:border">
          <h3 className="font-bold text-gray-700 mb-1">Job Person Match (JPM)</h3>
          <p className="text-xs text-gray-400 mb-4">Hitung kesesuaian profil kepribadian dengan jabatan</p>

          {jobs.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
              <p className="text-sm text-yellow-700">Belum ada job profile yang dibuat.</p>
              <p className="text-xs text-yellow-500 mt-1">HRD perlu menambahkan job profile terlebih dahulu.</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Jabatan:</label>
                <div className="grid grid-cols-2 gap-2">
                  {jobs.map(job => {
                    const dom = ['D','I','S','C'].reduce((a, b) => job[`skor_${a.toLowerCase()}`] >= job[`skor_${b.toLowerCase()}`] ? a : b)
                    const w = warnaMap[dom]
                    return (
                      <button
                        key={job.id}
                        onClick={() => handleSelectJob(job)}
                        className={`p-3 rounded-xl border-2 text-left transition ${selectedJob?.id === job.id ? `${w.light} ${w.border}` : 'border-gray-100 hover:border-gray-300'}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-black px-2 py-1 rounded-lg ${w.light} ${w.text}`}>{dom}</span>
                          <span className="text-sm font-medium text-gray-700">{job.nama_jabatan}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedJob && jpmScore !== null && (
                <div className={`${getJpmColor(jpmScore).light} border border-gray-200 rounded-2xl p-5`}>
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-500 mb-1">Kesesuaian dengan jabatan</p>
                    <p className="text-lg font-bold text-gray-700 mb-3">{selectedJob.nama_jabatan}</p>
                    <div className={`${getJpmColor(jpmScore).bg} text-white rounded-2xl py-5 px-6 inline-block min-w-32`}>
                      <p className="text-5xl font-black">{jpmScore}%</p>
                      <p className="text-sm font-semibold opacity-90 mt-1">{getJpmColor(jpmScore).label}</p>
                    </div>
                  </div>

                  {/* Progress bar JPM */}
                  <div className="mb-4">
                    <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner">
                      <div
                        className={`h-full ${getJpmColor(jpmScore).bg} rounded-full transition-all duration-500`}
                        style={{ width: `${jpmScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>Kurang Sesuai</span>
                      <span>Cukup</span>
                      <span>Sesuai</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Detail per dimensi */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Detail Kesesuaian per Dimensi</p>
                    {jpmDetail?.map(d => {
                      const w = warnaMap[d.dim]
                      const pct = Math.min(d.pct, 100)
                      return (
                        <div key={d.dim}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className={`font-bold ${w.text}`}>{d.dim} ({d.dim === 'D' ? 'Dominance' : d.dim === 'I' ? 'Influence' : d.dim === 'S' ? 'Steadiness' : 'Conscientiousness'})</span>
                            <span className="text-gray-500">Peserta: {d.pesertaVal} / Job: {d.jobVal} = <span className="font-bold">{pct}%</span></span>
                          </div>
                          <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                            <div className={`h-full ${w.bar} rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-xl">
                    <p className="text-xs text-gray-500">
                      {jpmScore >= 80 && '✅ Profil kepribadian peserta sangat sesuai dengan kebutuhan jabatan ini.'}
                      {jpmScore >= 60 && jpmScore < 80 && '🟢 Profil kepribadian peserta sesuai dengan kebutuhan jabatan ini dengan beberapa area pengembangan.'}
                      {jpmScore >= 40 && jpmScore < 60 && '🟡 Profil kepribadian peserta cukup sesuai. Perlu pengembangan pada beberapa dimensi.'}
                      {jpmScore < 40 && '🔴 Profil kepribadian peserta kurang sesuai dengan kebutuhan jabatan ini.'}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* KARAKTERISTIK */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 print:shadow-none print:border">
          <h3 className="font-bold text-gray-700 mb-3">Karakteristik Perilaku</h3>
          <div className="flex flex-wrap gap-2 mb-5">
            {info.karakteristik.map((k, i) => (
              <span key={i} className={`text-sm px-3 py-1.5 rounded-full font-medium ${warna.light} ${warna.text}`}>• {k}</span>
            ))}
          </div>

          <h3 className="font-bold text-gray-700 mb-3">Analisis Perilaku dan Emosi</h3>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className={`${warna.light} border ${warna.border} rounded-xl p-4`}>
              <p className={`text-xs font-bold uppercase mb-2 ${warna.text}`}>Perilaku Kerja — Kekuatan</p>
              <ul className="space-y-1.5">{info.perilakuKerja.kekuatan.map((k,i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span>•</span>{k}</li>)}</ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase mb-2 text-amber-700">Perilaku Kerja — Kelemahan</p>
              <ul className="space-y-1.5">{info.perilakuKerja.kelemahan.map((k,i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span>•</span>{k}</li>)}</ul>
            </div>
            <div className={`${warna.light} border ${warna.border} rounded-xl p-4`}>
              <p className={`text-xs font-bold uppercase mb-2 ${warna.text}`}>Suasana Emosi — Kekuatan</p>
              <ul className="space-y-1.5">{info.suasanaEmosi.kekuatan.map((k,i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span>•</span>{k}</li>)}</ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase mb-2 text-amber-700">Suasana Emosi — Kelemahan</p>
              <ul className="space-y-1.5">{info.suasanaEmosi.kelemahan.map((k,i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span>•</span>{k}</li>)}</ul>
            </div>
          </div>

          <h3 className="font-bold text-gray-700 mb-3">Kekuatan dan Kelemahan</h3>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase mb-2 text-green-700">Kekuatan</p>
              <ul className="space-y-1.5">{info.kekuatan.slice(0, 8).map((k,i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span>•</span>{k}</li>)}</ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase mb-2 text-red-700">Kelemahan</p>
              <ul className="space-y-1.5">{info.kelemahan.slice(0, 8).map((k,i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5"><span>•</span>{k}</li>)}</ul>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold uppercase mb-2 text-purple-700">Gaya Kepemimpinan</p>
            <div className="flex flex-wrap gap-1.5">
              {info.gayaKepemimpinan.map((k,i) => <span key={i} className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">• {k}</span>)}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold uppercase mb-2 text-blue-700">Karakteristik Pekerjaan yang Sesuai</p>
            <ul className="space-y-1.5 columns-2">{info.pekerjaan.map((k,i) => <li key={i} className="text-sm text-gray-700 flex gap-1.5 break-inside-avoid"><span>•</span>{k}</li>)}</ul>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-bold uppercase mb-2 text-gray-600">Rekomendasi Jalur Karir</p>
            <div className="flex flex-wrap gap-2">
              {info.karir.map((k,i) => <span key={i} className={`text-sm px-3 py-1.5 rounded-full font-semibold ${warna.light} ${warna.text}`}>{k}</span>)}
            </div>
          </div>
        </div>

        {/* TOMBOL */}
        <div className="flex gap-3 sticky bottom-4 print:hidden">
          <button onClick={() => navigate('/tes-disc')} className="flex-1 border-2 border-green-600 text-green-600 bg-white font-semibold py-3 rounded-xl hover:bg-green-50 transition shadow-lg">
            ← Ulangi Tes
          </button>
          <button onClick={() => window.print()} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition shadow-lg shadow-green-200">
            🖨️ Cetak Laporan
          </button>
        </div>
      </div>
    </div>
  )
}

export default HasilDisc