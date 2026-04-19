'use client';

import { useState, useTransition } from 'react';

import { signInWithOAuth } from '@/app/(auth)/auth-actions';
import { AnalyticsEvents, track } from '@/lib/analytics/events';

type Provider = 'google' | 'github';

const providerLabels: Record<Provider, string> = {
  google: 'Google',
  github: 'GitHub',
};

function GoogleIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5' aria-hidden>
      <path
        fill='#EA4335'
        d='M12 10.2v3.97h5.49c-.24 1.4-1.69 4.1-5.49 4.1-3.31 0-6-2.74-6-6.12s2.69-6.12 6-6.12c1.88 0 3.14.8 3.86 1.49l2.64-2.55C16.99 3.5 14.74 2.5 12 2.5 6.76 2.5 2.5 6.76 2.5 12s4.26 9.5 9.5 9.5c5.49 0 9.13-3.86 9.13-9.29 0-.62-.07-1.1-.16-1.51H12z'
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox='0 0 24 24' className='h-5 w-5' aria-hidden fill='currentColor'>
      <path d='M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.27-5.24-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17a10.91 10.91 0 0 1 5.74 0c2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.06.78 2.13v3.16c0 .31.21.68.8.56A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z' />
    </svg>
  );
}

type OAuthButtonProps = {
  provider: Provider;
  className?: string;
};

function OAuthButton({ provider, className }: OAuthButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);
    track(AnalyticsEvents.signupStart, { source: provider });
    startTransition(async () => {
      const res = await signInWithOAuth(provider);
      if (res?.error) {
        setError("Connexion " + providerLabels[provider] + " indisponible. Réessayez ou utilisez l'e-mail.");
      }
    });
  }

  return (
    <div className='space-y-2'>
      <button
        type='button'
        onClick={handleClick}
        disabled={pending}
        className={
          'inline-flex w-full items-center justify-center gap-2 rounded-md border border-ds-border bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700/70 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 ' +
          (className ?? '')
        }
      >
        {provider === 'google' ? <GoogleIcon /> : <GitHubIcon />}
        <span>{pending ? 'Redirection…' : 'Continuer avec ' + providerLabels[provider]}</span>
      </button>
      {error ? (
        <p className='text-xs text-red-300' role='alert'>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Bloc OAuth + séparateur. Affiche Google par défaut.
 * Activez d'autres fournisseurs en ajoutant les boutons dans `providers`.
 */
export function OAuthSection({ disabled = false }: { disabled?: boolean }) {
  if (disabled) return null;
  return (
    <div className='space-y-3'>
      <OAuthButton provider='google' />
      <div className='relative my-2'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-ds-border dark:border-slate-700/60' />
        </div>
        <div className='relative flex justify-center text-[11px] font-medium uppercase tracking-wider'>
          <span className='bg-ds-bg-secondary px-2 text-ds-text-muted dark:bg-navy-950'>ou par e-mail</span>
        </div>
      </div>
    </div>
  );
}
