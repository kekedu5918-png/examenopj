'use client';

import { Fragment, type ReactNode } from 'react';

function parseItalicSegment(segment: string, keyBase: string): ReactNode {
  const parts = segment.split(/(\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.length >= 2 && p.startsWith('*') && p.endsWith('*')) {
      return (
        <em key={`${keyBase}-i-${i}`} className='italic text-blue-400'>
          {p.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={`${keyBase}-t-${i}`}>{p}</Fragment>;
  });
}

function parseLine(line: string, lineIndex: number): ReactNode {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.length >= 4 && p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={`${lineIndex}-b-${i}`} className='font-bold text-white'>
          {p.slice(2, -2)}
        </strong>
      );
    }
    return (
      <span key={`${lineIndex}-s-${i}`}>{parseItalicSegment(p, `${lineIndex}-${i}`)}</span>
    );
  });
}

/** Rendu **gras** et *italique* (markdown léger), sans HTML externe. */
export function FlashcardRichText({
  text,
  className,
  inline,
}: {
  text: string;
  className?: string;
  /** Une seule ligne, sans bloc <p> (ex. puce matériel) */
  inline?: boolean;
}) {
  const lines = text.split('\n');
  if (inline && lines.length === 1) {
    return (
      <span className={className}>
        {parseLine(lines[0]!, 0)}
      </span>
    );
  }
  return (
    <div className={className}>
      {lines.map((line, i) =>
        line.trim() === '' ? (
          <br key={i} />
        ) : (
          <p key={i} className='mb-1.5 text-base leading-relaxed text-gray-200 last:mb-0'>
            {parseLine(line, i)}
          </p>
        )
      )}
    </div>
  );
}
