"use client";
import Image from "next/image";
import Link from "next/link";
import { artworkArchive, artworkCode, artworks } from "../../lib/artworks";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";
import { FooterContact } from "../components/footer-contact";
import { useSiteLanguage } from "../components/use-site-language";
import { localizedHref } from "../../lib/i18n";

export default function SelectedArtworksPage() {
  const [language, setLanguage] = useSiteLanguage();
  const piece = language === "es" ? "Pieza" : "Work";
  return <><header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header><main className="artworks-page">
    <div className="archive-heading"><h1>{language === "es" ? "Piezas" : "Selected Works"}</h1><span>{String(artworks.length).padStart(2, "0")} {language === "es" ? "piezas" : "works"}</span></div>
    <div className="all-artworks-grid">{artworkArchive.map((artwork) => <Link className={`archive-artwork archive-artwork-${artwork.slug}`} href={localizedHref(`/selected-artworks/${artwork.slug}`, language)} key={artwork.slug} aria-label={`${piece} ${artworkCode(artwork)}, ${artwork.year}`}>
      {artwork.images?.[0] ? <div className="archive-artwork-image"><Image src={artwork.images[0].src} alt={artwork.images[0].alt} fill sizes="(max-width: 760px) 50vw, 20vw" quality={88} /></div> : <div className={`placeholder archive-artwork-image ${artwork.className}`} role="img" aria-label={`${piece} ${artworkCode(artwork)}`} />}
      <div className="archive-artwork-meta"><span>{artworkCode(artwork)}</span><span aria-hidden="true" /><span>{artwork.year}</span></div></Link>)}</div>
  </main><footer className="archive-footer"><FooterContact /><div className="language-switch" aria-label="Language"><button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button></div></footer></>;
}
