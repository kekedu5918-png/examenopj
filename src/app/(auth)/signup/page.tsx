import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

import { signUp } from '../auth-actions';

type SignUpPageProps = {
  searchParams?: { plan?: string; billing?: string; error?: string; success?: string };
};

export default async function SignUpPage({ searchParams = {} }: SignUpPageProps) {
  const session = await getSession();
  const subscription = await getSubscription();

  if (session && subscription) {
    redirect('/account');
  }

  if (session && !subscription) {
    redirect('/pricing');
  }

  async function signUpAction(formData: FormData) {
    'use server';
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    const response = await signUp(email, password);

    if (response.error) {
      redirect('/signup?error=1');
    }

    redirect('/signup?success=1');
  }

  return (
    <main className='mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4'>
      <div className='w-full space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-6'>
        <h1 className='text-2xl font-bold text-slate-100'>Créer un compte</h1>
        <p className='text-sm text-slate-400'>
          7 jours d&apos;accès complet gratuit. Aucune carte bancaire requise.
        </p>

        {searchParams.error ? (
          <p className='rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
            Erreur lors de l&apos;inscription. Vérifiez votre e-mail et votre mot de passe (min. 6
            caractères).
          </p>
        ) : null}

        {searchParams.success ? (
          <div className='rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200'>
            <p className='font-medium'>Compte créé avec succès !</p>
            <p className='mt-1'>
              Si une confirmation par e-mail est activée, ouvrez le lien reçu puis{' '}
              <Link href='/login' className='underline underline-offset-2'>
                connectez-vous
              </Link>
              . Sinon, vous pouvez vous connecter tout de suite.
            </p>
          </div>
        ) : (
          <form action={signUpAction} className='space-y-4'>
            <Input name='email' type='email' placeholder='E-mail' required autoComplete='email' />
            <Input
              name='password'
              type='password'
              placeholder='Mot de passe (min. 6 caractères)'
              required
              minLength={6}
              autoComplete='new-password'
            />
            <Button
              type='submit'
              className='w-full bg-gold-500 font-semibold text-navy-950 hover:bg-gold-400'
            >
              Créer mon compte gratuitement
            </Button>
          </form>
        )}

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
