import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { Epreuve3Layout } from '@/components/epreuves/epreuve-3/epreuve-3-layout';
import { getContentAccess } from '@/features/access/get-content-access';

export default async function Epreuve3Page() {
  const access = await getContentAccess();
  if (access.tier === 'freemium') {
    return (
      <ContentPremiumOverlay
        title='Méthodologie Épreuve 3 — réservée au Premium'
        description='Le détail de la préparation à l’oral (CR Parquet, structure, exemples) est inclus dans l’offre Premium.'
      >
        <div className='min-h-[80vh] bg-navy-950' />
      </ContentPremiumOverlay>
    );
  }
  return <Epreuve3Layout />;
}
