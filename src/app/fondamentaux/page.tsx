import { Suspense } from 'react';
import type { Metadata } from 'next';

import { FondamentauxPage } from '@/components/fondamentaux/FondamentauxPage';
import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
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
    <Suspense
      fallback={
        <InteriorPageShell maxWidth='full' glow={SHELL_GLOW.fondamentaux} pad='none' className='min-h-[40vh]' innerClassName='min-h-[40vh]'>
          <p className='sr-only'>Chargement des fondamentaux…</p>
        </InteriorPageShell>
      }
    >
      <FondamentauxPage fiches={FICHES} categories={CATEGORIES} contentLocked={access.tier === 'freemium'} />
    </Suspense>
  );
}
