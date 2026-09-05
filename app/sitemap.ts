import type { MetadataRoute } from "next";
import { artworks } from "../lib/artworks";
import { projects } from "../lib/projects";

const origin = "https://brendaranieri.art";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/projects", "/selected-artworks", "/situated-processes", "/shared-practices", "/cookies"];
  return [
    ...staticRoutes.map((path, index) => ({ url: `${origin}${path}`, changeFrequency: "monthly" as const, priority: index === 0 ? 1 : .8 })),
    ...projects.map((project) => ({ url: `${origin}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: .7 })),
    ...artworks.map((artwork) => ({ url: `${origin}/selected-artworks/${artwork.slug}`, changeFrequency: "monthly" as const, priority: .6 })),
  ];
}
