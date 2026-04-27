'use client';

import { useMemo } from 'react';

import type { FicheAccordionItem } from '@/components/fondamentaux/fiche/FicheAccordion';
import { FichePremium } from '@/components/fondamentaux/fiche/FichePremium';
import { FICHE_V3_DEMO_DATA } from '@/lib/fondamentaux/fiche-v3-demo-fixture';

export function FicheV3DesignPreview() {
  const planAccordion: FicheAccordionItem[] = useMemo(
    () =>
      FICHE_V3_DEMO_DATA.plan.map((p) => ({
        id: `plan-${p.num}`,
        title: `Section ${p.num} — ${p.titre} (${p.duree})`,
        content:
          'Contenu factice : en production, ce bloc est alimenté par le corps markdown sous chaque section du plan.',
      })),
    [],
  );

  return (
    <div className='min-h-screen bg-ij-bg text-ij-text' data-fiche-v3-preview>
      <FichePremium
        data={FICHE_V3_DEMO_DATA}
        slug='v3-preview'
        tabsBasePath='/design-system/fiche-v3'
        callout30s='En flagrance : vérifiez les quatre hypothèses et la peine d’emprisonnement avant d’engager les actes.'
        breadcrumbItems={[
          { href: '/fondamentaux', label: 'Fondamentaux' },
          { href: '/design-system/fiche-v3', label: 'Preview V3' },
        ]}
        footerCtas={[
          { href: '/fondamentaux', label: 'Retour hub' },
          { href: '/entrainement/articulation', label: 'Articulation' },
        ]}
        readingProgress={42}
        heroDureeIndicative='≈ 45 min (démo)'
        accordionItems={planAccordion}
      />
    </div>
  );
}
