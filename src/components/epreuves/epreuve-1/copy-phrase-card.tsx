'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/utils/cn';

type CopyPhraseCardProps = {
  badge: string;
  badgeClassName: string;
  title: string;
  text: string;
  note?: string;
};

export function CopyPhraseCard({ badge, badgeClassName, title, text, note }: CopyPhraseCardProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ description: 'Copié !' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ variant: 'destructive', description: 'Impossible de copier.' });
    }
  }

  return (
    <GlassCard className='relative' padding='p-6'>
      <div className='mb-3 flex flex-wrap items-start justify-between gap-3'>
        <div className='space-y-2'>
          <span
            className={cn('inline-block rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide', badgeClassName)}
          >
            {badge}
          </span>
          <h3 className='font-bold text-gray-100'>{title}</h3>
        </div>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={handleCopy}
          className='shrink-0 gap-2 text-gray-400 hover:bg-white/10 hover:text-white'
        >
          {copied ? <Check className='h-4 w-4 text-emerald-400' /> : <Copy className='h-4 w-4' />}
          {copied ? 'Copié' : 'Copier'}
        </Button>
      </div>
      <pre className='whitespace-pre-wrap rounded-xl bg-navy-900 p-4 font-mono text-sm leading-relaxed text-gray-300'>
        {text}
      </pre>
      {note ? <p className='mt-3 text-xs text-amber-400'>{note}</p> : null}
    </GlassCard>
  );
}
