import type { Metadata } from 'next';

import { HomePageClient } from '@/components/home/home-page-client';
import { fasciculeToFamily, INFRACTION_FAMILY_OPTIONS } from '@/data/infractions-family-filter';
import { getInfractionsCatalog } from '@/data/recapitulatif-data';
import { openGraphForPage } from '@/utils/seo-metadata';

const homeTitle = 'ExamenOPJ — Révisions OPJ 2026 | Fiches, quiz, méthodologie & procédure pénale';
const homeDescription =
  "Méthode structurée pour préparer l'examen OPJ juin 2026 : fondamentaux, infractions, enquêtes, épreuves et entraînement (quiz, flashcards).";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: '/' },
  ...openGraphForPage('/', homeTitle, homeDescription),
};

export default function HomePage() {
  const infractionPreview = getInfractionsCatalog()
    .slice(0, 6)
    .map((i) => {
      const fam = fasciculeToFamily(i.fascicule);
      const familleLabel = INFRACTION_FAMILY_OPTIONS.find((o) => o.id === fam)?.label ?? 'Référentiel';
      return {
        id: i.id,
        infraction: i.infraction,
        familleLabel,
      };
    });

  return <HomePageClient infractionPreview={infractionPreview} />;
}
