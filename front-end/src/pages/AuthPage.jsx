// Main authentication page component
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabaseClient'
import IntellectaLogo from '../assets/intellecta-logo.svg'
import { Moon, Sun } from 'lucide-react'
import AuthContainer from '../components/auth/AuthContainer'

export default function AuthPage() {
	// Navigation and UI state management
	const navigate = useNavigate()
	const [darkMode, setDarkMode] = useState(false)
	const [loading, setLoading] = useState(true)

	// Check for existing session on component mount
	useEffect(() => {
		// Get current session from Supabase
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate('/dashboard') // Redirect to dashboard if session exists
			else setLoading(false) // Show auth forms if no session
		})

		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			if (session) navigate('/dashboard')
		})

		return () => listener.subscription.unsubscribe()
	}, [navigate])

	if (loading) return <p>Loading...</p>

	return (
		<div className={`min-h-screen flex flex-col items-center justify-center transition-colors ${
			darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'
		}`}>
			{/* Dark mode toggle button */}
			<button
				onClick={() => setDarkMode(!darkMode)}
				className={`absolute top-4 right-4 p-2 rounded-full shadow-lg ${
					darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
				} transition-colors`}
			>
				{darkMode ? (
					<Sun className="w-5 h-5 text-yellow-400" />
				) : (
					<Moon className="w-5 h-5 text-gray-800" />
				)}
			</button>

			<div className="flex flex-col items-center gap-6">
				{/* Logo and Project Name */}
				<div className="flex justify-center items-center gap-3">
					<img src={IntellectaLogo} alt="iNtellecta Logo" className="h-12 w-auto" />
					<h1 className="text-3xl sm:text-4xl font-bold hover:text-indigo-600 transition-colors">
						iNtellecta
					</h1>
				</div>

				{/* Auth Container */}
				<AuthContainer darkMode={darkMode} />
			</div>
		</div>
	)
}
