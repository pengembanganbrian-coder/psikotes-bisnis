import { useState, useEffect, useCallback } from 'react'
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
      <div className="relative mt-6">
        {/* Blur preview dari konten premium */}
        <div className="select-none pointer-events-none">
          <div className="blur-sm opacity-40 max-h-64 overflow-hidden rounded-2xl">
            {children}
          </div>
          {/* gradient fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent rounded-b-2xl" />
        </div>

        {/* CTA Card di tengah */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl shadow-blue-100/80 border border-blue-100 p-6 mx-4 max-w-sm w-full text-center">
            {loading ? (
              <p className="text-gray-400 text-sm">Memeriksa status pembayaran…</p>
            ) : (
              <>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔓</span>
                </div>
                <h3 className="text-base font-bold text-gray-800 mb-1">Laporan Lengkap</h3>
                <p className="text-xs text-gray-500 mb-1">{NAMA_TES[testType]}</p>
                <p className="text-2xl font-black text-blue-700 mb-1">
                  {formatRupiah(HARGA_TES[testType])}
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Deskripsi mendalam · Kekuatan & Kelemahan · Saran Karir
                </p>

                {error && (
                  <p className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2 mb-3">{error}</p>
                )}

                <button
                  onClick={handlePay}
                  disabled={paying || !pesertaId}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-blue-200"
                >
                  {paying
                    ? '⏳ Memproses…'
                    : `Buka Laporan — ${formatRupiah(HARGA_TES[testType])}`}
                </button>

                {!pesertaId && (
                  <p className="text-xs text-amber-600 mt-2">
                    ⚠ Selesaikan tes terlebih dahulu untuk membuka laporan.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
