import { useNavigate, useLocation } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'
import { LaporanPage, LaporanBar, LaporanHero, Kartu, BarisSkor, Radar, Cincin, StatHero, Poin, Sorot, Chip, Catatan, AksiBawah, TanpaData } from '../components/Laporan'
import { TES_BARU, tingkat, LABEL_TINGKAT, cekPolaJawaban } from '../tes-baru/definisi'

// Halaman hasil bersama untuk Big Five, RIASEC, Resiliensi, Peran dalam
// Tim. Bagian gratis: sorotan + profil skor dengan interpretasi singkat.
// Bagian berbayar (PaymentGate): kekuatan, tantangan, saran
// pengembangan, dan arah karier.

const GRADIEN = {
  bigfive:    ['#7c3aed', '#4f46e5'],
  riasec:     ['#c2410c', '#d97706'],
  resiliensi: ['#be123c', '#dc2626'],
  perantim:   ['#0369a1', '#4f46e5'],
}

const WATERMARK = {
  bigfive: () => 'OCEAN',
  riasec: (def, skor) => def.kodeMinat(skor),
  resiliensi: (def, skor) => def.total(skor),
  perantim: () => 'TIM',
}

const IKON = { bigfive: '🧭', riasec: '🧩', resiliensi: '🌱', perantim: '🤝' }

function urutkan(skor) {
  return Object.entries(skor).sort((a, b) => b[1] - a[1])
}

/** Sorotan hasil utama di dalam hero. */
function Sorotan({ def, skor }) {
  const urut = urutkan(skor)
  const dim = k => def.dimensi[k]

  if (def.kode === 'riasec') {
    const kode = def.kodeMinat(skor).split('')
    return (
      <>
        <p className="rpt-label">Kode minat karier Anda</p>
        <div style={{ display: 'flex', gap: '10px', margin: '12px 0' }}>
          {kode.map(k => <span key={k} className="rpt-tile">{k}</span>)}
        </div>
        <p className="rpt-ket">{kode.map(k => dim(k).nama).join(' · ')}</p>
      </>
    )
  }
  if (def.kode === 'resiliensi') {
    const total = def.total(skor)
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
        <Cincin nilai={total} terang ukuran={128} label="dari 100" />
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p className="rpt-label">Indeks resiliensi</p>
          <p className="rpt-besar">{LABEL_TINGKAT[tingkat(total)]}</p>
          <p className="rpt-ket">Aspek terkuat Anda: <strong>{dim(urut[0][0]).nama}</strong>. Aspek yang paling bisa dikuatkan: <strong>{dim(urut.at(-1)[0]).nama}</strong>.</p>
        </div>
      </div>
    )
  }
  const label = def.kode === 'perantim' ? 'Peran utama Anda dalam tim' : 'Dimensi paling menonjol'
  return (
    <>
      <p className="rpt-label">{label}</p>
      <p className="rpt-besar" style={{ marginTop: '4px' }}>{dim(urut[0][0]).nama} & {dim(urut[1][0]).nama}</p>
      <p className="rpt-ket">{dim(urut[0][0]).sub} · {dim(urut[1][0]).sub}</p>
      <StatHero items={urut.slice(0, 3).map(([k, v], i) => ({ label: `#${i + 1} ${dim(k).nama}`, nilai: v, ket: LABEL_TINGKAT[tingkat(v)] }))} />
    </>
  )
}

/** Kartu satu dimensi pada laporan lengkap. */
function KartuDimensi({ d, nilai, children }) {
  return (
    <Kartu ikon={<span style={{ width: 12, height: 12, borderRadius: 99, background: d.warna }} />} judul={d.nama} sub={`${d.sub} · skor ${nilai}`} aksen={d.warna}>
      {children}
    </Kartu>
  )
}

