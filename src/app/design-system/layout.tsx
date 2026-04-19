import type { PropsWithChildren } from 'react';

/**
 * Layout dédié à la page interne /design-system (Phase 1).
 *
 * Bypass volontaire du chrome global (Header, Footer, FloatingQuickFlashcards,
 * SiteBackground, etc.) pour :
 *   1. Stabiliser le snapshot Playwright `e2e/design-system-snapshot.spec.ts`
 *      (pas de régression quand le header/footer évolue ailleurs).
 *   2. Présenter le DS sur un canvas pur, sans interférence visuelle.
 *
 * Note App Router : ce layout est un wrapper minimal, le `<html>` et `<body>`
 * du `app/layout.tsx` racine restent en place. Les fontes (Fraunces / Inter
 * Tight / JetBrains Mono) sont chargées par le layout racine via leurs
 * variables CSS, donc disponibles ici sans rechargement.
 */
export default function DesignSystemLayout({ children }: PropsWithChildren) {
  // `isolation: isolate` + fond opaque = on garantit que `<SiteBackground />`
  // (rendu plus haut dans le layout racine) ne vienne PAS teinter par
  // composition les couleurs du DS, ce qui ferait apparaître des faux
  // positifs `color-contrast` dans axe (ex. `--ij-text-muted` mesuré comme
  // #8f8a82 au lieu de #5a5246 à cause d'un overlay blanc translucide).
  // `position: relative` + `zIndex: 1` placent le DS au-dessus de tout overlay
  // ambient sans toucher au stacking context global.
  return (
    <div
      data-design-system-root
      style={{
        position: 'relative',
        isolation: 'isolate',
        zIndex: 1,
        background: 'var(--ij-bg)',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  );
}
