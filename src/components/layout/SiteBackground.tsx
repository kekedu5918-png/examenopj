/**
 * Fond plein écran — DA sombre (canvas `--ex-canvas`).
 * Variante claire retirée tant que le mode light est verrouillé (Phase 1bis) :
 * voir `docs/TECH_DEBT.md` — réintroduire le gradient `slate-100…` avec
 * `dark:hidden` quand `LIGHT_MODE_ENABLED` repasse à true.
 */
export function SiteBackground() {
  return (
    <div className='pointer-events-none fixed inset-0 -z-10' aria-hidden>
      <div className='absolute inset-0 bg-[color:var(--ex-canvas)]'>
        <div
          className='absolute inset-0'
          style={{
            background:
              'radial-gradient(ellipse 140% 100% at 50% 118%, rgba(15, 23, 42, 0.92) 0%, var(--ex-canvas) 48%, #020617 100%)',
          }}
        />
        <div
          className='absolute left-1/2 top-0 h-[520px] w-[920px] -translate-x-1/2 opacity-[0.14]'
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -8%, #3b82f6, transparent)' }}
        />
        <div
          className='absolute right-0 top-0 h-[420px] w-[520px] opacity-[0.09]'
          style={{ background: 'radial-gradient(ellipse 70% 60% at 100% 0%, #7c3aed, transparent)' }}
        />
        <div
          className='absolute bottom-0 left-0 h-[320px] w-[420px] opacity-[0.07]'
          style={{ background: 'radial-gradient(ellipse 60% 60% at 0% 100%, #0ea5e9, transparent)' }}
        />
        <div
          className='absolute inset-0'
          style={{
            background: 'radial-gradient(ellipse 90% 70% at 50% 40%, transparent 0%, rgba(0,0,0,0.25) 100%)',
          }}
        />
        <div
          className='absolute inset-0 opacity-[0.02]'
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div
          className='absolute inset-0 opacity-[0.035] mix-blend-overlay'
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
    </div>
  );
}
