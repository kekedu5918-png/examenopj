import { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AccountBottomNav } from '@/components/account/AccountBottomNav';
import { DashboardSidebar } from '@/components/account/DashboardSidebar';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getSession } from '@/features/account/controllers/get-session';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';
import { cn } from '@/utils/cn';

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
    /**
     * Avant : redirection brutale vers `/pricing` (paywall sec).
     * Maintenant : hub freemium contextualisé `/espace-gratuit` (Vague 3).
     */
    redirect('/espace-gratuit');
  }

  const bottomNav = process.env.NEXT_PUBLIC_ACCOUNT_BOTTOM_NAV === '1';

  return (
    <InteriorPageShell
      maxWidth='7xl'
      glow={SHELL_GLOW.dashboard}
      pad='default'
      className={cn('min-h-[60vh]', bottomNav && 'pb-20 md:pb-0')}
    >
      <div className='flex flex-col gap-8 lg:flex-row lg:items-start'>
        <DashboardSidebar />
        <div className='min-w-0 flex-1'>{children}</div>
      </div>
      <AccountBottomNav />
    </InteriorPageShell>
  );
}
