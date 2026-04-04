import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { safeInternalPath } from '@/utils/safe-internal-path';

import { signInWithPassword } from '../auth-actions';

type LoginPageProps = {
  searchParams?: { next?: string; error?: string };
};

export default async function LoginPage({ searchParams = {} }: LoginPageProps) {
  const session = await getSession();
  const subscription = await getSubscription();
  const nextPath = safeInternalPath(searchParams.next, '/dashboard');

  if (session && subscription) {
    redirect('/account');
  }

  if (session && !subscription) {
    redirect('/pricing');
  }

  async function signInAction(formData: FormData) {
    'use server';
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    const nextRaw = String(formData.get('next') || '');
    const response = await signInWithPassword(email, password);
    if (!response.error) {
      redirect(safeInternalPath(nextRaw, '/dashboard'));
    }
    redirect(`/login?error=1&next=${encodeURIComponent(safeInternalPath(nextRaw, '/dashboard'))}`);
  }

  return (
    <main className='mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4'>
      <form action={signInAction} className='w-full space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-6'>
        <h1 className='text-2xl font-bold text-slate-100'>Connexion</h1>
        {searchParams.error ? (
          <p className='rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
            Identifiants incorrects. Réessayez ou{' '}
            <Link href='/signup' className='underline underline-offset-2'>
              créez un compte
            </Link>
            .
          </p>
        ) : null}
        <input type='hidden' name='next' value={nextPath} />
        <Input name='email' type='email' placeholder='Email' required autoComplete='email' />
        <Input name='password' type='password' placeholder='Mot de passe' required autoComplete='current-password' />
        <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700'>
          Se connecter
        </Button>
      </form>
    </main>
  );
}
