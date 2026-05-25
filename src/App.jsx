import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Tes from './pages/Tes'
import Hasil from './pages/Hasil'
import Dashboard from './pages/Dashboard'
import TesDisc from './pages/TesDisc'
import HasilDisc from './pages/HasilDisc'
import JobProfile from './pages/JobProfile'
import ProtectedRoute from './components/ProtectedRoute'

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
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/job-profile" element={<ProtectedRoute><JobProfile /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App