import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';

import { signInWithPassword } from '../auth-actions';

export default async function LoginPage() {
  const session = await getSession();
  const subscription = await getSubscription();

  if (session && subscription) {
    redirect('/account');
  }

  if (session && !subscription) {
    redirect('/pricing');
  }

  async function signInAction(formData: FormData) {
    'use server';
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    const response = await signInWithPassword(email, password);
    if (!response.error) redirect('/dashboard');
    redirect('/login?error=1');
  }

  return (
    <main className='mx-auto flex min-h-[70vh] w-full max-w-md items-center px-4'>
      <form action={signInAction} className='w-full space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-6'>
        <h1 className='text-2xl font-bold text-slate-100'>Connexion</h1>
        <Input name='email' type='email' placeholder='Email' required />
        <Input name='password' type='password' placeholder='Mot de passe' required />
        <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700'>
          Se connecter
        </Button>
      </form>
    </main>
  );
}
