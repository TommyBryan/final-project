// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Music, BookOpen } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import OverviewTab from './components/OverviewTab';
import FlashcardsTab from './components/FlashcardsTab';
import VideosTab from './components/VideosTab';
import MusicPlayer from './components/MusicPlayer';
import { usePomodoroTimer } from './hooks/usePomodoroTimer';
import { useFlashcards } from './hooks/useFlashcards';
import { useTodos } from './hooks/useTodos';

export default function StudyAppDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [studyTopic, setStudyTopic] = useState('React Programming');

  // Custom hooks for managing state logic
  const { pomodoroTime, pomodoroActive, isBreak, togglePomodoro, resetPomodoro, formatTime } = usePomodoroTimer();
  const { flashcards, addFlashcard, flipCard, newCardFront, setNewCardFront, newCardBack, setNewCardBack } = useFlashcards();
  const { todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo } = useTodos();

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';

  const commonProps = { darkMode, cardBg, textClass, secondaryText, borderClass };

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <Header
        {...commonProps}
        setDarkMode={setDarkMode}
        musicPlaying={musicPlaying}
        setMusicPlaying={setMusicPlaying}
      />

      <Navigation
        {...commonProps}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <OverviewTab
            {...commonProps}
            pomodoroProps={{ pomodoroTime, pomodoroActive, isBreak, togglePomodoro, resetPomodoro, formatTime }}
            todoProps={{ todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo }}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsTab
            {...commonProps}
            flashcardProps={{ flashcards, addFlashcard, flipCard, newCardFront, setNewCardFront, newCardBack, setNewCardBack }}
          />
        )}

        {activeTab === 'videos' && (
          <VideosTab
            {...commonProps}
            studyTopic={studyTopic}
            setStudyTopic={setStudyTopic}
          />
        )}
      </main>

      {musicPlaying && <MusicPlayer {...commonProps} />}
    </div>
  );
}