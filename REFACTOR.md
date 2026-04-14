# REFACTOR — priorités ExamenOPJ

> État au **2026-04** : les items P0/P1 ci-dessous sont **largement traités** (parcours `/dashboard/parcours`, `LearningPathTrack`, thème `--ds-*` sur le dashboard et zones sensibles). Ce fichier évite les instructions contradictoires avec la réalité du dépôt.

## P0 — Cohérence thème clair / sombre (finition « full site »)

**Statut** : en cours de généralisation. `InteriorPageShell` utilise `bg-ds-bg-primary dark:bg-[#050a14]` en plein écran ; compte, quiz, fondamentaux (rubrique 8), épreuves (placeholders) et onboarding s’alignent sur les tokens `ds.*` avec variantes `dark:` où un fond très sombre reste nécessaire.

**Action restante** : grep ponctuel `bg-navy|bg-slate-950` sur les composants secondaires (PV, récapitulatif print, etc.) et remplacer par sémantique ou `dark:`.

## P1 — Parcours « learning path »

**Statut** : **livré** — `getUserFullProgress`, `LearningPathTrack`, `completeLessonAction`, pont **quiz → parcours** (`src/data/learning-path-quiz-bridge.ts` + `recordQuizAttempt` si score ≥ 80 % et mapping domaine/fascicule → `inf-2` / `fla-2`).

**Action restante** : enrichir le mapping si de nouveaux modes quiz ciblent d’autres `client_key` (ex. parcours thématiques dédiés).

## P2 — `ThemeProvider` + ESLint

**Fichier** : `src/components/providers/ThemeProvider.tsx` — avertissement éventuel `no-before-interactive-script-outside-document`.

**Options** : script inline dans `layout.tsx`, ou `afterInteractive` si flash acceptable.

## P3 — Découpage des gros composants

Identifier les fichiers > 300 lignes (quiz, enquêtes, épreuves) pour extraire hooks et sous-composants **quand une évolution le justifie**.

## P4 — Navigation exportée

Vérifier `src/app/navigation.ts` avec knip ; retirer les exports réellement inutilisés.

## P5 — Duplication schémas progression

**Source de vérité** : `learning_path.*` pour le parcours OPJ ; `public.learning_nodes` legacy — documenté dans `SCHEMA_REVIEW.md` / `docs/TECH_DEBT.md`.
