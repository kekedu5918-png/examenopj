'use client';

import { useCallback, useEffect, useState } from 'react';
import { Bell, Loader2 } from 'lucide-react';

import { useToast } from '@/components/ui/use-toast';

/**
 * Opt-in rappels e-mail — base légale explicite, aligné docs/ENGAGEMENT.md et API `/api/user-preferences`.
 */
export function EngagementPreferencesCard() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [optIn, setOptIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch('/api/user-preferences');
        if (!res.ok) throw new Error('fetch');
        const data = (await res.json()) as { emailRemindersOptIn?: boolean };
        if (!cancelled) setOptIn(Boolean(data.emailRemindersOptIn));
      } catch {
        if (!cancelled) setLoadError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onToggle = useCallback(
    async (next: boolean) => {
      setSaving(true);
      try {
        const res = await fetch('/api/user-preferences', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailRemindersOptIn: next }),
        });
        if (!res.ok) throw new Error('save');
        setOptIn(next);
        toast({
          title: next ? 'Rappels activés' : 'Rappels désactivés',
          description: next
            ? 'Vous recevrez des messages liés à votre préparation (révisions, série).'
            : 'Vous ne recevrez plus d’e-mails de rappel.',
        });
      } catch {
        toast({ variant: 'destructive', title: 'Enregistrement impossible', description: 'Réessayez dans un instant.' });
      } finally {
        setSaving(false);
      }
    },
    [toast],
  );

  if (loading) {
    return (
      <div className='flex items-center gap-2 text-sm text-ds-text-muted' role='status' aria-live='polite'>
        <Loader2 className='h-4 w-4 animate-spin' aria-hidden />
        Chargement des préférences…
      </div>
    );
  }

  if (loadError) {
    return (
      <p className='text-sm text-amber-800 dark:text-amber-200' role='alert'>
        Préférences indisponibles pour le moment. Réessayez plus tard ou vérifiez votre connexion.
      </p>
    );
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-start gap-3 rounded-lg border border-ds-border bg-ds-bg-primary/60 p-3 dark:bg-slate-900/40'>
        <Bell className='mt-0.5 h-5 w-5 shrink-0 text-ds-text-muted' aria-hidden />
        <div className='min-w-0 flex-1 space-y-2'>
          <label className='flex cursor-pointer items-start gap-3'>
            <input
              type='checkbox'
              checked={optIn}
              disabled={saving}
              onChange={(e) => void onToggle(e.target.checked)}
              className='mt-1 h-4 w-4 shrink-0 rounded border-ds-border text-cyan-600 focus:ring-cyan-500/30 dark:border-slate-600'
            />
            <span>
              <span className='block text-sm font-medium text-ds-text-primary'>Rappels par e-mail</span>
              <span className='mt-0.5 block text-xs text-ds-text-muted'>
                Révisions à venir, série d’entraînement — uniquement utile pour l’examen OPJ.
              </span>
            </span>
          </label>
          <p className='text-xs leading-relaxed text-ds-text-muted'>
            Pas de publicité. Désactivation possible à tout moment. Les envois respectent votre choix et le RGPD ; votre
            adresse ne sert qu’à ces messages si vous cochez la case.
          </p>
        </div>
      </div>
    </div>
  );
}
