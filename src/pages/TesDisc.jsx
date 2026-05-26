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
const soal = [
  { id: 1, pilihan: [
    { teks: "Mudah bergaul, menyenangkan", dimensi: "I" },
    { teks: "Mudah percaya kepada orang lain", dimensi: "S" },
    { teks: "Suka berpetualangan, pengambil resiko", dimensi: "D" },
    { teks: "Penuh toleransi, menghormati orang lain", dimensi: "S" },
  ]},
  { id: 2, pilihan: [
    { teks: "Berbicara lembut, pendiam/penyendiri", dimensi: "C" },
    { teks: "Optimis, berpikir positif, memiliki visi/tujuan", dimensi: "I" },
    { teks: "Pusat perhatian, mudah bersosialisasi", dimensi: "I" },
    { teks: "Pendamai, pembawa keharmonisan", dimensi: "S" },
  ]},
  { id: 3, pilihan: [
    { teks: "Memberikan dorongan kepada orang lain", dimensi: "I" },
    { teks: "Berusaha untuk selalu sempurna", dimensi: "C" },
    { teks: "Menjadi bagian dari sebuah kelompok", dimensi: "S" },
    { teks: "Ingin menetapkan tujuan", dimensi: "D" },
  ]},
  { id: 4, pilihan: [
    { teks: "Mudah menjadi frustasi", dimensi: "C" },
    { teks: "Memendam perasaan, tertutup", dimensi: "S" },
    { teks: "Menyampaikan pendapatnya, terbuka", dimensi: "I" },
    { teks: "Berani menghadapi pihak oposisi", dimensi: "D" },
  ]},
  { id: 5, pilihan: [
    { teks: "Penuh semangat, banyak bicara", dimensi: "I" },
    { teks: "Bertindak cepat, tegas", dimensi: "D" },
    { teks: "Mencoba untuk menjaga kedamaian", dimensi: "S" },
    { teks: "Mencoba untuk mengikuti aturan", dimensi: "C" },
  ]},
  { id: 6, pilihan: [
    { teks: "Mengatur waktu dengan baik", dimensi: "C" },
    { teks: "Seringkali terburu-buru, merasa tertekan", dimensi: "D" },
    { teks: "Berhubungan dengan orang lain adalah penting", dimensi: "S" },
    { teks: "Senang menyelesaikan hal yang telah dimulai", dimensi: "C" },
  ]},
  { id: 7, pilihan: [
    { teks: "Menolak perubahan yang mendadak", dimensi: "S" },
    { teks: "Cenderung terlalu banyak berjanji", dimensi: "I" },
    { teks: "Menarik diri ketika dibawah tekanan", dimensi: "C" },
    { teks: "Tidak takut untuk konfrontasi langsung", dimensi: "D" },
  ]},
  { id: 8, pilihan: [
    { teks: "Pendorong, pemberi semangat yang baik", dimensi: "I" },
    { teks: "Pendengar yang baik", dimensi: "S" },
    { teks: "Penganalisis yang baik", dimensi: "C" },
    { teks: "Pendelegasi yang baik", dimensi: "D" },
  ]},
  { id: 9, pilihan: [
    { teks: "Hasil adalah segalanya", dimensi: "D" },
    { teks: "Lakukan dengan benar, ketepatan adalah penting", dimensi: "C" },
    { teks: "Buatlah sesuatu menjadi menyenangkan", dimensi: "I" },
    { teks: "Mari lakukan bersama-sama", dimensi: "S" },
  ]},
  { id: 10, pilihan: [
    { teks: "Tidak tergantung orang lain", dimensi: "D" },
    { teks: "Akan membeli mengikuti dorongan hati", dimensi: "I" },
    { teks: "Akan menunggu dengan sabar", dimensi: "S" },
    { teks: "Akan mengeluarkan uang untuk hal yang diinginkan", dimensi: "C" },
  ]},
  { id: 11, pilihan: [
    { teks: "Ramah, mudah berteman", dimensi: "I" },
    { teks: "Unik, mudah bosan terhadap rutinitas", dimensi: "D" },
    { teks: "Aktif mengubah sesuatu", dimensi: "D" },
    { teks: "Ingin segala sesuatu tepat", dimensi: "C" },
  ]},
  { id: 12, pilihan: [
    { teks: "Tidak melawan, mengalah", dimensi: "S" },
    { teks: "Menyukai hal rinci/detail", dimensi: "C" },
    { teks: "Berubah di saat-saat terakhir", dimensi: "I" },
    { teks: "Penuntut, kasar", dimensi: "D" },
  ]},
  { id: 13, pilihan: [
    { teks: "Ingin maju", dimensi: "D" },
    { teks: "Puas dengan apa yang ada, puas hati", dimensi: "S" },
    { teks: "Terbuka mengungkapkan perasaan", dimensi: "I" },
    { teks: "Rendah hati, sederhana", dimensi: "C" },
  ]},
  { id: 14, pilihan: [
    { teks: "Tenang, suka menyendiri/pendiam", dimensi: "C" },
    { teks: "Gembira, periang", dimensi: "I" },
    { teks: "Menyenangkan, ramah", dimensi: "S" },
    { teks: "Tegas, berani", dimensi: "D" },
  ]},
  { id: 15, pilihan: [
    { teks: "Menghabiskan waktu dengan orang lain", dimensi: "I" },
    { teks: "Merencanakan masa depan, penuh persiapan", dimensi: "C" },
    { teks: "Mencari tantangan baru", dimensi: "D" },
    { teks: "Menerima penghargaan untuk tujuan yang tercapai", dimensi: "S" },
  ]},
  { id: 16, pilihan: [
    { teks: "Peraturan perlu diuji", dimensi: "D" },
    { teks: "Peraturan membuat adil", dimensi: "C" },
    { teks: "Peraturan membuat bosan", dimensi: "I" },
    { teks: "Peraturan membuat aman", dimensi: "S" },
  ]},
  { id: 17, pilihan: [
    { teks: "Pendidikan, budaya", dimensi: "C" },
    { teks: "Prestasi, penghargaan", dimensi: "D" },
    { teks: "Keselamatan, keamanan", dimensi: "S" },
    { teks: "Bergaul, berkumpul dengan kelompok", dimensi: "I" },
  ]},
  { id: 18, pilihan: [
    { teks: "Memimpin, bicara langsung", dimensi: "D" },
    { teks: "Terbuka, antusias, bersemangat", dimensi: "I" },
    { teks: "Mudah diduga, konsisten", dimensi: "S" },
    { teks: "Berhati-hati", dimensi: "C" },
  ]},
  { id: 19, pilihan: [
    { teks: "Tidak mudah dikalahkan/ditundukkan", dimensi: "D" },
    { teks: "Mengikuti keinginan/perintah pemimpin", dimensi: "S" },
    { teks: "Bersemangat, periang", dimensi: "I" },
    { teks: "Ingin teratur, rapi", dimensi: "C" },
  ]},
  { id: 20, pilihan: [
    { teks: "Saya akan memimpin orang lain", dimensi: "D" },
    { teks: "Saya akan melaksanakannya", dimensi: "S" },
    { teks: "Saya akan meyakinkan orang lain", dimensi: "I" },
    { teks: "Saya akan mendapatkan fakta", dimensi: "C" },
  ]},
  { id: 21, pilihan: [
    { teks: "Mendahulukan kepentingan orang lain", dimensi: "S" },
    { teks: "Suka bersaing, suka tantangan", dimensi: "D" },
    { teks: "Optimis, berpikir positif", dimensi: "I" },
    { teks: "Berpikir logis, sistematis", dimensi: "C" },
  ]},
  { id: 22, pilihan: [
    { teks: "Menyenangkan orang, mudah setuju", dimensi: "S" },
    { teks: "Tertawa dengan keras, hidup", dimensi: "I" },
    { teks: "Berani, tegas", dimensi: "D" },
    { teks: "Pendiam/suka menyendiri", dimensi: "C" },
  ]},
  { id: 23, pilihan: [
    { teks: "Menginginkan otoritas yang lebih", dimensi: "D" },
    { teks: "Menginginkan kesempatan baru", dimensi: "I" },
    { teks: "Menghindari konflik", dimensi: "S" },
    { teks: "Menginginkan arahan yang jelas", dimensi: "C" },
  ]},
  { id: 24, pilihan: [
    { teks: "Dapat dipercaya/diandalkan", dimensi: "S" },
    { teks: "Kreatif, unik", dimensi: "I" },
    { teks: "Berorientasi pada hasil", dimensi: "D" },
    { teks: "Memegang standar yang tinggi, teliti", dimensi: "C" },
  ]},
]

