export type HeroQuizOption = { id: string; text: string; correct: boolean };

export type HeroQuizQuestion = {
  id: string;
  prompt: string;
  options: HeroQuizOption[];
  /** Affiché si mauvaise réponse. */
  wrongHint: string;
  /** Affiché après réponse (réussite ou échec). */
  explain: string;
};

export const HERO_QUIZ_QUESTIONS: HeroQuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Les conditions d’une soustraction frauduleuse sont réunies lorsque…',
    options: [
      { id: 'A', text: 'Le bien a une valeur inférieure à 300 €', correct: false },
      { id: 'B', text: 'Le prévenu agit sans violence et sans contrainte', correct: true },
      { id: 'C', text: 'Le vol est commis avec effraction', correct: false },
      { id: 'D', text: 'La victime est nécessairement un ascendant', correct: false },
    ],
    wrongHint: 'La soustraction frauduleuse suppose l’absence de violence ou de contrainte (vol « simple »).',
    explain:
      'Vol au sens de l’art. 311-1 C.pén. : soustraction frauduleuse de chose appartenant à autrui, sans violence ni contrainte.',
  },
  {
    id: 'q2',
    prompt: 'En droit commun, la garde à vue commence par une durée maximale de :',
    options: [
      { id: 'A', text: '12 heures', correct: false },
      { id: 'B', text: '24 heures', correct: true },
      { id: 'C', text: '48 heures', correct: false },
      { id: 'D', text: '72 heures', correct: false },
    ],
    wrongHint: 'Première phase : 24 h (art. 63-II C.p.p.) ; prolongation selon conditions.',
    explain: 'Art. 63-II C.p.p. : durée initiale maximale de vingt-quatre heures avant toute prolongation.',
  },
  {
    id: 'q3',
    prompt: 'Le contrôle d’identité peut être décidé lorsque :',
    options: [
      { id: 'A', text: 'La personne présente une apparence jugée « suspecte » sans autre motif', correct: false },
      { id: 'B', text: 'Il existe des raisons plausibles de soupçonner la commission d’une infraction', correct: true },
      { id: 'C', text: 'Un simple contrôle de routine est souhaité', correct: false },
      { id: 'D', text: 'La personne refuse de présenter un titre de transport', correct: false },
    ],
    wrongHint: 'Le contrôle sur la seule apparence est interdit (profilage) — il faut un cadre légal (art. 78-2 C.p.p.).',
    explain:
      'Art. 78-2 al. 1 C.p.p. : liste limitative de cas, dont raisons plausibles de soupçonner la commission d’une infraction.',
  },
];
