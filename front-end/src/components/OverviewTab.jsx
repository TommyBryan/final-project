// src/components/OverviewTab.jsx
import React from "react";
import PomodoroTimer from "./overview/PomodoroTimer";
import TodoList from "./overview/TodoList";

export default function OverviewTab({
  darkMode,
  cardBg,
  textClass,
  secondaryText,
  borderClass,
  pomodoroProps,
  todoProps,
}) {
  const commonProps = { darkMode, cardBg, textClass, secondaryText, borderClass };

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 transition-all duration-300"
    >
      {/* Pomodoro Timer Section */}
      <div className="flex justify-center items-start">
        <div className="w-full max-w-md">
          <PomodoroTimer {...commonProps} {...pomodoroProps} />
        </div>
      </div>

{/*
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-300">
  <div className="lg:col-span-2">
    <PomodoroTimer {...commonProps} {...pomodoroProps} />
  </div>

  <aside className="lg:col-span-1">
    <TodoList {...commonProps} {...todoProps} />
  </aside>
</div>
*/}


      {/* To-Do List Section */}
      <div className="flex justify-center items-start">
        <div className="w-full max-w-md">
          <TodoList {...commonProps} {...todoProps} />
        </div>
      </div>
    </div>
  );
}
