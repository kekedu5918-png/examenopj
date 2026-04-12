import { getSupabaseAdminClient } from '@/libs/supabase/supabase-admin';

const DUPLICATE_CODE = '23505';

/**
 * Réserve l'event Stripe pour traitement. Si déjà réservé, retourner `alreadyClaimed: true`.
 * En cas d'échec du handler, appeler `releaseStripeWebhookEvent` pour autoriser un retry Stripe.
 */
export async function claimStripeWebhookEvent(
  eventId: string,
): Promise<{ alreadyClaimed: boolean }> {
  const admin = getSupabaseAdminClient();
  const { error } = await admin.from('stripe_webhook_events').insert({ id: eventId });
  if (!error) {
    return { alreadyClaimed: false };
  }
  if ((error as { code?: string }).code === DUPLICATE_CODE) {
    return { alreadyClaimed: true };
  }
  throw error;
}

export async function releaseStripeWebhookEvent(eventId: string): Promise<void> {
  const admin = getSupabaseAdminClient();
  await admin.from('stripe_webhook_events').delete().eq('id', eventId);
}
