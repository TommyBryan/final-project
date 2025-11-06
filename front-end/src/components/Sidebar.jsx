// src/components/Sidebar.jsx
import React from "react";
import { Menu, X, Moon, Sun, Home, BookOpen, Video, FileText, Music } from "lucide-react";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  musicPlaying,
  setMusicPlaying,
}) {
  const sidebarItems = [
    { name: "Overview", icon: <Home />, key: "overview" },
    { name: "Flashcards", icon: <BookOpen />, key: "flashcards" },
    { name: "Videos", icon: <Video />, key: "videos" },
    { name: "Documents", icon: <FileText />, key: "documents" },
    { name: "Music", icon: <Music />, key: "music" },
  ];

  return (
    <>
      {/* Overlay for small screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300
          ${isSidebarOpen ? "w-64" : "w-16"}
          ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
          shadow-lg flex flex-col justify-between`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold transition-all duration-300 overflow-hidden whitespace-nowrap ${
              isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0 lg:opacity-100 lg:max-w-full"
            }`}
          >
            StudySpace
          </h1>
          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Sidebar Items */}
        <nav className="flex-1 flex flex-col gap-3 px-2 mt-2">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                if (item.key === "music") setMusicPlaying(!musicPlaying);
                else setActiveTab(item.key);
              }}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition
                ${activeTab === item.key ? "bg-gray-300 dark:bg-gray-700" : ""}`}
            >
              {/* Icon wrapper ensures consistent size */}
              <span className="flex-none w-12 h-12 flex items-center justify-center">
                {React.cloneElement(item.icon, { size: 32 })}
              </span>

              {/* Label visible only if sidebar expanded */}
              <span
                className={`overflow-hidden transition-all duration-300 ${
                  isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                }`}
              >
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex items-center justify-between">
          <span
            className={`overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0 lg:opacity-100 lg:max-w-full"
            }`}
          >
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Moon size={32} /> : <Sun size={32} />}
          </button>
        </div>
      </div>
    </>
  );
}
