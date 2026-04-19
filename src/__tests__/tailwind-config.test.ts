import { describe, expect, it } from 'vitest';

import tailwindConfig from '../../tailwind.config';

/**
 * Sanity checks Phase 1 — vérifie que tailwind.config.ts expose bien :
 *   - les couleurs `colors.ij.*` (mapping vers --ij-* CSS vars)
 *   - les ombres `boxShadow.ij-*`
 *   - les fontes `fontFamily.ij-display / ij-sans / ij-mono`
 *
 * On garde le contrat stable : un `pnpm install` qui purge un de ces tokens
 * casse ce test au lieu de sortir un build silencieusement dégradé.
 */

const REQUIRED_IJ_COLORS = [
  'bg',
  'surface',
  'surface-2',
  'border',
  'border-strong',
  'text',
  'text-muted',
  'text-subtle',
  'primary',
  'accent',
  'accent-soft',
  'success',
  'warning',
  'danger',
] as const;

const REQUIRED_IJ_SHADOWS = ['ij-soft', 'ij-card', 'ij-elevated', 'ij-inset'] as const;

const REQUIRED_IJ_FONTS = ['ij-display', 'ij-sans', 'ij-mono'] as const;

type ColorMap = Record<string, string | Record<string, string>>;

describe('tailwind.config.ts — exposition tokens Institut Judiciaire', () => {
  const extend = tailwindConfig.theme?.extend ?? {};
  const colors = (extend.colors ?? {}) as ColorMap;
  const shadows = (extend.boxShadow ?? {}) as Record<string, string>;
  const fonts = (extend.fontFamily ?? {}) as Record<string, readonly string[]>;

  describe('colors.ij.*', () => {
    it('définit le namespace `ij`', () => {
      expect(colors.ij, 'colors.ij absent de tailwind.config.ts').toBeDefined();
      expect(typeof colors.ij).toBe('object');
    });

    it.each(REQUIRED_IJ_COLORS)('expose colors.ij.%s', (key) => {
      const ij = colors.ij as Record<string, string>;
      expect(ij[key], `colors.ij.${key} manquant`).toBeDefined();
      expect(ij[key]).toMatch(/^var\(--ij-[a-z0-9-]+\)$/);
    });
  });

  describe('boxShadow.ij-*', () => {
    it.each(REQUIRED_IJ_SHADOWS)('expose boxShadow.%s', (key) => {
      expect(shadows[key], `boxShadow.${key} manquant`).toBeDefined();
      expect(shadows[key].length).toBeGreaterThan(0);
    });
  });

  describe('fontFamily.ij-*', () => {
    it.each(REQUIRED_IJ_FONTS)('expose fontFamily.%s', (key) => {
      expect(fonts[key], `fontFamily.${key} manquant`).toBeDefined();
      expect(Array.isArray(fonts[key])).toBe(true);
      expect(fonts[key].length).toBeGreaterThan(0);
    });

    it('fontFamily.ij-display référence Fraunces', () => {
      expect(fonts['ij-display'].join(' ')).toMatch(/--font-fraunces/);
    });

    it('fontFamily.ij-sans référence Inter Tight', () => {
      expect(fonts['ij-sans'].join(' ')).toMatch(/--font-inter-tight/);
    });

    it('fontFamily.ij-mono référence JetBrains Mono', () => {
      expect(fonts['ij-mono'].join(' ')).toMatch(/--font-jetbrains-mono/);
    });
  });

  describe('cohabitation legacy', () => {
    it('garde colors.ds.* (legacy) défini', () => {
      expect(colors.ds, 'colors.ds doit rester défini pour la compat Phase 1').toBeDefined();
    });

    it('garde fontFamily.sans (legacy Inter/DM Sans)', () => {
      expect(fonts.sans).toBeDefined();
      expect(fonts.sans.join(' ')).toMatch(/--font-inter/);
    });
  });
});
