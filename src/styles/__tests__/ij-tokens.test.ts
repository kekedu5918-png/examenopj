import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

/**
 * Tests de contraste WCAG 2.1 sur les tokens --ij-* (Phase 1).
 *
 * Source de vérité : `src/styles/globals.css` (parsing direct, pas de hardcode
 * des hex dans le test). Toute modification d'un token y répercute
 * automatiquement les assertions.
 *
 * Référence WCAG :
 *   - AA texte normal : ratio ≥ 4.5
 *   - AA texte large (≥ 18pt ou 14pt bold) / UI : ratio ≥ 3.0
 *
 * Formule (WCAG 2.1) :
 *   srgb_to_linear(c) = c ≤ 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4
 *   L = 0.2126·R_lin + 0.7152·G_lin + 0.0722·B_lin
 *   contrast = (L_clair + 0.05) / (L_sombre + 0.05)
 */

const cssPath = join(process.cwd(), 'src', 'styles', 'globals.css');
const cssSource = readFileSync(cssPath, 'utf8');

function parseTokensInScope(source: string, scope: ':root' | '.dark'): Record<string, string> {
  // Capture le bloc qui ouvre par `<scope> {` après le commentaire IJ et finit au prochain `}`.
  // On utilise une regex multi-occurrences parce que `:root` apparaît plusieurs fois (ds + ij).
  const pattern = new RegExp(`${scope.replace('.', '\\.')}\\s*\\{([^}]*)\\}`, 'g');
  const tokens: Record<string, string> = {};
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const body = match[1];
    const tokenRegex = /(--ij-[a-z0-9-]+)\s*:\s*([^;]+);/g;
    let tokenMatch: RegExpExecArray | null;
    while ((tokenMatch = tokenRegex.exec(body)) !== null) {
      const [, name, value] = tokenMatch;
      tokens[name] = value.trim();
    }
  }
  return tokens;
}

function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace('#', '').trim();
  if (cleaned.length !== 6) throw new Error(`Hex invalide : "${hex}"`);
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return [r, g, b];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const toLinear = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function contrastRatio(hexA: string, hexB: string): number {
  const lA = relativeLuminance(hexToRgb(hexA));
  const lB = relativeLuminance(hexToRgb(hexB));
  const [light, dark] = lA > lB ? [lA, lB] : [lB, lA];
  return (light + 0.05) / (dark + 0.05);
}

const lightTokens = parseTokensInScope(cssSource, ':root');
const darkTokens = parseTokensInScope(cssSource, '.dark');

const REQUIRED_TOKENS = [
  '--ij-bg',
  '--ij-surface',
  '--ij-surface-2',
  '--ij-border',
  '--ij-border-strong',
  '--ij-text',
  '--ij-text-muted',
  '--ij-text-subtle',
  '--ij-primary',
  '--ij-accent',
  '--ij-accent-soft',
  '--ij-success',
  '--ij-warning',
  '--ij-danger',
] as const;

/** Paires texte/fond à valider en mode normal (≥ 4.5). */
const TEXT_PAIRS: Array<{ fg: string; bg: string; minRatio: number; label: string }> = [
  { fg: '--ij-text', bg: '--ij-bg', minRatio: 4.5, label: 'texte principal sur fond' },
  { fg: '--ij-text', bg: '--ij-surface', minRatio: 4.5, label: 'texte principal sur surface' },
  { fg: '--ij-text', bg: '--ij-surface-2', minRatio: 4.5, label: 'texte principal sur surface-2' },
  { fg: '--ij-text-muted', bg: '--ij-bg', minRatio: 4.5, label: 'texte muted sur fond' },
  { fg: '--ij-text-muted', bg: '--ij-surface', minRatio: 4.5, label: 'texte muted sur surface' },
  { fg: '--ij-text-subtle', bg: '--ij-bg', minRatio: 4.5, label: 'texte subtle sur fond' },
];

/**
 * Paires UI / texte large à valider (≥ 3.0).
 * WCAG 1.4.11 — Non-text Contrast : s'applique aux composants UI focusables
 * (boutons, champs, états) ET aux objets graphiques porteurs d'information.
 * Les séparateurs purement décoratifs (border-strong) sont hors scope ; on
 * leur applique un seuil de visibilité plus souple (≥ 1.5).
 */
const UI_PAIRS: Array<{ fg: string; bg: string; minRatio: number; label: string }> = [
  { fg: '--ij-bg', bg: '--ij-accent', minRatio: 3.0, label: 'texte sur bouton accent' },
  { fg: '--ij-bg', bg: '--ij-success', minRatio: 3.0, label: 'texte sur fond success' },
  { fg: '--ij-bg', bg: '--ij-warning', minRatio: 3.0, label: 'texte sur fond warning' },
  { fg: '--ij-bg', bg: '--ij-danger', minRatio: 3.0, label: 'texte sur fond danger' },
];

