// Definisi 4 tes baru AssesIN: Big Five, RIASEC, Resiliensi, Peran dalam Tim.
//
// Satu berkas data dipakai bersama oleh mesin tes (pages/TesBaru.jsx),
// halaman hasil (pages/HasilBaru.jsx), dan dashboard admin. Bank soal
// diadaptasi dari modul profiling internal, ditulis ulang untuk pasar
// umum. Keempat tes berstatus BETA: butir disusun berdasarkan teori yang
// mapan (Big Five, Holland RIASEC, resiliensi kerja, peran tim), tetapi
// reliabilitas & validitas set butir ini sendiri belum diuji pada data.
//
// Peran dalam Tim sengaja memakai nama peran generik dan tidak menyebut
// model/merek pihak lain.

export const LIKERT5 = [
  { val: 1, label: 'Sangat Tidak Setuju' },
  { val: 2, label: 'Tidak Setuju' },
  { val: 3, label: 'Netral' },
  { val: 4, label: 'Setuju' },
  { val: 5, label: 'Sangat Setuju' },
]

export const YA_TIDAK = [
  { val: 0, label: 'Tidak' },
  { val: 1, label: 'Ya' },
]

/** Tingkat skor 0-100 untuk narasi. */
export function tingkat(skor) {
  if (skor >= 67) return 'tinggi'
  if (skor <= 40) return 'rendah'
  return 'sedang'
}

export const LABEL_TINGKAT = { tinggi: 'Tinggi', sedang: 'Sedang', rendah: 'Rendah' }

/** Skor 0-100: jawaban terendah semua = 0, tertinggi semua = 100 (Netral = 50 pada skala 1-5). */
const persen = (sum, n, maks, min = 0) => Math.round(((sum - n * min) / (n * (maks - min))) * 100)

/* ──────────────────────────────────────────────────────────────────
   1. BIG FIVE
   ────────────────────────────────────────────────────────────────── */
