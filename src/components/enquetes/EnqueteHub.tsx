'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import type { EnqueteMeta } from '@/data/enquetes-types';
import { cn } from '@/utils/cn';

export type EnqueteCadreFiltre = 'tous' | 'flagrance' | 'preliminaire' | 'changement' | 'transversal';

export type EnqueteNiveauFiltre = 'tous' | 'debutant' | 'intermediaire' | 'avance';

function inferCadreFiltre(cadre: string): Exclude<EnqueteCadreFiltre, 'tous'> {
  const c = cadre.toLowerCase();
  if (c.includes('transversal')) return 'transversal';
  if (c.includes('changement')) return 'changement';
  const hasFlag = c.includes('flagrant') || c.includes('flagrance');
  const hasPrelim = c.includes('préliminaire') || c.includes('preliminaire');
  if (hasFlag && hasPrelim) return 'changement';
  if (hasPrelim) return 'preliminaire';
  if (hasFlag) return 'flagrance';
  return 'preliminaire';
}

function CadreBadge({ cadre }: { cadre: string }) {
  const prelim = cadre.toLowerCase().includes('préliminaire') || cadre.toLowerCase().includes('preliminaire');
  const flag = cadre.toLowerCase().includes('flagrant');
  if (flag && !prelim) {
    return (
      <span className='inline-flex rounded-full border border-emerald-500/35 bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-200'>
        Flagrant délit
      </span>
    );
  }
  if (prelim && flag) {
    return (
      <span className='inline-flex rounded-full border border-blue-500/35 bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-200'>
        Flagrance → préliminaire
      </span>
    );
  }
  if (prelim) {
    return (
      <span className='inline-flex rounded-full border border-blue-500/35 bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-200'>
        Préliminaire
      </span>
    );
  }
  return (
    <span className='inline-flex rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-300'>
      {cadre}
    </span>
  );
}

const FILTRES_NIVEAU: { id: EnqueteNiveauFiltre; label: string }[] = [
  { id: 'tous', label: 'Tous niveaux' },
  { id: 'debutant', label: 'Débutant' },
  { id: 'intermediaire', label: 'Intermédiaire' },
  { id: 'avance', label: 'Avancé' },
];

const FILTRES: { id: EnqueteCadreFiltre; label: string }[] = [
  { id: 'tous', label: 'Tous les cadres' },
  { id: 'flagrance', label: 'Flagrance' },
  { id: 'preliminaire', label: 'Préliminaire' },
  { id: 'changement', label: 'Changement de cadre' },
  { id: 'transversal', label: 'Transversal' },
];

function ordreTri(e: EnqueteMeta): number {
  return e.ordrePedagogique ?? 999;
}

export function EnqueteHub({ enquetes }: { enquetes: EnqueteMeta[] }) {
  const [filtreNiveau, setFiltreNiveau] = useState<EnqueteNiveauFiltre>('tous');
  const [filtre, setFiltre] = useState<EnqueteCadreFiltre>('tous');

  const list = useMemo(() => {
    let next = enquetes;
    if (filtreNiveau !== 'tous') {
      next = next.filter((e) => e.niveau === filtreNiveau);
    }
    if (filtre !== 'tous') {
      next = next.filter((e) => inferCadreFiltre(e.cadre) === filtre);
    }
    return [...next].sort((a, b) => ordreTri(a) - ordreTri(b));
  }, [enquetes, filtre, filtreNiveau]);

  return (
    <div className='space-y-8'>
      <div>
        <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>Niveau</p>
        <div className='flex flex-wrap gap-2'>
          {FILTRES_NIVEAU.map((f) => (
            <button
              key={f.id}
              type='button'
              onClick={() => setFiltreNiveau(f.id)}
              className={cn(
                'rounded-xl border px-3 py-2 text-xs font-semibold transition md:text-sm',
                filtreNiveau === f.id
                  ? 'border-emerald-500/50 bg-emerald-500/15 text-emerald-100'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className='mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500'>Cadre procédural</p>
        <div className='flex flex-wrap gap-2'>
          {FILTRES.map((f) => (
            <button
              key={f.id}
              type='button'
              onClick={() => setFiltre(f.id)}
              className={cn(
                'rounded-xl border px-3 py-2 text-xs font-semibold transition md:text-sm',
                filtre === f.id
                  ? 'border-violet-500/50 bg-violet-500/15 text-violet-100'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <p className='text-sm text-gray-500'>Aucune enquête dans ce filtre.</p>
      ) : (
        <ul className='grid gap-6 md:grid-cols-2'>
          {list.map((e) => {
            const refQ = encodeURIComponent(e.id);
            const isPedago = e.contenuMode === 'pedago';
            return (
              <li key={e.id}>
                <GlassCard hover padding='p-6' className={cn('h-full transition hover:border-violet-500/20')}>
                  <div className='flex flex-wrap items-center gap-2'>
                    <CadreBadge cadre={e.cadre} />
                    {e.premium ? (
                      <span className='inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-200'>
                        <Lock className='size-3' aria-hidden />
                        Premium
                      </span>
                    ) : (
                      <span className='inline-flex rounded-full border border-gray-500/30 bg-gray-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-300'>
                        Exemple gratuit
                      </span>
                    )}
                    {isPedago ? (
                      <span className='inline-flex rounded-full border border-cyan-500/35 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cyan-200'>
                        Péda
                      </span>
                    ) : null}
                  </div>
                  {e.themeCourt ? (
                    <p className='mt-2 text-xs font-medium uppercase tracking-wide text-gray-500'>{e.themeCourt}</p>
                  ) : null}
                  <h2 className='mt-3 font-display text-lg font-bold text-white'>
                    <Link
                      href={`/cours/enquetes/${e.id}`}
                      className='text-white hover:text-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50'
                    >
                      {e.titre}
                    </Link>
                  </h2>
                  <p className='mt-2 line-clamp-3 text-sm text-gray-400'>{e.resume}</p>
                  {e.prerequis ? (
                    <p className='mt-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs leading-relaxed text-gray-400'>
                      <span className='font-semibold text-gray-300'>Prérequis :</span> {e.prerequis}
                    </p>
                  ) : null}
                  {!isPedago ? (
                    <p className='mt-4 text-xs text-gray-500'>
                      {e.documents.length} document{e.documents.length > 1 ? 's' : ''} (PDF + fac-similé)
                    </p>
                  ) : (
                    <p className='mt-4 text-xs text-gray-500'>Fiche thématique + liens modules — planches PDF à compléter</p>
                  )}
                  <div className='mt-4 flex flex-wrap gap-2'>
                    <Link
                      href={`/cours/enquetes/${e.id}`}
                      className='rounded-lg border border-violet-500/40 bg-violet-500/15 px-2.5 py-1 text-[11px] font-semibold text-violet-100 hover:bg-violet-500/25'
                    >
                      Fiche
                    </Link>
                    <Link
                      href='/epreuves/epreuve-2'
                      className='rounded-lg border border-white/15 bg-white/[0.05] px-2.5 py-1 text-[11px] text-gray-300 hover:bg-white/10'
                    >
                      Épreuve 2
                    </Link>
                    <Link
                      href={`/entrainement/articulation?ref=${refQ}`}
                      className='rounded-lg border border-white/15 bg-white/[0.05] px-2.5 py-1 text-[11px] text-gray-300 hover:bg-white/10'
                    >
                      Articulation
                    </Link>
                  </div>
                </GlassCard>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
