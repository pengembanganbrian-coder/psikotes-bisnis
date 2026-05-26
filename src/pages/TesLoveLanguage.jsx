import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

const unitKerjaOptions = [
  { group: 'Perusahaan Swasta', options: ['Manufaktur & Industri', 'Teknologi & IT', 'Perbankan & Keuangan', 'Ritel & Consumer Goods', 'Properti & Konstruksi', 'Kesehatan & Farmasi', 'Media & Komunikasi', 'Transportasi & Logistik', 'Energi & Pertambangan', 'Konsultan & Profesional', 'Lainnya'] },
  { group: 'BUMN / BUMD', options: ['Perbankan BUMN', 'Energi & Pertambangan BUMN', 'Telekomunikasi BUMN', 'Infrastruktur & Konstruksi BUMN', 'Pertanian & Pangan BUMN', 'BUMD Daerah', 'Lainnya'] },
  { group: 'Instansi Pemerintah', options: ['Kementerian / Lembaga', 'Pemerintah Daerah', 'TNI / Polri', 'Badan / Komisi Negara', 'Lainnya'] },
  { group: 'Pendidikan & Penelitian', options: ['Universitas / Perguruan Tinggi', 'Sekolah / Madrasah', 'Lembaga Pelatihan', 'Lembaga Penelitian', 'Lainnya'] },
  { group: 'Lainnya', options: ['NGO / Yayasan / Ormas', 'Startup', 'Wirausaha / Freelance', 'Pelajar / Mahasiswa', 'Lainnya'] },
]