const BIG_FIVE = {
  kode: 'bigfive',
  testType: 'Big Five',
  route: '/tes-big-five',
  hasilRoute: '/hasil-big-five',
  tabel: { peserta: 'peserta_bigfive', hasil: 'hasil_bigfive' },
  judul: 'Tes Kepribadian Big Five',
  singkat: 'Big Five',
  abbr: 'BIG 5',
  sub: 'Openness · Conscientiousness · Extraversion · Agreeableness · Stabilitas Emosi',
  durasi: '~10 menit',
  intro: 'Mengukur lima dimensi besar kepribadian yang paling banyak diteliti dalam psikologi, dan bagaimana kelimanya tampak dalam cara Anda bekerja.',
  petunjuk: 'Pilih seberapa setuju Anda dengan setiap pernyataan. Jawablah sesuai diri Anda sehari-hari, bukan sesuai yang Anda harapkan.',
  format: LIKERT5,
  warna: '#7c3aed',
  dimensi: {
    O: {
      nama: 'Openness', sub: 'Keterbukaan terhadap Pengalaman', warna: '#7c3aed',
      desk: 'Rasa ingin tahu, keterbukaan pada ide baru, dan kenyamanan dengan perubahan.',
      narasi: {
        tinggi: 'Anda cenderung penasaran, terbuka pada gagasan baru, dan menikmati tantangan yang belum pernah dicoba. Perubahan lebih terasa sebagai peluang daripada ancaman.',
        sedang: 'Anda menyeimbangkan keterbukaan pada hal baru dengan penghargaan pada cara-cara yang sudah terbukti berhasil.',
        rendah: 'Anda cenderung praktis dan menghargai cara kerja yang sudah jelas dan terbukti. Anda lebih nyaman dengan perubahan yang bertahap dan beralasan.',
      },
      kekuatan: ['Kreatif dan cepat menangkap ide baru', 'Mudah beradaptasi dengan perubahan', 'Senang belajar lintas bidang'],
      tantangan: ['Bisa cepat bosan dengan pekerjaan rutin', 'Terkadang memulai banyak hal tanpa menuntaskannya'],
      saran: ['Pasangkan ide-ide baru dengan rencana eksekusi yang konkret', 'Tetapkan prioritas sebelum mengejar peluang berikutnya'],
      karir: ['Desain & kreatif', 'Riset dan pengembangan', 'Strategi & inovasi', 'Konsultan', 'Pemasaran'],
    },
    C: {
      nama: 'Conscientiousness', sub: 'Ketelitian & Kedisiplinan', warna: '#059669',
      desk: 'Keteraturan, tanggung jawab, ketekunan, dan dorongan untuk menuntaskan pekerjaan.',
      narasi: {
        tinggi: 'Anda terorganisasi, dapat diandalkan, dan menjaga standar kerja yang tinggi. Komitmen yang Anda buat biasanya Anda tuntaskan.',
        sedang: 'Anda cukup teratur dan bertanggung jawab, dengan fleksibilitas untuk menyesuaikan rencana bila keadaan berubah.',
        rendah: 'Anda cenderung spontan dan lebih menyukai fleksibilitas daripada rencana yang kaku. Struktur sederhana dapat membantu Anda menuntaskan pekerjaan.',
      },
      kekuatan: ['Andal dan konsisten', 'Teliti terhadap detail', 'Disiplin menjaga tenggat waktu'],
      tantangan: ['Bisa terlalu perfeksionis', 'Kurang nyaman ketika rencana berubah mendadak'],
      saran: ['Bedakan pekerjaan yang butuh kesempurnaan dari yang cukup “selesai dengan baik”', 'Latih fleksibilitas saat prioritas berubah'],
      karir: ['Keuangan & akuntansi', 'Manajemen proyek', 'Operasional', 'Audit & kepatuhan', 'Teknik'],
    },
    E: {
      nama: 'Extraversion', sub: 'Ekstraversi', warna: '#2563eb',
      desk: 'Kecenderungan mendapatkan energi dari interaksi sosial dan aktivitas bersama orang lain.',
      narasi: {
        tinggi: 'Anda bersemangat dalam interaksi sosial, mudah membangun hubungan, dan nyaman menyampaikan pendapat di depan orang lain.',
        sedang: 'Anda nyaman bergaul maupun bekerja sendiri, dan dapat menyesuaikan diri dengan kebutuhan situasi.',
        rendah: 'Anda cenderung reflektif, menikmati ketenangan, dan bekerja paling baik dengan fokus mendalam. Energi Anda pulih saat menyendiri.',
      },
      kekuatan: ['Mudah membangun jejaring', 'Komunikatif dan persuasif', 'Membawa energi positif ke tim'],
      tantangan: ['Bisa kurang sabar dengan pekerjaan yang menuntut fokus panjang', 'Terkadang lebih banyak bicara daripada mendengar'],
      saran: ['Sediakan waktu khusus untuk pekerjaan yang membutuhkan konsentrasi', 'Latih mendengarkan aktif dalam diskusi'],
      karir: ['Penjualan & pengembangan bisnis', 'Hubungan masyarakat', 'Pelatihan', 'Manajemen tim', 'Layanan pelanggan'],
    },
    A: {
      nama: 'Agreeableness', sub: 'Keramahan & Kerja Sama', warna: '#ea580c',
      desk: 'Kepedulian, empati, kepercayaan pada orang lain, dan kecenderungan bekerja sama.',
      narasi: {
        tinggi: 'Anda peduli, empatik, dan mudah bekerja sama. Orang lain cenderung merasa nyaman dan dihargai saat bekerja dengan Anda.',
        sedang: 'Anda kooperatif dan peduli, namun tetap mampu bersikap tegas saat diperlukan.',
        rendah: 'Anda cenderung lugas, kritis, dan objektif. Anda tidak segan menyampaikan ketidaksetujuan demi hasil yang lebih baik.',
      },
      kekuatan: ['Empatik dan suportif', 'Menjaga keharmonisan tim', 'Dipercaya rekan kerja'],
      tantangan: ['Sulit berkata “tidak”', 'Cenderung menghindari konflik yang sebenarnya perlu dihadapi'],
      saran: ['Latih menyampaikan ketidaksetujuan dengan santun namun jelas', 'Tetapkan batas yang sehat terhadap permintaan orang lain'],
      karir: ['Sumber daya manusia', 'Konseling & layanan sosial', 'Pendidikan', 'Kesehatan', 'Layanan pelanggan'],
    },
    N: {
      nama: 'Stabilitas Emosi', sub: 'Ketenangan di Bawah Tekanan', warna: '#db2777',
      desk: 'Kemampuan tetap tenang, tidak mudah cemas, dan mengelola emosi saat menghadapi tekanan.',
      narasi: {
        tinggi: 'Anda cenderung tenang, tidak mudah cemas, dan mampu berpikir jernih saat menghadapi tekanan.',
        sedang: 'Anda umumnya dapat mengelola emosi dengan baik, meskipun situasi yang sangat menekan kadang tetap memengaruhi Anda.',
        rendah: 'Anda cenderung peka terhadap tekanan dan ketidakpastian. Kepekaan ini dapat dikelola dengan strategi pengelolaan stres yang tepat.',
      },
      kekuatan: ['Tenang dalam situasi sulit', 'Mengambil keputusan dengan kepala dingin', 'Menjadi penyeimbang saat tim tertekan'],
      tantangan: ['Bisa tampak kurang menunjukkan emosi', 'Terkadang meremehkan tekanan yang dirasakan orang lain'],
      saran: ['Tetap peka terhadap kondisi emosi rekan kerja', 'Kenali tanda-tanda kelelahan sebelum menumpuk'],
      karir: ['Manajemen krisis', 'Layanan darurat & kesehatan', 'Negosiasi', 'Kepemimpinan', 'Penanganan keluhan'],
    },
  },
  soal: [
    { id: 1,  dim: 'O', rev: false, teks: 'Saya tertarik mencoba ide-ide dan pengalaman baru.' },
    { id: 2,  dim: 'O', rev: false, teks: 'Saya suka merenungkan konsep-konsep yang kompleks dan abstrak.' },
    { id: 3,  dim: 'O', rev: false, teks: 'Saya mudah beradaptasi dengan perubahan di lingkungan kerja.' },
    { id: 4,  dim: 'O', rev: true,  teks: 'Saya lebih suka rutinitas yang sudah terbukti daripada cara baru.' },
    { id: 5,  dim: 'O', rev: false, teks: 'Saya tertarik mempelajari cara kerja dari berbagai bidang.' },
    { id: 6,  dim: 'O', rev: true,  teks: 'Saya lebih nyaman dengan prosedur yang sudah ada daripada berinovasi.' },
    { id: 7,  dim: 'O', rev: false, teks: 'Saya memiliki rasa ingin tahu yang besar terhadap hal-hal baru.' },
    { id: 8,  dim: 'O', rev: true,  teks: 'Saya lebih suka mengerjakan tugas yang familiar daripada yang baru.' },
    { id: 9,  dim: 'C', rev: false, teks: 'Saya selalu menyelesaikan tugas sebelum beralih ke pekerjaan lain.' },
    { id: 10, dim: 'C', rev: false, teks: 'Saya sangat memperhatikan detail dalam setiap pekerjaan.' },
    { id: 11, dim: 'C', rev: false, teks: 'Saya membuat rencana dan mengikutinya dengan disiplin.' },
    { id: 12, dim: 'C', rev: true,  teks: 'Saya terkadang meninggalkan pekerjaan sebelum benar-benar selesai.' },
    { id: 13, dim: 'C', rev: false, teks: 'Saya menjaga standar kualitas yang tinggi dalam setiap tugas.' },
    { id: 14, dim: 'C', rev: true,  teks: 'Saya sering lupa menindaklanjuti komitmen yang sudah dibuat.' },
    { id: 15, dim: 'C', rev: false, teks: 'Saya bekerja keras meski tidak ada yang mengawasi.' },
    { id: 16, dim: 'C', rev: true,  teks: 'Saya cenderung menunda pekerjaan yang terasa berat.' },
    { id: 17, dim: 'E', rev: false, teks: 'Saya merasa bersemangat setelah berinteraksi dengan banyak orang.' },
    { id: 18, dim: 'E', rev: false, teks: 'Saya mudah memulai percakapan dengan orang yang baru saya kenal.' },
    { id: 19, dim: 'E', rev: true,  teks: 'Saya lebih suka bekerja sendiri daripada dalam kelompok besar.' },
    { id: 20, dim: 'E', rev: false, teks: 'Saya aktif berbicara dan menyampaikan pendapat dalam rapat.' },
    { id: 21, dim: 'E', rev: true,  teks: 'Saya merasa lelah setelah terlalu banyak berinteraksi sosial.' },
    { id: 22, dim: 'E', rev: false, teks: 'Saya mudah menjadi pusat perhatian dalam situasi sosial.' },
    { id: 23, dim: 'E', rev: true,  teks: 'Saya lebih suka lingkungan kerja yang tenang dan tidak ramai.' },
    { id: 24, dim: 'E', rev: false, teks: 'Saya dengan mudah mengekspresikan perasaan dan pendapat saya.' },
    { id: 25, dim: 'A', rev: false, teks: 'Saya selalu berusaha memahami sudut pandang orang lain sebelum menghakimi.' },
    { id: 26, dim: 'A', rev: false, teks: 'Saya mudah memaafkan orang yang berbuat salah kepada saya.' },
    { id: 27, dim: 'A', rev: true,  teks: 'Saya terkadang memanfaatkan orang lain untuk mendapatkan apa yang saya inginkan.' },
    { id: 28, dim: 'A', rev: false, teks: 'Saya dengan tulus peduli terhadap kesejahteraan rekan kerja.' },
    { id: 29, dim: 'A', rev: true,  teks: 'Saya sering berselisih dengan orang lain tentang cara melakukan sesuatu.' },
    { id: 30, dim: 'A', rev: false, teks: 'Saya berusaha menghindari konflik dan mencari solusi bersama.' },
    { id: 31, dim: 'A', rev: true,  teks: 'Saya tidak segan menyampaikan ketidaksetujuan secara langsung.' },
    { id: 32, dim: 'A', rev: false, teks: 'Saya senang membantu rekan kerja meskipun tidak diminta.' },
    { id: 33, dim: 'N', rev: true,  teks: 'Saya mudah merasa cemas menghadapi situasi yang tidak pasti.' },
    { id: 34, dim: 'N', rev: true,  teks: 'Saya sering merasa tertekan ketika banyak pekerjaan menumpuk.' },
    { id: 35, dim: 'N', rev: false, teks: 'Saya tetap tenang bahkan dalam situasi yang sangat menantang.' },
    { id: 36, dim: 'N', rev: true,  teks: 'Saya mudah merasa frustrasi ketika sesuatu tidak berjalan sesuai rencana.' },
    { id: 37, dim: 'N', rev: false, teks: 'Saya jarang merasa khawatir berlebihan tentang masa depan pekerjaan.' },
    { id: 38, dim: 'N', rev: true,  teks: 'Saya terkadang bereaksi berlebihan terhadap masalah kecil.' },
    { id: 39, dim: 'N', rev: false, teks: 'Saya dapat mengendalikan emosi saya dengan baik di tempat kerja.' },
    { id: 40, dim: 'N', rev: true,  teks: 'Saya sering merasa tidak yakin dengan kemampuan diri sendiri.' },
  ],
  hitung(jawaban) {
    const skor = {}
    for (const d of Object.keys(this.dimensi)) {
      const items = this.soal.filter(s => s.dim === d)
      const sum = items.reduce((t, s) => t + (s.rev ? 6 - jawaban[s.id] : jawaban[s.id]), 0)
      skor[d] = persen(sum, items.length, 5, 1)
    }
    return skor
  },
  ringkasan(skor) {
    const urut = Object.entries(skor).sort((a, b) => b[1] - a[1])
    return `Menonjol: ${this.dimensi[urut[0][0]].nama}, ${this.dimensi[urut[1][0]].nama}`
  },
}

