import type { Metadata } from "next";
import { JournalPage } from "../components/journal-page";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";
import { situatedGallery } from "../../lib/journals";

export const metadata: Metadata = { title: "Procesos situados — Brenda Ranieri", description: "Diario de campo, taller e investigación material de Brenda Ranieri." };

export default function SituatedProcessesPage() {
  return <><header className="archive-header"><SiteSignature /><SiteNavigation /></header><JournalPage title="Procesos situados" intro={["Mi práctica comienza antes de entrar al taller. Caminar, observar y recolectar pequeñas muestras me permite leer cada territorio a través de su materia: arcillas silvestres, sedimentos, piedras, metales y restos del paisaje urbano.", "En el estudio, estos materiales se secan, limpian, trituran y tamizan para formular pastas y esmaltes propios. Cada prueba registra una procedencia, una temperatura y una transformación. El archivo reúne esos recorridos y ensayos como una memoria material abierta, donde el error, el agua y el fuego también toman decisiones."]} images={situatedGallery} /><footer className="archive-footer"><span>Brenda Ranieri © 2026</span><span>ES / EN</span></footer></>;
}
