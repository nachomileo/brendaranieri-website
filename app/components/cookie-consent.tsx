"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const googleAnalyticsId = "G-Q141K1YRH3";
const storageKey = "brenda-cookie-consent";
const consentLifetime = 1000 * 60 * 60 * 24 * 730;
type Consent = "accepted" | "rejected" | null;

function readConsent(): Consent {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null") as { value?: Consent; savedAt?: number } | null;
    if (!saved?.value || !saved.savedAt || Date.now() - saved.savedAt > consentLifetime) return null;
    return saved.value;
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  document.cookie.split(";").forEach((item) => {
    const name = item.split("=")[0]?.trim();
    if (name === "_ga" || name?.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.brendaranieri.art; SameSite=Lax`;
    }
  });
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [language, setLanguage] = useState<"es" | "en">("es");

  useEffect(() => {
    queueMicrotask(() => {
      setConsent(readConsent());
      setLanguage(document.documentElement.lang === "en" ? "en" : "es");
      setReady(true);
    });
    const observer = new MutationObserver(() => setLanguage(document.documentElement.lang === "en" ? "en" : "es"));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    return () => observer.disconnect();
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    localStorage.setItem(storageKey, JSON.stringify({ value, savedAt: Date.now() }));
    setConsent(value);
    setPanelOpen(false);
    if (value === "rejected") clearAnalyticsCookies();
  };

  const text = language === "es" ? {
    title: "Cookies y privacidad",
    body: "Usamos cookies de Google Analytics únicamente para conocer cómo se visita la web. Solo se activarán si las aceptás.",
    accept: "Aceptar",
    reject: "Rechazar",
    policy: "Política de cookies",
    settings: "Cookies",
  } : {
    title: "Cookies and privacy",
    body: "We use Google Analytics cookies only to understand how the website is visited. They will only be activated if you accept them.",
    accept: "Accept",
    reject: "Reject",
    policy: "Cookie policy",
    settings: "Cookies",
  };

  if (!ready) return null;
  const showPanel = consent === null || panelOpen;

  return <>
    {consent === "accepted" && <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
      <Script id="google-analytics-consented" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });
      `}</Script>
    </>}
    {showPanel ? <section className="cookie-banner" role="dialog" aria-modal="true" aria-labelledby="cookie-title" aria-describedby="cookie-description">
      <div><p id="cookie-title">{text.title}</p><p id="cookie-description">{text.body}</p><Link href={`/cookies${language === "en" ? "?lang=en" : ""}`}>{text.policy}</Link></div>
      <div className="cookie-actions"><button type="button" onClick={() => choose("rejected")}>{text.reject}</button><button type="button" onClick={() => choose("accepted")}>{text.accept}</button></div>
    </section> : <button className="cookie-settings" type="button" onClick={() => setPanelOpen(true)}>{text.settings}</button>}
  </>;
}
