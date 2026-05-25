import { useLocation, useNavigate } from 'react-router-dom'

const deskripsiMBTI = {
  ISTJ: {
    dominan: "Secara dominan menggunakan kecenderungan Sensing secara internal dan kecenderungan Thinking secara eksternal.",
    karakteristik: ["ISTJ adalah orang yang tenang yang mencari stabilitas dan kedamaian.", "Bekerja sendiri dan bisa diandalkan untuk hasilnya, tetapi mereka juga nyaman bekerja bersama dalam tim bila hal itu diperlukan untuk menyelesaikan pekerjaan dengan baik, asalkan peran dan fungsi masing-masing sudah jelas.", "Kompetensi dan tanggung jawab adalah yang terpenting.", "Sangat berpegang pada aturan dan tradisi, dan berharap semua orang juga melakukan hal yang sama.", "Sangat menghormati fakta, realistis, praktis, analitis, dan sistematis.", "Mendukung perubahan asalkan memiliki alasan yang logis."],
    kekuatan: ["Memiliki rasa tanggung jawab dan kesetiaan yang tinggi terhadap organisasi, keluarga dan hubungan.", "Sangat berorientasi pada tugas dan secara metodik mereka biasanya mampu menyelesaikannya.", "Sangat loyal, tekun, menepati janji, dan bisa diandalkan.", "Memegang aturan, standar dan prosedur dengan teguh.", "Pendengar yang baik."],
    relationship: ["ISTJ hanya mau berbagi pada orang yang benar-benar dekat dengan dirinya.", "ISTJ sulit memahami bahwa orang lain memiliki kebutuhan yang berbeda dengan dirinya.", "ISTJ sangat setia dan menghargai ikatan hubungan yang terjadi.", "ISTJ akan memperjuangkan dengan segenap usaha untuk mempertahankan hubungan yang mereka anggap penting."],
    keputusan: ["ISTJ cenderung tegas dan obyektif. Ia sering mengesampingkan perasaan dalam mengambil keputusan.", "ISTJ berorientasi pada permasalahan dan menganalisa sebab akibatnya.", "Menganalisa dulu data dan fakta yang ada, kemudian mengambil keputusan berdasarkan hasil analisanya."],
    informasi: ["Memproses dengan pedoman logika, sesuatu yang tidak masuk akal segera dibuang oleh ISTJ.", "Sulit memahami sesuatu yang berbeda dengan perspektifnya.", "Informasi terpenting bagi ISTJ adalah fakta dan data."],
    komunikasi: ["Menggunakan logika dan analisa untuk mengenali kelemahan.", "Ingin tahu 'mengapa'.", "Menyukai informasi yang disajikan secara obyektif.", "Mempertimbangkan pro dan kontra.", "Menggunakan bahasa yang tepat dan padat."],
    kepuasan: ["Menggunakan pengalaman dan pengetahuan mereka untuk keuntungan institusi atau hubungan yang terikat dengan mereka.", "Mampu menciptakan kehidupan yang lebih baik, teratur, dan nyaman untuk keluarga, institusi, atau lingkungan sosial."],
    pemimpin: ["Sebagai pemimpin, ISTJ sangat menjunjung tinggi peraturan, standar dan kompetensi. ISTJ sulit mentolerir pelanggaran terutama jika alasannya adalah hal-hal yang tidak masuk akal.", "Sebagai pengikut, ISTJ mengharapkan aturan dan standar yang jelas dan masuk akal. Jika ISTJ menemukan pemimpin yang kompeten dan menjaga standar, ISTJ akan sangat loyal."],
    stres: ["Sangat kaku dan strict pada aturan, deadline, dan prosedur.", "Kritis dan suka menghakimi.", "Sulit mempercayai orang dan sulit mendelegasikan tanggung jawab."],
    stresKuat: ["Sulit berpikir dengan akal sehat.", "Tidak bisa lagi menunjukkan ketenangan.", "Terjebak dalam keadaan Catastrophizing, yaitu membayangkan hal-hal negatif terjadi pada diri sendiri dan orang lain."],
    pandangan: ["Di mata orang lain ISTJ dianggap orang yang prosedural, berstandar, dan penuh penghakiman.", "Pendiam, serius, dan konsisten.", "Teratur.", "Kadang-kadang ISTJ dianggap keras kepala."],
    waspada: ["Mereka tidak akan mau terlibat dan mengacuhkan hal-hal yang menurut mereka tidak penting atau tidak masuk akal.", "Terlalu berpikir logis sehingga bisa saja mengabaikan dampaknya pada orang lain.", "Mengabaikan hubungan dan sulit memahami kebutuhan personal orang lain.", "Merasa dirinya selalu benar."],
    saran: ["Gunakan waktu untuk melakukan perenungan, kekuatan ISTJ adalah pada kemampuan mengorganisasi data dan melakukan analisa.", "Belajarlah memahami perasaan orang lain dan menyadari bahwa mereka memiliki kebutuhan yang tidak sama dengan kebutuhan Anda.", "Kurangilah keinginan Anda untuk mengontrol orang lain.", "Lebih banyaklah melihat sisi positif baik terhadap diri Anda sendiri, orang lain, maupun dalam memandang kehidupan.", "Terbukalah terhadap perubahan."],
  },
  ISFJ: {
    dominan: "Secara dominan menggunakan kecenderungan Sensing secara internal dan kecenderungan Feeling secara eksternal.",
    karakteristik: ["ISFJ orang yang penuh pertimbangan.", "Mengambil peran dan tanggung jawab secara serius.", "Fokus pada kebutuhan orang lain dan menghargai hubungan.", "Praktis dan realistis.", "Kooperatif dan Sensitif.", "Tradisional dan konservatif."],
    kekuatan: ["Memperhatikan kebutuhan orang lain.", "Sangat ahli dalam membaca dan mengenali perasaan orang lain.", "Sangat bertanggung jawab dan bisa diandalkan.", "Pendengar yang baik.", "Kemampuan mengorganisasi yang baik."],
    relationship: ["ISFJ sangat berkomitmen dan menghargai hubungan.", "ISFJ siap berkorban dan banyak memberi untuk sebuah hubungan.", "Gemar membantu dan menempatkan kepentingan orang lain di atas kepentingannya sendiri.", "ISFJ memiliki toleransi yang tinggi."],
    keputusan: ["ISFJ mengambil keputusan berdasarkan pengalaman di masa lalu dan kebiasaan yang sudah pernah dilakukan sebelumnya.", "Jika ISFJ tidak memiliki panduan, ia akan mempertimbangkan dari segi perasaan orang lain dan berusaha menjaga situasi harmonis."],
    informasi: ["Menerima informasi yang praktis dan realistis, khususnya yang berhubungan dengan orang dan hubungan.", "Memiliki daya ingat yang baik untuk menyimpan banyak informasi.", "Sulit menerima informasi yang berbeda dengan cara pandangnya."],
    komunikasi: ["Fokus pada situasi dan nilai-nilai yang subyektif.", "Melihat kekuatan dan hal-hal yang positif.", "Menyukai dukungan dan umpan balik yang positif.", "Ingin mengenali orang secara pribadi.", "Hangat, suportif, ekspresif."],
    kepuasan: ["Mampu memberikan kontribusi berarti untuk orang lain.", "Mampu mengatur segala sesuatunya berjalan lancar, harmonis, dan praktis."],
    pemimpin: ["Sebagai pemimpin ISFJ adalah tipe pemimpin tradisional dan berorientasi pada situasi harmonis.", "Sebagai pengikut ISFJ adalah orang yang sangat loyal. Bila ia menemukan pemimpin yang bisa menghargai dirinya secara personal, ia akan memberikan segala-galanya."],
    stres: ["Setia terhadap sesuatu yang dia yakini secara membabi buta.", "Sering komplain.", "Berlebihan dalam memikirkan dampak dari setiap keputusan dan tindakan."],
    stresKuat: ["Terjebak dalam keadaan Catastrophizing, yaitu membayangkan hal-hal negatif terjadi pada diri sendiri dan orang lain."],
    pandangan: ["Pendiam dan pasif dalam pergaulan.", "Menghindari konflik dan suka perdamaian.", "Kadang-kadang dianggap plin-plan karena ingin menyenangkan semua orang.", "Serius dan tenang.", "Sangat memegang teguh tradisi."],
    waspada: ["Meski menyadari perasaannya, ISFJ sulit mengungkapkannya.", "Terlalu memperhatikan orang lain tanpa memperdulikan fakta-fakta yang ada.", "Tidak bisa berkata 'tidak' dan akibatnya ia sering mengorbankan dirinya demi orang lain.", "Sulit menghadapi kritik."],
    saran: ["Anda harus menyadari bahwa segala sesuatu tidak seperti yang terlihat di permukaan.", "Belajarlah mengekspresikan perasaan Anda dan belajar untuk berkata 'tidak'.", "Keluarlah dari zona nyaman Anda.", "Belajarlah menerima dan menghadapi kenyataan."],
  },
  INFJ: {
    dominan: "Secara dominan menggunakan kecenderungan Intuition secara internal dan kecenderungan Feeling secara eksternal.",
    karakteristik: ["INFJ memiliki intuisi yang tajam dalam memahami hal-hal yang kompleks dan abstrak.", "INFJ mampu memahami dan membaca perasaan serta motivasi orang lain.", "Visioner, kreatif, dan cara pandangnya luas.", "Simbolis, idealis, dan berpikir dengan mendalam.", "Persuasif dan empati.", "Pendiam namun sangat memegang teguh prinsipnya."],
    kekuatan: ["Secara alami INFJ adalah orang yang perhatian.", "Memiliki kemampuan komunikasi yang baik dalam menulis.", "Sangat serius dan berkomitmen terhadap sebuah hubungan.", "Mampu berpikiran ke depan (visioner).", "Penuh dengan ide dan kreatifitas."],
    relationship: ["Hanya membagikan intuisi dan ide mereka pada orang yang benar-benar ia percayai.", "Sangat berkomitmen dalam sebuah hubungan."],
    keputusan: ["INFJ mengambil keputusan berdasarkan intuisi dan perasaan.", "Perasaan orang lain dan situasi harmonis menjadi salah satu pertimbangan penting dalam pengambilan keputusan seorang INFJ."],
    informasi: ["INFJ cenderung tertarik pada informasi-informasi yang berupa ide, pemikiran baru, teori baru.", "INFJ hanya tertarik pada data dan fakta yang bisa mendukung visi dan pencapaian 'big picture'nya.", "Testimonial dan cerita-cerita yang mengandung unsur personal akan lebih bisa diterima INFJ."],
    komunikasi: ["Fokus pada situasi dan nilai-nilai yang subyektif.", "Melihat kekuatan dan hal-hal yang positif.", "Menyukai dukungan dan umpan balik yang positif.", "Ingin mengenali orang secara pribadi.", "Hangat, suportif, ekspresif."],
    kepuasan: ["Mampu mendapatkan tingkat pemahaman dan pengetahuan yang dalam dan mempraktikkannya untuk memenuhi kebutuhan orang lain.", "Jika memiliki pemahaman yang luas dan mendalam terhadap hal-hal yang dianggap abstrak dan kompleks."],
    pemimpin: ["Sebagai pemimpin, INFJ adalah orang yang visioner dan punya banyak goal yang ingin direalisasikan. INFJ berusaha mengakomodir semua orang.", "Sebagai pengikut, jika INFJ sudah mempercayai sesuatu, ia cenderung akan keras kepala. INFJ sangat loyal kepada pemimpin yang menaruh perhatian pada potensi yang ia miliki."],
    stres: ["Mengambil keputusan atau tindakan tanpa menjelaskan alasannya.", "Terlalu mengandalkan intuisi mereka.", "Menjadi sangat kritis.", "Menarik dukungan dan pemikiran mereka."],
    stresKuat: ["Terobsesi dengan data yang biasanya mereka anggap tidak relevan.", "Terlibat dalam aktivitas yang tidak penting secara berlebihan."],
    pandangan: ["Pendiam, serius dan cenderung misterius.", "Untuk orang yang sudah mulai kenal, mereka akan merasa bahwa INFJ cukup perhatian.", "Kreatif dan berpikiran luas."],
    waspada: ["Kesulitan mengungkapkan pemikiran mereka secara verbal.", "Single minded dalam mengejar visi mereka dan perfeksionis.", "Sangat membenci kritik dan konflik."],
    saran: ["Belajarlah mendiskusikan ide dan pemikiran Anda.", "Lakukan anger management dan tingkatkan manajemen emosi Anda.", "Jangan menyalahkan orang lain atau situasi untuk masalah yang Anda hadapi.", "Relaks. Sekali-kali Anda boleh berhenti berpikir dan bekerja."],
  },
  INTJ: {
    dominan: "Secara dominan menggunakan kecenderungan Intuition secara internal dan kecenderungan Thinking secara eksternal.",
    karakteristik: ["Cenderung tertutup.", "INTJ lebih mempercayai opininya dibandingkan pendapat umum.", "Cara pandangnya luas, konseptual, dan berpikir jangka panjang.", "Kritis, rasional, dan menggunakan logika.", "Independen dan yakin dengan pengetahuan dan pemikirannya sendiri.", "INTJ sangat terencana dan hati-hati."],
    kekuatan: ["INTJ adalah seseorang yang visioner sekaligus praktis.", "INTJ memiliki kemampuan analisa yang bagus.", "Percaya diri dengan kemampuannya.", "Memiliki keinginan berkembang dan maju lebih dari orang lain.", "Setiap tindakannya selalu efisien, teratur, sudah dipikirkan dengan matang.", "Kritik dan konflik tidak menjadi masalah berarti bagi INTJ."],
    relationship: ["INTJ selektif dalam hubungan dan menyukai sebuah hubungan yang konsisten dan berkomitmen teguh.", "INTJ selalu berusaha memberi yang terbaik dan selalu mengusahakan peningkatan dalam hubungan mereka.", "INTJ adalah pendengar yang baik, tetapi umumnya selalu bergerak untuk mencari solusi permasalahan."],
    keputusan: ["Berdasarkan pemikiran dan analisanya. Jika INTJ merasa sudah yakin dengan pemikiran-pemikirannya, ia akan mengambil keputusan dengan mutlak.", "Keputusan yang diambil INTJ selalu melalui proses analisa dan pemikiran yang dalam."],
    informasi: ["INTJ bisa menangkap banyak informasi, termasuk yang rumit dan abstrak.", "INTJ memperhatikan teori dan data hanya untuk mengambil 'inti sari'nya dan manfaatnya untuk mendukung pencapaian goal."],
    komunikasi: ["Menggunakan logika dan analisa untuk mengenali kelemahan.", "Ingin tahu 'mengapa'.", "Menyukai informasi yang disajikan secara obyektif.", "Mempertimbangkan pro dan kontra.", "Menggunakan bahasa yang tepat dan padat."],
    kepuasan: ["INTJ merasakan kepuasan ketika ia berhasil menemukan ide baru yang visioner dan berhasil mewujudkannya.", "INTJ akan merasa sangat berarti jika dia berhasil mencapai kompetensi dan memiliki pengetahuan di atas rata-rata."],
    pemimpin: ["Sebagai pemimpin, INTJ adalah seseorang yang sangat visioner dan bisa melakukan perencanaan-perencanaan yang tepat. Namun, INTJ lebih banyak berfokus pada hal-hal teknis dan pekerjaan.", "Sebagai pengikut, INTJ mengharapkan struktur dan job description yang jelas. INTJ sangat menghargai pemimpin yang memiliki kompetensi."],
    stres: ["Menyendiri dan menjadi sangat pendiam.", "Kritis dan menjadi reaktif.", "Menjadi keras kepala dan mengabaikan orang lain."],
    stresKuat: ["Tenggelam pada kegiatan-kegiatan yang sebenarnya mereka anggap tidak berguna.", "Menjadi sangat rewel dengan detail-detail yang biasanya mereka anggap tidak penting."],
    pandangan: ["Orang yang belum mengenal INTJ akan menganggap dia sangat kaku, pendiam, dan dingin.", "Untuk beberapa orang yang melihat kelebihan INTJ, mereka akan menganggap INTJ adalah orang yang bisa diandalkan dan percaya diri.", "Individualistis, tidak berperasaan, dan cenderung keras kepala."],
    waspada: ["Kadang-kadang kurang peka terhadap perasaan orang lain.", "Kesulitan untuk mengungkapkan perasaan dan mengekspresikan emosinya.", "Kecenderungan untuk merasa dirinya paling benar.", "Kadang-kadang menarik diri dari pergaulan."],
    saran: ["Belajarlah mengungkapkan perasaan Anda.", "Jangan meremehkan ide orang lain.", "Jangan mengisolasi diri Anda dan menarik dari pergaulan.", "Perdalam kemampuan Anda dengan banyak membaca dan memperluas wawasan.", "Pakailah kacamata optimis."],
  },
  ISTP: {
    dominan: "Secara dominan menggunakan kecenderungan Thinking secara internal dan kecenderungan Sensing secara eksternal.",
    karakteristik: ["Berhati-hati, penuh perhitungan.", "Logis dan rasional.", "Kritis dan obyektif. Mampu mengesampingkan perasaan.", "Tenang, pendiam, cenderung kaku dan dingin.", "Mampu menghadapi perubahan mendadak dengan cepat dan tenang.", "Sangat memegang teguh sesuatu yang ia percayai."],
    kekuatan: ["Umumnya ISTP adalah orang yang percaya diri.", "Mampu menghadapi kritik dan perbedaan.", "Detail, berpikir panjang, logis, dan terencana.", "Mampu menghadapi masalah-masalah mendadak dengan tenang.", "Tegas dan menjaga nilai-nilai yang ia percayai."],
    relationship: ["ISTP sangat selektif dalam membangun hubungan.", "ISTP sulit menerima konsep 'cinta tak bersyarat'.", "ISTP sulit mengenali kebutuhan emosional orang lain."],
    keputusan: ["ISTP mengambil keputusan melalui rangkaian analisa dan membandingkan dengan metode-metode yang pernah ada.", "ISTP cenderung mengabaikan dampak emosional dari keputusannya. Tujuan utama ISTP adalah menyelesaikan masalah dengan seefisien mungkin."],
    informasi: ["ISTP menyukai data dan fakta praktis. Informasi yang terlalu rumit dan abstrak akan diabaikan.", "Pikiran ISTP berfungsi seperti prosesor komputer, ia menerima berbagai data, mengolahnya, dan membuat kesimpulan."],
    komunikasi: ["Membutuhkan fakta, data, detail dan contoh konkrit.", "Mengaitkan informasi dengan aplikasi langsung.", "Fokus pada 'disini dan sekarang'.", "Nyaman pada hal-hal yang familiar dan praktis."],
    kepuasan: ["Kepuasan ISTP adalah ketika ia berhasil menyelesaikan pekerjaan-pekerjaan yang melibatkan fisik dan teknis.", "ISTP merasa dirinya diciptakan untuk menjadi problem solver terutama di saat-saat mendadak dan urgent."],
    pemimpin: ["Sebagai pemimpin, ISTP adalah orang yang logis, obyektif dan tidak terlalu terlibat dengan kehidupan personal bawahannya.", "Sebagai pengikut, ISTP termasuk tipe yang cukup loyal. ISTP mengharapkan pemimpin yang tidak terlalu menekan dan memberinya sedikit ruang untuk bekerja sendiri."],
    stres: ["Sinis dan mengkritisi secara negatif.", "Menarik semua pemikiran mereka.", "Berdiam diri dan terjebak dalam dunia internalnya sendiri."],
    stresKuat: ["Emosinya menjadi meledak-ledak dan tidak terkontrol."],
    pandangan: ["Logis dan cenderung tidak mau kalah.", "Tidak berperasaan.", "Bisa diandalkan dan banyak akal.", "Misterius, cenderung independen, dan sulit mempercayai orang."],
    waspada: ["Terlalu berfokus pada solusi dan mengabaikan perasaan orang lain.", "Kadang-kadang terlalu percaya diri.", "Cenderung menyimpan informasi dan mengolahnya sendirian."],
    saran: ["Beranilah keluar dari area nyaman Anda.", "Cobalah amati prinsip-prinsip kehidupan sosial yang terjadi.", "Beranilah mencintai. Jangan terlalu takut untuk terlibat dalam sebuah hubungan.", "Kenali perasaan Anda dan belajarlah mengekspresikannya."],
  },
  ISFP: {
    dominan: "Secara dominan menggunakan kecenderungan Feeling secara internal dan kecenderungan Sensing secara eksternal.",
    karakteristik: ["ISFP adalah orang yang berpikiran simpel dan praktis.", "Tidak banyak bicara tetapi memiliki kepekaan untuk merasakan kebutuhan orang lain.", "ISFP cenderung pendiam dan tipe 'do'er' yang loyal.", "Spontan, cenderung tidak teratur dan seadanya.", "ISFP cukup perhatian dengan orang lain dan biasanya mewujudkannya dalam tindakan-tindakan praktis."],
    kekuatan: ["Memiliki sisi praktikal sekaligus sense estetika dan kreativitas.", "Menunjukkan perhatiannya lebih melalui tindakan dibandingkan dengan kata-kata.", "Fleksibel dan simpel.", "Setia dan menghargai komitmen.", "Pendengar yang baik."],
    relationship: ["ISFP menghargai komitmen jangka panjang.", "ISFP cukup peka dengan kebutuhan dan perasaan orang lain.", "ISFP tidak menyukai hubungan yang banyak aturan dan tuntutan.", "ISFP sangat toleran dalam banyak hal."],
    keputusan: ["ISFP cenderung mengambil keputusan dengan spontan.", "ISFP juga melibatkan unsur perasaan sebagai pertimbangan utamanya.", "ISFP cenderung mengabaikan berbagai analisa dan lebih mempercayai intuisi."],
    informasi: ["ISFP tidak menyukai informasi abstrak dan rumit.", "ISFP menyukai informasi yang sudah 'matang' dan sudah berupa kesimpulan."],
    komunikasi: ["Membutuhkan fakta, data, detail dan contoh konkrit.", "Mengaitkan informasi dengan aplikasi langsung.", "Fokus pada 'disini dan sekarang'.", "Nyaman pada hal-hal yang familiar dan praktis."],
    kepuasan: ["ISFP merasakan kepuasan ketika ia bisa memberikan banyak hal untuk orang lain.", "ISFP akan merasa berarti jika dia berhasil mengekspresikan kreatifitasnya."],
    pemimpin: ["Sebagai pemimpin ISFP mengutamakan apa yang bisa dilakukan untuk hari ini. ISFP sangat menghargai bawahannya.", "Sebagai pengikut, ISFP membutuhkan job desc yang jelas dan praktis. Jika ISFP menemukan pemimpin yang bisa menghargai kemampuan dan sisi personalnya, ia akan sangat respek."],
    stres: ["Menarik diri dari orang dan situasi yang ada.", "Mengabaikan organisasi, aturan, dan struktur.", "Mengkritik diri-sendiri karena merasa tidak berharga."],
    stresKuat: ["ISFP akan sangat kritis terhadap diri-sendiri dan kepada orang lain juga."],
    pandangan: ["Santai, tenang, dan apa adanya.", "Moody, sensitif, dan mudah terbawa perasaan.", "Terlihat kurang teratur."],
    waspada: ["ISFP lemah dalam perencanaan dan membuat konsep.", "Sangat menginginkan situasi harmonis dan menghindari konflik.", "Kadang-kadang sangat dipengaruhi oleh mood."],
    saran: ["Anda tidak perlu menyenangkan semua orang.", "Cobalah untuk mengekspresikan perasaan Anda.", "Anda perlu lebih terbuka terhadap perspektif orang lain.", "Cobalah untuk mulai memikirkan dampak jangka panjang dari keputusan-keputusan Anda."],
  },
  INFP: {
    dominan: "Secara dominan menggunakan kecenderungan Feeling secara internal dan kecenderungan Intuition secara eksternal.",
    karakteristik: ["Sangat peka dengan kebutuhan emosional orang lain.", "INFP adalah orang yang kreatif, penuh ide, dan visioner.", "INFP sangat mengejar keharmonisan dan situasi damai.", "INFP meskipun terkesan pendiam, sebenarnya sangat menyukai hubungan.", "Cenderung idealis dan perfeksionis.", "INFP memiliki tingkat toleransi yang tinggi."],
    kekuatan: ["Sangat perhatian dan peka dengan perasaan orang lain.", "Sangat berkomitmen dan loyal.", "Selalu berpikir secara 'win-win' solution.", "Kreatif, inovatif, dan memiliki ide-ide yang jarang dimiliki orang lain."],
    relationship: ["INFP selalu berusaha menjaga hubungan agar terhindar dari konflik.", "INFP sangat peka dengan kebutuhan dan perasaan orang lain.", "INFP sulit percaya di awal hubungan, tetapi ketika sudah mempercayai seseorang, ia akan memberikan segalanya."],
    keputusan: ["INFP mengambil keputusan berdasarkan perasaannya.", "Pertimbangan utama INFP adalah apakah dampak keputusan itu terhadap kehidupan dan perasaan orang lain."],
    informasi: ["INFP sangat tertarik pada teori, konsep, dan ide yang berhubungan dengan orang dan pengembangannya.", "Cerita-cerita yang menyentuh perasaan adalah prioritas utama yang akan diserap oleh INFP."],
    komunikasi: ["Ingin mengetahui implikasi dan keterkaitan, tidak hanya fakta.", "Menyukai curah gagasan atau bermain dengan ide.", "Fokus pada masa depan dan aspek jangka panjang.", "Melihat pola dan memahami 'garis besar'."],
    kepuasan: ["INFP menghargai kreatifitas, keseriusan hidup, spiritualitas, dan hubungan sesama manusia.", "Tujuan kehidupan INFP adalah untuk menciptakan dunia yang lebih baik."],
    pemimpin: ["Sebagai pemimpin, INFP sangat menghargai bawahannya dan berusaha untuk selalu mengembangkan bawahannya.", "Sebagai pengikut, INFP adalah orang yang sangat loyal. Pemimpin yang sangat ia kagumi adalah mereka yang bisa masuk dan merasakan kehidupan personalnya."],
    stres: ["Semakin sulit mengekspresikan perasaan mereka secara verbal.", "Menyimpan informasi untuk diri-sendiri.", "Menarik diri dari situasi dan dari orang lain."],
    stresKuat: ["Menjadi sangat kritis dan suka menghakimi orang lain, dan meragukan diri mereka sendiri."],
    pandangan: ["INFP adalah orang yang pendiam dan sensitif.", "INFP cenderung pilih-pilih dalam berteman.", "Kadang-kadang sulit dipahami dan berpikir 'di awang-awang'."],
    waspada: ["Kadang terlalu merasa 'sungkan' atau tidak enak.", "Selalu menghindari konflik dan kritik.", "Memiliki kebutuhan yang sangat tinggi untuk dihargai.", "Mudah dipengaruhi oleh orang lain."],
    saran: ["Kritik tidak berarti kiamat. Belajarlah menghadapi kritik dengan senyuman.", "Belajarlah bersikap tegas.", "Jangan ragu-ragu untuk bertanya dan meminta feedback.", "Jangan terlalu menyalahkan diri Anda."],
  },
  INTP: {
    dominan: "Secara dominan menggunakan kecenderungan Thinking secara internal dan kecenderungan Intuition secara eksternal.",
    karakteristik: ["Memakai pendekatan logis hampir di semua hal.", "Cenderung skeptis dan pesimis.", "Menyukai ide-ide yang rumit.", "Sangat menghargai intelektualitas dan pengetahuan.", "Sulit membaca emosi/perasaan orang lain.", "Cenderung kritis, sarkastik, dan tidak suportif.", "Lebih suka bekerja sendiri."],
    kekuatan: ["Jika bertemu dengan sesuatu yang menarik minatnya, ia akan sangat serius dan antusias.", "Sangat imajinatif dan kreatif.", "Tidak menganggap kritik dan konflik sebagai masalah.", "Mampu menganalisa hal-hal yang abstrak dan rumit.", "Sangat berkomitmen dan loyal."],
    relationship: ["Umumnya INTP tidak memiliki banyak teman, tetapi INTP sangat menjaga hubungan yang sudah terjalin.", "INTP tidak mudah terbuka pada orang lain.", "INTP menganggap hubungan adalah sesuatu yang serius."],
    keputusan: ["INTP mengambil keputusan dengan menggunakan logika, pengalaman, dan pengetahuannya.", "INTP bersikap obyektif dan mengabaikan perasaan dalam mengambil keputusan."],
    informasi: ["INTP menyukai informasi yang abstrak dan ide-ide rumit.", "INTP tidak tertarik dengan cerita-cerita personal yang tidak masuk akal bagi mereka."],
    komunikasi: ["Ingin mengetahui implikasi dan keterkaitan, tidak hanya fakta.", "Mudah bosan dan tidak sabar dengan detail.", "Menyukai curah gagasan.", "Fokus pada masa depan dan aspek jangka panjang.", "Melihat pola dan memahami 'garis besar'."],
    kepuasan: ["INTP akan merasa sangat puas jika dia mencapai tingkat intelektual dan kompetensi yang sangat tinggi.", "INTP merasa puas ketika ia berhasil memahami ide-ide yang kompleks yang tidak bisa dipahami oleh orang lain."],
    pemimpin: ["Sebagai pemimpin INTP adalah orang yang memiliki visi dan tujuan yang jelas. Tetapi INTP kesulitan dengan detail dan pelaksanaan.", "Sebagai pengikut, INTP adalah orang yang bisa diandalkan untuk menyelesaikan pekerjaan yang sesuai dengan kemampuannya."],
    stres: ["Sinis, sarkastik, dan suka mengkritik.", "Tenggelam dalam perdebatan-perdebatan yang tidak penting.", "Mengucapkan kata-kata pedas.", "Mengisolasi diri."],
    stresKuat: ["Emosi INTP akan menjadi meledak-ledak dan tampak mengerikan."],
    pandangan: ["INTP adalah orang yang pandai.", "Bagi beberapa orang, INTP adalah orang yang rumit.", "INTP dingin dan tidak berperasaan.", "Tidak mudah digoyahkan."],
    waspada: ["Secara alami INTP bukanlah orang yang bisa merasakan perasaan orang lain.", "INTP sulit mengekspresikan perasaannya sendiri.", "Cenderung skeptis, mudah curiga, dan sulit mempercayai orang."],
    saran: ["Kadangkala orang lain bercerita hanya untuk didengarkan, bukan untuk mencari solusi.", "Tidak selamanya pemikiran Anda yang paling benar.", "Relaks. Anda tidak harus selalu menganalisa segala sesuatu.", "Cobalah berdiskusi dengan orang lain mengenai pemikiran Anda."],
  },
  ESTP: {
    dominan: "Secara dominan menggunakan kecenderungan Sensing secara eksternal dan kecenderungan Thinking secara internal.",
    karakteristik: ["ESTP adalah orang yang aktif dan cenderung enerjik.", "ESTP gemar dengan kegiatan bersama dan merupakan team player yang baik.", "ESTP adalah pengamat yang aktif.", "Mudah tertarik pada hal-hal baru dan variatif.", "Tidak terlalu terencana dan cenderung spontan.", "Asertif, to the point.", "Rasional, praktis, dan logis."],
    kekuatan: ["Memiliki karisma dan menarik bagi orang lain.", "Mampu menghadapi masalah, konflik, dan kritik.", "Cekatan, aktif, dan sigap.", "Antusias, enerjik, fun, dan penuh variasi.", "Pengamat yang bagus dan detail."],
    relationship: ["ESTP termasuk orang yang populer di komunitasnya karena penuh dengan kejutan, bersemangat, komunikatif.", "ESTP mudah merasa bosan dan kurang nyaman dengan ikatan komitmen.", "ESTP cenderung membawa hubungannya dengan 'mengalir'."],
    keputusan: ["ESTP berpikiran simpel dalam mengambil keputusan. Ia mengamati situasi, menganalisanya dengan cepat.", "ESTP lebih mengutamakan logika daripada perasaan."],
    informasi: ["ESTP sangat menjauhi informasi yang teoritis, konseptual, dan abstrak.", "ESTP hanya tertarik pada hal-hal praktis yang bisa diterapkan sehari-hari.", "Diam-diam ESTP adalah pengamat yang baik."],
    komunikasi: ["Membutuhkan fakta, data, detail dan contoh konkrit.", "Mengaitkan informasi dengan aplikasi langsung.", "Fokus pada 'disini dan sekarang'.", "Nyaman pada hal-hal yang familiar dan praktis."],
    kepuasan: ["ESTP merasa puas jika bisa mendapatkan momentum-momentum 'kemenangan' dalam hidupnya.", "ESTP adalah orang yang mudah tertantang."],
    pemimpin: ["Sebagai pemimpin, ESTP adalah orang yang sangat cepat dan sigap. ESTP sangat handal dalam melakukan lobi dan eksekusi.", "Sebagai pengikut, ESTP termasuk pekerja keras dan menyukai tantangan."],
    stres: ["Sulit menerima struktur dan otoritas yang ada.", "Tidak bisa menghadapi deadline.", "Bersenang-senang sepuasnya dan melupakan semua hal penting lainnya."],
    stresKuat: ["Terjebak dalam pikiran-pikiran negatifnya dan mulai mencari-cari pembenaran atas pikiran-pikiran negatifnya."],
    pandangan: ["Antusias, semangat, fun, dan penuh kejutan.", "Mampu menikmati kehidupan.", "Santai, tidak suka yang aneh-aneh dan rumit.", "Kurang peka dan frontal."],
    waspada: ["Secara alami sulit memahami perasaan orang lain.", "Mengeluarkan kata-kata dengan spontan tanpa memikirkan perasaan orang lain.", "Mudah menganggap segala sesuatu sebagai kompetisi.", "Mudah bosan."],
    saran: ["Anda juga boleh menunjukkan sisi lemah Anda kepada orang terdekat Anda.", "Anda harus memahami bahwa orang lain tidak sama dengan Anda.", "Sesekali ambillah waktu untuk merenungkan kehidupan dan rencana masa depan Anda.", "Catatlah pengamatan-pengamatan Anda."],
  },
  ESFP: {
    dominan: "Secara dominan menggunakan kecenderungan Sensing secara eksternal dan kecenderungan Feeling secara internal.",
    karakteristik: ["Sangat sosial dan gemar berhubungan dengan orang.", "Antusias, ramah, dan mudah simpatik.", "Mengamati orang lain dan mudah mengenali keadaan perasaan mereka.", "Suka menjadi perhatian, fun, dan menghibur.", "Menghindari konflik dan menjaga keadaan harmonis.", "Cenderung optimis.", "Menghargai dan sangat menikmati kehidupan."],
    kekuatan: ["Antusias dan mudah menikmati segala sesuatu.", "Memiliki daya tarik karena ESFP ramah, hangat, dan menyenangkan.", "Kreatif dan memiliki sense seni.", "Praktis dan mampu bertindak cepat.", "Down to earth dan bisa beradaptasi."],
    relationship: ["ESFP adalah orang yang sangat antusias dengan pergaulan.", "ESFP sangat memperhatikan orang lain dan dengan sigap memenuhi kebutuhan mereka.", "ESFP hanya akan mencari hubungan-hubungan yang dipenuhi oleh keceriaan dan fun."],
    keputusan: ["ESFP sangat mengandalkan perasaan dan cenderung melibatkan unsur empati dalam mengambil keputusan.", "ESFP adalah tipe orang yang jarang berpikir panjang."],
    informasi: ["ESFP sangat tidak menyukai informasi abstrak dan ide-ide konseptual yang rumit.", "ESFP lebih tertarik pada informasi-informasi praktis yang bisa diterapkan sehari-hari.", "ESFP mengolah informasi dengan cepat dan simpel."],
    komunikasi: ["Membutuhkan fakta, data, detail dan contoh konkrit.", "Mengaitkan informasi dengan aplikasi langsung.", "Fokus pada 'disini dan sekarang'.", "Nyaman pada hal-hal yang familiar dan praktis."],
    kepuasan: ["Setiap ESFP akan merasa berarti dan menemukan kepuasannya jika mereka bisa terkait dan berhubungan dengan banyak orang.", "Pada saat mereka bisa mengekspresikan perasaan mereka dan membawa kehangatan, saat itulah mereka merasa sangat puas."],
    pemimpin: ["ESFP adalah pemimpin yang easy going, down to earth, dan menganggap bawahannya sebagai sahabat. Kelebihan seorang pemimpin ESFP adalah kemampuan lobi dan negosiasi.", "Sebagai pengikut, ESFP adalah bawahan yang bersemangat namun membutuhkan lingkungan kerja yang santai dan fun."],
    stres: ["Mengabaikan deadline dan aturan.", "Menjadi sangat sensitif.", "Menumpahkan kekecewaannya pada semua orang."],
    stresKuat: ["Tiba-tiba menjadi diam, terjebak dalam pemikiran-pemikiran negatifnya."],
    pandangan: ["ESFP sangat spontan, santai, fun, dan humoris.", "Mudah bosan.", "Tertarik pada kegiatan aktif daripada pasif.", "Ekspresif."],
    waspada: ["Memiliki kecenderungan materialistis.", "Sensitif dan menganggap segala sesuatu secara personal.", "Cenderung lari dari konflik.", "Mudah bosan dan mudah dialihkan perhatiannya."],
    saran: ["Jangan terburu-buru mengambil keputusan.", "Tidak semua kritik adalah negatif.", "Anda tidak bisa menyenangkan semua orang.", "Belajarlah untuk fokus."],
  },
  ENFP: {
    dominan: "Secara dominan menggunakan kecenderungan Intuition secara eksternal dan kecenderungan Feeling secara internal.",
    karakteristik: ["Bersemangat, enerjik, dan antusias.", "Optimis.", "Sangat senang bersosialisasi.", "Senang mencoba berbagai hal baru.", "Penuh ide dan inovasi.", "Sangat menghargai orang lain.", "Ramah, hangat, bersahabat, dan fun."],
    kekuatan: ["Mampu beradaptasi dengan berbagai situasi.", "Spontan dan mampu menghadapi perubahan dengan tenang.", "Sangat pandai berkomunikasi.", "Mudah membaca perasaan dan kebutuhan orang lain.", "Kreatif dan memiliki banyak ide inovatif."],
    relationship: ["ENFP menganggap hubungan sebagai sesuatu yang serius sekaligus menyenangkan.", "ENFP adalah sosok yang banyak disukai orang lain.", "Umumnya orang ENFP memiliki banyak relasi dan teman."],
    keputusan: ["ENFP mengambil keputusan secara spontan berdasarkan perasaan dan intuisi mereka.", "ENFP jarang sekali mengambil waktu lama untuk menganalisa secara mendalam."],
    informasi: ["ENFP tertarik pada ide-ide konseptual, terutama pada hal-hal yang sangat kreatif dan unik.", "Filosofi dan cerita-cerita metafora sangat menarik perhatian para ENFP."],
    komunikasi: ["Ingin mengetahui implikasi dan keterkaitan, tidak hanya fakta.", "Mudah bosan dan tidak sabar dengan detail.", "Menyukai curah gagasan.", "Fokus pada masa depan dan aspek jangka panjang.", "Melihat pola dan memahami 'garis besar'."],
    kepuasan: ["ENFP akan merasakan kepuasan yang sangat tinggi jika ia bisa memahami banyak hal yang sulit dipahami oleh orang lain.", "Ketika ia mampu memotivasi orang lain, ENFP merasakan kepuasan tertingginya."],
    pemimpin: ["Sebagai pemimpin, ENFP adalah orang yang sangat inovatif dan penuh ide-ide kreatif. Namun sangat kesulitan dalam membuat perencanaan yang berhubungan dengan detail.", "Sebagai pengikut, ENFP adalah orang yang loyal, menyenangkan, dan kooperatif. ENFP menyukai suasana kerja yang bebas."],
    stres: ["Kesulitan fokus dan mudah teralihkan.", "Mengabaikan aturan, sistem, dan prosedur.", "Memberontak."],
    stresKuat: ["Sangat berfokus pada detail-detail yang sangat tidak penting."],
    pandangan: ["Menyenangkan, seru, dan bersahabat.", "Penuh ide-ide yang unik.", "Santai, bebas, tidak terikat, dan ekspresif.", "Bagi sebagian orang ENFP plin-plan."],
    waspada: ["Terlalu bersemangat dan berani sehingga kadangkala tidak realistis.", "Sangat mengabaikan hal-hal detail.", "Terlalu idealis dalam membangun hubungan.", "Tidak bisa bersikap tegas walaupun diperlukan."],
    saran: ["Latihlah fokus Anda.", "Berdiskusilah dengan orang lain.", "Bertanggung jawablah juga pada diri Anda.", "Hadapilah kritik dan perbedaan.", "Anda harus menyadari bahwa struktur dan konsistensi sangat diperlukan untuk mencapai sesuatu yang besar."],
  },
  ENTP: {
    dominan: "Secara dominan menggunakan kecenderungan Intuition secara eksternal dan kecenderungan Thinking secara internal.",
    karakteristik: ["Memiliki intuisi yang kuat dan kreatif.", "Memiliki ide-ide yang luas dan jarang ditemukan orang lain.", "ENTP adalah orang yang cepat, aktif dan sigap.", "Sangat fasih dalam komunikasi verbal dan memiliki kemampuan debat yang baik.", "Cerdik, logis, berpikir sistematis.", "Tidak ingin mengontrol dan dikontrol.", "Kurang konsisten."],
    kekuatan: ["Antusias, bersemangat dan enerjik.", "Berkarisma dan cukup populer.", "Fleksibel.", "Memiliki keinginan kuat untuk mengembangkan diri.", "Mampu membaca situasi dengan cepat dan mampu menganalisa."],
    relationship: ["ENTP adalah orang yang menyenangkan dalam bergaul.", "ENTP bersemangat saat berinteraksi dengan orang lain, terutama dalam diskusi konseptual.", "Jika ENTP sudah terlibat dalam sebuah hubungan, ia akan menganggap serius komitmen yang telah tercipta."],
    keputusan: ["Dalam mengambil keputusan, ENTP menyeimbangkan analisanya dengan menggunakan pemikiran logis dan intuisinya yang tajam.", "ENTP mampu dengan segera mengambil keputusan."],
    informasi: ["ENTP sangat menyukai berbagai macam ide.", "Hal-hal yang konseptual, filosofis, dan data faktual juga menarik bagi ENTP.", "ENTP juga mampu mengembangkan informasi menjadi ide-ide yang inovatif."],
    komunikasi: ["Ingin mengetahui implikasi dan keterkaitan, tidak hanya fakta.", "Mudah bosan dengan detail.", "Menyukai curah gagasan.", "Fokus pada masa depan.", "Melihat pola dan memahami 'garis besar'."],
    kepuasan: ["ENTP merasakan kepuasan ketika berhasil menemukan ide baru yang visioner dan mencapainya.", "ENTP sangat menghargai kompetensi dan kapabilitas."],
    pemimpin: ["Sebagai pemimpin, ENTP sangat inovatif dan bisa mengkomunikasikan idenya sehingga ada banyak orang yang mendukung.", "Sebagai pengikut, ENTP adalah orang yang bisa diandalkan dan tidak terlalu banyak menuntut."],
    stres: ["Sangat kritis, mudah mencela dan menghakimi orang.", "Mengambil alih kendali dan semakin berusaha mendominasi.", "Agresif, frontal."],
    stresKuat: ["Meragukan diri-sendiri, merasa sendiri."],
    pandangan: ["Dominan, suka mengatur.", "Kompetitif.", "Perfeksionis.", "Visioner.", "Bisa diandalkan."],
    waspada: ["Memiliki standar yang tinggi dan perfeksionis.", "Sulit mengenali kebutuhan emosi orang lain.", "Cenderung kritis dan mudah melihat kesalahan orang lain."],
    saran: ["Cobalah untuk memahami pemikiran orang lain.", "Cobalah untuk relaks sesekali.", "Sesekali ungkapkan perasaan Anda pada orang terdekat Anda.", "Kuasai emosi Anda.", "Sesekali pakailah kacamata positif dalam melihat segala sesuatu."],
  },
  ESTJ: {
    dominan: "Secara dominan menggunakan kecenderungan Thinking secara eksternal dan kecenderungan Sensing secara internal.",
    karakteristik: ["Sangat sistematis, prosedural, dan terencana.", "Konservatif dan cenderung kaku.", "Percaya diri, agresif, cenderung mendominasi dan mengambil alih kepemimpinan.", "Sangat memperhatikan hal-hal detail dan tipe pekerja keras.", "Sulit memahami perasaan orang lain."],
    kekuatan: ["Pekerja keras.", "Mampu menghadapi konflik dan perbedaan pendapat.", "Menghargai komitmen.", "Memiliki kemampuan mengorganisasi, menganalisis, mendeteksi masalah.", "Terencana, on time, dan memperhatikan hal-hal yang mendasar."],
    relationship: ["ESTJ adalah orang yang mementingkan keluarga dan selalu ingin berperan penting dalam komunitas.", "Dalam hubungan, ESTJ kadangkala sulit mengekspresikan perasaannya.", "ESTJ menghargai tradisi, aturan, dan prinsip umum dalam hubungan."],
    keputusan: ["ESTJ menggunakan analisa yang mendalam sebelum mengambil keputusan.", "ESTJ cenderung menggunakan cara yang sudah terbukti berhasil.", "Keputusan ESTJ adalah keputusan yang obyektif dan cenderung kaku sesuai peraturan."],
    informasi: ["ESTJ tertarik pada informasi yang berupa fakta, hal-hal praktis, dan realistis.", "Setelah menerima informasi ESTJ akan langsung melakukan analisa dan membuat kesimpulan praktis."],
    komunikasi: ["Menggunakan logika dan analisa untuk mengenali kelemahan.", "Ingin tahu 'mengapa'.", "Menyukai informasi yang disajikan secara obyektif.", "Mempertimbangkan pro dan kontra.", "Menggunakan bahasa yang tepat dan padat."],
    kepuasan: ["ESTJ akan merasa puas jika ia bisa menjaga prinsip dan nilai-nilai yang berlaku di organisasi dan komunitasnya.", "ESTJ adalah seorang penjaga struktur."],
    pemimpin: ["Sebagai pemimpin ESTJ gemar berkomunikasi dengan bawahannya namun strict dengan aturan. ESTJ adalah seorang eksekutor yang sangat handal.", "Sebagai pengikut, ESTJ sangat menghormati peraturan. ESTJ membutuhkan prosedur, job desc, dan deadline yang jelas."],
    stres: ["Mendominasi, ikut campur, dan cenderung menguasai.", "Sok tahu dan tidak mau mendengar.", "Sangat rewel dengan hal-hal detail.", "Tidak sabar dan agresif."],
    stresKuat: ["Merasa tertekan, terjebak dalam kesedihan yang sangat mendalam, kesepian, dan tidak mampu mengkomunikasikan perasaannya."],
    pandangan: ["Bertanggung jawab.", "Kaku, keras kepala, tidak fleksibel.", "To the point dan frontal.", "Dominan.", "Mudah berteman dan bersosialisasi."],
    waspada: ["Cenderung merasa cara yang dia pakai paling tepat.", "Kecenderungan untuk selalu mendominasi.", "Secara alami sulit mengenali perasaan orang lain.", "Menginginkan hasil secepatnya."],
    saran: ["Tahan keinginan Anda untuk selalu mengontrol.", "Kuasai emosi Anda, terutama dalam hal marah.", "Setiap kali Anda menemukan fakta-fakta baru, berusahalah untuk menuliskannya.", "Sebelum Anda menghakimi orang lain, cobalah mengkoreksi diri sendiri."],
  },
  ESFJ: {
    dominan: "Secara dominan menggunakan kecenderungan Feeling secara eksternal dan kecenderungan Sensing secara internal.",
    karakteristik: ["Gemar bersosialisasi dan terlibat dalam kebersamaan.", "Teliti dan memperhatikan hal-hal kecil.", "Simpatik, kooperatif, dan senang menolong orang lain.", "Mengejar situasi harmonis dan tidak menyukai perbedaan pendapat.", "Bersemangat dan antusias dengan orang lain."],
    kekuatan: ["Secara alami ESFJ adalah orang yang suportif, hangat, dan bersahabat.", "Service oriented.", "Teliti dan rajin dalam pekerjaan sehari-hari.", "Sangat menghargai orang lain dan menjaga hubungan.", "Perhatian pada orang lain hingga pada hal terkecil."],
    relationship: ["ESFJ adalah orang yang sangat terbuka dan menyenangkan dalam pergaulan.", "Umumnya ESFJ cukup populer di kalangan komunitasnya.", "Dalam hubungan, ESFJ juga mengharapkan orang lain menunjukkan perhatian dan penerimaan."],
    keputusan: ["ESFJ cenderung subyektif dan spontan dalam mengambil keputusan.", "Umumnya ESFJ jarang mempertimbangkan dampak luas dan dampak jangka panjang dari keputusannya."],
    informasi: ["ESFJ tertarik dengan informasi yang berhubungan dengan orang lain dan merupakan informasi praktis.", "ESFJ sangat kesulitan mencerna teori dan konsep yang rumit dan abstrak."],
    komunikasi: ["Fokus pada situasi dan nilai-nilai yang subyektif.", "Melihat kekuatan dan hal-hal yang positif.", "Menyukai dukungan dan umpan balik yang positif.", "Ingin mengenali orang secara pribadi.", "Hangat, suportif, ekspresif."],
    kepuasan: ["ESFJ akan merasa sangat berharga dan puas jika ia bisa melakukan sesuatu bagi orang lain.", "Ketika orang lain mengapresiasi perhatian serta usaha yang ia berikan."],
    pemimpin: ["Sebagai pemimpin, ESFJ adalah orang yang sangat menghargai bawahannya. Namun kadangkala ESFJ terlalu subyektif.", "Sebagai pengikut, ESFJ termasuk bawahan yang loyal dan siap mengikuti arahan pemimpin."],
    stres: ["Secara membabi buta berusaha menyenangkan orang lain sampai mengorbankan diri-sendiri.", "Merasa sangat tidak berharga dan menyalahkan diri-sendiri.", "Menjadi sangat sensitif dan mudah tersinggung."],
    stresKuat: ["Berpikiran negatif pada diri-sendiri dan orang lain."],
    pandangan: ["Detail, teratur, terjadwal, dan terencana.", "Perhatian dan suka menolong.", "'Moody' dan kurang tegas.", "Kooperatif, enerjik, dan bersemangat."],
    waspada: ["Sangat menghindari konflik dan tidak bisa menghadapi kritik.", "Sulit beradaptasi dengan lingkungan baru.", "Harus akan penghargaan dan pujian.", "Mudah mengasihani diri-sendiri."],
    saran: ["Perhatikan diri Anda juga.", "Apa yang terbaik menurut Anda belum tentu terbaik untuk orang lain.", "Mintalah pertimbangan orang lain sebelum Anda mengambil keputusan.", "Jangan terjebak dengan mengasihani diri-sendiri.", "Cobalah melihat sisi positif dalam segala hal."],
  },
  ENFJ: {
    dominan: "Secara dominan menggunakan kecenderungan Feeling secara eksternal dan kecenderungan Intuition secara internal.",
    karakteristik: ["Sangat tertarik pada hubungan sosial.", "Ramah, hangat, dan bersahabat.", "Sangat menginginkan keharmonisan dan berusaha keras mewujudkannya.", "Kreatif dan imajinatif.", "Perasaannya sangat peka dan sensitif.", "Loyal."],
    kekuatan: ["Kemampuan komunikasi verbal yang sangat bagus.", "Mudah memahami perasaan orang lain.", "Menyenangkan, bersahabat, dan fun.", "Menghargai hubungan jangka panjang dan komitmen.", "Berusaha selalu memenuhi kebutuhan orang lain."],
    relationship: ["ENFJ menaruh perhatian besar pada hubungan mereka.", "ENFJ memiliki bakat alami untuk mudah berhubungan dengan berbagai jenis orang.", "ENFJ juga adalah orang yang peka dengan kebutuhan orang lain.", "ENFJ akan merasa dihargai jika ia juga mendapat afirmasi atau pengakuan dalam hubungan itu."],
    keputusan: ["ENFJ cenderung mengambil keputusan secara subyektif. Pertimbangan perasaan dan intuitif mereka sangat kuat.", "Pertimbangan utama pengambilan keputusan ENFJ adalah hasil keputusan harus bisa membawa kebaikan bagi semua orang."],
    informasi: ["ENFJ tertarik dengan informasi yang berhubungan dengan orang.", "ENFJ juga bisa menerima hal-hal yang filosofis dan abstrak."],
    komunikasi: ["Fokus pada situasi dan nilai-nilai yang subyektif.", "Melihat kekuatan dan hal-hal yang positif.", "Menyukai dukungan dan umpan balik yang positif.", "Ingin mengenali orang secara pribadi.", "Hangat, suportif, ekspresif."],
    kepuasan: ["ENFJ memperoleh kepuasan tertinggi ketika ia berhasil menjadi bagian dari sebuah komunitas dan keberadaan mereka diakui sebagai hal yang penting.", "ENFJ akan selalu berusaha mengembangkan kehidupan orang lain."],
    pemimpin: ["Sebagai pemimpin, ENFJ adalah orang yang memiliki visi yang tajam namun lemah dalam hal perencanaan dan hal-hal teknis.", "Sebagai pengikut, ENFJ adalah orang yang loyal. Kebutuhan bawahan ENFJ adalah penerimaan dan penghargaan."],
    stres: ["Kehilangan rasa percaya diri dan merasa sangat bersalah.", "Kehilangan konsistensi dan sangat moody.", "Sangat sensitif dengan masukan dan saran.", "Memaksakan kehendaknya agar situasi harmonis tetap terjaga."],
    stresKuat: ["Tenggelam dalam berbagai pikiran negatif dan kemudian akan menyalahkan atau mengkritik orang lain dengan agresif."],
    pandangan: ["Baik hati, ramah, dan bersahabat.", "Enerjik, bersemangat, dan menyenangkan.", "Sensitif, dan mudah tersentuh perasaannya.", "Pandai berbicara.", "Beberapa orang melihat ENFJ plin-plan dan kurang tegas."],
    waspada: ["Kadangkala terlalu pilih kasih dan membela orang lain.", "Mengorbankan kepentingan diri untuk menyenangkan orang lain.", "Sulit memahami teori dan konsep yang rumit.", "Sangat menghindari konflik dan kritik."],
    saran: ["Pandai-pandailah mengelola harapan Anda.", "Jangan terlalu keras pada diri Anda.", "Ambillah keputusan. Jangan takut untuk mengambil resiko.", "Hadapilah kritik dan perbedaan.", "Jangan korbankan diri Anda."],
  },
  ENTJ: {
    dominan: "Secara dominan menggunakan kecenderungan Thinking secara eksternal dan kecenderungan Intuition secara internal.",
    karakteristik: ["ENTJ adalah orang yang tegas, kritis dan memiliki standar tinggi.", "ENTJ adalah orang yang asertif, to the point, dan obyektif.", "Cenderung mendominasi dan bergerak cepat.", "Cenderung perfeksionis.", "ENTJ fasih dalam komunikasi verbal dan berkarisma.", "Cenderung menutupi perasaannya dan tidak memperlihatkan kelemahan.", "Tangguh."],
    kekuatan: ["Lahir dengan bakat kepemimpinan yang alami.", "Bisa menganalisa situasi dan informasi dengan cepat.", "Mampu menggerakkan orang, membagi tugas, dan mengkomunikasikan tujuan dengan jelas.", "Mampu menghadapi konflik dan perbedaan pendapat.", "Tegas dan berdisiplin.", "Sangat menghargai komitmen."],
    relationship: ["ENTJ cenderung mendominasi hubungan dan menentukan arahnya.", "ENTJ sangat menghargai komitmen dalam sebuah hubungan.", "Hanya saja ENTJ menetapkan standar yang tinggi kepada orang lain.", "ENTJ kurang berminat untuk mengekspresikan perasaannya secara berlebihan."],
    keputusan: ["ENTJ sangat obyektif, analitis, logis, dan penuh pertimbangan dalam mengambil keputusan.", "ENTJ mampu melakukannya dengan cepat dan memiliki keberanian untuk segera mengambil keputusan.", "ENTJ mampu mengesampingkan perasaan dan sisi personal."],
    informasi: ["ENTJ mampu menyerap banyak informasi, menganalisa, dan mengambil keputusan dengan cepat.", "Ide dan teori rumit bukan menjadi masalah bagi ENTJ."],
    komunikasi: ["Menggunakan logika dan analisa untuk mengenali kelemahan.", "Ingin tahu 'mengapa'.", "Menyukai informasi yang disajikan secara obyektif.", "Mempertimbangkan pro dan kontra.", "Menggunakan bahasa yang tepat dan padat."],
    kepuasan: ["ENTJ memperoleh kepuasan ketika ia berhasil mencapai prestasi tinggi yang melebihi orang lain.", "Ketika ia mampu mengorganisasi orang untuk mencapai standar yang tinggi."],
    pemimpin: ["Sebagai pemimpin, ENTJ adalah seorang pemimpin yang handal, visioner dan mampu membuat perencanaan matang.", "Sebagai bawahan, ENTJ selalu berusaha menjadi yang terbaik. ENTJ mengharapkan pemimpin yang memiliki dream dan kompetensi."],
    stres: ["Sangat kritis, mudah mencela dan menghakimi orang.", "Mengambil alih kendali dan semakin berusaha mendominasi.", "Agresif, frontal, dan cenderung tidak mau mendengarkan orang lain."],
    stresKuat: ["Meragukan diri-sendiri, merasa sendiri, dan kesulitan mengungkapkan perasaannya."],
    pandangan: ["Dominan, suka mengatur, dan cenderung tidak mau mengalah.", "Kompetitif, tidak pernah beristirahat.", "Perfeksionis.", "Visioner.", "Bisa diandalkan.", "Tegar dan tangguh."],
    waspada: ["Memiliki standar yang tinggi dan perfeksionis.", "Cenderung mencari siapa yang benar dan siapa yang salah.", "Sulit mengenali kebutuhan emosi orang lain.", "Memiliki gengsi yang tinggi."],
    saran: ["Cobalah untuk memahami pemikiran orang lain.", "Cobalah untuk relaks sesekali.", "Sesekali ungkapkan perasaan Anda.", "Kuasai emosi Anda.", "Sesekali pakailah kacamata positif."],
  },
}

