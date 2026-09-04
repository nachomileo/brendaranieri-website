"use client";

import Link from "next/link";
import { useEffect } from "react";
import { localizedHref } from "../../lib/i18n";

const labels = {
  es: ["Exposiciones y proyectos", "About", "Piezas", "Procesos situados", "Prácticas colectivas"],
  en: ["Exhibitions & projects", "About", "Artworks", "Situated processes", "Collective practices"],
} as const;
const hrefs = ["/projects", "/about", "/selected-artworks", "/situated-processes", "/shared-practices"] as const;

export function SiteNavigation({ language = "es" }: { language?: "es" | "en" }) {
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <nav className="archive-primary-nav" aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>{hrefs.map((href, index) => <Link href={localizedHref(href, language)} key={href}>{labels[language][index]}</Link>)}</nav>;
}
