// Import necessary dependencies
import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'

export default function SignUpForm() {
	// Form state management
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	// UI state management
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	// Handle form submission for sign up
	const handleSignUp = async (e) => {
		e.preventDefault() // Prevent default form submission
		setError('') // Clear any previous errors
		setLoading(true) // Show loading state

		try {
			// Attempt to create new account with Supabase
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { username: name } // Add username to user metadata
				}
			})
			if (error) throw error
			setSuccess(true) // Show success message
		} catch (error) {
			setError(error.message) // Display any errors
		} finally {
			setLoading(false) // Reset loading state
		}
	}

	if (success) {
		return (
			<div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
				Check your email to confirm your account!
			</div>
		)
	}

	return (
		<form onSubmit={handleSignUp} className="flex flex-col gap-4">
			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
					{error}
				</div>
			)}
			<input
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				className="p-2 border rounded bg-transparent"
				required
			/>
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
				{loading ? 'Creating Account...' : 'Sign Up'}
			</button>
		</form>
	)
}
