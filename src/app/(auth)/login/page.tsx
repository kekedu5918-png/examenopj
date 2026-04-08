import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';
import { safeInternalPath } from '@/utils/safe-internal-path';

import { LoginForm } from './login-form';

type LoginPageProps = {
  searchParams?: { next?: string; error?: string };
};

function loginQueryBanner(error: string | undefined): string | null {
  if (!error) return null;
  if (error === 'auth_callback') {
    return 'Connexion interrompue après le lien e-mail ou OAuth. Réessayez depuis la page de connexion ou demandez un nouveau lien.';
  }
  if (error === '1') {
    return 'La précédente tentative a échoué. Réessayez ci-dessous.';
  }
  return null;
}

export default async function LoginPage({ searchParams = {} }: LoginPageProps) {
  const session = await getSession();
  const premium = session ? await hasPremiumAccess() : false;
  const nextPath = safeInternalPath(searchParams.next, '/accueil');

  if (session && premium) {
    redirect('/account');
  }

  if (session && !premium) {
    redirect('/pricing');
  }

  const banner = loginQueryBanner(searchParams.error);

  return (
    <main className='mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4'>
      <div className='w-full space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-6'>
        <h1 className='text-2xl font-bold text-slate-100'>Connexion</h1>
        {banner ? (
          <p className='rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
            {banner}{' '}
            {searchParams.error !== 'auth_callback' ? (
              <>
                <Link href='/inscription' className='underline underline-offset-2'>
                  Créer un compte
                </Link>
                .
              </>
            ) : null}
          </p>
        ) : null}
        <LoginForm nextPath={nextPath} />
        <p className='text-center text-sm text-slate-500'>
          Pas encore de compte ?{' '}
          <Link href='/inscription' className='text-gold-400 underline underline-offset-2'>
            S&apos;inscrire gratuitement
          </Link>
        </p>
      </div>
    </main>
  );
}
