// Harga laporan lengkap per tes — SUMBER KEBENARAN untuk nominal tagihan.
// Browser tidak boleh menentukan nominal (bisa diubah jadi Rp1), jadi Edge
// Function membaca harga dari sini. Wajib disamakan dengan
// src/config/pricing.js (yang hanya untuk tampilan) setiap kali harga berubah.
// 0 = laporan digratiskan (promo); server menolak membuat tagihan untuknya.
export const HARGA_TES: Record<string, number> = {
  MBTI:           19000,
  DISC:           25000,
  PAPI:           35000,
  DASS:           15000,
  'Love Language':    0,
  MSDT:           29000,
  'Big Five':     15000,
  RIASEC:         15000,
  Resiliensi:     15000,
  'Peran Tim':    15000,
}
