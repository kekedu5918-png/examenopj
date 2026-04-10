type ProgressBarProps = {
  pct: number;
  color?: 'cyan' | 'emerald' | 'amber' | 'red' | 'purple';
  size?: 'sm' | 'md';
  className?: string;
};

const GRADIENTS: Record<string, string> = {
  cyan: 'from-cyan-500 to-blue-500',
  emerald: 'from-emerald-500 to-green-400',
  amber: 'from-amber-500 to-yellow-400',
  red: 'from-red-500 to-rose-400',
  purple: 'from-purple-500 to-violet-400',
};

export function ProgressBar({ pct, color = 'cyan', size = 'sm', className = '' }: ProgressBarProps) {
  const height = size === 'md' ? 'h-2.5' : 'h-2';
  return (
    <div className={`${height} w-full overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r transition-all ${GRADIENTS[color]}`}
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}