/* ──────────────────────────────────────────────────────────────────
   2. RIASEC
   ────────────────────────────────────────────────────────────────── */
const RIASEC = {
  kode: 'riasec',
  testType: 'RIASEC',
  route: '/tes-riasec',
  hasilRoute: '/hasil-riasec',
  tabel: { peserta: 'peserta_riasec', hasil: 'hasil_riasec' },
  judul: 'Tes Minat Karier RIASEC',
  singkat: 'RIASEC',
  abbr: 'RIASEC',
  sub: 'Realistic · Investigative · Artistic · Social · Enterprising · Conventional',
  durasi: '~8 menit',
  intro: 'Memetakan minat kerja Anda ke dalam enam tipe minat karier (teori Holland), lalu menyusun kode minat tiga huruf sebagai arah eksplorasi karier.',
  petunjuk: 'Jawab “Ya” bila pernyataan menggambarkan minat atau kesukaan Anda, dan “Tidak” bila tidak. Tidak ada jawaban benar atau salah.',
  format: YA_TIDAK,
  warna: '#d97706',
  dimensi: {
    R: {
      nama: 'Realistic', sub: 'Praktis & Teknis', warna: '#ea580c',
      desk: 'Minat pada pekerjaan praktis, teknis, dan nyata: alat, mesin, bangunan, atau kegiatan lapangan.',
      narasi: {
        tinggi: 'Anda tertarik pada pekerjaan yang konkret dan hasilnya terlihat langsung, seperti merakit, memperbaiki, atau bekerja di lapangan.',
        sedang: 'Anda cukup tertarik pada kegiatan praktis, terutama bila dipadukan dengan minat Anda yang lain.',
        rendah: 'Pekerjaan fisik atau teknis bukan sumber minat utama Anda.',
      },
      kekuatan: ['Praktis dan berorientasi hasil nyata', 'Terampil menggunakan alat atau teknologi', 'Tangguh di lapangan'],
      karir: ['Teknik mesin, sipil, atau elektro', 'Teknisi & perawatan', 'Pertanian & kehutanan', 'Logistik', 'Konstruksi', 'Keselamatan kerja'],
    },
    I: {
      nama: 'Investigative', sub: 'Analitis & Ilmiah', warna: '#2563eb',
      desk: 'Minat pada kegiatan menganalisis, meneliti, dan memecahkan masalah dengan logika.',
      narasi: {
        tinggi: 'Anda menikmati memahami cara sesuatu bekerja, menganalisis data, dan memecahkan masalah yang menantang secara logis.',
        sedang: 'Anda tertarik pada analisis dan pemecahan masalah, tanpa harus menjadikannya inti pekerjaan Anda.',
        rendah: 'Kegiatan riset dan analisis mendalam bukan sumber minat utama Anda.',
      },
      kekuatan: ['Berpikir analitis', 'Rasa ingin tahu intelektual', 'Teliti dalam menelusuri masalah'],
      karir: ['Analis data', 'Peneliti', 'Teknologi informasi & rekayasa perangkat lunak', 'Kesehatan & farmasi', 'Analis keuangan', 'Sains terapan'],
    },
    A: {
      nama: 'Artistic', sub: 'Kreatif & Ekspresif', warna: '#db2777',
      desk: 'Minat pada kegiatan kreatif, ekspresif, dan orisinal: seni, desain, tulisan, atau pertunjukan.',
      narasi: {
        tinggi: 'Anda tertarik mengekspresikan ide secara kreatif dan menghargai kebebasan untuk berkarya dengan cara Anda sendiri.',
        sedang: 'Anda memiliki sisi kreatif yang dapat dimanfaatkan dalam berbagai jenis pekerjaan.',
        rendah: 'Kegiatan seni dan ekspresi kreatif bukan sumber minat utama Anda.',
      },
      kekuatan: ['Imajinatif dan orisinal', 'Peka terhadap estetika', 'Ekspresif dalam menyampaikan gagasan'],
      karir: ['Desain grafis & produk', 'Penulisan & konten', 'Periklanan & kreatif', 'Arsitektur', 'Fotografi & videografi', 'Seni pertunjukan'],
    },
    S: {
      nama: 'Social', sub: 'Membantu & Mengajar', warna: '#059669',
      desk: 'Minat pada kegiatan membantu, mengajar, melayani, dan mengembangkan orang lain.',
      narasi: {
        tinggi: 'Anda tertarik membantu, membimbing, dan melayani orang lain, serta merasa puas ketika dapat membuat perbedaan bagi mereka.',
        sedang: 'Anda menikmati berinteraksi dan membantu orang lain sebagai bagian dari pekerjaan.',
        rendah: 'Pekerjaan yang berpusat pada melayani atau mengajar orang bukan sumber minat utama Anda.',
      },
      kekuatan: ['Empatik dan suportif', 'Pandai menjelaskan', 'Senang bekerja sama'],
      karir: ['Pendidikan & pelatihan', 'Konseling & psikologi', 'Sumber daya manusia', 'Kesehatan & keperawatan', 'Layanan pelanggan', 'Pekerjaan sosial'],
    },
    E: {
      nama: 'Enterprising', sub: 'Memimpin & Memengaruhi', warna: '#d97706',
      desk: 'Minat pada kegiatan memimpin, memengaruhi, bernegosiasi, dan mengejar target.',
      narasi: {
        tinggi: 'Anda tertarik memimpin, meyakinkan orang lain, dan mengejar target yang menantang. Anda nyaman mengambil inisiatif.',
        sedang: 'Anda cukup tertarik pada peran yang melibatkan pengaruh dan kepemimpinan.',
        rendah: 'Peran yang menuntut memimpin atau menjual bukan sumber minat utama Anda.',
      },
      kekuatan: ['Persuasif', 'Berani mengambil inisiatif', 'Berorientasi target'],
      karir: ['Penjualan & pengembangan bisnis', 'Kewirausahaan', 'Manajemen', 'Pemasaran', 'Hukum & advokasi', 'Konsultan bisnis'],
    },
    C: {
      nama: 'Conventional', sub: 'Teratur & Sistematis', warna: '#7c3aed',
      desk: 'Minat pada kegiatan yang teratur dan sistematis: data, dokumen, prosedur, dan ketelitian.',
      narasi: {
        tinggi: 'Anda tertarik pada pekerjaan yang terstruktur, rapi, dan jelas prosedurnya, serta menghargai akurasi.',
        sedang: 'Anda cukup nyaman dengan pekerjaan administratif dan terstruktur bila diperlukan.',
        rendah: 'Pekerjaan administratif dan rutin bukan sumber minat utama Anda.',
      },
      kekuatan: ['Teliti dan akurat', 'Terorganisasi', 'Andal menjalankan prosedur'],
      karir: ['Akuntansi & keuangan', 'Administrasi & sekretariat', 'Perpajakan & kepatuhan', 'Perbankan', 'Pengelolaan data', 'Pengadaan'],
    },
  },
  soal: [
    { id: 1,  dim: 'R', teks: 'Saya suka bekerja dengan peralatan, kendaraan, atau mesin.' },
    { id: 2,  dim: 'I', teks: 'Saya suka mengerjakan teka-teki logika atau puzzle analitis.' },
    // Diganti dari versi asli ("bekerja mandiri tanpa pengawasan") yang tidak
    // mengukur minat artistik.
    { id: 3,  dim: 'A', teks: 'Saya suka menciptakan sesuatu yang orisinal dengan cara saya sendiri.' },
    { id: 4,  dim: 'S', teks: 'Saya suka bekerja dalam tim dan berkolaborasi.' },
    { id: 5,  dim: 'E', teks: 'Saya ambisius dan suka menetapkan target untuk diri sendiri.' },
    { id: 6,  dim: 'C', teks: 'Saya suka mengorganisir file, dokumen, atau data dengan rapi.' },
    { id: 7,  dim: 'R', teks: 'Saya suka membangun atau membuat sesuatu secara fisik.' },
    { id: 8,  dim: 'A', teks: 'Saya tertarik pada seni, desain, atau ekspresi kreatif.' },
    { id: 9,  dim: 'C', teks: 'Saya lebih nyaman ketika ada instruksi dan prosedur yang jelas.' },
    { id: 10, dim: 'E', teks: 'Saya suka memengaruhi atau meyakinkan orang lain.' },
    { id: 11, dim: 'I', teks: 'Saya suka melakukan eksperimen, uji coba, atau penelitian.' },
    { id: 12, dim: 'S', teks: 'Saya suka mengajar, melatih, atau membimbing orang lain.' },
    { id: 13, dim: 'S', teks: 'Saya suka membantu orang lain memecahkan masalah mereka.' },
    { id: 14, dim: 'R', teks: 'Saya lebih suka pekerjaan yang menggunakan keterampilan fisik.' },
    { id: 15, dim: 'C', teks: 'Saya tidak keberatan bekerja di kantor mengelola berkas dan laporan.' },
    { id: 16, dim: 'E', teks: 'Saya suka menjual, bernegosiasi, atau membujuk orang.' },
    { id: 17, dim: 'A', teks: 'Saya menikmati kegiatan menulis, mendongeng, atau bercerita.' },
    { id: 18, dim: 'I', teks: 'Saya menikmati mempelajari sains, teknologi, atau data.' },
    { id: 19, dim: 'E', teks: 'Saya cepat mengambil tanggung jawab dan memimpin situasi baru.' },
    { id: 20, dim: 'S', teks: 'Saya tertarik pada pekerjaan sosial atau pelayanan masyarakat.' },
    { id: 21, dim: 'I', teks: 'Saya suka mencari tahu bagaimana sesuatu bekerja secara mendalam.' },
    { id: 22, dim: 'R', teks: 'Saya suka merakit, memperbaiki, atau menyusun peralatan.' },
    { id: 23, dim: 'A', teks: 'Saya menganggap diri saya sebagai orang yang kreatif dan inovatif.' },
    { id: 24, dim: 'C', teks: 'Saya memperhatikan detail dan ketelitian dalam setiap pekerjaan.' },
    { id: 25, dim: 'C', teks: 'Saya suka melakukan dokumentasi, pelaporan, atau pengarsipan.' },
    { id: 26, dim: 'I', teks: 'Saya suka menganalisis masalah atau situasi secara sistematis.' },
    { id: 27, dim: 'A', teks: 'Saya suka tampil atau berkarya di hadapan orang lain.' },
    { id: 28, dim: 'S', teks: 'Saya menikmati memahami perspektif dan budaya orang yang berbeda.' },
    { id: 29, dim: 'E', teks: 'Saya ingin memimpin tim, proyek, atau organisasi.' },
    { id: 30, dim: 'R', teks: 'Saya lebih suka pekerjaan yang bersifat praktis dan langsung.' },
    { id: 31, dim: 'A', teks: 'Saya suka mengekspresikan diri melalui karya kreatif.' },
    { id: 32, dim: 'R', teks: 'Saya adalah orang yang praktis dan berorientasi pada tindakan.' },
    { id: 33, dim: 'I', teks: 'Saya suka bekerja dengan angka, grafik, atau tabel data.' },
    { id: 34, dim: 'S', teks: 'Saya suka berdiskusi dan bertukar pendapat tentang berbagai isu.' },
    { id: 35, dim: 'C', teks: 'Saya pandai menyimpan catatan dan menjaga akurasi dokumentasi.' },
    { id: 36, dim: 'E', teks: 'Saya suka memimpin dan memberikan arahan kepada orang lain.' },
    { id: 37, dim: 'R', teks: 'Saya lebih suka bekerja di lapangan daripada di dalam kantor.' },
    { id: 38, dim: 'C', teks: 'Saya ingin bekerja di lingkungan kantor yang terstruktur.' },
    { id: 39, dim: 'I', teks: 'Saya suka memecahkan masalah menggunakan logika dan analisis.' },
    { id: 40, dim: 'S', teks: 'Saya senang membantu orang lain dan berkontribusi untuk komunitas.' },
    { id: 41, dim: 'A', teks: 'Saya suka menuangkan ide dalam bentuk visual, tulisan, atau produk.' },
    { id: 42, dim: 'E', teks: 'Saya suka memberi presentasi atau berbicara di depan banyak orang.' },
  ],
  hitung(jawaban) {
    const skor = {}
    for (const d of Object.keys(this.dimensi)) {
      const items = this.soal.filter(s => s.dim === d)
      skor[d] = persen(items.reduce((t, s) => t + jawaban[s.id], 0), items.length, 1)
    }
    return skor
  },
  /** Kode Holland tiga huruf (urutan skor tertinggi). */
  kodeMinat(skor) {
    return Object.entries(skor).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k]) => k).join('')
  },
  ringkasan(skor) {
    return `Kode minat: ${this.kodeMinat(skor)}`
  },
}

