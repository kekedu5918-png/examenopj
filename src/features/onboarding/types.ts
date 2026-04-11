export type FormationPhase = 'early' | 'mid' | 'late';

export type DiagnosticLevel = 'Novice' | 'Débutant' | 'Intermédiaire' | 'Expert';

export type DiagnosticAnswer = {
  question_id: string;
  answer: string;
  correct: boolean;
};

export type PlanPhase = {
  phase_number: number;
  name: string;
  duration_weeks: number;
  daily_time_minutes: number;
  topics: Array<{
    id: string;
    name: string;
    items_per_week?: number;
    frequency?: string;
    count?: number;
    sessions?: string;
  }>;
};

export type PersonalizedPlan = {
  total_weeks: number;
  exam_date: string;
  phases: PlanPhase[];
};

export type DiagnosticResult = {
  level: DiagnosticLevel;
  score: number;
  score_percent: number;
  strengths: string[];
  weaknesses_feedback: string[];
  plan: PersonalizedPlan;
};

export type DiagnosticQuestion = {
  id: string;
  text: string;
  options: Array<{ id: string; text: string }>;
  correct: string;
  explanation: string;
  category: string;
};

/** Reprise du diagnostic après F5 / navigation (session navigateur uniquement). */
export const DIAGNOSTIC_SESSION_STORAGE_KEY = 'examenopj:diagnostic-eclair-v1';

/**
 * 5 questions ciblées procédure pénale (GAV, auditions, perquisitions) — aligné révision OPJ / épreuve 2.
 */
export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1',
    text: 'La durée initiale maximale de la garde à vue de droit commun, avant toute prolongation, est de :',
    options: [
      { id: 'a', text: '12 heures' },
      { id: 'b', text: '24 heures' },
      { id: 'c', text: '48 heures' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'b',
    explanation:
      'En droit commun, la GAV est au plus de 24 h avant décision de prolongation (art. 63 et s. CPP). Des prolongations et un régime spécial (ex. 96 h) existent dans des cas précis.',
    category: 'gav',
  },
  {
    id: 'q2',
    text: 'Pour l’audition d’une personne placée en garde à vue, le code prévoit en principe :',
    options: [
      { id: 'a', text: 'L’absence totale d’assistance juridique pour accélérer la mesure' },
      { id: 'b', text: 'L’assistance d’un avocat, sauf renonciation ou cas prévus par la loi' },
      { id: 'c', text: 'La présence obligatoire d’un magistrat du parquet à chaque audition' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'b',
    explanation:
      'Les droits de la personne gardée à vue incluent l’assistance d’un avocat dans les conditions prévues par le CPP (renonciation, garde à vue provisoire, etc.).',
    category: 'audition',
  },
  {
    id: 'q3',
    text: 'Les perquisitions et saisies au cours d’une enquête de flagrance (matière criminelle) relèvent notamment de l’article :',
    options: [
      { id: 'a', text: 'Art. 56 CPP' },
      { id: 'b', text: 'Art. 76 CPP' },
      { id: 'c', text: 'Art. 100 CPP' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'a',
    explanation:
      'L’art. 56 CPP encadre perquisitions et saisies en flagrance. L’art. 76 concerne l’enquête préliminaire ; l’art. 100, les réquisitions et procédures connexes selon contexte.',
    category: 'perquisition',
  },
  {
    id: 'q4',
    text: 'En droit commun, la durée totale maximale usuelle de la garde à vue après une première prolongation « standard » (sans prolongation exceptionnelle type 96 h) est le plus souvent de :',
    options: [
      { id: 'a', text: '24 heures' },
      { id: 'b', text: '48 heures' },
      { id: 'c', text: '72 heures' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'b',
    explanation:
      'Schéma courant : 24 h initiales + renouvellement de 24 h = 48 h, hors cas spéciaux (ex. criminalité organisée, prolongations exceptionnelles).',
    category: 'gav',
  },
  {
    id: 'q5',
    text: 'Pour une perquisition au domicile d’une personne dans le cadre d’une enquête préliminaire, la règle générale impose en principe :',
    options: [
      { id: 'a', text: 'Uniquement l’accord oral du propriétaire des lieux' },
      { id: 'b', text: 'Une décision du juge des libertés et de la détention (sauf cas prévus par la loi)' },
      { id: 'c', text: 'La seule qualité d’officier de police judiciaire, sans autorisation judiciaire' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'b',
    explanation:
      'En EP, l’accès au domicile est en principe encadré par une autorisation du JLD (art. 76 et s. CPP), sous réserves d’exceptions prévues par le texte.',
    category: 'perquisition',
  },
];
