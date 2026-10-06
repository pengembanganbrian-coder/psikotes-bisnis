// Tes kemampuan kognitif AssesIN: 4 subtes x 10 soal pilihan ganda.
// Semua butir ditulis sendiri (bukan butir tes berhak cipta). Matriks
// figural dibentuk dari aturan dan digambar sebagai SVG (lihat
// components/SelFigural.jsx).
//
// Belum ada norma: hasil dilaporkan sebagai jumlah benar dan kategori
// sementara berdasarkan persentase benar -- BUKAN skor IQ.

/* ── Deret angka ─────────────────────────────────────────────────── */
const DERET = [
  { deret: [3, 7, 11, 15, 19], jawab: 23, opsi: [21, 22, 23, 24, 25], bahas: 'Setiap suku bertambah 4: 19 + 4 = 23.' },
  { deret: [2, 6, 18, 54], jawab: 162, opsi: [108, 72, 162, 160, 216], bahas: 'Setiap suku dikali 3: 54 × 3 = 162.' },
  { deret: [1, 4, 9, 16, 25], jawab: 36, opsi: [30, 34, 35, 36, 49], bahas: 'Bilangan kuadrat 1², 2², 3², ... sehingga berikutnya 6² = 36.' },
  { deret: [5, 8, 14, 23, 35], jawab: 50, opsi: [47, 48, 50, 52, 53], bahas: 'Selisihnya +3, +6, +9, +12, lalu +15: 35 + 15 = 50.' },
  { deret: [60, 57, 51, 42, 30], jawab: 15, opsi: [12, 15, 18, 20, 21], bahas: 'Selisihnya −3, −6, −9, −12, lalu −15: 30 − 15 = 15.' },
  { deret: [2, 3, 5, 8, 13, 21], jawab: 34, opsi: [29, 31, 34, 35, 42], bahas: 'Setiap suku adalah jumlah dua suku sebelumnya: 13 + 21 = 34.' },
  { deret: [4, 9, 7, 12, 10, 15], jawab: 13, opsi: [11, 13, 17, 18, 20], bahas: 'Polanya bergantian +5 lalu −2: 15 − 2 = 13.' },
  { deret: [3, 6, 4, 8, 6, 12], jawab: 10, opsi: [8, 10, 14, 18, 24], bahas: 'Polanya bergantian ×2 lalu −2: 12 − 2 = 10.' },
  { deret: [1, 2, 6, 24, 120], jawab: 720, opsi: [240, 360, 600, 720, 840], bahas: 'Pengalinya naik: ×2, ×3, ×4, ×5, lalu ×6: 120 × 6 = 720.' },
  { deret: [2, 20, 4, 17, 8, 14, 16], jawab: 11, opsi: [10, 11, 12, 13, 32], bahas: 'Ada dua deret selang-seling. Suku genap: 20, 17, 14, ... turun 3, sehingga berikutnya 11. (Suku ganjil 2, 4, 8, 16 dikali 2.)' },
]

