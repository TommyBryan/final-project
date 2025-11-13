// Helper functions for ensuring user profile exists
import { supabase } from './supabaseClient';

/**
 * Ensures the current user has a profile in the database.
 * Creates one if it doesn't exist using RPC call.
 * @returns {Promise<{id: string, name: string, pfp_url: string | null}>}
 */
export async function ensureUserProfile() {
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  
  if (!user) {
    throw new Error('Not authenticated');
  }

  console.log('Checking profile for user:', user.id);

  // Check if profile exists
  const { data: existingProfile, error: selectError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (selectError) {
    console.error('Error checking for profile:', selectError);
  }

  if (existingProfile) {
    console.log('Profile exists:', existingProfile);
    return existingProfile;
  }

  console.log('Profile does not exist, creating via RPC...');

  // Profile doesn't exist - call the RPC function to create it
  const { error: rpcError } = await supabase.rpc('create_user_profile');
  
  if (rpcError) {
    console.error('RPC error creating profile:', rpcError);
    throw new Error(`Failed to create profile: ${rpcError.message}`);
  }

  console.log('RPC call succeeded, fetching created profile...');

  // Fetch the newly created profile
  const { data: newProfile, error: fetchError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (fetchError) {
    console.error('Error fetching newly created profile:', fetchError);
    throw new Error(`Profile creation may have failed: ${fetchError.message}`);
  }

  if (!newProfile) {
    throw new Error('Profile was not created successfully');
  }

  console.log('Profile created successfully:', newProfile);
  return newProfile;
}

/**
 * Gets the current authenticated user's ID
 * @returns {Promise<string | null>}
 */
export async function getCurrentUserId() {
  const { data: sessionData } = await supabase.auth.getSession();
  return sessionData?.session?.user?.id || null;
}
