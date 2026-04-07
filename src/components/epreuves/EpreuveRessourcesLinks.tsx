import Link from 'next/link';
import { BookOpen, ClipboardList, GraduationCap, Layers, ListChecks, Sparkles } from 'lucide-react';

import { cn } from '@/utils/cn';

export type EpreuveId = '1' | '2' | '3';

type Lien = {
  href: string;
  label: string;
  hint: string;
  icon: typeof BookOpen;
};

const LIENS: Record<EpreuveId, Lien[]> = {
  '1': [
    {
      href: '/infractions',
      label: 'Référentiel infractions',
      hint: 'Qualifications, éléments constitutifs, PRQC',
      icon: Layers,
    },
    {
      href: '/cours/modules',
      label: 'Modules F01–F15',
      hint: 'DPG / DPS — fiches par thème du programme',
      icon: BookOpen,
    },
    {
      href: '/fondamentaux',
      label: 'Fondamentaux',
      hint: 'Classification, éléments constitutifs, grands principes',
      icon: GraduationCap,
    },
    {
      href: '/quiz?epreuve=1',
      label: 'Quiz ciblés Épreuve 1',
      hint: 'QCM filtrés droit pénal / fascicules',
      icon: Sparkles,
    },
    {
      href: '/flashcards',
      label: 'Flashcards',
      hint: 'Mémorisation des titres et articles',
      icon: ListChecks,
    },
  ],
  '2': [
    {
      href: '/cours/enquetes',
      label: 'Enquêtes thématiques',
      hint: 'Mises en situation, articulation, cadres',
      icon: ClipboardList,
    },
    {
      href: '/cours/modules/f11',
      label: 'Module F11 — Cadres & actes',
      hint: 'Flagrance, GAV, perquisitions, CPP',
      icon: BookOpen,
    },
    {
      href: '/entrainement/articulation',
      label: 'Articulation de procédure',
      hint: 'Entraînement cartouches et chronologie',
      icon: Layers,
    },
    {
      href: '/entrainement/redaction-pv',
      label: 'Rédaction de PV',
      hint: 'Atelier et modèles ME1',
      icon: ClipboardList,
    },
    {
      href: '/quiz?epreuve=2',
      label: 'Quiz ciblés Épreuve 2',
      hint: 'Procédure et fascicules utiles',
      icon: Sparkles,
    },
  ],
  '3': [
    {
      href: '/guide-revision-opj',
      label: 'Guide de révision',
      hint: 'Plan global, erreurs fréquentes, oral',
      icon: BookOpen,
    },
    {
      href: '/cours/enquetes',
      label: 'Enquêtes (mise en situation)',
      hint: 'Structurer un exposé de faits et de procédure',
      icon: ClipboardList,
    },
    {
      href: '/entrainement',
      label: 'Hub entraînement',
      hint: 'Quiz, flashcards, parcours candidat',
      icon: Sparkles,
    },
    {
      href: '/sujets-blancs',
      label: 'Sujets blancs',
      hint: 'Session complète type examen',
      icon: GraduationCap,
    },
    {
      href: '/quiz?epreuve=3',
      label: 'Quiz ciblés Épreuve 3',
      hint: 'Synthèse et thèmes transversaux',
      icon: Sparkles,
    },
  ],
};

const TITRES: Record<EpreuveId, string> = {
  '1': 'Pour réviser l’Épreuve 1 sur le site',
  '2': 'Pour réviser l’Épreuve 2 sur le site',
  '3': 'Pour réviser l’Épreuve 3 sur le site',
};

type Props = {
  epreuve: EpreuveId;
  className?: string;
};

/**
 * Bloc « fil d’épreuve » : liens vers théorie, pratique et entraînement cohérents avec l’épreuve.
 */
export function EpreuveRessourcesLinks({ epreuve, className }: Props) {
  const liens = LIENS[epreuve];
  const titre = TITRES[epreuve];

  return (
    <section
      className={cn(
        'rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] md:p-6',
        className,
      )}
      aria-labelledby={`epreuve-res-${epreuve}`}
    >
      <h2 id={`epreuve-res-${epreuve}`} className='font-display text-lg font-bold text-white md:text-xl'>
        {titre}
      </h2>
      <p className='mt-2 text-sm text-slate-400'>
        Raccourcis vers les contenus les plus utiles — théorie, modules et entraînement alignés sur cette épreuve.
      </p>
      <ul className='mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {liens.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className='group flex h-full flex-col rounded-xl border border-white/10 bg-navy-950/80 p-4 transition hover:border-cyan-500/35 hover:bg-white/[0.05]'
              >
                <span className='flex items-center gap-2 text-sm font-semibold text-cyan-200/95'>
                  <Icon className='h-4 w-4 shrink-0 text-cyan-400/90' aria-hidden />
                  {item.label}
                </span>
                <span className='mt-2 text-xs leading-relaxed text-slate-500 group-hover:text-slate-400'>{item.hint}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
