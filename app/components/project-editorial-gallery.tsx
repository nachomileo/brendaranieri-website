import type { ProjectImage } from "../../lib/project-images";
import { ZoomableArtworkImage } from "./zoomable-artwork-image";
import { ArtworkSlider } from "./artwork-slider";

type Props = {
  title: string;
  code: string;
  images: ProjectImage[];
  featuredIndex?: number;
  text: string;
};

export function ProjectEditorialGallery({ title, code, images, featuredIndex = 0 }: Props) {
  const featured = images[featuredIndex] ?? images[0];
  if (!featured) return null;
  const ordered = [featured, ...images.filter((image) => image.src !== featured.src)];
  const excludedFiles: Record<string, string[]> = {
    // Requested editorial removals plus perceptually verified duplicates.
    "P.03": ["img-9969.webp", "01.webp", "04.webp", "05.webp"],
    "P.04": ["home-08.webp", "la-forma-del-agua-quieta-072026-brenda-ranieri-lapislazuli-28.webp", "la-forma-del-agua-quieta-brenda-ranieri-lapislazuli9.webp", "05.webp"],
    "P.06": ["cerartmic-brenda-ranieri-4.webp"],
    "P.08": ["01.webp"],
    "P.09": ["la-bocca-della-verita-escultura-ceramica-br-1.webp", "brenda-ranieri-certezas-expo-el-imparcial-6.webp"],
    "P.10": ["2025-10-04-artelier-21-gp23604.webp"],
    "P.12": ["05.webp"],
    "P.13": ["sin-embargo-se-mueve-cena-brenda-ranieri-escala-5.webp", "03.webp"],
    "P.14": ["br-tlpaed-52-scaled.webp"],
    "P.16": ["02.webp", "04.webp"],
  };
  const excluded = new Set(excludedFiles[code] ?? []);
  const visible = ordered.filter((image) => !excluded.has(image.src.split("/").at(-1) ?? ""));

  const sliderImages = visible.slice(0, Math.min(5, visible.length));
  const galleryImages = visible.slice(sliderImages.length);
  return <section className="project-editorial project-image-block" aria-label={`Archivo de ${title}`}>
    <header className="project-image-block-heading"><span>Archivo del proyecto</span><span>{String(visible.length).padStart(2, "0")} imágenes</span></header>
    <div className="project-archive-slider"><ArtworkSlider images={sliderImages} code={code} /></div>
    {galleryImages.length > 0 && <div className="project-editorial-grid is-dense">
      {galleryImages.map((image, imageIndex) => <figure key={image.src}><span>{code}.{String(sliderImages.length + imageIndex + 1).padStart(2, "0")}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 50vw, 33vw" /></figure>)}
    </div>}
  </section>;
}
