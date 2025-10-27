// src/hooks/useFlashcards.js
import { useState, useEffect } from "react";

const FLASHCARDS_KEY = "iNtellecta-flashcards";

// helper: Load from localStorage or fallback to sample cards
const getInitialFlashcards = () => {
  try {
    const stored = localStorage.getItem(FLASHCARDS_KEY);
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to load flashcards:", err);
  }

  return [
    {
      id: 1,
      front: "What is React?",
      back: "A JavaScript library for building user interfaces.",
      flipped: false,
    },
    {
      id: 2,
      front: "What is a component?",
      back: "A reusable piece of UI with its own logic and appearance.",
      flipped: false,
    },
  ];
};

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState(getInitialFlashcards);
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FLASHCARDS_KEY, JSON.stringify(flashcards));
    } catch (err) {
      console.error("Failed to save flashcards:", err);
    }
  }, [flashcards]);

  // flip front/back
  const flipCard = (id) => {
    setFlashcards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, flipped: !card.flipped } : card
      )
    );
  };

  // add new flashcard
  const addFlashcard = () => {
    if (newCardFront.trim() && newCardBack.trim()) {
      setFlashcards((prev) => [
        ...prev,
        {
          id: Date.now(),
          front: newCardFront,
          back: newCardBack,
          flipped: false,
        },
      ]);
      setNewCardFront("");
      setNewCardBack("");
    }
  };

  // delete a flashcard
  const deleteFlashcard = (id) => {
    setFlashcards((prev) => prev.filter((card) => card.id !== id));
  };

  return {
    flashcards,
    addFlashcard,
    flipCard,
    deleteFlashcard,
    newCardFront,
    setNewCardFront,
    newCardBack,
    setNewCardBack,
  };
}
