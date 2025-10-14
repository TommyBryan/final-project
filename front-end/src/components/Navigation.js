// src/components/Navigation.js
import React from 'react';

export default function Navigation({ activeTab, setActiveTab, cardBg, borderClass, secondaryText }) {
  return (
    <div className={`${cardBg} border-b ${borderClass}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1">
          {['overview', 'flashcards', 'videos'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : secondaryText
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}