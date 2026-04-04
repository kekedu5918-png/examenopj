import Link from 'next/link';

import { ContentPremiumOverlay } from '@/components/access/ContentPremiumOverlay';
import { Epreuve2Layout } from '@/components/epreuves/epreuve-2/epreuve-2-layout';
import { getContentAccess } from '@/features/access/get-content-access';

export default async function Epreuve2Page() {
  const access = await getContentAccess();
  if (access.tier === 'freemium') {
    return (
      <div className='min-h-screen bg-navy-950'>
        <div className='mx-auto max-w-3xl px-4 py-4 text-center'>
          <Link
            href='/cours/enquetes'
            className='text-sm font-medium text-violet-300 underline-offset-4 hover:text-violet-200 hover:underline'
          >
            Rubrique Enquêtes — planches Alpha (exemple gratuit) et Bravo
          </Link>
        </div>
        <ContentPremiumOverlay
          title='Méthodologie Épreuve 2 — réservée au Premium'
          description='Les phrases types, structures de PV et rapports de synthèse détaillés sont débloqués avec le Premium. Les modèles de PV (aperçu) restent listés sur la page dédiée après souscription.'
        >
          <div className='min-h-[80vh] bg-navy-950' />
        </ContentPremiumOverlay>
      </div>
    );
  }
  return <Epreuve2Layout />;
}
