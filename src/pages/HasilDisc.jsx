import { useLocation, useNavigate } from 'react-router-dom'

// ============================================================
// DATA PROFIL DISC DARI EXCEL DJBC
// ============================================================
const profilDISC = {
  D: { nama: "Developer", tipe: "D", deskripsi: "selalu akan mencari solusi-solusi baru dari tiap persoalan yang dihadapi. Ia memiliki internal motif yang kuat dan memiliki kecepatan kerja untuk mencapai tujuannya, serta mampu membuat keputusan dengan mudah walaupun dalam suasana penuh tekanan. Ia adalah seorang yang kreatif dan percaya diri, ia cenderung menggunakan keseimbangan antara intuisi dan fakta ketika mengambil keputusan. Ia memiliki kekuatan ego yang besar, cenderung sangat individualistis dan selalu mencari pandangan-pandangan baru karenanya ia tidak menyukai berada dibawah atasan yang penuh kontrol.", karakteristik: ["Mengambil keputusan","Langsung/direct","Kekuatan ego yang besar","Memecahkan masalah","Berani mengambil resiko","Dominan","Penggerak"], perilakuKerja: { kekuatan: ["Tidak takut bersaing","Kreatif dan memiliki banyak ide","Percaya diri dan mandiri","Berani mengambil risiko"], kelemahan: ["Kurang peka terhadap perasaan orang lain","Terlalu cepat mengambil keputusan","Cenderung mendominasi"] }, suasanaEmosi: { kekuatan: ["Percaya diri","Berkemauan keras","Tekun dan ulet","Berani dan tegar"], kelemahan: ["Pendiriannya sangat keras","Tidak sabaran, suka menekan","Memaksakan kehendak"] }, kekuatan: ["Percaya diri","Berkemauan keras","Tekun dan ulet","Berani dan tegar","Menghadapi hidup tanpa kompromi","Organisator dan promotor","Cepat bertindak","Berani memutuskan dalam keadaan mendesak","Mampu memberikan solusi","Memiliki inisiatif","Mampu bekerja dengan cepat","Memotivasi orang lain","Cepat membuat keputusan","Berani mengambil resiko"], kelemahan: ["Pendiriannya sangat keras","Terlalu cepat mengambil keputusan","Tidak sabaran, suka menekan","Kurang peka terhadap perasaan orang lain","Terlalu percaya diri","Kurang menghargai pendapat orang lain","Cenderung mendominasi","Memaksakan kehendak","Cenderung egois"], gayaKepemimpinan: ["Mengendalikan orang lain","Cepat bertindak","Percaya diri","Mencari perubahan","Persuasif","Kompetitif","Berani mengambil resiko"], pekerjaan: ["Pekerjaan yang membutuhkan pengambilan keputusan secara cepat","Pekerjaan yang berorientasi kepada hasil","Pekerjaan yang kompetitif dan banyak tantangan","Bebas dari pekerjaan detail dan spesifik","Menggunakan kekuasaan dan wewenang","Mengambil suatu gagasan dan menjalankannya","Beragam kegiatan","Bebas dari pengawasan langsung","Memunculkan ide-ide baru","Mengkoordinir kegiatan"], karir: ["Director","Entrepreneur","Manager","Sales Manager","Executive"] },
  I: { nama: "Promoter", tipe: "I", deskripsi: "menunjukkan sikap yang antusias dan optimis, ia akan menyelesaikan tugas melalui orang lain. Senang berada diantara orang banyak, tidak suka menyendiri. Kemampuan komunikasinya sangat dominan. Karena ia lebih tertarik pada partisipasi dan interaksi dengan orang lain dalam setiap aktivitas, menyebabkan dirinya kurang fokus pada penyelesaian tugas. Ia terlalu percaya kepada kemampuan orang lain tanpa mempelajari terlebih dahulu fakta-fakta sebelumnya.", karakteristik: ["Komunikator yang baik","Menciptakan kesan yang menyenangkan","Antusias","Optimis","Persuasif"], perilakuKerja: { kekuatan: ["Pandai berkomunikasi dan bersosialisasi","Mampu memotivasi orang lain","Kreatif dan inovatif","Antusias dan enerjik"], kelemahan: ["Kurang fokus pada penyelesaian tugas","Kurang terorganisir","Mudah terdistraksi"] }, suasanaEmosi: { kekuatan: ["Hangat dan bersemangat","Berkarisma","Antusias","Ekspresif"], kelemahan: ["Terlalu reaktif","Keputusannya sering berdasarkan emosi","Tidak ketat dalam disiplin diri"] }, kekuatan: ["Hangat dan bersemangat","Berkarisma","Antusias","Ekspresif","Aktif","Enerjik","Meyakinkan","Memberikan semangat","Aktif berbicara","Senang membina hubungan sosial","Optimis","Humoris","Mampu menyampaikan dengan jelas"], kelemahan: ["Terlalu reaktif","Kurang tenang","Cenderung melebih-lebihkan sesuatu","Keputusannya sering berdasarkan emosi","Tidak teratur","Tidak ketat dalam disiplin diri","Banyak waktu terbuang karena mengobrol berlebihan","Sulit mengingat nama orang dan hal detail","Impulsif"], gayaKepemimpinan: ["Fleksibel","Senang melakukan hal-hal baru","Antusias","Mudah menyesuaikan diri","Penuh inspirasi","Komunikator","Optimis","Demonstratif","Persuasif"], pekerjaan: ["Banyak berhubungan dengan orang lain","Pekerjaan yang memerlukan pendekatan persuasif","Melakukan verbalisasi yang inspiratif","Aktif dan mobilitas tinggi","Kesempatan untuk mempresentasikan konsep baru","Mengembangkan kegiatan baru yang berbeda","Pekerjaan yang cepat berubah-ubah","Melakukan pembinaan dan arahan kepada orang lain","Menangani keluhan pelanggan"], karir: ["Public Relations","Sales","Event Organizer","Trainer","Konsultan"] },
  S: { nama: "Specialist", tipe: "S", deskripsi: "adalah individu yang konsisten, tekun bekerja dalam lingkungan yang tidak berubah. Ia dapat bekerjasama dengan berbagai model perilaku karena mampu menampilkan perilaku yang diharapkan. Ia adalah orang yang memperhatikan orang lain, sabar dan selalu bersedia membantu orang. Ia cenderung lambat dan selektif dalam membangun hubungan sosial dengan orang lain dalam lingkungan, ia tidak bosan dengan kondisi rutin dan akan menampilkan hasil yang maksimal asalkan ada panduan dan aturan yang sangat jelas.", karakteristik: ["Pendengar yang baik","Peserta tim","Posesif","Tenang","Mudah diprediksi","Memahami orang lain","Penuh persahabatan","Mampu berempati"], perilakuKerja: { kekuatan: ["Konsisten dan dapat diandalkan","Sabar dan telaten","Setia terhadap organisasi","Pendengar yang baik"], kelemahan: ["Sulit beradaptasi dengan perubahan","Sulit berkata tidak","Lamban dalam bergerak"] }, suasanaEmosi: { kekuatan: ["Tenang, cinta damai","Ramah","Sopan santun","Sabar","Setia"], kelemahan: ["Kurang percaya diri","Cenderung pemalu","Lamban, statis","Menghindari konflik"] }, kekuatan: ["Tenang, cinta damai","Ramah","Sopan santun","Baik hati/lembut hati","Tidak emosional","Sabar","Setia","Tekun","Praktis, sederhana dalam bekerja","Mampu melibatkan orang lain","Terbuka pada gagasan orang lain","Memiliki kesabaran dan ketenangan dalam bekerja","Memiliki Empati yang tinggi"], kelemahan: ["Kurang percaya diri","Cenderung pemalu","Pesimis, penakut, selalu khawatir","Kompromistis","Lamban, statis","Terlalu hati-hati","Cenderung menghindari resiko","Menolak/takut pada perubahan","Sulit memutuskan sesuatu","Sulit menolak permintaan orang lain","Santai dalam bekerja","Menghindari konflik","Kurang ekspresif"], gayaKepemimpinan: ["Pemikir","Idealis","Percaya pada orang lain","Loyal","Mau membantu dan menolong","Kooperatif","Santai/rileks","Konsisten","Perilakunya mudah diramalkan","Pendengar yang baik","Tulus","Empati yang tinggi"], pekerjaan: ["Pekerjaan yang menuntut kesabaran","Mengikuti prosedur baku","Klarifikasi kebijakan sebelum melangkah","Mengumpulkan informasi, fakta dan data","Melakukan penyiapan bahan-bahan pendukung","Menyimpan dan memelihara dokumen","Pekerjaan rutin dan administratif","Melaksanakan, mengelola pekerjaan sesuai peraturan","Pekerjaan yang memerlukan konsistensi dalam jangka waktu panjang"], karir: ["Administrator","Customer Service","HR Specialist","Konselor","Perawat"] },
  C: { nama: "Objective Thinker", tipe: "C", deskripsi: "adalah seorang pekerja yang sangat taat pada peraturan dan prosedur. Ia akan menjalankan tugas dan tanggung jawabnya berdasarkan uraian tugas yang jelas. Ia juga mampu merencanakan, mengendalikan diri, penuh perhitungan dan sangat menuntut akurasi dalam bekerja. Dalam mengerjakan proyek baru, ia akan meminta penjelasan tentang standar yang harus dipenuhi, selanjutnya standar itulah yang menjadi acuan pekerjaannya. Karakteristik umum dirinya adalah seorang yang kritis, analitis, sistematis, hati-hati dan memiliki standar kualitas yang tinggi.", karakteristik: ["Akurat","Analitis","Hati-hati","Penuh Kesadaran","Menemukan fakta","Ketepatan","Standar tinggi","Sistematis"], perilakuKerja: { kekuatan: ["Pemikir dan menganalisa","Kreatif dan memiliki intelektual tinggi","Berbakat dan cerdas","Rapi, tertib, teratur","Konservatif"], kelemahan: ["Ragu untuk berinovasi","Terlalu banyak menganalisa","Terlalu banyak berpikir","Perlu waktu untuk menyetujui sesuatu","Menolak/takut pada perubahan"] }, suasanaEmosi: { kekuatan: ["Waspada","Mematuhi aturan","Sadar akan mutu","Ramah","Setia"], kelemahan: ["Sulit memutuskan","Cenderung Rigid","Sedih tanpa alasan","Cenderung pemalu","Kompromistis"] }, kekuatan: ["Konservatif","Pemikir","Sadar akan mutu","Mematuhi aturan","Diplomatis","Waspada","Perfeksionis","Senang pada detail","Senang pada rincian yang rumit","Mampu mengorganisasikan tugas","Memiliki perencanaan jangka panjang","Menentukan standar yang tinggi dan ideal","Mampu menganalisa secara mendalam","Bekerja dengan akurasi tinggi","Konsisten menjaga kualitas"], kelemahan: ["Menyalahkan diri sendiri","Cenderung Rigid","Pesimis, seringkali berpikir negatif","Sedih tanpa alasan","Sangat berhati-hati","Over Sensitif","Sulit memutuskan","Tidak tegas","Terlalu banyak teori, kurang praktis","Mudah tersinggung","Terlalu banyak waktu digunakan untuk persiapan","Terlalu fokus pada hal detail","Mengingat hal-hal negatif","Menaruh curiga kepada orang lain"], gayaKepemimpinan: ["Tekun dan Ulet","Praktis","Penuh perhitungan","Menjaga jarak","Menyampaikan fakta","Selalu melakukan evaluasi dan monitoring","Analitis","Ketepatan","Kualitas","Rinci","Berpikir kritis","Hati-hati","Sistematis","Cermat","Sensitif","Standar Tinggi","Perfeksionis"], pekerjaan: ["Pekerjaan yang menuntut akurasi dan ketepatan","Menganalisa masalah secara mendalam","Pendekatan kritis dalam menyelesaikan masalah","Menjelaskan secara menyeluruh dan sistematis tentang tugas","Mentaati prosedur operasi standar","Merancang dan mengembangkan program","Mengumpulkan informasi secara rinci","Melakukan evaluasi program","Verifikasi, validasi dan pengendalian pekerjaan"], karir: ["Researcher","Akuntan","Analis","Computer Programmer","Quality Control","IT Management"] },
}

