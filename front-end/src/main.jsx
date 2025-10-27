import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Auth page is public */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Dashboard (App.jsx) is protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect to /auth if unknown path */}
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
