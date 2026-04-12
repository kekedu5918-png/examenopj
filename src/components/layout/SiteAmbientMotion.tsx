'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Couche d’ambiance animée (très légère) derrière le contenu — cohérente avec le parcours « révision par thème ».
 * Respecte `prefers-reduced-motion`.
 */
export function SiteAmbientMotion() {
  const reduce = useReducedMotion();

  if (reduce) {
    return null;
  }

  return (
    <div className='pointer-events-none fixed inset-0 -z-[9] overflow-hidden' aria-hidden>
      <motion.div
        className='absolute -left-[15%] top-[8%] h-[min(420px,50vmin)] w-[min(420px,50vmin)] rounded-full bg-violet-600/25 blur-[100px]'
        animate={{ x: [0, 36, -12, 0], y: [0, 24, 8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute -right-[10%] top-[28%] h-[min(380px,45vmin)] w-[min(380px,45vmin)] rounded-full bg-cyan-500/20 blur-[95px]'
        animate={{ x: [0, -28, 16, 0], y: [0, -20, 12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className='absolute bottom-[5%] left-[20%] h-[min(320px,40vmin)] w-[min(320px,40vmin)] rounded-full bg-fuchsia-500/15 blur-[90px]'
        animate={{ opacity: [0.35, 0.55, 0.4, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Accent chaud PEANUT (shiba) — très léger */}
      <motion.div
        className='absolute bottom-[8%] right-[6%] h-[min(340px,42vmin)] w-[min(340px,42vmin)] rounded-full bg-amber-400/18 blur-[100px]'
        animate={{ opacity: [0.22, 0.38, 0.26, 0.22], scale: [1, 1.04, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className='absolute bottom-0 left-1/2 h-[180px] w-[min(100%,720px)] -translate-x-1/2 opacity-40 blur-[60px]'
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(59,130,246,0.35), transparent 65%)',
        }}
        animate={{ opacity: [0.25, 0.4, 0.28] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
