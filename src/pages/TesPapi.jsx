import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const unitKerjaOptions = [
  { group: 'Sekretariat DJBC', options: ['Bagian Organisasi dan Tata Laksana','Bagian Keuangan','Bagian Umum','Bagian Administrasi Kepegawaian','Bagian Pengembangan Kepegawaian','Bagian Pengelolaan Barang Milik Negara'] },
  { group: 'Kantor Pusat — Direktorat', options: ['Direktorat Teknis Kepabeanan','Direktorat Fasilitas Kepabeanan','Direktorat Teknis dan Fasilitas Cukai','Direktorat Keberatan Banding dan Peraturan','Direktorat Penindakan dan Penyidikan','Direktorat Audit Kepabeanan dan Cukai','Direktorat Kepatuhan Internal','Direktorat Informasi Kepabeanan dan Cukai','Direktorat Penerimaan dan Perencanaan Strategis','Direktorat Kerja Sama Internasional Kepabeanan dan Cukai','Direktorat Interdiksi Narkotika','Direktorat Komunikasi dan Bimbingan Pengguna Jasa','Tenaga Pengkaji Bidang Pengawasan dan Penegakan Hukum','Tenaga Pengkaji Bidang Pengembangan Kapasitas dan Kinerja Organisasi'] },
  { group: 'Kantor Wilayah', options: ['Kantor Wilayah DJBC Aceh','Kantor Wilayah DJBC Sumatera Utara','Kantor Wilayah DJBC Riau','Kantor Wilayah DJBC Khusus Kepulauan Riau','Kantor Wilayah DJBC Sumatera Bagian Timur','Kantor Wilayah DJBC Sumatera Bagian Barat','Kantor Wilayah DJBC Banten','Kantor Wilayah DJBC Jakarta','Kantor Wilayah DJBC Jawa Barat','Kantor Wilayah DJBC Jawa Tengah dan DI Yogyakarta','Kantor Wilayah DJBC Jawa Timur I','Kantor Wilayah DJBC Jawa Timur II','Kantor Wilayah DJBC Bali, NTB dan NTT','Kantor Wilayah DJBC Kalimantan Bagian Barat','Kantor Wilayah DJBC Kalimantan Bagian Timur','Kantor Wilayah DJBC Kalimantan Bagian Selatan','Kantor Wilayah DJBC Sulawesi Bagian Selatan','Kantor Wilayah DJBC Sulawesi Bagian Utara','Kantor Wilayah DJBC Maluku','Kantor Wilayah DJBC Khusus Papua'] },
  { group: 'Kantor Pelayanan Utama (KPU)', options: ['KPU Bea dan Cukai Tipe A Tanjung Priok','KPU Bea dan Cukai Tipe C Soekarno-Hatta','KPU Bea dan Cukai Tipe B Batam'] },
  { group: 'KPPBC', options: ['KPPBC Tipe Madya Pabean Belawan','KPPBC Tipe Madya Pabean A Tangerang','KPPBC Tipe Madya Pabean A Jakarta','KPPBC Tipe Madya Pabean A Bekasi','KPPBC Tipe Madya Pabean Cikarang','KPPBC Tipe Madya Pabean A Bogor','KPPBC Tipe Madya Pabean A Purwakarta','KPPBC Tipe Madya Pabean A Bandung','KPPBC Tipe Madya Pabean Tanjung Emas','KPPBC Tipe Madya Cukai Kudus','KPPBC Tipe Madya Pabean A Semarang','KPPBC Tipe Madya Pabean Tanjung Perak','KPPBC Tipe Madya Pabean Juanda','KPPBC Tipe Madya Pabean B Makassar','KPPBC Tipe Madya Pabean B Balikpapan','KPPBC Tipe Madya Pabean B Banjarmasin','KPPBC Lainnya'] },
  { group: 'Lainnya', options: ['Pangkalan Sarana Operasi Bea dan Cukai','Balai Laboratorium Bea dan Cukai','Satuan Tugas Khusus'] },
]

