'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';

import { describeAuthError } from '@/app/(auth)/auth-error-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnalyticsEvents, track } from '@/lib/analytics/events';
import { createSupabaseBrowserClient } from '@/libs/supabase/supabase-browser';

export function SignUpForm() {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    track(AnalyticsEvents.signupStart, { source: 'email' });
    setErrorText(null);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');
    const emailRedirectTo = `${window.location.origin}/auth/callback`;

    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo },
      });

      if (error) {
        setErrorText(describeAuthError(error));
        setPending(false);
        return;
      }

      if (data.session) {
        window.location.assign('/post-login?next=%2Faccount');
        return;
      }

      setSuccess(true);
      setPending(false);
    } catch {
      setErrorText('Inscription impossible. Réessayez ou vérifiez votre connexion.');
      setPending(false);
    }
  }

  if (success) {
    return (
      <div className='rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200'>
        <p className='font-medium'>Compte créé avec succès !</p>
        <p className='mt-1'>
          Si une confirmation par e-mail est activée, ouvrez le lien reçu puis{' '}
          <Link href='/login' className='underline underline-offset-2'>
            connectez-vous
          </Link>
          . Sinon, vous pouvez{' '}
          <Link href='/login' className='underline underline-offset-2'>
            vous connecter
          </Link>{' '}
          tout de suite.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {errorText ? (
        <p className='rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
          {errorText}
        </p>
      ) : null}
      <Input name='email' type='email' placeholder='E-mail' required autoComplete='email' disabled={pending} />
      <Input
        name='password'
        type='password'
        placeholder='Mot de passe (min. 6 caractères)'
        required
        minLength={6}
        autoComplete='new-password'
        disabled={pending}
      />
      <Button
        type='submit'
        className='w-full bg-gold-500 font-semibold text-navy-950 hover:bg-gold-400'
        disabled={pending}
      >
        {pending ? 'Création…' : 'Créer mon compte gratuitement'}
      </Button>
    </form>
  );
}
