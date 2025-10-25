// src/hooks/usePomodoroTimer.js
import { useState, useEffect, useRef } from "react";

export function usePomodoroTimer(defaultStudy = 25 * 60, defaultBreak = 5 * 60) {
  const [pomodoroTime, setPomodoroTime] = useState(defaultStudy);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // NEW: make durations configurable
  const [studyDuration, setStudyDuration] = useState(defaultStudy);
  const [breakDuration, setBreakDuration] = useState(defaultBreak);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (pomodoroActive) {
      intervalRef.current = setInterval(() => {
        setPomodoroTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setPomodoroActive(false);
            setIsBreak((prevBreak) => !prevBreak);
            // switch sessions based on the chosen durations
            return isBreak ? studyDuration : breakDuration;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [pomodoroActive, isBreak, studyDuration, breakDuration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const togglePomodoro = () => setPomodoroActive((p) => !p);

  const resetPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroTime(isBreak ? breakDuration : studyDuration);
  };

  // whenever the user edits durations while paused, reflect immediately
  useEffect(() => {
    if (!pomodoroActive) {
      setPomodoroTime(isBreak ? breakDuration : studyDuration);
    }
  }, [studyDuration, breakDuration, isBreak, pomodoroActive]);

  return {
    pomodoroTime,
    pomodoroActive,
    isBreak,
    togglePomodoro,
    resetPomodoro,
    formatTime,
    studyDuration,
    breakDuration,
    setStudyDuration: (mins) => setStudyDuration(mins * 60),
    setBreakDuration: (mins) => setBreakDuration(mins * 60),
  };
}
