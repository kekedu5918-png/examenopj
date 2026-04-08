'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Circle, RotateCcw } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { fasciculesList } from '@/data/fascicules-list';
import { cn } from '@/utils/cn';

const STORAGE_PROGRESS = 'examenopj:parcours-candidat-v2-progress';
const STORAGE_CHECKLIST = 'examenopj:parcours-candidat-v2-checklist';

type PhaseCard = { href: string; title: string; description: string };

type Phase = {
  id: string;
  title: string;
  weeks: string;
  objective: string;
  cards: PhaseCard[];
};

const PHASES: Phase[] = [
  {
    id: 'cartographier',
    title: 'Cartographier',
    weeks: 'Semaines 1–8',
    objective: 'Parcourir une première fois tout le programme : repères, angles morts, premier quiz après chaque gros thème.',
    cards: [
      {
        href: '/cours/modules',
        title: 'Modules F01–F15',
        description: 'Fiches synthèse officielles : une passe lecture pour cartographier le programme.',
      },
      {
        href: '/fondamentaux',
        title: 'Fiches fondamentaux',
        description: 'Notions procédure / pénales à avoir immédiatement disponibles.',
      },
      {
        href: '/quiz',
        title: 'Quiz par thème',
        description: 'Après chaque module, 10 questions pour verrouiller les lacunes.',
      },
      {
        href: '/infractions',
        title: 'Référentiel infractions (Épreuve 1)',
        description: 'Éléments constitutifs et titres du programme : socle DPS pour dissertation et cas.',
      },
    ],
  },
  {
    id: 'approfondir',
    title: 'Approfondir',
    weeks: 'Semaines 9–20',
    objective: 'Travailler la mémoire active, les cas complets et la procédure (F11–F15) en parallèle du DPG/DPS.',
    cards: [
      {
        href: '/flashcards',
        title: 'Flashcards',
        description: 'Mémorisation quotidienne sur le même référentiel que le récap.',
      },
      {
        href: '/entrainement/recapitulatif',
        title: 'Récap priorité examen (Épreuve 1)',
        description: 'Tableaux comparatifs PRQC ; densifier avant l’écrit DPS.',
      },
      {
        href: '/cours/enquetes',
        title: 'Enquêtes types formation (Épreuve 2)',
        description: 'Planches complètes : même fil rouge que le dossier de procédure chronométré.',
      },
      {
        href: '/epreuves/epreuve-2',
        title: 'Méthode Épreuve 2 — dossier',
        description: 'Cartouches, articulation qualification/actes et attentes correcteurs.',
      },
    ],
  },
  {
    id: 'concours',
    title: 'Examen OPJ',
    weeks: 'Semaines 21–26',
    objective: 'Chronométrage, sujets blancs E1+E2+E3, oral enregistré : mode « examen réel ».',
    cards: [
      {
        href: '/sujets-blancs',
        title: 'Sujets blancs (les 3 épreuves)',
        description: 'Même affaire fictive : écrit DPS, dossier procédure, oral — lien direct avec les fiches F.',
      },
      {
        href: '/entrainement/articulation',
        title: 'Articulation Épreuve 2',
        description: 'Consolidation cartouches et PV avant passage en sujet blanc.',
      },
      {
        href: '/epreuves/epreuve-3',
        title: 'Préparation Épreuve 3 (oral)',
        description: 'Synthèse, réponses jury et posture professionnelle.',
      },
      {
        href: '/guide-revision-opj',
        title: 'Guide de révision',
        description: 'Rappels de méthode et plan sur les dernières semaines.',
      },
    ],
  },
];

const CHECKLIST_IDS = [
  'lu-f09-f10',
  'parcours-f01-f07',
  'procedure-f11-f15',
  'quiz-regulier',
  'flashcards-15min',
  'enquete-alpha',
  'sujet-blanc-1',
  'oral-enregistre',
] as const;

const CHECKLIST_LABELS: Record<(typeof CHECKLIST_IDS)[number], string> = {
  'lu-f09-f10': 'Relu F09 (éléments constitutifs) et F10 (peines / CA) au moins une fois',
  'parcours-f01-f07': 'Parcouru une première fois les thèmes F01–F07 (personnes, biens, route…)',
  'procedure-f11-f15': 'Attaqué la procédure F11–F15 (PJ, instruction, juridictions, nullités)',
  'quiz-regulier': 'Quiz courts (10 questions) au moins 3× / semaine en phase intense',
  'flashcards-15min': 'Séances flashcards 15 min / jour pendant 2 semaines d’affilée',
  'enquete-alpha': 'Réalisé l’enquête Alpha (lecture + restitution écrite)',
  'sujet-blanc-1': 'Au moins un sujet blanc chronométré complet',
  'oral-enregistre': 'Au moins un oral enregistré et réécouté avec grille de correction',
};

function readChecklist(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_CHECKLIST);
    if (!raw) return {};
    const p = JSON.parse(raw) as { items?: Record<string, boolean> };
    return p?.items && typeof p.items === 'object' ? p.items : {};
  } catch {
    return {};
  }
}

function writeChecklist(items: Record<string, boolean>) {
  try {
    localStorage.setItem(STORAGE_CHECKLIST, JSON.stringify({ items }));
  } catch {
    /* ignore */
  }
}

