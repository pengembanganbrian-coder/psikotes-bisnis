import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Logo from '../components/Logo'
import PaymentGate from '../components/PaymentGate'

/* ── Tabel norma DASS-21 (skor sudah dikali 2) ──────────────────── */
function getKategori(skala, skor) {
  const tabel = {
    D: [
      { max: 9,  label: 'Normal',       warna: 'emerald' },
      { max: 13, label: 'Ringan',       warna: 'lime'    },
      { max: 20, label: 'Sedang',       warna: 'amber'   },
      { max: 27, label: 'Berat',        warna: 'orange'  },
      { max: 42, label: 'Sangat Berat', warna: 'rose'    },
    ],
    A: [
      { max: 7,  label: 'Normal',       warna: 'emerald' },
      { max: 9,  label: 'Ringan',       warna: 'lime'    },
      { max: 14, label: 'Sedang',       warna: 'amber'   },
      { max: 19, label: 'Berat',        warna: 'orange'  },
      { max: 42, label: 'Sangat Berat', warna: 'rose'    },
    ],
    S: [
      { max: 14, label: 'Normal',       warna: 'emerald' },
      { max: 18, label: 'Ringan',       warna: 'lime'    },
      { max: 25, label: 'Sedang',       warna: 'amber'   },
      { max: 33, label: 'Berat',        warna: 'orange'  },
      { max: 42, label: 'Sangat Berat', warna: 'rose'    },
    ],
  }
  return tabel[skala].find(t => skor <= t.max) ?? tabel[skala].at(-1)
}

const severityOrder = ['Normal', 'Ringan', 'Sedang', 'Berat', 'Sangat Berat']

/* ── Informasi per skala ──────────────────────────────────────────── */
const skalaInfo = {
  D: {
    nama: 'Depresi',
    emoji: '💙',
    thresholds: 'Normal: 0–9 · Ringan: 10–13 · Sedang: 14–20 · Berat: 21–27 · Sangat Berat: ≥28',
    narasi: {
      Normal:
        'Tidak menunjukkan gejala depresi yang signifikan. Kondisi afektif dalam batas sehat dan wajar.',
      Ringan:
        'Terdapat beberapa gejala depresi ringan seperti penurunan suasana hati atau berkurangnya antusiasme. Perlu perhatian agar tidak berlanjut.',
      Sedang:
        'Gejala depresi pada tingkat sedang yang dapat mulai mempengaruhi motivasi, energi, dan produktivitas kerja sehari-hari.',
      Berat:
        'Gejala depresi yang cukup intens. Mungkin mengalami kesulitan menjalankan fungsi sehari-hari. Perlu dukungan profesional segera.',
      'Sangat Berat':
        'Gejala depresi yang sangat berat dan sangat mengganggu. Memerlukan penanganan segera dari psikolog atau psikiater.',
    },
  },
  A: {
    nama: 'Kecemasan',
    emoji: '⚡',
    thresholds: 'Normal: 0–7 · Ringan: 8–9 · Sedang: 10–14 · Berat: 15–19 · Sangat Berat: ≥20',
    narasi: {
      Normal:
        'Tidak ada indikasi kecemasan yang signifikan. Respons emosional terhadap situasi sehari-hari tergolong sehat dan proporsional.',
      Ringan:
        'Kecemasan pada tingkat ringan yang masih dapat dikelola sendiri. Perlu strategi koping dan teknik relaksasi yang lebih teratur.',
      Sedang:
        'Kecemasan pada tingkat sedang yang dapat mempengaruhi fokus, pengambilan keputusan, dan interaksi sosial di lingkungan kerja.',
      Berat:
        'Kecemasan yang cukup intens, mungkin disertai gejala fisik. Berdampak pada kualitas kerja dan kesehatan. Perlu intervensi profesional.',
      'Sangat Berat':
        'Kecemasan yang sangat tinggi. Memerlukan penanganan segera dari tenaga kesehatan mental untuk mencegah dampak yang lebih lanjut.',
    },
  },
  S: {
    nama: 'Stres',
    emoji: '🌊',
    thresholds: 'Normal: 0–14 · Ringan: 15–18 · Sedang: 19–25 · Berat: 26–33 · Sangat Berat: ≥34',
    narasi: {
      Normal:
        'Tingkat stres dalam batas yang dapat dikelola. Kemampuan adaptasi terhadap tekanan dan tuntutan pekerjaan tergolong baik.',
      Ringan:
        'Stres pada tingkat ringan. Disarankan memperkuat manajemen waktu, teknik relaksasi, dan keseimbangan antara kerja dan kehidupan pribadi.',
      Sedang:
        'Stres pada tingkat sedang yang dapat mempengaruhi konsentrasi, kreativitas, dan hubungan interpersonal di tempat kerja.',
      Berat:
        'Stres yang cukup tinggi dan berisiko mengganggu kesehatan fisik maupun mental. Perlu dukungan konseling dan evaluasi beban kerja.',
      'Sangat Berat':
        'Stres yang sangat tinggi. Memerlukan penanganan segera, termasuk kemungkinan penyesuaian temporer atas beban dan lingkungan kerja.',
    },
  },
}

