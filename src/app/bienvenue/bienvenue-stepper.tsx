'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle } from 'lucide-react';

const STORAGE_KEY = 'examenopj:onboarding-steps';

type Step = {
  n: number;
  title: string;
  desc: string;
  href: string;
  cta: string;
};

export function BienvenueStepper({ steps }: { steps: readonly Step[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as number[];
      setChecked(new Set(stored));
    } catch {
      // ignore
    }
  }, []);

  function toggle(n: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  }

  const doneCount = checked.size;
  const total = steps.length;
  const allDone = doneCount === total;

  return (
    <>
      <ol className='mt-10 space-y-6'>
        {steps.map((s) => {
          const done = checked.has(s.n);
          return (
            <li
              key={s.n}
              className={`rounded-2xl border p-6 transition-colors ${
                done
                  ? 'border-emerald-500/30 bg-emerald-500/[0.06]'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <div className='flex items-start gap-4'>
                <button
                  type='button'
                  onClick={() => toggle(s.n)}
                  aria-label={done ? `Décocher étape ${s.n}` : `Cocher étape ${s.n}`}
                  className='mt-0.5 shrink-0 focus-visible:outline focus-visible:ring-2 focus-visible:ring-examen-accent/50'
                >
                  {done ? (
                    <CheckCircle2 className='h-7 w-7 text-emerald-400' />
                  ) : (
                    <Circle className='h-7 w-7 text-slate-600' />
                  )}
                </button>
                <div className='min-w-0 flex-1'>
                  <h2
                    className={`font-display text-lg font-semibold ${
                      done ? 'text-emerald-200 line-through' : 'text-white'
                    }`}
                  >
                    {s.title}
                  </h2>
                  <p className='mt-1 text-sm text-slate-400'>{s.desc}</p>
                  {!done && (
                    <Link
                      href={s.href}
                      className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-examen-accent hover:underline'
                    >
                      {s.cta} →
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div
        className={`mt-10 flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm ${
          allDone
            ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-100'
            : 'border-white/10 bg-white/[0.03] text-slate-300'
        }`}
      >
        {allDone ? (
          <CheckCircle2 className='h-5 w-5 shrink-0 text-emerald-400' aria-hidden />
        ) : (
          <Circle className='h-5 w-5 shrink-0 text-slate-600' aria-hidden />
        )}
        <span>
          {allDone
            ? "Toutes les étapes complétées — bonne chance pour l'examen !"
            : `Progression : ${doneCount}/${total} étape${doneCount > 1 ? 's' : ''} cochée${doneCount > 1 ? 's' : ''}`}
        </span>
      </div>
    </>
  );
}
