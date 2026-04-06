import { GlassCard } from '@/components/ui/GlassCard';

/** Témoignages indicatifs — // TODO: remplacer par retours réels ou avis vérifiés lorsque disponibles. */
const TESTIMONIALS = [
  {
    initials: 'M.L.',
    role: 'Cadre de sécurité, session 2026',
    text: '« Les fiches par fascicule m’ont permis d’arriver aux écrits avec un fil clair. Le quiz quotidien m’a surtout servi à cibler ce que je fuyais. »',
  },
  {
    initials: 'S.T.',
    role: 'Candidat reconversion, brigade',
    text: '« L’articulation et les enquêtes types m’ont fait gagner un temps fou sur l’épreuve 2. Enfin un outil calé sur la logique de l’examen OPJ, pas du droit généraliste. »',
  },
  {
    initials: 'K.R.',
    role: 'OPJ en préparation écrite',
    text: '« Je combine récap priorité + flashcards le matin : 20 minutes et je vois tout de suite où je perds des points sur les éléments constitutifs. »',
  },
  {
    initials: 'A.D.',
    role: 'Prépa sur 4 mois',
    text: '« Le parcours m’a évité de tout vouloir faire à la fois. Semaine par semaine, je savais quoi lire et quoi m’entraîner. »',
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className='relative border-t border-white/[0.06] bg-examen-canvas py-20 md:py-24' aria-labelledby='temoignages-titre'>
      <div className='mx-auto max-w-6xl px-4'>
        <div className='mb-12 max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-widest text-examen-inkMuted'>Social proof</p>
          <h2 id='temoignages-titre' className='mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl'>
            Ils préparent avec ExamenOPJ
          </h2>
          {/* TODO: remplacer le sous-titre par des avis vérifiés / lien Trustindex si pertinent. */}
          <p className='mt-3 text-sm text-examen-inkMuted'>Retours de candidats en phase de préparation (illustrations).</p>
        </div>
        <div className='grid gap-5 sm:grid-cols-2'>
          {TESTIMONIALS.map((t) => (
            <GlassCard key={t.initials + t.role} padding='p-6' className='border-white/10'>
              <div className='flex items-center gap-3'>
                <span
                  className='flex h-12 w-12 items-center justify-center rounded-full bg-examen-accent/20 text-sm font-bold text-examen-accent'
                  aria-hidden
                >
                  {t.initials}
                </span>
                <div>
                  <p className='text-sm font-semibold text-white'>{t.initials}</p>
                  <p className='text-xs text-examen-inkMuted'>{t.role}</p>
                </div>
              </div>
              <p className='mt-4 text-sm leading-relaxed text-examen-inkMuted'>{t.text}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
