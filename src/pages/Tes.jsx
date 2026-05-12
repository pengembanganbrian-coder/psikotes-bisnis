import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const soal = [
  // EI - Halaman 1 (15 soal)
  { id: 1, kiri: "Lebih memilih berkomunikasi dengan menulis.", kanan: "Lebih memilih berkomunikasi dengan berbicara.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 2, kiri: "Menemukan dan mengembangkan ide dengan merenungkan.", kanan: "Menemukan dan mengembangkan ide dengan mendiskusikan.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 3, kiri: "Berorientasi pada dunia internal (memori, pemikiran, ide).", kanan: "Berorientasi pada dunia eksternal (kegiatan, orang, aktifitas).", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 4, kiri: "Fokus pada beberapa ketertarikan / hobi tertentu namun mendalam.", kanan: "Fokus pada banyak ketertarikan / hobi secara meluas dan general.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 5, kiri: "Tertutup dan mandiri.", kanan: "Sosial dan ekspresif.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 6, kiri: "Pertemuan dengan orang lain dan aktivitas sosial adalah melelahkan.", kanan: "Bertemu orang dan aktivitas sosial membuat bersemangat.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 7, kiri: "Beraktivitas sendirian di rumah adalah menyenangkan.", kanan: "Beraktivitas sendirian di rumah adalah membosankan.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 8, kiri: "Berinisiatif bila situasi memaksa atau berhubungan dengan kepentingan sendiri.", kanan: "Berinisiatif tinggi hampir dalam berbagai hal meski tidak berhubungan dengan dirinya.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 9, kiri: "Lebih memilih tempat yang tenang dan pribadi untuk berkonsentrasi.", kanan: "Lebih memilih tempat yang ramai dan banyak interaksi / aktivitas.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 10, kiri: "Berpikir secara matang sebelum bertindak.", kanan: "Memiliki keberanian bertindak tanpa harus terlalu lama berpikir.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 11, kiri: "Menyimpan semangat dalam hati.", kanan: "Mengekspresikan semangat.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 12, kiri: "Mencari kesempatan untuk berkomunikasi secara perorangan.", kanan: "Memilih berkomunikasi pada sekelompok orang.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 13, kiri: "Komunikasi tidak langsung lebih disukai (telepon, surat, email).", kanan: "Komunikasi yang dilakukan secara langsung lebih disukai (bertatap muka).", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 14, kiri: "Membangun ide dengan matang baru membicarakannya.", kanan: "Membangun idenya justru pada saat berbicara.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 15, kiri: "Berhati-hati, penuh pertimbangan, kaku.", kanan: "Spontan, easy going, fleksibel.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },

  // SN - Halaman 2 (15 soal)
  { id: 16, kiri: "Bergerak dari detail kepada gambaran besar sebagai kesimpulan akhir.", kanan: "Bergerak dari gambaran umum (big picture) baru kemudian menuju detail.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 17, kiri: "Berbicara mengenai masalah yang dihadapi hari ini dan langkah-langkah praktis mengatasinya.", kanan: "Berbicara mengenai visi masa depan dan konsep-konsep mengenai visi tersebut.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 18, kiri: "Menggunakan pengalaman sebagai pedoman.", kanan: "Menggunakan imajinasi dan perenungan sebagai pedoman.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 19, kiri: "SOP sangat membantu.", kanan: "SOP sangat membosankan.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 20, kiri: "Prosedural dan tradisional.", kanan: "Bebas dan dinamis.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 21, kiri: "Memilih fakta lebih penting daripada ide inspiratif.", kanan: "Memilih ide inspiratif lebih penting daripada fakta.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 22, kiri: "Kontinuitas dan stabilitas lebih diutamakan.", kanan: "Perubahan dan variasi lebih diutamakan.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 23, kiri: "Bertindak step by step dengan timeframe yang jelas.", kanan: "Bertindak dengan semangat tanpa menggunakan timeframe.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 24, kiri: "Dalam menarik kesimpulan lama dan hati-hati.", kanan: "Dalam menarik kesimpulan cepat sesuai naluri.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 25, kiri: "Mengklarifikasi ide dan teori sebelum dipraktekkan.", kanan: "Memahami ide dan teori saat mempraktekannya secara langsung.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 26, kiri: "Berfokus pada masa kini (apa yang bisa diperbaiki sekarang).", kanan: "Berfokus pada masa depan (apa yang mungkin bisa dicapai di masa mendatang).", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 27, kiri: "Secara konsisten mengamati dan mengingat detail.", kanan: "Mengamati dan mengingat detail hanya bila berhubungan dengan pola.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 28, kiri: "Praktis.", kanan: "Konseptual.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 29, kiri: "Menggunakan keterampilan yang sudah dikuasai.", kanan: "Menyukai tantangan untuk menguasai keterampilan baru.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 30, kiri: "Memilih cara yang sudah ada dan sudah terbukti.", kanan: "Memilih cara yang unik dan belum dipraktekkan orang lain.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },

  // TF - Halaman 3 (15 soal)
  { id: 31, kiri: "Obyektif.", kanan: "Subyektif.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 32, kiri: "Diyakinkan dengan penjelasan yang masuk akal.", kanan: "Diyakinkan dengan penjelasan yang menyentuh perasaan.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 33, kiri: "Berorientasi tugas-tugas dan job description.", kanan: "Berorientasi pada manusia dan hubungan.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 34, kiri: "Mengambil keputusan berdasarkan logika dan aturan main.", kanan: "Mengambil keputusan berdasarkan perasaan pribadi dan kondisi orang lain.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 35, kiri: "Mengemukakan tujuan dan sasaran lebih dahulu.", kanan: "Mengemukakan kesepakatan lebih dahulu.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 36, kiri: "Menghargai seseorang karena skill dan faktor teknis.", kanan: "Menghargai seseorang karena sifat dan perilakunya.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 37, kiri: "Melibatkan perasaan itu tidak profesional.", kanan: "Terlalu kaku pada peraturan dan pekerjaan itu kejam.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 38, kiri: "Yang penting tujuan tercapai.", kanan: "Yang penting situasi harmonis terjaga.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 39, kiri: "Mempertanyakan.", kanan: "Mengakomodasi.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 40, kiri: "Bersemangat saat mengkritik dan menemukan kesalahan.", kanan: "Bersemangat saat menolong orang keluar dari kesalahan dan meluruskan.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 41, kiri: "Standar harus ditegakkan di atas segalanya (itu menunjukkan kehormatan dan harga diri).", kanan: "Perasaan manusia lebih penting dari sekedar standar (yang adalah benda mati).", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 42, kiri: "Menuntut perlakuan yang adil dan sama pada semua orang.", kanan: "Menuntut perlakuan khusus sesuai karakteristik masing-masing orang.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 43, kiri: "Mementingkan sebab akibat.", kanan: "Mementingkan nilai-nilai personal.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 44, kiri: "Sering dianggap keras kepala.", kanan: "Sering dianggap terlalu memihak.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 45, kiri: "Menganalisa.", kanan: "Berempati.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },

  // JP - Halaman 4 (15 soal)
  { id: 46, kiri: "Terencana, dan memiliki deadline jelas.", kanan: "Spontan, fleksibel, tidak diikat waktu.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 47, kiri: "Tidak menyukai hal-hal yang bersifat mendadak dan diluar perencanaan.", kanan: "Perubahan mendadak tidak menjadi masalah.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 48, kiri: "Aturan, jadwal dan target akan sangat membantu dan memperjelas tindakan.", kanan: "Aturan, jadwal dan target sangat mengikat dan membebani.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 49, kiri: "Berorientasi pada hasil.", kanan: "Berorientasi pada proses.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 50, kiri: "Fokus pada target dan mengabaikan hal-hal baru.", kanan: "Memperhatikan hal-hal baru dan siap menyesuaikan diri dan merubah target.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 51, kiri: "Merasa tenang bila semuanya sudah diputuskan.", kanan: "Merasa nyaman bila situasi tetap terbuka terhadap pilihan-pilihan lain.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 52, kiri: "Ketidakpastian membuat bingung dan meresahkan.", kanan: "Ketidakpastian itu menegangkan, seru, dan membuat lebih fun.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 53, kiri: "Situasi last minute sangat menyiksa, membuat stress, dan merupakan kesalahan.", kanan: "Situasi last minute membuat bersemangat dan memunculkan potensi.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 54, kiri: "Perubahan adalah musuh.", kanan: "Perubahan adalah semangat hidup.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 55, kiri: "Bertindak sesuai dengan apa yang sudah direncanakan.", kanan: "Bertindak sesuai situasi dan kondisi yang terjadi saat itu.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 56, kiri: "Hidup harus sudah diatur dari awal.", kanan: "Hidup harusnya mengalir sesuai kondisi.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 57, kiri: "Daftar dan checklist adalah panduan penting.", kanan: "Daftar dan checklist adalah tugas dan beban.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 58, kiri: "Kepuasan adalah ketika mampu menjalankan semua sesuai yang sudah direncanakan.", kanan: "Kepuasan adalah ketika mampu beradaptasi dengan momentum yang terjadi.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 59, kiri: "Mengatur orang lain dengan tata tertib agar tujuan tercapai.", kanan: "Membiarkan orang lain bertindak bebas asalkan tujuan tercapai.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 60, kiri: "Berpegang teguh pada pendirian.", kanan: "Pendirian masih bisa berubah tergantung situasi nantinya.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
]

function hitungMBTI(jawaban) {
  let e=0, i=0, s=0, n=0, t=0, f=0, j=0, p=0
  soal.forEach((sq) => {
    const val = jawaban[sq.id]
    if (!val) return
    if (val === 'kiri') {
      if (sq.arahKiri === 'E') e++
      else if (sq.arahKiri === 'I') i++
      else if (sq.arahKiri === 'S') s++
      else if (sq.arahKiri === 'N') n++
      else if (sq.arahKiri === 'T') t++
      else if (sq.arahKiri === 'F') f++
      else if (sq.arahKiri === 'J') j++
      else if (sq.arahKiri === 'P') p++
    } else {
      if (sq.arahKanan === 'E') e++
      else if (sq.arahKanan === 'I') i++
      else if (sq.arahKanan === 'S') s++
      else if (sq.arahKanan === 'N') n++
      else if (sq.arahKanan === 'T') t++
      else if (sq.arahKanan === 'F') f++
      else if (sq.arahKanan === 'J') j++
      else if (sq.arahKanan === 'P') p++
    }
  })
  return {
    tipe: (e >= i ? 'E' : 'I') + (s >= n ? 'S' : 'N') + (t >= f ? 'T' : 'F') + (j >= p ? 'J' : 'P'),
    skor: { e, i, s, n, t, f, j, p }
  }
}

const dimensiLabel = { EI: 'E / I', SN: 'S / N', TF: 'T / F', JP: 'J / P' }
const dimensiUrutan = ['EI', 'SN', 'TF', 'JP']
const dimensiNama = { EI: 'Extraversion / Introversion', SN: 'Sensing / iNtuition', TF: 'Thinking / Feeling', JP: 'Judging / Perceiving' }

function Tes() {
  const [step, setStep] = useState('form')
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [jawaban, setJawaban] = useState({})
  const [loading, setLoading] = useState(false)
  const [dimensiAktif, setDimensiAktif] = useState(0)
  const navigate = useNavigate()

  const handleJawab = (id, val) => setJawaban(prev => ({ ...prev, [id]: val }))

  const soalDimensiAktif = soal.filter(s => s.dimensi === dimensiUrutan[dimensiAktif])
  const sudahDijawab = soalDimensiAktif.filter(s => jawaban[s.id]).length
  const totalDimensi = soalDimensiAktif.length

  const handleNext = () => {
    if (sudahDijawab < totalDimensi) {
      alert(`Harap jawab semua ${totalDimensi} pertanyaan di bagian ini!`)
      return
    }
    if (dimensiAktif < 3) setDimensiAktif(prev => prev + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true)
    const { data: pesertaData, error } = await supabase
      .from('peserta')
      .insert([{ nama, email, jabatan }])
      .select()

    if (error) { alert('Gagal menyimpan data!'); setLoading(false); return }

    const pesertaId = pesertaData[0].id
    const { tipe, skor } = hitungMBTI(jawaban)

    await supabase.from('hasil_tes').insert([{
      peserta_id: pesertaId,
      tipe_mbti: tipe,
      skor_e: skor.e, skor_i: skor.i,
      skor_s: skor.s, skor_n: skor.n,
      skor_t: skor.t, skor_f: skor.f,
      skor_j: skor.j, skor_p: skor.p,
    }])

    navigate('/hasil', { state: { tipe, nama } })
    setLoading(false)
  }

  if (step === 'form') return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-blue-700 mb-2 text-center">Psikotes DJBC</h1>
        <p className="text-gray-500 text-center mb-8">Isi data diri sebelum memulai tes</p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input value={nama} onChange={e => setNama(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Nama lengkap" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">NIP / NIK</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="NIP atau NIK" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Jabatan / Posisi yang Dilamar</label>
          <input value={jabatan} onChange={e => setJabatan(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Contoh: Staff Administrasi" />
        </div>
        <button
          onClick={() => { if (nama && email && jabatan) setStep('tes'); else alert('Isi semua data!') }}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Mulai Tes
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-blue-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h1 className="text-xl font-bold text-blue-700">Tes Kepribadian MBTI — Psikotes DJBC</h1>
          <p className="text-sm text-gray-500 mt-1">Halo <strong>{nama}</strong>, pilih salah satu pernyataan yang paling sesuai dengan dirimu.</p>

          {/* Progress dimensi */}
          <div className="flex gap-2 mt-4">
            {dimensiUrutan.map((d, idx) => (
              <div key={d} className={`flex-1 text-center text-xs py-1 rounded-full font-semibold ${idx === dimensiAktif ? 'bg-blue-600 text-white' : idx < dimensiAktif ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {dimensiLabel[d]}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">{dimensiNama[dimensiUrutan[dimensiAktif]]} — {sudahDijawab}/{totalDimensi} dijawab</p>
        </div>

        {/* Soal */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <p className="text-sm text-gray-500 mb-6 font-medium">Petunjuk: Pilih salah satu pernyataan yang lebih dominan sesuai dirimu.</p>
          {soalDimensiAktif.map((s, idx) => (
            <div key={s.id} className="mb-6">
              <p className="text-xs text-gray-400 mb-2 font-semibold">Pernyataan {idx + 1}</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleJawab(s.id, 'kiri')}
                  className={`p-4 rounded-xl border-2 text-sm text-left transition ${jawaban[s.id] === 'kiri' ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 hover:border-blue-300 text-gray-600'}`}
                >
                  {s.kiri}
                </button>
                <button
                  onClick={() => handleJawab(s.id, 'kanan')}
                  className={`p-4 rounded-xl border-2 text-sm text-left transition ${jawaban[s.id] === 'kanan' ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 hover:border-blue-300 text-gray-600'}`}
                >
                  {s.kanan}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol */}
        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : dimensiAktif < 3 ? `Lanjut ke Bagian ${dimensiAktif + 2} →` : 'Selesai & Lihat Hasil'}
        </button>
      </div>
    </div>
  )
}

export default Tes