import Link from 'next/link';

import { getFasciculesOrderedForCandidate } from '@/data/cours-candidate-order';
import { getFasciculeExamProfile } from '@/data/exam-competency-map';
import { DOMAIN_LABELS, type FasciculeMetadata } from '@/data/fascicules-list';
import type { Domain } from '@/data/fascicules-types';
import { cn } from '@/utils/cn';

const DOMAIN_BADGE: Record<Domain, string> = {
  DPS: 'border-red-400/30 bg-red-500/10 text-red-200',
  DPG: 'border-violet-400/30 bg-violet-500/10 text-violet-200',
  PROCEDURE: 'border-blue-400/30 bg-blue-500/10 text-blue-200',
};

const FONDAMENTAUX_ACCENTS: { href: string; label: string }[] = [
  { href: '/fondamentaux/garde-a-vue', label: 'Garde à vue' },
  { href: '/fondamentaux/cadres-enquete', label: 'Cadres d’enquête' },
  { href: '/fondamentaux/perquisition', label: 'Perquisitions & scellés' },
  { href: '/fondamentaux/mandats-justice', label: 'Mandats' },
  { href: '/fondamentaux/audition', label: 'Auditions' },
  { href: '/fondamentaux/controle-identite', label: 'Contrôles d’identité' },
];

function metaDomainToKey(domaine: FasciculeMetadata['domaine']): Domain {
  if (domaine === 'DPS') return 'DPS';
  if (domaine === 'DPG') return 'DPG';
  return 'PROCEDURE';
}

function EpreuveChips({ nums }: { nums: readonly (1 | 2 | 3)[] }) {
  const sorted = [...nums].sort((a, b) => a - b);
  return (
    <span className='flex flex-wrap gap-1'>
      {sorted.map((n) => (
        <span
          key={n}
          className='rounded border border-cyan-500/30 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-bold text-cyan-100'
        >
          Épr. {n}
        </span>
      ))}
    </span>
  );
}

type CoursHubLogiqueCandidatProps = {
  /** Sur la page modules : rappel court + liens, sans dupliquer la grille P0. */
  variant?: 'full' | 'compact';
};

export function CoursHubLogiqueCandidat({ variant = 'full' }: CoursHubLogiqueCandidatProps) {
  const ordered = getFasciculesOrderedForCandidate();
  const p0 = ordered.filter((m) => getFasciculeExamProfile(m.id).priority === 'P0');

  if (variant === 'compact') {
    return (
      <section
        className='mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6'
        aria-labelledby='cours-logique-compact'
      >
        <h2 id='cours-logique-compact' className='font-display text-lg font-bold text-white'>
          Logique d’étude (pas l’ordre F01–F15)
        </h2>
        <p className='mt-2 max-w-3xl text-sm text-gray-400'>
          Les fiches ci‑dessous sont triées par <strong className='font-semibold text-gray-200'>priorité concours</strong>{' '}
          par défaut. Les <strong className='font-semibold text-gray-200'>fondamentaux</strong> (actes, GAV, mandats) restent
          le socle à côté du droit pénal spécial.
        </p>
        <div className='mt-4 flex flex-wrap gap-2'>
          <Link
            href='/cours#cours-methode-title'
            className='inline-flex rounded-lg border border-cyan-500/35 bg-cyan-500/10 px-3 py-1.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-500/15'
          >
            Méthode 4 temps (page Cours) →
          </Link>
          <Link
            href='/cours#cours-logique-candidat'
            className='inline-flex rounded-lg border border-gold-500/35 bg-gold-500/10 px-3 py-1.5 text-sm font-medium text-gold-100 transition hover:bg-gold-500/15'
          >
            Carte P0 + fondamentaux (page Cours) →
          </Link>
          <Link
            href='/fondamentaux'
            className='inline-flex rounded-lg border border-violet-500/35 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-100 transition hover:bg-violet-500/15'
          >
            Toutes les fiches fondamentaux →
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className='mt-12' aria-labelledby='cours-logique-candidat'>
      <h2 id='cours-logique-candidat' className='font-display text-xl font-bold text-white md:text-2xl'>
        Une logique candidat : d’abord l’essentiel
      </h2>
      <p className='mt-2 max-w-3xl text-sm text-gray-400'>
        Le programme officiel est rangé en fascicules F01–F15 ; pour réviser efficacement, ce n’est pas l’ordre le plus
        naturel. Ici : les{' '}
        <strong className='font-semibold text-gray-200'>fondamentaux opérationnels</strong> (OPJ au quotidien), puis les{' '}
        <strong className='font-semibold text-gray-200'>thèmes prioritaires au concours</strong> (P0), avec les épreuves où
        ils pèse le plus. Le numéro F reste indiqué pour croiser avec votre documentation.
      </p>

      <div className='mt-6 rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-500/10 to-transparent p-5 md:p-6'>
        <h3 className='text-sm font-bold uppercase tracking-wider text-violet-200'>Fondamentaux à maîtriser</h3>
        <p className='mt-2 text-sm text-gray-400'>
          Socle procédural et actes ; puis le référentiel infractions pour l’élément moral (et le matériel) tel que dans le
          programme — à apprendre par cœur pour l’écrit.
        </p>
        <ul className='mt-4 flex flex-wrap gap-2'>
          <li>
            <Link
              href='/fondamentaux'
              className='inline-flex rounded-xl border border-violet-400/40 bg-violet-500/15 px-4 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-500/25'
            >
              Toutes les fiches fondamentaux →
            </Link>
          </li>
          <li>
            <Link
              href='/infractions'
              className='inline-flex rounded-xl border border-rose-500/35 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-100 transition hover:bg-rose-500/20'
            >
              Infractions (élément moral mot pour mot) →
            </Link>
          </li>
          {FONDAMENTAUX_ACCENTS.map((f) => (
            <li key={f.href}>
              <Link
                href={f.href}
                className='inline-flex rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-gray-200 transition hover:border-white/25 hover:bg-white/[0.08]'
              >
                {f.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-8'>
        <div className='flex flex-col gap-2 md:flex-row md:items-end md:justify-between'>
          <div>
            <h3 className='font-display text-lg font-bold text-white'>Thèmes prioritaires au concours (P0)</h3>
            <p className='mt-1 max-w-2xl text-sm text-gray-500'>
              Ordre recommandé selon la pression aux trois épreuves — le numéro F n’est qu’un repère de recoupement.
            </p>
          </div>
          <Link
            href='/cours/modules'
            className='shrink-0 text-sm font-semibold text-gold-200 hover:text-gold-100 hover:underline'
          >
            Voir toutes les fiches avec tri concours →
          </Link>
        </div>

        <ul className='mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3'>
          {p0.map((m) => {
            const prof = getFasciculeExamProfile(m.id);
            const d = metaDomainToKey(m.domaine);
            return (
              <li key={m.id}>
                <Link
                  href={`/cours/modules/${m.id}`}
                  className='group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-gold-500/35 hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500/40'
                >
                  <div className='flex flex-wrap items-center gap-2'>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                        DOMAIN_BADGE[d],
                      )}
                    >
                      {DOMAIN_LABELS[d]}
                    </span>
                    <EpreuveChips nums={prof.primaryEpreuves} />
                  </div>
                  <p className='mt-2 font-display text-sm font-semibold leading-snug text-white group-hover:text-gold-100'>
                    {m.titre}
                  </p>
                  <p className='mt-1 text-[10px] tabular-nums text-gray-600'>Croisement doc. : F{String(m.numero).padStart(2, '0')}</p>
                  <p className='mt-2 line-clamp-2 text-xs leading-relaxed text-gray-500'>{m.accroche}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
