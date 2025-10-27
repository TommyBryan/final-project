// src/pages/AuthPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import IntellectaLogo from '../assets/intellecta-logo.svg'
import { Sun, Moon } from 'lucide-react'

export default function AuthPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('') // Username for sign-up
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem('iNtellecta-darkMode')
      return stored ? JSON.parse(stored) : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    localStorage.setItem('iNtellecta-darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/')
      else setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate('/')
    })

    return () => listener.subscription.unsubscribe()
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username: name } }
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

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading...</p>

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center relative transition-colors duration-500 ${
        darkMode ? 'bg-gray-900' : ''
      }`}
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #1f2937, #111827)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,250,240,0.5))',
        animation: darkMode ? 'none' : 'gradientShift 10s ease infinite alternate'
      }}
    >
      <style>
        {`
          @keyframes gradientShift {
            0% { background: linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,250,240,0.5)); }
            50% { background: linear-gradient(135deg, rgba(250,255,250,0.5), rgba(240,255,255,0.5)); }
            100% { background: linear-gradient(135deg, rgba(255,245,255,0.5), rgba(255,255,250,0.5)); }
          }
        `}
      </style>

      {/* Dark Mode Toggle in top-right corner */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 p-2 rounded-full bg-white bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-80 text-gray-800 dark:text-gray-200 hover:bg-opacity-90 transition-all"
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      {/* Brand Header */}
      <div className="flex flex-col items-center mb-6 group">
        <img
          src={IntellectaLogo}
          alt="iNtellecta Logo"
          className={`h-16 w-16 mb-3 transition-transform duration-300 group-hover:scale-110 ${
            darkMode ? 'filter brightness-90' : ''
          }`}
        />
        <h1
          className={`text-3xl font-bold transition-colors duration-300 group-hover:text-indigo-900 ${
            darkMode ? 'text-indigo-200' : 'text-indigo-700'
          }`}
        >
          iNtellecta
        </h1>
      </div>

      {/* Auth Form */}
      <form
        onSubmit={handleSubmit}
        className={`p-8 shadow-2xl rounded-2xl w-80 flex flex-col gap-5 backdrop-blur-md transform transition-transform duration-300 hover:scale-[1.02]
          ${darkMode ? 'bg-gray-800 bg-opacity-90 text-gray-200' : 'bg-white bg-opacity-70 text-gray-800'}`}
      >
        <h2 className="text-2xl font-semibold text-center">
          {isSignUp ? 'Create an Account' : 'Welcome Back'}
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition-colors"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 transition-colors"
        >
          {isSignUp
            ? 'Already have an account? Sign in'
            : "Don't have an account? Create one"}
        </button>
      </form>
    </div>
  )
}
