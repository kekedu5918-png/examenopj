import type { Metadata } from 'next';

import { PricingSection } from '@/features/pricing/components/pricing-section';

export const metadata: Metadata = {
  title: 'Tarifs',
  description: 'Abonnements ExamenOPJ : accès aux contenus de révision et outils pour préparer le concours OPJ.',
};

export default async function PricingPage() {
  return <PricingSection isPricingPage />;
}
