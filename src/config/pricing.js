// Harga unlock laporan lengkap per jenis tes. Harus sama dengan
// supabase/functions/_shared/harga.ts (yang dipakai server untuk menagih).
// 0 = laporan lengkap digratiskan (promo).
export const HARGA_TES = {
  MBTI:           19000,
  DISC:           25000,
  PAPI:           35000,
  DASS:           15000,
  'Love Language':    0,
  MSDT:           29000,
  // Tes baru (beta)
  'Big Five':     15000,
  RIASEC:         15000,
  Resiliensi:     15000,
  'Peran Tim':    15000,
  // Ruang Tes Kemampuan (harus sama dengan harga.ts)
  Pauli:          15000,
  Kognitif:       25000,
}

export const NAMA_TES = {
  MBTI:           'Tes MBTI',
  DISC:           'Tes DISC',
  PAPI:           'Tes PAPI Kostick',
  DASS:           'Tes DASS-21',
  'Love Language': 'Tes Love Language',
  MSDT:           'Tes MSDT',
  'Big Five':     'Tes Kepribadian Big Five',
  RIASEC:         'Tes Minat Karier RIASEC',
  Resiliensi:     'Tes Resiliensi Kerja',
  'Peran Tim':    'Tes Peran dalam Tim',
  Pauli:          'Tes Pauli Digital',
  Kognitif:       'Tes Kemampuan Kognitif',
}

export const formatRupiah = (angka) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(angka)
