import type { Metadata } from 'next';

import { HomeFaqSection } from '@/components/home/home-faq-section';
import { HomeInfractionsSeoIndex } from '@/components/home/home-infractions-seo-index';
import { HomePageClient } from '@/components/home/home-page-client';
import { HomeFaqJsonLd } from '@/components/seo/home-faq-json-ld';
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
  const catalog = getInfractionsCatalog();
  const infractionPreview = catalog.slice(0, 12).map((i) => {
    const fam = fasciculeToFamily(i.fascicule);
    const familleLabel = INFRACTION_FAMILY_OPTIONS.find((o) => o.id === fam)?.label ?? 'Référentiel';
    return {
      id: i.id,
      infraction: i.infraction,
      familleLabel,
    };
  });

  return (
    <>
      <HomeFaqJsonLd />
      <HomePageClient catalogTotal={catalog.length} infractionPreview={infractionPreview} />
      <HomeInfractionsSeoIndex catalog={catalog} />
      <HomeFaqSection />
    </>
  );
}
