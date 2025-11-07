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

  // timer effect
  useEffect(() => {
    if (!pomodoroActive) return;

    intervalRef.current = setInterval(() => {
      setPomodoroTime((prev) => {
        if (prev <= 1) {
          // play the correct sound
          try {
            if (isBreak) {
              studyEndSound.current.play();
            } else {
              breakEndSound.current.play();
            }
          } catch (err) {
            console.warn("Sound playback blocked:", err);
          }

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
  const togglePomodoro = () => setPomodoroActive((p) => !p);

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
    setStudyDuration: (mins) => setStudyDuration(mins * 60),
    setBreakDuration: (mins) => setBreakDuration(mins * 60),
  };
}
