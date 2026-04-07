import type { Metadata } from 'next';

import { HomePageClient } from '@/components/home/home-page-client';
import { getInfractionsCatalog } from '@/data/recapitulatif-data';
import { openGraphForPage } from '@/utils/seo-metadata';

const homeTitle = 'ExamenOPJ — Révisions OPJ 2026 | Fiches, quiz, méthodologie & procédure pénale';
const homeDescription =
  "Méthode structurée pour préparer l'examen OPJ juin 2026 : fiches F01–F15, quiz, flashcards, entraînement à la procédure pénale.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: '/' },
  ...openGraphForPage('/', homeTitle, homeDescription),
};

export default function HomePage() {
  const infractionPreview = getInfractionsCatalog()
    .slice(0, 6)
    .map((i) => ({
      id: i.id,
      infraction: i.infraction,
      fascicule: i.fascicule,
    }));

  return <HomePageClient infractionPreview={infractionPreview} />;
}
