import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SharedPracticesPage from "../page";

const pages = {
  "agua-arcilla-y-registros": "Agua, arcilla y registros",
  "arcillas-silvestres-y-materiales-del-paisaje-urbano": "Arcillas silvestres y materiales del paisaje urbano",
} as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = pages[slug as keyof typeof pages];
  return title ? { title: `${title} — Brenda Ranieri`, alternates: { canonical: `/shared-practices/${slug}` } } : {};
}

export default async function SharedPracticeDetail({ params }: Props) {
  if (!((await params).slug in pages)) notFound();
  return <SharedPracticesPage />;
}
