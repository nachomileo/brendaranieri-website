import Link from "next/link";

const labels = {
  es: ["Exposiciones y proyectos", "About", "Piezas", "Procesos situados", "Prácticas colectivas"],
  en: ["Exhibitions & projects", "About", "Pieces", "Situated processes", "Collective practices"],
} as const;
const hrefs = ["/projects", "/about", "/selected-artworks", "/situated-processes", "/shared-practices"] as const;

export function SiteNavigation({ language = "es" }: { language?: "es" | "en" }) {
  return <nav className="archive-primary-nav" aria-label={language === "es" ? "Navegación principal" : "Primary navigation"}>{hrefs.map((href, index) => <Link href={href} key={href}>{labels[language][index]}</Link>)}</nav>;
}
