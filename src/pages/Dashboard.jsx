import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [peserta, setPeserta] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const fetchPeserta = async () => {
    const { data } = await supabase
      .from('peserta')
      .select('*, hasil_tes(*)')
      .order('created_at', { ascending: false })
    setPeserta(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchPeserta() }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus peserta ini?')) return
    await supabase.from('hasil_tes').delete().eq('peserta_id', id)
    await supabase.from('peserta').delete().eq('id', id)
    setSelected(null)
    fetchPeserta()
  }

  const handleExportExcel = () => {
    const rows = [['Nama', 'Email/NIP', 'Jabatan', 'Hasil MBTI', 'Tanggal']]
    peserta.forEach(p => {
      rows.push([
        p.nama,
        p.email,
        p.jabatan || '-',
        p.hasil_tes?.[0]?.tipe_mbti || 'Belum tes',
        new Date(p.created_at).toLocaleDateString('id-ID')
      ])
    })
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'peserta-psikotes-djbc.csv'
    a.click()
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-700">Dashboard HRD — Psikotes DJBC</h1>
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
            <span className="text-sm text-gray-400">{peserta.length} peserta</span>
          </div>

          {loading ? (
            <p className="text-gray-400">Memuat data...</p>
          ) : peserta.length === 0 ? (
            <p className="text-gray-400">Belum ada peserta.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 text-left">
                  <th className="px-4 py-2 rounded-l">Nama</th>
                  <th className="px-4 py-2">Jabatan</th>
                  <th className="px-4 py-2">Hasil MBTI</th>
                  <th className="px-4 py-2 rounded-r">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {peserta.map((p) => (
                  <tr
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className={`border-t cursor-pointer transition ${selected?.id === p.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                  >
                    <td className="px-4 py-2 font-medium text-blue-600">{p.nama}</td>
                    <td className="px-4 py-2 text-gray-500">{p.jabatan || '-'}</td>
                    <td className="px-4 py-2 font-bold text-blue-700">
                      {p.hasil_tes?.[0]?.tipe_mbti || 'Belum tes'}
                    </td>
                    <td className="px-4 py-2 text-gray-400">
                      {new Date(p.created_at).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
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

            <div className="bg-blue-600 text-white rounded-xl p-4 text-center mb-4">
              <p className="text-xs opacity-75 mb-1">Tipe MBTI</p>
              <p className="text-4xl font-black tracking-widest">{selected.hasil_tes?.[0]?.tipe_mbti || '-'}</p>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Nama</span>
                <span className="font-medium">{selected.nama}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">NIP/Email</span>
                <span className="font-medium">{selected.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Jabatan</span>
                <span className="font-medium">{selected.jabatan || '-'}</span>
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
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${(sa / (sa + sb)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => navigate('/hasil', { state: { tipe: selected.hasil_tes?.[0]?.tipe_mbti, nama: selected.nama } })}
                className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Lihat Laporan
              </button>
              <button
                onClick={() => handleDelete(selected.id)}
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