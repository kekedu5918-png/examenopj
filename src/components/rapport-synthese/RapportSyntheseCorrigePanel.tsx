'use client';

import { rapportPerpignanExemple } from '@/data/rapport-synthese-f16-exemple-perpignan';

const NOTES: { cible: string; texte: string }[] = [
  {
    cible: 'Cadre',
    texte:
      'L’introduction indique une enquête « en flagrant délit » et l’assistance des fonctionnaires : cohérent avec la saisine et la suite procédurale décrite (GAV, perquisition, etc.).',
  },
  {
    cible: 'Qualification',
    texte:
      'La conclusion rattache les faits à l’article 222-12 C. pén. (violences avec ITT supérieure à 8 jours et usage d’arme) : à rapprocher du certificat médical (ITT 14 jours) et du couteau saisi.',
  },
  {
    cible: 'Neutralité',
    texte:
      'Le style est au passé et à la troisième personne ou impersonnel (« il ressort », « M. X pourrait être poursuivi »), conforme aux usages du rapport de synthèse.',
  },
];

/**
 * Exemple corrigé annoté — texte F16 (PERPIGNAN) + encadrés pédagogiques.
 */
export function RapportSyntheseCorrigePanel() {
  const a = rapportPerpignanExemple;
  const doc = [
    a.entete,
    '',
    a.objet,
    a.affaire,
    a.references,
    a.piecesJointes,
    '',
    a.introduction,
    '',
    a.lesFaits,
    '',
    a.lenquete,
    '',
    a.conclusionTitreEtCorps,
    '',
    a.etatCivil,
    '',
    a.vuEtTransmis,
    '',
    a.destinataires,
  ].join('\n');

  return (
    <div className='space-y-6'>
      <p className='text-sm text-examen-inkMuted'>
        Exemple issu du fascicule F16 (affaire PERPIGNAN — Tony LOPEZ / David ESPINOS). Ce n’est pas l’affaire VERT/VILLA
        (Clermont) du cahier B7 : celle-ci fera l’objet d’un ajout lorsque le fichier source sera dans le dépôt.
      </p>

      <div className='grid gap-6 lg:grid-cols-[1fr_minmax(220px,280px)]'>
        <div className='overflow-x-auto rounded-lg border border-neutral-300 bg-white p-4 shadow-sm md:p-8'>
          <pre className='whitespace-pre-wrap font-serif text-[13px] leading-relaxed text-gray-900 md:text-[14px]'>
            {doc}
          </pre>
        </div>
        <aside className='space-y-4 rounded-xl border border-white/10 bg-examen-card p-4'>
          <h3 className='font-display text-sm font-bold text-white'>Annotations</h3>
          <ul className='space-y-4 text-xs leading-relaxed text-examen-inkMuted'>
            {NOTES.map((n) => (
              <li key={n.cible}>
                <p className='font-semibold text-examen-accent'>{n.cible}</p>
                <p className='mt-1'>{n.texte}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
