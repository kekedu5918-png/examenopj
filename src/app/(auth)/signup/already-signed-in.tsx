import Link from 'next/link';

import { Button } from '@/components/ui/button';

/** Affiché quand l’utilisateur est déjà connecté : les liens depuis /pricing ne doivent pas reboucler sur /signup → /pricing. */
export function AlreadySignedInPanel() {
  return (
    <div className='space-y-4'>
      <div className='rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-100'>
        <p className='font-medium'>Vous êtes déjà connecté.</p>
        <p className='mt-1 text-amber-100/90'>
          L&apos;essai de 7 jours concerne la création d&apos;un nouveau compte. En freemium, vous avez accès aux fascicules,
          au récapitulatif et à des quotas quotidiens quiz / flashcards. Pour tout débloquer, souscrivez au Premium
          (paiement sécurisé).
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        <Button
          asChild
          className='w-full bg-gold-500 font-semibold text-navy-950 hover:bg-gold-400'
        >
          <Link href='/entrainement'>Accéder à l&apos;entraînement</Link>
        </Button>
        <Button asChild variant='outline' className='w-full border-white/20 text-white hover:bg-white/10'>
          <Link href='/pricing#offres-paiement'>Choisir une offre Premium</Link>
        </Button>
        <Button asChild variant='ghost' className='w-full text-slate-400 hover:text-white'>
          <Link href='/'>Retour à l&apos;accueil</Link>
        </Button>
      </div>
    </div>
  );
}
