'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserRound } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ActionResponse } from '@/types/action-response';

import { useToast } from './ui/use-toast';

export function AccountMenu({ signOut }: { signOut: () => Promise<ActionResponse> }) {
  const router = useRouter();
  const { toast } = useToast();

  async function handleLogoutClick() {
    const response = await signOut();

    if (response?.error) {
      toast({
        variant: 'destructive',
        description: 'Erreur lors de la déconnexion. Réessayez ou contactez le support.',
      });
    } else {
      router.refresh();

      toast({
        description: 'Vous avez été déconnecté.',
      });
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type='button'
          aria-label='Menu compte'
          className='inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/90 outline-none ring-offset-2 ring-offset-examen-canvas transition hover:bg-white/[0.08] hover:text-white focus-visible:ring-2 focus-visible:ring-examen-accent/50'
        >
          <UserRound className='h-6 w-6' strokeWidth={1.75} aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' sideOffset={8} className='min-w-[12rem] border-white/10 bg-examen-raised text-examen-ink'>
        <DropdownMenuItem asChild className='focus:bg-white/10'>
          <Link href='/account'>Mon espace</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='focus:bg-white/10'>
          <Link href='/dashboard/progression'>Statistiques</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className='focus:bg-white/10'>
          <Link href='/account'>Mon compte</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='focus:bg-white/10' onClick={handleLogoutClick}>
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
