'use client';

import { useId } from 'react';

import { cn } from '@/utils/cn';

type Props = {
  className?: string;
  /** Côté du viewport carré (width et height du SVG). Défaut 40. */
  size?: number;
};

/**
 * Écusson ExamenOPJ (SVG inline). Les identifiants des defs sont uniques par instance.
 */
export function ExamenOpjLogo({ className, size = 40 }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const p = `eol-${uid}`;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 180 220'
      width={size}
      height={size}
      className={cn(
        'shrink-0',
        /* Lisibilité sur fond sombre / header transparent : halo léger + léger contraste */
        'drop-shadow-[0_2px_14px_rgba(120,180,255,0.45)] contrast-110 saturate-110',
        className,
      )}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${p}-bd`} x1='.35' y1='0' x2='.65' y2='1'>
          <stop offset='0%' stopColor='#3c4651' />
          <stop offset='35%' stopColor='#1c2835' />
          <stop offset='100%' stopColor='#09131e' />
        </linearGradient>
        <linearGradient id={`${p}-gv`} x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#efefef' />
          <stop offset='25%' stopColor='#c0c0c0' />
          <stop offset='55%' stopColor='#cbcbcb' />
          <stop offset='80%' stopColor='#c0c0c0' />
          <stop offset='100%' stopColor='#969696' />
        </linearGradient>
        <linearGradient id={`${p}-gh`} x1='0' y1='0' x2='1' y2='0'>
          <stop offset='0%' stopColor='#7d7d7d' stopOpacity='0' />
          <stop offset='22%' stopColor='#c0c0c0' />
          <stop offset='50%' stopColor='#efefef' />
          <stop offset='78%' stopColor='#c0c0c0' />
          <stop offset='100%' stopColor='#7d7d7d' stopOpacity='0' />
        </linearGradient>
        <radialGradient id={`${p}-gb`} cx='50%' cy='35%' r='70%'>
          <stop offset='0%' stopColor='#efefef' />
          <stop offset='55%' stopColor='#c0c0c0' />
          <stop offset='100%' stopColor='#969696' />
        </radialGradient>
        <filter id={`${p}-sh`} x='-18%' y='-6%' width='136%' height='128%'>
          <feDropShadow dx='0' dy='4.050' stdDeviation='6.300' floodColor='#010305' floodOpacity='.55' />
        </filter>
        <filter id={`${p}-glow`} x='-10%' y='-10%' width='120%' height='120%'>
          <feGaussianBlur stdDeviation='1.800' result='b' />
          <feComposite in='SourceGraphic' in2='b' operator='over' />
        </filter>
        <clipPath id={`${p}-clip`}>
          <path d='M90.000 3.600 C90.000 0.900 92.700 0.000 96.300 0.000 L173.700 0.000 C177.300 0.000 180.000 0.900 180.000 3.600 L180.000 133.200 C180.000 158.400 90.000 189.000 90.000 198.000 C90.000 189.000 0.000 158.400 0.000 133.200 L0.000 3.600 C0.000 0.900 2.700 0.000 6.300 0.000 L83.700 0.000 C87.300 0.000 90.000 0.900 90.000 3.600 Z' />
        </clipPath>
      </defs>
      <ellipse cx='90.000' cy='214.200' rx='79.200' ry='4.500' fill='#020508' opacity='.22' />
      <path
        d='M90.000 3.600 C90.000 0.900 92.700 0.000 96.300 0.000 L173.700 0.000 C177.300 0.000 180.000 0.900 180.000 3.600 L180.000 133.200 C180.000 158.400 90.000 189.000 90.000 198.000 C90.000 189.000 0.000 158.400 0.000 133.200 L0.000 3.600 C0.000 0.900 2.700 0.000 6.300 0.000 L83.700 0.000 C87.300 0.000 90.000 0.900 90.000 3.600 Z'
        fill={`url(#${p}-bd)`}
        filter={`url(#${p}-sh)`}
      />
      <path
        d='M6.300 0.000 C0.000 0.000 0.000 3.600 0.000 3.600 L0.000 49.500 C36.000 45.000 90.000 43.200 90.000 43.200 C90.000 43.200 144.000 45.000 180.000 49.500 L180.000 3.600 C180.000 0.900 173.700 0.000 173.700 0.000 Z'
        fill='white'
        opacity='.045'
        clipPath={`url(#${p}-clip)`}
      />
      <path
        d='M90.000 3.600 C90.000 0.900 92.700 0.000 96.300 0.000 L173.700 0.000 C177.300 0.000 180.000 0.900 180.000 3.600 L180.000 133.200 C180.000 158.400 90.000 189.000 90.000 198.000 C90.000 189.000 0.000 158.400 0.000 133.200 L0.000 3.600 C0.000 0.900 2.700 0.000 6.300 0.000 L83.700 0.000 C87.300 0.000 90.000 0.900 90.000 3.600 Z'
        fill='none'
        stroke='#060d15'
        strokeWidth='7.200'
        opacity='.4'
      />
      <path
        d='M90.000 3.600 C90.000 0.900 92.700 0.000 96.300 0.000 L173.700 0.000 C177.300 0.000 180.000 0.900 180.000 3.600 L180.000 133.200 C180.000 158.400 90.000 189.000 90.000 198.000 C90.000 189.000 0.000 158.400 0.000 133.200 L0.000 3.600 C0.000 0.900 2.700 0.000 6.300 0.000 L83.700 0.000 C87.300 0.000 90.000 0.900 90.000 3.600 Z'
        fill='none'
        stroke={`url(#${p}-gv)`}
        strokeWidth='4.500'
        filter={`url(#${p}-glow)`}
      />
      <path
        d='M90.000 3.600 C90.000 0.900 92.700 0.000 96.300 0.000 L173.700 0.000 C177.300 0.000 180.000 0.900 180.000 3.600 L180.000 133.200 C180.000 158.400 90.000 189.000 90.000 198.000 C90.000 189.000 0.000 158.400 0.000 133.200 L0.000 3.600 C0.000 0.900 2.700 0.000 6.300 0.000 L83.700 0.000 C87.300 0.000 90.000 0.900 90.000 3.600 Z'
        fill='none'
        stroke='#efefef'
        strokeWidth='1.170'
        opacity='.65'
      />
      <path
        d='M90.000 14.400 C90.000 11.700 92.362 10.800 95.513 10.800 L163.238 10.800 C166.387 10.800 168.750 11.700 168.750 14.400 L168.750 144.000 C168.750 169.200 90.000 199.800 90.000 208.800 C90.000 199.800 11.250 169.200 11.250 144.000 L11.250 14.400 C11.250 11.700 13.612 10.800 16.763 10.800 L84.487 10.800 C87.638 10.800 90.000 11.700 90.000 14.400 Z'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.980'
        opacity='.42'
      />
      <path
        d='M90.000 17.100 C90.000 14.400 92.281 13.500 95.323 13.500 L160.726 13.500 C163.769 13.500 166.050 14.400 166.050 17.100 L166.050 146.700 C166.050 171.900 90.000 202.500 90.000 211.500 C90.000 202.500 13.950 171.900 13.950 146.700 L13.950 17.100 C13.950 14.400 16.231 13.500 19.273 13.500 L84.677 13.500 C87.719 13.500 90.000 14.400 90.000 17.100 Z'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='0.810'
        opacity='.26'
      />
      <rect x='21.600' y='16.200' width='136.800' height='24.300' fill='#c0c0c0' opacity='.1' rx='1.800' />
      <line x1='20.700' y1='16.200' x2='159.300' y2='16.200' stroke={`url(#${p}-gh)`} strokeWidth='1.170' />
      <line x1='20.700' y1='40.500' x2='159.300' y2='40.500' stroke={`url(#${p}-gh)`} strokeWidth='1.170' />
      <rect x='19.350' y='15.300' width='4.050' height='4.050' fill='#c0c0c0' opacity='.55' />
      <rect x='156.600' y='15.300' width='4.050' height='4.050' fill='#c0c0c0' opacity='.55' />
      <rect x='19.350' y='40.050' width='4.050' height='4.050' fill='#c0c0c0' opacity='.55' />
      <rect x='156.600' y='40.050' width='4.050' height='4.050' fill='#c0c0c0' opacity='.55' />
      <text
        x='90.000'
        y='28.800'
        fontFamily="'Palatino Linotype',Palatino,'Book Antiqua',Georgia,serif"
        fontSize='14.400'
        fontWeight='bold'
        fill='#c0c0c0'
        textAnchor='middle'
        dominantBaseline='middle'
        letterSpacing='3.420'
      >
        EXAMEN
      </text>
      <text
        x='30.600'
        y='59.400'
        fontFamily='serif'
        fontSize='10.800'
        fill='#c0c0c0'
        textAnchor='middle'
        dominantBaseline='middle'
        opacity='.82'
      >
        ✦
      </text>
      <text
        x='149.400'
        y='59.400'
        fontFamily='serif'
        fontSize='10.800'
        fill='#c0c0c0'
        textAnchor='middle'
        dominantBaseline='middle'
        opacity='.82'
      >
        ✦
      </text>
      <rect x='66.600' y='144.000' width='46.800' height='7.200' fill={`url(#${p}-gb)`} rx='1.800' />
      <rect x='73.800' y='151.200' width='32.400' height='3.600' fill='#c0c0c0' opacity='.3' rx='1.350' />
      <rect x='85.950' y='71.100' width='8.100' height='73.800' fill={`url(#${p}-gb)`} rx='1.980' />
      <rect x='84.780' y='100.800' width='10.440' height='14.400' fill={`url(#${p}-gb)`} rx='2.250' />
      <circle cx='90.000' cy='69.300' r='7.650' fill={`url(#${p}-bd)`} stroke={`url(#${p}-gv)`} strokeWidth='2.520' />
      <circle cx='90.000' cy='69.300' r='3.600' fill='#c0c0c0' opacity='.88' />
      <polygon points='90.000,58.500 93.600,64.800 90.000,69.300 86.400,64.800' fill='#c0c0c0' opacity='.5' />
      <rect x='29.700' y='89.100' width='120.600' height='8.100' fill={`url(#${p}-gb)`} rx='3.150' />
      <rect x='31.500' y='89.550' width='117.000' height='2.250' fill='white' opacity='.11' rx='2.250' />
      <circle cx='90.000' cy='93.150' r='6.750' fill={`url(#${p}-bd)`} stroke={`url(#${p}-gv)`} strokeWidth='2.520' />
      <circle cx='90.000' cy='93.150' r='3.420' fill='#c0c0c0' opacity='.92' />
      <line x1='29.700' y1='97.200' x2='19.800' y2='120.600' stroke='#c0c0c0' strokeWidth='2.250' strokeLinecap='round' opacity='.82' />
      <line x1='29.700' y1='97.200' x2='41.400' y2='120.600' stroke='#c0c0c0' strokeWidth='2.250' strokeLinecap='round' opacity='.82' />
      <circle cx='27.900' cy='104.400' r='2.070' fill='#c0c0c0' opacity='.65' />
      <circle cx='27.000' cy='111.600' r='1.890' fill='#c0c0c0' opacity='.58' />
      <circle cx='27.000' cy='117.900' r='1.800' fill='#c0c0c0' opacity='.52' />
      <line x1='150.300' y1='97.200' x2='160.200' y2='120.600' stroke='#c0c0c0' strokeWidth='2.250' strokeLinecap='round' opacity='.82' />
      <line x1='150.300' y1='97.200' x2='138.600' y2='120.600' stroke='#c0c0c0' strokeWidth='2.250' strokeLinecap='round' opacity='.82' />
      <circle cx='152.100' cy='104.400' r='2.070' fill='#c0c0c0' opacity='.65' />
      <circle cx='153.000' cy='111.600' r='1.890' fill='#c0c0c0' opacity='.58' />
      <circle cx='153.000' cy='117.900' r='1.800' fill='#c0c0c0' opacity='.52' />
      <ellipse cx='30.600' cy='125.550' rx='20.700' ry='3.600' fill='#040a0f' opacity='.2' />
      <path
        d='M9.900 123.300 Q30.600 135.000 51.300 123.300'
        fill='none'
        stroke={`url(#${p}-gv)`}
        strokeWidth='4.950'
        strokeLinecap='round'
      />
      <path
        d='M11.700 122.850 Q30.600 131.400 49.500 122.850'
        fill='none'
        stroke='white'
        strokeWidth='1.350'
        strokeLinecap='round'
        opacity='.12'
      />
      <ellipse cx='149.400' cy='125.550' rx='20.700' ry='3.600' fill='#040a0f' opacity='.2' />
      <path
        d='M128.700 123.300 Q149.400 135.000 170.100 123.300'
        fill='none'
        stroke={`url(#${p}-gv)`}
        strokeWidth='4.950'
        strokeLinecap='round'
      />
      <path
        d='M130.500 122.850 Q149.400 131.400 168.300 122.850'
        fill='none'
        stroke='white'
        strokeWidth='1.350'
        strokeLinecap='round'
        opacity='.12'
      />
      <path
        d='M62.100 146.700 C58.500 139.500 53.100 134.100 54.900 128.700'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.980'
        strokeLinecap='round'
        opacity='.82'
      />
      <path
        d='M53.100 150.300 C46.800 143.100 39.600 138.600 42.300 132.300'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.800'
        strokeLinecap='round'
        opacity='.76'
      />
      <path
        d='M45.000 153.000 C37.800 146.700 30.600 144.000 32.400 137.700'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.620'
        strokeLinecap='round'
        opacity='.68'
      />
      <path
        d='M38.700 153.900 C30.600 150.300 24.300 147.600 24.300 141.300'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.440'
        strokeLinecap='round'
        opacity='.6'
      />
      <path
        d='M34.200 153.000 C25.200 153.000 18.900 150.300 18.000 144.900'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.260'
        strokeLinecap='round'
        opacity='.5'
      />
      <circle cx='53.100' cy='127.800' r='2.340' fill='#c0c0c0' opacity='.72' />
      <circle cx='40.500' cy='131.400' r='2.070' fill='#c0c0c0' opacity='.62' />
      <circle cx='31.500' cy='136.800' r='1.890' fill='#c0c0c0' opacity='.55' />
      <circle cx='23.400' cy='140.400' r='1.710' fill='#c0c0c0' opacity='.47' />
      <path
        d='M117.900 146.700 C121.500 139.500 126.900 134.100 125.100 128.700'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.980'
        strokeLinecap='round'
        opacity='.82'
      />
      <path
        d='M126.900 150.300 C133.200 143.100 140.400 138.600 137.700 132.300'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.800'
        strokeLinecap='round'
        opacity='.76'
      />
      <path
        d='M135.000 153.000 C142.200 146.700 149.400 144.000 147.600 137.700'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.620'
        strokeLinecap='round'
        opacity='.68'
      />
      <path
        d='M141.300 153.900 C149.400 150.300 155.700 147.600 155.700 141.300'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.440'
        strokeLinecap='round'
        opacity='.6'
      />
      <path
        d='M145.800 153.000 C154.800 153.000 161.100 150.300 162.000 144.900'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.260'
        strokeLinecap='round'
        opacity='.5'
      />
      <circle cx='126.900' cy='127.800' r='2.340' fill='#c0c0c0' opacity='.72' />
      <circle cx='139.500' cy='131.400' r='2.070' fill='#c0c0c0' opacity='.62' />
      <circle cx='148.500' cy='136.800' r='1.890' fill='#c0c0c0' opacity='.55' />
      <circle cx='156.600' cy='140.400' r='1.710' fill='#c0c0c0' opacity='.47' />
      <ellipse cx='90.000' cy='156.600' rx='8.100' ry='4.950' fill='#c0c0c0' opacity='.18' />
      <ellipse cx='90.000' cy='156.600' rx='5.850' ry='3.420' fill='#c0c0c0' opacity='.32' />
      <path d='M29.700 166.500 C29.700 163.800 46.800 162.000 90.000 162.000 C133.200 162.000 150.300 163.800 150.300 166.500 C150.300 178.200 135.000 183.600 90.000 184.500 C45.000 183.600 29.700 178.200 29.700 166.500 Z' fill='#c0c0c0' opacity='.09' />
      <path d='M29.700 165.600 C90.000 162.900 90.000 162.900 150.300 165.600' fill='none' stroke={`url(#${p}-gh)`} strokeWidth='1.080' />
      <path d='M36.000 184.500 C90.000 187.200 90.000 187.200 144.000 184.500' fill='none' stroke={`url(#${p}-gh)`} strokeWidth='1.080' />
      <polygon points='44.100,175.050 47.700,171.900 51.300,175.050 47.700,178.200' fill='#c0c0c0' opacity='.62' />
      <polygon points='135.900,175.050 132.300,171.900 128.700,175.050 132.300,178.200' fill='#c0c0c0' opacity='.62' />
      <text
        x='90.000'
        y='178.200'
        fontFamily="'Palatino Linotype',Palatino,'Book Antiqua',Georgia,serif"
        fontSize='19.800'
        fontWeight='bold'
        fill={`url(#${p}-gv)`}
        textAnchor='middle'
        dominantBaseline='middle'
        letterSpacing='5.850'
      >
        OPJ
      </text>
      <line x1='70.200' y1='46.800' x2='109.800' y2='46.800' stroke='#c0c0c0' strokeWidth='0.720' opacity='.38' />
      <circle cx='90.000' cy='46.800' r='1.800' fill='#c0c0c0' opacity='.42' />
      <path
        d='M75.600 1.350 C82.800 -4.500 97.200 -4.500 104.400 1.350'
        fill='none'
        stroke='#c0c0c0'
        strokeWidth='1.980'
        strokeLinecap='round'
        opacity='.6'
      />
      <circle cx='90.000' cy='-1.800' r='4.050' fill='#c0c0c0' opacity='.72' />
    </svg>
  );
}
