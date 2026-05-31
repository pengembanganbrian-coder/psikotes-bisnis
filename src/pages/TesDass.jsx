import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { supabase } from '../supabase'

const unitKerjaOptions = [
  { group: 'Perusahaan Swasta', options: ['Manufaktur & Industri', 'Teknologi & IT', 'Perbankan & Keuangan', 'Ritel & Consumer Goods', 'Properti & Konstruksi', 'Kesehatan & Farmasi', 'Media & Komunikasi', 'Transportasi & Logistik', 'Energi & Pertambangan', 'Konsultan & Profesional', 'Lainnya'] },
  { group: 'BUMN / BUMD', options: ['Perbankan BUMN', 'Energi & Pertambangan BUMN', 'Telekomunikasi BUMN', 'Infrastruktur & Konstruksi BUMN', 'Pertanian & Pangan BUMN', 'BUMD Daerah', 'Lainnya'] },
  { group: 'Instansi Pemerintah', options: ['Kementerian / Lembaga', 'Pemerintah Daerah', 'TNI / Polri', 'Badan / Komisi Negara', 'Lainnya'] },
  { group: 'Pendidikan & Penelitian', options: ['Universitas / Perguruan Tinggi', 'Sekolah / Madrasah', 'Lembaga Pelatihan', 'Lembaga Penelitian', 'Lainnya'] },
  { group: 'Lainnya', options: ['NGO / Yayasan / Ormas', 'Startup', 'Wirausaha / Freelance', 'Pelajar / Mahasiswa', 'Lainnya'] },
]

// 21 pernyataan DASS-21 (versi Bahasa Indonesia yang tervalidasi)
// Skala: D = Depresi, A = Kecemasan (Anxiety), S = Stres
// Petunjuk: dirasakan dalam 1 minggu terakhir
const soal = [
  { id: 1,  teks: "Saya merasa sulit untuk menenangkan diri",                                                                                                     skala: "S" },
  { id: 2,  teks: "Saya merasakan mulut saya terasa kering",                                                                                                      skala: "A" },
  { id: 3,  teks: "Saya tidak dapat merasakan perasaan positif sama sekali",                                                                                      skala: "D" },
  { id: 4,  teks: "Saya mengalami kesulitan bernapas (misalnya: napas terlalu cepat atau sesak tanpa aktivitas fisik)",                                           skala: "A" },
  { id: 5,  teks: "Saya merasa kesulitan untuk berinisiatif melakukan sesuatu",                                                                                   skala: "D" },
  { id: 6,  teks: "Saya cenderung bereaksi berlebihan terhadap suatu situasi",                                                                                    skala: "S" },
  { id: 7,  teks: "Saya mengalami gemetar (misalnya: pada tangan)",                                                                                               skala: "A" },
  { id: 8,  teks: "Saya merasa banyak menghabiskan energi karena kecemasan",                                                                                      skala: "S" },
  { id: 9,  teks: "Saya khawatir berada dalam situasi di mana saya mungkin panik dan mempermalukan diri sendiri",                                                 skala: "A" },
  { id: 10, teks: "Saya merasa tidak ada hal yang dapat diharapkan ke depan",                                                                                     skala: "D" },
  { id: 11, teks: "Saya merasa mudah menjadi gelisah",                                                                                                            skala: "S" },
  { id: 12, teks: "Saya merasa sulit untuk rileks",                                                                                                               skala: "S" },
  { id: 13, teks: "Saya merasa sedih dan tertekan",                                                                                                               skala: "D" },
  { id: 14, teks: "Saya tidak sabar terhadap hal-hal yang menghalangi saya dalam melakukan sesuatu",                                                             skala: "S" },
  { id: 15, teks: "Saya merasa hampir panik",                                                                                                                     skala: "A" },
  { id: 16, teks: "Saya tidak mampu merasa antusias terhadap apapun",                                                                                             skala: "D" },
  { id: 17, teks: "Saya merasa diri saya tidak berharga sebagai seorang manusia",                                                                                 skala: "D" },
  { id: 18, teks: "Saya merasa mudah tersinggung",                                                                                                                skala: "S" },
  { id: 19, teks: "Saya menyadari detak jantung saya meskipun tanpa aktivitas fisik (misalnya: detak jantung meningkat atau berdebar)",                          skala: "A" },
  { id: 20, teks: "Saya merasa ketakutan tanpa alasan yang jelas",                                                                                                skala: "A" },
  { id: 21, teks: "Saya merasa hidup tidak berarti",                                                                                                              skala: "D" },
]

// Depresi items:  3, 5, 10, 13, 16, 17, 21  (7 items × 2 = max 42)
// Kecemasan items: 2, 4, 7, 9, 15, 19, 20  (7 items × 2 = max 42)
// Stres items:    1, 6, 8, 11, 12, 14, 18  (7 items × 2 = max 42)

