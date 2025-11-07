import React from "react";
import {
  Menu,
  X,
  Moon,
  Sun,
  Home,
  BookOpen,
  Video,
  FileText,
  Music,
} from "lucide-react";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  darkMode,
  setDarkMode,
  activeTab,
  setActiveTab,
  musicPlaying,
  setMusicPlaying,
  signOut,
}) {
  // Bigger icons for better visibility
  const iconSize = 32;

  const sidebarItems = [
    { name: "Overview", icon: <Home size={iconSize} />, key: "overview" },
    { name: "Flashcards", icon: <BookOpen size={iconSize} />, key: "flashcards" },
    { name: "Videos", icon: <Video size={iconSize} />, key: "videos" },
    { name: "Documents", icon: <FileText size={iconSize} />, key: "documents" },
    { name: "Music", icon: <Music size={iconSize} />, key: "music" },
  ];

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Redirect to login page or handle sign out success
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <>
      {/* Background overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "w-64" : "w-20"}
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
        shadow-xl flex flex-col justify-between`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h1
            className={`text-xl font-bold tracking-tight transition-all duration-300 overflow-hidden whitespace-nowrap ${
              isSidebarOpen
                ? "opacity-100 max-w-full"
                : "opacity-0 max-w-0 lg:opacity-100 lg:max-w-full"
            }`}
          >
            StudySpace
          </h1>
          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-3 px-2 mt-2">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.key;
            const isMusic = item.key === "music";
            const bgActive = darkMode
              ? "bg-gray-700 text-white"
              : "bg-gray-200 text-gray-900";
            const bgHover = darkMode
              ? "hover:bg-gray-700"
              : "hover:bg-gray-100";

            return (
              <button
                key={item.key}
                onClick={() => {
                  if (isMusic) setMusicPlaying(!musicPlaying);
                  else setActiveTab(item.key);
                }}
                className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ease-in-out
                ${isActive ? bgActive : ""}
                ${bgHover}`}
              >
                {/* Icon only */}
                <div className="flex-shrink-0">{item.icon}</div>

                {/* Label, fades in/out */}
                <span
                  className={`overflow-hidden transition-all duration-300 ${
                    isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Profile Section */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700">
          <div className={`flex items-center ${!isSidebarOpen ? 'justify-center' : ''} gap-3 p-2`}>
            <div className="flex-shrink-0 w-6 flex justify-center"><UserCircle size={iconSize} /></div>
            <span className={`overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
            }`}>
              Profile
            </span>
          </div>
          <button
            onClick={handleSignOut}
            className={`w-full flex items-center ${!isSidebarOpen ? 'justify-center' : ''} gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition mt-2`}
          >
            <div className="flex-shrink-0 w-6 flex justify-center"><LogOut size={iconSize} /></div>
            <span className={`overflow-hidden transition-all duration-300 ${
              isSidebarOpen ? "opacity-100 max-w-full" : "opacity-0 max-w-0"
            }`}>
              Sign Out
            </span>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex items-center justify-between">
          <span
            className={`overflow-hidden transition-all duration-300 ${
              isSidebarOpen
                ? "opacity-100 max-w-full"
                : "opacity-0 max-w-0 lg:opacity-100 lg:max-w-full"
            }`}
          >
            {darkMode ? "Dark Mode" : "Light Mode"}
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Moon size={26} /> : <Sun size={26} />}
          </button>
        </div>
      </div>
    </>
  );
}
