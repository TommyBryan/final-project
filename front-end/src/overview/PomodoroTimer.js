// src/components/overview/PomodoroTimer.js
import React from 'react';
import { Clock, Play, Pause } from 'lucide-react';

export default function PomodoroTimer({ darkMode, cardBg, secondaryText, borderClass, pomodoroTime, pomodoroActive, isBreak, togglePomodoro, resetPomodoro, formatTime }) {
  return (
    <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass}`}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-600" />
        <h2 className="text-xl font-semibold">Pomodoro Timer</h2>
      </div>
      <div className="text-center">
        <div className="text-5xl font-bold mb-2 text-indigo-600">
          {formatTime(pomodoroTime)}
        </div>
        <p className={`text-sm mb-6 ${secondaryText}`}>
          {isBreak ? 'Break Time' : 'Focus Time'}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={togglePomodoro}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            {pomodoroActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {pomodoroActive ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetPomodoro}
            className={`px-6 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}