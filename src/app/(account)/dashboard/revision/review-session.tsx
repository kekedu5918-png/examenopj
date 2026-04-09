'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, ChevronLeft, Eye, XCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { submitSM2Review } from '@/features/examenopj/actions/sm2-review';
import { SM2_QUALITY_LABELS } from '@/lib/sm2';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type ReviewCard = {
  scheduleId: string;
  contentId: string;
  contentType: string;
  title: string;
  front: string;
  back: string | null;
  repetitions: number;
  easinessFactor: number;
  status: string;
};

type QualityButtonProps = {
  quality: number;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

const QUALITY_COLORS: Record<number, string> = {
  0: 'border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20',
  2: 'border-orange-500/40 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20',
  3: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20',
  4: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20',
  5: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20',
};

function QualityButton({ quality, label, onClick, disabled }: QualityButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${QUALITY_COLORS[quality]}`}
    >
      <span className='block text-lg font-bold'>{quality}</span>
      {label}
    </button>
  );
}

function MarkdownText({ text }: { text: string }) {
  // Very simple markdown: bold, line breaks
  const lines = text.split('\n');
  return (
    <div className='space-y-1 text-left text-sm text-slate-300'>
      {lines.map((line, i) => {
        const boldLine = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        return (
          // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled local content
          <p key={i} dangerouslySetInnerHTML={{ __html: boldLine || '&nbsp;' }} />
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────

type Props = { cards: ReviewCard[]; returnUrl: string };
type CardPhase = 'front' | 'back' | 'done' | 'submitting';

export function ReviewSession({ cards, returnUrl }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<CardPhase>('front');
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [results, setResults] = useState<{ quality: number; correct: boolean }[]>([]);
  const [feedbackQuality, setFeedbackQuality] = useState<number | null>(null);

  const current = cards[currentIndex];
  const isLast = currentIndex === cards.length - 1;
  const isFinished = currentIndex >= cards.length;

  const handleReveal = useCallback(() => {
    setPhase('back');
  }, []);

  const handleQuality = useCallback(
    async (quality: number) => {
      if (!current || phase === 'submitting') return;
      setPhase('submitting');
      setFeedbackQuality(quality);

      const elapsed = Math.round((Date.now() - startTime) / 1000);
      const res = await submitSM2Review({
        scheduleId: current.scheduleId,
        quality,
        timeSpentSeconds: elapsed,
      });

      setResults((prev) => [...prev, { quality, correct: res.correct ?? quality >= 3 }]);

      // Short pause to show feedback, then advance
      await new Promise((r) => setTimeout(r, 700));

      if (isLast) {
        setCurrentIndex(cards.length); // trigger finished state
      } else {
        setCurrentIndex((i) => i + 1);
        setPhase('front');
        setStartTime(Date.now());
        setFeedbackQuality(null);
      }
    },
    [current, phase, startTime, isLast, cards.length],
  );

  // ── Finished screen ──
  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    const pct = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

    return (
      <section className='flex min-h-[60vh] flex-col items-center justify-center space-y-6 rounded-xl bg-slate-950 p-4 sm:p-8 text-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10'>
          <CheckCircle2 className='h-9 w-9 text-emerald-400' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-slate-50'>Session terminée !</h1>
          <p className='mt-2 text-slate-400'>
            {cards.length} carte{cards.length > 1 ? 's' : ''} révisée{cards.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className='flex gap-8 text-center'>
          <div>
            <p className='text-3xl font-bold text-emerald-400 tabular-nums'>{correctCount}</p>
            <p className='text-xs text-slate-500'>Correctes</p>
          </div>
          <div>
            <p className='text-3xl font-bold text-red-400 tabular-nums'>
              {results.length - correctCount}
            </p>
            <p className='text-xs text-slate-500'>À retravailler</p>
          </div>
          <div>
            <p className='text-3xl font-bold text-cyan-400 tabular-nums'>{pct}%</p>
            <p className='text-xs text-slate-500'>Réussite</p>
          </div>
        </div>

        <div className='flex flex-wrap justify-center gap-3'>
          <Button
            onClick={() => router.push(returnUrl)}
            variant='secondary'
          >
            <ChevronLeft className='mr-1.5 h-4 w-4' />
            Retour au programme
          </Button>
          <Button asChild className='bg-cyan-600 hover:bg-cyan-700'>
            <Link href='/dashboard'>
              Tableau de bord
              <ArrowRight className='ml-1.5 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>
    );
  }

  if (!current) return null;

  // ── Review card ──
  return (
    <section className='space-y-4 rounded-xl bg-slate-950 p-4 sm:p-6'>
      {/* Progress header */}
      <div className='flex items-center justify-between gap-3'>
        <Button
          variant='ghost'
          size='sm'
          onClick={() => router.push(returnUrl)}
          className='text-slate-500 hover:text-slate-300'
        >
          <ChevronLeft className='mr-1 h-4 w-4' />
          Quitter
        </Button>
        <div className='flex flex-1 items-center gap-2'>
          <div className='h-1.5 flex-1 overflow-hidden rounded-full bg-white/10'>
            <div
              className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all'
              style={{ width: `${(currentIndex / cards.length) * 100}%` }}
            />
          </div>
          <span className='shrink-0 text-xs text-slate-500 tabular-nums'>
            {currentIndex + 1}/{cards.length}
          </span>
        </div>
      </div>

      {/* Card */}
      <Card className='mx-auto max-w-2xl border border-white/[0.08] bg-slate-900/90'>
        <CardHeader className='pb-2'>
          <CardTitle className='text-center text-sm font-medium text-slate-400'>
            {current.title}
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {/* Front */}
          <div className='rounded-lg border border-white/[0.06] bg-white/[0.03] p-4 text-center'>
            <p className='text-base font-semibold text-slate-100'>{current.front}</p>
          </div>

          {/* Back / Reveal */}
          {phase === 'front' ? (
            <div className='flex justify-center'>
              <Button
                onClick={handleReveal}
                className='bg-gradient-to-r from-cyan-500 to-blue-500 px-8'
              >
                <Eye className='mr-2 h-4 w-4' />
                Révéler la réponse
              </Button>
            </div>
          ) : (
            <>
              {current.back && (
                <div className='rounded-lg border border-cyan-500/15 bg-cyan-500/[0.04] p-4'>
                  <MarkdownText text={current.back} />
                </div>
              )}

              {/* Quality buttons */}
              <div>
                <p className='mb-2 text-center text-xs font-medium text-slate-500'>
                  Comment avez-vous répondu ?
                </p>
                <div className='flex flex-wrap justify-center gap-2'>
                  {([0, 2, 3, 4, 5] as const).map((q) => (
                    <QualityButton
                      key={q}
                      quality={q}
                      label={SM2_QUALITY_LABELS[q]}
                      onClick={() => handleQuality(q)}
                      disabled={phase === 'submitting'}
                    />
                  ))}
                </div>

                {/* Feedback flash */}
                {phase === 'submitting' && feedbackQuality != null && (
                  <div
                    className={`mt-3 flex items-center justify-center gap-2 text-sm font-medium ${feedbackQuality >= 3 ? 'text-emerald-400' : 'text-red-400'}`}
                  >
                    {feedbackQuality >= 3 ? (
                      <CheckCircle2 className='h-4 w-4' />
                    ) : (
                      <XCircle className='h-4 w-4' />
                    )}
                    {feedbackQuality >= 3 ? 'Enregistré ✓' : 'À revoir demain'}
                  </div>
                )}
              </div>

              {/* SM-2 debug info (subtle) */}
              <p className='text-center text-[10px] text-slate-700'>
                EF {Number(current.easinessFactor).toFixed(2)} · Rép. {current.repetitions}
              </p>
            </>
          )}
        </CardContent>
      </Card>

      {/* Quality scale legend */}
      {phase !== 'front' && (
        <p className='text-center text-xs text-slate-600'>
          0 = Oublié · 2 = Difficile · 3 = Correct · 4 = Bien · 5 = Facile
        </p>
      )}
    </section>
  );
}