/* ── Referensi PDF (PJJ LIKC 2025) ──────────────────────────────── */
const mbtiRef = {
  ISTJ: {
    subtitle: 'Bertanggungjawab',
    uraian: 'Serius, tenang, stabil & damai. Senang pada fakta, logis, obyektif, praktis & realistis. Task oriented, tekun, teratur, menepati janji, dapat diandalkan & bertanggung jawab. Pendengar yang baik, setia, hanya mau berbagi dengan orang dekat. Memegang aturan, standar & prosedur dengan teguh.',
    saranPengembangan: 'Belajarlah memahami perasaan & kebutuhan orang lain. Kurangi keinginan untuk mengontrol orang lain atau memerintah mereka untuk menegakkan aturan. Lihatlah lebih banyak sisi positif pada orang lain atau hal lainnya. Terbukalah terhadap perubahan.',
    saranProfesi: 'Bidang Manajemen, Polisi, Intelijen, Hakim, Pengacara, Dokter, Akuntan, Programmer / IT, System Analyst, Pemimpin Militer',
    partner: 'ESFP atau ESTP',
  },
  ISFJ: {
    subtitle: 'Pelindung',
    uraian: 'Penuh pertimbangan, setia, dan bertanggung jawab. Sangat memperhatikan kebutuhan orang lain dan siap membantu tanpa diminta. Tradisional dan konservatif. Menghargai stabilitas dan keharmonisan. Sabar, tenang, dan lebih memilih bekerja di balik layar tanpa banyak sorotan. Sangat dapat diandalkan dan konsisten.',
    saranPengembangan: 'Belajarlah untuk berkata tidak ketika Anda memang tidak bisa atau tidak ingin. Jangan mengorbankan diri hanya untuk menyenangkan orang lain. Keluarlah dari zona nyaman Anda dan hadapi situasi baru dengan lebih percaya diri. Belajarlah menerima dan menghadapi kenyataan.',
    saranProfesi: 'Perawat, Dokter, Guru, Konselor, Pustakawan, Pegawai Administrasi, Pekerja Sosial, HRD',
    partner: 'ESTP atau ESFP',
  },
  INFJ: {
    subtitle: 'Reflektif',
    uraian: 'Perhatian, empati, sensitif & berkomitmen terhadap sebuah hubungan. Sukses karena ketekunan, originalitas dan keinginan kuat untuk melakukan apa saja yang diperlukan termasuk memberikan yang terbaik dalam pekerjaan. Idealis, perfeksionis, memegang teguh prinsip. Visioner, penuh ide, kreatif, suka merenung dan inspiring. Biasanya diikuti dan dihormati karena kejelasan visi serta dedikasi pada hal-hal baik.',
    saranPengembangan: 'Seimbangkan cara pandang Anda. Jangan hanya melihat sisi negatif & resiko. Namun, lihatlah sisi positif dan peluangnya. Bersabarlah, jangan mudah marah dan menyalahkan orang lain atau situasi. Rileks dan jangan terus menerus berfikir atau menyelesaikan tanggungjawab.',
    saranProfesi: 'Pengajar, Psikolog, Dokter, Konselor, Pekerja Sosial, Fotografer, Seniman, Designer, Child Care',
    partner: 'ESFP atau ESTP',
  },
  INTJ: {
    subtitle: 'Independen',
    uraian: 'Visioner, punya perencanaan praktis, & biasanya memiliki ide-ide original serta dorongan kuat untuk mencapainya. Mandiri dan percaya diri. Punya kemampuan analisa yang bagus serta menyederhanakan sesuatu yang rumit dan abstrak menjadi sesuatu yang praktis, mudah dipahami & dipraktekkan. Kritik & konflik tidak menjadi masalah berarti.',
    saranPengembangan: 'Belajarlah mengungkapkan emosi & perasaan Anda. Cobalah untuk lebih terbuka pada dunia luar, banyak bergaul, banyak belajar, banyak membaca, mengunjungi banyak tempat, eksplorasi hal baru, & memperluas wawasan. Hindari perdebatan tidak penting. Belajarlah untuk berempati, memberi perhatian dan lebih peka terhadap orang lain.',
    saranProfesi: 'Peneliti, Ilmuwan, Insinyur, Teknisi, Pengajar, Profesor, Dokter, Research & Development, Business Analyst, System Analyst, Pengacara, Hakim, Programmer, Posisi Strategis dalam Organisasi',
    partner: 'ENFP atau ENTP',
  },
  ISTP: {
    subtitle: 'Pragmatis',
    uraian: 'Tenang, pendiam, cenderung kaku, dingin, hati-hati, penuh pertimbangan. Logis, rasional, kritis, obyektif, mampu mengesampingkan perasaan. Mampu menghadapi perubahan mendadak dengan cepat dan tenang. Percaya diri, tegas dan mampu menghadapi perbedaan maupun kritik. Mampu menganalisa, mengorganisir, & mendelegasikan. Problem solver yang baik terutama untuk masalah teknis & keadaan mendadak.',
    saranPengembangan: 'Observasilah kehidupan sosial, apa yang membuat orang marah, cinta, senang, termotivasi & terapkan pada hubungan Anda. Belajarlah untuk mengenali perasaan Anda dan mengekspresikannya. Jadilah orang yang lebih terbuka, keluar dari zona nyaman, eksplorasi ide baru, dan berdiskusi dengan orang lain. Jangan menyimpan informasi yang harusnya dibagi dan belajarlah mempercayakan tanggungjawab pada orang lain.',
    saranProfesi: 'Polisi, Ahli Forensik, Programmer, Ahli Komputer, System Analyst, Teknisi, Insinyur, Mekanik, Pilot, Atlit, Entrepreneur',
    partner: 'ESTJ atau ENTJ',
  },
  ISFP: {
    subtitle: 'Seniman',
    uraian: 'Sederhana, praktis, tulus dan apa adanya. Tidak banyak bicara tetapi memiliki kepekaan yang tinggi terhadap perasaan orang lain. Setia pada nilai-nilai dan berkomitmen pada orang-orang yang dicintai. Fleksibel dan spontan. Menikmati apa yang ada di sekitarnya, terutama keindahan alam dan seni. Tidak suka konflik dan menghindari situasi tegang.',
    saranPengembangan: 'Belajarlah untuk mengekspresikan perasaan Anda secara verbal agar orang lain bisa memahami Anda. Tidak perlu menyenangkan semua orang. Jangan menghindari konflik selamanya — terkadang konflik diperlukan untuk menyelesaikan masalah. Cobalah merencanakan masa depan dan memikirkan dampak jangka panjang dari keputusan Anda.',
    saranProfesi: 'Seniman, Desainer, Fotografer, Perawat, Guru, Chef, Ahli Terapi, Bidang Seni & Kerajinan',
    partner: 'ESTJ atau ESFJ',
  },
  INFP: {
    subtitle: 'Idealis',
    uraian: 'Sangat perhatian dan peka dengan perasaan orang lain. Penuh dengan antusiasme dan kesetiaan, tapi biasanya hanya untuk orang dekat. Peduli pada banyak hal. Cenderung mengambil terlalu banyak dan menyelesaikan sebagian. Cenderung idealis dan perfeksionis. Berpikir win-win solution, mempercayai dan mengoptimalkan orang lain.',
    saranPengembangan: 'Belajarlah menghadapi kritik. Jika baik maka kritik itu bisa membangun Anda, namun jika tidak abaikan saja. Jangan ragu pula untuk bertanya dan minta saran. Belajarlah untuk bersikap tegas. Bertindak baik itu berbeda dengan bertindak benar. Jangan terlalu menyalahkan diri dan bersikap terlalu keras pada diri sendiri. Jangan terlalu baik pada orang lain tapi melupakan diri sendiri.',
    saranProfesi: 'Penulis, Sastrawan, Konselor, Psikolog, Pengajar, Seniman, Rohaniawan, Bidang Hospitality',
    partner: 'ENFJ atau ESFJ',
  },
  INTP: {
    subtitle: 'Konseptual',
    uraian: 'Sangat menghargai intelektualitas dan pengetahuan. Menikmati hal-hal teoritis dan ilmiah. Senang memecahkan masalah dengan logika dan analisa. Diam dan menahan diri. Lebih suka bekerja sendiri. Cenderung kritis, skeptis, mudah curiga dan pesimis. Tidak suka memimpin dan bisa menjadi pengikut yang tidak banyak menuntut. Jika menemukan sesuatu yang menarik minatnya, ia akan sangat serius dan antusias menekuninya.',
    saranPengembangan: 'Belajarlah membangun hubungan dengan orang lain. Belajar berempati, mendengar aktif, memberi perhatian dan bertukar pendapat. Relaks. Jangan terlalu banyak berfikir. Nikmati hidup Anda tanpa harus bertanya mengapa dan bagaimana. Cobalah menemukan satu ide, merencanakan dan mewujudkannya. Jangan terlalu sering berganti-ganti ide tetapi tidak satupun yang terwujud.',
    saranProfesi: 'Ilmuwan, Fotografer, Programmer, Ahli Komputer, System Analyst, Penulis Buku Teknis, Ahli Forensik, Jaksa, Pengacara, Teknisi',
    partner: 'ENTJ atau ESTJ',
  },
  ESTP: {
    subtitle: 'Spontan',
    uraian: 'Spontan, aktif, enerjik, cekatan, cepat, sigap, antusias, fun dan penuh variasi. Komunikator, asertif, to the point, ceplas-ceplos, berkarisma, punya interpersonal skill yang baik. Baik dalam pemecahan masalah langsung di tempat. Mampu menghadapi masalah, konflik dan kritik. Tidak khawatir, menikmati apapun yang terjadi. Mudah beradaptasi, toleran. Paling baik dalam hal-hal nyata yang dapat dilakukan.',
    saranPengembangan: 'Belajarlah memahami perasaan dan pemikiran orang lain terutama saat bicara dengan mereka. Belajarlah untuk sabar, menikmati proses — tidak semua hal bisa dicapai dengan cepat. Sesekali luangkan waktu untuk merenung dan merencanakan masa depan Anda. Cobalah untuk mencatat pengamatan-pengamatan Anda termasuk detailnya.',
    saranProfesi: 'Marketing, Sales, Polisi, Entrepreneur, Pialang Saham, Technical Support',
    partner: 'ISFJ atau ISTJ',
  },
  ESFP: {
    subtitle: 'Murah Hati',
    uraian: 'Outgoing, easygoing, mudah berteman, bersahabat, sangat sosial, ramah, hangat, & menyenangkan. Optimis, ceria, antusias, fun, menghibur, suka menjadi perhatian. Punya interpersonal skill yang baik, murah hati, mudah simpatik dan mengenali perasaan orang lain. Menghindari konflik dan menjaga keharmonisan suatu hubungan. Sangat baik dalam keadaan yang membutuhkan common sense, tindakan cepat dan ketrampilan praktis.',
    saranPengembangan: 'Jangan terburu-buru dalam mengambil keputusan. Belajarlah untuk fokus dan tidak mudah berubah-ubah terutama untuk hal yang penting. Jangan menyenangkan semua orang. Belajarlah menghadapi kritik dan konflik — jangan lari. Hati-hati dengan kecenderungan materialistis; tidak semua hal bisa diukur dengan materi.',
    saranProfesi: 'Entertainer, Seniman, Marketing, Konselor, Designer, Tour Guide, Bidang Anak-anak, Bidang Hospitality',
    partner: 'ISTJ atau ISFJ',
  },
  ENFP: {
    subtitle: 'Optimis',
    uraian: 'Ramah, hangat, enerjik, optimis, antusias, semangat tinggi, fun. Imaginatif, penuh ide, kreatif, inovatif. Mampu beradaptasi dengan beragam situasi dan perubahan. Pandai berkomunikasi, senang bersosialisasi & membawa suasana positif. Mudah membaca perasaan dan kebutuhan orang lain.',
    saranPengembangan: 'Belajarlah untuk fokus, disiplin, tegas dan konsisten. Belajarlah untuk menghadapi konflik dan kritik. Pikirkan kebutuhan diri sendiri — jangan melupakannya karena terlalu peduli pada kebutuhan orang lain. Jangan terlalu boros dan belajarlah mengelola keuangan dengan lebih baik.',
    saranProfesi: 'Konselor, Psikolog, Entertainer, Pengajar, Motivator, Presenter, Reporter, MC, Seniman, Hospitality',
    partner: 'INTJ atau INFJ',
  },
  ENTP: {
    subtitle: 'Inovatif – Kreatif',
    uraian: 'Gesit, kreatif, inovatif, cerdik, logis, baik dalam banyak hal. Banyak bicara dan punya kemampuan debat yang baik. Bisa berargumentasi untuk senang-senang saja tanpa merasa bersalah. Fleksibel. Punya banyak cara untuk memecahkan masalah dan tantangan. Kurang konsisten. Punya keinginan kuat untuk mengembangkan diri.',
    saranPengembangan: 'Cobalah untuk win-win solution — jangan ingin menang sendiri. Belajarlah untuk disiplin dan konsisten. Hindari perdebatan tidak penting. Seimbangkan cara pandang Anda agar tidak terlalu optimis dan mengambil resiko yang tidak realistis. Belajarlah untuk memberi perhatian pada perasaan orang lain.',
    saranProfesi: 'Pengacara, Psikolog, Konsultan, Ilmuwan, Aktor, Marketing, Programmer, Fotografer',
    partner: 'INFJ atau INTJ',
  },
  ESTJ: {
    subtitle: 'Konservatif – Disiplin',
    uraian: 'Praktis, realistis, berpegang pada fakta, dengan dorongan alamiah untuk bisnis dan mekanistis. Sangat sistematis, prosedural dan terencana. Disiplin, on time dan pekerja keras. Konservatif dan cenderung kaku. Tidak tertarik pada subjek yang tidak berguna baginya, tapi dapat menyesuaikan diri jika diperlukan. Senang mengorganisir sesuatu. Bisa menjadi administrator yang baik jika mereka ingat untuk memperhatikan perasaan dan perspektif orang lain.',
    saranPengembangan: 'Kurangi keinginan untuk mengontrol dan memaksa orang lain. Belajarlah untuk mengontrol emosi dan amarah Anda. Cobalah untuk introspeksi diri dan meluangkan waktu sejenak untuk merenung. Belajarlah untuk lebih sabar, rendah hati, dan memahami orang lain.',
    saranProfesi: 'Militer, Manajer, Polisi, Hakim, Pengacara, Guru, Sales, Auditor, Akuntan, System Analyst',
    partner: 'ISTP atau INTP',
  },
  ESFJ: {
    subtitle: 'Pengasuh',
    uraian: 'Hangat, perhatian, dan sangat berorientasi pada orang lain. Senang bersosialisasi dan melibatkan diri dalam kebersamaan. Teliti dan menghargai tradisi serta aturan yang berlaku. Sangat menghindari konflik dan berusaha menjaga harmoni di lingkungannya. Membutuhkan pengakuan dan apresiasi dari orang lain agar bisa bekerja dengan optimal.',
    saranPengembangan: 'Jangan terlalu berharap orang lain membalas perhatian yang Anda berikan. Belajarlah menghadapi kritik dengan lapang dada. Perhatikan juga kebutuhan Anda sendiri, bukan hanya orang lain. Jangan mudah mengasihani diri sendiri ketika tidak mendapat apresiasi yang diharapkan.',
    saranProfesi: 'Guru, Perawat, Konselor, HRD, Pekerja Sosial, Event Coordinator, Bidang Pelayanan Publik',
    partner: 'ISFP atau INFP',
  },
  ENFJ: {
    subtitle: 'Meyakinkan',
    uraian: 'Kreatif, imajinatif, peka, sensitif, loyal. Pada umumnya peduli pada apa kata orang atau apa yang orang lain inginkan dan cenderung melakukan sesuatu dengan memperhatikan perasaan orang lain. Pandai bergaul, meyakinkan, ramah, fun, populer, simpatik. Responsif pada kritik dan pujian. Menyukai variasi dan tantangan baru. Butuh apresiasi dan penerimaan.',
    saranPengembangan: 'Jangan mengorbankan diri hanya untuk menyenangkan orang lain. Jangan mengukur harga diri Anda dari perlakuan orang lain. Belajarlah untuk tegas dan mengambil keputusan. Hadapi kritik dan konflik dengan lebih terbuka. Jangan terlalu bersikap keras terhadap diri sendiri.',
    saranProfesi: 'Konsultan, Psikolog, Konselor, Pengajar, Marketing, HRD, Event Coordinator, Entertainer, Penulis, Motivator',
    partner: 'INFP atau ISFP',
  },
  ENTJ: {
    subtitle: 'Pemimpin Alami',
    uraian: 'Tegas, asertif, to the point, jujur terus terang, obyektif, kritis, & punya standar tinggi. Dominan, kuat kemauannya, perfeksionis dan kompetitif. Tangguh, disiplin, dan sangat menghargai komitmen. Cenderung menutupi perasaan dan menyembunyikan kelemahan. Berkarisma, komunikasi baik, mampu menggerakkan orang. Berbakat pemimpin.',
    saranPengembangan: 'Belajarlah untuk relaks — tidak perlu perfeksionis dan selalu kompetitif dengan semua orang. Ungkapkan perasaan Anda; menyatakan perasaan bukanlah kelemahan. Belajarlah mengelola emosi dan tidak mudah marah. Hargai dan apresiasi orang lain. Jangan terlalu arogan. Lihat sisi positifnya.',
    saranProfesi: 'Entrepreneur, Pengacara, Hakim, Konsultan, Pemimpin Organisasi, Business Analyst, Bidang Finansial',
    partner: 'INTP atau ISTP',
  },
}

