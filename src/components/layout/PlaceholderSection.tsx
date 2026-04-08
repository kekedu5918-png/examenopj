import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

type PlaceholderSectionProps = {
  badge: string;
  badgeClassName?: string;
  title: string;
  subtitle: string;
};

export function PlaceholderSection({ badge, badgeClassName, title, subtitle }: PlaceholderSectionProps) {
  return (
    <div className='mx-auto max-w-3xl px-4 py-20'>
      <SectionTitle badge={badge} badgeClassName={badgeClassName} title={title} subtitle={subtitle} />
      <GlassCard className='mt-10' padding='p-10'>
        <p className='text-center text-lg text-gray-400'>Cette section arrive bientôt.</p>
      </GlassCard>
    </div>
  );
}
