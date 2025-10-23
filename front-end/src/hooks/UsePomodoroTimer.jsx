// src/hooks/usePomodoroTimer.jsx
import { useState, useEffect, useRef } from 'react';

const POMODORO_KEY = 'iNtellecta-pomodoro';

// get initial state from localStorage
const getInitialPomodoroState = () => {
  try {
    const storedState = localStorage.getItem(POMODORO_KEY);
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      // ensuring time is not negative, especially if app was closed during active timer
      if (parsedState.pomodoroActive && parsedState.pomodoroTime > 0) {
        // recalculating remaining time if timer was active when closed
        const elapsed = Math.floor((Date.now() - parsedState.lastTickTimestamp) / 1000);
        const remainingTime = parsedState.pomodoroTime - elapsed;
        return {
          ...parsedState,
          pomodoroTime: Math.max(0, remainingTime), // it doesn't go negative
          pomodoroActive: remainingTime > 0 // active if time remains
        };
      }
      return parsedState;
    }
  } catch (error) {
    console.error("Failed to load pomodoro state from localStorage:", error);
  }
  // default state if nothing in localStorage or error
  return {
    pomodoroTime: 25 * 60,
    pomodoroActive: false,
    isBreak: false,
    lastTickTimestamp: Date.now()
  };
};

export function usePomodoroTimer() {
  const [state, setState] = useState(getInitialPomodoroState);
  const { pomodoroTime, pomodoroActive, isBreak, lastTickTimestamp } = state;

  const intervalRef = useRef(null);

  useEffect(() => {
    // saving state to localStorage whenever it changes
    try {
      localStorage.setItem(POMODORO_KEY, JSON.stringify({
        pomodoroTime,
        pomodoroActive,
        isBreak,
        lastTickTimestamp: Date.now() // updating timestamp when saving
      }));
    } catch (error) {
      console.error("Failed to save pomodoro state to localStorage:", error);
    }
  }, [pomodoroTime, pomodoroActive, isBreak]); // lastTickTimestamp is updated implicitly

  useEffect(() => {
    if (pomodoroActive) {
      intervalRef.current = setInterval(() => {
        setState(prev => {
          const newTime = prev.pomodoroTime - 1;
          if (newTime <= 0) {
            // Timer ended
            const newIsBreak = !prev.isBreak;
            return {
              pomodoroTime: newIsBreak ? 5 * 60 : 25 * 60, // 5 min break, 25 min focus
              pomodoroActive: false, // timer stops
              isBreak: newIsBreak,
              lastTickTimestamp: Date.now()
            };
          }
          return {
            ...prev,
            pomodoroTime: newTime,
            lastTickTimestamp: Date.now()
          };
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [pomodoroActive, isBreak]); // depend on pomodoroActive and isBreak

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePomodoro = () => {
    setState(prev => ({
      ...prev,
      pomodoroActive: !prev.pomodoroActive,
      lastTickTimestamp: Date.now() // updating timestamp when toggling
    }));
  };

  const resetPomodoro = () => {
    setState({
      pomodoroTime: 25 * 60,
      pomodoroActive: false,
      isBreak: false,
      lastTickTimestamp: Date.now()
    });
  };

  return { pomodoroTime, pomodoroActive, isBreak, togglePomodoro, resetPomodoro, formatTime };
}