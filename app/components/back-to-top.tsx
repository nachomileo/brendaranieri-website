"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ArrowIcon } from "./arrow-icon";
import { usePathname } from "next/navigation";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [footerClearance, setFooterClearance] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const top = document.querySelector("[data-page-top]");
    const topObserver = top ? new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting)) : null;
    if (top && topObserver) topObserver.observe(top);
    const footer = document.querySelector("footer");
    const observer = footer ? new IntersectionObserver(([entry]) => setFooterClearance(entry.isIntersecting ? Math.ceil(entry.boundingClientRect.height) + 12 : 0)) : null;
    if (footer && observer) observer.observe(footer);
    return () => {
      topObserver?.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  const style = { "--footer-clearance": `${footerClearance}px` } as CSSProperties;
  return <><span className="page-top-sentinel" data-page-top aria-hidden="true" /><button className={`back-to-top ${visible ? "is-visible" : ""} ${footerClearance ? "is-above-footer" : ""}`} style={style} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver arriba" tabIndex={visible ? 0 : -1}><ArrowIcon direction="up" /></button></>;
}
