"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteSignature } from "./components/site-signature";
import { artworkCode, homeArtworks } from "../lib/artworks";
import { getHomeProjectImages } from "../lib/project-images";
import { projectPresentation } from "../lib/project-presentation";
import { projects } from "../lib/projects";

type Language = "en" | "es";

function EditorialLine({ value }: { value: string }) {
  return <>{value.split(/[“”"]/).map((part, index) => index % 2 ? <em key={index}>{part}</em> : part)}</>;
}

const copy = {
  en: {
    nav: ["Exhibitions & Projects", "About", "Pieces", "Situated Processes", "Shared Practices"],
    practice: "Visual artist working with matter, territory, water and transformation.",
    view: "View project",
    viewAllProjects: "View all",
    projects: "Exhibitions & Projects",
    bio: "Visual artist and ceramicist. She researches how matter, territory and collective processes can open new forms of creation.",
    works: "Pieces",
    studio: "Situated Processes",
    studioText: "A living journal of fieldwork, wild clays, tests, firings and material transformations.",
    shared: "Shared Practices",
    sharedText: "Collective research and co-creation.",
    note: "Field note",
    contact: "Contact",
  },
  es: {
    nav: ["Exposiciones y proyectos", "About", "Piezas", "Procesos situados", "Prácticas compartidas"],
    practice: "Artista visual. Materia, territorio, agua y transformación.",
    view: "Ver proyecto",
    viewAllProjects: "Ver todos",
    projects: "Exposiciones y proyectos",
    bio: "Artista visual y ceramista. Investiga cómo la materia, el territorio y los procesos colectivos pueden abrir nuevas formas de creación.",
    works: "Piezas",
    studio: "Procesos situados",
    studioText: "Investigación matérica, procesos de taller, pruebas, formulaciones, recolección de arcillas silvestres, paisaje urbano y archivo personal.",
    shared: "Prácticas compartidas",
    sharedText: "Investigación colectiva y co-creación.",
    note: "Nota de campo",
    contact: "Contacto",
  },
} as const;

const sections = ["projects", "bio", "works", "processes", "shared"] as const;
const homeProjectOrder = [
  "la-forma-del-agua-quieta",
  "oax-car-38-57",
  "cosas-que-cargan-cosas",
  "el-botijo-revisitado",
  "bioceramica-a-base-de-residuos-de-cafe",
];
const homeProjects = homeProjectOrder.flatMap((slug) => projects.filter((project) => project.slug === slug));
const homeArtworkCover: Record<string, number> = {
  "vasija-2": 0,
  "materia-solidificandose": 2,
  "antes-del-rayo": 0,
  "vasija-ladrillo": 0,
  "vasija-con-metal": 0,
  "vasija-con-piedras": 0,
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <>
      <header className="site-header" id="page-top">
        <SiteSignature href="#page-top" />
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        <nav className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          {sections.map((id, index) => <a key={id} href={id === "projects" ? "/projects" : id === "bio" ? "/about" : `#${id}`} onClick={() => setMenuOpen(false)}>{t.nav[index]}</a>)}
        </nav>
      </header>

      <main>
        <section className="hero" aria-label="Featured artwork">
          <div className="hero-image"><Image src="/images/artworks/vasija-2/terra-brenda-ranieri-2026-11.webp" alt="A.03.2, detalle de la superficie de una vasija" fill priority sizes="100vw" quality={90} /></div>
        </section>

        <section className="projects section" id="projects" aria-labelledby="projects-title">
          <div className="section-title"><div className="section-title-stack"><h2 id="projects-title">{t.projects}</h2><Link href="/projects">{t.viewAllProjects} ↗</Link></div><span>2022—2026</span></div>
          {homeProjects.map((project, projectIndex) => {
            const presentation = projectPresentation(project, language);
            const homeImages = getHomeProjectImages(project.slug);
            const previewCount = homeImages.length || (project.slug === "oax-car-38-57" ? 4 : 3);
            return <article className="project-row" key={project.slug}>
              <div className="project-index">{String(projectIndex + 1).padStart(2, "0")}</div>
              <div className={`project-info ${project.slug === "oax-car-38-57" ? "numeric-project-title" : ""}`}><h3>{presentation.title}</h3><p>{presentation.lines.map((line, index) => <span key={line + index}><EditorialLine value={line} />{index < presentation.lines.length - 1 && <br />}</span>)}</p><a href={`/projects/${project.slug}`}>{t.view} ↗</a></div>
              <div className={`project-composition project-composition-${previewCount}`} style={{ "--preview-count": previewCount } as CSSProperties}>
                {Array.from({ length: previewCount }, (_, imageIndex) => {
                  const image = homeImages[imageIndex];
                  const ratio = image ? image.width / image.height : .75;
                  return <figure className="project-preview" style={{ "--image-ratio": ratio, flexGrow: ratio } as CSSProperties} key={image?.src ?? imageIndex}><span>{projectIndex + 1}.{imageIndex + 1}</span><a href={`/projects/${project.slug}`} aria-label={`${t.view}: ${presentation.title}`}><div className={`project-preview-frame ${image ? "" : `placeholder project-tone-${(projectIndex + imageIndex) % 6 + 1}`}`}>{image && <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 24vw, 12vw" quality={85} />}</div></a></figure>;
                })}
              </div>
            </article>;
          })}
        </section>

        <section className="bio section" id="bio" aria-labelledby="bio-title">
          <div className="portrait"><Image src="/images/journal/home/brenda-ranieri-estudio-ii.webp" alt="Estudio de Brenda Ranieri en Carabanchel" fill sizes="(max-width: 760px) 100vw, 50vw" quality={90} /></div>
          <div className="bio-copy"><p className="kicker">About</p><h2 id="bio-title">Brenda<br />Ranieri</h2><p className="bio-text">{t.bio}</p><a className="text-link" href="/about">About ↗</a></div>
        </section>

        <section className="section artworks" id="works" aria-labelledby="works-title">
          <div className="section-title"><h2 id="works-title">{t.works}</h2><div className="section-actions"><span>01—06</span><Link href="/selected-artworks">{language === "es" ? "Ver todas" : "View all"} ↗</Link></div></div>
          <div className="artwork-ledger">
            {homeArtworks.map((artwork) => {
              const cover = artwork.images?.[homeArtworkCover[artwork.slug] ?? 0];
              return <article className="artwork" key={artwork.slug}>
                <div className="artwork-number">{artworkCode(artwork)}</div>
                <a className="artwork-stage" href={`/selected-artworks/${artwork.slug}`} aria-label={`Ver pieza ${artworkCode(artwork)}`}>
                  {cover
                    ? <div className="artwork-stage-image"><Image src={cover.src} alt={cover.alt} fill sizes="(max-width: 760px) 42vw, 16vw" quality={88} /></div>
                    : <div className={`placeholder ${artwork.className}`} role="img" aria-label={`${artwork.title}, imagen pendiente`} />}
                </a>
                <div className="artwork-caption"><h3>{artworkCode(artwork)}</h3><p>{artwork.material}</p><span>{artwork.year}</span></div>
              </article>;
            })}
          </div>
        </section>

        <section className="studio section home-journal-teaser" id="processes" aria-labelledby="studio-title">
          <div className="studio-copy"><p className="kicker">{t.note} 014</p><h2 id="studio-title">{t.studio}</h2><p>{t.studioText}</p><div className="studio-index"><span>Clay 680</span><span>Asturias</span><span>20.08.2025</span></div></div>
          <a className="studio-image" href="/situated-processes"><Image src="/images/journal/situated/material-cantera-caolin-burela-brenda-ranieri-2026-14.webp" alt="Trabajo de campo y recolección de material en Burela" fill sizes="(max-width: 760px) 100vw, 58vw" quality={88} /><span>Leer el diario ↗</span></a>
        </section>

        <section className="shared-practices section" id="shared" aria-labelledby="shared-title">
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
        </section>
      </main>

      <footer className="site-footer">
        <div><span className="footer-signature">© 2026</span><a href="mailto:info@brendaranieri.art">{t.contact}</a><a href="https://www.instagram.com/brendaranieri.studio/">Instagram</a></div>
        <div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")} aria-pressed={language === "es"}>ES</button></div>
      </footer>
    </>
  );
}
