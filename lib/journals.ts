export type JournalImage = { src: string; alt: string; width: number; height: number };
export type JournalEntry = {
  number: string;
  title: string;
  meta: string;
  text: string[];
  images: JournalImage[];
};

const image = (section: string, file: string, alt: string, width: number, height: number): JournalImage => ({
  src: `/images/journal/${section}/${file}`,
  alt,
  width,
  height,
});

export const situatedEntries: JournalEntry[] = [
  {
    number: "01",
    title: "Recolectar no es extraer",
    meta: "Trabajo de campo · Burela, Galicia · 2026",
    text: [
      "El trabajo de taller empieza fuera del taller. Caminar, observar y tomar pequeñas muestras permite leer cada territorio a través de su materia: su color, su humedad, su granulometría y las transformaciones que ya contiene.",
      "Cada recolección se registra con su lugar y contexto. Después, el material se seca, limpia, tritura y tamiza. La procedencia no desaparece durante este proceso: permanece como parte activa de cada formulación.",
    ],
    images: [
      image("situated", "material-cantera-caolin-burela-brenda-ranieri-2026-14.webp", "Recolección de caolín en una cantera de Burela", 2400, 1800),
      image("situated", "material-cantera-caolin-burela-brenda-ranieri-2026-38.webp", "Detalle del material mineral recolectado en Burela", 2400, 1800),
      image("situated", "material-cantera-caolin-burela-brenda-ranieri-2026-47.webp", "Registro de trabajo de campo con caolín local", 2400, 1800),
    ],
  },
  {
    number: "02",
    title: "El paisaje como archivo",
    meta: "Cartografía material · Paisaje sub-urbano · 2025—2026",
    text: [
      "Arcillas, sedimentos, ladrillos, piedras y restos urbanos forman una cartografía material. No son recursos neutros: hablan de los suelos, de las infraestructuras y de las formas en que habitamos y transformamos un lugar.",
      "El archivo reúne muestras, fotografías, notas y coordenadas. Su función no es cerrar una clasificación, sino hacer visibles relaciones entre territorio, memoria y materia para que puedan reaparecer en nuevas piezas.",
    ],
    images: [
      image("situated", "materiales-paisaje-sub-urbano-brenda-ranieri-2026-36.webp", "Recolección de materiales junto a un curso de agua", 2400, 1800),
      image("situated", "materiales-paisaje-sub-urbano-brenda-ranieri-2026-75-2.webp", "Muestras de materiales del paisaje sub-urbano", 2400, 1800),
      image("situated", "cartografia-material-brenda-ranieri-14.webp", "Cartografía material y archivo de muestras", 2400, 1800),
    ],
  },
  {
    number: "03",
    title: "Formular una materia",
    meta: "Taller · Pastas, esmaltes y cocciones · En curso",
    text: [
      "Formular una pasta o un esmalte es un proceso iterativo. Las proporciones, las temperaturas y la respuesta del material quedan anotadas junto a cada prueba. Una variación mínima puede modificar la superficie, el color, la contracción o la manera en que el agua recorre una pieza.",
      "El error también produce conocimiento. Las grietas, sedimentaciones y reacciones inesperadas se conservan como información y, a veces, abren una dirección que no estaba prevista.",
    ],
    images: [
      image("situated", "esmaltes-brenda-ranieri-2026-52.webp", "Pruebas de esmaltes de formulación propia", 2400, 1800),
      image("situated", "lo-que-queda-brenda-ranieri-mesa-41.webp", "Muestrario de pastas y superficies cerámicas", 2400, 1800),
      image("situated", "lo-que-queda-brenda-ranieri-mesa-43.webp", "Mesa de trabajo con pruebas materiales", 2400, 1800),
    ],
  },
  {
    number: "04",
    title: "El taller como sistema de relaciones",
    meta: "Archivo de proceso · Madrid · En curso",
    text: [
      "Dibujos, muestras, herramientas y fragmentos conviven en el taller como un sistema abierto. Cada proyecto deja rastros que pueden cruzarse con otro: una prueba de arcilla se convierte en estructura, una piedra activa una superficie y el agua deja de ser tema para funcionar como material.",
      "Este diario registra esos desplazamientos. No documenta una receta cerrada, sino decisiones, tiempos y relaciones que sostienen la práctica.",
    ],
    images: [
      image("situated", "brenda-ranieri-estudio-ii.webp", "Vista del estudio de Brenda Ranieri", 2400, 1936),
      image("situated", "oax-car-38-57-brenda-ranieri-131.webp", "Mesa y pared de investigación del proyecto OAX-CAR-38-57", 2400, 1800),
      image("situated", "oax-car-38-57-brenda-ranieri-136.webp", "Pruebas cerámicas y anotaciones en el taller", 2400, 1800),
    ],
  },
];

