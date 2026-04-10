import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Target,
  TrendingUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fasciculesList } from '@/data/fascicules-list';
import { getSession } from '@/features/account/controllers/get-session';
import {
  getCategoryStats,
  getFlashcardsToReview,
  getHeroStats,
  getProgressionChart,
  getWeeklyCalendar,
} from '@/features/examenopj/controllers/get-dashboard-stats';

import { ProgressionChart } from './progression-chart';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function ProgressBar({ pct, className = '' }: { pct: number; className?: string }) {
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div
        className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all'
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

function DeltaBadge({ delta }: { delta: number }) {
  if (delta === 0) return null;
  const positive = delta > 0;
  return (
    <span
      className={`text-sm font-semibold ${positive ? 'text-emerald-400' : 'text-red-400'}`}
    >
      {positive ? '↑' : '↓'} {Math.abs(delta)} pts
    </span>
  );
}

function bucketLabel(bucket: string) {
  if (bucket === 'dontKnow') return { text: 'À revoir — prioritaire', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/25' };
  return { text: 'À revoir', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/25' };
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) return null;

  const uid = session.user.id;

  const [hero, toReview, calendar, catStats, chartPoints] = await Promise.all([
    getHeroStats(uid),
    getFlashcardsToReview(uid, 6),
    getWeeklyCalendar(uid),
    getCategoryStats(uid),
    getProgressionChart(uid),
  ]);

  // Suggestions logic
  const weakCat = catStats.find((c) => c.pct < 40 && c.total > 0) ?? null;
  const strongCat = catStats.find((c) => c.pct >= 80 && c.total > 0) ?? null;
  const nextFascicule = fasciculesList.find(
    (f) => !catStats.some((c) => c.slug === `f${String(f.numero).padStart(2, '0')}` && c.pct >= 80),
  ) ?? null;

  const todayCount = calendar[0]?.count ?? 0;
  const hasReviewItems = toReview.length > 0;

  return (
    <section className='space-y-6 rounded-xl bg-slate-950 p-4 sm:p-6'>
      {/* ── 1. HERO CARD ── */}
      <Card className='border border-cyan-500/20 bg-slate-900/80'>
        <CardHeader className='pb-3'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <CardTitle className='text-lg font-bold text-slate-100 sm:text-xl'>
              MON PROGRAMME OPJ — Session 2026
            </CardTitle>
            <Badge variant='outline' className='border-cyan-500/30 text-cyan-400'>
              {hero.progressionPct}% maîtrisé
            </Badge>
          </div>
        </CardHeader>
        <CardContent className='space-y-5'>
          {/* Progression bar */}
          <div>
            <div className='mb-2 flex items-center justify-between text-sm'>
              <span className='font-medium text-slate-300'>PROGRESSION TOTALE</span>
              <span className='tabular-nums text-slate-400'>
                {hero.totalMastered}/{hero.totalCards} flashcards
              </span>
            </div>
            <ProgressBar pct={hero.progressionPct} />
          </div>

          {/* Weekly stats grid */}
          <div className='rounded-lg border border-white/[0.07] bg-white/[0.03] p-4'>
            <div className='mb-3 flex items-center gap-2'>
              <BarChart3 className='h-4 w-4 text-cyan-400' aria-hidden />
              <span className='text-sm font-semibold text-slate-300'>STATISTIQUES SEMAINE</span>
            </div>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
              <div>
                <p className='text-2xl font-bold text-slate-100 tabular-nums'>
                  {hero.weeklyQuizCount}
                </p>
                <p className='text-xs text-slate-500'>Quiz complétés</p>
              </div>
              <div>
                <p className='text-2xl font-bold text-slate-100 tabular-nums'>
                  {hero.weeklyQuestionsAnswered}
                </p>
                <p className='text-xs text-slate-500'>Questions répondues</p>
              </div>
              <div>
                <div className='flex items-center gap-2'>
                  <p className='text-2xl font-bold text-slate-100 tabular-nums'>
                    {hero.weeklySuccessRate}%
                  </p>
                  <DeltaBadge delta={hero.weeklyDelta} />
                </div>
                <p className='text-xs text-slate-500'>Taux de réussite</p>
              </div>
              <div>
                <p className='text-2xl font-bold text-slate-100 tabular-nums'>
                  {hero.totalCards - hero.totalMastered}
                </p>
                <p className='text-xs text-slate-500'>Flashcards restantes</p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className='flex flex-wrap gap-2'>
            <Button asChild size='sm' className='bg-cyan-600 hover:bg-cyan-700'>
              <Link href='/quiz'>
                Lancer un quiz
                <ArrowRight className='ml-1.5 h-3.5 w-3.5' />
              </Link>
            </Button>
            <Button asChild size='sm' variant='secondary'>
              <Link href='/dashboard/revision'>Programme SM-2</Link>
            </Button>
            <Button asChild size='sm' variant='secondary'>
              <Link href='/flashcards'>Flashcards</Link>
            </Button>
            <Button asChild size='sm' variant='outline' className='border-slate-700'>
              <Link href='/dashboard/progression'>Voir ma progression</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── 2. À REVOIR AUJOURD'HUI ── */}
      {hasReviewItems && (
        <Card className='border border-amber-500/20 bg-slate-900/80'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <Target className='h-5 w-5 text-amber-400' aria-hidden />
              <CardTitle className='text-base font-bold text-slate-100'>
                ⏰ À REVOIR AUJOURD&apos;HUI
                <Badge className='ml-2 bg-amber-500/20 text-amber-300'>
                  {toReview.length} item{toReview.length > 1 ? 's' : ''}
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {toReview.map((item) => {
                const { text, color, bg } = bucketLabel(item.bucket);
                const fasciculeId = `f${String(item.fascicule).padStart(2, '0')}`;
                return (
                  <div
                    key={item.id}
                    className={`rounded-lg border p-3 text-sm ${bg}`}
                  >
                    <p className='font-semibold text-slate-100'>{item.nom}</p>
                    {item.fascicule > 0 && (
                      <p className='mt-0.5 text-xs text-slate-500'>
                        F{String(item.fascicule).padStart(2, '0')}
                        {item.categorie ? ` — ${item.categorie}` : ''}
                      </p>
                    )}
                    <p className={`mt-1 text-xs font-medium ${color}`}>{text}</p>
                    <div className='mt-2 flex gap-2'>
                      <Button asChild size='sm' variant='secondary' className='h-7 px-2 text-xs'>
                        <Link href={`/flashcards?fascicule=${fasciculeId}`}>
                          Réviser
                          <ChevronRight className='ml-0.5 h-3 w-3' />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── 3. CALENDRIER 7 JOURS ── */}
      <Card className='border border-white/[0.07] bg-slate-900/80'>
        <CardHeader className='pb-3'>
          <div className='flex items-center gap-2'>
            <Calendar className='h-5 w-5 text-blue-400' aria-hidden />
            <CardTitle className='text-base font-bold text-slate-100'>
              📅 RÉVISIONS — 7 PROCHAINS JOURS
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {toReview.length === 0 ? (
            <div className='flex items-center gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3'>
              <CheckCircle2 className='h-5 w-5 shrink-0 text-emerald-400' />
              <p className='text-sm text-emerald-200'>
                Aucune révision planifiée — continuez à faire des quiz pour alimenter votre agenda.
              </p>
            </div>
          ) : (
            <div className='space-y-2'>
              {calendar.filter((d) => d.count > 0).map((day) => (
                <div
                  key={day.dateIso}
                  className='flex items-start justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2'
                >
                  <div className='min-w-0'>
                    <p className='text-sm font-semibold text-slate-200'>{day.label}</p>
                    {day.items.length > 0 && (
                      <p className='mt-0.5 truncate text-xs text-slate-500'>
                        {day.items.join(' · ')}
                        {day.count > 3 ? ` · +${day.count - 3} autres` : ''}
                      </p>
                    )}
                  </div>
                  <Badge variant='outline' className='shrink-0 border-slate-700 text-slate-400'>
                    {day.count} item{day.count > 1 ? 's' : ''}
                  </Badge>
                </div>
              ))}
              {calendar.every((d) => d.count === 0) && (
                <p className='text-sm text-slate-500'>Aucune révision planifiée cette semaine.</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 4. STATS PAR CATÉGORIE ── */}
      {catStats.length > 0 && (
        <Card className='border border-white/[0.07] bg-slate-900/80'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5 text-purple-400' aria-hidden />
              <CardTitle className='text-base font-bold text-slate-100'>
                📈 MAÎTRISE PAR DOMAINE
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            {catStats.map((cat) => (
              <div key={cat.slug}>
                <div className='mb-1.5 flex flex-wrap items-center justify-between gap-1'>
                  <span className='text-sm font-medium text-slate-200'>{cat.label}</span>
                  <div className='flex items-center gap-3'>
                    {cat.quizSuccessRate != null && (
                      <span className='text-xs text-slate-500'>
                        Quiz : {cat.quizSuccessRate}%
                      </span>
                    )}
                    {cat.toReview > 0 && (
                      <span className='text-xs text-amber-400'>
                        {cat.toReview} à revoir
                        {cat.toReview > 2 && ' ⚠️'}
                      </span>
                    )}
                    <span className='min-w-[3.5rem] text-right text-sm font-semibold text-slate-300 tabular-nums'>
                      {cat.pct}% ({cat.mastered}/{cat.total})
                    </span>
                  </div>
                </div>
                <ProgressBar
                  pct={cat.pct}
                  className={cat.pct < 40 ? '[&>div]:from-red-500 [&>div]:to-rose-400' : cat.pct >= 80 ? '[&>div]:from-emerald-500 [&>div]:to-green-400' : ''}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ── 5. SUGGESTIONS INTELLIGENTES ── */}
      <Card className='border border-white/[0.07] bg-slate-900/80'>
        <CardHeader className='pb-3'>
          <div className='flex items-center gap-2'>
            <Lightbulb className='h-5 w-5 text-yellow-400' aria-hidden />
            <CardTitle className='text-base font-bold text-slate-100'>
              💡 PROCHAINES ÉTAPES RECOMMANDÉES
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className='space-y-3'>
          {/* Strong category → suggest next */}
          {strongCat && nextFascicule && (
            <div className='flex items-start justify-between gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3'>
              <div className='min-w-0'>
                <p className='text-sm font-semibold text-emerald-200'>
                  ✓ Vous maîtrisez bien : {strongCat.label} ({strongCat.pct}%)
                </p>
                <p className='mt-0.5 text-xs text-slate-400'>
                  → Prochaine étape : {nextFascicule.titre}
                </p>
              </div>
              <Button asChild size='sm' variant='secondary' className='shrink-0'>
                <Link href={`/cours/modules/${nextFascicule.id}`}>
                  Accéder
                  <ChevronRight className='ml-0.5 h-3.5 w-3.5' />
                </Link>
              </Button>
            </div>
          )}

          {/* Weak category → flag */}
          {weakCat && (
            <div className='flex items-start justify-between gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3'>
              <div className='min-w-0'>
                <div className='flex items-center gap-1.5'>
                  <AlertTriangle className='h-4 w-4 shrink-0 text-red-400' aria-hidden />
                  <p className='text-sm font-semibold text-red-200'>
                    Point faible : {weakCat.label} ({weakCat.pct}%)
                  </p>
                </div>
                <p className='mt-0.5 text-xs text-slate-400'>
                  → Consacrez 30 min pour rattraper ce domaine
                </p>
              </div>
              <Button asChild size='sm' variant='secondary' className='shrink-0'>
                <Link href='/flashcards'>
                  Réviser
                  <ChevronRight className='ml-0.5 h-3.5 w-3.5' />
                </Link>
              </Button>
            </div>
          )}

          {/* Today's review */}
          {todayCount > 0 ? (
            <div className='flex items-start justify-between gap-3 rounded-lg border border-amber-500/20 bg-amber-500/10 p-3'>
              <div>
                <p className='text-sm font-semibold text-amber-200'>
                  🎯 {todayCount} révision{todayCount > 1 ? 's' : ''} prioritaire
                  {todayCount > 1 ? 's' : ''} aujourd&apos;hui
                </p>
                <p className='mt-0.5 text-xs text-slate-400'>
                  → Commencez par les flashcards marquées &ldquo;Je ne sais pas&rdquo;
                </p>
              </div>
              <Button asChild size='sm' variant='secondary' className='shrink-0'>
                <Link href='/flashcards'>Démarrer</Link>
              </Button>
            </div>
          ) : (
            <div className='flex items-start justify-between gap-3 rounded-lg border border-blue-500/20 bg-blue-500/10 p-3'>
              <div>
                <p className='text-sm font-semibold text-blue-200'>
                  🎯 Session d&apos;étude recommandée
                </p>
                <p className='mt-0.5 text-xs text-slate-400'>
                  → Lancez un quiz thématique pour progresser
                </p>
              </div>
              <Button asChild size='sm' variant='secondary' className='shrink-0'>
                <Link href='/quiz'>
                  Quiz
                  <ArrowRight className='ml-0.5 h-3.5 w-3.5' />
                </Link>
              </Button>
            </div>
          )}

          {/* No data state */}
          {hero.weeklyQuizCount === 0 && toReview.length === 0 && (
            <div className='rounded-lg border border-white/[0.06] bg-white/[0.02] p-3'>
              <div className='flex items-center gap-2'>
                <BookOpen className='h-4 w-4 text-slate-400' />
                <p className='text-sm font-semibold text-slate-300'>Commencez votre parcours</p>
              </div>
              <p className='mt-1 text-xs text-slate-500'>
                Faites un premier quiz ou révisez des flashcards pour alimenter votre tableau de
                bord.
              </p>
              <div className='mt-2 flex flex-wrap gap-2'>
                <Button asChild size='sm' className='bg-cyan-600 hover:bg-cyan-700'>
                  <Link href='/quiz'>Premier quiz</Link>
                </Button>
                <Button asChild size='sm' variant='secondary'>
                  <Link href='/flashcards'>Flashcards</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 6. GRAPHIQUE PROGRESSION ── */}
      <Card className='border border-white/[0.07] bg-slate-900/80'>
        <CardHeader className='pb-3'>
          <CardTitle className='text-base font-bold text-slate-100'>
            📊 PROGRESSION — 30 DERNIERS JOURS
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartPoints.length === 0 ? (
            <div className='flex h-32 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02]'>
              <p className='text-sm text-slate-500'>
                Aucune donnée — complétez des quiz pour voir votre courbe.
              </p>
            </div>
          ) : (
            <ProgressionChart points={chartPoints} />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
