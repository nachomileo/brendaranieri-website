import type { ProjectRecord } from "../../lib/projects";
import { ZoomableArtworkImage } from "./zoomable-artwork-image";

type OaxImage = { src: string; alt: string };

function GalleryImage({ image }: { image: OaxImage }) {
  return <ZoomableArtworkImage image={image} sizes="(max-width: 760px) 100vw, 72vw" />;
}

function InformationIndex({ label, items }: { label: string; items: Array<[string, string]> }) {
  return <dl className="oax-compact-facts" aria-label={label}>{items.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl>;
}

function selectFeature(images: OaxImage[], filename: string) {
  return images.find((image) => decodeURIComponent(image.src).endsWith(`/${filename}`)) ?? images[0];
}

function CompactGallery({ images, featureName, label }: { images: OaxImage[]; featureName: string; label: string }) {
  const featured = selectFeature(images, featureName);
  const secondary = images.filter((image) => image.src !== featured?.src);
  return <>
    {featured && <figure className="oax-project-feature"><GalleryImage image={featured} /></figure>}
    <div className="oax-masonry-grid" aria-label={label}>{secondary.map((image) => <figure key={image.src}><GalleryImage image={image} /></figure>)}</div>
  </>;
}

export function OaxProjectBlocks({ project, images, rayograms, fieldArchive, language = "es" }: { project: ProjectRecord; images: OaxImage[]; rayograms: OaxImage[]; fieldArchive: OaxImage[]; language?: "es" | "en" }) {
  const isEs = language === "es";
  const paragraphs = (isEs ? project.bodyEs : project.bodyEn).split(/\n\s*\n/).filter(Boolean).map((paragraph) => paragraph.replaceAll("*", ""));
  const featuredProjectImage = images[0];

  return <div className="oax-block-system">
    <nav className="oax-block-index" aria-label="Índice del proyecto OAX-CAR-38-57">
      <a href="#oax-project"><span>01</span><strong>{isEs ? "El proyecto" : "The project"}</strong><small>Open Studio · {isEs ? "marzo" : "March"} 2026</small></a>
      <a href="#oax-situated-archive"><span>02</span><strong>{isEs ? "Archivo de investigación material de Carabanchel" : "Carabanchel material research archive"}</strong><small>{isEs ? "Registros del proceso en 35 mm" : "35 mm process records"}</small></a>
      <a href="#oax-rayograms"><span>03</span><strong>{isEs ? "Archivo rayogramas de agua" : "Water rayogram archive"}</strong><small>{isEs ? "Procesos de co-creación" : "Co-creation processes"}</small></a>
    </nav>

    <section className="oax-compact-block" id="oax-project" aria-labelledby="oax-project-title">
      {featuredProjectImage && <figure className="oax-project-feature is-opening-feature"><GalleryImage image={featuredProjectImage} /></figure>}
      <header className="is-title-only"><span>01</span><h2 id="oax-project-title">{isEs ? "El proyecto" : "The project"}</h2></header>
      <InformationIndex label="Índice de información del proyecto" items={[
        ["Período", project.period], ["Territorios", project.place], ["Marco institucional", "BID26 / DiMaD / Central de Diseño, Matadero Madrid"], ["Comisariado por", "Manoj Sawlani"], ["Materiales", "Arcilla silvestre de Carabanchel, cerámica, esmaltes de ceniza de magnolio y ficus, metal, madera, residuos de estudios participantes, fotografía analógica y materiales del paisaje urbano"],
      ]} />
      <div className="oax-masonry-grid is-opening">{images.slice(1, 6).map((image) => <figure key={image.src}><GalleryImage image={image} /></figure>)}</div>
      <article className="oax-inline-copy"><span>{isEs ? "Contexto y proceso" : "Context and process"}</span><div>{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article>
      <div className="oax-masonry-grid" aria-label="Galería del Open Studio de marzo de 2026">{images.slice(6).map((image) => <figure key={image.src}><GalleryImage image={image} /></figure>)}</div>
    </section>

    <section className="oax-compact-block" id="oax-situated-archive" aria-labelledby="oax-archive-title">
      <header><span>02</span><h2 id="oax-archive-title">{isEs ? "Archivo de investigación material de Carabanchel" : "Carabanchel material research archive"}</h2><div><p>{isEs ? "Fotografías analógicas de 35 mm tomadas durante el desarrollo del proyecto. El archivo reúne escenas de producción en el taller, pruebas sistemáticas con materiales recolectados del paisaje urbano, visitas a los talleres del barrio para recuperar materia y registros de la preparación de la cocción a leña de algunas de las piezas." : "35 mm analogue photographs taken during the development of the project. The archive brings together studio production, systematic tests with materials gathered from the urban landscape, visits to neighbourhood workshops to recover matter, and records of preparations for the wood firing of several pieces."}</p></div></header>
      <InformationIndex label="Índice del archivo de investigación situada" items={[
        ["Soporte", "Fotografía analógica de 35 mm"], ["Contexto", "Taller y paisaje urbano de Carabanchel"], ["Procesos", "Recolección, pruebas de materiales y producción"], ["Cocción", "Preparación y cocción a leña"],
      ]} />
      <CompactGallery images={fieldArchive} featureName="28472-1-scan-14.webp" label="Registros analógicos del proceso" />
    </section>

    <section className="oax-compact-block" id="oax-rayograms" aria-labelledby="oax-ray-title">
      <header><span>03</span><h2 id="oax-ray-title">{isEs ? "Archivo rayogramas de agua" : "Water rayogram archive"}</h2><div><p>{isEs ? "El agua resultante de la decantación de arcilla de Carabanchel, recolectada en un espacio en obra, se trasladó al laboratorio para producir fotografías sin cámara junto a la artista Ana Paes. Las imágenes fueron montadas sobre papel con la ayuda de la grabadora Paula Cid Cerezo y su tórculo." : "Water from the settling of Carabanchel clay, gathered at a construction site, was taken to the laboratory to produce cameraless photographs with artist Ana Paes. The images were mounted on paper with printmaker Paula Cid Cerezo and her etching press."}</p></div></header>
      <InformationIndex label="Índice del archivo de rayogramas" items={[
        ["Técnica", "Fotografía sin cámara"], ["Materiales", "Agua de arcilla decantada, papel fotosensible, material de revelado fotográfico y papel de grabado"], ["En colaboración con", "Ana Paes / artista"], ["Montaje", "Paula Cid Cerezo / grabadora"],
      ]} />
      <CompactGallery images={rayograms} featureName="28472-2-scan-35.webp" label="Procesos de co-creación y rayogramas de agua" />
    </section>
  </div>;
}
