'use client';

import type { ChartPoint } from '@/features/examenopj/controllers/get-dashboard-stats';

type Props = { points: ChartPoint[] };

export function ProgressionChart({ points }: Props) {
  if (points.length === 0) return null;

  const W = 600;
  const H = 140;
  const PADDING = { top: 16, right: 16, bottom: 28, left: 36 };

  const innerW = W - PADDING.left - PADDING.right;
  const innerH = H - PADDING.top - PADDING.bottom;

  const minPct = 0;
  const maxPct = 100;

  const toX = (i: number) =>
    PADDING.left + (points.length > 1 ? (i / (points.length - 1)) * innerW : innerW / 2);
  const toY = (pct: number) =>
    PADDING.top + innerH - ((pct - minPct) / (maxPct - minPct)) * innerH;

  // Build SVG polyline path
  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(p.pct).toFixed(1)}`)
    .join(' ');

  // Area fill path (close below)
  const areaD =
    pathD +
    ` L ${toX(points.length - 1).toFixed(1)} ${(PADDING.top + innerH).toFixed(1)}` +
    ` L ${toX(0).toFixed(1)} ${(PADDING.top + innerH).toFixed(1)} Z`;

  // Y-axis grid lines at 0%, 50%, 100%
  const gridLines = [0, 50, 100];

  return (
    <div className='w-full overflow-x-auto'>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className='h-auto w-full min-w-[300px]'
        aria-label='Graphique de progression'
        role='img'
      >
        <defs>
          <linearGradient id='chartGrad' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='#06b6d4' stopOpacity='0.25' />
            <stop offset='100%' stopColor='#06b6d4' stopOpacity='0' />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {gridLines.map((v) => {
          const y = toY(v);
          return (
            <g key={v}>
              <line
                x1={PADDING.left}
                y1={y}
                x2={W - PADDING.right}
                y2={y}
                stroke='rgba(255,255,255,0.06)'
                strokeWidth='1'
              />
              <text
                x={PADDING.left - 6}
                y={y + 4}
                textAnchor='end'
                fill='rgba(148,163,184,0.7)'
                fontSize='10'
              >
                {v}%
              </text>
            </g>
          );
        })}

        {/* Area fill */}
        <path d={areaD} fill='url(#chartGrad)' />

        {/* Line */}
        <path
          d={pathD}
          fill='none'
          stroke='#06b6d4'
          strokeWidth='2'
          strokeLinejoin='round'
          strokeLinecap='round'
        />

        {/* Data points + labels */}
        {points.map((p, i) => {
          const x = toX(i);
          const y = toY(p.pct);
          // Show label every few points to avoid crowding
          const showLabel = points.length <= 8 || i % Math.ceil(points.length / 8) === 0 || i === points.length - 1;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r='3' fill='#06b6d4' />
              {/* Tooltip-like label on hover via title */}
              <title>
                {p.date} — {p.pct}% ({p.attempts} quiz)
              </title>
              {showLabel && (
                <text
                  x={x}
                  y={PADDING.top + innerH + 16}
                  textAnchor='middle'
                  fill='rgba(148,163,184,0.6)'
                  fontSize='9'
                >
                  {p.date}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className='mt-1 flex items-center gap-2'>
        <div className='h-0.5 w-6 rounded bg-cyan-500' />
        <span className='text-xs text-slate-500'>Score moyen par jour (quiz)</span>
      </div>
    </div>
  );
}
