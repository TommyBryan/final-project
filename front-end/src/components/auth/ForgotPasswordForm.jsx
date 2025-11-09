// Import necessary dependencies
import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'

export default function ForgotPasswordForm() {
	// Form state management
	const [email, setEmail] = useState('')
	// UI state management
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	// Handle password reset request
	const handleResetPassword = async (e) => {
		e.preventDefault() // Prevent default form submission
		setError('') // Clear any previous errors
		setLoading(true) // Show loading state

		try {
			// Request password reset email from Supabase
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: window.location.origin + '/reset-password', // Redirect URL after reset
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
				Check your email for password reset instructions!
			</div>
		)
	}

	return (
		<form onSubmit={handleResetPassword} className="flex flex-col gap-4">
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
			<button
				type="submit"
				disabled={loading}
				className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
			>
				{loading ? 'Sending...' : 'Reset Password'}
			</button>
		</form>
	)
}
