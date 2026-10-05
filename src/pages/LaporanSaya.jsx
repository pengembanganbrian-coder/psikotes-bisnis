import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import Logo from '../components/Logo'
import { HARGA_TES, NAMA_TES } from '../config/pricing'
import { stateHasil } from '../lib/hasilState'

/**
 * Laporan saya — peserta masuk lewat link yang dikirim ke email, lalu melihat
 * semua tes yang pernah dikerjakan dengan email itu (dari perangkat mana pun).
 * Data diambil lewat RPC laporan_saya(), yang hanya mengembalikan baris milik
 * email akun yang login.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const KARTU = { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px' }

const formatTanggal = (iso) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

function StatusLaporan({ item }) {
  const gratis = HARGA_TES[item.jenis] === 0
  const [teks, warna, latar] = item.lunas || gratis
    ? ['Laporan lengkap terbuka', '#047857', 'rgba(16,185,129,0.12)']
    : ['Ringkasan', 'var(--text-muted)', 'var(--accent-dim)']
  return (
    <span style={{ fontSize: '11px', fontWeight: 600, color: warna, background: latar, padding: '3px 9px', borderRadius: '99px', whiteSpace: 'nowrap' }}>
      {teks}
    </span>
  )
}

export default function LaporanSaya() {
  const navigate = useNavigate()
  const [session, setSession] = useState(undefined) // undefined = sedang memeriksa
  const [email,   setEmail]   = useState('')
  const [terkirim, setTerkirim] = useState(false)
  const [mengirim, setMengirim] = useState(false)
  const [daftar,  setDaftar]  = useState(null)
  const [error,   setError]   = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  const muatDaftar = useCallback(async () => {
    setError('')
    const { data, error: rpcErr } = await supabase.rpc('laporan_saya')
    if (rpcErr) {
      setError('Gagal memuat laporan. Coba muat ulang halaman.')
      setDaftar([])
      return
    }
    setDaftar(Array.isArray(data) ? data : [])
  }, [])

  useEffect(() => {
    if (session) muatDaftar()
  }, [session, muatDaftar])

  const kirimLink = async (e) => {
    e.preventDefault()
    const alamat = email.trim()
    if (!EMAIL_RE.test(alamat)) {
      setError('Masukkan email yang valid.')
      return
    }
    setMengirim(true)
    setError('')
    const { error: otpErr } = await supabase.auth.signInWithOtp({
      email: alamat,
      options: { emailRedirectTo: `${window.location.origin}/laporan-saya` },
    })
    setMengirim(false)
    if (otpErr) {
      setError(otpErr.status === 429
        ? 'Terlalu banyak permintaan. Tunggu beberapa menit lalu coba lagi.'
        : 'Gagal mengirim link. Periksa email Anda lalu coba lagi.')
      return
    }
    setTerkirim(true)
  }

  const keluar = async () => {
    await supabase.auth.signOut()
    setDaftar(null)
    setTerkirim(false)
  }

  const buka = (item) => {
    const tujuan = stateHasil(item)
    if (tujuan) navigate(tujuan.route, { state: tujuan.state })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '40px var(--px) 64px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <Link to="/" aria-label="Beranda AssesIN"><Logo size="sm" dark /></Link>
          {session && (
            <button onClick={keluar} className="btn-ghost" style={{ fontSize: '13px', padding: '8px 14px' }}>Keluar</button>
          )}
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: '8px' }}>Laporan saya</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
          {session
            ? <>Semua tes yang dikerjakan dengan email <strong style={{ color: 'var(--text)' }}>{session.user.email}</strong>.</>
            : 'Buka kembali hasil tes dan laporan yang sudah Anda bayar, dari perangkat mana pun.'}
        </p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '10px 12px', marginBottom: '16px' }}>
            <p style={{ color: '#b91c1c', fontSize: '13px' }}>{error}</p>
          </div>
        )}

        {session === undefined ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Memeriksa sesi…</p>
        ) : !session ? (
          <div style={KARTU}>
            {terkirim ? (
              <>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>Cek email Anda</h2>
                <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.7 }}>
                  Kami mengirim link masuk ke <strong>{email.trim()}</strong>. Buka link tersebut di perangkat ini untuk melihat laporan Anda.
                  Tidak ada di kotak masuk? Periksa folder spam.
                </p>
                <button onClick={() => setTerkirim(false)} style={{ marginTop: '16px', color: 'var(--accent)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Ganti email
                </button>
              </>
            ) : (
              <form onSubmit={kirimLink}>
                <label htmlFor="ls-email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px' }}>
                  Email yang Anda pakai saat mengerjakan tes
                </label>
                <input id="ls-email" className="field" type="email" value={email} onChange={e => { setEmail(e.target.value); setError('') }} placeholder="email@contoh.com" autoComplete="email" required />
                <button type="submit" className="btn-cta block" disabled={mengirim} style={{ marginTop: '16px' }}>
                  {mengirim ? 'Mengirim…' : 'Kirim link masuk'}
                </button>
                <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginTop: '12px', lineHeight: 1.6 }}>
                  Tanpa password. Kami mengirim link sekali pakai ke email Anda.
                </p>
              </form>
            )}
          </div>
        ) : daftar === null ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Memuat laporan…</p>
        ) : daftar.length === 0 ? (
          <div style={KARTU}>
            <p style={{ color: 'var(--text-sub)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>
              Belum ada tes yang tercatat dengan email ini. Pastikan Anda masuk dengan email yang sama seperti saat mengerjakan tes.
            </p>
            <Link to="/#tes" className="btn-cta">Pilih tes <span className="btn-arrow" aria-hidden="true">→</span></Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {daftar.map(item => {
              const bisaDibuka = !!stateHasil(item)
              return (
                <div key={item.id} style={{ ...KARTU, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 220px', minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text)' }}>{NAMA_TES[item.jenis] || item.jenis}</h2>
                      <StatusLaporan item={item} />
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                      {item.nama} · {formatTanggal(item.created_at)}
                    </p>
                  </div>
                  {bisaDibuka ? (
                    <button onClick={() => buka(item)} className="card-cta" style={{ cursor: 'pointer' }}>
                      Buka hasil <span className="card-cta-arrow" aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Hasil tidak tersimpan</span>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
