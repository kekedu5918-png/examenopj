import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Layers,
  Target,
  TrendingUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { getSession } from '@/features/account/controllers/get-session';
import { getSessionReport } from '@/features/examenopj/controllers/get-dashboard-stats';

export const metadata: Metadata = { title: 'Rapport de session — ExamenOPJ' };

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function ScoreCircle({ pct }: { pct: number }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444';
  const label = pct >= 80 ? 'Excellent' : pct >= 60 ? 'Bien' : 'À consolider';

  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='relative h-24 w-24'>
        <svg className='h-full w-full -rotate-90' viewBox='0 0 100 100' aria-hidden>
          <circle cx='50' cy='50' r={r} fill='none' stroke='rgba(255,255,255,0.08)' strokeWidth='8' />
          <circle
            cx='50'
            cy='50'
            r={r}
            fill='none'
            stroke={color}
            strokeWidth='8'
            strokeLinecap='round'
            strokeDasharray={circ}
            strokeDashoffset={circ * (1 - pct / 100)}
          />
        </svg>
        <div className='absolute inset-0 flex flex-col items-center justify-center'>
          <span className='text-xl font-bold text-white'>{pct}%</span>
        </div>
      </div>
      <span className='text-xs font-medium' style={{ color }}>{label}</span>
    </div>
  );
}


function formatMode(mode: string, fasciculeNum: number | null, domainKey: string | null): string {
  if ((mode === 'fascicule' || mode === 'module') && fasciculeNum != null) {
    return `Thème F${String(fasciculeNum).padStart(2, '0')}`;
  }
  if (mode === 'domain' && domainKey) return `Domaine : ${domainKey}`;
  if (mode === 'global') return 'Quiz global';
  return mode;
}

