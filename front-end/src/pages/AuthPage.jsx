// src/pages/AuthPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import IntellectaLogo from '../assets/intellecta-logo.svg'

export default function AuthPage() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false) // for dark mode toggle
  const [name, setName] = useState('') // username for sign up
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  // Check session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/')
      else setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/')
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      if (isSignUp) {
        // Include username in user_metadata
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username: name }
          }
        })
        if (error) throw error
        alert('Check your email to confirm your account!')
        setIsSignUp(false)
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-colors ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      
      {/* Dark mode toggle button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`absolute top-4 right-4 p-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        {darkMode ? 'Light' : 'Night'}
      </button>

      <form
        onSubmit={handleSubmit}
        className={`p-6 shadow-lg rounded-xl w-80 flex flex-col gap-4 backdrop-blur-md bg-white/30 ${darkMode ? 'bg-gray-800/50' : 'bg-white/30'}`}
      >
        {/* Logo and Project Name */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <img src={IntellectaLogo} alt="iNtellecta Logo" className="h-8 w-auto"/>
          <h1 className="text-2xl font-bold hover:text-indigo-600 transition-colors">iNtellecta</h1>
        </div>

        <h2 className="text-xl font-bold text-center">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Show Name input only on Sign Up */}
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        )}

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

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
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
