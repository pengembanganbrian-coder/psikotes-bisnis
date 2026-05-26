import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Logo from '../components/Logo'

const unitKerjaOptions = [
  { group: 'Perusahaan Swasta', options: ['Manufaktur & Industri', 'Teknologi & IT', 'Perbankan & Keuangan', 'Ritel & Consumer Goods', 'Properti & Konstruksi', 'Kesehatan & Farmasi', 'Media & Komunikasi', 'Transportasi & Logistik', 'Energi & Pertambangan', 'Konsultan & Profesional', 'Lainnya'] },
  { group: 'BUMN / BUMD', options: ['Perbankan BUMN', 'Energi & Pertambangan BUMN', 'Telekomunikasi BUMN', 'Infrastruktur & Konstruksi BUMN', 'Pertanian & Pangan BUMN', 'BUMD Daerah', 'Lainnya'] },
  { group: 'Instansi Pemerintah', options: ['Kementerian / Lembaga', 'Pemerintah Daerah', 'TNI / Polri', 'Badan / Komisi Negara', 'Lainnya'] },
  { group: 'Pendidikan & Penelitian', options: ['Universitas / Perguruan Tinggi', 'Sekolah / Madrasah', 'Lembaga Pelatihan', 'Lembaga Penelitian', 'Lainnya'] },
  { group: 'Lainnya', options: ['NGO / Yayasan / Ormas', 'Startup', 'Wirausaha / Freelance', 'Pelajar / Mahasiswa', 'Lainnya'] },
]