/* ──────────────────────────────────────────────────────────────────
   3. RESILIENSI
   ────────────────────────────────────────────────────────────────── */
const RESILIENSI = {
  kode: 'resiliensi',
  testType: 'Resiliensi',
  route: '/tes-resiliensi',
  hasilRoute: '/hasil-resiliensi',
  tabel: { peserta: 'peserta_resiliensi', hasil: 'hasil_resiliensi' },
  judul: 'Tes Resiliensi Kerja',
  singkat: 'Resiliensi',
  abbr: 'RESIL',
  sub: 'Ketangguhan · Adaptabilitas · Pemulihan · Keteguhan Prinsip',
  durasi: '~6 menit',
  intro: 'Mengukur seberapa tangguh Anda menghadapi tekanan, perubahan, kegagalan, dan godaan untuk berkompromi dengan prinsip di tempat kerja.',
  petunjuk: 'Pilih seberapa setuju Anda dengan setiap pernyataan, berdasarkan pengalaman kerja Anda selama ini.',
  format: LIKERT5,
  warna: '#dc2626',
  dimensi: {
    KT: {
      nama: 'Ketangguhan', sub: 'Bertahan di Bawah Tekanan', warna: '#dc2626',
      desk: 'Kemampuan tetap produktif dan fokus ketika beban kerja dan tekanan tinggi.',
      narasi: {
        tinggi: 'Anda mampu menjaga produktivitas dan fokus meskipun beban kerja dan tekanan sedang tinggi.',
        sedang: 'Anda cukup tangguh menghadapi tekanan, meskipun tekanan yang berkepanjangan dapat mulai memengaruhi kinerja Anda.',
        rendah: 'Tekanan kerja yang tinggi cenderung cepat menguras energi dan fokus Anda.',
      },
      saran: ['Pecah pekerjaan besar menjadi bagian kecil yang dapat dituntaskan satu per satu', 'Jadwalkan jeda singkat untuk memulihkan fokus', 'Komunikasikan beban kerja kepada atasan sebelum menumpuk'],
    },
    AD: {
      nama: 'Adaptabilitas', sub: 'Luwes Menghadapi Perubahan', warna: '#2563eb',
      desk: 'Kemampuan menyesuaikan diri dengan perubahan aturan, cara kerja, dan situasi yang tidak menentu.',
      narasi: {
        tinggi: 'Anda cepat menyesuaikan diri dengan perubahan dan memandangnya sebagai peluang.',
        sedang: 'Anda dapat beradaptasi dengan perubahan, terutama bila alasan dan arahnya jelas.',
        rendah: 'Perubahan mendadak cenderung terasa berat dan membutuhkan waktu lebih lama bagi Anda untuk menyesuaikan diri.',
      },
      saran: ['Cari tahu alasan di balik perubahan agar lebih mudah menerimanya', 'Mulai dari satu kebiasaan kerja baru yang kecil', 'Belajar dari rekan yang cepat beradaptasi'],
    },
    PE: {
      nama: 'Pemulihan', sub: 'Bangkit Setelah Kegagalan', warna: '#059669',
      desk: 'Kemampuan bangkit, belajar, dan kembali termotivasi setelah kegagalan atau kekecewaan.',
      narasi: {
        tinggi: 'Anda cepat bangkit setelah kegagalan dan mampu mengambil pelajaran tanpa terlalu lama terpuruk.',
        sedang: 'Anda dapat pulih dari kegagalan, meskipun kekecewaan tertentu bisa bertahan cukup lama.',
        rendah: 'Kegagalan atau umpan balik yang mengecewakan cenderung membekas cukup lama bagi Anda.',
      },
      saran: ['Tuliskan pelajaran dari setiap kegagalan, bukan hanya penyebabnya', 'Bicarakan kekecewaan dengan orang yang Anda percaya', 'Pisahkan penilaian atas hasil kerja dari penilaian atas diri sendiri'],
    },
    KP: {
      nama: 'Keteguhan Prinsip', sub: 'Tetap Etis Saat Tertekan', warna: '#d97706',
      desk: 'Kemampuan tetap jujur, adil, dan memegang prinsip meskipun ada tekanan untuk berkompromi.',
      narasi: {
        tinggi: 'Anda teguh memegang prinsip dan tetap bersikap etis meskipun menghadapi tekanan.',
        sedang: 'Anda umumnya memegang prinsip, namun tekanan yang kuat dapat membuat Anda ragu.',
        rendah: 'Dalam situasi tertekan, Anda mungkin merasa sulit mempertahankan prinsip yang Anda yakini.',
      },
      saran: ['Rumuskan nilai-nilai kerja pribadi yang tidak bisa ditawar', 'Siapkan cara menolak yang santun untuk permintaan yang tidak pantas', 'Cari mentor yang dapat menjadi teman diskusi saat menghadapi dilema'],
    },
  },
  soal: [
    { id: 1,  dim: 'KT', teks: 'Saya tetap produktif meskipun beban kerja sangat tinggi.' },
    { id: 2,  dim: 'KT', teks: 'Saya dapat bekerja efektif meskipun berada dalam kondisi penuh tekanan.' },
    { id: 3,  dim: 'KT', teks: 'Saya tidak mudah menyerah ketika menghadapi tugas yang sangat berat.' },
    { id: 4,  dim: 'KT', teks: 'Tekanan dari atasan atau situasi tidak mudah menggoyahkan fokus saya.' },
    { id: 5,  dim: 'KT', teks: 'Saya tetap fokus pada pekerjaan meski ada gangguan yang datang berulang.' },
    { id: 6,  dim: 'KT', teks: 'Saya mempertahankan kinerja baik bahkan ketika dukungan terbatas.' },
    { id: 7,  dim: 'AD', teks: 'Saya cepat menyesuaikan diri ketika aturan atau prosedur berubah.' },
    { id: 8,  dim: 'AD', teks: 'Saya terbuka terhadap cara kerja baru yang berbeda dari kebiasaan saya.' },
    { id: 9,  dim: 'AD', teks: 'Saya dapat beralih ke tugas yang berbeda tanpa kehilangan efektivitas.' },
    { id: 10, dim: 'AD', teks: 'Saya melihat perubahan organisasi sebagai peluang, bukan ancaman.' },
    { id: 11, dim: 'AD', teks: 'Saya mampu bekerja secara efektif meski situasi tidak menentu.' },
    { id: 12, dim: 'AD', teks: 'Saya dengan cepat mempelajari keterampilan baru yang dibutuhkan tugas.' },
    { id: 13, dim: 'PE', teks: 'Setelah mengalami kegagalan, saya cepat bangkit dan mencoba lagi.' },
    { id: 14, dim: 'PE', teks: 'Saya dapat melepaskan pikiran negatif tentang kesalahan masa lalu.' },
    { id: 15, dim: 'PE', teks: 'Saya belajar dari kegagalan tanpa terlalu lama menyesalinya.' },
    { id: 16, dim: 'PE', teks: 'Saya kembali termotivasi setelah mendapat umpan balik yang mengecewakan.' },
    { id: 17, dim: 'PE', teks: 'Saya tidak membawa beban masalah pekerjaan ke kehidupan pribadi.' },
    { id: 18, dim: 'PE', teks: 'Saya pulih cepat dari konflik atau ketegangan dengan rekan kerja.' },
    { id: 19, dim: 'KP', teks: 'Saya tetap menjaga kejujuran meskipun berada dalam situasi yang menekan.' },
    { id: 20, dim: 'KP', teks: 'Saya menolak berkompromi atas prinsip kerja meski ada tekanan dari berbagai pihak.' },
    { id: 21, dim: 'KP', teks: 'Saya berani menyampaikan pelanggaran meskipun ada risiko bagi diri sendiri.' },
    { id: 22, dim: 'KP', teks: 'Saya tidak mengubah perilaku etis meski tidak ada yang mengawasi.' },
    { id: 23, dim: 'KP', teks: 'Saya tetap bersikap adil dan objektif meski ada tekanan untuk berpihak.' },
    { id: 24, dim: 'KP', teks: 'Saya mampu menolak tawaran atau imbalan yang tidak pantas meski sulit dihindari.' },
  ],
  hitung(jawaban) {
    const skor = {}
    for (const d of Object.keys(this.dimensi)) {
      const items = this.soal.filter(s => s.dim === d)
      skor[d] = persen(items.reduce((t, s) => t + jawaban[s.id], 0), items.length, 5, 1)
    }
    return skor
  },
  total(skor) {
    const v = Object.values(skor)
    return Math.round(v.reduce((a, b) => a + b, 0) / v.length)
  },
  ringkasan(skor) {
    return `Indeks resiliensi: ${this.total(skor)}`
  },
}

