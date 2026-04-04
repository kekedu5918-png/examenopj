import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

import { SignUpForm } from './signup-form';

export default async function SignUpPage() {
  const session = await getSession();
  const subscription = await getSubscription();

  if (session && subscription) {
    redirect('/account');
  }

  if (session && !subscription) {
    redirect('/pricing');
  }

  return (
    <main className='mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4'>
      <div className='w-full space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-6'>
        <h1 className='text-2xl font-bold text-slate-100'>Créer un compte</h1>
        <p className='text-sm text-slate-400'>
          7 jours d&apos;accès complet gratuit. Aucune carte bancaire requise.
        </p>

        <SignUpForm />

        <p className='text-center text-sm text-slate-500'>
          Déjà inscrit ?{' '}
          <Link href='/login' className='text-blue-400 underline underline-offset-2'>
            Se connecter
          </Link>
        </p>
        <p className='text-center text-xs text-slate-600'>
          En vous inscrivant, vous acceptez nos{' '}
          <Link href='/cgv' className='text-cyan-400 underline underline-offset-2'>
            CGV
          </Link>{' '}
          et nos{' '}
          <Link href='/mentions-legales' className='text-cyan-400 underline underline-offset-2'>
            mentions légales
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
