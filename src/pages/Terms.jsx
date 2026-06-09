import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '36px' }}>
    <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px', color: 'var(--text)', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid var(--border)' }}>
      {title}
    </h2>
    <div style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.85', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {children}
    </div>
  </div>
)

const Item = ({ children }) => (
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>—</span>
    <span>{children}</span>
  </div>
)

export default function Terms() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '80px' }}>

      {/* Header */}
      <div style={{ background: 'rgba(9,9,15,0.97)', borderBottom: '1px solid var(--border)', padding: '20px var(--px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size="sm" dark />
          <button onClick={() => navigate(-1)} style={{ color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← Kembali
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '48px var(--px)' }}>

        {/* Title */}
        <div style={{ marginBottom: '48px' }}>
          <div className="section-rule" style={{ marginBottom: '20px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Syarat & Ketentuan</span><span className="section-rule-line" />
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '32px', color: 'var(--text)', marginBottom: '12px' }}>
            Syarat & Ketentuan
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7' }}>
            Berlaku sejak: <strong style={{ color: 'var(--text-sub)' }}>1 Juli 2026</strong>
          </p>
        </div>

        {/* Intro */}
        <div className="dark-card" style={{ padding: '20px 24px', marginBottom: '36px', borderColor: 'var(--accent-border)', background: 'rgba(212,168,83,0.04)' }}>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.8' }}>
            Dengan mengakses dan menggunakan layanan AssesIN, Anda menyetujui Syarat & Ketentuan berikut secara penuh.
            Harap baca dengan seksama sebelum menggunakan platform ini. Jika Anda tidak menyetujui bagian apapun dari
            ketentuan ini, mohon untuk tidak menggunakan layanan kami.
          </p>
        </div>

        <Section title="1. Sifat dan Tujuan Tes">
          <Item>
            <strong style={{ color: 'var(--text)' }}>Hasil tes AssesIN bersifat indikatif</strong> — merupakan gambaran kecenderungan psikologis berdasarkan self-report, bukan diagnosis klinis yang definitif.
          </Item>
          <Item>
            Tes yang tersedia di platform ini (MBTI, DISC, PAPI Kostick, DASS-21, MSDT, Love Language) adalah instrumen psikologi yang digunakan sebagai alat bantu pemetaan potensi dan kepribadian, bukan pengganti evaluasi profesional oleh psikolog berlisensi.
          </Item>
          <Item>
            Hasil tes <strong style={{ color: 'var(--text)' }}>tidak boleh</strong> digunakan sebagai satu-satunya dasar untuk keputusan medis, klinis, atau keputusan rekrutmen yang signifikan tanpa validasi dari tenaga profesional yang kompeten.
          </Item>
        </Section>

        <Section title="2. Batasan Tanggung Jawab">
          <Item>
            AssesIN <strong style={{ color: 'var(--text)' }}>tidak bertanggung jawab</strong> atas keputusan apa pun — termasuk keputusan karier, rekrutmen, medis, atau personal — yang dibuat berdasarkan hasil tes dari platform ini.
          </Item>
          <Item>
            AssesIN tidak menjamin bahwa hasil tes akan sepenuhnya akurat untuk setiap individu. Faktor suasana hati, kondisi fisik, dan kejujuran pengisian mempengaruhi validitas hasil.
          </Item>
          <Item>
            AssesIN tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul dari penggunaan atau ketidakmampuan menggunakan platform ini.
          </Item>
          <Item>
            Dalam hal gangguan teknis (server down, pembayaran gagal, dsb.), AssesIN akan berupaya memulihkan layanan sesegera mungkin namun tidak dapat menjamin ketersediaan tanpa gangguan.
          </Item>
        </Section>

        <Section title="3. Kewajiban Pengguna">
          <Item>
            <strong style={{ color: 'var(--text)' }}>Pengguna wajib mengisi semua data diri dan menjawab pertanyaan tes dengan jujur dan apa adanya.</strong> Pengisian yang tidak jujur akan menghasilkan laporan yang tidak akurat dan merugikan pengguna sendiri.
          </Item>
          <Item>
            Pengguna wajib berusia minimal 16 tahun. Pengguna di bawah 16 tahun harus mendapat izin dari orang tua atau wali sebelum menggunakan platform ini.
          </Item>
          <Item>
            Pengguna tidak boleh menggunakan platform ini untuk tujuan yang melanggar hukum, termasuk pemalsuan identitas, manipulasi data, atau penyalahgunaan hasil tes orang lain.
          </Item>
          <Item>
            Pengguna bertanggung jawab untuk menjaga kerahasiaan hasil tesnya sendiri. AssesIN tidak bertanggung jawab atas penyebaran hasil tes yang dilakukan oleh pengguna sendiri.
          </Item>
        </Section>

        <Section title="4. Pembayaran dan Refund">
          <Item>
            Akses laporan premium berbayar diproses secara aman melalui Duitku. Dengan melakukan pembayaran, Anda menyetujui ketentuan Duitku yang berlaku.
          </Item>
          <Item>
            <strong style={{ color: 'var(--text)' }}>Pembayaran bersifat final dan tidak dapat dikembalikan (non-refundable)</strong> setelah laporan premium berhasil dibuka dan ditampilkan.
          </Item>
          <Item>
            Jika pembayaran berhasil tetapi laporan tidak dapat diakses karena kendala teknis di pihak AssesIN, kami akan memberikan akses penuh atau pengembalian dana dalam 3–5 hari kerja.
          </Item>
          <Item>
            Harga yang tertera adalah dalam Rupiah (IDR) dan sudah termasuk PPN sesuai regulasi yang berlaku.
          </Item>
        </Section>

        <Section title="5. Hak Kekayaan Intelektual">
          <Item>
            Seluruh konten di platform AssesIN — termasuk desain, teks, instrumen tes, algoritma penilaian, dan laporan yang dihasilkan — adalah hak milik AssesIN dan dilindungi oleh hukum kekayaan intelektual Indonesia.
          </Item>
          <Item>
            Pengguna diberikan lisensi terbatas untuk menggunakan laporan hasil tes mereka sendiri untuk keperluan pribadi dan profesional. Pengguna <strong style={{ color: 'var(--text)' }}>tidak diperkenankan</strong> mereproduksi, mendistribusikan, atau mengkomersialkan konten platform tanpa izin tertulis dari AssesIN.
          </Item>
        </Section>

        <Section title="6. Privasi">
          <p>
            Penggunaan data pribadi Anda diatur dalam{' '}
            <a href="/privacy-policy" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Kebijakan Privasi</a>{' '}
            AssesIN yang merupakan bagian tidak terpisahkan dari Syarat & Ketentuan ini.
          </p>
        </Section>

        <Section title="7. Perubahan Layanan dan Ketentuan">
          <Item>
            AssesIN berhak untuk mengubah, menangguhkan, atau menghentikan layanan — atau bagian dari layanan — kapan saja dengan atau tanpa pemberitahuan sebelumnya.
          </Item>
          <Item>
            AssesIN berhak untuk mengubah Syarat & Ketentuan ini. Perubahan akan diumumkan melalui halaman ini. Penggunaan platform setelah perubahan berlaku berarti Anda menyetujui ketentuan yang diperbarui.
          </Item>
        </Section>

        <Section title="8. Hukum yang Berlaku">
          <p>
            Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Kesatuan Republik Indonesia.
            Setiap perselisihan yang timbul akan diselesaikan secara musyawarah, dan jika tidak tercapai kesepakatan,
            akan diselesaikan melalui jalur hukum yang berlaku di Indonesia.
          </p>
        </Section>

        <Section title="9. Kontak">
          <p>Untuk pertanyaan terkait Syarat & Ketentuan ini, hubungi:</p>
          <div className="dark-card" style={{ padding: '16px 20px', marginTop: '8px' }}>
            <p style={{ color: 'var(--text)', fontWeight: 600, marginBottom: '4px' }}>AssesIN</p>
            <p>Email: <strong style={{ color: 'var(--accent)' }}>pengembangan.brian@gmail.com</strong></p>
          </div>
        </Section>

      </div>
    </div>
  )
}
