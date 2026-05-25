import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const dimensiLabel = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Conscientiousness' }
const warnaMap = {
  D: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500', hex: '#dc2626' },
  I: { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', bar: 'bg-yellow-400', hex: '#ca8a04' },
  S: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', bar: 'bg-green-500', hex: '#16a34a' },
  C: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', bar: 'bg-blue-500', hex: '#2563eb' },
}

// Template jabatan DJBC dengan skor DISC yang valid (D+I+S+C = 0)
const templateJabatan = [
  {
    kategori: 'Jabatan Struktural',
    items: [
      { nama: 'Kepala Kantor / Eselon II', ikon: '🏛️', deskripsi: 'Pemimpin strategis, tegas, visioner', D: 10, I: 6, S: -8, C: -8 },
      { nama: 'Kepala Bidang / Eselon III', ikon: '📋', deskripsi: 'Manajer operasional, direktif, komunikatif', D: 8, I: 4, S: -4, C: -8 },
      { nama: 'Kepala Seksi / Eselon IV', ikon: '📌', deskripsi: 'Pengawas pelaksanaan, tegas & terstruktur', D: 6, I: 2, S: -2, C: -6 },
    ]
  },
  {
    kategori: 'Pengawasan & Penindakan',
    items: [
      { nama: 'Penyidik / Penindakan', ikon: '🔍', deskripsi: 'Tegas, analitis, berani konfrontasi', D: 10, I: -2, S: -2, C: -6 },
      { nama: 'Patroli & Pengawasan Lapangan', ikon: '🛂', deskripsi: 'Tegas, cepat bertindak, waspada', D: 8, I: 0, S: -4, C: -4 },
      { nama: 'Intelijen Kepabeanan', ikon: '🕵️', deskripsi: 'Analitis mendalam, teliti, hati-hati', D: 2, I: -4, S: 0, C: 2 },
    ]
  },
  {
    kategori: 'Audit & Pemeriksaan',
    items: [
      { nama: 'Auditor Kepabeanan & Cukai', ikon: '📊', deskripsi: 'Sangat analitis, akurat, sistematis', D: -4, I: -8, S: 4, C: 8 },
      { nama: 'Pemeriksa Dokumen', ikon: '📄', deskripsi: 'Teliti, prosedural, sabar & konsisten', D: -4, I: -6, S: 4, C: 6 },
      { nama: 'Penilai / Klasifikasi Barang', ikon: '🏷️', deskripsi: 'Detail, akurat, berstandar tinggi', D: -2, I: -6, S: 2, C: 6 },
    ]
  },
  {
    kategori: 'Pelayanan & Komunikasi',
    items: [
      { nama: 'Pelayanan Pengguna Jasa', ikon: '🤝', deskripsi: 'Ramah, sabar, komunikatif & empatik', D: -6, I: 8, S: 6, C: -8 },
      { nama: 'Penyuluh Kepabeanan', ikon: '📢', deskripsi: 'Sangat komunikatif, antusias, persuasif', D: -4, I: 10, S: 2, C: -8 },
      { nama: 'Hubungan Masyarakat', ikon: '📣', deskripsi: 'Ekspresif, networking, presentatif', D: -4, I: 8, S: 4, C: -8 },
    ]
  },
  {
    kategori: 'Analisis & Kebijakan',
    items: [
      { nama: 'Analis Kebijakan', ikon: '📝', deskripsi: 'Sistematis, berbasis data, kritis', D: -4, I: -6, S: 2, C: 8 },
      { nama: 'Analis Data / Statistik', ikon: '📈', deskripsi: 'Sangat analitis, presisi, terstruktur', D: -6, I: -8, S: 6, C: 8 },
      { nama: 'Perancang Peraturan', ikon: '⚖️', deskripsi: 'Sistematis, teliti, berbasis aturan', D: -4, I: -4, S: 2, C: 6 },
    ]
  },
  {
    kategori: 'Teknologi & Sistem',
    items: [
      { nama: 'IT / Pengembang Sistem', ikon: '💻', deskripsi: 'Analitis, terstruktur, teliti & mandiri', D: -4, I: -8, S: 4, C: 8 },
      { nama: 'Pengelola Basis Data', ikon: '🗄️', deskripsi: 'Sangat detail, konsisten, prosedural', D: -6, I: -8, S: 6, C: 8 },
    ]
  },
  {
    kategori: 'Keuangan & Administrasi',
    items: [
      { nama: 'Bendahara / Akuntan', ikon: '💰', deskripsi: 'Akurat, teliti, patuh aturan', D: -6, I: -4, S: 4, C: 6 },
      { nama: 'Pengelola Kepegawaian (HRD)', ikon: '👥', deskripsi: 'Empatik, komunikatif, prosedural', D: -4, I: 6, S: 6, C: -8 },
      { nama: 'Pengelola BMN / Logistik', ikon: '📦', deskripsi: 'Teratur, konsisten, dapat diandalkan', D: -4, I: -4, S: 6, C: 2 },
    ]
  },
]

function getProfilLabel(D, I, S, C) {
  const scores = { D, I, S, C }
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const dom = sorted[0][0]
  const sec = sorted[1][1] > 0 ? sorted[1][0] : ''
  return dom + sec
}

function JobProfile() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showTemplate, setShowTemplate] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ nama_jabatan: '', skor_d: 0, skor_i: 0, skor_s: 0, skor_c: 0 })
  const navigate = useNavigate()

  const total = form.skor_d + form.skor_i + form.skor_s + form.skor_c
  const isValid = total === 0
  const profil = getProfilLabel(form.skor_d, form.skor_i, form.skor_s, form.skor_c)

  const fetchJobs = async () => {
    const { data } = await supabase.from('job_profile').select('*').order('nama_jabatan')
    setJobs(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchJobs() }, [])

  const handleSubmit = async () => {
    if (!form.nama_jabatan) { alert('Isi nama jabatan!'); return }
    if (!isValid) { alert(`Total skor D+I+S+C harus = 0! Sekarang: ${total > 0 ? '+' : ''}${total}`); return }
    if (editId) {
      await supabase.from('job_profile').update(form).eq('id', editId)
    } else {
      await supabase.from('job_profile').insert([form])
    }
    setForm({ nama_jabatan: '', skor_d: 0, skor_i: 0, skor_s: 0, skor_c: 0 })
    setShowForm(false)
    setEditId(null)
    fetchJobs()
  }

  const handleEdit = (job) => {
    setForm({ nama_jabatan: job.nama_jabatan, skor_d: job.skor_d, skor_i: job.skor_i, skor_s: job.skor_s, skor_c: job.skor_c })
    setEditId(job.id)
    setShowForm(true)
    setShowTemplate(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus jabatan ini?')) return
    await supabase.from('job_profile').delete().eq('id', id)
    fetchJobs()
  }

  const handlePilihTemplate = (tmpl) => {
    setForm(prev => ({ ...prev, skor_d: tmpl.D, skor_i: tmpl.I, skor_s: tmpl.S, skor_c: tmpl.C, nama_jabatan: tmpl.nama }))
    setShowTemplate(false)
    setShowForm(true)
  }

  const getDominan = (job) => {
    const scores = { D: job.skor_d, I: job.skor_i, S: job.skor_s, C: job.skor_c }
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  }

  const setDimensi = (dim, val) => {
    setForm(prev => ({ ...prev, [`skor_${dim.toLowerCase()}`]: val }))
  }

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Top Bar */}
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-blue-600 transition">← Dashboard</button>
          <h1 className="text-xl font-bold text-blue-700">Manajemen Job Profile</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setShowTemplate(true); setShowForm(false) }}
            className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition"
          >
            📋 Dari Template
          </button>
          <button
            onClick={() => { setShowForm(true); setShowTemplate(false); setEditId(null); setForm({ nama_jabatan: '', skor_d: 0, skor_i: 0, skor_s: 0, skor_c: 0 }) }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
          >
            + Tambah Manual
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">

        {/* === MODAL TEMPLATE === */}
        {showTemplate && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
              <div className="px-6 pt-6 pb-4 border-b flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="font-bold text-gray-800 text-lg">Template Jabatan DJBC</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Pilih jabatan sebagai dasar — skor sudah sesuai metodologi DISC (D+I+S+C = 0)</p>
                </div>
                <button onClick={() => setShowTemplate(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
              </div>
              <div className="overflow-y-auto flex-1 px-6 py-4 space-y-5">
                {templateJabatan.map(kat => (
                  <div key={kat.kategori}>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{kat.kategori}</p>
                    <div className="space-y-2">
                      {kat.items.map(tmpl => {
                        const profTmpl = getProfilLabel(tmpl.D, tmpl.I, tmpl.S, tmpl.C)
                        const dom = profTmpl[0]
                        const w = warnaMap[dom]
                        return (
                          <button
                            key={tmpl.nama}
                            onClick={() => handlePilihTemplate(tmpl)}
                            className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{tmpl.ikon}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="font-semibold text-gray-800 text-sm">{tmpl.nama}</p>
                                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${w.bg} ${w.text}`}>{profTmpl}</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-0.5">{tmpl.deskripsi}</p>
                              </div>
                              {/* Mini DISC bar */}
                              <div className="flex gap-1 items-end h-8 flex-shrink-0">
                                {[['D', tmpl.D], ['I', tmpl.I], ['S', tmpl.S], ['C', tmpl.C]].map(([d, v]) => (
                                  <div key={d} className="flex flex-col items-center gap-0.5">
                                    <div className="flex flex-col justify-end h-6">
                                      {v > 0
                                        ? <div className={`w-4 rounded-t-sm ${warnaMap[d].bar}`} style={{ height: `${Math.abs(v) / 24 * 100}%`, minHeight: 2 }} />
                                        : <div className={`w-4 rounded-b-sm opacity-30 ${warnaMap[d].bar}`} style={{ height: `${Math.abs(v) / 24 * 100}%`, minHeight: v !== 0 ? 2 : 0 }} />
                                      }
                                    </div>
                                    <span className={`text-[9px] font-black ${warnaMap[d].text}`}>{d}</span>
                                  </div>
                                ))}
                              </div>
                              <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition text-sm font-semibold flex-shrink-0">Pilih →</span>
                            </div>
                            {/* Skor mini */}
                            <div className="flex gap-3 mt-2 pl-11">
                              {[['D', tmpl.D], ['I', tmpl.I], ['S', tmpl.S], ['C', tmpl.C]].map(([d, v]) => (
                                <span key={d} className={`text-xs font-semibold ${warnaMap[d].text}`}>
                                  {d}: {v > 0 ? '+' : ''}{v}
                                </span>
                              ))}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === FORM TAMBAH / EDIT === */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-700">{editId ? 'Edit Jabatan' : 'Tambah Jabatan Baru'}</h2>
              <button onClick={() => setShowTemplate(true)} className="text-xs text-blue-500 hover:underline">
                📋 Ganti template
              </button>
            </div>

            {/* Nama */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jabatan</label>
              <input
                value={form.nama_jabatan}
                onChange={e => setForm({ ...form, nama_jabatan: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Contoh: Analis Kepegawaian"
              />
            </div>

            {/* Profil Preview + Total Constraint */}
            <div className="flex gap-3 mb-5">
              <div className={`flex-1 rounded-xl p-4 text-center border-2 ${isValid ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                <p className="text-xs text-gray-500 mb-1">Total D+I+S+C</p>
                <p className={`text-3xl font-black ${isValid ? 'text-green-600' : 'text-red-500'}`}>
                  {total > 0 ? '+' : ''}{total}
                </p>
                <p className={`text-xs mt-1 font-semibold ${isValid ? 'text-green-600' : 'text-red-500'}`}>
                  {isValid ? '✅ Valid (harus = 0)' : '⚠️ Harus = 0'}
                </p>
              </div>
              <div className="flex-1 rounded-xl p-4 text-center bg-blue-50 border-2 border-blue-200">
                <p className="text-xs text-gray-500 mb-1">Profil Dominan</p>
                <p className="text-3xl font-black text-blue-700">{profil || '—'}</p>
                <p className="text-xs mt-1 text-blue-500">
                  {(['D','I','S','C'].find(d => form[`skor_${d.toLowerCase()}`] === Math.max(form.skor_d, form.skor_i, form.skor_s, form.skor_c)) || '')
                    ? dimensiLabel[['D','I','S','C'].find(d => form[`skor_${d.toLowerCase()}`] === Math.max(form.skor_d, form.skor_i, form.skor_s, form.skor_c))]
                    : '—'}
                </p>
              </div>
            </div>

            {/* Hint distribusi sisa */}
            {!isValid && (
              <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 text-xs text-amber-700">
                💡 Sisa yang perlu dikurangi/ditambah: <strong>{total > 0 ? `-${total}` : `+${Math.abs(total)}`}</strong> dari dimensi lain agar total = 0
              </div>
            )}

            {/* Sliders */}
            <p className="text-sm font-medium text-gray-600 mb-3">Bobot DISC <span className="text-gray-400 font-normal">(range -24 s/d +24, total harus = 0)</span></p>
            <div className="grid grid-cols-2 gap-4 mb-5">
              {['D', 'I', 'S', 'C'].map(d => {
                const val = form[`skor_${d.toLowerCase()}`]
                const w = warnaMap[d]
                const pct = ((val + 24) / 48) * 100
                return (
                  <div key={d} className={`rounded-xl border-2 p-4 ${w.bg} ${w.border}`}>
                    <div className="flex items-center justify-between mb-1">
                      <label className={`text-sm font-black ${w.text}`}>{d}</label>
                      <span className="text-xs text-gray-400">{dimensiLabel[d]}</span>
                    </div>
                    <input
                      type="range" min="-24" max="24" value={val}
                      onChange={e => setDimensi(d, parseInt(e.target.value))}
                      className="w-full mb-2"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">-24</span>
                      <span className={`text-2xl font-black ${val > 0 ? w.text : val < 0 ? 'text-gray-400' : 'text-gray-300'}`}>
                        {val > 0 ? '+' : ''}{val}
                      </span>
                      <span className="text-xs text-gray-400">+24</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`flex-1 font-semibold py-2.5 rounded-lg transition ${isValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {editId ? 'Simpan Perubahan' : 'Tambah Jabatan'}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditId(null) }}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* === DAFTAR JABATAN === */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Daftar Jabatan ({jobs.length})</h2>
          {loading ? (
            <p className="text-gray-400">Memuat...</p>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-500 font-medium mb-1">Belum ada job profile.</p>
              <p className="text-sm text-gray-400 mb-4">Tambah dari template atau buat manual untuk mulai menghitung JPM.</p>
              <button
                onClick={() => setShowTemplate(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
              >
                📋 Pilih dari Template
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map(job => {
                const dom = getDominan(job)
                const w = warnaMap[dom]
                const profil = getProfilLabel(job.skor_d, job.skor_i, job.skor_s, job.skor_c)
                const total = job.skor_d + job.skor_i + job.skor_s + job.skor_c
                return (
                  <div key={job.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 ${w.bg} ${w.text} border-2 ${w.border}`}>
                        {profil}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-700">{job.nama_jabatan}</p>
                        <div className="flex gap-3 mt-1 flex-wrap">
                          {['D', 'I', 'S', 'C'].map(d => {
                            const v = job[`skor_${d.toLowerCase()}`]
                            return (
                              <span key={d} className={`text-xs font-semibold ${warnaMap[d].text}`}>
                                {d}: {v > 0 ? '+' : ''}{v}
                              </span>
                            )
                          })}
                          {total !== 0 && (
                            <span className="text-xs text-red-400 font-semibold">⚠️ total={total > 0 ? '+' : ''}{total}</span>
                          )}
                        </div>
                      </div>
                      {/* Mini bar chart */}
                      <div className="flex gap-1 items-end h-10 flex-shrink-0">
                        {['D', 'I', 'S', 'C'].map(d => {
                          const v = job[`skor_${d.toLowerCase()}`]
                          return (
                            <div key={d} className="flex flex-col items-center gap-0.5">
                              <div className="flex flex-col justify-end h-7">
                                {v > 0
                                  ? <div className={`w-4 rounded-t-sm ${warnaMap[d].bar}`} style={{ height: `${Math.abs(v) / 24 * 100}%`, minHeight: v !== 0 ? 3 : 0 }} />
                                  : <div className={`w-4 rounded-b-sm opacity-30 ${warnaMap[d].bar}`} style={{ height: `${Math.abs(v) / 24 * 100}%`, minHeight: v !== 0 ? 3 : 0 }} />
                                }
                              </div>
                              <span className={`text-[9px] font-black ${warnaMap[d].text}`}>{d}</span>
                            </div>
                          )
                        })}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => handleEdit(job)} className="text-sm text-blue-500 hover:underline">Edit</button>
                        <button onClick={() => handleDelete(job.id)} className="text-sm text-red-400 hover:underline">Hapus</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-700">
          <p className="font-bold mb-1">📐 Tentang Skor Job Profile DISC</p>
          <p>Skor mengikuti metodologi DISC: <strong>Change = Most − Least</strong>. Dengan 24 soal, total Most dan Least masing-masing = 24, sehingga <strong>D + I + S + C harus selalu = 0</strong>. Nilai positif berarti dimensi itu <em>dibutuhkan</em> untuk jabatan tersebut, nilai negatif berarti <em>kurang relevan</em>.</p>
        </div>
      </div>
    </div>
  )
}

export default JobProfile
