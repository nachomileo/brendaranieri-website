import { projects as generatedProjects } from "./projects.generated";

export type ProjectRecord = {
  slug: string;
  category: string;
  titleEs: string;
  titleEn: string;
  period: string;
  year: number;
  status: string;
  type: string;
  place: string;
  exhibition: string;
  institution: string;
  curator: string;
  collaborators: string;
  introEs: string;
  introEn: string;
  bodyEs: string;
  bodyEn: string;
  materials: string;
  techniques: string;
  dimensions: string;
  imageCount: number;
  number: number;
};

const repositoryProjects: ProjectRecord[] = [{
  slug: "el-botijo-revisitado",
  category: "Group shows",
  titleEs: "Materia solidificándose, límite ablandándose",
  titleEn: "Matter Solidifying, Boundary Softening",
  period: "8–17 de mayo de 2026",
  year: 2026,
  status: "terminado",
  type: "group show / exposición cerámica",
  place: "Central de Diseño, Matadero Madrid",
  exhibition: "El botijo revisitado",
  institution: "Matadero Madrid / DiMaD",
  curator: "PENDIENTE",
  collaborators: "Escuela Municipal de Cerámica de la Moncloa",
  introEs: "Una reinterpretación contemporánea del botijo ensaya nuevas relaciones entre tradición, reconstrucción e inteligencia material.",
  introEn: "A contemporary reinterpretation of the botijo explores new relationships between tradition, reconstruction and material intelligence.",
  bodyEs: "Materia solidificándose, límite ablandándose formó parte de El botijo revisitado, una exposición celebrada en la Central de Diseño de Matadero Madrid dentro de la programación de San Isidro 2026. La muestra reunió reinterpretaciones contemporáneas de un objeto ligado al agua, la cultura popular madrileña y el encuentro social.\n\nLa pieza nace de un impulso de reconstrucción: reimaginar la tradición artesanal como un gesto abierto hacia el futuro. Está realizada con arcilla local de Carabanchel, metal y restos de esmalte, reuniendo recursos del territorio en una forma que permanece entre la reparación y la transformación.",
  bodyEn: "Matter Solidifying, Boundary Softening was presented in The Botijo Revisited at Central de Diseño, Matadero Madrid, as part of the San Isidro 2026 programme. The exhibition brought together contemporary reinterpretations of an object connected to water, Madrid’s popular culture and social gathering.\n\nThe work emerges from an impulse towards reconstruction, reimagining craft tradition as a gesture open to the future. Made from local Carabanchel clay, metal and glaze remnants, it brings territorial resources together in a form poised between repair and transformation.",
  materials: "arcilla local de Carabanchel, metal y restos de esmalte",
  techniques: "construcción cerámica, ensamblaje y cocción a 1070 °C",
  dimensions: "PENDIENTE",
  imageCount: 3,
  number: generatedProjects.length + 1,
}];

export const projects: readonly ProjectRecord[] = [...generatedProjects, ...repositoryProjects];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
