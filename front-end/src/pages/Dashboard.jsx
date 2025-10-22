import { supabase } from '../services/supabaseClient'

export default function Dashboard() {
  async function handleSignOut() {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <button
        onClick={handleSignOut}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  )
}
