import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import PaymentGate from '../components/PaymentGate'
import { LaporanPage, LaporanBar, LaporanHero, Kartu, BarisSkor, Poin, Chip, Sorot, Catatan, AksiBawah, TanpaData } from '../components/Laporan'
import { DIMENSI, GARIS_TENGAH, NAMA_GRAFIK, LABEL_KONDISI, hitungGrafikDISC } from '../disc/skoring'
import { POLA_DISC } from '../disc/pola'

const profilDISC = {
  D: { nama: "Developer", tipe: "D", deskripsi: "selalu akan mencari solusi-solusi baru dari tiap persoalan yang dihadapi. Ia memiliki internal motif yang kuat dan memiliki kecepatan kerja untuk mencapai tujuannya, serta mampu membuat keputusan dengan mudah walaupun dalam suasana penuh tekanan. Ia adalah seorang yang kreatif dan percaya diri, ia cenderung menggunakan keseimbangan antara intuisi dan fakta ketika mengambil keputusan. Ia memiliki kekuatan ego yang besar, cenderung sangat individualistis dan selalu mencari pandangan-pandangan baru karenanya ia tidak menyukai berada dibawah atasan yang penuh kontrol.", karakteristik: ["Mengambil keputusan","Langsung/direct","Kekuatan ego yang besar","Memecahkan masalah","Berani mengambil resiko","Dominan","Penggerak"], perilakuKerja: { kekuatan: ["Tidak takut bersaing","Kreatif dan memiliki banyak ide","Percaya diri dan mandiri","Berani mengambil risiko"], kelemahan: ["Kurang peka terhadap perasaan orang lain","Terlalu cepat mengambil keputusan","Cenderung mendominasi"] }, suasanaEmosi: { kekuatan: ["Percaya diri","Berkemauan keras","Tekun dan ulet","Berani dan tegar"], kelemahan: ["Pendiriannya sangat keras","Tidak sabaran, suka menekan","Memaksakan kehendak"] }, kekuatan: ["Percaya diri","Berkemauan keras","Tekun dan ulet","Berani dan tegar","Menghadapi hidup tanpa kompromi","Organisator dan promotor","Cepat bertindak","Berani memutuskan dalam keadaan mendesak","Mampu memberikan solusi","Memiliki inisiatif","Mampu bekerja dengan cepat","Memotivasi orang lain","Cepat membuat keputusan","Berani mengambil resiko"], kelemahan: ["Pendiriannya sangat keras","Terlalu cepat mengambil keputusan","Tidak sabaran, suka menekan","Kurang peka terhadap perasaan orang lain","Terlalu percaya diri","Kurang menghargai pendapat orang lain","Cenderung mendominasi","Memaksakan kehendak","Cenderung egois"], gayaKepemimpinan: ["Mengendalikan orang lain","Cepat bertindak","Percaya diri","Mencari perubahan","Persuasif","Kompetitif","Berani mengambil resiko"], pekerjaan: ["Pekerjaan yang membutuhkan pengambilan keputusan secara cepat","Pekerjaan yang berorientasi kepada hasil","Pekerjaan yang kompetitif dan banyak tantangan","Bebas dari pekerjaan detail dan spesifik","Menggunakan kekuasaan dan wewenang","Mengambil suatu gagasan dan menjalankannya","Beragam kegiatan","Bebas dari pengawasan langsung","Memunculkan ide-ide baru","Mengkoordinir kegiatan"], karir: ["Director","Entrepreneur","Manager","Sales Manager","Executive"] },
  I: { nama: "Promoter", tipe: "I", deskripsi: "menunjukkan sikap yang antusias dan optimis, ia akan menyelesaikan tugas melalui orang lain. Senang berada diantara orang banyak, tidak suka menyendiri. Kemampuan komunikasinya sangat dominan. Karena ia lebih tertarik pada partisipasi dan interaksi dengan orang lain dalam setiap aktivitas, menyebabkan dirinya kurang fokus pada penyelesaian tugas.", karakteristik: ["Komunikator yang baik","Menciptakan kesan yang menyenangkan","Antusias","Optimis","Persuasif"], perilakuKerja: { kekuatan: ["Pandai berkomunikasi dan bersosialisasi","Mampu memotivasi orang lain","Kreatif dan inovatif","Antusias dan enerjik"], kelemahan: ["Kurang fokus pada penyelesaian tugas","Kurang terorganisir","Mudah terdistraksi"] }, suasanaEmosi: { kekuatan: ["Hangat dan bersemangat","Berkarisma","Antusias","Ekspresif"], kelemahan: ["Terlalu reaktif","Keputusannya sering berdasarkan emosi","Tidak ketat dalam disiplin diri"] }, kekuatan: ["Hangat dan bersemangat","Berkarisma","Antusias","Ekspresif","Aktif","Enerjik","Meyakinkan","Memberikan semangat","Aktif berbicara","Senang membina hubungan sosial","Optimis","Humoris","Mampu menyampaikan dengan jelas"], kelemahan: ["Terlalu reaktif","Kurang tenang","Cenderung melebih-lebihkan sesuatu","Keputusannya sering berdasarkan emosi","Tidak teratur","Tidak ketat dalam disiplin diri","Banyak waktu terbuang karena mengobrol berlebihan","Sulit mengingat nama orang dan hal detail","Impulsif"], gayaKepemimpinan: ["Fleksibel","Senang melakukan hal-hal baru","Antusias","Mudah menyesuaikan diri","Penuh inspirasi","Komunikator","Optimis","Demonstratif","Persuasif"], pekerjaan: ["Banyak berhubungan dengan orang lain","Pekerjaan yang memerlukan pendekatan persuasif","Melakukan verbalisasi yang inspiratif","Aktif dan mobilitas tinggi","Kesempatan untuk mempresentasikan konsep baru","Mengembangkan kegiatan baru yang berbeda","Pekerjaan yang cepat berubah-ubah","Melakukan pembinaan dan arahan kepada orang lain","Menangani keluhan pelanggan"], karir: ["Public Relations","Sales","Event Organizer","Trainer","Konsultan"] },
  S: { nama: "Specialist", tipe: "S", deskripsi: "adalah individu yang konsisten, tekun bekerja dalam lingkungan yang tidak berubah. Ia dapat bekerjasama dengan berbagai model perilaku karena mampu menampilkan perilaku yang diharapkan. Ia adalah orang yang memperhatikan orang lain, sabar dan selalu bersedia membantu orang.", karakteristik: ["Pendengar yang baik","Peserta tim","Posesif","Tenang","Mudah diprediksi","Memahami orang lain","Penuh persahabatan","Mampu berempati"], perilakuKerja: { kekuatan: ["Konsisten dan dapat diandalkan","Sabar dan telaten","Setia terhadap organisasi","Pendengar yang baik"], kelemahan: ["Sulit beradaptasi dengan perubahan","Sulit berkata tidak","Lamban dalam bergerak"] }, suasanaEmosi: { kekuatan: ["Tenang, cinta damai","Ramah","Sopan santun","Sabar","Setia"], kelemahan: ["Kurang percaya diri","Cenderung pemalu","Lamban, statis","Menghindari konflik"] }, kekuatan: ["Tenang, cinta damai","Ramah","Sopan santun","Baik hati/lembut hati","Tidak emosional","Sabar","Setia","Tekun","Praktis, sederhana dalam bekerja","Mampu melibatkan orang lain","Terbuka pada gagasan orang lain","Memiliki kesabaran dan ketenangan dalam bekerja","Memiliki Empati yang tinggi"], kelemahan: ["Kurang percaya diri","Cenderung pemalu","Pesimis, penakut, selalu khawatir","Kompromistis","Lamban, statis","Terlalu hati-hati","Cenderung menghindari resiko","Menolak/takut pada perubahan","Sulit memutuskan sesuatu","Sulit menolak permintaan orang lain","Santai dalam bekerja","Menghindari konflik","Kurang ekspresif"], gayaKepemimpinan: ["Pemikir","Idealis","Percaya pada orang lain","Loyal","Mau membantu dan menolong","Kooperatif","Santai/rileks","Konsisten","Perilakunya mudah diramalkan","Pendengar yang baik","Tulus","Empati yang tinggi"], pekerjaan: ["Pekerjaan yang menuntut kesabaran","Mengikuti prosedur baku","Klarifikasi kebijakan sebelum melangkah","Mengumpulkan informasi, fakta dan data","Melakukan penyiapan bahan-bahan pendukung","Menyimpan dan memelihara dokumen","Pekerjaan rutin dan administratif","Melaksanakan, mengelola pekerjaan sesuai peraturan","Pekerjaan yang memerlukan konsistensi dalam jangka waktu panjang"], karir: ["Administrator","Customer Service","HR Specialist","Konselor","Perawat"] },
  C: { nama: "Objective Thinker", tipe: "C", deskripsi: "adalah seorang pekerja yang sangat taat pada peraturan dan prosedur. Ia akan menjalankan tugas dan tanggung jawabnya berdasarkan uraian tugas yang jelas. Ia juga mampu merencanakan, mengendalikan diri, penuh perhitungan dan sangat menuntut akurasi dalam bekerja.", karakteristik: ["Akurat","Analitis","Hati-hati","Penuh Kesadaran","Menemukan fakta","Ketepatan","Standar tinggi","Sistematis"], perilakuKerja: { kekuatan: ["Pemikir dan menganalisa","Kreatif dan memiliki intelektual tinggi","Berbakat dan cerdas","Rapi, tertib, teratur","Konservatif"], kelemahan: ["Ragu untuk berinovasi","Terlalu banyak menganalisa","Terlalu banyak berpikir","Perlu waktu untuk menyetujui sesuatu","Menolak/takut pada perubahan"] }, suasanaEmosi: { kekuatan: ["Waspada","Mematuhi aturan","Sadar akan mutu","Ramah","Setia"], kelemahan: ["Sulit memutuskan","Cenderung Rigid","Sedih tanpa alasan","Cenderung pemalu","Kompromistis"] }, kekuatan: ["Konservatif","Pemikir","Sadar akan mutu","Mematuhi aturan","Diplomatis","Waspada","Perfeksionis","Senang pada detail","Senang pada rincian yang rumit","Mampu mengorganisasikan tugas","Memiliki perencanaan jangka panjang","Menentukan standar yang tinggi dan ideal","Mampu menganalisa secara mendalam","Bekerja dengan akurasi tinggi","Konsisten menjaga kualitas"], kelemahan: ["Menyalahkan diri sendiri","Cenderung Rigid","Pesimis, seringkali berpikir negatif","Sedih tanpa alasan","Sangat berhati-hati","Over Sensitif","Sulit memutuskan","Tidak tegas","Terlalu banyak teori, kurang praktis","Mudah tersinggung","Terlalu banyak waktu digunakan untuk persiapan","Terlalu fokus pada hal detail","Mengingat hal-hal negatif","Menaruh curiga kepada orang lain"], gayaKepemimpinan: ["Tekun dan Ulet","Praktis","Penuh perhitungan","Menjaga jarak","Menyampaikan fakta","Selalu melakukan evaluasi dan monitoring","Analitis","Ketepatan","Kualitas","Rinci","Berpikir kritis","Hati-hati","Sistematis","Cermat","Sensitif","Standar Tinggi","Perfeksionis"], pekerjaan: ["Pekerjaan yang menuntut akurasi dan ketepatan","Menganalisa masalah secara mendalam","Pendekatan kritis dalam menyelesaikan masalah","Menjelaskan secara menyeluruh dan sistematis tentang tugas","Mentaati prosedur operasi standar","Merancang dan mengembangkan program","Mengumpulkan informasi secara rinci","Melakukan evaluasi program","Verifikasi, validasi dan pengendalian pekerjaan"], karir: ["Researcher","Akuntan","Analis","Computer Programmer","Quality Control","IT Management"] },
}

