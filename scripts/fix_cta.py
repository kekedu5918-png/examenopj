import sys
sys.stdout.reconfigure(encoding='utf-8')

FILE = r'C:\Users\lenov\Desktop\examenopj\src\components\home\sections\home-refonte-sections.tsx'
content = open(FILE, encoding='utf-8').read()

# Trouver la fonction HomeFinalPricingSection
marker_fn = "/** Section 8 \u2014 CTA final + pricing r\u00e9sum\u00e9. */"
marker_next = "export function HomeProgrammeCompletSection"

start = content.find(marker_fn)
end = content.find(marker_next)
print(f"start={start}, end={end}")

NEW_SECTION = '''/** Section 8 \u2014 CTA final + pricing r\u00e9sum\u00e9. */
export function HomeFinalPricingSection() {
  const shouldReduce = useReducedMotion();
  const MotionLink = motion(Link);
  const daysLeft = getDaysUntilExam();

  return (
    <motion.section
      className='relative overflow-hidden border-t border-white/[0.05] px-4 py-20 md:py-28'
      initial={shouldReduce ? {} : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Fond d\u00e9grad\u00e9 */}
      <div className='pointer-events-none absolute inset-0 bg-gradient-to-b from-[#080F1E] via-[#0C1525] to-[#080F1E]' aria-hidden />
      {/* Orb centr\u00e9 */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.10)_0%,transparent_65%)]' aria-hidden />

      <div className='relative mx-auto max-w-5xl'>
        <div className='mb-12 text-center'>
          <p className='mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-400'>
            J-{daysLeft} \u2014 Session 2026
          </p>
          <h2 className='font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl'>
            Pr\u00eat \u00e0 commencer\u00a0?
          </h2>
          <p className='mx-auto mt-4 max-w-xl text-base text-slate-400'>
            Acc\u00e8s gratuit pour d\u00e9marrer. Premium pour aller au bout.
          </p>
        </div>

        <div className='grid gap-5 md:grid-cols-2 md:items-stretch'>
          {/* Gratuit */}
          <div className='flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7 transition-all hover:border-white/[0.14]'>
            <p className='text-xs font-bold uppercase tracking-widest text-slate-500'>Gratuit</p>
            <h3 className='mt-2 font-sans text-2xl font-extrabold text-white'>0\u00a0\u20ac</h3>
            <p className='mt-1 text-sm text-slate-400'>Pour tester le rythme et la m\u00e9thode.</p>
            <ul className='mt-5 flex-1 space-y-2.5 text-sm text-slate-300'>
              {[
                '6 fiches fondamentaux',
                '5 questions de quiz / jour',
                'Parcours guid\u00e9 \u00e9tape par \u00e9tape',
              ].map((f) => (
                <li key={f} className='flex items-start gap-2.5'>
                  <span className='mt-0.5 text-emerald-400'>\u2713</span>
                  {f}
                </li>
              ))}
            </ul>
            <MotionLink
              href='/inscription'
              className='mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]'
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label='Cr\u00e9er un compte gratuit'
            >
              Cr\u00e9er mon acc\u00e8s gratuit
            </MotionLink>
          </div>

          {/* Premium */}
          <div className='relative flex flex-col overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/15 via-[#0E1B2E] to-violet-600/10 p-7 md:-translate-y-1'>
            <span className='absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-lg'>
              Recommand\u00e9
            </span>
            <span className='pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400' aria-hidden />

            <div className='mb-4 flex items-center gap-2'>
              <Sparkles className='h-4 w-4 text-blue-400' aria-hidden />
              <p className='text-xs font-bold uppercase tracking-widest text-blue-400'>Premium</p>
            </div>
            <h3 className='font-sans text-2xl font-extrabold text-white'>
              9,90\u00a0\u20ac<span className='text-base font-normal text-slate-400'>/mois</span>
            </h3>
            <p className='mt-1 text-sm text-slate-400'>ou 49\u00a0\u20ac acc\u00e8s jusqu&apos;au 11 juin</p>
            <ul className='mt-5 flex-1 space-y-2.5 text-sm text-slate-300'>
              {[
                'Tout le contenu \u2014 15 fascicules',
                'Enqu\u00eates compl\u00e8tes avec corrections',
                "Mod\u00e8les de PV et articulation",
                'Quiz illimit\u00e9s + r\u00e9p\u00e9tition espac\u00e9e',
              ].map((f) => (
                <li key={f} className='flex items-start gap-2.5'>
                  <span className='mt-0.5 text-blue-400'>\u2713</span>
                  {f}
                </li>
              ))}
            </ul>
            <MotionLink
              href='/pricing'
              className='mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition hover:shadow-[0_0_28px_rgba(37,99,235,0.45)]'
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              aria-label="Voir les d\u00e9tails de l'offre Premium"
            >
              Voir les d\u00e9tails
              <ArrowRight className='h-4 w-4' aria-hidden />
            </MotionLink>
          </div>
        </div>

        <p className='mt-10 text-center text-xs text-slate-600'>
          R\u00e9dig\u00e9 par un gardien de la paix en formation OPJ pr\u00e9sentielle \u00b7 Paris \u00b7 Session 2026
        </p>
      </div>
    </motion.section>
  );
}

'''

if start < 0 or end < 0:
    print('ERROR: markers not found')
    exit(1)

new_content = content[:start] + NEW_SECTION + content[end:]
open(FILE, 'w', encoding='utf-8').write(new_content)
print('OK - new length:', len(new_content))
