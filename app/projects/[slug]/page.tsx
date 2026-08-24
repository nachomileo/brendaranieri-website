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

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  const presentation = project ? projectPresentation(project, "es") : undefined;
  return project && presentation ? { title: `${presentation.title} — Brenda Ranieri`, description: project.introEs } : {};
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const presentation = projectPresentation(project, "es");
  const projectImages = getProjectImages(project.slug);
  const narrativeImages = projectImages.filter((image) => image.kind !== "archive");
  const categoryLabels: Record<ProjectCategory, string> = { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Bienal", "cultural-festivals": "Festivales culturales", collaborations: "Colaboraciones", residencies: "Residencias" };
  const index = projects.findIndex(({ slug }) => slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const bodyParagraphs = project.bodyEs.split(/\n\s*\n/).filter(Boolean).map((paragraph) => paragraph.replaceAll("*", ""));
  const introductoryText = project.slug === "oax-car-38-57"
    ? "OAX-CAR-38-57 es un proyecto de Brenda Ranieri desde Fresca. La nave, desarrollado para Iberoamérica y Carabanchel: diálogos desde el diseño, en el marco de la Bienal Iberoamericana de Diseño 2026 (BID26), organizada por DiMaD en la Central de Diseño de Matadero Madrid. Conecta Oaxaca y Carabanchel mediante un archivo material y especulativo articulado por el agua, las arcillas locales, el Códice de Madrid y la búsqueda cerámica de un punto eutéctico. Los proyectos completos se presentarán durante la Bienal en noviembre de 2026."
    : project.introEs.replaceAll("*", "");
  const projectCode = `P.${String(index + 1).padStart(2, "0")}`;
  const sliderGroups = narrativeImages.length > 9 ? [narrativeImages.slice(-4)] : [];
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
  const oaxProjectImages = project.slug === "oax-car-38-57" ? narrativeImages : [];
  const oaxFieldArchive = project.slug === "oax-car-38-57" ? loadOaxFolder("Archivo 35mm", "Registro analógico del proceso de OAX-CAR-38-57") : [];
  const oaxRayograms = project.slug === "oax-car-38-57" ? loadOaxFolder("Rayogramas", "Proceso de co-creación y rayograma de agua") : [];

  return (
    <>
      <header className="archive-header project-detail-header"><SiteSignature /><SiteNavigation /></header>
      <main className="project-detail">
        <section className="project-showcase project-showcase-intro" aria-labelledby="project-title">
          <div className={`project-showcase-heading ${project.slug === "oax-car-38-57" ? "numeric-project-title" : ""}`}><p>{categoryLabels[presentation.category]} · {presentation.lines.at(-1)}</p><h1 id="project-title">{presentation.title}</h1><p>{introductoryText}</p></div>
        </section>
        {project.slug === "oax-car-38-57" ? (
          <OaxProjectBlocks project={project} images={oaxProjectImages} rayograms={oaxRayograms} fieldArchive={oaxFieldArchive} />
        ) : <>
        <ProjectEditorialGallery title={presentation.title} code={projectCode} images={narrativeImages} featuredIndex={0} sliderGroups={sliderGroups} text={project.introEs.replaceAll("*", "")} />
        <section className="project-overview" aria-label="Información del proyecto">
          <div className="project-facts"><dl><div><dt>Período</dt><dd>{project.period}</dd></div><div><dt>Lugar</dt><dd>{project.place}</dd></div><div><dt>Tipo</dt><dd>{project.type}</dd></div><div><dt>Institución</dt><dd>{project.institution}</dd></div><div><dt>Comisariado</dt><dd>{project.curator}</dd></div><div><dt>Materiales</dt><dd>{project.materials}</dd></div><div><dt>Técnicas</dt><dd>{project.techniques}</dd></div><div><dt>Dimensiones</dt><dd>{project.dimensions}</dd></div></dl></div>
          <article className="project-overview-copy"><span>01 — Contexto y proceso</span>{bodyParagraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</article>
        </section>
        </>}
        <nav className="artwork-pagination" aria-label="Previous and next project"><Link href={`/projects/${previous.slug}`}>← {previous.titleEs}</Link><Link href="/#projects">Todos los proyectos</Link><Link href={`/projects/${next.slug}`}>{next.titleEs} →</Link></nav>
      </main>
      <footer className="archive-footer"><span>Brenda Ranieri © 2026</span><span>ES / EN</span></footer>
    </>
  );
}
