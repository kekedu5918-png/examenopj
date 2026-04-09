'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, BookOpen, CheckCircle2, XCircle } from 'lucide-react';

import { FICHES } from '@/data/fondamentaux-data';
import { type QuizQuestion } from '@/data/types';

type Props = {
  question: QuizQuestion;
  isCorrect: boolean;
  pickedAnswer: string;
  onContinue: () => void;
};

export function QuestionFeedback({ question, isCorrect, pickedAnswer, onContinue }: Props) {
  const correctAnswer = question.options[question.correctIndex] ?? '';
  const relatedFiche = question.fondamentalSlug
    ? (FICHES.find((f) => f.id === question.fondamentalSlug) ?? null)
    : null;

  const bloomVerbs = ['Définir', 'Distinguer', 'Identifier', 'Appliquer'] as const;
  const objectives = relatedFiche?.regles
    .slice(0, 4)
    .map((r, i) => ({ verb: bloomVerbs[i] ?? 'Comprendre', label: r.label }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`mt-6 space-y-4 rounded-xl border p-5 ${
        isCorrect
          ? 'border-emerald-500/35 bg-emerald-500/[0.06]'
          : 'border-red-500/35 bg-red-500/[0.06]'
      }`}
      role='status'
      aria-live='polite'
    >
      {/* ── Status ── */}
      <div className='flex items-center gap-2'>
        {isCorrect ? (
          <CheckCircle2 className='h-5 w-5 shrink-0 text-emerald-400' aria-hidden />
        ) : (
          <XCircle className='h-5 w-5 shrink-0 text-red-400' aria-hidden />
        )}
        <p className={`font-bold ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
          {isCorrect ? 'Bonne réponse !' : 'Réponse incorrecte'}
        </p>
      </div>

      {/* ── Incorrect: show correct answer ── */}
      {!isCorrect && (
        <div className='rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3'>
          <p className='mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500'>
            Réponse attendue
          </p>
          <p className='text-sm font-semibold text-white'>{correctAnswer}</p>
        </div>
      )}

      {/* ── Explanation ── */}
      {question.explication && (
        <div className='space-y-1.5'>
          <p className='text-[11px] font-semibold uppercase tracking-wider text-slate-500'>
            {isCorrect ? 'Explication' : 'Pourquoi ?'}
          </p>
          <p className='text-sm leading-relaxed text-slate-300'>{question.explication}</p>
        </div>
      )}

      {/* ── Incorrect only: exam traps from linked fiche ── */}
      {!isCorrect && relatedFiche?.piegesExamen && relatedFiche.piegesExamen.length > 0 && (
        <div className='space-y-2 rounded-lg border border-amber-500/20 bg-amber-500/[0.05] px-4 py-3'>
          <div className='flex items-center gap-1.5'>
            <AlertTriangle className='h-3.5 w-3.5 shrink-0 text-amber-400' aria-hidden />
            <p className='text-[11px] font-semibold uppercase tracking-wider text-amber-400'>
              Pièges examen à retenir
            </p>
          </div>
          <ul className='space-y-1.5'>
            {relatedFiche.piegesExamen.slice(0, 2).map((trap, i) => (
              <li key={i} className='text-xs leading-relaxed text-slate-300'>
                • {trap}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Incorrect only: mémo clé ── */}
      {!isCorrect && relatedFiche?.cles && relatedFiche.cles.length > 0 && (
        <div className='rounded-lg border border-cyan-500/15 bg-cyan-500/[0.04] px-4 py-3'>
          <p className='mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-cyan-500'>
            Mémo clé
          </p>
          <p className='text-xs leading-relaxed text-slate-300'>{relatedFiche.cles[0]}</p>
        </div>
      )}

      {/* ── Correct only: what to learn next from fiche ── */}
      {isCorrect && objectives && objectives.length > 0 && (
        <div className='rounded-lg border border-white/[0.07] bg-white/[0.02] px-4 py-3'>
          <p className='mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500'>
            Pour aller plus loin
          </p>
          <ul className='space-y-1'>
            {objectives.slice(0, 2).map((obj, i) => (
              <li key={i} className='text-xs text-slate-400'>
                <span className='font-semibold text-slate-300'>{obj.verb}</span> {obj.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Legal reference ── */}
      {relatedFiche?.source && (
        <p className='font-mono text-xs text-slate-700'>Réf. : {relatedFiche.source}</p>
      )}

      {/* ── Footer: fiche link + continue ── */}
      <div className='flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.06] pt-3'>
        {relatedFiche ? (
          <Link
            href={`/fondamentaux/${relatedFiche.id}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-1.5 text-xs text-cyan-400 transition-colors hover:text-cyan-300'
          >
            <BookOpen className='h-3.5 w-3.5 shrink-0' aria-hidden />
            Fiche : {relatedFiche.titre}
          </Link>
        ) : (
          <span />
        )}
        <button
          type='button'
          onClick={onContinue}
          className='flex items-center gap-1.5 rounded-lg bg-white/[0.08] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/[0.13]'
        >
          Continuer
          <ArrowRight className='h-4 w-4' aria-hidden />
        </button>
      </div>
    </motion.div>
  );
}
