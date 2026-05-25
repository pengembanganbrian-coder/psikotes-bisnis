import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const dimensiLabel = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Conscientiousness' }
const warnaMap = {
  D: 'text-red-600 bg-red-50 border-red-200',
  I: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  S: 'text-green-600 bg-green-50 border-green-200',
  C: 'text-blue-600 bg-blue-50 border-blue-200',
}

function JobProfile() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState({ nama_jabatan: '', skor_d: 0, skor_i: 0, skor_s: 0, skor_c: 0 })
  const navigate = useNavigate()

  const fetchJobs = async () => {
    const { data } = await supabase.from('job_profile').select('*').order('nama_jabatan')
    setJobs(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchJobs() }, [])

  const handleSubmit = async () => {
    if (!form.nama_jabatan) { alert('Isi nama jabatan!'); return }
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
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus jabatan ini?')) return
    await supabase.from('job_profile').delete().eq('id', id)
    fetchJobs()
  }

  const getDominan = (job) => {
    const scores = { D: job.skor_d, I: job.skor_i, S: job.skor_s, C: job.skor_c }
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-blue-600 transition">← Dashboard</button>
          <h1 className="text-xl font-bold text-blue-700">Manajemen Job Profile</h1>
        </div>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ nama_jabatan: '', skor_d: 0, skor_i: 0, skor_s: 0, skor_c: 0 }) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
          + Tambah Jabatan
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-8">

        {/* Form Tambah/Edit */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="font-bold text-gray-700 mb-4">{editId ? 'Edit Jabatan' : 'Tambah Jabatan Baru'}</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Jabatan</label>
              <input value={form.nama_jabatan} onChange={e => setForm({...form, nama_jabatan: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Contoh: Analis Kepegawaian" />
            </div>
            <p className="text-sm text-gray-500 mb-3">Set bobot DISC untuk jabatan ini (0-24):</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {['D','I','S','C'].map(d => (
                <div key={d} className={`rounded-xl border p-4 ${warnaMap[d]}`}>
                  <label className="block text-sm font-bold mb-2">{d} — {dimensiLabel[d]}</label>
                  <input type="range" min="0" max="24" value={form[`skor_${d.toLowerCase()}`]}
                    onChange={e => setForm({...form, [`skor_${d.toLowerCase()}`]: parseInt(e.target.value)})}
                    className="w-full mb-1" />
                  <div className="flex justify-between text-xs">
                    <span>0</span>
                    <span className="font-bold text-lg">{form[`skor_${d.toLowerCase()}`]}</span>
                    <span>24</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleSubmit} className="flex-1 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
                {editId ? 'Simpan Perubahan' : 'Tambah Jabatan'}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null) }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition">
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Daftar Jabatan */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="font-semibold text-gray-700 mb-4">Daftar Jabatan ({jobs.length})</h2>
          {loading ? (
            <p className="text-gray-400">Memuat...</p>
          ) : jobs.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 mb-2">Belum ada jabatan.</p>
              <p className="text-sm text-gray-400">Tambah jabatan untuk mulai menghitung JPM peserta.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map(job => {
                const dom = getDominan(job)
                const w = warnaMap[dom]
                return (
                  <div key={job.id} className="border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm ${w}`}>
                      {dom}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-700">{job.nama_jabatan}</p>
                      <div className="flex gap-3 mt-1">
                        {['D','I','S','C'].map(d => (
                          <span key={d} className="text-xs text-gray-500">
                            <span className="font-bold">{d}</span>: {job[`skor_${d.toLowerCase()}`]}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(job)} className="text-sm text-blue-500 hover:underline">Edit</button>
                      <button onClick={() => handleDelete(job.id)} className="text-sm text-red-400 hover:underline">Hapus</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JobProfile