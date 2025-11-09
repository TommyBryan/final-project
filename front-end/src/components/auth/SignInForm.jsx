// Import necessary dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'

export default function SignInForm() {
	// Hook for programmatic navigation
	const navigate = useNavigate()
	// Form state management
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	// UI state management
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	// Handle form submission for sign in
	const handleSignIn = async (e) => {
		e.preventDefault() // Prevent default form submission
		setError('') // Clear any previous errors
		setLoading(true) // Show loading state

		try {
			// Attempt to sign in with Supabase
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			})
			if (error) throw error
			navigate('/') // Redirect to dashboard on success
		} catch (error) {
			setError(error.message) // Display any errors
		} finally {
			setLoading(false) // Reset loading state
		}
	}

	return (
		<form onSubmit={handleSignIn} className="flex flex-col gap-4">
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			)}
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="p-2 border rounded bg-transparent"
				required
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="p-2 border rounded bg-transparent"
				required
			/>
			<button
				type="submit"
				disabled={loading}
				className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
			>
				{loading ? 'Signing in...' : 'Sign In'}
			</button>
		</form>
	)
}
