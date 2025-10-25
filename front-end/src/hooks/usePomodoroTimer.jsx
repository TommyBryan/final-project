// src/hooks/PomodoroTimer.jsx
import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

export default function PomodoroTimer({
  // theme props
  cardBg, textClass, secondaryText, borderClass,
  // pomodoro props from the hook
  pomodoroTime,
  pomodoroActive,
  isBreak,
  togglePomodoro,
  resetPomodoro,
  formatTime,
  studyDuration,
  breakDuration,
  setStudyDuration,
  setBreakDuration
}) {
  const timerLabel = isBreak ? "Time for a Break" : "Time to Focus";
  // dynamically change color based on the session type
  const timerColor = isBreak ? 'text-green-400' : 'text-indigo-400';

  return (
    <div className={`col-span-1 lg:col-span-1 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-between ${cardBg} border ${borderClass}`}>
      
      {/* header section */}
      <div className="w-full text-center">
        <h2 className={`text-xl font-bold ${textClass}`}>Pomodoro Timer</h2>
        <p className={`${secondaryText} mt-1`}>{timerLabel}</p>
      </div>

      {/* timer display */}
      <div className="my-8">
        <p className={`text-7xl font-mono font-bold tracking-tighter ${timerColor}`}>
          {formatTime(pomodoroTime)}
        </p>
      </div>

      {/* control buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={togglePomodoro}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-transform transform hover:scale-105 ${pomodoroActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          aria-label={pomodoroActive ? "Pause timer" : "Start timer"}
        >
          {pomodoroActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={resetPomodoro}
          className={`p-3 rounded-lg transition-colors ${secondaryText} hover:${textClass}`}
          aria-label="Reset Timer"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      {/* settings section for duration */}
      <div className={`w-full mt-8 pt-6 border-t ${borderClass} flex justify-around items-center`}>
        <div className="text-center">
          <label htmlFor="study-duration" className={`block text-sm font-medium ${secondaryText}`}>
            Study (min)
          </label>
          <input
            type="number"
            id="study-duration"
             value={Math.round(studyDuration / 60)} // convert seconds to minutes for display
            onChange={(e) => setStudyDuration(Number(e.target.value))}
          className={`w-24 mt-1 p-2 text-center rounded-md border ${borderClass} ${cardBg} ${textClass} focus:ring-2 focus:ring-indigo-500 disabled:opacity-50`}
             disabled={pomodoroActive} // disable input while the timer is running
          />
        </div>
        <div className="text-center">
          <label htmlFor="break-duration" className={`block text-sm font-medium ${secondaryText}`}>
            Break (min)
          </label>
          <input
            type="number"
            id="break-duration"
             value={Math.round(breakDuration / 60)} // convert seconds to minutes for display
            onChange={(e) => setBreakDuration(Number(e.target.value))}
            className={`w-24 mt-1 p-2 text-center rounded-md border ${borderClass} ${cardBg} ${textClass} focus:ring-2 focus:ring-indigo-500 disabled:opacity-50`}
             disabled={pomodoroActive} // disable input while the timer is running
          />
        </div>
      </div>
    </div>
  );
}