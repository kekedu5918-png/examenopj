import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { AccountDashboardSection } from '@/components/account/AccountDashboardSection';
import { LearningPathTrack } from '@/components/learning-path/LearningPathTrack';
import { getSession } from '@/features/account/controllers/get-session';
import { getUserFullProgress } from '@/lib/learningPath';

export const metadata: Metadata = {
  title: 'Parcours OPJ',
  description: 'Chemin de formation par modules : étapes, scores et révisions.',
};

export default async function DashboardParcoursPage() {
  const session = await getSession();
  if (!session) {
    redirect('/login');
  }

  const modules = await getUserFullProgress(session.user.id);

  return (
    <AccountDashboardSection spacing='relaxed'>
      <header>
        <h1 className='text-2xl font-bold text-ds-text-primary dark:text-slate-50'>Parcours OPJ</h1>
        <p className='mt-2 max-w-3xl text-sm text-ds-text-muted dark:text-slate-400'>
          Sept modules thématiques, cinq étapes types par module (découverte, entraînement, consolidation, cas, mini-examen).
          Chaque étape se déverrouille lorsque la précédente atteint au moins 80 %. Validez un score après votre session sur
          la ressource liée.
        </p>
      </header>
      <LearningPathTrack modules={modules} />
    </AccountDashboardSection>
  );
}
