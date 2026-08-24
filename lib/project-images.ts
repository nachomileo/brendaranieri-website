import imageManifest from "../data/project-images.json";

type ManifestImage = { source: string; file: string; alt: string; home?: boolean; kind?: "archive"; width: number; height: number };
export type ProjectImage = ManifestImage & { src: string };

const manifest = imageManifest as Record<string, ManifestImage[]>;

export function getProjectImages(slug: string): ProjectImage[] {
  return (manifest[slug] ?? []).map((image) => ({
    ...image,
    src: `/images/projects/${slug}/${image.file}`,
  }));
}

export function getHomeProjectImages(slug: string) {
  return getProjectImages(slug).filter((image) => image.home);
}

export function getProjectCover(slug: string) {
  return getProjectImages(slug)[0];
}
