"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { SiteLanguage } from "../../lib/i18n";

const languageEvent = "brenda-language-change";
const subscribe = (callback: () => void) => {
  window.addEventListener("popstate", callback);
  window.addEventListener(languageEvent, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(languageEvent, callback);
  };
};
const getSnapshot = (): SiteLanguage => new URLSearchParams(window.location.search).get("lang") === "en" ? "en" : "es";
const getServerSnapshot = (): SiteLanguage => "es";

export function useSiteLanguage() {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (next: SiteLanguage) => {
    const url = new URL(window.location.href);
    if (next === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event(languageEvent));
  };

  return [language, setLanguage] as const;
}
