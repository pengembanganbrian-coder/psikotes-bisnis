import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <img src="/logo-djbc.png" alt="Logo DJBC" className="h-9 w-auto" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">Psikotes DJBC</p>
            <p className="text-blue-300 text-xs leading-tight">Platform Asesmen SDM</p>
          </div>
        </div>
        <div />
      </header>

      {/* Hero */}
      <main className="flex-1 px-6 py-14">
        <div className="max-w-6xl mx-auto">

          {/* Logo + Title */}
          <div className="text-center mb-12">
            <img src="/logo-djbc.png" alt="Logo DJBC" className="h-24 w-auto mx-auto mb-6" />
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
              Sistem Aktif
            </div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight mb-4">
              Asesmen Psikologi{' '}
              <span className="text-blue-700">DJBC</span>
            </h1>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
              Platform psikotes berbasis web untuk pemetaan potensi dan kepribadian pegawai DJBC
            </p>
          </div>

          {/* Section label */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 text-center">Pilih Jenis Tes</p>

          {/* Test Cards — 2 kolom di desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

            {/* MBTI Card */}
            <button
              onClick={() => navigate('/tes')}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 p-7 text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-300 mb-5">
                <span className="text-white font-black text-base tracking-wide">MBTI</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Tes Kepribadian MBTI</h3>
              <p className="text-sm text-gray-500 mb-4">Myers-Briggs Type Indicator · 16 tipe kepribadian</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded-full">📝 60 soal</span>
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded-full">⏱ ~15 menit</span>
                <span className="text-xs bg-gray-50 text-gray-500 font-medium px-3 py-1.5 rounded-full">E·I·S·N·T·F·J·P</span>
              </div>
              <div className="w-full bg-blue-600 group-hover:bg-blue-700 text-white font-bold text-base py-3 rounded-xl text-center transition-all">
                Mulai Tes →
              </div>
            </button>

            {/* DISC Card */}
            <button
              onClick={() => navigate('/tes-disc')}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-green-200 shadow-sm hover:shadow-xl hover:shadow-green-100/60 p-7 text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 group-hover:scale-105 transition-transform duration-300 mb-5">
                <span className="text-white font-black text-base tracking-wide">DISC</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Tes Kepribadian DISC</h3>
              <p className="text-sm text-gray-500 mb-4">Dominance · Influence · Steadiness · Conscientiousness</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1.5 rounded-full">📝 24 soal</span>
                <span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1.5 rounded-full">⏱ ~7 menit</span>
                <span className="text-xs bg-gray-50 text-gray-500 font-medium px-3 py-1.5 rounded-full">D · I · S · C</span>
              </div>
              <div className="w-full bg-green-600 group-hover:bg-green-700 text-white font-bold text-base py-3 rounded-xl text-center transition-all">
                Mulai Tes →
              </div>
            </button>
          </div>

          {/* Info note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-sm text-amber-800 text-center leading-relaxed">
              🔒 Hasil tes bersifat <strong>rahasia</strong> dan digunakan untuk kepentingan pemetaan SDM DJBC.
              Kerjakan dengan jujur untuk hasil yang akurat.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          © 2025 · Direktorat Jenderal Bea dan Cukai · Kementerian Keuangan RI
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-2 text-xs text-gray-300 hover:text-gray-400 transition-colors"
        >
          Login Admin
        </button>
      </footer>
    </div>
  )
}

export default Home
