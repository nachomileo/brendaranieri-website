"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";
import { FooterContact } from "../components/footer-contact";
import { ArrowIcon } from "../components/arrow-icon";
import { getProjectCover } from "../../lib/project-images";
import { projectPresentation, projectSortDate } from "../../lib/project-presentation";
import { projects } from "../../lib/projects";
import { localizedHref } from "../../lib/i18n";
import { useSiteLanguage } from "../components/use-site-language";

const chronologicalProjects = [...projects].sort((a, b) => projectSortDate(b) - projectSortDate(a));

const content = {
  es: {
    lead: "Artista visual y ceramista. Investigo cómo la materia, el territorio y los procesos colectivos pueden abrir nuevas formas de creación.",
    statement: [
      "Desde mi taller en Carabanchel (Madrid), desarrollo una práctica artística que investiga la relación entre materia, territorio y memoria a través de la cerámica, la instalación y el trabajo de campo. Mi investigación parte de la observación atenta del paisaje —especialmente de aquellas infraestructuras y materiales que suelen pasar desapercibidos— para explorar las historias geológicas, urbanas y afectivas inscritas en los lugares.",
      "Trabajo a partir de procesos de deriva, escucha y recolección de materiales locales, con especial interés por las arquitecturas del agua, las arcillas, los restos constructivos y otros elementos que revelan las transformaciones del territorio. Entiendo la práctica cerámica como una forma de leer y establecer vínculos con el entorno, donde la materia no es un soporte pasivo sino un agente que participa en la construcción de sentido.",
      "Mi trabajo combina la elaboración de pastas cerámicas y esmaltes propios con materiales naturales, desarrollando procesos experimentales en los que el taller funciona como un espacio de investigación que integra lo artístico y lo técnico, la intuición y la atención a las cualidades físicas y simbólicas de los materiales.",
      "A través de instalaciones, esculturas e intervenciones específicas para cada lugar, me interesa activar formas de encuentro entre las personas y el territorio, proponiendo desplazamientos en la manera de mirar los espacios cotidianos. Mi práctica busca hacer visibles memorias latentes y generar situaciones donde lo humano y lo más-que-humano puedan entenderse como agentes que configuran conjuntamente el paisaje.",
      "Desde 2024 fundé y dirijo Fresca. La nave, un espacio independiente de creación contemporánea en Carabanchel dedicado a la experimentación artística, la producción y el intercambio cultural.",
    ],
    projects: "Proyectos",
    archive: "Consultar archivo completo",
  },
  en: {
    lead: "Visual artist and ceramicist. I explore how matter, territory and collective processes can open up new forms of creation.",
    statement: [
      "From my studio in Carabanchel, Madrid, I develop an artistic practice that explores the relationship between matter, territory and memory through ceramics, installation and fieldwork. My research begins with attentive observation of the landscape—particularly the infrastructures and materials that often go unnoticed—to explore the geological, urban and affective histories inscribed in places.",
      "I work through processes of wandering, listening and gathering local materials, with a particular interest in water infrastructures, clays, construction remnants and other elements that reveal transformations in the territory. I understand ceramic practice as a way of reading and forming connections with my surroundings, where matter is not a passive support but an agent that participates in the construction of meaning.",
      "My work combines the development of my own ceramic bodies and glazes with natural materials. Through experimental processes, the studio becomes a space of research that brings together the artistic and the technical, intuition and attention to the physical and symbolic qualities of materials.",
      "Through installations, sculptures and site-specific interventions, I seek to activate encounters between people and territory, shifting the way everyday spaces are perceived. My practice aims to make latent memories visible and to create situations in which human and more-than-human actors can be understood as jointly shaping the landscape.",
      "In 2024 I founded and continue to direct Fresca. La nave, an independent contemporary art space in Carabanchel devoted to artistic experimentation, production and cultural exchange.",
    ],
    projects: "Projects",
    archive: "View full archive",
  },
} as const;

export default function AboutPage() {
  const [language, setLanguage] = useSiteLanguage();
  const copy = content[language];
  return <>
    <header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header>
    <main className="about-page about-page-compact">
      <section className="about-profile">
        <div className="about-profile-copy">
          <p className="about-label">About</p>
          <h1>Brenda Ranieri</h1>
          <p className="about-lead">{copy.lead}</p>
          <div className="about-statement-copy">{copy.statement.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="about-profile-links"><a href="mailto:hola@brendaranieri.art">Email <ArrowIcon /></a><a href="https://www.instagram.com/brendaranieri.studio/" target="_blank" rel="noopener noreferrer">Instagram <ArrowIcon /></a><a href="https://www.fresco.art/" target="_blank" rel="noopener noreferrer">{language === "es" ? "Visitar Fresca. La Nave" : "Visit Fresca. La Nave"} <ArrowIcon /></a></div>
        </div>
        <figure className="about-profile-image"><Image src="/images/journal/home/about-portada-interior.webp" alt="Retrato de Brenda Ranieri en su estudio de Carabanchel" fill priority sizes="(max-width: 760px) 100vw, 40vw" quality={92} /></figure>
      </section>
      <section className="about-projects about-projects-all" aria-labelledby="about-projects-title">
        <header><span id="about-projects-title">{copy.projects}</span><Link href={localizedHref("/projects", language)}>{copy.archive} <ArrowIcon /></Link></header>
        <div>{chronologicalProjects.map((project, index) => {
          const presentation = projectPresentation(project, language);
          const cover = getProjectCover(project.slug);
          return <Link className="about-project-card" href={localizedHref(`/projects/${project.slug}`, language)} key={project.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {cover && <figure><Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(max-width: 760px) 50vw, 25vw" /></figure>}
            <div><h2>{presentation.title}</h2><p>{presentation.lines.at(-1)}</p></div>
          </Link>;
        })}</div>
      </section>
      <nav className="about-onward about-onward-three" aria-label={language === "es" ? "Continuar explorando" : "Continue exploring"}><Link href={localizedHref("/selected-artworks", language)}>{language === "es" ? "Piezas" : "Works"} <ArrowIcon /></Link><Link href={localizedHref("/situated-processes", language)}>{language === "es" ? "Procesos situados" : "Situated processes"} <ArrowIcon /></Link><Link href={localizedHref("/shared-practices", language)}>{language === "es" ? "Prácticas colectivas" : "Collective practices"} <ArrowIcon /></Link></nav>
    </main>
    <footer className="archive-footer"><FooterContact /><div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button></div></footer>
  </>;
}
