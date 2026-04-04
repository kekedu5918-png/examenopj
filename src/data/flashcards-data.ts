import { flashcardsF01P1 } from '@/data/flashcards-f01-p1';
import { flashcardsF01Part2 } from '@/data/flashcards-f01-part2';
import { flashcardsF02Extensions } from '@/data/flashcards-f02-extensions';
import { flashcardsF03 } from '@/data/flashcards-f03';
import { flashcardsF04 } from '@/data/flashcards-f04';
import { flashcardsF05 } from '@/data/flashcards-f05';
import { flashcardsF06 } from '@/data/flashcards-f06';
import { flashcardsF07 } from '@/data/flashcards-f07';
import type { Flashcard } from '@/data/flashcards-types';

export type { Flashcard } from '@/data/flashcards-types';

export const flashcardsData: Flashcard[] = [
  ...flashcardsF01P1,
  ...flashcardsF01Part2,
  // ═══ F02 — Crimes et délits contre les biens (Partie 1 — Groupe 1 : Le vol) ═══
  {
    id: 'fc-f02-vol-legal',
    fascicule: 2,
    domaine: 'DPS',
    categorie: 'Atteintes aux biens',
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Le vol',
    nom: 'Le vol',
    definitionCourte: '**Le vol est la soustraction frauduleuse de la chose d\'autrui.**',
    materiel: [],
    moral: '',
    legal:
      "*L'article 311-1 du C.P.* définit le vol simple et *l'article 311-3 du C.P.* en prévoit la répression.",
  },
  {
    id: 'fc-f02-vol-mm',
    fascicule: 2,
    domaine: 'DPS',
    categorie: 'Atteintes aux biens',
    categorieSlug: 'atteintes-aux-biens',
    groupe: 'Le vol',
    nom: 'Le vol',
    definitionCourte: '**Le vol est la soustraction frauduleuse de la chose d\'autrui.**',
    materiel: [],
    moral: '',
    legal: '',
    materielMoralComplet: `**ÉLÉMENT MATÉRIEL :**

➤ *LA SOUSTRACTION*
- *Pour soustraire, il faut prendre, enlever, ravir*
- *La soustraction est réalisée à l'insu et/ou contre le gré*

➤ *LA CHOSE*
- *Une chose mobilière*
- *Une chose immobilière devenue mobilière*
- *L'énergie* (cas assimilé prévu à *l'article 311-2 du C.P.*)
- *L'information*

➤ *D'AUTRUI*
- *Une chose commune*
- *Une chose perdue*
- *Une épave*
- *Un trésor*
- *Une chose illicite*
Il ne peut pas y avoir vol à s'approprier :
- *Sa propre chose*
- *Une chose sans maître*
- *Une chose abandonnée*
- *Une personne humaine*

**ÉLÉMENT MORAL :**

➤ **CONSCIENCE DE SOUSTRAIRE UNE CHOSE QUI NE LUI APPARTIENT PAS**
➤ **VOLONTÉ DE SE COMPORTER, MÊME MOMENTANÉMENT, EN MAÎTRE DE LA CHOSE**`,
    versoFooter:
      "*L'article 311-1 du C.P.* définit le vol simple et *l'article 311-3 du C.P.* en prévoit la répression.",
  },
  ...flashcardsF02Extensions,
  ...flashcardsF03,
  ...flashcardsF04,
  ...flashcardsF05,
  ...flashcardsF06,
  ...flashcardsF07,
  {
    id: 'fc-f09-01',
    fascicule: 9,
    domaine: 'DPG',
    nom: 'La tentative',
    materiel: [
      "Un commencement d'exécution",
      "Une absence de désistement volontaire (l'acte est suspendu ou manque son effet en raison de circonstances indépendantes de la volonté de son auteur)",
    ],
    moral: "Intention coupable identique à celle de l'infraction consommée",
    legal: 'Art. 121-5 CP — Toujours punissable pour les crimes. Pour les délits : si le texte le prévoit. Pour les contraventions : jamais.',
  },
  {
    id: 'fc-f09-02',
    fascicule: 9,
    domaine: 'DPG',
    nom: 'La complicité',
    materiel: [
      'Un fait principal punissable',
      "Un acte matériel de complicité : aide ou assistance, provocation, fourniture d'instructions ou de moyens",
    ],
    moral: "Connaissance du caractère délictueux de l'acte et volonté de s'y associer (agit en connaissance de cause)",
    legal: "Prévue par l'art. 121-7 CP — Réprimée par l'art. 121-6 CP — Le complice est puni comme l'auteur",
  },
  {
    id: 'fc-f09-03',
    fascicule: 9,
    domaine: 'DPG',
    nom: 'La légitime défense',
    materiel: [
      'Une attaque réelle, actuelle et injustifiée',
      'Une riposte concomitante, nécessaire et proportionnée à la gravité de l’atteinte',
    ],
    moral: 'Volonté de se défendre face à une agression',
    legal: "Art. 122-5 CP — Cause d'irresponsabilité pénale (fait justificatif)",
  },
  {
    id: 'fc-f10-01',
    fascicule: 10,
    domaine: 'DPG',
    nom: 'Bande organisée (CA)',
    materiel: [
      'Infraction commise en réunion',
      'Les personnes sont structurées en bande organisée au sens de l’article 132-71 CP',
    ],
    moral: 'Intention de participer à l’infraction au sein du groupement',
    legal: 'Circonstance aggravante — art. 132-71 CP — relève les peines encourues',
  },
  {
    id: 'fc-f10-02',
    fascicule: 10,
    domaine: 'DPG',
    nom: 'Guet-apens (CA)',
    materiel: [
      'Attaque ou agression commise à l’issue d’un guet-apens',
      'Guet-apens : mise en place pour surprendre la victime',
    ],
    moral: 'Intention d’agresser dans le cadre du guet-apens',
    legal: 'Circonstance aggravante — art. 132-71-1 CP',
  },
  {
    id: 'fc-f12-01',
    fascicule: 12,
    domaine: 'Procédure pénale',
    nom: 'Garde à vue du majeur (durée initiale)',
    materiel: [
      'Placement en garde à vue d’un majeur',
      'Dans les conditions légales (motifs art. 62-2 CPP, notification des droits…)',
    ],
    moral: 'N/A (mesure d’enquête)',
    legal: 'Durée maximale initiale : 24 heures — prolongation possible (jusqu’à 24 h supplémentaires selon cas) — art. 706-88 et s. CPP',
  },
  {
    id: 'fc-f12-02',
    fascicule: 12,
    domaine: 'Procédure pénale',
    nom: 'Caractères de l’instruction préparatoire',
    materiel: [
      'Procédure écrite',
      'Secrète',
      'Non contradictoire (à ce stade)',
    ],
    moral: 'N/A',
    legal: 'Principes généraux du code de procédure pénale — instruction sous contrôle du juge d’instruction',
  },
  {
    id: 'fc-f14-01',
    fascicule: 14,
    domaine: 'Procédure pénale',
    nom: 'Mission de police judiciaire (art. 14 CPP)',
    materiel: [
      'Constater les infractions à la loi pénale',
      'En rassembler les preuves',
      'En rechercher les auteurs',
    ],
    moral: 'N/A (mission institutionnelle)',
    legal: 'Article 14 du Code de procédure pénale',
  },
  {
    id: 'fc-f15-01',
    fascicule: 15,
    domaine: 'Procédure pénale',
    nom: 'Nullité substantielle (fondement)',
    materiel: [
      'Violation d’une règle substantielle de procédure',
      'Atteinte aux droits de la défense ou à l’équité du procès',
    ],
    moral: 'N/A',
    legal: 'Fondement principal : article 171 du CPP — nullité d’office ou sur demande selon conditions',
  },
];
