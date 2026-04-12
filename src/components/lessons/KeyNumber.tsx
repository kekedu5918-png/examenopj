'use client';

import { useEffect, useMemo, useState } from 'react';
import { animate, motion } from 'framer-motion';

import { cn } from '@/utils/cn';

export type KeyNumberColor = 'blue' | 'amber' | 'green' | 'red';

export interface KeyNumberProps {
  number: string;
  label: string;
  sublabel?: string;
  color?: KeyNumberColor;
  className?: string;
}

const colorClass: Record<KeyNumberColor, string> = {
  blue: 'text-blue-600 dark:text-blue-400',
  amber: 'text-amber-600 dark:text-amber-400',
  green: 'text-emerald-600 dark:text-emerald-400',
  red: 'text-red-600 dark:text-red-400',
};

/** Extrait le préfixe numérique pour l’animation count-up (ex. "24h" → 24, "h"). */
function parseNumericPrefix(value: string): { target: number; suffix: string; hasCount: boolean } {
  const m = value.trim().match(/^(\d+(?:[.,]\d+)?)(.*)$/);
  if (!m) return { target: 0, suffix: value, hasCount: false };
  const num = parseFloat(m[1].replace(',', '.'));
  if (Number.isNaN(num)) return { target: 0, suffix: value, hasCount: false };
  return { target: num, suffix: m[2], hasCount: true };
}

export function KeyNumber({ number, label, sublabel, color = 'blue', className }: KeyNumberProps) {
  const { target, suffix, hasCount } = useMemo(() => parseNumericPrefix(number), [number]);
  const [display, setDisplay] = useState(() => (hasCount ? `0${suffix}` : number));

  useEffect(() => {
    if (!hasCount) {
      setDisplay(number);
      return;
    }
    setDisplay(`0${suffix}`);
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const isInt = Number.isInteger(target);
        const text = isInt ? Math.round(v).toString() : v.toFixed(1).replace(/\.0$/, '');
        setDisplay(`${text}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [hasCount, number, suffix, target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.35 }}
      className={cn(
        'rounded-2xl border border-ds-border bg-ds-bg-secondary/90 px-6 py-5 text-center shadow-sm',
        className,
      )}
    >
      <p
        className={cn(
          'font-bold tabular-nums tracking-tight',
          'text-4xl sm:text-5xl',
          colorClass[color],
        )}
        aria-label={label}
      >
        {display}
      </p>
      <p className='mt-2 text-sm font-medium text-ds-text-primary'>{label}</p>
      {sublabel ? <p className='mt-1 text-xs text-ds-text-muted'>{sublabel}</p> : null}
    </motion.div>
  );
}

export function ExampleUsage() {
  return (
    <KeyNumber
      number='24h'
      label='durée initiale de la GAV'
      sublabel='Renouvelable 1 fois = 48h max'
      color='amber'
    />
  );
}
