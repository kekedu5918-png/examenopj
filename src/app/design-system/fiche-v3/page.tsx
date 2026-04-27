import { notFound } from 'next/navigation';

import { FicheV3DesignPreview } from '@/components/fondamentaux/fiche/FicheV3DesignPreview';

export default function DesignSystemFicheV3Page() {
  if (process.env.ENABLE_DESIGN_SYSTEM !== 'true') {
    notFound();
  }

  return <FicheV3DesignPreview />;
}
