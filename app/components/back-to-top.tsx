"use client";

import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const top = document.querySelector("[data-page-top]");
    const topObserver = top ? new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting)) : null;
    if (top && topObserver) topObserver.observe(top);
    const footer = document.querySelector("footer");
    const observer = footer ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting)) : null;
    if (footer && observer) observer.observe(footer);
    return () => {
      topObserver?.disconnect();
      observer?.disconnect();
    };
  }, []);

  const isVisible = visible && !footerVisible;
  return <><span className="page-top-sentinel" data-page-top aria-hidden="true" /><button className={`back-to-top ${isVisible ? "is-visible" : ""}`} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver arriba" tabIndex={isVisible ? 0 : -1}>↑</button></>;
}
