import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNote, notes } from "../../../lib/notes";
import { NoteArticle } from "../../components/note-article";
import { SiteNavigation } from "../../components/site-navigation";
import { SiteSignature } from "../../components/site-signature";
import { FooterContact } from "../../components/footer-contact";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> };
export function generateStaticParams() { return notes.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const note = getNote((await params).slug); return note ? { title: `${note.titleEs} — Brenda Ranieri`, description: note.textEs[0], alternates: { canonical: `/notes/${note.slug}` } } : {}; }

export default async function NotePage({ params, searchParams }: Props) {
  const note = getNote((await params).slug); if (!note) notFound();
  const language = (await searchParams).lang === "en" ? "en" : "es";
  return <><header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header><main className="note-page"><p className="note-kicker">{language === "es" ? "Nota de investigación" : "Research note"}</p><NoteArticle note={note} language={language} /></main><footer className="archive-footer"><FooterContact /></footer></>;
}