const soal = [
  { id: 1,  a: "Saya tidak akan menegur pelanggar-pelanggar peraturan bila saya merasa pasti bahwa tidak ada satu orangpun yang mengetahui tentang pelanggaran-pelanggaran tersebut.", b: "Bila saya mengumumkan suatu keputusan yang kurang menyenangkan, saya akan menjelaskan kepada bawahan saya bahwa keputusan ini dibuat oleh direktur." },
  { id: 2,  a: "Bila ada seorang karyawan yang hasil kerjanya selalu tidak memuaskan saya, saya akan menunggu suatu kesempatan untuk memindahkannya dan bukan untuk memecatnya.", b: "Bila ada bawahan saya yang dikucilkan dari kelompok kerjanya, saya akan mencari jalan agar orang lain dapat berteman dengannya." },
  { id: 3,  a: "Bila direktur memberikan perintah yang kurang menyenangkan, saya pikir adalah cukup bijaksana bila saya menyebutkan namanya dan bukan nama saya.", b: "Saya biasanya membuat keputusan-keputusan sendiri dan menyampaikannya kepada bawahan saya." },
  { id: 4,  a: "Bila saya ditegur oleh atasan saya, saya akan memanggil semua bawahan saya dan mengatakan semua teguran tersebut kepada mereka.", b: "Saya selalu memberikan tugas-tugas yang sangat sulit kepada karyawan-karyawan yang paling berpengalaman." },
  { id: 5,  a: "Saya selalu melakukan diskusi-diskusi untuk mencapai kata sepakat.", b: "Saya selalu menganjurkan kepada bawahan saya untuk memberikan usul-usul, tetapi kadang-kadang saya langsung mengambil tindakan tertentu." },
  { id: 6,  a: "Seringkali saya lebih mementingkan tugas daripada diri saya sendiri.", b: "Saya mengijinkan bawahan-bawahan saya untuk ikut serta dalam mengambil keputusan." },
  { id: 7,  a: "Bila jumlah dan mutu hasil kerja bagian saya tidak memuaskan, saya mengatakan kepada bawahan-bawahan saya bahwa direktur merasa kecewa. Oleh karena itu mereka harus memperbaiki kerja mereka.", b: "Saya membuat keputusan-keputusan sendiri dan kemudian saya mencoba untuk 'menjual' keputusan-keputusan itu kepada bawahan saya." },
  { id: 8,  a: "Bila saya mengumumkan suatu keputusan yang kurang menyenangkan, saya akan menjelaskan kepada bawahan saya bahwa keputusan ini dibuat oleh direktur.", b: "Saya mengijinkan bawahan-bawahan saya untuk ikut serta di dalam pengambilan keputusan, tetapi sayapun menyediakan sesuatu yang jitu sebagai keputusan terakhir." },
  { id: 9,  a: "Saya akan memberikan tugas-tugas yang sulit kepada bawahan saya yang belum berpengalaman, tetapi bila mereka memperoleh kesukaran, saya akan mengambil alih tanggung jawab mereka.", b: "Bila jumlah dan mutu hasil kerja bagian saya tidak memuaskan, saya mengatakan kepada bawahan-bawahan saya bahwa direktur merasa kecewa. Oleh karena itu mereka harus memperbaiki kerja mereka." },
  { id: 10, a: "Saya merasa bahwa dengan bekerja keras untuk bawahan saya, mereka akan menyukai saya.", b: "Saya membiarkan orang lain menangani tugas mereka masing-masing, walaupun mereka membuat banyak kesalahan." },
  { id: 11, a: "Saya menunjukkan minat saya terhadap kehidupan pribadi bawahan-bawahan saya, karena sayapun mengharapkan mereka berbuat seperti itu kepada saya.", b: "Saya merasa bahwa bawahan-bawahan saya tidak perlu mengerti mengapa mereka mengerjakan sesuatu hal, sejauh mereka mengerjakan hal tersebut." },
  { id: 12, a: "Saya percaya bahwa bawahan-bawahan yang tidak disiplin tidak akan memperbaiki jumlah atau mutu kerja mereka dalam jangka waktu yang panjang.", b: "Bila menghadapi masalah yang sulit, saya berusaha untuk mencapai pemecahan yang dapat diterima oleh sebagian besar orang." },
  { id: 13, a: "Bila beberapa bawahan saya merasa tidak bahagia, saya akan mencoba melakukan sesuatu untuk mengatasi hal tersebut.", b: "Saya berusaha bekerja sebaik mungkin dan memberikan ide-ide pengembangan pada pimpinan." },
  { id: 14, a: "Saya menyetujui kenaikan tunjangan-tunjangan untuk staf dan karyawan.", b: "Saya mendukung bawahan saya yang ingin meningkatkan pengetahuan tentang pekerjaan dan perusahaan, walaupun hal itu sebenarnya belum diperlukan untuk kedudukan mereka sekarang." },
  { id: 15, a: "Saya membiarkan orang lain menangani tugas mereka masing-masing, walaupun mereka banyak membuat kesalahan.", b: "Saya membuat keputusan-keputusan sendiri, tetapi saya akan mempertimbangkan usul-usul dari bawahan-bawahan saya." },
  { id: 16, a: "Bila bawahan saya yang dikucilkan dari kelompok kerjanya, saya akan mencari cara agar orang lain dapat berteman dengannya.", b: "Bila seorang karyawan tidak sanggup menyelesaikan tugasnya, saya akan membantu dia untuk menyelesaikan tugas tersebut." },
  { id: 17, a: "Saya percaya bahwa penerapan disiplin merupakan contoh untuk karyawan-karyawan lain.", b: "Saya merasa lebih mementingkan tugas daripada diri saya sendiri." },
  { id: 18, a: "Saya mencela pembicaraan-pembicaraan yang tidak perlu diantara bawahan-bawahan saya, selama mereka bekerja.", b: "Saya menyetujui kenaikan tunjangan-tunjangan untuk staf dan karyawan." },
  { id: 19, a: "Saya selalu memperhatikan keterlambatan dan kemangkiran bawahan saya.", b: "Saya percaya bahwa serikat-serikat buruh akan mencoba meruntuhkan kewibawaan pimpinan perusahaan." },
  { id: 20, a: "Kadang-kadang saya merasa bahwa apa yang dikeluhkan oleh serikat buruh bukanlah masalah yang mendasar.", b: "Saya merasa bahwa keluhan-keluhan tidak dapat dicegah dan saya akan berusaha untuk menghilangkan keluhan tersebut." },
  { id: 21, a: "Adalah penting bagi saya untuk memperoleh penghargaan atas ide-ide saya yang baik.", b: "Saya mengemukakan pendapat-pendapat saya dimuka umum hanya bila saya merasa bahwa orang lain akan setuju dengan saya." },
  { id: 22, a: "Saya percaya bahwa serikat-serikat buruh akan mencoba meruntuhkan kewibawaan pimpinan perusahaan.", b: "Saya percaya bahwa pertemuan-pertemuan yang sering dengan karyawan secara pribadi akan membantu pengembangan diri mereka." },
  { id: 23, a: "Saya merasa bahwa bawahan-bawahan saya tidak perlu mengerti mengapa mereka mengerjakan sesuatu hal, sejauh mereka mengerjakan hal tersebut.", b: "Saya merasa bahwa jam pencatat waktu datang dan pulangnya para pegawai akan mengurangi keterlambatan." },
  { id: 24, a: "Saya biasanya membuat keputusan-keputusan sendiri dan menyampaikannya kepada bawahan saya.", b: "Saya merasa bahwa serikat-serikat buruh dan pimpinan perusahaan dapat bekerjasama untuk mencapai tujuan-tujuan bersama." },
  { id: 25, a: "Saya menyukai penggunaan skala penggajian karyawan.", b: "Saya selalu melakukan diskusi-diskusi untuk mencapai kata sepakat." },
  { id: 26, a: "Saya tidak akan memberikan tugas yang tidak saya senangi kepada orang lain.", b: "Bila beberapa bawahan saya merasa tidak berbahagia, saya akan mencoba melakukan sesuatu untuk mengatasi hal tersebut." },
  { id: 27, a: "Bila ada tugas yang mendesak, walaupun semua peralatannya sudah diselesaikan, saya akan membiarkannya saja dan meminta salah seorang bawahan saya untuk mengerjakan tugas tersebut.", b: "Adalah penting bagi saya untuk memperoleh penghargaan atas ide-ide saya yang baik." },
  { id: 28, a: "Tujuan saya adalah berusaha mengerjakan tugas sebaik mungkin tanpa mengeluh.", b: "Saya memberikan tugas kepada bawahan saya tanpa banyak mempertimbangkan pengalaman atau kemampuan mereka, lebih menuntut pencapaian hasilnya saja." },
  { id: 29, a: "Saya memberikan tugas kepada bawahan saya tanpa banyak mempertimbangkan pengalaman atau kemampuan mereka, lebih menuntut pencapaian hasilnya saja.", b: "Saya dengan sabar mendengarkan keluhan-keluhan dan ketidakpuasan bawahan saya, tetapi sering kali saya meralat apa yang mereka katakan." },
  { id: 30, a: "Saya merasa bahwa keluhan-keluhan tidak dapat dicegah dan saya berusaha untuk menghilangkan keluhan tersebut.", b: "Saya percaya bahwa bawahan-bawahan saya akan merasakan kepuasan kerja tanpa merasa tertekan oleh saya." },
  { id: 31, a: "Bila menghadapi masalah yang sulit, saya berusaha untuk mencapai pemecahan yang dapat diterima oleh sebagian besar orang.", b: "Saya percaya bahwa pengalaman bekerja lebih bermanfaat daripada pendidikan teoritis." },
  { id: 32, a: "Saya selalu memberikan tugas-tugas yang sangat sulit kepada karyawan-karyawan yang paling berpengalaman.", b: "Saya percaya bahwa kenaikan jabatan adalah semata-mata berdasarkan kemampuan yang ada." },
  { id: 33, a: "Saya merasa bahwa masalah-masalah yang timbul diantara para karyawan biasanya akan dapat diselesaikan di antara mereka sendiri, tanpa campur tangan dari saya.", b: "Bila saya ditegur oleh atasan saya, saya akan memanggil semua bawahan saya dan mengatakan semua teguran tersebut kepada mereka." },
  { id: 34, a: "Saya tidak peduli dengan apa yang dikerjakan oleh karyawan saya di luar jam kerja kantornya.", b: "Saya percaya bahwa bawahan-bawahan yang tidak disiplin tidak akan memperbaiki jumlah atau mutu kerja mereka dalam jangka waktu yang panjang." },
  { id: 35, a: "Saya memberikan informasi kepada pimpinan perusahaan tidak lebih dari apa yang mereka tanyakan.", b: "Kadang-kadang saya merasa bahwa apa yang dikeluhkan oleh serikat buruh bukanlah masalah yang mendasar." },
  { id: 36, a: "Saya kadang ragu-ragu untuk membuat suatu keputusan yang akan tidak disukai oleh bawahan-bawahan saya.", b: "Tujuan saya adalah berusaha mengerjakan tugas sebaik mungkin tanpa mengeluh." },
  { id: 37, a: "Saya dengan sabar mendengarkan keluhan-keluhan dan ketidakpuasan bawahan saya, tetapi sering kali saya meralat apa yang mereka katakan.", b: "Saya kadang ragu-ragu untuk membuat suatu keputusan yang akan tidak disukai oleh bawahan-bawahan saya." },
  { id: 38, a: "Saya mengemukakan pendapat-pendapat saya dimuka umum hanya bila saya merasa bahwa orang lain akan setuju dengan saya.", b: "Sebagian besar dari bawahan-bawahan saya dapat menyelesaikan tugas-tugas mereka, bila perlu tanpa kehadiran saya." },
  { id: 39, a: "Saya berusaha bekerja sebaik mungkin dan memberikan ide-ide pengembangan pada pimpinan perusahaan.", b: "Bila saya memberikan tugas kepada bawahan-bawahan saya, saya akan menentukan batas waktu penyelesaiannya." },
  { id: 40, a: "Saya selalu menganjurkan kepada bawahan saya untuk memberikan usul-usul, tetapi kadang-kadang saya langsung mengambil tindakan tertentu.", b: "Saya mencoba membuat bawahan-bawahan saya merasa senang apabila mereka berbicara dengan saya." },
  { id: 41, a: "Di dalam diskusi-diskusi saya memberikan fakta-fakta sesuai pemahaman bawahan saya, dan membiarkan mereka untuk membuat kesimpulan sendiri.", b: "Bila direktur memberikan perintah yang kurang menyenangkan, saya pikir adalah cukup bijaksana bila saya menyebutkan namanya dan bukan nama saya." },
  { id: 42, a: "Bila ada tugas-tugas mendadak atau tugas yang tidak menyenangkan, sebelumnya saya akan meminta beberapa sukarelawan yang mau mengerjakan tugas tersebut.", b: "Saya menunjukkan minat saya terhadap kehidupan pribadi bawahan-bawahan saya, karena sayapun mengharapkan mereka berbuat seperti itu kepada saya." },
  { id: 43, a: "Saya selalu memperhatikan kebahagiaan karyawan-karyawan saya saat mereka mengerjakan tugas-tugas mereka.", b: "Saya selalu memperhatikan keterlambatan dan kemangkiran bawahan saya." },
  { id: 44, a: "Sebagian besar dari bawahan-bawahan saya dapat menyelesaikan tugas-tugas mereka, bila perlu tanpa kehadiran saya.", b: "Bila ada tugas yang mendesak, walaupun semua peralatannya sudah diselesaikan, saya akan membiarkannya saja dan meminta salah seorang bawahan saya untuk mengerjakan tugas tersebut." },
  { id: 45, a: "Saya percaya bahwa bawahan-bawahan saya akan merasakan kepuasan kerja tanpa merasa tertekan oleh saya.", b: "Saya memberikan informasi kepada pimpinan perusahaan tidak lebih dari apa yang mereka tanyakan." },
  { id: 46, a: "Saya percaya bahwa pertemuan-pertemuan yang sering dengan karyawan secara pribadi akan membantu pengembangan diri mereka.", b: "Saya selalu memperhatikan kebahagiaan karyawan-karyawan saya saat mereka mengerjakan tugas-tugas mereka." },
  { id: 47, a: "Saya mendukung bawahan saya yang ingin meningkatkan pengetahuan tentang pekerjaan dan perusahaan, walaupun hal itu sebenarnya belum diperlukan untuk kedudukan mereka sekarang.", b: "Saya mengawasi benar bawahan-bawahan saya yang kurang mahir dalam pekerjaannya atau bawahan-bawahan saya yang hasil kerjanya kurang memuaskan." },
  { id: 48, a: "Saya mengijinkan bawahan-bawahan saya untuk ikut serta dalam mengambil keputusan dan saya selalu mematuhi keputusan yang dibuat berdasarkan suara terbanyak.", b: "Saya membuat bawahan-bawahan saya bekerja keras, dan saya berusaha meyakinkan mereka bahwa biasanya mereka akan mendapatkan perlakuan yang adil dari pimpinan perusahaan." },
  { id: 49, a: "Saya merasa bahwa semua karyawan pada jabatan yang sama seharusnya memperoleh gaji yang sama.", b: "Bila ada seorang karyawan yang hasil kerjanya selalu tidak memuaskan saya, saya akan menunggu suatu kesempatan untuk memindahkannya dan bukan untuk memecatnya." },
  { id: 50, a: "Saya merasa bahwa tujuan-tujuan serikat buruh dan tujuan-tujuan perusahaan saling berbeda.", b: "Saya merasa bahwa dengan bekerja keras bagi bawahan saya, mereka akan menyenangi saya." },
  { id: 51, a: "Saya mengawasi benar bawahan-bawahan saya yang kurang mahir dalam pekerjaannya atau bawahan-bawahan saya yang hasil kerjanya kurang memuaskan.", b: "Saya mencela pembicaraan-pembicaraan yang tidak perlu diantara bawahan-bawahan saya, selama mereka bekerja." },
  { id: 52, a: "Bila saya memberikan tugas kepada bawahan-bawahan saya, saya akan menentukan batas waktu penyelesaiannya.", b: "Saya tidak akan memberikan tugas yang tidak saya senangi kepada orang lain." },
  { id: 53, a: "Saya percaya bahwa pengalaman bekerja lebih bermanfaat daripada pendidikan teoritis.", b: "Saya tidak peduli dengan apa yang dikerjakan oleh karyawan saya di luar jam kantornya." },
  { id: 54, a: "Saya merasa bahwa jam pencatat waktu datang dan pulangnya para pegawai akan mengurangi keterlambatan.", b: "Saya mengijinkan bawahan-bawahan saya untuk ikut serta dalam mengambil keputusan dan saya selalu mematuhi keputusan yang dibuat berdasarkan suara terbanyak." },
  { id: 55, a: "Saya membuat keputusan-keputusan sendiri, tetapi saya dapat mempertimbangkan saran-saran yang wajar dari bawahan-bawahan saya.", b: "Saya merasa bahwa tujuan-tujuan serikat buruh dan tujuan-tujuan perusahaan adalah saling berbeda." },
  { id: 56, a: "Saya membuat keputusan-keputusan sendiri dan kemudian saya mencoba untuk 'menjual' keputusan-keputusan itu kepada bawahan saya.", b: "Apabila mungkin, saya akan membentuk kelompok-kelompok kerja yang terdiri dari orang-orang yang sudah menjadi teman-teman baik saya." },
  { id: 57, a: "Saya tidak akan ragu-ragu untuk mempekerjakan pegawai-pegawai yang cacat jasmani, bilamana saya merasa pasti bahwa mereka dapat menangani pekerjaannya.", b: "Saya tidak akan menegur pelanggar-pelanggar peraturan bila saya merasa pasti bahwa tidak ada satu orangpun yang mengetahui tentang pelanggaran-pelanggaran tersebut." },
  { id: 58, a: "Apabila mungkin, saya akan membentuk kelompok-kelompok kerja yang terdiri dari orang-orang yang sudah menjadi teman-teman baik saya.", b: "Saya akan memberikan tugas-tugas yang sulit kepada bawahan saya yang belum berpengalaman, tetapi bila mereka memperoleh kesukaran, saya akan mengambil alih tanggung jawab mereka." },
  { id: 59, a: "Saya membuat bawahan-bawahan saya bekerja keras, dan saya berusaha meyakinkan mereka bahwa biasanya mereka akan mendapatkan perlakuan yang adil dari pimpinan perusahaan.", b: "Saya percaya bahwa penerapan disiplin merupakan contoh untuk karyawan-karyawan lain." },
  { id: 60, a: "Saya mencoba membuat bawahan-bawahan saya merasa senang apabila mereka berbicara dengan saya.", b: "Saya menyukai penggunaan skala penggajian karyawan." },
  { id: 61, a: "Saya percaya bahwa kenaikan jabatan adalah semata-mata berdasarkan kemampuan yang ada.", b: "Saya merasa bahwa masalah-masalah yang timbul diantara para karyawan biasanya akan dapat diselesaikan di antara mereka sendiri, tanpa campur tangan dari saya." },
  { id: 62, a: "Saya merasa bahwa serikat-serikat buruh dan pimpinan perusahaan bekerja untuk mencapai tujuan-tujuan yang sama.", b: "Di dalam diskusi-diskusi saya memberikan fakta-fakta sesuai pemahaman bawahan saya, dan membiarkan mereka untuk membuat kesimpulan sendiri." },
  { id: 63, a: "Bila seorang karyawan tidak sanggup menyelesaikan tugasnya, saya akan membantu dia untuk menyelesaikan tugas tersebut.", b: "Saya merasa bahwa semua karyawan pada jabatan yang sama seharusnya memperoleh gaji yang sama." },
  { id: 64, a: "Saya mengijinkan bawahan-bawahan saya untuk ikut serta di dalam pengambilan keputusan, tetapi sayapun menyediakan sesuatu yang jitu sebagai keputusan terakhir.", b: "Saya tidak akan ragu-ragu untuk mempekerjakan pegawai-pegawai yang cacat jasmani, bilamana saya merasa pasti bahwa mereka dapat menangani pekerjaannya." },
]

