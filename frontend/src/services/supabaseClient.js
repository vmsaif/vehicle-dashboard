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

const vite_supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const vite_supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

let supabase;

if (!supabase) {
  supabase = createClient(vite_supabaseUrl, vite_supabaseKey);
}

export { supabase };