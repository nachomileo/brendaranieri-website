import imageManifest from "../data/artwork-images.json";

export type ArtworkImage = { source: string; file: string; alt: string; width: number; height: number; src: string };
export type Artwork = {
  slug: string;
  title: string;
  year: string;
  material: string;
  dimensions: string;
  className: string;
  kind?: "single" | "family";
  edition?: string;
  images?: ArtworkImage[];
};

const images = imageManifest as Record<string, Omit<ArtworkImage, "src">[]>;
const withImages = (slug: string) => (images[slug] ?? []).map((image) => ({ ...image, src: `/images/artworks/${slug}/${image.file}` }));

export const artworks: Artwork[] = [
  { slug: "terra", title: "Terra", year: "2026", material: "Arcillas locales recolectadas, porcelana, metal, ladrillo machacado y piedras naturales", dimensions: "—", edition: "Pieza única", className: "object-1", kind: "single", images: withImages("terra") },
  { slug: "vasija", title: "Vasija", year: "—", material: "Arcillas locales, esmaltes de formulación propia, materiales del paisaje urbano y metal", dimensions: "—", edition: "Pieza única", className: "object-2", kind: "single", images: withImages("vasija") },
  { slug: "vasija-2", title: "Vasija 2", year: "2026", material: "Arcillas locales, piedras naturales, porcelana, esmaltes de formulación propia y materiales del paisaje urbano", dimensions: "—", edition: "Pieza única", className: "object-3", kind: "single", images: withImages("vasija-2") },
  { slug: "black-collection", title: "Black collection", year: "—", material: "Pasta refractaria y esmaltes de formulación propia", dimensions: "Dimensiones variables", edition: "Familia de piezas únicas", className: "object-4", kind: "family", images: withImages("black-collection") },
  { slug: "jarron", title: "Jarrón", year: "2026", material: "Porcelana y metal. Cocción a leña a 1300 °C", dimensions: "—", edition: "Pieza única", className: "object-5", kind: "single", images: withImages("jarron") },
  { slug: "jarron-2", title: "Jarrón", year: "2026", material: "Porcelana, arena y metal. Cocción a leña a 1300 °C", dimensions: "—", edition: "Pieza única", className: "object-6", kind: "single", images: withImages("jarron-2") },
  { slug: "materia-solidificandose", title: "Materia solidificándose, irme ablandándose", year: "2026", material: "Arcilla Carabanchel", dimensions: "Dimensiones variables", edition: "Familia de piezas únicas", className: "object-2", kind: "family", images: withImages("materia-solidificandose") },
  { slug: "vasija-3", title: "Vasija", year: "2026", material: "Pasta refractaria, metal y esmaltes de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-4", kind: "single", images: withImages("vasija-3") },
  { slug: "antes-del-rayo", title: "Antes del rayo", year: "2026", material: "Porcelana y metal", dimensions: "23 × 25 cm", edition: "Pieza única", className: "object-1", kind: "single", images: withImages("antes-del-rayo") },
  { slug: "vasija-ladrillo", title: "Vasija ladrillo", year: "2026", material: "Arcilla Carabanchel", dimensions: "—", edition: "Pieza única", className: "object-2", kind: "single", images: withImages("vasija-ladrillo") },
  { slug: "vasija-con-metal", title: "Vasija con metal", year: "2026", material: "Pasta refractaria, piedras naturales y metal", dimensions: "—", edition: "Pieza única", className: "object-3", kind: "single", images: withImages("vasija-con-metal") },
  { slug: "vasija-con-piedras", title: "Vasija con piedras", year: "2026", material: "Pasta refractaria, porcelana, metal y piedras de diseño propio", dimensions: "17 × 15 cm", edition: "Pieza única", className: "object-4", kind: "single", images: withImages("vasija-con-piedras") },
  { slug: "cuenco-con-metal", title: "Cuenco con metal", year: "2025", material: "Porcelana, esmalte y metal", dimensions: "—", edition: "Pieza única", className: "object-5", kind: "single", images: withImages("cuenco-con-metal") },
  { slug: "vasija-con-piedras-2", title: "Vasija con piedras II", year: "2026", material: "Pasta refractaria, porcelana y piedras de diseño propio", dimensions: "—", edition: "Pieza única", className: "object-6", kind: "single", images: withImages("vasija-con-piedras-2") },
  { slug: "vasija-arcilla-local", title: "Vasija de arcilla local", year: "2025–2026", material: "Arcillas locales diseñadas y esmalte de formulación propia con recursos locales", dimensions: "—", edition: "Pieza única", className: "object-1", kind: "single", images: withImages("vasija-arcilla-local") },
  { slug: "vasija-piedras-naturales", title: "Vasija con piedras naturales", year: "2025", material: "Arcilla local y piedras naturales", dimensions: "—", edition: "Pieza única", className: "object-2", kind: "single", images: withImages("vasija-piedras-naturales") },
  { slug: "vasija-arcilla-local-2", title: "Vasija de arcilla local II", year: "2025–2026", material: "Arcilla local y esmalte de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-3", kind: "single", images: withImages("vasija-arcilla-local-2") },
  { slug: "sin-titulo-i", title: "Sin título I", year: "2026", material: "Técnica mixta cerámica", dimensions: "—", edition: "Pieza única", className: "object-4", kind: "single", images: withImages("sin-titulo-i") },
  { slug: "vasija-negra", title: "Vasija negra", year: "2025", material: "Pasta refractaria y esmaltes de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-5", kind: "single", images: withImages("vasija-negra") },
  { slug: "piedras-de-diseno-propio", title: "Piedras de diseño propio", year: "2025–2026", material: "Pasta refractaria, porcelana, metal y piedras de diseño propio", dimensions: "Dimensiones variables", edition: "Familia de piezas únicas", className: "object-6", kind: "family", images: withImages("piedras-de-diseno-propio") },
  { slug: "juego-de-candelabros", title: "Juego de candelabros", year: "2025", material: "Pasta refractaria y esmaltes de formulación propia", dimensions: "Dimensiones variables", edition: "Familia de piezas únicas", className: "object-1", kind: "family", images: withImages("juego-de-candelabros") },
  { slug: "jarrita-y-cuncas", title: "Jarrita y cuncas", year: "2025", material: "Pasta refractaria y esmaltes de formulación propia", dimensions: "Dimensiones variables", edition: "Conjunto de piezas únicas", className: "object-2", kind: "family", images: withImages("jarrita-y-cuncas") },
  { slug: "vasija-con-asas-i", title: "Vasija con asas I", year: "2025–2026", material: "Pasta refractaria, metal y esmaltes de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-3", kind: "single", images: withImages("vasija-con-asas-i") },
  { slug: "vasija-con-asas-ii", title: "Vasija con asas II", year: "2025–2026", material: "Pasta refractaria, metal y esmaltes de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-4", kind: "single", images: withImages("vasija-con-asas-ii") },
  { slug: "vasija-i", title: "Vasija I", year: "2025–2026", material: "Pasta refractaria, porcelana, arcilla local, piedras naturales y metal", dimensions: "—", edition: "Pieza única", className: "object-5", kind: "single", images: withImages("vasija-i") },
  { slug: "vasija-ii", title: "Vasija II", year: "2025–2026", material: "Pasta refractaria, porcelana, arcilla local, piedras naturales y metal", dimensions: "—", edition: "Pieza única", className: "object-6", kind: "single", images: withImages("vasija-ii") },
  { slug: "vasija-iii", title: "Vasija III", year: "2025–2026", material: "Pasta refractaria, porcelana, arcilla local y piedras naturales", dimensions: "—", edition: "Pieza única", className: "object-1", kind: "single", images: withImages("vasija-iii") },
  { slug: "figura", title: "Figura", year: "2025", material: "Cerámica y esmaltes de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-2", kind: "single", images: withImages("figura") },
  { slug: "sin-titulo-ii", title: "Sin título II", year: "2025", material: "Técnica mixta", dimensions: "—", edition: "Pieza única", className: "object-3", kind: "single", images: withImages("sin-titulo-ii") },
  { slug: "memorias-de-agua-y-barro", title: "Memorias de agua y barro", year: "2025", material: "Arcilla local y esmalte de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-4", kind: "single", images: withImages("memorias-de-agua-y-barro") },
  { slug: "hypnos", title: "Hypnos", year: "2024", material: "Cerámica y esmalte", dimensions: "—", edition: "Pieza única", className: "object-5", kind: "single", images: withImages("hypnos") },
  { slug: "caldero", title: "Caldero", year: "2025", material: "Pasta refractaria y esmaltes de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-6", kind: "single", images: withImages("caldero") },
  { slug: "senora-de-hierro", title: "Señora de hierro", year: "2025", material: "Pasta refractaria, metal y esmaltes de formulación propia", dimensions: "—", edition: "Pieza única", className: "object-1", kind: "single", images: withImages("senora-de-hierro") },
  { slug: "el-viajero", title: "El viajero", year: "2024", material: "Cerámica esmaltada", dimensions: "—", edition: "Pieza única", className: "object-2", kind: "single", images: withImages("el-viajero") },
  { slug: "la-forma-del-agua-quieta-obra", title: "La forma del agua quieta", year: "2026", material: "Porcelana, pasta refractaria, arcillas locales, piedras naturales, esmalte y metal", dimensions: "Dimensiones variables", edition: "Instalación / familia de piezas", className: "object-3", kind: "family", images: withImages("la-forma-del-agua-quieta-obra") },
  { slug: "vasija-con-asas-iii", title: "Vasija con asas III", year: "2025", material: "Arcilla local y esmalte", dimensions: "—", edition: "Pieza única", className: "object-4", kind: "single", images: withImages("vasija-con-asas-iii") },
  { slug: "lo-velado-obra", title: "Lo velado", year: "2025", material: "Pasta refractaria, esmaltes de formulación propia y metal", dimensions: "Dimensiones variables", edition: "Pieza única", className: "object-5", kind: "single", images: withImages("lo-velado-obra") },
  { slug: "lo-atamos-con-alambre-obra", title: "Lo atamos con alambre", year: "2026", material: "Cerámica, corcho, plástico reciclado, agua y metal", dimensions: "70 cm de alto × 73 cm de diámetro", edition: "Pieza única", className: "object-6", kind: "single", images: withImages("lo-atamos-con-alambre-obra") },
  { slug: "fuente-agua-quieta", title: "La forma del agua quieta", year: "2026", material: "Arcilla local recolectada, piedras naturales y esmalte", dimensions: "71 cm de alto × 40 cm de diámetro", edition: "Pieza única", className: "object-1", kind: "single", images: withImages("fuente-agua-quieta") },
];

