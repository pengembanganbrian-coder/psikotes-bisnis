// Interpretasi pola profil DISC dari lembar skoring eDISC (sheet "profile").
// Kunci = kode profil (1-3 huruf, urut dari posisi tertinggi).

export const POLA_DISC = {
  C: {
    tipe: "Objective thinker",
    karakter: ["Akurat","Analitis","Hati-hati","Penuh Kesadaran","Menemukan fakta","Ketepatan","Standar tinggi","Sistimatis"],
    deskripsi: "Karakteristik umum dirinya adalah seorang yang kritis, analitis, sistimatis, hati-hati dan memiliki standar kualitas yang tinggi. Dalam menghadapi persoalan, ia akan menganalisisnya secara mendalam, mengumpulkan bukti-bukti pendukung serta mampu menjabarkannya secara rinci. Hanya saja, perasaannya sensitif dan mudah tersinggung. Ia menganggap kritik atau perbedaan pendapat yang disampaikan kepadanya adalah suatu kelemahan diri karena ia menganggap bahwa dirinya selalu memberikan hasil yang sempurna. Ia juga tidak dapat mengekspresikan emosinya tersebut secara terbuka, ia lebih banyak memendamnya dan mengontrol perasaannya tersebut. Dalam lingkungan sosial, ia juga cenderung hanya menjadi pengikut saja karena kurang mampu berkomunikasi verbal, mempengaruhi orang lain. Ia lebih menyukai berkomunikasi dengan tulisan. Hal yang paling ditakuti adalah apabila terjadi konflik personal, dimana ia harus berhadapan dan berargumentasi dengan orang lain. Dalam situasi penuh tekanan, ia cenderung menarik diri bahkan menjadi keras kepala.",
  },
  CD: {
    tipe: "Creative",
    karakter: ["Metodologis","Analitis","Kekuatan ego yang besar","Memecahkan masalah","Dapat diandalkan","Sangat berorientasi kepada tugas"],
    deskripsi: "Dalam mengambil keputusan, ia membuat keputusan berdasarkan fakta-fakta, bukan berdasarkan pada emosi, sehingga akan sulit bagi dirinya untuk memutuskan sesuatu yang belum didasarkan pada data-data yang ada. Ia memiliki standar tinggi, Ia merasa hanya dirinyalah yang dapat mengerjakan pekerjaannya dengan baik, menyebabkan seluruh waktunya tercurahkan pada penyelesaian tugas tersebut dan tidak memerlukan orang lain untuk membantu menyelesaikan tugasnya tersebut.",
  },
  CDI: {
    tipe: "Creative",
    karakter: ["Metodologis","Analitis","Kekuatan ego yang besar","Memecahkan masalah","Dapat diandalkan","Sangat berorientasi kepada tugas"],
    deskripsi: "Dalam mengambil keputusan, ia membuat keputusan berdasarkan fakta-fakta, bukan berdasarkan pada emosi, sehingga akan sulit bagi dirinya untuk memutuskan sesuatu yang belum didasarkan pada data-data yang ada. Ia memiliki standar tinggi, Ia merasa hanya dirinyalah yang dapat mengerjakan pekerjaannya dengan baik, menyebabkan seluruh waktunya tercurahkan pada penyelesaian tugas tersebut dan tidak memerlukan orang lain untuk membantu menyelesaikan tugasnya tersebut.",
  },
  CDS: {
    tipe: "Contemplator",
    karakter: ["Analitis","Metodologis","Kekuatan ego yang besar","Menentukan tujuan","Mampu memecahkan masalah","Kompetitif","Kemauannya keras","Pendiam","Berorientasi kepada tugas"],
    deskripsi: "Dalam bekerja, ia sangat mengacu pada aturan, sehingga dianggap tidak fleksibel. Ia membuat keputusan berdasarkan fakta dan data, bukan berdasarkan emosi. Ia tidak banyak berbicara dan tidak mudah mempercayai orang lain. Ia baru akan mempercayai orang lain setelah orang tersebut setelah menunjukkan pencapaian hasil seperti yang diharapkan dan sesuai dengan standar yang telah ditetapkannya. Ia bisa menjadi seorang inisiator atau perancang perubahan dalam organisasi karena bisa diandalkan untuk menciptakan konsep-konsep kreatif.",
  },
  CI: {
    tipe: "Appraiser",
    karakter: ["Kreatif","Artistik","Keinginan untuk diakui tentang diri dan kemampuannya","Antusias dan optimis","Persuasif","Aktif berbicara"],
    deskripsi: "Ia sangat kompetitif dan memakai cara langsung untuk memperoleh hasil. Ia tidak memberi perintah, tetapi melibatkan orang lain ke dalam pekerjaan dengan memakai metode persuasif. Ia memancing kerjasama orang-orang disekeliling dengan memberi penjelasan tentang dasar dari aktifitas yang akan dilakukan. Ia piawai membantu orang lain memperoleh gambaran mengenai langkah-langkah yang perlu diambil dalam mewujudkan hasil yang diinginkan. Ia biasanya berbicara dengan mempergunakan rencana tindakan yang rinci yang sudah disiapkan dalam rangka memastikan kemajuan yang teratur. Karena begitu ingin meraih kemenangan, dirinya dapat menjadi tidak sabar bila standar yang ada tidak dijalankan. Ia adalah pemikir kritis dan mendalam serta mampu mengekspresikan kritik secara verbal.",
  },
  CID: {
    tipe: "Creative",
    karakter: ["Metodologis","Analitis","Kekuatan ego yang besar","Memecahkan masalah","Pekerja yang dapat diandalkan","Sangat berorientasi kepada tugas"],
    deskripsi: "Dalam mengambil keputusan, ia membuat keputusan berdasarkan fakta-fakta, bukan berdasarkan pada emosi, sehingga akan sulit bagi dirinya untuk memutuskan sesuatu yang belum didasarkan pada data-data yang ada. Ia memiliki standar tinggi, Ia merasa hanya dirinyalah yang dapat mengerjakan pekerjaannya dengan baik, menyebabkan seluruh waktunya tercurahkan pada penyelesaian tugas tersebut dan tidak memerlukan orang lain untuk membantu menyelesaikan tugasnya tersebut.",
  },
  CIS: {
    tipe: "Mediator",
    karakter: ["Antusias","Optimis","Praktis","Mengerjakan dengan benar sejak awal","Kreatif","Artistik"],
    deskripsi: "Dalam bekerja, ia ingin diterima sebagai anggota tim dan selalu akan meminta kejelasan tentang harapan dan tujuan yang diinginkan sebelum memulai suatu tugas baru, karena ia akan bekerja keras untuk mencapai standar yang telah ditentukan kepadanya. Dalam situasi penuh tekanan, ia menjadi sangat teliti dan hati-hati, tidak lagi menunjukkan sikap diam atau bisa menjadi terlalu banyak bicara. Ia menjadi sangat memperhatikan kualitas kerja dan mengharapkan pengakuan dari rekan sekerjanya. Ia akan melakukan pendekatan logis dan emosi dalam membujuk orang lain.",
  },
  CS: {
    tipe: "Perfectionist",
    karakter: ["Hati-hati","Posesif","Sensitif","Mudah diprediksi","Lambat untuk berubah"],
    deskripsi: "Dalam bekerja, ia selalu menginginkan standar prosedur kerja dan tidak ada perubahan mendadak. Ia senang lingkungan yang aman dengan adanya kejelasan peraturan dan regulasi. Akibatnya ia menjadi kurang kreatif, kurang dapat berimprovisasi dan sulit melihat dari sisi yang lain. Ia tidak suka dikritik, karena ia selalu mengharapkan setiap hasil kerjanya adalah sempurna, tanpa cacat. Kritik baginya tidak hanya serangan terhadap pekerjaannya tetapi  juga dianggap sebagai serangan terhadap pribadinya karena dianggap dirinya tidak bisa memberikan hasil yang sempurna. Ia menjadi tidak nyaman bila harus memutuskan secara cepat, ia juga kurang berani mengekspresikan perasaannya secara terbuka, selalu menahan diri dan penuh kehati-hatian dalam setiap tindakannya.",
  },
  CSD: {
    tipe: "Perfectionist",
    karakter: ["Hati-hati","Posesif","Sensitif","Mudah diprediksi","Lambat untuk berubah"],
    deskripsi: "Dalam bekerja, ia selalu menginginkan standar prosedur kerja dan tidak ada perubahan mendadak. Ia senang lingkungan yang aman dengan adanya kejelasan peraturan dan regulasi. Akibatnya ia menjadi kurang kreatif, kurang dapat berimprovisasi dan sulit melihat dari sisi yang lain. Ia tidak suka dikritik, karena ia selalu mengharapkan setiap hasil kerjanya adalah sempurna, tanpa cacat. Kritik baginya tidak hanya serangan terhadap pekerjaannya tetapi  juga dianggap sebagai serangan terhadap pribadinya karena dianggap dirinya tidak bisa memberikan hasil yang sempurna. Ia menjadi tidak nyaman bila harus memutuskan secara cepat, ia juga kurang berani mengekspresikan perasaannya secara terbuka, selalu menahan diri dan penuh kehati-hatian dalam setiap tindakannya.",
  },
  CSI: {
    tipe: "Practitioner",
    karakter: ["Hati-hati","Posesif","Sensitif","Mudah diprediksi","Lambat untuk berubah"],
    deskripsi: "Karena dirinya sangat memperhatikan perasaan orang lain, akan menjadi sulit bagi dirinya dalam mengambil keputusan yang memiliki dampak kepada orang lain, dalam kondisi ini biasanya ia akan meminta orang lain untuk ikut terlibat dalam proses menentukan keputusannya tersebut dan lebih senang berperan sebagai anggota tim. Dalam bekerja, kebutuhannya adalah diterima sebagai anggota tim. Ia sulit membuat keputusan bila parameternya tidak jelas. Namun setelah keputusan dibuat, ia akan sangat sulit mengubah keputusannya tersebut. Ia senang pada orang-orang mendukung gagasan dirinya.",
  },
  D: {
    tipe: "Developer",
    karakter: ["Mengambil keputusan","Langsung/direct","Kekuatan ego yang besar","Memecahkan masalah","Berani mengambil resiko","Dominan","Penggerak"],
    deskripsi: "Ia memiliki kekuatan ego yang besar, cenderung sangat individualistis dan selalu mencari pandangan-pandangan baru karenanya ia tidak menyukai berada dibawah atasan yang penuh kontrol, ia lebih menyukai atasan yang memberikan keleluasan untuk pencapaian tujuan yang diharapkan. Karena sangat bertumpu pada diri sendiri, cenderung lebih memilih untuk mencari solusi masalah sendiri. Ia bebas dari pengaruh tekanan kelompok. Dan karenanya tidak mengindahkan aturan-aturan untuk memunculkan dengan pemecahan masalah secara inovatif dan imajinatif. Walaupun cenderung berperilaku langsung dan tegas, dirinya juga mahir memanipulasi orang dan situasi untuk mencapai tujuan yang diinginkan. Akan tetapi apabila terpaksa harus berpartisipasi bersama orang lain yang membatasinya, ia cenderung untuk melawan.",
  },
  DC: {
    tipe: "Challenger",
    karakter: ["Kekuatan ego yang besar","Alanitis","Metodologis","Memecahkan masalah","Dapat diandalkan","Sangat berorientasi kepada tugas"],
    deskripsi: "Ia menampilkan dua kekuatan yang bertolak belakang dalam perilakunya. Keinginan untuk mencapai hasil yang masuk akal namun memiliki dorongan yang besar untuk mencapai kesempurnaan, sikap agresif ada bersamaan dengan kepekaan. Ia mampu membuat keputusan sehari-hari dengan cepat, tapi juga mungkin menjadi terlalu berhati-hati dalam membuat keputusan yang lebih besar. Ia membutuhkan kebebasan bereksplorasi dan otoritas untuk memeriksa kembali dan menguji coba penemuan-penemuan. Terkadang dirinya membutuhkan bantuan untuk menyelesaikan proyek tapi  tidak menyukai pembatasan-pembatasan.",
  },
  DCI: {
    tipe: "Chancellor",
    karakter: ["Ekstrovert","Optimis","Komunikator ulung","Terampil mengatur pekerjaan orang lain","Memotivasi dan mempengaruhi orang lain","Memiliki keinginan dan dorongan energi yang besar","Berbicara sesuai fakta"],
    deskripsi: "Orang lain memandangnya sebagai seorang yang mampu beradaptasi, meski sebenarnya ia lebih menyukai bekerja sendiri, bahkan lebih menyukai mengerjakan tugasnya sendiri diluar kelompoknya. Ia juga seringkali nampak menjadi pekerja keras yang tidak pernah berhenti bekerja, karena ia mampu bekerja dengan cepat dari satu tugas ke tugas yang lain.Ia lebih terfokus pada proses, ia akan menjadi sensitif terhadap kritik namun cenderung menginternalisasikan perasaannya tersebut daripada mengekspresikannya dalam interaksinya dengan orang lain. Ia selalu melakukan klarifikasi mengenai tujuan yang ingin dicapai sebelum mengerjakan suatu proyek baru, karena ia bekerja dalam rangka mencapai standar yang telah ditentukan baginya.",
  },
  DCS: {
    tipe: "Achiever",
    karakter: ["Bersahabat","Tenang","Loyal","Teguh mencapai tujuan","Membuat dan mengevaluasi metode baru"],
    deskripsi: "Dalam menghadapi situasi baru, ia cenderung bersifat moderat, ia akan menganalisis situasi dengan pendekatan yang bisa diterima lingkungan, ia menghindari sikap-sikap yang ekstrim karena ingin agar orang lain selalu memandangnya sebagai seorang yang ramah dan terbuka. Ia senang terlibat dalam situasi sosial namun tidak ingin menjadi pusat perhatian. Ia selalu mencari keseimbangan antara personal dengan pergaulan sosial.",
  },
  DI: {
    tipe: "Inspirational",
    karakter: ["Ekstrovert","Optimis","Komunikator ulung","Terampil mengatur pekerjaan orang lain","Memotivasi dan mempengaruhi orang lain","Memiliki keinginan dan dorongan energi yang besar"],
    deskripsi: "Kemampuan kepemimpinannya bisa diandalkan. Ia mahir mempengaruhi orang lain dengan memberikan penjelasan-penjelasan logis dan argumentatif. Pola kepemimpinannya pun keras dan langsung  (forceful and direct), sehingga biasanya mengalami masalah dengan orang lain. Ia cepat berpikir dan cepat bertindak, tidak sabaran dan cenderung mencari kesalahan orang lain yang tidak setara dengan dirinya. Hal ini disebabkan karena dirinya menempatkan standar tinggi pada dirinya dan akan menjadi sangat terganggu bila standar yang telah ditentukannya tersebut tidak tercapai oleh orang lain.",
  },
  DIC: {
    tipe: "Chancellor",
    karakter: ["Ekstrovert","Optimis","Komunikator ulung","Terampil mengatur pekerjaan orang lain","Memotivasi dan mempengaruhi orang lain","Memiliki keinginan dan dorongan energi yang besar"],
    deskripsi: "Orang lain memandangnya sebagai seorang yang mampu beradaptasi, meski sebenarnya ia lebih menyukai bekerja sendiri, bahkan lebih menyukai mengerjakan tugasnya sendiri diluar kelompoknya. Ia juga seringkali nampak menjadi pekerja keras yang tidak pernah berhenti bekerja, karena ia mampu bekerja dengan cepat dari satu tugas ke tugas yang lain.Ia lebih terfokus pada proses, ia akan menjadi sensitif terhadap kritik namun cenderung menginternalisasikan perasaannya tersebut daripada mengekspresikannya dalam interaksinya dengan orang lain. Ia selalu melakukan klarifikasi mengenai tujuan yang ingin dicapai sebelum mengerjakan suatu proyek baru, karena ia bekerja dalam rangka mencapai standar yang telah ditentukan baginya.",
  },
  DIS: {
    tipe: "Director",
    karakter: ["Ekstrovert","Optimis","Komunikator ulung","Terampil mengatur pekerjaan orang lain","Memotivasi dan mempengaruhi orang lain","Memiliki keinginan dan dorongan energi yang besar"],
    deskripsi: "Kemampuan kepemimpinannya bisa diandalkan. Ia mahir mempengaruhi orang lain dengan memberikan penjelasan-penjelasan logis dan argumentatif. Pola kepemimpinannya pun keras dan langsung  (forceful and direct), sehingga biasanya mengalami masalah dengan orang lain. Ia cepat berpikir dan cepat bertindak, tidak sabaran dan cenderung mencari kesalahan orang lain yang tidak setara dengan dirinya. Hal ini disebabkan karena dirinya menempatkan standar tinggi pada dirinya dan akan menjadi sangat terganggu bila standar yang telah ditentukannya tersebut tidak tercapai oleh orang lain.",
  },
  DS: {
    tipe: "Achiever",
    karakter: ["Bersahabat","Tenang","Loyal","Menentukan tujuan","Dorongan untuk mencapai tujuan","Membuat dan mengevaluasi metode baru"],
    deskripsi: "Dalam menghadapi situasi baru, ia cenderung bersifat moderat, ia akan menganalisis situasi dengan pendekatan yang bisa diterima lingkungan, ia menghindari sikap-sikap yang ekstrim karena ingin agar orang lain selalu memandangnya sebagai seorang yang ramah dan terbuka. Ia senang terlibat dalam situasi sosial namun tidak ingin menjadi pusat perhatian. Ia selalu mencari keseimbangan antara personal dengan pergaulan sosial.",
  },
  DSC: {
    tipe: "Achiever",
    karakter: ["Bersahabat","Tenang","Loyal","Menentukan tujuan","Dorongan untuk mencapai tujuan","Membuat dan mengevaluasi metode baru"],
    deskripsi: "Dalam menghadapi situasi baru, ia cenderung bersifat moderat, ia akan menganalisis situasi dengan pendekatan yang bisa diterima lingkungan, ia menghindari sikap-sikap yang ekstrim karena ingin agar orang lain selalu memandangnya sebagai seorang yang ramah dan terbuka. Ia senang terlibat dalam situasi sosial namun tidak ingin menjadi pusat perhatian. Ia selalu mencari keseimbangan antara personal dengan pergaulan sosial.",
  },
  DSI: {
    tipe: "Achiever",
    karakter: ["Bersahabat","Tenang","Loyal","Menentukan tujuan","Dorongan untuk mencapai tujuan","Membuat dan mengevaluasi metode baru"],
    deskripsi: "Dalam menghadapi situasi baru, ia cenderung bersifat moderat, ia akan menganalisis situasi dengan pendekatan yang bisa diterima lingkungan, ia menghindari sikap-sikap yang ekstrim karena ingin agar orang lain selalu memandangnya sebagai seorang yang ramah dan terbuka. Ia senang terlibat dalam situasi sosial namun tidak ingin menjadi pusat perhatian. Ia selalu mencari keseimbangan antara personal dengan pergaulan sosial.",
  },
  I: {
    tipe: "Promoter",
    karakter: ["Komunikator yang baik","Menciptakan kesan yang menyenangkan","Antusias","Optimis","Persuasif"],
    deskripsi: "Ia menginginkan pengakuan sosial dan takut kehilangan penerimaan dari lingkungannya. Ketika situasi yang sulit muncul, ia cenderung menarik diri pada suatu posisi yang aman secara emosional atau menggunakan orang lain dalam pengambilan keputusan. Ia mudah sekali mempercayai orang dan senang menerima balasan dari kepercayaan itu. Penting bagi dirinya untuk mendengarkan orang disekitarnya dan bukan memikirkan apa yang akan mereka katakan.",
  },
  IC: {
    tipe: "Appraiser",
    karakter: ["Kreatif","Artistik","Keinginan untuk diakui tentang diri dan kemampuannya","Antusias","Optimis","Persuasif","Aktif berbicara"],
    deskripsi: "Ia sangat kompetitif dan memakai cara langsung untuk memperoleh hasil. Ia tidak memberi perintah, tetapi melibatkan orang lain ke dalam pekerjaan dengan memakai metode persuasif. Ia memancing kerjasama orang-orang disekeliling dengan memberi penjelasan tentang dasar dari aktifitas yang akan dilakukan. Ia piawai membantu orang lain memperoleh gambaran mengenai langkah-langkah yang perlu diambil dalam mewujudkan hasil yang diinginkan. Ia biasanya berbicara dengan mempergunakan rencana tindakan yang rinci yang sudah disiapkan dalam rangka memastikan kemajuan yang teratur. Karena begitu ingin meraih kemenangan, dirinya dapat menjadi tidak sabar bila standar yang ada tidak dijalankan. Ia adalah pemikir kritis dan mendalam serta mampu mengekspresikan kritik secara verbal.",
  },
  ICD: {
    tipe: "Appraiser",
    karakter: ["Kreatif","Artistik","Keinginan untuk diakui tentang diri dan kemampuannya","Antusias","Optimis","Persuasif","Aktif berbicara"],
    deskripsi: "Ia sangat kompetitif dan memakai cara langsung untuk memperoleh hasil. Ia tidak memberi perintah, tetapi melibatkan orang lain ke dalam pekerjaan dengan memakai metode persuasif. Ia memancing kerjasama orang-orang disekeliling dengan memberi penjelasan tentang dasar dari aktifitas yang akan dilakukan. Ia piawai membantu orang lain memperoleh gambaran mengenai langkah-langkah yang perlu diambil dalam mewujudkan hasil yang diinginkan. Ia biasanya berbicara dengan mempergunakan rencana tindakan yang rinci yang sudah disiapkan dalam rangka memastikan kemajuan yang teratur. Karena begitu ingin meraih kemenangan, dirinya dapat menjadi tidak sabar bila standar yang ada tidak dijalankan. Ia adalah pemikir kritis dan mendalam serta mampu mengekspresikan kritik secara verbal.",
  },
  ICS: {
    tipe: "Governor",
    karakter: ["Loyal","Dapat diandalkan","Berorientasi pada manusia","Optimis","Praktis"],
    deskripsi: "Karena sensitif terhadap perasaan orang lain, ia merasa sulit untuk membuat keputusan yang berdampak kepada emosi orang lain, dalam hal ini biasanya ia akan mengajak orang lain untuk terlibat dalam proses pengambilan keputusan dan lebih menyenangi bekerja sebagai anggota tim. Ia tidak menyukai konfrontasi namun ia mampu menangani hal tersebut. Kelemahannya adalah ia mudah percaya pada orang lain.",
  },
  ID: {
    tipe: "Persuader",
    karakter: ["Antusias","Inovatif","Optimis","Persuasif","Aktif berbicara","Bersaing untuk mendapatkan pengakuan diri"],
    deskripsi: "Dalam bekerja ia nampak aktif, orang melihatnya sebagi seorang yang ekspresif, 'nervous' dan 'restless'. Ia selalu terlibat dalam dalam berbagai aktivitas, seakan mengetahui berbagai hal. Sifatnya optimis dan mengetahui bagaimana memberikan hasil. Ia adalah seorang komunikator yang dapat diandalkan dan orientasinya yang besar kepada manusia. Hanya saja ia tidak selalu ingin mengambil peran sebagai pemimpin namun lebih menyukai peran sebagai anggota yang mendukung dan memberi bantuan. Ia selalu ingin berada diantara orang lain dan mereka melihat apa yang sedang dikerjakannya. Selain itu dirinya mencari pekerjaan untuk selalu terlihat baik. Bekerja bersama dengan orang lain, tugas yang menantang, pekerjaan yang bervariasi dan aktivitas yang menuntut mobilitas adalah  lingkungan kerja yang sangat disukainya. Namun ia seringkali terlalu optimis tentang hasil kerja dan potensi rekan sekerja. Ia juga cenderung terlalu percaya. Ia lebih menginginkan kebebasan dari aturan dan hal-hal rutin.",
  },
  IDC: {
    tipe: "Leader",
    karakter: ["Antusias","Inovatif","Optimis","Persuasif","Aktif berbicara","Dapat diandalkan","Bersaing untuk mendapatkan pengakuan diri"],
    deskripsi: "Ia terampil dalam berkomunikasi, Ia mampu membuat orang asing merasa santai dan nyaman. Ia mempengaruhi orang lain dengan keterampilan terhadap manusia yang kuat dan kemampuan bernalar dan logika, dengan menggunakan keterampilan verbal untuk menyemangati dan memperkuat orang lain. Ketika sedang berbicara dan memberikan pendapat dan informasi, ia seringkali memperlihatkan kemampuan dirinya untuk membangun harmoni dan kesatuan. Ia bukanlah orang yang diam, menunggu, namun terus menerus terlibat dengan berbagai aktivitas. Ia menginginkan adanya semangat yang datang bersama petualangan baru dan perjumpaan dengan orang-orang baru.",
  },
  IDS: {
    tipe: "Reformer",
    karakter: ["Antusias","Inovatif","Optimis","Persuasif","Aktif berbicara","Penuh perhatian","Bersaing untuk mendapatkan pengakuan diri"],
    deskripsi: "Ia nampaknya mengalami kesulitan untuk mengorganisir waktu. Ia mudah percaya pada orang lain, dan terlalu percaya akan kemampuan orang lain. Ia sensitif terhadap perasaan orang lain dan akan melakukan pekerjaan yang menyenangkan semua orang. Kelebihannya adalah dalam keterampilan sosial, tulus dan empati yang mendalam terhadap orang lain. Hal inilah yang menyebabkan dirinya mampu memotivasi orang lain dengan sangat baik. Ia seorang yang penuh semangat serta mampu mengekspresikan pikiran dan pendapatnya kepada orang lain secara adekuat.",
  },
  IS: {
    tipe: "Agent",
    karakter: ["Antusias","Inovatif","Optimis","Loyal","Telaten","Dorongan untuk mencapai tujuan"],
    deskripsi: "Bila dihadapkan pada situasi konflik atau perselisihan, ia tidak berani berkonfrontasi dan menunjukkan sikap pertentangan dengan orang lain karena tidak ingin dinilai negatif oleh orang lain. Biasanya yang dilakukan dalam situasi ini adalah melibatkan orang lain dan meminta orang tersebut untuk turut serta dalam pengambilan keputusan. Seringkali ia mengambil manfaat pribadi dalam setiap tugas yang telah diselesaikan. Ia sangat baik dalam mengerjakan tugas-tugas untuk orang lain padahal tugas tersebut mungkin sebenarnya sulit untuk dikerjakan sendiri. Namun demikian, ia kurang dapat mementukan prioritas dalam bekerja karena waktunya lebih banyak untuk menjalin persahabatan. Ia juga sulit berhadapan dengan hal-hal yang detail, dan merasa tidak nyaman bila diasingkan oleh orang lain.",
  },
  ISC: {
    tipe: "Governor",
    karakter: ["Loyal","Dapat diandalkan","Berorientasi pada manusia","Mampu memimpin dan dipimpin dengan antusiasme yang sama","Optimis","Praktis"],
    deskripsi: "Karena sensitif terhadap perasaan orang lain, ia merasa sulit untuk membuat keputusan yang berdampak kepada emosi orang lain, dalam hal ini biasanya ia akan mengajak orang lain untuk terlibat dalam proses pengambilan keputusan dan lebih menyenangi bekerja sebagai anggota tim. Ia tidak menyukai konfrontasi namun ia mampu menangani hal tersebut. Kelemahannya adalah ia mudah percaya pada orang lain.",
  },
  ISD: {
    tipe: "Motivator",
    karakter: ["Antusias","Inovatif","Optimis","Loyal","Telaten","Penentu","Dorongan untuk mencapai tujuan"],
    deskripsi: "Bila dihadapkan pada situasi konflik atau perselisihan, ia tidak berani berkonfrontasi dan menunjukkan sikap pertentangan dengan orang lain karena tidak ingin dinilai negatif oleh orang lain. Biasanya yang dilakukan dalam situasi ini adalah melibatkan orang lain dan meminta orang tersebut untuk turut serta dalam pengambilan keputusan. Seringkali ia mengambil manfaat pribadi dalam setiap tugas yang telah diselesaikan. Ia sangat baik dalam mengerjakan tugas-tugas untuk orang lain padahal tugas tersebut mungkin sebenarnya sulit untuk dikerjakan sendiri. Namun demikian, ia kurang dapat mementukan prioritas dalam bekerja karena waktunya lebih banyak untuk menjalin persahabatan. Ia juga sulit berhadapan dengan hal-hal yang detail, dan merasa tidak nyaman bila diasingkan oleh orang lain.",
  },
  S: {
    tipe: "Specialist",
    karakter: ["Pendengar yang baik","Peserta tim","Posesif","Tenang","Mudah diprediksi","Memahami orang lain","Penuh persahabatan","Mampu berempati"],
    deskripsi: "Ia kurang terbuka terhadap informasi kecuali dari orang yang sangat dipercayainya. Rasa memilikinya sangat besar baik terhadap pekerjaan maupun terhadap orang lain, hal ini juga yang merupakan ketakutan terbesarnya adalah hilangnya rasa aman. Ia banyak disukai orang karena sifatnya yang penuh simpati dan mampu berempati. Ia senang membantu dan berdedikasi tinggi serta membutuhkan dukungan dari orang lain. Ia bisa diandalkan untuk mengerjakan sesuatu tugas dari awal hingga akhir karena komitmen yang tinggi.",
  },
  SC: {
    tipe: "Investigator",
    karakter: ["Hati-hati","Posesif","Sensitif","Lambat untuk berubah","Mudah diprediksi","Menghindari konfrontasi","Memendam perasaan"],
    deskripsi: "Ia terlalu mengakomodir semua keinginan orang lain, ia tidak bisa berkata “tidak” karena tidak ingin menyakiti orang lain. Demikian pula dalam mengambil keputusan, ia akan memikirkan secara mendalam dan sangat berhati-hati dalam membuat keputusan dan menjadi semakin sulit memutuskan bila hal tersebut berdampak pada orang lain. Apabila ia dipaksa untuk cepat mengambil keputusan ia akan menjadi sangat cemas, bahkan tidak jarang menjadi seorang yang pasif serta menarik diri. Ia selalu menghindari konflik dan sangat peduli dengan apa yang orang lain pikirkan tentang dirinya agar selalu terlihat baik. Ia tidak mudah marah, perasaan yang ada dalam dirinya pun  tidak ditunjukkannya kepada orang lain. Apabila ia berada dalam kondisi stress, ia menjadi seorang yang menutup diri dan cenderung menjadi seorang yang keras kepala.",
  },
  SCD: {
    tipe: "Inquirer",
    karakter: ["Hati-hati","Lebih berpikir kepada proses","Lambat untuk berubah","Mudah diprediksi","Kemauannya besar","Tidak efektif bekerja bila tergesa-gesa"],
    deskripsi: "Sabar, terkontrol dan senang menganalisa secara mendalam fakta atau gejala yang ada. Ia bekerja sesuai dengan arahan yang jelas, dan bisa diandalkan sebagai \"good finisher\", ia konsisten serta mampu mengakomodir berbagai hal. Ia kurang berani berinisiatif dan kurang cepat menyesuaikan diri dengan cepat dalam lingkungannya.",
  },
  SCI: {
    tipe: "Advocate",
    karakter: ["Tenang","Loyal","Antusias","Optimis","Telaten"],
    deskripsi: "Ia sensitif terhadap orang-orang yang berada di sekitarnya dan akan melakukan yang terbaik untuk menyenangkan orang tersebut dan menjaga suasana yang harmonis. Ia terampil berkomunikasi dan mampu mempengaruhi orang lain dengan pengetahuan yang dimiliki serta kemampuan menganalisa situasi dan orang lain.",
  },
  SD: {
    tipe: "Achiever",
    karakter: ["Bersahabat","Tenang","Loyal","Menentukan tujuan","Dorongan untuk mencapai tujuan","Membuat dan mengevaluasi metode baru"],
    deskripsi: "Dalam menghadapi situasi baru, ia cenderung bersifat moderat, ia akan menganalisis situasi dengan pendekatan yang bisa diterima lingkungan, ia menghindari sikap-sikap yang ekstrim karena ingin agar orang lain selalu memandangnya sebagai seorang yang ramah dan terbuka. Ia senang terlibat dalam situasi sosial namun tidak ingin menjadi pusat perhatian. Ia selalu mencari keseimbangan antara personal dengan pergaulan sosial.",
  },
  SDC: {
    tipe: "Achiever",
    karakter: ["Bersahabat","Tenang","Loyal","Menentukan tujuan","Dorongan untuk mencapai tujuan","Membuat dan mengevaluasi metode baru"],
    deskripsi: "Dalam menghadapi situasi baru, ia cenderung bersifat moderat, ia akan menganalisis situasi dengan pendekatan yang bisa diterima lingkungan, ia menghindari sikap-sikap yang ekstrim karena ingin agar orang lain selalu memandangnya sebagai seorang yang ramah dan terbuka. Ia senang terlibat dalam situasi sosial namun tidak ingin menjadi pusat perhatian. Ia selalu mencari keseimbangan antara personal dengan pergaulan sosial.",
  },
  SDI: {
    tipe: "Agent",
    karakter: ["Antusias","Inovatif","Optimis","Loyal","Telaten","Dorongan untuk mencapai tujuan"],
    deskripsi: "Bila dihadapkan pada situasi konflik atau perselisihan, ia tidak berani berkonfrontasi dan menunjukkan sikap pertentangan dengan orang lain karena tidak ingin dinilai negatif oleh orang lain. Biasanya yang dilakukan dalam situasi ini adalah melibatkan orang lain dan meminta orang tersebut untuk turut serta dalam pengambilan keputusan. Seringkali ia mengambil manfaat pribadi dalam setiap tugas yang telah diselesaikan. Ia sangat baik dalam mengerjakan tugas-tugas untuk orang lain padahal tugas tersebut mungkin sebenarnya sulit untuk dikerjakan sendiri. Namun demikian, ia kurang dapat mementukan prioritas dalam bekerja karena waktunya lebih banyak untuk menjalin persahabatan. Ia juga sulit berhadapan dengan hal-hal yang detail, dan merasa tidak nyaman bila diasingkan oleh orang lain.",
  },
  SI: {
    tipe: "Agent",
    karakter: ["Antusias","Inovatif","Optimis","Loyal","Telaten","Dorongan untuk mencapai tujuan"],
    deskripsi: "Bila dihadapkan pada situasi konflik atau perselisihan, ia tidak berani berkonfrontasi dan menunjukkan sikap pertentangan dengan orang lain karena tidak ingin dinilai negatif oleh orang lain. Biasanya yang dilakukan dalam situasi ini adalah melibatkan orang lain dan meminta orang tersebut untuk turut serta dalam pengambilan keputusan. Seringkali ia mengambil manfaat pribadi dalam setiap tugas yang telah diselesaikan. Ia sangat baik dalam mengerjakan tugas-tugas untuk orang lain padahal tugas tersebut mungkin sebenarnya sulit untuk dikerjakan sendiri. Namun demikian, ia kurang dapat mementukan prioritas dalam bekerja karena waktunya lebih banyak untuk menjalin persahabatan. Ia juga sulit berhadapan dengan hal-hal yang detail, dan merasa tidak nyaman bila diasingkan oleh orang lain.",
  },
  SIC: {
    tipe: "Advocate",
    karakter: ["Tenang","Loyal","Antusias","Optimis","Telaten"],
    deskripsi: "Ia sensitif terhadap orang-orang yang berada di sekitarnya dan akan melakukan yang terbaik untuk menyenangkan orang tersebut dan menjaga suasana yang harmonis. Ia terampil berkomunikasi dan mampu mempengaruhi orang lain dengan pengetahuan yang dimiliki serta kemampuan menganalisa situasi dan orang lain.",
  },
  SID: {
    tipe: "Agent",
    karakter: ["Antusias","Inovatif","Optimis","Loyal","Telaten","Dorongan untuk mencapai tujuan"],
    deskripsi: "Bila dihadapkan pada situasi konflik atau perselisihan, ia tidak berani berkonfrontasi dan menunjukkan sikap pertentangan dengan orang lain karena tidak ingin dinilai negatif oleh orang lain. Biasanya yang dilakukan dalam situasi ini adalah melibatkan orang lain dan meminta orang tersebut untuk turut serta dalam pengambilan keputusan. Seringkali ia mengambil manfaat pribadi dalam setiap tugas yang telah diselesaikan. Ia sangat baik dalam mengerjakan tugas-tugas untuk orang lain padahal tugas tersebut mungkin sebenarnya sulit untuk dikerjakan sendiri. Namun demikian, ia kurang dapat mementukan prioritas dalam bekerja karena waktunya lebih banyak untuk menjalin persahabatan. Ia juga sulit berhadapan dengan hal-hal yang detail, dan merasa tidak nyaman bila diasingkan oleh orang lain.",
  },
}

