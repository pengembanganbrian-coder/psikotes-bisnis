import { useLocation, useNavigate } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'
import { LaporanPage, LaporanBar, LaporanHero, Kartu, BarisSkor, Cincin, Sorot, Chip, Catatan, AksiBawah, TanpaData } from '../components/Laporan'
import { TampilSoal, TampilOpsi } from '../components/SoalKognitif'
import { SUBTES, kategoriKognitif } from '../kemampuan/kognitif'

const KEGUNAAN = {
  DA: 'kemampuan numerik dan menemukan pola angka — dipakai saat membaca data, anggaran, atau target.',
  AV: 'pemahaman verbal dan hubungan antarkonsep — dipakai saat memahami instruksi, menulis, dan berkomunikasi.',
  PL: 'penalaran deduktif — menarik kesimpulan yang sah dari informasi yang ada tanpa menambah asumsi.',
  MF: 'penalaran abstrak nonverbal — menemukan aturan dari pola visual, sering dikaitkan dengan kemampuan belajar hal baru.',
}

const persen = s => Math.round((s.benar / s.dari) * 100)

function Pembahasan({ jawaban }) {
  return SUBTES.map(st => (
    <Kartu key={st.kode} ikon="📝" judul={`Pembahasan ${st.nama}`}>
      {st.soal.map((soal, i) => {
        const pilih = jawaban?.[soal.id]
        const benar = pilih === soal.kunci
        return (
          <div key={soal.id} style={{ padding: '16px 0', borderTop: i ? '1px solid var(--border)' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <p style={{ fontWeight: 700, color: 'var(--text)' }}>Soal {i + 1}</p>
              <Chip warna={benar ? '#16a34a' : pilih === undefined ? '#64748b' : '#dc2626'}>
                {benar ? 'Benar' : pilih === undefined ? 'Tidak dijawab' : 'Salah'}
              </Chip>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}><TampilSoal soal={soal} /></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '14px', color: 'var(--text-sub)', marginBottom: '8px' }}>
              <span>Jawaban benar: <strong style={{ color: '#16a34a' }}>{'ABCDE'[soal.kunci]}</strong></span>
              <TampilOpsi soal={soal} opsi={soal.opsi[soal.kunci]} />
              {!benar && pilih !== undefined && (
                <span style={{ marginLeft: '8px' }}>· Jawaban Anda: <strong style={{ color: '#dc2626' }}>{'ABCDE'[pilih]}</strong></span>
              )}
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-sub)', lineHeight: 1.65 }}>{soal.bahas}</p>
          </div>
        )
      })}
    </Kartu>
  ))
}

function LaporanLengkapKognitif({ skor, jawaban }) {
  const urut = SUBTES.map(st => ({ ...st, ...skor.subtes[st.kode] })).sort((a, b) => persen(b) - persen(a))
  const kuat = urut[0], lemah = urut.at(-1)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Kartu ikon="💪" judul="Kekuatan & area latihan">
        <Sorot judul={`Paling kuat: ${kuat.nama}`}>Subtes ini mengukur {KEGUNAAN[kuat.kode]}</Sorot>
        {persen(lemah) < persen(kuat) && (
          <div style={{ marginTop: '12px' }}>
            <Sorot judul={`Paling perlu dilatih: ${lemah.nama}`} warna="#d97706">
              Subtes ini mengukur {KEGUNAAN[lemah.kode]} Pelajari pembahasan di bawah, lalu ulangi tes beberapa hari kemudian untuk melihat perkembangannya.
            </Sorot>
          </div>
        )}
      </Kartu>
      {jawaban ? <Pembahasan jawaban={jawaban} /> : (
        <Kartu ikon="📝" judul="Pembahasan soal"><p style={{ color: 'var(--text-muted)' }}>Jawaban untuk hasil ini tidak tersimpan.</p></Kartu>
      )}
    </div>
  )
}

export default function HasilKognitif() {
  const { state } = useLocation()
  const navigate = useNavigate()
  if (!state?.skor) return <TanpaData onKembali={() => navigate('/tes-kognitif')} />

  const { skor, jawaban, nama, email, pesertaId, fromDashboard } = state
  const keBelakang = () => navigate(fromDashboard ? '/dashboard' : '/kemampuan')
  const laporan = <LaporanLengkapKognitif skor={skor} jawaban={jawaban} />

  return (
    <LaporanPage bar={<LaporanBar kembali={fromDashboard ? '← Dashboard' : '← Tes Kemampuan'} onKembali={keBelakang} />}>
      <LaporanHero tes="Tes Kemampuan Kognitif" sub="Numerik · Verbal · Logika · Figural" nama={nama} tersimpan={!!pesertaId} warna="#1d4ed8" warna2="#7c3aed" watermark="IQ">
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap' }}>
          <Cincin nilai={skor.persen} terang ukuran={120} tampil={`${skor.benar}/${skor.dari}`} label="benar" />
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p className="rpt-label">Kategori sementara</p>
            <p className="rpt-besar">{skor.kategori}</p>
            <p className="rpt-ket">{skor.persen}% jawaban benar dari {skor.dari} soal.</p>
          </div>
        </div>
      </LaporanHero>

      <Kartu no={1} ikon="📊" judul="Skor per subtes">
        {SUBTES.map(st => {
          const s = skor.subtes[st.kode]
          return (
            <BarisSkor key={st.kode} label={st.nama} nilai={s.benar} maks={s.dari} tampil={`${s.benar}/${s.dari}`}
              warna="var(--accent)" lencana={kategoriKognitif(persen(s))} />
          )
        })}
      </Kartu>

      {fromDashboard ? laporan : (
        <PaymentGate testType="Kognitif" pesertaId={pesertaId} nama={nama} email={email}>{laporan}</PaymentGate>
      )}

      <Catatan>
        Ini latihan kemampuan kognitif dengan soal buatan AssesIN, bukan tes IQ resmi, sehingga hasilnya tidak dinyatakan sebagai skor IQ.
        Kategori memakai persentase jawaban benar sebagai kriteria sementara sampai norma peserta tersedia.
      </Catatan>

      <AksiBawah kembali={fromDashboard ? 'Dashboard' : 'Tes Kemampuan'} onKembali={keBelakang} ulang={fromDashboard ? null : 'Ulangi tes'} onUlang={() => navigate('/tes-kognitif')} />
    </LaporanPage>
  )
}