function hitungDISC(jawaban) {
  let mostD=0, mostI=0, mostS=0, mostC=0
  let leastD=0, leastI=0, leastS=0, leastC=0

  soal.forEach(sq => {
    const j = jawaban[sq.id]
    if (!j) return
    const pilihanM = sq.pilihan[j.most]
    const pilihanL = sq.pilihan[j.least]
    if (pilihanM) {
      if (pilihanM.dimensi === 'D') mostD++
      if (pilihanM.dimensi === 'I') mostI++
      if (pilihanM.dimensi === 'S') mostS++
      if (pilihanM.dimensi === 'C') mostC++
    }
    if (pilihanL) {
      if (pilihanL.dimensi === 'D') leastD++
      if (pilihanL.dimensi === 'I') leastI++
      if (pilihanL.dimensi === 'S') leastS++
      if (pilihanL.dimensi === 'C') leastC++
    }
  })

  const changeD = mostD - leastD
  const changeI = mostI - leastI
  const changeS = mostS - leastS
  const changeC = mostC - leastC

  const scores = { D: changeD, I: changeI, S: changeS, C: changeC }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const profil = sorted[0][0] + (sorted[1][1] > 0 ? sorted[1][0] : '')

  return { profil, mostD, mostI, mostS, mostC, leastD, leastI, leastS, leastC, changeD, changeI, changeS, changeC }
}

