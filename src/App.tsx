import { useContext } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import './App.css'
import { Register } from './modules/auth/pages/Register'
import { Login } from './modules/auth/pages/Login'
import { Dashboard } from './components/Dashboard'
import { Base } from './layouts/Base'
import { AuthContext } from './contexts/auth'
import { getAuthToken } from './utils'

function App() {
  const authContext = useContext(AuthContext)
  const user = authContext?.user
  const token = getAuthToken()

  return (
    <BrowserRouter>
      <Base>
        {!token && !user ? (
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </Base>
    </BrowserRouter>
  )
}

export default App
