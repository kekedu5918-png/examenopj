import { signOut } from '@/app/(auth)/auth-actions';
import { getTrialEndingReminder } from '@/features/access/trial-window';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const session = await getSession();
  const subscription = await getSubscription();
  const trialReminder =
    session && !subscription ? getTrialEndingReminder(session.user.created_at) : null;

  return (
    <NavbarClient
      isLoggedIn={!!session}
      isPremium={!!subscription}
      signOut={signOut}
      trialReminder={trialReminder}
    />
  );
}
