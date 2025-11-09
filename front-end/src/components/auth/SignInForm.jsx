import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabaseClient'

export default function SignInForm() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleSignIn = async (e) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			})
			if (error) throw error
			navigate('/')
		} catch (error) {
			setError(error.message)
		} finally {
			setLoading(false)
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
