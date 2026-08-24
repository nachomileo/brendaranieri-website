import type { JournalImage } from "../../lib/journals";
import { ZoomableArtworkImage } from "./zoomable-artwork-image";

type JournalSection = { number: string; title: string; meta: string; text: string[]; images: JournalImage[] };

export function JournalPage({ title, intro, sections, compact = false }: { title: string; intro: string[]; sections: JournalSection[]; compact?: boolean }) {
  return (
    <main className="journal-page gallery-journal-page">
      <header className="gallery-journal-heading">
        <p>Archivo de práctica</p>
        <div className="gallery-journal-heading-content">
          <h1>{title}</h1>
          <div className="gallery-journal-intro">{intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </header>
      <nav className="practice-narrative-index" aria-label={`Narrativas de ${title}`}>{sections.map((section) => <a href={`#practice-${section.number}`} key={section.number}><span>{section.number}</span><strong>{section.title}</strong></a>)}</nav>
      <div className={`practice-narratives ${compact ? "is-compact" : ""}`}>
        {sections.map((section) => <section className="practice-narrative" id={`practice-${section.number}`} key={section.number}>
          <header><span>{section.number}</span><div><h2>{section.title}</h2><p>{section.meta}</p></div><div className="practice-narrative-copy">{section.text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></header>
          <div className="practice-gallery" aria-label={`Galería: ${section.title}`}>{section.images.map((image) => <figure key={image.src}><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 45vw" /></figure>)}</div>
        </section>)}
      </div>
    </main>
  );
}
