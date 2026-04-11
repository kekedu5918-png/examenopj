import Link from 'next/link';
import {
  BookMarked,
  BookOpen,
  ClipboardList,
  FileText,
  GraduationCap,
  Layers,
  Scale,
  Sparkles,
} from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/utils/cn';

type Rubrique = {
  href: string;
  title: string;
  description: string;
  icon: typeof BookOpen;
  accent: string;
  border: string;
};

const RUBRIQUES: Rubrique[] = [
  {
    href: '/cours/modules',
    title: 'Fiches & modules',
    description: 'Priorité examen (P0/P1) ou index officiel F01–F15 — fondamentaux en appui.',
    icon: Layers,
    accent: 'from-cyan-500/20 to-transparent',
    border: 'border-cyan-500/25 hover:border-cyan-400/40',
  },
  {
    href: '/cours/enquetes',
    title: 'Enquêtes type examen',
    description: 'Sujet, articulation, PV et rapport — planches complètes.',
    icon: ClipboardList,
    accent: 'from-violet-500/15 to-transparent',
    border: 'border-violet-500/25 hover:border-violet-400/35',
  },
  {
    href: '/cours/pv',
    title: 'Procès-verbaux ME1',
    description: 'Deux colonnes, mentions légales, modèles et textes à trous.',
    icon: FileText,
    accent: 'from-emerald-500/15 to-transparent',
    border: 'border-emerald-500/25 hover:border-emerald-400/35',
  },
  {
    href: '/cours/modeles-pv',
    title: 'Modèles de PV',
    description: 'Bibliothèque complète, mise en forme officielle.',
    icon: BookMarked,
    accent: 'from-sky-500/15 to-transparent',
    border: 'border-sky-500/25 hover:border-sky-400/35',
  },
  {
    href: '/fondamentaux',
    title: 'Fondamentaux procédure',
    description: 'GAV, cadres, perquisitions, auditions — socle OPJ.',
    icon: GraduationCap,
    accent: 'from-amber-500/12 to-transparent',
    border: 'border-amber-500/25 hover:border-amber-400/35',
  },
  {
    href: '/epreuves/epreuve-2',
    title: 'Épreuve 2 — attendu du jury',
    description: 'Articulation, PV, rapport : critères et erreurs fréquentes.',
    icon: Sparkles,
    accent: 'from-rose-500/10 to-transparent',
    border: 'border-rose-500/20 hover:border-rose-400/30',
  },
];

type Props = {
  infractionCount: number;
};

/**
 * Hub principal du module Cours — rubrique Infractions mise en avant (Épreuve 1).
 */
