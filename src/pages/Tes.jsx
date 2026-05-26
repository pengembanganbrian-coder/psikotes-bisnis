import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const unitKerjaOptions = [
  {
    group: 'Kantor Pusat — Bagian',
    options: [
      'Bagian Organisasi dan Tata Laksana',
      'Bagian Keuangan',
      'Bagian Umum',
      'Bagian Administrasi Kepegawaian',
      'Bagian Pengembangan Kepegawaian',
      'Bagian Pengelolaan Barang Milik Negara',
    ],
  },
  {
    group: 'Kantor Pusat — Direktorat',
    options: [
      'Direktorat Teknis Kepabeanan',
      'Direktorat Fasilitas Kepabeanan',
      'Direktorat Teknis dan Fasilitas Cukai',
      'Direktorat Keberatan Banding dan Peraturan',
      'Direktorat Penindakan dan Penyidikan',
      'Direktorat Audit Kepabeanan dan Cukai',
      'Direktorat Kepatuhan Internal',
      'Direktorat Informasi Kepabeanan dan Cukai',
      'Direktorat Penerimaan dan Perencanaan Strategis',
      'Direktorat Kerja Sama Internasional Kepabeanan dan Cukai',
      'Direktorat Interdiksi Narkotika',
      'Direktorat Komunikasi dan Bimbingan Pengguna Jasa',
      'Tenaga Pengkaji Bidang Pengawasan dan Penegakan Hukum Kepabeanan dan Cukai',
      'Tenaga Pengkaji Bidang Pengembangan Kapasitas dan Kinerja Organisasi',
    ],
  },
  {
    group: 'Kantor Wilayah',
    options: [
      'Kantor Wilayah DJBC Aceh',
      'Kantor Wilayah DJBC Sumatera Utara',
      'Kantor Wilayah DJBC Riau',
      'Kantor Wilayah DJBC Khusus Kepulauan Riau',
      'Kantor Wilayah DJBC Sumatera Bagian Timur',
      'Kantor Wilayah DJBC Sumatera Bagian Barat',
      'Kantor Wilayah DJBC Banten',
      'Kantor Wilayah DJBC Jakarta',
      'Kantor Wilayah DJBC Jawa Barat',
      'Kantor Wilayah DJBC Jawa Tengah dan DI Yogyakarta',
      'Kantor Wilayah DJBC Jawa Timur I',
      'Kantor Wilayah DJBC Jawa Timur II',
      'Kantor Wilayah DJBC Bali, Nusa Tenggara Barat dan Nusa Tenggara Timur',
      'Kantor Wilayah DJBC Kalimantan Bagian Barat',
      'Kantor Wilayah DJBC Kalimantan Bagian Timur',
      'Kantor Wilayah DJBC Kalimantan Bagian Selatan',
      'Kantor Wilayah DJBC Sulawesi Bagian Selatan',
      'Kantor Wilayah DJBC Sulawesi Bagian Utara',
      'Kantor Wilayah DJBC Maluku',
      'Kantor Wilayah DJBC Khusus Papua',
    ],
  },
  {
    group: 'Kantor Pelayanan Utama (KPU)',
    options: [
      'Kantor Pelayanan Utama Bea dan Cukai Tipe A Tanjung Priok',
      'Kantor Pelayanan Utama Bea dan Cukai Tipe C Soekarno-Hatta',
      'Kantor Pelayanan Utama Bea dan Cukai Tipe B Batam',
    ],
  },
  {
    group: 'KPPBC — Aceh',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Banda Aceh',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Lhokseumawe',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Meulaboh',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Langsa',
    ],
  },
  {
    group: 'KPPBC — Sumatera Utara',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean Belawan',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Medan',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Teluk Nibung',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Kuala Tanjung',
    ],
  },
  {
    group: 'KPPBC — Kepulauan Riau',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Tanjung Balai Karimun',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Tanjung Pinang',
    ],
  },
  {
    group: 'KPPBC — Riau',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Pekanbaru',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Dumai',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Tembilahan',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Bengkalis',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Teluk Bayur',
    ],
  },
  {
    group: 'KPPBC — Sumatera Bagian Timur',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Palembang',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Jambi',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Pangkalpinang',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Tanjungpandan',
    ],
  },
  {
    group: 'KPPBC — Sumatera Bagian Barat',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Bengkulu',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Bandar Lampung',
    ],
  },
  {
    group: 'KPPBC — Banten',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean Merak',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Tangerang',
    ],
  },
  {
    group: 'KPPBC — Jakarta',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Jakarta',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Marunda',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Kantor Pos Pasar Baru',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Bekasi',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean Cikarang',
    ],
  },
  {
    group: 'KPPBC — Jawa Barat',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Bogor',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Purwakarta',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Bandung',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Cirebon',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Tasikmalaya',
    ],
  },
  {
    group: 'KPPBC — Jawa Tengah & DIY',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean Tanjung Emas',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Cukai Kudus',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Semarang',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Surakarta',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Yogyakarta',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Cilacap',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Purwokerto',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Tegal',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Magelang',
    ],
  },
  {
    group: 'KPPBC — Jawa Timur I',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean Tanjung Perak',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean Juanda',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Pasuruan',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Gresik',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Sidoarjo',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Madura',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Bojonegoro',
    ],
  },
  {
    group: 'KPPBC — Jawa Timur II',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Cukai Malang',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Cukai Kediri',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Blitar',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Madiun',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Jember',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Banyuwangi',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Probolinggo',
    ],
  },
  {
    group: 'KPPBC — Bali, NTB, NTT',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean Ngurah Rai',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean A Denpasar',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Atambua',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Mataram',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Kupang',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Sumbawa',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Labuan Bajo',
    ],
  },
  {
    group: 'KPPBC — Kalimantan Barat',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Pontianak',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Entikong',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Sintete',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Nanga Badau',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Ketapang',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Jagoi Babang',
    ],
  },
  {
    group: 'KPPBC — Kalimantan Timur',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Balikpapan',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Samarinda',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Tarakan',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Bontang',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Nunukan',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Sangatta',
    ],
  },
  {
    group: 'KPPBC — Kalimantan Selatan',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Banjarmasin',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Sampit',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Pangkalan Bun',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Kotabaru',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Palangkaraya',
    ],
  },
  {
    group: 'KPPBC — Sulawesi Selatan',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean B Makassar',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Parepare',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Malili',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Kendari',
    ],
  },
  {
    group: 'KPPBC — Sulawesi Utara',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Pantoloan',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Morowali',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Luwuk',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Bitung',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Manado',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Gorontalo',
    ],
  },
  {
    group: 'KPPBC — Maluku',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Ambon',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Tual',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Ternate',
    ],
  },
  {
    group: 'KPPBC — Papua',
    options: [
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Sorong',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Manokwari',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Jayapura',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Biak',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Merauke',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Fakfak',
      'Kantor Pengawasan dan Pelayanan Bea dan Cukai Tipe Madya Pabean C Timika',
    ],
  },
  {
    group: 'Lainnya',
    options: [
      'Pangkalan Sarana Operasi Bea dan Cukai Tipe A Tanjung Balai Karimun',
      'Pangkalan Sarana Operasi Bea dan Cukai Tipe B Lhokseumawe',
      'Pangkalan Sarana Operasi Bea dan Cukai Tipe B Tanjung Priok',
      'Pangkalan Sarana Operasi Bea dan Cukai Tipe B Pantoloan',
      'Pangkalan Sarana Operasi Bea dan Cukai Tipe B Sorong',
      'Balai Laboratorium Bea dan Cukai Kelas I Jakarta',
      'Balai Laboratorium Bea dan Cukai Kelas II Medan',
      'Balai Laboratorium Bea dan Cukai Kelas II Surabaya',
    ],
  },
]

