# Graph Report - .  (2026-04-09)

## Corpus Check
- 433 files · ~3,452,403 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 909 nodes · 1503 edges · 35 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `POST()` - 7 edges
2. `todayKey()` - 5 edges
3. `loadFlashResults()` - 5 edges
4. `getDaysUntilNextParisSession()` - 4 edges
5. `getTrialEndsAt()` - 4 edges
6. `completeDiagnostic()` - 4 edges
7. `GET()` - 3 edges
8. `fetchAnthropicCorrection()` - 3 edges
9. `readFileStore()` - 3 edges
10. `countViaSupabase()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `POST()` --calls--> `fallbackCorrection()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\correction-rapport\route.ts
- `POST()` --calls--> `systemPrompt()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\correction-rapport\route.ts
- `POST()` --calls--> `writeFileStore()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\waitlist\route.ts
- `POST()` --calls--> `fetchAnthropicCorrection()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\correction-pv\route.ts
- `POST()` --calls--> `addViaSupabase()`  [EXTRACTED]
  src\app\api\webhooks\route.ts → src\app\api\waitlist\route.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (5): formatExamCountdownBadge(), getDaysUntilExam(), buildPool(), handleLaunch(), handleRecommencer()

### Community 1 - "Community 1"
Cohesion: 0.03
Nodes (18): addViaSupabase(), countViaSupabase(), extractJsonObject(), fallbackCorrection(), fetchAnthropicCorrection(), GET(), POST(), readFileStore() (+10 more)

### Community 2 - "Community 2"
Cohesion: 0.03
Nodes (5): daysAgo(), getFasciculeName(), getLoginResumeData(), EntrainementArticulationPage(), suggestedTitreFromRef()

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (20): buildFlashDeck(), flashSessionSummary(), loadFlashResults(), safeParse(), saveFlashMark(), shuffleInPlace(), classifyMoral(), condenseMaterielKeys() (+12 more)

### Community 4 - "Community 4"
Cohesion: 0.04
Nodes (9): escapeForPrint(), printTwoColumns(), g(), migrateV1ToColumns(), addToRemoveQueue(), dispatch(), genId(), reducer() (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.04
Nodes (6): getFondamentauxCoverageRows(), getFondamentauxModulesSansFiche(), cn(), programmeGroupTabLabel(), readViewedIds(), refresh()

### Community 6 - "Community 6"
Cohesion: 0.05
Nodes (10): compareModulesForCandidate(), totalEpreuveWeight(), getDefaultExamenAttendus(), getFasciculeExamProfile(), courseModulePath(), fasciculeDetailPath(), getReadModuleIdsFromStorage(), isModuleMarkedRead() (+2 more)

### Community 7 - "Community 7"
Cohesion: 0.05
Nodes (8): isHardcoreAnswerCorrect(), levenshtein(), normalizeQuizAnswer(), similarityRatio(), advance(), handleSubmit(), unlockBadgeIfNeeded(), updateStreakAfterSession()

### Community 8 - "Community 8"
Cohesion: 0.07
Nodes (2): cartouchePlain(), modelePVToPlainText()

### Community 9 - "Community 9"
Cohesion: 0.08
Nodes (2): courseModuleHref(), getEnquetesLinkedToModule()

### Community 10 - "Community 10"
Cohesion: 0.08
Nodes (4): formatMaterielFromOfficialRecord(), formatMaterielPoints(), formatMoralBlock(), formatMoralFromOfficialRecord()

### Community 11 - "Community 11"
Cohesion: 0.09
Nodes (15): buildStrengthsFeedback(), calculateDiagnosticLevel(), completeDiagnostic(), generatePlan(), getDaysUntilExam(), filterQuestions(), fisherYates(), getModuleQuizProgressStorageKey() (+7 more)

### Community 12 - "Community 12"
Cohesion: 0.09
Nodes (14): addDailyFlashcardReviewCount(), addDailyQuizQuestionCount(), getDailyFlashcardReviewCount(), getDailyQuizQuestionCount(), todayKey(), loadFlashcardsProgress(), parse(), progressStorageKey() (+6 more)

### Community 13 - "Community 13"
Cohesion: 0.08
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 0.16
Nodes (2): normalizeTitreArticulation(), titreCartoucheMatcheReference()

### Community 15 - "Community 15"
Cohesion: 0.15
Nodes (6): getCalendarDaysUntilParisDate(), getDaysUntilNextParisSession(), getDaysUntilOpjWrittenExam(), getParisCalendarYmd(), parisCalendarStartUtcMs(), ymdToKey()

### Community 16 - "Community 16"
Cohesion: 0.14
Nodes (3): loadHistory(), pushHistory(), saveHistory()

### Community 17 - "Community 17"
Cohesion: 0.32
Nodes (3): recordQuizCompleted(), recordQuizCompletedToday(), todayId()

### Community 18 - "Community 18"
Cohesion: 0.5
Nodes (0): 

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Community 21"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Community 22"
Cohesion: 1.0
Nodes (0): 

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

## Knowledge Gaps
- **Thin community `Community 19`** (2 nodes): `error.tsx`, `GlobalError()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `ExamenBlancWaitlistCard.tsx`, `ExamenBlancWaitlistCard()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 21`** (2 nodes): `home-section-skeleton.tsx`, `HomeSectionSkeleton()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 22`** (2 nodes): `RapportModeleOfficielPanel.tsx`, `RapportModeleOfficielPanel()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `tailwind.config.ts`, `welcome.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 24`** (2 nodes): `use-scroll-position.ts`, `useScrollPosition()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 25`** (1 nodes): `next.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 26`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 27`** (1 nodes): `prettier.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 28`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (1 nodes): `apple-icon.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `icon.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `Navbar.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `pdf-corpus.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `modules.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `site-url.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.03 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.04 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._