"""Apply the requested grid, project archive and practice-page refinements."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]

def replace(rel: str, old: str, new: str):
    p = root / rel
    s = p.read_text()
    if old not in s:
        raise RuntimeError(f"Missing pattern in {rel}: {old[:100]}")
    p.write_text(s.replace(old, new))

# Home: requested shared-practices image.
replace("app/page.tsx", "/images/journal/shared/f81acf60-0071-43ae-ba21-1b3a01f7c256-1-102-o.webp", "/images/journal/shared/6f0ddf34-e306-4cd3-bef0-7fbc0095812e-1-105-c.webp")
replace("app/page.tsx", 'alt="Proceso colectivo de rayogramas para OAX-CAR-38-57"', 'alt="Taller colectivo con arcillas silvestres y materiales del paisaje urbano"')

# Project pages: remove repeated slider, remove the subtitle, rename archive,
# and omit the exact OAX image identified in the supplied screenshot.
p = root / "app/projects/[slug]/page.tsx"
s = p.read_text()
s = s.replace('  const sliderGroups = narrativeImages.length > 9 ? [narrativeImages.slice(-4)] : [];\n', '')
s = s.replace('  const introductoryText = project.slug === "oax-car-38-57"\n    ? (language === "es" ? "OAX-CAR-38-57 es un proyecto de Brenda Ranieri desde Fresca. La nave, desarrollado para Iberoamérica y Carabanchel: diálogos desde el diseño, en el marco de la Bienal Iberoamericana de Diseño 2026 (BID26), organizada por DiMaD en la Central de Diseño de Matadero Madrid. Conecta Oaxaca y Carabanchel mediante un archivo material y especulativo articulado por el agua, las arcillas locales, el Códice de Madrid y la búsqueda cerámica de un punto eutéctico. Los proyectos completos se presentarán durante la Bienal en noviembre de 2026." : "OAX-CAR-38-57 is a project by Brenda Ranieri from Fresca. La nave, developed for Ibero-America and Carabanchel: Dialogues Through Design within the 2026 Ibero-American Design Biennial (BID26), organised by DiMaD at Central de Diseño, Matadero Madrid. It connects Oaxaca and Carabanchel through a material and speculative archive articulated by water, local clays, the Madrid Codex and the ceramic search for a eutectic point. The complete projects will be presented during the Biennial in November 2026.")\n    : (language === "es" ? project.introEs : project.introEn).replaceAll("*", "");\n', '')
s = s.replace('  const oaxProjectImages = project.slug === "oax-car-38-57" ? narrativeImages : [];', '  const oaxProjectImages = project.slug === "oax-car-38-57" ? narrativeImages.filter((image) => !image.src.endsWith("/home-05.webp")) : [];')
s = s.replace('<h1 id="project-title">{presentation.title}</h1><p>{introductoryText}</p>', '<h1 id="project-title">{presentation.title}</h1>')
s = s.replace('{language === "es" ? "Documentación" : "Documentation"}', '{language === "es" ? "Archivo" : "Archive"}')
s = s.replace('id="project-documentation"', 'id="project-archive"')
s = s.replace('href="#project-documentation"', 'href="#project-archive"')
s = s.replace(' sliderGroups={sliderGroups}', '')
p.write_text(s)

# Gallery component: every image is visible once, with no repeated slider.
p = root / "app/components/project-editorial-gallery.tsx"
s = p.read_text()
s = s.replace('import { ArtworkSlider } from "./artwork-slider";\n', '')
s = s.replace('  sliderGroups?: ProjectImage[][];\n', '')
s = s.replace('export function ProjectEditorialGallery({ title, code, images, featuredIndex = 0, sliderGroups = [], text }: Props) {', 'export function ProjectEditorialGallery({ title, code, images, featuredIndex = 0, text }: Props) {')
s = s.replace('  const groupedSources = new Set(sliderGroups.flatMap((group) => group.map((image) => image.src)));\n  const visible = images.filter((image) => image.src !== featured?.src && !groupedSources.has(image.src));', '  const visible = images.filter((image) => image.src !== featured?.src);')
s = s.replace('aria-label={`Documentación de ${title}`}', 'aria-label={`Archivo de ${title}`}')
s = s.replace('<div><span>Documentación del proyecto</span>{text && <p>{text}</p>}</div>', '<div><span>Archivo del proyecto</span>{text && <p>{text}</p>}</div>')
start = s.find('    {sliderGroups.map(')
if start >= 0:
    end = s.find('\n  </section>;', start)
    s = s[:start] + s[end:]
p.write_text(s)

# La forma del agua quieta: single editorial dimensions value.
replace("lib/projects.ts", '    techniques: "Torno, formulación de esmaltes, cocción de alta temperatura, ensamblaje e instalación hidráulica",', '    techniques: "Torno, formulación de esmaltes, cocción de alta temperatura, ensamblaje e instalación hidráulica",\n    dimensions: "Variables",')

css = r'''

/* Editorial round three — open project strips and compact project headings */
.project-composition{display:flex;align-items:flex-start;justify-content:flex-start;gap:8px;overflow:hidden}
.project-preview{flex:0 0 auto;width:auto}
.project-preview-frame{height:clamp(150px,15vw,230px);width:auto;aspect-ratio:var(--image-ratio);overflow:hidden}
.project-preview-frame img{display:block;width:100%;height:100%;object-fit:cover}
.project-showcase-intro{padding-top:42px;padding-bottom:24px}
.project-showcase-intro .project-showcase-heading{margin-bottom:0}
.project-showcase-intro .project-showcase-heading h1{margin-bottom:0}
.project-block-index{margin-top:0}
.gallery-journal-heading h1{font-family:var(--font-display)!important;font-size:var(--type-page-title)!important;font-weight:300!important;line-height:.92!important;letter-spacing:-.025em!important}
.gallery-journal-intro{font-family:var(--font-display)!important;font-size:var(--type-intro)!important;font-weight:300!important;line-height:1.4!important}
.practice-narrative h2{font-family:var(--font-display)!important;font-size:clamp(24px,3vw,44px)!important;font-weight:300!important;line-height:1!important}
.practice-narrative-copy p{font-family:var(--font-text)!important;font-size:var(--type-body)!important;font-weight:300!important;line-height:1.55!important}
@media(max-width:760px){
  .project-composition{overflow-x:auto;scrollbar-width:none}.project-composition::-webkit-scrollbar{display:none}
  .project-preview-frame{height:clamp(112px,31vw,155px)}
  .project-showcase-intro{padding-top:28px;padding-bottom:18px}
  .gallery-journal-heading h1{font-size:clamp(42px,13vw,64px)!important}
  .gallery-journal-intro{font-size:18px!important}
  .practice-narrative-copy p{font-size:16px!important}
}
'''
with (root / "app/globals.css").open("a") as f:
    f.write(css)

print("Applied editorial round three")
