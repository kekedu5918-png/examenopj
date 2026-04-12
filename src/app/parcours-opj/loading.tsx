import { cn } from '@/utils/cn';

function ShimmerOverlay() {
  return (
    <span
      className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/12 to-transparent dark:via-white/8"
      aria-hidden
    />
  );
}

function PathSkeleton({ from, to }: { from: 'left' | 'right'; to: 'left' | 'right' }) {
  const d =
    from === 'left' && to === 'right'
      ? 'M 18 2 C 18 42 82 58 82 98'
      : 'M 82 2 C 82 42 18 58 18 98';

  return (
    <div className="relative h-14 w-full max-w-md px-6" aria-hidden>
      <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={d}
          fill="none"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray="7 6"
          className="stroke-[var(--ds-border)]"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export default function ParcoursOpjLoading() {
  const indices = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-[var(--ds-bg-primary)] pb-24">
      <div className="relative h-12 w-full overflow-hidden border-b border-[var(--ds-border)] bg-[var(--ds-bg-elevated)] md:h-14">
        <ShimmerOverlay />
      </div>

      <div className="mx-auto flex max-w-md flex-col px-4 pt-2">
        {indices.map((index) => {
          const alignLeft = index % 2 === 0;
          const nextAlignLeft = (index + 1) % 2 === 0;

          return (
            <div key={index} className="flex flex-col">
              <div
                className={cn(
                  'flex w-full',
                  alignLeft ? 'justify-start pl-2' : 'justify-end pr-2',
                )}
              >
                <div className="relative flex max-w-[120px] flex-col items-center gap-1.5">
                  <div className="relative h-[88px] w-[88px] overflow-hidden rounded-full bg-[var(--ds-bg-elevated)] shadow-inner">
                    <ShimmerOverlay />
                  </div>
                  <div className="h-8 w-full max-w-[7rem] rounded-md bg-[var(--ds-bg-elevated)]" />
                  <div className="h-4 w-10 rounded bg-[var(--ds-bg-elevated)]" />
                </div>
              </div>

              {index < indices.length - 1 && (
                <PathSkeleton
                  from={alignLeft ? 'left' : 'right'}
                  to={nextAlignLeft ? 'left' : 'right'}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
