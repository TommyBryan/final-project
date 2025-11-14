// src/services/storage.js
import { supabase } from './supabaseClient';

/**
 * Upload a PDF file to the pdfs bucket with user-specific path
 * @param {File} file - The PDF file to upload
 * @returns {Promise<Object>} Object with path and signedUrl
 */
export async function uploadPdf(file) {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const filePath = `${user.id}/${file.name}`;

  const { data: _data, error } = await supabase.storage
    .from("pdfs")
    .upload(filePath, file);

  if (error) {
    console.error("Upload error:", error);
    throw error;
  }

  // Get signed URL (valid for 1 hour)
  const { data: signedData, error: signedError } = await supabase.storage
    .from("pdfs")
    .createSignedUrl(filePath, 3600);

  if (signedError) {
    console.error("Signed URL error:", signedError);
    throw signedError;
  }

  return { path: filePath, signedUrl: signedData.signedUrl };
}

/**
 * Get signed URL for a file
 * @param {string} path - The file path
 * @returns {Promise<string>} Signed URL
 */
export async function getSignedUrl(path) {
  const { data, error } = await supabase.storage
    .from("pdfs")
    .createSignedUrl(path, 3600);

  if (error) {
    console.error("Signed URL error:", error);
    throw error;
  }

  return data.signedUrl;
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
