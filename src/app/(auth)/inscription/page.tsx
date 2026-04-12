import Link from 'next/link';
import { redirect } from 'next/navigation';

import { InteriorPageShell } from '@/components/layout/InteriorPageShell';
import { GlassCard } from '@/components/ui/GlassCard';
import { SHELL_GLOW } from '@/constants/interior-shell-glow';
import { getSession } from '@/features/account/controllers/get-session';
import { hasPremiumAccess } from '@/features/account/controllers/has-premium-access';

import { AlreadySignedInPanel } from '../signup/already-signed-in';
import { SignUpForm } from '../signup/signup-form';

export default async function InscriptionPage() {
  const session = await getSession();
  const premium = session ? await hasPremiumAccess() : false;

  if (session && premium) {
    redirect('/account');
  }

  const alreadyConnectedNoPremium = session && !premium;

  return (
    <InteriorPageShell maxWidth='4xl' glow={SHELL_GLOW.auth} pad='compact' innerClassName='flex min-h-[70vh] items-center justify-center'>
    <main className='w-full max-w-md'>
      <GlassCard topGlow radius='3xl' padding='p-6' className='w-full space-y-4 shadow-xl shadow-black/30'>
        <h1 className='text-2xl font-bold text-slate-100'>
          {alreadyConnectedNoPremium ? 'Votre compte' : 'Créer un compte'}
        </h1>
        <p className='text-sm text-slate-400'>
          {alreadyConnectedNoPremium
            ? 'Poursuivez avec le contenu gratuit ou passez au Premium.'
            : "Dès la création du compte : 7 jours d’accès complet automatique (identique au Premium), puis freemium ou abonnement. Aucune carte bancaire pour s’inscrire."}
        </p>

        {alreadyConnectedNoPremium ? <AlreadySignedInPanel /> : <SignUpForm />}

        {!alreadyConnectedNoPremium ? (
          <p className='text-center text-sm text-slate-500'>
            Déjà inscrit ?{' '}
            <Link href='/login' className='text-blue-400 underline underline-offset-2'>
              Se connecter
            </Link>
          </p>
        ) : null}
        <p className='text-center text-xs text-slate-600'>
          En vous inscrivant, vous acceptez nos{' '}
          <Link href='/cgv' className='text-cyan-400 underline underline-offset-2'>
            CGV
          </Link>{' '}
          et nos{' '}
          <Link href='/mentions-legales' className='text-cyan-400 underline underline-offset-2'>
            mentions légales
          </Link>
          .
        </p>
      </GlassCard>
    </main>
    </InteriorPageShell>
  );
}
