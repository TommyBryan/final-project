import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import AuthForm from './components/AuthForm'

function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold mb-4">Welcome! 🎉</h1>
      <button
        onClick={onLogout}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}

export default function App() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      {session ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <AuthForm />
      )}
    </div>
  )
}