// Untuk kombinasi profil, ambil dari profil dominan
const getProfilInfo = (profil) => {
  const dominan = profil[0]
  const base = profilDISC[dominan]
  
  const namaKombinasi = {
    DI: "Inspirational", DIS: "Director", DIC: "Chancellor", DC: "Challenger", DS: "Achiever", DSC: "Achiever", DSI: "Achiever",
    ID: "Persuader", IDC: "Leader", IDS: "Reformer", IS: "Agent", ISC: "Governor", ISD: "Motivator", IC: "Appraiser", ICD: "Appraiser", ICS: "Governor",
    SD: "Achiever", SDC: "Achiever", SDI: "Agent", SI: "Agent", SIC: "Advocate", SID: "Agent", SC: "Investigator", SCD: "Inquirer", SCI: "Advocate",
    CD: "Creative", CDI: "Creative", CDS: "Contemplator", CI: "Appraiser", CID: "Creative", CIS: "Mediator", CS: "Perfectionist", CSD: "Perfectionist", CSI: "Practitioner",
  }
  
  return {
    ...base,
    nama: namaKombinasi[profil] || base.nama,
  }
}

const warnaMap = {
  D: { bg: 'bg-red-600', light: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', bar: 'bg-red-500', hex: '#dc2626' },
  I: { bg: 'bg-yellow-500', light: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', bar: 'bg-yellow-400', hex: '#eab308' },
  S: { bg: 'bg-green-600', light: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', bar: 'bg-green-500', hex: '#16a34a' },
  C: { bg: 'bg-blue-600', light: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', bar: 'bg-blue-500', hex: '#2563eb' },
}

// Komponen Grafik Batang DISC (persis seperti di Excel)
function GrafikDISC({ title, subtitle, data, maxVal = 24 }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="text-center mb-2">
        <p className="text-xs font-bold text-gray-700">{title}</p>
        <p className="text-xs text-gray-400 italic">{subtitle}</p>
      </div>
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        {/* Header D I S C */}
        <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
          {['D','I','S','C'].map(d => (
            <div key={d} className="text-center py-1">
              <span className={`text-xs font-black ${warnaMap[d].text}`}>{d}</span>
            </div>
          ))}
        </div>
        {/* Bar Chart Area */}
        <div className="grid grid-cols-4 h-40 bg-white relative">
          {/* Garis tengah (baseline) */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-end pointer-events-none">
            <div className="h-px bg-gray-300 w-full" style={{ marginBottom: `${(Math.abs(Math.min(...data.map(d=>d.val), 0)) / maxVal) * 100}%` }} />
          </div>
          {data.map((d, i) => {
            const w = warnaMap[d.label]
            const isPos = d.val >= 0
            const pct = Math.abs(d.val) / maxVal * 100
            return (
              <div key={d.label} className="flex flex-col items-center justify-end px-1 py-1 relative">
                <span className="text-xs font-bold text-gray-600 mb-1">{d.val > 0 ? '+' : ''}{d.val}</span>
                {isPos ? (
                  <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
                    <div className={`w-full rounded-t-sm ${w.bar}`} style={{ height: `${Math.max(pct * 1, 2)}%`, minHeight: d.val !== 0 ? '4px' : '0' }} />
                  </div>
                ) : (
                  <div className="w-full flex flex-col justify-start" style={{ height: '100px' }}>
                    <div className={`w-full rounded-b-sm ${w.bar} opacity-50`} style={{ height: `${Math.max(pct * 1, 2)}%`, minHeight: '4px' }} />
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
    <div className="min-h-screen bg-gray-50 py-8 px-4 print:bg-white print:py-2">
      <div className="max-w-2xl mx-auto">

        {/* HEADER LAPORAN */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 print:shadow-none print:border">
          <div className="text-center mb-5">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">LAPORAN PROFIL KEPRIBADIAN</p>
            <p className="text-xs text-gray-400 mb-3">Psikotes DJBC — Bersifat RAHASIA, hanya untuk penempatan dan pengembangan pegawai</p>
            <h2 className="text-xl font-bold text-gray-800">{nama}</h2>
          </div>

          {/* Profil badge */}
          <div className={`${warna.bg} text-white rounded-2xl py-6 px-6 text-center mb-5`}>
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

          {/* Uraian Kepribadian */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold uppercase text-gray-500 mb-2">Uraian Kepribadian</p>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Sdr. {nama}</strong> {info.deskripsi}
            </p>
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

          {/* Tabel Skor */}
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-center">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-gray-500 text-xs">Grafik</th>
                  {['D','I','S','C'].map(d => (
                    <th key={d} className={`px-3 py-2 text-xs font-black ${warnaMap[d].text}`}>{d}</th>
                  ))}
                  <th className="px-3 py-2 text-xs text-gray-500">Profil</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-3 py-2 text-xs text-left text-gray-600">Graph 1 — Most</td>
                  {mostData.map(d => <td key={d.label} className="px-3 py-2 font-semibold">{d.val}</td>)}
                  <td className="px-3 py-2 text-xs font-bold text-gray-600">
                    {mostData.sort((a,b) => b.val - a.val)[0].label}
                  </td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-3 py-2 text-xs text-left text-gray-600">Graph 2 — Least</td>
                  {leastData.map(d => <td key={d.label} className="px-3 py-2 font-semibold">{d.val}</td>)}
                  <td className="px-3 py-2 text-xs font-bold text-gray-600">
                    {leastData.sort((a,b) => b.val - a.val)[0].label}
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-3 py-2 text-xs text-left text-gray-600">Graph 3 — Change</td>
                  {changeData.map(d => <td key={d.label} className={`px-3 py-2 font-bold ${d.val > 0 ? warnaMap[d.label].text : 'text-gray-400'}`}>{d.val > 0 ? '+' : ''}{d.val}</td>)}
                  <td className={`px-3 py-2 text-xs font-black ${warna.text}`}>{profil}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-center text-gray-400">
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="font-semibold text-gray-600">Graph 1 — MOST</p>
              <p>Mask / Public Self</p>
              <p className="italic">Tampilan saat ini</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="font-semibold text-gray-600">Graph 2 — LEAST</p>
              <p>Under Stress</p>
              <p className="italic">Perilaku saat tertekan</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="font-semibold text-gray-600">Graph 3 — CHANGE</p>
              <p>Core / Private Self</p>
              <p className="italic">Kepribadian sesungguhnya</p>
            </div>
          </div>
        </div>

        {/* TAMPILAN KERJA & KARAKTERISTIK */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-5 print:shadow-none print:border">
          <h3 className="font-bold text-gray-700 mb-4">Tampilan Kerjanya Saat Ini...</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {info.karakteristik.map((k, i) => (
              <span key={i} className={`text-xs px-3 py-1 rounded-full font-medium ${warna.light} ${warna.text}`}>• {k}</span>
            ))}
          </div>

          <h3 className="font-bold text-gray-700 mb-4">Karakteristik Umum...</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className={`${warna.light} border ${warna.border} rounded-xl p-4`}>
              <p className={`text-xs font-bold uppercase mb-2 ${warna.text}`}>Perilaku Kerja — Kekuatan</p>
              <ul className="space-y-1">
                {info.perilakuKerja.kekuatan.map((k,i) => <li key={i} className="text-xs text-gray-700 flex gap-1"><span>•</span>{k}</li>)}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase mb-2 text-amber-700">Perilaku Kerja — Kelemahan</p>
              <ul className="space-y-1">
                {info.perilakuKerja.kelemahan.map((k,i) => <li key={i} className="text-xs text-gray-700 flex gap-1"><span>•</span>{k}</li>)}
              </ul>
            </div>
            <div className={`${warna.light} border ${warna.border} rounded-xl p-4`}>
              <p className={`text-xs font-bold uppercase mb-2 ${warna.text}`}>Suasana Emosi — Kekuatan</p>
              <ul className="space-y-1">
                {info.suasanaEmosi.kekuatan.map((k,i) => <li key={i} className="text-xs text-gray-700 flex gap-1"><span>•</span>{k}</li>)}
              </ul>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase mb-2 text-amber-700">Suasana Emosi — Kelemahan</p>
              <ul className="space-y-1">
                {info.suasanaEmosi.kelemahan.map((k,i) => <li key={i} className="text-xs text-gray-700 flex gap-1"><span>•</span>{k}</li>)}
              </ul>
            </div>
          </div>

          {/* Kekuatan & Kelemahan lengkap */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase mb-2 text-green-700">Kekuatan</p>
              <ul className="space-y-1">
                {info.kekuatan.slice(0, 8).map((k,i) => <li key={i} className="text-xs text-gray-700 flex gap-1"><span>•</span>{k}</li>)}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-xs font-bold uppercase mb-2 text-red-700">Kelemahan</p>
              <ul className="space-y-1">
                {info.kelemahan.slice(0, 8).map((k,i) => <li key={i} className="text-xs text-gray-700 flex gap-1"><span>•</span>{k}</li>)}
              </ul>
            </div>
          </div>

          {/* Gaya Kepemimpinan */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold uppercase mb-2 text-purple-700">Gaya Kepemimpinan</p>
            <div className="flex flex-wrap gap-1">
              {info.gayaKepemimpinan.map((k,i) => (
                <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">• {k}</span>
              ))}
            </div>
          </div>

          {/* Karakteristik Pekerjaan */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-xs font-bold uppercase mb-2 text-blue-700">Karakteristik Pekerjaan yang Sesuai...</p>
            <ul className="space-y-1 columns-2">
              {info.pekerjaan.map((k,i) => <li key={i} className="text-xs text-gray-700 flex gap-1 break-inside-avoid"><span>•</span>{k}</li>)}
            </ul>
          </div>

          {/* Career Guidelines */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-xs font-bold uppercase mb-2 text-gray-600">Career Guidelines</p>
            <div className="flex flex-wrap gap-2">
              {info.karir.map((k,i) => (
                <span key={i} className={`text-xs px-3 py-1 rounded-full font-semibold ${warna.light} ${warna.text}`}>{k}</span>
              ))}
            </div>
          </div>
        </div>

        {/* TOMBOL */}
        <div className="flex gap-3 print:hidden">
          <button onClick={() => navigate('/tes-disc')} className="flex-1 border-2 border-green-600 text-green-600 font-semibold py-3 rounded-xl hover:bg-green-50 transition">
            Ulangi Tes
          </button>
          <button onClick={() => window.print()} className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition">
            🖨️ Cetak Laporan
          </button>
        </div>
      </div>
    </div>
  )
}

export default HasilDisc