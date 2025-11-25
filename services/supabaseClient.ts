import { createClient } from '@supabase/supabase-js';

// NOTE: In a real environment, these are populated via process.env
// For this demo generation, we handle the case where they might be missing gracefully in the components
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);