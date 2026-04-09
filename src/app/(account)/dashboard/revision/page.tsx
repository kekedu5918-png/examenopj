import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Play,
  Sparkles,
  Trophy,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { flashcardsData } from '@/data/flashcards-data';
import { getSession } from '@/features/account/controllers/get-session';
import { getSM2Schedule, type ScheduleItem } from '@/features/examenopj/controllers/get-sm2-schedule';

import { InitSM2Button } from './init-sm2-button';
import { ReviewSession } from './review-session';

export const metadata: Metadata = { title: 'Révisions — ExamenOPJ' };

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function statusConfig(status: string) {
  switch (status) {
    case 'new':
      return { label: 'Nouveau', color: 'bg-blue-500/15 text-blue-300 border-blue-500/25' };
    case 'learning':
      return { label: 'En apprentissage', color: 'bg-amber-500/15 text-amber-300 border-amber-500/25' };
    case 'reviewing':
      return { label: 'En révision', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25' };
    case 'mastered':
      return { label: 'Maîtrisé', color: 'bg-purple-500/15 text-purple-300 border-purple-500/25' };
    default:
      return { label: status, color: 'bg-slate-700 text-slate-300' };
  }
}

function ScheduleCard({ item }: { item: ScheduleItem }) {
  const { label, color } = statusConfig(item.status);
  return (
    <div className='flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5'>
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-medium text-slate-200'>{item.title}</p>
        <div className='mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-500'>
          {item.repetitions > 0 && <span>{item.repetitions} répétition{item.repetitions > 1 ? 's' : ''}</span>}
          {item.success_rate > 0 && (
            <span>{Math.round(item.success_rate)}% réussite</span>
          )}
          {item.interval_days > 0 && <span>Intervalle : {item.interval_days}j</span>}
        </div>
      </div>
      <span className={`shrink-0 rounded border px-2 py-0.5 text-xs font-medium ${color}`}>
        {label}
      </span>
    </div>
  );
}

function UpcomingCard({ item }: { item: ScheduleItem }) {
  const daysUntil = item.next_review_date
    ? Math.max(
        0,
        Math.round(
          (new Date(item.next_review_date).getTime() - Date.now()) / 86_400_000,
        ),
      )
    : null;

  return (
    <div className='flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5'>
      <div className='min-w-0 flex-1'>
        <p className='truncate text-sm font-medium text-slate-300'>{item.title}</p>
        {item.next_review_date && (
          <p className='mt-0.5 flex items-center gap-1 text-xs text-slate-500'>
            <Clock className='h-3 w-3' aria-hidden />
            {daysUntil === 1 ? 'Demain' : `Dans ${daysUntil} jour${(daysUntil ?? 0) > 1 ? 's' : ''}`}
            {' '}({new Date(item.next_review_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })})
          </p>
        )}
      </div>
      <span className='text-xs text-slate-600'>EF {Number(item.easiness_factor).toFixed(2)}</span>
    </div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

type Props = { searchParams: { session?: string } };

export default async function RevisionPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session) redirect('/login');

  const schedule = await getSM2Schedule(session.user.id);
  const isSessionActive = searchParams.session === '1';

  // Prepare today's items as plain data for the client component
  const todayCards = schedule.today.map((item) => {
    const card = item.content_type === 'flashcard'
      ? flashcardsData.find((c) => c.id === item.content_id) ?? null
      : null;
    return {
      scheduleId: item.id,
      contentId: item.content_id,
      contentType: item.content_type,
      title: item.title,
      front: card?.definitionCourte ?? card?.nom ?? item.content_id,
      back: card
        ? [
            card.materielMoralComplet
              ? `**ÉLÉMENTS CONSTITUTIFS**\n\n${card.materielMoralComplet}`
              : card.materiel.length > 0
                ? `**ÉLÉMENT MATÉRIEL**\n${card.materiel.join('\n')}\n\n**ÉLÉMENT MORAL**\n${card.moral}`
                : card.moral,
            card.legal ? `**TEXTE**\n${card.legal}` : '',
            card.peines ? `**RÉPRESSION**\n${card.peines}` : '',
          ]
            .filter(Boolean)
            .join('\n\n')
        : null,
      repetitions: item.repetitions,
      easinessFactor: item.easiness_factor,
      status: item.status,
    };
  });

  // If session is active and there are items, show review session
  if (isSessionActive && todayCards.length > 0) {
    return <ReviewSession cards={todayCards} returnUrl='/dashboard/revision' />;
  }

  const hasSchedule = schedule.stats.totalItems > 0;

  return (
    <section className='space-y-6 rounded-xl bg-slate-950 p-4 sm:p-6'>
      {/* Header */}
      <div className='flex flex-wrap items-start justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-bold text-slate-50'>VOTRE PROGRAMME DE RÉVISION</h1>
          <p className='mt-1 text-sm text-slate-400'>
            Algorithme SM-2 — répétition espacée adaptée à votre progression
          </p>
        </div>
        <Button asChild variant='outline' size='sm' className='border-slate-700 text-slate-400'>
          <Link href='/dashboard'>← Tableau de bord</Link>
        </Button>
      </div>

      {/* Stats row */}
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
        {[
          {
            icon: <BookOpen className='h-4 w-4' />,
            value: schedule.stats.totalItems,
            label: 'Total cartes',
            color: 'text-slate-300',
          },
          {
            icon: <Play className='h-4 w-4' />,
            value: schedule.stats.todayCount,
            label: "Aujourd'hui",
            color: schedule.stats.todayCount > 0 ? 'text-emerald-400' : 'text-slate-400',
          },
          {
            icon: <Calendar className='h-4 w-4' />,
            value: schedule.stats.upcomingWeekCount,
            label: 'Cette semaine',
            color: 'text-cyan-400',
          },
          {
            icon: <Trophy className='h-4 w-4' />,
            value: schedule.stats.masteredCount,
            label: 'Maîtrisées',
            color: 'text-purple-400',
          },
        ].map((s, i) => (
          <Card key={i} className='border-white/[0.07] bg-slate-900/80'>
            <CardContent className='p-4'>
              <div className={`mb-1 ${s.color}`} aria-hidden>
                {s.icon}
              </div>
              <p className={`text-2xl font-bold tabular-nums ${s.color}`}>{s.value}</p>
              <p className='text-xs text-slate-500'>{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── À RÉVISER AUJOURD'HUI ── */}
      <Card className={`border ${schedule.stats.todayCount > 0 ? 'border-emerald-500/25 bg-slate-900/80' : 'border-white/[0.07] bg-slate-900/60'}`}>
        <CardHeader className='pb-3'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <div className='flex items-center gap-2'>
              <Play
                className={`h-5 w-5 ${schedule.stats.todayCount > 0 ? 'text-emerald-400' : 'text-slate-500'}`}
                aria-hidden
              />
              <CardTitle className='text-base font-bold text-slate-100'>
                🔴 À RÉVISER AUJOURD'HUI
                {schedule.stats.todayCount > 0 && (
                  <Badge className='ml-2 bg-emerald-500/20 text-emerald-300'>
                    {schedule.stats.todayCount}
                  </Badge>
                )}
              </CardTitle>
            </div>
            {schedule.stats.todayCount > 0 && (
              <Button asChild size='sm' className='bg-emerald-600 hover:bg-emerald-700'>
                <Link href='/dashboard/revision?session=1'>
                  <Sparkles className='mr-1.5 h-3.5 w-3.5' />
                  Démarrer la session
                </Link>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {schedule.today.length === 0 ? (
            <div className='flex items-center gap-3 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] p-3'>
              <CheckCircle2 className='h-5 w-5 shrink-0 text-emerald-400' />
              <p className='text-sm text-emerald-200'>
                {hasSchedule
                  ? 'Aucune révision due aujourd\'hui — excellent travail !'
                  : 'Initialisez votre programme de révision ci-dessous.'}
              </p>
            </div>
          ) : (
            <div className='space-y-2'>
              {schedule.today.slice(0, 5).map((item) => (
                <ScheduleCard key={item.id} item={item} />
              ))}
              {schedule.today.length > 5 && (
                <p className='text-center text-xs text-slate-600'>
                  + {schedule.today.length - 5} autres items — lancez la session pour tout réviser
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── RÉVISIONS PLANIFIÉES ── */}
      {schedule.upcoming.length > 0 && (
        <Card className='border border-white/[0.07] bg-slate-900/80'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-5 w-5 text-cyan-400' aria-hidden />
              <CardTitle className='text-base font-bold text-slate-100'>
                🟡 RÉVISIONS PLANIFIÉES (7 jours)
                <Badge className='ml-2 bg-cyan-500/15 text-cyan-400'>
                  {schedule.upcoming.length}
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            {schedule.upcoming.slice(0, 6).map((item) => (
              <UpcomingCard key={item.id} item={item} />
            ))}
            {schedule.upcoming.length > 6 && (
              <p className='text-center text-xs text-slate-600'>
                + {schedule.upcoming.length - 6} autres planifiées
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── MAÎTRISÉES ── */}
      {schedule.mastered.length > 0 && (
        <Card className='border border-purple-500/15 bg-slate-900/80'>
          <CardHeader className='pb-3'>
            <div className='flex items-center gap-2'>
              <Trophy className='h-5 w-5 text-purple-400' aria-hidden />
              <CardTitle className='text-base font-bold text-slate-100'>
                🟢 MAÎTRISÉES ✓
                <Badge className='ml-2 bg-purple-500/15 text-purple-400'>
                  {schedule.mastered.length}
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className='space-y-2'>
            {schedule.mastered.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className='flex items-center gap-2 rounded-lg border border-purple-500/10 bg-purple-500/[0.04] px-3 py-2'
              >
                <CheckCircle2 className='h-4 w-4 shrink-0 text-purple-400' aria-hidden />
                <p className='flex-1 truncate text-sm text-slate-400'>{item.title}</p>
                <span className='text-xs text-slate-600'>
                  {Math.round(item.success_rate)}% réussite
                </span>
              </div>
            ))}
            {schedule.mastered.length > 3 && (
              <p className='text-center text-xs text-slate-600'>
                + {schedule.mastered.length - 3} autres maîtrisées
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── INITIALISATION ── */}
      <Card className='border border-white/[0.07] bg-slate-900/60'>
        <CardHeader className='pb-3'>
          <CardTitle className='flex items-center gap-2 text-base font-bold text-slate-100'>
            <ChevronRight className='h-5 w-5 text-slate-500' aria-hidden />
            Configurer votre programme
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-3 text-sm text-slate-400'>
          <p>
            Importez vos révisions existantes (flashcards) dans le système SM-2 pour démarrer avec
            un état initial adapté à votre niveau.
          </p>
          <div className='flex flex-wrap gap-3'>
            <InitSM2Button />
            <Button asChild variant='secondary' size='sm'>
              <Link href='/flashcards'>
                Réviser les flashcards
                <ChevronDown className='ml-1.5 h-3.5 w-3.5 rotate-[-90deg]' />
              </Link>
            </Button>
          </div>
          <p className='text-xs text-slate-600'>
            Total flashcards disponibles : {flashcardsData.length} cartes
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
