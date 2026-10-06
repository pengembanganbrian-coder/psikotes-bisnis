import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import PrivacyCheckbox from '../components/PrivacyCheckbox'
import { hitungGrafikDISC } from '../disc/skoring'
import { KUNCI_DISC } from '../disc/kunci'

const soal = [
  { id: 1, pilihan: [
    { teks: "Mudah bergaul, menyenangkan" },
    { teks: "Mudah percaya kepada orang lain" },
    { teks: "Suka berpetualangan, pengambil resiko" },
    { teks: "Penuh toleransi, menghormati orang lain" },
  ]},
  { id: 2, pilihan: [
    { teks: "Berbicara lembut, pendiam/penyendiri" },
    { teks: "Optimis, berpikir positif, memiliki visi/tujuan" },
    { teks: "Pusat perhatian, mudah bersosialisasi" },
    { teks: "Pendamai, pembawa keharmonisan" },
  ]},
  { id: 3, pilihan: [
    { teks: "Memberikan dorongan kepada orang lain" },
    { teks: "Berusaha untuk selalu sempurna" },
    { teks: "Menjadi bagian dari sebuah kelompok" },
    { teks: "Ingin menetapkan tujuan" },
  ]},
  { id: 4, pilihan: [
    { teks: "Mudah menjadi frustasi" },
    { teks: "Memendam perasaan, tertutup" },
    { teks: "Menyampaikan pendapatnya, terbuka" },
    { teks: "Berani menghadapi pihak oposisi" },
  ]},
  { id: 5, pilihan: [
    { teks: "Penuh semangat, banyak bicara" },
    { teks: "Bertindak cepat, tegas" },
    { teks: "Mencoba untuk menjaga kedamaian" },
    { teks: "Mencoba untuk mengikuti aturan" },
  ]},
  { id: 6, pilihan: [
    { teks: "Mengatur waktu dengan baik" },
    { teks: "Seringkali terburu-buru, merasa tertekan" },
    { teks: "Berhubungan dengan orang lain adalah penting" },
    { teks: "Senang menyelesaikan hal yang telah dimulai" },
  ]},
  { id: 7, pilihan: [
    { teks: "Menolak perubahan yang mendadak" },
    { teks: "Cenderung terlalu banyak berjanji" },
    { teks: "Menarik diri ketika dibawah tekanan" },
    { teks: "Tidak takut untuk konfrontasi langsung" },
  ]},
  { id: 8, pilihan: [
    { teks: "Pendorong, pemberi semangat yang baik" },
    { teks: "Pendengar yang baik" },
    { teks: "Penganalisis yang baik" },
    { teks: "Pendelegasi yang baik" },
  ]},
  { id: 9, pilihan: [
    { teks: "Hasil adalah segalanya" },
    { teks: "Lakukan dengan benar, ketepatan adalah penting" },
    { teks: "Buatlah sesuatu menjadi menyenangkan" },
    { teks: "Mari lakukan bersama-sama" },
  ]},
  { id: 10, pilihan: [
    { teks: "Tidak tergantung orang lain" },
    { teks: "Akan membeli mengikuti dorongan hati" },
    { teks: "Akan menunggu dengan sabar" },
    { teks: "Akan mengeluarkan uang untuk hal yang diinginkan" },
  ]},
  { id: 11, pilihan: [
    { teks: "Ramah, mudah berteman" },
    { teks: "Unik, mudah bosan terhadap rutinitas" },
    { teks: "Aktif mengubah sesuatu" },
    { teks: "Ingin segala sesuatu tepat" },
  ]},
  { id: 12, pilihan: [
    { teks: "Tidak melawan, mengalah" },
    { teks: "Menyukai hal rinci/detail" },
    { teks: "Berubah di saat-saat terakhir" },
    { teks: "Penuntut, kasar" },
  ]},
  { id: 13, pilihan: [
    { teks: "Ingin maju" },
    { teks: "Puas dengan apa yang ada, puas hati" },
    { teks: "Terbuka mengungkapkan perasaan" },
    { teks: "Rendah hati, sederhana" },
  ]},
  { id: 14, pilihan: [
    { teks: "Tenang, suka menyendiri/pendiam" },
    { teks: "Gembira, periang" },
    { teks: "Menyenangkan, ramah" },
    { teks: "Tegas, berani" },
  ]},
  { id: 15, pilihan: [
    { teks: "Menghabiskan waktu dengan orang lain" },
    { teks: "Merencanakan masa depan, penuh persiapan" },
    { teks: "Mencari tantangan baru" },
    { teks: "Menerima penghargaan untuk tujuan yang tercapai" },
  ]},
  { id: 16, pilihan: [
    { teks: "Peraturan perlu diuji" },
    { teks: "Peraturan membuat adil" },
    { teks: "Peraturan membuat bosan" },
    { teks: "Peraturan membuat aman" },
  ]},
  { id: 17, pilihan: [
    { teks: "Pendidikan, budaya" },
    { teks: "Prestasi, penghargaan" },
    { teks: "Keselamatan, keamanan" },
    { teks: "Bergaul, berkumpul dengan kelompok" },
  ]},
  { id: 18, pilihan: [
    { teks: "Memimpin, bicara langsung" },
    { teks: "Terbuka, antusias, bersemangat" },
    { teks: "Mudah diduga, konsisten" },
    { teks: "Berhati-hati" },
  ]},
  { id: 19, pilihan: [
    { teks: "Tidak mudah dikalahkan/ditundukkan" },
    { teks: "Mengikuti keinginan/perintah pemimpin" },
    { teks: "Bersemangat, periang" },
    { teks: "Ingin teratur, rapi" },
  ]},
  { id: 20, pilihan: [
    { teks: "Saya akan memimpin orang lain" },
    { teks: "Saya akan melaksanakannya" },
    { teks: "Saya akan meyakinkan orang lain" },
    { teks: "Saya akan mendapatkan fakta" },
  ]},
  { id: 21, pilihan: [
    { teks: "Mendahulukan kepentingan orang lain" },
    { teks: "Suka bersaing, suka tantangan" },
    { teks: "Optimis, berpikir positif" },
    { teks: "Berpikir logis, sistematis" },
  ]},
  { id: 22, pilihan: [
    { teks: "Menyenangkan orang, mudah setuju" },
    { teks: "Tertawa dengan keras, hidup" },
    { teks: "Berani, tegas" },
    { teks: "Pendiam/suka menyendiri" },
  ]},
  { id: 23, pilihan: [
    { teks: "Menginginkan otoritas yang lebih" },
    { teks: "Menginginkan kesempatan baru" },
    { teks: "Menghindari konflik" },
    { teks: "Menginginkan arahan yang jelas" },
  ]},
  { id: 24, pilihan: [
    { teks: "Dapat dipercaya/diandalkan" },
    { teks: "Kreatif, unik" },
    { teks: "Berorientasi pada hasil" },
    { teks: "Memegang standar yang tinggi, teliti" },
  ]},
]