/* ──────────────────────────────────────────────────────────────────
   4. PERAN DALAM TIM
   ────────────────────────────────────────────────────────────────── */
const PERAN_TIM = {
  kode: 'perantim',
  testType: 'Peran Tim',
  route: '/tes-peran-tim',
  hasilRoute: '/hasil-peran-tim',
  tabel: { peserta: 'peserta_peran_tim', hasil: 'hasil_peran_tim' },
  judul: 'Tes Peran dalam Tim',
  singkat: 'Peran Tim',
  abbr: 'TIM',
  sub: 'Sembilan peran khas yang Anda ambil saat bekerja dalam tim',
  durasi: '~8 menit',
  intro: 'Mengidentifikasi peran yang paling alami Anda jalankan saat bekerja dalam tim, sehingga Anda dan tim dapat menempatkan kontribusi secara tepat.',
  petunjuk: 'Pilih seberapa setuju Anda dengan setiap pernyataan, berdasarkan cara Anda biasanya berperan saat bekerja bersama tim.',
  format: LIKERT5,
  warna: '#0284c7',
  dimensi: {
    GG: {
      nama: 'Penggagas', sub: 'Pemikir Kreatif', warna: '#7c3aed',
      desk: 'Memunculkan ide orisinal dan solusi kreatif untuk masalah yang sulit.',
      narasi: { tinggi: 'Anda sering menjadi sumber ide segar dan solusi tak terduga dalam tim.', sedang: 'Sesekali Anda menyumbangkan ide kreatif, terutama saat tim membutuhkan sudut pandang baru.', rendah: 'Memunculkan ide orisinal bukan peran utama Anda dalam tim.' },
      kekuatan: ['Imajinatif', 'Memecahkan masalah sulit dengan cara baru'], tantangan: ['Bisa kurang memperhatikan detail pelaksanaan', 'Kurang sabar dengan hal teknis yang rutin'],
      saran: ['Pasangkan diri dengan rekan yang kuat di eksekusi', 'Uji ide Anda dengan pertanyaan “bagaimana menjalankannya?”'],
    },
    PJ: {
      nama: 'Penjelajah Peluang', sub: 'Penghubung ke Luar', warna: '#ea580c',
      desk: 'Membangun jejaring, mencari peluang, dan membawa informasi dari luar tim.',
      narasi: { tinggi: 'Anda pandai membangun jejaring dan sering membawa peluang serta informasi baru ke dalam tim.', sedang: 'Anda cukup aktif menjalin hubungan dengan pihak di luar tim bila dibutuhkan.', rendah: 'Mencari peluang dan kontak di luar tim bukan peran utama Anda.' },
      kekuatan: ['Antusias dan mudah bergaul', 'Membuka peluang baru'], tantangan: ['Antusiasme bisa cepat menurun setelah awal', 'Kurang menuntaskan tindak lanjut'],
      saran: ['Catat tindak lanjut setiap kontak atau peluang baru', 'Libatkan rekan yang teliti untuk mengawal peluang sampai selesai'],
    },
    KO: {
      nama: 'Koordinator', sub: 'Penyelaras Tim', warna: '#2563eb',
      desk: 'Menyelaraskan tujuan, mendelegasikan tugas, dan mengarahkan keputusan bersama.',
      narasi: { tinggi: 'Anda cenderung mengambil peran menyelaraskan tujuan, membagi tugas sesuai kekuatan anggota, dan mengarahkan keputusan bersama.', sedang: 'Anda dapat mengoordinasikan tim saat diperlukan.', rendah: 'Mengoordinasikan dan mengarahkan tim bukan peran utama Anda.' },
      kekuatan: ['Tenang dan jelas mengarahkan', 'Menempatkan orang pada tugas yang tepat'], tantangan: ['Bisa terlalu banyak mendelegasikan', 'Terkesan menjaga jarak dari pekerjaan teknis'],
      saran: ['Pastikan delegasi disertai dukungan yang cukup', 'Sesekali terlibat langsung dalam pekerjaan tim'],
    },
    PD: {
      nama: 'Pendorong', sub: 'Penggerak Kemajuan', warna: '#dc2626',
      desk: 'Mendorong tim bergerak cepat, menghadapi hambatan, dan mencapai target.',
      narasi: { tinggi: 'Anda mendorong tim untuk bergerak cepat dan tidak segan menghadapi hambatan demi mencapai target.', sedang: 'Anda dapat menjadi penggerak saat tim mulai kehilangan momentum.', rendah: 'Mendesak dan mendorong kecepatan tim bukan peran utama Anda.' },
      kekuatan: ['Energik dan berani', 'Menjaga momentum tim'], tantangan: ['Bisa terkesan menekan rekan', 'Kurang sabar terhadap proses yang lambat'],
      saran: ['Imbangi dorongan dengan perhatian pada kondisi rekan', 'Jelaskan alasan di balik target agar tim ikut terdorong'],
    },
    PN: {
      nama: 'Penilai', sub: 'Evaluator Objektif', warna: '#059669',
      desk: 'Menimbang pilihan secara cermat dan objektif sebelum keputusan diambil.',
      narasi: { tinggi: 'Anda cenderung menimbang pilihan secara cermat dan objektif, serta jeli melihat kelemahan rencana.', sedang: 'Anda cukup kritis dalam menilai ide dan rencana tim.', rendah: 'Mengevaluasi dan mengkritisi rencana secara mendalam bukan peran utama Anda.' },
      kekuatan: ['Objektif dan analitis', 'Mencegah keputusan tergesa-gesa'], tantangan: ['Bisa terkesan terlalu kritis', 'Kurang mampu membangkitkan semangat tim'],
      saran: ['Sampaikan kritik bersama alternatif solusinya', 'Akui sisi baik ide sebelum menyoroti kelemahannya'],
    },
    PR: {
      nama: 'Perekat Tim', sub: 'Penjaga Harmoni', warna: '#d97706',
      desk: 'Menjaga keharmonisan, kekompakan, dan semangat anggota tim.',
      narasi: { tinggi: 'Anda peka terhadap perasaan rekan dan berperan menjaga keharmonisan serta semangat tim.', sedang: 'Anda ikut menjaga suasana tim tetap positif.', rendah: 'Menjaga harmoni dan perasaan anggota tim bukan peran utama Anda.' },
      kekuatan: ['Peka dan suportif', 'Meredam ketegangan'], tantangan: ['Sulit mengambil sikap saat ada perbedaan tajam', 'Cenderung mengalah'],
      saran: ['Latih menyampaikan pendapat pribadi dengan tegas', 'Bedakan menjaga harmoni dari menghindari keputusan sulit'],
    },
    PL: {
      nama: 'Pelaksana', sub: 'Pengubah Rencana Menjadi Aksi', warna: '#0284c7',
      desk: 'Mengubah keputusan menjadi langkah kerja yang jelas dan menjalankannya secara konsisten.',
      narasi: { tinggi: 'Anda andal mengubah rencana menjadi langkah kerja yang jelas dan menjalankannya secara konsisten.', sedang: 'Anda dapat diandalkan untuk menjalankan rencana yang sudah disepakati.', rendah: 'Menyusun dan menjalankan langkah teknis secara rutin bukan peran utama Anda.' },
      kekuatan: ['Disiplin dan dapat diandalkan', 'Praktis dan terorganisasi'], tantangan: ['Kurang luwes terhadap ide yang belum teruji', 'Lambat menanggapi perubahan rencana'],
      saran: ['Beri ruang untuk mencoba cara baru secara terkendali', 'Tinjau rencana secara berkala bersama tim'],
    },
    PS: {
      nama: 'Penyempurna', sub: 'Penjaga Kualitas', warna: '#db2777',
      desk: 'Memeriksa detail, menjaga kualitas, dan memastikan pekerjaan tuntas tepat waktu.',
      narasi: { tinggi: 'Anda teliti memeriksa detail dan memastikan pekerjaan tim selesai dengan kualitas baik dan tepat waktu.', sedang: 'Anda cukup memperhatikan kualitas dan ketepatan waktu pekerjaan tim.', rendah: 'Memeriksa detail dan menyempurnakan pekerjaan bukan peran utama Anda.' },
      kekuatan: ['Teliti dan cermat', 'Menjaga standar kualitas'], tantangan: ['Bisa cemas berlebihan terhadap kesalahan kecil', 'Sulit mendelegasikan'],
      saran: ['Tetapkan batas “cukup baik” untuk pekerjaan yang tidak kritis', 'Percayakan sebagian pemeriksaan kepada rekan'],
    },
    AH: {
      nama: 'Ahli', sub: 'Sumber Keahlian Khusus', warna: '#16a34a',
      desk: 'Menyumbangkan pengetahuan dan keahlian teknis yang mendalam di bidang tertentu.',
      narasi: { tinggi: 'Anda menjadi rujukan tim untuk keahlian dan pengetahuan mendalam di bidang tertentu.', sedang: 'Anda memiliki keahlian khusus yang Anda sumbangkan saat dibutuhkan.', rendah: 'Menjadi rujukan keahlian teknis khusus bukan peran utama Anda saat ini.' },
      kekuatan: ['Pengetahuan mendalam', 'Rujukan teknis yang dipercaya'], tantangan: ['Cenderung fokus sempit pada bidangnya', 'Kurang memperhatikan gambaran besar'],
      saran: ['Hubungkan keahlian Anda dengan tujuan tim secara keseluruhan', 'Bagikan pengetahuan agar tim tidak bergantung pada satu orang'],
    },
  },
  soal: [
    { id: 1,  dim: 'GG', teks: 'Saya sering mengusulkan ide-ide segar yang berbeda dari kebiasaan tim.' },
    { id: 2,  dim: 'GG', teks: 'Saya dapat menemukan solusi kreatif untuk masalah yang tampak sulit.' },
    { id: 3,  dim: 'GG', teks: 'Saya lebih suka memikirkan konsep besar daripada detail teknis.' },
    { id: 4,  dim: 'GG', teks: 'Pendekatan saya dalam memecahkan masalah sering kali tidak terduga.' },
    { id: 5,  dim: 'PJ', teks: 'Saya mudah membangun jaringan dengan orang-orang di luar tim.' },
    { id: 6,  dim: 'PJ', teks: 'Saya antusias mengeksplorasi peluang dan kemungkinan baru.' },
    { id: 7,  dim: 'PJ', teks: 'Saya pandai menghidupkan kembali proyek yang kehilangan momentum.' },
    { id: 8,  dim: 'PJ', teks: 'Saya sering membawa informasi atau kontak berguna dari luar tim.' },
    { id: 9,  dim: 'KO', teks: 'Saya pandai mendelegasikan tugas sesuai kemampuan masing-masing orang.' },
    { id: 10, dim: 'KO', teks: 'Saya memastikan setiap anggota tim berkontribusi secara optimal.' },
    { id: 11, dim: 'KO', teks: 'Saya membantu tim tetap fokus pada tujuan utama yang ingin dicapai.' },
    { id: 12, dim: 'KO', teks: 'Saya mampu menyatukan berbagai pendapat dan mengarahkan keputusan bersama.' },
    { id: 13, dim: 'PD', teks: 'Saya mendorong tim untuk bertindak cepat dan melampaui target.' },
    { id: 14, dim: 'PD', teks: 'Saya tidak segan menghadapi hambatan atau konflik demi kemajuan tim.' },
    { id: 15, dim: 'PD', teks: 'Saya merasa frustrasi ketika tim bekerja terlalu lambat atau tidak tegas.' },
    { id: 16, dim: 'PD', teks: 'Saya terus mendorong perubahan meski mendapat penolakan dari sekitar.' },
    { id: 17, dim: 'PN', teks: 'Saya mengevaluasi pilihan secara cermat sebelum mengambil keputusan.' },
    { id: 18, dim: 'PN', teks: 'Saya jarang terbawa emosi saat menilai suatu situasi atau ide.' },
    { id: 19, dim: 'PN', teks: 'Saya mampu melihat kelemahan dalam rencana yang tampaknya sudah baik.' },
    { id: 20, dim: 'PN', teks: 'Saya lebih memilih keputusan berbasis data daripada intuisi semata.' },
    { id: 21, dim: 'PR', teks: 'Saya berusaha menjaga keharmonisan dan semangat dalam tim.' },
    { id: 22, dim: 'PR', teks: 'Saya peka terhadap perasaan dan kebutuhan rekan kerja saya.' },
    { id: 23, dim: 'PR', teks: 'Saya rela mengalah demi menjaga kekompakan dan solidaritas tim.' },
    { id: 24, dim: 'PR', teks: 'Saya pandai meredam ketegangan antar anggota tim.' },
    { id: 25, dim: 'PL', teks: 'Saya mengubah keputusan tim menjadi langkah-langkah kerja yang jelas.' },
    { id: 26, dim: 'PL', teks: 'Saya dikenal sebagai orang yang selalu menuntaskan apa yang dimulai.' },
    { id: 27, dim: 'PL', teks: 'Saya lebih suka sistem dan struktur yang terorganisasi dengan baik.' },
    { id: 28, dim: 'PL', teks: 'Saya dapat diandalkan untuk mengeksekusi rencana secara konsisten.' },
    { id: 29, dim: 'PS', teks: 'Saya memeriksa detail pekerjaan secara teliti sebelum diserahkan.' },
    { id: 30, dim: 'PS', teks: 'Saya merasa tidak tenang sampai pekerjaan benar-benar sempurna.' },
    { id: 31, dim: 'PS', teks: 'Saya sangat memperhatikan kesalahan kecil yang sering diabaikan orang lain.' },
    { id: 32, dim: 'PS', teks: 'Saya selalu memenuhi tenggat waktu yang sudah disepakati.' },
    { id: 33, dim: 'AH', teks: 'Saya memiliki keahlian teknis yang mendalam di bidang tertentu.' },
    { id: 34, dim: 'AH', teks: 'Saya terus mengembangkan pengetahuan dan kompetensi spesifik saya.' },
    { id: 35, dim: 'AH', teks: 'Saya paling berharga ketika tim membutuhkan keahlian atau pengetahuan khusus.' },
    { id: 36, dim: 'AH', teks: 'Saya bangga menjadi rujukan tim dalam bidang keahlian saya.' },
  ],
  hitung(jawaban) {
    const skor = {}
    for (const d of Object.keys(this.dimensi)) {
      const items = this.soal.filter(s => s.dim === d)
      skor[d] = persen(items.reduce((t, s) => t + jawaban[s.id], 0), items.length, 5, 1)
    }
    return skor
  },
  ringkasan(skor) {
    const urut = Object.entries(skor).sort((a, b) => b[1] - a[1])
    return `Peran utama: ${this.dimensi[urut[0][0]].nama} & ${this.dimensi[urut[1][0]].nama}`
  },
}

