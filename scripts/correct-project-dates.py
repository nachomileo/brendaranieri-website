"""Correct the editorial dates and chronological sort values."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]

p = root / "lib/project-presentation.ts"
s = p.read_text()
s = s.replace('entry("residencies", 202612, "Bioceramics", ["Research residency", "Escala House, Madrid", "Nov–Dec 2026"])', 'entry("residencies", 202512, "Bioceramics", ["Research residency", "Escala House, Madrid", "Nov–Dec 2025"])')
s = s.replace('entry("residencies", 202612, "Biocerámica", ["Residencia de investigación", "Escala House, Madrid", "Nov–dic 2026"])', 'entry("residencies", 202512, "Biocerámica", ["Residencia de investigación", "Escala House, Madrid", "Nov–dic 2025"])')
s = s.replace('entry("collaborations", 202612, "Yet It Moves", ["Immersive dinner", "Escala House, Madrid", "Dec 2026"])', 'entry("collaborations", 202512, "Yet It Moves", ["Immersive dinner", "Escala House, Madrid", "Dec 2025"])')
s = s.replace('entry("collaborations", 202612, "Sin embargo, se mueve", ["Cena inmersiva", "Escala House, Madrid", "Dic 2026"])', 'entry("collaborations", 202512, "Sin embargo, se mueve", ["Cena inmersiva", "Escala House, Madrid", "Dic 2025"])')
p.write_text(s)

p = root / "lib/projects.generated.ts"
s = p.read_text().replace('"period": "noviembre de 2025",\n    "year": 2025,\n    "status": "terminado",\n    "type": "colaboración / cena inmersiva', '"period": "diciembre de 2025",\n    "year": 2025,\n    "status": "terminado",\n    "type": "colaboración / cena inmersiva')
p.write_text(s)
print("Corrected Biocerámica and Sin embargo, se mueve dates")
