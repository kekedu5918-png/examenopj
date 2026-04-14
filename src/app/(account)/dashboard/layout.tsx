import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AccountBottomNav } from '@/components/account/AccountBottomNav';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { cn } from '@/utils/cn';
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

  const bottomNav = process.env.NEXT_PUBLIC_ACCOUNT_BOTTOM_NAV === '1';

  return (
    <InteriorPageShell
      maxWidth='7xl'
      glow={SHELL_GLOW.dashboard}
      pad='default'
      className={cn('min-h-[60vh]', bottomNav && 'pb-20 md:pb-0')}
    >
      {children}
      <AccountBottomNav />
    </InteriorPageShell>
  );
}
