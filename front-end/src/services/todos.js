// src/services/todos.js
import { supabase } from './supabaseClient';

/**
 * List all todos for a specific user
 * @param {Object} params - Parameters object
 * @param {string} params.userId - The user's ID
 * @returns {Promise<Array>} Array of todo objects
 */
export async function listTodos({ userId }) {
  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Add a new todo
 * @param {Object} params - Parameters object
 * @param {string} params.user_id - The user's ID
 * @param {string} params.text - The todo text
 * @param {boolean} params.completed - Whether the todo is completed
 * @returns {Promise<Object>} The created todo object
 */
export async function addTodo({ user_id, text, completed = false }) {
  const { data, error } = await supabase
    .from('todos')
    .insert([{ user_id, text, completed }])
    .select()
    .single();

  if (error) {
    console.error('Error adding todo:', error);
    throw error;
  }

  return data;
}

/**
 * Delete a todo by ID
 * @param {string} id - The todo's ID
 * @returns {Promise<void>}
 */
export async function deleteTodo(id) {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}

/**
 * Update a todo
 * @param {string} id - The todo's ID
 * @param {Object} changes - Object containing fields to update
 * @returns {Promise<Object>} The updated todo object
 */
export async function updateTodo(id, changes) {
  const { data, error } = await supabase
    .from('todos')
    .update(changes)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating todo:', error);
    throw error;
  }

  return data;
}
