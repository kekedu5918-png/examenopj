/**
 * Fil de révision « par leçons » : ordre pédagogique pour le candidat,
 * sans coller à l’index numéroté du programme (disponible plus bas).
 */

export type CoursRevisionEtape = {
  id: string;
  ordre: number;
  titre: string;
  accroche: string;
  dureeIndicative: string;
  objectifs: string[];
  liens: { href: string; label: string }[];
};

export const COURS_REVISION_FIL: CoursRevisionEtape[] = [
  {
    id: 'proc',
    ordre: 1,
    titre: 'Comprendre le procès pénal et votre rôle',
    accroche: 'Avant les infractions : phases, OPJ / APJ, parquet et juridictions — c’est le socle de toute copie et de tout ME1.',
    dureeIndicative: '½ à 1 journée',
    objectifs: ['Lecture active des fiches « Fondamentaux » procédure', 'À relier à votre support procédure (ME2 / formation)'],
    liens: [
      { href: '/fondamentaux', label: 'Fondamentaux procédure' },
      { href: '/fondamentaux', label: 'Vue d’ensemble du programme' },
    ],
  },
  {
    id: 'cadres',
    ordre: 2,
    titre: 'Cadres d’enquête et coercition',
    accroche: 'Flagrance, préliminaire, auditions, GAV, contrôles : c’est ce qui structure vos PV et votre articulation.',
    dureeIndicative: '1 à 2 jours',
    objectifs: ['Maîtriser durées et visas', 'Relier chaque acte au bon état procédural'],
    liens: [
      { href: '/fondamentaux/cadres-enquete', label: 'Cadres d’enquête' },
      { href: '/fondamentaux/garde-a-vue', label: 'Garde à vue' },
    ],
  },
  {
    id: 'personnes',
    ordre: 3,
    titre: 'Atteintes aux personnes (priorité rédactionnelle)',
    accroche: 'Violences, atteintes sexuelles, formes aggravées : très présentes à l’examen ; apprenez les éléments type par thème.',
    dureeIndicative: '3 à 5 jours',
    objectifs: ['Tableau récap + référentiel infractions (personnes)', 'Flashcards densifiées sur les peines et qualifications'],
    liens: [
      { href: '/entrainement/recapitulatif?f=f01p1', label: 'Récap partie 1 — personnes' },
      { href: '/infractions?q=violences', label: 'Référentiel — violences' },
    ],
  },
  {
    id: 'biens',
    ordre: 4,
    titre: 'Atteintes aux biens et à la confiance',
    accroche: 'Vols, escroqueries, abus de confiance, recel : mécanique des éléments et articulation avec la plaine / PV.',
    dureeIndicative: '3 à 4 jours',
    objectifs: ['Distinguer éléments matériel / moral par famille', 'Quiz ciblé DPS patrimoine'],
    liens: [
      { href: '/fondamentaux/crimes-biens', label: 'Synthèse — atteintes aux biens' },
      { href: '/quiz?f=f02', label: 'Quiz thème 02' },
    ],
  },
  {
    id: 'circu-stup',
    ordre: 5,
    titre: 'Route, stupéfiants, armes, atteintes aux institutions',
    accroche: 'Blocs à régimes spéciaux : seuils de taux, classifications, infractions aux personnes dépositaires de l’autorité publique.',
    dureeIndicative: '3 à 5 jours',
    objectifs: ['Textes du Code de la route et C.S.P. utiles à l’examen OPJ', 'Outrage, rébellion, faux et usage'],
    liens: [
      { href: '/fondamentaux', label: 'Thème 03 — circulation' },
      { href: '/fondamentaux', label: 'Thème 05 — stupéfiants' },
      { href: '/infractions?q=outrage', label: 'Référentiel — atteintes SP' },
    ],
  },
  {
    id: 'dpg-trans',
    ordre: 6,
    titre: 'Droit pénal général et règles transverses',
    accroche: 'Tentative, complicité, circonstances, prescription, concours d’infractions : fil conducteur pour toutes les hypothèses.',
    dureeIndicative: '2 à 4 jours',
    objectifs: ['Questions transverses en quiz « domaine DPG »', 'Pas de révision sans relecture Légifrance sur les articles cités'],
    liens: [
      { href: '/quiz?mode=domain&domain=DPG', label: 'Quiz DPG' },
      { href: '/fondamentaux', label: 'Synthèse DPG' },
    ],
  },
  {
    id: 'epr2',
    ordre: 7,
    titre: 'Épreuve 2 : ME1, enquêtes, articulation',
    accroche: 'Une leçon = une séance de mise en forme : PV comme sur le support officiel ME1, puis sujets complets et oral structuré.',
    dureeIndicative: 'En continu jusqu’à l’examen OPJ',
    objectifs: ['Deux colonnes, huis clos, chronologie', 'Enchaînement minute par minute sur des sujets types'],
    liens: [
      { href: '/entrainement/redaction-pv', label: 'Procès-verbaux ME1' },
      { href: '/enquetes', label: 'Enquêtes type examen OPJ' },
      { href: '/entrainement/articulation', label: 'Articulation' },
    ],
 },
];
