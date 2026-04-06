import type { Metadata } from 'next';

import { ParcoursCandidatClient } from '@/components/parcours/ParcoursCandidatClient';
import { openGraphForPage } from '@/utils/seo-metadata';

const pTitle = 'Parcours candidat — Examen OPJ';
const pDesc =
  'Plans 26 semaines : cartographier, approfondir, mode concours. Liens quiz, modules, sujets blancs et checklist locale.';

export const metadata: Metadata = {
  title: pTitle,
  description: pDesc,
  alternates: { canonical: '/parcours-candidat' },
  ...openGraphForPage('/parcours-candidat', pTitle, pDesc),
};

export default function ParcoursCandidatPage() {
  return <ParcoursCandidatClient />;
}
