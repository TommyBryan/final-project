// src/services/storage.js
import { supabase } from './supabaseClient';

/**
 * Upload a file to Supabase Storage
 * @param {Object} params - Parameters object
 * @param {string} params.bucket - The storage bucket name
 * @param {File} params.file - The file to upload
 * @param {string} params.path - Optional custom path (default: auto-generated)
 * @returns {Promise<Object>} Object with filePath and publicUrl
 */
export async function uploadFile({ bucket, file, path }) {
  const fileExt = file.name.split('.').pop();
  const fileName = path || `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = fileName.includes('/') ? fileName : `${bucket}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw uploadError;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return { filePath, publicUrl };
}

/**
 * Delete a file from Supabase Storage
 * @param {Object} params - Parameters object
 * @param {string} params.bucket - The storage bucket name
 * @param {string} params.path - The file path to delete
 * @returns {Promise<void>}
 */
export async function deleteFile({ bucket, path }) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error('Delete error:', error);
    throw error;
  }
}

/**
 * Get public URL for a file
 * @param {Object} params - Parameters object
 * @param {string} params.bucket - The storage bucket name
 * @param {string} params.path - The file path
 * @returns {string} The public URL
 */
export function getPublicUrl({ bucket, path }) {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return publicUrl;
}
