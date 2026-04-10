import re, sys
sys.stdout.reconfigure(encoding='utf-8')

FILE = r'C:\Users\lenov\Desktop\examenopj\src\app\accueil\page.tsx'
content = open(FILE, encoding='utf-8').read()
lines = content.split('\n')
issues = []
for i, line in enumerate(lines, 1):
    # Pattern: single-quote string containing an apostrophe inside a word like l'oral
    # e.g., 'text l'word' or 'text d'autre'
    if re.search(r"'[^']*[a-z]['\u2019][a-z]", line):
        issues.append((i, line.strip()))

if issues:
    print("Apostrophes non échappées trouvées:")
    for lineno, text in issues:
        print(f"  L{lineno}: {text}")
else:
    print("Aucun problème trouvé.")
