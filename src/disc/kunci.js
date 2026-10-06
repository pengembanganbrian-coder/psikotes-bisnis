// Kunci jawaban DISC 24 nomor (lembar DISC_penghubung, sheet "ANALIS PROFIL" baris 2).
// Untuk setiap nomor, indeks 0-3 = kata ke-1 sampai ke-4 sesuai urutan soal.
// most = dimensi bila kata dipilih "paling mirip" (M), least = bila dipilih
// "paling tidak mirip" (L). '*' = tidak diskor ke dimensi mana pun.

export const KUNCI_DISC = [
  { most: ['S', 'I', '*', 'C'], least: ['S', 'I', 'D', 'C'] }, // 1
  { most: ['I', 'D', '*', 'S'], least: ['*', 'D', 'I', 'S'] }, // 2
  { most: ['I', '*', '*', 'D'], least: ['I', 'C', 'S', '*'] }, // 3
  { most: ['C', 'S', '*', 'D'], least: ['C', 'S', 'I', 'D'] }, // 4
  { most: ['I', 'D', 'S', '*'], least: ['*', 'D', 'S', 'C'] }, // 5
  { most: ['C', 'D', 'I', 'S'], least: ['*', 'D', 'I', 'S'] }, // 6
  { most: ['S', 'I', '*', '*'], least: ['*', 'I', 'C', 'D'] }, // 7
  { most: ['I', 'S', 'C', 'D'], least: ['I', 'S', 'C', 'D'] }, // 8
  { most: ['D', 'C', '*', '*'], least: ['D', 'C', 'I', 'S'] }, // 9
  { most: ['*', 'D', 'S', 'I'], least: ['C', 'D', 'S', '*'] }, // 10
  { most: ['S', '*', 'D', 'C'], least: ['*', 'I', 'D', 'C'] }, // 11
  { most: ['*', 'C', 'I', 'D'], least: ['S', '*', 'I', 'D'] }, // 12
  { most: ['D', 'S', 'I', '*'], least: ['D', '*', '*', 'C'] }, // 13
  { most: ['C', 'I', 'S', 'D'], least: ['C', 'I', '*', 'D'] }, // 14
  { most: ['S', 'C', 'I', 'D'], least: ['S', '*', 'I', 'D'] }, // 15
  { most: ['*', 'C', 'I', 'S'], least: ['D', '*', 'I', 'S'] }, // 16
  { most: ['*', 'D', 'S', 'I'], least: ['C', 'D', 'S', '*'] }, // 17
  { most: ['D', '*', '*', 'C'], least: ['D', 'I', 'S', '*'] }, // 18
  { most: ['D', 'S', 'I', '*'], least: ['D', '*', 'I', 'C'] }, // 19
  { most: ['D', 'S', 'I', 'C'], least: ['*', 'C', 'I', '*'] }, // 20
  { most: ['S', 'D', 'I', '*'], least: ['S', 'D', 'I', 'C'] }, // 21
  { most: ['S', '*', 'D', 'C'], least: ['S', 'I', 'D', 'C'] }, // 22
  { most: ['*', 'I', 'S', '*'], least: ['D', '*', 'S', 'C'] }, // 23
  { most: ['*', 'I', 'D', 'C'], least: ['S', 'I', '*', '*'] }, // 24
]
