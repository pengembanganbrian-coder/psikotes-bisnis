import { useNavigate, useLocation } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'
import { TES_BARU, tingkat, LABEL_TINGKAT, cekPolaJawaban } from '../tes-baru/definisi'

// Halaman hasil bersama untuk Big Five, RIASEC, Resiliensi, Peran dalam
// Tim. Bagian gratis: profil skor + interpretasi singkat. Bagian
// berbayar (PaymentGate): kekuatan, tantangan, saran pengembangan, dan
// arah karier.

const CARD_TITLE = { fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-sub)' }
const BTN = { fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: '10px', cursor: 'pointer' }

function Daftar({ judul, items, warna }) {
  if (!items?.length) return null
  return (
    <div style={{ marginTop: '12px' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: warna, marginBottom: '6px' }}>{judul}</p>
      <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7' }}>
        {items.map(t => <li key={t}>{t}</li>)}
      </ul>
    </div>
  )
}

function urutkan(skor) {
  return Object.entries(skor).sort((a, b) => b[1] - a[1])
}

/** Ringkasan utama (gratis) sesuai jenis tes. */
function Sorotan({ def, skor }) {
  const urut = urutkan(skor)
  const dim = k => def.dimensi[k]
  let label, nilai, ket
  if (def.kode === 'riasec') {
    const kode = def.kodeMinat(skor)
    label = 'Kode Minat Karier'
    nilai = kode
    ket = kode.split('').map(k => dim(k).nama).join(' · ')
  } else if (def.kode === 'resiliensi') {
    const total = def.total(skor)
    label = 'Indeks Resiliensi'
    nilai = `${total}`
    ket = `Tingkat ${LABEL_TINGKAT[tingkat(total)].toLowerCase()} · skala 0–100`
  } else if (def.kode === 'perantim') {
    label = 'Peran Utama dalam Tim'
    nilai = `${dim(urut[0][0]).nama} & ${dim(urut[1][0]).nama}`
    ket = `${dim(urut[0][0]).sub} · ${dim(urut[1][0]).sub}`
  } else {
    label = 'Dimensi Paling Menonjol'
    nilai = `${dim(urut[0][0]).nama} & ${dim(urut[1][0]).nama}`
    ket = `${dim(urut[0][0]).sub} · ${dim(urut[1][0]).sub}`
  }
  return (
    <div className="dark-card" style={{ padding: '20px 24px', borderColor: def.warna + '55', background: def.warna + '0d' }}>
      <p style={{ ...CARD_TITLE, color: 'var(--text-muted)', fontSize: '10px', marginBottom: '6px' }}>{label}</p>
      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '22px', color: def.warna }}>{nilai}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>{ket}</p>
    </div>
  )
}

