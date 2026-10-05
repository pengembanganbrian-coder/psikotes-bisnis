import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../supabase'

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'auth' | 'unauth' | 'peserta'

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) { setStatus('unauth'); return }
      // Peserta juga bisa login (lewat "Laporan saya"), jadi sesi saja tidak
      // cukup: hanya akun di tabel admins yang boleh masuk dashboard.
      const { data: admin } = await supabase.rpc('is_admin')
      setStatus(admin === true ? 'auth' : 'peserta')
    })
  }, [])

  if (status === 'loading') return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">Memeriksa sesi...</p>
      </div>
    </div>
  )

  if (status === 'unauth') return <Navigate to="/login" replace />
  if (status === 'peserta') return <Navigate to="/laporan-saya" replace />

  return children
}

export default ProtectedRoute
