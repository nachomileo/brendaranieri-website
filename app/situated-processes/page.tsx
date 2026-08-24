import type { Metadata } from "next";
import { JournalPage } from "../components/journal-page";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";
import { situatedEntries } from "../../lib/journals";

export const metadata: Metadata = { title: "Procesos situados — Brenda Ranieri", description: "Diario de campo, taller e investigación material de Brenda Ranieri." };

export default function SituatedProcessesPage() {
  const sections = [
    { number: "01", title: "Recolección de materiales", meta: "Deriva · territorio · archivo", text: ["Mi práctica tiene mucho de deriva, tanto dentro del taller como fuera. Caminar, observar y recolectar pequeñas muestras me permite leer cada territorio a través de su materia: arcillas silvestres, piedras, metales y restos del paisaje urbano."], images: [...situatedEntries[0].images, ...situatedEntries[1].images] },
    { number: "02", title: "Trabajo en el taller", meta: "Formulación · pruebas · cocción", text: ["En el estudio, estos materiales se preparan para diseñar piezas y formular pastas y esmaltes propios. El archivo reúne los ensayos como una memoria material abierta, donde cada cocción genera una co-creación con el fuego y donde el error también conserva información."], images: [...situatedEntries[2].images, ...situatedEntries[3].images] },
  ];
  return <><header className="archive-header"><SiteSignature /><SiteNavigation /></header><JournalPage title="Procesos situados" intro={["Materia, territorio y taller forman un archivo abierto de pruebas y transformaciones."]} sections={sections} /><footer className="archive-footer"><span>Brenda Ranieri © 2026</span><span>ES / EN</span></footer></>;
}