function hitungDISC(jawaban) {
  // Kata yang dipilih dipetakan lewat kunci M/L; kata berkunci '*' tidak diskor.
  const most  = { D: 0, I: 0, S: 0, C: 0, '*': 0 }
  const least = { D: 0, I: 0, S: 0, C: 0, '*': 0 }
  soal.forEach((sq, i) => {
    const j = jawaban[sq.id]
    if (!j) return
    if (j.most !== undefined) most[KUNCI_DISC[i].most[j.most]]++
    if (j.least !== undefined) least[KUNCI_DISC[i].least[j.least]]++
  })
  const { D: mostD, I: mostI, S: mostS, C: mostC } = most
  const { D: leastD, I: leastI, S: leastS, C: leastC } = least

  const changeD = mostD - leastD
  const changeI = mostI - leastI
  const changeS = mostS - leastS
  const changeC = mostC - leastC

  // Profil dibaca dari posisi grafik (tabel konversi eDISC), bukan skor mentah.
  const { profil } = hitungGrafikDISC(
    { D: mostD, I: mostI, S: mostS, C: mostC },
    { D: leastD, I: leastI, S: leastS, C: leastC },
  )

  return { profil, mostD, mostI, mostS, mostC, leastD, leastI, leastS, leastC, changeD, changeI, changeS, changeC }
}

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#dc2626', fontSize: '12px', marginTop: '6px' }

