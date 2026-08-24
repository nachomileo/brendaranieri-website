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
  factLabels?: Partial<Record<"period" | "place" | "type" | "institution" | "curator" | "materials" | "techniques" | "dimensions", string>>;
  hiddenFacts?: readonly ("period" | "place" | "type" | "institution" | "curator" | "materials" | "techniques" | "dimensions")[];
};

type ProjectOverride = Partial<Omit<ProjectRecord, "slug" | "number">>;

const projectOverrides: Record<string, ProjectOverride> = {
  anarqueologias: {
    curator: "Gisela Novais",
    techniques: "Torno",
    dimensions: "Variables",
  },
  "carabanchel-disena": {
    titleEs: "Me tocó por dentro",
    titleEn: "It Touched Me Inside",
    introEs: "Esta instalación reúne una serie de vasijas conectadas por un sistema de agua que circula entre ellas y activa el hueco como espacio de resonancia.",
    bodyEs: "*Me tocó por dentro* reúne una serie de vasijas conectadas por un sistema de agua que circula entre ellas, donde el agua activa el hueco como espacio de resonancia. El título toma la expresión ruandesa *Yankoze Munda* —«me tocó por dentro»—, vinculada a un ritual femenino de acompañamiento y sanación comunitaria en el que el agua cae desde bolsas perforadas sobre la cabeza de quien atraviesa un proceso de transformación.\n\nLa obra retoma esta estructura simbólica: aquello que nos conmueve no permanece aislado, sino que circula y se transforma en comunidad. El gesto es mínimo, repetitivo y persistente. Cada vasija, realizada con técnicas mixtas y materiales recolectados como el metal, contiene y se deja afectar; el agua entra, insiste, gotea y produce una vibración casi imperceptible.",
    institution: "Madrid Design Festival",
    materials: "Cerámica y materiales del paisaje urbano",
    dimensions: "Variables",
    hiddenFacts: ["curator"],
    factLabels: { institution: "Festival" },
  },
  "cosas-que-cargan-cosas": {
    introEs: "Brenda Ranieri presentó *Lo atamos con alambre* y *Antes del rayo* en la exposición colectiva *Cosas que cargan cosas*.",
    factLabels: { institution: "Galería" },
  },
  "la-forma-del-agua-quieta": {
    introEs: "Fuentes cerámicas, agua y ruinas componen una hidrografía de ritmos lentos en los patios de la Galería Lapislázuli.",
    bodyEs: "*La forma del agua quieta* parte de la relación entre jardín, fuente y cerámica como dispositivos para contener y dar cuerpo a materias inestables. Vasijas realizadas con arcillas locales y rocas recolectadas en el territorio conforman una serie de instalaciones de agua que intervienen los patios de la galería.\n\nLa propuesta nace de una contradicción: aquello que percibimos como inmóvil está atravesado por procesos continuos de transformación. El agua nunca permanece quieta; sedimenta, evapora, erosiona y circula incluso cuando parece detenida. Frente a la imagen apaciguada del jardín ornamental, la exposición revela ritmos lentos y casi imperceptibles, compartidos por el agua y la práctica cerámica.\n\nLas ruinas y las piezas dialogan simbióticamente con los árboles de los patios: los contienen, bordean o señalan y, al mismo tiempo, construyen con ellos una relación estética. Arcilla, piedra, porcelana, metal y esmalte conservan las marcas del fuego y del territorio, mientras el agua reactiva las obras y las mantiene abiertas al tiempo.",
    techniques: "Torno, formulación de esmaltes, cocción de alta temperatura, ensamblaje e instalación hidráulica",
    hiddenFacts: ["curator"],
    factLabels: { institution: "Galería" },
  },
  "el-botijo-revisitado": {
    introEs: "Una investigación material en torno al botijo reúne tradición, reconstrucción y formas contemporáneas de inteligencia material.",
    materials: "Arcillas silvestres, metal y restos de esmalte",
    techniques: "Torno, engobe coloidal, incrustación de metales y reconstrucción de piezas",
    curator: "Guillermo García-Hoz",
    hiddenFacts: ["dimensions"],
  },
  "bioceramica-a-base-de-residuos-de-cafe": {
    titleEs: "Biocerámica",
    titleEn: "Bioceramics",
    bodyEs: "La investigación entendió el estudio como un espacio de observación donde la materia conserva y revela información. Al incorporar café a mezclas de distintos solidificantes con arcilla silvestre, el proyecto atendió a sus transformaciones durante el secado lento y a la co-creación con materiales vivos.\n\nLas piezas no están cocidas: son resultados sólidos de una investigación todavía abierta. La práctica desafía así lo perenne y ensaya un campo donde control e incertidumbre, materia geológica y residuo orgánico negocian una forma común.",
    materials: "Residuos de café, arcillas silvestres y materiales biodegradables",
    techniques: "Formulación de mezclas, investigación de biomateriales y modelado",
    hiddenFacts: ["curator"],
  },
  hangar: {
    place: "Marbella",
    curator: "Red House",
    techniques: "Torno",
    factLabels: { institution: "Galería" },
  },
  "viesca-de-reflexion": {
    techniques: "Pintura, teñido con tintes naturales y modelado cerámico",
    factLabels: { institution: "Galerías" },
  },
  "memorias-de-agua-y-barro": {
    introEs: "Un espacio de conversación y experimentación colectiva en torno al agua, la memoria territorial y la arcilla local.",
    techniques: "Coloquio, mediación y taller de experimentación cerámica",
    institution: "Fresca. La nave / Carabanchel Distrito Cultural",
    hiddenFacts: ["curator", "dimensions"],
    factLabels: { techniques: "Formato" },
  },
  "lo-velado": {
    introEs: "Una ensoñación es un susurro interno: una vibración sutil que une los cuerpos, los modela, los forja y los contiene.",
    bodyEs: "Una ensoñación es un susurro interno. Una vibración sutil que une los cuerpos, los modela, los forja y los contiene.\n\nTambién es un jardín latente, el murmullo del agua y de los seres que lo habitan. Muchos de estos jardines emanan de una ruina, constituyéndose en la mirada consciente y profunda, aquella que solo una ensoñación puede otorgar. De todo esto habla Brenda Ranieri en su diálogo íntimo con lo matérico, transitando el umbral donde lo tangible se disuelve y lo invisible se revela.\n\nTexto por Alejandra Díaz-Guerra.",
    type: "Festival / Open studio",
    materials: "Cerámica, esmaltes, metal, piedra e instalación hidráulica (fuente)",
    techniques: "Torno, cocción, ensamblaje e instalación",
    dimensions: "Variable",
  },
  "sin-embargo-se-mueve": {
    collaborators: "Chef Brian González y equipo gastronómico de Escala House",
    bodyEs: "Entre lo lunar y lo terrestre, *Sin embargo, se mueve* propuso un gesto de comunión entre materia, cuerpo y entorno. Inspirada en la frase atribuida a Galileo, la experiencia atendía a los procesos invisibles de transformación que sostienen todo lo vivo: aquello que parece quieto continúa moviéndose.\n\nEn colaboración con el chef Brian González, la mesa se convirtió en territorio y paisaje material. Piezas cerámicas, piedras, metales y fragmentos reales del taller convivieron con un menú vegetal cuyas formas confundían lo comestible con lo rocoso. La cerámica extendió así su investigación más allá del objeto, activándose mediante el tacto, la comida y la conversación colectiva.",
    hiddenFacts: ["institution", "curator", "dimensions"],
  },
  "ruta-off-cerartmic-escala-house": {
    type: "Programa OFF",
    institution: "CERARTMIC",
    hiddenFacts: ["curator"],
  },
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

export const projects: readonly ProjectRecord[] = [...generatedProjects, ...repositoryProjects].map((project) => ({
  ...project,
  ...projectOverrides[project.slug],
})) as ProjectRecord[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
