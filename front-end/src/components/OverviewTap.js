// src/components/OverviewTab.js
import React from 'react';
import PomodoroTimer from './overview/PomodoroTimer';
import TodoList from './overview/TodoList';
import PdfUpload from './overview/PdfUpload';

export default function OverviewTab({ darkMode, cardBg, textClass, secondaryText, borderClass, pomodoroProps, todoProps }) {
  const commonProps = { darkMode, cardBg, textClass, secondaryText, borderClass };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <PomodoroTimer {...commonProps} {...pomodoroProps} />
      <TodoList {...commonProps} {...todoProps} />
      <PdfUpload {...commonProps} />
    </div>
  );
}