import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Ilustrasi */}
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner">
          <span className="text-5xl">ðŸ”</span>
        </div>

        {/* Kode error */}
        <p className="text-7xl font-black text-gray-200 mb-2 leading-none">404</p>

        {/* Pesan */}
        <h1 className="text-xl font-bold text-gray-800 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Halaman yang Anda cari tidak ada atau sudah dipindahkan.
          Silakan kembali ke beranda.
        </p>

        {/* Tombol */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-200"
        >
          â† Kembali ke Beranda
        </button>
      </div>

      {/* Footer */}
      <p className="mt-12 text-xs text-gray-300">
        Â© 2025 Â· AssesIN
      </p>
    </div>
  )
}

