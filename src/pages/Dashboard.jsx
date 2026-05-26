import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const PAPI_SCALES = ['G','L','I','T','V','S','R','D','C','E','N','A','P','X','B','O','Z','K','F','W']

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
    const rows = [['Nama', 'NIP/Email', 'Unit Kerja', 'Jenis Tes', 'Hasil', 'Tanggal']]
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
    a.href = url; a.download = 'peserta-psikotes-djbc.csv'; a.click()
  }

  /* ── Lihat Laporan ─────────────────────────────────────────── */
  const handleLihatLaporan = (item) => {
    if (item.jenis === 'MBTI') {
      navigate('/hasil', { state: { tipe: item.hasil_tes?.[0]?.tipe_mbti, nama: item.nama } })
    } else if (item.jenis === 'DISC') {
      const h = item.hasil_disc?.[0]
      if (!h) return
      navigate('/hasil-disc', {
        state: {
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

  /* ── Helpers UI ────────────────────────────────────────────── */
  const jenisBadge = {
    MBTI:           'bg-blue-100 text-blue-700',
    DISC:           'bg-green-100 text-green-700',
    PAPI:           'bg-purple-100 text-purple-700',
    DASS:           'bg-teal-100 text-teal-700',
    'Love Language':'bg-rose-100 text-rose-700',
    MSDT:           'bg-orange-100 text-orange-700',
  }

  const discColors = { D: 'bg-red-500', I: 'bg-yellow-400', S: 'bg-green-500', C: 'bg-blue-500' }

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

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Topbar */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">Dashboard Admin — Platform Asesmen DJBC</h1>
        <div className="flex gap-3 items-center">
          <button onClick={handleExportExcel}
            className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            📥 Export CSV
          </button>
          <button onClick={() => navigate('/job-profile')}
            className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            💼 Job Profile
          </button>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 flex gap-6">

        {/* ── Tabel ── */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6">
          {/* Search */}
          <div className="mb-4">
            <input type="text" value={search}
              onChange={e => { setSearch(e.target.value); setSelected(null) }}
              placeholder="🔍 Cari nama peserta..."
              className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Daftar Peserta</h2>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                {['Semua', 'MBTI', 'DISC', 'PAPI', 'DASS', 'MSDT', 'Love Language'].map(t => (
                  <button key={t}
                    onClick={() => { setTab(t); setSelected(null) }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                      tab === t
                        ? t === 'MBTI'  ? 'bg-blue-600 text-white'
                        : t === 'DISC'  ? 'bg-green-600 text-white'
                        : t === 'PAPI'  ? 'bg-purple-600 text-white'
                        : t === 'DASS'  ? 'bg-teal-600 text-white'
                        : t === 'MSDT'  ? 'bg-orange-600 text-white'
                        : 'bg-white text-gray-700 shadow-sm'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >{t}</button>
                ))}
              </div>
              <span className="text-sm text-gray-400">{filtered.length} peserta</span>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-400">Memuat data...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-400">Belum ada peserta {tab !== 'Semua' ? tab : ''}.</p>
          ) : (
            <table className="w-full text-base">
              <thead>
                <tr className="bg-blue-50 text-left text-sm font-semibold text-gray-600">
                  <th className="px-5 py-3 rounded-l">Nama</th>
                  <th className="px-5 py-3">Unit Kerja</th>
                  <th className="px-5 py-3">Jenis</th>
                  <th className="px-5 py-3">Hasil</th>
                  <th className="px-5 py-3 rounded-r">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const isSelected = selected?.jenis === p.jenis && selected?.id === p.id
                  return (
                    <tr key={`${p.jenis}-${p.id}`} onClick={() => setSelected(p)}
                      className={`border-t cursor-pointer transition ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                      <td className="px-5 py-3 font-semibold text-blue-600">{p.nama}</td>
                      <td className="px-5 py-3 text-gray-500 max-w-[200px] truncate">{p.jabatan || '-'}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${jenisBadge[p.jenis]}`}>
                          {p.jenis}
                        </span>
                      </td>
                      <td className="px-5 py-3 font-bold text-blue-700">{getHasil(p)}</td>
                      <td className="px-5 py-3 text-gray-400">
                        {new Date(p.created_at).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Detail Panel ── */}
        {selected && (
          <div className="w-80 bg-white rounded-2xl shadow p-6 flex-shrink-0">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Detail Peserta</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            {/* ─── MBTI ─── */}
            {selected.jenis === 'MBTI' && (
              <>
                <div className="bg-blue-600 text-white rounded-xl p-4 text-center mb-4">
                  <p className="text-xs opacity-75 mb-1">Tipe MBTI</p>
                  <p className="text-4xl font-black tracking-widest">{selected.hasil_tes?.[0]?.tipe_mbti || '—'}</p>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span className="text-gray-500">Nama</span><span className="font-medium">{selected.nama}</span></div>
                  <div className="flex justify-between gap-2"><span className="text-gray-500 flex-shrink-0">Email</span><span className="font-medium text-xs text-right truncate">{selected.email}</span></div>
                  <div className="flex justify-between gap-2"><span className="text-gray-500 flex-shrink-0">Unit Kerja</span><span className="font-medium text-xs text-right">{selected.jabatan || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tanggal</span><span className="font-medium">{new Date(selected.created_at).toLocaleDateString('id-ID')}</span></div>
                </div>
                {selected.hasil_tes?.[0] && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">Skor Dimensi</p>
                    {[
                      ['E', selected.hasil_tes[0].skor_e, 'I', selected.hasil_tes[0].skor_i],
                      ['S', selected.hasil_tes[0].skor_s, 'N', selected.hasil_tes[0].skor_n],
                      ['T', selected.hasil_tes[0].skor_t, 'F', selected.hasil_tes[0].skor_f],
                      ['J', selected.hasil_tes[0].skor_j, 'P', selected.hasil_tes[0].skor_p],
                    ].map(([a, sa, b, sb]) => (
                      <div key={a} className="mb-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{a} ({sa})</span><span>{b} ({sb})</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(sa / (sa + sb)) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ─── DISC ─── */}
            {selected.jenis === 'DISC' && (
              <>
                <div className="bg-green-600 text-white rounded-xl p-4 text-center mb-4">
                  <p className="text-xs opacity-75 mb-1">Profil DISC</p>
                  <p className="text-4xl font-black tracking-widest">{selected.hasil_disc?.[0]?.profil || '—'}</p>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span className="text-gray-500">Nama</span><span className="font-medium">{selected.nama}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">NIP</span><span className="font-medium">{selected.nip}</span></div>
                  <div className="flex justify-between gap-2"><span className="text-gray-500 flex-shrink-0">Unit Kerja</span><span className="font-medium text-xs text-right">{selected.jabatan || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tanggal</span><span className="font-medium">{new Date(selected.created_at).toLocaleDateString('id-ID')}</span></div>
                </div>
                {selected.hasil_disc?.[0] && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">Skor DISC (Change)</p>
                    {[
                      ['D', selected.hasil_disc[0].skor_d_change, 'Dominance'],
                      ['I', selected.hasil_disc[0].skor_i_change, 'Influence'],
                      ['S', selected.hasil_disc[0].skor_s_change, 'Steadiness'],
                      ['C', selected.hasil_disc[0].skor_c_change, 'Conscientiousness'],
                    ].map(([key, val, label]) => (
                      <div key={key} className="mb-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span className="font-bold">{key} — {label}</span>
                          <span>{val > 0 ? '+' : ''}{val}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full ${discColors[key]} rounded-full`}
                            style={{ width: `${Math.max(0, Math.min((val / 12) * 100, 100))}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ─── PAPI ─── */}
            {selected.jenis === 'PAPI' && (
              <>
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-4 text-center mb-4">
                  <p className="text-xs opacity-75 mb-1">Profil PAPI Kostick</p>
                  <p className="text-2xl font-black tracking-widest leading-tight">
                    {selected.hasil_papi?.[0]?.profil || '—'}
                  </p>
                  <p className="text-xs opacity-60 mt-1">Dimensi dominan</p>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between"><span className="text-gray-500">Nama</span><span className="font-medium">{selected.nama}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">NIP</span><span className="font-medium">{selected.nip}</span></div>
                  <div className="flex justify-between gap-2"><span className="text-gray-500 flex-shrink-0">Unit Kerja</span><span className="font-medium text-xs text-right">{selected.jabatan || '-'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Tanggal</span><span className="font-medium">{new Date(selected.created_at).toLocaleDateString('id-ID')}</span></div>
                </div>
                {selected.hasil_papi?.[0] && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">Skor PAPI (0–9)</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                      {PAPI_SCALES.map(k => {
                        const val = selected.hasil_papi[0][`skor_${k.toLowerCase()}`] ?? 0
                        const pct = (val / 9) * 100
                        return (
                          <div key={k}>
                            <div className="flex justify-between text-xs mb-0.5">
                              <span className="font-bold text-gray-600">{k}</span>
                              <span className="text-gray-400">{val}</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ─── DASS ─── */}
            {selected.jenis === 'DASS' && (() => {
              const h = selected.hasil_dass?.[0]
              const dassSkor = h ? [
                { key: 'D', label: 'Depresi',   emoji: '💙', skor: h.skor_depresi,  kat: h.kategori_depresi  },
                { key: 'A', label: 'Kecemasan', emoji: '⚡', skor: h.skor_anxietas, kat: h.kategori_anxietas },
                { key: 'S', label: 'Stres',     emoji: '🌊', skor: h.skor_stres,    kat: h.kategori_stres    },
              ] : []
              const katWarna = { Normal: 'bg-emerald-100 text-emerald-700', Ringan: 'bg-lime-100 text-lime-700', Sedang: 'bg-amber-100 text-amber-700', Berat: 'bg-orange-100 text-orange-700', 'Sangat Berat': 'bg-rose-100 text-rose-700' }
              return (
                <>
                  <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl p-4 text-center mb-4">
                    <p className="text-xs opacity-75 mb-1">DASS-21</p>
                    <p className="text-sm font-black">Depression · Anxiety · Stress</p>
                    {h && (
                      <p className="text-xs opacity-80 mt-1">
                        D:{h.kategori_depresi} · A:{h.kategori_anxietas} · S:{h.kategori_stres}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between"><span className="text-gray-500">Nama</span><span className="font-medium">{selected.nama}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">NIP</span><span className="font-medium">{selected.nip}</span></div>
                    <div className="flex justify-between gap-2"><span className="text-gray-500 flex-shrink-0">Unit Kerja</span><span className="font-medium text-xs text-right">{selected.jabatan || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Tanggal</span><span className="font-medium">{new Date(selected.created_at).toLocaleDateString('id-ID')}</span></div>
                  </div>
                  {h && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">Skor DASS-21</p>
                      {dassSkor.map(({ emoji, label, skor, kat }) => (
                        <div key={label} className="mb-2.5">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-gray-700">{emoji} {label}</span>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold">{skor}</span>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${katWarna[kat] || 'bg-gray-100 text-gray-600'}`}>{kat}</span>
                            </div>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(skor / 42) * 100}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )
            })()}

            {/* ─── MSDT ─── */}
            {selected.jenis === 'MSDT' && (() => {
              const h = selected.hasil_msdt?.[0]
              return (
                <>
                  <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl p-4 text-center mb-4">
                    <p className="text-xs opacity-75 mb-1">Gaya Manajemen MSDT</p>
                    <p className="text-2xl font-black leading-tight">{h?.gaya || '—'}</p>
                    <p className="text-xs opacity-60 mt-1">Management Style Diagnostic Test</p>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between"><span className="text-gray-500">Nama</span><span className="font-medium">{selected.nama}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">NIP</span><span className="font-medium">{selected.nip}</span></div>
                    <div className="flex justify-between gap-2"><span className="text-gray-500 flex-shrink-0">Unit Kerja</span><span className="font-medium text-xs text-right">{selected.jabatan || '-'}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Tanggal</span><span className="font-medium">{new Date(selected.created_at).toLocaleDateString('id-ID')}</span></div>
                  </div>
                  {h && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">Skor MSDT</p>
                      {[
                        { label: 'TO (Task Orientation)',         val: h.skor_to,     max: 19, color: 'bg-orange-500' },
                        { label: 'RO (Relationship Orientation)', val: h.skor_ro,     max: 17, color: 'bg-amber-500'  },
                        { label: 'E Score (Efektivitas)',         val: h.e_score,     max: 4,  color: 'bg-green-500'  },
                        { label: 'Grand Total',                   val: h.grand_total, max: 50, color: 'bg-orange-400' },
                      ].map(({ label, val, max, color }) => (
                        <div key={label} className="mb-2">
                          <div className="flex justify-between text-xs mb-0.5">
                            <span className="text-gray-600">{label}</span>
                            <span className="font-bold">{val}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${color} rounded-full`} style={{ width: `${Math.min(100, (val / max) * 100)}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )
            })()}

            <div className="flex gap-2">
              <button onClick={() => handleLihatLaporan(selected)}
                className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition">
                Lihat Laporan
              </button>
              <button onClick={() => handleDelete(selected)}
                className="px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition text-sm">
                🗑️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
