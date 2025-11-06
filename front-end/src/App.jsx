import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import OverviewTab from './components/OverviewTab.jsx';
import FlashcardsTab from './components/FlashcardsTab.jsx';
import VideosTab from './components/VideosTab.jsx';
import DocumentTab from './components/DocumentTab.jsx';
import WelcomeCard from './components/WelcomeCard.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';

import { usePomodoroTimer } from "./hooks/usePomodoroTimer.js";
import { useFlashcards } from "./hooks/useFlashcards.js";
import { useTodos } from "./hooks/useTodos.js";
import { supabase } from './services/supabaseClient.js';

export default function StudyAppDashboard() {
  const [darkMode, setDarkMode] = useState(() => {
    try { return JSON.parse(localStorage.getItem('iNtellecta-darkMode')) || false; } catch { return false; }
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [studyTopic, setStudyTopic] = useState('React Programming');
  const [username, setUsername] = useState('User');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        const userMeta = data.session.user.user_metadata;
        setUsername(userMeta?.username || data.session.user.email);
      }
    });
  }, []);

  const { pomodoroTime, pomodoroActive, isBreak, togglePomodoro, resetPomodoro, formatTime, studyDuration, breakDuration, setStudyDuration, setBreakDuration } = usePomodoroTimer();
  const { flashcards, addFlashcard, flipCard, deleteFlashcard, newCardFront, setNewCardFront, newCardBack, setNewCardBack } = useFlashcards();
  const { todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo } = useTodos();

  useEffect(() => { try { localStorage.setItem('iNtellecta-darkMode', JSON.stringify(darkMode)); } catch {} }, [darkMode]);

  const bgClass = darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-900';
  const secondaryText = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const commonProps = { darkMode, cardBg, textClass, secondaryText, borderClass };

  const sidebarWidth = isSidebarOpen ? 256 : 80; // in pixels

  return (
    <div className={`flex h-screen overflow-hidden ${bgClass} ${textClass} transition-colors duration-300`}>
      <Toaster position="bottom-right" />

      {/* Sidebar */}
      <Sidebar
        {...commonProps}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setDarkMode={setDarkMode}
        musicPlaying={musicPlaying}
        setMusicPlaying={setMusicPlaying}
      />

      {/* Main content */}
      <div
        className="flex flex-col flex-1 transition-[margin] duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Header without toggle */}
        <Header
          darkMode={darkMode}
          musicPlaying={musicPlaying}
          setMusicPlaying={setMusicPlaying}
        />

        <main className="flex-1 overflow-y-auto px-6 py-8 relative z-10">
          <WelcomeCard user_name={username} textClass={textClass} secondaryText={secondaryText} />

          {activeTab === 'overview' && (
            <OverviewTab
              {...commonProps}
              pomodoroProps={{ pomodoroTime, pomodoroActive, isBreak, togglePomodoro, resetPomodoro, formatTime, studyDuration, breakDuration, setStudyDuration, setBreakDuration }}
              todoProps={{ todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo }}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsTab
              {...commonProps}
              flashcardProps={{ flashcards, addFlashcard, flipCard, deleteFlashcard, newCardFront, setNewCardFront, newCardBack, setNewCardBack }}
            />
          )}

          {activeTab === 'videos' && (
            <VideosTab {...commonProps} studyTopic={studyTopic} setStudyTopic={setStudyTopic} />
          )}

          {activeTab === 'documents' && <DocumentTab {...commonProps} />}
        </main>

        {musicPlaying && <MusicPlayer {...commonProps} />}
      </div>
    </div>
  );
}
