// src/hooks/useFlashcards.js
import { useState, useEffect } from "react";
import { supabase } from '../services/supabaseClient';
import * as flashcardsService from '../services/flashcards';
import { ensureUserProfile } from '../services/profileHelpers';

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (!userId) {
        setFlashcards([]);
        setLoading(false);
        return;
      }
      const data = await flashcardsService.listFlashcards({ userId });
      setFlashcards(data.map(card => ({ ...card, flipped: false })));
    } catch (error) {
      console.error('Error loading flashcards:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch flashcards on mount
  useEffect(() => {
    load();
  }, []);

  const flipCard = (id) => {
    setFlashcards((cards) =>
      cards.map((card) =>
        card.id === id ? { ...card, flipped: !card.flipped } : card
      )
    );
  }; // closes flipCard

  const addFlashcard = async () => {
    if (!newCardFront.trim() || !newCardBack.trim()) return;
    
    setIsSubmitting(true);
    try {
      // Ensure profile exists before inserting
      const profile = await ensureUserProfile();
      console.log('Profile for flashcard:', profile);
      
      const newCard = await flashcardsService.addFlashcard({
        user_id: profile.id,
        front: newCardFront.trim(),
        back: newCardBack.trim(),
      });

      console.log('Flashcard added successfully:', newCard);
      setFlashcards(cards => [{ ...newCard, flipped: false }, ...cards]);
      setNewCardFront("");
      setNewCardBack("");
    } catch (error) {
      console.error("Error adding flashcard:", error);
      alert(`Failed to add flashcard: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }; // closes addFlashcard

  const deleteFlashcard = async (id) => {
    setIsSubmitting(true);
    try {
      await flashcardsService.deleteFlashcard(id);
      setFlashcards(cards => cards.filter(card => card.id !== id));
    } catch (error) {
      console.error("Error deleting flashcard:", error);
    } finally {
      setIsSubmitting(false);
    }
  }; // closes deleteFlashcard

  return {
    flashcards,
    addFlashcard,
    flipCard,
    deleteFlashcard,
    newCardFront,
    setNewCardFront,
    newCardBack,
    setNewCardBack,
    loading,
    isSubmitting
  }; // closes return object
} // closes useFlashcards hook
