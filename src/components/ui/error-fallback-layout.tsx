import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

/**
 * Mise en page commune des boundary error (clair/sombre, tokens ds).
 */
export function ErrorFallbackLayout({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'flex min-h-[50vh] flex-col items-center justify-center bg-ds-bg-primary px-4 py-16 text-center',
        className,
      )}
    >
      {children}
    </div>
  );
}
