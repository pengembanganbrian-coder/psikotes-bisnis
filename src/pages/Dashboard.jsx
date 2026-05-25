import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [peserta, setPeserta] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('Semua')
  const navigate = useNavigate()

  const fetchAllPeserta = async () => {
    const [{ data: mbti }, { data: disc }] = await Promise.all([
      supabase.from('peserta').select('*, hasil_tes(*)').order('created_at', { ascending: false }),
      supabase.from('peserta_disc').select('*, hasil_disc(*)').order('created_at', { ascending: false }),
    ])

    const mbtiList = (mbti || []).map(p => ({ ...p, jenis: 'MBTI', identifier: p.email }))
    const discList = (disc || []).map(p => ({ ...p, jenis: 'DISC', identifier: p.nip }))

    const merged = [...mbtiList, ...discList].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )

    setPeserta(merged)
    setLoading(false)
  }

  useEffect(() => { fetchAllPeserta() }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const handleDelete = async (item) => {
    if (!confirm('Hapus peserta ini?')) return
    if (item.jenis === 'MBTI') {
      await supabase.from('hasil_tes').delete().eq('peserta_id', item.id)
      await supabase.from('peserta').delete().eq('id', item.id)
    } else {
      await supabase.from('hasil_disc').delete().eq('peserta_id', item.id)
      await supabase.from('peserta_disc').delete().eq('id', item.id)
    }
    setSelected(null)
    fetchAllPeserta()
  }

  const handleExportExcel = () => {
    const rows = [['Nama', 'NIP/Email', 'Unit Kerja', 'Jenis Tes', 'Hasil', 'Tanggal']]
    peserta.forEach(p => {
      const hasil = p.jenis === 'MBTI'
        ? p.hasil_tes?.[0]?.tipe_mbti || 'Belum tes'
        : p.hasil_disc?.[0]?.profil || 'Belum tes'
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
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'peserta-psikotes-djbc.csv'
    a.click()
  }

  const handleLihatLaporan = (item) => {
    if (item.jenis === 'MBTI') {
      navigate('/hasil', { state: { tipe: item.hasil_tes?.[0]?.tipe_mbti, nama: item.nama } })
    } else {
      const h = item.hasil_disc?.[0]
      if (!h) return
      navigate('/hasil-disc', {
        state: {
          nama: item.nama,
          hasil: {
            profil: h.profil,
            mostD: h.skor_d_most, mostI: h.skor_i_most, mostS: h.skor_s_most, mostC: h.skor_c_most,
            leastD: h.skor_d_least, leastI: h.skor_i_least, leastS: h.skor_s_least, leastC: h.skor_c_least,
            changeD: h.skor_d_change, changeI: h.skor_i_change, changeS: h.skor_s_change, changeC: h.skor_c_change,
          },
        },
      })
    }
  }

  const jenisBadge = {
    MBTI: 'bg-blue-100 text-blue-700',
    DISC: 'bg-green-100 text-green-700',
  }

  const discColors = { D: 'bg-red-500', I: 'bg-yellow-400', S: 'bg-green-500', C: 'bg-blue-500' }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">Dashboard Admin — Psikotes DJBC</h1>
        <div className="flex gap-3 items-center">
          <button onClick={handleExportExcel} className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            📥 Export CSV
          </button>
          <button onClick={() => navigate('/job-profile')} className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            💼 Job Profile
          </button>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 flex gap-6">

        {/* Tabel Peserta */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Daftar Peserta</h2>
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                {['Semua', 'MBTI', 'DISC'].map(t => (
                  <button
                    key={t}
                    onClick={() => { setTab(t); setSelected(null) }}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                      tab === t
                        ? t === 'MBTI' ? 'bg-blue-600 text-white'
                          : t === 'DISC' ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 shadow-sm'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >{t}</button>
                ))}
              </div>
              <span className="text-sm text-gray-400">
                {peserta.filter(p => tab === 'Semua' || p.jenis === tab).length} peserta
              </span>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-400">Memuat data...</p>
          ) : peserta.filter(p => tab === 'Semua' || p.jenis === tab).length === 0 ? (
            <p className="text-gray-400">Belum ada peserta {tab !== 'Semua' ? tab : ''}.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="px-4 py-2 rounded-l">Nama</th>
                  <th className="px-4 py-2">Unit Kerja</th>
                  <th className="px-4 py-2">Jenis Tes</th>
                  <th className="px-4 py-2">Hasil</th>
                  <th className="px-4 py-2 rounded-r">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {peserta.filter(p => tab === 'Semua' || p.jenis === tab).map((p) => {
                  const hasil = p.jenis === 'MBTI'
                    ? p.hasil_tes?.[0]?.tipe_mbti || 'Belum tes'
                    : p.hasil_disc?.[0]?.profil || 'Belum tes'
                  const isSelected = selected?.jenis === p.jenis && selected?.id === p.id
                  return (
                    <tr
                      key={`${p.jenis}-${p.id}`}
                      onClick={() => setSelected(p)}
                      className={`border-t cursor-pointer transition ${isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-4 py-2 font-medium text-blue-600">{p.nama}</td>
                      <td className="px-4 py-2 text-gray-500 max-w-[200px] truncate">{p.jabatan || '-'}</td>
                      <td className="px-4 py-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${jenisBadge[p.jenis]}`}>
                          {p.jenis}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-bold text-blue-700">{hasil}</td>
                      <td className="px-4 py-2 text-gray-400">
                        {new Date(p.created_at).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Detail Peserta */}
        {selected && (
          <div className="w-80 bg-white rounded-2xl shadow p-6 flex-shrink-0">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Detail Peserta</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
            </div>

            {selected.jenis === 'MBTI' ? (
              <>
                <div className="bg-blue-600 text-white rounded-xl p-4 text-center mb-4">
                  <p className="text-xs opacity-75 mb-1">Tipe MBTI</p>
                  <p className="text-4xl font-black tracking-widest">{selected.hasil_tes?.[0]?.tipe_mbti || '-'}</p>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nama</span>
                    <span className="font-medium">{selected.nama}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">NIP/Email</span>
                    <span className="font-medium text-xs text-right truncate">{selected.email}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">Unit Kerja</span>
                    <span className="font-medium text-xs text-right">{selected.jabatan || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tanggal</span>
                    <span className="font-medium">{new Date(selected.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
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
                          <span>{a} ({sa})</span>
                          <span>{b} ({sb})</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(sa / (sa + sb)) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="bg-green-600 text-white rounded-xl p-4 text-center mb-4">
                  <p className="text-xs opacity-75 mb-1">Profil DISC</p>
                  <p className="text-4xl font-black tracking-widest">{selected.hasil_disc?.[0]?.profil || '-'}</p>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Nama</span>
                    <span className="font-medium">{selected.nama}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">NIP</span>
                    <span className="font-medium">{selected.nip}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="text-gray-500 flex-shrink-0">Unit Kerja</span>
                    <span className="font-medium text-xs text-right">{selected.jabatan || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tanggal</span>
                    <span className="font-medium">{new Date(selected.created_at).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>
                {selected.hasil_disc?.[0] && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-semibold uppercase">Skor DISC (Change)</p>
                    {[
                      ['D', selected.hasil_disc[0].skor_d_change, 'Dominance'],
                      ['I', selected.hasil_disc[0].skor_i_change, 'Influence'],
                      ['S', selected.hasil_disc[0].skor_s_change, 'Steadiness'],
                      ['C', selected.hasil_disc[0].skor_c_change, 'Conscientiousness'],
                    ].map(([key, val, label]) => {
                      const pct = Math.max(0, Math.min((val / 12) * 100, 100))
                      return (
                        <div key={key} className="mb-2">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span className="font-bold">{key} — {label}</span>
                            <span>{val > 0 ? '+' : ''}{val}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${discColors[key]} rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => handleLihatLaporan(selected)}
                className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Lihat Laporan
              </button>
              <button
                onClick={() => handleDelete(selected)}
                className="px-3 py-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition text-sm"
              >
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