/* ── Konfigurasi warna per tingkat keparahan ────────────────────── */
const warnaConfig = {
  emerald: { hex: '#22c55e' },
  lime:    { hex: '#84cc16' },
  amber:   { hex: '#f59e0b' },
  orange:  { hex: '#f97316' },
  rose:    { hex: '#f43f5e' },
}

/* ── Rekomendasi HR per tingkat keparahan tertinggi ─────────────── */
const rekomendasiHR = {
  Normal: {
    label: 'Kondisi Baik',
    icon: '✅',
    warna: 'emerald',
    tindakan: [
      'Pertahankan gaya hidup sehat dan keseimbangan antara kerja dan kehidupan pribadi.',
      'Ikuti program kesejahteraan yang tersedia sebagai pemeliharaan kesehatan mental rutin.',
      'Jadwalkan asesmen ulang secara berkala (minimal 1 tahun sekali).',
    ],
  },
  Ringan: {
    label: 'Perlu Perhatian',
    icon: '👁️',
    warna: 'lime',
    tindakan: [
      'Dorong penerapan teknik relaksasi dan manajemen stres sederhana dalam rutinitas sehari-hari.',
      'Pastikan beban kerja dalam batas wajar dan ada dukungan sosial yang memadai dari rekan kerja.',
      'Lakukan pemantauan kondisi secara berkala dalam 3–6 bulan ke depan.',
    ],
  },
  Sedang: {
    label: 'Perlu Dukungan',
    icon: '🤝',
    warna: 'amber',
    tindakan: [
      'Rekomendasikan sesi konseling atau coaching dengan psikolog atau konselor organisasi.',
      'Tinjau kembali distribusi beban kerja dan kejelasan peran dalam jabatan.',
      'Berikan dukungan sosial aktif dari atasan langsung dan rekan kerja terdekat.',
      'Jadwalkan evaluasi ulang kondisi dalam 1–3 bulan ke depan.',
    ],
  },
  Berat: {
    label: 'Perlu Intervensi',
    icon: '🏥',
    warna: 'orange',
    tindakan: [
      'Segera rujuk ke psikolog atau konselor profesional untuk intervensi terstruktur.',
      'Pertimbangkan penyesuaian sementara atas beban kerja dan tanggung jawab yang diemban.',
      'Aktifkan jaringan dukungan: atasan langsung, rekan kerja, serta keluarga.',
      'Lakukan pemantauan intensif dan evaluasi ulang dalam 2–4 minggu ke depan.',
    ],
  },
  'Sangat Berat': {
    label: 'Butuh Penanganan Segera',
    icon: '🚨',
    warna: 'rose',
    tindakan: [
      'Segera rujuk ke tenaga kesehatan mental profesional (psikolog klinis atau psikiater).',
      'Pertimbangkan cuti medis atau pengurangan beban kerja sementara sesuai rekomendasi medis.',
      'Pastikan mendapat dukungan penuh dari keluarga dan lingkungan sosial terdekat.',
      'Koordinasikan dengan tim HR/People dan profesional kesehatan untuk tindak lanjut yang komprehensif.',
    ],
  },
}

