import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { getSession } from '@/features/account/controllers/get-session';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Espace membre : compte requis + abonnement ou essai gratuit à l’inscription. */
export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const premium = await hasPremiumAccess();
  if (!premium) {
    redirect('/pricing');
  }

  return (
    <InteriorPageShell maxWidth='7xl' glow='blue' pad='default' className='min-h-[60vh]'>
      {children}
    </InteriorPageShell>
  );
}
