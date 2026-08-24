import imageManifest from "../data/project-images.json";

type ManifestImage = { source: string; file: string; alt: string; home?: boolean; kind?: "archive"; width: number; height: number };
export type ProjectImage = ManifestImage & { src: string };

const manifest = imageManifest as Record<string, ManifestImage[]>;

const homeSelections: Record<string, string[]> = {
  "cosas-que-cargan-cosas": ["lo-atamos-con-alambre-brenda-ranieri.webp", "cosas-que-cargan-cosas-brenda-ranieri-24.webp", "img-9946.webp", "img-9969.webp"],
  "el-botijo-revisitado": ["botijos-san-isidro-brenda-ranieri-2.webp", "botijos-san-isidro-brenda-ranieri-6.webp", "botijos-matadero-madrid-brenda-ranieri.webp"],
  "bioceramica-a-base-de-residuos-de-cafe": ["brenda2.webp", "brenda14.webp", "brenda1.webp", "bioceramica-cafe-brenda-ranieri-35.webp"],
};

const preferredCovers: Record<string, string> = {
  "todo-lo-profundo-ama-el-disfraz": "br-tlpaed-11-scaled.webp",
  "cosas-que-cargan-cosas": "lo-atamos-con-alambre-brenda-ranieri.webp",
  "el-botijo-revisitado": "botijos-matadero-madrid-brenda-ranieri.webp",
  "bioceramica-a-base-de-residuos-de-cafe": "brenda2.webp",
  hangar: "2025-10-04-artelier-21-gp23604.webp",
  "memorias-de-agua-y-barro": "memorias-de-agua-y-barro-open-galeria-5.webp",
};

export function getProjectImages(slug: string): ProjectImage[] {
  return (manifest[slug] ?? []).map((image) => ({
    ...image,
    src: `/images/projects/${slug}/${image.file}`,
  }));
}

export function getHomeProjectImages(slug: string) {
  const projectImages = getProjectImages(slug);
  const selection = homeSelections[slug];
  if (!selection) return projectImages.filter((image) => image.home);
  return selection.flatMap((filename) => projectImages.filter((image) => image.file === filename));
}

export function getProjectCover(slug: string) {
  const projectImages = getProjectImages(slug);
  return projectImages.find((image) => image.file === preferredCovers[slug]) ?? projectImages[0];
}