export const sharedEntries: JournalEntry[] = [
  {
    number: "01",
    title: "Arcillas silvestres y materiales del paisaje urbano",
    meta: "Taller junto a Luka Andeya · Madrid",
    text: [
      "Abrir el proceso significa compartir una forma de mirar antes que una receta. En este taller, el recorrido por el territorio, la recolección y la preparación de muestras se convirtieron en herramientas comunes para reconocer la materia que ya existe alrededor.",
      "El trabajo colectivo permitió comparar gestos, preguntas y saberes táctiles. Cada participante construyó su propia relación con los materiales, mientras la mesa funcionaba como un archivo vivo de diferencias y hallazgos.",
    ],
    images: [
      image("shared", "6a913430-9c9e-4364-8fe1-af81fa73ad44-1-105-c.webp", "Participantes trabajando con arcillas silvestres en una mesa común", 768, 1024),
      image("shared", "6f0ddf34-e306-4cd3-bef0-7fbc0095812e-1-105-c.webp", "Manos preparando muestras de materiales del paisaje urbano", 768, 1024),
      image("shared", "ee3c29c7-314b-4bfd-b6b4-ca7ace5771f5-1-105-c.webp", "Recorrido colectivo para recolectar materiales", 768, 1024),
    ],
  },
  {
    number: "02",
    title: "Rayogramas para OAX-CAR-38-57",
    meta: "Colaboración con Ana Paes y Paula Cid Cerezo · 2026",
    text: [
      "OAX-CAR-38-57 se construye desde el diálogo entre territorios y disciplinas. Junto a Ana Paes y Paula Cid Cerezo, la investigación material se trasladó al laboratorio fotográfico para producir rayogramas: imágenes sin cámara creadas por contacto directo sobre papel fotosensible.",
      "Objetos, sedimentos, agua, luz y tiempo participaron de la imagen. La autoría se volvió una negociación entre materiales y personas; el resultado no ilustra el proceso, sino que conserva la huella física de ese encuentro.",
    ],
    images: [
      image("shared", "53146900-8fee-4914-825d-ce38f2fbf64c-1-105-c.webp", "Proceso colectivo de rayogramas para OAX-CAR-38-57", 768, 1024),
      image("shared", "7beb5cdf-e8c8-41f2-9fbc-a77c98b532b9-1-105-c.webp", "Materiales dispuestos sobre papel fotosensible", 1088, 721),
      image("shared", "fa22df58-3a82-4963-bc04-af507207fd52-1-105-c.webp", "Revelado de un rayograma en el laboratorio", 768, 1024),
    ],
  },
  {
    number: "03",
    title: "Abrir el archivo",
    meta: "Investigación colectiva · En curso",
    text: [
      "Las prácticas compartidas extienden el estudio más allá de un espacio individual. Talleres, conversaciones y colaboraciones hacen circular técnicas y preguntas, y permiten que una investigación cambie al encontrarse con la experiencia de otras personas.",
      "El archivo resultante reúne tanto piezas terminadas como pruebas y documentos. Su valor está en mostrar las relaciones que hicieron posible cada forma.",
    ],
    images: [
      image("shared", "56b802cc-5143-4a6c-8d04-7fee176bb413-1-102-o.webp", "Composición final surgida de una práctica compartida", 1444, 2178),
      image("shared", "67cc9daa-85ec-4e21-bae6-1c12268dd97f-1-102-o.webp", "Detalle de un archivo visual colaborativo", 1444, 2178),
      image("shared", "b4831d08-156d-4c16-8223-ca5fe020fcdb-1-102-o.webp", "Resultado material de una investigación colectiva", 1444, 2178),
    ],
  },
];

