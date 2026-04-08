import { Suspense } from 'react';
import type { Metadata } from 'next';

import { FondamentauxPage } from '@/components/fondamentaux/FondamentauxPage';
import { CATEGORIES, FICHES } from '@/data/fondamentaux-data';
import { getContentAccess } from '@/features/access/get-content-access';
import { openGraphForPage } from '@/utils/seo-metadata';

const fonTitle = 'Fondamentaux OPJ — Notions clés à maîtriser';
const fonDescription =
  'Les notions clés pour l’examen OPJ : contrôle d’identité, garde à vue, mandats, OPJ/APJ, juridictions, infractions. Contenu original conforme aux fascicules officiels du programme — synthèse pour la révision 2026.';

export const metadata: Metadata = {
  title: fonTitle,
  description: fonDescription,
  alternates: { canonical: '/fondamentaux' },
  ...openGraphForPage('/fondamentaux', fonTitle, fonDescription),
};

export default async function FondamentauxRoutePage() {
  const access = await getContentAccess();

  return (
    <Suspense fallback={<div className='min-h-[40vh] bg-navy-950' />}>
      <FondamentauxPage fiches={FICHES} categories={CATEGORIES} contentLocked={access.tier === 'freemium'} />
    </Suspense>
  );
}
