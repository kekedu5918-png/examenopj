import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { Database } from '@/libs/supabase/types';
import type { SupabaseClient } from '@supabase/supabase-js';

import 'server-only';

/** Corrections PV enregistrées aujourd’hui (timezone UTC alignée avec `created_at`). */
export async function getPvCorrectionUsageToday(userId: string): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const db = supabase as unknown as SupabaseClient<Database>;
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);

  const { count, error } = await db
    .from('pv_corrections')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', start.toISOString());

  if (error) {
    console.error('[pv-correction-quota]', error);
    return 0;
  }
  return count ?? 0;
}
