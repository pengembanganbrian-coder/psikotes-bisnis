import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import Home from './pages/Home'
import Login from './pages/Login'
import Tes from './pages/Tes'
import Hasil from './pages/Hasil'
import Dashboard from './pages/Dashboard'
import TesDisc from './pages/TesDisc'
import HasilDisc from './pages/HasilDisc'
import TesPapi from './pages/TesPapi'
import HasilPapi from './pages/HasilPapi'
import TesDass from './pages/TesDass'
import HasilDass from './pages/HasilDass'
import JobProfile from './pages/JobProfile'
import ProtectedRoute from './components/ProtectedRoute'
import TesLoveLanguage from './pages/TesLoveLanguage'
import HasilLoveLanguage from './pages/HasilLoveLanguage'
import TesMsdt from './pages/TesMsdt'
import HasilMsdt from './pages/HasilMsdt'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'

// Listens for Supabase PASSWORD_RECOVERY event (fired when user clicks the reset link).
// Must live inside BrowserRouter so it can call useNavigate().
function AuthListener() {
  const navigate = useNavigate()
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        navigate('/reset-password', { replace: true })
      }
    })
    return () => subscription.unsubscribe()
  }, [navigate])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <AuthListener />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tes" element={<Tes />} />
        <Route path="/hasil" element={<Hasil />} />
        <Route path="/tes-disc" element={<TesDisc />} />
        <Route path="/hasil-disc" element={<HasilDisc />} />
        <Route path="/tes-papi" element={<TesPapi />} />
        <Route path="/hasil-papi" element={<HasilPapi />} />
        <Route path="/tes-dass" element={<TesDass />} />
        <Route path="/hasil-dass" element={<HasilDass />} />
        <Route path="/tes-love-language" element={<TesLoveLanguage />} />
        <Route path="/hasil-love-language" element={<HasilLoveLanguage />} />
        <Route path="/tes-msdt" element={<TesMsdt />} />
        <Route path="/hasil-msdt" element={<HasilMsdt />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/job-profile" element={<ProtectedRoute><JobProfile /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App