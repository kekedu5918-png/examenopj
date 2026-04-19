import { signOut } from '@/app/(auth)/auth-actions';
import { getTrialEndingReminder, isUserInSignupTrialPeriod } from '@/features/access/trial-window';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { getUserStreakCurrent } from '@/lib/learningPath';

import { SiteHeaderClient } from './SiteHeaderClient';

/** Barre de navigation globale unifiée (toutes les pages). */
export async function Header() {
  const session = await getSession();
  const subscription = await getSubscription();
  const premium = !!subscription || isUserInSignupTrialPeriod(session?.user?.created_at);
  const trialReminder =
    session && !subscription ? getTrialEndingReminder(session.user.created_at) : null;
  /**
   * Streak côté serveur (table `learning_path.user_streaks`) — source de vérité globale.
   * Le client peut surcharger avec `localStorage` après une session quiz pour un retour instantané.
   */
  const initialStreak = session ? await getUserStreakCurrent(session.user.id).catch(() => 0) : 0;

  return (
    <SiteHeaderClient
      homeHref={session ? '/account' : '/'}
      isLoggedIn={!!session}
      isPremium={premium}
      signOut={signOut}
      trialReminder={trialReminder}
      initialStreak={initialStreak}
    />
  );
}
