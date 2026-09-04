import type { Metadata } from "next";
import { readdirSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectPresentation, type ProjectCategory } from "../../../lib/project-presentation";
import { getProjectImages } from "../../../lib/project-images";
import { getProject, projects } from "../../../lib/projects";
import { SiteSignature } from "../../components/site-signature";
import { SiteNavigation } from "../../components/site-navigation";
import { ProjectEditorialGallery } from "../../components/project-editorial-gallery";
import { OaxProjectBlocks } from "../../components/oax-project-blocks";
import { FooterContact } from "../../components/footer-contact";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  const presentation = project ? projectPresentation(project, "es") : undefined;
  return project && presentation ? { title: `${presentation.title} — Brenda Ranieri`, description: project.introEs } : {};
}

export default async function ProjectPage({ params, searchParams }: Props) {
  const language = (await searchParams).lang === "en" ? "en" : "es";
  const project = getProject((await params).slug);
  if (!project) notFound();
  const presentation = projectPresentation(project, language);
  const projectImages = getProjectImages(project.slug);
  const narrativeImages = project.slug === "oax-car-38-57" ? projectImages.filter((image) => image.kind !== "archive") : projectImages;
  const categoryLabels: Record<ProjectCategory, string> = language === "es" ? { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Bienal", "cultural-festivals": "Festivales culturales", collaborations: "Colaboraciones", residencies: "Residencias" } : { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Biennial", "cultural-festivals": "Cultural festivals", collaborations: "Collaborations", residencies: "Residencies" };
  const index = projects.findIndex(({ slug }) => slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const bodyParagraphs = (language === "es" ? project.bodyEs : project.bodyEn).split(/\n\s*\n/).filter(Boolean).map((paragraph) => paragraph.replaceAll("*", ""));
  const projectCode = `P.${String(index + 1).padStart(2, "0")}`;
  const loadOaxFolder = (folder: string, alt: string) => {
    const directory = path.join(process.cwd(), "public/images/projects/oax-car-38-57", folder);
    return readdirSync(directory)
      .filter((name) => /\.(?:webp|png|jpe?g)$/i.test(name))
      .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
      .map((name, imageIndex) => ({
        src: `/images/projects/oax-car-38-57/${folder.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(name)}`,
        alt: `${alt}, imagen ${imageIndex + 1}`,
      }));
  };
  const oaxProjectImages = project.slug === "oax-car-38-57" ? narrativeImages.filter((image) => !image.src.endsWith("/home-05.webp") && !image.src.endsWith("/home-02.webp")) : [];
  const oaxFieldArchive = project.slug === "oax-car-38-57" ? loadOaxFolder("Archivo 35mm", "Registro analógico del proceso de OAX-CAR-38-57") : [];
  const oaxRayograms = project.slug === "oax-car-38-57" ? loadOaxFolder("Rayogramas", "Proceso de co-creación y rayograma de agua") : [];
  const facts = [
    ["period", "Período", project.period], ["place", "Lugar", project.place], ["type", "Tipo", project.type],
    ["institution", "Institución", project.institution], ["curator", "Comisariado", project.curator],
    ["materials", "Materiales", project.materials], ["techniques", "Técnicas", project.techniques], ["dimensions", "Dimensiones", project.dimensions],
  ] as const;

  return (
    <>
      <header className="archive-header project-detail-header"><SiteSignature /><SiteNavigation language={language} /></header>
      <main className="project-detail">
        <section className="project-showcase project-showcase-intro" aria-labelledby="project-title">
          <div className={`project-showcase-heading ${project.slug === "oax-car-38-57" ? "numeric-project-title" : ""}`}><p>{categoryLabels[presentation.category]} · {presentation.lines.at(-1)}</p><h1 id="project-title">{presentation.title}</h1></div>
        </section>
        {project.slug === "oax-car-38-57" ? (
          <OaxProjectBlocks project={project} images={oaxProjectImages} rayograms={oaxRayograms} fieldArchive={oaxFieldArchive} language={language} />
        ) : <>
        <nav className="oax-block-index project-block-index" aria-label={`Índice de ${presentation.title}`}>
          <a href="#project-information"><span>01</span><strong>{language === "es" ? "Contexto e información" : "Context and information"}</strong><small>{language === "es" ? "Ficha y texto del proyecto" : "Project facts and text"}</small></a>
          <a href="#project-archive"><span>02</span><strong>{language === "es" ? "Archivo" : "Archive"}</strong><small>{narrativeImages.length} {language === "es" ? "imágenes" : "images"}</small></a>
        </nav>
        <section className="project-overview" id="project-information" aria-label="Información del proyecto">
          <div className="project-facts"><dl>{facts.filter(([key, , value]) => value && value !== "PENDIENTE" && !project.hiddenFacts?.includes(key)).map(([key, label, value]) => <div key={key}><dt>{project.factLabels?.[key] ?? label}</dt><dd>{value}</dd></div>)}</dl></div>
          <article className="project-overview-copy"><span>{language === "es" ? "01 — Contexto y proceso" : "01 — Context and process"}</span>{bodyParagraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</article>
        </section>
        <div id="project-archive"><ProjectEditorialGallery title={presentation.title} code={projectCode} images={narrativeImages} featuredIndex={project.slug === "la-forma-del-agua-quieta" ? 6 : 0} text="" /></div>
        </>}
        <nav className="artwork-pagination" aria-label="Previous and next project"><Link href={`/projects/${previous.slug}`}>← {previous.titleEs}</Link><Link href="/#projects">Todos los proyectos</Link><Link href={`/projects/${next.slug}`}>{next.titleEs} →</Link></nav>
      </main>
      <footer className="archive-footer"><FooterContact /><div className="language-switch"><Link className={language === "en" ? "active" : ""} href={`?lang=en`}>EN</Link><span>/</span><Link className={language === "es" ? "active" : ""} href={`?lang=es`}>ES</Link></div></footer>
    </>
  );
}
