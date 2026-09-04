"""Hide the exact requested editorial image positions and restore practice grids."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]

p = root / "app/components/project-editorial-gallery.tsx"
s = p.read_text()
s = s.replace('  const ordered = [featured, ...images.filter((image) => image.src !== featured.src)];', '''  const ordered = [featured, ...images.filter((image) => image.src !== featured.src)];
  const excludedPositions: Record<string, number[]> = {
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
  const visible = ordered.filter((_, imageIndex) => !excluded.has(imageIndex + 1));''')
s = s.replace('String(ordered.length).padStart(2, "0")', 'String(visible.length).padStart(2, "0")')
s = s.replace('ordered.map((image, imageIndex)', 'visible.map((image, imageIndex)')
p.write_text(s)

# Practice and process pages return to the previous modular grid rather than
# inheriting the new dense project-gallery treatment.
p = root / "app/components/journal-page.tsx"
s = p.read_text().replace('className={`practice-gallery ${section.images.length > 4 ? "is-dense" : ""}`}', 'className="practice-gallery"')
p.write_text(s)

print("Removed requested project images and restored practice galleries")
