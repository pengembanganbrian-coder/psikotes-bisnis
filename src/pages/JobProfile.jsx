import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'

const dimensiLabel = { D: 'Dominance', I: 'Influence', S: 'Steadiness', C: 'Conscientiousness' }
const DC = {
  D: { hex: '#ef4444' },
  I: { hex: '#f59e0b' },
  S: { hex: '#22c55e' },
  C: { hex: '#3b82f6' },
}

const templateJabatan = [
  {
    kategori: 'Leadership & Management',
    items: [
      { nama: 'CEO / Direktur Utama', ikon: '🏛️', deskripsi: 'Pemimpin strategis, tegas, visioner', D: 10, I: 6, S: -8, C: -8 },
      { nama: 'Senior Manager / Head of Division', ikon: '📋', deskripsi: 'Manajer operasional, direktif, komunikatif', D: 8, I: 4, S: -4, C: -8 },
      { nama: 'Team Lead / Supervisor', ikon: '📌', deskripsi: 'Pengawas pelaksanaan, tegas & terstruktur', D: 6, I: 2, S: -2, C: -6 },
    ]
  },
  {
    kategori: 'Operations & Compliance',
    items: [
      { nama: 'Compliance Officer', ikon: '🔍', deskripsi: 'Tegas, analitis, berani konfrontasi', D: 10, I: -2, S: -2, C: -6 },
      { nama: 'Operations Manager', ikon: '⚙️', deskripsi: 'Tegas, cepat bertindak, waspada', D: 8, I: 0, S: -4, C: -4 },
      { nama: 'Risk & Fraud Analyst', ikon: '🕵️', deskripsi: 'Analitis mendalam, teliti, hati-hati', D: 2, I: -4, S: 0, C: 2 },
    ]
  },
  {
    kategori: 'Audit & Quality Assurance',
    items: [
      { nama: 'Internal Auditor', ikon: '📊', deskripsi: 'Sangat analitis, akurat, sistematis', D: -4, I: -8, S: 4, C: 8 },
      { nama: 'Quality Control Specialist', ikon: '📄', deskripsi: 'Teliti, prosedural, sabar & konsisten', D: -4, I: -6, S: 4, C: 6 },
      { nama: 'Business Analyst', ikon: '🏷️', deskripsi: 'Detail, akurat, berstandar tinggi', D: -2, I: -6, S: 2, C: 6 },
    ]
  },
  {
    kategori: 'Sales & Customer Relations',
    items: [
      { nama: 'Customer Service Manager', ikon: '🤝', deskripsi: 'Ramah, sabar, komunikatif & empatik', D: -6, I: 8, S: 6, C: -8 },
      { nama: 'Sales / Business Development', ikon: '📢', deskripsi: 'Sangat komunikatif, antusias, persuasif', D: -4, I: 10, S: 2, C: -8 },
      { nama: 'Public Relations / Marketing', ikon: '📣', deskripsi: 'Ekspresif, networking, presentatif', D: -4, I: 8, S: 4, C: -8 },
    ]
  },
  {
    kategori: 'Research & Strategy',
    items: [
      { nama: 'Strategy & Policy Analyst', ikon: '📝', deskripsi: 'Sistematis, berbasis data, kritis', D: -4, I: -6, S: 2, C: 8 },
      { nama: 'Data Scientist / Analyst', ikon: '📈', deskripsi: 'Sangat analitis, presisi, terstruktur', D: -6, I: -8, S: 6, C: 8 },
      { nama: 'Legal / Regulatory Affairs', ikon: '⚖️', deskripsi: 'Sistematis, teliti, berbasis aturan', D: -4, I: -4, S: 2, C: 6 },
    ]
  },
  {
    kategori: 'Technology & Systems',
    items: [
      { nama: 'Software Engineer / Developer', ikon: '💻', deskripsi: 'Analitis, terstruktur, teliti & mandiri', D: -4, I: -8, S: 4, C: 8 },
      { nama: 'Database Administrator', ikon: '🗄️', deskripsi: 'Sangat detail, konsisten, prosedural', D: -6, I: -8, S: 6, C: 8 },
    ]
  },
  {
    kategori: 'Finance & Administration',
    items: [
      { nama: 'Finance / Accountant', ikon: '💰', deskripsi: 'Akurat, teliti, patuh aturan', D: -6, I: -4, S: 4, C: 6 },
      { nama: 'HR / People & Culture', ikon: '👥', deskripsi: 'Empatik, komunikatif, prosedural', D: -4, I: 6, S: 6, C: -8 },
      { nama: 'Supply Chain / Logistics', ikon: '📦', deskripsi: 'Teratur, konsisten, dapat diandalkan', D: -4, I: -4, S: 6, C: 2 },
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

function MiniBar({ D, I, S, C, height = 32 }) {
  const max = 24
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height }}>
      {[['D', D], ['I', I], ['S', S], ['C', C]].map(([d, v]) => (
        <div key={d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: v >= 0 ? 'flex-end' : 'flex-start', height: height - 12 }}>
            <div style={{ width: '12px', borderRadius: '2px', backgroundColor: DC[d].hex, opacity: v === 0 ? 0.15 : v > 0 ? 0.9 : 0.35, height: `${Math.max(Math.abs(v) / max * 100, v !== 0 ? 10 : 0)}%`, minHeight: v !== 0 ? 2 : 0 }} />
          </div>
          <span style={{ fontSize: '9px', fontWeight: 800, color: DC[d].hex }}>{d}</span>
        </div>
      ))}
    </div>
  )
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
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: '48px' }}>

      {/* Top Bar */}
      <div style={{ background: 'rgba(9,9,15,0.97)', borderBottom: '1px solid var(--border)', padding: '16px var(--px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={() => navigate('/dashboard')} style={{ color: 'var(--text-muted)', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>← Dashboard</button>
          <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '17px', color: 'var(--text)' }}>Manajemen Job Profile</h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { setShowTemplate(true); setShowForm(false) }}
            style={{ border: '1px solid var(--accent-border)', color: 'var(--accent)', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'var(--accent-dim)', cursor: 'pointer' }}
          >
            📋 Dari Template
          </button>
          <button
            onClick={() => { setShowForm(true); setShowTemplate(false); setEditId(null); setForm({ nama_jabatan: '', skor_d: 0, skor_i: 0, skor_s: 0, skor_c: 0 }) }}
            style={{ background: 'var(--accent)', color: '#09090f', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            + Tambah Manual
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px var(--px)', display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Modal Template */}
        {showTemplate && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div className="dark-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexShrink: 0 }}>
                <div>
                  <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '15px', color: 'var(--text)', marginBottom: '4px' }}>Template Jabatan</h2>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Pilih jabatan sebagai dasar — skor sudah sesuai metodologi DISC (D+I+S+C = 0)</p>
                </div>
                <button onClick={() => setShowTemplate(false)} style={{ color: 'var(--text-muted)', fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>×</button>
              </div>
              <div style={{ overflowY: 'auto', flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {templateJabatan.map(kat => (
                  <div key={kat.kategori}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>{kat.kategori}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {kat.items.map(tmpl => {
                        const profTmpl = getProfilLabel(tmpl.D, tmpl.I, tmpl.S, tmpl.C)
                        const domHex = DC[profTmpl[0]]?.hex ?? '#d4a853'
                        return (
                          <button
                            key={tmpl.nama}
                            onClick={() => handlePilihTemplate(tmpl)}
                            style={{ width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface-2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = domHex + '60' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                          >
                            <span style={{ fontSize: '20px' }}>{tmpl.ikon}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <p style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text)' }}>{tmpl.nama}</p>
                                <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '99px', background: domHex + '22', color: domHex }}>{profTmpl}</span>
                              </div>
                              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{tmpl.deskripsi}</p>
                              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                                {[['D', tmpl.D], ['I', tmpl.I], ['S', tmpl.S], ['C', tmpl.C]].map(([d, v]) => (
                                  <span key={d} style={{ fontSize: '11px', fontWeight: 600, color: DC[d].hex }}>
                                    {d}: {v > 0 ? '+' : ''}{v}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <MiniBar D={tmpl.D} I={tmpl.I} S={tmpl.S} C={tmpl.C} />
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

        {/* Form Tambah / Edit */}
        {showForm && (
          <div className="dark-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>{editId ? 'Edit Jabatan' : 'Tambah Jabatan Baru'}</h2>
              <button onClick={() => setShowTemplate(true)} style={{ fontSize: '12px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer' }}>
                📋 Ganti template
              </button>
            </div>

            {/* Nama */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '6px' }}>Nama Jabatan</label>
              <input
                value={form.nama_jabatan}
                onChange={e => setForm({ ...form, nama_jabatan: e.target.value })}
                className="field"
                placeholder="Contoh: Product Manager"
              />
            </div>

            {/* Status & Profil */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div style={{ borderRadius: '10px', padding: '14px', textAlign: 'center', border: `1px solid ${isValid ? '#22c55e44' : '#ef444444'}`, background: isValid ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Total D+I+S+C</p>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '28px', color: isValid ? '#4ade80' : '#f87171' }}>{total > 0 ? '+' : ''}{total}</p>
                <p style={{ fontSize: '11px', fontWeight: 600, color: isValid ? '#4ade80' : '#f87171', marginTop: '4px' }}>{isValid ? '✅ Valid (harus = 0)' : '⚠️ Harus = 0'}</p>
              </div>
              <div style={{ borderRadius: '10px', padding: '14px', textAlign: 'center', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>Profil Dominan</p>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '28px', color: 'var(--accent)' }}>{profil || '—'}</p>
                <p style={{ fontSize: '11px', color: 'var(--accent)', marginTop: '4px' }}>
                  {dimensiLabel[profil[0]] || '—'}
                </p>
              </div>
            </div>

            {!isValid && (
              <div style={{ marginBottom: '14px', background: 'var(--accent-dim)', border: '1px solid var(--accent-border)', borderRadius: '8px', padding: '10px 14px', fontSize: '12px', color: 'var(--accent)' }}>
                💡 Sisa: <strong>{total > 0 ? `-${total}` : `+${Math.abs(total)}`}</strong> dari dimensi lain agar total = 0
              </div>
            )}

            {/* Sliders */}
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-sub)', marginBottom: '12px' }}>
              Bobot DISC <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(range -24 s/d +24, total harus = 0)</span>
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {['D', 'I', 'S', 'C'].map(d => {
                const val = form[`skor_${d.toLowerCase()}`]
                const hex = DC[d].hex
                return (
                  <div key={d} style={{ borderRadius: '10px', border: `1px solid ${hex}30`, padding: '14px', background: hex + '0a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <label style={{ fontSize: '13px', fontWeight: 800, color: hex }}>{d}</label>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{dimensiLabel[d]}</span>
                    </div>
                    <input
                      type="range" min="-24" max="24" value={val}
                      onChange={e => setDimensi(d, parseInt(e.target.value))}
                      style={{ width: '100%', marginBottom: '6px', accentColor: hex }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>-24</span>
                      <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 900, fontSize: '22px', color: val !== 0 ? hex : 'var(--text-muted)' }}>
                        {val > 0 ? '+' : ''}{val}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+24</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                style={{ flex: 1, fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', padding: '12px', borderRadius: '8px', border: 'none', cursor: isValid ? 'pointer' : 'not-allowed', background: isValid ? 'var(--accent)' : 'var(--surface-2)', color: isValid ? '#09090f' : 'var(--text-muted)' }}
              >
                {editId ? 'Simpan Perubahan' : 'Tambah Jabatan'}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditId(null) }}
                style={{ padding: '12px 20px', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-sub)', background: 'transparent', cursor: 'pointer', fontSize: '13px' }}
              >
                Batal
              </button>
            </div>
          </div>
        )}

        {/* Daftar Jabatan */}
        <div className="dark-card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '14px', color: 'var(--text)' }}>
              Daftar Jabatan ({jobs.length})
            </h2>
          </div>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Memuat...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <p style={{ fontSize: '36px', marginBottom: '12px' }}>📋</p>
              <p style={{ color: 'var(--text-sub)', fontWeight: 600, marginBottom: '4px' }}>Belum ada job profile.</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Tambah dari template atau buat manual untuk mulai menghitung JPM.</p>
              <button
                onClick={() => setShowTemplate(true)}
                style={{ background: 'var(--accent)', color: '#09090f', padding: '10px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                📋 Pilih dari Template
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {jobs.map((job, idx) => {
                const dom = getDominan(job)
                const hex = DC[dom]?.hex ?? '#d4a853'
                const profil = getProfilLabel(job.skor_d, job.skor_i, job.skor_s, job.skor_c)
                const jobTotal = job.skor_d + job.skor_i + job.skor_s + job.skor_c
                return (
                  <div key={job.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 24px', borderTop: idx === 0 ? 'none' : '1px solid var(--border)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '13px', flexShrink: 0, background: hex + '22', color: hex, border: `1px solid ${hex}44` }}>
                      {profil}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)', marginBottom: '4px' }}>{job.nama_jabatan}</p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {['D', 'I', 'S', 'C'].map(d => {
                          const v = job[`skor_${d.toLowerCase()}`]
                          return (
                            <span key={d} style={{ fontSize: '11px', fontWeight: 600, color: DC[d].hex }}>
                              {d}: {v > 0 ? '+' : ''}{v}
                            </span>
                          )
                        })}
                        {jobTotal !== 0 && (
                          <span style={{ fontSize: '11px', color: '#f87171', fontWeight: 600 }}>⚠️ total={jobTotal > 0 ? '+' : ''}{jobTotal}</span>
                        )}
                      </div>
                    </div>
                    <MiniBar D={job.skor_d} I={job.skor_i} S={job.skor_s} C={job.skor_c} height={36} />
                    <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
                      <button onClick={() => handleEdit(job)} style={{ fontSize: '12px', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => handleDelete(job.id)} style={{ fontSize: '12px', color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Hapus</button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <p style={{ fontWeight: 700, color: 'var(--text-sub)', marginBottom: '6px' }}>📐 Tentang Skor Job Profile DISC</p>
          <p>Skor mengikuti metodologi DISC: <strong style={{ color: 'var(--text-sub)' }}>Change = Most − Least</strong>. Dengan 24 soal, total Most dan Least masing-masing = 24, sehingga <strong style={{ color: 'var(--text-sub)' }}>D + I + S + C harus selalu = 0</strong>. Nilai positif berarti dimensi itu <em>dibutuhkan</em> untuk jabatan tersebut, nilai negatif berarti <em>kurang relevan</em>.</p>
        </div>

      </div>
    </div>
  )
}

export default JobProfile
