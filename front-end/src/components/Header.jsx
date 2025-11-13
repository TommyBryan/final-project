// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Globe } from "lucide-react";
import Logo from "../assets/intellecta-logo.svg";

export default function Header({ darkMode }) {
  const navigate = useNavigate();

  return (
    <header
      className={`flex items-center justify-end px-6 py-4 shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex items-center gap-3">
        <img src={Logo} alt="iNtellecta Logo" className="h-12 w-12" />
        <h1 className="text-2xl font-bold">iNtellecta</h1>
      </div>

      {/* Landing (home) icon */}
      <button
        onClick={() => navigate("/")}
        aria-label="Go to landing page"
        className={`ml-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition`}
      >
        <Globe size={28} />
      </button>
    </header>
  );
}
