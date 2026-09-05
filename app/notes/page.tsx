import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notes } from "../../lib/notes";
import { localizedHref } from "../../lib/i18n";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";
import { FooterContact } from "../components/footer-contact";

export const metadata: Metadata = { title: "Notas — Brenda Ranieri", description: "Reflexiones sobre materia, agua, territorio y práctica artística.", alternates: { canonical: "/notes" } };

export default async function NotesPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const language = (await searchParams).lang === "en" ? "en" : "es";
  return <>
    <header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header>
    <main className="notes-page">
      <header className="notes-heading"><p>{language === "es" ? "Archivo de pensamiento" : "Thought archive"}</p><h1>{language === "es" ? "Notas" : "Notes"}</h1><p>{language === "es" ? "Reflexiones, hallazgos y puntos de vista que acompañan la investigación y los procesos de obra." : "Reflections, findings and points of view accompanying research and artistic processes."}</p></header>
      <div className="notes-index">{notes.map((note, index) => { const cover = note.images[note.coverIndex ?? 0]; return <Link href={localizedHref(`/notes/${note.slug}`, language)} key={note.slug}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{language === "es" ? note.titleEs : note.titleEn}</h2><p>{language === "es" ? note.contextEs : note.contextEn}</p></div><figure><Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} sizes="(max-width: 760px) 100vw, 50vw" /></figure><time dateTime={note.date}>{note.year}</time></Link>; })}</div>
    </main>
    <footer className="archive-footer"><FooterContact /></footer>
  </>;
}
