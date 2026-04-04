import type { EnqueteMeta } from '@/data/enquetes-types';

export type { EnqueteDocument, EnqueteMeta } from '@/data/enquetes-types';

export const ENQUETES: EnqueteMeta[] = [
  {
    id: 'alpha',
    code: 'ALPHA',
    titre: "Enquête Alpha — Vol et atteinte aux biens",
    cadre: 'Flagrant délit',
    resume:
      "Vol dans un local d'habitation. La victime surprend un individu en train de fouiller son buffet. Enquête en flagrance, identification par fichier TAJ, interpellation, GAV, perquisition, restitution.",
    qualification: "Vol dans un local d'habitation",
    articles: 'Art. 311-1 et 311-4 6° C.P.',
    personnages: {
      opj: 'Brigadier Chef de Police Paul DUCHAMPS',
      victime: 'Mme Danielle POTIN',
      misCause: 'Paul DESVIGNES',
    },
    lieu: 'Clermont-Ferrand (63)',
    date: '10 septembre 20AA',
    procedure: 'n° 20AA/1000',
    documents: [
      { id: 'alpha-sujet', type: 'sujet', label: "Sujet de l'enquête" },
      { id: 'alpha-articulation', type: 'articulation', label: 'Articulation de procédure' },
      { id: 'alpha-pv', type: 'pv', label: 'PV de plainte' },
      { id: 'alpha-rapport', type: 'rapport', label: 'Rapport de synthèse' },
    ],
    premium: false,
  },
  {
    id: 'bravo',
    code: 'BRAVO',
    titre: 'Enquête Bravo — Violences volontaires aggravées',
    cadre: "Flagrant délit → Enquête préliminaire (changement de cadre)",
    resume:
      "Violences volontaires avec arme sur un enseignant par un mineur masqué. Changement de cadre juridique en cours d'enquête (flagrance → préliminaire). GAV mineur, confrontation, saisine incidente.",
    qualification: 'Violences volontaires aggravées avec arme',
    articles: 'Art. 222-12 C.P.',
    personnages: {
      opj: 'Brigadier Chef de Police Paul DUCHAMPS',
      victime: 'M. Alain VILLA',
      misCause: 'Raoul VERT, mineur âgé de 15 ans',
    },
    lieu: 'Beaumont / Clermont-Ferrand (63)',
    date: '11 décembre 20AA',
    procedure: 'n° 20AA/2222',
    documents: [
      { id: 'bravo-sujet', type: 'sujet', label: "Sujet de l'enquête" },
      { id: 'bravo-articulation', type: 'articulation', label: 'Articulation de procédure' },
      {
        id: 'bravo-articulation-suite',
        type: 'articulation-suite',
        label: 'Articulation suite — Saisine incidente',
      },
      { id: 'bravo-rapport', type: 'rapport', label: 'Rapport de synthèse' },
    ],
    premium: true,
  },
];

export function getEnqueteById(id: string): EnqueteMeta | undefined {
  return ENQUETES.find((e) => e.id === id);
}
