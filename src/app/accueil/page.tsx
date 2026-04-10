import type { Metadata } from 'next';
import Link from 'next/link';

import { AccueilDashboard, type AccueilRecent, type SessionDuJour } from '@/components/accueil/AccueilDashboard';
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

/** Sessions types par fascicule — utilisées pour personnaliser la session du jour. */
const FASCICULE_SESSIONS: Record<number, SessionDuJour> = {
  1: {
    title: 'Procédure pénale — cadre juridique et actes fondamentaux',
    points: [
      'Sources du CPP et principes directeurs',
      'Flagrance vs préliminaire : critères de qualification',
      'Actes autorisés par cadre (perquisition, GAV, audition)',
    ],
    href: '/cours/modules?f=01',
    estimatedMinutes: 20,
  },
  2: {
    title: 'Infractions contre les biens — qualification et éléments constitutifs',
    points: [
      'Vol simple et qualifié : éléments matériel / moral',
      'Extorsion, escroquerie, abus de confiance : distinctions',
      "Circonstances aggravantes à maîtriser pour l'oral",
    ],
    href: '/infractions',
    estimatedMinutes: 25,
  },
  3: {
    title: 'Infractions contre les personnes — violences et atteintes',
    points: [
      'Violences volontaires : degrés, ITT, circonstances aggravantes',
      'Harcèlement, menaces, stalking : éléments légaux',
      'Violences conjugales : cadre spécifique et obligations',
    ],
    href: '/infractions',
    estimatedMinutes: 20,
  },
  4: {
    title: 'Infractions en bande organisée et crime organisé',
    points: [
      'Définition légale de la bande organisée (art. 132-71 CP)',
      'Conséquences procédurales : GAV 96h, perquisition nocturne',
      'Distinction association de malfaiteurs / BO',
    ],
    href: '/cours/modules?f=04',
    estimatedMinutes: 20,
  },
  5: {
    title: 'Stupéfiants — cadre procédural et infractions',
    points: [
      'Usage, trafic, offre et cession : qualification',
      'Spécificités de la garde à vue en matière de stupéfiants',
      'Saisies et mesures conservatoires',
    ],
    href: '/cours/modules?f=05',
    estimatedMinutes: 20,
  },
  6: {
    title: 'Sécurité routière — infractions et procédure',
    points: [
      "Conduite sous l'empire de l'alcool ou de stupéfiants",
      "Fuite, délit de fuite, refus d'obtempérer",
      'Immobilisation, mise en fourrière, rétention du permis',
    ],
    href: '/cours/modules?f=06',
    estimatedMinutes: 15,
  },
  7: {
    title: 'Droit général et institutions judiciaires',
    points: [
      'Acteurs de la chaîne pénale : parquet, JI, JLD',
      'Voies de recours et délais de procédure',
      'Principes constitutionnels et CEDH applicables',
    ],
    href: '/cours/modules?f=07',
    estimatedMinutes: 20,
  },
};

const DEFAULT_SESSION: SessionDuJour = {
  title: 'Maîtriser la GAV et l\'enquête BRAVO — actes 16 à 19',
  points: [
    'Cadre juridique et motifs de GAV (art. 62-2 CPP)',
    "Enchaînement des actes 16 à 19 sur l'enquête BRAVO",
    'Points de vigilance Parquet / mineur',
  ],
  href: '/fondamentaux/garde-a-vue',
  estimatedMinutes: 25,
};

function pickSuggestedSession(
  attempts: Awaited<ReturnType<typeof getRecentQuizAttempts>>,
  hasActivity: boolean,
): SessionDuJour {
  if (!hasActivity || attempts.length === 0) return DEFAULT_SESSION;

  // Calculer le score moyen par fascicule sur les 8 dernières tentatives
  const scoreByFascicule = new Map<number, { total: number; count: number }>();
  for (const a of attempts) {
    if (a.fascicule_num != null && a.percent != null) {
      const f = a.fascicule_num;
      const prev = scoreByFascicule.get(f) ?? { total: 0, count: 0 };
      scoreByFascicule.set(f, { total: prev.total + Number(a.percent), count: prev.count + 1 });
    }
  }

  if (scoreByFascicule.size === 0) return DEFAULT_SESSION;

  // Fascicule avec le score moyen le plus bas
  let worstFascicule = -1;
  let worstScore = 101;
  for (const [f, { total, count }] of scoreByFascicule) {
    const avg = total / count;
    if (avg < worstScore) {
      worstScore = avg;
      worstFascicule = f;
    }
  }

  const session = FASCICULE_SESSIONS[worstFascicule];
  if (!session) return DEFAULT_SESSION;

  return {
    ...session,
    reason: `F${String(worstFascicule).padStart(2, '0')} — score récent ${Math.round(worstScore)} %`,
  };
}

export default async function AccueilPage() {
  const session = await getSession();

  let programmePct = 0;
  let infractionsVues = 0;
  let qcmReussis = 0;
  let sessionsCount = 0;
  let recent: AccueilRecent[] = [];
  let suggestedSession: SessionDuJour = DEFAULT_SESSION;

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

    suggestedSession = pickSuggestedSession(attempts, sessionsCount > 0);

    recent = attempts.slice(0, 3).map((a, i) => {
      const mode =
        a.mode === 'fascicule' || a.mode === 'module'
          ? `Fascicule ${a.fascicule_num != null ? `F${String(a.fascicule_num).padStart(2, '0')}` : ''}`
          : a.mode === 'global'
            ? 'Quiz global'
            : 'Quiz';
      return {
        href: '/quiz',
        label: `${mode} — ${a.score ?? '?'}/${a.total ?? '?'} (${a.percent != null ? `${Number(a.percent).toFixed(0)} %` : '—'})`,
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
        suggestedSession={suggestedSession}
      />
    </>
  );
}
