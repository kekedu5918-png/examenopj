'use server';

import { getSession } from '@/features/account/controllers/get-session';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

export async function saveLearningNodeProgressAction(
  clientKey: string,
  scorePct: number,
): Promise<{ ok: boolean }> {
  const session = await getSession();
  if (!session?.user) return { ok: false };

  const supabase = await createSupabaseServerClient();
  const db = supabase as unknown as SupabaseClient<any>;
  const { data: node, error: nodeErr } = await db
    .from('learning_nodes')
    .select('id')
    .eq('client_key', clientKey)
    .maybeSingle();

  if (nodeErr || !node?.id) return { ok: false };

  const { data: existing } = await db
    .from('user_node_progress')
    .select('best_score_pct')
    .eq('user_id', session.user.id)
    .eq('node_id', node.id)
    .maybeSingle();

  const best = Math.max(existing?.best_score_pct ?? 0, scorePct);

  const { error } = await db.from('user_node_progress').upsert(
    {
      user_id: session.user.id,
      node_id: node.id,
      best_score_pct: best,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,node_id' },
  );

  if (error) return { ok: false };
  return { ok: true };
}
