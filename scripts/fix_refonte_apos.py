import sys
sys.stdout.reconfigure(encoding='utf-8')

FILE = r'C:\Users\lenov\Desktop\examenopj\src\components\home\sections\home-refonte-sections.tsx'
lines = open(FILE, encoding='utf-8').readlines()

FIXES = {
    # line index (0-based): new content
    263: "          subtitle=\"Beaucoup de candidats arrivent sans savoir exactement ce qui les attend. Voici ce que l'examen demande.\"\n",
    347: "          title=\"55 infractions à maîtriser pour l'épreuve 1\"\n",
    348: "          subtitle=\"Chaque infraction : élément légal, matériel, moral, et les pièges de l'examen. Aucune ne doit t'échapper.\"\n",
    390: "  { icon: Map, title: \"Cadres d'enquête\", line: 'Flagrance, préliminaire, instruction\u2026' },\n",
    391: "  { icon: Shield, title: \"Contrôle d'identité\", line: 'Art. 78-1 à 78-6 CPP' },\n",
    407: "          title=\"Les fondamentaux de l'OPJ\"\n",
    408: "          subtitle=\"Le socle de procédure que tout OPJ doit maîtriser en fond : cadres d'enquête, contrôle d'identité, GAV, nullités.\"\n",
    484: "          quote: \"Le quiz en mode libre m'a forcé à formuler comme à l'oral. Gros gain sur la DPG et la procédure.\",\n",
    488: "          quote: \"Clair, carré, sans blabla. Ça ne remplace pas le cours mais c'est mon fil rouge jusqu'au jury.\",\n",
}

for idx, new_line in sorted(FIXES.items()):
    old = lines[idx].rstrip('\n')
    lines[idx] = new_line
    print(f"L{idx+1}: FIXED")
    print(f"  OLD: {old[:80]}")
    print(f"  NEW: {new_line.rstrip()[:80]}")

open(FILE, 'w', encoding='utf-8').writelines(lines)
print('\nDone.')
