import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bpergdomaetuujllbtft.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_3uQ__rTHykS6lYOSmWCRvA_p-uSk0yy';

// Client-safe instance — used from the browser to insert a wish.
// RLS policies (see supabase.sql) restrict this key to INSERT only.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only instance with the service role key — used from API routes
// (e.g. the admin dashboard) that need to read every wish. NEVER import
// this file's `supabaseAdmin` export from a client component.
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey || supabaseAnonKey, {
  auth: { persistSession: false },
});

export type Wish = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};
