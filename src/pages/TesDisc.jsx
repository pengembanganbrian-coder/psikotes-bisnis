import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import PrivacyCheckbox from '../components/PrivacyCheckbox'

const soal = [
  { id: 1, pilihan: [
    { teks: "Mudah bergaul, menyenangkan", dimensi: "I" },
    { teks: "Mudah percaya kepada orang lain", dimensi: "S" },
    { teks: "Suka berpetualangan, pengambil resiko", dimensi: "D" },
    { teks: "Penuh toleransi, menghormati orang lain", dimensi: "S" },
  ]},
  { id: 2, pilihan: [
    { teks: "Berbicara lembut, pendiam/penyendiri", dimensi: "C" },
    { teks: "Optimis, berpikir positif, memiliki visi/tujuan", dimensi: "I" },
    { teks: "Pusat perhatian, mudah bersosialisasi", dimensi: "I" },
    { teks: "Pendamai, pembawa keharmonisan", dimensi: "S" },
  ]},
  { id: 3, pilihan: [
    { teks: "Memberikan dorongan kepada orang lain", dimensi: "I" },
    { teks: "Berusaha untuk selalu sempurna", dimensi: "C" },
    { teks: "Menjadi bagian dari sebuah kelompok", dimensi: "S" },
    { teks: "Ingin menetapkan tujuan", dimensi: "D" },
  ]},
  { id: 4, pilihan: [
    { teks: "Mudah menjadi frustasi", dimensi: "C" },
    { teks: "Memendam perasaan, tertutup", dimensi: "S" },
    { teks: "Menyampaikan pendapatnya, terbuka", dimensi: "I" },
    { teks: "Berani menghadapi pihak oposisi", dimensi: "D" },
  ]},
  { id: 5, pilihan: [
    { teks: "Penuh semangat, banyak bicara", dimensi: "I" },
    { teks: "Bertindak cepat, tegas", dimensi: "D" },
    { teks: "Mencoba untuk menjaga kedamaian", dimensi: "S" },
    { teks: "Mencoba untuk mengikuti aturan", dimensi: "C" },
  ]},
  { id: 6, pilihan: [
    { teks: "Mengatur waktu dengan baik", dimensi: "C" },
    { teks: "Seringkali terburu-buru, merasa tertekan", dimensi: "D" },
    { teks: "Berhubungan dengan orang lain adalah penting", dimensi: "S" },
    { teks: "Senang menyelesaikan hal yang telah dimulai", dimensi: "C" },
  ]},
  { id: 7, pilihan: [
    { teks: "Menolak perubahan yang mendadak", dimensi: "S" },
    { teks: "Cenderung terlalu banyak berjanji", dimensi: "I" },
    { teks: "Menarik diri ketika dibawah tekanan", dimensi: "C" },
    { teks: "Tidak takut untuk konfrontasi langsung", dimensi: "D" },
  ]},
  { id: 8, pilihan: [
    { teks: "Pendorong, pemberi semangat yang baik", dimensi: "I" },
    { teks: "Pendengar yang baik", dimensi: "S" },
    { teks: "Penganalisis yang baik", dimensi: "C" },
    { teks: "Pendelegasi yang baik", dimensi: "D" },
  ]},
  { id: 9, pilihan: [
    { teks: "Hasil adalah segalanya", dimensi: "D" },
    { teks: "Lakukan dengan benar, ketepatan adalah penting", dimensi: "C" },
    { teks: "Buatlah sesuatu menjadi menyenangkan", dimensi: "I" },
    { teks: "Mari lakukan bersama-sama", dimensi: "S" },
  ]},
  { id: 10, pilihan: [
    { teks: "Tidak tergantung orang lain", dimensi: "D" },
    { teks: "Akan membeli mengikuti dorongan hati", dimensi: "I" },
    { teks: "Akan menunggu dengan sabar", dimensi: "S" },
    { teks: "Akan mengeluarkan uang untuk hal yang diinginkan", dimensi: "C" },
  ]},
  { id: 11, pilihan: [
    { teks: "Ramah, mudah berteman", dimensi: "I" },
    { teks: "Unik, mudah bosan terhadap rutinitas", dimensi: "D" },
    { teks: "Aktif mengubah sesuatu", dimensi: "D" },
    { teks: "Ingin segala sesuatu tepat", dimensi: "C" },
  ]},
  { id: 12, pilihan: [
    { teks: "Tidak melawan, mengalah", dimensi: "S" },
    { teks: "Menyukai hal rinci/detail", dimensi: "C" },
    { teks: "Berubah di saat-saat terakhir", dimensi: "I" },
    { teks: "Penuntut, kasar", dimensi: "D" },
  ]},
  { id: 13, pilihan: [
    { teks: "Ingin maju", dimensi: "D" },
    { teks: "Puas dengan apa yang ada, puas hati", dimensi: "S" },
    { teks: "Terbuka mengungkapkan perasaan", dimensi: "I" },
    { teks: "Rendah hati, sederhana", dimensi: "C" },
  ]},
  { id: 14, pilihan: [
    { teks: "Tenang, suka menyendiri/pendiam", dimensi: "C" },
    { teks: "Gembira, periang", dimensi: "I" },
    { teks: "Menyenangkan, ramah", dimensi: "S" },
    { teks: "Tegas, berani", dimensi: "D" },
  ]},
  { id: 15, pilihan: [
    { teks: "Menghabiskan waktu dengan orang lain", dimensi: "I" },
    { teks: "Merencanakan masa depan, penuh persiapan", dimensi: "C" },
    { teks: "Mencari tantangan baru", dimensi: "D" },
    { teks: "Menerima penghargaan untuk tujuan yang tercapai", dimensi: "S" },
  ]},
  { id: 16, pilihan: [
    { teks: "Peraturan perlu diuji", dimensi: "D" },
    { teks: "Peraturan membuat adil", dimensi: "C" },
    { teks: "Peraturan membuat bosan", dimensi: "I" },
    { teks: "Peraturan membuat aman", dimensi: "S" },
  ]},
  { id: 17, pilihan: [
    { teks: "Pendidikan, budaya", dimensi: "C" },
    { teks: "Prestasi, penghargaan", dimensi: "D" },
    { teks: "Keselamatan, keamanan", dimensi: "S" },
    { teks: "Bergaul, berkumpul dengan kelompok", dimensi: "I" },
  ]},
  { id: 18, pilihan: [
    { teks: "Memimpin, bicara langsung", dimensi: "D" },
    { teks: "Terbuka, antusias, bersemangat", dimensi: "I" },
    { teks: "Mudah diduga, konsisten", dimensi: "S" },
    { teks: "Berhati-hati", dimensi: "C" },
  ]},
  { id: 19, pilihan: [
    { teks: "Tidak mudah dikalahkan/ditundukkan", dimensi: "D" },
    { teks: "Mengikuti keinginan/perintah pemimpin", dimensi: "S" },
    { teks: "Bersemangat, periang", dimensi: "I" },
    { teks: "Ingin teratur, rapi", dimensi: "C" },
  ]},
  { id: 20, pilihan: [
    { teks: "Saya akan memimpin orang lain", dimensi: "D" },
    { teks: "Saya akan melaksanakannya", dimensi: "S" },
    { teks: "Saya akan meyakinkan orang lain", dimensi: "I" },
    { teks: "Saya akan mendapatkan fakta", dimensi: "C" },
  ]},
  { id: 21, pilihan: [
    { teks: "Mendahulukan kepentingan orang lain", dimensi: "S" },
    { teks: "Suka bersaing, suka tantangan", dimensi: "D" },
    { teks: "Optimis, berpikir positif", dimensi: "I" },
    { teks: "Berpikir logis, sistematis", dimensi: "C" },
  ]},
  { id: 22, pilihan: [
    { teks: "Menyenangkan orang, mudah setuju", dimensi: "S" },
    { teks: "Tertawa dengan keras, hidup", dimensi: "I" },
    { teks: "Berani, tegas", dimensi: "D" },
    { teks: "Pendiam/suka menyendiri", dimensi: "C" },
  ]},
  { id: 23, pilihan: [
    { teks: "Menginginkan otoritas yang lebih", dimensi: "D" },
    { teks: "Menginginkan kesempatan baru", dimensi: "I" },
    { teks: "Menghindari konflik", dimensi: "S" },
    { teks: "Menginginkan arahan yang jelas", dimensi: "C" },
  ]},
  { id: 24, pilihan: [
    { teks: "Dapat dipercaya/diandalkan", dimensi: "S" },
    { teks: "Kreatif, unik", dimensi: "I" },
    { teks: "Berorientasi pada hasil", dimensi: "D" },
    { teks: "Memegang standar yang tinggi, teliti", dimensi: "C" },
  ]},
]

