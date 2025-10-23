// src/components/Header.jsx
import React from 'react';
import { Moon, Sun, Music, } from 'lucide-react';

import IntellectaLogo from '../assets/intellecta-logo.svg';

export default function Header({ darkMode, setDarkMode, musicPlaying, setMusicPlaying, cardBg, borderClass }) {
  return (
    
    <header className={`${cardBg} shadow-md border-b ${borderClass}`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">

          <img
            src={IntellectaLogo}
            alt="iNtellecta Logo"
            className="h-8 w-auto text-indigo-600"
          />
          <h1 className="text-2xl font-bold">iNtellecta</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMusicPlaying(!musicPlaying)}
            className={`p-2 rounded-lg transition-colors ${musicPlaying ? 'bg-indigo-600 text-white' : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            <Music className="w-5 h-5" />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
