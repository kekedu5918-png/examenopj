# Graph Report - .  (2026-04-19)

## Corpus Check
- 522 files · ~3,396,004 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1145 nodes · 1958 edges · 52 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `getLearningPathClient()` - 8 edges
2. `completeLesson()` - 7 edges
3. `POST()` - 6 edges
4. `normalize()` - 6 edges
5. `isValidUuid()` - 6 edges
6. `todayKey()` - 5 edges
7. `buildExcerpt()` - 5 edges
8. `searchMarkdownFiches()` - 5 edges
9. `searchLocalContent()` - 5 edges
10. `loadFlashResults()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `fallbackCorrection()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\correction-rapport\route.ts
- `POST()` --calls--> `systemPrompt()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\correction-rapport\route.ts
- `GET()` --calls--> `isNextRedirectError()`  [EXTRACTED]
  src\app\api\waitlist\route.ts → src\app\(account)\manage-subscription\route.ts
- `POST()` --calls--> `fetchAnthropicCorrection()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\correction-pv\route.ts
- `POST()` --calls--> `jsonGenericError()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\waitlist\route.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.02
Nodes (18): DashboardNextAction(), findParcoursContinue(), daysAgo(), getFasciculeName(), getLoginResumeData(), EntrainementArticulationPage(), EpreuveDetailPage(), generateMetadata() (+10 more)

### Community 1 - "Community 1"
Cohesion: 0.02
Nodes (2): formatExamCountdownBadge(), getDaysUntilExam()

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (0): 

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (14): compareModulesForCandidate(), totalEpreuveWeight(), getDefaultExamenAttendus(), getFasciculeExamProfile(), courseModulePath(), fasciculeDetailPath(), getFondamentauxCoverageRows(), getFondamentauxModulesSansFiche() (+6 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (20): buildFlashDeck(), flashSessionSummary(), loadFlashResults(), safeParse(), saveFlashMark(), shuffleInPlace(), classifyMoral(), condenseMaterielKeys() (+12 more)

### Community 5 - "Community 5"
Cohesion: 0.03
Nodes (6): isActivePath(), NavLink(), applyDomTheme(), normalizeTheme(), dismiss(), storageKey()

### Community 6 - "Community 6"
Cohesion: 0.04
Nodes (9): escapeForPrint(), printTwoColumns(), g(), migrateV1ToColumns(), addToRemoveQueue(), dispatch(), genId(), reducer() (+1 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (17): extractJsonObject(), fallbackCorrection(), fetchAnthropicCorrection(), GET(), isNextRedirectError(), jsonGenericError(), logWebhook(), POST() (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.06
Nodes (5): cartouchePlain(), modelePVToPlainText(), loadHistory(), pushHistory(), saveHistory()

### Community 9 - "Community 9"
Cohesion: 0.07
Nodes (21): isHardcoreAnswerCorrect(), levenshtein(), normalizeQuizAnswer(), similarityRatio(), advance(), handleSubmit(), buildPool(), finalizeQuizSession() (+13 more)

### Community 10 - "Community 10"
Cohesion: 0.07
Nodes (17): completeLesson(), computeNeedsReviewAt(), getLearningPathClient(), getLessonIdByClientKey(), getTodayReviews(), getUserFullProgress(), getUserStreakCurrent(), getUserXpTotal() (+9 more)

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (2): courseModuleHref(), getEnquetesLinkedToModule()

### Community 12 - "Community 12"
Cohesion: 0.08
Nodes (4): formatMaterielFromOfficialRecord(), formatMaterielPoints(), formatMoralBlock(), formatMoralFromOfficialRecord()

### Community 13 - "Community 13"
Cohesion: 0.1
Nodes (13): addDailyFlashcardReviewCount(), addDailyQuizQuestionCount(), getDailyFlashcardReviewCount(), getDailyQuizQuestionCount(), todayKey(), loadFlashcardsProgress(), parse(), progressStorageKey() (+5 more)

### Community 14 - "Community 14"
Cohesion: 0.1
Nodes (6): normalizeTitreArticulation(), titreCartoucheMatcheReference(), buildArticulationDocx(), footerParagraph(), headerParagraph(), titreArticulationParagraphs()

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (7): buildExcerpt(), normalize(), searchEnquetes(), searchLocalContent(), searchMarkdownFiches(), searchQuizzes(), stripMarkdown()

### Community 16 - "Community 16"
Cohesion: 0.13
Nodes (7): buildStrengthsFeedback(), calculateDiagnosticLevel(), completeDiagnostic(), generatePlan(), getDaysUntilExam(), handleNext(), persistProgress()

### Community 17 - "Community 17"
Cohesion: 0.16
Nodes (4): cadresDb(), fetchCadresProgressMap(), upsertCadresLessonComplete(), upsertCadresQuizResult()

### Community 18 - "Community 18"
Cohesion: 0.12
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 0.18
Nodes (6): getCalendarDaysUntilParisDate(), getDaysUntilNextParisSession(), getDaysUntilOpjWrittenExam(), getParisCalendarYmd(), parisCalendarStartUtcMs(), ymdToKey()

### Community 20 - "Community 20"
Cohesion: 0.27
Nodes (4): isStreakAtRisk(), recordQuizCompleted(), recordQuizCompletedToday(), todayId()

### Community 21 - "Community 21"
Cohesion: 0.29
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 0.43
Nodes (4): getReadModuleIdsFromStorage(), isModuleMarkedRead(), markModuleAsRead(), safeParse()

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Community 24"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Community 25"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Community 26"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Community 27"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Community 28"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (0): 

### Community 43 - "Community 43"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Community 44"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Community 45"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Community 46"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "Community 47"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Community 48"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Community 49"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Community 50"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Community 51"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 23`** (2 nodes): `tailwind.config.ts`, `tailwind-config.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `ExamenBlancWaitlistCard.tsx`, `ExamenBlancWaitlistCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (2 nodes): `RapportModeleOfficielPanel.tsx`, `RapportModeleOfficielPanel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (2 nodes): `course-module-syntheses.ts`, `getCourseModuleSynthesis()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (2 nodes): `module-gradients.ts`, `getModuleNumGradient()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `next.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `playwright.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `prettier.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `check_all_apostrophes.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `check_apostrophes.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `fix_all_apostrophes.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `fix_cta.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `fix_quiz_setup.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `fix_refonte_apos.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `fix_refonte_apos2.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `fix_start_here.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `fix_testimonials_cta.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 43`** (1 nodes): `apple-icon.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 44`** (1 nodes): `icon.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 45`** (1 nodes): `product-kpis.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 46`** (1 nodes): `cours-revision-fil.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 47`** (1 nodes): `guide-revision-faq.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 48`** (1 nodes): `pv-me1-verbatim-phase-a.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 49`** (1 nodes): `pv-page-catalog.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 50`** (1 nodes): `learning-path-schema.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 51`** (1 nodes): `site-url.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._