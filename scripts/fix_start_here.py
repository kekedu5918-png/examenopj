import sys
sys.stdout.reconfigure(encoding='utf-8')

FILE = r'C:\Users\lenov\Desktop\examenopj\src\components\home\sections\home-refonte-sections.tsx'

NEW_SECTION = r'''/** Section 2 — Par où commencer (homepage). */
export function StartHereSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  const cards = [
    {
      Icon: Map,
      color: 'blue' as const,
      step: '01',
      title: 'Je découvre',
      text: 'Comprendre les 3 épreuves, les coefficients et le déroulé du jour J.',
      cta: 'Voir les épreuves',
      href: '/epreuves',
    },
    {
      Icon: BookOpen,
      color: 'violet' as const,
      step: '02',
      title: 'Je révise le fond',
      text: 'Fiches fondamentaux, infractions et procédure alignées sur les fascicules.',
      cta: 'Ouvrir les fondamentaux',
      href: '/fondamentaux',
    },
    {
      Icon: Crosshair,
      color: 'cyan' as const,
      step: '03',
      title: "Je m'entraîne",
      text: "Enquêtes types, modèles de PV et articulation comme en formation.",
      cta: 'Lancer une enquête',
      href: '/cours/enquetes',
    },
  ] as const;

  const colorMap = {
    blue:   { icon: 'border-blue-500/20 bg-blue-500/10 text-blue-400',    card: 'hover:border-blue-500/30 hover:bg-blue-500/[0.04]',    step: 'text-blue-500/40' },
    violet: { icon: 'border-violet-500/20 bg-violet-500/10 text-violet-400', card: 'hover:border-violet-500/30 hover:bg-violet-500/[0.04]', step: 'text-violet-500/40' },
    cyan:   { icon: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400',    card: 'hover:border-cyan-500/30 hover:bg-cyan-500/[0.04]',    step: 'text-cyan-500/40' },
  } as const;

  return (
    <motion.section
      className='border-t border-white/[0.05] bg-[#080F1E] px-4 py-20 md:py-28'
      aria-labelledby='start-here-title'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className='mx-auto max-w-6xl'>
        <SectionTitle
          titleId='start-here-title'
          badge='PARCOURS'
          badgeClassName='bg-cyan-500/15 text-cyan-300 border-cyan-500/20'
          title='Par où commencer ?'
          subtitle='Selon où tu en es, voici le chemin.'
          className='mx-auto mb-14 max-w-2xl text-center'
        />
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {cards.map((c, i) => {
            const colors = colorMap[c.color];
            return (
              <motion.div
                key={c.href}
                initial={MOTION_INITIAL_FOR_SEO}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, ease: LANDING_EASE, delay: i * 0.08 }}
              >
                <MotionLink
                  href={c.href}
                  className={[
                    'group relative flex h-full flex-col overflow-hidden rounded-2xl',
                    'border border-white/[0.07] bg-white/[0.025] p-6',
                    'transition-all duration-300',
                    colors.card,
                    'shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
                  ].join(' ')}
                  whileTap={{ scale: 0.97 }}
                  whileHover={shouldReduce ? {} : { y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <span
                    className={['pointer-events-none absolute right-4 top-3 font-mono text-5xl font-black', colors.step].join(' ')}
                    aria-hidden
                  >
                    {c.step}
                  </span>
                  <span className='pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' aria-hidden />
                  <span className={['flex h-11 w-11 items-center justify-center rounded-xl border', colors.icon].join(' ')}>
                    <c.Icon className='h-5 w-5' strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className='mt-5 font-sans text-lg font-bold text-white'>{c.title}</h3>
                  <p className='mt-2 flex-1 text-sm leading-relaxed text-slate-400'>{c.text}</p>
                  <span className='mt-7 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors group-hover:text-white'>
                    {c.cta}
                    <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' aria-hidden />
                  </span>
                </MotionLink>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

'''

content = open(FILE, encoding='utf-8').read()
MARKER_START = '/** Section 2'
MARKER_END = '/** Section 3'
start = content.find(MARKER_START)
end = content.find(MARKER_END)
print(f'start={start}, end={end}')
if start < 0 or end < 0:
    print('ERROR: markers not found')
    exit(1)
new_content = content[:start] + NEW_SECTION + content[end:]
open(FILE, 'w', encoding='utf-8').write(new_content)
print('OK - new length:', len(new_content))