function TesDisc() {
  const [step, setStep]             = useState('form')
  const [nama, setNama]             = useState('')
  const [email, setEmail]           = useState('')
  const [usia, setUsia]             = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [jawaban, setJawaban]       = useState({})
  const [loading, setLoading]       = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [setujuPrivasi, setSetujuPrivasi] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate()

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

  const handlePilih = (soalId, tipe, idx) => {
    setJawaban(prev => {
      const current = prev[soalId] || {}
      if (tipe === 'most' && current.least === idx) return prev
      if (tipe === 'least' && current.most === idx) return prev
      return { ...prev, [soalId]: { ...current, [tipe]: idx } }
    })
  }

  const sudahLengkap = soal.every(s => jawaban[s.id]?.most !== undefined && jawaban[s.id]?.least !== undefined)
  const jumlahDijawab = Object.keys(jawaban).filter(id => jawaban[id]?.most !== undefined && jawaban[id]?.least !== undefined).length

  const handleSubmit = async () => {
    if (!sudahLengkap) {
      const belum = soal.find(s => jawaban[s.id]?.most === undefined || jawaban[s.id]?.least === undefined)
      if (belum) {
        const el = document.getElementById(`soal-disc-${belum.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    setLoading(true)
    setSubmitError('')

    const jabatan = `${usia} th · ${jenisKelamin}`
    // id dibuat di klien: pengunjung anonim hanya punya izin INSERT (RLS),
    // sehingga insert().select() selalu ditolak.
    const pesertaId = crypto.randomUUID()
    const { error } = await supabase
      .from('peserta_disc')
      .insert([{ id: pesertaId, nama, nip: email, jabatan }])

    if (error) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }

    const hasil = hitungDISC(jawaban)

    await supabase.from('hasil_disc').insert([{
      peserta_id: pesertaId,
      profil: hasil.profil,
      skor_d_most: hasil.mostD, skor_i_most: hasil.mostI,
      skor_s_most: hasil.mostS, skor_c_most: hasil.mostC,
      skor_d_least: hasil.leastD, skor_i_least: hasil.leastI,
      skor_s_least: hasil.leastS, skor_c_least: hasil.leastC,
      skor_d_change: hasil.changeD, skor_i_change: hasil.changeI,
      skor_s_change: hasil.changeS, skor_c_change: hasil.changeC,
    }])

    navigate('/hasil-disc', { state: { hasil, nama, email, pesertaId } })
    setLoading(false)
  }

  if (step === 'form') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.07) 0%, transparent 65%)' }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontFamily: 'inherit', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>AssesIN</p>
          <p style={{ fontFamily: 'inherit', fontWeight: 700, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>Tes Kepribadian DISC</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>24 soal · ~7 menit</p>
        </div>

        <div className="dark-card" style={{ padding: '32px' }}>
          <div className="section-rule" style={{ marginBottom: '28px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Data Diri</span><span className="section-rule-line" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={S_LABEL}>Nama Lengkap <span style={{ color: '#dc2626' }}>*</span></label>
              <input className="field" value={nama} onChange={e => { setNama(e.target.value); setFormErrors(p => ({...p, nama: ''})) }} placeholder="Nama lengkap" autoComplete="name" />
              {formErrors.nama && <p style={S_ERR}>{formErrors.nama}</p>}
            </div>
            <div>
              <label style={S_LABEL}>Email <span style={{ color: '#dc2626' }}>*</span></label>
              <input className="field" type="email" value={email} onChange={e => { setEmail(e.target.value); setFormErrors(p => ({...p, email: ''})) }} placeholder="email@contoh.com" autoComplete="email" />
              {formErrors.email && <p style={S_ERR}>{formErrors.email}</p>}
            </div>
            <div className="form-grid-2">
              <div>
                <label style={S_LABEL}>Usia <span style={{ color: '#dc2626' }}>*</span></label>
                <input className="field" type="number" min="10" max="100" value={usia} onChange={e => { setUsia(e.target.value); setFormErrors(p => ({...p, usia: ''})) }} placeholder="Tahun" />
                {formErrors.usia && <p style={S_ERR}>{formErrors.usia}</p>}
              </div>
              <div>
                <label style={S_LABEL}>Jenis Kelamin <span style={{ color: '#dc2626' }}>*</span></label>
                <select className="field" value={jenisKelamin} onChange={e => { setJenisKelamin(e.target.value); setFormErrors(p => ({...p, jenisKelamin: ''})) }}>
                  <option value="">— Pilih —</option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                {formErrors.jenisKelamin && <p style={S_ERR}>{formErrors.jenisKelamin}</p>}
              </div>
            </div>
            <PrivacyCheckbox
              id="privacy-disc"
              checked={setujuPrivasi}
              onChange={v => { setSetujuPrivasi(v); setFormErrors(p => ({...p, privasi: ''})) }}
              error={formErrors.privasi}
            />
            <button
              onClick={() => { if (validateForm()) { setStep('tes'); window.scrollTo(0, 0) } }}
              className="btn-cta block"
            >
              Mulai Tes <span className="btn-arrow" aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <button onClick={() => navigate('/')} style={{ display: 'block', margin: '20px auto 0', color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Kembali ke beranda
        </button>
      </div>
    </div>
  )

  const progress = (jumlahDijawab / soal.length) * 100

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'var(--overlay)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '1120px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'inherit', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>Tes DISC</p>
            <p className="tes-header-name" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{nama} · {jumlahDijawab}/{soal.length} kelompok</p>
          </div>
          <div style={{ flex: 1, maxWidth: '180px', height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.5s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '28px var(--px)' }}>

        {/* Instruksi */}
        <div className="dark-card" style={{ padding: '18px 20px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.65' }}>
            Dari setiap kelompok, pilih satu yang paling{' '}
            <span style={{ color: 'var(--accent)', fontFamily: 'inherit', fontWeight: 700 }}>M — Mirip</span>{' '}
            dan satu yang paling{' '}
            <span style={{ color: '#dc2626', fontFamily: 'inherit', fontWeight: 700 }}>L — Tidak Mirip</span>{' '}
            dengan diri Anda.
          </p>
        </div>

        {submitError && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#dc2626', fontSize: '14px', marginBottom: '16px' }}>
            {submitError}
          </div>
        )}

        {soal.map((s, idx) => {
          const j = jawaban[s.id] || {}
          const selesai = j.most !== undefined && j.least !== undefined
          return (
            <div id={`soal-disc-${s.id}`} key={s.id} className="dark-card" style={{ padding: '20px', marginBottom: '12px', borderColor: selesai ? 'var(--accent-border)' : 'var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontFamily: 'inherit', fontWeight: 700, background: selesai ? 'var(--accent)' : 'var(--surface-2)', color: selesai ? 'var(--on-accent)' : 'var(--text-muted)', border: '1px solid ' + (selesai ? 'var(--accent)' : 'var(--border)') }}>
                  {selesai ? '✓' : idx + 1}
                </span>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'inherit', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Kelompok {idx + 1}</p>
                {selesai && <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '11px', fontFamily: 'inherit', fontWeight: 700 }}>✓ Selesai</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {s.pilihan.map((p, i) => {
                  const isMost = j.most === i
                  const isLeast = j.least === i
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '10px', border: '1px solid ' + (isMost ? 'var(--accent-border)' : isLeast ? 'rgba(248,113,113,0.4)' : 'var(--border)'), background: isMost ? 'rgba(79,70,229,0.08)' : isLeast ? 'rgba(248,113,113,0.06)' : 'var(--surface-2)', transition: 'all 0.18s' }}>
                      <span style={{ flex: 1, color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.55' }}>{p.teks}</span>
                      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <button onClick={() => handlePilih(s.id, 'most', i)} className={`disc-pill ${isMost ? 'most' : ''}`}>M</button>
                        <button onClick={() => handlePilih(s.id, 'least', i)} className={`disc-pill ${isLeast ? 'least' : ''}`}>L</button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        <div style={{ marginTop: '24px', position: 'sticky', bottom: '16px' }}>
          {!sudahLengkap && (
            <p style={{ textAlign: 'center', color: '#d97706', fontSize: '13px', marginBottom: '12px' }}>
              Masih {soal.length - jumlahDijawab} kelompok belum dijawab
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', background: sudahLengkap ? 'var(--accent)' : 'var(--surface-2)', color: sudahLengkap ? 'var(--on-accent)' : 'var(--text-muted)', fontFamily: 'inherit', fontWeight: 700, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: '1px solid ' + (sudahLengkap ? 'var(--accent)' : 'var(--border)'), cursor: sudahLengkap && !loading ? 'pointer' : 'not-allowed', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Menyimpan...' : sudahLengkap ? 'Selesai & Lihat Hasil →' : `Jawab ${soal.length - jumlahDijawab} kelompok lagi`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TesDisc

