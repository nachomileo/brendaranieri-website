import Image from "next/image";
import type { JournalImage } from "../../lib/journals";

export function JournalPage({ title, intro, images }: { title: string; intro: string[]; images: JournalImage[] }) {
  return (
    <main className="journal-page gallery-journal-page">
      <header className="gallery-journal-heading">
        <p>Archivo de práctica</p>
        <div className="gallery-journal-heading-content">
          <h1>{title}</h1>
          <div className="gallery-journal-intro">{intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
        </div>
      </header>
      <section className="practice-gallery" aria-label={`Galería de ${title}`}>
        {images.map((image, index) => <figure key={image.src}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 100vw, 72vw" quality={92} priority={index === 0} /></figure>)}
      </section>
    </main>
  );
}
