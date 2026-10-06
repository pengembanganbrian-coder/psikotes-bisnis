// Daftar tes di ruang Tes Kemampuan. Bentuknya mengikuti tes-baru/definisi.js
// (testType, tabel, hasilRoute, warna) supaya dashboard admin dan "Laporan
// saya" bisa memperlakukannya sama: skor disimpan sebagai jsonb.

export const TES_KEMAMPUAN = [
  {
    testType: 'Pauli', judul: 'Pauli Digital', singkat: 'Pauli',
    route: '/tes-pauli', hasilRoute: '/hasil-pauli',
    tabel: { peserta: 'peserta_pauli', hasil: 'hasil_pauli' },
    warna: '#0f766e',
  },
  {
    testType: 'Kognitif', judul: 'Tes Kemampuan Kognitif', singkat: 'Kognitif',
    route: '/tes-kognitif', hasilRoute: '/hasil-kognitif',
    tabel: { peserta: 'peserta_kognitif', hasil: 'hasil_kognitif' },
    warna: '#1d4ed8',
  },
]

export const KEMAMPUAN_BY_TYPE = Object.fromEntries(TES_KEMAMPUAN.map(t => [t.testType, t]))
