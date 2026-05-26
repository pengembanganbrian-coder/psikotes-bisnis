import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const unitKerjaOptions = [
  { group: 'Kantor Pusat — Bagian', options: ['Bagian Organisasi dan Tata Laksana','Bagian Keuangan','Bagian Umum','Bagian Administrasi Kepegawaian','Bagian Pengembangan Kepegawaian','Bagian Pengelolaan Barang Milik Negara'] },
  { group: 'Kantor Pusat — Direktorat', options: ['Direktorat Teknis Kepabeanan','Direktorat Fasilitas Kepabeanan','Direktorat Teknis dan Fasilitas Cukai','Direktorat Keberatan Banding dan Peraturan','Direktorat Penindakan dan Penyidikan','Direktorat Audit Kepabeanan dan Cukai','Direktorat Kepatuhan Internal','Direktorat Informasi Kepabeanan dan Cukai','Direktorat Penerimaan dan Perencanaan Strategis','Direktorat Kerja Sama Internasional Kepabeanan dan Cukai','Direktorat Interdiksi Narkotika','Direktorat Komunikasi dan Bimbingan Pengguna Jasa','Tenaga Pengkaji Bidang Pengawasan dan Penegakan Hukum','Tenaga Pengkaji Bidang Pengembangan Kapasitas dan Kinerja Organisasi'] },
  { group: 'Kantor Wilayah', options: ['Kantor Wilayah DJBC Aceh','Kantor Wilayah DJBC Sumatera Utara','Kantor Wilayah DJBC Riau','Kantor Wilayah DJBC Khusus Kepulauan Riau','Kantor Wilayah DJBC Sumatera Bagian Timur','Kantor Wilayah DJBC Sumatera Bagian Barat','Kantor Wilayah DJBC Banten','Kantor Wilayah DJBC Jakarta','Kantor Wilayah DJBC Jawa Barat','Kantor Wilayah DJBC Jawa Tengah dan DI Yogyakarta','Kantor Wilayah DJBC Jawa Timur I','Kantor Wilayah DJBC Jawa Timur II','Kantor Wilayah DJBC Bali, NTB dan NTT','Kantor Wilayah DJBC Kalimantan Bagian Barat','Kantor Wilayah DJBC Kalimantan Bagian Timur','Kantor Wilayah DJBC Kalimantan Bagian Selatan','Kantor Wilayah DJBC Sulawesi Bagian Selatan','Kantor Wilayah DJBC Sulawesi Bagian Utara','Kantor Wilayah DJBC Maluku','Kantor Wilayah DJBC Khusus Papua'] },
  { group: 'Kantor Pelayanan Utama (KPU)', options: ['KPU Bea dan Cukai Tipe A Tanjung Priok','KPU Bea dan Cukai Tipe C Soekarno-Hatta','KPU Bea dan Cukai Tipe B Batam'] },
  { group: 'KPPBC', options: ['KPPBC Tipe Madya Pabean Belawan','KPPBC Tipe Madya Pabean A Tangerang','KPPBC Tipe Madya Pabean A Jakarta','KPPBC Tipe Madya Pabean A Bekasi','KPPBC Tipe Madya Pabean Cikarang','KPPBC Tipe Madya Pabean A Bogor','KPPBC Tipe Madya Pabean A Purwakarta','KPPBC Tipe Madya Pabean A Bandung','KPPBC Tipe Madya Pabean Tanjung Emas','KPPBC Tipe Madya Cukai Kudus','KPPBC Tipe Madya Pabean A Semarang','KPPBC Tipe Madya Pabean Tanjung Perak','KPPBC Tipe Madya Pabean Juanda','KPPBC Tipe Madya Pabean B Makassar','KPPBC Tipe Madya Pabean B Balikpapan','KPPBC Tipe Madya Pabean B Banjarmasin','KPPBC Lainnya'] },
  { group: 'Lainnya', options: ['Pangkalan Sarana Operasi Bea dan Cukai','Balai Laboratorium Bea dan Cukai','Satuan Tugas Khusus'] },
]

