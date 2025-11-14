import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import Logo from '../assets/intellecta-logo.svg';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function LandingPage() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Check Supabase session
  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error('Error fetching session:', error);
      setSession(data?.session || null);
      setLoading(false);
    };
    checkSession();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center text-lg ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-600'}`}>
        Loading...
      </div>
    );
  }

  if (session) return <Navigate to="/" replace />

  const bgClass = darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-br from-indigo-100 via-white to-blue-100';
  const cardBgClass = darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div className={`min-h-screen flex flex-col ${bgClass} transition-colors duration-300`}>
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6">
        <div className="flex items-center gap-3">
          <img src={Logo} alt="iNtellecta Logo" className="h-10 w-10" />
          <h1 className="text-3xl font-extrabold text-indigo-700">iNtellecta</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle Icon */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border-2 transition 
                        ${darkMode ? 'border-yellow-400 hover:bg-gray-700' : 'border-gray-700 hover:bg-gray-200'}`}
          >
            {darkMode
              ? <SunIcon className="h-6 w-6 text-yellow-400" />
              : <MoonIcon className="h-6 w-6 text-gray-700" />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Unleash Your Inner Intellect.
        </h2>
        <p className="text-lg max-w-2xl mb-8">
          iNtellecta is your all-in-one productivity hub featuring a Pomodoro timer,
          flashcards, and to-do tracking to help you stay organized and focused.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            to="/signup"
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition"
          >
            Wanna Get Started?
          </Link>
          <Link
            to="/signin"
            className="px-8 py-3 border rounded-xl hover:bg-indigo-50 transition"
            style={{ borderColor }}
          >
            I Have an Account
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl" style={{ gap: '3rem' }}>
          <FeatureCard
            title="Pomodoro Focus"
            text="Stay productive with a smart timer that helps you focus, rest, and repeat effectively."
            cardBgClass={cardBgClass}
          />
          <FeatureCard
            title="Flashcards & Notes"
            text="Create and review flashcards to keep your learning organized and easy to retain."
            cardBgClass={cardBgClass}
          />
          <FeatureCard
            title="AI Study Helper"
            text="Leverage AI to summarize content, suggest materials, and boost your study sessions."
            cardBgClass={cardBgClass}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 text-center text-sm border-t ${borderColor}`}>
        <p>© {new Date().getFullYear()} iNtellecta • Built by Paola & Tommy ᥫ᭡.</p>
        <div className="flex justify-center mt-2 gap-4">
          <a href="https://linkedin.com/in/paola-gonzalez-726322257" className="hover:text-indigo-600 transition">
            Paola's LinkedIn
          </a>
          <a href="https://www.linkedin.com/in/tommy-hernandez-arroyo-72193b339/" className="hover:text-indigo-600 transition">
            Tommy's LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, text, cardBgClass }) {
  return (
    <div className={`rounded-2xl shadow-md p-6 hover:shadow-lg transition ${cardBgClass}`}>
      <h3 className="text-xl font-semibold text-indigo-700 mb-2">{title}</h3>
      <p>{text}</p>
    </div>
  );
}