/* ════════════════════════════════════════════════════════════════════
   KOMPONEN UTAMA
═══════════════════════════════════════════════════════════════════ */
/* ── Konten premium DASS ────────────────────────────────────── */
function RekomendasiDASS({ rekHR }) {
  const hex = warnaConfig[rekHR.warna]?.hex ?? '#d4a853'
  return (
    <div className="dark-card" style={{ overflow: 'hidden', borderColor: hex + '40' }}>
      <div style={{ background: hex + '14', padding: '16px 24px', borderBottom: `1px solid ${hex}30`, display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span style={{ fontSize: '22px' }}>{rekHR.icon}</span>
        <div>
          <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', color: hex, marginBottom: '4px' }}>Rekomendasi Tindak Lanjut</h3>
          <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, padding: '2px 10px', borderRadius: '99px', background: hex + '22', color: hex, border: `1px solid ${hex}44` }}>
            Status keseluruhan: {rekHR.label}
          </span>
        </div>
      </div>
      <div style={{ padding: '20px 24px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rekHR.tindakan.map((t, i) => (
            <li key={i} style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-sub)', lineHeight: '1.65' }}>
              <span style={{ flexShrink: 0, width: '20px', height: '20px', borderRadius: '99px', background: hex + '22', color: hex, border: `1px solid ${hex}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                {i + 1}
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function HasilDass() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const state     = location.state
  const saved     = useRef(false)
  const [isSaved,   setIsSaved]   = useState(false)
  const [pesertaId, setPesertaId] = useState(state?.pesertaId || null)

  /* Guard: pastikan state tersedia */
  if (!state?.skor) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div className="dark-card" style={{ padding: '40px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '20px' }}>Data hasil tidak ditemukan. Silakan kerjakan tes terlebih dahulu.</p>
          <button onClick={() => navigate('/tes-dass')} style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
            Kembali ke Tes
          </button>
        </div>
      </div>
    )
  }

  const { skor, nama, nip, unitKerja, fromDashboard } = state

  /* Kategorisasi */
  const kD = getKategori('D', skor.D)
  const kA = getKategori('A', skor.A)
  const kS = getKategori('S', skor.S)

  /* Tentukan keparahan tertinggi untuk rekomendasi keseluruhan */
  const allLabels  = [kD.label, kA.label, kS.label]
  const worstIdx   = Math.max(...allLabels.map(l => severityOrder.indexOf(l)))
  const worstLabel = severityOrder[worstIdx]
  const rekHR      = rekomendasiHR[worstLabel]

  /* ── Auto-save ke Supabase (hanya sekali, bukan dari dashboard, bukan jika pesertaId sudah ada) ── */
  useEffect(() => {
    if (fromDashboard || saved.current || state?.pesertaId) return
    saved.current = true

    async function save() {
      const { data: peserta, error: e1 } = await supabase
        .from('peserta_dass')
        .insert({ nama, nip, jabatan: unitKerja })
        .select()
        .single()
      if (e1 || !peserta) return

      const { error: e2 } = await supabase.from('hasil_dass').insert({
        peserta_id:        peserta.id,
        skor_depresi:      skor.D,
        skor_anxietas:     skor.A,
        skor_stres:        skor.S,
        kategori_depresi:  kD.label,
        kategori_anxietas: kA.label,
        kategori_stres:    kS.label,
      })
      if (!e2) {
        setIsSaved(true)
        setPesertaId(peserta.id)
      }
    }
    save()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const tanggal = new Date().toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const skalaData = [
    { key: 'D', skor: skor.D, kat: kD },
    { key: 'A', skor: skor.A, kat: kA },
    { key: 'S', skor: skor.S, kat: kS },
  ]

  /* ════════════════════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════════════════════ */
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '48px' }}>

      {/* Print stylesheet */}
      <style>{`
        @media print {
          .dass-header { background: white !important; border-bottom: 2px solid #a67c00 !important; }
        }
      `}</style>

      {/* Header */}
      <div className="dass-header" style={{ background: 'rgba(9,9,15,0.97)', borderBottom: '1px solid var(--border)', padding: '28px var(--px)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
          <div className="section-rule print-hide" style={{ marginBottom: '20px' }}>
            <span className="section-rule-pip" /><span className="section-rule-label">Laporan DASS-21</span><span className="section-rule-line" />
          </div>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '26px', color: 'var(--text)', marginBottom: '6px' }}>Laporan DASS-21</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '14px' }}>Depression · Anxiety · Stress Scales</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <span style={{ color: 'var(--text-sub)', fontSize: '13px' }}>👤 <strong style={{ color: 'var(--text)' }}>{nama}</strong></span>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>📅 {tanggal}</span>
            {isSaved && <span style={{ color: 'var(--accent)', fontSize: '12px', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>✓ Tersimpan</span>}
          </div>
          <button onClick={() => window.print()} className="print-hide" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
            🖨️ Cetak / PDF
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px var(--px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Print-Only Header */}
        <div className="print-only" style={{ display: 'none', textAlign: 'center', paddingBottom: '20px', borderBottom: '2px solid #a67c00', marginBottom: '4px' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '28px', letterSpacing: '0.22em', color: '#a67c00', marginBottom: '4px' }}>ASSESIN</div>
          <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#888' }}>Platform Asesmen Psikologi Digital · ASSESS · INSIGHT · GROW</div>
          <div style={{ marginTop: '16px', fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '18px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#111' }}>LAPORAN DASS-21</div>
          <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>Depression · Anxiety · Stress Scales</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: '#444', maxWidth: '600px', margin: '8px auto 0' }}>
            <span>Peserta: <strong>{nama}</strong></span>
            <span>Tanggal: {tanggal}</span>
          </div>
        </div>

        {/* Status Keseluruhan */}
        {(() => {
          const hex = warnaConfig[rekHR.warna]?.hex ?? '#d4a853'
          return (
            <div className="dark-card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '32px' }}>{rekHR.icon}</span>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.18em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>Status Kesejahteraan Psikologis</p>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '18px', color: hex }}>{rekHR.label}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
                  D: <strong style={{ color: 'var(--text-sub)' }}>{kD.label}</strong> · A: <strong style={{ color: 'var(--text-sub)' }}>{kA.label}</strong> · S: <strong style={{ color: 'var(--text-sub)' }}>{kS.label}</strong>
                </p>
              </div>
            </div>
          )
        })()}

        {/* Kartu per skala */}
        {skalaData.map(({ key, skor: s, kat }) => {
          const info = skalaInfo[key]
          const hex  = warnaConfig[kat.warna]?.hex ?? '#56566e'
          const pct  = (s / 42) * 100

          return (
            <div key={key} className="dark-card" style={{ overflow: 'hidden', borderColor: hex + '40' }}>
              <div style={{ background: hex + '14', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{info.emoji}</span>
                  <div>
                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '16px', color: hex }}>{info.nama}</h3>
                    <p style={{ fontSize: '10px', color: hex + 'aa', marginTop: '2px' }}>{info.thresholds}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '36px', color: hex, lineHeight: 1 }}>{s}</p>
                  <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', marginTop: '6px', background: hex + '22', color: hex, border: `1px solid ${hex}44` }}>{kat.label}</span>
                </div>
              </div>
              <div style={{ padding: '12px 24px', background: 'var(--surface-2)', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>0</span><span>Normal</span><span>Ringan</span><span>Sedang</span><span>Berat</span><span>42</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', backgroundColor: hex, borderRadius: '99px', width: `${pct}%`, transition: 'width 0.7s' }} />
                </div>
              </div>
              <div style={{ padding: '16px 24px' }}>
                <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: '1.7' }}>{info.narasi[kat.label]}</p>
              </div>
            </div>
          )
        })}

        {fromDashboard ? (
          <RekomendasiDASS rekHR={rekHR} />
        ) : (
          <PaymentGate testType="DASS" pesertaId={pesertaId} nama={nama}>
            <RekomendasiDASS rekHR={rekHR} />
          </PaymentGate>
        )}

        {/* Tabel Ringkasan */}
        <div className="dark-card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '12px 24px', background: 'var(--surface-2)', borderBottom: '1px solid var(--border)' }}>
            <h3 style={{ color: 'var(--text-sub)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Ringkasan Skor</h3>
          </div>
          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Dimensi','Skor Raw','Skor ×2','Maks.','Kategori'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: h === 'Dimensi' ? 'left' : 'center', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skalaData.map(({ key, skor: s, kat }) => {
                const info = skalaInfo[key]
                const hex  = warnaConfig[kat.warna]?.hex ?? '#56566e'
                return (
                  <tr key={key} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--text-sub)' }}>{info.emoji} {info.nama}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>{s / 2}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text)', fontWeight: 700 }}>{s}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: 'var(--text-muted)' }}>42</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '99px', background: hex + '22', color: hex, border: `1px solid ${hex}44` }}>{kat.label}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Catatan Penting */}
        <div className="dark-card" style={{ padding: '20px 24px', borderColor: 'var(--accent-border)', background: 'rgba(212,168,83,0.04)' }}>
          <h4 style={{ color: 'var(--accent)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>Catatan Penting</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.7' }}>
            DASS-21 adalah alat <strong style={{ color: 'var(--text-sub)' }}>skrining psikologis</strong>, bukan instrumen diagnostik klinis.
            Hasil ini mencerminkan kondisi emosional yang dilaporkan dalam 1 minggu terakhir.
            Interpretasi dan tindak lanjut harus dilakukan oleh tenaga profesional yang berwenang.
            Hasil bersifat <strong style={{ color: 'var(--text-sub)' }}>rahasia</strong>.
          </p>
        </div>

        {/* Print-Only Footer */}
        <div className="print-only" style={{ display: 'none', paddingTop: '16px', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: '#777', lineHeight: '1.6' }}>DASS-21 adalah alat skrining psikologis, bukan instrumen diagnostik klinis. Interpretasi akhir harus dilakukan oleh tenaga profesional yang berwenang.</p>
          <p style={{ fontSize: '10px', color: '#bbb', marginTop: '4px' }}>© 2026 AssesIN · assesin.com · Laporan ini bersifat rahasia</p>
        </div>

        <div className="print-hide" style={{ textAlign: 'center', paddingTop: '8px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'var(--surface-2)', color: 'var(--text-sub)', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: '10px', border: '1px solid var(--border)', cursor: 'pointer' }}
          >
            ← Beranda
          </button>
          <button
            onClick={() => window.print()}
            style={{ background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', padding: '14px 32px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            🖨️ Cetak / PDF
          </button>
        </div>

      </div>
    </div>
  )
}