/* ── Analogi verbal ──────────────────────────────────────────────── */
const ANALOGI = [
  { soal: ['DOKTER', 'RUMAH SAKIT', 'GURU'], jawab: 'Sekolah', opsi: ['Murid', 'Sekolah', 'Buku', 'Pelajaran', 'Kapur'], bahas: 'Hubungan profesi dan tempat kerjanya: dokter bekerja di rumah sakit, guru bekerja di sekolah.' },
  { soal: ['PANAS', 'DINGIN', 'TERANG'], jawab: 'Gelap', opsi: ['Lampu', 'Cahaya', 'Siang', 'Gelap', 'Redup'], bahas: 'Hubungan lawan kata: panas lawan dingin, terang lawan gelap. "Redup" belum merupakan lawan kata penuh.' },
  { soal: ['KECEBONG', 'KATAK', 'ULAT'], jawab: 'Kupu-kupu', opsi: ['Daun', 'Kepompong', 'Kupu-kupu', 'Lebah', 'Sutra'], bahas: 'Hubungan bentuk muda dan bentuk dewasa: kecebong menjadi katak, ulat menjadi kupu-kupu. Kepompong masih tahap antara.' },
  { soal: ['JARUM', 'MENJAHIT', 'PISAU'], jawab: 'Memotong', opsi: ['Tajam', 'Dapur', 'Memotong', 'Besi', 'Mengasah'], bahas: 'Hubungan alat dan kegunaannya: jarum untuk menjahit, pisau untuk memotong.' },
  { soal: ['GARAM', 'ASIN', 'GULA'], jawab: 'Manis', opsi: ['Tebu', 'Manis', 'Putih', 'Kopi', 'Pahit'], bahas: 'Hubungan benda dan rasanya: garam terasa asin, gula terasa manis.' },
  { soal: ['PENULIS', 'BUKU', 'KOMPOSER'], jawab: 'Lagu', opsi: ['Piano', 'Penyanyi', 'Lagu', 'Konser', 'Panggung'], bahas: 'Hubungan pembuat dan karyanya: penulis menghasilkan buku, komposer menghasilkan lagu.' },
  { soal: ['AIR', 'HAUS', 'MAKANAN'], jawab: 'Lapar', opsi: ['Kenyang', 'Lapar', 'Piring', 'Nasi', 'Makan'], bahas: 'Hubungan pemenuhan dan kebutuhan: air menghilangkan haus, makanan menghilangkan lapar.' },
  { soal: ['HALAMAN', 'BUKU', 'ANAK TANGGA'], jawab: 'Tangga', opsi: ['Rumah', 'Lantai', 'Naik', 'Tangga', 'Kayu'], bahas: 'Hubungan bagian dan keseluruhan: halaman bagian dari buku, anak tangga bagian dari tangga.' },
  { soal: ['TERMOMETER', 'SUHU', 'TIMBANGAN'], jawab: 'Berat', opsi: ['Pasar', 'Kilogram', 'Berat', 'Panjang', 'Angka'], bahas: 'Hubungan alat ukur dan besaran yang diukur: termometer mengukur suhu, timbangan mengukur berat. Kilogram adalah satuan, bukan besarannya.' },
  { soal: ['RAJIN', 'MALAS', 'HEMAT'], jawab: 'Boros', opsi: ['Kaya', 'Pelit', 'Tabungan', 'Boros', 'Uang'], bahas: 'Hubungan lawan kata: rajin lawan malas, hemat lawan boros. "Pelit" justru dekat maknanya dengan hemat.' },
]

