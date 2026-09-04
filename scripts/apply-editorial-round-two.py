"""Apply the August editorial, gallery, chronology and language refinements."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(relative: str, content: str) -> None:
    (ROOT / relative).write_text(content)


def replace(relative: str, old: str, new: str) -> None:
    path = ROOT / relative
    content = path.read_text()
    if old not in content:
        raise RuntimeError(f"Pattern not found in {relative}: {old[:80]}")
    path.write_text(content.replace(old, new))


write("app/projects/projects-archive.tsx", '''"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectCover } from "../../lib/project-images";
import { projectPresentation, projectSortDate, type ProjectCategory, type ProjectLanguage } from "../../lib/project-presentation";
import { projects } from "../../lib/projects";
import { SiteSignature } from "../components/site-signature";
import { SiteNavigation } from "../components/site-navigation";

const chronologicalProjects = [...projects].sort((a, b) => projectSortDate(b) - projectSortDate(a));

const copy = {
  en: { heading: "Exhibitions & Projects", count: "projects", view: "View project", categories: { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Biennial", "cultural-festivals": "Cultural festivals", collaborations: "Collaborations", residencies: "Residencies" } },
  es: { heading: "Exposiciones y proyectos", count: "proyectos", view: "Ver proyecto", categories: { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Bienal", "cultural-festivals": "Festivales culturales", collaborations: "Colaboraciones", residencies: "Residencias" } },
} as const;

function EditorialLine({ value }: { value: string }) {
  return <>{value.split(/[“”"]/).map((part, index) => index % 2 ? <em key={index}>{part}</em> : part)}</>;
}

export default function ProjectsArchive() {
  const [language, setLanguage] = useState<ProjectLanguage>("es");
  const text = copy[language];
  useEffect(() => { document.documentElement.lang = language; }, [language]);

  return <>
    <header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header>
    <main className="projects-page">
      <div className="archive-heading"><h1>{text.heading}</h1><span>{String(chronologicalProjects.length).padStart(2, "0")} {text.count} · 2026—2023</span></div>
      <div className="chronological-projects-list">
        {chronologicalProjects.map((project, index) => {
          const presentation = projectPresentation(project, language);
          const cover = getProjectCover(project.slug);
          const category = text.categories[presentation.category as ProjectCategory];
          return <article className="archive-project" key={project.slug}>
            <span className="archive-project-number">{String(index + 1).padStart(2, "0")}</span>
            <div className={`archive-project-title ${project.slug === "oax-car-38-57" ? "numeric-project-title" : ""}`}><h3>{presentation.title}</h3><span>{category}</span></div>
            <Link className="archive-project-image" href={`/projects/${project.slug}`} aria-label={`${text.view}: ${presentation.title}`}>
              {cover ? <Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 760px) 100vw, 40vw" quality={84} /> : <span className={`placeholder project-tone-${index % 6 + 1}`} />}
            </Link>
            <div className="archive-project-data">{presentation.lines.map((line, lineIndex) => <span key={line + lineIndex}><EditorialLine value={line} /></span>)}<Link className="archive-project-link" href={`/projects/${project.slug}`}>{text.view} ↗</Link></div>
          </article>;
        })}
      </div>
    </main>
    <footer className="archive-footer"><span>Brenda Ranieri © 2026</span><div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button></div></footer>
  </>;
}
''')

write("app/components/site-navigation.tsx", '''import Link from "next/link";

const labels = {
  es: ["Exposiciones y proyectos", "About", "Piezas", "Procesos situados", "Prácticas compartidas"],
  en: ["Exhibitions & projects", "About", "Pieces", "Situated processes", "Shared practices"],
} as const;
const hrefs = ["/projects", "/about", "/#works", "/situated-processes", "/shared-practices"] as const;

export function SiteNavigation({ language = "es" }: { language?: "es" | "en" }) {
  return <nav className="archive-primary-nav" aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>{hrefs.map((href, index) => <Link href={href} key={href}>{labels[language][index]}</Link>)}</nav>;
}
''')

write("app/components/journal-page.tsx", '''"use client";

import { useEffect, useState } from "react";
import type { JournalEntry } from "../../lib/journals";
import { SiteNavigation } from "./site-navigation";
import { SiteSignature } from "./site-signature";
import { ZoomableArtworkImage } from "./zoomable-artwork-image";

type Language = "es" | "en";
type JournalCopy = { title: string; intro: string[]; archive: string; narratives: string; sections: JournalEntry[] };

export function JournalPage({ content }: { content: Record<Language, JournalCopy> }) {
  const [language, setLanguage] = useState<Language>("es");
  const copy = content[language];
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <>
    <header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header>
    <main className="journal-page gallery-journal-page">
      <header className="gallery-journal-heading"><p>{copy.archive}</p><div className="gallery-journal-heading-content"><h1>{copy.title}</h1><div className="gallery-journal-intro">{copy.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></header>
      <nav className="practice-narrative-index" aria-label={`${copy.narratives}: ${copy.title}`}>{copy.sections.map((section) => <a href={`#practice-${section.number}`} key={section.number}><span>{section.number}</span><strong>{section.title}</strong></a>)}</nav>
      <div className="practice-narratives">{copy.sections.map((section) => <section className="practice-narrative" id={`practice-${section.number}`} key={section.number}>
        <header><span>{section.number}</span><div><h2>{section.title}</h2><p>{section.meta}</p></div><div className="practice-narrative-copy">{section.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></header>
        <div className="practice-gallery" aria-label={`${language === "es" ? "Galería" : "Gallery"}: ${section.title}`}>{section.images.map((image, index) => <figure className={`practice-image-${index % 6 + 1}`} key={image.src}><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 50vw" /></figure>)}</div>
      </section>)}</div>
    </main>
    <footer className="archive-footer"><span>Brenda Ranieri © 2026</span><div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button></div></footer>
  </>;
}
''')

write("app/situated-processes/page.tsx", '''import type { Metadata } from "next";
import { JournalPage } from "../components/journal-page";
import { situatedEntries } from "../../lib/journals";

export const metadata: Metadata = { title: "Procesos situados — Brenda Ranieri", description: "Diario de campo, taller e investigación material de Brenda Ranieri." };

const es = [
  { number: "01", title: "Recolección de materiales", meta: "Deriva · territorio · archivo", text: ["Mi práctica tiene mucho de deriva, tanto dentro del taller como fuera. Caminar, observar y recolectar pequeñas muestras me permite leer cada territorio a través de su materia: arcillas silvestres, piedras, metales y restos del paisaje urbano."], images: [...situatedEntries[0].images, ...situatedEntries[1].images] },
  { number: "02", title: "Trabajo en el taller", meta: "Formulación · pruebas · cocción", text: ["En el estudio, estos materiales se preparan para diseñar piezas y formular pastas y esmaltes propios. El archivo reúne los ensayos como una memoria material abierta, donde cada cocción genera una co-creación con el fuego y donde el error también conserva información."], images: [...situatedEntries[2].images, ...situatedEntries[3].images] },
];
const en = [
  { ...es[0], title: "Gathering materials", meta: "Drift · territory · archive", text: ["My practice is shaped by drifting, both inside and outside the studio. Walking, observing and gathering small samples allows me to read each territory through its matter: wild clays, stones, metals and remnants of the urban landscape."] },
  { ...es[1], title: "Studio work", meta: "Formulation · testing · firing", text: ["In the studio, these materials are prepared to design pieces and formulate my own clay bodies and glazes. The archive gathers these tests as an open material memory, where every firing becomes a co-creation with fire and where error also retains knowledge."] },
];
export default function SituatedProcessesPage() { return <JournalPage content={{ es: { title: "Procesos situados", intro: ["Materia, territorio y taller forman un archivo abierto de pruebas y transformaciones."], archive: "Archivo de práctica", narratives: "Narrativas", sections: es }, en: { title: "Situated processes", intro: ["Matter, territory and studio form an open archive of tests and transformations."], archive: "Practice archive", narratives: "Narratives", sections: en } }} />; }
''')

write("app/shared-practices/page.tsx", '''import type { Metadata } from "next";
import { JournalPage } from "../components/journal-page";
import { sharedEntries } from "../../lib/journals";

export const metadata: Metadata = { title: "Prácticas compartidas — Brenda Ranieri", description: "Talleres, colaboraciones e investigación colectiva de Brenda Ranieri." };
const en = [
  { ...sharedEntries[0], title: "Wild clays and materials from the urban landscape", meta: "Workshop with Luka Andeya · Madrid", text: ["Opening the process means sharing a way of seeing rather than a recipe. In this workshop, moving through the territory, gathering and preparing samples became common tools for recognising the matter that already exists around us.", "Collective work made it possible to compare gestures, questions and tactile knowledge. Each participant built a personal relationship with the materials, while the table became a living archive of differences and discoveries."] },
  { ...sharedEntries[1], title: "Rayograms for OAX-CAR-38-57", meta: "Collaboration with Ana Paes and Paula Cid Cerezo · 2026", text: ["OAX-CAR-38-57 is built through dialogue between territories and disciplines. Together with Ana Paes and Paula Cid Cerezo, the material research moved into the photographic laboratory to produce rayograms: cameraless images made through direct contact on photosensitive paper.", "Objects, sediments, water, light and time all took part in the image. Authorship became a negotiation between materials and people; the result does not illustrate the process, but preserves the physical trace of that encounter."] },
  { ...sharedEntries[2], title: "Memories of water and clay", meta: "Conversation with Romina Casile · Collective workshop · 2025", text: ["The conversation with artist and researcher Romina Casile opened a dialogue around the poetics of water and creative processes with clay. The encounter continued in a ceramic experimentation workshop using natural materials gathered by Brenda Ranieri.", "Conversation, mediation and manual practice formed a shared space of collective research, where territorial memory could circulate between experiences and bodies."] },
];
export default function SharedPracticesPage() { return <JournalPage content={{ es: { title: "Prácticas compartidas", intro: ["Abrir el proceso a otras personas transforma tanto la materia como las preguntas que la rodean. Talleres, encuentros y colaboraciones funcionan como espacios de investigación en los que técnicas, experiencias y saberes circulan."], archive: "Archivo de práctica", narratives: "Narrativas", sections: sharedEntries }, en: { title: "Shared practices", intro: ["Opening the process to others transforms both matter and the questions around it. Workshops, encounters and collaborations become research spaces in which techniques, experiences and knowledge circulate."], archive: "Practice archive", narratives: "Narratives", sections: en } }} />; }
''')

replace("app/page.tsx", '  "vasija-2": 0,', '  "vasija-2": 1,')
old_shared = '''        <section className="shared-practices section" id="shared" aria-labelledby="shared-title">
          <div className="section-title"><h2 id="shared-title">{t.shared}</h2><span>Collective / Ongoing</span></div>
          <a className="shared-feature" href="/shared-practices">
            <div className="shared-mini-gallery">
              {[
                ["f81acf60-0071-43ae-ba21-1b3a01f7c256-1-102-o.webp", "Proceso colectivo de rayogramas para OAX-CAR-38-57"],
                ["6a913430-9c9e-4364-8fe1-af81fa73ad44-1-105-c.webp", "Taller con arcillas silvestres y materiales urbanos"],
                ["53146900-8fee-4914-825d-ce38f2fbf64c-1-105-c.webp", "Investigación compartida en el laboratorio fotográfico"],
                ["56b802cc-5143-4a6c-8d04-7fee176bb413-1-102-o.webp", "Resultado visual de una práctica colectiva"],
              ].map(([src, alt]) => <figure key={src}><Image src={`/images/journal/shared/${src}`} alt={alt} fill sizes="(max-width: 760px) 50vw, 34vw" quality={90} /></figure>)}
            </div>
            <div className="shared-feature-copy"><p>{t.sharedText}</p><span>{language === "es" ? "Ver prácticas compartidas" : "View shared practices"} ↗</span></div>
          </a>
        </section>'''
new_shared = '''        <section className="studio section home-journal-teaser home-shared-teaser" id="shared" aria-labelledby="shared-title">
          <div className="studio-copy"><p className="kicker">{t.note} 015</p><h2 id="shared-title">{t.shared}</h2><p>{t.sharedText}</p><div className="studio-index"><span>Co-creación</span><span>Madrid</span><span>2025—2026</span></div></div>
          <a className="studio-image" href="/shared-practices"><Image src="/images/journal/shared/f81acf60-0071-43ae-ba21-1b3a01f7c256-1-102-o.webp" alt="Proceso colectivo de rayogramas para OAX-CAR-38-57" fill sizes="(max-width: 760px) 100vw, 58vw" quality={90} /><span>{language === "es" ? "Ver prácticas compartidas" : "View shared practices"} ↗</span></a>
        </section>'''
replace("app/page.tsx", old_shared, new_shared)

replace("app/about/about-page.tsx", '<SiteSignature /><SiteNavigation />', '<SiteSignature /><SiteNavigation language={language} />')

css = r'''

/* Editorial round two: chronology, bleed imagery and unified practice pages */
.chronological-projects-list{border-top:1px solid var(--ink)}
.chronological-projects-list .archive-project{grid-template-columns:40px minmax(180px,2.3fr) minmax(320px,4.8fr) minmax(210px,2.4fr);grid-template-rows:auto;gap:20px;padding:14px 0;align-items:start}
.chronological-projects-list .archive-project-number{grid-column:1;grid-row:1}
.chronological-projects-list .archive-project-title{grid-column:2;grid-row:1}
.chronological-projects-list .archive-project-image{grid-column:3;grid-row:1;aspect-ratio:16/10;overflow:hidden}
.chronological-projects-list .archive-project-image img{object-fit:cover;padding:0;background:transparent}
.chronological-projects-list .archive-project-data{grid-column:4;grid-row:1;min-height:100%;gap:5px}
.archive-project-link{display:inline-block;align-self:flex-start;margin-top:22px;padding-bottom:3px;border-bottom:1px solid var(--line);color:var(--ink)}
.project-info{min-height:0}.project-info a{margin-top:18px;display:inline-block}
.artwork-stage,.archive-artwork-image{background:transparent}
.artwork-stage-image img,.archive-artwork-image img,.archive-artwork-vasija-2 .archive-artwork-image img{object-fit:cover;padding:0;background:transparent}
.home-shared-teaser{border-top:1px solid var(--line)}
.practice-gallery{display:grid!important;grid-template-columns:repeat(12,minmax(0,1fr));gap:8px;columns:auto!important;align-items:start}
.practice-gallery figure{grid-column:span 4;margin:0!important;break-inside:auto}
.practice-gallery figure:nth-child(6n+1){grid-column:span 7}
.practice-gallery figure:nth-child(6n+2){grid-column:span 5}
.practice-gallery figure:nth-child(6n+3){grid-column:3/span 4}
.practice-gallery figure:nth-child(6n+4){grid-column:7/span 6}
.practice-gallery figure:nth-child(6n+5){grid-column:span 5}
.practice-gallery figure:nth-child(6n){grid-column:span 7}
.practice-gallery img{display:block;width:100%;height:auto}
.gallery-journal-heading h1,.practice-narrative h2,.practice-narrative-copy p{font-family:var(--font-display);font-weight:300}
.practice-narrative>header>div>p,.practice-narrative>header>span,.practice-narrative-index a{font-family:var(--font-text);font-size:12px}
.practice-narrative-copy p{font-size:var(--type-body);line-height:1.48;color:#55524d}
@media(max-width:760px){
  .chronological-projects-list .archive-project{grid-template-columns:28px 1fr;grid-template-rows:auto auto auto;gap:10px 12px;padding:18px 0 34px}
  .chronological-projects-list .archive-project-number{grid-column:1;grid-row:1}.chronological-projects-list .archive-project-title{grid-column:2;grid-row:1}
  .chronological-projects-list .archive-project-image{grid-column:2;grid-row:2;aspect-ratio:4/3}.chronological-projects-list .archive-project-data{grid-column:2;grid-row:3;min-height:0}
  .archive-project-link{margin-top:16px}.project-info a{margin-top:16px}
  .practice-gallery{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
  .practice-gallery figure:nth-child(n){grid-column:auto}
  .practice-gallery figure:nth-child(5n+1){grid-column:span 2}
  .practice-narrative-copy p{font-size:16px}
}
'''
with (ROOT / "app/globals.css").open("a") as handle:
    handle.write(css)

print("Applied editorial round two")