/** Isi berbayar. */
function LaporanLengkap({ def, skor }) {
  const urut = urutkan(skor)
  const dim = k => def.dimensi[k]
  const kolom = { display: 'flex', flexDirection: 'column', gap: '14px' }

  if (def.kode === 'riasec') {
    const tiga = def.kodeMinat(skor).split('')
    const karir = [...new Set(tiga.flatMap(k => dim(k).karir.slice(0, 4)))]
    return (
      <div style={kolom}>
        {tiga.map(k => (
          <KartuDimensi key={k} d={dim(k)} nilai={skor[k]}>
            <p className="rpt-teks">{dim(k).desk}</p>
            <div style={{ marginTop: '14px' }}>
              <Poin judul="Kekuatan yang menyertai" items={dim(k).kekuatan} warna={dim(k).warna} />
              <Poin judul="Bidang karier yang selaras" items={dim(k).karir} warna={dim(k).warna} />
            </div>
          </KartuDimensi>
        ))}
        <Kartu ikon="🧭" judul="Arah eksplorasi karier" sub={`Kode ${tiga.join('')}`}>
          <p className="rpt-teks">
            Minat terkuat Anda adalah {tiga.map(k => dim(k).nama).join(', ')}. Pekerjaan yang paling memuaskan biasanya memadukan ketiganya. Bidang berikut layak dijajaki lebih lanjut:
          </p>
          <div className="rpt-chips" style={{ margin: '14px 0' }}>
            {karir.map(k => <Chip key={k} warna={def.warna} besar>{k}</Chip>)}
          </div>
          <Sorot judul="Langkah berikutnya" warna={def.warna}>
            Minat bukan satu-satunya penentu kecocokan karier. Padukan hasil ini dengan kemampuan, nilai-nilai pribadi, dan pengalaman nyata, misalnya magang atau berbincang dengan praktisi di bidang tersebut.
          </Sorot>
        </Kartu>
      </div>
    )
  }

  if (def.kode === 'resiliensi') {
    const perluDikuatkan = urut.filter(([, v]) => v < 67).reverse()
    const daftar = perluDikuatkan.length ? perluDikuatkan : urut.slice(-1)
    return (
      <div style={kolom}>
        <Kartu ikon="💪" judul="Kekuatan resiliensi Anda" aksen="#16a34a">
          <p className="rpt-teks">
            Aspek terkuat Anda adalah <strong>{dim(urut[0][0]).nama}</strong>. {dim(urut[0][0]).narasi[tingkat(urut[0][1])]} Manfaatkan kekuatan ini sebagai pijakan saat menguatkan aspek lainnya.
          </p>
        </Kartu>
        {daftar.map(([k, v]) => (
          <KartuDimensi key={k} d={dim(k)} nilai={v}>
            <p className="rpt-teks">{dim(k).desk}</p>
            <div style={{ marginTop: '14px' }}>
              <Poin judul="Langkah yang dapat dicoba" items={dim(k).saran} warna={dim(k).warna} />
            </div>
          </KartuDimensi>
        ))}
      </div>
    )
  }

  if (def.kode === 'perantim') {
    const utama = urut.slice(0, 3)
    const kurang = urut.slice(-2)
    const lemah = dim(kurang[1][0])
    return (
      <div style={kolom}>
        {utama.map(([k, v]) => (
          <KartuDimensi key={k} d={dim(k)} nilai={v}>
            <p className="rpt-teks">{dim(k).desk}</p>
            <div className="rpt-grid-2" style={{ marginTop: '14px' }}>
              <Poin judul="Kontribusi khas" items={dim(k).kekuatan} warna="#16a34a" />
              <Poin judul="Perlu diwaspadai" items={dim(k).tantangan} warna="#d97706" />
            </div>
            <div style={{ marginTop: '14px' }}>
              <Poin judul="Saran" items={dim(k).saran} warna={dim(k).warna} />
            </div>
          </KartuDimensi>
        ))}
        <Kartu ikon="🧩" judul="Peran yang perlu dilengkapi rekan">
          <p className="rpt-teks">
            Peran yang paling jarang Anda ambil adalah <strong>{lemah.nama}</strong> dan <strong>{dim(kurang[0][0]).nama}</strong>.
            Tim yang seimbang membutuhkan semua peran, jadi bekerjalah bersama rekan yang kuat di peran tersebut, terutama untuk {lemah.desk.charAt(0).toLowerCase() + lemah.desk.slice(1)}
          </p>
        </Kartu>
      </div>
    )
  }

  // Big Five
  const karir = [...new Set(urut.slice(0, 2).flatMap(([k]) => dim(k).karir))]
  return (
    <div style={kolom}>
      {urut.map(([k, v]) => (
        <KartuDimensi key={k} d={dim(k)} nilai={v}>
          <p className="rpt-teks">{dim(k).narasi[tingkat(v)]}</p>
          <div className="rpt-grid-2" style={{ marginTop: '14px' }}>
            {tingkat(v) !== 'rendah' && <Poin judul="Kekuatan" items={dim(k).kekuatan} warna="#16a34a" />}
            {tingkat(v) === 'tinggi' && <Poin judul="Perlu diwaspadai" items={dim(k).tantangan} warna="#d97706" />}
          </div>
          <div style={{ marginTop: '14px' }}>
            <Sorot judul="Saran pengembangan" warna={dim(k).warna}>
              <Poin items={dim(k).saran} warna={dim(k).warna} />
            </Sorot>
          </div>
        </KartuDimensi>
      ))}
      <Kartu ikon="💼" judul="Bidang kerja yang selaras" sub={`Berdasarkan ${dim(urut[0][0]).nama} dan ${dim(urut[1][0]).nama}`}>
        <div className="rpt-chips">
          {karir.map(k => <Chip key={k} warna={def.warna} besar>{k}</Chip>)}
        </div>
      </Kartu>
    </div>
  )
}