function hitungMSDT(jawaban) {
  const colGroups = {
    1: [1,9,17,25,33,41,49,57],
    2: [2,10,18,26,34,42,50,58],
    3: [3,11,19,27,35,43,51,59],
    4: [4,12,20,28,36,44,52,60],
    5: [5,13,21,29,37,45,53,61],
    6: [6,14,22,30,38,46,54,62],
    7: [7,15,23,31,39,47,55,63],
    8: [8,16,24,32,40,48,56,64],
  }
  const koreksi = { 1:1, 2:2, 3:1, 4:0, 5:3, 6:-1, 7:0, 8:-4 }

  const colSkor = {}
  for (let col = 1; col <= 8; col++) {
    const aCount = colGroups[col].filter(q => jawaban[q] === 'a').length
    colSkor[col] = aCount + koreksi[col]
  }

  const TO = colSkor[1] + colSkor[2]
  const RO = colSkor[3] + colSkor[4]
  const E_raw = colSkor[5] + colSkor[6]
  const O_raw = colSkor[7] + colSkor[8]
  const grandTotal = TO + RO + E_raw + O_raw

  function konversiE(total) {
    if (total <= 29) return 0
    if (total <= 31) return 0.6
    if (total === 32) return 1.2
    if (total === 33) return 1.8
    if (total === 34) return 2.4
    if (total === 35) return 3.0
    if (total <= 37) return 3.6
    return 4.0
  }
  const E_score = konversiE(grandTotal)

  const toTinggi = TO > 11
  const roTinggi = RO > 9
  const eTinggi  = E_score >= 2.0

  let gaya
  if      ( toTinggi &&  roTinggi &&  eTinggi) gaya = 'Executive'
  else if ( toTinggi &&  roTinggi && !eTinggi) gaya = 'Compromiser'
  else if ( toTinggi && !roTinggi &&  eTinggi) gaya = 'Benevolent Autocrat'
  else if ( toTinggi && !roTinggi && !eTinggi) gaya = 'Autocrat'
  else if (!toTinggi &&  roTinggi &&  eTinggi) gaya = 'Developer'
  else if (!toTinggi &&  roTinggi && !eTinggi) gaya = 'Missionary'
  else if (!toTinggi && !roTinggi &&  eTinggi) gaya = 'Bureaucrat'
  else                                          gaya = 'Deserter'

  return { TO, RO, E_raw, O_raw, E_score, grandTotal, gaya, toTinggi, roTinggi, eTinggi, colSkor }
}

