export const LANDING_EASE = [0.21, 0.47, 0.32, 0.98] as const;

/**
 * À utiliser à la place de `initial={{ opacity: 0 }}` pour le contenu indexable :
 * le HTML statique reste aligné avec l’hydratation (évite #425 / noindex Next).
 * @see https://motion.dev/docs/react-animation#initial
 */
export const MOTION_INITIAL_FOR_SEO = false;