export default function HasilBaru({ kode }) {
  const def = TES_BARU[kode]
  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state?.skor) return <TanpaData onKembali={() => navigate(def.route)} />

  const { skor, jawaban, nama, email, pesertaId, fromDashboard } = state
  const catatanPola = jawaban ? cekPolaJawaban(def, jawaban, skor) : null
  const laporan = <LaporanLengkap def={def} skor={skor} />
  const [g1, g2] = GRADIEN[def.kode] || ['#4f46e5', '#7c3aed']
  const keBelakang = () => navigate(fromDashboard ? '/dashboard' : '/')

  return (
    <LaporanPage bar={<LaporanBar kembali={fromDashboard ? '← Dashboard' : null} onKembali={keBelakang} />}>
      <LaporanHero tes={def.singkat} sub={def.judul} nama={nama} tersimpan={!!pesertaId} warna={g1} warna2={g2} watermark={WATERMARK[def.kode]?.(def, skor)}>
        <Sorotan def={def} skor={skor} />
      </LaporanHero>

      {catatanPola && (
        <Sorot judul="Catatan pola jawaban" warna="#b45309">{catatanPola}</Sorot>
      )}

      <Kartu no={1} ikon={IKON[def.kode]} judul="Profil skor Anda" sub={`${def.sub} · skala 0–100`} aksen={g1}>
        <div style={{ margin: '0 0 24px' }}>
          <Radar warna={g1} data={Object.entries(def.dimensi).map(([k, d]) => ({ label: d.nama, nilai: skor[k] ?? 0, warna: d.warna }))} />
        </div>
        {Object.entries(def.dimensi).map(([k, d]) => {
          const v = skor[k] ?? 0
          const t = tingkat(v)
          return (
            <BarisSkor key={k} label={d.nama} sub={d.sub} nilai={v} warna={d.warna} lencana={LABEL_TINGKAT[t]} ket={d.narasi[t]} />
          )
        })}
      </Kartu>

      {fromDashboard ? laporan : (
        <PaymentGate testType={def.testType} pesertaId={pesertaId} nama={nama} email={email}>
          {laporan}
        </PaymentGate>
      )}

      <Catatan>
        Tes ini berstatus beta: disusun berdasarkan teori psikologi yang mapan, dan kualitas pengukurannya masih terus dikaji seiring bertambahnya data.
        Hasil menggambarkan kecenderungan saat Anda mengerjakan tes, bukan diagnosis, dan sebaiknya tidak dijadikan dasar tunggal keputusan penting. Hasil bersifat rahasia.
      </Catatan>

      <AksiBawah kembali={fromDashboard ? 'Dashboard' : 'Beranda'} onKembali={keBelakang} />
    </LaporanPage>
  )
}
