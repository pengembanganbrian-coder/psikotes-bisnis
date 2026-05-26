// Harga unlock laporan lengkap per jenis tes
export const HARGA_TES = {
  MBTI:           39000,
  DISC:           39000,
  PAPI:           49000,
  DASS:           29000,
  'Love Language': 29000,
  MSDT:           49000,
}

export const NAMA_TES = {
  MBTI:           'Tes MBTI',
  DISC:           'Tes DISC',
  PAPI:           'Tes PAPI Kostick',
  DASS:           'Tes DASS-21',
  'Love Language': 'Tes Love Language',
  MSDT:           'Tes MSDT',
}

export const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka)
