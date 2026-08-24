import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artworkCode, artworks, getArtwork, getArtworkProjectSlug } from "../../../lib/artworks";
import { getProject } from "../../../lib/projects";
import { SiteSignature } from "../../components/site-signature";
import { SiteNavigation } from "../../components/site-navigation";
import { ArtworkSlider } from "../../components/artwork-slider";
import { ZoomableArtworkImage } from "../../components/zoomable-artwork-image";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return artworks.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artwork = getArtwork((await params).slug);
  const code = artwork ? artworkCode(artwork) : "";
  return artwork ? { title: `${code} — Brenda Ranieri`, description: `${code}, ${artwork.year}. ${artwork.material}.` } : {};
}

export default async function ArtworkPage({ params }: Props) {
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
        <SiteNavigation />
      </header>
      <main className="artwork-detail piece-page">
        <section className="piece-showcase" aria-labelledby="artwork-title">
          <div className="piece-showcase-heading"><p>{artwork.kind === "family" ? "Familia" : "Pieza"}</p><h1 id="artwork-title">{code}</h1></div>
          {images.length ? <ArtworkSlider images={images} code={code} /> : <div className={`placeholder piece-slider-fallback ${artwork.className}`} role="img" aria-label={`${code}, imagen pendiente`} />}
        </section>
        <section className="piece-information" aria-label={`Ficha técnica de ${code}`}>
          <div className="piece-facts"><p>Ficha técnica</p><h2>{code}</h2><dl><div><dt>Año</dt><dd>{artwork.year}</dd></div><div><dt>Materiales</dt><dd>{artwork.material}</dd></div><div><dt>Dimensiones</dt><dd>{artwork.dimensions}</dd></div>{artwork.edition && <div><dt>Tipo</dt><dd>{artwork.edition}</dd></div>}</dl></div>
          {images[1] && <figure className="piece-information-image"><ZoomableArtworkImage image={images[1]} sizes="(max-width: 760px) 100vw, 58vw" /></figure>}
        </section>
        {images.length > 2 && <section className={`piece-gallery ${artwork.kind === "family" ? "is-family" : ""}`} aria-label={`Más imágenes de ${code}`}>
          {images.slice(2).map((image, imageIndex) => <figure key={image.src}><span>{code}.{imageIndex + 3}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 45vw" /></figure>)}
        </section>}
        {relatedProject && projectSlug && <aside className="piece-related-project"><span>Proyecto relacionado</span><Link href={`/projects/${projectSlug}`}>{relatedProject.titleEs} ↗</Link></aside>}
        <nav className="artwork-pagination" aria-label="Pieza anterior y siguiente"><Link href={`/selected-artworks/${previous.slug}`}>← {artworkCode(previous)}</Link><Link href="/selected-artworks">Todas las piezas</Link><Link href={`/selected-artworks/${next.slug}`}>{artworkCode(next)} →</Link></nav>
      </main>
      <footer className="archive-footer"><span>Brenda Ranieri © 2026</span><span>ES / EN</span></footer>
    </>
  );
}
