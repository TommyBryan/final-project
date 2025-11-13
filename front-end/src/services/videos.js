// src/services/videos.js
import { supabase } from './supabaseClient';

/**
 * List all videos for a specific user
 * @param {Object} params - Parameters object
 * @param {string} params.userId - The user's ID
 * @returns {Promise<Array>} Array of video objects
 */
export async function listVideos({ userId }) {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }

  return data || [];
}

/**
 * Add a new video
 * @param {Object} params - Parameters object
 * @param {string} params.user_id - The user's ID
 * @param {string} params.topic - The video topic
 * @param {string} params.title - The video title
 * @param {string} params.video_url - The video URL
 * @returns {Promise<Object>} The created video object
 */
export async function addVideo({ user_id, topic, title, video_url }) {
  const { data, error } = await supabase
    .from('videos')
    .insert([{ user_id, topic, title, video_url }])
    .select()
    .single();

  if (error) {
    console.error('Error adding video:', error);
    throw error;
  }

  return data;
}

/**
 * Delete a video by ID
 * @param {string} id - The video's ID
 * @returns {Promise<void>}
 */
export async function deleteVideo(id) {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
}

/**
 * Update a video
 * @param {string} id - The video's ID
 * @param {Object} changes - Object containing fields to update
 * @returns {Promise<Object>} The updated video object
 */
export async function updateVideo(id, changes) {
  const { data, error } = await supabase
    .from('videos')
    .update(changes)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating video:', error);
    throw error;
  }

  return data;
}