function Suggestion({ pct, fasciculeMeta }: { pct: number; fasciculeMeta: { id: string; titre: string } | null }) {
  if (pct >= 80) {
    return (
      <div className='rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4'>
        <p className='font-semibold text-emerald-200'>🏆 Excellent résultat !</p>
        <p className='mt-1 text-sm text-slate-400'>
          Vous maîtrisez bien ce thème. Continuez sur la lancée en attaquant un nouveau fascicule.
        </p>
        {fasciculeMeta && (
          <Button asChild size='sm' variant='secondary' className='mt-3'>
            <Link href={`/cours/modules/${fasciculeMeta.id}`}>
              Voir la fiche cours
              <ChevronRight className='ml-1 h-3.5 w-3.5' />
            </Link>
          </Button>
        )}
      </div>
    );
  }
  if (pct >= 60) {
    return (
      <div className='rounded-lg border border-amber-500/20 bg-amber-500/10 p-4'>
        <p className='font-semibold text-amber-200'>📚 Bonne progression</p>
        <p className='mt-1 text-sm text-slate-400'>
          Relisez les points ratés, puis refaites le quiz dans 24h pour consolider.
        </p>
        {fasciculeMeta && (
          <Button asChild size='sm' variant='secondary' className='mt-3'>
            <Link href={`/cours/modules/${fasciculeMeta.id}`}>
              Relire la fiche
              <ChevronRight className='ml-1 h-3.5 w-3.5' />
            </Link>
          </Button>
        )}
      </div>
    );
  }
  return (
    <div className='rounded-lg border border-red-500/20 bg-red-500/10 p-4'>
      <p className='font-semibold text-red-200'>⚠️ Bases à consolider</p>
      <p className='mt-1 text-sm text-slate-400'>
        Relisez la fiche cours en entier, révisez les flashcards associées, puis repassez le quiz.
      </p>
      <div className='mt-3 flex flex-wrap gap-2'>
        {fasciculeMeta && (
          <Button asChild size='sm' variant='secondary'>
            <Link href={`/cours/modules/${fasciculeMeta.id}`}>Fiche cours</Link>
          </Button>
        )}
        <Button asChild size='sm' variant='secondary'>
          <Link href='/flashcards'>Flashcards</Link>
        </Button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default async function SessionReportPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) notFound();

  const report = await getSessionReport(session.user.id, params.id);
  if (!report) notFound();

  const { attempt, fasciculeMeta, flashcardStats, recentHistory } = report;
  const pct = Math.round(attempt.percent);
  const wrong = attempt.total - attempt.score;
  const modeLabel = formatMode(attempt.mode, attempt.fascicule_num, attempt.domain_key);

  // Trend calculation vs previous same-mode attempts
  const prevAttempts = recentHistory.slice(0, 3);
  const avgPrev =
    prevAttempts.length > 0
      ? Math.round(prevAttempts.reduce((s, h) => s + Number(h.percent), 0) / prevAttempts.length)
      : null;
  const delta = avgPrev != null ? pct - avgPrev : null;

  // Flashcard mastery bar color
  const flashPct = flashcardStats.total > 0
    ? Math.round((flashcardStats.know / flashcardStats.total) * 100)
    : 0;

  return (
    <section className='space-y-6 rounded-xl bg-slate-950 p-4 sm:p-6'>
      {/* Back nav */}
      <div>
        <Button asChild variant='ghost' size='sm' className='text-slate-400 hover:text-slate-200'>
          <Link href='/dashboard'>
            <ArrowLeft className='mr-1.5 h-4 w-4' />
            Retour au tableau de bord
          </Link>
        </Button>
      </div>

      {/* ── HEADER ── */}
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-bold text-slate-50'>
            RAPPORT SESSION — {modeLabel}
          </h1>
          {attempt.created_at && (
            <p className='mt-1 flex items-center gap-1.5 text-sm text-slate-500'>
              <Clock className='h-3.5 w-3.5' aria-hidden />
              {new Date(attempt.created_at).toLocaleString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          )}
        </div>
        {fasciculeMeta && (
          <Badge className='bg-blue-500/20 text-blue-300'>
            {fasciculeMeta.domaine} · F{String(attempt.fascicule_num).padStart(2, '0')}
          </Badge>
        )}
      </div>

      {/* ── RÉSULTATS ── */}
      <Card className='border border-white/[0.08] bg-slate-900/80'>
        <CardHeader className='pb-3'>
          <div className='flex items-center gap-2'>
            <Target className='h-5 w-5 text-cyan-400' aria-hidden />
            <CardTitle className='text-base font-bold text-slate-100'>📊 RÉSULTATS</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-center'>
            <ScoreCircle pct={pct} />

            <div className='flex-1 space-y-3'>
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
                <div className='rounded-lg bg-white/[0.03] p-3 text-center'>
                  <p className='text-2xl font-bold text-emerald-400 tabular-nums'>
                    {attempt.score}
                  </p>
                  <p className='text-xs text-slate-500'>Bonnes réponses</p>
                </div>
                <div className='rounded-lg bg-white/[0.03] p-3 text-center'>
                  <p className='text-2xl font-bold text-red-400 tabular-nums'>{wrong}</p>
                  <p className='text-xs text-slate-500'>Erreurs</p>
                </div>
                <div className='rounded-lg bg-white/[0.03] p-3 text-center col-span-2 sm:col-span-1'>
                  <p className='text-2xl font-bold text-slate-100 tabular-nums'>{attempt.total}</p>
                  <p className='text-xs text-slate-500'>Total questions</p>
                </div>
              </div>

              {/* Trend vs history */}
              {delta != null && (
                <div className='flex items-center gap-2 text-sm'>
                  <TrendingUp className='h-4 w-4 text-slate-400' aria-hidden />
                  <span className='text-slate-400'>
                    vs sessions précédentes ({avgPrev}% moy.) :
                  </span>
                  <span
                    className={`font-semibold ${delta > 0 ? 'text-emerald-400' : delta < 0 ? 'text-red-400' : 'text-slate-400'}`}
                  >
                    {delta > 0 ? '+' : ''}{delta} pts
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── FLASHCARDS DU THÈME ── */}
      {flashcardStats.total > 0 && (
        <Card className='border border-white/[0.07] bg-slate-900/80'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <Layers className='h-5 w-5 text-purple-400' aria-hidden />
              <CardTitle className='text-base font-bold text-slate-100'>
                📚 FLASHCARDS — {modeLabel}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div>
              <div className='mb-1.5 flex justify-between text-sm'>
                <span className='text-slate-400'>
                  Maîtrisées : {flashcardStats.know}/{flashcardStats.total}
                </span>
                <span className='font-semibold text-slate-300'>{flashPct}%</span>
              </div>
              <ProgressBar
                pct={flashPct}
                color={flashPct >= 80 ? 'emerald' : flashPct >= 50 ? 'amber' : 'red'}
              />
            </div>

            <div className='grid grid-cols-3 gap-2 text-center text-sm'>
              <div className='rounded-lg border border-emerald-500/20 bg-emerald-500/10 py-2'>
                <p className='text-lg font-bold text-emerald-400'>{flashcardStats.know}</p>
                <p className='text-xs text-emerald-300/70'>Je sais</p>
              </div>
              <div className='rounded-lg border border-amber-500/20 bg-amber-500/10 py-2'>
                <p className='text-lg font-bold text-amber-400'>{flashcardStats.review}</p>
                <p className='text-xs text-amber-300/70'>À revoir</p>
              </div>
              <div className='rounded-lg border border-red-500/20 bg-red-500/10 py-2'>
                <p className='text-lg font-bold text-red-400'>{flashcardStats.dontKnow}</p>
                <p className='text-xs text-red-300/70'>Je ne sais pas</p>
              </div>
            </div>

            {flashcardStats.total > flashcardStats.know && (
              <Button asChild size='sm' variant='secondary' className='w-full sm:w-auto'>
                <Link href={fasciculeMeta ? `/flashcards?fascicule=${fasciculeMeta.id}` : '/flashcards'}>
                  Réviser les flashcards de ce thème
                  <ArrowRight className='ml-1.5 h-3.5 w-3.5' />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── HISTORIQUE ── */}
      {recentHistory.length > 0 && (
        <Card className='border border-white/[0.07] bg-slate-900/80'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <BarChart3 className='h-5 w-5 text-blue-400' aria-hidden />
              <CardTitle className='text-base font-bold text-slate-100'>
                📈 HISTORIQUE — SESSIONS PRÉCÉDENTES
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            {recentHistory.map((h, i) => {
              const hPct = Math.round(Number(h.percent));
              const hColor = hPct >= 80 ? 'text-emerald-400' : hPct >= 60 ? 'text-amber-400' : 'text-red-400';
              return (
                <div
                  key={i}
                  className='flex items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2'
                >
                  <div className='w-16 shrink-0'>
                    <ProgressBar
                      pct={hPct}
                      color={hPct >= 80 ? 'emerald' : hPct >= 60 ? 'amber' : 'red'}
                    />
                  </div>
                  <span className={`w-12 shrink-0 text-sm font-semibold tabular-nums ${hColor}`}>
                    {hPct}%
                  </span>
                  <span className='text-sm text-slate-400 tabular-nums'>
                    {h.score}/{h.total}
                  </span>
                  {h.created_at && (
                    <span className='ml-auto text-xs text-slate-600'>
                      {new Date(h.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* ── SUGGESTIONS ── */}
      <Card className='border border-white/[0.07] bg-slate-900/80'>
        <CardHeader className='pb-3'>
          <div className='flex items-center gap-2'>
            <BookOpen className='h-5 w-5 text-yellow-400' aria-hidden />
            <CardTitle className='text-base font-bold text-slate-100'>
              🎯 SUGGESTIONS POUR PROGRESSER
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Suggestion pct={pct} fasciculeMeta={fasciculeMeta} />

          {/* Always show next quiz CTA */}
          <div className='flex items-center gap-3 rounded-lg border border-cyan-500/15 bg-cyan-500/[0.07] p-3'>
            <CheckCircle2 className='h-4 w-4 shrink-0 text-cyan-400' aria-hidden />
            <p className='flex-1 text-sm text-slate-300'>
              Continuez votre élan — chaque session compte.
            </p>
            <Button asChild size='sm' className='shrink-0 bg-cyan-600 hover:bg-cyan-700'>
              <Link href={
                fasciculeMeta
                  ? `/quiz?mode=module&f=${fasciculeMeta.id}`
                  : '/quiz'
              }>
                Refaire un quiz
                <ArrowRight className='ml-1.5 h-3.5 w-3.5' />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── FOOTER ACTIONS ── */}
      <div className='flex flex-wrap gap-3'>
        <Button asChild variant='outline' className='border-slate-700'>
          <Link href='/dashboard'>
            <ArrowLeft className='mr-1.5 h-4 w-4' />
            Tableau de bord
          </Link>
        </Button>
        <Button asChild variant='secondary'>
          <Link href='/dashboard/progression'>Voir toute ma progression</Link>
        </Button>
        <Button asChild className='bg-cyan-600 hover:bg-cyan-700'>
          <Link href='/quiz'>
            Continuer les révisions
            <ArrowRight className='ml-1.5 h-4 w-4' />
          </Link>
        </Button>
      </div>
    </section>
  );
}
