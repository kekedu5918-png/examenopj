import { isUserInSignupTrialPeriod } from '@/features/access/trial-window';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

/**
 * Accès aux contenus « Premium » : abonnement Stripe (trialing / active)
 * ou période d’essai gratuite à l’inscription ({@link TRIAL_DAYS} jours).
 */
export async function hasPremiumAccess(): Promise<boolean> {
  const subscription = await getSubscription();
  if (subscription) return true;

  const session = await getSession();
  return isUserInSignupTrialPeriod(session?.user?.created_at);
}
