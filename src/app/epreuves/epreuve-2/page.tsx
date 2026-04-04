import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { Epreuve2Layout } from '@/components/epreuves/epreuve-2/epreuve-2-layout';
import { getContentAccess } from '@/features/access/get-content-access';

export default async function Epreuve2Page() {
  const access = await getContentAccess();
  if (access.tier === 'freemium') {
    return (
      <ContentPremiumOverlay
        title='Méthodologie Épreuve 2 — réservée au Premium'
        description='Les phrases types, structures de PV et rapports de synthèse détaillés sont débloqués avec le Premium. Les modèles de PV (aperçu) restent listés sur la page dédiée après souscription.'
      >
        <div className='min-h-[80vh] bg-navy-950' />
      </ContentPremiumOverlay>
    );
  }
  return <Epreuve2Layout />;
}
