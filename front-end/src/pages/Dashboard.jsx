// Dashboard.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/auth')
      else setUser(data.session.user)
    })
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/auth')
  }

  if (!user) return <p>Loading...</p>

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-3xl mb-4">Welcome, {user.email}</h1>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  )
}
