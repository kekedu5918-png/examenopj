import re, sys, os
sys.stdout.reconfigure(encoding='utf-8')

FILES = [
    r'C:\Users\lenov\Desktop\examenopj\src\app\accueil\page.tsx',
    r'C:\Users\lenov\Desktop\examenopj\src\components\home\sections\home-refonte-sections.tsx',
    r'C:\Users\lenov\Desktop\examenopj\src\components\home\sections\hero-section.tsx',
]

for FILE in FILES:
    content = open(FILE, encoding='utf-8').read()
    lines = content.split('\n')
    issues = []
    for i, line in enumerate(lines, 1):
        if re.search(r"'[^']*[a-z]['\u2019][a-z]", line):
            issues.append((i, line.strip()))
    if issues:
        print(f"\n=== {os.path.basename(FILE)} ===")
        for lineno, text in issues:
            print(f"  L{lineno}: {text}")
    else:
        print(f"OK: {os.path.basename(FILE)}")
