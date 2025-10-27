// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import OverviewTab from './components/OverviewTab.jsx';
import FlashcardsTab from './components/FlashcardsTab.jsx';
import VideosTab from './components/VideosTab.jsx';
import WelcomeCard from './components/WelcomeCard.jsx';
import { usePomodoroTimer } from "./hooks/usePomodoroTimer.js";
import { useFlashcards } from "./hooks/useFlashcards.js";
import { useTodos } from "./hooks/useTodos.js";
import { supabase } from './services/supabaseClient.js'; // make sure this is imported

export default function StudyAppDashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const storedDarkMode = localStorage.getItem('iNtellecta-darkMode');
      return storedDarkMode ? JSON.parse(storedDarkMode) : false;
    } catch (error) {
      console.error("Failed to load dark mode from localStorage:", error);
      return false;
    }
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [studyTopic, setStudyTopic] = useState('React Programming');
  const [username, setUsername] = useState('User'); // default name

  // fetch username from Supabase session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const userMeta = data.session.user.user_metadata;
        setUsername(userMeta?.username || data.session.user.email);
      }
    });
  }, []);

  // pomodoro timer hook
  const {
    pomodoroTime,
    pomodoroActive,
    isBreak,
    togglePomodoro,
    resetPomodoro,
    formatTime,
    studyDuration,
    breakDuration,
    setStudyDuration,
    setBreakDuration
  } = usePomodoroTimer();

  const { flashcards, addFlashcard, flipCard, deleteFlashcard, newCardFront, setNewCardFront, newCardBack, setNewCardBack } = useFlashcards();
  const { todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo } = useTodos();

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
      <Toaster position="bottom-right" />

      <Header
        {...commonProps}
        setDarkMode={setDarkMode}
        musicPlaying={musicPlaying}
        setMusicPlaying={setMusicPlaying}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <WelcomeCard
            user_name={username} // pass actual username here
            textClass={textClass}
            secondaryText={secondaryText}
          />
        </div>

        {activeTab === 'overview' && (
          <OverviewTab
            {...commonProps}
            pomodoroProps={{
              pomodoroTime,
              pomodoroActive,
              isBreak,
              togglePomodoro,
              resetPomodoro,
              formatTime,
              studyDuration,
              breakDuration,
              setStudyDuration,
              setBreakDuration
            }}
            todoProps={{ todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo }}
          />
        )}
        {activeTab === 'flashcards' && (
          <FlashcardsTab
            {...commonProps}
            flashcardProps={{
              flashcards,
              addFlashcard,
              flipCard,
              deleteFlashcard,
              newCardFront,
              setNewCardFront,
              newCardBack,
              setNewCardBack
            }}
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
    </div>
  );
}
