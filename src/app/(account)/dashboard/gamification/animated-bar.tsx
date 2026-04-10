'use client';

import { useEffect, useState } from 'react';

type Props = {
  pct: number;
  color: string; // Tailwind color key e.g. 'cyan', 'red', 'amber'
};

const COLOR_CLASSES: Record<string, string> = {
  red: 'bg-red-500',
  amber: 'bg-amber-500',
  cyan: 'bg-cyan-500',
  violet: 'bg-violet-500',
  emerald: 'bg-emerald-500',
  pink: 'bg-pink-500',
  orange: 'bg-orange-500',
};

export function AnimatedBar({ pct, color }: Props) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.min(100, Math.max(0, pct))), 50);
    return () => clearTimeout(t);
  }, [pct]);

  const barColor = COLOR_CLASSES[color] ?? 'bg-cyan-500';

  return (
    <div className='h-2 w-full overflow-hidden rounded-full bg-white/10'>
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
