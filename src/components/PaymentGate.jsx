import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import { HARGA_TES, NAMA_TES, formatRupiah } from '../config/pricing'

/**
 * PaymentGate — sembunyikan konten premium di balik paywall.
 *
 * Props:
 *   testType   : 'MBTI' | 'DISC' | 'PAPI' | 'DASS' | 'Love Language' | 'MSDT'
 *                | 'Big Five' | 'RIASEC' | 'Resiliensi' | 'Peran Tim'
 *   pesertaId  : UUID dari tabel peserta_xxx
 *   nama       : nama peserta (untuk detail pelanggan di gateway)
 *   email      : email peserta (opsional)
 *   children   : konten premium yang dikunci
 *   freeContent: konten gratis yang selalu tampil di atas gate
 */

// Isi laporan lengkap per tes, ditampilkan di kotak pembuka.
const ISI_LAPORAN = {
  MBTI: ['Uraian kepribadian yang mendalam', 'Interpretasi 13 aspek: komunikasi, keputusan, kepemimpinan, perilaku saat stres', 'Saran pengembangan diri', 'Saran profesi dan partner kerja yang cocok'],
  DISC: ['Karakteristik dan perilaku kerja', 'Kekuatan dan hal yang perlu diwaspadai', 'Gaya kepemimpinan', 'Lingkungan kerja dan jalur karier yang sesuai'],
  PAPI: ['Interpretasi 3 dimensi paling dominan', 'Kekuatan utama dan area pengembangan', 'Rekomendasi jabatan', 'Rincian 20 skala per sektor'],
  DASS: ['Rekomendasi tindak lanjut sesuai kondisi Anda', 'Langkah konkret yang dapat dilakukan'],
  'Love Language': ['Bahasa apresiasi kedua Anda', 'Cara kebutuhan ini tampak di tempat kerja', 'Panduan untuk atasan dan rekan kerja', 'Penjelasan kelima bahasa apresiasi'],
  MSDT: ['Implikasi gaya manajemen Anda', 'Rekomendasi pengembangan', 'Ringkasan skor lengkap'],
  'Big Five': ['Uraian lengkap tiap dimensi kepribadian', 'Kekuatan dan hal yang perlu diwaspadai', 'Saran pengembangan per dimensi', 'Bidang kerja yang selaras'],
  RIASEC: ['Uraian tiga minat utama Anda', 'Kekuatan yang menyertai tiap minat', 'Daftar bidang karier untuk dijajaki'],
  Resiliensi: ['Rencana penguatan untuk aspek yang lebih rendah', 'Langkah praktis yang dapat dicoba', 'Cara memanfaatkan kekuatan resiliensi Anda'],
  'Peran Tim': ['Uraian tiga peran terkuat Anda', 'Kontribusi khas dan hal yang perlu diwaspadai', 'Peran yang perlu dilengkapi rekan tim'],
}

async function sudahBayar(pesertaId, testType) {
  // Cek cepat ke database dulu; bila belum lunas, minta server menanyakan
  // status tagihan langsung ke Mayar (berjaga kalau webhook terlambat/gagal).
  const rpc = await supabase.rpc('cek_pembayaran', { p_peserta: pesertaId, p_tes: testType })
  if (!rpc.error && rpc.data === true) return true
  const { data } = await supabase.functions.invoke('cek-mayar-payment', {
    body: { pesertaId, testType },
  })
  return data?.paid === true
}

