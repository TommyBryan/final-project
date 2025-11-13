// src/services/pdfFiles.js
import { supabase } from './supabaseClient';

/**
 * List all PDF files for a specific user
 * @param {Object} params - Parameters object
 * @param {string} params.userId - The user's ID
 * @returns {Promise<Array>} Array of PDF file objects
 */
export async function listPdfFiles({ userId }) {
  const { data, error } = await supabase
    .from('pdf_files')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching PDF files:', error);
    throw error;
  }

  return data || [];
}

/**
 * Add a new PDF file
 * @param {Object} params - Parameters object
 * @param {string} params.user_id - The user's ID
 * @param {string} params.file_name - The PDF file name
 * @param {string} params.file_url - The PDF file URL
 * @returns {Promise<Object>} The created PDF file object
 */
export async function addPdfFile({ user_id, file_name, file_url }) {
  const { data, error } = await supabase
    .from('pdf_files')
    .insert([{ user_id, file_name, file_url }])
    .select()
    .single();

  if (error) {
    console.error('Error adding PDF file:', error);
    throw error;
  }

  return data;
}

/**
 * Delete a PDF file by ID
 * @param {string} id - The PDF file's ID
 * @returns {Promise<void>}
 */
export async function deletePdfFile(id) {
  const { error } = await supabase
    .from('pdf_files')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting PDF file:', error);
    throw error;
  }
}

/**
 * Update a PDF file
 * @param {string} id - The PDF file's ID
 * @param {Object} changes - Object containing fields to update
 * @returns {Promise<Object>} The updated PDF file object
 */
export async function updatePdfFile(id, changes) {
  const { data, error } = await supabase
    .from('pdf_files')
    .update(changes)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating PDF file:', error);
    throw error;
  }

  return data;
}
