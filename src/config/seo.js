// Judul & deskripsi per halaman untuk mesin pencari. Dipasang oleh
// components/RouteSeo.jsx setiap kali rute berubah. Halaman yang tidak ada di
// sini (hasil tes, dashboard, login, dsb.) otomatis diberi noindex.
// Daftar rute yang diindeks harus sama dengan public/sitemap.xml.
import { ARTIKEL } from '../artikel/data.js'

export const SITE_URL = 'https://www.assesin.net'

export const SEO = {
  '/': {
    title: 'AssesIN — Psikotes & Tes Psikologi Online Gratis (MBTI, DISC, PAPI)',
    description: 'Latihan psikotes online untuk seleksi CPNS, BUMN, dan rekrutmen kerja, plus tes kepribadian untuk mengenal diri: MBTI, DISC, PAPI Kostick, Big Five, RIASEC, DASS-21, dan lainnya. Gratis dikerjakan, hasil langsung tampil.',
  },
  '/tes': {
    title: 'Tes MBTI Online Gratis — 16 Tipe Kepribadian | AssesIN',
    description: 'Kerjakan tes MBTI online gratis (60 soal, sekitar 15 menit) dan temukan tipe Anda di antara 16 kepribadian: sumber energi, cara mengambil keputusan, dan lingkungan kerja yang cocok.',
  },
  '/tes-disc': {
    title: 'Tes DISC Online Gratis — Gaya Perilaku Kerja | AssesIN',
    description: 'Tes DISC online gratis 24 soal, sekitar 7 menit. Ketahui gaya perilaku kerja Anda: Dominance, Influence, Steadiness, atau Compliance — tes yang sering dipakai HR saat rekrutmen.',
  },
  '/tes-papi': {
    title: 'Latihan Tes PAPI Kostick Online — Psikotes Kerja | AssesIN',
    description: 'Latihan tes PAPI Kostick online: 90 pasangan pernyataan, sekitar 20 menit. Kenali pola kerja Anda di 20 aspek sebelum menghadapi psikotes rekrutmen BUMN dan perusahaan.',
  },
  '/tes-dass': {
    title: 'Tes DASS-21 Online — Cek Tingkat Depresi, Kecemasan & Stres | AssesIN',
    description: 'Skrining DASS-21 online dalam 5 menit: lihat tingkat depresi, kecemasan, dan stres yang Anda alami seminggu terakhir. Gratis dan langsung ada hasilnya.',
  },
  '/tes-love-language': {
    title: 'Tes Love Language Online Gratis — 5 Bahasa Kasih | AssesIN',
    description: 'Tes Love Language online gratis, sekitar 8 menit. Cari tahu cara Anda paling merasa dihargai: pujian, waktu bersama, bantuan, hadiah, atau sentuhan. Laporan lengkap sedang gratis.',
  },
  '/tes-msdt': {
    title: 'Tes MSDT Online — Gaya Kepemimpinan & Manajemen | AssesIN',
    description: 'Tes MSDT (Management Style Diagnostic Test) online, 64 soal. Lihat gaya kepemimpinan dominan Anda di antara delapan gaya manajemen — persiapan seleksi posisi supervisor dan manajer.',
  },
  '/tes-big-five': {
    title: 'Tes Kepribadian Big Five (OCEAN) Online | AssesIN',
    description: 'Tes kepribadian Big Five online: ketahui posisi Anda di lima dimensi besar — keterbukaan, ketelitian, ekstraversi, keramahan, dan stabilitas emosi.',
  },
  '/tes-riasec': {
    title: 'Tes Minat Karier RIASEC (Holland) Online | AssesIN',
    description: 'Bingung memilih jurusan atau karier? Tes minat RIASEC online memberi kode minat tiga huruf versi teori Holland beserta bidang kerja yang paling cocok.',
  },
  '/tes-resiliensi': {
    title: 'Tes Resiliensi Kerja Online — Ketangguhan & Integritas | AssesIN',
    description: 'Ukur ketangguhan Anda menghadapi tekanan target, perubahan mendadak, dan godaan melanggar prinsip — aspek yang kerap digali dalam seleksi kerja dan abdi negara.',
  },
  '/tes-peran-tim': {
    title: 'Tes Peran dalam Tim Online | AssesIN',
    description: 'Penggagas ide, penggerak, atau penjaga detail? Kenali peran yang paling alami Anda jalankan dalam tim agar kontribusi Anda lebih terlihat.',
  },
  '/kemampuan': {
    title: 'Tes Kemampuan Online — Pauli Digital & Tes Kognitif | AssesIN',
    description: 'Latihan tes kemampuan berbatas waktu untuk psikotes kerja, BUMN, dan CPNS: tes Pauli digital ganjil-genap serta tes deret angka, analogi, logika, dan matriks gambar.',
  },
  '/tes-pauli': {
    title: 'Tes Pauli Online (Ganjil-Genap) — Latihan Kecepatan & Ketelitian | AssesIN',
    description: 'Latihan tes Pauli/Kraepelin versi digital selama 10 menit. Lihat jumlah kerja, persentase kesalahan, dan grafik kerja per menit: kecepatan, ketelitian, keajegan, dan ketahanan.',
  },
  '/tes-kognitif': {
    title: 'Tes Kemampuan Kognitif Online — Deret Angka, Analogi, Logika, Matriks | AssesIN',
    description: 'Latihan 40 soal kemampuan berpikir yang sering muncul di psikotes: deret angka, analogi verbal, penalaran logis, dan matriks gambar, lengkap dengan pembahasan.',
  },
  '/kontak': {
    title: 'Kontak | AssesIN',
    description: 'Hubungi tim AssesIN untuk pertanyaan seputar tes, pembayaran laporan, atau kerja sama asesmen.',
  },
  '/privacy-policy': {
    title: 'Kebijakan Privasi | AssesIN',
    description: 'Cara AssesIN mengumpulkan, menyimpan, dan melindungi data serta hasil tes Anda.',
  },
  '/terms': {
    title: 'Syarat & Ketentuan | AssesIN',
    description: 'Syarat dan ketentuan penggunaan layanan tes dan laporan AssesIN.',
  },
  '/artikel': {
    title: 'Artikel Psikotes & Tes Kepribadian | AssesIN',
    description: 'Panduan menghadapi psikotes kerja, CPNS, dan BUMN, plus penjelasan tes PAPI Kostick, DISC, MBTI, MSDT, dan DASS-21 beserta tips mengerjakannya.',
  },
  ...Object.fromEntries(ARTIKEL.map(a => [
    `/artikel/${a.slug}`,
    { title: `${a.judulSeo} | AssesIN`, description: a.deskripsi },
  ])),
}
