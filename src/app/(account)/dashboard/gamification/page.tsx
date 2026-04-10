import { Flame, Lock, Medal, Trophy, Zap } from 'lucide-react';

import { getSession } from '@/features/account/controllers/get-session';
import { getGamification } from '@/features/examenopj/controllers/get-gamification';
import { BADGE_DEFINITIONS, TIER_STYLES } from '@/lib/gamification-definitions';

import { AnimatedBar } from './animated-bar';

// ─────────────────────────────────────────────
// Streak widget
// ─────────────────────────────────────────────

function StreakCard({
  current,
  longest,
  sessions,
  lastActivity,
}: {
  current: number;
  longest: number;
  sessions: number;
  lastActivity: string | null;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const activeToday = lastActivity === today;

  return (
    <div className='rounded-xl border border-amber-500/25 bg-amber-950/20 p-5'>
      <div className='mb-4 flex items-center gap-2'>
        <Flame className='h-5 w-5 text-amber-400' aria-hidden />
        <h2 className='text-base font-bold text-slate-100'>Série de révision</h2>
        {activeToday && (
          <span className='ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-400'>
            Actif aujourd&apos;hui ✓
          </span>
        )}
      </div>
      <div className='flex flex-wrap gap-6'>
        <div className='text-center'>
          <p className='text-4xl font-bold tabular-nums text-amber-300'>{current}</p>
          <p className='mt-0.5 text-xs text-slate-500'>Série actuelle</p>
        </div>
        <div className='text-center'>
          <p className='text-4xl font-bold tabular-nums text-slate-300'>{longest}</p>
          <p className='mt-0.5 text-xs text-slate-500'>Record</p>
        </div>
        <div className='text-center'>
          <p className='text-4xl font-bold tabular-nums text-slate-300'>{sessions}</p>
          <p className='mt-0.5 text-xs text-slate-500'>Sessions totales</p>
        </div>
      </div>
      {!activeToday && current > 5 && (
        <p className='mt-4 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-300'>
          ⚠️ Complétez une session aujourd&apos;hui pour ne pas perdre votre série de{' '}
          <strong>{current} jours</strong> !
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Badge card
// ─────────────────────────────────────────────

function BadgeCard({
  badgeDef,
  earnedAt,
}: {
  badgeDef: (typeof BADGE_DEFINITIONS)[0];
  earnedAt?: string;
}) {
  const earned = !!earnedAt;
  const tier = TIER_STYLES[badgeDef.tier];

  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-opacity ${
        earned ? `${tier.border} ${tier.bg}` : 'border-white/[0.06] bg-white/[0.02] opacity-50'
      }`}
    >
      {!earned && (
        <Lock className='absolute right-2 top-2 h-3.5 w-3.5 text-slate-600' aria-hidden />
      )}
      <span className='text-3xl' role='img' aria-label={badgeDef.name}>
        {badgeDef.icon}
      </span>
      <div>
        <p className={`text-xs font-bold ${earned ? tier.text : 'text-slate-600'}`}>
          {tier.label}
        </p>
        <p className={`mt-0.5 text-sm font-semibold ${earned ? 'text-slate-100' : 'text-slate-500'}`}>
          {badgeDef.name}
        </p>
        <p className='mt-1 text-[11px] leading-relaxed text-slate-500'>{badgeDef.description}</p>
        {earned && earnedAt && (
          <p className='mt-1.5 text-[10px] text-slate-600'>
            Obtenu le{' '}
            {new Date(earnedAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default async function GamificationPage() {
  const session = await getSession();
  if (!session) return null;

  const data = await getGamification(session.user.id);

  const earnedMap = new Map(data.earnedBadges.map((b) => [b.badgeId, b.earnedAt]));
  const earnedCount = earnedMap.size;
  const totalBadges = BADGE_DEFINITIONS.length;

  return (
    <section className='space-y-6 rounded-xl bg-slate-950 p-4 sm:p-6'>
      {/* ── Header ── */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <Trophy className='h-5 w-5 text-yellow-400' aria-hidden />
          <h1 className='text-lg font-bold text-slate-100'>Gamification & Badges</h1>
        </div>
        <span className='text-sm text-slate-500'>
          <span className='font-semibold text-slate-300 tabular-nums'>{earnedCount}</span> /{' '}
          {totalBadges} badges débloqués
        </span>
      </div>

      {/* ── Streak ── */}
      <StreakCard
        current={data.currentStreak}
        longest={data.longestStreak}
        sessions={data.totalSessions}
        lastActivity={data.lastActivityDate}
      />

      {/* ── Personal stats ── */}
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
        <div className='rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-center'>
          <Zap className='mx-auto mb-1.5 h-5 w-5 text-cyan-400' aria-hidden />
          <p className='text-2xl font-bold tabular-nums text-slate-100'>
            {data.totalQuestionsAnswered}
          </p>
          <p className='mt-0.5 text-xs text-slate-500'>Questions répondues</p>
        </div>
        <div className='rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-center'>
          <Medal className='mx-auto mb-1.5 h-5 w-5 text-emerald-400' aria-hidden />
          <p className='text-2xl font-bold tabular-nums text-slate-100'>{data.totalMastered}</p>
          <p className='mt-0.5 text-xs text-slate-500'>Flashcards maîtrisées</p>
        </div>
        <div className='col-span-2 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-center sm:col-span-1'>
          <Trophy className='mx-auto mb-1.5 h-5 w-5 text-yellow-400' aria-hidden />
          <p className='text-2xl font-bold tabular-nums text-slate-100'>{earnedCount}</p>
          <p className='mt-0.5 text-xs text-slate-500'>Badges obtenus</p>
        </div>
      </div>

      {/* ── Category progress ── */}
      {data.categoryProgress.length > 0 && (
        <div className='rounded-xl border border-white/[0.07] bg-slate-900/80 p-5'>
          <h2 className='mb-4 text-sm font-bold text-slate-300'>Maîtrise par catégorie (SM-2)</h2>
          <div className='space-y-4'>
            {data.categoryProgress.map((cat) => (
              <div key={cat.slug}>
                <div className='mb-1.5 flex items-center justify-between gap-2'>
                  <span className='text-sm text-slate-300'>{cat.label}</span>
                  <span className='shrink-0 text-xs font-semibold tabular-nums text-slate-400'>
                    {cat.mastered}/{cat.total} — {cat.pct}%
                  </span>
                </div>
                <AnimatedBar pct={cat.pct} color={cat.color} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Badges grid ── */}
      <div>
        <h2 className='mb-4 text-sm font-bold text-slate-300'>Badges</h2>

        {/* Earned first */}
        {earnedCount > 0 && (
          <div className='mb-6'>
            <p className='mb-3 text-xs font-semibold uppercase tracking-wider text-emerald-500'>
              Débloqués ({earnedCount})
            </p>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
              {BADGE_DEFINITIONS.filter((b) => earnedMap.has(b.id)).map((b) => (
                <BadgeCard key={b.id} badgeDef={b} earnedAt={earnedMap.get(b.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Locked */}
        {earnedCount < totalBadges && (
          <div>
            <p className='mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600'>
              À débloquer ({totalBadges - earnedCount})
            </p>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4'>
              {BADGE_DEFINITIONS.filter((b) => !earnedMap.has(b.id)).map((b) => (
                <BadgeCard key={b.id} badgeDef={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
