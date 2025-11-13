// src/hooks/usePomodoroTimer.js
import { useState, useEffect, useRef } from "react";

export function usePomodoroTimer(defaultStudy = 25 * 60, defaultBreak = 5 * 60) {
  // timer state
  const [pomodoroTime, setPomodoroTime] = useState(defaultStudy);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  // configurable durations
  const [studyDuration, setStudyDuration] = useState(defaultStudy);
  const [breakDuration, setBreakDuration] = useState(defaultBreak);

  // interval reference
  const intervalRef = useRef(null);

  // sounds
  const studyEndSound = useRef(new Audio("/sounds/study-sound.wav")); // play when break ends
  const breakEndSound = useRef(new Audio("/sounds/break-sound.wav")); // play when study ends

  // helper to play a sound
  const playSound = (soundRef) => {
    try {
      soundRef.current.play();
    } catch (err) {
      console.warn("Sound playback blocked:", err);
    }
  };

  // timer effect
  useEffect(() => {
    if (!pomodoroActive) return;

    intervalRef.current = setInterval(() => {
      setPomodoroTime((prev) => {
        if (prev <= 1) {
          // play the correct sound at the end of session
          playSound(isBreak ? studyEndSound : breakEndSound);

          // switch session
          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);

          // return the next session duration
          return nextIsBreak ? breakDuration : studyDuration;
        }
        return prev - 1;
      });
    }, 1000);

    // cleanup
    return () => clearInterval(intervalRef.current);
  }, [pomodoroActive, isBreak, studyDuration, breakDuration]);

  // format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // toggle start/pause
  const togglePomodoro = () => {
    setPomodoroActive((prev) => {
      const newState = !prev;

      // play sound immediately when starting
      if (newState) {
        playSound(isBreak ? studyEndSound : breakEndSound);
      }

      return newState;
    });
  };

  // Update break duration when study duration changes
  const updateStudyDuration = (mins) => {
    const studySeconds = mins * 60;
    setStudyDuration(studySeconds);
    setBreakDuration(studySeconds / 5); // Break is 1/5 of study time

    // Reset and update timer if we're in study mode
    if (!isBreak) {
      setPomodoroTime(studySeconds);
    }

    // If timer is running, stop it
    if (pomodoroActive) {
      setPomodoroActive(false);
    }
  };

  // reset timer to current session
  const resetPomodoro = () => {
    setPomodoroActive(false);
    setPomodoroTime(isBreak ? breakDuration : studyDuration);
  };

  return {
    pomodoroTime,
    pomodoroActive,
    isBreak,
    togglePomodoro,
    resetPomodoro,
    formatTime,
    studyDuration,
    breakDuration,
    setStudyDuration: updateStudyDuration,
    setBreakDuration: () => {}, 
  };
}
