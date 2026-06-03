import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import PrivacyCheckbox from '../components/PrivacyCheckbox'

// 90 soal asli PAPI Kostick 2020
// a = ATAS (pilihan kiri/atas), b = BAWAH (pilihan kanan/bawah)
const soal = [
  {id:1,  a:"Saya seorang pekerja keras.", b:"Saya bukan seorang pemurung."},
  {id:2,  a:"Saya suka bekerja lebih baik dari yang lain.", b:"Saya suka menekuni pekerjaan yang saya lakukan sampai selesai."},
  {id:3,  a:"Saya suka memberi petunjuk kepada orang bagaimana melakukan sesuatu.", b:"Saya ingin melakukan sesuatu sebaik mungkin."},
  {id:4,  a:"Saya suka melakukan hal-hal yang lucu.", b:"Saya senang memberitahukan orang apa yang harus dikerjakannya."},
  {id:5,  a:"Saya suka bergabung dalam kelompok.", b:"Saya senang diperhatikan oleh kelompok."},
  {id:6,  a:"Saya suka membina satu hubungan persahabatan antar pribadi.", b:"Saya suka berteman dengan suatu kelompok."},
  {id:7,  a:"Saya cepat berubah jika saya merasa hal itu diperlukan.", b:"Saya berusaha membina hubungan yang akrab dengan teman saya."},
  {id:8,  a:"Saya suka membalas jika saya disakiti.", b:"Saya suka melakukan hal-hal yang baru dan berbeda."},
  {id:9,  a:"Saya ingin atasan menyukai saya.", b:"Saya suka memberitahu orang jika mereka salah."},
  {id:10, a:"Saya suka mengikuti petunjuk-petunjuk yang diberikan kepada saya.", b:"Saya suka mendukung pendapat atasan saya."},
  {id:11, a:"Saya berusaha sangat keras.", b:"Saya seorang yang teratur, saya menaruh semua barang pada tempatnya."},
  {id:12, a:"Saya dapat membuat orang mau bekerja keras.", b:"Saya tidak mudah marah."},
  {id:13, a:"Saya suka memberitahu kelompok apa yang harus dikerjakan.", b:"Saya selalu menekuni suatu pekerjaan sampai selesai."},
  {id:14, a:"Saya ingin tampil menarik dan menakjubkan.", b:"Saya ingin menjadi orang yang sangat berhasil."},
  {id:15, a:"Saya ingin sesuai dan diterima dalam kelompok.", b:"Saya suka membantu orang dalam mengambil sikap."},
  {id:16, a:"Saya cemas bila seseorang tidak menyukai saya.", b:"Saya suka orang memperhatikan saya."},
  {id:17, a:"Saya suka mencoba hal-hal baru.", b:"Saya lebih suka bekerja bersama orang lain daripada sendiri."},
  {id:18, a:"Saya kadang-kadang menyalahkan orang lain jika terjadi kesalahan.", b:"Saya merasa terganggu jika ada yang tidak menyukai saya."},
  {id:19, a:"Saya suka mendukung pendapat atasan saya.", b:"Saya suka mencoba pekerjaan-pekerjaan yang baru dan berbeda."},
  {id:20, a:"Saya menyukai petunjuk terperinci dalam menyelesaikan pekerjaan.", b:"Saya suka memberitahu bila orang membuat saya kesal."},
  {id:21, a:"Saya selalu berusaha keras.", b:"Saya suka melaksanakan setiap langkah dengan hati-hati."},
  {id:22, a:"Saya seorang pemimpin yang baik.", b:"Saya dapat mengorganisir suatu pekerjaan dengan baik."},
  {id:23, a:"Saya mudah tersinggung.", b:"Saya lambat dalam membuat keputusan."},
  {id:24, a:"Dalam satu kelompok saya lebih suka diam.", b:"Saya suka mengerjakan beberapa pekerjaan sekaligus."},
  {id:25, a:"Saya sangat suka bila saya diundang.", b:"Saya ingin lebih baik dari yang lain dalam mengerjakan sesuatu."},
  {id:26, a:"Saya suka membina hubungan yang akrab dengan teman-teman saya.", b:"Saya suka menasehati orang lain."},
  {id:27, a:"Saya suka melakukan hal-hal yang baru dan berbeda.", b:"Saya suka menceritakan bagaimana saya berhasil melakukan sesuatu."},
  {id:28, a:"Bila saya betul, saya suka mempertahankannya.", b:"Saya ingin diterima dan diakui dalam suatu kelompok."},
  {id:29, a:"Saya berusaha untuk tidak menjadi seorang yang berbeda.", b:"Saya berusaha untuk dekat sekali dengan orang."},
  {id:30, a:"Saya senang diberitahu bagaimana melakukan suatu pekerjaan.", b:"Saya mudah bosan."},
  {id:31, a:"Saya bekerja keras.", b:"Saya banyak berpikir dan merencana."},
  {id:32, a:"Saya memimpin kelompok.", b:"Detail (hal-hal kecil) menarik bagi saya."},
  {id:33, a:"Saya mengambil keputusan secara mudah dan cepat.", b:"Saya menyimpan barang-barang saya secara rapih dan teratur."},
  {id:34, a:"Biasanya saya bekerja dengan tergesa-gesa.", b:"Saya jarang marah atau sedih."},
  {id:35, a:"Saya ingin menjadi bagian dari kelompok.", b:"Saya hanya ingin melakukan satu pekerjaan pada satu saat."},
  {id:36, a:"Saya berusaha membina persahabatan yang akrab.", b:"Saya berusaha keras menjadi yang terbaik."},
  {id:37, a:"Saya suka mode terbaru untuk pakaian atau mobil.", b:"Saya suka bertanggung jawab untuk kepentingan orang lain."},
  {id:38, a:"Saya menyukai perdebatan.", b:"Saya suka mendapatkan perhatian."},
  {id:39, a:"Saya suka mendukung orang-orang yang menjadi atasan saya.", b:"Saya tertarik menjadi bagian dari kelompok."},
  {id:40, a:"Saya suka mengikuti peraturan dengan hati-hati.", b:"Saya suka orang mengenal saya dengan baik."},
  {id:41, a:"Saya selalu berusaha keras.", b:"Saya seorang yang bersahabat."},
  {id:42, a:"Orang menilai saya seorang pemimpin yang baik.", b:"Saya berpikir panjang dan berhati-hati."},
  {id:43, a:"Saya sering mengambil resiko / coba-coba.", b:"Saya senang mengurus hal-hal kecil / detail."},
  {id:44, a:"Orang berpendapat bahwa saya bekerja cepat.", b:"Saya berpendapat bahwa saya rapih dan teratur."},
  {id:45, a:"Saya senang mengikuti pertandingan dan berolah raga.", b:"Saya mempunyai pribadi yang menyenangkan."},
  {id:46, a:"Saya senang jika orang dekat dan bersahabat dengan saya.", b:"Saya selalu berusaha menyelesaikan sesuatu yang telah saya mulai."},
  {id:47, a:"Saya senang bereksperimen dan mencoba hal-hal baru.", b:"Saya suka melaksanakan suatu pekerjaan sulit dengan baik."},
  {id:48, a:"Saya suka diperlakukan secara adil.", b:"Saya suka memberitahu orang lain bagaimana melaksanakan sesuatu."},
  {id:49, a:"Saya suka melakukan apa yang diharapkan dari saya.", b:"Saya suka memperoleh perhatian."},
  {id:50, a:"Saya suka petunjuk terperinci dalam melaksanakan suatu pekerjaan.", b:"Saya suka berada diantara orang-orang banyak."},
  {id:51, a:"Saya selalu berusaha menyelesaikan pekerjaan secara sempurna.", b:"Orang mengatakan bahwa saya tidak mengenal lelah."},
  {id:52, a:"Saya tipe pemimpin.", b:"Saya mudah berteman."},
  {id:53, a:"Saya selalu berspekulasi.", b:"Saya banyak sekali berpikir."},
  {id:54, a:"Saya bekerja dengan kecepatan yang teratur dan tetap.", b:"Saya senang bekerja dengan hal-hal kecil / terperinci."},
  {id:55, a:"Saya bersemangat untuk mengikuti berbagai pertandingan dan berolah raga.", b:"Saya suka mengatur dan menyimpan barang-barang secara rapih dan teratur."},
  {id:56, a:"Saya dapat bergaul secara baik dengan semua orang.", b:"Saya adalah seorang yang mempunyai pembawaan tenang."},
  {id:57, a:"Saya ingin bertemu dengan orang-orang baru dan melakukan hal baru.", b:"Saya selalu ingin menyelesaikan pekerjaan yang telah saya mulai."},
  {id:58, a:"Saya biasanya mempertahankan pendapat yang saya yakini.", b:"Saya biasanya suka bekerja keras."},
  {id:59, a:"Saya suka saran-saran dari orang-orang yang saya kagumi.", b:"Saya senang diserahi tanggung jawab atas sekelompok orang."},
  {id:60, a:"Saya biarkan diri saya banyak dipengaruhi oleh orang lain.", b:"Saya suka jika mendapat banyak perhatian."},
  {id:61, a:"Saya berusaha bekerja keras.", b:"Saya mengerjakan sesuatu dengan cepat."},
  {id:62, a:"Apabila saya bicara, kelompok mendengarkan.", b:"Saya trampil menggunakan perkakas (alat-alat)."},
  {id:63, a:"Saya lambat dalam membina hubungan.", b:"Saya lambat dalam membuat keputusan."},
  {id:64, a:"Saya biasanya makan secara cepat.", b:"Saya suka membaca."},
  {id:65, a:"Saya suka pekerjaan dimana saya banyak bergerak.", b:"Saya suka pekerjaan yang harus dilakukan dengan hati-hati."},
  {id:66, a:"Saya mencari teman sebanyak mungkin.", b:"Apa yang telah saya simpan, akan mudah saya temukan lagi."},
  {id:67, a:"Saya merencanakan jauh-jauh sebelumnya.", b:"Saya selalu menyenangkan."},
  {id:68, a:"Saya mempertahankan dengan bangga nama baik saya.", b:"Saya terus menekuni suatu masalah sampai selesai."},
  {id:69, a:"Saya suka mendukung orang-orang yang saya kagumi.", b:"Saya ingin sukses."},
  {id:70, a:"Saya suka orang lain yang memutuskan untuk kelompok.", b:"Saya suka membuat keputusan untuk kelompok."},
  {id:71, a:"Saya selalu berusaha bekerja keras.", b:"Saya mengambil keputusan secara cepat dan mudah."},
  {id:72, a:"Kelompok biasanya melakukan apa yang saya inginkan.", b:"Saya biasa terburu-buru."},
  {id:73, a:"Saya sering merasa lelah.", b:"Saya lamban dalam menentukan sikap."},
  {id:74, a:"Saya bekerja cepat.", b:"Saya mudah berteman."},
  {id:75, a:"Saya biasanya mempunyai semangat dan tenaga.", b:"Saya banyak menghabiskan waktu dengan berpikir."},
  {id:76, a:"Saya sangat ramah terhadap orang.", b:"Saya suka pekerjaan yang memerlukan ketelitian."},
  {id:77, a:"Saya banyak berpikir dan merencana.", b:"Saya menyimpan segala sesuatu pada tempatnya."},
  {id:78, a:"Saya suka pekerjaan yang harus memperhatikan hal-hal kecil (detail).", b:"Saya tidak mudah marah."},
  {id:79, a:"Saya suka mengikuti orang yang saya kagumi.", b:"Saya selalu menyelesaikan pekerjaan yang telah saya mulai."},
  {id:80, a:"Saya suka petunjuk-petunjuk yang jelas.", b:"Saya suka bekerja keras."},
  {id:81, a:"Saya mengejar apa yang saya inginkan.", b:"Saya seorang pemimpin yang baik."},
  {id:82, a:"Saya dapat membuat orang lain bekerja sesuai dengan yang saya inginkan.", b:"Saya seorang yang tergolong santai tapi beruntung."},
  {id:83, a:"Saya mengambil keputusan secara mudah dan amat cepat.", b:"Saya bicara dengan cepat."},
  {id:84, a:"Saya biasanya bekerja cepat.", b:"Saya seorang pemimpin yang baik."},
  {id:85, a:"Saya tidak suka bertemu orang.", b:"Saya cepat merasa lelah."},
  {id:86, a:"Saya mempunyai banyak sekali teman.", b:"Saya banyak menghabiskan waktu dengan berpikir."},
  {id:87, a:"Saya suka bekerja dengan teori.", b:"Saya suka bekerja dengan hal-hal yang terperinci."},
  {id:88, a:"Saya menikmati pekerjaan yang melibatkan hal-hal kecil (detail).", b:"Saya suka mengorganisir pekerjaan saya."},
  {id:89, a:"Saya menaruh barang pada tempatnya.", b:"Saya selalu menyenangkan."},
  {id:90, a:"Saya suka diberitahu tentang apa yang saya perlu lakukan.", b:"Saya harus menyelesaikan apa yang saya mulai."},
]