/** Isi berbayar. */
function LaporanLengkap({ def, skor }) {
  const urut = urutkan(skor)
  const dim = k => def.dimensi[k]
  const kartu = (k, isi) => (
    <div key={k} className="dark-card" style={{ padding: '20px 24px', borderColor: dim(k).warna + '44' }}>
      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', color: dim(k).warna }}>{dim(k).nama}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '2px' }}>{dim(k).sub} · skor {skor[k]}</p>
      {isi}
    </div>
  )

  if (def.kode === 'riasec') {
    const tiga = def.kodeMinat(skor).split('')
    const karir = [...new Set(tiga.flatMap(k => dim(k).karir.slice(0, 4)))]
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={CARD_TITLE}>Tiga Minat Utama Anda</p>
        {tiga.map(k => kartu(k, <>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>{dim(k).desk}</p>
          <Daftar judul="Kekuatan yang menyertai" items={dim(k).kekuatan} warna={dim(k).warna} />
          <Daftar judul="Bidang karier yang selaras" items={dim(k).karir} warna={dim(k).warna} />
        </>))}
        <div className="dark-card" style={{ padding: '20px 24px' }}>
          <p style={CARD_TITLE}>Arah Eksplorasi Karier</p>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>
            Kode <strong>{tiga.join('')}</strong> berarti minat terkuat Anda adalah {tiga.map(k => dim(k).nama).join(', ')}.
            Pekerjaan yang paling memuaskan biasanya memadukan ketiganya. Bidang berikut layak dijajaki lebih lanjut:
          </p>
          <Daftar judul="Bidang untuk dijajaki" items={karir} warna={def.warna} />
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: '1.6', marginTop: '12px' }}>
            Minat bukan satu-satunya penentu kecocokan karier. Padukan hasil ini dengan kemampuan, nilai-nilai pribadi, dan pengalaman nyata, misalnya magang atau berbincang dengan praktisi di bidang tersebut.
          </p>
        </div>
      </div>
    )
  }

  if (def.kode === 'resiliensi') {
    const perluDikuatkan = urut.filter(([, v]) => v < 67).reverse()
    const daftar = perluDikuatkan.length ? perluDikuatkan : urut.slice(-1)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={CARD_TITLE}>Rencana Penguatan Resiliensi</p>
        {daftar.map(([k]) => kartu(k, <>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>{dim(k).desk}</p>
          <Daftar judul="Langkah yang dapat dicoba" items={dim(k).saran} warna={dim(k).warna} />
        </>))}
        <div className="dark-card" style={{ padding: '20px 24px' }}>
          <p style={CARD_TITLE}>Kekuatan Resiliensi Anda</p>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>
            Aspek terkuat Anda adalah <strong>{dim(urut[0][0]).nama}</strong>. {dim(urut[0][0]).narasi[tingkat(urut[0][1])]} Manfaatkan kekuatan ini sebagai pijakan saat menguatkan aspek lainnya.
          </p>
        </div>
      </div>
    )
  }

  if (def.kode === 'perantim') {
    const utama = urut.slice(0, 3)
    const kurang = urut.slice(-2)
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={CARD_TITLE}>Tiga Peran Terkuat Anda</p>
        {utama.map(([k]) => kartu(k, <>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>{dim(k).desk}</p>
          <Daftar judul="Kontribusi khas" items={dim(k).kekuatan} warna="#4ade80" />
          <Daftar judul="Yang perlu diwaspadai" items={dim(k).tantangan} warna="#fbbf24" />
          <Daftar judul="Saran" items={dim(k).saran} warna={dim(k).warna} />
        </>))}
        <div className="dark-card" style={{ padding: '20px 24px' }}>
          <p style={CARD_TITLE}>Peran yang Perlu Dilengkapi Rekan</p>
          <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>
            Peran yang paling jarang Anda ambil adalah <strong>{dim(kurang[1][0]).nama}</strong> dan <strong>{dim(kurang[0][0]).nama}</strong>.
            Tim yang seimbang membutuhkan semua peran, jadi bekerjalah bersama rekan yang kuat di peran tersebut, terutama untuk {dim(kurang[1][0]).desk.charAt(0).toLowerCase() + dim(kurang[1][0]).desk.slice(1)}
          </p>
        </div>
      </div>
    )
  }

  // Big Five
  const karir = [...new Set(urut.slice(0, 2).flatMap(([k]) => dim(k).karir))]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <p style={CARD_TITLE}>Profil Lengkap per Dimensi</p>
      {urut.map(([k, v]) => kartu(k, <>
        <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>{dim(k).narasi[tingkat(v)]}</p>
        {tingkat(v) !== 'rendah' && <Daftar judul="Kekuatan" items={dim(k).kekuatan} warna="#4ade80" />}
        {tingkat(v) === 'tinggi' && <Daftar judul="Yang perlu diwaspadai" items={dim(k).tantangan} warna="#fbbf24" />}
        <Daftar judul="Saran pengembangan" items={dim(k).saran} warna={dim(k).warna} />
      </>))}
      <div className="dark-card" style={{ padding: '20px 24px' }}>
        <p style={CARD_TITLE}>Lingkungan & Bidang Kerja yang Selaras</p>
        <p style={{ color: 'var(--text-sub)', fontSize: '13px', lineHeight: '1.7', marginTop: '8px' }}>
          Berdasarkan dua dimensi Anda yang paling menonjol ({dim(urut[0][0]).nama} dan {dim(urut[1][0]).nama}), bidang berikut cenderung memberi ruang bagi kekuatan Anda:
        </p>
        <Daftar judul="Bidang untuk dijajaki" items={karir} warna={def.warna} />
      </div>
    </div>
  )
}

