import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

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
      'Perlu pelatihan kepemimpinan yang berfokus pada kecerdasan emosional dan komunikasi. Risiko tinggi terhadap turnover karyawan.',
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

export default function HasilMsdt() {
  const location = useLocation()
  const navigate = useNavigate()
  const state    = location.state

  /* Guard: state tidak ada */
  if (!state?.hasil) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow p-8 text-center max-w-md">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-600 mb-2 font-semibold">Data hasil tidak ditemukan.</p>
          <p className="text-gray-400 text-sm mb-6">Silakan kerjakan tes terlebih dahulu.</p>
          <button
            onClick={() => navigate('/tes-msdt')}
            className="bg-orange-600 text-white px-6 py-2.5 rounded-xl hover:bg-orange-700 transition font-semibold"
          >
            Kembali ke Tes
          </button>
        </div>
      </div>
    )
  }

  const { hasil, nama, nip, unitKerja } = state
  const { TO, RO, E_score, grandTotal, gaya, toTinggi, roTinggi, eTinggi } = hasil

  const info = gayaInfo[gaya] || gayaInfo['Deserter']
  const w    = warnaConfig[info.warna]

  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  /* Bar helper: TO range 3–19, RO range 1–17 */
  const toPct = Math.min(100, Math.max(0, ((TO - 3) / (19 - 3)) * 100))
  const roPct = Math.min(100, Math.max(0, ((RO - 1) / (17 - 1)) * 100))
  const ePct  = (E_score / 4.0) * 100
  const gtPct = Math.min(100, Math.max(0, (grandTotal / 50) * 100))

  return (
    <div className="min-h-screen bg-slate-100 pb-12">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className={`bg-gradient-to-r ${w.grad} text-white px-6 py-10`}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="flex items-center gap-2">
              <Logo size="sm" dark />
            </div>
            <p className="text-xs font-medium opacity-75">AssesIN — Platform Asesmen Psikologi</p>
          </div>
          <h1 className="text-3xl font-black mt-5 mb-1">Laporan MSDT</h1>
          <p className="text-sm opacity-80">Management Style Diagnostic Test</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-sm opacity-90">
            <span>👤 <strong>{nama}</strong></span>
            {nip       && <span>🪪 {nip}</span>}
            {unitKerja && <span>🏢 {unitKerja}</span>}
            <span>📅 {tanggal}</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* ── Kartu Gaya Utama ──────────────────────────────────── */}
        <div className={`${w.bg} border-2 ${w.border} rounded-2xl overflow-hidden`}>
          <div className="px-6 py-6 flex items-center gap-5">
            <span className="text-5xl">{info.emoji}</span>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Gaya Manajemen Anda</p>
              <h2 className={`text-3xl font-black ${w.title}`}>{gaya}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${w.badge}`}>
                  TO: {info.labelTO}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${w.badge}`}>
                  RO: {info.labelRO}
                </span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${w.badge}`}>
                  Efektivitas: {info.labelE}
                </span>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-700 leading-relaxed">{info.deskripsi}</p>
          </div>
        </div>

        {/* ── Grid Skor ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* TO */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Task Orientation (TO)</p>
                <p className="text-xs text-gray-400 mt-0.5">Orientasi pada tugas · range 3–19</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-gray-800">{TO}</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${toTinggi ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                  {toTinggi ? 'Tinggi' : 'Rendah'}
                </span>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${toTinggi ? 'bg-orange-500' : 'bg-blue-400'}`}
                style={{ width: `${toPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-0.5">
              <span>3</span>
              <span>Threshold: 11</span>
              <span>19</span>
            </div>
          </div>

          {/* RO */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Relationship Orientation (RO)</p>
                <p className="text-xs text-gray-400 mt-0.5">Orientasi pada hubungan · range 1–17</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-gray-800">{RO}</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${roTinggi ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                  {roTinggi ? 'Tinggi' : 'Rendah'}
                </span>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${roTinggi ? 'bg-orange-500' : 'bg-blue-400'}`}
                style={{ width: `${roPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-0.5">
              <span>1</span>
              <span>Threshold: 9</span>
              <span>17</span>
            </div>
          </div>

          {/* E Score */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Skor Efektivitas (E)</p>
                <p className="text-xs text-gray-400 mt-0.5">Konversi dari Grand Total · range 0–4</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-gray-800">{E_score.toFixed(1)}</p>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${eTinggi ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {eTinggi ? 'Efektif (≥2.0)' : 'Kurang Efektif'}
                </span>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${eTinggi ? 'bg-green-500' : 'bg-gray-400'}`}
                style={{ width: `${ePct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-0.5">
              <span>0</span>
              <span>Threshold: 2.0</span>
              <span>4.0</span>
            </div>
          </div>

          {/* Grand Total */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Grand Total</p>
                <p className="text-xs text-gray-400 mt-0.5">TO + RO + E_raw + O_raw</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-gray-800">{grandTotal}</p>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                  Skor Total
                </span>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${gtPct}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1 px-0.5">
              <span>0</span>
              <span>Dasar E-score</span>
              <span>50</span>
            </div>
          </div>
        </div>

        {/* ── Decision Tree Visual ───────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-700 text-sm">Peta Gaya Manajemen (Decision Tree)</h3>
          </div>
          <div className="p-6">
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
                    className={`rounded-xl p-3 border-2 transition-all ${
                      isActive
                        ? `${w.border} ${w.bg} ${w.title} font-bold`
                        : 'border-gray-100 bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{item.emoji}</span>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.to ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                        TO: {item.to ? 'T' : 'R'}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.ro ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'}`}>
                        RO: {item.ro ? 'T' : 'R'}
                      </span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${item.e ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        E: {item.e ? '≥2' : '<2'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-[10px] text-gray-400 mt-3 text-center">T = Tinggi · R = Rendah · E = Skor Efektivitas</p>
          </div>
        </div>

        {/* ── Implikasi HR ───────────────────────────────────────── */}
        <div className={`bg-white rounded-2xl shadow-sm border-2 ${w.border} overflow-hidden`}>
          <div className={`${w.bg} px-6 py-4 flex items-center gap-4`}>
            <span className="text-2xl">💼</span>
            <div>
              <h3 className={`font-black text-lg ${w.title}`}>Implikasi & Rekomendasi HR</h3>
              <span className={`inline-block text-xs font-bold px-3 py-0.5 rounded-full ${w.badge}`}>
                Gaya: {gaya}
              </span>
            </div>
          </div>
          <div className="px-6 py-5">
            <p className="text-sm text-gray-700 leading-relaxed">{info.implikasi}</p>
          </div>
        </div>

        {/* ── Ringkasan Skor ─────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-700 text-sm">Ringkasan Skor</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 font-semibold uppercase border-b border-gray-100">
                <th className="px-6 py-3 text-left">Dimensi</th>
                <th className="px-6 py-3 text-center">Skor</th>
                <th className="px-6 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-3 font-medium">Task Orientation (TO)</td>
                <td className="px-6 py-3 text-center font-bold text-gray-800">{TO}</td>
                <td className="px-6 py-3 text-center">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${toTinggi ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {toTinggi ? 'Tinggi (>11)' : 'Rendah (≤11)'}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-3 font-medium">Relationship Orientation (RO)</td>
                <td className="px-6 py-3 text-center font-bold text-gray-800">{RO}</td>
                <td className="px-6 py-3 text-center">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${roTinggi ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                    {roTinggi ? 'Tinggi (>9)' : 'Rendah (≤9)'}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-50">
                <td className="px-6 py-3 font-medium">Grand Total</td>
                <td className="px-6 py-3 text-center font-bold text-gray-800">{grandTotal}</td>
                <td className="px-6 py-3 text-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
                    Dasar E-score
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 font-medium">Skor Efektivitas (E)</td>
                <td className="px-6 py-3 text-center font-bold text-gray-800">{E_score.toFixed(1)}</td>
                <td className="px-6 py-3 text-center">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${eTinggi ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {eTinggi ? 'Efektif (≥2.0)' : 'Kurang Efektif (<2.0)'}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── Catatan ────────────────────────────────────────────── */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h4 className="font-bold text-blue-800 mb-2">⚠️ Catatan Penting</h4>
          <p className="text-sm text-blue-700 leading-relaxed">
            MSDT adalah alat <strong>diagnostik gaya manajemen</strong>, bukan penilaian mutlak kualitas kepemimpinan.
            Gaya manajemen dapat berkembang dan beradaptasi sesuai konteks dan situasi.
            Interpretasi dan tindak lanjut harus dilakukan oleh profesional HR yang berwenang.
            Hasil bersifat <strong>rahasia</strong> dan digunakan untuk kepentingan pengembangan sumber daya manusia.
          </p>
        </div>

        {/* ── Navigasi ───────────────────────────────────────────── */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/')}
            className={`${w.btn} text-white font-bold px-10 py-3.5 rounded-xl transition-all shadow-lg`}
          >
            ← Kembali ke Beranda
          </button>
        </div>

      </div>
    </div>
  )
}
