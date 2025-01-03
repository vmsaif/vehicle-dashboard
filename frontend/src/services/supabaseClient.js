/**
 * @file:        supabaseClient.js
 * @project:     vehicle-dashboard
 * @author:      Saif Mahmud
 * @date:        2025-01-02
 * @version:     0.1
 * @contact:     msaifofficial@gmail.com
 *
 * @description: Supabase client configuration.
 */


import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

try {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('Error creating Supabase client:', error);
}

export { supabase };