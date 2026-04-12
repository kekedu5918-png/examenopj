import { getSession } from '@/features/account/controllers/get-session';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';
import type { SupabaseClient } from '@supabase/supabase-js';

/** Scores par `client_key` (ex. gav-1) pour fusion avec le localStorage. */
export async function getLearningPathProgressByClientKey(): Promise<Record<string, number>> {
  const session = await getSession();
  if (!session?.user) return {};

  const supabase = await createSupabaseServerClient();
  const db = supabase as unknown as SupabaseClient<any>;
  const { data: progress, error: pErr } = await db
    .from('user_node_progress')
    .select('node_id, best_score_pct')
    .eq('user_id', session.user.id);

  if (pErr || !progress?.length) return {};

  const nodeIds = [...new Set(progress.map((p) => p.node_id))];
  const { data: nodes, error: nErr } = await db
    .from('learning_nodes')
    .select('id, client_key')
    .in('id', nodeIds);

  if (nErr || !nodes?.length) return {};

  const idToKey = new Map(nodes.map((n) => [n.id, n.client_key]));
  const out: Record<string, number> = {};
  for (const row of progress) {
    const key = idToKey.get(row.node_id);
    if (key && typeof row.best_score_pct === 'number') {
      out[key] = Math.max(out[key] ?? 0, row.best_score_pct);
    }
  }
  return out;
}
