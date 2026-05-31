import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

// 30 pasang pernyataan — terjemahan resmi dari The Five Love Languages Test by Dr. Gary Chapman
// ll: W=Words of Affirmation (A), Q=Quality Time (B), G=Receiving Gifts (C), A=Acts of Service (D), P=Physical Touch (E)
const soal = [
  // 1. A(W) vs E(P)
  { id: 1,  a: { teks: 'Saya senang menerima catatan atau pesan berisi penegasan dan dukungan dari seseorang.', ll: 'W' },
            b: { teks: 'Saya senang ketika seseorang memeluk saya.', ll: 'P' } },
  // 2. B(Q) vs D(A)
  { id: 2,  a: { teks: 'Saya senang menghabiskan waktu berdua secara khusus bersama seseorang.', ll: 'Q' },
            b: { teks: 'Saya merasa dicintai ketika seseorang memberikan bantuan nyata kepada saya.', ll: 'A' } },
  // 3. C(G) vs B(Q)
  { id: 3,  a: { teks: 'Saya senang ketika seseorang memberi saya hadiah.', ll: 'G' },
            b: { teks: 'Saya senang berjalan-jalan lama atau menghabiskan waktu bersama seseorang.', ll: 'Q' } },
  // 4. D(A) vs E(P)
  { id: 4,  a: { teks: 'Saya merasa dicintai ketika seseorang melakukan sesuatu untuk membantu saya.', ll: 'A' },
            b: { teks: 'Saya merasa dicintai ketika seseorang memeluk atau menyentuh saya dengan hangat.', ll: 'P' } },
  // 5. E(P) vs C(G)
  { id: 5,  a: { teks: 'Saya merasa dicintai ketika seseorang merangkul saya dengan erat.', ll: 'P' },
            b: { teks: 'Saya merasa dicintai ketika menerima hadiah dari seseorang.', ll: 'G' } },
  // 6. B(Q) vs E(P)
  { id: 6,  a: { teks: 'Saya senang pergi ke berbagai tempat bersama seseorang.', ll: 'Q' },
            b: { teks: 'Saya senang berpegangan tangan atau berjalan berdampingan dengan seseorang.', ll: 'P' } },
  // 7. A(W) vs C(G)
  { id: 7,  a: { teks: 'Saya merasa dicintai ketika seseorang mengakui dan menghargai keberadaan saya.', ll: 'W' },
            b: { teks: 'Simbol kasih sayang yang nyata, seperti hadiah, sangat berarti bagi saya.', ll: 'G' } },
  // 8. E(P) vs A(W)
  { id: 8,  a: { teks: 'Saya senang duduk berdekatan dengan seseorang.', ll: 'P' },
            b: { teks: 'Saya senang ketika seseorang mengatakan hal-hal positif tentang diri saya.', ll: 'W' } },
  // 9. B(Q) vs C(G)
  { id: 9,  a: { teks: 'Saya senang menghabiskan waktu bersama seseorang.', ll: 'Q' },
            b: { teks: 'Saya senang menerima hadiah kecil dari seseorang.', ll: 'G' } },
  // 10. D(A) vs A(W)
  { id: 10, a: { teks: 'Saya tahu seseorang menyayangi saya ketika mereka membantu saya.', ll: 'A' },
            b: { teks: 'Kata-kata penerimaan dan apresiasi dari seseorang sangat penting bagi saya.', ll: 'W' } },
  // 11. B(Q) vs A(W)
  { id: 11, a: { teks: 'Saya senang berada bersama-sama ketika sedang mengerjakan sesuatu.', ll: 'Q' },
            b: { teks: 'Saya senang dengan kata-kata baik yang diucapkan seseorang kepada saya.', ll: 'W' } },
  // 12. E(P) vs D(A)
  { id: 12, a: { teks: 'Saya merasa utuh dan lengkap saat berpelukan dengan seseorang.', ll: 'P' },
            b: { teks: 'Apa yang seseorang lakukan untuk saya lebih bermakna daripada apa yang mereka katakan.', ll: 'A' } },
  // 13. A(W) vs C(G)
  { id: 13, a: { teks: 'Saya sangat menghargai pujian dan berusaha menghindari kritik yang tidak membangun.', ll: 'W' },
            b: { teks: 'Beberapa hadiah sederhana lebih berarti bagi saya daripada satu hadiah mahal.', ll: 'G' } },
  // 14. E(P) vs B(Q)
  { id: 14, a: { teks: 'Saya merasa lebih dekat dengan seseorang ketika mereka menyentuh saya.', ll: 'P' },
            b: { teks: 'Saya merasa dekat ketika kami berbicara atau melakukan sesuatu bersama-sama.', ll: 'Q' } },
  // 15. A(W) vs D(A)
  { id: 15, a: { teks: 'Saya suka ketika seseorang memuji pencapaian saya.', ll: 'W' },
            b: { teks: 'Saya tahu seseorang menyayangi saya ketika mereka rela melakukan sesuatu untuk saya, meski itu bukan hal yang mereka sukai.', ll: 'A' } },
  // 16. E(P) vs B(Q)
  { id: 16, a: { teks: 'Saya suka ketika seseorang menyentuh atau menepuk bahu saya saat berpapasan.', ll: 'P' },
            b: { teks: 'Saya suka ketika seseorang mendengarkan saya dengan penuh empati dan perhatian.', ll: 'Q' } },
  // 17. C(G) vs D(A)
  { id: 17, a: { teks: 'Saya benar-benar menikmati saat menerima hadiah dari seseorang.', ll: 'G' },
            b: { teks: 'Saya merasa dicintai ketika seseorang membantu proyek atau pekerjaan saya.', ll: 'A' } },
  // 18. A(W) vs B(Q)
  { id: 18, a: { teks: 'Saya suka ketika seseorang memuji penampilan atau cara saya.', ll: 'W' },
            b: { teks: 'Saya merasa dicintai ketika seseorang meluangkan waktu untuk memahami perasaan saya.', ll: 'Q' } },
  // 19. E(P) vs D(A)
  { id: 19, a: { teks: 'Saya merasa aman dan nyaman ketika seseorang menyentuh saya dengan tulus.', ll: 'P' },
            b: { teks: 'Tindakan pelayanan dari seseorang membuat saya merasa benar-benar dicintai.', ll: 'A' } },
  // 20. D(A) vs C(G)
  { id: 20, a: { teks: 'Saya menghargai banyak hal yang seseorang lakukan untuk saya.', ll: 'A' },
            b: { teks: 'Saya senang menerima hadiah buatan tangan atau yang dipilih dengan penuh perhatian.', ll: 'G' } },
  // 21. B(Q) vs D(A)
  { id: 21, a: { teks: 'Saya benar-benar menikmati perasaan saat seseorang memberikan perhatian penuhnya kepada saya.', ll: 'Q' },
            b: { teks: 'Saya benar-benar menikmati perasaan saat seseorang melakukan suatu tindakan pelayanan untuk saya.', ll: 'A' } },
  // 22. C(G) vs A(W)
  { id: 22, a: { teks: 'Saya merasa dicintai ketika seseorang merayakan hari ulang tahun saya dengan hadiah.', ll: 'G' },
            b: { teks: 'Saya merasa dicintai ketika seseorang merayakan hari ulang tahun saya dengan kata-kata bermakna, baik lisan maupun tulisan.', ll: 'W' } },
  // 23. D(A) vs C(G)
  { id: 23, a: { teks: 'Saya merasa dicintai ketika seseorang membantu pekerjaan atau urusan sehari-hari saya.', ll: 'A' },
            b: { teks: 'Saya tahu seseorang memikirkan saya ketika mereka memberi saya hadiah.', ll: 'G' } },
  // 24. C(G) vs B(Q)
  { id: 24, a: { teks: 'Saya menghargai ketika seseorang mengingat hari-hari spesial saya dengan hadiah.', ll: 'G' },
            b: { teks: 'Saya menghargai ketika seseorang mendengarkan saya dengan sabar tanpa memotong pembicaraan.', ll: 'Q' } },
  // 25. B(Q) vs D(A)
  { id: 25, a: { teks: 'Saya menikmati perjalanan atau kegiatan panjang bersama seseorang.', ll: 'Q' },
            b: { teks: 'Saya suka mengetahui bahwa seseorang cukup peduli untuk membantu tugas harian saya.', ll: 'A' } },
  // 26. E(P) vs C(G)
  { id: 26, a: { teks: 'Sentuhan hangat yang tak terduga dari seseorang membuat saya merasa dicintai.', ll: 'P' },
            b: { teks: 'Mendapat hadiah tanpa alasan tertentu membuat saya merasa benar-benar diperhatikan.', ll: 'G' } },
  // 27. A(W) vs B(Q)
  { id: 27, a: { teks: 'Saya suka ketika seseorang mengatakan bahwa mereka menghargai saya.', ll: 'W' },
            b: { teks: 'Saya suka ketika seseorang menatap saya dengan penuh perhatian saat kami berbicara.', ll: 'Q' } },
  // 28. C(G) vs E(P)
  { id: 28, a: { teks: 'Hadiah dari seseorang selalu terasa istimewa dan bermakna bagi saya.', ll: 'G' },
            b: { teks: 'Pelukan atau sentuhan hangat dari seseorang membuat saya merasa dicintai.', ll: 'P' } },
  // 29. A(W) vs D(A)
  { id: 29, a: { teks: 'Saya merasa dicintai ketika seseorang memberitahu saya betapa mereka menghargai saya.', ll: 'W' },
            b: { teks: 'Saya merasa dicintai ketika seseorang dengan antusias mengerjakan permintaan saya.', ll: 'A' } },
  // 30. E(P) vs A(W)
  { id: 30, a: { teks: 'Saya membutuhkan pelukan atau sentuhan hangat dari seseorang setiap harinya.', ll: 'P' },
            b: { teks: 'Saya membutuhkan kata-kata penegasan dan apresiasi dari seseorang setiap harinya.', ll: 'W' } },
]

