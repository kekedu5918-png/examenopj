'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { LANDING_EASE } from '@/components/home/motion';
import { QuizCard } from '@/components/quiz/QuizCard';
import { SessionProgress } from '@/components/quiz/SessionProgress';
import { type QuizQuestion } from '@/data/types';

const ease = [...LANDING_EASE] as [number, number, number, number];

/** Résultat de session QCM — passé au parent à la dernière question. */
export type QuizMcqSessionResult = {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  xpGained: number;
  mistakeTopics: string[];
};

type QuizInterfaceProps = {
  questions: QuizQuestion[];
  onComplete: (result: QuizMcqSessionResult) => void;
  /** Retour au hub / setup (barre SessionProgress). */
  onQuit: () => void;
  /** Série affichée dans SessionProgress (ex. getQuizStreak côté parent). */
  streak: number;
};

export function QuizInterface({ questions, onComplete, onQuit, streak }: QuizInterfaceProps) {
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lives, setLives] = useState(3);
  const [xpGained, setXpGained] = useState(0);
  const [mistakeTopics, setMistakeTopics] = useState<string[]>([]);

  const total = questions.length;
  const q = questions[index];
  const isLast = index >= total - 1;

  function handleCardAnswer(isCorrect: boolean, _selectedIndex: number) {
    if (!q) return;

    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    const newXp = xpGained + (isCorrect ? 10 : 0);
    const newMistakes =
      !isCorrect && !mistakeTopics.includes(q.domaine)
        ? [...mistakeTopics, q.domaine]
        : mistakeTopics;

    setCorrectCount(newCorrect);
    setXpGained(newXp);
    if (!isCorrect) {
      setLives((l) => Math.max(0, l - 1));
      setMistakeTopics(newMistakes);
    }

    if (isLast) {
      const score = total > 0 ? (newCorrect / total) * 100 : 0;
      onComplete({
        score,
        correctAnswers: newCorrect,
        totalQuestions: total,
        xpGained: newXp,
        mistakeTopics: newMistakes,
      });
      return;
    }

    setIndex((i) => i + 1);
  }

  if (!q || total === 0) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-ds-border bg-ds-bg-secondary/95 p-8 text-center text-ds-text-muted dark:border-white/[0.08] dark:bg-navy-950/80 dark:text-gray-400">
        Aucune question pour cette sélection.
      </div>
    );
  }

  return (
    <div className="w-full">
      <SessionProgress
        current={index + 1}
        total={total}
        lives={lives}
        xpGained={xpGained}
        streak={streak}
        onQuit={onQuit}
      />

      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-6">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.28, ease }}
        >
          <QuizCard
            question={q.question}
            options={q.options}
            correctIndex={q.correctIndex}
            explanation={q.explication ?? ''}
            questionNumber={index + 1}
            totalQuestions={total}
            onAnswer={handleCardAnswer}
          />
        </motion.div>
      </div>
    </div>
  );
}
