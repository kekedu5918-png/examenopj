import type { Metadata } from 'next';
import Link from 'next/link';

import { AccueilDashboard, type AccueilRecent } from '@/components/accueil/AccueilDashboard';
import { getSession } from '@/features/account/controllers/get-session';
import { getRecentQuizAttempts, getRevisionStats } from '@/features/examenopj/controllers/get-dashboard-data';
import { openGraphForPage } from '@/utils/seo-metadata';

const title = 'Accueil — ton espace';
const description = 'Session du jour, progression et raccourcis — préparation OPJ 2026.';

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: '/accueil' },
  ...openGraphForPage('/accueil', title, description),
};

export default async function AccueilPage() {
  const session = await getSession();

  let programmePct = 0;
  let infractionsVues = 0;
  let qcmReussis = 0;
  let sessionsCount = 0;
  let recent: AccueilRecent[] = [];

  if (session) {
    const [stats, attempts] = await Promise.all([
      getRevisionStats(session.user.id),
      getRecentQuizAttempts(session.user.id, 8),
    ]);

    const totalQ = stats.totalQuestions + stats.totalFlashcards;
    programmePct = totalQ > 0 ? Math.min(100, (stats.mastered / totalQ) * 100) : 0;
    infractionsVues = stats.mastered;
    qcmReussis = attempts.filter((a) => a.percent != null && Number(a.percent) >= 50).length;
    sessionsCount = attempts.length;

    recent = attempts.slice(0, 3).map((a, i) => {
      const isFasc = a.mode === 'fascicule' || a.mode === 'module';
      const modeLabel = isFasc
        ? `Fascicule ${a.fascicule_num != null ? `F${String(a.fascicule_num).padStart(2, '0')}` : ''}`
        : a.mode === 'global'
          ? 'Quiz global'
          : 'Quiz';

      let href = '/quiz';
      if (a.mode === 'global') {
        href = '/quiz?mode=global';
      } else if (isFasc && a.fascicule_num != null) {
        href = `/quiz?mode=fascicule&f=${a.fascicule_num}`;
      }

      return {
        href,
        label: `${modeLabel} — ${a.score ?? '?'}/${a.total ?? '?'} (${a.percent != null ? `${Number(a.percent).toFixed(0)} %` : '—'})`,
        hint: a.created_at ? new Date(a.created_at).toLocaleDateString('fr-FR') : `Session ${i + 1}`,
      };
    });
  }

  return (
    <>
      {!session ? (
        <div className='border-b border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-100'>
          <Link href='/login?next=%2Faccueil' className='font-semibold underline'>
            Connecte-toi
          </Link>{' '}
          pour synchroniser ta progression et tes reprises.
        </div>
      ) : null}
      <AccueilDashboard
        loggedIn={!!session}
        programmePct={programmePct}
        infractionsVues={infractionsVues}
        qcmReussis={qcmReussis}
        sessionsCount={sessionsCount}
        recent={recent}
      />
    </>
  );
}