function hitungLL(jawaban) {
  const skor = { W: 0, Q: 0, G: 0, A: 0, P: 0 }
  soal.forEach(s => {
    const pilihan = jawaban[s.id]
    if (pilihan === 'a') skor[s.a.ll]++
    if (pilihan === 'b') skor[s.b.ll]++
  })
  const sorted = Object.entries(skor).sort((x, y) => y[1] - x[1])
  return { skor, utama: sorted[0][0], kedua: sorted[1][0] }
}

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

export default function TesLoveLanguage() {
  const navigate = useNavigate()
  const [step, setStep]             = useState('form')
  const [nama, setNama]             = useState('')
  const [email, setEmail]           = useState('')
  const [usia, setUsia]             = useState('')
  const [jenisKelamin, setJenisKelamin] = useState('')
  const [jawaban, setJawaban]       = useState({})
  const [loading, setLoading]       = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [submitError, setSubmitError] = useState('')

  const answered = Object.keys(jawaban).length
  const progress  = (answered / 30) * 100

  const validateForm = () => {
    const errs = {}
    if (!nama.trim())  errs.nama  = 'Nama lengkap wajib diisi.'
    if (!email.trim()) errs.email = 'Email wajib diisi.'
    if (!usia)         errs.usia  = 'Usia wajib diisi.'
    if (!jenisKelamin) errs.jenisKelamin = 'Jenis kelamin wajib dipilih.'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (answered < 30) {
      const belum = soal.find(s => !jawaban[s.id])
      if (belum) document.getElementById(`soal-ll-${belum.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setLoading(true)
    setSubmitError('')

    const jabatan = `${usia} th · ${jenisKelamin}`
    const { skor, utama, kedua } = hitungLL(jawaban)

    const { data: peserta, error: e1 } = await supabase
      .from('peserta_love_language')
      .insert([{ nama, nip: email, jabatan }])
      .select()
    if (e1) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }

    await supabase.from('hasil_love_language').insert([{
      peserta_id: peserta[0].id,
      skor_w: skor.W, skor_q: skor.Q, skor_g: skor.G,
      skor_a: skor.A, skor_p: skor.P,
      bahasa_utama: utama, bahasa_kedua: kedua,
    }])

    navigate('/hasil-love-language', { state: { skor, utama, kedua, nama, email, jabatan, pesertaId: peserta[0].id } })
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
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>Tes Love Language</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>30 pasangan · ~8 menit</p>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
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

  /* ── TES ── */
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,15,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>Tes Love Language</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{nama} · {answered}/30 terjawab</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '120px', height: '3px', background: 'var(--border)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'var(--accent)', width: `${progress}%`, transition: 'width 0.5s' }} />
            </div>
            <span style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px' }}>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1024px', margin: '0 auto', padding: '28px var(--px)' }}>
        <div className="dark-card" style={{ padding: '16px 20px', marginBottom: '24px' }}>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.65' }}>
            Dari setiap pasang pernyataan, pilih <strong style={{ color: 'var(--text)' }}>satu</strong> yang paling mencerminkan diri Anda. Jawab dengan jujur dan spontan.
          </p>
        </div>

        {submitError && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>
            {submitError}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {soal.map((s, idx) => {
            const val  = jawaban[s.id]
            const done = !!val
            return (
              <div id={`soal-ll-${s.id}`} key={s.id} className="dark-card" style={{ padding: '20px', borderColor: done ? 'var(--accent-border)' : 'var(--border)' }}>
                <p style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '14px', opacity: 0.7 }}>
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[{ key: 'a', data: s.a }, { key: 'b', data: s.b }].map(({ key, data }) => {
                    const dipilih = val === key
                    return (
                      <button key={key} onClick={() => setJawaban(j => ({...j, [s.id]: key}))} className={`answer-btn ${dipilih ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <span style={{ flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%', border: '2px solid ' + (dipilih ? 'var(--accent)' : 'var(--border)'), background: dipilih ? 'var(--accent)' : 'transparent', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {dipilih && <span style={{ width: '6px', height: '6px', background: '#09090f', borderRadius: '50%' }} />}
                        </span>
                        <span style={{ fontSize: '14px', lineHeight: '1.65', color: dipilih ? 'var(--text)' : 'var(--text-sub)', textAlign: 'left' }}>{data.teks}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: '28px' }}>
          {answered < 30 && <p style={{ textAlign: 'center', color: '#fbbf24', fontSize: '13px', marginBottom: '12px' }}>Masih {30 - answered} pertanyaan belum dijawab</p>}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', background: answered === 30 ? 'var(--accent)' : 'var(--surface-2)', color: answered === 30 ? '#09090f' : 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: '1px solid ' + (answered === 30 ? 'var(--accent)' : 'var(--border)'), cursor: answered === 30 && !loading ? 'pointer' : 'not-allowed', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Menyimpan...' : answered === 30 ? 'Lihat Hasil →' : `${answered} / 30 terjawab`}
          </button>
        </div>
      </div>
    </div>
  )
}
