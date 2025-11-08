import { useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
	const navigate = useNavigate()
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		// Check current session
		supabase.auth.getSession().then(({ data }) => {
			if (!data.session) {
				navigate('/auth')
			} else {
				setUser(data.session.user)
			}
			setLoading(false)
		})

		// Listen for auth state changes
		const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
			if (!session) navigate('/auth')
			else setUser(session.user)
		})

		return () => listener.subscription.unsubscribe()
	}, [navigate])

	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut()
			navigate('/auth')
		} catch (error) {
			console.error('Error signing out:', error)
		}
	}

	if (loading) {
		return <p>Loading...</p>
	}	return (
		<div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
			<h1 className="text-3xl mb-4">Welcome, {user?.email}</h1>
			<button
				onClick={handleSignOut}
				className="bg-red-500 text-white py-2 px-4 rounded"
			>
				Sign Out
			</button>
		</div>
	)
}
