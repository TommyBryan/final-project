// src/hooks/usePomodoroTimer.js
import { useState, useEffect, useRef } from 'react';

export function usePomodoroTimer() {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef(null);

  // adding sounds
  const studyEndSound = useRef(new Audio('/sounds/'));
  const breakEndSound = useRef(new Audio('/sounds/study-sound.wav'));

  useEffect(() => {
    if (pomodoroActive) {
      intervalRef.current = setInterval(() => {
        setPomodoroTime(prev => {
          if (prev <= 1) {
            setPomodoroActive(false);

            //  play sound based on what ended
            if (isBreak) {
              breakEndSound.current.play(); // break ended → back to study
            } else {
              studyEndSound.current.play(); // study ended → time to break
            }

            setIsBreak(!isBreak);
            return isBreak ? 25 * 60 : 5 * 60; // swap durations
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [pomodoroActive, isBreak]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePomodoro = () => setPomodoroActive(!pomodoroActive);
  const resetPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroTime(25 * 60);
    setIsBreak(false);
  };

  return {
    pomodoroTime,
    pomodoroActive,
    isBreak,
    togglePomodoro,
    resetPomodoro,
    formatTime
  };
}
