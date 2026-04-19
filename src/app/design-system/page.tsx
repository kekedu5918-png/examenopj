import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * Page interne — Design system « Institut Judiciaire » (Phase 1).
 *
 * Visible uniquement en dev (`NODE_ENV !== 'production'`) ou si la prod
 * exporte explicitement `ENABLE_DESIGN_SYSTEM=true`. Indexation moteurs
 * désactivée par défaut via `metadata.robots`.
 *
 * Sert à :
 *   - prévisualiser tous les tokens --ij-* en light & dark
 *   - servir de cible stable au snapshot Playwright
 *     (`e2e/design-system-snapshot.spec.ts`)
 *   - valider visuellement Fraunces / Inter Tight / JetBrains Mono
 *
 * Aucun composant existant n'est consommé ici (pas de Header/Footer global) :
 * la page reste autosuffisante et utilise du markup nu pour ne pas dépendre
 * du DS legacy.
 */
export const metadata: Metadata = {
  title: 'Design System — Institut Judiciaire',
  robots: { index: false, follow: false },
};

const TOKENS = [
  { name: '--ij-bg', light: '#FAF9F6', dark: '#0E1420', role: 'Fond canvas' },
  { name: '--ij-surface', light: '#F4F2EC', dark: '#161D2C', role: 'Cartes / panels' },
  { name: '--ij-surface-2', light: '#EDEAE0', dark: '#1F2738', role: 'Sidebar / header' },
  { name: '--ij-border', light: '#D8D3C4', dark: '#2A3145', role: 'Bordures fines' },
  { name: '--ij-border-strong', light: '#A89F87', dark: '#3D4660', role: 'Séparation forte' },
  { name: '--ij-text', light: '#1A1A1A', dark: '#F2EFE6', role: 'Texte principal' },
  { name: '--ij-text-muted', light: '#5A5246', dark: '#B5AC97', role: 'Texte secondaire' },
  { name: '--ij-text-subtle', light: '#7A7060', dark: '#867E6C', role: 'Métadonnées' },
  { name: '--ij-primary', light: '#1A2847', dark: '#F2EFE6', role: 'Encre primaire (marine institutionnel)' },
  { name: '--ij-accent', light: '#8B6B1F', dark: '#D4A853', role: 'Or institutionnel (AA standard)' },
  { name: '--ij-accent-soft', light: '#E8D9B2', dark: '#3A2E14', role: 'Or sourdine' },
  { name: '--ij-success', light: '#1F6B3A', dark: '#4ADE80', role: 'Validation' },
  { name: '--ij-warning', light: '#A85D00', dark: '#FBBF24', role: 'Alerte' },
  { name: '--ij-danger', light: '#A02020', dark: '#F87171', role: 'Erreur' },
] as const;

const SHADOWS = [
  { name: 'shadow-ij-soft', label: 'Soft' },
  { name: 'shadow-ij-card', label: 'Card' },
  { name: 'shadow-ij-elevated', label: 'Elevated' },
] as const;

/**
 * Swatch épuré : la vignette colorée n'embarque AUCUN texte (évite les
 * violations axe color-contrast sur les couleurs neutres comme `--ij-border`).
 * Les métadonnées (token, hex, rôle) sont rendues en dessous, sur le fond du
 * conteneur qui hérite de `--ij-text` (contraste AA garanti).
 */
function Swatch({ hex, token, role }: { hex: string; token: string; role: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        aria-hidden='true'
        style={{
          background: hex,
          border: '1px solid var(--ij-border)',
          borderRadius: 8,
          height: 64,
        }}
      />
      <div>
        <div
          className='font-ij-mono'
          style={{ fontSize: 11, color: 'var(--ij-text)', wordBreak: 'break-word' }}
        >
          {token}
        </div>
        <div
          className='font-ij-mono'
          style={{ fontSize: 10, color: 'var(--ij-text-muted)', marginTop: 2 }}
        >
          {hex}
        </div>
        <div
          className='font-ij-sans'
          style={{ fontSize: 10, color: 'var(--ij-text-muted)', marginTop: 4 }}
        >
          {role}
        </div>
      </div>
    </div>
  );
}

