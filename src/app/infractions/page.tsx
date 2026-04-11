import { Suspense } from 'react';
import type { Metadata } from 'next';

import { InfractionsPageClient } from '@/components/infractions/InfractionsPageClient';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { APP_NAME } from '@/constants/site';
import { getInfractionsCatalog } from '@/data/recapitulatif-data';
import { openGraphForPage } from '@/utils/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const n = getInfractionsCatalog().length;
  const title = `Infractions — ${n} fiches (référentiel OPJ)`;
  const description = `${APP_NAME} : ${n} infractions du programme — tableau et fiches avec élément moral formulé à réciter mot pour mot, matériel et peines. Vues liste et flashcards. Préparation examen OPJ.`;
  return {
    title,
    description,
    alternates: { canonical: '/infractions' },
    ...openGraphForPage('/infractions', title, description),
  };
}

type Props = {
  searchParams: { q?: string };
};

export default function InfractionsPage({ searchParams }: Props) {
  const initialQuery = typeof searchParams.q === 'string' ? searchParams.q : '';

  return (
    <Suspense
      fallback={
        <InteriorPageShell
          maxWidth='6xl'
          glow={SHELL_GLOW.infractions}
          pad='default'
          innerClassName='flex min-h-[50vh] items-center justify-center text-gray-500'
        >
          <p role='status' aria-busy='true' aria-label='Chargement du référentiel infractions'>
            Chargement…
          </p>
        </InteriorPageShell>
      }
    >
      <InfractionsPageClient initialQuery={initialQuery} />
    </Suspense>
  );
}
