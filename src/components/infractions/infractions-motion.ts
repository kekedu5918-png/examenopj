/**
 * Variants Framer Motion — liste `/infractions` (Phase 2D.2.a).
 * Pas d’inline dans `InfractionsPageClient` — voir plan `phase_2d2a_grille_infractions_f8a2d19e.plan.md` §2.5.
 *
 * Benchmark §5.1 (saisie rapide 5 lettres) : mesure locale ~52 FPS → palier §2.1 ≥ 50 ;
 * `layout` Framer non activé sur ~160 cartes (éviter coût cumulé) : AnimatePresence + transitions légères uniquement.
 */
import type { Variants } from 'framer-motion';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

export const gridContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0,
    },
  },
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.18, ease: EASE },
  },
};

export function getGridContainerVariants(shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return {
      hidden: {},
      visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
    };
  }
  return gridContainerVariants;
}

export function getCardVariants(shouldReduceMotion: boolean): Variants {
  if (shouldReduceMotion) {
    return {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0, transition: { duration: 0 } },
      exit: { opacity: 1, y: 0, transition: { duration: 0 } },
    };
  }
  return cardVariants;
}