// 90 soal asli PAPI Kostick 2020
// a = ATAS (pilihan kiri/atas), b = BAWAH (pilihan kanan/bawah)
const soal = [
  {id:1,  a:"Saya seorang pekerja keras.", b:"Saya bukan seorang pemurung."},
  {id:2,  a:"Saya suka bekerja lebih baik dari yang lain.", b:"Saya suka menekuni pekerjaan yang saya lakukan sampai selesai."},
  {id:3,  a:"Saya suka memberi petunjuk kepada orang bagaimana melakukan sesuatu.", b:"Saya ingin melakukan sesuatu sebaik mungkin."},
  {id:4,  a:"Saya suka melakukan hal-hal yang lucu.", b:"Saya senang memberitahukan orang apa yang harus dikerjakannya."},
  {id:5,  a:"Saya suka bergabung dalam kelompok.", b:"Saya senang diperhatikan oleh kelompok."},
  {id:6,  a:"Saya suka membina satu hubungan persahabatan antar pribadi.", b:"Saya suka berteman dengan suatu kelompok."},
  {id:7,  a:"Saya cepat berubah jika saya merasa hal itu diperlukan.", b:"Saya berusaha membina hubungan yang akrab dengan teman saya."},
  {id:8,  a:"Saya suka membalas jika saya disakiti.", b:"Saya suka melakukan hal-hal yang baru dan berbeda."},
  {id:9,  a:"Saya ingin atasan menyukai saya.", b:"Saya suka memberitahu orang jika mereka salah."},
  {id:10, a:"Saya suka mengikuti petunjuk-petunjuk yang diberikan kepada saya.", b:"Saya suka mendukung pendapat atasan saya."},
  {id:11, a:"Saya berusaha sangat keras.", b:"Saya seorang yang teratur, saya menaruh semua barang pada tempatnya."},
  {id:12, a:"Saya dapat membuat orang mau bekerja keras.", b:"Saya tidak mudah marah."},
  {id:13, a:"Saya suka memberitahu kelompok apa yang harus dikerjakan.", b:"Saya selalu menekuni suatu pekerjaan sampai selesai."},
  {id:14, a:"Saya ingin tampil menarik dan menakjubkan.", b:"Saya ingin menjadi orang yang sangat berhasil."},
  {id:15, a:"Saya ingin sesuai dan diterima dalam kelompok.", b:"Saya suka membantu orang dalam mengambil sikap."},
  {id:16, a:"Saya cemas bila seseorang tidak menyukai saya.", b:"Saya suka orang memperhatikan saya."},
  {id:17, a:"Saya suka mencoba hal-hal baru.", b:"Saya lebih suka bekerja bersama orang lain daripada sendiri."},
  {id:18, a:"Saya kadang-kadang menyalahkan orang lain jika terjadi kesalahan.", b:"Saya merasa terganggu jika ada yang tidak menyukai saya."},
  {id:19, a:"Saya suka mendukung pendapat atasan saya.", b:"Saya suka mencoba pekerjaan-pekerjaan yang baru dan berbeda."},
  {id:20, a:"Saya menyukai petunjuk terperinci dalam menyelesaikan pekerjaan.", b:"Saya suka memberitahu bila orang membuat saya kesal."},
  {id:21, a:"Saya selalu berusaha keras.", b:"Saya suka melaksanakan setiap langkah dengan hati-hati."},
  {id:22, a:"Saya seorang pemimpin yang baik.", b:"Saya dapat mengorganisir suatu pekerjaan dengan baik."},
  {id:23, a:"Saya mudah tersinggung.", b:"Saya lambat dalam membuat keputusan."},
  {id:24, a:"Dalam satu kelompok saya lebih suka diam.", b:"Saya suka mengerjakan beberapa pekerjaan sekaligus."},
  {id:25, a:"Saya sangat suka bila saya diundang.", b:"Saya ingin lebih baik dari yang lain dalam mengerjakan sesuatu."},
  {id:26, a:"Saya suka membina hubungan yang akrab dengan teman-teman saya.", b:"Saya suka menasehati orang lain."},
  {id:27, a:"Saya suka melakukan hal-hal yang baru dan berbeda.", b:"Saya suka menceritakan bagaimana saya berhasil melakukan sesuatu."},
  {id:28, a:"Bila saya betul, saya suka mempertahankannya.", b:"Saya ingin diterima dan diakui dalam suatu kelompok."},
  {id:29, a:"Saya berusaha untuk tidak menjadi seorang yang berbeda.", b:"Saya berusaha untuk dekat sekali dengan orang."},
  {id:30, a:"Saya senang diberitahu bagaimana melakukan suatu pekerjaan.", b:"Saya mudah bosan."},
  {id:31, a:"Saya bekerja keras.", b:"Saya banyak berpikir dan merencana."},
  {id:32, a:"Saya memimpin kelompok.", b:"Detail (hal-hal kecil) menarik bagi saya."},
  {id:33, a:"Saya mengambil keputusan secara mudah dan cepat.", b:"Saya menyimpan barang-barang saya secara rapih dan teratur."},
  {id:34, a:"Biasanya saya bekerja dengan tergesa-gesa.", b:"Saya jarang marah atau sedih."},
  {id:35, a:"Saya ingin menjadi bagian dari kelompok.", b:"Saya hanya ingin melakukan satu pekerjaan pada satu saat."},
  {id:36, a:"Saya berusaha membina persahabatan yang akrab.", b:"Saya berusaha keras menjadi yang terbaik."},
  {id:37, a:"Saya suka mode terbaru untuk pakaian atau mobil.", b:"Saya suka bertanggung jawab untuk kepentingan orang lain."},
  {id:38, a:"Saya menyukai perdebatan.", b:"Saya suka mendapatkan perhatian."},
  {id:39, a:"Saya suka mendukung orang-orang yang menjadi atasan saya.", b:"Saya tertarik menjadi bagian dari kelompok."},
  {id:40, a:"Saya suka mengikuti peraturan dengan hati-hati.", b:"Saya suka orang mengenal saya dengan baik."},
  {id:41, a:"Saya selalu berusaha keras.", b:"Saya seorang yang bersahabat."},
  {id:42, a:"Orang menilai saya seorang pemimpin yang baik.", b:"Saya berpikir panjang dan berhati-hati."},
  {id:43, a:"Saya sering mengambil resiko / coba-coba.", b:"Saya senang mengurus hal-hal kecil / detail."},
  {id:44, a:"Orang berpendapat bahwa saya bekerja cepat.", b:"Saya berpendapat bahwa saya rapih dan teratur."},
  {id:45, a:"Saya senang mengikuti pertandingan dan berolah raga.", b:"Saya mempunyai pribadi yang menyenangkan."},
  {id:46, a:"Saya senang jika orang dekat dan bersahabat dengan saya.", b:"Saya selalu berusaha menyelesaikan sesuatu yang telah saya mulai."},
  {id:47, a:"Saya senang bereksperimen dan mencoba hal-hal baru.", b:"Saya suka melaksanakan suatu pekerjaan sulit dengan baik."},
  {id:48, a:"Saya suka diperlakukan secara adil.", b:"Saya suka memberitahu orang lain bagaimana melaksanakan sesuatu."},
  {id:49, a:"Saya suka melakukan apa yang diharapkan dari saya.", b:"Saya suka memperoleh perhatian."},
  {id:50, a:"Saya suka petunjuk terperinci dalam melaksanakan suatu pekerjaan.", b:"Saya suka berada diantara orang-orang banyak."},
  {id:51, a:"Saya selalu berusaha menyelesaikan pekerjaan secara sempurna.", b:"Orang mengatakan bahwa saya tidak mengenal lelah."},
  {id:52, a:"Saya tipe pemimpin.", b:"Saya mudah berteman."},
  {id:53, a:"Saya selalu berspekulasi.", b:"Saya banyak sekali berpikir."},
  {id:54, a:"Saya bekerja dengan kecepatan yang teratur dan tetap.", b:"Saya senang bekerja dengan hal-hal kecil / terperinci."},
  {id:55, a:"Saya bersemangat untuk mengikuti berbagai pertandingan dan berolah raga.", b:"Saya suka mengatur dan menyimpan barang-barang secara rapih dan teratur."},
  {id:56, a:"Saya dapat bergaul secara baik dengan semua orang.", b:"Saya adalah seorang yang mempunyai pembawaan tenang."},
  {id:57, a:"Saya ingin bertemu dengan orang-orang baru dan melakukan hal baru.", b:"Saya selalu ingin menyelesaikan pekerjaan yang telah saya mulai."},
  {id:58, a:"Saya biasanya mempertahankan pendapat yang saya yakini.", b:"Saya biasanya suka bekerja keras."},
  {id:59, a:"Saya suka saran-saran dari orang-orang yang saya kagumi.", b:"Saya senang diserahi tanggung jawab atas sekelompok orang."},
  {id:60, a:"Saya biarkan diri saya banyak dipengaruhi oleh orang lain.", b:"Saya suka jika mendapat banyak perhatian."},
  {id:61, a:"Saya berusaha bekerja keras.", b:"Saya mengerjakan sesuatu dengan cepat."},
  {id:62, a:"Apabila saya bicara, kelompok mendengarkan.", b:"Saya trampil menggunakan perkakas (alat-alat)."},
  {id:63, a:"Saya lambat dalam membina hubungan.", b:"Saya lambat dalam membuat keputusan."},
  {id:64, a:"Saya biasanya makan secara cepat.", b:"Saya suka membaca."},
  {id:65, a:"Saya suka pekerjaan dimana saya banyak bergerak.", b:"Saya suka pekerjaan yang harus dilakukan dengan hati-hati."},
  {id:66, a:"Saya mencari teman sebanyak mungkin.", b:"Apa yang telah saya simpan, akan mudah saya temukan lagi."},
  {id:67, a:"Saya merencanakan jauh-jauh sebelumnya.", b:"Saya selalu menyenangkan."},
  {id:68, a:"Saya mempertahankan dengan bangga nama baik saya.", b:"Saya terus menekuni suatu masalah sampai selesai."},
  {id:69, a:"Saya suka mendukung orang-orang yang saya kagumi.", b:"Saya ingin sukses."},
  {id:70, a:"Saya suka orang lain yang memutuskan untuk kelompok.", b:"Saya suka membuat keputusan untuk kelompok."},
  {id:71, a:"Saya selalu berusaha bekerja keras.", b:"Saya mengambil keputusan secara cepat dan mudah."},
  {id:72, a:"Kelompok biasanya melakukan apa yang saya inginkan.", b:"Saya biasa terburu-buru."},
  {id:73, a:"Saya sering merasa lelah.", b:"Saya lamban dalam menentukan sikap."},
  {id:74, a:"Saya bekerja cepat.", b:"Saya mudah berteman."},
  {id:75, a:"Saya biasanya mempunyai semangat dan tenaga.", b:"Saya banyak menghabiskan waktu dengan berpikir."},
  {id:76, a:"Saya sangat ramah terhadap orang.", b:"Saya suka pekerjaan yang memerlukan ketelitian."},
  {id:77, a:"Saya banyak berpikir dan merencana.", b:"Saya menyimpan segala sesuatu pada tempatnya."},
  {id:78, a:"Saya suka pekerjaan yang harus memperhatikan hal-hal kecil (detail).", b:"Saya tidak mudah marah."},
  {id:79, a:"Saya suka mengikuti orang yang saya kagumi.", b:"Saya selalu menyelesaikan pekerjaan yang telah saya mulai."},
  {id:80, a:"Saya suka petunjuk-petunjuk yang jelas.", b:"Saya suka bekerja keras."},
  {id:81, a:"Saya mengejar apa yang saya inginkan.", b:"Saya seorang pemimpin yang baik."},
  {id:82, a:"Saya dapat membuat orang lain bekerja sesuai dengan yang saya inginkan.", b:"Saya seorang yang tergolong santai tapi beruntung."},
  {id:83, a:"Saya mengambil keputusan secara mudah dan amat cepat.", b:"Saya bicara dengan cepat."},
  {id:84, a:"Saya biasanya bekerja cepat.", b:"Saya seorang pemimpin yang baik."},
  {id:85, a:"Saya tidak suka bertemu orang.", b:"Saya cepat merasa lelah."},
  {id:86, a:"Saya mempunyai banyak sekali teman.", b:"Saya banyak menghabiskan waktu dengan berpikir."},
  {id:87, a:"Saya suka bekerja dengan teori.", b:"Saya suka bekerja dengan hal-hal yang terperinci."},
  {id:88, a:"Saya menikmati pekerjaan yang melibatkan hal-hal kecil (detail).", b:"Saya suka mengorganisir pekerjaan saya."},
  {id:89, a:"Saya menaruh barang pada tempatnya.", b:"Saya selalu menyenangkan."},
  {id:90, a:"Saya suka diberitahu tentang apa yang saya perlu lakukan.", b:"Saya harus menyelesaikan apa yang saya mulai."},
]