function hitungDISC(jawaban) {
  let mostD=0, mostI=0, mostS=0, mostC=0
  let leastD=0, leastI=0, leastS=0, leastC=0

  soal.forEach(sq => {
    const j = jawaban[sq.id]
    if (!j) return
    const pilihanM = sq.pilihan[j.most]
    const pilihanL = sq.pilihan[j.least]
    if (pilihanM) {
      if (pilihanM.dimensi === 'D') mostD++
      if (pilihanM.dimensi === 'I') mostI++
      if (pilihanM.dimensi === 'S') mostS++
      if (pilihanM.dimensi === 'C') mostC++
    }
    if (pilihanL) {
      if (pilihanL.dimensi === 'D') leastD++
      if (pilihanL.dimensi === 'I') leastI++
      if (pilihanL.dimensi === 'S') leastS++
      if (pilihanL.dimensi === 'C') leastC++
    }
  })

  const changeD = mostD - leastD
  const changeI = mostI - leastI
  const changeS = mostS - leastS
  const changeC = mostC - leastC

  const scores = { D: changeD, I: changeI, S: changeS, C: changeC }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const profil = sorted[0][0] + (sorted[1][1] > 0 ? sorted[1][0] : '')

  return { profil, mostD, mostI, mostS, mostC, leastD, leastI, leastS, leastC, changeD, changeI, changeS, changeC }
}

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

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
    const { data: pesertaData, error } = await supabase
      .from('peserta_disc')
      .insert([{ nama, nip: email, jabatan }])
      .select()

    if (error) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }

    const pesertaId = pesertaData[0].id
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

    navigate('/hasil-disc', { state: { hasil, nama, pesertaId } })
    setLoading(false)
  }

  if (step === 'form') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
      </div>

      <div className="anim-up" style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>AssesIN</p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>Tes Kepribadian DISC</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>24 soal · ~7 menit</p>
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
              id="privacy-disc"
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
              Mulai Tes →
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
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,15,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>Tes DISC</p>
            <p className="tes-header-name" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{nama} · {jumlahDijawab}/{soal.length} kelompok</p>
          </div>
          <div style={{ flex: 1, maxWidth: '180px', height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.5s' }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '28px var(--px)' }}>

        {/* Instruksi */}
        <div className="dark-card" style={{ padding: '18px 20px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.65' }}>
            Dari setiap kelompok, pilih satu yang paling{' '}
            <span style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>M — Mirip</span>{' '}
            dan satu yang paling{' '}
            <span style={{ color: '#f87171', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>L — Tidak Mirip</span>{' '}
            dengan diri Anda.
          </p>
        </div>

        {submitError && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>
            {submitError}
          </div>
        )}

        {soal.map((s, idx) => {
          const j = jawaban[s.id] || {}
          const selesai = j.most !== undefined && j.least !== undefined
          return (
            <div id={`soal-disc-${s.id}`} key={s.id} className="dark-card" style={{ padding: '20px', marginBottom: '12px', borderColor: selesai ? 'var(--accent-border)' : 'var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ flexShrink: 0, width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 700, background: selesai ? 'var(--accent)' : 'var(--surface-2)', color: selesai ? '#09090f' : 'var(--text-muted)', border: '1px solid ' + (selesai ? 'var(--accent)' : 'var(--border)') }}>
                  {selesai ? '✓' : idx + 1}
                </span>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Kelompok {idx + 1}</p>
                {selesai && <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontSize: '11px', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>✓ Selesai</span>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {s.pilihan.map((p, i) => {
                  const isMost = j.most === i
                  const isLeast = j.least === i
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '10px', border: '1px solid ' + (isMost ? 'var(--accent-border)' : isLeast ? 'rgba(248,113,113,0.4)' : 'var(--border)'), background: isMost ? 'rgba(212,168,83,0.08)' : isLeast ? 'rgba(248,113,113,0.06)' : 'var(--surface-2)', transition: 'all 0.18s' }}>
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
            <p style={{ textAlign: 'center', color: '#fbbf24', fontSize: '13px', marginBottom: '12px' }}>
              Masih {soal.length - jumlahDijawab} kelompok belum dijawab
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', background: sudahLengkap ? 'var(--accent)' : 'var(--surface-2)', color: sudahLengkap ? '#09090f' : 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: '1px solid ' + (sudahLengkap ? 'var(--accent)' : 'var(--border)'), cursor: sudahLengkap && !loading ? 'pointer' : 'not-allowed', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Menyimpan...' : sudahLengkap ? 'Selesai & Lihat Hasil →' : `Jawab ${soal.length - jumlahDijawab} kelompok lagi`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TesDisc

