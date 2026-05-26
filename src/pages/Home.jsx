import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <Logo size="md" dark />
          <div>
            <p className="text-white font-bold text-sm leading-tight">AssesIN â€” Platform Asesmen Psikologi</p>
          </div>
        </div>
        <div />
      </header>

      {/* Hero */}
      <main className="flex-1 px-6 py-14">
        <div className="max-w-6xl mx-auto">

          {/* Logo + Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 justify-center mb-6">
              <Logo size="lg" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 leading-tight mb-3">
              Asesmen Psikologi{' '}
              <span className="text-blue-700">Digital</span>
            </h1>
            <p className="text-blue-600 font-bold text-base tracking-widest uppercase mb-3">
              Assess Â· Insight Â· Grow
            </p>
            <p className="text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
              Platform psikotes berbasis web untuk pemetaan potensi dan kepribadian sumber daya manusia
            </p>
          </div>

          {/* Section label */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 text-center">Pilih Jenis Tes</p>

          {/* Test Cards baris 1 â€” 2 kolom di desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

            {/* MBTI Card */}
            <button
              onClick={() => navigate('/tes')}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:shadow-blue-100/60 p-7 text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-300 mb-5">
                <span className="text-white font-black text-base tracking-wide">MBTI</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Tes Kepribadian MBTI</h3>
              <p className="text-sm text-gray-500 mb-4">Myers-Briggs Type Indicator Â· 16 tipe kepribadian</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded-full">ðŸ“ 60 soal</span>
                <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded-full">â± ~15 menit</span>
                <span className="text-xs bg-gray-50 text-gray-500 font-medium px-3 py-1.5 rounded-full">EÂ·IÂ·SÂ·NÂ·TÂ·FÂ·JÂ·P</span>
              </div>
              <div className="w-full bg-blue-600 group-hover:bg-blue-700 text-white font-bold text-base py-3 rounded-xl text-center transition-all">
                Mulai Tes â†’
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
              <p className="text-sm text-gray-500 mb-4">Dominance Â· Influence Â· Steadiness Â· Conscientiousness</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1.5 rounded-full">ðŸ“ 24 soal</span>
                <span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1.5 rounded-full">â± ~7 menit</span>
                <span className="text-xs bg-gray-50 text-gray-500 font-medium px-3 py-1.5 rounded-full">D Â· I Â· S Â· C</span>
              </div>
              <div className="w-full bg-green-600 group-hover:bg-green-700 text-white font-bold text-base py-3 rounded-xl text-center transition-all">
                Mulai Tes â†’
              </div>
            </button>

            {/* PAPI Card */}
            <button
              onClick={() => navigate('/tes-papi')}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-200 shadow-sm hover:shadow-xl hover:shadow-purple-100/60 p-7 text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-105 transition-transform duration-300 mb-5">
                <span className="text-white font-black text-xs tracking-wide text-center leading-tight">PAPI<br/>Kostick</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Tes PAPI Kostick</h3>
              <p className="text-sm text-gray-500 mb-4">Personality and Preference Inventory Â· 20 skala</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-purple-50 text-purple-700 font-semibold px-3 py-1.5 rounded-full">ðŸ“ 90 pasangan soal</span>
                <span className="text-xs bg-purple-50 text-purple-700 font-semibold px-3 py-1.5 rounded-full">â± ~20 menit</span>
              </div>
              <div className="w-full bg-purple-600 group-hover:bg-purple-700 text-white font-bold text-base py-3 rounded-xl text-center transition-all">
                Mulai Tes â†’
              </div>
            </button>

            {/* DASS-21 Card */}
            <button
              onClick={() => navigate('/tes-dass')}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-teal-200 shadow-sm hover:shadow-xl hover:shadow-teal-100/60 p-7 text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-200 group-hover:scale-105 transition-transform duration-300 mb-5">
                <span className="text-white font-black text-xs tracking-wide text-center leading-tight">DASS<br/>21</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Tes DASS-21</h3>
              <p className="text-sm text-gray-500 mb-4">Depression Â· Anxiety Â· Stress Scales</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-3 py-1.5 rounded-full">ðŸ“ 21 pernyataan</span>
                <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-3 py-1.5 rounded-full">â± ~5 menit</span>
                <span className="text-xs bg-gray-50 text-gray-500 font-medium px-3 py-1.5 rounded-full">D Â· A Â· S</span>
              </div>
              <div className="w-full bg-teal-600 group-hover:bg-teal-700 text-white font-bold text-base py-3 rounded-xl text-center transition-all">
                Mulai Tes â†’
              </div>
            </button>

          </div>

          {/* Test Cards baris 2 â€” MSDT + Love Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

            {/* MSDT Card */}
            <button
              onClick={() => navigate('/tes-msdt')}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-xl hover:shadow-orange-100/60 p-7 text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 group-hover:scale-105 transition-transform duration-300 mb-5">
                <span className="text-white font-black text-xs tracking-wide text-center leading-tight">MSDT</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Tes Gaya Manajemen MSDT</h3>
              <p className="text-sm text-gray-500 mb-4">Management Style Diagnostic Test Â· 8 gaya kepemimpinan</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-orange-50 text-orange-700 font-semibold px-3 py-1.5 rounded-full">ðŸ“ 64 soal</span>
                <span className="text-xs bg-orange-50 text-orange-700 font-semibold px-3 py-1.5 rounded-full">â± ~20 menit</span>
                <span className="text-xs bg-gray-50 text-gray-500 font-medium px-3 py-1.5 rounded-full">ðŸ¢ 8 gaya</span>
              </div>
              <div className="w-full bg-orange-600 group-hover:bg-orange-700 text-white font-bold text-base py-3 rounded-xl text-center transition-all">
                Mulai Tes â†’
              </div>
            </button>

            {/* Love Language Card */}
            <button
              onClick={() => navigate('/tes-love-language')}
              className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-rose-200 shadow-sm hover:shadow-xl hover:shadow-rose-100/60 p-7 text-left transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200 group-hover:scale-105 transition-transform duration-300 mb-5">
                <span className="text-2xl">ðŸ’—</span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">Tes Love Language</h3>
              <p className="text-sm text-gray-500 mb-4">Bahasa Kasih Â· Gaya Apresiasi & Motivasi</p>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs bg-rose-50 text-rose-700 font-semibold px-3 py-1.5 rounded-full">ðŸ“ 30 pasangan</span>
                <span className="text-xs bg-rose-50 text-rose-700 font-semibold px-3 py-1.5 rounded-full">â± ~8 menit</span>
                <span className="text-xs bg-gray-50 text-gray-500 font-medium px-3 py-1.5 rounded-full">W Â· Q Â· G Â· A Â· P</span>
              </div>
              <div className="w-full bg-rose-600 group-hover:bg-rose-700 text-white font-bold text-base py-3 rounded-xl text-center transition-all">
                Mulai Tes â†’
              </div>
            </button>

          </div>

          {/* Info note */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-sm text-amber-800 text-center leading-relaxed">
              ðŸ”’ Hasil tes bersifat <strong>rahasia</strong> dan digunakan untuk kepentingan pengembangan sumber daya manusia.
              Kerjakan dengan jujur untuk hasil yang akurat.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Â© 2025 Â· AssesIN
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