function Mockup({
  bg,
  text,
  muted,
  border,
  surface,
  accent,
  accentText,
  scheme,
}: {
  bg: string;
  text: string;
  muted: string;
  border: string;
  surface: string;
  accent: string;
  accentText: string;
  scheme: 'light' | 'dark';
}) {
  return (
    <div
      style={{
        background: bg,
        color: text,
        border: `1px solid ${border}`,
        borderRadius: 12,
        padding: '28px 32px',
      }}
      className='shadow-ij-soft'
    >
      <div className='font-ij-display' style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>
        Articulation de procédure
      </div>
      <div className='font-ij-sans' style={{ fontSize: 13, color: muted, marginTop: 4 }}>
        PV 2026/0042 — Vol simple par M. Dupont
      </div>
      <hr style={{ border: 0, borderTop: `1px solid ${border}`, margin: '16px 0' }} />
      <p
        className='font-ij-sans'
        style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 0, marginBottom: 0 }}
      >
        L&apos;officier de police judiciaire a procédé aux constatations sur les lieux à 11&nbsp;h&nbsp;00
        en présence du plaignant. Les éléments matériels ont été saisis et placés sous scellés conformément
        à l&apos;article 56 du CPP.
      </p>
      <div style={{ marginTop: 22, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {/*
          Avec `--ij-accent: #8B6B1F`, le ratio AA standard (≥ 4.5:1) est
          atteint sur fond clair, donc plus aucune contrainte « large text »
          sur les CTA accent : tailles UI standard (13-14px) acceptées.
        */}
        <button
          type='button'
          className='font-ij-sans'
          style={{
            background: accent,
            color: accentText,
            border: 'none',
            padding: '10px 18px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.01em',
            cursor: 'default',
          }}
        >
          Valider la côte
        </button>
        <button
          type='button'
          className='font-ij-sans'
          style={{
            background: 'transparent',
            color: text,
            border: `1px solid ${border}`,
            padding: '10px 18px',
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'default',
          }}
        >
          Imprimer / PDF
        </button>
        <span
          className='font-ij-mono'
          style={{
            fontSize: 11,
            padding: '4px 8px',
            borderRadius: 4,
            background: surface,
            border: `1px solid ${border}`,
            color: muted,
          }}
        >
          art. 56 CPP — {scheme}
        </span>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const enabled =
    process.env.NODE_ENV !== 'production' || process.env.ENABLE_DESIGN_SYSTEM === 'true';
  if (!enabled) notFound();

  return (
    <main
      style={{
        background: 'var(--ij-bg)',
        color: 'var(--ij-text)',
        minHeight: '100vh',
        padding: '40px 32px 80px',
      }}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <header style={{ marginBottom: 32 }}>
          <h1
            className='font-ij-display'
            style={{ fontSize: 38, fontWeight: 600, letterSpacing: '-0.015em', margin: 0 }}
          >
            Direction artistique « Institut Judiciaire »
          </h1>
          <p
            className='font-ij-sans'
            style={{
              color: 'var(--ij-text-muted)',
              maxWidth: 720,
              lineHeight: 1.55,
              fontSize: 15,
              marginTop: 8,
            }}
          >
            Phase 1 — preview des tokens <code className='font-ij-mono'>--ij-*</code> &amp; des fontes
            (Fraunces / Inter Tight / JetBrains Mono). Page interne non indexée, accessible
            uniquement en développement.
          </p>
        </header>

        <section
          aria-labelledby='palette-light'
          style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--ij-border)' }}
        >
          <h2
            id='palette-light'
            className='font-ij-display'
            style={{ fontSize: 24, fontWeight: 600, margin: '0 0 12px' }}
          >
            Palette principale — clair
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 12,
              marginBottom: 24,
            }}
            data-testid='ij-swatches-light'
          >
            {TOKENS.map((t) => (
              <Swatch key={`light-${t.name}`} hex={t.light} token={t.name} role={t.role} />
            ))}
          </div>
          <Mockup
            bg='#FAF9F6'
            text='#1A1A1A'
            muted='#5A5246'
            border='#D8D3C4'
            surface='#F4F2EC'
            accent='#8B6B1F'
            accentText='#FAF9F6'
            scheme='light'
          />
        </section>

        <section
          aria-labelledby='palette-dark'
          style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--ij-border)' }}
        >
          <h2
            id='palette-dark'
            className='font-ij-display'
            style={{ fontSize: 24, fontWeight: 600, margin: '0 0 12px' }}
          >
            Palette principale — sombre
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 12,
              marginBottom: 24,
            }}
            data-testid='ij-swatches-dark'
          >
            {TOKENS.map((t) => (
              <Swatch key={`dark-${t.name}`} hex={t.dark} token={t.name} role={t.role} />
            ))}
          </div>
          <Mockup
            bg='#0E1420'
            text='#F2EFE6'
            muted='#B5AC97'
            border='#2A3145'
            surface='#161D2C'
            accent='#D4A853'
            accentText='#0E1420'
            scheme='dark'
          />
        </section>

        <section
          aria-labelledby='typo'
          style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--ij-border)' }}
        >
          <h2
            id='typo'
            className='font-ij-display'
            style={{ fontSize: 24, fontWeight: 600, margin: '0 0 16px' }}
          >
            Typographie
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div>
              <p className='font-ij-mono' style={{ fontSize: 11, color: 'var(--ij-text-subtle)', margin: 0 }}>
                font-ij-display — Fraunces
              </p>
              <p className='font-ij-display' style={{ fontSize: 32, fontWeight: 600, margin: '4px 0 0', letterSpacing: '-0.015em' }}>
                Procédure pénale
              </p>
              <p className='font-ij-display' style={{ fontSize: 16, fontStyle: 'italic', margin: '4px 0 0', color: 'var(--ij-text-muted)' }}>
                Code de procédure pénale, art. 56
              </p>
            </div>
            <div>
              <p className='font-ij-mono' style={{ fontSize: 11, color: 'var(--ij-text-subtle)', margin: 0 }}>
                font-ij-sans — Inter Tight
              </p>
              <p className='font-ij-sans' style={{ fontSize: 18, fontWeight: 600, margin: '4px 0 0' }}>
                Officier de police judiciaire
              </p>
              <p className='font-ij-sans' style={{ fontSize: 14, margin: '4px 0 0', color: 'var(--ij-text-muted)' }}>
                Texte courant pour l&apos;UI et les paragraphes — lecture confortable sur écran.
              </p>
            </div>
            <div>
              <p className='font-ij-mono' style={{ fontSize: 11, color: 'var(--ij-text-subtle)', margin: 0 }}>
                font-ij-mono — JetBrains Mono
              </p>
              <p className='font-ij-mono' style={{ fontSize: 14, margin: '4px 0 0' }}>
                art. 311-1 CP — Le vol
              </p>
              <p className='font-ij-mono' style={{ fontSize: 12, margin: '4px 0 0', color: 'var(--ij-text-muted)' }}>
                Code, références, badges
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby='shadows'
          style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--ij-border)' }}
        >
          <h2
            id='shadows'
            className='font-ij-display'
            style={{ fontSize: 24, fontWeight: 600, margin: '0 0 16px' }}
          >
            Ombres douces
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {SHADOWS.map((s) => (
              <div
                key={s.name}
                className={s.name}
                style={{
                  background: 'var(--ij-surface)',
                  border: '1px solid var(--ij-border)',
                  borderRadius: 10,
                  padding: 24,
                  textAlign: 'center',
                }}
              >
                <div className='font-ij-mono' style={{ fontSize: 11, color: 'var(--ij-text-muted)' }}>
                  {s.name}
                </div>
                <div className='font-ij-sans' style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
