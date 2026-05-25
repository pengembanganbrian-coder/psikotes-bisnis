import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'

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
  emerald: {
    bg:     'bg-emerald-50',
    border: 'border-emerald-200',
    badge:  'bg-emerald-100 text-emerald-800',
    bar:    'bg-emerald-500',
    title:  'text-emerald-700',
    btn:    'bg-emerald-600 hover:bg-emerald-700',
  },
  lime:    {
    bg:     'bg-lime-50',
    border: 'border-lime-200',
    badge:  'bg-lime-100 text-lime-800',
    bar:    'bg-lime-500',
    title:  'text-lime-700',
    btn:    'bg-lime-600 hover:bg-lime-700',
  },
  amber:   {
    bg:     'bg-amber-50',
    border: 'border-amber-200',
    badge:  'bg-amber-100 text-amber-800',
    bar:    'bg-amber-500',
    title:  'text-amber-700',
    btn:    'bg-amber-600 hover:bg-amber-700',
  },
  orange:  {
    bg:     'bg-orange-50',
    border: 'border-orange-200',
    badge:  'bg-orange-100 text-orange-800',
    bar:    'bg-orange-500',
    title:  'text-orange-700',
    btn:    'bg-orange-600 hover:bg-orange-700',
  },
  rose:    {
    bg:     'bg-rose-50',
    border: 'border-rose-200',
    badge:  'bg-rose-100 text-rose-800',
    bar:    'bg-rose-500',
    title:  'text-rose-700',
    btn:    'bg-rose-600 hover:bg-rose-700',
  },
}

/* ── Rekomendasi HR per tingkat keparahan tertinggi ─────────────── */
const rekomendasiHR = {
  Normal: {
    label: 'Kondisi Baik',
    icon: '✅',
    warna: 'emerald',
    tindakan: [
      'Pertahankan gaya hidup sehat dan keseimbangan antara kerja dan kehidupan pribadi.',
      'Ikuti program kesejahteraan pegawai yang tersedia sebagai pemeliharaan kesehatan mental rutin.',
      'Jadwalkan asesmen ulang secara berkala (minimal 1 tahun sekali).',
    ],
  },
  Ringan: {
    label: 'Perlu Perhatian',
    icon: '👁️',
    warna: 'lime',
    tindakan: [
      'Dorong pegawai untuk menerapkan teknik relaksasi dan manajemen stres sederhana sehari-hari.',
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
      'Pastikan pegawai mendapat dukungan penuh dari keluarga dan lingkungan sosial terdekat.',
      'Koordinasikan dengan unit kesehatan dan kepegawaian untuk tindak lanjut yang komprehensif.',
    ],
  },
}

