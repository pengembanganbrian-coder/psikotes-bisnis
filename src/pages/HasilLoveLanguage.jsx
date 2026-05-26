import { useLocation, useNavigate } from 'react-router-dom'

const llInfo = {
  W: {
    nama:   'Words of Affirmation',
    indo:   'Kata-kata Penegasan',
    emoji:  '💬',
    warna:  'blue',
    deskripsi:
      'Anda merasa paling dihargai melalui ungkapan verbal — pujian tulus, ucapan terima kasih, ' +
      'kata-kata semangat, atau pesan singkat yang bermakna. Kritik yang kasar bisa terasa sangat ' +
      'menyakitkan bagi Anda.',
    ditempat_kerja:
      'Apresiasi verbal dari atasan atau rekan kerja sangat memotivasi Anda. Anda berkembang pesat ' +
      'dalam lingkungan yang sering memberikan umpan balik positif dan pengakuan atas kontribusi Anda.',
    tips_hr:
      'Berikan pengakuan verbal secara langsung maupun tertulis. Ucapan "kerja bagus" atau apresiasi ' +
      'di depan tim dapat meningkatkan motivasi dan kinerja pegawai ini secara signifikan.',
  },
  Q: {
    nama:   'Quality Time',
    indo:   'Waktu Berkualitas',
    emoji:  '⏳',
    warna:  'green',
    deskripsi:
      'Anda merasa paling dihargai ketika seseorang memberikan perhatian penuh dan hadir sepenuhnya ' +
      'bersama Anda. Bukan sekadar berada di tempat yang sama, tetapi benar-benar fokus dan terlibat ' +
      'dalam interaksi bersama Anda.',
    ditempat_kerja:
      'Anda menghargai rapat one-on-one yang fokus, diskusi mendalam, dan momen kolaborasi yang ' +
      'bermakna. Atasan yang meluangkan waktu untuk mendengar pendapat Anda membuat Anda merasa sangat dihargai.',
    tips_hr:
      'Jadwalkan sesi one-on-one secara rutin. Pastikan pertemuan berlangsung tanpa gangguan dan ' +
      'penuh keterlibatan. Libatkan pegawai ini dalam diskusi dan pengambilan keputusan tim.',
  },
  G: {
    nama:   'Receiving Gifts',
    indo:   'Menerima Hadiah',
    emoji:  '🎁',
    warna:  'purple',
    deskripsi:
      'Anda merasa paling dihargai melalui hadiah atau simbol perhatian fisik — bukan karena nilai ' +
      'materialnya, melainkan karena hadiah tersebut menunjukkan bahwa seseorang memikirkan Anda ' +
      'dan meluangkan usaha untuk menunjukkan kepedulian.',
    ditempat_kerja:
      'Penghargaan nyata seperti sertifikat, plakat, cendera mata, atau bahkan oleh-oleh kecil dari ' +
      'perjalanan dinas sangat bermakna bagi Anda. Pengakuan fisik atas kinerja membuat Anda termotivasi.',
    tips_hr:
      'Berikan penghargaan yang dapat dipegang secara fisik — sertifikat, trofi kecil, atau hadiah ' +
      'ulang tahun. Gestur kecil yang terencana jauh lebih berkesan daripada bonus tanpa sentuhan personal.',
  },
  A: {
    nama:   'Acts of Service',
    indo:   'Tindakan Pelayanan',
    emoji:  '🤝',
    warna:  'amber',
    deskripsi:
      'Anda merasa paling dihargai ketika seseorang bertindak nyata untuk meringankan beban Anda — ' +
      'membantu pekerjaan, mengambil alih tugas tertentu, atau menyelesaikan masalah secara proaktif. ' +
      'Bagi Anda, tindakan berbicara lebih keras dari kata-kata.',
    ditempat_kerja:
      'Dukungan praktis dari rekan kerja atau atasan — seperti membantu saat deadline ketat atau ' +
      'menyingkirkan hambatan pekerjaan — membuat Anda merasa benar-benar didukung dan dihargai.',
    tips_hr:
      'Tawarkan bantuan konkret saat beban kerja meningkat. Tunjukkan dukungan melalui tindakan ' +
      'nyata: hapus birokrasi yang tidak perlu, fasilitasi kebutuhan pekerjaan, dan berikan dukungan ' +
      'operasional yang aktif.',
  },
  P: {
    nama:   'Physical Touch',
    indo:   'Sentuhan Fisik',
    emoji:  '🤲',
    warna:  'rose',
    deskripsi:
      'Anda merasa paling terhubung melalui kontak fisik yang hangat dan tulus — jabat tangan erat, ' +
      'tepukan di bahu, atau high-five. Sentuhan fisik yang tepat menciptakan rasa aman, ' +
      'kedekatan, dan keterhubungan yang bermakna.',
    ditempat_kerja:
      'Interaksi fisik yang sopan dan profesional seperti jabat tangan saat bertemu, tepukan di ' +
      'bahu saat memberi semangat, atau high-five saat merayakan keberhasilan tim terasa sangat ' +
      'bermakna bagi Anda.',
    tips_hr:
      'Dalam konteks profesional, perhatikan isyarat fisik yang tepat — jabat tangan yang tulus ' +
      'saat bertemu, tepukan di bahu saat memberi apresiasi. Tetap perhatikan batas profesional ' +
      'dan budaya organisasi.',
  },
}

