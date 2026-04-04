import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { safeInternalPath } from '@/utils/safe-internal-path';

type PostLoginPageProps = {
  searchParams?: { next?: string };
};

/**
 * Point d’entrée unique après connexion côté navigateur : une navigation complète
 * envoie les cookies, puis le serveur renvoie vers la bonne page (sans enchaîner refresh + push).
 */
export default async function PostLoginPage({ searchParams = {} }: PostLoginPageProps) {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const subscription = await getSubscription();
  const nextPath = safeInternalPath(searchParams.next, '/dashboard');

  if (!subscription) {
    redirect('/pricing');
  }

  if (nextPath.startsWith('/dashboard') || nextPath.startsWith('/account') || nextPath.startsWith('/manage-subscription')) {
    redirect(nextPath);
  }

  redirect('/account');
}
