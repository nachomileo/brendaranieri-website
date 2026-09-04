import type { Metadata } from "next";
import { JournalPage } from "../components/journal-page";
import {
  sharedWorkshopDiary,
  rayogramAnaV2,
  rayogramResultsV2,
  rayogramPaulaV2,
  rayogramWorkshopV2,
  rayogramEditionV2,
  rayogramClayV2,
} from "../../lib/journal-media.generated";

const sharedCover = { src: "/images/journal/shared/shared-portada.webp", alt: "Práctica colectiva en Fresca. La Nave", width: 1950, height: 2600 };

export const metadata: Metadata = { title: "Prácticas colectivas — Brenda Ranieri", description: "Talleres, colaboraciones e investigación colectiva de Brenda Ranieri.", alternates: { canonical: "/shared-practices" } };
const es = [
  { number: "01", title: "Arcillas silvestres y materiales del paisaje urbano", meta: "Junto a Luka Andeyro · Fresca. La Nave", text: ["Este taller nació del encuentro entre la investigación situada y geológica de Luka Andeyro y mi investigación material sobre el paisaje urbano de Carabanchel. Cruzamos ambas miradas para caminar, recolectar y reconocer las posibilidades cerámicas de los materiales encontrados cerca de nosotras.", "La mesa compartida se convirtió en un mapa temporal: tierras, fragmentos y muestras pasaron de mano en mano. Más que transmitir un método cerrado, quise abrir mi proceso y dejar que las preguntas de cada participante modificaran el curso de la investigación."], images: sharedWorkshopDiary },
  { number: "02", title: "Agua, arcilla y registros", meta: "Junto a Ana Paes y Paula Cid Cerezo · 2025—2026", text: [
    "En octubre de 2025 participé en *Lo que el agua nos dice*, una deriva alrededor del río Manzanares de Madrid organizada por Ana Paes y Deneb. Me sumé con la intuición de encontrar nuevas pistas para mi investigación sobre el agua, la presencia de arcilla en el territorio y los materiales que componen el paisaje urbano.",
    "Encontré algunas. Y, en el camino, encontré también a Ana y su práctica de fotografía sin cámara: los rayogramas.",
    "Después de aquella deriva quedamos varias veces en mi taller. Poco a poco fuimos descubriendo afinidades, cruces entre nuestras prácticas, formas de acercarnos a las cosas y posibles líneas de colaboración. Yo estaba entonces desarrollando *OAX–CAR–38–57*, un proyecto que presentaría en marzo de 2026, durante un *open studio* organizado en el marco de la Bienal Iberoamericana de Diseño. Una nueva etapa de mi investigación cartográfica entre agua, territorio y materiales.",
    "La práctica de Ana nos permitió registrar algo que hasta entonces se escapaba: la huella que dibuja el agua mientras trabajo. Vino al taller, pusimos en común investigaciones y materialidades y nos dedicamos a probar. A perseguir los gestos que el agua repite mientras tamizo, desplazo y filtro la arcilla que había recogido, una semana antes, en un espacio en obras de Carabanchel.",
    "Para presentar las fotografías resultantes en el *open studio*, mi amiga y grabadora Paula Cid Cerezo me ayudó a montarlas en su flamante tórculo. Aquel día Paula posó junto a su tórculo del siglo XIX y su planera.",
    "Tiempo después, Ana y yo organizamos en mi taller, Fresca. La Nave, un taller abierto para recolectar materiales del paisaje urbano y producir rayogramas en seco y en húmedo, sumergidos en el agua de la arcilla decantada. Paula también vino. La red se cruza, crece.",
    "Los hallazgos de aquel taller —no solo los visuales— fueron tantos que el grupo decidió reunirse de nuevo para autoeditar una publicación sobre lo investigado en el parque de la Cuña Verde, territorio de la deriva y de la recolección. Pasamos el letargo del verano de 2026 juntas.",
    "En paralelo, apareció la posibilidad de presentar el libro en CRUZA Carabanchel, en septiembre de 2026. Un contexto próximo a los lugares y materiales que habían activado el proceso.",
    "La publicación no funciona aquí como conclusión, sino como una nueva disposición de sus elementos: agua, arcilla, papel, emulsión, herramientas, espacios y personas. La colaboración tampoco responde a un recorrido completamente previsto. Se produce por contacto, acumulación y desvío. La materia introduce nuevas posibilidades y modifica el curso del trabajo; la cuestión es si existe la disposición necesaria para dejarse sorprender por lo que aparece."
  ], images: rayogramResultsV2, wideText: true, sequences: [
    { label: "Rayogramas con Ana Paes · OAX–CAR–38–57", layout: "grid" as const, images: rayogramAnaV2 },
    { label: "Agua de arcilla de Carabanchel", layout: "grid" as const, images: rayogramClayV2 },
    { label: "Colaboración con Paula Cid Cerezo", layout: "grid" as const, images: rayogramPaulaV2 },
    { label: "Taller de rayogramas · Fresca. La Nave", layout: "grid" as const, images: rayogramWorkshopV2 },
    { label: "Ese instante de luz · Autoedición", layout: "grid" as const, images: rayogramEditionV2 }
  ] },
];
const en = [
  { ...es[0], title: "Wild clays and materials from the urban landscape", meta: "With Luka Andeyro · Fresca. La Nave", text: ["This workshop emerged from the meeting between Luka Andeyro’s situated and geological research and my material investigation of Carabanchel’s urban landscape. We brought both perspectives together to walk, gather and recognise the ceramic possibilities of materials found nearby.", "The shared table became a temporary map: soils, fragments and samples moved from hand to hand. More than transmitting a closed method, I wanted to open my process and allow each participant’s questions to change the course of the research."] },
  { ...es[1], title: "Water, clay and records", meta: "With Ana Paes and Paula Cid Cerezo · 2025—2026", text: [
    "In October 2025 I took part in *What the Water Tells Us*, a drift along Madrid’s Manzanares River organised by Ana Paes and Deneb. I joined with the intuition that I might find new clues for my research into water, the presence of clay in the territory and the materials that compose the urban landscape.",
    "I found some. And along the way I also encountered Ana and her camera-less photographic practice: rayograms.",
    "After that drift we met several times in my studio. Gradually we discovered affinities, intersections between our practices, ways of approaching things and possible lines of collaboration. At the time I was developing *OAX–CAR–38–57*, a project I would present in March 2026 during an *open studio* organised within the Ibero-American Design Biennial: a new stage in my cartographic research into water, territory and materials.",
    "Ana’s practice allowed us to register something that had previously escaped us: the trace drawn by water as I work. She came to the studio, we brought our research and materials together and began testing, pursuing the gestures water repeats while I sift, move and filter clay gathered a week earlier from a construction site in Carabanchel.",
    "To present the resulting photographs at the *open studio*, my friend and printmaker Paula Cid Cerezo helped me mount them using her newly acquired press. That day Paula posed beside her nineteenth-century press and flat-file cabinet.",
    "Later, Ana and I organised an open workshop at my studio, Fresca. La Nave, to gather materials from the urban landscape and make dry and wet rayograms submerged in water from settled clay. Paula came too. The network intersects and grows.",
    "The discoveries from that workshop—not only the visual ones—were so numerous that the group decided to meet again and self-publish a book about the research carried out in Cuña Verde park, the territory of the drift and gathering. We spent the torpor of summer 2026 together.",
    "At the same time, the opportunity arose to present the book at CRUZA Carabanchel in September 2026, a context close to the places and materials that had activated the process.",
    "The publication does not operate as a conclusion, but as a new arrangement of its elements: water, clay, paper, emulsion, tools, spaces and people. Nor does the collaboration follow a fully predetermined route. It emerges through contact, accumulation and diversion. Matter introduces new possibilities and modifies the course of the work; the question is whether we are disposed to be surprised by what appears."
  ], sequences: [
    { label: "Rayograms with Ana Paes · OAX–CAR–38–57", layout: "grid" as const, images: rayogramAnaV2 },
    { label: "Water from Carabanchel clay", layout: "grid" as const, images: rayogramClayV2 },
    { label: "Collaboration with Paula Cid Cerezo", layout: "grid" as const, images: rayogramPaulaV2 },
    { label: "Rayogram workshop · Fresca. La Nave", layout: "grid" as const, images: rayogramWorkshopV2 },
    { label: "That Instant of Light · Self-publishing", layout: "grid" as const, images: rayogramEditionV2 }
  ] },
];
es.reverse();
en.reverse();
export default function SharedPracticesPage() { return <JournalPage content={{ es: { title: "Prácticas colectivas", intro: ["Fresca. La Nave es mi taller y también funciona como un espacio de creación contemporánea en Carabanchel. Surge de un proyecto que fundé y dirijo desde 2021, donde se acompañan prácticas artísticas y se activa una comunidad a través de la formación, la investigación, la producción y el encuentro alrededor de la materia, la imagen, la música y el territorio.", "Impulso propuestas de co-creación sobre temas que me interesan e invito a otrxs artistas a abrir sus procesos a la experimentación colectiva a través de talleres, seminarios y encuentros. Esto hace que, orgánicamente, mi práctica artística y mi labor como gestora cultural formen un recorrido circular: cada colaboración nutre nuevas redes, abre preguntas y posibilidades compartidas."], archive: "Archivo de co-creación", narratives: "Relatos", sections: es, cover: sharedCover, website: { label: "Visitar Fresca. La nave", href: "https://www.fresco.art/" } }, en: { title: "Collective practices", intro: ["Fresca. La Nave is my studio and also operates as a contemporary creation space in Carabanchel. It grew from a project I founded and have directed since 2021, supporting artistic practices and activating a community through learning, research, production and encounters around matter, image, music and territory.", "I initiate co-creation projects around subjects that interest me and invite other artists to open their processes to collective experimentation through workshops, seminars and gatherings. This allows my artistic practice and cultural work to form an organic, circular path: each collaboration nourishes new networks and opens up shared questions and possibilities."], archive: "Co-creation archive", narratives: "Stories", sections: en, cover: sharedCover, website: { label: "Visit Fresca. La nave", href: "https://www.fresco.art/" } } }} indexMode="projects" pageClassName="collective-journal" />; }