export function getArtwork(slug: string) {
  return artworks.find((artwork) => artwork.slug === slug);
}

export function artworkCode(artwork: Artwork) {
  return `A.${String(artworks.indexOf(artwork) + 1).padStart(2, "0")}`;
}

const archiveOrder = [
  1, 2, 35, 3, 4, 5, 6, 7, 8, 37, 9, 10, 11,
  12, 13, 14, 38, 15, 16, 17, 18, 19, 20, 39, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36,
];

export const artworkArchive = archiveOrder.map((number) => artworks[number - 1]);

export const homeArtworkSlugs = [
  "vasija-2",
  "materia-solidificandose",
  "antes-del-rayo",
  "vasija-ladrillo",
  "vasija-con-metal",
  "vasija-con-piedras",
];

export const homeArtworks = homeArtworkSlugs.flatMap((slug) => artworks.filter((artwork) => artwork.slug === slug));

const artworkProjectMap: Record<string, string> = {
  "materia-solidificandose": "el-botijo-revisitado",
  "vasija-3": "cosas-que-cargan-cosas",
  "antes-del-rayo": "cosas-que-cargan-cosas",
  "vasija-ladrillo": "oax-car-38-57",
  "vasija-con-metal": "oax-car-38-57",
  "vasija-con-piedras": "oax-car-38-57",
  "cuenco-con-metal": "oax-car-38-57",
  "vasija-con-piedras-2": "oax-car-38-57",
  "vasija-arcilla-local": "oax-car-38-57",
  "vasija-piedras-naturales": "oax-car-38-57",
  "vasija-arcilla-local-2": "oax-car-38-57",
  "sin-titulo-i": "oax-car-38-57",
  "vasija-negra": "anarqueologias",
  "piedras-de-diseno-propio": "anarqueologias",
  "juego-de-candelabros": "bioceramica-a-base-de-residuos-de-cafe",
  "jarrita-y-cuncas": "bioceramica-a-base-de-residuos-de-cafe",
  "vasija-con-asas-i": "bioceramica-a-base-de-residuos-de-cafe",
  "vasija-con-asas-ii": "bioceramica-a-base-de-residuos-de-cafe",
  "memorias-de-agua-y-barro": "memorias-de-agua-y-barro",
  "senora-de-hierro": "hangar",
  "la-forma-del-agua-quieta-obra": "la-forma-del-agua-quieta",
  "lo-velado-obra": "lo-velado",
  "lo-atamos-con-alambre-obra": "cosas-que-cargan-cosas",
  "fuente-agua-quieta": "la-forma-del-agua-quieta",
};

export function getArtworkProjectSlug(artwork: Artwork) {
  return artworkProjectMap[artwork.slug];
}
