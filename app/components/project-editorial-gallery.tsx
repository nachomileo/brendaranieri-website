import Image from "next/image";
import type { ProjectImage } from "../../lib/project-images";
import { ArtworkSlider } from "./artwork-slider";

type Props = {
  title: string;
  code: string;
  images: ProjectImage[];
  featuredIndex?: number;
  sliderGroups?: ProjectImage[][];
  text: string;
};

export function ProjectEditorialGallery({ title, code, images, featuredIndex = 0, sliderGroups = [], text }: Props) {
  const featured = images[featuredIndex] ?? images[0];
  const groupedSources = new Set(sliderGroups.flatMap((group) => group.map((image) => image.src)));
  const visible = images.filter((image) => image.src !== featured?.src && !groupedSources.has(image.src));

  if (!featured) return null;

  return <section className="project-editorial" aria-label={`Documentación de ${title}`}>
    <div className="project-editorial-feature">
      <figure><span>{code}.01</span><Image src={featured.src} alt={featured.alt} width={featured.width} height={featured.height} sizes="(max-width: 760px) 100vw, 68vw" quality={90} /></figure>
      <div><span>Documentación del proyecto</span><p>{text}</p></div>
    </div>
    <div className="project-editorial-grid">
      {visible.map((image, imageIndex) => <figure key={image.src}><span>{code}.{String(imageIndex + 2).padStart(2, "0")}</span><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 100vw, 48vw" quality={88} /></figure>)}
    </div>
    {sliderGroups.map((group, groupIndex) => group.length > 1 && <div className="project-related-slider" key={groupIndex}>
      <header><span>Serie {String(groupIndex + 1).padStart(2, "0")}</span><p>Vistas relacionadas · {group.length} imágenes</p></header>
      <ArtworkSlider images={group} code={`${code}.S${groupIndex + 1}`} />
    </div>)}
  </section>;
}
