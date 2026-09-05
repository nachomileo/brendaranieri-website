import type { Metadata } from "next";
import { JournalPage } from "../components/journal-page";
import { getNote } from "../../lib/notes";
import {
  situatedArtisticAfter,
  situatedArtisticDiary,
  situatedArtisticSequence,
  situatedLaboratoryDiary,
  situatedResearchDiary,
} from "../../lib/journal-media.generated";

import type { JournalImage } from "../../lib/journals";

const byFile = (images: JournalImage[], file: string) => images.find((item) => item.src.endsWith(file))!;
const laboratoryEditorial = [
  byFile(situatedLaboratoryDiary, "situated-02-laboratorio-12.webp"),
  byFile(situatedLaboratoryDiary, "situated-02-laboratorio-13.webp"),
  ...situatedLaboratoryDiary.filter((item) => !/situated-02-laboratorio-(12|13)\.webp$/.test(item.src)),
];
const artisticOutsideSlider = [
  byFile(situatedArtisticSequence, "situated-03-practica-09.webp"),
  byFile(situatedArtisticSequence, "situated-03-practica-16.webp"),
];
const artisticDrawings = situatedArtisticSequence.filter((item) => !/situated-03-practica-(09|16)\.webp$/.test(item.src));
const finalWorkImages: JournalImage[] = [
  byFile(situatedArtisticDiary, "situated-03-practica-01.webp"),
  { src: "/images/artworks/fuente-agua-quieta/la-forma-del-agua-quieta-072026-brenda-ranieri-lapislazuli-34.webp", alt: "Pieza final de La forma del agua quieta", width: 1800, height: 2400 },
  { src: "/images/projects/la-forma-del-agua-quieta/la-forma-del-agua-quieta-072026-brenda-ranieri-lapislazuli-40.webp", alt: "Instalación de La forma del agua quieta en Galería Lapislázuli", width: 2400, height: 1800 },
  { src: "/images/artworks/antes-del-rayo/cosas-que-cargan-cosas-brenda-ranieri-24.webp", alt: "Antes del rayo en la exposición Cosas que cargan cosas", width: 2400, height: 1800 },
  { src: "/images/projects/cosas-que-cargan-cosas/lo-atamos-con-alambre-brenda-ranieri.webp", alt: "Lo atamos con alambre en la exposición Cosas que cargan cosas", width: 1800, height: 2400 },
  { src: "/images/projects/ohm-2025-anarqueologias/open-studio-br-ohm-69.webp", alt: "Anarqueologías durante el Festival de Arquitectura Open House Madrid", width: 1800, height: 2400 },
  ...artisticOutsideSlider,
  ...situatedArtisticDiary.filter((item) => !item.src.endsWith("situated-03-practica-01.webp")),
];
const artisticTopImages: JournalImage[] = [
  ...finalWorkImages.slice(0, 3),
  { src: "/images/projects/oax-car-38-57/oax-car-38-57-open-studio-brenda-ranieri-26.webp", alt: "Vista de la instalación OAX–CAR–38–57 durante el open studio", width: 1800, height: 2400 },
  { src: "/images/projects/oax-car-38-57/oax-car-38-57-open-studio-brenda-ranieri-36.webp", alt: "Detalle de una pieza de OAX–CAR–38–57", width: 1800, height: 2400 },
];
const artisticFollowingImages = [...finalWorkImages.slice(3), ...situatedArtisticAfter];
const situatedCover: JournalImage = { src: "/images/journal/diary/situated-artistic/situated-03-practica-005.webp", alt: "Estudio de Brenda Ranieri y archivo de procesos", width: 2600, height: 1593 };
const noraNote = getNote("pequenas-arqueologias-del-rio-nora")!;
const noraImages = noraNote.images;
const noraImageSources = new Set([
  ...noraImages.map((image) => image.src),
  "/images/journal/diary/situated-research/situated-01-investigacion-19.webp",
  "/images/journal/diary/situated-research/situated-01-investigacion-20.webp",
  "/images/journal/diary/situated-research/situated-01-investigacion-21.webp",
]);
const noraEs = noraNote.textEs;
/*
  "Una tarde de verano salí a recorrer los bordes del río Nora, en Asturias, junto al terreno donde estará mi nuevo taller. Vi varias bolsas de plástico atrapadas entre las piedras y me metí al río para quitarlas. No había planeado recolectar nada, pero una cosa fue llevando a la otra.",
  "Algunas cosas estaban casi fosilizadas en las laderas; otras permanecían hundidas y relucían como si echaran chispas. Encontré un tambor de lavarropas con pies, restos de un triciclo, tejas antiguas, azulejos, ladrillos, caucho craquelado, cristales, metales, una zapatilla y ropa de obra.",
  "Debajo de unas rocas, un trozo de plástico dejaba pasar el agua y retenía las partículas más finas de la corriente. Al levantarlo apareció una pella de arcilla negra, decantada y amasada lentamente por el río. Cada material hacía aparecer al siguiente y empezó a formarse un paisaje de materiales conectados.",
  "Ahora todo viaja al taller de Madrid para hacer pruebas y conocer sus posibilidades cerámicas. Pienso en Jane Bennett y en la disposición necesaria para dejarse sorprender por lo que aparece. La pregunta ya no es solamente qué puedo hacer con estos materiales, sino qué estuvieron haciendo hasta ahora y qué podremos hacer juntos.",
]; */
const noraEn = noraNote.textEn;
/*
  "One summer afternoon I walked along the banks of the Nora River in Asturias, beside the land where my new studio will stand. I saw plastic bags trapped among the stones and stepped into the river to remove them. I had not planned to gather anything, but one thing led to another.",
  "Some things were almost fossilised into the banks; others remained submerged and gleamed as if they were sparking. I found a washing-machine drum with legs, parts of a tricycle, old roof tiles, ceramic tiles, bricks, cracked rubber, glass, metals, a shoe and work clothes.",
  "Beneath some rocks, a piece of plastic let water pass while retaining the finest particles in the current. When I lifted it, a lump of black clay appeared, settled and slowly kneaded by the river. Each material made the next one appear, and a landscape of connected materials began to form.",
  "Everything now travels to my Madrid studio to be tested and to discover its ceramic possibilities. I think of Jane Bennett and the disposition required to let oneself be surprised by what appears. The question is no longer only what I can do with these materials, but what they have been doing until now and what we might do together.",
]; */

