// Import necessary components and hooks
import { useState } from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'

// Main container component that manages which auth form to display
export default function AuthContainer({ darkMode }) {
	// State to track which form to show (signin, signup, or forgot password)
	const [authMode, setAuthMode] = useState('signin')

	// Function to render the appropriate form based on authMode
	const renderForm = () => {
		switch (authMode) {
			case 'signup':
				return <SignUpForm />
			case 'forgot':
				return <ForgotPasswordForm />
			default:
				return <SignInForm />
		}
	}

	return (
		<div className={`p-6 shadow-2xl rounded-xl w-80 flex flex-col gap-4 ${
			darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white/30 backdrop-blur-md text-gray-900'
		}`}>
			<div className="flex justify-center gap-8 mb-4">
				<button
					onClick={() => setAuthMode('signin')}
					className={`text-sm relative ${
						authMode === 'signin'
							? 'text-blue-500 font-bold after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-blue-500 after:bottom-0 after:left-0 after:shadow-[0_0_10px_#3B82F6] after:animate-pulse'
							: 'text-gray-500 hover:text-blue-400 transition-colors duration-300 hover:after:content-[""] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-400 hover:after:bottom-0 hover:after:left-0'
					}`}
				>
					Sign In
				</button>
				<button
					onClick={() => setAuthMode('signup')}
					className={`text-sm relative ${
						authMode === 'signup'
							? 'text-blue-500 font-bold after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-blue-500 after:bottom-0 after:left-0 after:shadow-[0_0_10px_#3B82F6] after:animate-pulse'
							: 'text-gray-500 hover:text-blue-400 transition-colors duration-300 hover:after:content-[""] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-400 hover:after:bottom-0 hover:after:left-0'
					}`}
				>
					Sign Up
				</button>
			</div>

			{renderForm()}

			{authMode === 'signin' && (
				<button
					onClick={() => setAuthMode('forgot')}
					className="text-sm text-blue-500 hover:text-blue-600 mt-2"
				>
					Forgot Password?
				</button>
			)}
		</div>
	)
}