// Kekuatan, kelemahan, dan pekerjaan yang sesuai per dimensi.
export const KEKUATAN_DISC = {
  "C": [
    "Konservatif",
    "Pemikir",
    "Sadar akan mutu",
    "Mematuhi aturan",
    "Diplomatis",
    "Waspada",
    "Perfeksionis",
    "Senang pada detail",
    "Senang pada rincian yang rumit",
    "Mampu mengorganisasikan tugas",
    "Memiliki perencanaan jangka panjang",
    "Menentukan standar yang tinggi dan ideal",
    "Mampu menganalisa secara mendalam",
    "Bekerja dengan akurasi tinggi",
    "Konsisten menjaga kualitas"
  ],
  "D": [
    "Percaya diri",
    "Berkemauan keras",
    "Tekun dan ulet",
    "Berani dan tegar",
    "Menghadapi hidup tanpa kompromi",
    "Organisator dan promotor",
    "Cepat bertindak",
    "Berani memutuskan dalam keadaan mendesak",
    "Mampu memberikan solusi",
    "Memiliki inisiatif",
    "Mampu bekerja dengan cepat",
    "Memotivasi orang lain untuk bekerja",
    "Memberikan pertimbangan yang tepat",
    "Cepat membuat keputusan",
    "Berani mengambil resiko"
  ],
  "I": [
    "Hangat dan bersemangat",
    "Berkharisma",
    "Antusias",
    "Ekspresif",
    "Aktif",
    "Enerjik",
    "Meyakinkan",
    "Memberikan semangat",
    "Hangat",
    "Aktif berbicara",
    "Senang membina hubungan sosial dengan orang lain",
    "Penampilan yang modis",
    "Optimis",
    "Humoris",
    "Mampu menyampaikan dengan jelas"
  ],
  "S": [
    "Tenang, cinta damai",
    "Ramah",
    "Sopan santun",
    "Baik hati/ lembut hati",
    "Tidak emosional",
    "Sabar",
    "Setia",
    "Tekun",
    "Praktis, sederhana dalam bekerja",
    "Keterampilan berinteraksi dengan orang lain",
    "Mampu melibatkan orang lain",
    "Menggunakan prinsip keseimbangan antara bekerja dan keluarga",
    "Terbuka pada gagasan orang lain",
    "Memiliki kesabaran dan ketenangan dalam bekerja",
    "Memiliki Empati yang tinggi"
  ]
}