// 30 pasang pernyataan — masing-masing 10 pasangan LL × 3 putaran
// ll: W=Words of Affirmation, Q=Quality Time, G=Receiving Gifts, A=Acts of Service, P=Physical Touch
const soal = [
  // W vs Q
  { id: 1,  a: { teks: 'Pujian dan kata-kata dukungan dari orang terdekat sangat berarti bagi saya.', ll: 'W' }, b: { teks: 'Menghabiskan waktu berkualitas bersama seseorang lebih bermakna dari apapun.', ll: 'Q' } },
  { id: 2,  a: { teks: 'Saya merasa paling dihargai saat seseorang memuji atau mengakui pencapaian saya.', ll: 'W' }, b: { teks: 'Perhatian penuh tanpa gangguan saat bersama seseorang membuat saya merasa berarti.', ll: 'Q' } },
  { id: 3,  a: { teks: 'Kata-kata semangat dari orang terdekat membuat hari saya jauh lebih baik.', ll: 'W' }, b: { teks: 'Saya lebih senang diajak berbincang dan berbagi cerita daripada diberi hadiah.', ll: 'Q' } },
  // W vs G
  { id: 4,  a: { teks: 'Ucapan apresiasi secara langsung sangat menyentuh hati saya.', ll: 'W' }, b: { teks: 'Menerima hadiah kecil yang dipilih dengan penuh perhatian membuat saya merasa diingat.', ll: 'G' } },
  { id: 5,  a: { teks: 'Kata-kata "aku bangga padamu" dari orang yang saya percaya sangat memotivasi saya.', ll: 'W' }, b: { teks: 'Hadiah kejutan, meski sederhana, menunjukkan bahwa seseorang memikirkan saya.', ll: 'G' } },
  { id: 6,  a: { teks: 'Saya lebih senang dipuji secara tulus daripada diberi sesuatu.', ll: 'W' }, b: { teks: 'Simbol perhatian seperti oleh-oleh atau kenang-kenangan kecil sangat bermakna bagi saya.', ll: 'G' } },
  // W vs A
  { id: 7,  a: { teks: 'Pesan singkat yang penuh dukungan dari seseorang membuat saya merasa dicintai.', ll: 'W' }, b: { teks: 'Ketika seseorang membantu saya mengerjakan sesuatu tanpa diminta, saya merasa sangat dihargai.', ll: 'A' } },
  { id: 8,  a: { teks: 'Kata-kata yang jujur dan mendukung lebih berharga bagi saya daripada bantuan fisik.', ll: 'W' }, b: { teks: 'Tindakan nyata untuk meringankan beban saya menunjukkan rasa perhatian yang sesungguhnya.', ll: 'A' } },
  { id: 9,  a: { teks: 'Saya merasa dihargai ketika seseorang meluangkan waktu menulis pesan yang tulus.', ll: 'W' }, b: { teks: 'Seseorang yang berinisiatif membantu pekerjaan saya agar saya bisa lebih ringan sangat berarti.', ll: 'A' } },
  // W vs P
  { id: 10, a: { teks: 'Kata-kata dorongan di saat sulit sangat membantu saya bangkit kembali.', ll: 'W' }, b: { teks: 'Pelukan dari orang yang saya percaya membuat saya merasa aman dan didukung.', ll: 'P' } },
  { id: 11, a: { teks: 'Saya lebih membutuhkan kata-kata penegasan daripada kontak fisik.', ll: 'W' }, b: { teks: 'Tepukan di bahu atau jabat tangan erat menunjukkan kepedulian yang tulus.', ll: 'P' } },
  { id: 12, a: { teks: 'Seseorang yang menyebut hal-hal positif tentang saya membuat saya merasa bahagia.', ll: 'W' }, b: { teks: 'High-five atau salam hangat membuat saya merasa benar-benar terhubung dengan seseorang.', ll: 'P' } },
  // Q vs G
  { id: 13, a: { teks: 'Saya merasa paling dihargai saat seseorang meluangkan waktu hanya untuk bersama saya.', ll: 'Q' }, b: { teks: 'Menerima hadiah, bahkan yang kecil, membuat saya merasa diingat dan diperhatikan.', ll: 'G' } },
  { id: 14, a: { teks: 'Aktivitas bersama seperti makan siang atau olahraga lebih bermakna daripada hadiah apapun.', ll: 'Q' }, b: { teks: 'Ketika seseorang membawakan sesuatu khusus untuk saya, saya merasa sangat dihargai.', ll: 'G' } },
  { id: 15, a: { teks: 'Saya lebih senang diajak melakukan sesuatu bersama daripada diberi benda.', ll: 'Q' }, b: { teks: 'Hadiah yang mencerminkan pemahaman seseorang tentang selera saya sangat menyentuh hati.', ll: 'G' } },
  // Q vs A
  { id: 16, a: { teks: 'Waktu berdua tanpa gangguan adalah bentuk perhatian terbaik bagi saya.', ll: 'Q' }, b: { teks: 'Bantuan praktis dalam menyelesaikan tugas lebih bermakna bagi saya daripada waktu bersama.', ll: 'A' } },
  { id: 17, a: { teks: 'Saya merasa diperhatikan ketika seseorang menyisihkan waktu khusus untuk bersama saya.', ll: 'Q' }, b: { teks: 'Ketika seseorang membantu menyelesaikan masalah saya, saya merasa benar-benar didukung.', ll: 'A' } },
  { id: 18, a: { teks: 'Percakapan yang bermakna dan mendalam lebih saya hargai daripada bantuan fisik.', ll: 'Q' }, b: { teks: 'Saya merasa dihargai ketika seseorang bertindak untuk memudahkan urusan saya.', ll: 'A' } },
  // Q vs P
  { id: 19, a: { teks: 'Berjalan-jalan atau makan bersama secara rutin membuat saya merasa terhubung erat.', ll: 'Q' }, b: { teks: 'Sentuhan fisik seperti jabat tangan erat atau tepukan membuat saya merasa dekat.', ll: 'P' } },
  { id: 20, a: { teks: 'Momen bersama yang berkualitas lebih saya ingat daripada kontak fisik.', ll: 'Q' }, b: { teks: 'Saya merasa paling dekat dengan seseorang saat ada kontak fisik yang hangat dan tulus.', ll: 'P' } },
  { id: 21, a: { teks: 'Saya lebih membutuhkan kehadiran nyata seseorang daripada pelukan.', ll: 'Q' }, b: { teks: 'Sentuhan yang tulus, sekecil apapun, membuat saya merasa sungguh diperhatikan.', ll: 'P' } },
  // G vs A
  { id: 22, a: { teks: 'Oleh-oleh atau kenang-kenangan kecil menunjukkan bahwa seseorang memikirkan saya.', ll: 'G' }, b: { teks: 'Seseorang yang rela melakukan sesuatu untuk meringankan beban saya sangat saya hargai.', ll: 'A' } },
  { id: 23, a: { teks: 'Hadiah simbolis yang bermakna lebih berkesan bagi saya daripada tindakan pelayanan.', ll: 'G' }, b: { teks: 'Bantuan nyata dalam kehidupan sehari-hari lebih menunjukkan perhatian daripada hadiah.', ll: 'A' } },
  { id: 24, a: { teks: 'Saya merasa istimewa ketika seseorang memilihkan sesuatu khusus untuk saya.', ll: 'G' }, b: { teks: 'Ketika seseorang berinisiatif membantu tanpa diminta, saya merasa benar-benar dicintai.', ll: 'A' } },
  // G vs P
  { id: 25, a: { teks: 'Saya lebih mengingat hadiah yang thoughtful daripada sentuhan fisik.', ll: 'G' }, b: { teks: 'Pelukan atau sentuhan hangat lebih bermakna bagi saya daripada benda apapun.', ll: 'P' } },
  { id: 26, a: { teks: 'Kenang-kenangan fisik dari seseorang selalu mengingatkan saya pada perhatian mereka.', ll: 'G' }, b: { teks: 'Kontak fisik yang tulus lebih saya hargai daripada hadiah materi.', ll: 'P' } },
  { id: 27, a: { teks: 'Saya merasa diingat dan dihargai ketika seseorang membawakan sesuatu untuk saya.', ll: 'G' }, b: { teks: 'Sentuhan fisik yang hangat lebih membuat saya merasa dekat daripada simbol fisik apapun.', ll: 'P' } },
  // A vs P
  { id: 28, a: { teks: 'Ketika seseorang membantu meringankan beban saya, saya merasa sangat diperhatikan.', ll: 'A' }, b: { teks: 'Sentuhan fisik yang penuh kehangatan membuat saya merasa paling dekat dengan seseorang.', ll: 'P' } },
  { id: 29, a: { teks: 'Tindakan nyata untuk membantu saya lebih bermakna daripada pelukan atau sentuhan.', ll: 'A' }, b: { teks: 'Kontak fisik yang hangat dan tulus lebih menunjukkan kepedulian daripada tindakan apapun.', ll: 'P' } },
  { id: 30, a: { teks: 'Saya merasa dicintai ketika seseorang sukarela mengerjakan sesuatu yang penting bagi saya.', ll: 'A' }, b: { teks: 'Tepukan di punggung atau jabat tangan erat membuat saya merasa sungguh didukung.', ll: 'P' } },
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
    if (!nip.trim())  errs.nip  = 'NIP / NIK wajib diisi.'
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

    navigate('/hasil-love-language', { state: { skor, utama, kedua, nama, nip, jabatan } })
    setLoading(false)
  }

  /* ══════════════════════════════════════
     STEP: FORM
  ══════════════════════════════════════ */
  if (step === 'form') return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-rose-100 p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-400">*</span></label>
            <input
              type="text" value={nama}
              onChange={e => { setNama(e.target.value); setFormErrors(p => ({ ...p, nama: '' })) }}
              placeholder="Nama lengkap sesuai KTP"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 transition ${formErrors.nama ? 'border-red-400' : 'border-gray-200'}`}
            />
            {formErrors.nama && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nama}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">NIP / NIK <span className="text-red-400">*</span></label>
            <input
              type="text" value={nip}
              onChange={e => { setNip(e.target.value); setFormErrors(p => ({ ...p, nip: '' })) }}
              placeholder="NIP atau NIK"
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
