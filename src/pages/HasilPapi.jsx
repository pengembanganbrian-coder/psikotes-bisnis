import { useLocation, useNavigate } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'
import { LaporanPage, LaporanBar, LaporanHero, Kartu, BarisSkor, Radar, Poin, Chip, Sorot, Catatan, AksiBawah, TanpaData } from '../components/Laporan'

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
    rekomendasi: ['Team Lead / Kepala Tim', 'Project Coordinator', 'Department Manager', 'Operations Supervisor', 'Program Manager'],
  },
  P: {
    tinggi: 'Individu dengan skor P tinggi memiliki kebutuhan yang kuat untuk mengontrol situasi dan mengarahkan orang lain. Ia merasa paling nyaman ketika dapat menentukan jalannya pekerjaan, menetapkan standar, dan memastikan setiap langkah berjalan sesuai arahannya. Ia tegas, tidak ragu dalam memberikan instruksi, dan cenderung frustrasi ketika situasi berada di luar kendalinya. Sifat ini menjadikannya pemimpin yang efektif dalam lingkungan yang membutuhkan ketertiban dan ketegasan, namun perlu diimbangi dengan kemampuan mendengarkan.',
    kekuatan: ['Ketegasan tinggi dalam memberikan arahan dan menetapkan standar kerja', 'Kemampuan mendelegasikan dan memastikan tugas berjalan sesuai rencana', 'Disiplin dan tidak mudah goyah dalam menghadapi tekanan untuk berkompromi'],
    pengembangan: 'Perlu mengembangkan fleksibilitas dan kemampuan mendengarkan masukan dari bawahan maupun rekan kerja. Kontrol yang terlalu ketat dapat menghambat kreativitas tim dan menurunkan motivasi anggota.',
    rekomendasi: ['Unit Supervisor / Team Lead', 'Compliance & Enforcement Manager', 'Daily Operations Manager', 'Quality Control Coordinator', 'Internal Compliance Officer'],
  },
  I: {
    tinggi: 'Individu dengan skor I tinggi sangat percaya diri dalam mengambil keputusan. Ia tidak mudah ragu, tidak bertele-tele, dan dapat bertindak cepat saat kondisi mendesak. Kemampuan ini sangat berharga dalam situasi krisis, di mana keputusan harus dibuat segera tanpa kemewahan untuk berpikir terlalu lama. Ia tidak takut salah dan cenderung belajar dari keputusannya secara langsung. Keteguhan dalam bersikap ini membuatnya menjadi pemimpin yang responsif dan tidak membingungkan tim dengan kebimbangan.',
    kekuatan: ['Kecepatan dan ketegasan dalam pengambilan keputusan bahkan di bawah tekanan', 'Tidak mudah ragu atau berubah-ubah pendirian saat menghadapi pilihan sulit', 'Responsif dan sigap dalam situasi yang membutuhkan tindakan segera'],
    pengembangan: 'Perlu memastikan keputusan cepat tetap didasarkan pada data dan pertimbangan yang memadai, bukan semata-mata dorongan impulsif. Konsultasi singkat dengan pihak terkait sebelum memutuskan sangat disarankan pada isu yang berdampak besar.',
    rekomendasi: ['Operations Unit Lead', 'Crisis Management Officer', 'Technical Decision Maker', 'Enforcement Team Lead', 'Senior Professional dengan Otonomi Penuh'],
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
    rekomendasi: ['Quality Assurance Specialist', 'Internal / External Auditor', 'Policy Development Analyst', 'Researcher / Strategic Planner', 'Performance-Based Professional Role'],
  },
  A: {
    tinggi: 'Individu dengan skor A tinggi sangat memperhatikan status, pengakuan, dan citra profesional. Ia termotivasi oleh posisi, jabatan, dan penghargaan yang menegaskan nilainya di mata organisasi dan lingkungannya. Ambisius dalam hal karier, ia bekerja keras tidak hanya karena tugas semata, tetapi juga karena ingin dilihat dan dihargai. Perhatiannya pada penampilan dan reputasi menjadikannya representasi yang baik bagi institusi dalam forum-forum resmi.',
    kekuatan: ['Penampilan dan citra profesional yang selalu terjaga dengan baik', 'Motivasi kuat untuk berkembang dalam jabatan dan meraih posisi lebih tinggi', 'Sadar akan pentingnya reputasi dan mampu merepresentasikan institusi secara baik'],
    pengembangan: 'Perlu memastikan ambisi terhadap status dan pengakuan tidak mengalahkan fokus pada kualitas dan integritas pekerjaan. Kolaborasi dan kerendahan hati tetap penting agar tidak dipersepsikan sebagai orang yang hanya mengejar jabatan.',
    rekomendasi: ['Corporate Spokesperson / PR Manager', 'Liaison Officer / Relationship Manager', 'Brand Ambassador / Executive Representative', 'Partnership & Alliance Coordinator', 'Event & Protocol Manager'],
  },
  T: {
    tinggi: 'Individu dengan skor T tinggi bekerja dengan tempo yang cepat dan konsisten. Ia mampu mempertahankan ritme kerja yang tinggi dalam jangka panjang tanpa kehilangan produktivitas. Sangat efisien dalam mengelola waktu, ia sering menyelesaikan tugas lebih cepat dari yang diperkirakan. Dalam kondisi tenggat waktu yang ketat, ia justru tampil maksimal karena tekanan justru memotivasinya. Tempo kerjanya yang tinggi sering menjadi standar dan inspirasi bagi rekan-rekan di sekitarnya.',
    kekuatan: ['Produktivitas tinggi dengan tempo kerja yang konsisten dan cepat', 'Kemampuan mengelola waktu secara efisien dan menyelesaikan tugas lebih awal', 'Performa optimal justru muncul di bawah tekanan tenggat waktu'],
    pengembangan: 'Perlu memastikan kecepatan tidak mengorbankan ketelitian dan kualitas hasil akhir. Penting juga untuk memahami bahwa tidak semua rekan kerja memiliki tempo yang sama, sehingga perlu bersabar dalam koordinasi tim.',
    rekomendasi: ['High-Volume Operations Staff', 'Data & Document Management Specialist', 'Customer Service Officer', 'Deadline-Driven Operational Role', 'Administrative Coordinator'],
  },
  V: {
    tinggi: 'Individu dengan skor V tinggi adalah tipe yang penuh semangat, energi, dan antusiasme. Ia menyukai pekerjaan yang dinamis, bervariasi, dan penuh tantangan. Kehadirannya membawa energi positif yang menular ke lingkungan sekitarnya, menjadikannya penyemangat alami dalam tim. Tidak mudah putus asa dan selalu siap menghadapi tugas berikutnya meskipun baru saja menyelesaikan tugas berat. Vitalitasnya menjadikannya cocok untuk peran yang memerlukan stamina tinggi secara fisik maupun mental.',
    kekuatan: ['Energi dan antusiasme kerja yang sangat tinggi dan menular', 'Semangat yang membara dalam menghadapi tantangan dan tugas baru', 'Motivator alami — kehadirannya meningkatkan semangat seluruh tim'],
    pengembangan: 'Perlu menjaga keseimbangan antara semangat dan stamina jangka panjang. Risiko burnout perlu diwaspadai jika energi dikeluarkan tanpa strategi pemulihan yang baik.',
    rekomendasi: ['Corporate Trainer / Learning Facilitator', 'Training & Development Specialist', 'Field Operations Officer', 'High-Interaction Public-Facing Role', 'Program & Events Coordinator'],
  },
  X: {
    tinggi: 'Individu dengan skor X tinggi memiliki kebutuhan kuat akan aktivitas fisik dan tidak nyaman jika harus bekerja statis terlalu lama. Ia menyukai pekerjaan lapangan, pergerakan, dan dinamisme fisik. Energi fisiknya tinggi dan ia akan terasa "terkungkung" jika dipaksa bekerja hanya di balik meja sepanjang hari. Ia beradaptasi dengan baik pada kondisi kerja yang berubah-ubah dan tidak monoton, serta umumnya memiliki stamina yang baik dalam penugasan luar ruangan.',
    kekuatan: ['Cocok dan bersemangat untuk pekerjaan lapangan atau yang membutuhkan mobilitas tinggi', 'Energi fisik tinggi dan tidak mudah kelelahan dalam penugasan aktif', 'Adaptif dalam kondisi kerja yang berubah-ubah dan tidak terprediksi'],
    pengembangan: 'Perlu mengembangkan kemampuan untuk fokus pada pekerjaan yang membutuhkan konsentrasi dan kesabaran panjang di belakang meja. Pekerjaan administratif yang terstruktur mungkin terasa kurang menarik dan perlu strategi khusus untuk tetap produktif.',
    rekomendasi: ['Field Operations Officer', 'Field Enforcement / Patrol Officer', 'Special Operations Team Member', 'Goods / Asset Inspection Officer', 'Field Outreach & Education Officer'],
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
    rekomendasi: ['Internal / External Auditor', 'Document Review Specialist', 'Data & Research Analyst', 'Long-Term Project Executor', 'High-Precision Technical Role'],
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
    rekomendasi: ['HR Development Specialist', 'Employee Wellness / People Partner', 'Welfare & Wellbeing Specialist', 'Team Facilitator / Group Coach', 'Mentoring Program Coordinator'],
  },
  B: {
    tinggi: 'Individu dengan skor B tinggi sangat menginginkan rasa memiliki dan diterima sebagai bagian dari kelompok. Loyalitas dan komitmennya terhadap tim atau organisasi sangat kuat. Ia rela berkorban untuk kepentingan kelompok dan sangat sensitif terhadap dinamika serta harmoni internal tim. Identitasnya sangat terikat pada kelompoknya dan ia akan bekerja keras untuk mempertahankan kesatuan dan solidaritas.',
    kekuatan: ['Loyalitas yang sangat kuat terhadap tim, organisasi, dan nilai-nilai bersama', 'Kemampuan menjaga semangat dan kohesi kelompok dalam situasi sulit sekalipun', 'Komitmen mendalam terhadap tujuan bersama dan identitas organisasi'],
    pengembangan: 'Perlu mengembangkan keberanian untuk menyuarakan pendapat yang berbeda dari mayoritas kelompok. Kemampuan berpikir independen dan kritis sangat penting agar tidak terjebak dalam groupthink.',
    rekomendasi: ['High-Synergy Team Member', 'Collaborative Unit Staff', 'HR & People Development Specialist', 'Internal Activities Coordinator', 'Task Force / Committee Member'],
  },
  O: {
    tinggi: 'Individu dengan skor O tinggi memiliki kebutuhan mendasar untuk menjalin dan merawat hubungan interpersonal yang bermakna. Ia pandai bergaul, sangat empatik, dan membangun koneksi yang dalam dan autentik dengan orang-orang di sekitarnya. Tidak sekadar berkenalan, ia benar-benar membangun hubungan jangka panjang yang saling percaya. Kemampuan memahami dan merespons kebutuhan orang lain menjadikannya sangat efektif dalam peran-peran yang mensyaratkan interaksi manusia intensif.',
    kekuatan: ['Kemampuan membangun hubungan interpersonal yang kuat, tulus, dan jangka panjang', 'Empati mendalam dan kepekaan tinggi terhadap kebutuhan, perasaan, dan kondisi orang lain', 'Sangat efektif dalam peran yang memerlukan interaksi dan pelayanan langsung kepada orang'],
    pengembangan: 'Perlu menyeimbangkan kebutuhan sosial yang tinggi dengan fokus pada penyelesaian tugas-tugas mandiri. Kemampuan bekerja independen tanpa bergantung pada interaksi sosial perlu terus diasah.',
    rekomendasi: ['Customer Information Officer', 'Client Relations Staff', 'Client Communication & Support Specialist', 'External Relations Coordinator', 'Customer Complaint & Service Officer'],
  },
  K: {
    tinggi: 'Individu dengan skor K tinggi memiliki ketegasan yang kuat dan tidak mudah menyerah ketika menghadapi konflik, tekanan, atau pertentangan. Ia berani menyuarakan pendapatnya, bahkan ketika itu bertentangan dengan mayoritas atau pihak yang lebih berkuasa. Gigih dalam mempertahankan prinsip dan posisinya, ia tidak mudah diintimidasi. Kemampuan negosiasi dan advokasi yang kuat menjadikannya efektif dalam situasi yang memerlukan keteguhan sikap.',
    kekuatan: ['Keberanian dan ketegasan tinggi dalam mempertahankan pendapat dan prinsip', 'Tidak mudah terintimidasi dalam situasi konflik, tekanan, atau perdebatan', 'Kemampuan negosiasi, advokasi, dan argumentasi yang kuat dan persuasif'],
    pengembangan: 'Perlu mengelola intensitas dan cara mengekspresikan ketegasan agar tidak dipersepsikan sebagai agresif, konfrontatif, atau tidak kooperatif. Memilih waktu dan cara yang tepat untuk menyampaikan perbedaan pendapat sangat penting.',
    rekomendasi: ['Corporate Investigator / Compliance Officer', 'Enforcement & Investigation Lead', 'Dispute Negotiator / Mediator', 'Violations & Risk Handler', 'Legal Enforcement / Regulatory Compliance'],
  },
  F: {
    tinggi: 'Individu dengan skor F tinggi secara tulus menghormati hierarki, otoritas, dan orang-orang yang dianggapnya lebih berpengalaman. Ia loyal terhadap atasan, patuh pada aturan yang berlaku, dan merasa nyaman berada dalam struktur organisasi yang jelas. Dapat diandalkan untuk menjalankan instruksi dengan teliti dan konsisten tanpa perlu pengawasan ketat. Sifat ini menjadikannya staf yang sangat tepercaya dan andal dalam menjalankan fungsi-fungsi yang telah ditetapkan.',
    kekuatan: ['Kepatuhan, loyalitas, dan dedikasi yang tinggi terhadap atasan dan institusi', 'Dapat diandalkan sepenuhnya untuk menjalankan tugas sesuai instruksi dengan teliti', 'Menghargai dan menjunjung tinggi struktur organisasi dan hierarki yang berlaku'],
    pengembangan: 'Perlu mengembangkan inisiatif dan keberanian untuk mengusulkan perbaikan, inovasi, atau perbedaan pendapat secara proaktif dan konstruktif. Ketergantungan penuh pada arahan atasan dapat membatasi potensi kontribusi.',
    rekomendasi: ['Administration & Secretarial Staff', 'Technical Operations Executor', 'Executive Support / Personal Assistant', 'Protocol & Secretariat Officer', 'Structured Program Executor'],
  },
  W: {
    tinggi: 'Individu dengan skor W tinggi sangat menghargai aturan, prosedur, standar operasional, dan struktur yang jelas. Ia adalah sosok yang teratur, sistematis, dan sangat disiplin dalam bekerja. Adanya SOP yang jelas membuatnya merasa aman dan dapat bekerja dengan optimal. Perhatiannya pada detail prosedural sangat tinggi — ia tidak akan melewatkan satu langkah pun jika itu adalah bagian dari aturan yang berlaku. Konsistensi dan keandalannya menjadikannya pilihan tepat untuk jabatan yang memerlukan kepatuhan prosedural tinggi.',
    kekuatan: ['Ketelitian tinggi dan keteraturan sistematis dalam setiap aspek pekerjaan', 'Disiplin kuat dalam mengikuti prosedur, SOP, dan standar operasional yang berlaku', 'Konsistensi dan keandalan yang sangat tinggi dalam penyelesaian tugas'],
    pengembangan: 'Perlu mengembangkan fleksibilitas dan kemampuan beradaptasi dalam situasi yang menuntut respons di luar prosedur baku. Tidak semua kondisi dapat diprediksi, sehingga kemampuan improvisasi yang tetap terukur sangat diperlukan.',
    rekomendasi: ['Compliance Auditor', 'Internal Compliance Specialist', 'Regulatory & Procedure Reviewer', 'Risk Management Staff', 'Standards & Accreditation Specialist'],
  },
}

