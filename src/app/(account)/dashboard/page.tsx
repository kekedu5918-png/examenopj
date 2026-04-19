import Link from 'next/link';

import { AccountDashboardSection } from '@/components/account/AccountDashboardSection';
import { DashboardNextAction } from '@/components/dashboard/DashboardNextAction';
import { StreakCard } from '@/components/gamification/StreakCard';
import { LoginResumeCard } from '@/components/onboarding/LoginResumeCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fasciculesList } from '@/data/fascicules-list';
import { getSession } from '@/features/account/controllers/get-session';
import { getModules, getRecentQuizAttempts, getRevisionStats } from '@/features/examenopj/controllers/get-dashboard-data';
import { getGamificationData } from '@/features/gamification/controllers/get-gamification-data';
import { getOnboardingPlan } from '@/features/onboarding/actions/onboarding-actions';
import { getLoginResumeData } from '@/features/onboarding/controllers/get-login-resume';
import { getCoursPathForFascicule, getQuizPathForFascicule } from '@/lib/content/fascicule-cours-map';
import { getTodayReviews, getUserFullProgress, pickNextLessonFromProgress } from '@/lib/learningPath';

function formatQuizMode(row: { mode: string; fascicule_num: number | null; domain_key: string | null }): string {
  if ((row.mode === 'fascicule' || row.mode === 'module') && row.fascicule_num != null) {
    return `Thème ${String(row.fascicule_num).padStart(2, '0')}`;
  }
  if (row.mode === 'domain' && row.domain_key) return row.domain_key;
  if (row.mode === 'global') return 'Global';
  return row.mode;
}

function fasciculeModuleFromAttempt(row: { mode: string; fascicule_num: number | null }) {
  if ((row.mode !== 'fascicule' && row.mode !== 'module') || row.fascicule_num == null) return null;
  return fasciculesList.find((f) => f.numero === row.fascicule_num) ?? null;
}

