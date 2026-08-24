"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";

const content = {
  es: {
    lead: "Artista visual y ceramista. Investiga cómo la materia, el territorio y los procesos colectivos pueden abrir nuevas formas de creación.",
    statement: [
      "Desde su taller en Carabanchel, Madrid, Brenda Ranieri investiga las relaciones entre materia, territorio y memoria mediante la cerámica, la instalación y el trabajo de campo. Su práctica comienza con la deriva, la escucha y la recolección de arcillas, sedimentos, piedras, metales y restos constructivos que revelan las transformaciones geológicas, urbanas y afectivas de cada lugar.",
      "En el taller formula sus propias pastas y esmaltes y desarrolla procesos experimentales donde la intuición convive con la investigación técnica. La materia no funciona como un soporte pasivo, sino como un agente que participa en la construcción de sentido a través del agua, el fuego, el tiempo y la incertidumbre.",
      "Sus instalaciones e intervenciones buscan activar encuentros entre las personas y el territorio, haciendo visibles memorias latentes y relaciones entre lo humano y lo más-que-humano. Desde 2024 dirige Fresca. La nave, un espacio independiente de creación contemporánea en Carabanchel dedicado a la experimentación y al intercambio entre artistas.",
    ],
  },
  en: {
    lead: "Visual artist and ceramicist. She researches how matter, territory and collective processes can open new forms of creation.",
    statement: [
      "From her studio in Carabanchel, Madrid, Brenda Ranieri explores the relationships between matter, territory and memory through ceramics, installation and fieldwork. Her practice begins with wandering, attentive listening and the gathering of clays, sediments, stones, metals and construction remnants that reveal the geological, urban and affective transformations of each place.",
      "In the studio she formulates her own clay bodies and glazes, developing experimental processes where intuition meets technical research. Matter is not a passive support, but an agent that participates in the construction of meaning through water, fire, time and uncertainty.",
      "Her installations and site-specific interventions activate encounters between people and territory, making latent memories and relationships between the human and more-than-human visible. Since 2024 she has directed Fresca. La nave, an independent contemporary art space in Carabanchel devoted to experimentation and exchange between artists.",
    ],
  },
} as const;

export default function AboutPage() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const copy = content[language];
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <>
    <header className="archive-header"><SiteSignature /><SiteNavigation /></header>
    <main className="about-page">
      <header className="about-heading"><p>About</p><h1>Brenda Ranieri</h1><p>{copy.lead}</p></header>
      <div className="about-image"><Image src="/images/journal/home/brenda-ranieri-estudio-ii.webp" alt="Estudio de Brenda Ranieri en Carabanchel" fill priority sizes="100vw" quality={92} /></div>
      <section className="about-statement" aria-label="Artist statement"><p>Statement</p><div>{copy.statement.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
    </main>
    <footer className="archive-footer"><span>Brenda Ranieri © 2026</span><div className="language-switch" aria-label="Language"><button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button><span>/</span><button type="button" className={language === "es" ? "active" : ""} onClick={() => setLanguage("es")}>ES</button></div></footer>
  </>;
}