export const metadata: Metadata = { title: "Procesos situados — Brenda Ranieri", description: "Recolección, laboratorio e investigación material de Brenda Ranieri.", alternates: { canonical: "/situated-processes" } };
const es = [
  { number: "01", title: "Investigación situada", meta: "Deriva · recolección · territorio", text: ["Mi proceso comienza fuera del taller, recorriendo paisajes urbanos, suburbanos y rurales. Observo el suelo, las obras, los cursos de agua y los márgenes para localizar arcillas, sedimentos, piedras, metales y restos constructivos. Me interesa aquello que suele pasar desapercibido, pero que conserva información sobre cómo un lugar se forma y se transforma.", "Recojo pequeñas cantidades y registro su procedencia, su contexto y sus cualidades visibles. Después clasifico cada muestra para construir una cartografía material que me permite leer el paisaje desde aquello que lo compone y mantener el vínculo entre la materia y su lugar de origen.", "Pienso en Jane Bennett y en la disposición necesaria para dejarse sorprender por lo que aparece. La pregunta ya no es solamente qué puedo hacer con estos materiales, sino qué estuvieron haciendo hasta ahora y qué podremos hacer juntos."], images: situatedResearchDiary.filter((item) => !noraImageSources.has(item.src)), editorialNotes: [{ title: "Pequeñas arqueologías del río Nora", meta: "Siero, Asturias · agosto de 2026", text: noraEs, images: noraImages, href: "/notes/pequenas-arqueologias-del-rio-nora" }] },
  { number: "02", title: "Laboratorio", meta: "Clasificación · pruebas · archivo", text: ["En el taller clasifico y proceso los materiales recolectados. Los pruebo solos y combinados, registro su comportamiento en cocciones de diferentes temperaturas y, a partir de esos resultados, diseño pastas cerámicas y formulo esmaltes propios.", "El archivo reúne tanto los resultados previstos como los accidentes y me ayuda a comprender colores, contracciones, texturas y reacciones. Lo técnico y lo intuitivo avanzan juntos hasta preparar la materia para su uso artístico."], images: laboratoryEditorial },
  { number: "03", title: "Práctica artística", meta: "Piezas · instalaciones", text: ["Con los materiales que recolecto, proceso y diseño creo piezas e instalaciones site-specific. Cada trabajo establece un diálogo con la arquitectura, la historia y las formas de habitar el espacio donde aparece.", "Me interesa acercarme a las memorias latentes del territorio y desplazar la mirada sobre los espacios cotidianos. Las piezas proponen situaciones de encuentro en las que el público, la materia y el entorno participan, y donde lo humano y lo más-que-humano pueden entenderse como agentes que configuran conjuntamente el paisaje."], images: [...artisticTopImages, ...artisticDrawings, ...artisticFollowingImages] },
];
const en = [
  { ...es[0], title: "Situated research", meta: "Drift · gathering · territory", text: ["My process begins outside the studio, moving through urban, suburban and rural landscapes. I observe the ground, construction sites, waterways and margins to locate clays, sediments, stones, metals and building remnants. I am interested in what often goes unnoticed but retains information about how a place is formed and transformed.", "I gather small quantities and record their origin, context and visible qualities. I then classify each sample to build a material cartography that allows me to read the landscape through what composes it and preserve the connection between matter and its place of origin.", "I think of Jane Bennett and the disposition required to let oneself be surprised by what appears. The question is no longer only what I can do with these materials, but what they have been doing until now and what we might do together."], editorialNotes: [{ title: "Small archaeologies of the Nora River", meta: "Siero, Asturias · August 2026", text: noraEn, images: noraImages, href: "/notes/pequenas-arqueologias-del-rio-nora" }] },
  { ...es[1], title: "Laboratory", meta: "Classification · testing · archive", text: ["In the studio I classify and process the materials I gather. I test them alone and in combination, record their behaviour through firings at different temperatures and use the results to design ceramic bodies and formulate my own glazes.", "The archive brings together both expected results and accidents, helping me understand colours, shrinkage, textures and reactions. Technical knowledge and intuition move forward together until the matter is ready for artistic use."] },
  { ...es[2], title: "Artistic practice", meta: "Works · installations · encounters", text: ["With the materials I gather, process and design, I create works and site-specific installations. Each work establishes a dialogue with the architecture, history and ways of inhabiting the space in which it appears.", "I seek to approach the latent memories of a territory and shift the way everyday spaces are perceived. The works propose situations of encounter in which the public, matter and surroundings all participate, and where human and more-than-human actors can be understood as jointly shaping the landscape."] },
];
export default function SituatedProcessesPage() { return <JournalPage content={{ es: { title: "Procesos situados", intro: ["Recolecto, clasifico, pruebo y archivo materiales del paisaje para incorporarlos al diseño de piezas e instalaciones. Este recorrido conecta el trabajo de campo, el laboratorio y la práctica artística."], archive: "Archivo de práctica", narratives: "Narrativas", sections: es, cover: situatedCover }, en: { title: "Situated processes", intro: ["I gather, classify, test and archive materials from the landscape to incorporate them into works and installations. This process connects fieldwork, laboratory research and artistic practice."], archive: "Practice archive", narratives: "Narratives", sections: en, cover: situatedCover } }} indexMode="projects" />; }