// 30 pasang pernyataan — terjemahan resmi dari The Five Love Languages Test by Dr. Gary Chapman
// ll: W=Words of Affirmation (A), Q=Quality Time (B), G=Receiving Gifts (C), A=Acts of Service (D), P=Physical Touch (E)
const soal = [
  // 1. A(W) vs E(P)
  { id: 1,  a: { teks: 'Saya senang menerima catatan atau pesan berisi penegasan dan dukungan dari seseorang.', ll: 'W' },
            b: { teks: 'Saya senang ketika seseorang memeluk saya.', ll: 'P' } },
  // 2. B(Q) vs D(A)
  { id: 2,  a: { teks: 'Saya senang menghabiskan waktu berdua secara khusus bersama seseorang.', ll: 'Q' },
            b: { teks: 'Saya merasa dicintai ketika seseorang memberikan bantuan nyata kepada saya.', ll: 'A' } },
  // 3. C(G) vs B(Q)
  { id: 3,  a: { teks: 'Saya senang ketika seseorang memberi saya hadiah.', ll: 'G' },
            b: { teks: 'Saya senang berjalan-jalan lama atau menghabiskan waktu bersama seseorang.', ll: 'Q' } },
  // 4. D(A) vs E(P)
  { id: 4,  a: { teks: 'Saya merasa dicintai ketika seseorang melakukan sesuatu untuk membantu saya.', ll: 'A' },
            b: { teks: 'Saya merasa dicintai ketika seseorang memeluk atau menyentuh saya dengan hangat.', ll: 'P' } },
  // 5. E(P) vs C(G)
  { id: 5,  a: { teks: 'Saya merasa dicintai ketika seseorang merangkul saya dengan erat.', ll: 'P' },
            b: { teks: 'Saya merasa dicintai ketika menerima hadiah dari seseorang.', ll: 'G' } },
  // 6. B(Q) vs E(P)
  { id: 6,  a: { teks: 'Saya senang pergi ke berbagai tempat bersama seseorang.', ll: 'Q' },
            b: { teks: 'Saya senang berpegangan tangan atau berjalan berdampingan dengan seseorang.', ll: 'P' } },
  // 7. A(W) vs C(G)
  { id: 7,  a: { teks: 'Saya merasa dicintai ketika seseorang mengakui dan menghargai keberadaan saya.', ll: 'W' },
            b: { teks: 'Simbol kasih sayang yang nyata, seperti hadiah, sangat berarti bagi saya.', ll: 'G' } },
  // 8. E(P) vs A(W)
  { id: 8,  a: { teks: 'Saya senang duduk berdekatan dengan seseorang.', ll: 'P' },
            b: { teks: 'Saya senang ketika seseorang mengatakan hal-hal positif tentang diri saya.', ll: 'W' } },
  // 9. B(Q) vs C(G)
  { id: 9,  a: { teks: 'Saya senang menghabiskan waktu bersama seseorang.', ll: 'Q' },
            b: { teks: 'Saya senang menerima hadiah kecil dari seseorang.', ll: 'G' } },
  // 10. D(A) vs A(W)
  { id: 10, a: { teks: 'Saya tahu seseorang menyayangi saya ketika mereka membantu saya.', ll: 'A' },
            b: { teks: 'Kata-kata penerimaan dan apresiasi dari seseorang sangat penting bagi saya.', ll: 'W' } },
  // 11. B(Q) vs A(W)
  { id: 11, a: { teks: 'Saya senang berada bersama-sama ketika sedang mengerjakan sesuatu.', ll: 'Q' },
            b: { teks: 'Saya senang dengan kata-kata baik yang diucapkan seseorang kepada saya.', ll: 'W' } },
  // 12. E(P) vs D(A)
  { id: 12, a: { teks: 'Saya merasa utuh dan lengkap saat berpelukan dengan seseorang.', ll: 'P' },
            b: { teks: 'Apa yang seseorang lakukan untuk saya lebih bermakna daripada apa yang mereka katakan.', ll: 'A' } },
  // 13. A(W) vs C(G)
  { id: 13, a: { teks: 'Saya sangat menghargai pujian dan berusaha menghindari kritik yang tidak membangun.', ll: 'W' },
            b: { teks: 'Beberapa hadiah sederhana lebih berarti bagi saya daripada satu hadiah mahal.', ll: 'G' } },
  // 14. E(P) vs B(Q)
  { id: 14, a: { teks: 'Saya merasa lebih dekat dengan seseorang ketika mereka menyentuh saya.', ll: 'P' },
            b: { teks: 'Saya merasa dekat ketika kami berbicara atau melakukan sesuatu bersama-sama.', ll: 'Q' } },
  // 15. A(W) vs D(A)
  { id: 15, a: { teks: 'Saya suka ketika seseorang memuji pencapaian saya.', ll: 'W' },
            b: { teks: 'Saya tahu seseorang menyayangi saya ketika mereka rela melakukan sesuatu untuk saya, meski itu bukan hal yang mereka sukai.', ll: 'A' } },
  // 16. E(P) vs B(Q)
  { id: 16, a: { teks: 'Saya suka ketika seseorang menyentuh atau menepuk bahu saya saat berpapasan.', ll: 'P' },
            b: { teks: 'Saya suka ketika seseorang mendengarkan saya dengan penuh empati dan perhatian.', ll: 'Q' } },
  // 17. C(G) vs D(A)
  { id: 17, a: { teks: 'Saya benar-benar menikmati saat menerima hadiah dari seseorang.', ll: 'G' },
            b: { teks: 'Saya merasa dicintai ketika seseorang membantu proyek atau pekerjaan saya.', ll: 'A' } },
  // 18. A(W) vs B(Q)
  { id: 18, a: { teks: 'Saya suka ketika seseorang memuji penampilan atau cara saya.', ll: 'W' },
            b: { teks: 'Saya merasa dicintai ketika seseorang meluangkan waktu untuk memahami perasaan saya.', ll: 'Q' } },
  // 19. E(P) vs D(A)
  { id: 19, a: { teks: 'Saya merasa aman dan nyaman ketika seseorang menyentuh saya dengan tulus.', ll: 'P' },
            b: { teks: 'Tindakan pelayanan dari seseorang membuat saya merasa benar-benar dicintai.', ll: 'A' } },
  // 20. D(A) vs C(G)
  { id: 20, a: { teks: 'Saya menghargai banyak hal yang seseorang lakukan untuk saya.', ll: 'A' },
            b: { teks: 'Saya senang menerima hadiah buatan tangan atau yang dipilih dengan penuh perhatian.', ll: 'G' } },
  // 21. B(Q) vs D(A)
  { id: 21, a: { teks: 'Saya benar-benar menikmati perasaan saat seseorang memberikan perhatian penuhnya kepada saya.', ll: 'Q' },
            b: { teks: 'Saya benar-benar menikmati perasaan saat seseorang melakukan suatu tindakan pelayanan untuk saya.', ll: 'A' } },
  // 22. C(G) vs A(W)
  { id: 22, a: { teks: 'Saya merasa dicintai ketika seseorang merayakan hari ulang tahun saya dengan hadiah.', ll: 'G' },
            b: { teks: 'Saya merasa dicintai ketika seseorang merayakan hari ulang tahun saya dengan kata-kata bermakna, baik lisan maupun tulisan.', ll: 'W' } },
  // 23. D(A) vs C(G)
  { id: 23, a: { teks: 'Saya merasa dicintai ketika seseorang membantu pekerjaan atau urusan sehari-hari saya.', ll: 'A' },
            b: { teks: 'Saya tahu seseorang memikirkan saya ketika mereka memberi saya hadiah.', ll: 'G' } },
  // 24. C(G) vs B(Q)
  { id: 24, a: { teks: 'Saya menghargai ketika seseorang mengingat hari-hari spesial saya dengan hadiah.', ll: 'G' },
            b: { teks: 'Saya menghargai ketika seseorang mendengarkan saya dengan sabar tanpa memotong pembicaraan.', ll: 'Q' } },
  // 25. B(Q) vs D(A)
  { id: 25, a: { teks: 'Saya menikmati perjalanan atau kegiatan panjang bersama seseorang.', ll: 'Q' },
            b: { teks: 'Saya suka mengetahui bahwa seseorang cukup peduli untuk membantu tugas harian saya.', ll: 'A' } },
  // 26. E(P) vs C(G)
  { id: 26, a: { teks: 'Sentuhan hangat yang tak terduga dari seseorang membuat saya merasa dicintai.', ll: 'P' },
            b: { teks: 'Mendapat hadiah tanpa alasan tertentu membuat saya merasa benar-benar diperhatikan.', ll: 'G' } },
  // 27. A(W) vs B(Q)
  { id: 27, a: { teks: 'Saya suka ketika seseorang mengatakan bahwa mereka menghargai saya.', ll: 'W' },
            b: { teks: 'Saya suka ketika seseorang menatap saya dengan penuh perhatian saat kami berbicara.', ll: 'Q' } },
  // 28. C(G) vs E(P)
  { id: 28, a: { teks: 'Hadiah dari seseorang selalu terasa istimewa dan bermakna bagi saya.', ll: 'G' },
            b: { teks: 'Pelukan atau sentuhan hangat dari seseorang membuat saya merasa dicintai.', ll: 'P' } },
  // 29. A(W) vs D(A)
  { id: 29, a: { teks: 'Saya merasa dicintai ketika seseorang memberitahu saya betapa mereka menghargai saya.', ll: 'W' },
            b: { teks: 'Saya merasa dicintai ketika seseorang dengan antusias mengerjakan permintaan saya.', ll: 'A' } },
  // 30. E(P) vs A(W)
  { id: 30, a: { teks: 'Saya membutuhkan pelukan atau sentuhan hangat dari seseorang setiap harinya.', ll: 'P' },
            b: { teks: 'Saya membutuhkan kata-kata penegasan dan apresiasi dari seseorang setiap harinya.', ll: 'W' } },
]

