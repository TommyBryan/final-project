// src/components/MusicPlayer.jsx
import React from 'react';
import { Music, Pause } from 'lucide-react';

export default function MusicPlayer({ cardBg, borderClass, secondaryText }) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 ${cardBg} border-t ${borderClass} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Music className="w-5 h-5 text-indigo-600" />
          <div>
            <p className="font-medium text-sm">Lofi Study Beats</p>
            <p className={`text-xs ${secondaryText}`}>Background Music</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-32 h-1 bg-gray-300 rounded-full">
            <div className="w-1/2 h-full bg-indigo-600 rounded-full"></div>
          </div>
          <button className="text-indigo-600">
            <Pause className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}