const getProfilInfo = (profil) => {
  const base = profilDISC[profil[0]]
  const pola = POLA_DISC[profil]
  if (!pola) return { ...base, uraian: `${base.nama} ${base.deskripsi}` }
  return { ...base, nama: pola.tipe, uraian: pola.deskripsi, karakteristik: pola.karakter.length ? pola.karakter : base.karakteristik }
}

const DC = {
  D: { hex: '#ef4444', dim: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.35)', label: 'Dominance'        },
  I: { hex: '#f59e0b', dim: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.35)', label: 'Influence'       },
  S: { hex: '#22c55e', dim: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.35)',  label: 'Steadiness'      },
  C: { hex: '#3b82f6', dim: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)', label: 'Conscientiousness'},
}

/** Grafik posisi D-I-S-C (1-32) dengan garis tengah; batang naik/turun dari garis tengah. */
function GrafikDISC({ judul, sub, grafik }) {
  const H = 64 // tinggi tiap sisi (px)
  const tengah = GARIS_TENGAH - 0.5
  const kondisi = LABEL_KONDISI[grafik.kondisi]
  return (
    <div style={{ background: 'var(--surface-2)', borderRadius: '16px', padding: '14px 12px 12px' }}>
      <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>{judul}</p>
      <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '4px' }}>{sub}</p>
      <p style={{ fontSize: '13px', fontWeight: 800, textAlign: 'center', marginBottom: '10px', color: kondisi ? '#b45309' : 'var(--accent)' }}>
        {kondisi ? kondisi.judul : grafik.kode}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
        {DIMENSI.map(d => {
          const pos = grafik.pos[d]
          const h = (Math.abs(pos - tengah) / 16) * H
          return (
            <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: DC[d].hex, height: '18px' }}>{pos}</span>
              <div style={{ height: H, width: '100%', display: 'flex', alignItems: 'flex-end', borderBottom: '1.5px solid #94a3b8' }}>
                {pos > tengah && <div style={{ width: '100%', height: h, background: DC[d].hex, borderRadius: '6px 6px 0 0' }} />}
              </div>
              <div style={{ height: H, width: '100%', display: 'flex', alignItems: 'flex-start' }}>
                {pos < tengah && <div style={{ width: '100%', height: h, background: DC[d].hex, opacity: 0.45, borderRadius: '0 0 6px 6px' }} />}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 800, color: DC[d].hex, marginTop: '6px' }}>{d}</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>skor {grafik.mentah[d] > 0 && judul.includes('Change') ? '+' : ''}{grafik.mentah[d]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PremiumContentDISC({ info, warna }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Kartu ikon="🧬" judul="Karakteristik perilaku" aksen={warna}>
        <div className="rpt-chips">
          {info.karakteristik.map(k => <Chip key={k} warna={warna} besar>{k}</Chip>)}
        </div>
      </Kartu>

      <Kartu ikon="💼" judul="Perilaku kerja & suasana emosi">
        <div className="rpt-grid-2">
          <Poin judul="Perilaku kerja · kekuatan" items={info.perilakuKerja.kekuatan} warna="#16a34a" />
          <Poin judul="Perilaku kerja · perlu diwaspadai" items={info.perilakuKerja.kelemahan} warna="#d97706" />
          <Poin judul="Suasana emosi · kekuatan" items={info.suasanaEmosi.kekuatan} warna="#16a34a" />
          <Poin judul="Suasana emosi · perlu diwaspadai" items={info.suasanaEmosi.kelemahan} warna="#d97706" />
        </div>
      </Kartu>

      <div className="rpt-grid-2">
        <Kartu ikon="💪" judul="Kekuatan" aksen="#16a34a">
          <Poin items={info.kekuatan.slice(0, 8)} warna="#16a34a" />
        </Kartu>
        <Kartu ikon="⚠️" judul="Perlu dikembangkan" aksen="#dc2626">
          <Poin items={info.kelemahan.slice(0, 8)} warna="#dc2626" />
        </Kartu>
      </div>

      <Kartu ikon="🧭" judul="Gaya kepemimpinan">
        <div className="rpt-chips">
          {info.gayaKepemimpinan.map(k => <Chip key={k}>{k}</Chip>)}
        </div>
      </Kartu>

      <Kartu ikon="🏢" judul="Lingkungan kerja yang sesuai">
        <Poin items={info.pekerjaan} warna="#2563eb" />
        <div style={{ marginTop: '16px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>Jalur karier untuk dijajaki</p>
          <div className="rpt-chips">
            {info.karir.map(k => <Chip key={k} warna={warna} besar>{k}</Chip>)}
          </div>
        </div>
      </Kartu>
    </div>
  )
}

/** Job Person Match: hanya untuk admin (job profile disimpan di dashboard). */
function JobPersonMatch({ hasil }) {
  const [jobs, setJobs] = useState([])
  const [pilih, setPilih] = useState(null)

  useEffect(() => {
    supabase.from('job_profile').select('*').order('nama_jabatan').then(({ data }) => setJobs(data || []))
  }, [])

  const hitung = job => {
    const peserta = { D: hasil.changeD || 0, I: hasil.changeI || 0, S: hasil.changeS || 0, C: hasil.changeC || 0 }
    const target = { D: job.skor_d, I: job.skor_i, S: job.skor_s, C: job.skor_c }
    const total = Object.values(target).reduce((a, b) => a + Math.max(b, 0), 0)
    if (total === 0) return { skor: 0, detail: [] }
    let cocok = 0
    const detail = ['D', 'I', 'S', 'C'].map(dim => {
      const jobVal = Math.max(target[dim], 0)
      const pesertaVal = Math.max(peserta[dim], 0)
      cocok += jobVal > 0 ? Math.min(pesertaVal / jobVal, 1) * jobVal : 0
      return { dim, jobVal, pesertaVal, pct: jobVal > 0 ? Math.min(Math.round((pesertaVal / jobVal) * 100), 100) : 0 }
    })
    return { skor: Math.round((cocok / total) * 100), detail }
  }

  const hasilJpm = pilih ? hitung(pilih) : null
  const warnaJpm = s => s >= 80 ? ['#16a34a', 'Sangat sesuai'] : s >= 60 ? ['#2563eb', 'Sesuai'] : s >= 40 ? ['#d97706', 'Cukup sesuai'] : ['#dc2626', 'Kurang sesuai']

  return (
    <Kartu ikon="🎯" judul="Job Person Match" sub="Kesesuaian profil (grafik Change) dengan job profile">
      {jobs.length === 0 ? (
        <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Belum ada job profile. Tambahkan lewat menu Job Profile di dashboard.</p>
      ) : (
        <>
          <div className="rpt-chips" style={{ marginBottom: '16px' }}>
            {jobs.map(job => (
              <button key={job.id} onClick={() => setPilih(job)} className={`rpt-btn sm ${pilih?.id === job.id ? '' : 'ghost'}`}>{job.nama_jabatan}</button>
            ))}
          </div>
          {hasilJpm && (() => {
            const [w, label] = warnaJpm(hasilJpm.skor)
            return (
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
                  <p style={{ fontSize: '40px', fontWeight: 800, color: w, lineHeight: 1 }}>{hasilJpm.skor}%</p>
                  <Chip warna={w} besar>{label}</Chip>
                </div>
                {hasilJpm.detail.map(d => (
                  <BarisSkor key={d.dim} label={`${d.dim} — ${DC[d.dim].label}`} nilai={d.pct} tampil={`${d.pesertaVal} / ${d.jobVal}`} warna={DC[d.dim].hex} />
                ))}
              </div>
            )
          })()}
        </>
      )}
    </Kartu>
  )
}

function deteksiProfilKhusus(g) {
  return [1, 2, 3]
    .filter(n => LABEL_KONDISI[g.grafik[n].kondisi])
    .map(n => [`${LABEL_KONDISI[g.grafik[n].kondisi].judul} pada ${NAMA_GRAFIK[n].judul}`, LABEL_KONDISI[g.grafik[n].kondisi].isi])
}

export default function HasilDisc() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.hasil) return <TanpaData onKembali={() => navigate('/tes-disc')} />

  const { hasil, nama, email, pesertaId, fromDashboard } = state
  // Profil selalu dihitung ulang dari skor Most/Least, sehingga hasil lama
  // ikut terbaca dengan aturan grafik eDISC.
  const ambil = k => Object.fromEntries(DIMENSI.map(d => [d, hasil[`${k}${d}`] || 0]))
  const g       = hitungGrafikDISC(ambil('most'), ambil('least'))
  const profil  = g.profil
  const dominan = profil[0]
  const info    = getProfilInfo(profil)
  const profilKhusus = deteksiProfilKhusus(g)
  const keBelakang = () => navigate(fromDashboard ? '/dashboard' : '/')
  const laporan = <PremiumContentDISC info={info} warna={DC[dominan].hex} />

  return (
    <LaporanPage bar={<LaporanBar kembali={fromDashboard ? '← Dashboard' : null} onKembali={keBelakang} />}>
      <LaporanHero tes="DISC" sub="Dominance · Influence · Steadiness · Conscientiousness" nama={nama} tersimpan={!!pesertaId} warna="#be123c" warna2="#4f46e5" watermark={profil}>
        <p className="rpt-label">Profil perilaku Anda</p>
        <div style={{ display: 'flex', gap: '10px', margin: '12px 0 10px' }}>
          {profil.split('').map((h, i) => <span key={i} className="rpt-tile" style={{ color: DC[h].hex }}>{h}</span>)}
        </div>
        <p className="rpt-besar" style={{ fontSize: '26px' }}>{info.nama}</p>
        <p className="rpt-ket">Dominan: {profil.split('').map(h => DC[h].label).join(' · ')}</p>
      </LaporanHero>

      <Kartu no={1} ikon="📖" judul="Uraian kepribadian">
        <p className="rpt-teks">{info.uraian}</p>
      </Kartu>

      <Kartu no={2} ikon="📊" judul="Grafik kepribadian" sub="Perilaku Anda dari tiga sudut pandang">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[1, 2, 3].map(n => <GrafikDISC key={n} judul={NAMA_GRAFIK[n].judul} sub={NAMA_GRAFIK[n].sub} grafik={g.grafik[n]} />)}
        </div>
        {!g.profilPasti && (
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '12px' }}>
            Grafik 3 tidak membentuk profil yang jelas, sehingga profil di atas dibaca dari {NAMA_GRAFIK[g.sumberProfil].judul}.
          </p>
        )}
        {profilKhusus.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
            {profilKhusus.map(([judul, isi]) => <Sorot key={judul} judul={judul} warna="#b45309">{isi}</Sorot>)}
          </div>
        )}
      </Kartu>

      {fromDashboard && <JobPersonMatch hasil={hasil} />}

      {fromDashboard ? laporan : (
        <PaymentGate testType="DISC" pesertaId={pesertaId} nama={nama} email={email}>{laporan}</PaymentGate>
      )}

      <Catatan>
        DISC menggambarkan kecenderungan perilaku, bukan kemampuan atau kepribadian yang menetap. Setiap profil memiliki kekuatan di situasi yang berbeda.
        Gunakan laporan ini sebagai bahan refleksi dan pengembangan diri. Hasil bersifat rahasia.
      </Catatan>

      <AksiBawah kembali={fromDashboard ? 'Dashboard' : 'Beranda'} onKembali={keBelakang} ulang={fromDashboard ? null : 'Ulangi tes'} onUlang={() => navigate('/tes-disc')} />
    </LaporanPage>
  )
}
