'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Clock, Crosshair, Play, Square } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

const PERSIST_KEY = 'examenopj:pv-exam-mode-session:v1';

type Persisted = {
  endAt: number;
};

type Props = {
  onActiveChange: (active: boolean) => void;
};

function formatMmSs(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

/**
 * Simulation épreuve 2 : décompte, barre fixe, persistance locale du deadline.
 */
export function PVExamModeBar({ onActiveChange }: Props) {
  const [phase, setPhase] = useState<'idle' | 'choose' | 'running' | 'ended'>('idle');
  const [durationMin, setDurationMin] = useState(90);
  const [remainingSec, setRemainingSec] = useState(0);
  const [endAt, setEndAt] = useState<number | null>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const warned10 = useRef(false);
  const warned1 = useRef(false);

  useEffect(() => {
    onActiveChange(phase === 'running');
  }, [phase, onActiveChange]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PERSIST_KEY);
      if (!raw) return;
      const p = JSON.parse(raw) as Persisted;
      if (typeof p.endAt !== 'number') return;
      if (p.endAt <= Date.now()) {
        localStorage.removeItem(PERSIST_KEY);
        return;
      }
      warned10.current = false;
      warned1.current = false;
      setEndAt(p.endAt);
      setRemainingSec(Math.ceil((p.endAt - Date.now()) / 1000));
      setPhase('running');
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (endAt == null) return;
    const tick = () => {
      const r = Math.ceil((endAt - Date.now()) / 1000);
      if (r <= 0) {
        setRemainingSec(0);
        setEndAt(null);
        setPhase('ended');
        try {
          localStorage.removeItem(PERSIST_KEY);
        } catch {
          /* ignore */
        }
        if (liveRef.current) liveRef.current.textContent = 'Temps imparti écoulé.';
        onActiveChange(false);
        return;
      }
      setRemainingSec(r);
      if (r <= 600 && !warned10.current) {
        warned10.current = true;
        if (liveRef.current) liveRef.current.textContent = '10 minutes restantes.';
      }
      if (r <= 60 && !warned1.current) {
        warned1.current = true;
        if (liveRef.current) liveRef.current.textContent = '1 minute restante.';
      }
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [endAt, onActiveChange]);

  const start = useCallback(() => {
    const totalSec = Math.max(1, durationMin) * 60;
    const end = Date.now() + totalSec * 1000;
    try {
      localStorage.setItem(PERSIST_KEY, JSON.stringify({ endAt: end }));
    } catch {
      /* ignore */
    }
    warned10.current = false;
    warned1.current = false;
    setEndAt(end);
    setPhase('running');
  }, [durationMin]);

  if (phase === 'idle') {
    return (
      <div className='mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-500/25 bg-rose-500/[0.07] px-4 py-3'>
        <div className='flex min-w-0 items-center gap-2'>
          <Crosshair className='h-5 w-5 shrink-0 text-rose-300' aria-hidden />
          <div>
            <p className='text-sm font-semibold text-rose-100'>Mode examen — épreuve 2 (ME1)</p>
            <p className='text-xs text-rose-200/70'>
              Décompte, atténuation des modèles verbatim et extraits — entraînement type salle d’examen.
            </p>
          </div>
        </div>
        <Button
          type='button'
          variant='outline'
          onClick={() => setPhase('choose')}
          className='shrink-0 rounded-xl border-rose-400/40 bg-rose-600/20 font-semibold text-rose-50 hover:bg-rose-600/30'
        >
          Configurer
        </Button>
      </div>
    );
  }

  if (phase === 'choose') {
    return (
      <div className='mb-6 space-y-3 rounded-xl border border-rose-500/30 bg-rose-500/[0.09] px-4 py-4'>
        <p className='text-sm font-semibold text-rose-100'>Durée de la simulation</p>
        <div className='flex flex-wrap gap-2'>
          {[60, 90, 120].map((m) => (
            <button
              key={m}
              type='button'
              onClick={() => setDurationMin(m)}
              className={cn(
                'rounded-lg border px-3 py-1.5 text-xs font-semibold transition',
                durationMin === m
                  ? 'border-rose-400 bg-rose-500/30 text-white'
                  : 'border-white/15 bg-white/5 text-rose-100/80 hover:bg-white/10',
              )}
            >
              {m} min
            </button>
          ))}
        </div>
        <div className='flex flex-wrap gap-2'>
          <Button
            type='button'
            onClick={start}
            className='rounded-xl bg-rose-600 font-semibold text-white hover:bg-rose-500'
          >
            <Play className='mr-2 h-4 w-4' aria-hidden />
            Démarrer
          </Button>
          <Button type='button' variant='ghost' onClick={() => setPhase('idle')} className='text-rose-200/80'>
            Annuler
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'ended') {
    return (
      <div className='mb-6 rounded-xl border border-slate-500/30 bg-slate-800/40 px-4 py-3 text-sm text-slate-300'>
        <p className='font-medium text-white'>Session terminée</p>
        <p className='mt-1 text-xs text-slate-400'>Contrôlez votre PV avec le support ME1. Vous pouvez relancer une simulation.</p>
        <Button type='button' variant='outline' className='mt-3 rounded-xl border-white/20' onClick={() => setPhase('idle')}>
          Retour
        </Button>
      </div>
    );
  }

  return (
    <>
      <div
        className='fixed inset-x-0 top-0 z-[70] border-b border-rose-500/35 bg-navy-950/95 backdrop-blur-md supports-[backdrop-filter]:bg-navy-950/85'
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className='mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-2.5'>
          <div className='flex items-center gap-2 text-rose-100'>
            <Clock className='h-5 w-5 shrink-0 text-rose-400' aria-hidden />
            <span className='font-mono text-lg font-bold tabular-nums tracking-tight'>{formatMmSs(remainingSec)}</span>
            <span className='text-xs text-rose-200/75'>restant</span>
          </div>
          <p ref={liveRef} className='sr-only' aria-live='polite' />
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => {
              setEndAt(null);
              setRemainingSec(0);
              warned10.current = false;
              warned1.current = false;
              try {
                localStorage.removeItem(PERSIST_KEY);
              } catch {
                /* ignore */
              }
              setPhase('idle');
            }}
            className='rounded-lg border-rose-400/40 text-rose-100 hover:bg-rose-500/20'
          >
            <Square className='mr-1.5 h-3.5 w-3.5' aria-hidden />
            Arrêter
          </Button>
        </div>
      </div>
      <div className='mb-4 h-12 shrink-0 sm:h-11' aria-hidden />
    </>
  );
}
