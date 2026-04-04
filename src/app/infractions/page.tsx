import { Suspense } from 'react';
import type { Metadata } from 'next';

import { InfractionsPageClient } from '@/components/infractions/InfractionsPageClient';
import { APP_NAME } from '@/constants/site';

export const metadata: Metadata = {
  title: 'Infractions',
  description: `${APP_NAME} : référentiel des infractions (F01, F02) — recherche, éléments légaux, matériel et moral. Préparation examen OPJ.`,
  alternates: { canonical: '/infractions' },
};

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
