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
    <div
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-300"
    >
      <PomodoroTimer {...commonProps} {...pomodoroProps} />
      <TodoList {...commonProps} {...todoProps} />
    </div>
  );
}
