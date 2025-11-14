// src/services/storage.js
import { supabase } from './supabaseClient';

/**
 * Upload a PDF file to the pdfs bucket with user-specific path
 * @param {File} file - The PDF file to upload
 * @returns {Promise<Object>} Object with path and publicUrl
 */
export async function uploadPdf(file) {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const filePath = `${user.id}/${file.name}`;

  const { error } = await supabase.storage
    .from("pdfs")
    .upload(filePath, file);

  if (error) throw error;

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from("pdfs")
    .getPublicUrl(filePath);

  return { path: filePath, publicUrl };
}

/**
 * Delete a file from Supabase Storage
 * @param {string} path - The file path to delete from the pdfs bucket
 * @returns {Promise<void>}
 */
export async function deleteFile(path) {
  const { error } = await supabase.storage
    .from("pdfs")
    .remove([path]);

  if (error) {
    console.error('Delete error:', error);
    throw error;
  }
}