/* ── Penalaran logis ─────────────────────────────────────────────── */
const LOGIKA = [
  { premis: ['Semua manajer mengikuti pelatihan kepemimpinan.', 'Rina adalah seorang manajer.'],
    jawab: 'Rina mengikuti pelatihan kepemimpinan.',
    opsi: ['Rina mengikuti pelatihan kepemimpinan.', 'Rina tidak mengikuti pelatihan kepemimpinan.', 'Semua peserta pelatihan adalah manajer.', 'Rina adalah pelatih kepemimpinan.', 'Tidak dapat disimpulkan.'],
    bahas: 'Rina termasuk kelompok manajer, dan semua manajer mengikuti pelatihan, maka Rina pasti mengikuti pelatihan.' },
  { premis: ['Semua pegawai bagian keuangan teliti.', 'Sebagian orang yang teliti gemar membaca.'],
    jawab: 'Tidak dapat dipastikan apakah pegawai keuangan gemar membaca.',
    opsi: ['Semua pegawai keuangan gemar membaca.', 'Sebagian pegawai keuangan gemar membaca.', 'Tidak ada pegawai keuangan yang gemar membaca.', 'Tidak dapat dipastikan apakah pegawai keuangan gemar membaca.', 'Semua orang yang gemar membaca adalah pegawai keuangan.'],
    bahas: '"Sebagian orang teliti" yang gemar membaca belum tentu termasuk pegawai keuangan, jadi tidak ada kesimpulan pasti tentang mereka.' },
  { premis: ['Jika hujan turun, jalan menjadi basah.', 'Pagi ini jalan tidak basah.'],
    jawab: 'Pagi ini tidak hujan.',
    opsi: ['Pagi ini hujan.', 'Pagi ini tidak hujan.', 'Jalan akan basah nanti siang.', 'Hujan tidak membuat jalan basah.', 'Tidak dapat disimpulkan.'],
    bahas: 'Bila hujan, jalan pasti basah. Karena jalan tidak basah, berarti tidak terjadi hujan (modus tollens).' },
  { premis: ['Jika hujan turun, jalan menjadi basah.', 'Sore ini jalan basah.'],
    jawab: 'Belum tentu sore ini hujan.',
    opsi: ['Sore ini pasti hujan.', 'Sore ini pasti tidak hujan.', 'Belum tentu sore ini hujan.', 'Jalan selalu basah.', 'Hujan turun setiap sore.'],
    bahas: 'Jalan bisa basah karena sebab lain (misalnya disiram). Dari akibat tidak bisa dipastikan sebabnya.' },
  { premis: ['Tidak ada pegawai yang sering terlambat mendapat bonus.', 'Budi mendapat bonus.'],
    jawab: 'Budi bukan pegawai yang sering terlambat.',
    opsi: ['Budi sering terlambat.', 'Budi bukan pegawai yang sering terlambat.', 'Semua pegawai mendapat bonus.', 'Budi adalah pegawai terbaik.', 'Tidak dapat disimpulkan.'],
    bahas: 'Pegawai yang sering terlambat pasti tidak mendapat bonus. Karena Budi mendapat bonus, ia tidak termasuk kelompok itu.' },
  { premis: ['Andi lebih tinggi daripada Beni.', 'Citra lebih pendek daripada Beni.', 'Dodi lebih tinggi daripada Andi.'],
    tanya: 'Siapa yang paling pendek?',
    jawab: 'Citra', opsi: ['Andi', 'Beni', 'Citra', 'Dodi', 'Tidak dapat ditentukan'],
    bahas: 'Urutan dari tertinggi: Dodi, Andi, Beni, Citra. Citra paling pendek.' },
  { premis: ['Rapat A diadakan sebelum rapat B.', 'Rapat C diadakan sesudah rapat D.', 'Rapat B diadakan sebelum rapat D.'],
    tanya: 'Rapat mana yang diadakan paling akhir?',
    jawab: 'Rapat C', opsi: ['Rapat A', 'Rapat B', 'Rapat C', 'Rapat D', 'Tidak dapat ditentukan'],
    bahas: 'Urutannya A, B, D, lalu C. Rapat C paling akhir.' },
  { premis: ['Semua anggota tim proyek adalah analis.', 'Tidak ada analis yang bekerja paruh waktu.'],
    jawab: 'Tidak ada anggota tim proyek yang bekerja paruh waktu.',
    opsi: ['Sebagian anggota tim proyek bekerja paruh waktu.', 'Semua pekerja paruh waktu adalah analis.', 'Tidak ada anggota tim proyek yang bekerja paruh waktu.', 'Semua analis adalah anggota tim proyek.', 'Tidak dapat disimpulkan.'],
    bahas: 'Anggota tim proyek termasuk analis, dan tidak ada analis yang paruh waktu, sehingga tidak ada anggota tim proyek yang paruh waktu.' },
  { premis: ['Sebagian pelamar lulus tes tertulis.', 'Semua yang lulus tes tertulis mengikuti wawancara.'],
    jawab: 'Sebagian pelamar mengikuti wawancara.',
    opsi: ['Semua pelamar mengikuti wawancara.', 'Sebagian pelamar mengikuti wawancara.', 'Tidak ada pelamar yang mengikuti wawancara.', 'Semua peserta wawancara lulus seleksi akhir.', 'Pelamar yang tidak lulus tes tertulis juga diwawancara.'],
    bahas: 'Pelamar yang lulus tes tertulis (sebagian pelamar) pasti diwawancara, sehingga sebagian pelamar mengikuti wawancara.' },
  { premis: ['Jika Toni lembur, ia pulang malam.', 'Jika Toni pulang malam, ia naik taksi.', 'Hari ini Toni lembur.'],
    jawab: 'Hari ini Toni naik taksi.',
    opsi: ['Hari ini Toni tidak naik taksi.', 'Hari ini Toni pulang sore.', 'Hari ini Toni naik taksi.', 'Toni selalu lembur.', 'Tidak dapat disimpulkan.'],
    bahas: 'Lembur → pulang malam → naik taksi. Karena hari ini Toni lembur, ia naik taksi.' },
]

/* ── Matriks figural ─────────────────────────────────────────────── */
// Setiap sel: { bentuk, jumlah, isi, putar }. Sel ke-9 (kanan bawah)
// adalah jawaban; pilihan lain dibentuk dengan mengubah satu atribut.
const BENTUK = ['lingkaran', 'persegi', 'segitiga']
const ISI = ['kosong', 'setengah', 'penuh']
const latin = (r, c, geser = 1) => (r * geser + c) % 3

