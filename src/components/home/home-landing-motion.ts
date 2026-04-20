/**
 * Variants Framer Motion — accueil (Phase 2B.2.2).
 * Normatif : `docs/plans/phase_2b2_animations_a1f9e82d.plan.md` §2.1 et §2.2.
 */
import { LANDING_EASE } from '@/components/home/motion';

export const diagnosticGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
} as const;

export const diagnosticCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: LANDING_EASE },
  },
} as const;

export const homeBelowHeroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

export const homeBelowHeroItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: LANDING_EASE },
  },
} as const;

/** Plan 2B.2 §1 animation 3 — pas de stagger si reduced-motion. */
export function getDiagnosticGridVariants(reduce: boolean | null | undefined) {
  if (reduce === true) {
    return {
      hidden: {},
      visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
    } as const;
  }
  return diagnosticGridVariants;
}

export function getDiagnosticCardVariants(reduce: boolean | null | undefined) {
  if (reduce === true) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    } as const;
  }
  return diagnosticCardVariants;
}

/** Plan 2B.2 §1 animation 5 — enfants visibles sans stagger si reduced-motion. */
export function getHomeBelowHeroContainerVariants(reduce: boolean | null | undefined) {
  if (reduce === true) {
    return {
      hidden: {},
      visible: { transition: { staggerChildren: 0 } },
    } as const;
  }
  return homeBelowHeroContainerVariants;
}

export function getHomeBelowHeroItemVariants(reduce: boolean | null | undefined) {
  if (reduce === true) {
    return {
      hidden: { opacity: 1, y: 0 },
      visible: { opacity: 1, y: 0, transition: { duration: 0 } },
    } as const;
  }
  return homeBelowHeroItemVariants;
}
