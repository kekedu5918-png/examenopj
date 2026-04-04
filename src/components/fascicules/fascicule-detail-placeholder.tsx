import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { fasciculesList } from '@/data/fascicules-list';

const domainBadge: Record<(typeof fasciculesList)[number]['domaine'], string> = {
  DPS: 'bg-red-500/20 text-red-300',
  DPG: 'bg-violet-500/20 text-violet-300',
  'Procédure pénale': 'bg-blue-500/20 text-blue-300',
};

export function FasciculeDetailPlaceholder({ numero }: { numero: number }) {
  const meta = fasciculesList.find((f) => f.numero === numero);
  if (!meta) notFound();

  return (
    <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 px-4 py-16 md:px-6 md:py-20'>
      <div className='mx-auto max-w-3xl'>
        <SectionTitle
          badge={meta.domaineLabel}
          badgeClassName={domainBadge[meta.domaine]}
          title={`Fascicule ${meta.numero} — ${meta.titre}`}
          className='mb-8'
        />
        <GlassCard padding='p-8' className='text-center'>
          <p className='text-lg text-gray-400'>
            Le contenu détaillé de ce fascicule sera disponible prochainement.
          </p>
          <Button variant='outline' className='mt-8 border-white/20 bg-white/5 text-gray-200 hover:bg-white/10' asChild>
            <Link href='/fascicules'>Retour aux fascicules</Link>
          </Button>
        </GlassCard>
      </div>
    </div>
  );
}
