// src/services/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials:', { 
    url: supabaseUrl ? 'present' : 'missing', 
    key: supabaseAnonKey ? 'present' : 'missing' })
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
