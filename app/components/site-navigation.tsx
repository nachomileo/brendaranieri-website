import Link from "next/link";

const items = [
  ["/projects", "Exposiciones y proyectos"],
  ["/about", "About"],
  ["/#works", "Piezas"],
  ["/situated-processes", "Procesos situados"],
  ["/shared-practices", "Prácticas compartidas"],
] as const;

export function SiteNavigation() {
  return (
    <nav className="archive-primary-nav" aria-label="Navegación principal">
      {items.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
    </nav>
  );
}
