import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { Button } from '@/components/ui/button';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';

/**
 * Page interne : repères tokens `--ds-*` et états courants (hors prod si besoin : restreindre par env).
 */
export default function DesignSystemPage() {
  return (
    <InteriorPageShell maxWidth='6xl' glow={SHELL_GLOW.account} pad='default'>
      <h1 className='mb-6 font-sans text-2xl font-bold text-ds-text-primary'>Design system — tokens</h1>
      <p className='mb-8 text-sm text-ds-text-muted'>
        Préférer <code className='rounded bg-ds-bg-secondary px-1'>bg-ds-bg-primary</code>,{' '}
        <code className='rounded bg-ds-bg-secondary px-1'>text-ds-text-primary</code>,{' '}
        <code className='rounded bg-ds-bg-secondary px-1'>border-ds-border</code> plutôt que des couleurs figées (
        <code className='rounded bg-ds-bg-secondary px-1'>bg-navy-*</code>, <code className='rounded bg-ds-bg-secondary px-1'>bg-slate-950</code>
        ) hors variante <code className='rounded bg-ds-bg-secondary px-1'>dark:</code> documentée.
      </p>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='rounded-xl border border-ds-border bg-ds-bg-primary p-4'>
          <p className='text-sm font-medium text-ds-text-primary'>bg-ds-bg-primary</p>
          <p className='mt-1 text-xs text-ds-text-muted'>Fond principal (clair / sombre via thème)</p>
        </div>
        <div className='rounded-xl border border-ds-border bg-ds-bg-secondary p-4'>
          <p className='text-sm font-medium text-ds-text-primary'>bg-ds-bg-secondary</p>
          <p className='mt-1 text-xs text-ds-text-muted'>Surfaces secondaires</p>
        </div>
        <div className='rounded-xl border border-ds-border bg-ds-bg-elevated p-4'>
          <p className='text-sm font-medium text-ds-text-primary'>bg-ds-bg-elevated</p>
          <p className='mt-1 text-xs text-ds-text-muted'>Cartes / relief</p>
        </div>
        <div className='rounded-xl border border-ds-border p-4'>
          <p className='text-sm font-medium text-ds-text-primary'>Bordure ds-border</p>
          <p className='mt-1 text-xs text-ds-text-muted'>Contour standard</p>
        </div>
      </div>

      <h2 className='mb-4 mt-10 font-sans text-lg font-semibold text-ds-text-primary'>Boutons</h2>
      <div className='flex flex-wrap gap-3'>
        <Button type='button'>Default</Button>
        <Button type='button' variant='secondary'>
          Secondary
        </Button>
        <Button type='button' variant='outline'>
          Outline
        </Button>
        <Button type='button' variant='ghost'>
          Ghost
        </Button>
        <Button type='button' disabled>
          Disabled
        </Button>
      </div>

      <h2 className='mb-4 mt-10 font-sans text-lg font-semibold text-ds-text-primary'>Cartes & focus</h2>
      <div className='grid gap-4 md:grid-cols-2'>
        <button
          type='button'
          className='rounded-xl border border-ds-border bg-ds-bg-secondary p-4 text-left text-sm text-ds-text-primary outline-none ring-offset-2 transition hover:bg-ds-bg-elevated focus-visible:ring-2 focus-visible:ring-cyan-500'
        >
          Carte interactive — tabulation puis focus visible (anneau cyan).
        </button>
        <div className='rounded-xl border border-ds-border bg-ds-bg-secondary p-4 text-sm text-ds-text-muted'>
          Carte statique (information)
        </div>
      </div>

      <h2 className='mb-4 mt-10 font-sans text-lg font-semibold text-ds-text-primary'>Messages</h2>
      <div className='space-y-3'>
        <p role='alert' className='rounded-lg border border-red-500/35 bg-red-500/10 px-3 py-2 text-sm text-red-800 dark:text-red-200'>
          Erreur : champ invalide ou action refusée.
        </p>
        <p className='rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200'>
          Succès : enregistrement effectué.
        </p>
      </div>
    </InteriorPageShell>
  );
}
