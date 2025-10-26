import { useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email to confirm your account!')
        setIsSignUp(false) // Switch to sign in after signup
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/dashboard') // Redirect to dashboard
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-xl w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          {isSignUp ? 'Create Account' : 'Sign In'}
        </button>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 text-sm underline mt-2"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </form>
    </div>
  )
}
