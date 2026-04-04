/** Placeholder léger pendant le chargement des sections sous le pli (accueil). */
export function HomeSectionSkeleton({ label }: { label?: string }) {
  return (
    <section
      className='flex min-h-[28vh] items-center justify-center border-y border-white/[0.04] bg-navy-950/40 px-6 py-16'
      aria-busy
      aria-label={label ?? 'Chargement de la section'}
    >
      <div className='h-8 w-48 animate-pulse rounded-lg bg-white/[0.06]' />
    </section>
  );
}
