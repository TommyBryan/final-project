// src/components/Header.jsx
import React from "react";
import { Menu } from "lucide-react";

export default function Header({ toggleSidebar, darkMode }) {
  return (
    <header
      className={`flex items-center justify-between px-6 py-3 shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <Menu size={22} />
      </button>
      <h1 className="font-semibold text-lg">Dashboard</h1>
    </header>
  );
}
