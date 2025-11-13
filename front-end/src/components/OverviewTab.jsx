// src/components/OverviewTab.jsx
import React from 'react';
import PomodoroTimer from './overview/PomodoroTimer';
import TodoList from './overview/TodoList';

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 transition-all duration-300">
      {/* Main left area: Pomodoro takes the left (and middle) columns on large screens */}
      <div className="lg:col-span-2">
        <PomodoroTimer {...commonProps} {...pomodoroProps} />
      </div>

      {/* Right aside: Todo list */}
      <aside className="lg:col-span-1">
        <TodoList {...commonProps} {...todoProps} />
      </aside>
    </div>
  );
}
