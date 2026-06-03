import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const PAPI_SCALES = ['G','L','I','T','V','S','R','D','C','E','N','A','P','X','B','O','Z','K','F','W']

/* ── Warna badge per jenis tes ─────────────────────────────────── */
const BADGE = {
  MBTI:           { bg: 'rgba(59,130,246,0.18)',   color: '#60a5fa'  },
  DISC:           { bg: 'rgba(34,197,94,0.18)',    color: '#4ade80'  },
  PAPI:           { bg: 'rgba(168,85,247,0.18)',   color: '#c084fc'  },
  DASS:           { bg: 'rgba(20,184,166,0.18)',   color: '#2dd4bf'  },
  'Love Language':{ bg: 'rgba(244,63,94,0.18)',    color: '#fb7185'  },
  MSDT:           { bg: 'rgba(249,115,22,0.18)',   color: '#fb923c'  },
}

/* ── Tab accent per jenis tes ─────────────────────────────────── */
const TAB_ACCENT = {
  Semua:          '#d4a853',
  MBTI:           '#60a5fa',
  DISC:           '#4ade80',
  PAPI:           '#c084fc',
  DASS:           '#2dd4bf',
  MSDT:           '#fb923c',
  'Love Language':'#fb7185',
}

const DISC_COLORS = { D: '#ef4444', I: '#f59e0b', S: '#22c55e', C: '#3b82f6' }

