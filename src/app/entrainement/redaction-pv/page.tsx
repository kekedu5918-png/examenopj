import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock } from 'lucide-react';

import { RedactionPVAtelierClient } from '@/components/redaction-pv/RedactionPVAtelierClient';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SUJETS_REDACTION_PV } from '@/data/sujets-redaction-pv';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';
import { cn } from '@/utils/cn';

export const metadata: Metadata = {
  title: 'Rédaction PV — atelier IA',
  description:
    'Entraînement rédaction PV OPJ — mise en situation, chronomètre, correction automatique par IA (note /20 et commentaires structurés).',
  robots: { index: true, follow: true },
};

type Props = { searchParams: { sujet?: string; modele?: string } };

export default async function RedactionPVPage({ searchParams }: Props) {
  const ok = await hasPremiumAccess();

  const fromQuery = searchParams.sujet?.trim() ?? '';
  const modeleSlug = searchParams.modele?.trim() ?? '';
  const bySujet = SUJETS_REDACTION_PV.some((s) => s.id === fromQuery) ? fromQuery : undefined;
  const byModele =
    !bySujet && modeleSlug
      ? SUJETS_REDACTION_PV.find((s) => s.modeleReference === modeleSlug)?.id
      : undefined;
  const initialSujetId = bySujet ?? byModele;

  return (
    <div className='container max-w-7xl pb-24 pt-10 md:pt-14'>
      <SectionTitle
        badge='Premium'
        badgeClassName='bg-examen-premium/25 text-violet-200'
        title='Atelier — rédaction de procès-verbal'
        subtitle='Mise en situation, rédaction libre, correction IA avec note sur 20 et relevé des éléments obligatoires. Chronomètre au démarrage de la session.'
        className='mb-8'
      />

      {!ok ? (
        <div
          className={cn(
            'relative rounded-2xl border border-examen-premium/30 bg-examen-premium/10 p-8 text-center',
          )}
        >
          <Lock className='mx-auto h-10 w-10 text-examen-premium' aria-hidden />
          <p className='mt-4 text-sm font-medium text-white'>Cet atelier est réservé aux abonnés Premium.</p>
          <Link
            href='/pricing'
            className='mt-6 inline-flex rounded-lg bg-gradient-to-r from-examen-accent to-examen-premium px-5 py-2.5 text-sm font-semibold text-white hover:brightness-110'
          >
            Passer Premium
          </Link>
        </div>
      ) : (
        <RedactionPVAtelierClient key={initialSujetId ?? 'default'} initialSujetId={initialSujetId} />
      )}
    </div>
  );
}
