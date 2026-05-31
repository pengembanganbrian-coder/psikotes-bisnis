// Harga unlock laporan lengkap per jenis tes
export const HARGA_TES = {
  MBTI:           15000,
  DISC:           20000,
  PAPI:           30000,
  DASS:           10000,
  'Love Language': 5000,
  MSDT:           25000,
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