/** Bordures structurelles (hors WCAG 1.4.11) — seuil de visibilité indicatif. */
const DECORATIVE_PAIRS: Array<{ fg: string; bg: string; minRatio: number; label: string }> = [
  { fg: '--ij-border', bg: '--ij-bg', minRatio: 1.05, label: 'border fine sur fond' },
  { fg: '--ij-border-strong', bg: '--ij-bg', minRatio: 1.5, label: 'border-strong sur fond' },
];

function resolveToken(scope: Record<string, string>, name: string): string {
  const value = scope[name];
  if (!value) throw new Error(`Token "${name}" absent du scope CSS`);
  return value;
}

describe('Design system Institut Judiciaire — tokens --ij-*', () => {
  describe('présence des tokens dans :root (light)', () => {
    it.each(REQUIRED_TOKENS)('définit %s', (name) => {
      expect(lightTokens[name], `--${name} manquant dans :root`).toBeDefined();
      expect(lightTokens[name]).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  describe('présence des tokens dans .dark', () => {
    it.each(REQUIRED_TOKENS)('définit %s', (name) => {
      expect(darkTokens[name], `--${name} manquant dans .dark`).toBeDefined();
      expect(darkTokens[name]).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  describe('règle « pas de pur blanc / pur noir »', () => {
    it('aucun token light ne vaut #ffffff ou #000000', () => {
      for (const name of REQUIRED_TOKENS) {
        const v = lightTokens[name].toLowerCase();
        expect(v, `${name} = ${v} interdit (pure blanc/noir)`).not.toBe('#ffffff');
        expect(v).not.toBe('#000000');
      }
    });
    it('aucun token dark ne vaut #ffffff ou #000000', () => {
      for (const name of REQUIRED_TOKENS) {
        const v = darkTokens[name].toLowerCase();
        expect(v, `${name} = ${v} interdit (pure blanc/noir)`).not.toBe('#ffffff');
        expect(v).not.toBe('#000000');
      }
    });
  });

  describe('contraste WCAG AA — light mode', () => {
    it.each(TEXT_PAIRS)(
      '$label : ratio ≥ $minRatio (texte normal)',
      ({ fg, bg, minRatio, label }) => {
        const ratio = contrastRatio(resolveToken(lightTokens, fg), resolveToken(lightTokens, bg));
        expect(
          ratio,
          `${label} (light) : ratio ${ratio.toFixed(2)} < ${minRatio}`,
        ).toBeGreaterThanOrEqual(minRatio);
      },
    );
    it.each(UI_PAIRS)(
      '$label : ratio ≥ $minRatio (UI/large)',
      ({ fg, bg, minRatio, label }) => {
        const ratio = contrastRatio(resolveToken(lightTokens, fg), resolveToken(lightTokens, bg));
        expect(
          ratio,
          `${label} (light) : ratio ${ratio.toFixed(2)} < ${minRatio}`,
        ).toBeGreaterThanOrEqual(minRatio);
      },
    );
    it.each(DECORATIVE_PAIRS)(
      '$label : ratio ≥ $minRatio (visibilité décorative)',
      ({ fg, bg, minRatio, label }) => {
        const ratio = contrastRatio(resolveToken(lightTokens, fg), resolveToken(lightTokens, bg));
        expect(
          ratio,
          `${label} (light) : ratio ${ratio.toFixed(2)} < ${minRatio}`,
        ).toBeGreaterThanOrEqual(minRatio);
      },
    );
  });

  describe('contraste WCAG AA — dark mode', () => {
    it.each(TEXT_PAIRS)(
      '$label : ratio ≥ $minRatio (texte normal)',
      ({ fg, bg, minRatio, label }) => {
        const ratio = contrastRatio(resolveToken(darkTokens, fg), resolveToken(darkTokens, bg));
        expect(
          ratio,
          `${label} (dark) : ratio ${ratio.toFixed(2)} < ${minRatio}`,
        ).toBeGreaterThanOrEqual(minRatio);
      },
    );
    it.each(UI_PAIRS)(
      '$label : ratio ≥ $minRatio (UI/large)',
      ({ fg, bg, minRatio, label }) => {
        const ratio = contrastRatio(resolveToken(darkTokens, fg), resolveToken(darkTokens, bg));
        expect(
          ratio,
          `${label} (dark) : ratio ${ratio.toFixed(2)} < ${minRatio}`,
        ).toBeGreaterThanOrEqual(minRatio);
      },
    );
    it.each(DECORATIVE_PAIRS)(
      '$label : ratio ≥ $minRatio (visibilité décorative)',
      ({ fg, bg, minRatio, label }) => {
        const ratio = contrastRatio(resolveToken(darkTokens, fg), resolveToken(darkTokens, bg));
        expect(
          ratio,
          `${label} (dark) : ratio ${ratio.toFixed(2)} < ${minRatio}`,
        ).toBeGreaterThanOrEqual(minRatio);
      },
    );
  });

  describe('cohérence dark vs light', () => {
    it('chaque token light a un pendant dark', () => {
      for (const name of REQUIRED_TOKENS) {
        expect(darkTokens[name], `${name} défini en light mais absent en dark`).toBeDefined();
      }
    });
  });
});