export default function TesMsdt() {
  const navigate = useNavigate()
  const [step, setStep]         = useState('form')
  const [nama, setNama]         = useState('')
  const [nip, setNip]           = useState('')
  const [unitKerja, setUnitKerja] = useState('')
  const [jawaban, setJawaban]   = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading]   = useState(false)
  const [saveError, setSaveError] = useState('')

  const answered = Object.keys(jawaban).length
  const progress  = (answered / 64) * 100

  function validateForm() {
    const errs = {}
    if (!nama.trim()) errs.nama = 'Nama lengkap wajib diisi.'
    if (!nip.trim())  errs.nip  = 'NIP wajib diisi.'
    if (!unitKerja)   errs.unitKerja = 'Unit kerja wajib dipilih.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit() {
    if (answered < 64) {
      const belum = soal.find(s => jawaban[s.id] === undefined)
      if (belum) {
        const el = document.getElementById(`soal-msdt-${belum.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    setLoading(true)
    setSaveError('')

    const hasil = hitungMSDT(jawaban)

    try {
      const { data: peserta, error: e1 } = await supabase
        .from('peserta_msdt')
        .insert({ nama, nip, jabatan: unitKerja })
        .select()
        .single()

      if (e1 || !peserta) throw e1 || new Error('Gagal menyimpan peserta')

      const { error: e2 } = await supabase.from('hasil_msdt').insert({
        peserta_id:  peserta.id,
        skor_to:     hasil.TO,
        skor_ro:     hasil.RO,
        e_score:     hasil.E_score,
        grand_total: hasil.grandTotal,
        gaya:        hasil.gaya,
      })

      if (e2) throw e2

      navigate('/hasil-msdt', {
        state: { hasil, nama, nip, unitKerja, pesertaId: peserta.id },
      })
    } catch (err) {
      console.error(err)
      setSaveError('Gagal menyimpan ke server. Periksa koneksi dan coba lagi.')
      setLoading(false)
    }
  }

  /* ═══════════════════════════════════════════════
     STEP: FORM
  ═══════════════════════════════════════════════ */
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-orange-100 p-8">

          {/* Logo + Judul */}
          <div className="text-center mb-6">
            <div className="flex items-center gap-2 justify-center mb-1">
              <Logo size="sm" />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 flex-shrink-0">
              <span className="text-white font-black text-xs text-center leading-tight">MSDT</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">Tes Gaya Manajemen MSDT</h1>
              <p className="text-sm text-gray-400">Management Style Diagnostic Test</p>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6 text-sm text-orange-800 leading-relaxed">
            MSDT adalah instrumen untuk mengidentifikasi <strong>gaya kepemimpinan dan manajemen</strong> Anda.
            Terdiri dari <strong>64 pasangan pernyataan</strong> — pilih satu yang paling menggambarkan diri Anda.
            Tidak ada jawaban benar atau salah.
          </div>

          {/* Form isian */}
          <div className="space-y-4">
            <div>
              <label className="block text-base font-bold text-gray-700 mb-1.5">
                Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <input
                type="text" value={nama}
                onChange={e => { setNama(e.target.value); setFormErrors(p => ({ ...p, nama: '' })) }}
                placeholder="Nama lengkap sesuai KTP"
                className={`w-full border-2 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:border-orange-400 transition ${formErrors.nama ? 'border-red-400' : 'border-gray-200'}`}
              />
              {formErrors.nama && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nama}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                NIP <span className="text-red-400">*</span>
              </label>
              <input
                type="text" value={nip}
                onChange={e => { setNip(e.target.value); setFormErrors(p => ({ ...p, nip: '' })) }}
                placeholder="NIP"
                className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition ${formErrors.nip ? 'border-red-400' : 'border-gray-200'}`}
              />
              {formErrors.nip && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nip}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Unit Kerja <span className="text-red-400">*</span>
              </label>
              <select
                value={unitKerja}
                onChange={e => { setUnitKerja(e.target.value); setFormErrors(p => ({ ...p, unitKerja: '' })) }}
                className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-400 transition bg-white ${formErrors.unitKerja ? 'border-red-400' : 'border-gray-200'}`}
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
            className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-200"
          >
            Mulai Tes →
          </button>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════════════
     STEP: TES
  ═══════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sticky progress header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm px-6 py-3">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
          <div>
            <p className="font-bold text-gray-800 text-sm">{nama}</p>
            <p className="text-xs text-gray-400">MSDT · {answered}/64 terjawab</p>
          </div>
          <div className="flex-1 max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-bold text-orange-600 w-10 text-right">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Instruksi */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-orange-900 mb-2">Petunjuk Pengisian</h2>
          <p className="text-sm text-orange-800 leading-relaxed">
            Untuk setiap nomor, pilih <strong>satu pernyataan (A atau B)</strong> yang paling menggambarkan
            cara Anda biasanya bertindak sebagai pemimpin/atasan. Tidak ada jawaban benar atau salah.
            Kerjakan berdasarkan kondisi nyata, bukan kondisi ideal.
          </p>
        </div>

        {/* Daftar soal */}
        <div className="space-y-4">
          {soal.map(s => {
            const val  = jawaban[s.id]
            const done = val !== undefined

            return (
              <div
                id={`soal-msdt-${s.id}`}
                key={s.id}
                className={`bg-white rounded-2xl shadow-sm border-2 p-5 transition-all ${done ? 'border-orange-200' : 'border-gray-100'}`}
              >
                {/* Nomor soal */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {s.id}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">Pilih salah satu pernyataan berikut:</span>
                </div>

                {/* Pilihan A */}
                <button
                  onClick={() => setJawaban(j => ({ ...j, [s.id]: 'a' }))}
                  className={`w-full text-left border-2 rounded-xl px-4 py-3.5 mb-2 transition-all text-sm leading-relaxed ${
                    val === 'a'
                      ? 'border-orange-500 bg-orange-50 text-orange-900 font-medium'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50'
                  }`}
                >
                  <span className={`inline-block w-5 h-5 rounded-full border-2 mr-2 text-center text-xs font-black leading-4 flex-shrink-0 align-middle ${
                    val === 'a' ? 'border-orange-500 bg-orange-500 text-white' : 'border-gray-300 text-gray-400'
                  }`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'middle' }}>A</span>
                  {s.a}
                </button>

                {/* Pilihan B */}
                <button
                  onClick={() => setJawaban(j => ({ ...j, [s.id]: 'b' }))}
                  className={`w-full text-left border-2 rounded-xl px-4 py-3.5 transition-all text-sm leading-relaxed ${
                    val === 'b'
                      ? 'border-amber-500 bg-amber-50 text-amber-900 font-medium'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                >
                  <span className={`inline-block w-5 h-5 rounded-full border-2 mr-2 text-center text-xs font-black leading-4 flex-shrink-0 align-middle ${
                    val === 'b' ? 'border-amber-500 bg-amber-500 text-white' : 'border-gray-300 text-gray-400'
                  }`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'middle' }}>B</span>
                  {s.b}
                </button>
              </div>
            )
          })}
        </div>

        {/* Error banner */}
        {saveError && (
          <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            ⚠ {saveError}
          </div>
        )}

        {/* Submit */}
        <div className="mt-8 pb-8">
          {answered < 64 && (
            <p className="text-center text-sm text-amber-600 font-medium mb-3">
              ⚠️ Masih {64 - answered} soal belum dijawab
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full font-bold py-4 rounded-2xl text-lg transition-all ${
              answered === 64 && !loading
                ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-200'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading
              ? 'Menyimpan...'
              : answered === 64
                ? 'Lihat Hasil →'
                : `${answered} / 64 terjawab`}
          </button>
        </div>
      </div>
    </div>
  )
}
