// Skoring grafik DISC mengikuti rumus lembar eDISC (sheet tersembunyi data2 & misc):
// 1. Skor mentah Most (grafik 1), Least (grafik 2), dan Change = Most - Least
//    (grafik 3) dikonversi ke posisi grafik 1-32 lewat TABEL_POSISI.
// 2. Profil grafik = huruf berposisi >= 17 (di atas garis tengah), urut dari
//    yang tertinggi; bila sama tinggi, urutan C, S, I, D didahulukan.
// 3. Kondisi khusus:
//    semua < 17               -> undershift
//    semua >= 17              -> uppershift
//    semua di rentang 13..20  -> tight profile
//    selain itu               -> normal
import { TABEL_POSISI } from './tabel.js'

export const DIMENSI = ['D', 'I', 'S', 'C']
export const GARIS_TENGAH = 17

export const NAMA_GRAFIK = {
  1: { judul: 'Grafik 1 · Most', sub: 'Diri yang ditampilkan di depan umum' },
  2: { judul: 'Grafik 2 · Least', sub: 'Respons saat berada di bawah tekanan' },
  3: { judul: 'Grafik 3 · Change', sub: 'Gambaran diri yang sesungguhnya' },
}

/** Posisi grafik untuk satu skor mentah; skor di luar tabel dijepit ke ujungnya. */
export function posisi(grafik, dim, nilai) {
  const tabel = TABEL_POSISI[grafik][dim]
  if (tabel[nilai] !== undefined) return tabel[nilai]
  const kunci = Object.keys(tabel).map(Number)
  const batas = nilai < Math.min(...kunci) ? Math.min(...kunci) : Math.max(...kunci)
  return tabel[batas]
}

/** pos: { D, I, S, C } posisi grafik -> { kode, kondisi } */
export function bacaGrafik(pos) {
  const p = DIMENSI.map(d => pos[d])
  let kondisi = 'normal'
  if (p.every(v => v < GARIS_TENGAH)) kondisi = 'undershift'
  else if (p.every(v => v >= GARIS_TENGAH)) kondisi = 'uppershift'
  else if (p.every(v => v > 12 && v < 21)) kondisi = 'tight'
  const kode = DIMENSI
    .map((d, i) => ({ d, v: pos[d], i }))
    .filter(x => x.v >= GARIS_TENGAH)
    .sort((a, b) => b.v - a.v || b.i - a.i)
    .map(x => x.d)
    .join('')
  return { kode, kondisi }
}

/**
 * most, least: { D, I, S, C } jumlah pilihan per dimensi (tanpa bintang).
 * Mengembalikan posisi & pembacaan ketiga grafik serta profil utama.
 */
export function hitungGrafikDISC(most, least) {
  const change = Object.fromEntries(DIMENSI.map(d => [d, most[d] - least[d]]))
  const mentah = { 1: most, 2: least, 3: change }
  const grafik = {}
  for (const g of [1, 2, 3]) {
    const pos = Object.fromEntries(DIMENSI.map(d => [d, posisi(g, d, mentah[g][d])]))
    grafik[g] = { mentah: mentah[g], pos, ...bacaGrafik(pos) }
  }
  // Profil utama diambil dari grafik 3; bila grafik 3 tidak normal, dipakai
  // grafik normal pertama (1 lalu 2), dan bila tidak ada, huruf tertinggi grafik 3.
  const normal = [3, 1, 2].find(g => grafik[g].kondisi === 'normal' && grafik[g].kode)
  const sumber = normal || 3
  const profil = normal
    ? grafik[normal].kode
    : DIMENSI.reduce((a, d) => (grafik[3].pos[d] > grafik[3].pos[a] ? d : a), 'D')
  return { grafik, profil, sumberProfil: sumber, profilPasti: normal === 3 }
}

export const LABEL_KONDISI = {
  normal: null,
  undershift: {
    judul: 'Undershift',
    isi: 'Semua titik grafik berada di bawah garis tengah. Ini dapat menandakan peserta sedang berada di bawah tekanan, kurang yakin akan perannya, atau sedang mengalami perubahan, sehingga perilaku yang tampak belum menggambarkan kecenderungan aslinya.',
  },
  uppershift: {
    judul: 'Uppershift',
    isi: 'Semua titik grafik berada di atas garis tengah. Ini dapat menandakan motivasi yang sangat tinggi, keinginan tampil sebaik mungkin saat tes, atau usaha memenuhi banyak tuntutan sekaligus.',
  },
  tight: {
    judul: 'Tight profile',
    isi: 'Semua titik grafik berdekatan di sekitar garis tengah sehingga tidak ada dimensi yang menonjol. Ini dapat menandakan kebingungan peran, perubahan situasi, atau keraguan saat mengisi tes; sebaiknya dikonfirmasi lewat wawancara.',
  },
}
