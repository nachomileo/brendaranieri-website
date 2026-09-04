"""Enforce the permanent Helvetica system and dense galleries over four images."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]

# Persist design constraints for future contributors/agents.
agents = root / "AGENTS.md"
text = agents.read_text()
rules = '''

<!-- BEGIN:brenda-editorial-rules -->

# Brenda Ranieri — reglas visuales permanentes

- Toda la web usa exclusivamente `Helvetica Neue`, con `Helvetica` y `Arial` solo como fallbacks técnicos. No introducir Georgia, Times, serif ni ninguna otra familia tipográfica.
- Usar siempre las variables CSS `--font-display` y `--font-text`; ambas resuelven a la misma pila Helvetica Neue.
- Las galerías con más de cuatro imágenes deben formar bloques densos de tamaños variables, sin huecos blancos interiores ni filas artificialmente equilibradas.
- No deformar imágenes: conservar su proporción y usar `object-fit: cover` o `contain` según el contexto editorial.

<!-- END:brenda-editorial-rules -->
'''
if "BEGIN:brenda-editorial-rules" not in text:
    agents.write_text(text.rstrip() + rules)

# Remove all dormant serif declarations instead of merely overriding them.
css_path = root / "app/globals.css"
css = css_path.read_text()
css = css.replace('Georgia,serif', 'var(--font-display)')
css = css.replace('font-family:Arial,Helvetica,sans-serif', 'font-family:var(--font-text)')
css = css.replace('--font-display:var(--font-display);--font-text:Arial,Helvetica,sans-serif', '--font-display:"Helvetica Neue",Helvetica,Arial,sans-serif;--font-text:"Helvetica Neue",Helvetica,Arial,sans-serif')
css_path.write_text(css)

# Mark galleries from their actual image counts.
p = root / "app/components/project-editorial-gallery.tsx"
s = p.read_text()
s = s.replace('<div className="project-editorial-grid">', '<div className={`project-editorial-grid ${visible.length > 4 ? "is-dense" : ""}`}>')
p.write_text(s)

p = root / "app/components/journal-page.tsx"
s = p.read_text()
s = s.replace('<div className="practice-gallery" aria-label=', '<div className={`practice-gallery ${section.images.length > 4 ? "is-dense" : ""}`} aria-label=')
p.write_text(s)

p = root / "app/selected-artworks/[slug]/page.tsx"
s = p.read_text()
s = s.replace('`piece-gallery ${artwork.kind === "family" ? "is-family" : ""}`', '`piece-gallery ${artwork.kind === "family" ? "is-family" : ""} ${images.length > 4 ? "is-dense" : ""}`')
p.write_text(s)

with css_path.open("a") as f:
    f.write('''

/* Permanent typography contract: one Helvetica Neue system, no serif faces. */
:root{--font-display:"Helvetica Neue",Helvetica,Arial,sans-serif;--font-text:"Helvetica Neue",Helvetica,Arial,sans-serif}
html,body,button,input,textarea,select{font-family:var(--font-text)}

/* Galleries over four images: dense variable-size blocks without white holes. */
.project-editorial-grid.is-dense,
.practice-gallery.is-dense,
.piece-gallery.is-dense{
  display:block!important;
  columns:3;
  column-gap:6px;
}
.project-editorial-grid.is-dense figure,
.practice-gallery.is-dense figure,
.piece-gallery.is-dense figure{
  display:inline-block;
  width:100%;
  margin:0 0 6px!important;
  break-inside:avoid;
  grid-column:auto!important;
}
.project-editorial-grid.is-dense img,
.practice-gallery.is-dense img,
.piece-gallery.is-dense img{display:block;width:100%;height:auto}
@media(max-width:760px){
  .project-editorial-grid.is-dense,.practice-gallery.is-dense,.piece-gallery.is-dense{columns:2;column-gap:6px}
}
''')

print("Enforced Helvetica Neue and dense galleries")
