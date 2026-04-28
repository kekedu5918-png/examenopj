import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FicheV3DesignPreview } from '@/components/fondamentaux/fiche/FicheV3DesignPreview';

export const metadata: Metadata = {
  title: 'Design system — Fiche V3',
  robots: { index: false, follow: false },
};

export default function DesignSystemFicheV3Page() {
  if (process.env.ENABLE_DESIGN_SYSTEM !== 'true') {
    notFound();
  }

  return <FicheV3DesignPreview />;
}
