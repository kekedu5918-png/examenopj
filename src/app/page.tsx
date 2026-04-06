import type { Metadata } from 'next';

import type { FasciculeHomeGroup } from '@/components/home/home-fascicule-types';
import { HomePageClient } from '@/components/home/home-page-client';
import { DOMAIN_LABELS, fasciculesList, legislativeHighlights } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { openGraphForPage } from '@/utils/seo-metadata';

const DOMAIN_ORDER: { domain: Domain }[] = [{ domain: 'DPS' }, { domain: 'DPG' }, { domain: 'PROCEDURE' }];

const homeTitle = 'ExamenOPJ — Révisions OPJ 2026 | Fiches, quiz, méthodologie & procédure pénale';
const homeDescription =
  "La référence pour préparer l'examen OPJ juin 2026. Fiches F01–F15, quiz, flashcards, entraînement à la procédure pénale.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: '/' },
  ...openGraphForPage('/', homeTitle, homeDescription),
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
