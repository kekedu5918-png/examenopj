'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export function ExamenBlancWaitlistCard() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMessage(null);
    setStatus('loading');
    try {
      const r = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const j: unknown = await r.json().catch(() => ({}));
      if (!r.ok) {
        setStatus('err');
        setMessage(
          j && typeof j === 'object' && 'error' in j && typeof (j as { error: unknown }).error === 'string'
            ? (j as { error: string }).error
            : 'Impossible d’enregistrer pour le moment.',
        );
        return;
      }
      setStatus('ok');
      setEmail('');
      setMessage('Vous serez notifié à l’ouverture.');
    } catch {
      setStatus('err');
      setMessage('Erreur réseau. Réessayez.');
    }
  }

  return (
    <div className='rounded-[12px] border border-dashed border-white/20 bg-white/[0.02] p-6 md:p-8'>
      <h2 className='font-display text-xl font-bold text-white md:text-2xl'>Examen blanc — Mode chronométré</h2>
      <p className='mt-2 text-sm leading-relaxed text-examen-inkMuted md:text-base'>
        3 heures en conditions réelles. Soyez notifié à l&apos;ouverture.
      </p>
      <form onSubmit={onSubmit} className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch'>
        <label htmlFor='waitlist-email' className='sr-only'>
          Adresse e-mail
        </label>
        <input
          id='waitlist-email'
          type='email'
          name='email'
          autoComplete='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='votre@email.fr'
          className='min-h-11 flex-1 rounded-lg border border-white/[0.12] bg-examen-canvas px-4 py-2.5 text-sm text-examen-ink placeholder:text-examen-inkMuted/70 focus:border-examen-accent/40 focus:outline-none focus:ring-2 focus:ring-examen-accent/25'
        />
        <button
          type='submit'
          disabled={status === 'loading'}
          className='rounded-lg bg-examen-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-examen-accentHover disabled:opacity-60'
        >
          {status === 'loading' ? 'Envoi…' : 'Me prévenir'}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === 'ok' ? 'text-examen-success' : 'text-examen-danger'}`}
          role={status === 'err' ? 'alert' : 'status'}
        >
          {message}
        </p>
      ) : null}
      <p className='mt-4 text-xs text-examen-inkMuted'>
        Liste d’intérêt pour les sessions blanches — pas de chiffre public affiché.
      </p>
    </div>
  );
}
