import type { Database } from '@/libs/supabase/types';
import { getEnvVar } from '@/utils/get-env-var';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseAdminSingleton: SupabaseClient<Database> | null = null;

/** Lazy init so `next build` does not require the service role key until a route actually runs. */
export function getSupabaseAdminClient(): SupabaseClient<Database> {
  if (!supabaseAdminSingleton) {
    supabaseAdminSingleton = createClient<Database>(
      getEnvVar(process.env.NEXT_PUBLIC_SUPABASE_URL, 'NEXT_PUBLIC_SUPABASE_URL'),
      getEnvVar(process.env.SUPABASE_SERVICE_ROLE_KEY, 'SUPABASE_SERVICE_ROLE_KEY')
    );
  }
  return supabaseAdminSingleton;
}
