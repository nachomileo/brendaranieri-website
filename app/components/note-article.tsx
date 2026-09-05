import Link from "next/link";
import type { NoteRecord } from "../../lib/notes";
import { localizedHref } from "../../lib/i18n";
import { ZoomableArtworkImage } from "./zoomable-artwork-image";
import { ArrowIcon } from "./arrow-icon";

export function NoteArticle({ note, language = "es", compact = false }: { note: NoteRecord; language?: "es" | "en"; compact?: boolean }) {
  const title = language === "es" ? note.titleEs : note.titleEn;
  const text = language === "es" ? note.textEs : note.textEn;
  const context = language === "es" ? note.contextEs : note.contextEn;
  return <article className={`note-article ${compact ? "is-compact" : ""}`}>
    <header><span>{note.year}</span><h2>{title}</h2><p>{context}</p></header>
    <div className="note-copy">{text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    <div className="note-gallery">{note.images.map((image, index) => <figure key={image.src}><span>N.{String(index + 1).padStart(2, "0")}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 45vw" /></figure>)}</div>
    {compact && <Link className="note-read-link" href={localizedHref(`/notes/${note.slug}`, language)}>{language === "es" ? "Leer nota" : "Read note"} <ArrowIcon /></Link>}
  </article>;
}
