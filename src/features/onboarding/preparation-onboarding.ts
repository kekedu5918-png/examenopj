export const PREPARATION_ONBOARDING_STORAGE_KEY = 'examenopj-preparation-onboarding-v1';

export type PreparationOnboardingState = {
  completedAt: string;
  /** Mois cible du concours */
  targetMonth: '2026-06' | '2026-11' | '2027-plus';
  /** Temps disponible par semaine */
  hoursPerWeek: 'lt5' | '5-10' | '10plus';
  /** Épreuve à renforcer en priorité */
  weakEpreuve: '1' | '2' | '3';
  /** Niveau estimé */
  level: 'debutant' | 'intermediaire' | 'confirme';
};

export type PreparationAction = {
  href: string;
  label: string;
  hint: string;
};

function baseActions(state: PreparationOnboardingState): PreparationAction[] {
  const { weakEpreuve, level } = state;
  const out: PreparationAction[] = [];

  out.push({
    href: '/cours',
    label: 'Hub Cours — fil directeur',
    hint: 'Vue d’ensemble du programme et des priorités.',
  });

  if (weakEpreuve === '1') {
    out.push(
      {
        href: '/fondamentaux',
        label: 'Fondamentaux (classification, PRQC)',
        hint: 'Socle indispensable pour l’épreuve écrite 1.',
      },
      {
        href: '/infractions',
        label: 'Référentiel infractions',
        hint: 'Qualifications et éléments constitutifs.',
      },
      {
        href: '/quiz?epreuve=1',
        label: 'Quiz ciblés Épreuve 1',
        hint: 'Entraînement QCM aligné sur le droit pénal général.',
      },
    );
  } else if (weakEpreuve === '2') {
    out.push(
      {
        href: '/cours/enquetes',
        label: 'Enquêtes — commencer par Alpha',
        hint: 'Articulation, PV et rapport sur scénario type.',
      },
      {
        href: '/cours/modules/f11',
        label: 'Module F11 — cadres et actes',
        hint: 'Flagrance, GAV, perquisitions : socle procédural.',
      },
      {
        href: '/entrainement/articulation',
        label: 'Articulation interactive',
        hint: 'Cartouches et chronologie sous contrainte.',
      },
    );
  } else {
    out.push(
      {
        href: '/guide-revision-opj',
        label: 'Guide de révision (oral, structure)',
        hint: 'Préparation à l’épreuve orale et erreurs fréquentes.',
      },
      {
        href: '/sujets-blancs',
        label: 'Sujets blancs',
        hint: 'Mise en situation complète chronométrée.',
      },
      {
        href: '/quiz?epreuve=3',
        label: 'Quiz ciblés Épreuve 3',
        hint: 'Synthèse et thèmes transversaux.',
      },
    );
  }

  if (level === 'debutant') {
    out.push({
      href: '/parcours-candidat',
      label: 'Parcours candidat guidé',
      hint: 'Rythme progressif si vous débutez la préparation.',
    });
  } else {
    out.push({
      href: '/entrainement',
      label: 'Hub entraînement',
      hint: 'Quiz, flashcards et entraînements par épreuve.',
    });
  }

  return out.slice(0, 7);
}

/** Génère 5 à 7 actions ordonnées avec liens internes réels. */
export function buildPreparationActions(state: PreparationOnboardingState): PreparationAction[] {
  return baseActions(state);
}

export function parseOnboardingState(raw: string | null): PreparationOnboardingState | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as PreparationOnboardingState;
    if (!v.completedAt || !v.weakEpreuve || !v.level) return null;
    return v;
  } catch {
    return null;
  }
}

/** Pourcentages indicatifs (heuristique) — affichage dashboard / hub. */
export function estimatePillarPercents(state: PreparationOnboardingState): {
  savoir: number;
  pratique: number;
  e1: number;
  e2: number;
  e3: number;
} {
  let savoir = 28;
  let pratique = 28;
  let e1 = 22;
  let e2 = 22;
  let e3 = 22;

  if (state.weakEpreuve === '1') {
    e1 = Math.min(55, e1 + 25);
    savoir += 8;
    pratique += 4;
  } else if (state.weakEpreuve === '2') {
    e2 = Math.min(55, e2 + 25);
    pratique += 12;
    savoir += 4;
  } else {
    e3 = Math.min(55, e3 + 25);
    pratique += 8;
    savoir += 4;
  }

  if (state.hoursPerWeek === '10plus') {
    savoir += 6;
    pratique += 6;
    e1 += 4;
    e2 += 4;
    e3 += 4;
  } else if (state.hoursPerWeek === 'lt5') {
    savoir -= 4;
    pratique -= 4;
  }

  if (state.level === 'debutant') {
    savoir += 5;
  } else if (state.level === 'confirme') {
    pratique += 8;
  }

  const cap = (n: number) => Math.max(12, Math.min(72, Math.round(n)));

  return {
    savoir: cap(savoir),
    pratique: cap(pratique),
    e1: cap(e1),
    e2: cap(e2),
    e3: cap(e3),
  };
}
