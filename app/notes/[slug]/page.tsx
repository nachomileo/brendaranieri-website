import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNote, notes } from "../../../lib/notes";
import { NoteArticle } from "../../components/note-article";
import { SiteNavigation } from "../../components/site-navigation";
import { SiteSignature } from "../../components/site-signature";
import { FooterContact } from "../../components/footer-contact";
import Link from "next/link";
import { ArrowIcon } from "../../components/arrow-icon";
import { localizedHref } from "../../../lib/i18n";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> };
export function generateStaticParams() { return notes.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const note = getNote((await params).slug); return note ? { title: `${note.titleEs} — Brenda Ranieri`, description: note.textEs[0], alternates: { canonical: `/notes/${note.slug}` } } : {}; }

export default async function NotePage({ params, searchParams }: Props) {
  const note = getNote((await params).slug); if (!note) notFound();
  const language = (await searchParams).lang === "en" ? "en" : "es";
  const related = note.slug === "la-caida-de-un-arbol"
    ? { href: "/projects/la-forma-del-agua-quieta", labelEs: "La forma del agua quieta", labelEn: "The Shape of Still Water", typeEs: "Leer el proyecto", typeEn: "Read the project" }
    : { href: "/situated-processes", labelEs: "Procesos situados", labelEn: "Situated processes", typeEs: "Archivo relacionado", typeEn: "Related archive" };
  return <><header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header><main className="note-page"><p className="note-kicker">{language === "es" ? "Nota de investigación" : "Research note"}</p><NoteArticle note={note} language={language} /><aside className="piece-related-project note-related-link"><span>{language === "es" ? related.typeEs : related.typeEn}</span><Link href={localizedHref(related.href, language)}>{language === "es" ? related.labelEs : related.labelEn} <ArrowIcon /></Link></aside></main><footer className="archive-footer"><FooterContact /></footer></>;
}