export function CoursHubRefonte({ infractionCount }: Props) {
  return (
    <div className='space-y-10'>
      {/* Hero */}
      <header className='relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-br from-navy-900/95 via-navy-950 to-[#050a14] p-8 shadow-2xl shadow-black/40 ring-1 ring-white/[0.06] md:p-12'>
        <div className='pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl' aria-hidden />
        <div className='pointer-events-none absolute -bottom-20 left-0 h-64 w-64 rounded-full bg-gold-500/8 blur-3xl' aria-hidden />
        <div className='relative'>
          <p className='text-[11px] font-bold uppercase tracking-[0.28em] text-cyan-300/90'>Module cours</p>
          <h1 className='mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl'>
            Tout pour structurer{' '}
            <span className='bg-gradient-to-r from-cyan-200 via-white to-gold-200/90 bg-clip-text text-transparent'>
              ta préparation OPJ
            </span>
          </h1>
          <p className='mt-4 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg'>
            Une entrée unique : qualifications pénales, fiches programme, procédure et mises en situation — sans te
            perdre dans l’ordre des fascicules.
          </p>
        </div>
      </header>

      {/* Rubrique spéciale — Infractions */}
      <section aria-labelledby='cours-rubrique-infractions' className='relative'>
        <div className='mb-4 flex flex-col items-center gap-2 sm:flex-row'>
          <span className='hidden h-px flex-1 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent sm:block' aria-hidden />
          <div className='text-center'>
            <span className='text-[11px] font-bold uppercase tracking-[0.2em] text-rose-300/90'>Rubrique Infractions</span>
            <p className='mt-1 text-xs text-slate-500'>
              Entrée dédiée dans le menu principal (à côté de Cours), pas mélangée aux fiches générales.
            </p>
          </div>
          <span className='hidden h-px flex-1 bg-gradient-to-l from-transparent via-rose-500/40 to-transparent sm:block' aria-hidden />
        </div>

        <Link
          href='/infractions'
          className='group block focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950'
        >
          <div
            className={cn(
              'relative overflow-hidden rounded-3xl border-2 border-rose-500/35 bg-gradient-to-br from-rose-950/50 via-navy-950/80 to-navy-950 p-8 shadow-xl shadow-rose-950/20 transition',
              'hover:border-rose-400/50 hover:shadow-rose-900/30 md:p-10',
            )}
          >
            <div
              className='pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-rose-500/15 blur-3xl transition group-hover:bg-rose-400/20'
              aria-hidden
            />
            <div className='pointer-events-none absolute bottom-0 left-1/3 h-32 w-64 rounded-full bg-amber-500/10 blur-2xl' aria-hidden />

            <div className='relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between'>
              <div className='flex min-w-0 flex-1 gap-5'>
                <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-500/20 text-rose-100 shadow-lg shadow-rose-950/50 md:h-20 md:w-20'>
                  <Scale className='h-9 w-9 md:h-11 md:w-11' aria-hidden />
                </div>
                <div className='min-w-0'>
                  <h2
                    id='cours-rubrique-infractions'
                    className='font-display text-2xl font-bold text-white md:text-3xl'
                  >
                    Infractions — référentiel Épreuve 1
                  </h2>
                  <p className='mt-2 text-sm leading-relaxed text-rose-100/85 md:text-base'>
                    Tableau filtrable, fiches détaillées (élément moral, matériel, peines), vues liste et flashcards.
                    C’est la colonne vertébrale de la qualification juridique.
                  </p>
                  <ul className='mt-4 flex flex-wrap gap-2'>
                    <li className='rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-200'>
                      {infractionCount} infractions indexées
                    </li>
                    <li className='rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-200'>
                      Probabilité examen
                    </li>
                    <li className='rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-200'>
                      Familles (personnes, biens…)
                    </li>
                  </ul>
                </div>
              </div>

              <div className='flex shrink-0 flex-col items-stretch gap-3 sm:flex-row lg:flex-col'>
                <span className='inline-flex items-center justify-center rounded-2xl border border-rose-400/40 bg-rose-500/20 px-8 py-4 text-center text-base font-bold text-white transition group-hover:bg-rose-500/30'>
                  Ouvrir le référentiel
                  <span className='ml-2 inline-block transition group-hover:translate-x-1' aria-hidden>
                    →
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Autres rubriques du module */}
      <section aria-labelledby='cours-autres-rubriques'>
        <h2 id='cours-autres-rubriques' className='font-display text-xl font-bold text-white md:text-2xl'>
          Le reste du module cours
        </h2>
        <p className='mt-2 max-w-2xl text-sm text-slate-500'>
          Procédure, rédaction, programme officiel : tout est accessible depuis cette grille — même logique que ta
          préparation (qualifs → fiches → actes).
        </p>

        <ul className='mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
          {RUBRIQUES.map((r) => {
            const Icon = r.icon;
            return (
              <li key={r.href}>
                <Link href={r.href} className='block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950'>
                  <GlassCard
                    hover
                    radius='3xl'
                    topGlow
                    padding='p-6'
                    className={cn(
                      'h-full border bg-gradient-to-br transition',
                      r.border,
                      r.accent,
                    )}
                  >
                    <div className='mb-3 flex items-center gap-3'>
                      <span className='flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-cyan-200'>
                        <Icon className='h-5 w-5' aria-hidden />
                      </span>
                      <h3 className='font-sans text-lg font-extrabold leading-tight text-white'>{r.title}</h3>
                    </div>
                    <p className='text-sm leading-relaxed text-slate-400'>{r.description}</p>
                    <p className='mt-4 text-sm font-semibold text-cyan-300/90'>Accéder →</p>
                  </GlassCard>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className='mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-center text-sm text-slate-500'>
          <span>Sommaire officiel F01–F15 :</span>
          <Link
            href='/programme'
            className='font-semibold text-cyan-400 underline-offset-2 transition hover:text-cyan-300 hover:underline'
          >
            Programme national
          </Link>
        </div>
      </section>
    </div>
  );
}