export default function HasilBaru({ kode }) {
  const def = TES_BARU[kode]
  const navigate = useNavigate()
  const { state } = useLocation()

  if (!state?.skor) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="dark-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Data hasil tidak ditemukan. Silakan kerjakan tes terlebih dahulu.</p>
          <button onClick={() => navigate(def.route)} style={{ ...BTN, background: 'var(--accent)', color: '#09090f', border: 'none' }}>Kembali ke Tes</button>
        </div>
      </div>
    )
  }

  const { skor, jawaban, nama, email, pesertaId, fromDashboard } = state
  const tanggal = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  const catatanPola = jawaban ? cekPolaJawaban(def, jawaban, skor) : null
  const laporan = <LaporanLengkap def={def} skor={skor} />

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '48px' }}>
      <div style={{ background: 'rgba(9,9,15,0.97)', borderBottom: '1px solid var(--border)', padding: '28px var(--px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          <div className="section-rule print-hide" style={{ marginBottom: '20px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Laporan {def.singkat}</span><span className="section-rule-line" />
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '26px', color: 'var(--text)', marginBottom: '6px' }}>{def.judul}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '14px' }}>{def.sub}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ color: 'var(--text-sub)', fontSize: '13px' }}>👤 <strong style={{ color: 'var(--text)' }}>{nama}</strong></span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>📅 {tanggal}</span>
            {pesertaId && <span style={{ color: 'var(--accent)', fontSize: '12px', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>✓ Tersimpan</span>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px var(--px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Sorotan def={def} skor={skor} />

        {catatanPola && (
          <div className="dark-card" style={{ padding: '14px 20px', borderColor: 'rgba(251,191,36,0.4)', background: 'rgba(251,191,36,0.06)' }}>
            <p style={{ color: '#fbbf24', fontSize: '13px', lineHeight: '1.6' }}>⚠ {catatanPola}</p>
          </div>
        )}

        <div className="dark-card" style={{ padding: '20px 24px' }}>
          <p style={{ ...CARD_TITLE, marginBottom: '16px' }}>Profil Skor</p>
          {Object.entries(def.dimensi).map(([k, d]) => {
            const v = skor[k] ?? 0
            const t = tingkat(v)
            return (
              <div key={k} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                  <p style={{ color: 'var(--text)', fontSize: '14px', fontWeight: 600 }}>{d.nama} <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '12px' }}>· {d.sub}</span></p>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', color: d.warna, whiteSpace: 'nowrap' }}>{v} <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)' }}>{LABEL_TINGKAT[t]}</span></p>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden', margin: '6px 0' }}>
                  <div style={{ height: '100%', background: d.warna, borderRadius: '99px', width: `${v}%`, transition: 'width 0.7s' }} />
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '12.5px', lineHeight: '1.6' }}>{d.narasi[t]}</p>
              </div>
            )
          })}
        </div>

        {fromDashboard ? laporan : (
          <PaymentGate testType={def.testType} pesertaId={pesertaId} nama={nama} email={email}>
            {laporan}
          </PaymentGate>
        )}

        <div className="dark-card" style={{ padding: '20px 24px', borderColor: 'var(--accent-border)', background: 'rgba(212,168,83,0.04)' }}>
          <h4 style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Catatan Penting</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.7' }}>
            Tes ini berstatus <strong style={{ color: 'var(--text-sub)' }}>beta</strong>: disusun berdasarkan teori psikologi yang mapan, dan kualitas pengukurannya masih terus dikaji seiring bertambahnya data.
            Hasil menggambarkan kecenderungan saat Anda mengerjakan tes, bukan diagnosis, dan sebaiknya tidak dijadikan dasar tunggal keputusan penting.
            Hasil bersifat <strong style={{ color: 'var(--text-sub)' }}>rahasia</strong>.
          </p>
        </div>

        <div className="print-hide" style={{ textAlign: 'center', paddingTop: '8px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => navigate(fromDashboard ? '/dashboard' : '/')} style={{ ...BTN, background: 'var(--surface-2)', color: 'var(--text-sub)', border: '1px solid var(--border)' }}>
            ← {fromDashboard ? 'Dashboard' : 'Beranda'}
          </button>
          <button onClick={() => window.print()} style={{ ...BTN, background: 'var(--accent)', color: '#09090f', border: 'none' }}>🖨️ Cetak / PDF</button>
        </div>
      </div>
    </div>
  )
}
