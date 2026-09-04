"use client";

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
      <nav className="archive-onward" aria-label={language === "es" ? "Continuar explorando" : "Continue exploring"}><Link href="/about">About ↗</Link><Link href="/selected-artworks">{language === "es" ? "Piezas" : "Pieces"} ↗</Link><Link href="/situated-processes">{language === "es" ? "Procesos situados" : "Situated processes"} ↗</Link></nav>
    </main>
    <footer className="archive-footer"><span>Brenda Ranieri © 2026</span><div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button></div></footer>
  </>;
}
