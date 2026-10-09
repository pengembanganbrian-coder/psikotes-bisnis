// Sesi "bayar di awal" untuk tes kemampuan (Pauli, Kognitif).
//
// Peserta mengisi data diri, membayar, baru mengerjakan tes. pesertaId dibuat
// saat data diri diisi dan dipakai sebagai kunci pembayaran (tabel payments),
// lalu dipakai lagi saat menyimpan hasil. Sesi disimpan di localStorage
// supaya tidak hilang bila browser dialihkan ke halaman Mayar (popup diblokir)
// atau halaman tertutup sebelum tes selesai. Satu pembayaran = satu tes:
// sesi dihapus begitu hasil tersimpan.

const kunci = tes => `assesin_sesi_${tes}`

export const RUTE_TES = { Pauli: '/tes-pauli', Kognitif: '/tes-kognitif' }

export function ambilSesi(tes) {
  try {
    const s = JSON.parse(localStorage.getItem(kunci(tes)) || 'null')
    return s?.pesertaId && s?.peserta ? s : null
  } catch {
    return null
  }
}

export function simpanSesi(tes, sesi) {
  try { localStorage.setItem(kunci(tes), JSON.stringify(sesi)) } catch { /* mode privat: sesi hanya di memori */ }
}

export function hapusSesi(tes) {
  try { localStorage.removeItem(kunci(tes)) } catch { /* abaikan */ }
}

/** Tes yang sudah dibayar/sedang menunggu pembayaran tapi belum dikerjakan. */
export function sesiTertunda() {
  return Object.keys(RUTE_TES).filter(t => ambilSesi(t))
}
