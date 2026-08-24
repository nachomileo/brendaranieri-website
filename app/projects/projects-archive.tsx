"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProjectCover } from "../../lib/project-images";
import { projectCategories, projectPresentation, projectSortDate, type ProjectLanguage } from "../../lib/project-presentation";
import { projects } from "../../lib/projects";
import { SiteSignature } from "../components/site-signature";
import { SiteNavigation } from "../components/site-navigation";

const chronologicalProjects = [...projects].sort((a, b) => projectSortDate(b) - projectSortDate(a));

const copy = {
  en: { home: "Home", heading: "Exhibitions & Projects", count: "projects", categories: { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Biennial", "cultural-festivals": "Cultural festivals", collaborations: "Collaborations", residencies: "Residencies" } },
  es: { home: "Inicio", heading: "Exposiciones y proyectos", count: "proyectos", categories: { "solo-shows": "Solo shows", "group-shows": "Group shows", biennial: "Bienal", "cultural-festivals": "Festivales culturales", collaborations: "Colaboraciones", residencies: "Residencias" } },
} as const;

function EditorialLine({ value }: { value: string }) {
  return <>{value.split(/[“”"]/).map((part, index) => index % 2 ? <em key={index}>{part}</em> : part)}</>;
}

export default function ProjectsArchive() {
  const [language, setLanguage] = useState<ProjectLanguage>("es");
  const text = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <>
      <header className="archive-header">
        <SiteSignature />
        <SiteNavigation />
      </header>
      <main className="projects-page">
        <div className="archive-heading"><h1>{text.heading}</h1><span>{String(chronologicalProjects.length).padStart(2, "0")} {text.count}</span></div>
        <nav className="project-category-index" aria-label={language === "es" ? "Índice de categorías" : "Category index"}>
          {projectCategories.map((category, categoryIndex) => {
            const count = chronologicalProjects.filter((project) => projectPresentation(project, language).category === category).length;
            return <a className="project-category-card" href={`#category-${category}`} key={category}>
              <span className="project-category-number">{String(categoryIndex + 1).padStart(2, "0")}</span>
              <span className="project-category-name">{text.categories[category]}</span>
              <span className="project-category-count">{String(count).padStart(2, "0")}</span>
              <span className="project-category-arrow" aria-hidden="true">↓</span>
            </a>;
          })}
        </nav>
        <div className="project-groups">
          {projectCategories.map((category) => {
            const categoryProjects = chronologicalProjects.filter((project) => projectPresentation(project, language).category === category);
            return <section className="project-group" id={`category-${category}`} key={category}>
              <div className="project-group-heading"><h2>{text.categories[category]}</h2><span>{String(categoryProjects.length).padStart(2, "0")}</span></div>
              <div className="all-projects-list">
                {categoryProjects.map((project) => {
                  const presentation = projectPresentation(project, language);
                  const index = chronologicalProjects.indexOf(project);
                  const cover = getProjectCover(project.slug);
                  return <Link className="archive-project" href={`/projects/${project.slug}`} key={project.slug}>
                    <span className="archive-project-number">{String(index + 1).padStart(2, "0")}</span>
                    <div className={`archive-project-title ${project.slug === "oax-car-38-57" ? "numeric-project-title" : ""}`}><h3>{presentation.title}</h3><span>{language === "es" ? "Ver proyecto" : "View project"} ↗</span></div>
                    {cover ? <div className="archive-project-image"><Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 760px) 70vw, 30vw" quality={82} /></div> : <div className={`placeholder archive-project-image project-tone-${index % 6 + 1}`} role="img" aria-label={`${presentation.title} image placeholder`} />}
                    <div className="archive-project-data">{presentation.lines.map((line, lineIndex) => <span key={line + lineIndex}><EditorialLine value={line} /></span>)}</div>
                  </Link>;
                })}
              </div>
            </section>;
          })}
        </div>
      </main>
      <footer className="archive-footer"><span>Brenda Ranieri © 2026</span><div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")} aria-pressed={language === "es"}>ES</button></div></footer>
    </>
  );
}
