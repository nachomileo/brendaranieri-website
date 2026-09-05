"use client";

import type { JournalEntry } from "../../lib/journals";
import { SiteNavigation } from "./site-navigation";
import { ArrowIcon } from "./arrow-icon";
import { SiteSignature } from "./site-signature";
import { ZoomableArtworkImage } from "./zoomable-artwork-image";
import { ArtworkSlider } from "./artwork-slider";
import { FooterContact } from "./footer-contact";
import { localizedHref } from "../../lib/i18n";
import { useSiteLanguage } from "./use-site-language";

type Language = "es" | "en";
function EditorialText({ text }: { text: string }) {
  return <>{text.split("*").map((part, index) => index % 2 ? <em key={index}>{part}</em> : part)}</>;
}

type JournalCopy = { title: string; intro: string[]; archive: string; narratives: string; sections: JournalEntry[]; cover?: JournalEntry["images"][number]; website?: { label: string; href: string } };

export function JournalPage({ content, indexMode = "text", pageClassName = "" }: { content: Record<Language, JournalCopy>; indexMode?: "text" | "projects"; pageClassName?: string }) {
  const [language, setLanguage] = useSiteLanguage();
  const copy = content[language];
  return <>
    <header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header>
    <main className={`journal-page gallery-journal-page ${pageClassName}`}>
      <header className="gallery-journal-heading"><p>{copy.archive}</p><div className="gallery-journal-heading-content"><h1>{copy.title}</h1><div className="gallery-journal-intro">{copy.intro.map((paragraph) => <p key={paragraph}><EditorialText text={paragraph} /></p>)}{copy.website && <a className="journal-external-link" href={copy.website.href} target="_blank" rel="noopener noreferrer">{copy.website.label} <ArrowIcon /></a>}</div></div>{copy.cover && <figure className="gallery-journal-cover"><ZoomableArtworkImage image={copy.cover} sizes="(max-width: 760px) 100vw, 34vw" /></figure>}</header>
      {indexMode === "projects" ? <nav className="practice-project-index" aria-label={`${copy.narratives}: ${copy.title}`}>{copy.sections.map((section) => <a href={`#practice-${section.number}`} key={section.number}><span>{section.number}</span><div className="practice-project-card-title"><strong>{section.title}</strong><small>{copy.archive}</small></div><figure><ZoomableArtworkImage image={section.images[0]} sizes="(max-width: 760px) 100vw, 50vw" /></figure><div className="practice-project-card-meta"><small>{section.meta}</small><em>{language === "es" ? "Ver archivo ↓" : "View archive ↓"}</em></div></a>)}</nav> : <nav className="practice-narrative-index" aria-label={`${copy.narratives}: ${copy.title}`}>{copy.sections.map((section) => <a href={`#practice-${section.number}`} key={section.number}><span>{section.number}</span><strong>{section.title}</strong></a>)}</nav>}
      <div className="practice-narratives">{copy.sections.map((section, sectionIndex) => <section className={`practice-narrative ${section.wideText ? "is-wide-copy" : ""}`} id={`practice-${section.number}`} key={section.number}>
        <header><span>{section.number}</span><div><h2>{section.title}</h2><p>{section.meta}</p>{copy.sections[sectionIndex + 1] && <a className="practice-next-link" href={`#practice-${copy.sections[sectionIndex + 1].number}`}>{language === "es" ? "Ver" : "View"} {copy.sections[sectionIndex + 1].number} {copy.sections[sectionIndex + 1].title} ↓</a>}</div><div className="practice-narrative-copy">{section.text.map((paragraph) => <p key={paragraph}><EditorialText text={paragraph} /></p>)}</div></header>
        <div className="practice-gallery" aria-label={`${language === "es" ? "Galería" : "Gallery"}: ${section.title}`}>{section.images.map((image, index) => <figure className={`practice-image-${index % 6 + 1} ${image.width < 700 ? "is-low-resolution" : ""}`} key={image.src}><span className="practice-image-ref">{section.number}.{String(index + 1).padStart(2, "0")}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 50vw" /></figure>)}</div>
        {section.editorialNotes?.map((note, noteIndex) => <aside className="journal-editorial-note" key={note.title}><header><span>{section.number}.N{String(noteIndex + 1).padStart(2, "0")}</span><h3>{note.title}</h3><p>{note.meta}</p></header><div className="journal-editorial-note-copy">{note.text.map((paragraph) => <p key={paragraph}><EditorialText text={paragraph} /></p>)}{note.href && <a href={localizedHref(note.href, language)}>{language === "es" ? "Leer en Notas" : "Read in Notes"} <ArrowIcon /></a>}</div><div className="journal-editorial-note-gallery">{note.images.map((image, imageIndex) => <figure key={image.src}><span>{section.number}.N{noteIndex + 1}.{imageIndex + 1}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 32vw" /></figure>)}</div></aside>)}
        {section.sequences?.map((sequence, sequenceIndex) => sequence.layout === "grid" ? <section className="practice-collection is-integrated" aria-label={sequence.label} key={sequence.label}><div className="practice-gallery">{sequence.images.map((image, imageIndex) => <figure className={`practice-image-${imageIndex % 6 + 1} ${image.width < 700 ? "is-low-resolution" : ""}`} key={image.src}><span className="practice-image-ref">{section.number}.{sequenceIndex + 1}.{String(imageIndex + 1).padStart(2, "0")}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 50vw" />{imageIndex === 0 && <figcaption>{sequence.label}</figcaption>}</figure>)}</div></section> : <section className="practice-sequence" aria-label={sequence.label} key={sequence.label}><header><span>{String(sequenceIndex + 1).padStart(2, "0")}</span><h3>{sequence.label}</h3><span>{String(sequence.images.length).padStart(2, "0")} {language === "es" ? "registros" : "records"}</span></header><ArtworkSlider images={sequence.images} code={`${section.number}.S${sequenceIndex + 1}`} /></section>)}
        {section.afterImages && section.afterImages.length > 0 && <div className="practice-gallery practice-gallery-after" aria-label={language === "es" ? "Continuación del diario" : "Diary continuation"}>{section.afterImages.map((image, index) => <figure className={`practice-image-${index % 6 + 1} ${image.width < 700 ? "is-low-resolution" : ""}`} key={image.src}><span className="practice-image-ref">{section.number}.{String(index + 1).padStart(2, "0")}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 50vw" /></figure>)}</div>}
      </section>)}</div>
    </main>
    <footer className="archive-footer"><FooterContact /><div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button></div></footer>
  </>;
}
