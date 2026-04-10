import re, sys
sys.stdout.reconfigure(encoding='utf-8')

# ── accueil/page.tsx ──
f1 = r'C:\Users\lenov\Desktop\examenopj\src\app\accueil\page.tsx'
c1 = open(f1, encoding='utf-8').read()
c1 = c1.replace(
    '"Conduite sous l\'empire de l\'alcool ou de stupéfiants",',
    '"Conduite sous l\'empire de l\'alcool ou de stupéfiants",',
)
# Already fixed above - just double check, replace the remaining single-quote version if any
c1 = c1.replace(
    "'Conduite sous l\u2019empire de l\u2019alcool ou de stup\u00e9fiants',",
    "\"Conduite sous l'empire de l'alcool ou de stup\u00e9fiants\",",
)
open(f1, 'w', encoding='utf-8').write(c1)
print('OK: page.tsx')

# ── home-refonte-sections.tsx ──
f2 = r'C:\Users\lenov\Desktop\examenopj\src\components\home\sections\home-refonte-sections.tsx'
c2 = open(f2, encoding='utf-8').read()

FIXES = [
    (
        "subtitle='Beaucoup de candidats arrivent sans savoir exactement ce qui les attend. Voici ce que l'examen demande.'",
        "subtitle=\"Beaucoup de candidats arrivent sans savoir exactement ce qui les attend. Voici ce que l'examen demande.\"",
    ),
    (
        "subtitle='Chaque infraction : \u00e9l\u00e9ment l\u00e9gal, mat\u00e9riel, moral, et les pi\u00e8ges de l'examen. Aucune ne doit t'\u00e9chapper.'",
        "subtitle=\"Chaque infraction : \u00e9l\u00e9ment l\u00e9gal, mat\u00e9riel, moral, et les pi\u00e8ges de l'examen. Aucune ne doit t'\u00e9chapper.\"",
    ),
    (
        "{ icon: Map, title: 'Cadres d'enqu\u00eate', line: 'Flagrance, pr\u00e9liminaire, instruction\u2026' },",
        "{ icon: Map, title: \"Cadres d'enqu\u00eate\", line: 'Flagrance, pr\u00e9liminaire, instruction\u2026' },",
    ),
    (
        "{ icon: Shield, title: 'Contr\u00f4le d'identit\u00e9', line: 'Art. 78-1 \u00e0 78-6 CPP' },",
        "{ icon: Shield, title: \"Contr\u00f4le d'identit\u00e9\", line: 'Art. 78-1 \u00e0 78-6 CPP' },",
    ),
    (
        "subtitle='Le socle de proc\u00e9dure que tout OPJ doit ma\u00eetriser en fond : cadres d'enqu\u00eate, contr\u00f4le d'identit\u00e9, GAV, nullit\u00e9s.'",
        "subtitle=\"Le socle de proc\u00e9dure que tout OPJ doit ma\u00eetriser en fond : cadres d'enqu\u00eate, contr\u00f4le d'identit\u00e9, GAV, nullit\u00e9s.\"",
    ),
    (
        "quote: 'Le quiz en mode libre m'a forc\u00e9 \u00e0 formuler comme \u00e0 l'oral. Gros gain sur la DPG et la proc\u00e9dure.',",
        "quote: \"Le quiz en mode libre m'a forc\u00e9 \u00e0 formuler comme \u00e0 l'oral. Gros gain sur la DPG et la proc\u00e9dure.\",",
    ),
    (
        "quote: 'Clair, carr\u00e9, sans blabla. \u00c7a ne remplace pas le cours mais c'est mon fil rouge jusqu'au jury.',",
        "quote: \"Clair, carr\u00e9, sans blabla. \u00c7a ne remplace pas le cours mais c'est mon fil rouge jusqu'au jury.\",",
    ),
]

count = 0
for old, new in FIXES:
    if old in c2:
        c2 = c2.replace(old, new, 1)
        count += 1
        print(f"  Fixed: {old[:60]}...")
    else:
        print(f"  NOT FOUND: {old[:60]}...")

open(f2, 'w', encoding='utf-8').write(c2)
print(f'OK: home-refonte-sections.tsx ({count} fixes)')
