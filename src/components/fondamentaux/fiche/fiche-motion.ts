import type { Transition, Variants } from 'framer-motion';

/**
 * Variants Framer Motion — Institut Judiciaire V3.
 * Ne pas définir d’objets motion inline dans les TSX : importer depuis ce module.
 */
/** Pas d’opacité < 1 : sinon axe-core / contrastes mesurent un premier plan « grisé » (faux positifs). */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 1, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const hoverLiftTransition: Transition = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1],
  duration: 0.28,
};

/** Variants carte : élévation au survol (2H.3 branchera `whileHover`). */
export const hoverLiftVariants: Variants = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(15, 20, 32, 0.12)' },
  hover: {
    y: -3,
    boxShadow: '0 12px 32px rgba(15, 20, 32, 0.18)',
    transition: hoverLiftTransition,
  },
};

/**
 * Indique si les animations doivent être neutralisées côté composant
 * (combiner avec `useReducedMotion()` de framer-motion).
 */
export function shouldDisableFicheMotion(reducedMotion: boolean): boolean {
  return reducedMotion;
}
