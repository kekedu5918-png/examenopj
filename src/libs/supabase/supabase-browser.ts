'use client';

import { Database } from '@/libs/supabase/types';
import { createBrowserClient } from '@supabase/ssr';

/** Client Supabase côté navigateur (sessions persistantes via cookies lisibles par le middleware). */
export function createSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY manquant');
  }
  return createBrowserClient<Database>(url, key);
}
