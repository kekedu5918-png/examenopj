import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';
import { checkOnboardingCompleted } from '@/features/onboarding/actions/onboarding-actions';
import { safeInternalPath } from '@/utils/safe-internal-path';

type PostLoginPageProps = {
  searchParams?: { next?: string };
};

/**
 * Point d'entrée unique après connexion côté navigateur : une navigation complète
 * envoie les cookies, puis le serveur renvoie vers la bonne page (sans enchaîner refresh + push).
 */
export default async function PostLoginPage({ searchParams = {} }: PostLoginPageProps) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const premium = await hasPremiumAccess();
  const nextPath = safeInternalPath(searchParams.next, '/accueil');

  if (!premium) {
    redirect(nextPath);
  }

  // Rediriger vers l'onboarding si pas encore complété
  const onboardingDone = await checkOnboardingCompleted();
  if (!onboardingDone) {
    redirect('/onboarding');
  }

  if (
    nextPath.startsWith('/accueil') ||
    nextPath.startsWith('/bienvenue') ||
    nextPath.startsWith('/dashboard') ||
    nextPath.startsWith('/account') ||
    nextPath.startsWith('/manage-subscription')
  ) {
    redirect(nextPath);
  }

  redirect('/account');
}
