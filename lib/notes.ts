import type { JournalImage } from "./journals";

export type NoteRecord = {
  slug: string; date: string; year: string;
  titleEs: string; titleEn: string; contextEs: string; contextEn: string;
  textEs: string[]; textEn: string[];
  quoteEs?: string; quoteEn?: string; quoteCreditEs?: string; quoteCreditEn?: string;
  images: JournalImage[]; coverIndex?: number; relatedProject?: string;
};

export const notes: NoteRecord[] = [
  {
    slug: "la-caida-de-un-arbol", date: "2026-09-05", year: "2026",
    titleEs: "La caída de un árbol", titleEn: "The fall of a tree",
    contextEs: "La forma del agua quieta · Lapislázuli, Madrid / Río Nora, Asturias",
    contextEn: "The Shape of Still Water · Lapislázuli, Madrid / Nora River, Asturias",
    textEs: [
      "La caída de un árbol reorganiza su entorno. Cambia la luz, los apoyos y el contacto con el suelo; abre recorridos, ofrece refugio y alimento. Lo que le pasa al árbol se extiende a otros cuerpos, tanto si sigue vivo como si comienza a descomponerse.",
      "En uno de los patios de Lapislázuli hay un ciprés caído que sigue vivo. Las piezas de la exposición La forma del agua quieta conviven con él y con los árboles que permanecen en pie a su alrededor. Me llama la atención cómo se integró todo. Algunas relaciones las leí durante el montaje y las hice evidentes al instalar las piezas; otras aparecieron después, como respondiendo a cuestiones que habían quedado abiertas en el taller.",
      "Cuando se trabaja de forma situada, hay algo de esa atención que se vuelve circular: recolecto los materiales, trabajo con ellos y vuelven al territorio en forma de piezas para vincularse y abrir otros diálogos.",
      "Parte de las piezas nace de mi interés por el inframundo etrusco y por lo que pasa bajo tierra, donde conviven los restos de lo que murió con las raíces de lo que sigue creciendo. Esa convivencia atraviesa La forma del agua quieta, junto con la atención a lo que parece detenido pero sigue transformándose. El agua que circula por las cerámicas participa de esos procesos. El encuentro con el ciprés me permitió reconocer en el entorno algo que venía trabajando desde ese imaginario: la caída, la permanencia y la vida no se suceden siempre en el orden que les damos.",
      "Hace poco, junto al río Nora en Asturias, estuve bastante rato observando cómo dos burras comían una rama caída. Se había caído la madrugada después del eclipse del 12 de agosto.",
      "Ver esa escena me hizo volver a pensar en el ciprés. En cómo una caída modifica mucho más que la posición de un árbol: lo que antes estaba en altura queda al alcance de otros cuerpos. Algo de esa reorganización que observo entre las piezas y los árboles aparecía también ahí, en las burras comiendo de la rama.",
    ],
    textEn: [
      "The fall of a tree reorganises its surroundings. It changes the light, points of support and contact with the ground; it opens paths and offers shelter and food. What happens to the tree extends to other bodies, whether it remains alive or begins to decompose.",
      "In one of Lapislázuli’s courtyards, a fallen cypress is still alive. The works in The Shape of Still Water coexist with it and with the trees still standing around it. I am struck by how everything became integrated. I read some of these relationships during installation and made them visible through the placement of the works; others appeared later, as if responding to questions left open in the studio.",
      "When working in a situated way, this form of attention becomes circular: I gather materials, work with them and return them to the territory as artworks, where they form connections and open other dialogues.",
      "Some of the works emerge from my interest in the Etruscan underworld and in what happens underground, where the remains of what has died coexist with the roots of what continues to grow. This coexistence runs through The Shape of Still Water, together with an attention to what seems motionless yet continues to transform. The water circulating through the ceramics takes part in these processes. Encountering the cypress allowed me to recognise in the surroundings something I had been exploring through this imaginary: falling, permanence and life do not always follow the order we assign them.",
      "Recently, beside the Nora River in Asturias, I spent a long time watching two donkeys eat a fallen branch. It had fallen in the early hours after the eclipse on 12 August.",
      "The scene made me think again about the cypress. A fall changes much more than the position of a tree: what was once high up becomes available to other bodies. Something of the reorganisation I observe between the works and the trees appeared there too, in the donkeys eating from the branch.",
    ],
    quoteEs: "Antes de su caída, un árbol es un ser vivo que cataliza y regula conversaciones dentro de su cuerpo y a su alrededor. La muerte termina con el manejo activo de esas conexiones. Las células de las raíces ya no mandan señales al ADN de las bacterias, las hojas terminan su cháchara química con los insectos, y los hongos no reciben más mensajes de su huésped. Pero en realidad el árbol nunca controló del todo estas conexiones; en vida el árbol solo era una parte de su red. La muerte descentra la vida del árbol, pero no acaba con ella.",
    quoteEn: "Before its fall, a tree is a living being that catalyses and regulates conversations within and around its body. Death ends the active management of those connections. Root cells no longer send signals to bacterial DNA, leaves end their chemical chatter with insects, and fungi receive no more messages from their host. But the tree never fully controlled these connections; in life it was only one part of its network. Death decentralises the tree’s life, but does not end it.",
    quoteCreditEs: "Las canciones de los árboles, «El fresno verde», p. 97.",
    quoteCreditEn: "The Songs of Trees, “The Green Ash”, p. 97.",
    images: [
      { src: "/images/notes/la-caida-de-un-arbol/n-01.jpg", alt: "Burra junto al río Nora, Asturias", width: 1536, height: 2048 },
      { src: "/images/notes/la-caida-de-un-arbol/n-02.jpg", alt: "Página de El fresno verde en Las canciones de los árboles", width: 768, height: 1024 },
      { src: "/images/notes/la-caida-de-un-arbol/n-03.jpg", alt: "Dos burras comiendo una rama caída junto al río Nora", width: 1536, height: 2048 },
      { src: "/images/notes/la-caida-de-un-arbol/n-04.jpg", alt: "Árboles y sendero junto al río Nora", width: 768, height: 1024 },
      { src: "/images/notes/la-caida-de-un-arbol/n-05.jpg", alt: "Pieza cerámica vinculada al tronco de un árbol en La forma del agua quieta", width: 1800, height: 2400 },
      { src: "/images/notes/la-caida-de-un-arbol/n-06.jpg", alt: "Patio y árboles de La forma del agua quieta en Lapislázuli", width: 2400, height: 1800 },
    ], coverIndex: 2, relatedProject: "la-forma-del-agua-quieta",
  },
  {
    slug: "pequenas-arqueologias-del-rio-nora", date: "2026-08-20", year: "2026",
    titleEs: "Pequeñas arqueologías del río Nora", titleEn: "Small archaeologies of the Nora River",
    contextEs: "Río Nora · Siero, Asturias", contextEn: "Nora River · Siero, Asturias",
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
    images: [
      { src: "/images/journal/diary/situated-research/situated-01-investigacion-18.webp", alt: "Primer registro de la investigación situada junto al río Nora", width: 2400, height: 1800 },
      { src: "/images/notes/pequenas-arqueologias-rio-nora/nora-01.jpg", alt: "Recolección de materiales atrapados en el cauce del río Nora", width: 2400, height: 1800 },
      { src: "/images/notes/pequenas-arqueologias-rio-nora/nora-02.jpg", alt: "Arcilla compactada dentro de una bolsa recuperada del río", width: 2400, height: 1800 },
      { src: "/images/notes/pequenas-arqueologias-rio-nora/nora-03.jpg", alt: "Pellas de arcilla negra decantadas por el río Nora", width: 2400, height: 1800 },
      { src: "/images/notes/pequenas-arqueologias-rio-nora/nora-04.jpg", alt: "Zapatilla encontrada entre los sedimentos del río", width: 2400, height: 1800 },
      { src: "/images/notes/pequenas-arqueologias-rio-nora/nora-05.jpg", alt: "Arcilla negra modelada durante la recolección", width: 2400, height: 1800 },
      { src: "/images/notes/pequenas-arqueologias-rio-nora/nora-06.jpg", alt: "Fragmentos cerámicos y materiales recuperados del paisaje", width: 2400, height: 1800 },
      { src: "/images/notes/pequenas-arqueologias-rio-nora/nora-07.jpg", alt: "Archivo de fragmentos encontrados junto al río Nora", width: 2400, height: 1800 },
      { src: "/images/notes/pequenas-arqueologias-rio-nora/nora-08.jpg", alt: "Brenda Ranieri junto a un tambor de lavadora recuperado del río", width: 2400, height: 1800 },
      { src: "/images/journal/diary/situated-research/situated-01-investigacion-22.webp", alt: "Materiales recolectados junto al río Nora", width: 2400, height: 1800 },
      { src: "/images/journal/diary/situated-research/situated-01-investigacion-23.webp", alt: "Pequeñas arqueologías dispuestas junto al río Nora", width: 2400, height: 1800 },
    ],
  },
];

export function getNote(slug: string) { return notes.find((note) => note.slug === slug); }

export function formatNoteDate(date: string, language: "es" | "en") {
  return new Intl.DateTimeFormat(language === "es" ? "es-ES" : "en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
