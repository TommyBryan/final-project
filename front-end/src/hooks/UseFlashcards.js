// src/hooks/useFlashcards.js
import { useState } from 'react';

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState([
    { id: 1, front: 'What is React?', back: 'A JavaScript library for building user interfaces', flipped: false },
    { id: 2, front: 'What is a component?', back: 'A reusable piece of UI with its own logic and appearance', flipped: false }
  ]);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

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