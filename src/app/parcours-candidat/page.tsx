import type { Metadata } from 'next';

import { ParcoursCandidatClient } from '@/components/parcours/ParcoursCandidatClient';

export const metadata: Metadata = {
  title: 'Parcours candidat — Examen OPJ',
  description:
    'Parcours guidé : fondamentaux, récap prioritaire, flashcards, enquêtes, méthode épreuve 2 et articulation interactive.',
};

export default function ParcoursCandidatPage() {
  return <ParcoursCandidatClient />;
}
