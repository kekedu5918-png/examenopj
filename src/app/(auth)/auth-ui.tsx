'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { APP_NAME } from '@/constants/site';
import { ActionResponse } from '@/types/action-response';

const titleMap = {
  login: `Connexion — ${APP_NAME}`,
  signup: `Créer un compte — ${APP_NAME}`,
} as const;

/** Connexion par lien magique (e-mail uniquement). OAuth retiré tant que les providers ne sont pas activés dans Supabase. */
export function AuthUI({
  mode,
  signInWithEmail,
}: {
  mode: 'login' | 'signup';
  signInWithEmail: (email: string) => Promise<ActionResponse>;
}) {
  const [pending, setPending] = useState(false);

  async function handleEmailSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const form = event.target as HTMLFormElement;
    const email = form['email'].value;
    const response = await signInWithEmail(email);

    if (response.error) {
      toast({
        variant: 'destructive',
        description: "L'envoi du lien a échoué. Réessayez dans un instant.",
      });
    } else {
      toast({
        description: `Ouvrez le lien reçu par e-mail à l'adresse : ${email}`,
      });
    }

    form.reset();
    setPending(false);
  }

  return (
    <section className='mt-16 flex w-full flex-col gap-16 rounded-lg bg-black p-10 px-4 text-center'>
      <div className='flex flex-col gap-4'>
        <Image src='/logo.png' width={80} height={80} alt={APP_NAME} className='m-auto' />
        <h1 className='text-lg text-white'>{titleMap[mode]}</h1>
      </div>
      <div className='flex flex-col gap-4'>
        <p className='text-sm text-gray-400'>
          Saisissez votre e-mail pour recevoir un lien de connexion (magic link).
        </p>
        <div className='w-full rounded-md bg-zinc-900 p-8'>
          <form onSubmit={handleEmailSubmit}>
            <Input
              type='email'
              name='email'
              placeholder='Votre adresse e-mail'
              aria-label='Adresse e-mail'
              autoFocus
            />
            <div className='mt-4 flex justify-end gap-2'>
              <Button variant='secondary' type='submit' disabled={pending}>
                Envoyer le lien
              </Button>
            </div>
          </form>
        </div>
        <p className='text-sm text-gray-500'>
          Connexion par mot de passe :{' '}
          <Link href='/login' className='text-cyan-400 underline underline-offset-2'>
            page Connexion
          </Link>
          {' · '}
          Inscription :{' '}
          <Link href='/signup' className='text-cyan-400 underline underline-offset-2'>
            Créer un compte
          </Link>
        </p>
      </div>
      {mode === 'signup' ? (
        <span className='text-neutral5 m-auto max-w-sm text-sm text-gray-400'>
          En continuant, vous acceptez nos{' '}
          <Link href='/cgv' className='text-cyan-400 underline underline-offset-2'>
            conditions générales
          </Link>{' '}
          et prenez connaissance des{' '}
          <Link href='/mentions-legales' className='text-cyan-400 underline underline-offset-2'>
            mentions légales
          </Link>
          .
        </span>
      ) : null}
    </section>
  );
}