export default async function DashboardPage() {
  const session = await getSession();
  const [modules, revisionStats, recentAttempts, gamification, loginResume, onboardingPlan, todayReviews, pathProgress] =
    session
      ? await Promise.all([
          getModules(),
          getRevisionStats(session.user.id),
          getRecentQuizAttempts(session.user.id, 1),
          getGamificationData(session.user.id),
          getLoginResumeData(session.user.id),
          getOnboardingPlan(),
          getTodayReviews(session.user.id),
          getUserFullProgress(session.user.id).catch(() => [] as Awaited<ReturnType<typeof getUserFullProgress>>),
        ])
      : await Promise.all([
          getModules(),
          Promise.resolve(null),
          Promise.resolve([]),
          Promise.resolve(null),
          Promise.resolve(null),
          Promise.resolve(null),
          Promise.resolve([]),
          Promise.resolve([]),
        ]);

  const todayReviewCount = todayReviews.length;
  const userName = session
    ? (session.user.user_metadata as { full_name?: string } | null)?.full_name?.trim() ||
      session.user.email?.split('@')[0] ||
      null
    : null;
  const streakDays = gamification?.streak?.currentStreak ?? 0;

  const lastAttempt = recentAttempts[0] ?? null;
  const lastModuleMeta = lastAttempt ? fasciculeModuleFromAttempt(lastAttempt) : null;

  /**
   * Cartes « Thèmes du programme » : on s'appuie sur la liste éditoriale des 18 fascicules OPJ
   * (`fasciculesList`) plutôt que sur la table Supabase `modules` qui peut être incomplète selon
   * l'environnement. On privilégie les thèmes pour lesquels une fiche cours markdown existe afin
   * que les boutons « Ouvrir la fiche cours » mènent réellement vers du contenu.
   */
  const featuredModules = fasciculesList
    .map((f) => ({
      numero: f.numero,
      titre: f.titre,
      description: f.accroche,
      domaineLabel: f.domaineLabel,
      coursPath: getCoursPathForFascicule(f.numero),
      quizPath: getQuizPathForFascicule(f.numero),
    }))
    .filter((m) => m.coursPath !== null)
    .slice(0, 6);

  const pathPick = pickNextLessonFromProgress(pathProgress);
  const nextLesson = pathPick
    ? { title: `${pathPick.moduleTitle} — ${pathPick.lessonTitle}`, href: pathPick.href, kind: pathPick.kind }
    : null;

  return (
    <AccountDashboardSection spacing='relaxed'>
      {session ? (
        <DashboardNextAction
          loginResume={loginResume}
          streak={streakDays}
          todayReviews={todayReviewCount}
          userName={userName}
          nextLesson={nextLesson}
        />
      ) : null}

      <header>
        <div className='flex flex-wrap items-center gap-2'>
          <h1 className='text-3xl font-bold text-ds-text-primary dark:text-slate-50'>Bienvenue sur ExamenOPJ</h1>
          <Badge variant='examen' className='text-xs'>
            {fasciculesList.length} thèmes au programme
          </Badge>
        </div>
        <p className='mt-2 max-w-3xl text-ds-text-muted dark:text-slate-300'>
          Chaque fiche cours indique le poids du thème aux Épreuves 1–3 et renvoie vers quiz, articulation et sujets blancs
          associés. Utilisez les raccourcis ci-dessous pour enchaîner théorie et entraînement.
        </p>
      </header>

      {/* Streak widget */}
      {gamification && gamification.streak.currentStreak > 0 && (
        <div className='md:w-80'>
          <StreakCard streak={gamification.streak} />
        </div>
      )}

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {[
          { titre: 'Parcours OPJ', href: '/dashboard/parcours' },
          { titre: 'Fondamentaux', href: '/fondamentaux' },
          { titre: 'Les enquêtes', href: '/enquetes' },
          { titre: 'Entraînement', href: '/entrainement' },
          { titre: 'Les épreuves', href: '/epreuves' },
          { titre: 'Réviser les infractions', href: '/dashboard/infractions' },
          { titre: 'Ma progression', href: '/dashboard/progression' },
          { titre: 'Recherche', href: '/dashboard/recherche' },
        ].map((item) => (
          <Button key={item.href} asChild variant='secondary' className='justify-start'>
            <Link href={item.href}>{item.titre}</Link>
          </Button>
        ))}
      </div>

      {/* Reprise de session (Login Resume) */}
      {loginResume && <LoginResumeCard resume={loginResume} />}

      {/* Session classique si pas de resume actif */}
      {loginResume && !loginResume.showResume && (
        <Card className='border border-cyan-500/30 bg-ds-bg-elevated dark:bg-slate-900/70'>
          <CardHeader>
            <CardTitle className='text-ds-text-primary dark:text-slate-100'>Reprendre la session</CardTitle>
            <CardDescription className='text-ds-text-muted dark:text-slate-300'>
              Recommandation basée sur votre activité enregistrée sur le compte.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3 text-sm text-ds-text-primary dark:text-slate-200'>
            {lastAttempt ? (
              <>
                <p>
                  Dernier quiz : <span className='font-semibold text-cyan-300'>{formatQuizMode(lastAttempt)}</span> -
                  {` ${lastAttempt.score}/${lastAttempt.total} `}
                  ({Number(lastAttempt.percent).toFixed(0)} %)
                </p>
                <div className='flex flex-wrap gap-2'>
                  {lastModuleMeta ? (
                    <>
                      <Button asChild className='bg-cyan-600 hover:bg-cyan-700'>
                        <Link href='/fondamentaux'>
                          Revoir les fondamentaux ({formatQuizMode(lastAttempt)})
                        </Link>
                      </Button>
                      <Button asChild variant='secondary'>
                        <Link href={`/quiz?mode=module&f=${lastModuleMeta.id}`}>Quiz sur ce thème</Link>
                      </Button>
                    </>
                  ) : (
                    <Button asChild className='bg-cyan-600 hover:bg-cyan-700'>
                      <Link href='/quiz'>Continuer les quiz</Link>
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <>
                <p>Aucune session enregistrée pour le moment. Commencez un premier entraînement ciblé.</p>
                <Button asChild className='bg-cyan-600 hover:bg-cyan-700'>
                  <Link href='/dashboard/infractions'>Démarrer mon premier quiz</Link>
                </Button>
              </>
            )}

            {revisionStats ? (
              <div className='flex flex-wrap gap-2 pt-1'>
                <Badge variant='outline'>Révisions dues: {revisionStats.revisionDue}</Badge>
                <Badge variant='outline'>Maîtrisées: {revisionStats.mastered}</Badge>
                <Badge variant='outline'>Score moyen: {revisionStats.averageScore.toFixed(2)} / 5</Badge>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Plan personnalisé (si onboarding complété) OU plan statique */}
      {onboardingPlan ? (
        <Card className='border border-blue-500/30 bg-ds-bg-elevated dark:bg-slate-900/70'>
          <CardHeader>
            <CardTitle className='text-ds-text-primary dark:text-slate-100'>Votre plan personnalisé</CardTitle>
            <CardDescription className='text-ds-text-muted dark:text-slate-300'>
              Basé sur votre diagnostic — Niveau : {onboardingPlan.level} ({onboardingPlan.score}/5) — {onboardingPlan.plan.total_weeks} semaines
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            {onboardingPlan.plan.phases.map((phase) => (
              <div
                key={phase.phase_number}
                className='rounded-lg border border-ds-border bg-ds-bg-secondary/80 p-3 dark:border-slate-700 dark:bg-slate-800/40'
              >
                <div className='mb-1.5 flex items-center gap-2'>
                  <span className='flex h-5 w-5 items-center justify-center rounded-full bg-cyan-800 text-[10px] font-bold text-cyan-200'>
                    {phase.phase_number}
                  </span>
                  <p className='text-sm font-semibold text-ds-text-primary dark:text-slate-100'>{phase.name}</p>
                  <span className='ml-auto text-xs text-ds-text-muted dark:text-slate-500'>
                    {phase.duration_weeks} sem. — {phase.daily_time_minutes} min/j
                  </span>
                </div>
                <ul className='space-y-0.5'>
                  {phase.topics.map((t) => (
                    <li key={t.id} className='flex items-start gap-1.5 text-xs text-ds-text-muted dark:text-slate-300'>
                      <span className='text-cyan-500'>•</span>
                      <span>
                        {t.name}
                        {t.items_per_week ? ` (${t.items_per_week}/semaine)` : ''}
                        {t.frequency ? ` — ${t.frequency}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card className='border border-blue-500/30 bg-ds-bg-elevated dark:bg-slate-900/70'>
          <CardHeader>
            <CardTitle className='text-ds-text-primary dark:text-slate-100'>Plan de départ recommandé</CardTitle>
            <CardDescription className='text-ds-text-muted dark:text-slate-300'>
              Une trajectoire simple pour les premières sessions de révision.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2 text-sm text-ds-text-primary dark:text-slate-200'>
            <p>1. Parcourez les fondamentaux : cadres, GAV, perquisitions, fiches thématiques.</p>
            <p>2. Enchaînez avec quiz / flashcards sur le même thème depuis l’entraînement.</p>
            <p>3. À mi-parcours : une enquête type ; en fin : mise en situation sur les trois épreuves.</p>
          </CardContent>
        </Card>
      )}

      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h2 className='text-xl font-semibold text-ds-text-primary dark:text-slate-100'>Thèmes du programme</h2>
        <Button
          asChild
          variant='outline'
          className='border-ds-border bg-ds-bg-secondary text-ds-text-primary hover:bg-ds-bg-elevated dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
        >
          <Link href='/fondamentaux'>Voir les fiches</Link>
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {featuredModules.map((module) => (
          <Card
            key={module.numero}
            className='flex flex-col border-l-4 border-blue-500 bg-ds-bg-elevated shadow-md hover:shadow-xl dark:bg-slate-900'
          >
            <CardHeader>
              <div className='flex items-center justify-between gap-2'>
                <Badge variant='outline' className='text-[10px] uppercase tracking-wider'>
                  Thème {String(module.numero).padStart(2, '0')}
                </Badge>
                <span className='text-[10px] font-semibold uppercase tracking-wider text-ds-text-muted'>
                  {module.domaineLabel}
                </span>
              </div>
              <CardTitle className='mt-2 text-ds-text-primary dark:text-slate-100'>
                {module.titre}
              </CardTitle>
              <CardDescription className='text-ds-text-muted dark:text-slate-300'>
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardContent className='mt-auto flex flex-wrap gap-2'>
              <Button asChild className='bg-blue-600 hover:bg-blue-700'>
                <Link href={module.coursPath ?? '/fondamentaux'}>Ouvrir la fiche cours</Link>
              </Button>
              <Button
                asChild
                variant='outline'
                className='border-ds-border bg-ds-bg-secondary text-ds-text-primary hover:bg-ds-bg-elevated dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
              >
                <Link href={module.quizPath}>Quiz du thème</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </AccountDashboardSection>
  );
}