export const KELEMAHAN_DISC = {
  "C": [
    "Menyalahkan diri sendiri",
    "Cenderung Rigid",
    "Pesimis, seringkali berpikir negatif",
    "Sedih tanpa alasan",
    "Sangat berhati-hati",
    "Over Sensitif",
    "Sulit memutuskan",
    "Tidak tegas",
    "Terlalu banyak teori, kurang praktis",
    "Mudah tersinggung",
    "Terlalu banyak waktu digunakan untuk persiapan",
    "Terlalu fokus pada hal detail",
    "Mengingat hal-hal negatif",
    "Menaruh curiga kepada orang lain",
    "Menaruh curiga kepada orang lain"
  ],
  "D": [
    "Pendiriannya sangat keras",
    "Terlalu cepat mengambil keputusan",
    "Tidak sabaran, suka menekan",
    "Pendobrak, pemberontak",
    "Kurang peka terhadap perasaan orang lain",
    "Terlalu percaya diri",
    "Kurang menghargai pendapat orang lain",
    "Cenderung suka mengakali",
    "Kurang analitis, jemu dengan hal detail",
    "Terlalu ingin dianggap sebagai pemimpin",
    "Cenderung mendominasi",
    "Memaksakan kehendak",
    "Cenderung egois",
    "Kurang sensitif",
    "Tidak sabaran"
  ],
  "I": [
    "Terlalu reaktif",
    "Kurang tenang, tidak kalem",
    "Cenderung melebih-lebihkan sesuatu",
    "Pandai berpura-pura/basa basi",
    "Terlalu bergairah, meledak-ledak",
    "Keputusannya sering berdasarkan emosi",
    "Tidak teratur, acak-acakan",
    "Tidak ketat dalam disiplin diri",
    "Banyak waktu terbuang karena mengobrol berlebihan",
    "Tidak terorganisir",
    "Sulit mengingat nama orang dan hal detail",
    "Melebih-lebihkan",
    "Tidak serius tentang berbagai hal",
    "Mudah percaya pada orang lain",
    "Impulsif"
  ],
  "S": [
    "Kurang percaya diri",
    "Cenderung pemalu",
    "Pesimis, penakut, selalu khawatir",
    "Kompromistis",
    "Membenarkan diri sendiri",
    "Lamban, statis",
    "Terlalu hati-hati",
    "Cenderung menghindari resiko",
    "Menolak/takut pada perubahan",
    "Sulit memutuskan sesuatu",
    "Kurang menunjukkan antusiasme kerja",
    "Sulit menolak permintaan orang lain",
    "Santai dalam bekerja",
    "Menghindari konflik",
    "Kurang ekspresif"
  ]
}

