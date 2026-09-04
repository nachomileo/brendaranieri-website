"""Finish functional English controls on project and artwork pages."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def write(rel: str, text: str):
    (ROOT / rel).write_text(text)


def replace(rel: str, old: str, new: str):
    path = ROOT / rel
    text = path.read_text()
    if old not in text:
        raise RuntimeError(f"Missing pattern in {rel}: {old[:100]}")
    path.write_text(text.replace(old, new))


write("app/selected-artworks/page.tsx", '''"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { artworkArchive, artworkCode, artworks } from "../../lib/artworks";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";

export default function SelectedArtworksPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const piece = language === "es" ? "Pieza" : "Piece";
  return <><header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header><main className="artworks-page">
    <div className="archive-heading"><h1>{language === "es" ? "Piezas" : "Pieces"}</h1><span>{String(artworks.length).padStart(2, "0")} {language === "es" ? "piezas" : "pieces"}</span></div>
    <div className="all-artworks-grid">{artworkArchive.map((artwork) => <Link className={`archive-artwork archive-artwork-${artwork.slug}`} href={`/selected-artworks/${artwork.slug}?lang=${language}`} key={artwork.slug} aria-label={`${piece} ${artworkCode(artwork)}, ${artwork.year}`}>
      {artwork.images?.[0] ? <div className="archive-artwork-image"><Image src={artwork.images[0].src} alt={artwork.images[0].alt} fill sizes="(max-width: 760px) 50vw, 20vw" quality={88} /></div> : <div className={`placeholder archive-artwork-image ${artwork.className}`} role="img" aria-label={`${piece} ${artworkCode(artwork)}`} />}
      <div className="archive-artwork-meta"><span>{artworkCode(artwork)}</span><span aria-hidden="true" /><span>{artwork.year}</span></div></Link>)}</div>
  </main><footer className="archive-footer"><span>Brenda Ranieri © 2026</span><div className="language-switch" aria-label="Language"><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button></div></footer></>;
}
''')

# Project detail: language from query string, translated content and functional switch.
replace("app/projects/[slug]/page.tsx", 'type Props = { params: Promise<{ slug: string }> };', 'type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> };')
replace("app/projects/[slug]/page.tsx", 'export default async function ProjectPage({ params }: Props) {\n  const project = getProject((await params).slug);', 'export default async function ProjectPage({ params, searchParams }: Props) {\n  const language = (await searchParams).lang === "en" ? "en" : "es";\n  const project = getProject((await params).slug);')
replace("app/projects/[slug]/page.tsx", '  const presentation = projectPresentation(project, "es");', '  const presentation = projectPresentation(project, language);')
replace("app/projects/[slug]/page.tsx", '  const categoryLabels: Record<ProjectCategory, string> = { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Bienal", "cultural-festivals": "Festivales culturales", collaborations: "Colaboraciones", residencies: "Residencias" };', '  const categoryLabels: Record<ProjectCategory, string> = language === "es" ? { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Bienal", "cultural-festivals": "Festivales culturales", collaborations: "Colaboraciones", residencies: "Residencias" } : { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Biennial", "cultural-festivals": "Cultural festivals", collaborations: "Collaborations", residencies: "Residencies" };')
replace("app/projects/[slug]/page.tsx", '  const bodyParagraphs = project.bodyEs.split(/\\n\\s*\\n/)', '  const bodyParagraphs = (language === "es" ? project.bodyEs : project.bodyEn).split(/\\n\\s*\\n/)')
replace("app/projects/[slug]/page.tsx", '''  const introductoryText = project.slug === "oax-car-38-57"
    ? "OAX-CAR-38-57 es un proyecto de Brenda Ranieri desde Fresca. La nave, desarrollado para Iberoamérica y Carabanchel: diálogos desde el diseño, en el marco de la Bienal Iberoamericana de Diseño 2026 (BID26), organizada por DiMaD en la Central de Diseño de Matadero Madrid. Conecta Oaxaca y Carabanchel mediante un archivo material y especulativo articulado por el agua, las arcillas locales, el Códice de Madrid y la búsqueda cerámica de un punto eutéctico. Los proyectos completos se presentarán durante la Bienal en noviembre de 2026."
    : project.introEs.replaceAll("*", "");''', '''  const introductoryText = project.slug === "oax-car-38-57"
    ? (language === "es" ? "OAX-CAR-38-57 es un proyecto de Brenda Ranieri desde Fresca. La nave, desarrollado para Iberoamérica y Carabanchel: diálogos desde el diseño, en el marco de la Bienal Iberoamericana de Diseño 2026 (BID26), organizada por DiMaD en la Central de Diseño de Matadero Madrid. Conecta Oaxaca y Carabanchel mediante un archivo material y especulativo articulado por el agua, las arcillas locales, el Códice de Madrid y la búsqueda cerámica de un punto eutéctico. Los proyectos completos se presentarán durante la Bienal en noviembre de 2026." : "OAX-CAR-38-57 is a project by Brenda Ranieri from Fresca. La nave, developed for Ibero-America and Carabanchel: Dialogues Through Design within the 2026 Ibero-American Design Biennial (BID26), organised by DiMaD at Central de Diseño, Matadero Madrid. It connects Oaxaca and Carabanchel through a material and speculative archive articulated by water, local clays, the Madrid Codex and the ceramic search for a eutectic point. The complete projects will be presented during the Biennial in November 2026.")
    : (language === "es" ? project.introEs : project.introEn).replaceAll("*", "");''')
replace("app/projects/[slug]/page.tsx", '<SiteSignature /><SiteNavigation />', '<SiteSignature /><SiteNavigation language={language} />')
replace("app/projects/[slug]/page.tsx", '<OaxProjectBlocks project={project} images={oaxProjectImages} rayograms={oaxRayograms} fieldArchive={oaxFieldArchive} />', '<OaxProjectBlocks project={project} images={oaxProjectImages} rayograms={oaxRayograms} fieldArchive={oaxFieldArchive} language={language} />')
replace("app/projects/[slug]/page.tsx", '<a href="#project-information"><span>01</span><strong>Contexto e información</strong><small>Ficha y texto del proyecto</small></a>\n          <a href="#project-documentation"><span>02</span><strong>Documentación</strong><small>{narrativeImages.length} imágenes</small></a>', '<a href="#project-information"><span>01</span><strong>{language === "es" ? "Contexto e información" : "Context and information"}</strong><small>{language === "es" ? "Ficha y texto del proyecto" : "Project facts and text"}</small></a>\n          <a href="#project-documentation"><span>02</span><strong>{language === "es" ? "Documentación" : "Documentation"}</strong><small>{narrativeImages.length} {language === "es" ? "imágenes" : "images"}</small></a>')
replace("app/projects/[slug]/page.tsx", '<article className="project-overview-copy"><span>01 — Contexto y proceso</span>', '<article className="project-overview-copy"><span>{language === "es" ? "01 — Contexto y proceso" : "01 — Context and process"}</span>')
replace("app/projects/[slug]/page.tsx", '<footer className="archive-footer"><span>Brenda Ranieri © 2026</span><span>ES / EN</span></footer>', '<footer className="archive-footer"><span>Brenda Ranieri © 2026</span><div className="language-switch"><Link className={language === "en" ? "active" : ""} href={`?lang=en`}>EN</Link><span>/</span><Link className={language === "es" ? "active" : ""} href={`?lang=es`}>ES</Link></div></footer>')

# Artwork detail: query language and translated labels.
replace("app/selected-artworks/[slug]/page.tsx", 'type Props = { params: Promise<{ slug: string }> };', 'type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> };')
replace("app/selected-artworks/[slug]/page.tsx", 'export default async function ArtworkPage({ params }: Props) {\n  const artwork = getArtwork((await params).slug);', 'export default async function ArtworkPage({ params, searchParams }: Props) {\n  const language = (await searchParams).lang === "en" ? "en" : "es";\n  const artwork = getArtwork((await params).slug);')
replace("app/selected-artworks/[slug]/page.tsx", '<SiteNavigation />', '<SiteNavigation language={language} />')
replace("app/selected-artworks/[slug]/page.tsx", '<div className="piece-showcase-heading"><p>{artwork.kind === "family" ? "Familia" : "Pieza"}</p>', '<div className="piece-showcase-heading"><p>{artwork.kind === "family" ? (language === "es" ? "Familia" : "Family") : (language === "es" ? "Pieza" : "Piece")}</p>')
replace("app/selected-artworks/[slug]/page.tsx", '<div className="piece-facts"><p>Ficha técnica</p><h2>{code}</h2><dl><div><dt>Año</dt><dd>{artwork.year}</dd></div><div><dt>Materiales</dt><dd>{artwork.material}</dd></div><div><dt>Dimensiones</dt><dd>{artwork.dimensions}</dd></div>{artwork.edition && <div><dt>Tipo</dt><dd>{artwork.edition}</dd></div>}</dl></div>', '<div className="piece-facts"><p>{language === "es" ? "Ficha técnica" : "Technical details"}</p><h2>{code}</h2><dl><div><dt>{language === "es" ? "Año" : "Year"}</dt><dd>{artwork.year}</dd></div><div><dt>{language === "es" ? "Materiales" : "Materials"}</dt><dd>{artwork.material}</dd></div><div><dt>{language === "es" ? "Dimensiones" : "Dimensions"}</dt><dd>{artwork.dimensions}</dd></div>{artwork.edition && <div><dt>{language === "es" ? "Tipo" : "Type"}</dt><dd>{artwork.edition}</dd></div>}</dl></div>')
replace("app/selected-artworks/[slug]/page.tsx", '<aside className="piece-related-project"><span>Proyecto relacionado</span><Link href={`/projects/${projectSlug}`}>{relatedProject.titleEs} ↗</Link></aside>', '<aside className="piece-related-project"><span>{language === "es" ? "Proyecto relacionado" : "Related project"}</span><Link href={`/projects/${projectSlug}?lang=${language}`}>{language === "es" ? relatedProject.titleEs : relatedProject.titleEn} ↗</Link></aside>')
replace("app/selected-artworks/[slug]/page.tsx", '<footer className="archive-footer"><span>Brenda Ranieri © 2026</span><span>ES / EN</span></footer>', '<footer className="archive-footer"><span>Brenda Ranieri © 2026</span><div className="language-switch"><Link className={language === "en" ? "active" : ""} href="?lang=en">EN</Link><span>/</span><Link className={language === "es" ? "active" : ""} href="?lang=es">ES</Link></div></footer>')

print("Completed public English controls")
