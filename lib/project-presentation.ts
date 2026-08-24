import type { ProjectRecord } from "./projects";

export type ProjectLanguage = "en" | "es";
export type ProjectCategory = "solo-shows" | "group-shows" | "biennial" | "cultural-festivals" | "collaborations" | "residencies";
export type EditorialProject = { title: string; lines: string[]; sortDate: number; category: ProjectCategory };

const entry = (category: ProjectCategory, sortDate: number, title: string, lines: string[]): EditorialProject => ({ category, sortDate, title, lines });

const editorialProjects: Record<string, Record<ProjectLanguage, EditorialProject>> = {
  "la-forma-del-agua-quieta": {
    en: entry("solo-shows", 202609, "La forma del agua quieta", ["Solo show", "Lapislázuli Gallery, Madrid", "Jun–Sept 2026"]),
    es: entry("solo-shows", 202609, "La forma del agua quieta", ["Solo show", "Galería Lapislázuli, Madrid", "Jun–sept 2026"]),
  },
  "oax-car-38-57": {
    en: entry("biennial", 202600, "OAX-CAR-38-57", ["Ibero-American Design Biennial 2026 (BID26 / DiMaD)", "Ibero-America and Carabanchel: Dialogues Through Design 2026", "2025–2026"]),
    es: entry("biennial", 202600, "OAX-CAR-38-57", ["Bienal Iberoamericana de Diseño 2026 (BID26 / DiMaD)", "Iberoamérica y Carabanchel: diálogos desde el diseño 2026", "2025–2026"]),
  },
  "cosas-que-cargan-cosas": {
    en: entry("group-shows", 202605, "Lo atamos con alambre y un rayo", ["Group show “Cosas que cargan cosas”", "Ventana Project / Doble Erre galleries, Madrid", "25 Apr–30 May 2026"]),
    es: entry("group-shows", 202605, "Lo atamos con alambre y un rayo", ["Group show “Cosas que cargan cosas”", "Galerías Ventana Project / Doble Erre, Madrid", "25 abr–30 may 2026"]),
  },
  "el-botijo-revisitado": {
    en: entry("group-shows", 202605, "Matter Solidifying, Boundary Softening", ["Group show “The Botijo Revisited”", "Central de Diseño, Matadero Madrid", "8–17 May 2026"]),
    es: entry("group-shows", 202605, "Materia solidificándose, límite ablandándose", ["Group show “El botijo revisitado”", "Central de Diseño, Matadero Madrid", "8–17 may 2026"]),
  },
  hangar: {
    en: entry("group-shows", 202512, "Señoras de hierro", ["Group show “Hangar”", "Artelier 21, Marbella", "4 Oct–4 Dec 2025"]),
    es: entry("group-shows", 202512, "Señoras de hierro", ["Group show “Hangar”", "Artelier 21, Marbella", "4 oct–4 dic 2025"]),
  },
  "bioceramica-a-base-de-residuos-de-cafe": {
    en: entry("residencies", 202612, "Coffee-waste bioceramics", ["Research residency", "Escala House, Madrid", "Nov–Dec 2026"]),
    es: entry("residencies", 202612, "Biocerámica a base de residuos de café", ["Residencia de investigación", "Escala House, Madrid", "Nov–dic 2026"]),
  },
  "ruta-off-cerartmic-escala-house": {
    en: entry("collaborations", 202606, "CerARTmic — Ruta Off", ["Escala House, Madrid", "May–Jun 2026"]),
    es: entry("collaborations", 202606, "CerARTmic — Ruta Off", ["Escala House, Madrid", "May–jun 2026"]),
  },
  "carabanchel-disena": {
    en: entry("cultural-festivals", 202603, "Madrid Design Festival 2026", ["Carabanchel Diseña", "C. Hermanos del Moral 34", "Mar 2026"]),
    es: entry("cultural-festivals", 202603, "Madrid Design Festival 2026", ["Carabanchel Diseña", "C. Hermanos del Moral 34", "Mar 2026"]),
  },
  anarqueologias: {
    en: entry("collaborations", 202603, "Anarqueologías", ["El Imparcial", "C. Duque de Alba 4", "Nov 2025–Mar 2026"]),
    es: entry("collaborations", 202603, "Anarqueologías", ["El Imparcial", "C. Duque de Alba 4", "Nov 2025–mar 2026"]),
  },
  "sin-embargo-se-mueve": {
    en: entry("collaborations", 202612, "Y sin embargo, se mueve", ["Immersive dinner", "Escala House, Madrid", "Dec 2026"]),
    es: entry("collaborations", 202612, "Y sin embargo, se mueve", ["Cena inmersiva", "Escala House, Madrid", "Dic 2026"]),
  },
  "memorias-de-agua-y-barro": {
    en: entry("cultural-festivals", 202510, "Memorias de agua y barro", ["Cruza Carabanchel Cultural Festival", "Fresca. La Nave, Madrid", "Oct 2025"]),
    es: entry("cultural-festivals", 202510, "Memorias de agua y barro", ["Festival Cultural Cruza Carabanchel", "Fresca. La Nave, Madrid", "Oct 2025"]),
  },
  "ohm-2025-anarqueologias": {
    en: entry("cultural-festivals", 202509, "Anarqueologías", ["Open House Madrid Architecture Festival", "Fresca. La Nave, Madrid", "Sept 2025"]),
    es: entry("cultural-festivals", 202509, "Anarqueologías", ["Festival de Arquitectura Open House Madrid", "Fresca. La Nave, Madrid", "Sept 2025"]),
  },
  certezas: {
    en: entry("collaborations", 202503, "Certezas", ["El Imparcial", "C. Duque de Alba 4", "Jan 2024–Mar 2025"]),
    es: entry("collaborations", 202503, "Certezas", ["El Imparcial", "C. Duque de Alba 4", "Ene 2024–mar 2025"]),
  },
  "lo-velado": {
    en: entry("cultural-festivals", 202503, "Lo velado", ["Madrid Design Festival 2025 | Off programme", "Fresca. La Nave, Madrid", "Feb–Mar 2025"]),
    es: entry("cultural-festivals", 202503, "Lo velado", ["Madrid Design Festival 2025 | Programa OFF", "Fresca. La Nave, Madrid", "Feb–mar 2025"]),
  },
  "viesca-de-reflexion": {
    en: entry("group-shows", 202310, "Una viesca de reflexión", ["Group show", "Galería Cerúleo · Beech forest, Tierra del Agua (Caleao), Asturias", "22–23 Jul 2023", "Group show", "Galería Solaina, Galicia", "Sept–Oct 2023"]),
    es: entry("group-shows", 202310, "Una viesca de reflexión", ["Group show", "Galería Cerúleo · Bosque de hayas, Tierra del Agua (Caleao), Asturias", "22 y 23 jul 2023", "Group show", "Galería Solaina, Galicia", "Sept–oct 2023"]),
  },
  "todo-lo-profundo-ama-el-disfraz": {
    en: entry("solo-shows", 202304, "Todo lo profundo ama el disfraz", ["Solo show", "Le Batiment, Madrid", "Apr 2023"]),
    es: entry("solo-shows", 202304, "Todo lo profundo ama el disfraz", ["Solo show", "Le Batiment, Madrid", "Abr 2023"]),
  },
};

export function projectPresentation(project: ProjectRecord, language: ProjectLanguage): EditorialProject {
  return editorialProjects[project.slug]?.[language] ?? entry("collaborations", project.year * 100, language === "es" ? project.titleEs : project.titleEn, [project.category, project.place, project.period]);
}

export function projectSortDate(project: ProjectRecord) {
  return editorialProjects[project.slug]?.en.sortDate ?? project.year * 100;
}

export const projectCategories: ProjectCategory[] = ["solo-shows", "group-shows", "biennial", "cultural-festivals", "collaborations", "residencies"];