// Kunci skoring: atas = skala jika pilih a, bawah = skala jika pilih b
// ROLES: G L I T V S R D C E | NEEDS: N A P X B O Z K F W
const kunci = [
  {a:'G',b:'E'},{a:'A',b:'N'},{a:'P',b:'A'},{a:'X',b:'P'},{a:'B',b:'X'},
  {a:'O',b:'B'},{a:'Z',b:'O'},{a:'K',b:'Z'},{a:'F',b:'K'},{a:'W',b:'F'},
  {a:'G',b:'C'},{a:'L',b:'E'},{a:'P',b:'N'},{a:'X',b:'A'},{a:'B',b:'P'},
  {a:'O',b:'X'},{a:'Z',b:'B'},{a:'K',b:'O'},{a:'F',b:'Z'},{a:'W',b:'K'},
  {a:'G',b:'D'},{a:'L',b:'C'},{a:'I',b:'E'},{a:'X',b:'N'},{a:'B',b:'A'},
  {a:'O',b:'P'},{a:'Z',b:'X'},{a:'K',b:'B'},{a:'F',b:'O'},{a:'W',b:'Z'},
  {a:'G',b:'R'},{a:'L',b:'D'},{a:'I',b:'C'},{a:'T',b:'E'},{a:'B',b:'N'},
  {a:'O',b:'A'},{a:'Z',b:'P'},{a:'K',b:'X'},{a:'F',b:'B'},{a:'W',b:'O'},
  {a:'G',b:'S'},{a:'L',b:'R'},{a:'I',b:'D'},{a:'T',b:'C'},{a:'V',b:'E'},
  {a:'O',b:'N'},{a:'Z',b:'A'},{a:'K',b:'P'},{a:'F',b:'X'},{a:'W',b:'B'},
  {a:'G',b:'V'},{a:'L',b:'S'},{a:'I',b:'R'},{a:'T',b:'D'},{a:'V',b:'C'},
  {a:'S',b:'E'},{a:'Z',b:'N'},{a:'K',b:'A'},{a:'F',b:'P'},{a:'W',b:'X'},
  {a:'G',b:'T'},{a:'L',b:'V'},{a:'I',b:'S'},{a:'T',b:'R'},{a:'V',b:'D'},
  {a:'S',b:'C'},{a:'R',b:'E'},{a:'K',b:'N'},{a:'F',b:'A'},{a:'W',b:'P'},
  {a:'G',b:'I'},{a:'L',b:'T'},{a:'I',b:'V'},{a:'T',b:'S'},{a:'V',b:'R'},
  {a:'S',b:'D'},{a:'R',b:'C'},{a:'D',b:'E'},{a:'F',b:'N'},{a:'W',b:'A'},
  {a:'G',b:'L'},{a:'L',b:'I'},{a:'I',b:'T'},{a:'T',b:'V'},{a:'V',b:'S'},
  {a:'S',b:'R'},{a:'R',b:'D'},{a:'D',b:'C'},{a:'C',b:'E'},{a:'W',b:'N'},
]

