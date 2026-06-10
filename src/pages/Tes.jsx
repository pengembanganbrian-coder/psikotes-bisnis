import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import PrivacyCheckbox from '../components/PrivacyCheckbox'

const soal = [
  // EI - Bagian 1 (15 soal)
  { id: 1, kiri: "Lebih memilih berkomunikasi dengan menulis.", kanan: "Lebih memilih berkomunikasi dengan berbicara.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 2, kiri: "Menemukan dan mengembangkan ide dengan merenungkan.", kanan: "Menemukan dan mengembangkan ide dengan mendiskusikan.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 3, kiri: "Berorientasi pada dunia internal (memori, pemikiran, ide).", kanan: "Berorientasi pada dunia eksternal (kegiatan, orang, aktifitas).", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 4, kiri: "Fokus pada beberapa ketertarikan / hobi tertentu namun mendalam.", kanan: "Fokus pada banyak ketertarikan / hobi secara meluas dan general.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 5, kiri: "Tertutup dan mandiri.", kanan: "Sosial dan ekspresif.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 6, kiri: "Pertemuan dengan orang lain dan aktivitas sosial adalah melelahkan.", kanan: "Bertemu orang dan aktivitas sosial membuat bersemangat.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 7, kiri: "Beraktivitas sendirian di rumah adalah menyenangkan.", kanan: "Beraktivitas sendirian di rumah adalah membosankan.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 8, kiri: "Berinisiatif bila situasi memaksa atau berhubungan dengan kepentingan sendiri.", kanan: "Berinisiatif tinggi hampir dalam berbagai hal meski tidak berhubungan dengan dirinya.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 9, kiri: "Lebih memilih tempat yang tenang dan pribadi untuk berkonsentrasi.", kanan: "Lebih memilih tempat yang ramai dan banyak interaksi / aktivitas.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 10, kiri: "Berpikir secara matang sebelum bertindak.", kanan: "Memiliki keberanian bertindak tanpa harus terlalu lama berpikir.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 11, kiri: "Menyimpan semangat dalam hati.", kanan: "Mengekspresikan semangat.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 12, kiri: "Mencari kesempatan untuk berkomunikasi secara perorangan.", kanan: "Memilih berkomunikasi pada sekelompok orang.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 13, kiri: "Komunikasi tidak langsung lebih disukai (telepon, surat, email).", kanan: "Komunikasi yang dilakukan secara langsung lebih disukai (bertatap muka).", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 14, kiri: "Membangun ide dengan matang baru membicarakannya.", kanan: "Membangun idenya justru pada saat berbicara.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  { id: 15, kiri: "Berhati-hati, penuh pertimbangan, kaku.", kanan: "Spontan, easy going, fleksibel.", dimensi: "EI", arahKiri: "I", arahKanan: "E" },
  // SN - Bagian 2 (15 soal)
  { id: 16, kiri: "Bergerak dari detail kepada gambaran besar sebagai kesimpulan akhir.", kanan: "Bergerak dari gambaran umum (big picture) baru kemudian menuju detail.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 17, kiri: "Berbicara mengenai masalah yang dihadapi hari ini dan langkah-langkah praktis mengatasinya.", kanan: "Berbicara mengenai visi masa depan dan konsep-konsep mengenai visi tersebut.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 18, kiri: "Menggunakan pengalaman sebagai pedoman.", kanan: "Menggunakan imajinasi dan perenungan sebagai pedoman.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 19, kiri: "SOP sangat membantu.", kanan: "SOP sangat membosankan.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 20, kiri: "Prosedural dan tradisional.", kanan: "Bebas dan dinamis.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 21, kiri: "Memilih fakta lebih penting daripada ide inspiratif.", kanan: "Memilih ide inspiratif lebih penting daripada fakta.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 22, kiri: "Kontinuitas dan stabilitas lebih diutamakan.", kanan: "Perubahan dan variasi lebih diutamakan.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 23, kiri: "Bertindak step by step dengan timeframe yang jelas.", kanan: "Bertindak dengan semangat tanpa menggunakan timeframe.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 24, kiri: "Dalam menarik kesimpulan lama dan hati-hati.", kanan: "Dalam menarik kesimpulan cepat sesuai naluri.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 25, kiri: "Mengklarifikasi ide dan teori sebelum dipraktekkan.", kanan: "Memahami ide dan teori saat mempraktekannya secara langsung.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 26, kiri: "Berfokus pada masa kini (apa yang bisa diperbaiki sekarang).", kanan: "Berfokus pada masa depan (apa yang mungkin bisa dicapai di masa mendatang).", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 27, kiri: "Secara konsisten mengamati dan mengingat detail.", kanan: "Mengamati dan mengingat detail hanya bila berhubungan dengan pola.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 28, kiri: "Praktis.", kanan: "Konseptual.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 29, kiri: "Menggunakan keterampilan yang sudah dikuasai.", kanan: "Menyukai tantangan untuk menguasai keterampilan baru.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  { id: 30, kiri: "Memilih cara yang sudah ada dan sudah terbukti.", kanan: "Memilih cara yang unik dan belum dipraktekkan orang lain.", dimensi: "SN", arahKiri: "S", arahKanan: "N" },
  // TF - Bagian 3 (15 soal)
  { id: 31, kiri: "Obyektif.", kanan: "Subyektif.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 32, kiri: "Diyakinkan dengan penjelasan yang masuk akal.", kanan: "Diyakinkan dengan penjelasan yang menyentuh perasaan.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 33, kiri: "Berorientasi tugas-tugas dan job description.", kanan: "Berorientasi pada manusia dan hubungan.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 34, kiri: "Mengambil keputusan berdasarkan logika dan aturan main.", kanan: "Mengambil keputusan berdasarkan perasaan pribadi dan kondisi orang lain.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 35, kiri: "Mengemukakan tujuan dan sasaran lebih dahulu.", kanan: "Mengemukakan kesepakatan lebih dahulu.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 36, kiri: "Menghargai seseorang karena skill dan faktor teknis.", kanan: "Menghargai seseorang karena sifat dan perilakunya.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 37, kiri: "Melibatkan perasaan itu tidak profesional.", kanan: "Terlalu kaku pada peraturan dan pekerjaan itu kejam.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 38, kiri: "Yang penting tujuan tercapai.", kanan: "Yang penting situasi harmonis terjaga.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 39, kiri: "Mempertanyakan.", kanan: "Mengakomodasi.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 40, kiri: "Bersemangat saat mengkritik dan menemukan kesalahan.", kanan: "Bersemangat saat menolong orang keluar dari kesalahan dan meluruskan.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 41, kiri: "Standar harus ditegakkan di atas segalanya (itu menunjukkan kehormatan dan harga diri).", kanan: "Perasaan manusia lebih penting dari sekedar standar (yang adalah benda mati).", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 42, kiri: "Menuntut perlakuan yang adil dan sama pada semua orang.", kanan: "Menuntut perlakuan khusus sesuai karakteristik masing-masing orang.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 43, kiri: "Mementingkan sebab akibat.", kanan: "Mementingkan nilai-nilai personal.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 44, kiri: "Sering dianggap keras kepala.", kanan: "Sering dianggap terlalu memihak.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  { id: 45, kiri: "Menganalisa.", kanan: "Berempati.", dimensi: "TF", arahKiri: "T", arahKanan: "F" },
  // JP - Bagian 4 (15 soal)
  { id: 46, kiri: "Terencana, dan memiliki deadline jelas.", kanan: "Spontan, fleksibel, tidak diikat waktu.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 47, kiri: "Tidak menyukai hal-hal yang bersifat mendadak dan diluar perencanaan.", kanan: "Perubahan mendadak tidak menjadi masalah.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 48, kiri: "Aturan, jadwal dan target akan sangat membantu dan memperjelas tindakan.", kanan: "Aturan, jadwal dan target sangat mengikat dan membebani.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 49, kiri: "Berorientasi pada hasil.", kanan: "Berorientasi pada proses.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 50, kiri: "Fokus pada target dan mengabaikan hal-hal baru.", kanan: "Memperhatikan hal-hal baru dan siap menyesuaikan diri dan merubah target.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 51, kiri: "Merasa tenang bila semuanya sudah diputuskan.", kanan: "Merasa nyaman bila situasi tetap terbuka terhadap pilihan-pilihan lain.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 52, kiri: "Ketidakpastian membuat bingung dan meresahkan.", kanan: "Ketidakpastian itu menegangkan, seru, dan membuat lebih fun.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 53, kiri: "Situasi last minute sangat menyiksa, membuat stress, dan merupakan kesalahan.", kanan: "Situasi last minute membuat bersemangat dan memunculkan potensi.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 54, kiri: "Perubahan adalah musuh.", kanan: "Perubahan adalah semangat hidup.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 55, kiri: "Bertindak sesuai dengan apa yang sudah direncanakan.", kanan: "Bertindak sesuai situasi dan kondisi yang terjadi saat itu.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 56, kiri: "Hidup harus sudah diatur dari awal.", kanan: "Hidup harusnya mengalir sesuai kondisi.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 57, kiri: "Daftar dan checklist adalah panduan penting.", kanan: "Daftar dan checklist adalah tugas dan beban.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 58, kiri: "Kepuasan adalah ketika mampu menjalankan semua sesuai yang sudah direncanakan.", kanan: "Kepuasan adalah ketika mampu beradaptasi dengan momentum yang terjadi.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 59, kiri: "Mengatur orang lain dengan tata tertib agar tujuan tercapai.", kanan: "Membiarkan orang lain bertindak bebas asalkan tujuan tercapai.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
  { id: 60, kiri: "Berpegang teguh pada pendirian.", kanan: "Pendirian masih bisa berubah tergantung situasi nantinya.", dimensi: "JP", arahKiri: "J", arahKanan: "P" },
]

function hitungMBTI(jawaban) {
  let e=0, i=0, s=0, n=0, t=0, f=0, j=0, p=0
  soal.forEach((sq) => {
    const val = jawaban[sq.id]
    if (!val) return
    if (val === 'kiri') {
      if (sq.arahKiri === 'E') e++
      else if (sq.arahKiri === 'I') i++
      else if (sq.arahKiri === 'S') s++
      else if (sq.arahKiri === 'N') n++
      else if (sq.arahKiri === 'T') t++
      else if (sq.arahKiri === 'F') f++
      else if (sq.arahKiri === 'J') j++
      else if (sq.arahKiri === 'P') p++
    } else {
      if (sq.arahKanan === 'E') e++
      else if (sq.arahKanan === 'I') i++
      else if (sq.arahKanan === 'S') s++
      else if (sq.arahKanan === 'N') n++
      else if (sq.arahKanan === 'T') t++
      else if (sq.arahKanan === 'F') f++
      else if (sq.arahKanan === 'J') j++
      else if (sq.arahKanan === 'P') p++
    }
  })
  return {
    tipe: (e >= i ? 'E' : 'I') + (s >= n ? 'S' : 'N') + (t >= f ? 'T' : 'F') + (j >= p ? 'J' : 'P'),
    skor: { e, i, s, n, t, f, j, p }
  }
}

const dimensiLabel = { EI: 'E / I', SN: 'S / N', TF: 'T / F', JP: 'J / P' }
const dimensiUrutan = ['EI', 'SN', 'TF', 'JP']
const dimensiNama = { EI: 'Extraversion / Introversion', SN: 'Sensing / iNtuition', TF: 'Thinking / Feeling', JP: 'Judging / Perceiving' }

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

function Tes() {
  const [step, setStep]               = useState('form')
  const [nama, setNama]               = useState('')
  const [email, setEmail]             = useState('')
  const [usia, setUsia]               = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [jawaban, setJawaban]         = useState({})
  const [loading, setLoading]         = useState(false)
  const [dimensiAktif, setDimensiAktif] = useState(0)
  const [formErrors, setFormErrors]   = useState({})
  const [setujuPrivasi, setSetujuPrivasi] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

  const handleJawab = (id, val) => setJawaban(prev => ({ ...prev, [id]: val }))

  const soalDimensiAktif = soal.filter(s => s.dimensi === dimensiUrutan[dimensiAktif])
  const sudahDijawab     = soalDimensiAktif.filter(s => jawaban[s.id]).length
  const totalDimensi     = soalDimensiAktif.length

  const validateForm = () => {
    const errs = {}
    if (!nama.trim())  errs.nama  = 'Nama lengkap wajib diisi.'
    if (!email.trim()) errs.email = 'Email wajib diisi.'
    if (!usia)         errs.usia  = 'Usia wajib diisi.'
    if (!jenisKelamin) errs.jenisKelamin = 'Jenis kelamin wajib dipilih.'
    if (!setujuPrivasi) errs.privasi = 'Wajib menyetujui Kebijakan Privasi untuk melanjutkan.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (sudahDijawab < totalDimensi) {
      const belum = soalDimensiAktif.find(s => !jawaban[s.id])
      if (belum) document.getElementById(`soal-mbti-${belum.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    if (dimensiAktif < 3) setDimensiAktif(prev => prev + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSubmitError('')
    const jabatan = `${usia} th · ${jenisKelamin}`
    const { data: pesertaData, error } = await supabase
      .from('peserta')
      .insert([{ name: nama, email, jabatan }])
      .select()
    if (error) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }
    const pesertaId = pesertaData[0].id
    const { tipe, skor } = hitungMBTI(jawaban)
    await supabase.from('hasil_tes').insert([{
      peserta_id: pesertaId, tipe_mbti: tipe,
      skor_e: skor.e, skor_i: skor.i, skor_s: skor.s, skor_n: skor.n,
      skor_t: skor.t, skor_f: skor.f, skor_j: skor.j, skor_p: skor.p,
    }])
    navigate('/hasil', { state: { tipe, nama, pesertaId } })
    setLoading(false)
  }

  /* ── FORM ── */
  if (step === 'form') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>AssesIN</p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>Tes Kepribadian MBTI</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>60 soal · ~15 menit</p>
        </div>

        <div className="dark-card" style={{ padding: '32px' }}>
          <div className="section-rule" style={{ marginBottom: '28px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Data Diri</span><span className="section-rule-line" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={S_LABEL}>Nama Lengkap <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" value={nama} onChange={e => { setNama(e.target.value); setFormErrors(p => ({...p, nama: ''})) }} placeholder="Nama lengkap" autoComplete="name" />
              {formErrors.nama && <p style={S_ERR}>{formErrors.nama}</p>}
            </div>
            <div>
              <label style={S_LABEL}>Email <span style={{ color: '#f87171' }}>*</span></label>
              <input className="field" type="email" value={email} onChange={e => { setEmail(e.target.value); setFormErrors(p => ({...p, email: ''})) }} placeholder="email@contoh.com" autoComplete="email" />
              {formErrors.email && <p style={S_ERR}>{formErrors.email}</p>}
            </div>
            <div className="form-grid-2">
              <div>
                <label style={S_LABEL}>Usia <span style={{ color: '#f87171' }}>*</span></label>
                <input className="field" type="number" min="10" max="100" value={usia} onChange={e => { setUsia(e.target.value); setFormErrors(p => ({...p, usia: ''})) }} placeholder="Tahun" />
                {formErrors.usia && <p style={S_ERR}>{formErrors.usia}</p>}
              </div>
              <div>
                <label style={S_LABEL}>Jenis Kelamin <span style={{ color: '#f87171' }}>*</span></label>
                <select className="field" value={jenisKelamin} onChange={e => { setJenisKelamin(e.target.value); setFormErrors(p => ({...p, jenisKelamin: ''})) }}>
                  <option value="">— Pilih —</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {formErrors.jenisKelamin && <p style={S_ERR}>{formErrors.jenisKelamin}</p>}
              </div>
            </div>
            <PrivacyCheckbox
              id="privacy-mbti"
              checked={setujuPrivasi}
              onChange={v => { setSetujuPrivasi(v); setFormErrors(p => ({...p, privasi: ''})) }}
              error={formErrors.privasi}
            />
            <button
              onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
              style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px', borderRadius: '10px', border: 'none', cursor: 'pointer', width: '100%', marginTop: '8px' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Mulai Tes MBTI →
            </button>
          </div>
        </div>

        <button onClick={() => navigate('/')} style={{ display: 'block', margin: '20px auto 0', color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Kembali ke beranda
        </button>
      </div>
    </div>
  )

  /* ── SOAL ── */
  const progress = (Object.keys(jawaban).length / 60) * 100

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,15,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>Tes MBTI</p>
            <p className="tes-header-name" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Halo {nama} · {Object.keys(jawaban).length}/60 soal dijawab</p>
          </div>
          <div style={{ flex: 1, maxWidth: '180px', height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.5s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '28px var(--px)' }}>

        {/* Dimension tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '28px' }}>
          {dimensiUrutan.map((d, idx) => (
            <div key={d} className={`dim-tab ${idx === dimensiAktif ? 'active' : idx < dimensiAktif ? 'done' : ''}`}>
              {idx < dimensiAktif ? '✓ ' : ''}{dimensiLabel[d]}
            </div>
          ))}
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.06em', marginBottom: '6px' }}>{dimensiNama[dimensiUrutan[dimensiAktif]]}</p>
        <div style={{ height: '2px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden', marginBottom: '24px' }}>
          <div style={{ height: '100%', background: 'var(--accent)', width: `${(sudahDijawab / totalDimensi) * 100}%`, transition: 'width 0.4s' }} />
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
          Pilih satu pernyataan yang lebih sesuai dengan dirimu
        </p>

        {soalDimensiAktif.map((s, idx) => (
          <div id={`soal-mbti-${s.id}`} key={s.id} style={{ marginBottom: '16px', paddingTop: idx > 0 ? '16px' : 0, borderTop: idx > 0 ? '1px solid var(--border)' : 'none' }}>
            <p style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.7 }}>
              {String(idx + 1).padStart(2, '0')}
            </p>
            <div className="answer-grid">
              {(['kiri', 'kanan']).map(sisi => (
                <button key={sisi} onClick={() => handleJawab(s.id, sisi)} className={`answer-btn ${jawaban[s.id] === sisi ? 'selected' : ''}`}>
                  {jawaban[s.id] === sisi && <span style={{ display: 'block', color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '8px' }}>✓ DIPILIH</span>}
                  {s[sisi]}
                </button>
              ))}
            </div>
          </div>
        ))}

        {submitError && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>
            {submitError}
          </div>
        )}

        {sudahDijawab < totalDimensi && (
          <p style={{ textAlign: 'center', color: '#fbbf24', fontSize: '13px', marginBottom: '12px' }}>
            Masih {totalDimensi - sudahDijawab} pertanyaan belum dijawab
          </p>
        )}

        <button
          onClick={handleNext}
          disabled={loading}
          style={{ width: '100%', background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, marginTop: '8px' }}
        >
          {loading ? 'Menyimpan...' : dimensiAktif < 3 ? `Lanjut ke Bagian ${dimensiAktif + 2} →` : 'Selesai & Lihat Hasil →'}
        </button>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px', marginTop: '16px' }}>
          Bagian {dimensiAktif + 1} dari 4 · {sudahDijawab}/{totalDimensi} dijawab
        </p>
      </div>
    </div>
  )
}

export default Tes
