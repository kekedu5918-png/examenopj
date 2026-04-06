import Link from 'next/link';
import { ArrowRight, BookOpen, Brain, ClipboardCheck, LineChart, PenLine } from 'lucide-react';

const PHASES = [
  {
    id: 'comprendre',
    titre: 'Comprendre',
    icone: BookOpen,
    texte:
      'Lisez une fiche ou un fondamental en cherchant activement : pourquoi cette règle, quel piège au concours ? Ne serrez pas les yeux : surlignez, reformulez à voix basse.',
    liens: [
      { href: '/fondamentaux', label: 'Fondamentaux' },
      { href: '/cours/modules', label: 'Fiches thématiques' },
    ],
  },
  {
    id: 'fixer',
    titre: 'Fixer en mémoire',
    icone: Brain,
    texte:
      'Même notion sur trois jours : référentiel infractions (L / M / M mot pour mot), puis flashcards. Le tableau trié « probabilité examen » indique quoi prioriser.',
    liens: [
      { href: '/infractions', label: 'Référentiel infractions' },
      { href: '/flashcards', label: 'Flashcards' },
    ],
  },
  {
    id: 'appliquer',
    titre: 'Appliquer',
    icone: PenLine,
    texte:
      'Recopiez un modèle de PV, articulez faits → qualification → actes. C’est ce qui différencie la lecture passive d’une copie qui tient à l’examen.',
    liens: [
      { href: '/entrainement/redaction-pv', label: 'Atelier PV' },
      { href: '/entrainement/articulation', label: 'Articulation' },
    ],
  },
  {
    id: 'controler',
    titre: 'Contrôler',
    icone: ClipboardCheck,
    texte:
      'Quiz pour les angles morts, sujets blancs pour la tenue dans le temps. Corrigez avec le barème en tête, pas avec l’impression générale.',
    liens: [
      { href: '/quiz', label: 'Quiz' },
      { href: '/sujets-blancs', label: 'Sujets blancs' },
    ],
  },
] as const;

const ACCES_RAPIDES = [
  { href: '/fondamentaux', label: 'Socle procédural', desc: 'GAV, cadres, mandats, auditions…', accent: 'border-violet-500/35 bg-violet-500/10 text-violet-100' },
  { href: '/infractions', label: 'Qualifications', desc: 'Tri famille + probabilité examen', accent: 'border-rose-500/35 bg-rose-500/10 text-rose-50' },
  { href: '/cours#cours-logique-candidat', label: 'Thèmes P0', desc: 'Ce que le jury cible souvent', accent: 'border-amber-500/35 bg-amber-500/10 text-amber-50' },
  { href: '/cours/modules', label: 'Toutes les fiches', desc: 'Vue priorité ou programme officiel', accent: 'border-cyan-500/35 bg-cyan-500/10 text-cyan-50' },
  { href: '/entrainement', label: 'Entraînement', desc: 'Par épreuve 1 · 2 · 3', accent: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-50' },
  { href: '/parcours-candidat', label: 'Parcours semaines', desc: 'Checklist et phases', accent: 'border-slate-500/35 bg-slate-600/15 text-slate-100' },
] as const;

/**
 * Bloc méthodologique : le candidat sait « quoi faire » entre lecture, mémoire, production écrite et contrôle.
 */
export function CoursMethodeRevision() {
  return (
    <section className='mt-12' aria-labelledby='cours-methode-title'>
      <div className='flex flex-col gap-3 md:flex-row md:items-end md:justify-between'>
        <div>
          <p className='text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400/90'>Méthode</p>
          <h2 id='cours-methode-title' className='font-display text-xl font-bold text-white md:text-2xl'>
            Comment apprendre vraiment (pas seulement relire)
          </h2>
          <p className='mt-2 max-w-3xl text-sm leading-relaxed text-gray-400'>
            Les meilleurs sites de révision combinent <strong className='font-medium text-gray-200'>clairvoyance</strong>{' '}
            (quoi traiter en premier) et <strong className='font-medium text-gray-200'>boucles actives</strong> : comprendre →
            mémoriser → écrire → vérifier. Enchaînez les blocs ci‑dessous ; une session type dure 45–90 minutes.
          </p>
        </div>
        <div className='flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-gray-400'>
          <LineChart className='h-4 w-4 text-cyan-400' aria-hidden />
          <span>
            Pensez « spirale » : revenez sur le même thème après avoir pratiqué ailleurs — la rétention augmente.
          </span>
        </div>
      </div>

      <ol className='mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {PHASES.map((phase, i) => {
          const Icon = phase.icone;
          return (
            <li
              key={phase.id}
              className='relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-5 shadow-lg shadow-black/20'
            >
              <div className='mb-3 flex items-center gap-2'>
                <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500/15 text-xs font-black text-gold-200'>
                  {i + 1}
                </span>
                <Icon className='h-5 w-5 text-cyan-400/90' aria-hidden />
                <h3 className='font-display text-base font-semibold text-white'>{phase.titre}</h3>
              </div>
              <p className='flex-1 text-sm leading-relaxed text-gray-400'>{phase.texte}</p>
              <div className='mt-4 flex flex-wrap gap-2'>
                {phase.liens.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className='inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-500/20'
                  >
                    {l.label}
                    <ArrowRight className='h-3 w-3' aria-hidden />
                  </Link>
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      <div className='mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.07] p-5 md:p-6'>
        <h3 className='font-display text-lg font-bold text-white'>Feuille de route express</h3>
        <p className='mt-2 text-sm text-gray-400'>
          Si vous ne devez ouvrir que quelques portes aujourd’hui, privilégiez ce chemin — puis le fil en 7 leçons pour la
          profondeur.
        </p>
        <ul className='mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {ACCES_RAPIDES.map((a) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className={`flex h-full flex-col rounded-xl border p-4 transition hover:-translate-y-0.5 hover:shadow-lg ${a.accent}`}
              >
                <span className='font-display font-semibold text-white'>{a.label}</span>
                <span className='mt-1 text-xs text-white/75'>{a.desc}</span>
                <span className='mt-3 inline-flex items-center text-xs font-semibold text-white/90'>
                  Ouvrir <ArrowRight className='ml-1 h-3 w-3' aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
