import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
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
    </InteriorPageShell>
  );
}
