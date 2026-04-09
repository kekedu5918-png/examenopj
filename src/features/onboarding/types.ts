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

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1',
    text: 'Les 3 éléments constitutifs du vol sont :',
    options: [
      { id: 'a', text: 'Soustraction frauduleuse, bien appartenant à autrui, intention frauduleuse' },
      { id: 'b', text: 'Soustraction frauduleuse, bien appartenant à autrui, violence' },
      { id: 'c', text: 'Violence, bien appartenant à autrui, mauvaise foi' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'a',
    explanation: 'Le vol est défini par trois éléments : la soustraction (action matérielle), le bien appartenant à autrui (objet), et l'intention frauduleuse (élément moral).',
    category: 'infractions',
  },
  {
    id: 'q2',
    text: 'La principale distinction entre vol et recel est que le recel :',
    options: [
      { id: 'a', text: 'Est toujours moins sévèrement puni que le vol' },
      { id: 'b', text: 'Nécessite que le bien provienne d\'un crime ou d\'un délit' },
      { id: 'c', text: 'Implique une action violente de l\'auteur' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'b',
    explanation: 'Le recel (art. 321-1 CP) est le fait de dissimuler, détenir ou transmettre une chose dont on sait qu\'elle provient d\'un crime ou d\'un délit.',
    category: 'infractions',
  },
  {
    id: 'q3',
    text: 'La durée initiale d\'une garde à vue (GAV) de droit commun est de :',
    options: [
      { id: 'a', text: '12 heures' },
      { id: 'b', text: '24 heures' },
      { id: 'c', text: '48 heures' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'b',
    explanation: 'La GAV de droit commun est de 24h, renouvelable une fois (art. 63 CPP). En matière de criminalité organisée, elle peut être portée à 96h.',
    category: 'procedure',
  },
  {
    id: 'q4',
    text: 'La perquisition en matière criminelle (flagrance) est régie par l\'article :',
    options: [
      { id: 'a', text: 'Art. 56 CPP' },
      { id: 'b', text: 'Art. 76 CPP' },
      { id: 'c', text: 'Art. 100 CPP' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'a',
    explanation: 'L\'art. 56 CPP régit les perquisitions et saisies dans le cadre d\'une enquête de flagrance. L\'art. 76 concerne l\'enquête préliminaire.',
    category: 'procedure',
  },
  {
    id: 'q5',
    text: 'Un individu s\'empare d\'un téléphone posé sur une table dans un café, sans violence ni menace. Il s\'agit :',
    options: [
      { id: 'a', text: 'D\'un vol simple' },
      { id: 'b', text: 'D\'un vol avec violence' },
      { id: 'c', text: 'D\'un recel' },
      { id: 'd', text: 'Je ne sais pas' },
    ],
    correct: 'a',
    explanation: 'Il s\'agit d\'un vol simple (art. 311-3 CP) : soustraction frauduleuse d\'un bien appartenant à autrui, sans circonstances aggravantes.',
    category: 'application',
  },
];