const MATRIKS = [
  { sel: (r, c) => ({ bentuk: BENTUK[r], jumlah: c + 1, isi: 'kosong', putar: 0 }),
    bahas: 'Setiap baris memakai satu bentuk, dan jumlahnya bertambah 1, 2, 3 dari kiri ke kanan. Baris ketiga berisi segitiga, sehingga sel terakhir adalah tiga segitiga.' },
  { sel: (r, c) => ({ bentuk: 'panah', jumlah: 1, isi: 'penuh', putar: r * 90 + c * 45 }),
    bahas: 'Panah berputar 45° searah jarum jam setiap bergeser ke kanan, dan setiap baris dimulai 90° lebih jauh. Sel terakhir menunjuk ke kiri (270°).' },
  { sel: (r, c) => ({ bentuk: ['persegi', 'lingkaran', 'belahketupat'][r], jumlah: 1, isi: ISI[c], putar: 0 }),
    bahas: 'Bentuk ditentukan baris, sedangkan isian ditentukan kolom: kosong, setengah, penuh. Sel terakhir adalah belah ketupat berisi penuh.' },
  { sel: (r, c) => ({ bentuk: 'lingkaran', jumlah: r + c + 1, isi: 'penuh', putar: 0 }),
    bahas: 'Jumlah titik = nomor baris + nomor kolom − 1. Sel terakhir (baris 3, kolom 3) berisi 5 titik.' },
  { sel: (r, c) => ({ bentuk: BENTUK[latin(r, c)], jumlah: 1, isi: ISI[latin(r, c, 2)], putar: 0 }),
    bahas: 'Setiap baris dan kolom memuat lingkaran, persegi, dan segitiga tepat satu kali; begitu pula isian kosong, setengah, dan penuh. Bentuk dan isian yang belum muncul di baris ketiga adalah persegi yang kosong.' },
  { sel: (r, c) => ({ bentuk: 'segitiga', jumlah: 1, isi: ISI[r], putar: c * 90 }),
    bahas: 'Segitiga berputar 90° setiap bergeser ke kanan, sedangkan isiannya ditentukan baris. Sel terakhir: segitiga berisi penuh yang diputar 180°.' },
  { sel: (r, c) => ({ bentuk: BENTUK[latin(r, c)], jumlah: r + 1, isi: 'kosong', putar: 0 }),
    bahas: 'Jumlah bentuk ditentukan baris (1, 2, 3), sedangkan setiap baris memuat lingkaran, persegi, dan segitiga satu kali. Bentuk yang belum muncul di baris ketiga adalah persegi, sehingga jawabannya tiga persegi.' },
  { sel: (r, c) => ({ bentuk: 'garis', jumlah: c + 1, isi: 'penuh', putar: r * 45 }),
    bahas: 'Jumlah garis bertambah dari kiri ke kanan (1, 2, 3), dan kemiringannya ditentukan baris: tegak, miring 45°, mendatar. Sel terakhir berisi tiga garis mendatar.' },
  { sel: (r, c) => ({ bentuk: BENTUK[latin(r, c, 2)], jumlah: latin(r, c) + 1, isi: ISI[r], putar: 0 }),
    bahas: 'Tiga aturan sekaligus: isian ditentukan baris, serta bentuk dan jumlah masing-masing muncul sekali di setiap baris dan kolom. Sel terakhir adalah dua lingkaran berisi penuh.' },
  { sel: (r, c) => ({ bentuk: 'panah', jumlah: (c % 2) + 1, isi: ISI[2 - r], putar: (r + c) * 90 }),
    bahas: 'Panah berputar 90° setiap langkah ke kanan atau ke bawah, jumlahnya bergantian 1–2–1, dan isian makin kosong ke bawah. Sel terakhir: satu panah kosong yang kembali menunjuk ke atas (360° = 0°).' },
]

// Bentuk kanonik untuk membandingkan tampilan: lingkaran, persegi, dan belah
// ketupat tidak berubah bila diputar; garis sama setiap 180° dan tidak punya
// isian; segitiga sama setiap 120°.
function kanon(o) {
  const simetri = { lingkaran: 0, persegi: 0, belahketupat: 0, garis: 180, segitiga: 120, panah: 360 }[o.bentuk]
  return [o.bentuk, o.jumlah, o.bentuk === 'garis' ? '-' : o.isi, simetri ? ((o.putar % simetri) + simetri) % simetri : 0].join('|')
}
const sama = (a, b) => kanon(a) === kanon(b)

