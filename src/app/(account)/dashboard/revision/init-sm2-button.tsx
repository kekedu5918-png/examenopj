'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { initSM2FromFlashcardReviews } from '@/features/examenopj/actions/sm2-review';

export function InitSM2Button() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [created, setCreated] = useState(0);

  async function handleInit() {
    setState('loading');
    const res = await initSM2FromFlashcardReviews();
    setCreated(res.created);
    setState('done');
    router.refresh();
  }

  if (state === 'done') {
    return (
      <p className='text-sm text-emerald-400'>
        ✓ {created} carte{created !== 1 ? 's' : ''} importée{created !== 1 ? 's' : ''} dans SM-2
      </p>
    );
  }

  return (
    <Button
      size='sm'
      variant='secondary'
      onClick={handleInit}
      disabled={state === 'loading'}
    >
      {state === 'loading' ? (
        <Loader2 className='mr-1.5 h-3.5 w-3.5 animate-spin' />
      ) : (
        <Download className='mr-1.5 h-3.5 w-3.5' />
      )}
      Importer mes révisions existantes
    </Button>
  );
}