function hitungPAPI(jawaban) {
  const scores = {G:0,L:0,I:0,T:0,V:0,S:0,R:0,D:0,C:0,E:0, N:0,A:0,P:0,X:0,B:0,O:0,Z:0,K:0,F:0,W:0}
  soal.forEach((sq, idx) => {
    const j = jawaban[sq.id]
    if (!j) return
    scores[j === 'a' ? kunci[idx].a : kunci[idx].b]++
  })
  // Profil = 3 skala tertinggi
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const profil = sorted.slice(0, 3).map(([k]) => k).join('')
  return { scores, profil }
}

function TesPapi() {
  const [step, setStep] = useState('form')
  const [nama, setNama] = useState('')
  const [nip, setNip] = useState('')
  const [jabatan, setJabatan] = useState('')
  const [jawaban, setJawaban] = useState({})
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

  const jumlahDijawab = soal.filter(s => jawaban[s.id]).length
  const sudahLengkap = jumlahDijawab === soal.length

  const validateForm = () => {
    const errs = {}
    if (!nama.trim()) errs.nama = 'Nama lengkap wajib diisi.'
    if (!nip.trim())  errs.nip  = 'NIP wajib diisi.'
    if (!jabatan)     errs.jabatan = 'Unit kerja wajib dipilih.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handlePilih = (soalId, pilihan) => {
    setJawaban(prev => ({ ...prev, [soalId]: pilihan }))
  }

  const handleSubmit = async () => {
    if (!sudahLengkap) {
      const belum = soal.find(s => !jawaban[s.id])
      if (belum) {
        const el = document.getElementById(`soal-papi-${belum.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    setLoading(true)
    setSubmitError('')

    const { data: pesertaData, error } = await supabase
      .from('peserta_papi').insert([{ nama, nip, jabatan }]).select()

    if (error) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }

    const pesertaId = pesertaData[0].id
    const { scores, profil } = hitungPAPI(jawaban)

    await supabase.from('hasil_papi').insert([{
      peserta_id: pesertaId, profil,
      skor_g:scores.G, skor_l:scores.L, skor_i:scores.I, skor_t:scores.T, skor_v:scores.V,
      skor_s:scores.S, skor_r:scores.R, skor_d:scores.D, skor_c:scores.C, skor_e:scores.E,
      skor_n:scores.N, skor_a:scores.A, skor_p:scores.P, skor_x:scores.X, skor_b:scores.B,
      skor_o:scores.O, skor_z:scores.Z, skor_k:scores.K, skor_f:scores.F, skor_w:scores.W,
    }])

    navigate('/hasil-papi', { state: { scores, profil, nama, nip, unitKerja: jabatan } })
    setLoading(false)
  }

  // ── FORM AWAL ─────────────────────────────────────────────────
  if (step === 'form') return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-7 text-center">
            <img src="/logo-djbc.png" alt="DJBC" className="h-10 w-auto mx-auto mb-3 opacity-90" />
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white/20 border border-white/30 rounded-2xl backdrop-blur mb-3">
              <span className="text-white text-sm font-black leading-tight">PAPI</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wide">Psikotes DJBC</h1>
            <p className="text-purple-100 text-sm mt-1">Tes Kepribadian PAPI Kostick</p>
          </div>
          <div className="px-8 py-7 space-y-5">
            <div>
              <label className="block text-base font-bold text-gray-700 mb-1.5">Nama Lengkap <span className="text-red-400">*</span></label>
              <input value={nama} onChange={e => { setNama(e.target.value); setFormErrors(p => ({ ...p, nama: '' })) }}
                className={`w-full border bg-gray-50 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all placeholder-gray-400 ${formErrors.nama ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Nama lengkap sesuai KTP" />
              {formErrors.nama && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nama}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">NIP <span className="text-red-400">*</span></label>
              <input value={nip} onChange={e => { setNip(e.target.value); setFormErrors(p => ({ ...p, nip: '' })) }}
                className={`w-full border bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all placeholder-gray-400 ${formErrors.nip ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="NIP" />
              {formErrors.nip && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nip}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Unit Kerja <span className="text-red-400">*</span></label>
              <div className="relative">
                <select value={jabatan} onChange={e => { setJabatan(e.target.value); setFormErrors(p => ({ ...p, jabatan: '' })) }}
                  className={`w-full appearance-none border bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all text-gray-700 pr-10 ${formErrors.jabatan ? 'border-red-400' : 'border-gray-200'}`}>
                  <option value="" disabled>-- Pilih Unit Kerja --</option>
                  {unitKerjaOptions.map(group => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
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
            <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 text-xs text-violet-700">
              <p className="font-semibold mb-1">📋 Petunjuk Pengisian:</p>
              <p>Dari setiap pasang pernyataan, pilih satu yang paling mencerminkan diri Anda. Tidak ada jawaban benar atau salah. Jawab dengan jujur dan spontan. Terdapat <strong>90 pasang</strong> pernyataan.</p>
            </div>
            <button onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-violet-200 mt-2">
              Mulai Tes →
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-violet-600/40 mt-5">© 2025 · Direktorat Jenderal Bea dan Cukai</p>
      </div>
    </div>
  )

  // ── TES ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header sticky */}
        <div className="bg-white rounded-2xl shadow p-5 mb-6 sticky top-4 z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-[11px]">PAPI</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-gray-800 truncate">{nama} · PAPI Kostick</p>
              <p className="text-sm text-gray-400">{jabatan}</p>
            </div>
            <span className="text-base font-bold text-violet-600 flex-shrink-0">{jumlahDijawab}/90</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${(jumlahDijawab / 90) * 100}%` }} />
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {soal.map((s, idx) => {
              const selesai = !!jawaban[s.id]
              return (
                <span key={s.id} className={`inline-flex items-center justify-center w-6 h-6 rounded text-[10px] font-bold transition-all ${selesai ? 'bg-violet-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {selesai ? '✓' : idx+1}
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
          const pilihan = jawaban[s.id]
          const selesai = !!pilihan
          return (
            <div id={`soal-papi-${s.id}`} key={s.id} className={`bg-white rounded-2xl shadow p-6 mb-4 transition-all ${selesai ? 'ring-2 ring-violet-200' : ''}`}>
              {/* Nomor soal */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0 ${selesai ? 'bg-violet-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {selesai ? '✓' : idx+1}
                </span>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Soal No. {idx+1}</p>
              </div>

              {/* Pilihan */}
              <div className="space-y-3">
                {[{key:'a', teks:s.a}, {key:'b', teks:s.b}].map(({key, teks}) => {
                  const dipilih = pilihan === key
                  return (
                    <button key={key} onClick={() => handlePilih(s.id, key)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ${dipilih ? 'border-violet-400 bg-violet-50' : 'border-gray-150 hover:border-violet-200 hover:bg-violet-50/40 bg-gray-50'}`}>
                      {/* Radio circle */}
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-all ${dipilih ? 'border-violet-500 bg-violet-500' : 'border-gray-300 bg-white'}`}>
                        {dipilih && <span className="w-2.5 h-2.5 bg-white rounded-full" />}
                      </span>
                      {/* Teks pernyataan */}
                      <span className={`text-base leading-relaxed ${dipilih ? 'text-violet-800 font-semibold' : 'text-gray-700 font-normal'}`}>
                        {teks}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Submit */}
        <div className="sticky bottom-4 mt-4">
          <button onClick={handleSubmit} disabled={loading || !sudahLengkap}
            className={`w-full font-bold py-4 rounded-2xl transition-all text-base shadow-xl ${sudahLengkap ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-violet-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}>
            {loading ? '⏳ Menyimpan hasil...' : sudahLengkap ? '✓ Selesai & Lihat Hasil →' : `Jawab ${90 - jumlahDijawab} soal lagi`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TesPapi
