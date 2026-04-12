'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';

import { describeAuthError } from '@/app/(auth)/auth-error-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnalyticsEvents, track } from '@/lib/analytics/events';
import { createSupabaseBrowserClient } from '@/libs/supabase/supabase-browser';
import { safeInternalPath } from '@/utils/safe-internal-path';

type LoginFormProps = {
  nextPath: string;
};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorText(null);
    setPending(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');
    const nextRaw = String(fd.get('next') || '');
    const dest = safeInternalPath(nextRaw, nextPath);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorText(describeAuthError(error));
        setPending(false);
        return;
      }
      track(AnalyticsEvents.loginSuccess, { method: 'password' });
      // Navigation complète : évite la course refresh RSC /login + push (boucles ou clignotements).
      const postLogin = `/post-login?next=${encodeURIComponent(dest)}`;
      window.location.assign(postLogin);
    } catch {
      setErrorText('Connexion impossible. Réessayez ou vérifiez votre connexion.');
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {errorText ? (
        <p className='rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
          {errorText}{' '}
          <Link href='/inscription' className='underline underline-offset-2'>
            Créer un compte
          </Link>
          .
        </p>
      ) : null}
      <input type='hidden' name='next' value={nextPath} />
      <Input name='email' type='email' placeholder='E-mail' required autoComplete='email' disabled={pending} />
      <Input
        name='password'
        type='password'
        placeholder='Mot de passe'
        required
        autoComplete='current-password'
        disabled={pending}
      />
      <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700' disabled={pending}>
        {pending ? 'Connexion…' : 'Se connecter'}
      </Button>
    </form>
  );
}