function hitungLL(jawaban) {
  const skor = { W: 0, Q: 0, G: 0, A: 0, P: 0 }
  soal.forEach(s => {
    const pilihan = jawaban[s.id]
    if (pilihan === 'a') skor[s.a.ll]++
    if (pilihan === 'b') skor[s.b.ll]++
  })
  const sorted = Object.entries(skor).sort((x, y) => y[1] - x[1])
  return { skor, utama: sorted[0][0], kedua: sorted[1][0] }
}

export default function TesLoveLanguage() {
  const navigate = useNavigate()
  const [step, setStep]       = useState('form')
  const [nama, setNama]       = useState('')
  const [nip, setNip]         = useState('')
  const [jabatan, setJabatan] = useState('')
  const [jawaban, setJawaban] = useState({})
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  const answered = Object.keys(jawaban).length
  const progress  = (answered / 30) * 100

  const validateForm = () => {
    const errs = {}
    if (!nama.trim()) errs.nama = 'Nama lengkap wajib diisi.'
    if (!nip.trim())  errs.nip  = 'NIP wajib diisi.'
    if (!jabatan)     errs.jabatan = 'Unit kerja wajib dipilih.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (answered < 30) {
      const belum = soal.find(s => !jawaban[s.id])
      if (belum) {
        const el = document.getElementById(`soal-ll-${belum.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    setLoading(true)
    setSubmitError('')

    const { skor, utama, kedua } = hitungLL(jawaban)

    const { data: peserta, error: e1 } = await supabase
      .from('peserta_love_language')
      .insert([{ nama, nip, jabatan }])
      .select()
    if (e1) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }

    await supabase.from('hasil_love_language').insert([{
      peserta_id: peserta[0].id,
      skor_w: skor.W, skor_q: skor.Q, skor_g: skor.G,
      skor_a: skor.A, skor_p: skor.P,
      bahasa_utama: utama, bahasa_kedua: kedua,
    }])

    navigate('/hasil-love-language', { state: { skor, utama, kedua, nama, nip, jabatan, pesertaId: peserta[0].id } })
    setLoading(false)
  }

  /* ══════════════════════════════════════
     STEP: FORM
  ══════════════════════════════════════ */
  if (step === 'form') return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-rose-100 p-8">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center gap-2 justify-center mb-1">
            <Logo size="sm" />
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 flex-shrink-0">
            <span className="text-white text-xl">💗</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Tes Love Language</h1>
            <p className="text-sm text-gray-400">Bahasa Kasih · 5 gaya apresiasi</p>
          </div>
        </div>

        {/* Deskripsi */}
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4 mb-6 text-sm text-rose-800 leading-relaxed">
          Tes ini membantu memahami <strong>cara Anda merasa paling dihargai</strong> dan
          bagaimana Anda lebih suka mengekspresikan apresiasi kepada orang lain.
          Terdiri dari <strong>30 pasang pernyataan</strong> — pilih satu yang paling
          mencerminkan diri Anda.
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-base font-bold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-400">*</span></label>
            <input
              type="text" value={nama}
              onChange={e => { setNama(e.target.value); setFormErrors(p => ({ ...p, nama: '' })) }}
              placeholder="Nama lengkap sesuai KTP"
              className={`w-full border-2 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-rose-400 transition ${formErrors.nama ? 'border-red-400' : 'border-gray-200'}`}
            />
            {formErrors.nama && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nama}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">NIP <span className="text-red-400">*</span></label>
            <input
              type="text" value={nip}
              onChange={e => { setNip(e.target.value); setFormErrors(p => ({ ...p, nip: '' })) }}
              placeholder="NIP"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition ${formErrors.nip ? 'border-red-400' : 'border-gray-200'}`}
            />
            {formErrors.nip && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nip}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Unit Kerja <span className="text-red-400">*</span></label>
            <select
              value={jabatan}
              onChange={e => { setJabatan(e.target.value); setFormErrors(p => ({ ...p, jabatan: '' })) }}
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition bg-white ${formErrors.jabatan ? 'border-red-400' : 'border-gray-200'}`}
            >
              <option value="">-- Pilih Unit Kerja --</option>
              {unitKerjaOptions.map(g => (
                <optgroup key={g.group} label={g.group}>
                  {g.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </optgroup>
              ))}
            </select>
            {formErrors.jabatan && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.jabatan}</p>}
          </div>
        </div>

        <button
          onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
          className="mt-6 w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-rose-200"
        >
          Mulai Tes →
        </button>
      </div>
    </div>
  )

  /* ══════════════════════════════════════
     STEP: TES
  ══════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm px-6 py-3">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
          <div>
            <p className="font-bold text-gray-800 text-sm">{nama}</p>
            <p className="text-xs text-gray-400">Love Language · {answered}/30 terjawab</p>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-rose-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-rose-600 w-10 text-right">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Instruksi */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-rose-900 mb-1">Petunjuk Pengisian</h2>
          <p className="text-sm text-rose-800 leading-relaxed">
            Dari setiap pasang pernyataan, pilih <strong>satu</strong> yang paling
            mencerminkan diri Anda. Tidak ada jawaban benar atau salah. Jawab
            dengan <strong>jujur dan spontan</strong>.
          </p>
        </div>

        {/* Error banner */}
        {submitError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            ⚠ {submitError}
          </div>
        )}

        {/* Soal */}
        <div className="space-y-4">
          {soal.map((s, idx) => {
            const val  = jawaban[s.id]
            const done = !!val
            return (
              <div
                id={`soal-ll-${s.id}`}
                key={s.id}
                className={`bg-white rounded-2xl shadow-sm border-2 p-5 transition-all ${done ? 'border-rose-200' : 'border-gray-100'}`}
              >
                {/* Nomor */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${done ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {done ? '✓' : idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Pernyataan {idx + 1}</p>
                </div>

                {/* Pilihan A dan B */}
                <div className="space-y-3">
                  {[
                    { key: 'a', data: s.a },
                    { key: 'b', data: s.b },
                  ].map(({ key, data }) => {
                    const dipilih = val === key
                    return (
                      <button
                        key={key}
                        onClick={() => setJawaban(j => ({ ...j, [s.id]: key }))}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${
                          dipilih
                            ? 'border-rose-400 bg-rose-50'
                            : 'border-gray-100 bg-gray-50 hover:border-rose-200 hover:bg-rose-50/40'
                        }`}
                      >
                        <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${
                          dipilih ? 'border-rose-500 bg-rose-500' : 'border-gray-300 bg-white'
                        }`}>
                          {dipilih && <span className="w-2.5 h-2.5 bg-white rounded-full" />}
                        </span>
                        <span className={`text-sm leading-relaxed ${dipilih ? 'text-rose-800 font-semibold' : 'text-gray-700'}`}>
                          {data.teks}
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
          {answered < 30 && (
            <p className="text-center text-sm text-amber-600 font-medium mb-3">
              ⚠ Masih {30 - answered} pertanyaan belum dijawab
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full font-bold py-4 rounded-2xl text-lg transition-all ${
              answered === 30
                ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? '⏳ Menyimpan hasil...' : answered === 30 ? 'Lihat Hasil →' : `${answered} / 30 terjawab`}
          </button>
        </div>
      </div>
    </div>
  )
}
