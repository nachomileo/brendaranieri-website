import Link from "next/link";

export function SiteSignature({ href = "/" }: { href?: string }) {
  return (
    <Link className="site-signature" href={href} aria-label="Brenda Ranieri — Inicio">Brenda Ranieri</Link>
  );
}
