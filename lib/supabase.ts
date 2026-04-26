import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const validUrl = (url && url.startsWith('http')) ? url : 'https://example.supabase.co';
  const validKey = (key && key.length > 10) ? key : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjI1MDAwMDAwLCJleHAiOjE5MjUwMDAwMDB9.dummy';
  
  return { url: validUrl, key: validKey };
};

const { url, key } = getSupabaseConfig();
export const supabase = createClient(url, key);
