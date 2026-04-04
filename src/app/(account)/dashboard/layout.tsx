import { PropsWithChildren } from 'react';
import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

/** Espace membre : compte requis + abonnement actif (aligné sur le flux login → pricing). */
export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const subscription = await getSubscription();
  if (!subscription) {
    redirect('/pricing');
  }

  return <div className='min-h-[60vh]'>{children}</div>;
}
