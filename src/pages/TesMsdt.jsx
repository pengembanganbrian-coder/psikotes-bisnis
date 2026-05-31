import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Logo from '../components/Logo'

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

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

export default function TesMsdt() {
  const navigate = useNavigate()
  const [step, setStep]             = useState('form')
  const [nama, setNama]             = useState('')
  const [email, setEmail]           = useState('')
  const [usia, setUsia]             = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [jawaban, setJawaban]       = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading]       = useState(false)
  const [saveError, setSaveError]   = useState('')

  const answered = Object.keys(jawaban).length
  const progress  = (answered / 64) * 100

  function validateForm() {
    const errs = {}
    if (!nama.trim())  errs.nama  = 'Nama lengkap wajib diisi.'
    if (!email.trim()) errs.email = 'Email wajib diisi.'
    if (!usia)         errs.usia  = 'Usia wajib diisi.'
    if (!jenisKelamin) errs.jenisKelamin = 'Jenis kelamin wajib dipilih.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit() {
    if (answered < 64) {
      const belum = soal.find(s => jawaban[s.id] === undefined)
      if (belum) document.getElementById(`soal-msdt-${belum.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setLoading(true)
    setSaveError('')

    const hasil = hitungMSDT(jawaban)
    const jabatan = `${usia} th · ${jenisKelamin}`

    try {
      const { data: peserta, error: e1 } = await supabase
        .from('peserta_msdt')
        .insert({ nama, nip: email, jabatan })
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
        state: { hasil, nama, email, jabatan, pesertaId: peserta.id },
      })
    } catch (err) {
      console.error(err)
      setSaveError('Gagal menyimpan ke server. Periksa koneksi dan coba lagi.')
      setLoading(false)
    }
  }

  /* ── FORM ── */
  if (step === 'form') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
      </div>
      <div className="anim-up" style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>AssesIN</p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>Tes Gaya Manajemen MSDT</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>64 soal · ~20 menit</p>
        </div>
        <div className="dark-card" style={{ padding: '32px' }}>
          <div className="section-rule" style={{ marginBottom: '28px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Data Diri</span><span className="section-rule-line" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={S_LABEL}>Nama Lengkap <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" value={nama} onChange={e => { setNama(e.target.value); setFormErrors(p => ({...p, nama: ''})) }} placeholder="Nama lengkap" autoComplete="name" />
              {formErrors.nama && <p style={S_ERR}>{formErrors.nama}</p>}
            </div>
            <div>
              <label style={S_LABEL}>Email <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" type="email" value={email} onChange={e => { setEmail(e.target.value); setFormErrors(p => ({...p, email: ''})) }} placeholder="email@contoh.com" autoComplete="email" />
              {formErrors.email && <p style={S_ERR}>{formErrors.email}</p>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={S_LABEL}>Usia <span style={{ color: '#f87171' }}>*</span></label>
                <input className="field" type="number" min="10" max="100" value={usia} onChange={e => { setUsia(e.target.value); setFormErrors(p => ({...p, usia: ''})) }} placeholder="Tahun" />
                {formErrors.usia && <p style={S_ERR}>{formErrors.usia}</p>}
              </div>
              <div>
                <label style={S_LABEL}>Jenis Kelamin <span style={{ color: '#f87171' }}>*</span></label>
                <select className="field" value={jenisKelamin} onChange={e => { setJenisKelamin(e.target.value); setFormErrors(p => ({...p, jenisKelamin: ''})) }}>
                  <option value="">— Pilih —</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {formErrors.jenisKelamin && <p style={S_ERR}>{formErrors.jenisKelamin}</p>}
              </div>
            </div>
            <button
              onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
              style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', width: '100%', marginTop: '8px' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Mulai Tes →
            </button>
          </div>
        </div>
        <button onClick={() => navigate('/')} style={{ display: 'block', margin: '20px auto 0', color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Kembali ke beranda
        </button>
      </div>
    </div>
  )

  /* ── TES ── */
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,15,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>Tes MSDT</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{nama} · {answered}/64 terjawab</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '120px', height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.5s' }} />
            </div>
            <span style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px' }}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '28px var(--px)' }}>
        <div className="dark-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.65' }}>
            Pilih satu pernyataan <strong style={{ color: 'var(--text)' }}>(A atau B)</strong> yang paling menggambarkan cara Anda biasanya bertindak sebagai pemimpin. Kerjakan berdasarkan kondisi nyata, bukan ideal.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {soal.map(s => {
            const val  = jawaban[s.id]
            const done = val !== undefined
            return (
              <div id={`soal-msdt-${s.id}`} key={s.id} className="dark-card" style={{ padding: '20px', borderColor: done ? 'var(--accent-border)' : 'var(--border)' }}>
                <p style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '14px', opacity: 0.7 }}>
                  {String(s.id).padStart(2, '0')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[['a', s.a], ['b', s.b]].map(([key, teks]) => (
                    <button key={key} onClick={() => setJawaban(j => ({...j, [s.id]: key}))} className={`answer-btn ${val === key ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ flexShrink: 0, width: '22px', height: '22px', borderRadius: '50%', border: '1px solid ' + (val === key ? 'var(--accent)' : 'var(--border)'), background: val === key ? 'var(--accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '10px', color: val === key ? '#09090f' : 'var(--text-muted)', marginTop: '1px' }}>
                        {key.toUpperCase()}
                      </span>
                      <span style={{ fontSize: '14px', lineHeight: '1.6', textAlign: 'left', color: val === key ? 'var(--text)' : 'var(--text-sub)' }}>{teks}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {saveError && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#f87171', fontSize: '14px', marginTop: '20px' }}>
            {saveError}
          </div>
        )}

        <div style={{ marginTop: '28px' }}>
          {answered < 64 && <p style={{ textAlign: 'center', color: '#fbbf24', fontSize: '13px', marginBottom: '12px' }}>Masih {64 - answered} soal belum dijawab</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', background: answered === 64 ? 'var(--accent)' : 'var(--surface-2)', color: answered === 64 ? '#09090f' : 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: '1px solid ' + (answered === 64 ? 'var(--accent)' : 'var(--border)'), cursor: answered === 64 && !loading ? 'pointer' : 'not-allowed', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Menyimpan...' : answered === 64 ? 'Lihat Hasil →' : `${answered} / 64 terjawab`}
          </button>
        </div>
      </div>
    </div>
  )
}
