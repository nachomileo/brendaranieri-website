import imageManifest from "../data/project-images.json";

type ManifestImage = { source: string; file: string; alt: string; home?: boolean; kind?: "archive"; width: number; height: number };
export type ProjectImage = ManifestImage & { src: string };

const manifest = imageManifest as Record<string, ManifestImage[]>;

// Preserve source files while excluding confirmed visual duplicates from the
// public galleries. Keeping this explicit also preserves editorial ordering.
const duplicateExclusions: Record<string, Set<string>> = {
  "ruta-off-cerartmic-escala-house": new Set(["cerartmic-brenda-ranieri-4.webp"]),
};

const homeSelections: Record<string, string[]> = {
  "cosas-que-cargan-cosas": ["05.webp", "cosas-que-cargan-cosas-brenda-ranieri-24.webp", "01.webp", "04.webp"],
  "el-botijo-revisitado": ["02.webp", "04.webp", "botijos-matadero-madrid-brenda-ranieri-2.webp"],
  "bioceramica-a-base-de-residuos-de-cafe": ["brenda13.webp"],
};

const preferredCovers: Record<string, string> = {
  "todo-lo-profundo-ama-el-disfraz": "06.webp",
  "cosas-que-cargan-cosas": "04.webp",
  "el-botijo-revisitado": "botijos-matadero-madrid-brenda-ranieri-2.webp",
  "bioceramica-a-base-de-residuos-de-cafe": "brenda13.webp",
  hangar: "06.webp",
  "memorias-de-agua-y-barro": "05.webp",
  "ohm-2025-anarqueologias": "open-studio-br-ohm-69.webp",
  "sin-embargo-se-mueve": "03.webp",
  certezas: "brenda-ranieri-certezas-expo-el-imparcial39.webp",
};

export function getProjectImages(slug: string): ProjectImage[] {
  return (manifest[slug] ?? []).filter((image) => !duplicateExclusions[slug]?.has(image.file)).map((image) => ({
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
