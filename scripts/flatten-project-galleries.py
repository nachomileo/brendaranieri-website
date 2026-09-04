"""Turn every standard project gallery into one continuous image block."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
component = root / "app/components/project-editorial-gallery.tsx"
component.write_text('''import type { ProjectImage } from "../../lib/project-images";
import { ZoomableArtworkImage } from "./zoomable-artwork-image";

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

  return <section className="project-editorial project-image-block" aria-label={`Archivo de ${title}`}>
    <header className="project-image-block-heading"><span>Archivo del proyecto</span><span>{String(ordered.length).padStart(2, "0")} imágenes</span></header>
    <div className="project-editorial-grid is-dense">
      {ordered.map((image, imageIndex) => <figure key={image.src}><span>{code}.{String(imageIndex + 1).padStart(2, "0")}</span><ZoomableArtworkImage image={image} sizes="(max-width: 760px) 50vw, 33vw" /></figure>)}
    </div>
  </section>;
}
''')

with (root / "app/globals.css").open("a") as css:
    css.write('''

/* Project archive: one uninterrupted image composition. */
.project-image-block{padding-top:12px}
.project-image-block-heading{display:flex;justify-content:space-between;margin:0 0 12px;padding-top:10px;border-top:1px solid var(--line);font-size:10px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
.project-image-block .project-editorial-grid{
  display:block!important;
  columns:3;
  column-gap:6px;
}
.project-image-block .project-editorial-grid figure{
  display:inline-block;
  width:100%;
  margin:0 0 6px!important;
  break-inside:avoid;
}
.project-image-block .project-editorial-grid figure>span{margin-bottom:5px}
.project-image-block .project-editorial-grid img{display:block;width:100%;height:auto}
@media(max-width:760px){
  .project-image-block .project-editorial-grid{columns:2;column-gap:5px}
  .project-image-block .project-editorial-grid figure{margin-bottom:5px!important}
}
''')
print("Flattened standard project galleries")
