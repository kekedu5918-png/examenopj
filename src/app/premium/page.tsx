import type { Metadata } from 'next';

import { PricingPageServer } from '@/features/pricing/components/pricing-page-server';
import { openGraphForPage } from '@/utils/seo-metadata';

export const dynamic = 'force-dynamic';

const title = 'Premium — Tarifs | Examen OPJ';
const description =
  'Gratuit, 9,90 €/mois ou 49 € jusqu’au 11 juin 2026 : enquêtes, PV, articulation, fondamentaux et quiz.';

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  alternates: { canonical: '/premium' },
  ...openGraphForPage('/premium', title, description),
};

export default async function PremiumPage() {
  return <PricingPageServer />;
}