/* urutan pada radar (searah jarum jam dari atas) */
const RADAR_ORDER = ['L','P','I','G','A','N','T','V','X','Z','B','O','S','K','E','F','W','C','D','R']

/* ── Label tingkat ────────────────────────────────────────────────── */
function levelLabel(v) {
  if (v >= 8) return { label: 'Sangat tinggi', color: '#dc2626' }
  if (v >= 6) return { label: 'Tinggi',        color: '#ea580c' }
  if (v >= 4) return { label: 'Sedang',        color: '#2563eb' }
  if (v >= 2) return { label: 'Rendah',        color: '#64748b' }
  return { label: 'Sangat rendah', color: '#94a3b8' }
}

const Bulat = ({ kode, warna, besar }) => (
  <span style={{ flexShrink: 0, width: besar ? 36 : 22, height: besar ? 36 : 22, borderRadius: 99, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: besar ? 14 : 11, fontWeight: 800, background: warna }}>{kode}</span>
)

function LaporanLengkapPAPI({ scores, sorted }) {
  const top3 = sorted.slice(0, 3)
  const sektorList = ['Kepemimpinan', 'Arah Kerja', 'Aktivitas', 'Hubungan Sosial', 'Temperamen', 'Pengikut', 'Gaya Kerja']
  const perSektor = sektorList.map(sek => ({
    sektor: sek,
    skalas: Object.entries(skalaInfo)
      .filter(([, info]) => info.sektor === sek)
      .map(([k, info]) => ({ kode: k, ...info, nilai: scores[k] ?? 0 }))
      .sort((a, b) => b.nilai - a.nilai),
  }))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Kartu ikon="📝" judul="Interpretasi profil kepribadian" sub="Berdasarkan tiga dimensi paling dominan">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {top3.map(([kode, nilai], i) => {
            const info = skalaInfo[kode]
            const lv = levelLabel(nilai)
            return (
              <div key={kode} style={{ display: 'flex', gap: '14px', padding: '16px', borderRadius: '16px', background: 'var(--surface-2)' }}>
                <Bulat kode={kode} warna={info.warna} besar />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>
                    #{i + 1} {info.nama} <Chip warna={lv.color}>{lv.label} · {nilai}</Chip>
                  </p>
                  <p className="rpt-teks" style={{ fontSize: '14px' }}>{narasiSkala[kode]?.tinggi}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Kartu>

      <div className="rpt-grid-2">
        <Kartu ikon="💪" judul="Kekuatan utama" aksen="#16a34a">
          {top3.map(([kode]) => (
            <Poin key={kode} judul={skalaInfo[kode].nama} items={narasiSkala[kode]?.kekuatan} warna="#16a34a" />
          ))}
        </Kartu>
        <Kartu ikon="🌱" judul="Area pengembangan">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {top3.filter(([k]) => narasiSkala[k]?.pengembangan).map(([kode]) => (
              <Sorot key={kode} judul={skalaInfo[kode].nama} warna={skalaInfo[kode].warna}>{narasiSkala[kode].pengembangan}</Sorot>
            ))}
          </div>
        </Kartu>
      </div>

      <Kartu ikon="🏢" judul="Rekomendasi jabatan" sub="Jabatan yang selaras dengan profil dominan Anda">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {top3.map(([kode]) => (
            <div key={kode}>
              <p style={{ fontSize: '13px', fontWeight: 700, color: skalaInfo[kode].warna, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bulat kode={kode} warna={skalaInfo[kode].warna} /> {skalaInfo[kode].nama}
              </p>
              <div className="rpt-chips">
                {(narasiSkala[kode]?.rekomendasi || []).map(j => <Chip key={j} warna={skalaInfo[kode].warna}>{j}</Chip>)}
              </div>
            </div>
          ))}
        </div>
      </Kartu>

      <Kartu ikon="🗂️" judul="Rincian per sektor" sub="20 skala PAPI dikelompokkan dalam 7 sektor">
        <div className="rpt-grid-2">
          {perSektor.map(({ sektor, skalas }) => {
            const w = sektorWarna[sektor]?.dot ?? '#64748b'
            const rata = skalas.reduce((s, sk) => s + sk.nilai, 0) / skalas.length
            return (
              <div key={sektor} style={{ background: 'var(--surface-2)', borderRadius: '16px', padding: '14px 16px', borderTop: `3px solid ${w}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>{sektor}</p>
                  <Chip warna={w}>rata-rata {rata.toFixed(1)}</Chip>
                </div>
                {skalas.map(sk => (
                  <BarisSkor key={sk.kode} label={`${sk.kode} · ${sk.nama}`} nilai={sk.nilai} maks={9} warna={w} ket={sk.deskripsi} />
                ))}
              </div>
            )
          })}
        </div>
      </Kartu>
    </div>
  )
}

export default function HasilPapi() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.scores) return <TanpaData onKembali={() => navigate('/tes-papi')} />

  const { scores, nama, email, pesertaId, fromDashboard } = state
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const top5 = sorted.slice(0, 5)
  const keBelakang = () => navigate(fromDashboard ? '/dashboard' : '/')
  const laporan = <LaporanLengkapPAPI scores={scores} sorted={sorted} />

  return (
    <LaporanPage lebar={980} bar={<LaporanBar kembali={fromDashboard ? '← Dashboard' : null} onKembali={keBelakang} />}>
      <LaporanHero tes="PAPI Kostick" sub="Personality and Preference Inventory" nama={nama} tersimpan={!!pesertaId} warna="#6d28d9" warna2="#2563eb" watermark={sorted.slice(0, 3).map(([k]) => k).join('')}>
        <p className="rpt-label">Tiga dimensi paling dominan</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
          {sorted.slice(0, 3).map(([kode, nilai]) => (
            <div key={kode} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="rpt-tile" style={{ width: 44, height: 44, fontSize: 20, borderRadius: 12 }}>{kode}</span>
              <p style={{ fontSize: '17px', fontWeight: 700, flex: 1 }}>{skalaInfo[kode].nama}</p>
              <p style={{ fontSize: '17px', fontWeight: 800 }}>{nilai}<span style={{ opacity: 0.7, fontSize: '13px' }}>/9</span></p>
            </div>
          ))}
        </div>
      </LaporanHero>

      <Kartu no={1} ikon="🕸️" judul="Profil kepribadian" sub="20 skala PAPI, rentang 0–9" aksen="#6d28d9">
        <Radar maks={9} warna="#6d28d9" ukuran={460}
          data={RADAR_ORDER.map(k => ({ label: k, nilai: scores[k] ?? 0, warna: skalaInfo[k].warna }))} />
      </Kartu>

      <Kartu no={2} ikon="🏆" judul="Lima dimensi dominan" aksen="#6d28d9">
          {top5.map(([kode, nilai]) => {
            const info = skalaInfo[kode]
            return (
              <BarisSkor key={kode} label={`${kode} · ${info.nama}`} nilai={nilai} maks={9} warna={info.warna} lencana={levelLabel(nilai).label} ket={info.deskripsi} />
            )
          })}
      </Kartu>

      {fromDashboard ? laporan : (
        <PaymentGate testType="PAPI" pesertaId={pesertaId} nama={nama} email={email}>{laporan}</PaymentGate>
      )}

      <Catatan>
        Laporan ini bersifat deskriptif: gambaran kecenderungan kepribadian dan preferensi kerja berdasarkan jawaban Anda sendiri.
        Hasil tidak sebaiknya dijadikan satu-satunya dasar keputusan seleksi atau pengembangan. Hasil bersifat rahasia.
      </Catatan>

      <AksiBawah kembali={fromDashboard ? 'Dashboard' : 'Beranda'} onKembali={keBelakang} ulang={fromDashboard ? null : 'Ulangi tes'} onUlang={() => navigate('/tes-papi')} />
    </LaporanPage>
  )
}
