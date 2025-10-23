// src/components/FlashcardsTab.jsx
import React from 'react';
import { Plus } from 'lucide-react';

export default function FlashcardsTab({ darkMode, cardBg, textClass, secondaryText, borderClass, flashcardProps }) {
  const { flashcards, addFlashcard, flipCard, newCardFront, setNewCardFront, newCardBack, setNewCardBack } = flashcardProps;

  return (
    <div>
      <div className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass} mb-6`}>
        <h2 className="text-xl font-semibold mb-4">Create New Flashcard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newCardFront}
            onChange={(e) => setNewCardFront(e.target.value)}
            placeholder="Front (Question)"
            className={`px-4 py-2 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-700' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-indigo-600`}
          />
          <input
            type="text"
            value={newCardBack}
            onChange={(e) => setNewCardBack(e.target.value)}
            placeholder="Back (Answer)"
            className={`px-4 py-2 rounded-lg border ${borderClass} ${darkMode ? 'bg-gray-700' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-indigo-600`}
          />
        </div>
        <button
          onClick={addFlashcard}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Flashcard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map(card => (
          <div
            key={card.id}
            onClick={() => flipCard(card.id)}
            className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass} cursor-pointer transform transition-all hover:scale-105 min-h-48 flex items-center justify-center`}
          >
            <p className="text-center text-lg">
              {card.flipped ? card.back : card.front}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}