export default function PaymentGate({ testType, pesertaId, nama, email, children, freeContent }) {
  const [isPaid,  setIsPaid]  = useState(false)
  const [loading, setLoading] = useState(true)
  const [paying,  setPaying]  = useState(false)
  const [error,   setError]   = useState('')
  const payWindowRef = useRef(null)

  const localKey = `assesin_paid_${testType}_${pesertaId}`

  const checkStatus = useCallback(async () => {
    // Harga 0 = laporan lengkap sedang digratiskan (promo).
    if (HARGA_TES[testType] === 0 || localStorage.getItem(localKey) === 'true') {
      setIsPaid(true)
      setLoading(false)
      return
    }
    if (!pesertaId) { setLoading(false); return }
    if (await sudahBayar(pesertaId, testType)) {
      localStorage.setItem(localKey, 'true')
      setIsPaid(true)
    }
    setLoading(false)
  }, [pesertaId, testType, localKey])

  useEffect(() => { checkStatus() }, [checkStatus])

  const handlePay = async () => {
    setPaying(true)
    setError('')
    try {
      // Nominal sengaja tidak dikirim: server menentukan harga sendiri.
      const { data, error: fnErr } = await supabase.functions.invoke('create-mayar-payment', {
        body: {
          pesertaId,
          testType,
          nama:  nama  || 'Peserta',
          email: email || undefined,
        },
      })
      if (data?.alreadyPaid) {
        localStorage.setItem(localKey, 'true')
        setIsPaid(true)
        setPaying(false)
        return
      }
      if (fnErr || !data?.paymentUrl) throw new Error(fnErr?.message || 'Gagal membuat tagihan pembayaran.')

      // Tanpa 'noopener' di fitur jendela: dengan itu window.open selalu
      // mengembalikan null sehingga halaman selalu dialihkan dan hasil tes hilang.
      const win = window.open(data.paymentUrl, '_blank', 'width=650,height=750')
      if (!win) {
        window.location.href = data.paymentUrl
        return
      }
      win.opener = null
      payWindowRef.current = win
    } catch (e) {
      setError(e.message)
      setPaying(false)
    }
  }

  // Polling tiap 5 detik selama jendela pembayaran terbuka; berhenti
  // (setelah satu cek terakhir) bila jendela ditutup tanpa membayar.
  useEffect(() => {
    if (!paying) return
    const interval = setInterval(async () => {
      const tertutup = payWindowRef.current?.closed
      if (await sudahBayar(pesertaId, testType)) {
        localStorage.setItem(localKey, 'true')
        setIsPaid(true)
        setPaying(false)
        payWindowRef.current?.close()
        payWindowRef.current = null
      } else if (tertutup) {
        setPaying(false)
        payWindowRef.current = null
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [paying, pesertaId, testType, localKey])

  if (!loading && isPaid) {
    return <>{freeContent}{children}</>
  }

  const harga = formatRupiah(HARGA_TES[testType])
  const isi = ISI_LAPORAN[testType] || []

  return (
    <div>
      {freeContent}

      <div className="gate-preview" aria-hidden="true">
        <div className="gate-blur">{children}</div>
      </div>

      <div className="gate-card print-hide">
        <div className="gate-head">
          <div className="gate-lock">🔒</div>
          <div>
            <p style={{ fontSize: '12px', opacity: 0.85, fontWeight: 600 }}>{NAMA_TES[testType]}</p>
            <p style={{ fontSize: '19px', fontWeight: 800, letterSpacing: '-0.01em' }}>Buka laporan lengkap Anda</p>
          </div>
        </div>
        <div className="gate-body">
          {loading ? (
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Memeriksa status pembayaran…</p>
          ) : (
            <>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '10px' }}>Yang Anda dapatkan</p>
              <ul className="gate-fitur">
                {isi.map(t => <li key={t}>{t}</li>)}
                <li>Dapat diunduh sebagai PDF</li>
              </ul>

              <div className="gate-harga">
                <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>{harga}</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>sekali bayar, akses selamanya</span>
              </div>

              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '10px 12px', marginBottom: '12px' }}>
                  <p style={{ color: '#b91c1c', fontSize: '13px' }}>{error}</p>
                </div>
              )}

              {pesertaId ? (
                <button className="rpt-btn" style={{ width: '100%', padding: '14px' }} onClick={handlePay} disabled={paying}>
                  {paying ? 'Menunggu pembayaran…' : `Buka laporan — ${harga}`}
                </button>
              ) : (
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '12px 14px' }}>
                  <p style={{ color: '#92400e', fontSize: '13px', lineHeight: '1.6' }}>
                    Hasil tes Anda belum tersimpan di server, sehingga laporan lengkap belum dapat dibuka. Periksa koneksi internet lalu kerjakan ulang tes.
                  </p>
                </div>
              )}

              {paying && (
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>
                  Selesaikan pembayaran di jendela yang terbuka. Laporan terbuka otomatis setelah pembayaran diterima.
                </p>
              )}

              <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '14px', textAlign: 'center' }}>
                Dengan membayar, Anda menyetujui{' '}
                <Link to="/terms" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Syarat & Ketentuan</Link>
                {' '}AssesIN.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
