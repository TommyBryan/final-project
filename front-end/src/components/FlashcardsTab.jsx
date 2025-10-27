// src/components/FlashcardsTab.jsx
import React from "react";
import { Plus, Trash2 } from "lucide-react";

export default function FlashcardsTab({
  darkMode,
  cardBg,
  textClass,
  secondaryText,
  borderClass,
  flashcardProps,
}) {
  const {
    flashcards,
    addFlashcard,
    flipCard,
    deleteFlashcard,
    newCardFront,
    setNewCardFront,
    newCardBack,
    setNewCardBack,
  } = flashcardProps;

  return (
    <div>
     {/* create flashcard section */}
      <div
        className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass} mb-6`}
      >
        <h2 className="text-xl font-semibold mb-4">Create New Flashcard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={newCardFront}
            onChange={(e) => setNewCardFront(e.target.value)}
            placeholder="Front (Question)"
            className={`px-4 py-2 rounded-lg border ${borderClass} ${
              darkMode ? "bg-gray-700" : "bg-white"
            } focus:outline-none focus:ring-2 focus:ring-indigo-600`}
          />
          <input
            type="text"
            value={newCardBack}
            onChange={(e) => setNewCardBack(e.target.value)}
            placeholder="Back (Answer)"
            className={`px-4 py-2 rounded-lg border ${borderClass} ${
              darkMode ? "bg-gray-700" : "bg-white"
            } focus:outline-none focus:ring-2 focus:ring-indigo-600`}
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

      {/* flashcard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashcards.map((card) => (
          <div
            key={card.id}
            className={`${cardBg} rounded-xl shadow-lg p-6 border ${borderClass} transform transition-all hover:scale-105 relative`}
          >
            {/* delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent flipping when deleting
                deleteFlashcard(card.id);
              }}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Delete flashcard"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            {/* flip on click */}
            <div
              onClick={() => flipCard(card.id)}
              className="min-h-48 flex items-center justify-center cursor-pointer"
            >
              <p className={`text-center text-lg ${textClass}`}>
                {card.flipped ? card.back : card.front}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
