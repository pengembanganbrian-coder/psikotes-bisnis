import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/job-profile" element={<ProtectedRoute><JobProfile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App