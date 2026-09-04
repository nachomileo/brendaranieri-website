"""Remove perceptually verified duplicates and lock removals to source files."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
component = root / "app/components/project-editorial-gallery.tsx"
s = component.read_text()
old = '''  const excludedPositions: Record<string, number[]> = {
    "P.03": [9, 11],
    "P.04": [12, 16, 25],
    "P.06": [5],
    "P.09": [15],
    "P.10": [6],
    "P.12": [8],
    "P.13": [7],
    "P.14": [6],
  };
  const excluded = new Set(excludedPositions[code] ?? []);
  const visible = ordered.filter((_, imageIndex) => !excluded.has(imageIndex + 1));'''
new = '''  const excludedFiles: Record<string, string[]> = {
    // Requested editorial removals plus perceptually verified duplicates.
    "P.03": ["img-9969.webp", "01.webp", "04.webp", "05.webp"],
    "P.04": ["home-08.webp", "la-forma-del-agua-quieta-072026-brenda-ranieri-lapislazuli-28.webp", "la-forma-del-agua-quieta-brenda-ranieri-lapislazuli9.webp", "05.webp"],
    "P.06": ["cerartmic-brenda-ranieri-4.webp"],
    "P.08": ["01.webp"],
    "P.09": ["la-bocca-della-verita-escultura-ceramica-br-1.webp", "brenda-ranieri-certezas-expo-el-imparcial-6.webp"],
    "P.10": ["2025-10-04-artelier-21-gp23604.webp"],
    "P.12": ["05.webp"],
    "P.13": ["sin-embargo-se-mueve-cena-brenda-ranieri-escala-5.webp", "03.webp"],
    "P.14": ["br-tlpaed-52-scaled.webp"],
    "P.16": ["02.webp", "04.webp"],
  };
  const excluded = new Set(excludedFiles[code] ?? []);
  const visible = ordered.filter((image) => !excluded.has(image.src.split("/").at(-1) ?? ""));'''
if old not in s:
    raise RuntimeError("Existing positional exclusions were not found")
component.write_text(s.replace(old, new))

# OAX uses its own three-part archive component; remove the two imported Home
# aliases while retaining their descriptively named originals.
p = root / "app/projects/[slug]/page.tsx"
s = p.read_text()
s = s.replace('!image.src.endsWith("/home-05.webp")', '!image.src.endsWith("/home-05.webp") && !image.src.endsWith("/home-02.webp")')
p.write_text(s)

print("Deduplicated project galleries using verified source filenames")