function Dashboard() {
  const [peserta, setPeserta]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)
  const [tab, setTab]           = useState('Semua')
  const [search, setSearch]     = useState('')
  const navigate = useNavigate()

  /* ── Fetch ─────────────────────────────────────────────────── */
  const fetchAllPeserta = async () => {
    setLoading(true)
    const [{ data: mbti }, { data: disc }, { data: papi }, { data: dass }, { data: ll }, { data: msdt }] = await Promise.all([
      supabase.from('peserta').select('*, hasil_tes(*)').order('created_at', { ascending: false }),
      supabase.from('peserta_disc').select('*, hasil_disc(*)').order('created_at', { ascending: false }),
      supabase.from('peserta_papi').select('*, hasil_papi(*)').order('created_at', { ascending: false }),
      supabase.from('peserta_dass').select('*, hasil_dass(*)').order('created_at', { ascending: false }),
      supabase.from('peserta_love_language').select('*, hasil_love_language(*)').order('created_at', { ascending: false }),
      supabase.from('peserta_msdt').select('*, hasil_msdt(*)').order('created_at', { ascending: false }),
    ])

    const mbtiList = (mbti  || []).map(p => ({ ...p, jenis: 'MBTI',          identifier: p.email }))
    const discList = (disc  || []).map(p => ({ ...p, jenis: 'DISC',          identifier: p.nip   }))
    const papiList = (papi  || []).map(p => ({ ...p, jenis: 'PAPI',          identifier: p.nip   }))
    const dassList = (dass  || []).map(p => ({ ...p, jenis: 'DASS',          identifier: p.nip   }))
    const llList   = (ll    || []).map(p => ({ ...p, jenis: 'Love Language', identifier: p.nip   }))
    const msdtList = (msdt  || []).map(p => ({ ...p, jenis: 'MSDT',          identifier: p.nip   }))

    const merged = [...mbtiList, ...discList, ...papiList, ...dassList, ...llList, ...msdtList].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
    setPeserta(merged)
    setLoading(false)
  }

  useEffect(() => { fetchAllPeserta() }, [])

  /* ── Auth ──────────────────────────────────────────────────── */
  const [showGantiPw, setShowGantiPw] = useState(false)
  const [newPw,       setNewPw]       = useState('')
  const [newPwMsg,    setNewPwMsg]    = useState(null)
  const [newPwLoading, setNewPwLoading] = useState(false)

  const handleGantiPassword = async (e) => {
    e.preventDefault()
    if (newPw.length < 8) { setNewPwMsg({ ok: false, text: 'Minimal 8 karakter.' }); return }
    setNewPwLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPw })
    setNewPwLoading(false)
    if (error) setNewPwMsg({ ok: false, text: error.message })
    else {
      setNewPwMsg({ ok: true, text: 'Password berhasil diubah!' })
      setTimeout(() => { setShowGantiPw(false); setNewPw(''); setNewPwMsg(null) }, 1500)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  /* ── Delete ────────────────────────────────────────────────── */
  const handleDelete = async (item) => {
    if (!confirm('Hapus peserta ini?')) return
    if (item.jenis === 'MBTI') {
      await supabase.from('hasil_tes').delete().eq('peserta_id', item.id)
      await supabase.from('peserta').delete().eq('id', item.id)
    } else if (item.jenis === 'DISC') {
      await supabase.from('hasil_disc').delete().eq('peserta_id', item.id)
      await supabase.from('peserta_disc').delete().eq('id', item.id)
    } else if (item.jenis === 'PAPI') {
      await supabase.from('hasil_papi').delete().eq('peserta_id', item.id)
      await supabase.from('peserta_papi').delete().eq('id', item.id)
    } else if (item.jenis === 'DASS') {
      await supabase.from('hasil_dass').delete().eq('peserta_id', item.id)
      await supabase.from('peserta_dass').delete().eq('id', item.id)
    } else if (item.jenis === 'Love Language') {
      await supabase.from('hasil_love_language').delete().eq('peserta_id', item.id)
      await supabase.from('peserta_love_language').delete().eq('id', item.id)
    } else if (item.jenis === 'MSDT') {
      await supabase.from('hasil_msdt').delete().eq('peserta_id', item.id)
      await supabase.from('peserta_msdt').delete().eq('id', item.id)
    }
    setSelected(null)
    fetchAllPeserta()
  }

  /* ── Export CSV ────────────────────────────────────────────── */
  const handleExportExcel = () => {
    /* TODO: Hapus data test (nama seperti "aaa", "aa", "test") sebelum launch */
    const rows = [['Nama', 'NIK / Email', 'Usia', 'Jenis Tes', 'Hasil', 'Tanggal']]
    peserta.forEach(p => {
      let hasil = '—'
      if (p.jenis === 'MBTI') hasil = p.hasil_tes?.[0]?.tipe_mbti  || 'Belum tes'
      if (p.jenis === 'DISC') hasil = p.hasil_disc?.[0]?.profil    || 'Belum tes'
      if (p.jenis === 'PAPI') hasil = p.hasil_papi?.[0]?.profil    || 'Belum tes'
      if (p.jenis === 'DASS') {
        const h = p.hasil_dass?.[0]
        hasil = h ? `D:${h.kategori_depresi} A:${h.kategori_anxietas} S:${h.kategori_stres}` : 'Belum tes'
      }
      if (p.jenis === 'Love Language') hasil = p.hasil_love_language?.[0]?.bahasa_utama || 'Belum tes'
      if (p.jenis === 'MSDT') hasil = p.hasil_msdt?.[0]?.gaya || 'Belum tes'
      rows.push([
        p.nama,
        p.identifier,
        p.jabatan || '-',
        p.jenis,
        hasil,
        new Date(p.created_at).toLocaleDateString('id-ID'),
      ])
    })
    const csv = rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'peserta-assesin.csv'; a.click()
  }

  /* ── Lihat Laporan ─────────────────────────────────────────── */
  const handleLihatLaporan = (item) => {
    if (item.jenis === 'MBTI') {
      navigate('/hasil', { state: { tipe: item.hasil_tes?.[0]?.tipe_mbti, nama: item.nama, fromDashboard: true } })
    } else if (item.jenis === 'DISC') {
      const h = item.hasil_disc?.[0]
      if (!h) return
      navigate('/hasil-disc', {
        state: {
          fromDashboard: true,
          nama: item.nama,
          hasil: {
            profil: h.profil,
            mostD: h.skor_d_most,   mostI: h.skor_i_most,   mostS: h.skor_s_most,   mostC: h.skor_c_most,
            leastD: h.skor_d_least, leastI: h.skor_i_least, leastS: h.skor_s_least, leastC: h.skor_c_least,
            changeD: h.skor_d_change, changeI: h.skor_i_change,
            changeS: h.skor_s_change, changeC: h.skor_c_change,
          },
        },
      })
    } else if (item.jenis === 'PAPI') {
      const h = item.hasil_papi?.[0]
      if (!h) return
      const scores = {}
      PAPI_SCALES.forEach(k => { scores[k] = h[`skor_${k.toLowerCase()}`] ?? 0 })
      navigate('/hasil-papi', {
        state: {
          fromDashboard: true,
          nama: item.nama,
          nip: item.nip,
          unitKerja: item.jabatan,
          scores,
          profil: h.profil,
        },
      })
    } else if (item.jenis === 'DASS') {
      const h = item.hasil_dass?.[0]
      if (!h) return
      navigate('/hasil-dass', {
        state: {
          fromDashboard: true,
          nama: item.nama,
          nip: item.nip,
          unitKerja: item.jabatan,
          skor: {
            D: h.skor_depresi,
            A: h.skor_anxietas,
            S: h.skor_stres,
          },
        },
      })
    } else if (item.jenis === 'Love Language') {
      const h = item.hasil_love_language?.[0]
      if (!h) return
      navigate('/hasil-love-language', {
        state: {
          fromDashboard: true,
          nama: item.nama,
          nip: item.nip,
          jabatan: item.jabatan,
          utama: h.bahasa_utama,
          kedua: h.bahasa_kedua,
          skor: {
            W: h.skor_w,
            Q: h.skor_q,
            G: h.skor_g,
            A: h.skor_a,
            P: h.skor_p,
          },
        },
      })
    } else if (item.jenis === 'MSDT') {
      const h = item.hasil_msdt?.[0]
      if (!h) return
      navigate('/hasil-msdt', {
        state: {
          fromDashboard: true,
          nama: item.nama,
          nip: item.nip,
          unitKerja: item.jabatan,
          hasil: {
            TO:         h.skor_to,
            RO:         h.skor_ro,
            E_score:    h.e_score,
            grandTotal: h.grand_total,
            gaya:       h.gaya,
            toTinggi:   h.skor_to > 11,
            roTinggi:   h.skor_ro > 9,
            eTinggi:    h.e_score >= 2.0,
          },
        },
      })
    }
  }

  /* ── Test data detection ──────────────────────────────────── */
  const isTestData = (p) => {
    const n = (p.nama || '').trim().toLowerCase()
    return n.length <= 3 || /^(.)\1+$/.test(n) || ['test','tes','aaa','bbb','ccc','xxx','asdf','qwerty'].includes(n)
  }

  const testEntries = peserta.filter(isTestData)

  const handleHapusSemuaTest = async () => {
    if (testEntries.length === 0) return
    if (!confirm(`Hapus ${testEntries.length} data test? Tindakan ini tidak bisa dibatalkan.`)) return
    for (const item of testEntries) {
      await handleDelete(item)
    }
  }

  /* ── Derived ───────────────────────────────────────────────── */
  const getHasil = (p) => {
    if (p.jenis === 'MBTI') return p.hasil_tes?.[0]?.tipe_mbti  || '—'
    if (p.jenis === 'DISC') return p.hasil_disc?.[0]?.profil    || '—'
    if (p.jenis === 'PAPI') return p.hasil_papi?.[0]?.profil    || '—'
    if (p.jenis === 'DASS') {
      const h = p.hasil_dass?.[0]
      if (!h) return '—'
      return `D:${h.kategori_depresi?.substring(0,3)} A:${h.kategori_anxietas?.substring(0,3)} S:${h.kategori_stres?.substring(0,3)}`
    }
    if (p.jenis === 'Love Language') return p.hasil_love_language?.[0]?.bahasa_utama || '—'
    if (p.jenis === 'MSDT') return p.hasil_msdt?.[0]?.gaya || '—'
    return '—'
  }

  const filtered = peserta.filter(p =>
    (tab === 'Semua' || p.jenis === tab) &&
    p.nama.toLowerCase().includes(search.toLowerCase())
  )

  /* ── Styles ────────────────────────────────────────────────── */
  const S = {
    page:      { minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' },
    topbar:    { background: 'rgba(9,9,15,0.97)', borderBottom: '1px solid var(--border)', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' },
    topTitle:  { fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', color: 'var(--text)', letterSpacing: '0.01em' },
    topRight:  { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' },
    btnAccent: { background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' },
    btnGhost:  { background: 'transparent', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '12px', padding: '8px 14px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer', whiteSpace: 'nowrap' },
    btnDanger: { background: 'transparent', color: '#f87171', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '12px', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(248,113,113,0.3)', cursor: 'pointer', whiteSpace: 'nowrap' },
    card:      { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' },
    fieldDark: { width: '100%', background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '10px 14px', fontSize: '13px', color: 'var(--text)', outline: 'none', boxSizing: 'border-box' },
  }

  return (
    <div style={S.page}>

      {/* ── Topbar ─────────────────────────────────────────────── */}
      <div style={S.topbar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '16px', color: 'var(--accent)', letterSpacing: '0.05em' }}>AssesIN</span>
          <span style={{ width: '1px', height: '18px', background: 'var(--border)' }} />
          <span style={S.topTitle}>Admin Dashboard</span>
        </div>
        <div style={S.topRight}>
          <button onClick={handleExportExcel} style={S.btnAccent}>
            📥 Export CSV
          </button>
          <button onClick={() => navigate('/job-profile')} style={{ ...S.btnGhost, color: 'var(--accent)', borderColor: 'var(--accent-border)' }}>
            💼 Job Profile
          </button>
          <button onClick={() => setShowGantiPw(true)} style={S.btnGhost}>
            🔑 Ganti Password
          </button>
          <button onClick={handleLogout} style={S.btnDanger}>
            Logout
          </button>
        </div>
      </div>

      {/* ── Modal Ganti Password ──────────────────────────────── */}
      {showGantiPw && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '360px' }}>
            <h3 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--text)', marginBottom: '20px' }}>Ganti Password</h3>
            <form onSubmit={handleGantiPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                className="field"
                type="password"
                value={newPw}
                onChange={e => { setNewPw(e.target.value); setNewPwMsg(null) }}
                placeholder="Password baru (min 8 karakter)"
                autoFocus
                autoComplete="new-password"
              />
              {newPwMsg && (
                <p style={{ fontSize: '13px', color: newPwMsg.ok ? '#4ade80' : '#f87171', lineHeight: '1.5' }}>{newPwMsg.text}</p>
              )}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" disabled={newPwLoading} style={{ flex: 1, background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', opacity: newPwLoading ? 0.6 : 1 }}>
                  {newPwLoading ? 'Menyimpan...' : 'Simpan'}
                </button>
                <button type="button" onClick={() => { setShowGantiPw(false); setNewPw(''); setNewPwMsg(null) }} style={{ padding: '12px 16px', background: 'var(--surface-2)', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '12px', borderRadius: '8px', border: '1px solid var(--border)', cursor: 'pointer' }}>
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Main Layout ──────────────────────────────────────── */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* ── Tabel ──────────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: '300px', ...S.card }}>

          {/* Banner data test */}
          {testEntries.length > 0 && (
            <div style={{ padding: '12px 20px', background: 'rgba(248,113,113,0.08)', borderBottom: '1px solid rgba(248,113,113,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <p style={{ fontSize: '12px', color: '#f87171' }}>
                ⚠️ <strong>{testEntries.length} data test</strong> terdeteksi — sebaiknya dihapus sebelum launch.
              </p>
              <button
                onClick={handleHapusSemuaTest}
                style={{ fontSize: '11px', fontWeight: 700, fontFamily: 'Syne, sans-serif', padding: '5px 14px', borderRadius: '6px', background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)', cursor: 'pointer', whiteSpace: 'nowrap' }}
              >
                Hapus Semua Data Test
              </button>
            </div>
          )}

          {/* Search + judul */}
          <div style={{ padding: '20px 20px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>Daftar Peserta</h2>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>
                {filtered.length} peserta
              </span>
            </div>
            <input
              type="text"
              value={search}
              onChange={e => { setSearch(e.target.value); setSelected(null) }}
              placeholder="Cari nama peserta..."
              style={S.fieldDark}
            />
          </div>

          {/* Filter tabs */}
          <div style={{ padding: '14px 20px', display: 'flex', gap: '6px', flexWrap: 'wrap', borderBottom: '1px solid var(--border)' }}>
            {['Semua', 'MBTI', 'DISC', 'PAPI', 'DASS', 'MSDT', 'Love Language'].map(t => {
              const accent = TAB_ACCENT[t]
              const isActive = tab === t
              return (
                <button
                  key={t}
                  onClick={() => { setTab(t); setSelected(null) }}
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'Syne, sans-serif',
                    padding: '5px 12px',
                    borderRadius: '99px',
                    border: isActive ? `1px solid ${accent}55` : '1px solid var(--border)',
                    background: isActive ? accent + '1a' : 'transparent',
                    color: isActive ? accent : 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>

          {/* Table */}
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Memuat data...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                Belum ada peserta{tab !== 'Semua' ? ` ${tab}` : ''}.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', minWidth: '540px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Nama', 'Usia', 'Jenis', 'Hasil', 'Tanggal'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: '10px', fontWeight: 700, fontFamily: 'Syne, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', background: 'var(--surface-2)', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => {
                    const isSelected = selected?.jenis === p.jenis && selected?.id === p.id
                    const badge = BADGE[p.jenis] || { bg: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)' }
                    return (
                      <tr
                        key={`${p.jenis}-${p.id}`}
                        onClick={() => setSelected(p)}
                        style={{
                          borderBottom: '1px solid var(--border)',
                          cursor: 'pointer',
                          background: isSelected ? 'rgba(212,168,83,0.06)' : 'transparent',
                          transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--surface-2)' }}
                        onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                      >
                        <td style={{ padding: '11px 16px', fontWeight: 600, color: isSelected ? 'var(--accent)' : 'var(--text)', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.nama}
                          {isTestData(p) && <span style={{ marginLeft: '6px', fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '4px', background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)', verticalAlign: 'middle' }}>TEST</span>}
                        </td>
                        <td style={{ padding: '11px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                          {p.jabatan || '—'}
                        </td>
                        <td style={{ padding: '11px 16px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'Syne, sans-serif', padding: '3px 10px', borderRadius: '99px', background: badge.bg, color: badge.color, whiteSpace: 'nowrap' }}>
                            {p.jenis}
                          </span>
                        </td>
                        <td style={{ padding: '11px 16px', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
                          {getHasil(p)}
                        </td>
                        <td style={{ padding: '11px 16px', color: 'var(--text-muted)', whiteSpace: 'nowrap', fontSize: '12px' }}>
                          {new Date(p.created_at).toLocaleDateString('id-ID')}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ── Detail Panel ──────────────────────────────────── */}
        {selected && (
          <div ref={el => el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })} style={{ width: '300px', flexShrink: 0, ...S.card }}>

            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', color: 'var(--text)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Detail Peserta</h2>
              <button onClick={() => setSelected(null)} style={{ color: 'var(--text-muted)', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* ─── MBTI ─── */}
              {selected.jenis === 'MBTI' && (
                <>
                  <div style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                    <p style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Tipe MBTI</p>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '36px', color: '#60a5fa', letterSpacing: '0.12em' }}>{selected.hasil_tes?.[0]?.tipe_mbti || '—'}</p>
                  </div>
                  <DetailRows rows={[
                    ['Nama', selected.nama],
                    ['Email', selected.email],
                    ['Usia', selected.jabatan || '—'],
                    ['Tanggal', new Date(selected.created_at).toLocaleDateString('id-ID')],
                  ]} />
                  {selected.hasil_tes?.[0] && (
                    <ScoreSection label="Skor Dimensi">
                      {[
                        ['E', selected.hasil_tes[0].skor_e, 'I', selected.hasil_tes[0].skor_i, '#60a5fa'],
                        ['S', selected.hasil_tes[0].skor_s, 'N', selected.hasil_tes[0].skor_n, '#a78bfa'],
                        ['T', selected.hasil_tes[0].skor_t, 'F', selected.hasil_tes[0].skor_f, '#34d399'],
                        ['J', selected.hasil_tes[0].skor_j, 'P', selected.hasil_tes[0].skor_p, '#f59e0b'],
                      ].map(([a, sa, b, sb, color]) => (
                        <div key={a} style={{ marginBottom: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            <span>{a} ({sa})</span><span>{b} ({sb})</span>
                          </div>
                          <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: color, borderRadius: '99px', width: `${(sa / (sa + sb)) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </ScoreSection>
                  )}
                </>
              )}

              {/* ─── DISC ─── */}
              {selected.jenis === 'DISC' && (
                <>
                  <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                    <p style={{ fontSize: '10px', color: '#4ade80', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Profil DISC</p>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '36px', color: '#4ade80', letterSpacing: '0.12em' }}>{selected.hasil_disc?.[0]?.profil || '—'}</p>
                  </div>
                  <DetailRows rows={[
                    ['Nama', selected.nama],
                    ['NIK / ID', selected.nip],
                    ['Usia', selected.jabatan || '—'],
                    ['Tanggal', new Date(selected.created_at).toLocaleDateString('id-ID')],
                  ]} />
                  {selected.hasil_disc?.[0] && (
                    <ScoreSection label="Skor DISC (Change)">
                      {[
                        ['D', selected.hasil_disc[0].skor_d_change, 'Dominance',       DISC_COLORS.D],
                        ['I', selected.hasil_disc[0].skor_i_change, 'Influence',       DISC_COLORS.I],
                        ['S', selected.hasil_disc[0].skor_s_change, 'Steadiness',      DISC_COLORS.S],
                        ['C', selected.hasil_disc[0].skor_c_change, 'Conscientiousness', DISC_COLORS.C],
                      ].map(([key, val, label, color]) => (
                        <div key={key} style={{ marginBottom: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 700, color }}>{key} — {label}</span>
                            <span>{val > 0 ? '+' : ''}{val}</span>
                          </div>
                          <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: color, borderRadius: '99px', width: `${Math.max(0, Math.min((val / 12) * 100, 100))}%` }} />
                          </div>
                        </div>
                      ))}
                    </ScoreSection>
                  )}
                </>
              )}

              {/* ─── PAPI ─── */}
              {selected.jenis === 'PAPI' && (
                <>
                  <div style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                    <p style={{ fontSize: '10px', color: '#c084fc', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>Profil PAPI Kostick</p>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '22px', color: '#c084fc', letterSpacing: '0.08em', lineHeight: 1.3 }}>{selected.hasil_papi?.[0]?.profil || '—'}</p>
                    <p style={{ fontSize: '10px', color: 'rgba(192,132,252,0.6)', marginTop: '4px' }}>Dimensi dominan</p>
                  </div>
                  <DetailRows rows={[
                    ['Nama', selected.nama],
                    ['NIK / ID', selected.nip],
                    ['Usia', selected.jabatan || '—'],
                    ['Tanggal', new Date(selected.created_at).toLocaleDateString('id-ID')],
                  ]} />
                  {selected.hasil_papi?.[0] && (
                    <ScoreSection label="Skor PAPI (0–9)">
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px' }}>
                        {PAPI_SCALES.map(k => {
                          const val = selected.hasil_papi[0][`skor_${k.toLowerCase()}`] ?? 0
                          return (
                            <div key={k}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '2px' }}>
                                <span style={{ fontWeight: 700, color: '#c084fc' }}>{k}</span>
                                <span style={{ color: 'var(--text-muted)' }}>{val}</span>
                              </div>
                              <div style={{ height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', background: '#a855f7', borderRadius: '99px', width: `${(val / 9) * 100}%` }} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </ScoreSection>
                  )}
                </>
              )}

              {/* ─── DASS ─── */}
              {selected.jenis === 'DASS' && (() => {
                const h = selected.hasil_dass?.[0]
                const katColor = { Normal: '#4ade80', Ringan: '#a3e635', Sedang: '#f59e0b', Berat: '#f97316', 'Sangat Berat': '#f43f5e' }
                return (
                  <>
                    <div style={{ background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', color: '#2dd4bf', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>DASS-21</p>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#2dd4bf' }}>Depression · Anxiety · Stress</p>
                      {h && <p style={{ fontSize: '11px', color: 'rgba(45,212,191,0.7)', marginTop: '4px' }}>D:{h.kategori_depresi} · A:{h.kategori_anxietas} · S:{h.kategori_stres}</p>}
                    </div>
                    <DetailRows rows={[
                      ['Nama', selected.nama],
                      ['NIK / ID', selected.nip],
                      ['Usia', selected.jabatan || '—'],
                      ['Tanggal', new Date(selected.created_at).toLocaleDateString('id-ID')],
                    ]} />
                    {h && (
                      <ScoreSection label="Skor DASS-21">
                        {[
                          { label: 'Depresi',   skor: h.skor_depresi,  kat: h.kategori_depresi  },
                          { label: 'Kecemasan', skor: h.skor_anxietas, kat: h.kategori_anxietas },
                          { label: 'Stres',     skor: h.skor_stres,    kat: h.kategori_stres    },
                        ].map(({ label, skor, kat }) => {
                          const color = katColor[kat] || '#6b7280'
                          return (
                            <div key={label} style={{ marginBottom: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ fontWeight: 700, color: 'var(--text)' }}>{skor}</span>
                                  <span style={{ fontSize: '10px', fontWeight: 700, padding: '1px 8px', borderRadius: '99px', background: color + '22', color }}>{kat}</span>
                                </div>
                              </div>
                              <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', background: '#14b8a6', borderRadius: '99px', width: `${(skor / 42) * 100}%` }} />
                              </div>
                            </div>
                          )
                        })}
                      </ScoreSection>
                    )}
                  </>
                )
              })()}

              {/* ─── Love Language ─── */}
              {selected.jenis === 'Love Language' && (() => {
                const h = selected.hasil_love_language?.[0]
                return (
                  <>
                    <div style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', color: '#fb7185', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Love Language</p>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '14px', color: '#fb7185', lineHeight: 1.4 }}>{h?.bahasa_utama || '—'}</p>
                    </div>
                    <DetailRows rows={[
                      ['Nama', selected.nama],
                      ['NIK / ID', selected.nip],
                      ['Usia', selected.jabatan || '—'],
                      ['Tanggal', new Date(selected.created_at).toLocaleDateString('id-ID')],
                    ]} />
                  </>
                )
              })()}

              {/* ─── MSDT ─── */}
              {selected.jenis === 'MSDT' && (() => {
                const h = selected.hasil_msdt?.[0]
                return (
                  <>
                    <div style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
                      <p style={{ fontSize: '10px', color: '#fb923c', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Gaya Manajemen</p>
                      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '18px', color: '#fb923c' }}>{h?.gaya || '—'}</p>
                      <p style={{ fontSize: '10px', color: 'rgba(251,146,60,0.6)', marginTop: '2px' }}>MSDT</p>
                    </div>
                    <DetailRows rows={[
                      ['Nama', selected.nama],
                      ['NIK / ID', selected.nip],
                      ['Usia', selected.jabatan || '—'],
                      ['Tanggal', new Date(selected.created_at).toLocaleDateString('id-ID')],
                    ]} />
                    {h && (
                      <ScoreSection label="Skor MSDT">
                        {[
                          { label: 'TO (Task Orientation)',         val: h.skor_to,     max: 19, color: '#f97316' },
                          { label: 'RO (Relationship Orientation)', val: h.skor_ro,     max: 17, color: '#f59e0b' },
                          { label: 'E Score (Efektivitas)',         val: h.e_score,     max: 4,  color: '#22c55e' },
                          { label: 'Grand Total',                   val: h.grand_total, max: 50, color: '#d4a853' },
                        ].map(({ label, val, max, color }) => (
                          <div key={label} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                              <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                              <span style={{ fontWeight: 700, color: 'var(--text)' }}>{val}</span>
                            </div>
                            <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', background: color, borderRadius: '99px', width: `${Math.min(100, (val / max) * 100)}%` }} />
                            </div>
                          </div>
                        ))}
                      </ScoreSection>
                    )}
                  </>
                )
              })()}

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleLihatLaporan(selected)}
                  style={{ flex: 1, background: 'var(--accent)', color: '#09090f', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
                >
                  Lihat Laporan
                </button>
                <button
                  onClick={() => handleDelete(selected)}
                  style={{ padding: '10px 14px', background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
                >
                  🗑️
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Helper sub-components ─────────────────────────────────────── */
function DetailRows({ rows }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', fontSize: '12px' }}>
          <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{label}</span>
          <span style={{ fontWeight: 600, color: 'var(--text-sub)', textAlign: 'right', wordBreak: 'break-all' }}>{value || '—'}</span>
        </div>
      ))}
    </div>
  )
}

function ScoreSection({ label, children }) {
  return (
    <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '10px', padding: '14px' }}>
      <p style={{ fontSize: '10px', fontWeight: 700, fontFamily: 'Syne, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '12px' }}>{label}</p>
      {children}
    </div>
  )
}

export default Dashboard