function TesDisc() {
  const [step, setStep] = useState('form')
  const [nama, setNama] = useState('')
  const [nip, setNip] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [jawaban, setJawaban] = useState({})
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

  const validateForm = () => {
    const errs = {}
    if (!nama.trim()) errs.nama = 'Nama lengkap wajib diisi.'
    if (!nip.trim())  errs.nip  = 'NIP wajib diisi.'
    if (!jabatan)     errs.jabatan = 'Unit kerja wajib dipilih.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePilih = (soalId, tipe, idx) => {
    setJawaban(prev => {
      const current = prev[soalId] || {}
      if (tipe === 'most' && current.least === idx) return prev
      if (tipe === 'least' && current.most === idx) return prev
      return { ...prev, [soalId]: { ...current, [tipe]: idx } }
    })
  }

  const sudahLengkap = soal.every(s => jawaban[s.id]?.most !== undefined && jawaban[s.id]?.least !== undefined)
  const jumlahDijawab = Object.keys(jawaban).filter(id => jawaban[id]?.most !== undefined && jawaban[id]?.least !== undefined).length

  const handleSubmit = async () => {
    if (!sudahLengkap) {
      const belum = soal.find(s => jawaban[s.id]?.most === undefined || jawaban[s.id]?.least === undefined)
      if (belum) {
        const el = document.getElementById(`soal-disc-${belum.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    setLoading(true)
    setSubmitError('')

    const { data: pesertaData, error } = await supabase
      .from('peserta_disc')
      .insert([{ nama, nip, jabatan }])
      .select()

    if (error) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }

    const pesertaId = pesertaData[0].id
    const hasil = hitungDISC(jawaban)

    await supabase.from('hasil_disc').insert([{
      peserta_id: pesertaId,
      profil: hasil.profil,
      skor_d_most: hasil.mostD, skor_i_most: hasil.mostI,
      skor_s_most: hasil.mostS, skor_c_most: hasil.mostC,
      skor_d_least: hasil.leastD, skor_i_least: hasil.leastI,
      skor_s_least: hasil.leastS, skor_c_least: hasil.leastC,
      skor_d_change: hasil.changeD, skor_i_change: hasil.changeI,
      skor_s_change: hasil.changeS, skor_c_change: hasil.changeC,
    }])

    navigate('/hasil-disc', { state: { hasil, nama } })
    setLoading(false)
  }

  if (step === 'form') return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header Card */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-7 text-center">
            <div className="flex items-center gap-2 justify-center mb-1">
              <Logo size="sm" dark />
            </div>
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 border border-white/30 rounded-2xl backdrop-blur mb-3">
              <span className="text-white text-xl font-black">DISC</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wide">AssesIN</h1>
            <p className="text-green-100 text-sm mt-1">Tes Kepribadian DISC</p>
          </div>

          {/* Body Card */}
          <div className="px-8 py-7 space-y-5">
            <div>
              <label className="block text-base font-bold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-400">*</span></label>
              <input
                value={nama}
                onChange={e => { setNama(e.target.value); setFormErrors(p => ({ ...p, nama: '' })) }}
                className={`w-full border bg-gray-50 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-400 ${formErrors.nama ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Nama lengkap sesuai KTP"
              />
              {formErrors.nama && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nama}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">NIP <span className="text-red-400">*</span></label>
              <input
                value={nip}
                onChange={e => { setNip(e.target.value); setFormErrors(p => ({ ...p, nip: '' })) }}
                className={`w-full border bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-400 ${formErrors.nip ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="NIP"
              />
              {formErrors.nip && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nip}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Unit Kerja <span className="text-red-400">*</span></label>
              <div className="relative">
                <select
                  value={jabatan}
                  onChange={e => { setJabatan(e.target.value); setFormErrors(p => ({ ...p, jabatan: '' })) }}
                  className={`w-full appearance-none border bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition-all text-gray-700 pr-10 ${formErrors.jabatan ? 'border-red-400' : 'border-gray-200'}`}
                >
                  <option value="" disabled>-- Pilih Unit Kerja --</option>
                  {unitKerjaOptions.map(group => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {formErrors.jabatan && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.jabatan}</p>}
            </div>

            <button
              onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-green-200 mt-2"
            >
              Mulai Tes →
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-green-600/40 mt-5">
          © 2026 · AssesIN
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header Tes */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-sm">DISC</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Tes DISC — AssesIN</h1>
              <p className="text-sm text-gray-500">
                Halo <strong className="text-green-700">{nama}</strong> · {jabatan}
              </p>
            </div>
          </div>

          {/* Instruksi */}
          <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 mb-4 text-sm text-green-800">
            Dari setiap kelompok, pilih satu yang paling{' '}
            <span className="font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">M — Mirip</span>{' '}
            dan satu yang paling{' '}
            <span className="font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">L — Tidak Mirip</span>{' '}
            dengan diri Anda.
          </div>

          {/* Progress */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(jumlahDijawab / soal.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              {jumlahDijawab} / {soal.length}
            </span>
          </div>

          {/* Pills per kelompok */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {soal.map((s, idx) => {
              const j = jawaban[s.id]
              const selesai = j?.most !== undefined && j?.least !== undefined
              return (
                <span
                  key={s.id}
                  className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                    selesai
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {selesai ? '✓' : idx + 1}
                </span>
              )
            })}
          </div>
        </div>

        {/* Error banner */}
        {submitError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            ⚠ {submitError}
          </div>
        )}

        {/* Soal */}
        {soal.map((s, idx) => {
          const j = jawaban[s.id] || {}
          const selesai = j.most !== undefined && j.least !== undefined
          return (
            <div
              id={`soal-disc-${s.id}`}
              key={s.id}
              className={`bg-white rounded-2xl shadow p-6 mb-4 transition-all ${selesai ? 'ring-1 ring-green-200' : ''}`}
            >
              {/* Nomor kelompok */}
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                  selesai ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {selesai ? '✓' : idx + 1}
                </span>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Kelompok {idx + 1}</p>
                {selesai && <span className="ml-auto text-xs text-green-500 font-semibold">✓ Selesai</span>}
              </div>

              <div className="space-y-2">
                {s.pilihan.map((p, i) => {
                  const isMost = j.most === i
                  const isLeast = j.least === i
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        isMost
                          ? 'border-green-400 bg-green-50'
                          : isLeast
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-sm flex-1 text-gray-700 leading-snug">{p.teks}</span>

                      <div className="flex gap-1.5 flex-shrink-0">
                        {/* Tombol M */}
                        <button
                          onClick={() => handlePilih(s.id, 'most', i)}
                          title="Paling Mirip"
                          className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                            isMost
                              ? 'bg-green-500 text-white shadow-sm shadow-green-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                          }`}
                        >M</button>

                        {/* Tombol L */}
                        <button
                          onClick={() => handlePilih(s.id, 'least', i)}
                          title="Paling Tidak Mirip"
                          className={`w-9 h-9 rounded-xl text-xs font-black transition-all ${
                            isLeast
                              ? 'bg-red-400 text-white shadow-sm shadow-red-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'
                          }`}
                        >L</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Tombol Submit */}
        <div className="sticky bottom-4">
          {!sudahLengkap && (
            <p className="text-center text-sm text-amber-600 font-medium mb-2">
              ⚠ Masih {soal.length - jumlahDijawab} kelompok belum dijawab
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full font-semibold py-4 rounded-2xl transition-all text-base shadow-xl ${
              sudahLengkap
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-green-300 cursor-pointer'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            {loading
              ? '⏳ Menyimpan hasil...'
              : sudahLengkap
              ? '✓ Selesai & Lihat Hasil →'
              : `Jawab ${soal.length - jumlahDijawab} kelompok lagi`}
          </button>
        </div>

      </div>
    </div>
  )
}

export default TesDisc

