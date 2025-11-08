import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'

export default function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data, error }) => {
      console.log('Session check:', { data, error })
      setSession(data?.session)
      setLoading(false)
    }).catch(err => {
      console.error('Session check error:', err)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state change:', { session })
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <p>Loading...</p>

  return session ? children : <Navigate to="/auth" />
}
