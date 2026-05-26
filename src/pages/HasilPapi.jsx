import { useLocation, useNavigate } from 'react-router-dom'

/* ── Definisi 20 skala PAPI Kostick ─────────────────────────────── */
const skalaInfo = {
  L: { nama: 'Leadership Role',           sektor: 'Kepemimpinan',   warna: '#ef4444', deskripsi: 'Peran kepemimpinan; senang memimpin & mengarahkan orang lain.' },
  P: { nama: 'Need for Control',          sektor: 'Kepemimpinan',   warna: '#ef4444', deskripsi: 'Kebutuhan mengontrol orang lain; suka mengatur & memerintah.' },
  I: { nama: 'Ease in Decision Making',   sektor: 'Kepemimpinan',   warna: '#ef4444', deskripsi: 'Kemudahan mengambil keputusan; percaya diri & cepat memutuskan.' },
  G: { nama: 'Role of Group Dependent',   sektor: 'Arah Kerja',     warna: '#f97316', deskripsi: 'Ketergantungan pada kelompok; bekerja baik dalam tim.' },
  A: { nama: 'Need for Status',           sektor: 'Arah Kerja',     warna: '#f97316', deskripsi: 'Kebutuhan akan status & pengakuan; ambisius terhadap kedudukan.' },
  N: { nama: 'Need for Achievement',      sektor: 'Arah Kerja',     warna: '#f97316', deskripsi: 'Kebutuhan berprestasi; dorongan kuat untuk berhasil.' },
  T: { nama: 'Pace Role',                 sektor: 'Aktivitas',      warna: '#ca8a04', deskripsi: 'Tempo kerja; menentukan ritme & kecepatan dalam tugas.' },
  V: { nama: 'Vigorous Type Role',        sektor: 'Aktivitas',      warna: '#ca8a04', deskripsi: 'Tipe aktif & bersemangat; penuh energi dalam bekerja.' },
  X: { nama: 'Need for Activity',         sektor: 'Aktivitas',      warna: '#ca8a04', deskripsi: 'Kebutuhan aktivitas fisik; tidak suka diam & monoton.' },
  Z: { nama: 'Need for Affection',        sektor: 'Hubungan Sosial', warna: '#3b82f6', deskripsi: 'Kebutuhan kasih sayang; senang suasana hangat & akrab.' },
  B: { nama: 'Need to Belong',            sektor: 'Hubungan Sosial', warna: '#3b82f6', deskripsi: 'Kebutuhan merasa bagian dari kelompok; setia pada komunitas.' },
  O: { nama: 'Need for Relationships',    sektor: 'Hubungan Sosial', warna: '#3b82f6', deskripsi: 'Kebutuhan menjalin hubungan; pandai bergaul & berempati.' },
  S: { nama: 'Social Extension Role',     sektor: 'Hubungan Sosial', warna: '#3b82f6', deskripsi: 'Peran sosial luas; mudah bergaul dengan banyak orang.' },
  K: { nama: 'Need to be Forceful',       sektor: 'Temperamen',     warna: '#ec4899', deskripsi: 'Kebutuhan tegas & keras; tidak mudah menyerah dalam konflik.' },
  E: { nama: 'Emotional Resistant Role',  sektor: 'Temperamen',     warna: '#ec4899', deskripsi: 'Stabilitas emosi; tenang & terkontrol di bawah tekanan.' },
  F: { nama: 'Need to Support Authority', sektor: 'Pengikut',       warna: '#22c55e', deskripsi: 'Kebutuhan mendukung otoritas; patuh & hormat pada atasan.' },
  W: { nama: 'Need for Rules',            sektor: 'Pengikut',       warna: '#22c55e', deskripsi: 'Kebutuhan akan aturan & struktur; menyukai prosedur jelas.' },
  C: { nama: 'Need to Change',            sektor: 'Gaya Kerja',     warna: '#a855f7', deskripsi: 'Kebutuhan variasi & perubahan; mudah bosan dengan rutinitas.' },
  D: { nama: 'Need to be Noticed',        sektor: 'Gaya Kerja',     warna: '#a855f7', deskripsi: 'Kebutuhan tampil menonjol; suka perhatian & pengakuan.' },
  R: { nama: 'Role of the Hard Worker',   sektor: 'Gaya Kerja',     warna: '#a855f7', deskripsi: 'Peran pekerja keras; tekun, rajin, & penuh dedikasi.' },
}

const sektorWarna = {
  'Kepemimpinan':    { bg: '#fef2f2', border: '#fca5a5', text: '#991b1b', dot: '#ef4444' },
  'Arah Kerja':      { bg: '#fff7ed', border: '#fdba74', text: '#9a3412', dot: '#f97316' },
  'Aktivitas':       { bg: '#fefce8', border: '#fde047', text: '#713f12', dot: '#ca8a04' },
  'Hubungan Sosial': { bg: '#eff6ff', border: '#93c5fd', text: '#1e3a8a', dot: '#3b82f6' },
  'Temperamen':      { bg: '#fdf4ff', border: '#d8b4fe', text: '#581c87', dot: '#a855f7' },
  'Pengikut':        { bg: '#f0fdf4', border: '#86efac', text: '#14532d', dot: '#22c55e' },
  'Gaya Kerja':      { bg: '#fdf4ff', border: '#d8b4fe', text: '#581c87', dot: '#a855f7' },
}