const preferensiLabel = {
  E: "Extraversion", I: "Introversion",
  S: "Sensing", N: "iNtuition",
  T: "Thinking", F: "Feeling",
  J: "Judging", P: "Perceiving"
}

const Section = ({ title, items, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-50 border-blue-200 text-blue-800",
    green: "bg-green-50 border-green-200 text-green-800",
    amber: "bg-amber-50 border-amber-200 text-amber-800",
    red: "bg-red-50 border-red-200 text-red-800",
    purple: "bg-purple-50 border-purple-200 text-purple-800",
    gray: "bg-gray-50 border-gray-200 text-gray-800",
  }
  return (
    <div className={`rounded-xl border p-5 mb-4 ${colors[color]}`}>
      <h3 className="font-bold text-base mb-3">{title}</h3>
      <ul className="space-y-1">
        {items.filter(i => i && i !== '0').map((item, i) => (
          <li key={i} className="flex gap-2 text-sm">
            <span className="mt-1 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Hasil() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const tipe = state?.tipe || 'ISTJ'
  const nama = state?.nama || 'Peserta'
  const info = deskripsiMBTI[tipe]

  if (!info) return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow p-10 text-center">
        <p className="text-gray-500">Tipe tidak ditemukan.</p>
        <button onClick={() => navigate('/tes')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">Ulangi Tes</button>
      </div>
    </div>
  )

  const huruf = tipe.split('')
  const ref = mbtiRef[tipe] || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-100 px-4 py-3 print:hidden">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate('/tes')} className="text-sm text-gray-400 hover:text-blue-600 transition">
            ← Ulangi Tes
          </button>
          <span className="text-xs font-bold text-blue-700 tracking-widest uppercase">MBTI · Platform Asesmen DJBC</span>
          <button onClick={() => window.print()} className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition">
            🖨️ Cetak
          </button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-8 px-4">

        {/* Header Laporan */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">MYERS-BRIGGS TYPE INDICATOR — INTERPRETIVE REPORT</p>
          <p className="text-sm text-gray-500 mb-1">Platform Asesmen Pengembangan Kepegawaian DJBC</p>
          <h2 className="text-lg font-bold text-gray-700 mb-6">{nama}</h2>

          {/* Tipe besar */}
          <div className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white rounded-2xl py-8 px-6 mb-6 shadow-lg shadow-blue-200">
            <p className="text-sm font-semibold opacity-80 mb-2">TIPE KEPRIBADIAN</p>
            <div className="flex justify-center gap-3 mb-3">
              {huruf.map((h, i) => (
                <div key={i} className="w-14 h-14 rounded-xl bg-white text-blue-700 font-black text-2xl flex items-center justify-center shadow">
                  {h}
                </div>
              ))}
            </div>
            {ref.subtitle && (
              <p className="text-lg font-bold mt-1 mb-2">{ref.subtitle}</p>
            )}
            <p className="text-sm opacity-80">PREFERENSI</p>
            <p className="text-base font-semibold mt-1">
              {huruf.map(h => preferensiLabel[h]).join(' — ')}
            </p>
          </div>

          {/* Faktor Dominan */}
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-4">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Faktor Dominan</p>
            <p className="text-sm text-gray-700">{info.dominan}</p>
          </div>
        </div>

        {/* Penjelasan 4 Dimensi */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="font-bold text-gray-700 mb-4">Cara Membaca Tipe MBTI</h3>
          <div className="grid grid-cols-2 gap-3">
            {[['E','I'], ['S','N'], ['T','F'], ['J','P']].map(([a, b], i) => (
  <div key={i} className="col-span-2 grid grid-cols-2 gap-3">
    <div className={`rounded-xl p-3 text-sm ${huruf.includes(a) ? 'bg-blue-600 text-white font-bold' : 'bg-gray-50 text-gray-500'}`}>
      <span className="font-bold">{a}</span> — {preferensiLabel[a]}
    </div>
    <div className={`rounded-xl p-3 text-sm ${huruf.includes(b) ? 'bg-blue-600 text-white font-bold' : 'bg-gray-50 text-gray-500'}`}>
      <span className="font-bold">{b}</span> — {preferensiLabel[b]}
    </div>
  </div>
))}
          </div>
        </div>

        {/* Uraian Kepribadian (dari referensi PDF) */}
        {ref.uraian && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h3 className="font-bold text-gray-700 text-lg mb-3">Uraian Kepribadian</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-5">{ref.uraian}</p>
            {ref.saranPengembangan && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm font-bold text-amber-700 mb-2">💡 Saran Pengembangan</p>
                <p className="text-sm text-amber-800 leading-relaxed">{ref.saranPengembangan}</p>
              </div>
            )}
          </div>
        )}

        {/* Laporan Lengkap */}
        <div className="bg-white rounded-2xl shadow p-6 mb-6">
          <h3 className="font-bold text-gray-700 text-lg mb-4">Laporan Interpretasi MBTI</h3>
          <Section title="Karakteristik Umum" items={info.karakteristik} color="blue" />
          <Section title="Kekuatan" items={info.kekuatan} color="green" />
          <Section title="Hubungan Interpersonal" items={info.relationship} color="purple" />
          <Section title="Pengambilan Keputusan" items={info.keputusan} color="blue" />
          <Section title="Memperlakukan Informasi" items={info.informasi} color="gray" />
          <Section title="Gaya Komunikasi" items={info.komunikasi} color="blue" />
          <Section title="Faktor Kepuasan" items={info.kepuasan} color="green" />
          <Section title="Pemimpin & Pengikut" items={info.pemimpin} color="purple" />
          <Section title="Perilaku Saat Kecewa / Stres" items={info.stres} color="amber" />
          <Section title="Perilaku Saat Depresi / Stres Berat" items={info.stresKuat} color="red" />
          <Section title="Pandangan Orang Awam" items={info.pandangan} color="gray" />
          <Section title="Yang Perlu Diwaspadai" items={info.waspada} color="amber" />
          <Section title="Saran" items={info.saran} color="green" />
        </div>

        {/* Saran Profesi & Partner */}
        {(ref.saranProfesi || ref.partner) && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {ref.saranProfesi && (
              <div className="bg-white rounded-2xl shadow p-5">
                <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💼</span>
                  Saran Profesi
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ref.saranProfesi.split(',').map((p, i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 font-medium px-3 py-1.5 rounded-full border border-blue-100">
                      {p.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {ref.partner && (
              <div className="bg-white rounded-2xl shadow p-5">
                <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-7 h-7 bg-rose-100 rounded-lg flex items-center justify-center text-sm">🤝</span>
                  Partner Kerja / Hidup
                </h3>
                <div className="flex gap-3 mt-1">
                  {ref.partner.split(' atau ').map((p, i) => (
                    <div key={i} className="flex-1 bg-rose-50 border border-rose-100 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-rose-600">{p.trim()}</p>
                      <p className="text-xs text-rose-400 mt-0.5">{mbtiRef[p.trim()]?.subtitle || ''}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tombol */}
        <div className="flex gap-3 sticky bottom-4 print:hidden">
          <button
            onClick={() => navigate('/tes')}
            className="flex-1 border-2 border-blue-600 text-blue-600 bg-white font-semibold py-3 rounded-xl hover:bg-blue-50 transition shadow-lg"
          >
            ← Ulangi Tes
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition shadow-lg shadow-blue-200"
          >
            🖨️ Cetak Laporan
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hasil