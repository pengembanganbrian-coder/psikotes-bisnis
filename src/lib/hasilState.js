// Menyusun ulang `state` halaman hasil dari baris database, supaya hasil tes
// bisa dibuka lagi dari "Laporan saya" (bentuk state sama dengan yang dikirim
// halaman tes saat selesai).
import { TES_BY_TYPE } from '../tes-baru/definisi'

const PAPI_SCALES = ['G','L','I','T','V','S','R','D','C','E','N','A','P','X','B','O','Z','K','F','W']

/**
 * item: { jenis, id, nama, email, jabatan, hasil } — satu entri dari RPC laporan_saya().
 * Mengembalikan { route, state } atau null bila hasil tesnya tidak tersimpan.
 */
export function stateHasil(item) {
  const h = item.hasil
  if (!h) return null
  const dasar = { nama: item.nama, email: item.email, jabatan: item.jabatan, pesertaId: item.id }

  const baru = TES_BY_TYPE[item.jenis]
  if (baru) {
    return { route: baru.hasilRoute, state: { ...dasar, skor: h.skor, jawaban: h.jawaban } }
  }

  switch (item.jenis) {
    case 'MBTI':
      return { route: '/hasil', state: { ...dasar, tipe: h.tipe_mbti } }
    case 'DISC':
      return {
        route: '/hasil-disc',
        state: {
          ...dasar,
          hasil: {
            profil: h.profil,
            mostD: h.skor_d_most,   mostI: h.skor_i_most,   mostS: h.skor_s_most,   mostC: h.skor_c_most,
            leastD: h.skor_d_least, leastI: h.skor_i_least, leastS: h.skor_s_least, leastC: h.skor_c_least,
            changeD: h.skor_d_change, changeI: h.skor_i_change,
            changeS: h.skor_s_change, changeC: h.skor_c_change,
          },
        },
      }
    case 'PAPI': {
      const scores = {}
      PAPI_SCALES.forEach(k => { scores[k] = h[`skor_${k.toLowerCase()}`] ?? 0 })
      return { route: '/hasil-papi', state: { ...dasar, scores, profil: h.profil } }
    }
    case 'DASS':
      return {
        route: '/hasil-dass',
        state: { ...dasar, skor: { D: h.skor_depresi, A: h.skor_anxietas, S: h.skor_stres } },
      }
    case 'Love Language':
      return {
        route: '/hasil-love-language',
        state: {
          ...dasar,
          utama: h.bahasa_utama,
          kedua: h.bahasa_kedua,
          skor: { W: h.skor_w, Q: h.skor_q, G: h.skor_g, A: h.skor_a, P: h.skor_p },
        },
      }
    case 'MSDT':
      return {
        route: '/hasil-msdt',
        state: {
          ...dasar,
          hasil: {
            TO:         h.skor_to,
            RO:         h.skor_ro,
            E_score:    h.e_score,
            E_raw:      h.grand_total,  // grand_total menyimpan skor mentah dimensi E
            gaya:       h.gaya,
          },
        },
      }
    default:
      return null
  }
}
