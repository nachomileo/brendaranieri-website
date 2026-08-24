import Image from "next/image";
import Link from "next/link";
import { artworkArchive, artworkCode, artworks } from "../../lib/artworks";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";

export default function SelectedArtworksPage() {
  return (
    <>
      <header className="archive-header">
        <SiteSignature />
        <SiteNavigation />
      </header>
      <main className="artworks-page">
        <div className="archive-heading"><h1>Piezas</h1><span>{String(artworks.length).padStart(2, "0")} piezas</span></div>
        <div className="all-artworks-grid">
          {artworkArchive.map((artwork) => (
            <Link className="archive-artwork" href={`/selected-artworks/${artwork.slug}`} key={artwork.slug} aria-label={`Pieza ${artworkCode(artwork)}, ${artwork.year}`}>
              {artwork.images?.[0]
                ? <div className="archive-artwork-image"><Image src={artwork.images[0].src} alt={artwork.images[0].alt} fill sizes="(max-width: 760px) 50vw, 20vw" quality={88} /></div>
                : <div className={`placeholder archive-artwork-image ${artwork.className}`} role="img" aria-label={`${artwork.title}, imagen pendiente`} />}
              <div className="archive-artwork-meta"><span>{artworkCode(artwork)}</span><span aria-hidden="true" /><span>{artwork.year}</span></div>
            </Link>
          ))}
        </div>
      </main>
      <footer className="archive-footer"><span>Brenda Ranieri © 2026</span><span>ES / EN</span></footer>
    </>
  );
}
