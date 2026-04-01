import { signOut } from '@/app/(auth)/auth-actions';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

import { NavbarClient } from './NavbarClient';

export async function Navbar() {
  const session = await getSession();
  const subscription = await getSubscription();

  return (
    <NavbarClient isLoggedIn={!!session} isPremium={!!subscription} signOut={signOut} />
  );
}
