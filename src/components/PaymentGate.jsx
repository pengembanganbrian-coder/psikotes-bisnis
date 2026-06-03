import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
import { HARGA_TES, NAMA_TES, formatRupiah } from '../config/pricing'

/**
 * PaymentGate — sembunyikan konten premium di balik paywall Midtrans.
 *
 * Props:
 *   testType   : 'MBTI' | 'DISC' | 'PAPI' | 'DASS' | 'Love Language' | 'MSDT'
 *   pesertaId  : UUID dari tabel peserta_xxx
 *   nama       : nama peserta (untuk Midtrans customer_details)
 *   email      : email peserta (opsional)
 *   children   : konten premium yang dikunci
 *   freeContent: konten gratis yang selalu tampil di atas gate
 */
export default function PaymentGate({ testType, pesertaId, nama, email, children, freeContent }) {
  const [isPaid,  setIsPaid]  = useState(false)
  const [loading, setLoading] = useState(true)
  const [paying,  setPaying]  = useState(false)
  const [error,   setError]   = useState('')

  const localKey = `assesin_paid_${testType}_${pesertaId}`

  const checkStatus = useCallback(async () => {
    // 1. Cek localStorage dulu (cepat)
    if (localStorage.getItem(localKey) === 'true') {
      setIsPaid(true)
      setLoading(false)
      return
    }
    // 2. Cek DB (authoritative)
    if (!pesertaId) { setLoading(false); return }
    const { data } = await supabase
      .from('payments')
      .select('status')
      .eq('peserta_id', pesertaId)
      .eq('test_type', testType)
      .eq('status', 'paid')
      .maybeSingle()
    if (data) {
      localStorage.setItem(localKey, 'true')
      setIsPaid(true)
    }
    setLoading(false)
  }, [pesertaId, testType, localKey])

  useEffect(() => { checkStatus() }, [checkStatus])

  const handlePay = async () => {
    if (!window.snap) {
      setError('Midtrans Snap belum tersedia. Coba muat ulang halaman.')
      return
    }
    setPaying(true)
    setError('')
    try {
      const { data, error: fnErr } = await supabase.functions.invoke('create-midtrans-token', {
        body: {
          pesertaId,
          testType,
          nama:   nama  || 'Peserta',
          email:  email || 'peserta@assesin.id',
          amount: HARGA_TES[testType],
        },
      })
      if (fnErr || !data?.token) throw new Error(fnErr?.message || 'Gagal membuat token pembayaran.')

      window.snap.pay(data.token, {
        onSuccess: () => {
          localStorage.setItem(localKey, 'true')
          setIsPaid(true)
          setPaying(false)
        },
        onPending: () => {
          setError('Pembayaran sedang diproses. Segarkan halaman ini setelah pembayaran selesai.')
          setPaying(false)
        },
        onError: () => {
          setError('Pembayaran gagal. Silakan coba lagi.')
          setPaying(false)
        },
        onClose: () => setPaying(false),
      })
    } catch (e) {
      setError(e.message)
      setPaying(false)
    }
  }

  // Polling tiap 5 detik saat pop-up Midtrans terbuka
  useEffect(() => {
    if (!paying) return
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('payments')
        .select('status')
        .eq('peserta_id', pesertaId)
        .eq('test_type', testType)
        .eq('status', 'paid')
        .maybeSingle()
      if (data) {
        localStorage.setItem(localKey, 'true')
        setIsPaid(true)
        setPaying(false)
        clearInterval(interval)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [paying, pesertaId, testType, localKey])

  /* ── Sudah Bayar → tampilkan konten penuh ── */
  if (!loading && isPaid) {
    return <>{children}</>
  }

  /* ── Belum Bayar / Loading ── */
  return (
    <div>
      {/* Konten gratis selalu tampil */}
      {freeContent}

      {/* Gate: preview + overlay */}
      <div style={{ position: 'relative', marginTop: '24px' }}>
        {/* Blur preview */}
        <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
          <div style={{ filter: 'blur(6px)', opacity: 0.35, maxHeight: '240px', overflow: 'hidden', borderRadius: '16px' }}>
            {children}
          </div>
          <div style={{ position: 'absolute', inset: '0 0 0 0', background: 'linear-gradient(to top, var(--bg) 20%, transparent 80%)', borderRadius: '16px' }} />
        </div>

        {/* CTA Card */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div className="dark-card" style={{ padding: '24px', maxWidth: '360px', width: '100%', textAlign: 'center', borderColor: 'var(--accent-border)', background: 'rgba(9,9,15,0.97)' }}>
            {loading ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Memeriksa status pembayaran…</p>
            ) : (
              <>
                <div style={{ width: '44px', height: '44px', borderRadius: '99px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '20px' }}>
                  🔓
                </div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px', color: 'var(--text)', marginBottom: '4px' }}>
                  Laporan Lengkap
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '8px' }}>
                  {NAMA_TES[testType]}
                </p>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '26px', color: 'var(--accent)', marginBottom: '4px' }}>
                  {formatRupiah(HARGA_TES[testType])}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginBottom: '16px' }}>
                  Deskripsi mendalam · Kekuatan & Kelemahan · Saran Karir
                </p>

                {error && (
                  <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', padding: '10px 12px', marginBottom: '12px' }}>
                    <p style={{ color: '#f87171', fontSize: '12px' }}>{error}</p>
                  </div>
                )}

                <button
                  onClick={handlePay}
                  disabled={paying || !pesertaId}
                  style={{
                    width: '100%', background: (paying || !pesertaId) ? 'var(--surface-2)' : 'var(--accent)',
                    color: (paying || !pesertaId) ? 'var(--text-muted)' : '#09090f',
                    fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px',
                    letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px',
                    borderRadius: '10px', border: 'none', cursor: (paying || !pesertaId) ? 'not-allowed' : 'pointer',
                  }}
                >
                  {paying ? '⏳ Memproses…' : `Buka Laporan — ${formatRupiah(HARGA_TES[testType])}`}
                </button>

                {!pesertaId && (
                  <p style={{ color: '#f59e0b', fontSize: '11px', marginTop: '8px' }}>
                    ⚠ Selesaikan tes terlebih dahulu untuk membuka laporan.
                  </p>
                )}

                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '12px' }}>
                  Dengan membayar, Anda menyetujui{' '}
                  <Link to="/terms" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                    Syarat & Ketentuan
                  </Link>
                  {' '}AssesIN
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
