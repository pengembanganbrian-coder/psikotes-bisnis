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

export default function PrivacyPolicy() {
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
            <span className="section-rule-pip" /><span className="section-rule-label">Kebijakan Privasi</span><span className="section-rule-line" />
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '32px', color: 'var(--text)', marginBottom: '12px' }}>
            Kebijakan Privasi
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7' }}>
            Berlaku sejak: <strong style={{ color: 'var(--text-sub)' }}>1 Juli 2026</strong><br />
            Terakhir diperbarui: <strong style={{ color: 'var(--text-sub)' }}>1 Juli 2026</strong>
          </p>
        </div>

        {/* Intro */}
        <div className="dark-card" style={{ padding: '20px 24px', marginBottom: '36px', borderColor: 'var(--accent-border)', background: 'rgba(212,168,83,0.04)' }}>
          <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.8' }}>
            AssesIN berkomitmen untuk melindungi privasi Anda. Kebijakan ini menjelaskan secara transparan
            data apa yang kami kumpulkan, bagaimana kami menggunakannya, dan hak-hak Anda sebagai pengguna.
            Dengan menggunakan layanan AssesIN, Anda menyetujui kebijakan ini.
          </p>
        </div>

        <Section title="1. Data yang Kami Kumpulkan">
          <p>Saat Anda mengikuti tes psikologi di AssesIN, kami mengumpulkan informasi berikut:</p>
          <Item><strong style={{ color: 'var(--text)' }}>Nama lengkap</strong> — untuk mengidentifikasi laporan hasil tes Anda.</Item>
          <Item><strong style={{ color: 'var(--text)' }}>Alamat email</strong> — untuk menghubungkan data tes Anda secara unik.</Item>
          <Item><strong style={{ color: 'var(--text)' }}>Usia dan jenis kelamin</strong> — untuk konteks normatif dan analisis demografis yang bersifat agregat.</Item>
          <Item><strong style={{ color: 'var(--text)' }}>Jawaban tes</strong> — respons Anda terhadap setiap butir soal, yang digunakan untuk menghitung hasil tes.</Item>
          <Item><strong style={{ color: 'var(--text)' }}>Hasil tes</strong> — tipe kepribadian, skor, dan interpretasi yang dihasilkan dari jawaban Anda.</Item>
          <Item><strong style={{ color: 'var(--text)' }}>Data pembayaran</strong> — status transaksi (bukan nomor kartu atau data rekening). Pembayaran diproses oleh Duitku yang bersertifikasi PCI-DSS.</Item>
        </Section>

        <Section title="2. Bagaimana Data Digunakan">
          <p>Data yang kami kumpulkan digunakan <strong style={{ color: 'var(--text)' }}>semata-mata</strong> untuk keperluan berikut:</p>
          <Item>Menampilkan dan menyimpan laporan hasil tes Anda.</Item>
          <Item>Memungkinkan admin AssesIN (HR profesional atau organisasi klien) melihat hasil asesmen peserta yang telah mendaftar melalui platform mereka.</Item>
          <Item>Meningkatkan akurasi dan kualitas instrumen tes melalui analisis data yang bersifat anonim dan agregat.</Item>
          <Item>Memproses pembayaran untuk akses laporan premium.</Item>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Kami <strong style={{ color: 'var(--text-sub)', fontStyle: 'normal' }}>tidak</strong> menggunakan data Anda untuk iklan, profiling komersial, atau tujuan di luar asesmen psikologi.
          </p>
        </Section>

        <Section title="3. Pembagian Data kepada Pihak Ketiga">
          <Item><strong style={{ color: 'var(--text)' }}>Data Anda tidak dijual</strong> kepada pihak manapun, dalam bentuk apapun.</Item>
          <Item>Data tidak dibagikan kepada pihak ketiga kecuali:
            <br />— <em>Penyedia infrastruktur teknis</em>: Supabase (penyimpanan database terenkripsi) dan Duitku (pemroses pembayaran), yang terikat perjanjian kerahasiaan data.
            <br />— <em>Kewajiban hukum</em>: jika diwajibkan oleh peraturan perundang-undangan Indonesia yang berlaku.
          </Item>
          <Item>Semua penyedia layanan pihak ketiga yang kami gunakan memiliki standar keamanan yang telah diverifikasi.</Item>
        </Section>

        <Section title="4. Keamanan Data">
          <Item>Seluruh data disimpan di server Supabase dengan enkripsi <strong style={{ color: 'var(--text)' }}>AES-256 at rest</strong> dan <strong style={{ color: 'var(--text)' }}>TLS 1.3 in transit</strong>.</Item>
          <Item>Akses ke database hanya diberikan kepada admin AssesIN yang berwenang, dengan otentikasi berlapis.</Item>
          <Item>Row Level Security (RLS) diterapkan di semua tabel data peserta — artinya pengguna satu tidak dapat mengakses data pengguna lain.</Item>
          <Item>Data pembayaran diproses oleh Duitku yang bersertifikasi <strong style={{ color: 'var(--text)' }}>PCI-DSS Level 1</strong> — kami tidak pernah menyimpan informasi kartu kredit Anda.</Item>
        </Section>

        <Section title="5. Penyimpanan dan Retensi Data">
          <Item>Data tes Anda disimpan selama akun atau sesi tes Anda aktif, atau selama diperlukan untuk tujuan asesmen yang disepakati.</Item>
          <Item>Data dapat dihapus atas permintaan Anda (lihat Hak Pengguna di bawah).</Item>
          <Item>Data agregat yang sudah dianonimkan dapat disimpan lebih lama untuk keperluan pengembangan instrumen.</Item>
        </Section>

        <Section title="6. Hak-Hak Anda sebagai Pengguna">
          <p>Anda memiliki hak-hak berikut atas data pribadi Anda:</p>
          <Item><strong style={{ color: 'var(--text)' }}>Hak Akses</strong> — Anda dapat meminta salinan data pribadi yang kami simpan tentang Anda.</Item>
          <Item><strong style={{ color: 'var(--text)' }}>Hak Koreksi</strong> — Anda dapat meminta koreksi jika data yang tersimpan tidak akurat.</Item>
          <Item><strong style={{ color: 'var(--text)' }}>Hak Penghapusan</strong> — Anda dapat meminta agar data Anda dihapus dari sistem kami. Kami akan memproses permintaan dalam 7 hari kerja.</Item>
          <Item><strong style={{ color: 'var(--text)' }}>Hak Penarikan Persetujuan</strong> — Anda dapat menarik persetujuan penggunaan data kapan saja, yang akan berakibat pada penghentian akses layanan.</Item>
          <p style={{ marginTop: '8px' }}>
            Untuk menggunakan hak-hak di atas, kirimkan permintaan ke:{' '}
            <strong style={{ color: 'var(--accent)' }}>pengembangan.brian@gmail.com</strong>
          </p>
        </Section>

        <Section title="7. Cookie dan Penyimpanan Lokal">
          <Item>Kami menggunakan <em>localStorage</em> di browser Anda hanya untuk menyimpan status pembayaran sesi aktif, sehingga Anda tidak perlu membayar ulang saat menyegarkan halaman.</Item>
          <Item>Kami tidak menggunakan cookie pelacak, cookie iklan, atau layanan analitik pihak ketiga yang mengumpulkan data perilaku.</Item>
        </Section>

        <Section title="8. Perubahan Kebijakan">
          <p>
            Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan signifikan akan diinformasikan melalui halaman ini dengan memperbarui tanggal "Terakhir diperbarui". Penggunaan layanan setelah tanggal pembaruan berarti Anda menyetujui perubahan tersebut.
          </p>
        </Section>

        <Section title="9. Kontak">
          <p>
            Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak-hak Anda, hubungi kami di:
          </p>
          <div className="dark-card" style={{ padding: '16px 20px', marginTop: '8px' }}>
            <p style={{ color: 'var(--text)', fontWeight: 600, marginBottom: '4px' }}>AssesIN</p>
            <p>Email: <strong style={{ color: 'var(--accent)' }}>pengembangan.brian@gmail.com</strong></p>
          </div>
        </Section>

      </div>
    </div>
  )
}
