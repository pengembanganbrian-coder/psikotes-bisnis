// Harga laporan lengkap per tes — SUMBER KEBENARAN untuk nominal tagihan.
// Browser tidak boleh menentukan nominal (bisa diubah jadi Rp1), jadi Edge
// Function membaca harga dari sini. Wajib disamakan dengan
// src/config/pricing.js (yang hanya untuk tampilan) setiap kali harga berubah.
export const HARGA_TES: Record<string, number> = {
  MBTI:           15000,
  DISC:           20000,
  PAPI:           30000,
  DASS:           10000,
  'Love Language': 5000,
  MSDT:           25000,
  'Big Five':     15000,
  RIASEC:         15000,
  Resiliensi:     15000,
  'Peran Tim':    15000,
}
