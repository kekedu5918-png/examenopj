'use client';

import { useEffect, useState } from 'react';

import { ANALYTICS_CONSENT_KEY } from '@/lib/analytics/consent';
import { cn } from '@/utils/cn';

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem(ANALYTICS_CONSENT_KEY);
      setVisible(v === null);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role='dialog'
      aria-label='Cookies et mesure d’audience'
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[1100] border-t border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-navy-950/95',
      )}
    >
      <div className='mx-auto flex max-w-4xl flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <p className='text-sm text-slate-700 dark:text-slate-300'>
          Nous utilisons des cookies pour la mesure d’audience (PostHog) et améliorer le service. Refuser n’impacte pas
          votre accès au contenu.{' '}
          <a
            href='/mentions-legales'
            className='font-semibold text-blue-700 underline dark:text-sky-300'
          >
            Mentions légales
          </a>
        </p>
        <div className='flex shrink-0 flex-wrap gap-2'>
          <button
            type='button'
            className='rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10'
            onClick={() => {
              localStorage.setItem(ANALYTICS_CONSENT_KEY, 'denied');
              setVisible(false);
            }}
          >
            Refuser
          </button>
          <button
            type='button'
            className='rounded-lg bg-examen-accent px-4 py-2 text-sm font-semibold text-white hover:opacity-95'
            onClick={() => {
              localStorage.setItem(ANALYTICS_CONSENT_KEY, 'granted');
              setVisible(false);
              window.dispatchEvent(new Event('examenopj:analytics-consent'));
            }}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