/* ════════════════════════════════════════════════════════════════════
   KOMPONEN UTAMA
═══════════════════════════════════════════════════════════════════ */
export default function HasilDass() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const state     = location.state
  const saved     = useRef(false)
  const [isSaved, setIsSaved] = useState(false)

  /* Guard: pastikan state tersedia */
  if (!state?.skor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow p-8 text-center max-w-md">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-600 mb-2 font-semibold">Data hasil tidak ditemukan.</p>
          <p className="text-gray-400 text-sm mb-6">Silakan kerjakan tes terlebih dahulu.</p>
          <button
            onClick={() => navigate('/tes-dass')}
            className="bg-teal-600 text-white px-6 py-2.5 rounded-xl hover:bg-teal-700 transition font-semibold"
          >
            Kembali ke Tes
          </button>
        </div>
      </div>
    )
  }

  const { skor, nama, nip, unitKerja, fromDashboard } = state

  /* Kategorisasi */
  const kD = getKategori('D', skor.D)
  const kA = getKategori('A', skor.A)
  const kS = getKategori('S', skor.S)

  /* Tentukan keparahan tertinggi untuk rekomendasi keseluruhan */
  const allLabels  = [kD.label, kA.label, kS.label]
  const worstIdx   = Math.max(...allLabels.map(l => severityOrder.indexOf(l)))
  const worstLabel = severityOrder[worstIdx]
  const rekHR      = rekomendasiHR[worstLabel]

  /* ── Auto-save ke Supabase (hanya sekali, bukan dari dashboard) ── */
  useEffect(() => {
    if (fromDashboard || saved.current) return
    saved.current = true

    async function save() {
      const { data: peserta, error: e1 } = await supabase
        .from('peserta_dass')
        .insert({ nama, nip, jabatan: unitKerja })
        .select()
        .single()
      if (e1 || !peserta) return

      const { error: e2 } = await supabase.from('hasil_dass').insert({
        peserta_id:        peserta.id,
        skor_depresi:      skor.D,
        skor_anxietas:     skor.A,
        skor_stres:        skor.S,
        kategori_depresi:  kD.label,
        kategori_anxietas: kA.label,
        kategori_stres:    kS.label,
      })
      if (!e2) setIsSaved(true)
    }
    save()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const skalaData = [
    { key: 'D', skor: skor.D, kat: kD },
    { key: 'A', skor: skor.A, kat: kA },
    { key: 'S', skor: skor.S, kat: kS },
  ]

  /* ════════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-100 pb-12">

      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-teal-700 to-cyan-700 text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <img src="/logo-djbc.png" alt="DJBC" className="h-8 w-auto opacity-90" onError={e => { e.target.style.display = 'none' }} />
            <p className="text-xs font-medium opacity-75">Platform Asesmen Pengembangan Kepegawaian DJBC</p>
          </div>
          <h1 className="text-3xl font-black mt-5 mb-1">Laporan DASS-21</h1>
          <p className="text-sm opacity-80">Depression · Anxiety · Stress Scales</p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 text-sm opacity-90">
            <span>👤 <strong>{nama}</strong></span>
            {nip  && <span>🪪 {nip}</span>}
            {unitKerja && <span>🏢 {unitKerja}</span>}
            <span>📅 {tanggal}</span>
          </div>
          {isSaved && (
            <p className="mt-2 text-xs opacity-60 font-medium">✓ Tersimpan ke sistem</p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* ── Ringkasan Status Keseluruhan ───────────────────────── */}
        {(() => {
          const wr = warnaConfig[rekHR.warna]
          return (
            <div className={`${wr.bg} border-2 ${wr.border} rounded-2xl px-6 py-4 flex items-center gap-4`}>
              <span className="text-3xl">{rekHR.icon}</span>
              <div>
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Status Kesejahteraan Psikologis</p>
                <p className={`text-xl font-black ${wr.title}`}>{rekHR.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  D: <strong>{kD.label}</strong> · A: <strong>{kA.label}</strong> · S: <strong>{kS.label}</strong>
                </p>
              </div>
            </div>
          )
        })()}

        {/* ── Kartu per skala ───────────────────────────────────── */}
        {skalaData.map(({ key, skor: s, kat }) => {
          const info = skalaInfo[key]
          const w    = warnaConfig[kat.warna]
          const pct  = (s / 42) * 100

          return (
            <div key={key} className={`bg-white rounded-2xl shadow-sm border-2 ${w.border} overflow-hidden`}>

              {/* Header kartu */}
              <div className={`${w.bg} px-6 py-4 flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{info.emoji}</span>
                  <div>
                    <h3 className={`font-black text-lg ${w.title}`}>{info.nama}</h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">{info.thresholds}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-4xl font-black ${w.title}`}>{s}</p>
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mt-1 ${w.badge}`}>
                    {kat.label}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between text-[9px] text-gray-400 font-medium mb-1.5 px-0.5">
                  <span>0</span>
                  <span>Normal</span>
                  <span>Ringan</span>
                  <span>Sedang</span>
                  <span>Berat</span>
                  <span>42</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${w.bar} rounded-full transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Narasi interpretasi */}
              <div className="px-6 py-4">
                <p className="text-sm text-gray-700 leading-relaxed">{info.narasi[kat.label]}</p>
              </div>
            </div>
          )
        })}

        {/* ── Rekomendasi Tindak Lanjut HR ──────────────────────── */}
        {(() => {
          const wr = warnaConfig[rekHR.warna]
          return (
            <div className={`bg-white rounded-2xl shadow-sm border-2 ${wr.border} overflow-hidden`}>
              <div className={`${wr.bg} px-6 py-4 flex items-center gap-4`}>
                <span className="text-2xl">{rekHR.icon}</span>
                <div>
                  <h3 className={`font-black text-lg ${wr.title}`}>Rekomendasi Tindak Lanjut</h3>
                  <span className={`inline-block text-xs font-bold px-3 py-0.5 rounded-full ${wr.badge}`}>
                    Status keseluruhan: {rekHR.label}
                  </span>
                </div>
              </div>
              <div className="px-6 py-5">
                <ul className="space-y-3">
                  {rekHR.tindakan.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-700">
                      <span className={`flex-shrink-0 w-5 h-5 ${wr.badge} rounded-full flex items-center justify-center text-[11px] font-bold`}>
                        {i + 1}
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })()}

        {/* ── Tabel ringkasan skor ──────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-700 text-sm">Ringkasan Skor</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 font-semibold uppercase border-b border-gray-100">
                <th className="px-6 py-3 text-left">Dimensi</th>
                <th className="px-6 py-3 text-center">Skor Raw</th>
                <th className="px-6 py-3 text-center">Skor ×2</th>
                <th className="px-6 py-3 text-center">Maks.</th>
                <th className="px-6 py-3 text-center">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {skalaData.map(({ key, skor: s, kat }) => {
                const info = skalaInfo[key]
                const w    = warnaConfig[kat.warna]
                return (
                  <tr key={key} className="border-b border-gray-50 last:border-0">
                    <td className="px-6 py-3 font-medium">{info.emoji} {info.nama}</td>
                    <td className="px-6 py-3 text-center text-gray-400">{s / 2}</td>
                    <td className="px-6 py-3 text-center font-bold text-gray-800">{s}</td>
                    <td className="px-6 py-3 text-center text-gray-400">42</td>
                    <td className="px-6 py-3 text-center">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${w.badge}`}>{kat.label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* ── Catatan penting ───────────────────────────────────── */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <h4 className="font-bold text-blue-800 mb-2">⚠️ Catatan Penting</h4>
          <p className="text-sm text-blue-700 leading-relaxed">
            DASS-21 adalah alat <strong>skrining psikologis</strong>, bukan instrumen diagnostik klinis.
            Hasil ini mencerminkan kondisi emosional yang dilaporkan dalam 1 minggu terakhir dan dapat
            dipengaruhi oleh berbagai faktor situasional sementara. Interpretasi dan tindak lanjut
            harus dilakukan oleh tenaga profesional yang berwenang (psikolog, psikiater, atau konselor
            bersertifikat). Hasil bersifat <strong>rahasia</strong> dan hanya digunakan untuk kepentingan
            pengembangan SDM DJBC.
          </p>
        </div>

        {/* ── Navigasi ──────────────────────────────────────────── */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-10 py-3.5 rounded-xl transition-all shadow-lg shadow-teal-100"
          >
            ← Kembali ke Beranda
          </button>
        </div>

      </div>
    </div>
  )
}
