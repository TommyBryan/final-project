// src/services/flashcards.js
import { supabase } from './supabaseClient';

/**
 * List all flashcards for a specific user
 * @param {Object} params - Parameters object
 * @param {string} params.userId - The user's ID
 * @returns {Promise<Array>} Array of flashcard objects
 */
export async function listFlashcards({ userId }) {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching flashcards:', error);
    throw error;
  }

  return data || [];
}

/**
 * Add a new flashcard
 * @param {Object} params - Parameters object
 * @param {string} params.user_id - The user's ID
 * @param {string} params.front - The front of the flashcard
 * @param {string} params.back - The back of the flashcard
 * @returns {Promise<Object>} The created flashcard object
 */
export async function addFlashcard({ user_id, front, back }) {
  const { data, error } = await supabase
    .from('flashcards')
    .insert([{ user_id, front, back }])
    .select()
    .single();

  if (error) {
    console.error('Error adding flashcard:', error);
    throw error;
  }

  return data;
}

/**
 * Delete a flashcard by ID
 * @param {string} id - The flashcard's ID
 * @returns {Promise<void>}
 */
export async function deleteFlashcard(id) {
  const { error } = await supabase
    .from('flashcards')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting flashcard:', error);
    throw error;
  }
}

/**
 * Update a flashcard
 * @param {string} id - The flashcard's ID
 * @param {Object} changes - Object containing fields to update
 * @returns {Promise<Object>} The updated flashcard object
 */
export async function updateFlashcard(id, changes) {
  const { data, error } = await supabase
    .from('flashcards')
    .update(changes)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating flashcard:', error);
    throw error;
  }

  return data;
}
