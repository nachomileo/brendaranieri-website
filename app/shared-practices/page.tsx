import type { Metadata } from "next";
import { JournalPage } from "../components/journal-page";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";
import { sharedGallery } from "../../lib/journals";

export const metadata: Metadata = { title: "Prácticas compartidas — Brenda Ranieri", description: "Talleres, colaboraciones e investigación colectiva de Brenda Ranieri." };

export default function SharedPracticesPage() {
  return <><header className="archive-header"><SiteSignature /><SiteNavigation /></header><JournalPage title="Prácticas compartidas" intro={["Abrir el proceso a otras personas transforma tanto la materia como las preguntas que la rodean. Talleres, encuentros y colaboraciones funcionan como espacios de investigación en los que técnicas, experiencias y saberes táctiles circulan sin una receta cerrada.", "Esta práctica incluye el trabajo con arcillas silvestres y materiales del paisaje urbano junto a Luka Andeya, y la investigación desarrollada con Ana Paes y Paula Cid Cerezo para OAX-CAR-38-57. En los rayogramas, objetos, sedimentos, agua, luz y tiempo producen imágenes por contacto directo: la autoría aparece como una relación entre cuerpos, materiales y disciplinas."]} images={sharedGallery} /><footer className="archive-footer"><span>Brenda Ranieri © 2026</span><span>ES / EN</span></footer></>;
}
