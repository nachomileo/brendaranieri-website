import type { JournalImage } from "./journals";

export type NoteRecord = {
  slug: string;
  date: string;
  year: string;
  titleEs: string;
  titleEn: string;
  contextEs: string;
  contextEn: string;
  textEs: string[];
  textEn: string[];
  images: JournalImage[];
  relatedProject?: string;
};

export const notes: NoteRecord[] = [
  {
    slug: "el-agua-nunca-permanece-quieta",
    date: "2026-07-01",
    year: "2026",
    titleEs: "El agua nunca permanece quieta",
    titleEn: "Water never remains still",
    contextEs: "La forma del agua quieta · Madrid",
    contextEn: "The Shape of Still Water · Madrid",
    textEs: [
      "La forma del agua quieta parte de la relación entre jardín, fuente y cerámica como dispositivos para contener y dar cuerpo a materias inestables. Vasijas realizadas con arcillas locales y rocas recolectadas en el territorio conforman una serie de instalaciones de agua que intervienen los patios de la galería.",
      "La propuesta nace de una contradicción: aquello que percibimos como inmóvil está atravesado por procesos continuos de transformación. El agua nunca permanece quieta; sedimenta, evapora, erosiona y circula incluso cuando parece detenida. Frente a la imagen apaciguada del jardín ornamental, la exposición revela ritmos lentos y casi imperceptibles, compartidos por el agua y la práctica cerámica.",
      "Las ruinas y las piezas dialogan simbióticamente con los árboles de los patios: los contienen, bordean o señalan y, al mismo tiempo, construyen con ellos una relación estética. Arcilla, piedra, porcelana, metal y esmalte conservan las marcas del fuego y del territorio, mientras el agua reactiva las obras y las mantiene abiertas al tiempo.",
    ],
    textEn: [
      "The Shape of Still Water begins with the relationship between garden, fountain and ceramics as devices for containing and giving form to unstable matter. Vessels made from local clays and stones gathered in the territory form a series of water installations across the gallery courtyards.",
      "The proposal emerges from a contradiction: what we perceive as still is traversed by continuous processes of transformation. Water never remains still; it sediments, evaporates, erodes and circulates even when it appears motionless. Against the pacified image of the ornamental garden, the exhibition reveals slow, nearly imperceptible rhythms shared by water and ceramic practice.",
      "The ruins and pieces enter into a symbiotic dialogue with the courtyard trees: they contain, border or point to them while building an aesthetic relationship with them. Clay, stone, porcelain, metal and glaze retain the marks of fire and territory, while water reactivates the works and keeps them open to time.",
    ],
    images: [
      { src: "/images/projects/la-forma-del-agua-quieta/la-forma-del-agua-quieta-072026-brenda-ranieri-lapislazuli-5.webp", alt: "Agua, cerámica y jardín en La forma del agua quieta", width: 2400, height: 1800 },
      { src: "/images/projects/la-forma-del-agua-quieta/la-forma-del-agua-quieta-072026-brenda-ranieri-lapislazuli-8.webp", alt: "Detalle de una fuente cerámica activada por el agua", width: 2400, height: 1800 },
      { src: "/images/projects/la-forma-del-agua-quieta/la-forma-del-agua-quieta-072026-brenda-ranieri-lapislazuli-40.webp", alt: "Instalación de La forma del agua quieta en Galería Lapislázuli", width: 2400, height: 1800 },
    ],
    relatedProject: "la-forma-del-agua-quieta",
  },
  {
    slug: "pequenas-arqueologias-del-rio-nora",
    date: "2026-08-20",
    year: "2026",
    titleEs: "Pequeñas arqueologías del río Nora",
    titleEn: "Small archaeologies of the Nora River",
    contextEs: "Río Nora · Siero, Asturias",
    contextEn: "Nora River · Siero, Asturias",
    textEs: [
      "Una tarde de verano salí a recorrer los bordes del río Nora, en Asturias, junto al terreno donde estará mi nuevo taller. Vi varias bolsas de plástico atrapadas entre las piedras y me metí al río para quitarlas. Quería limpiar un poco ese tramo. No había planeado recolectar nada, pero una cosa fue llevando a la otra.",
      "Algunas cosas estaban casi fosilizadas en las laderas del río, asomando; otras permanecían hundidas y relucían como si echaran chispas. Encontré un tambor de lavarropas con pies, restos de un triciclo, tejas antiguas, azulejos, ladrillos, caucho craquelado, cristales, metales, una zapatilla y ropa de obra. El tambor me gustó especialmente: alguien ya lo había rescatado, le había puesto patas y, después de darle otra vida, volvió a descartarlo.",
      "También encontré una bolsa de obra teñida por los pigmentos del río y una antigua bolsa de alimento para perros llena de arcilla compactada por acción del agua y el tiempo. Debajo de unas rocas había un trozo de plástico atascado que dejaba pasar el agua y retenía las partículas más finas de la corriente. Cuando lo levanté apareció una pella de arcilla negra, decantada y amasada lentamente por el río. Vaya a saber desde dónde venía y cuánto tiempo llevaba formándose allí.",
      "Me entretuve recolectando, ordenando y fotografiando estas pequeñas arqueologías. Cada material hacía aparecer al siguiente y empezó a formarse un paisaje de materiales conectados. Ahora todo viaja al taller de Madrid para hacer pruebas y conocer sus posibilidades cerámicas, mientras el nuevo taller de Asturias empieza a tomar forma.",
      "Pienso en Jane Bennett y en la disposición necesaria para dejarse sorprender por lo que aparece. La pregunta ya no es solamente qué puedo hacer con estos materiales, sino qué estuvieron haciendo hasta ahora y qué podremos hacer juntos.",
    ],
    textEn: [
      "One summer afternoon I walked along the banks of the Nora River in Asturias, beside the land where my new small studio will stand. I saw several plastic bags trapped among the stones and stepped into the river to remove them. I wanted to clean that stretch a little. I had not planned to gather anything, but one thing led to another.",
      "Some things were almost fossilised into the riverbanks; others lay submerged, gleaming as if they were sparking. I found a washing-machine drum with legs, parts of a tricycle, old roof tiles, ceramic tiles, bricks, cracked rubber, glass, metals, a shoe and work clothes. I especially liked the drum: someone had already rescued it, given it legs and, after giving it another life, discarded it again.",
      "I also found a construction sack stained by river pigments and an old dog-food bag filled with clay compacted by water and time. Beneath some rocks, a trapped piece of plastic let water pass while retaining the finest particles carried by the current. When I lifted it, a lump of black clay appeared, settled and slowly kneaded by the river. Who knows where it came from or how long it had been forming there.",
      "I spent time gathering, arranging and photographing these small archaeologies. Each material made the next one appear, and a landscape of connected materials began to form. Everything now travels to my Madrid studio to be tested and to discover its ceramic possibilities, while the new Asturias studio begins to take shape.",
      "I think of Jane Bennett and the disposition required to let oneself be surprised by what appears. The question is no longer only what I can do with these materials, but what they have been doing until now and what we might do together.",
    ],
    images: [18, 19, 20, 21, 22, 23].map((number) => ({
      src: `/images/journal/diary/situated-research/situated-01-investigacion-${number}.webp`,
      alt: `Investigación situada y recolección de materiales en el río Nora, registro ${number - 17}`,
      width: 2400,
      height: 1800,
    })),
  },
];

export function getNote(slug: string) {
  return notes.find((note) => note.slug === slug);
}
