import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { getSession } from '@/features/account/controllers/get-session';
import { checkOnboardingCompleted } from '@/features/onboarding/actions/onboarding-actions';

export const metadata: Metadata = {
  title: 'Bienvenue — ExamenOPJ',
  description: 'Créez votre plan d\'études personnalisé en 2 minutes.',
  robots: { index: false, follow: false },
};

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect('/login?next=/onboarding');

  const completed = await checkOnboardingCompleted();
  if (completed) redirect('/accueil');

  return <OnboardingFlow />;
}
