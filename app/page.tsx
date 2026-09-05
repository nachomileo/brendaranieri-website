"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteSignature } from "./components/site-signature";
import { FooterContact } from "./components/footer-contact";
import { ArrowIcon } from "./components/arrow-icon";
import { artworkCode, homeArtworks } from "../lib/artworks";
import { getHomeProjectImages } from "../lib/project-images";
import { projectPresentation } from "../lib/project-presentation";
import { projects } from "../lib/projects";
import { localizedHref } from "../lib/i18n";
import { useSiteLanguage } from "./components/use-site-language";

function EditorialLine({ value }: { value: string }) {
  return <>{value.split(/[“”"]/).map((part, index) => index % 2 ? <em key={index}>{part}</em> : part)}</>;
}

const copy = {
  en: {
    nav: ["Exhibitions & Projects", "About", "Artworks", "Situated Processes", "Shared Practices"],
    practice: "Visual artist working with matter, territory, water and transformation.",
    view: "View project",
    viewAllProjects: "View all",
    projects: "Exhibitions & Projects",
    bio: "Visual artist and ceramicist. I research how matter, territory and collective processes can open new forms of creation.",
    works: "Selected Works",
    studio: "Situated Processes",
    studioText: "I gather, classify, test and archive materials from the landscape to incorporate them into works and installations. This process connects fieldwork, laboratory research and artistic practice.",
    shared: "Shared Practices",
    sharedText: "Collective research and co-creation.",
    note: "Field note",
    contact: "Contact",
  },
  es: {
    nav: ["Exposiciones y proyectos", "About", "Piezas", "Procesos situados", "Prácticas colectivas"],
    practice: "Artista visual. Materia, territorio, agua y transformación.",
    view: "Ver proyecto",
    viewAllProjects: "Ver todos",
    projects: "Exposiciones y proyectos",
    bio: "Artista visual y ceramista. Investigo cómo la materia, el territorio y los procesos colectivos pueden abrir nuevas formas de creación.",
    works: "Piezas",
    studio: "Procesos situados",
    studioText: "Recolecto, clasifico, pruebo y archivo materiales del paisaje para incorporarlos al diseño de piezas e instalaciones. Este recorrido conecta el trabajo de campo, el laboratorio y la práctica artística.",
    shared: "Prácticas colectivas",
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
  "vasija-2": 1,
  "materia-solidificandose": 2,
  "antes-del-rayo": 0,
  "vasija-ladrillo": 0,
  "vasija-con-metal": 0,
  "vasija-con-piedras": 0,
};

export default function Home() {
  const [language, setLanguage] = useSiteLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];

  return (
    <>
      <header className="site-header" id="page-top">
        <SiteSignature href="#page-top" />
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
        <nav className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Primary navigation">
          {sections.map((id, index) => { const href = id === "projects" ? "/projects" : id === "bio" ? "/about" : `#${id}`; return <a key={id} href={localizedHref(href, language)} onClick={() => setMenuOpen(false)}>{t.nav[index]}</a>; })}
        </nav>
      </header>

      <main>
        <section className="hero" aria-label="Featured artwork">
          <div className="hero-image"><Image src="/images/hero-la-forma-del-agua-quieta-final.webp" alt="Fuente cerámica de La forma del agua quieta sobre fondo blanco" fill priority sizes="100vw" quality={92} /></div>
        </section>

        <section className="projects section" id="projects" aria-labelledby="projects-title">
          <div className="section-title"><div className="section-title-stack"><h2 id="projects-title">{t.projects}</h2><Link href={localizedHref("/projects", language)}>{t.viewAllProjects} <ArrowIcon /></Link></div><span>2022—2026</span></div>
          {homeProjects.map((project, projectIndex) => {
            const presentation = projectPresentation(project, language);
            const homeImages = getHomeProjectImages(project.slug);
            const previewCount = homeImages.length || (project.slug === "oax-car-38-57" ? 4 : 3);
            return <article className="project-row" key={project.slug}>
              <div className="project-index">{String(projectIndex + 1).padStart(2, "0")}</div>
              <div className={`project-info ${project.slug === "oax-car-38-57" ? "numeric-project-title" : ""}`}><h3>{presentation.title}</h3><p>{presentation.lines.map((line, index) => <span key={line + index}><EditorialLine value={line} />{index < presentation.lines.length - 1 && <br />}</span>)}</p><a href={localizedHref(`/projects/${project.slug}`, language)}>{t.view} <ArrowIcon /></a></div>
              <div className={`project-composition project-composition-${previewCount} ${projectIndex >= 2 ? "is-right-aligned" : ""}`} style={{ "--preview-count": previewCount } as CSSProperties}>
                {Array.from({ length: previewCount }, (_, imageIndex) => {
                  const image = homeImages[imageIndex];
                  const ratio = image ? image.width / image.height : .75;
                  return <figure className="project-preview" style={{ "--image-ratio": ratio, "--preview-width": `clamp(${Math.round(ratio * 150)}px, ${ratio * 15}vw, ${Math.round(ratio * 230)}px)`, "--mobile-preview-width": `${ratio * 31}vw` } as CSSProperties} key={image?.src ?? imageIndex}><span>{projectIndex + 1}.{imageIndex + 1}</span><a href={localizedHref(`/projects/${project.slug}`, language)} aria-label={`${t.view}: ${presentation.title}`}><div className={`project-preview-frame ${image ? "" : `placeholder project-tone-${(projectIndex + imageIndex) % 6 + 1}`}`}>{image && <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 24vw, 12vw" quality={85} />}</div></a></figure>;
                })}
              </div>
            </article>;
          })}
        </section>

        <section className="bio section" id="bio" aria-labelledby="bio-title">
          <Link className="portrait" href={localizedHref("/about", language)} aria-label="About — Brenda Ranieri"><Image src="/images/journal/home/about-portada.webp" alt="Retrato de Brenda Ranieri en su estudio de Carabanchel" fill sizes="(max-width: 760px) 100vw, 50vw" quality={90} /></Link>
          <div className="bio-copy"><p className="kicker">About</p><h2 id="bio-title">Brenda<br />Ranieri</h2><p className="bio-text">{t.bio}</p><a className="text-link" href={localizedHref("/about", language)}>About <ArrowIcon /></a></div>
        </section>

        <section className="section artworks" id="works" aria-labelledby="works-title">
          <div className="section-title"><h2 id="works-title">{t.works}</h2><div className="section-actions"><span>01—06</span><Link href={localizedHref("/selected-artworks", language)}>{language === "es" ? "Ver todas" : "View all"} <ArrowIcon /></Link></div></div>
          <div className="artwork-ledger">
            {homeArtworks.map((artwork) => {
              const cover = artwork.images?.[homeArtworkCover[artwork.slug] ?? 0];
              return <article className="artwork" key={artwork.slug}>
                <div className="artwork-number">{artworkCode(artwork)}</div>
                <a className="artwork-stage" href={localizedHref(`/selected-artworks/${artwork.slug}`, language)} aria-label={language === "es" ? `Ver pieza ${artworkCode(artwork)}` : `View work ${artworkCode(artwork)}`}>
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
          <div className="studio-copy"><p className="kicker">{t.note} 014</p><h2 id="studio-title">{t.studio}</h2><p>{t.studioText}</p><Link className="home-archive-link" href={localizedHref("/situated-processes", language)}>{language === "es" ? "Ver archivo" : "View archive"} <ArrowIcon /></Link><div className="studio-index"><span>Clay 680</span><span>Asturias</span><span>20.08.2025</span></div></div>
          <a className="studio-image" href={localizedHref("/situated-processes", language)}><Image src="/images/journal/diary/situated-artistic/situated-03-practica-005.webp" alt="Archivo de materiales y herramientas en el estudio de Brenda Ranieri" fill sizes="(max-width: 760px) 100vw, 58vw" quality={88} /></a>
        </section>

        <section className="studio section home-journal-teaser home-shared-teaser" id="shared" aria-labelledby="shared-title">
          <div className="studio-copy"><p className="kicker">{t.note} 015</p><h2 id="shared-title">{t.shared}</h2><p>{t.sharedText}</p><Link className="home-archive-link" href={localizedHref("/shared-practices", language)}>{language === "es" ? "Ver archivo" : "View archive"} <ArrowIcon /></Link><div className="studio-index"><span>{language === "es" ? "Co-creación" : "Co-creation"}</span><span>Madrid</span><span>2025—2026</span></div></div>
          <a className="studio-image" href={localizedHref("/shared-practices", language)}><Image src="/images/journal/shared/home-shared-portada.webp" alt="Taller colectivo con arcillas silvestres y materiales del paisaje urbano" fill sizes="(max-width: 760px) 100vw, 58vw" quality={90} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <FooterContact />
        <div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")} aria-pressed={language === "es"}>ES</button></div>
      </footer>
    </>
  );
}
