import Link from "next/link";
import { formatNoteDate, type NoteRecord } from "../../lib/notes";
import { localizedHref } from "../../lib/i18n";
import { ZoomableArtworkImage } from "./zoomable-artwork-image";
import { ArrowIcon } from "./arrow-icon";

export function NoteArticle({ note, language = "es", compact = false }: { note: NoteRecord; language?: "es" | "en"; compact?: boolean }) {
  const title = language === "es" ? note.titleEs : note.titleEn;
  const text = language === "es" ? note.textEs : note.textEn;
  const context = language === "es" ? note.contextEs : note.contextEn;
  const quote = language === "es" ? note.quoteEs : note.quoteEn;
  const quoteCredit = language === "es" ? note.quoteCreditEs : note.quoteCreditEn;
  return <article className={`note-article ${compact ? "is-compact" : ""}`}>
    <header><time dateTime={note.date}>{formatNoteDate(note.date, language)}</time><h2>{title}</h2><p>{context}</p></header>
    <div className="note-copy">{text.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    {quote && <blockquote className="note-quote"><p>{quote}</p>{quoteCredit && <cite>— <i>{quoteCredit}</i></cite>}</blockquote>}
    <div className="note-gallery">{note.images.map((image, index) => <figure key={image.src}><span>N.{String(index + 1).padStart(2, "0")}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 45vw" /></figure>)}</div>
    {compact && <Link className="note-read-link" href={localizedHref(`/notes/${note.slug}`, language)}>{language === "es" ? "Leer nota" : "Read note"} <ArrowIcon /></Link>}
  </article>;
}
