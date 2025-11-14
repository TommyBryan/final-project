// src/hooks/usePomodoroTimer.js
import { useState, useEffect, useRef } from "react";

export function usePomodoroTimer(defaultStudy = 25 * 60, defaultBreak = 5 * 60) {
  const [pomodoroTime, setPomodoroTime] = useState(defaultStudy);
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const [studyDuration, setStudyDuration] = useState(defaultStudy);
  const [breakDuration, setBreakDuration] = useState(defaultBreak);

  const intervalRef = useRef(null);

  // Sounds
  const studyEndSound = useRef(new Audio("/sounds/study-sound.wav")); // play when break ends
  const breakEndSound = useRef(new Audio("/sounds/break-sound.wav")); // play when study ends

  // Helper to play a sound
  const playSound = (soundRef) => {
    try {
      soundRef.current.play();
    } catch (err) {
      console.warn("Sound playback blocked:", err);
    }
  };

  // Timer effect
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

    return () => clearInterval(intervalRef.current);
  }, [pomodoroActive, isBreak, studyDuration, breakDuration]);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Toggle start/pause
  const togglePomodoro = () => {
    setPomodoroActive((prev) => {
      const newState = !prev;

      if (newState) {
        // Play the sound for the opposite session to cue what's coming next
        playSound(isBreak ? breakEndSound : studyEndSound);
      }

      return newState;
    });
  };

  // Update study duration
  const updateStudyDuration = (mins) => {
    const studySeconds = mins * 60;
    setStudyDuration(studySeconds);
    setBreakDuration(studySeconds / 5);

    if (!isBreak) setPomodoroTime(studySeconds);

    if (pomodoroActive) setPomodoroActive(false);
  };

  // Reset timer
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