// Kunci skoring: atas = skala jika pilih a, bawah = skala jika pilih b
// ROLES: G L I T V S R D C E | NEEDS: N A P X B O Z K F W
const kunci = [
  {a:'G',b:'E'},{a:'A',b:'N'},{a:'P',b:'A'},{a:'X',b:'P'},{a:'B',b:'X'},
  {a:'O',b:'B'},{a:'Z',b:'O'},{a:'K',b:'Z'},{a:'F',b:'K'},{a:'W',b:'F'},
  {a:'G',b:'C'},{a:'L',b:'E'},{a:'P',b:'N'},{a:'X',b:'A'},{a:'B',b:'P'},
  {a:'O',b:'X'},{a:'Z',b:'B'},{a:'K',b:'O'},{a:'F',b:'Z'},{a:'W',b:'K'},
  {a:'G',b:'D'},{a:'L',b:'C'},{a:'I',b:'E'},{a:'X',b:'N'},{a:'B',b:'A'},
  {a:'O',b:'P'},{a:'Z',b:'X'},{a:'K',b:'B'},{a:'F',b:'O'},{a:'W',b:'Z'},
  {a:'G',b:'R'},{a:'L',b:'D'},{a:'I',b:'C'},{a:'T',b:'E'},{a:'B',b:'N'},
  {a:'O',b:'A'},{a:'Z',b:'P'},{a:'K',b:'X'},{a:'F',b:'B'},{a:'W',b:'O'},
  {a:'G',b:'S'},{a:'L',b:'R'},{a:'I',b:'D'},{a:'T',b:'C'},{a:'V',b:'E'},
  {a:'O',b:'N'},{a:'Z',b:'A'},{a:'K',b:'P'},{a:'F',b:'X'},{a:'W',b:'B'},
  {a:'G',b:'V'},{a:'L',b:'S'},{a:'I',b:'R'},{a:'T',b:'D'},{a:'V',b:'C'},
  {a:'S',b:'E'},{a:'Z',b:'N'},{a:'K',b:'A'},{a:'F',b:'P'},{a:'W',b:'X'},
  {a:'G',b:'T'},{a:'L',b:'V'},{a:'I',b:'S'},{a:'T',b:'R'},{a:'V',b:'D'},
  {a:'S',b:'C'},{a:'R',b:'E'},{a:'K',b:'N'},{a:'F',b:'A'},{a:'W',b:'P'},
  {a:'G',b:'I'},{a:'L',b:'T'},{a:'I',b:'V'},{a:'T',b:'S'},{a:'V',b:'R'},
  {a:'S',b:'D'},{a:'R',b:'C'},{a:'D',b:'E'},{a:'F',b:'N'},{a:'W',b:'A'},
  {a:'G',b:'L'},{a:'L',b:'I'},{a:'I',b:'T'},{a:'T',b:'V'},{a:'V',b:'S'},
  {a:'S',b:'R'},{a:'R',b:'D'},{a:'D',b:'C'},{a:'C',b:'E'},{a:'W',b:'N'},
]

