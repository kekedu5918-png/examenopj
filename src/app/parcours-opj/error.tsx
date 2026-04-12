'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function ParcoursOpjError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[parcours-opj]', error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <h1 className="text-lg font-semibold text-[var(--ds-text-primary)]">
        Impossible de charger ta progression
      </h1>
      <p className="max-w-md text-sm text-[var(--ds-text-muted)]">
        Une erreur s’est produite lors du chargement du parcours. Tu peux réessayer ou revenir au tableau de bord.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={() => reset()}>
          Réessayer
        </Button>
        <Button type="button" variant="outline" asChild>
          <Link href="/dashboard">Retour au tableau de bord</Link>
        </Button>
      </div>
    </div>
  );
}
