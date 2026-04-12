'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Lock, Star } from 'lucide-react';

import { ParcoursOpjPedagogyBlock } from '@/components/lessons/ParcoursOpjPedagogyBlock';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  flattenNodesInOrder,
  globalProgressPercent,
  isNodeUnlockedByFlatIndex,
  LEARNING_PATH_MODULES,
  type LearningModuleDef,
  type LearningNodeDef,
  loadLearningPathProgress,
  mergeRemoteIntoLocalStorage,
  saveNodeProgress,
} from '@/data/learning-path-modules';
import { saveLearningNodeProgressAction } from '@/features/learning-path/actions/save-learning-node-progress-action';
import { cn } from '@/utils/cn';

const KIND_LABEL: Record<string, string> = {
  discovery: 'Découverte',
  training: 'Entraînement guidé',
  consolidation: 'Consolidation',
  case: 'Cas pratique',
  exam: 'Mini-examen',
};

function NodeBubble({
  module,
  node,
  flatIndex,
  unlocked,
  done,
  score,
  onMarkSuccess,
}: {
  module: LearningModuleDef;
  node: LearningNodeDef;
  flatIndex: number;
  unlocked: boolean;
  done: boolean;
  score: number | null;
  onMarkSuccess: () => void;
}) {
  return (
    <div className='flex flex-col items-center gap-2'>
      {unlocked ? (
        <Link
          href={node.href}
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-lg font-black transition md:h-16 md:w-16',
            'bg-gradient-to-br shadow-lg ring-2',
            module.color,
            module.ring,
            done ? 'text-white' : 'text-white/90 hover:brightness-110',
          )}
          aria-label={`${node.title} — ouvrir`}
        >
          {done ? <Check className='h-7 w-7' strokeWidth={2.5} /> : <span>{flatIndex + 1}</span>}
        </Link>
      ) : (
        <span
          className='flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-slate-200 bg-slate-100 text-slate-400 dark:border-white/10 dark:bg-black/30 dark:text-slate-500 md:h-16 md:w-16'
          title='Terminez le nœud précédent avec au moins 80 %'
        >
          <Lock className='h-6 w-6' aria-hidden />
        </span>
      )}
      <p className='max-w-[140px] text-center text-[11px] font-semibold leading-tight text-slate-600 dark:text-slate-400'>
        {node.title}
      </p>
      <p className='text-[10px] uppercase tracking-wide text-slate-500'>{KIND_LABEL[node.kind] ?? node.kind}</p>
      {unlocked && !done ? (
        <button
          type='button'
          onClick={onMarkSuccess}
          className='rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-800 dark:text-emerald-200'
        >
          Marquer ≥80 %
        </button>
      ) : null}
      {done && score != null ? (
        <span className='inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-300'>
          <Star className='h-3 w-3 fill-current' aria-hidden />
          {score}%
        </span>
      ) : null}
    </div>
  );
}

export type LearningPathExperienceProps = {
  /** Scores issus de `user_node_progress` (connecté) — fusionnés dans le local au montage. */
  remoteScoresByClientKey?: Record<string, number>;
};

export function LearningPathExperience({ remoteScoresByClientKey }: LearningPathExperienceProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (remoteScoresByClientKey && Object.keys(remoteScoresByClientKey).length > 0) {
      mergeRemoteIntoLocalStorage(remoteScoresByClientKey);
      setTick((t) => t + 1);
    }
  }, [remoteScoresByClientKey]);

  useEffect(() => {
    const onStorage = () => setTick((t) => t + 1);
    window.addEventListener('examenopj:learning-path', onStorage);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('examenopj:learning-path', onStorage);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const progress = useMemo(() => {
    void tick;
    return globalProgressPercent();
  }, [tick]);

  const prog = useMemo(() => {
    void tick;
    return loadLearningPathProgress();
  }, [tick]);

  const flat = flattenNodesInOrder();

  return (
    <div className='space-y-12'>
      <div className='rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/[0.03]'>
        <div className='flex flex-wrap items-end justify-between gap-4'>
          <div>
            <p className='text-xs font-bold uppercase tracking-widest text-cyan-700 dark:text-cyan-300'>
              Progression globale
            </p>
            <p className='mt-1 font-display text-2xl font-bold text-slate-900 dark:text-white'>{progress}% du parcours</p>
          </div>
          <p className='max-w-sm text-sm text-slate-600 dark:text-slate-400'>
            Chaque étape se débloque après la précédente avec un score ≥ 80 %. Connecté : la progression est aussi
            enregistrée sur votre compte (Supabase) ; hors ligne, elle reste sur cet appareil.
          </p>
        </div>
        <div className='mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10'>
          <div
            className='h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-[width] duration-500'
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ParcoursOpjPedagogyBlock />

      {LEARNING_PATH_MODULES.map((module, modIdx) => {
        let offset = 0;
        for (let i = 0; i < modIdx; i++) {
          offset += LEARNING_PATH_MODULES[i].nodes.length;
        }

        return (
          <section key={module.id} aria-labelledby={`mod-${module.id}`}>
            <div className='mb-6 flex items-center gap-3'>
              <span
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-2xl border-2 bg-gradient-to-br text-sm font-black text-white ring-2',
                  module.color,
                  module.ring,
                )}
              >
                {module.shortLabel}
              </span>
              <div>
                <h2 id={`mod-${module.id}`} className='font-display text-xl font-bold text-slate-900 dark:text-white'>
                  {module.title}
                </h2>
                <p className='text-sm text-slate-600 dark:text-slate-500'>5 étapes — de la fiche au mini-examen</p>
              </div>
            </div>
            <GlassCard className='border-slate-200/80 dark:border-white/10' padding='p-6 md:p-8'>
              <div className='flex flex-col flex-wrap items-center justify-center gap-8 md:flex-row md:gap-6'>
                {module.nodes.map((node, nodeIdx) => {
                  const idx = offset + nodeIdx;
                  const unlocked = isNodeUnlockedByFlatIndex(idx);
                  const p = prog[node.id];
                  const done = !!p && p.scorePct >= node.minScorePct;
                  return (
                    <div key={node.id} className='flex flex-col items-center md:flex-row md:items-start md:gap-4'>
                      <NodeBubble
                        module={module}
                        node={node}
                        flatIndex={idx}
                        unlocked={unlocked}
                        done={done}
                        score={p?.scorePct ?? null}
                        onMarkSuccess={() => {
                          const score = Math.max(node.minScorePct, p?.scorePct ?? 85);
                          saveNodeProgress(node.id, score);
                          void saveLearningNodeProgressAction(node.id, score).catch(() => {
                            /* réseau / table non migrée : le local suffit */
                          });
                          setTick((t) => t + 1);
                        }}
                      />
                      {nodeIdx < module.nodes.length - 1 ? (
                        <div
                          className='hidden h-0.5 w-10 shrink-0 bg-gradient-to-r from-slate-300 to-slate-100 md:block dark:from-white/25 dark:to-transparent'
                          aria-hidden
                        />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </section>
        );
      })}

      <p className='text-center text-xs text-slate-500'>
        {LEARNING_PATH_MODULES.reduce((acc, m) => acc + m.nodes.length, 0)} nœuds au total — alignés sur le référentiel
        OPJ (GAV, auditions, perquisitions, acteurs, qualifications, cadres, recours).
      </p>
    </div>
  );
}
