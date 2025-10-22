// src/hooks/useFlashcards.js
import { useState, useEffect } from 'react';

const FLASHCARDS_KEY = 'iNtellecta-flashcards';

// helper to get initial state from localStorage
const getInitialFlashcards = () => {
  try {
    const storedFlashcards = localStorage.getItem(FLASHCARDS_KEY);
    return storedFlashcards ? JSON.parse(storedFlashcards) : [
      { id: 1, front: 'What is React?', back: 'A JavaScript library for building user interfaces', flipped: false },
      { id: 2, front: 'What is a component?', back: 'A reusable piece of UI with its own logic and appearance', flipped: false }
    ];
  } catch (error) {
    console.error("Failed to load flashcards from localStorage:", error);
    return [
      { id: 1, front: 'What is React?', back: 'A JavaScript library for building user interfaces', flipped: false },
      { id: 2, front: 'What is a component?', back: 'A reusable piece of UI with its own logic and appearance', flipped: false }
    ]; // fallback to default
  }
};

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState(getInitialFlashcards);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

  // saving flashcards to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FLASHCARDS_KEY, JSON.stringify(flashcards));
    } catch (error) {
      console.error("Failed to save flashcards to localStorage:", error);
    }
  }, [flashcards]);

  const flipCard = (id) => {
    setFlashcards(flashcards.map(card => 
      card.id === id ? { ...card, flipped: !card.flipped } : card
    ));
  };

  const addFlashcard = () => {
    if (newCardFront.trim() && newCardBack.trim()) {
      setFlashcards([...flashcards, {
        id: Date.now(),
        front: newCardFront,
        back: newCardBack,
        flipped: false
      }]);
      setNewCardFront('');
      setNewCardBack('');
    }
  };

  return { flashcards, addFlashcard, flipCard, newCardFront, setNewCardFront, newCardBack, setNewCardBack };
}