import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Tes from './pages/Tes'
import Hasil from './pages/Hasil'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tes" element={<Tes />} />
        <Route path="/hasil" element={<Hasil />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App