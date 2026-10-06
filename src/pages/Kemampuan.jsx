import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import { HARGA_TES, formatRupiah } from '../config/pricing'
import { JUMLAH_INTERVAL } from '../kemampuan/pauli'
import { SUBTES, TOTAL_SOAL } from '../kemampuan/kognitif'

// Ruang Tes Kemampuan: tes berbatas waktu yang punya jawaban benar/salah,
// dipisah dari tes kepribadian di beranda.

const TES = [
  {
    id: 'Pauli', route: '/tes-pauli', nama: 'Pauli Digital (ganjil-genap)',
    desc: 'Jumlahkan dua angka dan tentukan hasilnya ganjil atau genap, secepat dan seteliti mungkin. Mengukur kecepatan, ketelitian, kestabilan, dan daya tahan kerja seperti tes Pauli/Kraepelin.',
    meta: [`${JUMLAH_INTERVAL} menit`, 'grafik kerja per menit'],
  },
  {
    id: 'Kognitif', route: '/tes-kognitif', nama: 'Kemampuan Kognitif',
    desc: 'Deret angka, analogi kata, penalaran logis, dan matriks gambar — jenis soal kemampuan yang sering muncul di psikotes kerja, BUMN, dan CPNS.',
    meta: [`${TOTAL_SOAL} soal`, `${SUBTES.length} subtes`, `${Math.round(SUBTES.reduce((t, s) => t + s.detik, 0) / 60)} menit`],
  },
]

export default function Kemampuan() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid var(--border)', padding: '0 var(--px)' }}>
        <div style={{ maxWidth: '1040px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" aria-label="Beranda AssesIN"><Logo size="sm" dark /></Link>
          <Link to="/" style={{ fontSize: '14px', color: 'var(--text-muted)', textDecoration: 'none' }}>← Beranda</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1040px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) var(--px) 64px' }}>
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Ruang Tes Kemampuan</p>
        <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 40px)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: '12px' }}>Latihan tes kemampuan & ketelitian</h1>
        <p style={{ color: 'var(--text-sub)', fontSize: '16px', lineHeight: 1.7, maxWidth: '680px', marginBottom: '36px' }}>
          Berbeda dengan tes kepribadian, tes di sini punya jawaban benar dan batas waktu. Kerjakan di tempat tenang,
          sebaiknya tanpa gangguan, karena waktu tidak bisa dijeda. Skor dan grafik ringkas langsung tampil gratis.
        </p>

        <div className="tes-grid">
          {TES.map(t => (
            <button key={t.id} onClick={() => navigate(t.route)} className="card-test"
              style={{ textAlign: 'left', padding: '22px', width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text)' }}>{t.nama}</h2>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', background: 'var(--accent-dim)', padding: '2px 8px', borderRadius: '99px' }}>Baru</span>
              </div>
              <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.6, flex: 1 }}>{t.desc}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{t.meta.join(' · ')}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Laporan lengkap <strong style={{ color: 'var(--text)', fontWeight: 600 }}>{HARGA_TES[t.id] ? formatRupiah(HARGA_TES[t.id]) : 'Gratis (promo)'}</strong>
                </span>
                <span className="card-cta">Mulai <span className="card-cta-arrow" aria-hidden="true">→</span></span>
              </div>
            </button>
          ))}
        </div>

        <div className="dark-card" style={{ padding: '22px 24px', marginTop: '36px' }}>
          <p style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>Tentang skor</p>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.7 }}>
            Semua soal dibuat sendiri oleh AssesIN untuk latihan. Hasil tidak dinyatakan sebagai skor IQ; kategori yang tampil
            adalah kriteria sementara sampai norma peserta AssesIN terkumpul.
          </p>
        </div>
      </main>
    </div>
  )
}
