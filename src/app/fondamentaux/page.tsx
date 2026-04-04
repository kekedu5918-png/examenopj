import { Suspense } from 'react';
import type { Metadata } from 'next';

import { FondamentauxPage } from '@/components/fondamentaux/FondamentauxPage';
import { CATEGORIES, FICHES } from '@/data/fondamentaux-data';
import { getContentAccess } from '@/features/access/get-content-access';

export const metadata: Metadata = {
  title: 'Fondamentaux OPJ — Notions clés à maîtriser',
  description:
    'Les notions clés pour l’examen OPJ : contrôle d’identité, garde à vue, mandats, OPJ/APJ, juridictions, infractions. Synthèse pour la révision 2026.',
};

export default async function FondamentauxRoutePage() {
  const access = await getContentAccess();

  return (
    <Suspense fallback={<div className='min-h-[40vh] bg-navy-950' />}>
      <FondamentauxPage fiches={FICHES} categories={CATEGORIES} contentLocked={access.tier === 'freemium'} />
    </Suspense>
  );
}
