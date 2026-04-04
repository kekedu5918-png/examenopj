import { SubscriptionWithProduct } from '@/features/pricing/types';
import { createSupabaseServerClient } from '@/libs/supabase/supabase-server-client';

export async function getSubscription(): Promise<SubscriptionWithProduct | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error(error);
  }

  return (data as SubscriptionWithProduct | null) ?? null;
}
