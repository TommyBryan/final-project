// src/hooks/useFlashcards.js
import { useState, useEffect } from "react";
import { supabase } from '../services/supabaseClient';

// Helper to fetch flashcards from Supabase
const fetchFlashcards = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user) return [];

  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching flashcards:", error);
    return [];
  }

  return data.map(card => ({ ...card, flipped: false })) || [];
}; // closes fetchFlashcards

export function useFlashcards() {
  const [flashcards, setFlashcards] = useState([]);
  const [newCardFront, setNewCardFront] = useState("");
  const [newCardBack, setNewCardBack] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch flashcards on mount
  useEffect(() => {
    const loadFlashcards = async () => {
      setLoading(true);
      const data = await fetchFlashcards();
      setFlashcards(data);
      setLoading(false);
    };
    loadFlashcards();
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
      const { data: session } = await supabase.auth.getSession();
      const { data, error } = await supabase
        .from('flashcards')
        .insert([{
          front: newCardFront.trim(),
          back: newCardBack.trim(),
          user_id: session.session?.user?.id
        }])
        .select()
        .single();

      if (error) throw error;

      setFlashcards(cards => [{ ...data, flipped: false }, ...cards]);
      setNewCardFront("");
      setNewCardBack("");
    } catch (error) {
      console.error("Error adding flashcard:", error);
    } finally {
      setIsSubmitting(false);
    }
  }; // closes addFlashcard

  const deleteFlashcard = async (id) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('flashcards')
        .delete()
        .eq('id', id);

      if (error) throw error;
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
