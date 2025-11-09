import { useState } from 'react'
import { supabase } from '../../services/supabaseClient'

export default function ForgotPasswordForm() {
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [success, setSuccess] = useState(false)

	const handleResetPassword = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: window.location.origin + '/reset-password',
			})
			if (error) throw error
			setSuccess(true)
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
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