function opsiMatriks(def) {
  const jawab = def.sel(2, 2)
  const kandidat = [
    { ...jawab, isi: ISI[(ISI.indexOf(jawab.isi) + 1) % 3] },
    { ...jawab, jumlah: jawab.jumlah === 1 ? 2 : jawab.jumlah - 1 },
    jawab.bentuk === 'panah' || jawab.bentuk === 'garis' || jawab.bentuk === 'segitiga'
      ? { ...jawab, putar: jawab.putar + 90 }
      : { ...jawab, bentuk: BENTUK[(BENTUK.indexOf(jawab.bentuk) + 1) % 3] || 'lingkaran' },
    def.sel(2, 1), def.sel(1, 2),
    { ...jawab, putar: jawab.putar + 180 },
    { ...jawab, jumlah: jawab.jumlah + 1 },
  ]
  const opsi = [jawab]
  for (const k of kandidat) {
    if (opsi.length === 5) break
    if (!opsi.some(o => sama(o, k))) opsi.push(k)
  }
  return opsi
}

/* ── Rakitan ─────────────────────────────────────────────────────── */
// Pengacak berbiji tetap: urutan pilihan sama untuk semua peserta, tetapi
// posisi jawaban benar tidak selalu di tempat yang sama.
function acak(arr, biji) {
  const a = [...arr]
  let s = biji
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function rakit(kode, daftar, buatSoal) {
  return daftar.map((d, i) => {
    const s = buatSoal(d)
    const opsi = acak(s.opsi.map((nilai, k) => ({ nilai, benar: k === 0 })), i * 17 + kode.charCodeAt(0) * 31 + kode.charCodeAt(1) * 7)
    return { id: `${kode}${i + 1}`, ...s, opsi: opsi.map(o => o.nilai), kunci: opsi.findIndex(o => o.benar), bahas: d.bahas }
  })
}

const urutJawabDulu = (jawab, opsi) => [jawab, ...opsi.filter(o => o !== jawab)]

export const SUBTES = [
  {
    kode: 'DA', nama: 'Deret Angka', detik: 300,
    petunjuk: 'Tentukan bilangan berikutnya yang paling tepat melanjutkan pola deret.',
    soal: rakit('DA', DERET, d => ({ jenis: 'deret', deret: d.deret, opsi: urutJawabDulu(d.jawab, d.opsi) })),
  },
  {
    kode: 'AV', nama: 'Analogi Verbal', detik: 240,
    petunjuk: 'Pilih kata yang hubungannya dengan kata ketiga sama dengan hubungan dua kata pertama.',
    soal: rakit('AV', ANALOGI, d => ({ jenis: 'analogi', analogi: d.soal, opsi: urutJawabDulu(d.jawab, d.opsi) })),
  },
  {
    kode: 'PL', nama: 'Penalaran Logis', detik: 360,
    petunjuk: 'Anggap semua pernyataan benar. Pilih kesimpulan yang PASTI benar berdasarkan pernyataan tersebut.',
    soal: rakit('PL', LOGIKA, d => ({ jenis: 'logika', premis: d.premis, tanya: d.tanya, opsi: urutJawabDulu(d.jawab, d.opsi) })),
  },
  {
    kode: 'MF', nama: 'Matriks Gambar', detik: 360,
    petunjuk: 'Temukan aturan pada baris dan kolom, lalu pilih gambar yang tepat untuk mengisi kotak kosong.',
    soal: rakit('MF', MATRIKS, d => ({
      jenis: 'matriks',
      grid: [0, 1, 2].flatMap(r => [0, 1, 2].map(c => (r === 2 && c === 2 ? null : d.sel(r, c)))),
      opsi: opsiMatriks(d),
    })),
  },
]

export const TOTAL_SOAL = SUBTES.reduce((t, s) => t + s.soal.length, 0)

export function kategoriKognitif(persen) {
  if (persen >= 85) return 'Sangat baik'
  if (persen >= 70) return 'Baik'
  if (persen >= 50) return 'Cukup'
  if (persen >= 30) return 'Perlu latihan'
  return 'Perlu banyak latihan'
}

/** jawaban: { [idSoal]: indeksOpsi } */
export function hitungKognitif(jawaban) {
  const subtes = {}
  let benar = 0
  for (const st of SUBTES) {
    const b = st.soal.filter(s => jawaban[s.id] === s.kunci).length
    subtes[st.kode] = { benar: b, dari: st.soal.length, dijawab: st.soal.filter(s => jawaban[s.id] !== undefined).length }
    benar += b
  }
  const persen = Math.round((benar / TOTAL_SOAL) * 100)
  return { benar, dari: TOTAL_SOAL, persen, kategori: kategoriKognitif(persen), subtes }
}

export const ringkasanKognitif = s => `${s.benar}/${s.dari} benar · ${s.kategori}`
