// src/components/Header.jsx
import React, { useState } from 'react';
import { Moon, Sun, Music, Menu, X } from 'lucide-react';
// Import Supabase client for logout functionality
import { supabase } from '../services/supabaseClient';
// Import navigation hook to redirect after logout
import { useNavigate } from 'react-router-dom';

import IntellectaLogo from '../assets/intellecta-logo.svg';

export default function Header({
  darkMode,
  setDarkMode,
  musicPlaying,
  setMusicPlaying,
  cardBg,
  borderClass,
  activeTab,
  setActiveTab
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu state
  const navigate = useNavigate(); // Used for redirecting after logout

  // Function to toggle mobile navigation menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      // End user session
      await supabase.auth.signOut();

      // Redirect to authentication page
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const navItemClass = `px-6 py-3 font-medium capitalize transition-colors block ${
    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
  } rounded-lg`;

  const navItemActiveClass =
    'border-l-4 border-indigo-600 text-indigo-600 bg-opacity-10';

  return (
    <header className={`${cardBg} shadow-md border-b ${borderClass}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and App Name */}
        <div className="flex items-center gap-3">
          <img
            src={IntellectaLogo}
            alt="iNtellecta Logo"
            className="h-8 w-auto text-indigo-600"
          />
          <h1 className="text-2xl font-bold">iNtellecta</h1>
        </div>

        {/* Desktop Navigation (hidden on small screens) */}
        <nav className="hidden md:flex gap-1">
          {['overview', 'flashcards', 'videos'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : darkMode
                  ? 'text-gray-400 hover:text-gray-200'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Right-side Controls: Music, Dark Mode, Logout, Hamburger */}
        <div className="flex items-center gap-4">
          {/* Music Toggle */}
          <button
            onClick={() => setMusicPlaying(!musicPlaying)}
            className={`p-2 rounded-lg transition-colors ${
              musicPlaying
                ? 'bg-indigo-600 text-white'
                : darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <Music className="w-5 h-5" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 rounded-lg ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div
          className={`md:hidden ${cardBg} pb-4 px-4 border-t ${borderClass} transition-all duration-300 ease-in-out`}
        >
          <nav className="flex flex-col gap-2 pt-2">
            {['overview', 'flashcards', 'videos'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMenuOpen(false); // Close menu after selection
                }}
                className={`${navItemClass} ${
                  activeTab === tab
                    ? navItemActiveClass
                    : darkMode
                    ? 'text-gray-300'
                    : 'text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
