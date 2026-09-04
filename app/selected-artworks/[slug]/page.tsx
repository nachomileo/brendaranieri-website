import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworkCode, artworks, getArtwork, getArtworkProjectSlug } from "../../../lib/artworks";
import { getProject } from "../../../lib/projects";
import { SiteSignature } from "../../components/site-signature";
import { SiteNavigation } from "../../components/site-navigation";
import { ZoomableArtworkImage } from "../../components/zoomable-artwork-image";
import { FooterContact } from "../../components/footer-contact";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }> };

export function generateStaticParams() {
  return artworks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artwork = getArtwork((await params).slug);
  const code = artwork ? artworkCode(artwork) : "";
  if (!artwork) return {};
  const title = `${artwork.title} (${code}) | Brenda Ranieri`;
  const description = `${artwork.title}, ${artwork.year}. ${artwork.material}. Obra de la artista visual y ceramista Brenda Ranieri.`;
  const url = `/selected-artworks/${artwork.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", title, description, url, images: artwork.images?.[0] ? [{ url: artwork.images[0].src, alt: artwork.images[0].alt }] : undefined },
    twitter: { card: "summary_large_image", title, description, images: artwork.images?.[0] ? [artwork.images[0].src] : undefined },
  };
}

export default async function ArtworkPage({ params, searchParams }: Props) {
  const language = (await searchParams).lang === "en" ? "en" : "es";
  const artwork = getArtwork((await params).slug);
  if (!artwork) notFound();
  const index = artworks.findIndex(({ slug }) => slug === artwork.slug);
  const previous = artworks[(index - 1 + artworks.length) % artworks.length];
  const next = artworks[(index + 1) % artworks.length];
  const code = artworkCode(artwork);
  const images = artwork.images ?? [];
  const projectSlug = getArtworkProjectSlug(artwork);
  const relatedProject = projectSlug ? getProject(projectSlug) : undefined;

  return (
    <>
      <header className="archive-header artwork-detail-header">
        <SiteSignature />
        <SiteNavigation language={language} />
      </header>
      <main className={`artwork-detail piece-page piece-${artwork.slug}`}>
        <section className="piece-showcase piece-showcase-static" aria-labelledby="artwork-title">
          {images[0] ? <figure className="piece-opening-image"><ZoomableArtworkImage image={images[0]} sizes="(max-width: 760px) 100vw, 58vw" /></figure> : <div className={`placeholder piece-slider-fallback ${artwork.className}`} role="img" aria-label={`${code}, imagen pendiente`} />}
          <section className="piece-information" aria-label={`Ficha técnica de ${code}`}>
            <div className="piece-facts"><p>{language === "es" ? "Ficha técnica" : "Technical details"}</p><h1 id="artwork-title">{code}</h1><dl><div><dt>{language === "es" ? "Año" : "Year"}</dt><dd>{artwork.year}</dd></div><div><dt>{language === "es" ? "Materiales" : "Materials"}</dt><dd>{artwork.material}</dd></div><div><dt>{language === "es" ? "Dimensiones" : "Dimensions"}</dt><dd>{artwork.dimensions}</dd></div>{(artwork.edition || artwork.kind === "family") && <div><dt>{language === "es" ? "Tipo" : "Type"}</dt><dd>{artwork.kind === "family" ? (language === "es" ? "Familia de piezas únicas" : "Family of unique pieces") : artwork.edition}</dd></div>}</dl></div>
          </section>
        </section>
        {images.length > 1 && <section className={`piece-gallery ${artwork.kind === "family" ? "is-family" : ""} ${images.length > 4 ? "is-dense" : ""}`} aria-label={`Más imágenes de ${code}`}>
          {images.slice(1).map((image, imageIndex) => <figure key={image.src}><span>{code}.{imageIndex + 2}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 45vw" /></figure>)}
        </section>}
        {relatedProject && projectSlug && <aside className="piece-related-project"><span>{language === "es" ? "Proyecto relacionado" : "Related project"}</span><Link href={`/projects/${projectSlug}?lang=${language}`}>{language === "es" ? relatedProject.titleEs : relatedProject.titleEn} ↗</Link></aside>}
        <nav className="artwork-pagination" aria-label="Pieza anterior y siguiente"><Link href={`/selected-artworks/${previous.slug}`}>← {artworkCode(previous)}</Link><Link href="/selected-artworks">Todas las piezas</Link><Link href={`/selected-artworks/${next.slug}`}>{artworkCode(next)} →</Link></nav>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "VisualArtwork", name: artwork.title, identifier: code, dateCreated: artwork.year, artMedium: artwork.material, size: artwork.dimensions, creator: { "@type": "Person", name: "Brenda Ranieri", url: "https://brendaranieri.art" }, image: images.map((image) => new URL(image.src, "https://brendaranieri.art").toString()), url: `https://brendaranieri.art/selected-artworks/${artwork.slug}` }).replaceAll("<", "\\u003c") }} />
      <footer className="archive-footer"><FooterContact /><div className="language-switch"><Link className={language === "en" ? "active" : ""} href="?lang=en">EN</Link><span>/</span><Link className={language === "es" ? "active" : ""} href="?lang=es">ES</Link></div></footer>
    </>
  );
}
