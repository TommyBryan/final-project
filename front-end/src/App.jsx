import { Routes, Route, Navigate } from 'react-router-dom'
import SignInSignUp from './pages/AuthPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { useEffect, useState } from 'react'
import { supabase } from './services/supabaseClient'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => setSession(session)
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <Routes>
      {!session ? (
        <Route path="*" element={<SignInSignUp />} />
      ) : (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  )
}
console.log('supabase client:', supabase)
export default App
