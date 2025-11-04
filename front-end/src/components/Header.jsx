import React from 'react';
import { Menu, Music } from 'lucide-react';
import IntellectaLogo from '../assets/intellecta-logo.svg';

export default function Header({ darkMode, musicPlaying, setMusicPlaying, toggleSidebar }) {
  return (
    <header
      className={`shadow-md border-b transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Hamburger button */}
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700`}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 flex-grow justify-center md:justify-start">
          <img src={IntellectaLogo} alt="iNtellecta Logo" className="h-8 w-auto" />
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            iNtellecta
          </h1>
        </div>

        {/* Music Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMusicPlaying(!musicPlaying)}
            className={`p-2 rounded-lg transition-colors ${
              musicPlaying
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            <Music className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