export const TES_BARU = { bigfive: BIG_FIVE, riasec: RIASEC, resiliensi: RESILIENSI, perantim: PERAN_TIM }

/** Cari definisi berdasarkan testType ('Big Five', 'RIASEC', dst.). */
export const TES_BY_TYPE = Object.fromEntries(Object.values(TES_BARU).map(t => [t.testType, t]))

/**
 * Pemeriksaan pola jawaban. Bukan vonis -- hanya catatan agar hasil
 * dibaca dengan hati-hati.
 */
export function cekPolaJawaban(def, jawaban, skor) {
  const nilai = Object.values(jawaban)
  if (def.format === YA_TIDAK) {
    const ya = nilai.filter(v => v === 1).length / nilai.length
    if (ya > 0.85) return 'Anda menjawab “Ya” pada hampir semua pernyataan, sehingga perbedaan minat antartipe menjadi kurang jelas.'
    if (ya < 0.1) return 'Anda menjawab “Tidak” pada hampir semua pernyataan, sehingga minat utama Anda sulit dipetakan.'
    return null
  }
  const tinggi = nilai.filter(v => v >= 4).length / nilai.length
  const rendah = nilai.filter(v => v <= 2).length / nilai.length
  if (tinggi > 0.85) return 'Sebagian besar jawaban Anda “Setuju/Sangat Setuju”, sehingga skor cenderung tinggi merata. Bacalah hasil ini dengan hati-hati.'
  if (rendah > 0.85) return 'Sebagian besar jawaban Anda “Tidak Setuju/Sangat Tidak Setuju”, sehingga skor cenderung rendah merata. Bacalah hasil ini dengan hati-hati.'
  const s = Object.values(skor)
  if (Math.max(...s) - Math.min(...s) <= 10) return 'Skor antardimensi Anda sangat berdekatan, sehingga dimensi yang paling menonjol tidak terlalu jelas.'
  return null
}
