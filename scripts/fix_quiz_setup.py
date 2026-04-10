import sys
sys.stdout.reconfigure(encoding='utf-8')

FILE = r'C:\Users\lenov\Desktop\examenopj\src\components\quiz\quiz-page-client.tsx'
content = open(FILE, encoding='utf-8').read()

# Fix 1: fond dark moderne pour les phases quiz et result
OLD_QUIZ_PHASE = "      <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 pt-8'>"
NEW_QUIZ_PHASE = "      <div className='min-h-screen bg-[#080F1E] pt-8'>"
content = content.replace(OLD_QUIZ_PHASE, NEW_QUIZ_PHASE, 1)

OLD_RESULT_PHASE = "      <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950'>"
NEW_RESULT_PHASE = "      <div className='min-h-screen bg-[#080F1E]'>"
content = content.replace(OLD_RESULT_PHASE, NEW_RESULT_PHASE, 1)

# Fix 2: fond dark moderne pour le setup
OLD_SETUP = "  <div className='min-h-screen bg-gradient-to-b from-navy-950 via-[#0a1412] to-navy-950 px-4 pb-24 pt-12 md:px-6 md:pt-16'>"
NEW_SETUP = "  <div className='relative min-h-screen overflow-hidden bg-[#080F1E] px-4 pb-24 pt-12 md:px-6 md:pt-16'>"

count_before = content.count(OLD_SETUP)
content = content.replace(OLD_SETUP, NEW_SETUP)
count_after = content.count(NEW_SETUP)
print(f"Setup background: replaced {count_before} -> {count_after} occurrences")

# Fix 3: Badge et titre quiz plus premium
OLD_BADGE = "              badge='ENTRA\u00ceNEMENT'\n              badgeClassName='bg-cyan-500/20 text-cyan-300'\n              title='Quiz OPJ'\n              subtitle='QCM ou mode hardcore : r\u00e9ponses libres, comme \u00e0 l\u2019oral ou au papier'\n              className='[&_h2]:font-display [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:text-white md:[&_h2]:text-5xl'"
NEW_BADGE = "              badge='ENTRA\u00ceNEMENT'\n              badgeClassName='bg-blue-500/15 text-blue-300 border-blue-500/20'\n              title='Quiz OPJ'\n              subtitle='QCM ou mode hardcore : r\u00e9ponses libres, comme \u00e0 l\u2019oral ou au papier'\n              className='[&_h2]:text-4xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-white md:[&_h2]:text-5xl'"

count_before = content.count(OLD_BADGE)
content = content.replace(OLD_BADGE, NEW_BADGE)
count_after = content.count(NEW_BADGE)
print(f"Badge/title: replaced {count_before} -> {count_after}")

# Fix 4: streak badge dark
OLD_STREAK = "              className='inline-flex items-center gap-2 rounded-md border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-amber-100'"
NEW_STREAK = "              className='inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-1.5 text-amber-200'"
content = content.replace(OLD_STREAK, NEW_STREAK, 1)

open(FILE, 'w', encoding='utf-8').write(content)
print('Done - length:', len(content))
