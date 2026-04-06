import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { Epreuve1Layout } from '@/components/epreuves/epreuve-1/epreuve-1-layout';
import { getContentAccess } from '@/features/access/get-content-access';

export default async function Epreuve1Page() {
  const access = await getContentAccess();
  if (access.tier === 'freemium') {
    return (
      <ContentPremiumOverlay
        title='Méthodologie Épreuve 1 — réservée au Premium'
        description='La méthode détaillée DPG/DPS (plans types, exemples) est incluse dans l’offre Premium. Passez par la page Tarifs pour débloquer l’accès.'
      >
        <div className='min-h-[80vh] bg-navy-950' />
      </ContentPremiumOverlay>
    );
  }
  return <Epreuve1Layout />;
}
