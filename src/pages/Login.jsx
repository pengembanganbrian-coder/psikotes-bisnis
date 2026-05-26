import { useState } from 'react'
import { supabase } from '../supabase'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email atau password salah. Silakan coba lagi.')
    else navigate('/dashboard')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 justify-center">
            <Logo size="lg" dark />
          </div>
          <p className="text-blue-300 text-sm font-bold tracking-widest uppercase mt-4">Assess Â· Insight Â· Grow</p>
          <p className="text-blue-400 text-xs mt-1">Portal Admin</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-6">
            <h2 className="text-lg font-bold text-white">Selamat Datang</h2>
            <p className="text-blue-200 text-sm mt-0.5">Masuk ke panel administrasi data tes</p>
          </div>

          {/* Card Body */}
          <div className="px-8 py-7">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 flex items-center gap-3">
                <span className="text-xl">âš ï¸</span>
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Alamat Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-400"
                  placeholder="email@djbc.go.id"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all placeholder-gray-400"
                  placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'â³ Memverifikasi...' : 'Masuk ke Dashboard â†’'}
              </button>
            </form>

            <div className="border-t border-gray-100 mt-6 pt-5">
              <button
                onClick={() => navigate('/')}
                className="w-full text-center text-sm text-gray-400 hover:text-blue-600 transition-colors"
              >
                â† Kembali ke Halaman Tes
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-blue-400/50 mt-6">
          Â© 2025 Â· AssesIN
        </p>
      </div>
    </div>
  )
}

export default Login

