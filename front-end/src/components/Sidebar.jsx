import React from 'react';
import { X, Moon, Sun } from 'lucide-react';

export default function Sidebar({
  darkMode,
  setDarkMode,
  cardBg,
  borderClass,
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen
}) {
  return (
    <div
      className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${
        isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      {/* Sliding sidebar */}
      <div
        className={`relative flex flex-col w-64 max-w-xs h-full rounded-r-2xl shadow-2xl p-6 transition-transform duration-300 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r`}
      >
        {/* Close button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Navigation */}
        <nav className="mt-16 flex flex-col gap-3">
          {['overview', 'flashcards', 'videos', 'documents'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
              }}
              className={`px-6 py-3 rounded-xl text-left font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-indigo-200 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100 shadow-inner'
                  : darkMode
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-gray-100'
                  : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center justify-center gap-2 p-2 rounded-xl font-medium transition-colors hover:bg-gray-300 dark:hover:bg-gray-700 ${
              darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}
