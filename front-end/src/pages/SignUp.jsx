import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';

export default function SignUp() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSignUp = async (e) => {
		e.preventDefault();
		const { user, error } = await supabase.auth.signUp({
			email,
			password,
		});

		if (error) {
			setError(error.message);
		} else {
			alert('Check your email for confirmation!');
			navigate('/sign-in');
		}
	};

	return (
		<div className="min-h-screen flex justify-center items-center bg-gray-100">
			<form onSubmit={handleSignUp} className="p-6 bg-white rounded shadow-md w-80">
				<h2 className="text-2xl mb-4">Sign Up</h2>
				{error && <p className="text-red-500">{error}</p>}
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="mb-3 w-full p-2 border rounded"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="mb-3 w-full p-2 border rounded"
					required
				/>
				<button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
					Sign Up
				</button>
			</form>
		</div>
	);
}