/* ── Narasi interpretasi per skala ─────────────────────────────── */
const narasiSkala = {
  L: {
    tinggi: 'Individu dengan skor L tinggi memiliki jiwa kepemimpinan yang kuat dan alami. Ia senang memimpin, mengorganisir tim, dan mengambil inisiatif tanpa perlu diminta. Dalam situasi kelompok, orang lain secara alami cenderung mengikutinya karena ia memancarkan kepercayaan diri dan arah yang jelas. Ia menikmati tanggung jawab atas orang lain dan termotivasi oleh keberhasilan timnya. Kemampuannya untuk membaca situasi dan menggerakkan orang menjadikannya aset berharga dalam setiap organisasi, terutama dalam jabatan yang memerlukan koordinasi lintas fungsi dan pengambilan keputusan kolektif.',
    kekuatan: ['Kemampuan memimpin, mengorganisir, dan menginspirasi tim secara natural', 'Inisiatif tinggi — aktif mengambil tindakan tanpa menunggu perintah', 'Dipercaya sebagai figur koordinator dan penanggung jawab dalam kelompok'],
    pengembangan: 'Perlu memperhatikan dan menghargai pendapat anggota tim agar gaya kepemimpinannya tidak terkesan otoriter. Penting untuk tetap membuka ruang partisipasi aktif dari semua anggota dan tidak mendominasi setiap keputusan.',
    rekomendasi: ['Kepala Seksi / Kasubsie', 'Koordinator Tim / Proyek', 'Jabatan Struktural Eselon IV–III', 'Pengawas Operasional Lapangan', 'Manajer Program / Kegiatan'],
  },
  P: {
    tinggi: 'Individu dengan skor P tinggi memiliki kebutuhan yang kuat untuk mengontrol situasi dan mengarahkan orang lain. Ia merasa paling nyaman ketika dapat menentukan jalannya pekerjaan, menetapkan standar, dan memastikan setiap langkah berjalan sesuai arahannya. Ia tegas, tidak ragu dalam memberikan instruksi, dan cenderung frustrasi ketika situasi berada di luar kendalinya. Sifat ini menjadikannya pemimpin yang efektif dalam lingkungan yang membutuhkan ketertiban dan ketegasan, namun perlu diimbangi dengan kemampuan mendengarkan.',
    kekuatan: ['Ketegasan tinggi dalam memberikan arahan dan menetapkan standar kerja', 'Kemampuan mendelegasikan dan memastikan tugas berjalan sesuai rencana', 'Disiplin dan tidak mudah goyah dalam menghadapi tekanan untuk berkompromi'],
    pengembangan: 'Perlu mengembangkan fleksibilitas dan kemampuan mendengarkan masukan dari bawahan maupun rekan kerja. Kontrol yang terlalu ketat dapat menghambat kreativitas tim dan menurunkan motivasi anggota.',
    rekomendasi: ['Pengawas / Supervisor Unit Kerja', 'Kepala Seksi Penindakan & Penyidikan', 'Manajer Operasional Harian', 'Koordinator Quality Control', 'Jabatan Pengawas Kepatuhan Internal'],
  },
  I: {
    tinggi: 'Individu dengan skor I tinggi sangat percaya diri dalam mengambil keputusan. Ia tidak mudah ragu, tidak bertele-tele, dan dapat bertindak cepat saat kondisi mendesak. Kemampuan ini sangat berharga dalam situasi krisis, di mana keputusan harus dibuat segera tanpa kemewahan untuk berpikir terlalu lama. Ia tidak takut salah dan cenderung belajar dari keputusannya secara langsung. Keteguhan dalam bersikap ini membuatnya menjadi pemimpin yang responsif dan tidak membingungkan tim dengan kebimbangan.',
    kekuatan: ['Kecepatan dan ketegasan dalam pengambilan keputusan bahkan di bawah tekanan', 'Tidak mudah ragu atau berubah-ubah pendirian saat menghadapi pilihan sulit', 'Responsif dan sigap dalam situasi yang membutuhkan tindakan segera'],
    pengembangan: 'Perlu memastikan keputusan cepat tetap didasarkan pada data dan pertimbangan yang memadai, bukan semata-mata dorongan impulsif. Konsultasi singkat dengan pihak terkait sebelum memutuskan sangat disarankan pada isu yang berdampak besar.',
    rekomendasi: ['Kepala Unit / Kasatgas Operasi', 'Jabatan Crisis Management', 'Pengambil Kebijakan Teknis Lapangan', 'Kepala Tim Penindakan', 'Pejabat Fungsional Senior dengan Kewenangan Mandiri'],
  },
  G: {
    tinggi: 'Individu dengan skor G tinggi sangat berorientasi pada tim dan kelompok. Ia bekerja paling efektif dalam lingkungan kolaboratif dan merasa kurang nyaman jika harus bekerja sendiri dalam waktu lama. Loyalitas dan dedikasinya pada kelompok sangat tinggi — ia akan berjuang keras untuk kepentingan tim. Kehadirannya menciptakan rasa kebersamaan yang kuat. Dalam pengambilan keputusan, ia cenderung mencari konsensus dan sangat mempertimbangkan pendapat rekan-rekannya.',
    kekuatan: ['Kemampuan bekerja sama dan berkolaborasi secara efektif dalam tim', 'Loyalitas dan dedikasi tinggi terhadap kelompok dan rekan kerja', 'Pandai membangun semangat kebersamaan dan kohesi tim'],
    pengembangan: 'Perlu meningkatkan kemandirian dan kepercayaan diri untuk bertindak secara independen. Ketergantungan berlebih pada validasi kelompok dapat menjadi hambatan ketika keputusan cepat diperlukan secara individual.',
    rekomendasi: ['Anggota Tim Lintas Fungsi', 'Staf Koordinasi dan Kerja Sama', 'Analis Kebijakan Partisipatif', 'Fasilitator Rapat / Diskusi Kelompok', 'Jabatan yang Memerlukan Sinergi Antar Unit'],
  },
  N: {
    tinggi: 'Individu dengan skor N tinggi memiliki dorongan prestasi yang sangat kuat. Ia menetapkan standar yang tinggi untuk dirinya sendiri dan tidak mudah merasa puas dengan hasil yang biasa-biasa saja. Selalu termotivasi untuk melampaui target, ia cenderung kompetitif namun terarah — bukan sekadar bersaing dengan orang lain, melainkan dengan dirinya sendiri kemarin. Semangat untuk terus berkembang menjadikannya individu yang proaktif dalam mencari pelatihan, tantangan baru, dan tanggung jawab yang lebih besar.',
    kekuatan: ['Motivasi intrinsik yang sangat tinggi untuk berprestasi dan melampaui target', 'Standar kerja tinggi — tidak mudah puas dengan hasil yang di bawah ekspektasi', 'Proaktif dalam mencari pengembangan diri dan peluang untuk berkontribusi lebih'],
    pengembangan: 'Perlu mengelola ekspektasi agar tidak terlalu perfeksionis sehingga menghambat produktivitas tim. Penting untuk menerima bahwa "cukup baik" terkadang sudah memadai dan menghindari burnout akibat standar yang terlalu tinggi.',
    rekomendasi: ['Pemeriksa Bea dan Cukai Ahli', 'Auditor Kepabeanan dan Cukai', 'Analis Kebijakan Pengembangan', 'Peneliti / Perencana Strategis', 'Jabatan Fungsional dengan Target Kinerja Terukur'],
  },
  A: {
    tinggi: 'Individu dengan skor A tinggi sangat memperhatikan status, pengakuan, dan citra profesional. Ia termotivasi oleh posisi, jabatan, dan penghargaan yang menegaskan nilainya di mata organisasi dan lingkungannya. Ambisius dalam hal karier, ia bekerja keras tidak hanya karena tugas semata, tetapi juga karena ingin dilihat dan dihargai. Perhatiannya pada penampilan dan reputasi menjadikannya representasi yang baik bagi institusi dalam forum-forum resmi.',
    kekuatan: ['Penampilan dan citra profesional yang selalu terjaga dengan baik', 'Motivasi kuat untuk berkembang dalam jabatan dan meraih posisi lebih tinggi', 'Sadar akan pentingnya reputasi dan mampu merepresentasikan institusi secara baik'],
    pengembangan: 'Perlu memastikan ambisi terhadap status dan pengakuan tidak mengalahkan fokus pada kualitas dan integritas pekerjaan. Kolaborasi dan kerendahan hati tetap penting agar tidak dipersepsikan sebagai orang yang hanya mengejar jabatan.',
    rekomendasi: ['Juru Bicara / Humas Institusi', 'Pejabat Penghubung (Liaison Officer)', 'Jabatan Struktural Representatif', 'Koordinator Kerja Sama Kelembagaan', 'Protokol dan Acara Resmi'],
  },
  T: {
    tinggi: 'Individu dengan skor T tinggi bekerja dengan tempo yang cepat dan konsisten. Ia mampu mempertahankan ritme kerja yang tinggi dalam jangka panjang tanpa kehilangan produktivitas. Sangat efisien dalam mengelola waktu, ia sering menyelesaikan tugas lebih cepat dari yang diperkirakan. Dalam kondisi tenggat waktu yang ketat, ia justru tampil maksimal karena tekanan justru memotivasinya. Tempo kerjanya yang tinggi sering menjadi standar dan inspirasi bagi rekan-rekan di sekitarnya.',
    kekuatan: ['Produktivitas tinggi dengan tempo kerja yang konsisten dan cepat', 'Kemampuan mengelola waktu secara efisien dan menyelesaikan tugas lebih awal', 'Performa optimal justru muncul di bawah tekanan tenggat waktu'],
    pengembangan: 'Perlu memastikan kecepatan tidak mengorbankan ketelitian dan kualitas hasil akhir. Penting juga untuk memahami bahwa tidak semua rekan kerja memiliki tempo yang sama, sehingga perlu bersabar dalam koordinasi tim.',
    rekomendasi: ['Staf Operasional dengan Beban Kerja Tinggi', 'Jabatan Pengelolaan Data dan Dokumen', 'Petugas Pelayanan Kepabeanan', 'Jabatan dengan Deadline Harian / Mingguan', 'Koordinator Administrasi dan Tata Usaha'],
  },
  V: {
    tinggi: 'Individu dengan skor V tinggi adalah tipe yang penuh semangat, energi, dan antusiasme. Ia menyukai pekerjaan yang dinamis, bervariasi, dan penuh tantangan. Kehadirannya membawa energi positif yang menular ke lingkungan sekitarnya, menjadikannya penyemangat alami dalam tim. Tidak mudah putus asa dan selalu siap menghadapi tugas berikutnya meskipun baru saja menyelesaikan tugas berat. Vitalitasnya menjadikannya cocok untuk peran yang memerlukan stamina tinggi secara fisik maupun mental.',
    kekuatan: ['Energi dan antusiasme kerja yang sangat tinggi dan menular', 'Semangat yang membara dalam menghadapi tantangan dan tugas baru', 'Motivator alami — kehadirannya meningkatkan semangat seluruh tim'],
    pengembangan: 'Perlu menjaga keseimbangan antara semangat dan stamina jangka panjang. Risiko burnout perlu diwaspadai jika energi dikeluarkan tanpa strategi pemulihan yang baik.',
    rekomendasi: ['Penyuluh Kepabeanan dan Cukai', 'Fasilitator Pelatihan / Diklat', 'Petugas Lapangan Aktif', 'Jabatan yang Melibatkan Interaksi Publik Intensif', 'Koordinator Program dan Kegiatan'],
  },
  X: {
    tinggi: 'Individu dengan skor X tinggi memiliki kebutuhan kuat akan aktivitas fisik dan tidak nyaman jika harus bekerja statis terlalu lama. Ia menyukai pekerjaan lapangan, pergerakan, dan dinamisme fisik. Energi fisiknya tinggi dan ia akan terasa "terkungkung" jika dipaksa bekerja hanya di balik meja sepanjang hari. Ia beradaptasi dengan baik pada kondisi kerja yang berubah-ubah dan tidak monoton, serta umumnya memiliki stamina yang baik dalam penugasan luar ruangan.',
    kekuatan: ['Cocok dan bersemangat untuk pekerjaan lapangan atau yang membutuhkan mobilitas tinggi', 'Energi fisik tinggi dan tidak mudah kelelahan dalam penugasan aktif', 'Adaptif dalam kondisi kerja yang berubah-ubah dan tidak terprediksi'],
    pengembangan: 'Perlu mengembangkan kemampuan untuk fokus pada pekerjaan yang membutuhkan konsentrasi dan kesabaran panjang di belakang meja. Pekerjaan administratif yang terstruktur mungkin terasa kurang menarik dan perlu strategi khusus untuk tetap produktif.',
    rekomendasi: ['Petugas Patroli Bea dan Cukai', 'Petugas Penindakan Lapangan', 'Anggota Tim Operasi Khusus', 'Petugas Pemeriksaan Barang / Kapal', 'Jabatan Penyuluh Lapangan'],
  },
  S: {
    tinggi: 'Individu dengan skor S tinggi memiliki kemampuan sosial yang sangat luas. Ia mudah bergaul dengan siapa saja, dari berbagai latar belakang dan tingkatan, tanpa terasa canggung. Jaringannya sangat luas dan ia pandai membangun serta memelihara relasi dalam jangka panjang. Kemampuannya sebagai jembatan komunikasi menjadikannya efektif dalam peran-peran yang memerlukan koordinasi lintas unit atau hubungan eksternal. Lingkungan kerjanya penuh dengan koneksi yang saling mendukung.',
    kekuatan: ['Kemampuan membangun dan memelihara jaringan yang sangat luas dan beragam', 'Komunikatif, hangat, dan mudah diterima oleh semua kalangan', 'Efektif sebagai penghubung komunikasi antar bagian, divisi, atau institusi'],
    pengembangan: 'Perlu menjaga kedalaman hubungan agar tidak sekadar memperluas kuantitas jaringan tanpa membangun kepercayaan yang bermakna. Fokus pada kualitas relasi, bukan hanya jumlah koneksi.',
    rekomendasi: ['Humas / Komunikasi Publik', 'Petugas Pelayanan dan Informasi', 'Koordinator Kerja Sama Antar Lembaga', 'Jabatan Hubungan Internasional', 'Liaison Officer / Penghubung Institusional'],
  },
  R: {
    tinggi: 'Individu dengan skor R tinggi adalah pekerja keras sejati yang tekun, gigih, dan penuh dedikasi. Tidak mudah menyerah meskipun menghadapi hambatan yang sulit, ia akan terus bekerja hingga tugas benar-benar selesai dengan baik. Komitmennya terhadap pekerjaan sangat tinggi dan ia memiliki rasa tanggung jawab yang mendalam. Reputasinya sebagai orang yang dapat diandalkan menjadikannya aset berharga dalam setiap unit kerja, terutama untuk proyek-proyek jangka panjang yang membutuhkan konsistensi.',
    kekuatan: ['Ketekunan dan daya tahan kerja yang luar biasa tinggi', 'Rasa tanggung jawab yang sangat kuat — tidak meninggalkan pekerjaan setengah jalan', 'Dapat diandalkan untuk tugas-tugas jangka panjang yang membutuhkan konsistensi'],
    pengembangan: 'Perlu belajar mendelegasikan tugas kepada orang lain agar tidak terlalu membebani diri sendiri. Kemampuan memprioritaskan juga penting agar energi tidak habis untuk hal-hal yang seharusnya bisa didelegasikan.',
    rekomendasi: ['Auditor Internal / Eksternal', 'Pemeriksa Dokumen Kepabeanan', 'Analis Data dan Riset', 'Pelaksana Proyek Jangka Panjang', 'Jabatan Teknis yang Memerlukan Ketelitian Tinggi'],
  },
  D: {
    tinggi: 'Individu dengan skor D tinggi memiliki kebutuhan untuk tampil menonjol dan diperhatikan. Ia ekspresif, percaya diri dalam presentasi, dan menikmati berada di pusat perhatian. Kemampuan berbicara di depan umum dan mempresentasikan gagasan secara menarik menjadikannya cocok untuk peran representatif. Ia pandai "menjual" ide dan membuat audiens tertarik. Dalam konteks organisasi, ia efektif sebagai wajah institusi dalam forum publik, media, atau pertemuan penting.',
    kekuatan: ['Kemampuan presentasi dan komunikasi publik yang kuat dan menarik', 'Percaya diri tampil di depan audiens besar dan menjadi pusat perhatian', 'Efektif sebagai wajah, representasi, atau juru bicara organisasi'],
    pengembangan: 'Perlu memastikan keinginan untuk tampil tidak mengalihkan fokus dari substansi dan kualitas kerja. Penting untuk membangun kredibilitas berbasis kompetensi nyata, bukan hanya penampilan semata.',
    rekomendasi: ['Juru Bicara / Humas Institusi', 'Presenter atau Narasumber Diklat', 'Koordinator Acara dan Protokol', 'Fasilitator Publik', 'Jabatan Sosialisasi dan Penyuluhan'],
  },
  C: {
    tinggi: 'Individu dengan skor C tinggi menyukai variasi, perubahan, dan hal-hal baru. Ia mudah bosan dengan rutinitas dan selalu aktif mencari cara-cara baru yang lebih baik, lebih efisien, atau lebih inovatif. Kreativitasnya tinggi dan ia tidak takut untuk mencoba pendekatan yang belum pernah dilakukan. Dalam lingkungan yang berubah cepat, ia justru merasa nyaman dan bersemangat. Daya adaptasinya yang tinggi menjadikannya aset dalam proses transformasi dan inovasi organisasi.',
    kekuatan: ['Kreativitas dan kemampuan berpikir di luar kebiasaan (out-of-the-box)', 'Sangat adaptif dan bersemangat dalam situasi perubahan dan pembaruan', 'Aktif mencari dan mengusulkan solusi inovatif atas permasalahan yang ada'],
    pengembangan: 'Perlu menjaga konsistensi dan memastikan tugas yang sudah dimulai diselesaikan sebelum beralih ke hal lain yang baru. Kecenderungan untuk terus mencari hal baru dapat mengurangi kedalaman penguasaan suatu bidang.',
    rekomendasi: ['Tim Inovasi dan Pengembangan Organisasi', 'Jabatan Teknologi Informasi dan Digitalisasi', 'Analis Kebijakan Pengembangan Sistem', 'Koordinator Program Transformasi', 'Peneliti / Perencana Strategis'],
  },
  E: {
    tinggi: 'Individu dengan skor E tinggi memiliki stabilitas emosi yang sangat baik. Ia tampil tenang, terkontrol, dan tidak mudah terbawa arus emosi bahkan dalam situasi yang paling menekan sekalipun. Kemampuannya untuk tetap objektif dan rasional di tengah konflik menjadikannya penengah yang efektif. Ia tidak mudah panik, tidak reaktif terhadap provokasi, dan memberikan rasa aman bagi orang-orang di sekitarnya. Dalam tekanan tinggi, justru kualitas terbaiknya muncul.',
    kekuatan: ['Stabilitas dan ketahanan emosional yang sangat kuat bahkan dalam situasi kritis', 'Objektif dan rasional — tidak mudah terbawa emosi dalam pengambilan keputusan', 'Efektif sebagai penengah dan penyeimbang saat terjadi konflik atau ketegangan'],
    pengembangan: 'Perlu mengimbangi ketahanan emosional dengan kepekaan terhadap perasaan orang lain agar tidak dipersepsikan sebagai dingin atau tidak peduli. Ekspresi empati yang lebih terbuka akan memperkuat hubungan interpersonal.',
    rekomendasi: ['Mediator / Negosiator', 'Investigator / Penyidik', 'Jabatan Penanganan Sengketa atau Keberatan', 'Petugas Keamanan dan Ketertiban', 'Jabatan Crisis Response'],
  },
  Z: {
    tinggi: 'Individu dengan skor Z tinggi sangat menginginkan kehangatan dan keakraban dalam hubungan kerja. Ia responsif secara emosional, senang membangun ikatan personal yang tulus, dan sangat empatik terhadap perasaan orang lain. Lingkungan kerja yang hangat dan suportif sangat penting baginya untuk dapat bekerja optimal. Ia pandai membuat orang merasa diterima dan dihargai, sehingga sering menjadi tempat curhat dan konsultasi informal bagi rekan-rekannya.',
    kekuatan: ['Empati tinggi dan kepekaan mendalam terhadap kondisi emosional orang lain', 'Mampu menciptakan iklim kerja yang hangat, inklusif, dan suportif', 'Membangun hubungan interpersonal yang tulus, mendalam, dan bermakna'],
    pengembangan: 'Perlu menjaga objektivitas agar keputusan kerja tidak terlalu dipengaruhi oleh kedekatan personal atau faktor emosional. Batas profesional dalam hubungan kerja perlu tetap dijaga.',
    rekomendasi: ['Staf Pengembangan SDM / HR', 'Konselor atau Pendamping Pegawai', 'Jabatan Pembinaan dan Kesejahteraan', 'Fasilitator Tim dan Kelompok Kerja', 'Koordinator Program Mentoring'],
  },
  B: {
    tinggi: 'Individu dengan skor B tinggi sangat menginginkan rasa memiliki dan diterima sebagai bagian dari kelompok. Loyalitas dan komitmennya terhadap tim atau organisasi sangat kuat. Ia rela berkorban untuk kepentingan kelompok dan sangat sensitif terhadap dinamika serta harmoni internal tim. Identitasnya sangat terikat pada kelompoknya dan ia akan bekerja keras untuk mempertahankan kesatuan dan solidaritas.',
    kekuatan: ['Loyalitas yang sangat kuat terhadap tim, organisasi, dan nilai-nilai bersama', 'Kemampuan menjaga semangat dan kohesi kelompok dalam situasi sulit sekalipun', 'Komitmen mendalam terhadap tujuan bersama dan identitas organisasi'],
    pengembangan: 'Perlu mengembangkan keberanian untuk menyuarakan pendapat yang berbeda dari mayoritas kelompok. Kemampuan berpikir independen dan kritis sangat penting agar tidak terjebak dalam groupthink.',
    rekomendasi: ['Anggota Tim Tetap dengan Sinergi Tinggi', 'Staf Unit Kerja Kolaboratif', 'Jabatan Pembinaan Kepegawaian', 'Koordinator Kegiatan Internal', 'Anggota Panitia atau Satuan Tugas'],
  },
  O: {
    tinggi: 'Individu dengan skor O tinggi memiliki kebutuhan mendasar untuk menjalin dan merawat hubungan interpersonal yang bermakna. Ia pandai bergaul, sangat empatik, dan membangun koneksi yang dalam dan autentik dengan orang-orang di sekitarnya. Tidak sekadar berkenalan, ia benar-benar membangun hubungan jangka panjang yang saling percaya. Kemampuan memahami dan merespons kebutuhan orang lain menjadikannya sangat efektif dalam peran-peran yang mensyaratkan interaksi manusia intensif.',
    kekuatan: ['Kemampuan membangun hubungan interpersonal yang kuat, tulus, dan jangka panjang', 'Empati mendalam dan kepekaan tinggi terhadap kebutuhan, perasaan, dan kondisi orang lain', 'Sangat efektif dalam peran yang memerlukan interaksi dan pelayanan langsung kepada orang'],
    pengembangan: 'Perlu menyeimbangkan kebutuhan sosial yang tinggi dengan fokus pada penyelesaian tugas-tugas mandiri. Kemampuan bekerja independen tanpa bergantung pada interaksi sosial perlu terus diasah.',
    rekomendasi: ['Petugas Layanan Informasi Kepabeanan', 'Staf Hubungan Pengguna Jasa', 'Jabatan Komunikasi dan Bimbingan Pengguna Jasa', 'Koordinator Hubungan Eksternal', 'Petugas Pengaduan dan Pelayanan Publik'],
  },
  K: {
    tinggi: 'Individu dengan skor K tinggi memiliki ketegasan yang kuat dan tidak mudah menyerah ketika menghadapi konflik, tekanan, atau pertentangan. Ia berani menyuarakan pendapatnya, bahkan ketika itu bertentangan dengan mayoritas atau pihak yang lebih berkuasa. Gigih dalam mempertahankan prinsip dan posisinya, ia tidak mudah diintimidasi. Kemampuan negosiasi dan advokasi yang kuat menjadikannya efektif dalam situasi yang memerlukan keteguhan sikap.',
    kekuatan: ['Keberanian dan ketegasan tinggi dalam mempertahankan pendapat dan prinsip', 'Tidak mudah terintimidasi dalam situasi konflik, tekanan, atau perdebatan', 'Kemampuan negosiasi, advokasi, dan argumentasi yang kuat dan persuasif'],
    pengembangan: 'Perlu mengelola intensitas dan cara mengekspresikan ketegasan agar tidak dipersepsikan sebagai agresif, konfrontatif, atau tidak kooperatif. Memilih waktu dan cara yang tepat untuk menyampaikan perbedaan pendapat sangat penting.',
    rekomendasi: ['Penyidik Pegawai Negeri Sipil (PPNS)', 'Jabatan Penindakan dan Penyidikan', 'Negosiator Keberatan / Banding', 'Petugas Penanganan Pelanggaran', 'Jabatan Penegakan Hukum Kepabeanan'],
  },
  F: {
    tinggi: 'Individu dengan skor F tinggi secara tulus menghormati hierarki, otoritas, dan orang-orang yang dianggapnya lebih berpengalaman. Ia loyal terhadap atasan, patuh pada aturan yang berlaku, dan merasa nyaman berada dalam struktur organisasi yang jelas. Dapat diandalkan untuk menjalankan instruksi dengan teliti dan konsisten tanpa perlu pengawasan ketat. Sifat ini menjadikannya staf yang sangat tepercaya dan andal dalam menjalankan fungsi-fungsi yang telah ditetapkan.',
    kekuatan: ['Kepatuhan, loyalitas, dan dedikasi yang tinggi terhadap atasan dan institusi', 'Dapat diandalkan sepenuhnya untuk menjalankan tugas sesuai instruksi dengan teliti', 'Menghargai dan menjunjung tinggi struktur organisasi dan hierarki yang berlaku'],
    pengembangan: 'Perlu mengembangkan inisiatif dan keberanian untuk mengusulkan perbaikan, inovasi, atau perbedaan pendapat secara proaktif dan konstruktif. Ketergantungan penuh pada arahan atasan dapat membatasi potensi kontribusi.',
    rekomendasi: ['Staf Administrasi dan Tata Usaha', 'Pelaksana Teknis Operasional', 'Staf Pendukung Pimpinan', 'Jabatan Protokol dan Kesekretariatan', 'Pelaksana Program dengan Panduan Jelas'],
  },
  W: {
    tinggi: 'Individu dengan skor W tinggi sangat menghargai aturan, prosedur, standar operasional, dan struktur yang jelas. Ia adalah sosok yang teratur, sistematis, dan sangat disiplin dalam bekerja. Adanya SOP yang jelas membuatnya merasa aman dan dapat bekerja dengan optimal. Perhatiannya pada detail prosedural sangat tinggi — ia tidak akan melewatkan satu langkah pun jika itu adalah bagian dari aturan yang berlaku. Konsistensi dan keandalannya menjadikannya pilihan tepat untuk jabatan yang memerlukan kepatuhan prosedural tinggi.',
    kekuatan: ['Ketelitian tinggi dan keteraturan sistematis dalam setiap aspek pekerjaan', 'Disiplin kuat dalam mengikuti prosedur, SOP, dan standar operasional yang berlaku', 'Konsistensi dan keandalan yang sangat tinggi dalam penyelesaian tugas'],
    pengembangan: 'Perlu mengembangkan fleksibilitas dan kemampuan beradaptasi dalam situasi yang menuntut respons di luar prosedur baku. Tidak semua kondisi dapat diprediksi, sehingga kemampuan improvisasi yang tetap terukur sangat diperlukan.',
    rekomendasi: ['Auditor Kepabeanan dan Cukai', 'Jabatan Kepatuhan Internal', 'Pemeriksa Prosedur dan Regulasi', 'Staf Manajemen Risiko', 'Jabatan Standardisasi dan Akreditasi'],
  },
}

