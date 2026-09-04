"""Right-align the final three home project image strips."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
page = root / "app/page.tsx"
text = page.read_text()
old = 'className={`project-composition project-composition-${previewCount}`}'
new = 'className={`project-composition project-composition-${previewCount} ${projectIndex >= 2 ? "is-right-aligned" : ""}`}'
if old not in text:
    raise RuntimeError("Home project composition pattern not found")
page.write_text(text.replace(old, new))

with (root / "app/globals.css").open("a") as css:
    css.write('''

/* Align the final three Home project strips to the right. */
.project-composition.is-right-aligned{justify-content:flex-end}
@media(max-width:760px){.project-composition.is-right-aligned{justify-content:flex-end}}
''')

print("Aligned final three Home projects")
