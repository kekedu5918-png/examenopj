import type { Metadata } from 'next';

import type { FasciculeHomeGroup } from '@/components/home/home-fascicule-types';
import { HomePageClient } from '@/components/home/home-page-client';
import { DOMAIN_LABELS, fasciculesList, legislativeHighlights } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';

const DOMAIN_ORDER: { domain: Domain }[] = [{ domain: 'DPS' }, { domain: 'DPG' }, { domain: 'PROCEDURE' }];

export const metadata: Metadata = {
  title: 'Accueil',
  description:
    "Préparez l'examen OPJ : fiches de cours synthétiques, quiz, flashcards, entraînements et méthodologie — contenus rédactionnels indépendants des supports institutionnels.",
};

export default function HomePage() {
  const fasciculeGroups: FasciculeHomeGroup[] = DOMAIN_ORDER.map(({ domain }) => ({
    domain,
    label: DOMAIN_LABELS[domain],
    items: fasciculesList
      .filter((m) => {
        if (domain === 'DPS') return m.domaine === 'DPS';
        if (domain === 'DPG') return m.domaine === 'DPG';
        return m.domaine === 'Procédure pénale';
      })
      .map((m) => ({
        id: m.id,
        num: m.numero,
        title: m.titre,
      })),
  }));

  const fasciculeCount = fasciculeGroups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <HomePageClient
      fasciculeGroups={fasciculeGroups}
      cahier={{ titre: legislativeHighlights.titre, periode: legislativeHighlights.periode }}
      fasciculeCount={fasciculeCount}
    />
  );
}
