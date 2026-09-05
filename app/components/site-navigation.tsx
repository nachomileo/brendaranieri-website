"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { localizedHref } from "../../lib/i18n";

const labels = {
  es: ["Exposiciones y proyectos", "About", "Piezas", "Procesos situados", "Prácticas colectivas", "Notas"],
  en: ["Exhibitions & projects", "About", "Artworks", "Situated processes", "Collective practices", "Notes"],
} as const;
const hrefs = ["/projects", "/about", "/selected-artworks", "/situated-processes", "/shared-practices", "/notes"] as const;

export function SiteNavigation({ language = "es" }: { language?: "es" | "en" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <>
    <button className="menu-toggle archive-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="archive-primary-navigation" onClick={() => setMenuOpen((open) => !open)}>Menu</button>
    <nav id="archive-primary-navigation" className={`archive-primary-nav ${menuOpen ? "is-open" : ""}`} aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>{hrefs.map((href, index) => <Link href={localizedHref(href, language)} key={href} onClick={() => setMenuOpen(false)}>{labels[language][index]}</Link>)}</nav>
  </>;
}