/* urutan pada radar (searah jarum jam dari atas) */
const RADAR_ORDER = ['L','P','I','G','A','N','T','V','X','Z','B','O','S','K','E','F','W','C','D','R']

/* ── Komponen Radar Chart SVG ──────────────────────────────────── */
function RadarChart({ scores }) {
  const cx = 220, cy = 220, maxR = 170
  const n = RADAR_ORDER.length
  const labelR = maxR + 22

  const toXY = (i, val) => {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2
    const r = (val / 9) * maxR
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const axisEnd = (i) => {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2
    return { x: cx + maxR * Math.cos(angle), y: cy + maxR * Math.sin(angle) }
  }

  const labelPos = (i) => {
    const angle = (Math.PI * 2 * i / n) - Math.PI / 2
    return { x: cx + labelR * Math.cos(angle), y: cy + labelR * Math.sin(angle) }
  }

  /* poligon data peserta */
  const pts = RADAR_ORDER.map((s, i) => toXY(i, scores[s] ?? 0))
  const polyStr = pts.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  /* ring grid: 3, 6, 9 */
  const rings = [3, 6, 9]
  const ringPoly = (val) =>
    RADAR_ORDER.map((_, i) => {
      const angle = (Math.PI * 2 * i / n) - Math.PI / 2
      const r = (val / 9) * maxR
      return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`
    }).join(' ')

  return (
    <svg viewBox="0 0 440 440" className="w-full max-w-md mx-auto">
      {/* ring grid */}
      {rings.map(v => (
        <polygon key={v} points={ringPoly(v)}
          fill="none" stroke="#e5e7eb" strokeWidth="1" />
      ))}

      {/* axis lines */}
      {RADAR_ORDER.map((_, i) => {
        const end = axisEnd(i)
        return <line key={i} x1={cx} y1={cy} x2={end.x.toFixed(1)} y2={end.y.toFixed(1)}
          stroke="#e5e7eb" strokeWidth="1" />
      })}

      {/* ring labels (nilai) */}
      {rings.map(v => {
        const y = cy - (v / 9) * maxR
        return <text key={v} x={cx + 3} y={y - 2} fontSize="9" fill="#9ca3af">{v}</text>
      })}

      {/* area peserta */}
      <polygon points={polyStr}
        fill="rgba(99,102,241,0.20)" stroke="#6366f1" strokeWidth="2" strokeLinejoin="round" />

      {/* titik nilai */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="4"
          fill={skalaInfo[RADAR_ORDER[i]].warna} stroke="white" strokeWidth="1.5" />
      ))}

      {/* label skala */}
      {RADAR_ORDER.map((s, i) => {
        const lp = labelPos(i)
        const score = scores[s] ?? 0
        const color = skalaInfo[s].warna
        return (
          <g key={s}>
            <text x={lp.x.toFixed(1)} y={lp.y.toFixed(1)}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontWeight="700" fill={color}>
              {s}
            </text>
            <text x={lp.x.toFixed(1)} y={(lp.y + 12).toFixed(1)}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="9" fill="#6b7280">
              {score}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ── Bar mini per skala ──────────────────────────────────────────── */
function ScoreBar({ val }) {
  const pct = (val / 9) * 100
  const color = val >= 7 ? '#ef4444' : val >= 5 ? '#f97316' : val >= 3 ? '#3b82f6' : '#9ca3af'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold w-4 text-right" style={{ color }}>{val}</span>
    </div>
  )
}

/* ── Label tingkat ────────────────────────────────────────────────── */
function levelLabel(v) {
  if (v >= 8) return { label: 'Sangat Tinggi', color: '#ef4444' }
  if (v >= 6) return { label: 'Tinggi',        color: '#f97316' }
  if (v >= 4) return { label: 'Sedang',        color: '#3b82f6' }
  if (v >= 2) return { label: 'Rendah',        color: '#6b7280' }
  return { label: 'Sangat Rendah', color: '#d1d5db' }
}

/* ── Halaman Utama ─────────────────────────────────────────────────── */
export default function HasilPapi() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.scores) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Data hasil tidak ditemukan.</p>
          <button onClick={() => navigate('/tes-papi')}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg">
            Kembali ke Tes
          </button>
        </div>
      </div>
    )
  }

  const { scores, nama, nip, unitKerja } = state
  const tanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

  /* Top 5 skala tertinggi */
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const top5 = sorted.slice(0, 5)

  /* Kelompok per sektor */
  const sektorList = ['Kepemimpinan', 'Arah Kerja', 'Aktivitas', 'Hubungan Sosial', 'Temperamen', 'Pengikut', 'Gaya Kerja']

  const skalaPerSektor = sektorList.map(sek => ({
    sektor: sek,
    skalas: Object.entries(skalaInfo)
      .filter(([, info]) => info.sektor === sek)
      .map(([k, info]) => ({ kode: k, ...info, nilai: scores[k] ?? 0 }))
      .sort((a, b) => b.nilai - a.nilai),
  }))

  /* Skor ROLES vs NEEDS */
  const ROLES = ['G','L','I','T','V','S','R','D','C','E']
  const NEEDS = ['N','A','P','X','B','O','Z','K','F','W']
  const totalRoles = ROLES.reduce((s, k) => s + (scores[k] ?? 0), 0)
  const totalNeeds = NEEDS.reduce((s, k) => s + (scores[k] ?? 0), 0)

  /* Top 3 untuk narasi */
  const top3 = sorted.slice(0, 3)
  const top3KekuatanAll = top3.map(([k]) => ({ kode: k, list: narasiSkala[k]?.kekuatan || [] }))
  const top3Pengembangan = top3.map(([k]) => ({ kode: k, teks: narasiSkala[k]?.pengembangan })).filter(x => x.teks)
  const top3Rekomendasi = top3.map(([k]) => ({ kode: k, nama: skalaInfo[k]?.nama, warna: skalaInfo[k]?.warna, list: narasiSkala[k]?.rekomendasi || [] }))

  const handlePrint = () => window.print()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 print:bg-white">
      {/* ── Header ── */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-8 px-4 print:py-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-purple-200 text-sm mb-1">AssesIN — Platform Asesmen Psikologi</p>
          <h1 className="text-2xl font-bold">Laporan PAPI Kostick</h1>
          <p className="text-purple-100 mt-1 text-sm">Personality and Preference Inventory</p>
          <button onClick={handlePrint}
            className="print:hidden absolute right-0 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            🖨️ Cetak
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">

        {/* ── Identitas ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          {/* Baris 1: Nama + NIP + Tanggal + Alat Ukur */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-400 text-xs uppercase font-semibold tracking-wide">Nama</p>
              <p className="font-bold text-gray-800 mt-0.5">{nama || '—'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-semibold tracking-wide">NIP / NIK</p>
              <p className="font-semibold text-gray-700 mt-0.5">{nip || '—'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-semibold tracking-wide">Tanggal Tes</p>
              <p className="font-semibold text-gray-700 mt-0.5">{tanggal}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase font-semibold tracking-wide">Alat Ukur</p>
              <p className="font-semibold text-gray-700 mt-0.5">PAPI Kostick 2020</p>
            </div>
          </div>
          {/* Baris 2: Unit Kerja — fullwidth agar nama panjang muat */}
          <div className="border-t border-gray-100 pt-3">
            <p className="text-gray-400 text-xs uppercase font-semibold tracking-wide mb-0.5">Unit Kerja</p>
            <p className="font-semibold text-gray-700">{unitKerja || '—'}</p>
          </div>
        </div>

        {/* ── Interpretasi Profil ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-1 flex items-center gap-2 text-xl">
            <span className="w-9 h-9 bg-violet-100 rounded-xl flex items-center justify-center text-lg">📝</span>
            Interpretasi Profil Kepribadian
          </h2>
          <p className="text-sm text-gray-400 mb-5 ml-11">Berdasarkan 3 dimensi kepribadian dominan</p>

          {/* Narasi per top-3 skala */}
          <div className="space-y-4 mb-6">
            {top3.map(([kode, nilai], idx) => {
              const info  = skalaInfo[kode]
              const narasi = narasiSkala[kode]
              const lv    = levelLabel(nilai)
              return (
                <div key={kode} className="flex gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50/70">
                  <div className="flex-shrink-0 flex flex-col items-center gap-1 mt-0.5">
                    <span className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white shadow-sm"
                      style={{ backgroundColor: info.warna }}>
                      {kode}
                    </span>
                    <span className="text-xs font-bold text-gray-300">#{idx+1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-sm font-bold text-gray-700">{info.nama}</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white border"
                        style={{ color: lv.color, borderColor: lv.color + '44' }}>
                        {lv.label} ({nilai})
                      </span>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed">{narasi?.tinggi}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Kekuatan & Area Pengembangan */}
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
              <p className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <span>✅</span> Kekuatan Utama
              </p>
              <div className="space-y-4">
                {top3KekuatanAll.map(({ kode, list }) => {
                  const info = skalaInfo[kode]
                  return (
                    <div key={kode}>
                      <p className="text-xs font-bold mb-1.5 flex items-center gap-1.5"
                        style={{ color: info.warna }}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                          style={{ backgroundColor: info.warna }}>{kode}</span>
                        {info.nama}
                      </p>
                      <ul className="space-y-1.5">
                        {list.map((k, i) => (
                          <li key={i} className="text-sm text-emerald-800 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-2" />
                            {k}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <p className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-4 flex items-center gap-1.5">
                <span>🔧</span> Area Pengembangan
              </p>
              <div className="space-y-4">
                {top3Pengembangan.map(({ kode, teks }) => {
                  const info = skalaInfo[kode]
                  return (
                    <div key={kode}>
                      <p className="text-xs font-bold mb-1.5 flex items-center gap-1.5"
                        style={{ color: info.warna }}>
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                          style={{ backgroundColor: info.warna }}>{kode}</span>
                        {info.nama}
                      </p>
                      <p className="text-sm text-amber-800 leading-relaxed">{teks}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Rekomendasi Jabatan */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
            <p className="text-sm font-bold text-indigo-700 uppercase tracking-wide mb-4 flex items-center gap-1.5">
              <span>🏢</span> Rekomendasi Jabatan
            </p>
            <p className="text-sm text-indigo-600 mb-4">
              Berdasarkan profil kepribadian dominan, berikut adalah jabatan-jabatan yang sesuai:
            </p>
            <div className="space-y-4">
              {top3Rekomendasi.map(({ kode, nama, warna, list }) => (
                <div key={kode}>
                  <p className="text-xs font-bold mb-2 flex items-center gap-1.5" style={{ color: warna }}>
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                      style={{ backgroundColor: warna }}>{kode}</span>
                    {nama}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {list.map((jabatan, i) => (
                      <span key={i}
                        className="text-sm px-3 py-1 rounded-full font-medium border"
                        style={{ backgroundColor: warna + '14', color: warna, borderColor: warna + '44' }}>
                        {jabatan}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Radar + Top 5 ── */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Radar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-bold text-gray-800 mb-4">Profil Kepribadian</h2>
            <RadarChart scores={scores} />
            <p className="text-center text-xs text-gray-400 mt-2">Skala 0–9 per dimensi (20 skala)</p>
          </div>

          {/* Top 5 + ringkasan */}
          <div className="space-y-4">
            {/* Top 5 */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-4">5 Dimensi Dominan</h2>
              <div className="space-y-3">
                {top5.map(([kode, nilai], idx) => {
                  const info = skalaInfo[kode]
                  const lv = levelLabel(nilai)
                  return (
                    <div key={kode} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: info.warna }}>
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-sm font-semibold text-gray-700">
                            <span style={{ color: info.warna }} className="font-bold">{kode}</span>
                            &nbsp;– {info.nama}
                          </span>
                          <span className="text-xs font-bold ml-2" style={{ color: lv.color }}>
                            {lv.label}
                          </span>
                        </div>
                        <ScoreBar val={nilai} />
                        <p className="text-xs text-gray-400 mt-0.5">{info.deskripsi}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ROLES vs NEEDS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-bold text-gray-800 mb-3">Ringkasan Kelompok</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-indigo-700">ROLES (G L I T V S R D C E)</span>
                    <span className="font-bold text-indigo-700">{totalRoles}/45</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-3">
                    <div className="h-3 rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${(totalRoles / 45) * 100}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-violet-700">NEEDS (N A P X B O Z K F W)</span>
                    <span className="font-bold text-violet-700">{totalNeeds}/45</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-3">
                    <div className="h-3 rounded-full bg-violet-500 transition-all"
                      style={{ width: `${(totalNeeds / 45) * 100}%` }} />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Total ROLES + NEEDS selalu = 90 (dari 90 pasangan soal)</p>
            </div>
          </div>
        </div>

        {/* ── Detail per Sektor ── */}
        <div>
          <h2 className="font-bold text-gray-800 mb-4 text-lg">Detail per Sektor</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skalaPerSektor.map(({ sektor, skalas }) => {
              const wc = sektorWarna[sektor] ?? { bg: '#f9fafb', border: '#e5e7eb', text: '#374151', dot: '#6b7280' }
              const avgVal = skalas.reduce((s, sk) => s + sk.nilai, 0) / skalas.length
              return (
                <div key={sektor} className="rounded-2xl border-2 p-4"
                  style={{ backgroundColor: wc.bg, borderColor: wc.border }}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-sm" style={{ color: wc.text }}>{sektor}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: wc.border, color: wc.text }}>
                      Rata-rata: {avgVal.toFixed(1)}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {skalas.map(sk => (
                      <div key={sk.kode}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-semibold" style={{ color: wc.text }}>
                            <span className="font-extrabold">{sk.kode}</span> – {sk.nama}
                          </span>
                          <span className="text-xs font-bold" style={{ color: wc.dot }}>{sk.nilai}</span>
                        </div>
                        <div className="bg-white/60 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full transition-all"
                            style={{ width: `${(sk.nilai / 9) * 100}%`, backgroundColor: wc.dot }} />
                        </div>
                        <p className="text-xs mt-0.5" style={{ color: wc.text, opacity: 0.75 }}>{sk.deskripsi}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Tabel Lengkap ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 overflow-x-auto">
          <h2 className="font-bold text-gray-800 mb-4">Skor Lengkap (20 Skala)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                <th className="text-left px-3 py-2 rounded-l">Kode</th>
                <th className="text-left px-3 py-2">Nama Skala</th>
                <th className="text-left px-3 py-2">Sektor</th>
                <th className="text-center px-3 py-2">Skor</th>
                <th className="text-left px-3 py-2 rounded-r w-48">Bar</th>
              </tr>
            </thead>
            <tbody>
              {RADAR_ORDER.map(kode => {
                const info = skalaInfo[kode]
                const val = scores[kode] ?? 0
                const lv = levelLabel(val)
                return (
                  <tr key={kode} className="border-t border-gray-50 hover:bg-gray-50/50">
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-extrabold text-white"
                        style={{ backgroundColor: info.warna }}>
                        {kode}
                      </span>
                    </td>
                    <td className="px-3 py-2 font-medium text-gray-700">{info.nama}</td>
                    <td className="px-3 py-2 text-gray-500 text-xs">{info.sektor}</td>
                    <td className="px-3 py-2 text-center">
                      <span className="font-bold text-sm" style={{ color: lv.color }}>{val}</span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="bg-gray-100 rounded-full h-2 w-full">
                        <div className="h-2 rounded-full"
                          style={{ width: `${(val / 9) * 100}%`, backgroundColor: info.warna }} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* ── Catatan & Tombol ── */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 print:hidden">
          ⚠️ Laporan ini bersifat deskriptif dan merupakan gambaran kecenderungan kepribadian berdasarkan self-report.
          Interpretasi akhir harus dilakukan oleh psikolog yang berwenang dan tidak dapat dijadikan satu-satunya dasar keputusan kepegawaian.
        </div>

        <div className="flex gap-3 justify-center print:hidden pb-8">
          <button onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
            ← Beranda
          </button>
          <button onClick={() => navigate('/tes-papi')}
            className="px-6 py-2.5 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition">
            Tes Ulang
          </button>
          <button onClick={handlePrint}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition shadow">
            🖨️ Cetak Laporan
          </button>
        </div>
      </div>

      {/* ── Print styles ── */}
      <style>{`
        @media print {
          body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          .print\\:bg-white { background: white !important; }
          .print\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
        }
      `}</style>
    </div>
  )
}
