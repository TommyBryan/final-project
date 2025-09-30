import { useState, useEffect } from "react";

function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-72 text-center">
      <h2 className="text-xl font-bold mb-2">Pomodoro Timer</h2>
      <div className="text-4xl font-mono mb-4">{formatTime(timeLeft)}</div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setIsRunning((prev) => !prev)}
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
}

export default PomodoroTimer;
