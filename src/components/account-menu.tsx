'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoPersonCircleOutline } from 'react-icons/io5';

import {
  DropdownMenu,
  DropdownMenuArrow,
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
      <DropdownMenuTrigger className='rounded-full'>
        <IoPersonCircleOutline size={24} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='me-4'>
        <DropdownMenuItem asChild>
          <Link href='/dashboard'>Tableau de bord</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/account'>Mon compte</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogoutClick}>Déconnexion</DropdownMenuItem>
        <DropdownMenuArrow className='me-4 fill-white' />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