const soal = [
  // EI - Bagian 1 (15 soal)
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
  // SN - Bagian 2 (15 soal)
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
  // TF - Bagian 3 (15 soal)
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
  // JP - Bagian 4 (15 soal)
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
  const [formErrors, setFormErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

  const handleJawab = (id, val) => setJawaban(prev => ({ ...prev, [id]: val }))

  const soalDimensiAktif = soal.filter(s => s.dimensi === dimensiUrutan[dimensiAktif])
  const sudahDijawab = soalDimensiAktif.filter(s => jawaban[s.id]).length
  const totalDimensi = soalDimensiAktif.length

  const validateForm = () => {
    const errs = {}
    if (!nama.trim()) errs.nama = 'Nama lengkap wajib diisi.'
    if (!email.trim()) errs.email = 'NIP / NIK wajib diisi.'
    if (!jabatan) errs.jabatan = 'Unit kerja wajib dipilih.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (sudahDijawab < totalDimensi) {
      // scroll ke soal pertama yang belum dijawab
      const belum = soalDimensiAktif.find(s => !jawaban[s.id])
      if (belum) {
        const el = document.getElementById(`soal-mbti-${belum.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    if (dimensiAktif < 3) setDimensiAktif(prev => prev + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSubmitError('')
    const { data: pesertaData, error } = await supabase
      .from('peserta')
      .insert([{ nama, email, jabatan }])
      .select()
    if (error) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }
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

  /* ── FORM DATA DIRI ── */
  if (step === 'form') return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-lg shadow-blue-200 mb-4">
            <span className="text-white font-black text-sm tracking-wide">MBTI</span>
          </div>
          <h1 className="text-xl font-black text-gray-800">Tes Kepribadian MBTI</h1>
          <p className="text-gray-500 text-sm mt-1">Psikotes DJBC · 60 soal · ~15 menit</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-7 py-5">
            <h2 className="font-bold text-white text-base">Data Diri Peserta</h2>
            <p className="text-blue-200 text-xs mt-0.5">Lengkapi seluruh data sebelum memulai tes</p>
          </div>

          <div className="px-7 py-6 space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <input
                value={nama}
                onChange={e => { setNama(e.target.value); setFormErrors(p => ({ ...p, nama: '' })) }}
                className={`w-full border bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-gray-400 ${formErrors.nama ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Nama lengkap sesuai KTP"
              />
              {formErrors.nama && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.nama}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                NIP / NIK <span className="text-red-400">*</span>
              </label>
              <input
                value={email}
                onChange={e => { setEmail(e.target.value); setFormErrors(p => ({ ...p, email: '' })) }}
                className={`w-full border bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-gray-400 ${formErrors.email ? 'border-red-400' : 'border-gray-200'}`}
                placeholder="Nomor Induk Pegawai / NIK"
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">⚠ {formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Unit Kerja <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <select
                  value={jabatan}
                  onChange={e => { setJabatan(e.target.value); setFormErrors(p => ({ ...p, jabatan: '' })) }}
                  className={`w-full appearance-none border bg-gray-50 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer text-gray-700 ${formErrors.jabatan ? 'border-red-400' : 'border-gray-200'}`}
                >
                  <option value="">-- Pilih Unit Kerja --</option>
                  {unitKerjaOptions.map(group => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
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

            <button
              onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 mt-1"
            >
              Mulai Tes MBTI →
            </button>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="w-full text-center text-xs text-gray-400 hover:text-gray-600 mt-4 transition-colors">
          ← Kembali ke beranda
        </button>
      </div>
    </div>
  )

  /* ── HALAMAN SOAL ── */
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-xs">MBTI</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-sm">Tes MBTI — Psikotes DJBC</h1>
              <p className="text-xs text-gray-500">Halo <strong>{nama}</strong> · Pilih yang paling sesuai dengan dirimu</p>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            {dimensiUrutan.map((d, idx) => (
              <div key={d} className={`flex-1 text-center text-xs py-1.5 rounded-xl font-bold transition-all ${
                idx === dimensiAktif
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : idx < dimensiAktif
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {idx < dimensiAktif ? '✓ ' : ''}{dimensiLabel[d]}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-gray-500">{dimensiNama[dimensiUrutan[dimensiAktif]]}</p>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              {sudahDijawab}/{totalDimensi} dijawab
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${(sudahDijawab / totalDimensi) * 100}%` }}
            />
          </div>
        </div>

        {/* Soal */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5 pb-3 border-b border-gray-50">
            Pilih <span className="text-blue-600">satu</span> pernyataan yang lebih dominan sesuai dirimu
          </p>

          {soalDimensiAktif.map((s, idx) => (
            <div id={`soal-mbti-${s.id}`} key={s.id} className={`mb-5 ${idx > 0 ? 'pt-5 border-t border-gray-50' : ''}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs text-gray-400 font-medium">Pernyataan {idx + 1}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleJawab(s.id, 'kiri')}
                  className={`p-4 rounded-xl border-2 text-sm text-left leading-relaxed transition-all duration-200 ${
                    jawaban[s.id] === 'kiri'
                      ? 'border-blue-500 bg-blue-50 text-blue-800 font-semibold shadow-sm'
                      : 'border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-white text-gray-700'
                  }`}
                >
                  {jawaban[s.id] === 'kiri' && <span className="block text-blue-500 text-xs font-black mb-1.5">✓ DIPILIH</span>}
                  {s.kiri}
                </button>
                <button
                  onClick={() => handleJawab(s.id, 'kanan')}
                  className={`p-4 rounded-xl border-2 text-sm text-left leading-relaxed transition-all duration-200 ${
                    jawaban[s.id] === 'kanan'
                      ? 'border-blue-500 bg-blue-50 text-blue-800 font-semibold shadow-sm'
                      : 'border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-white text-gray-700'
                  }`}
                >
                  {jawaban[s.id] === 'kanan' && <span className="block text-blue-500 text-xs font-black mb-1.5">✓ DIPILIH</span>}
                  {s.kanan}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Error banner */}
        {submitError && (
          <div className="mb-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            ⚠ {submitError}
          </div>
        )}

        {/* Peringatan soal belum dijawab */}
        {sudahDijawab < totalDimensi && (
          <p className="text-center text-sm text-amber-600 font-medium mb-3">
            ⚠ Masih {totalDimensi - sudahDijawab} pertanyaan belum dijawab di bagian ini
          </p>
        )}

        {/* Tombol navigasi */}
        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Menyimpan hasil...' : dimensiAktif < 3 ? `Lanjut ke Bagian ${dimensiAktif + 2} →` : '✓ Selesai & Lihat Hasil'}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Bagian {dimensiAktif + 1} dari 4 · {Object.keys(jawaban).length} dari 60 soal dijawab
        </p>
      </div>
    </div>
  )
}

export default Tes
