import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { CadresParcoursHub } from '@/components/parcours/cadres/CadresParcoursHub';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getSession } from '@/features/account/controllers/get-session';
import { fetchCadresProgressMap } from '@/features/parcours/cadres-progress';
import { openGraphForPage } from '@/utils/seo-metadata';

const title = 'Parcours — Cadres d’enquête';
const description =
  'Flagrance, garde à vue, enquête préliminaire : leçons courtes, mini-QCM et synthèse débloquée — progression sauvegardée sur ton compte.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/entrainement/parcours/cadres-enquetes' },
  ...openGraphForPage('/entrainement/parcours/cadres-enquetes', title, description),
};

export default async function CadresEnquetesParcoursPage() {
  const session = await getSession();
  if (!session?.user?.id) {
    redirect('/login?next=/entrainement/parcours/cadres-enquetes');
  }

  const progress = await fetchCadresProgressMap(session.user.id);

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.parcours} pad='default'>
      <SectionTitle
        badge='PARCOURS'
        title={title}
        titleGradient
        size='display'
        subtitle='Une progression en jeu : chaque étape débloque la suivante. Connecté : ta progression est synchronisée.'
        className='mb-10'
      />
      <CadresParcoursHub progress={progress} />
    </InteriorPageShell>
  );
}
