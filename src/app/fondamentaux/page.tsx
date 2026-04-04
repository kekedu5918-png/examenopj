import { Suspense } from 'react';
import type { Metadata } from 'next';

import { FondamentauxPage } from '@/components/fondamentaux/FondamentauxPage';
import { CATEGORIES, FICHES } from '@/data/fondamentaux-data';

export const metadata: Metadata = {
  title: 'Fondamentaux OPJ — Notions clés à maîtriser',
  description:
    'Les notions clés pour l’examen OPJ : contrôle d’identité, garde à vue, mandats, OPJ/APJ, juridictions, infractions. Synthèse pour la révision 2026.',
};

export default function FondamentauxRoutePage() {
  return (
    <Suspense fallback={<div className='min-h-[40vh] bg-navy-950' />}>
      <FondamentauxPage fiches={FICHES} categories={CATEGORIES} />
    </Suspense>
  );
}
