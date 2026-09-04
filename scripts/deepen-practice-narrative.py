"""Deepen About, Situated Processes and Shared Practices as one narrative."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]

about = root / "app/about/about-page.tsx"
s = about.read_text()
start = s.index("const content = {")
end = s.index("} as const;", start) + len("} as const;")
content = '''const content = {
  es: {
    lead: "Artista visual y ceramista. Su práctica investiga cómo la materia conserva la memoria de los territorios y cómo sus transformaciones pueden abrir otras formas de relación.",
    statement: [
      "La práctica de Brenda Ranieri comienza antes de que exista una pieza. Caminar, observar y recolectar arcillas, sedimentos, piedras, metales y restos del paisaje urbano son formas de aproximarse a un territorio desde aquello que lo compone. Cada materia llega al taller con una historia física: erosiones, residuos, infraestructuras, humedad y tiempo.",
      "El estudio funciona como un laboratorio intuitivo y persistente. Los materiales se secan, trituran, decantan, tamizan y combinan para formular pastas y esmaltes propios. Las pruebas construyen conocimiento, pero no buscan neutralizar la incertidumbre. Preparan las condiciones para que la materia vuelva a actuar y revele comportamientos que no pueden anticiparse por completo.",
      "El agua, el fuego y la cocción participan en la obra como agentes de transformación. Ranieri trabaja en un equilibrio entre experiencia y riesgo calculado: lleva arcillas, piedras, metales y esmaltes hasta un punto en el que cambian de estado, se afectan entre sí y conservan la huella de ese acontecimiento. La forma surge de escuchar esa respuesta, no de imponerla.",
      "Esta investigación también se abre a procesos colectivos. Compartir herramientas, preguntas y materiales desplaza la autoría individual y permite que otros saberes entren en el trabajo. Desde 2024 dirige Fresca. La nave, un espacio independiente de creación contemporánea en Carabanchel dedicado a la experimentación y al intercambio entre artistas.",
    ],
    gallery: "Materia · ensayo · archivo",
  },
  en: {
    lead: "Visual artist and ceramicist. Her practice explores how matter holds the memory of territories and how its transformations can open other forms of relationship.",
    statement: [
      "Brenda Ranieri’s practice begins before a work exists. Walking, observing and gathering clays, sediments, stones, metals and remnants of the urban landscape are ways of approaching a territory through what it is made of. Each material enters the studio carrying a physical history: erosion, residue, infrastructure, moisture and time.",
      "The studio operates as an intuitive and persistent laboratory. Materials are dried, ground, settled, sieved and combined to formulate her own clay bodies and glazes. Testing builds knowledge, but does not seek to neutralise uncertainty. It creates the conditions for matter to become active again and reveal behaviours that cannot be fully anticipated.",
      "Water, fire and firing take part in the work as agents of transformation. Ranieri works in a balance between experience and calculated risk, bringing clays, stones, metals and glazes to a point at which they change state, affect one another and retain the trace of that event. Form emerges from listening to that response rather than imposing it.",
      "This research also opens into collective processes. Sharing tools, questions and materials displaces individual authorship and allows other forms of knowledge to enter the work. Since 2024 she has directed Fresca. La nave, an independent contemporary art space in Carabanchel devoted to experimentation and exchange between artists.",
    ],
    gallery: "Matter · testing · archive",
  },
} as const;'''
s = s[:start] + content + s[end:]
old = '      <section className="about-statement" aria-label="Artist statement"><p>Statement</p><div>{copy.statement.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>'
new = '''      <section className="about-inner-gallery" aria-label={copy.gallery}>
        <header><span>{copy.gallery}</span><span>01—03</span></header>
        <div>
          <figure><Image src="/images/journal/situated/cartografia-material-brenda-ranieri-12.webp" alt="Cartografía material, muestras y notas del archivo de Brenda Ranieri" width={2400} height={1800} sizes="33vw" /></figure>
          <figure><Image src="/images/journal/situated/esmaltes-brenda-ranieri-2026-52.webp" alt="Pruebas de esmaltes y formulaciones en el laboratorio" width={2400} height={1800} sizes="33vw" /></figure>
          <figure><Image src="/images/journal/situated/oax-car-38-57-brenda-ranieri-131.webp" alt="Mesa y pared de investigación material en el estudio" width={2400} height={1800} sizes="33vw" /></figure>
        </div>
      </section>
      <section className="about-statement" aria-label="Artist statement"><p>Statement</p><div>{copy.statement.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>'''
if old not in s:
    raise RuntimeError("About statement markup not found")
about.write_text(s.replace(old, new))

# Rebuild Situated Processes around three internal stages.
(root / "app/situated-processes/page.tsx").write_text('''import type { Metadata } from "next";
import { JournalPage } from "../components/journal-page";
import { situatedEntries, situatedGallery } from "../../lib/journals";

export const metadata: Metadata = { title: "Procesos situados — Brenda Ranieri", description: "Recolección, laboratorio e investigación material de Brenda Ranieri." };

const es = [
  { number: "01", title: "Escuchar y recolectar", meta: "Deriva · territorio · materia", text: ["El trabajo comienza caminando. Recolectar no significa extraer un recurso neutro, sino prestar atención a las condiciones que lo produjeron. Arcillas silvestres, sedimentos, piedras, metales y restos urbanos construyen una lectura física y afectiva de cada lugar.", "Cada muestra se registra junto a su procedencia y contexto. El territorio permanece dentro del proceso: en el color, la granulometría, la humedad y las transformaciones que la materia ya atravesó antes de llegar al taller."], images: [...situatedEntries[0].images, ...situatedEntries[1].images, situatedGallery[6], situatedGallery[8]] },
  { number: "02", title: "El estudio como laboratorio", meta: "Preparación · formulación · archivo", text: ["En el taller, los materiales se secan, limpian, trituran, decantan y tamizan. Después se combinan con diferentes arcillas para formular pastas, engobes y esmaltes propios. Las series de pruebas registran proporciones, temperaturas, contracciones, superficies y accidentes.", "El archivo no funciona como un recetario cerrado. Es una memoria de comportamientos que permite volver sobre un hallazgo, reconocer una desviación y sostener una investigación donde intuición y conocimiento técnico trabajan juntos."], images: [...situatedEntries[2].images, situatedGallery[11], situatedGallery[12], situatedGallery[13], ...situatedEntries[3].images.slice(1)] },
  { number: "03", title: "Crear condiciones para la transformación", meta: "Agua · fuego · incertidumbre", text: ["La cocción crea las condiciones para que los materiales vuelvan a activarse. El fuego lleva arcillas, piedras, metales y esmaltes a un límite en el que cambian de estado y se afectan entre sí. El agua sedimenta, circula, erosiona y reactiva las piezas incluso después del horno.", "La experiencia permite calcular el riesgo, pero no eliminarlo. Grietas, fusiones, desplazamientos y reacciones inesperadas conservan información. La forma final es el registro de una negociación entre una intención y aquello que la materia decidió hacer."], images: [situatedGallery[17], situatedGallery[18], situatedGallery[9], situatedGallery[10], situatedEntries[3].images[0]] },
];
const en = [
  { ...es[0], title: "Listening and gathering", meta: "Drift · territory · matter", text: ["The work begins by walking. Gathering does not mean extracting a neutral resource, but attending to the conditions that produced it. Wild clays, sediments, stones, metals and urban remnants build a physical and affective reading of each place.", "Each sample is recorded with its origin and context. Territory remains within the process: in colour, grain, moisture and in the transformations matter underwent before entering the studio."] },
  { ...es[1], title: "The studio as laboratory", meta: "Preparation · formulation · archive", text: ["In the studio, materials are dried, cleaned, ground, settled and sieved. They are then combined with different clays to formulate original bodies, slips and glazes. Test series record proportions, temperatures, shrinkage, surfaces and accidents.", "The archive is not a closed recipe book. It is a memory of behaviours that makes it possible to return to a discovery, recognise a deviation and sustain research in which intuition and technical knowledge work together."] },
  { ...es[2], title: "Creating conditions for transformation", meta: "Water · fire · uncertainty", text: ["Firing creates the conditions for materials to become active again. Fire takes clays, stones, metals and glazes to a limit at which they change state and affect one another. Water settles, circulates, erodes and reactivates the works even after the kiln.", "Experience makes it possible to calculate risk, but not to remove it. Cracks, fusions, displacements and unexpected reactions retain information. The final form records a negotiation between an intention and what matter decided to do."] },
];
export default function SituatedProcessesPage() { return <JournalPage content={{ es: { title: "Procesos situados", intro: ["Una práctica construida desde la escucha del territorio, el ensayo y la transformación material."], archive: "Archivo de práctica", narratives: "Narrativas", sections: es }, en: { title: "Situated processes", intro: ["A practice built through listening to territory, testing and material transformation."], archive: "Practice archive", narratives: "Narratives", sections: en } }} />; }
''')

# Deepen Shared Practices without changing its established image groups.
p = root / "app/shared-practices/page.tsx"
s = p.read_text()
s = s.replace('"Abrir el proceso a otras personas transforma tanto la materia como las preguntas que la rodean. Talleres, encuentros y colaboraciones funcionan como espacios de investigación en los que técnicas, experiencias y saberes circulan."', '"Abrir un proceso no consiste en transmitir una técnica terminada, sino en compartir una pregunta todavía activa. La materia se convierte en un lugar de encuentro donde experiencias, herramientas y formas de conocimiento pueden afectarse mutuamente."')
s = s.replace('"Opening the process to others transforms both matter and the questions around it. Workshops, encounters and collaborations become research spaces in which techniques, experiences and knowledge circulate."', '"Opening a process is not about transmitting a finished technique, but sharing a question that remains active. Matter becomes a meeting place where experiences, tools and forms of knowledge can affect one another."')
p.write_text(s)

with (root / "app/globals.css").open("a") as css:
    css.write('''

/* About: inner practice sequence linking matter, laboratory and thought. */
.about-inner-gallery{margin-top:100px;padding-top:10px;border-top:1px solid var(--line)}
.about-inner-gallery>header{display:flex;justify-content:space-between;margin-bottom:22px;font-size:10px;letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
.about-inner-gallery>div{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;align-items:start}
.about-inner-gallery figure{margin:0}.about-inner-gallery img{display:block;width:100%;height:auto}
@media(max-width:760px){.about-inner-gallery{margin-top:70px}.about-inner-gallery>div{grid-template-columns:1fr 1fr}.about-inner-gallery figure:first-child{grid-column:span 2}}
''')

print("Deepened About, Situated Processes and Shared Practices")