export const PEKERJAAN_DISC = {
  "C": [
    "Pekerjaan yang menuntut akurasi dan ketepatan",
    "Menganalisa masalah secara mendalam",
    "Pendekatan kritis dalam menyelesaikan masalah",
    "Menjelaskan secara menyeluruh dan sistimatis tentang tugas",
    "Mentaati prosedur operasi standar",
    "Merancang dan mengembangkan program",
    "Mengumpulkan informasi secara rinci",
    "Melakukan evaluasi program",
    "Verifikasi, validasi dan pengendalian pekerjaan",
    "9"
  ],
  "D": [
    "Pekerjaan yang membutuhkan pengambilan keputusan secara cepat",
    "Pekerjaan yang berorientasi kepada hasil",
    "Pekerjaan yang kompetitif dan banyak tantangan",
    "Bebas dari pekerjaan detail dan spesifik",
    "Menggunakan kekuasaan dan wewenang",
    "Mengambil suatu gagasan dan menjalankannya",
    "Beragam kegiatan",
    "Bebas dari pengawasan langsung",
    "Memunculkan ide-ide baru",
    "9"
  ],
  "I": [
    "Banyak berhubungan dengan orang lain",
    "Pekerjaan yang memerlukan pendekatan persuasif",
    "Melakukan verbalisasi yang inspiratif",
    "Aktif dan mobilitas tinggi",
    "Kesempatan untuk mempresentasikan konsep baru",
    "Mengembangkan kegiatan baru yang berbeda",
    "Pekerjaan yang cepat berubah-ubah",
    "Pekerjaan yang melibatkan hubungan dengan orang lain",
    "Melakukan pembinaan dan arahan kepada orang lain",
    "9"
  ],
  "S": [
    "Pekerjaan yang menuntut kesabaran",
    "Mengikuti prosedur baku",
    "Klarifikasi kebijakan sebelum melangkah",
    "Mengumpulkan informasi, fakta dan data",
    "Melakukan penyiapan bahan-bahan pendukung",
    "Menyimpan dan memeliharan dokumen",
    "Pekerjaan rutin dan administratif",
    "Melaksanakan, mengelola pekerjaan sesuai peraturan",
    "Pekerjaan yang memerlukan konsistensi dalam jangka waktu panjang",
    "9"
  ]
}
