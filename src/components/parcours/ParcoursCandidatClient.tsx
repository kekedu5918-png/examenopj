'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Check, Circle, ClipboardList, FlaskConical, RotateCcw, Trophy } from 'lucide-react';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { RevisionThemesJourney } from '@/components/parcours/RevisionThemesJourney';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { cn } from '@/utils/cn';

const STORAGE_PROGRESS = 'examenopj:parcours-candidat-v2-progress';
const STORAGE_CHECKLIST = 'examenopj:parcours-candidat-v2-checklist';

const EXAM_DATE = new Date('2026-06-11T08:00:00');

function weeksUntilExam(): number {
  const now = new Date();
  const diff = EXAM_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (7 * 24 * 60 * 60 * 1000)));
}

function daysUntilExam(): number {
  const now = new Date();
  const diff = EXAM_DATE.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

type PhaseCard = { href: string; title: string; description: string };

type Phase = {
  id: string;
  num: number;
  title: string;
  weeks: string;
  objective: string;
  cards: PhaseCard[];
  icon: typeof BookOpen;
  color: {
    border: string;
    bg: string;
    badge: string;
    dot: string;
    ring: string;
    iconBg: string;
    iconText: string;
    cardHover: string;
  };
};

const PHASES: Phase[] = [
  {
    id: 'cartographier',
    num: 1,
    title: 'Cartographier',
    weeks: 'Semaines 1–8',
    objective: 'Parcourir une première fois tout le programme : repères, angles morts, premier quiz après chaque gros thème.',
    icon: BookOpen,
    color: {
      border: 'border-l-cyan-500',
      bg: 'from-cyan-500/10 to-transparent',
      badge: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/35',
      dot: 'bg-cyan-400',
      ring: 'stroke-cyan-400',
      iconBg: 'bg-cyan-500/15',
      iconText: 'text-cyan-300',
      cardHover: 'hover:border-cyan-500/40 hover:bg-cyan-500/[0.06]',
    },
    cards: [
      { href: '/cours/modules', title: 'Modules F01–F15', description: 'Fiches synthèse officielles : une passe lecture pour cartographier le programme.' },
      { href: '/fondamentaux', title: 'Fiches fondamentaux', description: 'Notions procédure / pénales à avoir immédiatement disponibles.' },
      { href: '/quiz', title: 'Quiz par thème', description: 'Après chaque module, 10 questions pour verrouiller les lacunes.' },
      { href: '/infractions', title: 'Référentiel infractions (Épreuve 1)', description: 'Éléments constitutifs et titres du programme : socle DPS pour dissertation et cas.' },
    ],
  },
  {
    id: 'approfondir',
    num: 2,
    title: 'Approfondir',
    weeks: 'Semaines 9–20',
    objective: 'Travailler la mémoire active, les cas complets et la procédure (F11–F15) en parallèle du DPG/DPS.',
    icon: FlaskConical,
    color: {
      border: 'border-l-amber-500',
      bg: 'from-amber-500/10 to-transparent',
      badge: 'bg-amber-500/15 text-amber-200 border-amber-500/35',
      dot: 'bg-amber-400',
      ring: 'stroke-amber-400',
      iconBg: 'bg-amber-500/15',
      iconText: 'text-amber-300',
      cardHover: 'hover:border-amber-500/40 hover:bg-amber-500/[0.06]',
    },
    cards: [
      { href: '/flashcards', title: 'Flashcards', description: 'Mémorisation quotidienne sur le même référentiel que le récap.' },
      { href: '/entrainement/recapitulatif', title: 'Récap priorité examen (Épreuve 1)', description: "Tableaux comparatifs PRQC ; densifier avant l'écrit DPS." },
      { href: '/cours/enquetes', title: 'Enquêtes — ordre Alpha → Bravo → Charlie', description: 'Même fil que le document centre ; les autres planches du hub sont un complément.' },
      { href: '/epreuves/epreuve-2', title: 'Méthode Épreuve 2 — dossier', description: 'Cartouches, articulation qualification/actes et attentes correcteurs.' },
    ],
  },
  {
    id: 'concours',
    num: 3,
    title: 'Examen OPJ',
    weeks: 'Semaines 21–26',
    objective: 'Chronométrage, sujets blancs E1+E2+E3, oral enregistré : mode « examen réel ».',
    icon: Trophy,
    color: {
      border: 'border-l-emerald-500',
      bg: 'from-emerald-500/10 to-transparent',
      badge: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/35',
      dot: 'bg-emerald-400',
      ring: 'stroke-emerald-400',
      iconBg: 'bg-emerald-500/15',
      iconText: 'text-emerald-300',
      cardHover: 'hover:border-emerald-500/40 hover:bg-emerald-500/[0.06]',
    },
    cards: [
      { href: '/sujets-blancs', title: 'Sujets blancs (les 3 épreuves)', description: 'Même affaire fictive : écrit DPS, dossier procédure, oral — lien direct avec les fiches F.' },
      { href: '/entrainement/articulation', title: 'Articulation Épreuve 2', description: 'Consolidation cartouches et PV avant passage en sujet blanc.' },
      { href: '/epreuves/epreuve-3', title: 'Préparation Épreuve 3 (oral)', description: 'Synthèse, réponses jury et posture professionnelle.' },
      { href: '/guide-revision-opj', title: 'Guide de révision', description: 'Rappels de méthode et plan sur les dernières semaines.' },
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

const CHECKLIST_LABELS: Record<(typeof CHECKLIST_IDS)[number], { label: string; phase: number }> = {
  'lu-f09-f10': { label: 'Relu F09 (éléments constitutifs) et F10 (peines / CA) au moins une fois', phase: 1 },
  'parcours-f01-f07': { label: 'Parcouru une première fois les thèmes F01–F07 (personnes, biens, route…)', phase: 1 },
  'procedure-f11-f15': { label: 'Attaqué la procédure F11–F15 (PJ, instruction, juridictions, nullités)', phase: 2 },
  'quiz-regulier': { label: 'Quiz courts (10 questions) au moins 3× / semaine en phase intense', phase: 2 },
  'flashcards-15min': { label: 'Séances flashcards 15 min / jour pendant 2 semaines d\'affilée', phase: 2 },
  'enquete-alpha': { label: 'Réalisé l\'enquête Alpha (lecture + restitution écrite)', phase: 2 },
  'sujet-blanc-1': { label: 'Au moins un sujet blanc chronométré complet', phase: 3 },
  'oral-enregistre': { label: 'Au moins un oral enregistré et réécouté avec grille de correction', phase: 3 },
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
  const weeks = mounted ? weeksUntilExam() : null;
  const days = mounted ? daysUntilExam() : null;

  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.parcours} pad='default' innerClassName='pt-8 md:pt-12'>
        <nav className='mb-8 flex flex-wrap items-center gap-2 text-sm' aria-label="Fil d'Ariane">
          <Link
            href='/entrainement'
            className='rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-medium text-slate-300 transition hover:border-cyan-500/30 hover:text-white'
          >
            Entraînement
          </Link>
          <span className='text-slate-600' aria-hidden>
            /
          </span>
          <span className='rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 font-semibold text-cyan-200'>
            Parcours candidat
          </span>
        </nav>

        <SectionTitle
          badge='PARCOURS 26 SEMAINES'
          badgeClassName='text-amber-200'
          title='Ta feuille de route jusqu&apos;au jury'
          titleGradient
          size='display'
          subtitle='Trois phases — cartographier, approfondir, mode examen — avec les bons outils au bon moment.'
          className='mb-10 max-w-3xl'
        />

        <RevisionThemesJourney />

        {/* Bandeau compteur + progression */}
        <div className='mb-12 flex flex-wrap gap-4'>
        {/* ProgressRing checklist */}
        <div className='flex flex-1 items-center gap-4 rounded-3xl border border-white/[0.09] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 shadow-lg shadow-black/20 ring-1 ring-white/[0.04] min-w-[min(100%,280px)]'>
          <ProgressRing
            value={mounted ? doneCount : 0}
            max={CHECKLIST_IDS.length}
            size={72}
            strokeWidth={7}
            colorClass='stroke-emerald-400'
          >
            <span className='text-sm font-bold text-white'>
              {mounted ? `${doneCount}/${CHECKLIST_IDS.length}` : '—'}
            </span>
          </ProgressRing>
          <div>
            <p className='font-semibold text-white'>Checklist locale</p>
            <p className='mt-0.5 text-xs text-gray-500'>Stocké dans ce navigateur uniquement</p>
          </div>
        </div>

        {/* Compteur J-11 juin */}
        {mounted && weeks !== null && (
          <div className='flex flex-1 items-center gap-4 rounded-3xl border border-rose-500/30 bg-gradient-to-br from-rose-500/[0.12] to-transparent p-5 shadow-lg shadow-black/20 ring-1 ring-rose-500/15 min-w-[min(100%,280px)]'>
            <div className='text-center'>
              <p className='text-3xl font-black tabular-nums text-white'>{weeks}</p>
              <p className='text-xs font-semibold uppercase tracking-wide text-rose-300'>semaines</p>
            </div>
            <div>
              <p className='font-semibold text-white'>avant l&apos;examen OPJ</p>
              <p className='mt-0.5 text-xs text-gray-400'>
                11 juin 2026 — {days} jour{days !== 1 ? 's' : ''} J
              </p>
            </div>
          </div>
        )}

        <button
          type='button'
          onClick={resetChecklist}
          className='ml-auto self-start rounded-2xl border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:bg-white/[0.08]'
        >
          <RotateCcw className='mr-2 inline h-4 w-4' aria-hidden />
          Réinitialiser
        </button>
        </div>

        {/* Timeline des 3 phases */}
        <div className='relative space-y-8'>
        {/* Ligne verticale de connexion */}
        <div className='absolute left-[1.875rem] top-10 hidden h-[calc(100%-5rem)] w-0.5 bg-gradient-to-b from-cyan-500/40 via-amber-500/40 to-emerald-500/40 md:block' aria-hidden />

        {PHASES.map((phase) => {
          const PhaseIcon = phase.icon;
          const phaseItems = CHECKLIST_IDS.filter((id) => CHECKLIST_LABELS[id].phase === phase.num);
          const phaseDone = phaseItems.filter((id) => checklist[id]).length;

          return (
            <section
              key={phase.id}
              className={cn(
                'relative overflow-hidden rounded-3xl border border-l-[3px] bg-gradient-to-r to-transparent shadow-xl shadow-black/25 ring-1 ring-white/[0.05]',
                phase.color.border,
                phase.color.bg,
                'border-white/[0.09]',
              )}
              aria-labelledby={`phase-${phase.id}`}
            >
              <div className='pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent' aria-hidden />
              {/* En-tête de phase */}
              <div className='flex items-start gap-4 p-5 md:p-6'>
                {/* Icône phase */}
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl',
                    phase.color.iconBg,
                  )}
                >
                  <PhaseIcon className={cn('h-6 w-6', phase.color.iconText)} strokeWidth={1.75} />
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <span
                      className={cn(
                        'rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide',
                        phase.color.badge,
                      )}
                    >
                      Phase {phase.num}
                    </span>
                    <span className='text-sm text-gray-500'>{phase.weeks}</span>
                    {phaseItems.length > 0 && (
                      <span className='ml-auto flex items-center gap-1 text-xs text-gray-500'>
                        <span
                          className={cn(
                            'h-1.5 w-1.5 rounded-full',
                            phaseDone === phaseItems.length ? 'bg-emerald-400' : phase.color.dot,
                          )}
                        />
                        {phaseDone}/{phaseItems.length} étapes
                      </span>
                    )}
                  </div>
                  <h2
                    id={`phase-${phase.id}`}
                    className='mt-2 font-sans text-xl font-extrabold tracking-tight text-white md:text-2xl'
                  >
                    {phase.title}
                  </h2>
                  <p className='mt-1 max-w-2xl text-sm leading-relaxed text-gray-400'>{phase.objective}</p>
                </div>
              </div>

              {/* Cards outils */}
              <div className='grid gap-3 px-5 pb-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:px-6'>
                {phase.cards.map((c) => (
                  <Link
                    key={c.href + c.title}
                    href={c.href}
                    className={cn(
                      'group rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-4 shadow-md shadow-black/20 transition hover:-translate-y-0.5',
                      phase.color.cardHover,
                    )}
                  >
                    <p className='font-semibold text-white'>{c.title}</p>
                    <p className='mt-1.5 text-xs leading-relaxed text-slate-500'>{c.description}</p>
                    <span className='mt-3 inline-flex items-center gap-1 text-xs font-semibold text-cyan-400/90 transition group-hover:gap-2'>
                      Ouvrir <span aria-hidden>→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
        </div>

        {/* Checklist de révision */}
        <div className='mt-14 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 shadow-xl shadow-black/25 ring-1 ring-white/[0.04] md:p-8'>
        <div className='flex items-center gap-3'>
          <ClipboardList className='h-5 w-5 text-gold-300' />
          <h3 className='font-sans text-lg font-extrabold text-white'>Checklist de révision</h3>
          {mounted && (
            <span className='ml-auto text-xs text-gray-500'>
              {doneCount}/{CHECKLIST_IDS.length} validées
            </span>
          )}
        </div>
        <p className='mt-1 text-sm text-slate-500'>Coche au fil de l&apos;eau — l&apos;état est mémorisé sur cet appareil.</p>

        {/* Mini progress bar */}
        {mounted && (
          <div className='mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.08]'>
            <div
              className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-[width] duration-500'
              style={{ width: `${(doneCount / CHECKLIST_IDS.length) * 100}%` }}
              aria-hidden
            />
          </div>
        )}

        <ul className='mt-5 space-y-2.5'>
          {CHECKLIST_IDS.map((id) => {
            const isDone = Boolean(checklist[id]);
            const meta = CHECKLIST_LABELS[id];
            const phaseColor = [
              'text-cyan-400',
              'text-amber-400',
              'text-emerald-400',
            ][meta.phase - 1] ?? 'text-gray-400';
            return (
              <li key={id}>
                <button
                  type='button'
                  onClick={() => toggleItem(id)}
                  className={cn(
                    'flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition',
                    isDone
                      ? 'border-emerald-500/40 bg-emerald-500/[0.08]'
                      : 'border-white/[0.09] hover:border-white/[0.14] hover:bg-white/[0.04]',
                  )}
                >
                  {isDone ? (
                    <Check className='mt-0.5 h-5 w-5 shrink-0 text-emerald-400' aria-hidden />
                  ) : (
                    <Circle className='mt-0.5 h-5 w-5 shrink-0 text-gray-500' aria-hidden />
                  )}
                  <span className={cn(isDone ? 'text-emerald-100' : 'text-gray-300')}>
                    {meta.label}
                  </span>
                  <span className={cn('ml-auto shrink-0 text-[10px] font-bold uppercase', phaseColor)}>
                    Ph. {meta.phase}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        </div>
    </InteriorPageShell>
  );
}
