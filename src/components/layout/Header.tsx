import { signOut } from '@/app/(auth)/auth-actions';
import { getTrialEndingReminder, isUserInSignupTrialPeriod } from '@/features/access/trial-window';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

import { SiteHeaderClient } from './SiteHeaderClient';

/** Barre de navigation globale unifiée (toutes les pages). */
export async function Header() {
  const session = await getSession();
  const subscription = await getSubscription();
  const premium = !!subscription || isUserInSignupTrialPeriod(session?.user?.created_at);
  const trialReminder =
    session && !subscription ? getTrialEndingReminder(session.user.created_at) : null;

  return (
    <SiteHeaderClient
      homeHref={session ? '/account' : '/'}
      isLoggedIn={!!session}
      isPremium={premium}
      signOut={signOut}
      trialReminder={trialReminder}
    />
  );
}
