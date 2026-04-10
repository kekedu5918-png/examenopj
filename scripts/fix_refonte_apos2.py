import sys
sys.stdout.reconfigure(encoding='utf-8')

FILE = r'C:\Users\lenov\Desktop\examenopj\src\components\home\sections\home-refonte-sections.tsx'
lines = open(FILE, encoding='utf-8').readlines()

FIXES = {
    696: "          subtitle=\"Chaque infraction : \u00e9l\u00e9ment l\u00e9gal, mat\u00e9riel, moral, et les pi\u00e8ges de l'examen. Aucune ne doit t'\u00e9chapper.\"\n",
    747: "          subtitle=\"Le socle de proc\u00e9dure que tout OPJ doit ma\u00eetriser en fond : cadres d'enqu\u00eate, contr\u00f4le d'identit\u00e9, GAV, nullit\u00e9s.\"\n",
}

for idx, new_line in sorted(FIXES.items()):
    old = lines[idx].rstrip('\n')
    lines[idx] = new_line
    print(f"L{idx+1}: FIXED")
    print(f"  OLD: {old[:80]}")
    print(f"  NEW: {new_line.rstrip()[:80]}")

open(FILE, 'w', encoding='utf-8').writelines(lines)
print('Done.')
