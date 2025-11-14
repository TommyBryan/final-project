// src/components/overview/PomodoroTimer.jsx
import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

/**
 * PomodoroTimer - presentational component for displaying and controlling a pomodoro timer.
 * Props:
 *  - pomodoroTime: remaining seconds
 *  - studyDuration / breakDuration: durations in seconds
 *  - setStudyDuration / setBreakDuration: expect minutes (UI uses minutes)
 */
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
  // subtitle that reflects current session
  const timerLabel = isBreak ? "Time for a Break" : "Time to Focus";
  // color changes with session type
  const timerColor = isBreak ? 'text-green-400' : 'text-indigo-400';

  return (
    // The outer container's Tailwind classes determine the box size & shape:
    // - `col-span-1 lg:col-span-1` controls how much grid space the card occupies.
    // - `p-6` is the internal padding (increase to make the box visually larger).
    // - `rounded-2xl` sets the corner radius (change to `rounded-lg` / `rounded-3xl` for different shapes).
    // - `shadow-lg` adds elevation; `border` and `${borderClass}` control the border look.
    // To make the box bigger, adjust `col-span-*`, increase `p-*`, or change text/icon sizes inside.
    
    // Box size and shape controlled here
    <div className={`col-span-1 lg:col-span-1 p-8 rounded-2xl shadow-lg flex flex-col items-center justify-between ${cardBg} border ${borderClass}`}>      
      {/* header section */}
      <div className="w-full text-center">
        <h2 className={`text-xl font-bold ${textClass}`}>Pomodoro Timer</h2>
        <p className={`${secondaryText} mt-1`}>{timerLabel}</p>
      </div>

      {/* timer display (pomodoroTime in seconds; formatTime -> MM:SS) */}
      <div className="my-8">
        <p className={`text-7xl font-mono font-bold tracking-tighter ${timerColor}`}>
          {formatTime(pomodoroTime)}
        </p>
      </div>

      {/* control buttons: start/pause and reset */}
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

      {/* settings: inputs show minutes (studyDuration/breakDuration are stored in seconds) */}
      <div className={`w-full mt-8 pt-6 border-t ${borderClass} flex justify-around items-center`}>
        <div className="text-center">
          <label htmlFor="study-duration" className={`block text-sm font-medium ${secondaryText}`}>
            Study Duration (min)
          </label>
          <input
            type="number"
            id="study-duration"
            min="1"
            max="120"
            value={Math.round(studyDuration / 60)}
            onChange={(e) => {
              const value = Math.max(1, Math.min(120, Number(e.target.value)));
              setStudyDuration(value);
            }}
            className={`w-32 mt-1 p-2 text-center rounded-md border ${borderClass} ${cardBg} ${textClass} focus:ring-2 focus:ring-indigo-500 disabled:opacity-50`}
            disabled={pomodoroActive}
          />
          <p className={`text-xs mt-1 ${secondaryText}`}>
            Break: {Math.round(breakDuration / 60)} min
          </p>
        </div>
      </div>
    </div>
  );
}
