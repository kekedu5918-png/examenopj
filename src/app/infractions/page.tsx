import { Suspense } from 'react';
import type { Metadata } from 'next';

import { InfractionsPageClient } from '@/components/infractions/InfractionsPageClient';
import { APP_NAME } from '@/constants/site';
import { getInfractionsCatalog } from '@/data/recapitulatif-data';
import { openGraphForPage } from '@/utils/seo-metadata';

export async function generateMetadata(): Promise<Metadata> {
  const n = getInfractionsCatalog().length;
  const title = `Infractions — ${n} fiches (référentiel OPJ)`;
  const description = `${APP_NAME} : référentiel de ${n} infractions (personnes et biens du programme) — recherche, éléments légaux, matériel et moral, vues tableau, liste et flashcards. Préparation examen OPJ.`;
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
        <div
          className='container flex min-h-[50vh] items-center justify-center text-gray-500'
          aria-busy
          aria-label='Chargement du référentiel infractions'
        >
          Chargement…
        </div>
      }
    >
      <InfractionsPageClient initialQuery={initialQuery} />
    </Suspense>
  );
}