export default function TesDass() {
  const navigate = useNavigate()
  const [step, setStep]           = useState('form') // 'form' | 'tes'
  const [nama, setNama]           = useState('')
  const [nip, setNip]             = useState('')
  const [unitKerja, setUnitKerja] = useState('')
  const [jawaban, setJawaban]     = useState({})      // { id: 0|1|2|3 }
  const [formErrors, setFormErrors] = useState({})

  const answered = Object.keys(jawaban).length
  const progress  = (answered / 21) * 100

  function hitungDASS() {
    const D = soal.filter(s => s.skala === 'D').reduce((sum, s) => sum + (jawaban[s.id] ?? 0), 0) * 2
    const A = soal.filter(s => s.skala === 'A').reduce((sum, s) => sum + (jawaban[s.id] ?? 0), 0) * 2
    const S = soal.filter(s => s.skala === 'S').reduce((sum, s) => sum + (jawaban[s.id] ?? 0), 0) * 2
    return { D, A, S }
  }

  function validateForm() {
    const errs = {}
    if (!nama.trim()) errs.nama = 'Nama lengkap wajib diisi.'
    if (!nip.trim())  errs.nip  = 'NIP wajib diisi.'
    if (!unitKerja)   errs.unitKerja = 'Unit kerja wajib dipilih.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit() {
    if (answered < 21) {
      const belum = soal.find(s => jawaban[s.id] === undefined)
      if (belum) {
        const el = document.getElementById(`soal-${belum.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    const { D, A, S } = hitungDASS()

    // Simpan ke Supabase
    try {
      const { data: peserta, error: e1 } = await supabase
        .from('peserta_dass')
        .insert([{ nama, nip, jabatan: unitKerja }])
        .select()
        .single()

      if (e1 || !peserta) throw e1 || new Error('Gagal menyimpan peserta DASS')

      const kategori = (skor, batas) => {
        if (skor <= batas[0]) return 'Normal'
        if (skor <= batas[1]) return 'Ringan'
        if (skor <= batas[2]) return 'Sedang'
        if (skor <= batas[3]) return 'Berat'
        return 'Sangat Berat'
      }

      await supabase.from('hasil_dass').insert([{
        peserta_id:         peserta.id,
        skor_depresi:       D,
        skor_anxietas:      A,
        skor_stres:         S,
        kategori_depresi:   kategori(D, [9, 13, 20, 27]),
        kategori_anxietas:  kategori(A, [7, 9, 14, 19]),
        kategori_stres:     kategori(S, [14, 18, 25, 33]),
      }])

      navigate('/hasil-dass', { state: { skor: { D, A, S }, nama, nip, unitKerja, jawaban, pesertaId: peserta.id } })
    } catch (err) {
      console.error('Save DASS error:', err)
      // Navigate tetap dilanjutkan meski save gagal, tanpa pesertaId
      navigate('/hasil-dass', { state: { skor: { D, A, S }, nama, nip, unitKerja, jawaban } })
    }
  }

  /* ═══════════════════════════════════════════════════════
     STEP: FORM
  ═══════════════════════════════════════════════════════ */
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-teal-100 p-8">

          {/* Logo + Judul */}
          <div className="text-center mb-6">
            <div className="flex items-center gap-2 justify-center mb-1">
              <Logo size="sm" />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200 flex-shrink-0">
              <span className="text-white font-black text-xs text-center leading-tight">DASS<br/>21</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">Tes DASS-21</h1>
              <p className="text-sm text-gray-400">Depression · Anxiety · Stress Scales</p>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 mb-6 text-sm text-teal-800 leading-relaxed">
            DASS-21 adalah alat skrining untuk mengukur tingkat{' '}
            <strong>depresi</strong>, <strong>kecemasan</strong>, dan <strong>stres</strong>{' '}
            yang Anda rasakan dalam <strong>1 minggu terakhir</strong>.
            Terdiri dari 21 pernyataan singkat. Tidak ada jawaban benar atau salah.
          </div>

          {/* Form isian */}
          <div className="space-y-4">
            <div>
              <label className="block text-base font-bold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-400">*</span></label>
              <input
                type="text" value={nama}
                onChange={e => { setNama(e.target.value); setFormErrors(p => ({ ...p, nama: '' })) }}
                placeholder="Nama lengkap sesuai KTP"
                className={`w-full border-2 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-teal-400 transition ${formErrors.nama ? 'border-red-400' : 'border-gray-200'}`}
              />
              {formErrors.nama && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nama}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">NIP <span className="text-red-400">*</span></label>
              <input
                type="text" value={nip}
                onChange={e => { setNip(e.target.value); setFormErrors(p => ({ ...p, nip: '' })) }}
                placeholder="NIP"
                className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 transition ${formErrors.nip ? 'border-red-400' : 'border-gray-200'}`}
              />
              {formErrors.nip && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nip}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Unit Kerja <span className="text-red-400">*</span></label>
              <select
                value={unitKerja}
                onChange={e => { setUnitKerja(e.target.value); setFormErrors(p => ({ ...p, unitKerja: '' })) }}
                className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-400 transition bg-white ${formErrors.unitKerja ? 'border-red-400' : 'border-gray-200'}`}
              >
                <option value="">-- Pilih Unit Kerja --</option>
                {unitKerjaOptions.map(g => (
                  <optgroup key={g.group} label={g.group}>
                    {g.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </optgroup>
                ))}
              </select>
              {formErrors.unitKerja && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.unitKerja}</p>}
            </div>
          </div>

          <button
            onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
            className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-teal-200"
          >
            Mulai Tes →
          </button>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════════════════════
     STEP: TES
  ═══════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sticky progress header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm px-6 py-3">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
          <div>
            <p className="font-bold text-gray-800 text-sm">{nama}</p>
            <p className="text-sm text-gray-400">DASS-21 · {answered}/21 terjawab</p>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-teal-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-teal-600 w-10 text-right">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Instruksi + Legenda */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-teal-900 mb-2">Petunjuk Pengisian</h2>
          <p className="text-sm text-teal-800 leading-relaxed mb-4">
            Bacalah setiap pernyataan dan pilih angka yang paling menggambarkan apa yang Anda rasakan atau alami dalam{' '}
            <strong>1 minggu terakhir</strong>. Tidak ada jawaban benar atau salah.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { n: 0, label: 'Tidak pernah',  cls: 'bg-emerald-100 text-emerald-700' },
              { n: 1, label: 'Kadang-kadang', cls: 'bg-amber-100 text-amber-700'   },
              { n: 2, label: 'Sering',         cls: 'bg-orange-100 text-orange-700' },
              { n: 3, label: 'Hampir selalu',  cls: 'bg-rose-100 text-rose-700'    },
            ].map(({ n, label, cls }) => (
              <div key={n} className="flex items-center gap-2 text-xs">
                <span className={`w-6 h-6 ${cls} font-bold rounded-lg flex items-center justify-center flex-shrink-0`}>{n}</span>
                <span className="text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daftar soal */}
        <div className="space-y-4">
          {soal.map(s => {
            const val  = jawaban[s.id]
            const done = val !== undefined

            const btnCfg = [
              { idle: 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700', active: 'bg-emerald-500 border-emerald-500 text-white' },
              { idle: 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700',   active: 'bg-amber-500 border-amber-500 text-white'   },
              { idle: 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700', active: 'bg-orange-500 border-orange-500 text-white'  },
              { idle: 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700',     active: 'bg-rose-500 border-rose-500 text-white'      },
            ]

            return (
              <div
                id={`soal-${s.id}`}
                key={s.id}
                className={`bg-white rounded-2xl shadow-sm border-2 p-5 transition-all ${done ? 'border-teal-200' : 'border-gray-100'}`}
              >
                {/* Nomor + teks */}
                <div className="flex gap-3 mb-4">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {s.id}
                  </span>
                  <p className="text-sm font-medium text-gray-800 leading-relaxed">{s.teks}</p>
                </div>

                {/* Tombol pilihan */}
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map(n => {
                    const c        = btnCfg[n]
                    const selected = val === n
                    return (
                      <button
                        key={n}
                        onClick={() => setJawaban(j => ({ ...j, [s.id]: n }))}
                        className={`border-2 rounded-xl py-2.5 flex flex-col items-center gap-0.5 transition-all ${selected ? c.active : c.idle}`}
                      >
                        <span className="text-base font-black leading-none">{n}</span>
                        <span className="text-[9px] font-medium leading-tight text-center px-0.5 mt-0.5">
                          {['Tidak\npernah', 'Kadang-\nkadang', 'Sering', 'Hampir\nselalu'][n]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Submit */}
        <div className="mt-8 pb-8">
          {answered < 21 && (
            <p className="text-center text-sm text-amber-600 font-medium mb-3">
              ⚠️ Masih {21 - answered} pertanyaan belum dijawab
            </p>
          )}
          <button
            onClick={handleSubmit}
            className={`w-full font-bold py-4 rounded-2xl text-lg transition-all ${
              answered === 21
                ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {answered === 21 ? 'Lihat Hasil →' : `${answered} / 21 terjawab`}
          </button>
        </div>
      </div>
    </div>
  )
}
