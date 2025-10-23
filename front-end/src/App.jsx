// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Music, BookOpen } from 'lucide-react';
import Header from "./components/Header.jsx";
import Navigation from "./components/Navigation.jsx";
import OverviewTab from "./components/OverviewTab.jsx";
import FlashcardsTab from "./components/FlashcardsTab.jsx";
import VideosTab from "./components/VideosTab.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";
import { usePomodoroTimer } from "./hooks/UsePomodoroTimer.jsx";
import { useFlashcards } from "./hooks/UseFlashcards.jsx";
import { useTodos } from "./hooks/UseTodos.jsx";

export default function StudyAppDashboard() {
  // darkMode from localStorage, default to false if not found
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const storedDarkMode = localStorage.getItem('iNtellecta-darkMode');
      return storedDarkMode ? JSON.parse(storedDarkMode) : false;
    } catch (error) {
      console.error("Failed to load dark mode from localStorage:", error);
      return false; // fallback to default
    }
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [studyTopic, setStudyTopic] = useState('React Programming');

  // hooks for managing state logic
  const { pomodoroTime, pomodoroActive, isBreak, togglePomodoro, resetPomodoro, formatTime } = usePomodoroTimer();
  const { flashcards, addFlashcard, flipCard, newCardFront, setNewCardFront, newCardBack, setNewCardBack } = useFlashcards();
  const { todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo } = useTodos();

   // saves darkMode preference to localStorage whenever it changes

  useEffect(() => {
    try {
      localStorage.setItem('iNtellecta-darkMode', JSON.stringify(darkMode));
    } catch (error) {
      console.error("Failed to save dark mode to localStorage:", error);
    }
  }, [darkMode]);

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