export const situatedGallery = [
  situatedEntries[0].images[0], situatedEntries[0].images[1],
  image("situated", "material-cantera-caolin-burela-brenda-ranieri-2026-40.webp", "Materia mineral durante el trabajo de campo en Burela", 2400, 1800),
  situatedEntries[1].images[0], situatedEntries[1].images[2],
  image("situated", "materiales-paisaje-sub-urbano-brenda-ranieri-2026-77.webp", "Lavado y observación de materiales recolectados", 2400, 1800),
  image("situated", "materiales-paisaje-sub-urbano-brenda-ranieri-2026-91.webp", "Muestra vertical del paisaje sub-urbano", 1800, 2400),
  image("situated", "materiales-paisaje-sub-urbano-brenda-ranieri-2026-96.webp", "Mesa de clasificación de materiales locales", 2400, 1800),
  image("situated", "cartografia-material-brenda-ranieri-12.webp", "Cartografía de muestras, lugares y procesos", 2400, 1800),
  situatedEntries[2].images[0], situatedEntries[2].images[2],
  image("situated", "esmaltes-brenda-ranieri-2026-10.webp", "Pruebas de color y superficie cerámica", 2400, 1800),
  image("situated", "esmaltes-brenda-ranieri-2026-39.webp", "Serie de esmaltes experimentales", 2400, 1800),
  image("situated", "lo-que-queda-brenda-ranieri-mesa-11.webp", "Fragmentos y formulaciones sobre la mesa", 2400, 1800),
  situatedEntries[3].images[0], situatedEntries[3].images[1],
  image("situated", "oax-car-38-57-brenda-ranieri-130.webp", "Archivo material en el estudio", 2400, 1800),
  image("situated", "oax-car-38-57-brenda-ranieri-134.webp", "Proceso de construcción y ensayo en el taller", 2400, 1800),
  image("situated", "wip-la-forma-del-agua-quieta-brenda-ranieri11.webp", "Trabajo en proceso para La forma del agua quieta", 1800, 2400),
];

export const sharedGallery = [
  sharedEntries[0].images[0], sharedEntries[0].images[1], sharedEntries[0].images[2],
  image("shared", "1f251eee-930e-4714-8d44-5e11a2fab0bc-1-105-c.webp", "Muestras reunidas durante el taller", 768, 1024),
  image("shared", "4b8829c4-31ec-40fa-9778-02c2b55a0c22-1-105-c.webp", "Observación colectiva de tierras y arcillas", 768, 1024),
  image("shared", "92ede4f5-f6c7-4d77-a0c8-5253fcd0db38-1-105-c.webp", "Preparación compartida de materiales", 768, 1024),
  image("shared", "fe3e2cf7-8a9b-4e50-8083-7e02b115a65f-1-105-c.webp", "Espacio de trabajo del taller", 768, 1024),
  sharedEntries[1].images[0], sharedEntries[1].images[1], sharedEntries[1].images[2],
  image("shared", "f81acf60-0071-43ae-ba21-1b3a01f7c256-1-102-o.webp", "Mesa de trabajo durante la producción de rayogramas", 2178, 1444),
  image("shared", "ea5e56e0-a33d-4bbd-a0b1-6770c02b14bd-1-102-o.webp", "Proceso fotográfico colaborativo", 1444, 2178),
  image("shared", "77df6878-70fd-4f83-9311-6b0139dccebb-1-102-o.webp", "Materiales y papel fotosensible", 1444, 2178),
  image("shared", "ed849232-06f2-40d9-9c8b-3ac65fd0b6b2-1-105-c.webp", "Prueba de exposición en el laboratorio", 768, 1024),
  image("shared", "81f2c18c-e79f-4d89-9bce-fab710f4287c-1-105-c.webp", "Revelado colectivo de imágenes por contacto", 768, 1024),
  image("shared", "ceb257ca-dc3a-496d-9ef2-3e19cbdeb012-1-105-c.webp", "Detalle del proceso de rayogramas", 1088, 721),
  sharedEntries[2].images[0], sharedEntries[2].images[1], sharedEntries[2].images[2],
];
