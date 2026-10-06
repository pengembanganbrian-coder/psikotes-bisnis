// Tes Pauli digital model ganjil-genap.
//
// Peserta melihat dua angka bersusun lalu menekan GANJIL atau GENAP untuk
// hasil penjumlahannya. Seperti lembar Pauli, angka bawah menjadi angka atas
// pada soal berikutnya, sehingga peserta bekerja dalam satu "kolom" panjang.
// Tes berjalan 10 interval x 60 detik dan dicatat per interval.
//
// Kriteria kategori di bawah adalah kriteria sementara AssesIN, BUKAN norma
// baku. Kecepatan sengaja tidak dikategorikan sampai ada data norma peserta.

export const JUMLAH_INTERVAL = 10
export const DETIK_PER_INTERVAL = 60

export const angkaAcak = () => Math.floor(Math.random() * 9) + 1

/** Kunci satu soal: 'ganjil' atau 'genap' untuk atas + bawah. */
export const kunciPauli = (atas, bawah) => ((atas + bawah) % 2 === 0 ? 'genap' : 'ganjil')

const rata = a => a.reduce((t, v) => t + v, 0) / a.length

/** Kemiringan garis regresi jumlah kerja per interval (soal per interval). */
function kemiringan(nilai) {
  const n = nilai.length
  const mx = (n - 1) / 2
  const my = rata(nilai)
  let atas = 0, bawah = 0
  nilai.forEach((y, x) => { atas += (x - mx) * (y - my); bawah += (x - mx) ** 2 })
  return bawah === 0 ? 0 : atas / bawah
}

/**
 * interval: [{ jumlah, benar, salah }] sepanjang JUMLAH_INTERVAL.
 * Mengembalikan skor ringkas + empat aspek kerja.
 */
export function hitungPauli(interval) {
  const jumlah = interval.map(i => i.jumlah)
  const total = jumlah.reduce((t, v) => t + v, 0)
  const benar = interval.reduce((t, i) => t + i.benar, 0)
  const salah = total - benar
  const mean = total / interval.length
  const sd = Math.sqrt(rata(jumlah.map(v => (v - mean) ** 2)))

  const persenSalah = total ? (salah / total) * 100 : 0
  const cv = mean ? sd / mean : 0
  const awal = rata(jumlah.slice(0, 3))
  const akhir = rata(jumlah.slice(-3))
  const perubahan = awal ? ((akhir - awal) / awal) * 100 : 0

  return {
    interval,
    total, benar, salah,
    kecepatan: Math.round(mean * 10) / 10,                       // soal per menit
    ketelitian: { persenSalah: Math.round(persenSalah * 10) / 10, kategori: kategoriKetelitian(persenSalah) },
    keajegan: { rentang: Math.max(...jumlah) - Math.min(...jumlah), cv: Math.round(cv * 1000) / 10, kategori: kategoriKeajegan(cv) },
    ketahanan: { perubahan: Math.round(perubahan), kemiringan: Math.round(kemiringan(jumlah) * 10) / 10, kategori: kategoriKetahanan(perubahan) },
  }
}

function kategoriKetelitian(p) {
  if (p <= 2) return 'Sangat teliti'
  if (p <= 5) return 'Teliti'
  if (p <= 10) return 'Cukup teliti'
  return 'Kurang teliti'
}

// cv = simpangan baku / rata-rata jumlah kerja per interval
function kategoriKeajegan(cv) {
  if (cv <= 0.08) return 'Sangat stabil'
  if (cv <= 0.15) return 'Stabil'
  if (cv <= 0.25) return 'Cukup stabil'
  return 'Naik-turun'
}

// perubahan = rata-rata 3 interval terakhir dibanding 3 interval pertama (%)
function kategoriKetahanan(p) {
  if (p >= 0) return 'Bertahan / meningkat'
  if (p >= -10) return 'Sedikit menurun'
  if (p >= -20) return 'Menurun'
  return 'Menurun tajam'
}

export const ringkasanPauli = s => `${s.total} soal · ${s.ketelitian.persenSalah}% salah`

export const NARASI_PAULI = {
  ketelitian: {
    'Sangat teliti': 'Hampir semua jawaban Anda benar. Anda mampu menjaga akurasi meski bekerja di bawah batas waktu.',
    'Teliti': 'Kesalahan Anda sedikit. Akurasi terjaga dengan baik sepanjang tes.',
    'Cukup teliti': 'Ada sejumlah kesalahan. Kecepatan mungkin sesekali mengorbankan ketelitian; cobalah sedikit memperlambat ritme.',
    'Kurang teliti': 'Kesalahan cukup banyak. Fokus pada akurasi lebih dulu, lalu tingkatkan kecepatan secara bertahap.',
  },
  keajegan: {
    'Sangat stabil': 'Jumlah kerja Anda hampir sama di setiap menit. Ritme kerja sangat terkendali.',
    'Stabil': 'Ritme kerja Anda cukup rata dari menit ke menit, dengan naik-turun yang wajar.',
    'Cukup stabil': 'Ritme kerja Anda beberapa kali naik-turun. Konsentrasi kadang terganggu, tetapi masih bisa dipulihkan.',
    'Naik-turun': 'Jumlah kerja berubah cukup besar antarmenit. Ini bisa menandakan konsentrasi yang mudah terpecah atau tempo yang belum diatur.',
  },
  ketahanan: {
    'Bertahan / meningkat': 'Performa di akhir tes setara atau lebih baik daripada di awal. Daya tahan kerja Anda baik.',
    'Sedikit menurun': 'Performa sedikit turun di akhir tes, masih dalam batas wajar kelelahan.',
    'Menurun': 'Performa turun cukup jelas di akhir tes. Atur tempo sejak awal agar tenaga tidak habis.',
    'Menurun tajam': 'Performa turun tajam di akhir. Kemungkinan Anda terlalu cepat di awal atau mudah lelah pada tugas berulang.',
  },
}
