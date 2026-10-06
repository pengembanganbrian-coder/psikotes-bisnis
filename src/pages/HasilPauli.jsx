import { useLocation, useNavigate } from 'react-router-dom'
import PaymentGate from '../components/PaymentGate'
import { LaporanPage, LaporanBar, LaporanHero, Kartu, StatHero, Sorot, Chip, Catatan, AksiBawah, TanpaData } from '../components/Laporan'
import { NARASI_PAULI } from '../kemampuan/pauli'

const WARNA_KATEGORI = {
  'Sangat teliti': '#16a34a', Teliti: '#16a34a', 'Cukup teliti': '#d97706', 'Kurang teliti': '#dc2626',
  'Sangat stabil': '#16a34a', Stabil: '#16a34a', 'Cukup stabil': '#d97706', 'Naik-turun': '#dc2626',
  'Bertahan / meningkat': '#16a34a', 'Sedikit menurun': '#16a34a', Menurun: '#d97706', 'Menurun tajam': '#dc2626',
}

/** Grafik kerja: jumlah soal per menit, bagian merah = salah. */
function GrafikKerja({ interval }) {
  const maks = Math.max(1, ...interval.map(i => i.jumlah))
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '180px', padding: '0 4px' }}>
        {interval.map((iv, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', height: '100%', justifyContent: 'flex-end' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-sub)', fontVariantNumeric: 'tabular-nums' }}>{iv.jumlah}</span>
            <div style={{ width: '100%', maxWidth: '36px', height: `${(iv.jumlah / maks) * 140}px`, display: 'flex', flexDirection: 'column', borderRadius: '6px 6px 0 0', overflow: 'hidden', background: 'var(--accent)' }}>
              {iv.salah > 0 && <div style={{ height: `${(iv.salah / iv.jumlah) * 100}%`, background: '#dc2626' }} />}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '6px', padding: '6px 4px 0', borderTop: '1px solid var(--border)' }}>
        {interval.map((_, i) => <span key={i} style={{ flex: 1, textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)' }}>{i + 1}</span>)}
      </div>
      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
        Menit ke-1 sampai ke-{interval.length}. Biru = jawaban benar, merah = salah.
      </p>
    </div>
  )
}

function Aspek({ judul, kategori, angka, teks }) {
  return (
    <div style={{ padding: '14px 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
        <p style={{ fontWeight: 700, color: 'var(--text)', fontSize: '15px' }}>{judul}</p>
        {kategori && <Chip warna={WARNA_KATEGORI[kategori]}>{kategori}</Chip>}
      </div>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>{angka}</p>
      <p style={{ fontSize: '14px', color: 'var(--text-sub)', lineHeight: 1.65 }}>{teks}</p>
    </div>
  )
}

function LaporanLengkapPauli({ skor }) {
  const { ketelitian, keajegan, ketahanan } = skor
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Kartu ikon="📈" judul="Grafik kerja per menit" sub="Pola kecepatan dan kesalahan sepanjang tes">
        <GrafikKerja interval={skor.interval} />
      </Kartu>
      <Kartu ikon="🧮" judul="Empat aspek kerja">
        <Aspek judul="Kecepatan kerja" kategori={null} angka={`Rata-rata ${skor.kecepatan} soal per menit`}
          teks="Kecepatan menunjukkan seberapa cepat Anda memproses tugas sederhana. Kategori kecepatan akan ditambahkan setelah norma peserta AssesIN cukup; untuk sekarang, bandingkan dengan hasil latihan Anda sebelumnya." />
        <Aspek judul="Ketelitian" kategori={ketelitian.kategori} angka={`${ketelitian.persenSalah}% jawaban salah (${skor.salah} dari ${skor.total})`}
          teks={NARASI_PAULI.ketelitian[ketelitian.kategori]} />
        <Aspek judul="Keajegan (kestabilan ritme)" kategori={keajegan.kategori} angka={`Selisih menit tercepat dan terlambat ${keajegan.rentang} soal · variasi ${keajegan.cv}%`}
          teks={NARASI_PAULI.keajegan[keajegan.kategori]} />
        <Aspek judul="Ketahanan kerja" kategori={ketahanan.kategori} angka={`3 menit terakhir ${ketahanan.perubahan >= 0 ? '+' : ''}${ketahanan.perubahan}% dibanding 3 menit pertama`}
          teks={NARASI_PAULI.ketahanan[ketahanan.kategori]} />
      </Kartu>
      <Kartu ikon="💡" judul="Saran latihan">
        <Sorot judul="Yang bisa Anda lakukan">
          Latih tes ini beberapa kali dengan jeda beberapa hari. Targetkan ketelitian di atas 95% lebih dulu, lalu naikkan kecepatan sedikit demi sedikit.
          Pada tes kertas yang sebenarnya, jaga tempo yang sama sejak menit pertama agar grafik tetap rata dan tenaga tidak habis di akhir.
        </Sorot>
      </Kartu>
    </div>
  )
}

export default function HasilPauli() {
  const { state } = useLocation()
  const navigate = useNavigate()
  if (!state?.skor) return <TanpaData onKembali={() => navigate('/tes-pauli')} />

  const { skor, nama, email, pesertaId, fromDashboard } = state
  const keBelakang = () => navigate(fromDashboard ? '/dashboard' : '/kemampuan')
  const laporan = <LaporanLengkapPauli skor={skor} />

  return (
    <LaporanPage bar={<LaporanBar kembali={fromDashboard ? '← Dashboard' : '← Tes Kemampuan'} onKembali={keBelakang} />}>
      <LaporanHero tes="Pauli Digital" sub="Tes ganjil-genap 10 menit" nama={nama} tersimpan={!!pesertaId} warna="#0f766e" warna2="#4f46e5" watermark="PAULI">
        <p className="rpt-label">Jumlah soal dikerjakan</p>
        <p className="rpt-besar">{skor.total}</p>
        <StatHero items={[
          { label: 'Benar', nilai: skor.benar },
          { label: 'Salah', nilai: `${skor.ketelitian.persenSalah}%` },
          { label: 'Per menit', nilai: skor.kecepatan },
        ]} />
      </LaporanHero>

      <Kartu no={1} ikon="🎯" judul="Ringkasan">
        <p style={{ fontSize: '14px', color: 'var(--text-sub)', lineHeight: 1.7 }}>
          Ketelitian Anda tergolong <strong>{skor.ketelitian.kategori.toLowerCase()}</strong>. Laporan lengkap memuat grafik kerja per menit
          serta penilaian keajegan dan ketahanan kerja — dua aspek yang paling diperhatikan asesor pada tes Pauli dan Kraepelin.
        </p>
      </Kartu>

      {fromDashboard ? laporan : (
        <PaymentGate testType="Pauli" pesertaId={pesertaId} nama={nama} email={email}>{laporan}</PaymentGate>
      )}

      <Catatan>
        Tes ini adalah latihan versi digital dengan aturan ganjil-genap, bukan tes Pauli resmi. Kategori yang dipakai adalah kriteria sementara AssesIN,
        belum norma baku, sehingga hasilnya sebaiknya dipakai untuk memantau perkembangan latihan Anda sendiri.
      </Catatan>

      <AksiBawah kembali={fromDashboard ? 'Dashboard' : 'Tes Kemampuan'} onKembali={keBelakang} ulang={fromDashboard ? null : 'Ulangi tes'} onUlang={() => navigate('/tes-pauli')} />
    </LaporanPage>
  )
}
