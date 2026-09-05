import type { Metadata } from "next";
import Link from "next/link";
import { SiteNavigation } from "../components/site-navigation";
import { SiteSignature } from "../components/site-signature";
import { FooterContact } from "../components/footer-contact";

export const metadata: Metadata = {
  title: "Política de cookies | Brenda Ranieri",
  description: "Información sobre las cookies utilizadas en brendaranieri.art.",
  alternates: { canonical: "/cookies" },
};

export default async function CookiesPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const language = (await searchParams).lang === "en" ? "en" : "es";
  const es = language === "es";
  return <>
    <header className="archive-header"><SiteSignature /><SiteNavigation language={language} /></header>
    <main className="legal-page">
      <p className="legal-kicker">{es ? "Información legal" : "Legal information"}</p>
      <h1>{es ? "Política de cookies" : "Cookie policy"}</h1>
      <section>
        <h2>{es ? "Qué utiliza esta web" : "What this website uses"}</h2>
        <p>{es ? "brendaranieri.art utiliza almacenamiento local para recordar el idioma y la decisión sobre cookies. Estos elementos son técnicos y permiten conservar las preferencias elegidas." : "brendaranieri.art uses local storage to remember the language and cookie decision. These elements are technical and retain the preferences you choose."}</p>
        <p>{es ? "Google Analytics solo se carga después de aceptar las cookies analíticas. Si se rechazan, no se instala ni se ejecuta Analytics." : "Google Analytics is loaded only after analytics cookies have been accepted. If they are rejected, Analytics is neither installed nor executed."}</p>
      </section>
      <section>
        <h2>{es ? "Cookies analíticas" : "Analytics cookies"}</h2>
        <div className="cookie-table" role="table" aria-label={es ? "Cookies analíticas" : "Analytics cookies"}>
          <div role="row"><strong role="columnheader">Cookie</strong><strong role="columnheader">{es ? "Proveedor" : "Provider"}</strong><strong role="columnheader">{es ? "Finalidad" : "Purpose"}</strong><strong role="columnheader">{es ? "Duración" : "Duration"}</strong></div>
          <div role="row"><span role="cell">_ga</span><span role="cell">Google Analytics</span><span role="cell">{es ? "Distinguir visitantes de forma estadística" : "Distinguish visitors statistically"}</span><span role="cell">2 {es ? "años" : "years"}</span></div>
          <div role="row"><span role="cell">_ga_*</span><span role="cell">Google Analytics</span><span role="cell">{es ? "Mantener el estado de la sesión analítica" : "Maintain analytics session state"}</span><span role="cell">2 {es ? "años" : "years"}</span></div>
        </div>
      </section>
      <section>
        <h2>{es ? "Cómo cambiar tu decisión" : "How to change your choice"}</h2>
        <p>{es ? "Podés abrir de nuevo el panel desde el enlace «Cookies» que permanece visible en la web. Al rechazar, eliminamos las cookies analíticas accesibles desde este dominio. También podés borrarlas desde la configuración de tu navegador." : "You can reopen the panel using the “Cookies” link that remains visible on the website. When you reject them, we remove analytics cookies accessible from this domain. You can also delete them through your browser settings."}</p>
      </section>
      <section>
        <h2>{es ? "Responsable y contacto" : "Controller and contact"}</h2>
        <p>Brenda Ranieri · <a href="mailto:hola@brendaranieri.art">hola@brendaranieri.art</a></p>
      </section>
      <Link className="legal-home-link" href={language === "en" ? "/?lang=en" : "/"}>{es ? "Volver a inicio" : "Back home"}</Link>
    </main>
    <footer className="archive-footer"><FooterContact /></footer>
  </>;
}
