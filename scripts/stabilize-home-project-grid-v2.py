"""Set deterministic responsive widths for every Home project preview."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
page = root / "app/page.tsx"
text = page.read_text()
old = 'style={{ "--image-ratio": ratio, flexGrow: ratio } as CSSProperties}'
new = 'style={{ "--image-ratio": ratio, "--preview-width": `clamp(${Math.round(ratio * 150)}px, ${ratio * 15}vw, ${Math.round(ratio * 230)}px)`, "--mobile-preview-width": `${ratio * 31}vw` } as CSSProperties}'
if old not in text:
    raise RuntimeError("Project preview style pattern not found")
page.write_text(text.replace(old, new))

with (root / "app/globals.css").open("a") as css:
    css.write('''

/* Deterministic before and after image loading: widths use manifest metadata. */
.project-preview{flex:0 0 var(--preview-width);width:var(--preview-width)}
.project-preview-frame{width:100%;aspect-ratio:auto}
@media(max-width:760px){.project-preview{flex-basis:var(--mobile-preview-width);width:var(--mobile-preview-width)}}
''')
print("Stabilized Home project grid geometry")