function hitungPAPI(jawaban) {
  const scores = {G:0,L:0,I:0,T:0,V:0,S:0,R:0,D:0,C:0,E:0, N:0,A:0,P:0,X:0,B:0,O:0,Z:0,K:0,F:0,W:0}
  soal.forEach((sq, idx) => {
    const j = jawaban[sq.id]
    if (!j) return
    scores[j === 'a' ? kunci[idx].a : kunci[idx].b]++
  })
  // Profil = 3 skala tertinggi
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const profil = sorted.slice(0, 3).map(([k]) => k).join('')
  return { scores, profil }
}

const S_LABEL = { display: 'block', color: 'var(--text-sub)', fontSize: '13px', fontWeight: 600, marginBottom: '8px', letterSpacing: '0.03em' }
const S_ERR   = { color: '#f87171', fontSize: '12px', marginTop: '6px' }

function TesPapi() {
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

  const jumlahDijawab = soal.filter(s => jawaban[s.id]).length
  const sudahLengkap = jumlahDijawab === soal.length

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

  const handlePilih = (soalId, pilihan) => {
    setJawaban(prev => ({ ...prev, [soalId]: pilihan }))
  }

  const handleSubmit = async () => {
    if (!sudahLengkap) {
      const belum = soal.find(s => !jawaban[s.id])
      if (belum) {
        const el = document.getElementById(`soal-papi-${belum.id}`)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }
    setLoading(true)
    setSubmitError('')

    const jabatan = `${usia} th · ${jenisKelamin}`
    const { data: pesertaData, error } = await supabase
      .from('peserta_papi').insert([{ nama, nip: email, jabatan }]).select()

    if (error) {
      setSubmitError('Gagal menyimpan hasil. Periksa koneksi internet dan coba lagi.')
      setLoading(false)
      return
    }

    const pesertaId = pesertaData[0].id
    const { scores, profil } = hitungPAPI(jawaban)

    await supabase.from('hasil_papi').insert([{
      peserta_id: pesertaId, profil,
      skor_g:scores.G, skor_l:scores.L, skor_i:scores.I, skor_t:scores.T, skor_v:scores.V,
      skor_s:scores.S, skor_r:scores.R, skor_d:scores.D, skor_c:scores.C, skor_e:scores.E,
      skor_n:scores.N, skor_a:scores.A, skor_p:scores.P, skor_x:scores.X, skor_b:scores.B,
      skor_o:scores.O, skor_z:scores.Z, skor_k:scores.K, skor_f:scores.F, skor_w:scores.W,
    }])

    navigate('/hasil-papi', { state: { scores, profil, nama, email, jabatan, pesertaId } })
    setLoading(false)
  }

  // ── FORM ──
  if (step === 'form') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px var(--px)' }}>
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(ellipse at center, rgba(212,168,83,0.07) 0%, transparent 65%)' }} />
      </div>
      <div className="anim-up" style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Logo size="sm" dark />
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.22em', color: 'var(--accent)', textTransform: 'uppercase', marginTop: '16px', marginBottom: '4px' }}>AssesIN</p>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '22px', color: 'var(--text)', marginBottom: '4px' }}>Tes PAPI Kostick</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>90 pasangan · ~20 menit</p>
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
            <div className="dark-card" style={{ padding: '14px 16px', background: 'rgba(212,168,83,0.05)', borderColor: 'var(--accent-border)' }}>
              <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.65' }}>
                Dari setiap pasang pernyataan, pilih satu yang paling mencerminkan diri Anda. Terdapat <strong style={{ color: 'var(--text)' }}>90 pasang</strong> pernyataan.
              </p>
            </div>
            <PrivacyCheckbox
              id="privacy-papi"
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

  // ── TES ──
  const progress = (jumlahDijawab / 90) * 100

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(9,9,15,0.9)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)', padding: '12px var(--px)' }}>
        <div style={{ maxWidth: '1024px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--text)', fontSize: '14px' }}>Tes PAPI Kostick</p>
            <p className="tes-header-name" style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{nama} · {jumlahDijawab}/90 terjawab</p>
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

        {submitError && (
          <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '10px', padding: '12px 16px', color: '#f87171', fontSize: '14px', marginBottom: '16px' }}>
            {submitError}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {soal.map((s, idx) => {
            const pilihan = jawaban[s.id]
            const selesai = !!pilihan
            return (
              <div id={`soal-papi-${s.id}`} key={s.id} className="dark-card" style={{ padding: '20px', borderColor: selesai ? 'var(--accent-border)' : 'var(--border)' }}>
                <p style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '14px', opacity: 0.7 }}>
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[{key:'a', teks:s.a}, {key:'b', teks:s.b}].map(({key, teks}) => {
                    const dipilih = pilihan === key
                    return (
                      <button key={key} onClick={() => handlePilih(s.id, key)} className={`answer-btn ${dipilih ? 'selected' : ''}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <span style={{ flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%', border: '2px solid ' + (dipilih ? 'var(--accent)' : 'var(--border)'), background: dipilih ? 'var(--accent)' : 'transparent', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {dipilih && <span style={{ width: '6px', height: '6px', background: '#09090f', borderRadius: '50%' }} />}
                        </span>
                        <span style={{ fontSize: '14px', lineHeight: '1.65', color: dipilih ? 'var(--text)' : 'var(--text-sub)', textAlign: 'left' }}>{teks}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: '28px', position: 'sticky', bottom: '16px' }}>
          <button onClick={handleSubmit} disabled={loading || !sudahLengkap}
            style={{ width: '100%', background: sudahLengkap ? 'var(--accent)' : 'var(--surface-2)', color: sudahLengkap ? '#09090f' : 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '16px', borderRadius: '12px', border: '1px solid ' + (sudahLengkap ? 'var(--accent)' : 'var(--border)'), cursor: sudahLengkap && !loading ? 'pointer' : 'not-allowed', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Menyimpan...' : sudahLengkap ? 'Selesai & Lihat Hasil →' : `Jawab ${90 - jumlahDijawab} soal lagi`}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TesPapi