const warnaClass = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-800',   bar: 'bg-blue-500',   title: 'text-blue-700'   },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-800',  bar: 'bg-green-500',  title: 'text-green-700'  },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-800', bar: 'bg-purple-500', title: 'text-purple-700' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-200',  badge: 'bg-amber-100 text-amber-800',  bar: 'bg-amber-500',  title: 'text-amber-700'  },
  rose:   { bg: 'bg-rose-50',   border: 'border-rose-200',   badge: 'bg-rose-100 text-rose-800',    bar: 'bg-rose-500',   title: 'text-rose-700'   },
}

export default function HasilLoveLanguage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state    = location.state

  if (!state?.skor) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow p-8 text-center max-w-md">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-gray-600 mb-2 font-semibold">Data hasil tidak ditemukan.</p>
          <p className="text-gray-400 text-sm mb-6">Silakan kerjakan tes terlebih dahulu.</p>
          <button
            onClick={() => navigate('/tes-love-language')}
            className="bg-rose-600 text-white px-6 py-2.5 rounded-xl hover:bg-rose-700 transition font-semibold"
          >
            Kembali ke Tes
          </button>
        </div>
      </div>
    )
  }

  const { skor, utama, kedua, nama, nip, jabatan } = state
  const infoUtama = llInfo[utama]
  const warna     = warnaClass[infoUtama.warna]
  const maxSkor   = 12 // max per LL = 12 (setiap LL muncul di 12 pasangan dari 30 soal)

  // Urutan dari tertinggi ke terendah
  const ranking = Object.entries(skor).sort((a, b) => b[1] - a[1])

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-8 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-rose-200 text-sm mb-1">Hasil Tes Love Language</p>
          <h1 className="text-2xl font-black mb-0.5">{nama}</h1>
          <p className="text-rose-100 text-sm">{nip} · {jabatan}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">

        {/* Bahasa Kasih Utama */}
        <div className={`${warna.bg} border-2 ${warna.border} rounded-3xl p-7`}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Bahasa Kasih Utama</p>
          <div className="flex items-center gap-4 mb-5">
            <span className="text-5xl">{infoUtama.emoji}</span>
            <div>
              <h2 className={`text-2xl font-black ${warna.title}`}>{infoUtama.indo}</h2>
              <p className="text-sm text-gray-500 italic">{infoUtama.nama}</p>
            </div>
            <div className={`ml-auto ${warna.badge} font-black text-xl px-4 py-2 rounded-2xl`}>
              {skor[utama]}/12
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{infoUtama.deskripsi}</p>
        </div>

        {/* Skor Semua LL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-5">Skor Semua Bahasa Kasih</h3>
          <div className="space-y-4">
            {ranking.map(([key, val], idx) => {
              const info = llInfo[key]
              const w    = warnaClass[info.warna]
              const pct  = Math.round((val / maxSkor) * 100)
              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{info.emoji}</span>
                      <div>
                        <span className="text-sm font-bold text-gray-800">{info.indo}</span>
                        {idx === 0 && <span className="ml-2 text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">Utama</span>}
                        {idx === 1 && <span className="ml-2 text-xs bg-gray-100 text-gray-600 font-semibold px-2 py-0.5 rounded-full">Kedua</span>}
                      </div>
                    </div>
                    <span className={`text-sm font-black ${w.title}`}>{val}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`${w.bar} h-2.5 rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bahasa Kasih Kedua */}
        {(() => {
          const info2 = llInfo[kedua]
          const w2    = warnaClass[info2.warna]
          return (
            <div className={`${w2.bg} border ${w2.border} rounded-2xl p-6`}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Bahasa Kasih Kedua</p>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{info2.emoji}</span>
                <div>
                  <h3 className={`text-lg font-bold ${w2.title}`}>{info2.indo}</h3>
                  <p className="text-xs text-gray-400 italic">{info2.nama} · Skor: {skor[kedua]}/12</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{info2.deskripsi}</p>
            </div>
          )
        })()}

        {/* Implikasi di Tempat Kerja */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-3">💼 Implikasi di Tempat Kerja</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{infoUtama.ditempat_kerja}</p>
        </div>

        {/* Rekomendasi HR */}
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6">
          <h3 className="font-bold text-indigo-800 mb-3">📋 Rekomendasi untuk HR / Atasan</h3>
          <p className="text-sm text-indigo-700 leading-relaxed">{infoUtama.tips_hr}</p>
        </div>

        {/* Deskripsi Semua LL */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-bold text-gray-800 mb-5">📖 Deskripsi Lengkap 5 Bahasa Kasih</h3>
          <div className="space-y-5">
            {Object.entries(llInfo).map(([key, info]) => {
              const w = warnaClass[info.warna]
              return (
                <div key={key} className={`${w.bg} border ${w.border} rounded-xl p-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span>{info.emoji}</span>
                    <span className={`font-bold text-sm ${w.title}`}>{info.indo}</span>
                    <span className="text-xs text-gray-400 italic">— {info.nama}</span>
                    {key === utama && <span className="ml-auto text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">Anda</span>}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{info.deskripsi}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Tombol */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-rose-200"
        >
          ← Kembali ke Beranda
        </button>

      </div>
    </div>
  )
}
