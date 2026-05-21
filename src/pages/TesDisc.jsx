import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

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
    { teks: "Menghindari konflik", dimensi: "S" },
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
  const navigate = useNavigate()

  const handlePilih = (soalId, tipe, idx) => {
    setJawaban(prev => {
      const current = prev[soalId] || {}
      if (tipe === 'most' && current.least === idx) return prev
      if (tipe === 'least' && current.most === idx) return prev
      return { ...prev, [soalId]: { ...current, [tipe]: idx } }
    })
  }

  const sudahLengkap = soal.every(s => jawaban[s.id]?.most !== undefined && jawaban[s.id]?.least !== undefined)

  const handleSubmit = async () => {
    if (!sudahLengkap) { alert('Harap jawab semua pertanyaan!'); return }
    setLoading(true)

    const { data: pesertaData, error } = await supabase
      .from('peserta_disc')
      .insert([{ nama, nip, jabatan }])
      .select()

    if (error) { alert('Gagal menyimpan!'); setLoading(false); return }

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
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-700 mb-2 text-center">Psikotes DJBC</h1>
        <p className="text-gray-500 text-center mb-8">Tes Kepribadian DISC</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input value={nama} onChange={e => setNama(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Nama lengkap" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">NIP / NIK</label>
          <input value={nip} onChange={e => setNip(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="NIP atau NIK" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan / Posisi yang Dilamar</label>
          <input value={jabatan} onChange={e => setJabatan(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Contoh: Staff Administrasi" />
        </div>
        <button onClick={() => { if(nama && nip && jabatan) setStep('tes'); else alert('Isi semua data!') }} className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition">
          Mulai Tes
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h1 className="text-xl font-bold text-green-700">Tes DISC — Psikotes DJBC</h1>
          <p className="text-sm text-gray-500 mt-1">Halo <strong>{nama}</strong>, pilih satu yang paling <span className="text-green-600 font-semibold">MIRIP (M)</span> dan satu yang paling <span className="text-red-500 font-semibold">TIDAK MIRIP (L)</span> dari setiap kelompok.</p>
          <div className="mt-3 text-xs text-gray-400">{Object.keys(jawaban).length} / {soal.length} kelompok dijawab</div>
          <div className="h-2 bg-gray-100 rounded-full mt-2">
            <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(Object.keys(jawaban).length / soal.length) * 100}%` }} />
          </div>
        </div>

        {soal.map((s, idx) => {
          const j = jawaban[s.id] || {}
          return (
            <div key={s.id} className="bg-white rounded-2xl shadow p-6 mb-4">
              <p className="text-xs text-gray-400 font-semibold mb-3">Kelompok {idx + 1}</p>
              <div className="space-y-2">
                {s.pilihan.map((p, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border-2 transition ${j.most === i ? 'border-green-500 bg-green-50' : j.least === i ? 'border-red-400 bg-red-50' : 'border-gray-100 hover:border-gray-300'}`}>
                    <span className="text-sm flex-1 text-gray-700">{p.teks}</span>
                    <button
                      onClick={() => handlePilih(s.id, 'most', i)}
                      className={`text-xs px-3 py-1 rounded-full font-bold transition ${j.most === i ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-green-100'}`}
                    >M</button>
                    <button
                      onClick={() => handlePilih(s.id, 'least', i)}
                      className={`text-xs px-3 py-1 rounded-full font-bold transition ${j.least === i ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-500 hover:bg-red-100'}`}
                    >L</button>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <button onClick={handleSubmit} disabled={loading || !sudahLengkap} className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition disabled:opacity-50 mt-2">
          {loading ? 'Menyimpan...' : 'Selesai & Lihat Hasil'}
        </button>
      </div>
    </div>
  )
}

export default TesDisc