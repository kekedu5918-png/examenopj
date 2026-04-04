'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { cn } from '@/utils/cn';

interface CopyBoxProps {
  label: string;
  tag?: string;
  text: string;
  note?: string;
}

export function CopyBox({ label, tag, text, note }: CopyBoxProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className='overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950'>
      <div className='flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2.5'>
        <div className='flex min-w-0 items-center gap-2'>
          {tag ? (
            <span className='rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-500'>
              {tag}
            </span>
          ) : null}
          <span className='truncate text-xs font-medium text-zinc-400'>{label}</span>
        </div>
        <button
          type='button'
          onClick={copy}
          className={cn(
            'flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-all',
            copied
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
          )}
        >
          {copied ? <Check className='h-3 w-3' /> : <Copy className='h-3 w-3' />}
          {copied ? 'Copié !' : 'Copier'}
        </button>
      </div>
      <div className='px-4 py-3'>
        <pre className='whitespace-pre-wrap font-mono text-sm leading-relaxed text-zinc-300'>{text}</pre>
      </div>
      {note ? (
        <div className='px-4 pb-3 pt-0'>
          <p className='text-xs italic text-zinc-600'>{note}</p>
        </div>
      ) : null}
    </div>
  );
}