export function ParcoursCandidatClient() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecklist(readChecklist());
    setMounted(true);
  }, []);

  const toggleItem = useCallback((id: string) => {
    setChecklist((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      writeChecklist(next);
      return next;
    });
  }, []);

  const resetChecklist = useCallback(() => {
    setChecklist({});
    try {
      localStorage.removeItem(STORAGE_CHECKLIST);
      localStorage.removeItem(STORAGE_PROGRESS);
    } catch {
      /* ignore */
    }
  }, []);

  const doneCount = useMemo(() => CHECKLIST_IDS.filter((id) => checklist[id]).length, [checklist]);

  const sampleModules = useMemo(() => fasciculesList.slice(0, 4), []);

  return (
    <div className='container pb-24 pt-10 md:pt-14'>
      <nav className='mb-6 text-sm text-gray-500'>
        <Link href='/entrainement' className='text-cyan-400 hover:underline'>
          Entraînement
        </Link>
        <span className='mx-2'>/</span>
        <span className='text-gray-400'>Parcours candidat</span>
      </nav>

      <SectionTitle
        badge='PARCOURS'
        badgeClassName='bg-gold-500/20 text-gold-200'
        title='Parcours candidat — 26 semaines'
        subtitle='Trois phases pour enchaîner fondations, approfondissement et simulation examen OPJ. Cochez la checklist : tout reste dans ce navigateur (localStorage).'
        className='mb-10 max-w-3xl'
      />

      <div className='mb-10 flex flex-wrap items-center gap-4'>
        <GlassCard padding='p-4' className='inline-flex items-center gap-3 border-white/10'>
          <div
            className='relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/40 bg-gold-500/10 text-sm font-bold text-gold-200'
            aria-label='Progression checklist'
          >
            {mounted ? `${doneCount}/${CHECKLIST_IDS.length}` : '—'}
          </div>
          <div className='text-sm text-gray-400'>
            <p className='font-medium text-gray-200'>Checklist locale</p>
            <p className='text-xs'>Aucune donnée envoyée au serveur.</p>
          </div>
        </GlassCard>
        <button
          type='button'
          onClick={resetChecklist}
          className='inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/10'
        >
          <RotateCcw className='h-4 w-4' aria-hidden />
          Réinitialiser
        </button>
      </div>

      <div className='space-y-14'>
        {PHASES.map((phase, pi) => (
          <section key={phase.id} aria-labelledby={`phase-${phase.id}`}>
            <div className='mb-6 flex flex-col gap-2 border-l-4 border-gold-500/50 pl-4'>
              <p className='text-xs font-bold uppercase tracking-widest text-gold-200/90'>Phase {pi + 1}</p>
              <h2 id={`phase-${phase.id}`} className='font-display text-2xl font-bold text-white'>
                {phase.title}{' '}
                <span className='text-base font-medium text-gray-500'>({phase.weeks})</span>
              </h2>
              <p className='max-w-3xl text-sm leading-relaxed text-gray-400'>{phase.objective}</p>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              {phase.cards.map((c) => (
                <Link
                  key={c.href + c.title}
                  href={c.href}
                  className='group rounded-xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-500/40 hover:bg-cyan-500/[0.06]'
                >
                  <p className='font-semibold text-white group-hover:text-cyan-200'>{c.title}</p>
                  <p className='mt-2 text-sm text-gray-500'>{c.description}</p>
                  <span className='mt-3 inline-block text-xs font-medium text-cyan-400'>Ouvrir →</span>
                </Link>
              ))}
            </div>
            {phase.id === 'cartographier' ? (
              <div className='mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4'>
                <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>Exemples de modules</p>
                <ul className='mt-3 flex flex-wrap gap-2'>
                  {sampleModules.map((m) => (
                    <li key={m.id}>
                      <Link
                        href={`/cours/modules/${m.id}`}
                        className='rounded-lg border border-white/10 px-3 py-1.5 text-xs text-cyan-300 hover:border-cyan-500/40'
                      >
                        F{String(m.numero).padStart(2, '0')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <GlassCard className='mt-14 p-6' padding=''>
        <h3 className='font-display text-lg font-bold text-white'>Checklist de révision</h3>
        <p className='mt-1 text-sm text-gray-500'>Cochez au fil de l’eau ; l’état est mémorisé sur cet appareil.</p>
        <ul className='mt-6 space-y-3'>
          {CHECKLIST_IDS.map((id) => {
            const isDone = Boolean(checklist[id]);
            return (
              <li key={id}>
                <button
                  type='button'
                  onClick={() => toggleItem(id)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition',
                    isDone ? 'border-emerald-500/40 bg-emerald-500/[0.08]' : 'border-white/10 hover:bg-white/[0.04]',
                  )}
                >
                  {isDone ? (
                    <Check className='mt-0.5 h-5 w-5 shrink-0 text-emerald-400' aria-hidden />
                  ) : (
                    <Circle className='mt-0.5 h-5 w-5 shrink-0 text-gray-500' aria-hidden />
                  )}
                  <span className={cn(isDone ? 'text-emerald-100' : 'text-gray-300')}>{CHECKLIST_LABELS[id]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </GlassCard>
    </div>
  );
}
