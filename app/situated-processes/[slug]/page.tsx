import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SituatedProcessesPage from "../page";

const pages = {
  "investigacion-situada": "Investigación situada",
  laboratorio: "Laboratorio",
  "practica-artistica": "Práctica artística",
} as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = pages[slug as keyof typeof pages];
  return title ? { title: `${title} — Brenda Ranieri`, alternates: { canonical: `/situated-processes/${slug}` } } : {};
}

export default async function SituatedProcessDetail({ params }: Props) {
  if (!((await params).slug in pages)) notFound();
  return <SituatedProcessesPage />;
}
