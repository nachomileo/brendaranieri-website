"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type SliderImage = { src: string; alt: string; width: number; height: number };

export function ArtworkSlider({ images, code }: { images: SliderImage[]; code: string }) {
  const [current, setCurrent] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const pointerStart = useRef<number | null>(null);
  const image = images[current];
  const move = useCallback((direction: number) => {
    setCurrent((value) => (value + direction + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % images.length), 4500);
    return () => window.clearInterval(timer);
  }, [images.length]);

  useEffect(() => {
    if (!zoomOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setZoomOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [zoomOpen]);

  const finishSwipe = (clientX: number) => {
    if (pointerStart.current !== null && Math.abs(clientX - pointerStart.current) > 45) move(clientX < pointerStart.current ? 1 : -1);
    pointerStart.current = null;
  };

  return <div className="piece-slider">
    <div
      className="piece-slider-stage"
      tabIndex={0}
      aria-label={`Galería de ${code}. Imagen ${current + 1} de ${images.length}`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") move(-1);
        if (event.key === "ArrowRight") move(1);
      }}
      onPointerDown={(event) => { pointerStart.current = event.clientX; }}
      onPointerUp={(event) => finishSwipe(event.clientX)}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      <button className="piece-slider-open" type="button" onClick={() => setZoomOpen(true)} aria-label={`Ampliar imagen: ${image.alt}`}><Image className="piece-slider-image" key={image.src} src={image.src} alt={image.alt} fill priority={current === 0} sizes="(max-width: 760px) 94vw, 62vw" quality={92} /></button>
      {images.length > 1 && <>
        <button className="piece-slider-arrow is-previous" type="button" onClick={() => move(-1)} aria-label="Imagen anterior">←</button>
        <button className="piece-slider-arrow is-next" type="button" onClick={() => move(1)} aria-label="Imagen siguiente">→</button>
      </>}
      <span className="piece-slider-count" aria-live="polite">{code}.{current + 1} / {String(images.length).padStart(2, "0")}</span>
    </div>
    {images.length > 1 && <div className="piece-slider-track" aria-label="Vistas de la pieza">
      {images.map((item, index) => <button className={index === current ? "is-current" : ""} type="button" onClick={() => setCurrent(index)} aria-label={`Ver imagen ${index + 1}`} aria-pressed={index === current} key={item.src}><Image src={item.src} alt="" fill sizes="80px" quality={75} /></button>)}
    </div>}
    {zoomOpen && <div className="artwork-lightbox" role="dialog" aria-modal="true" aria-label={`Vista ampliada: ${image.alt}`} onClick={() => setZoomOpen(false)}><button className="artwork-lightbox-close" type="button" onClick={() => setZoomOpen(false)} aria-label="Cerrar imagen">Cerrar ×</button><div className="artwork-lightbox-image" onClick={(event) => event.stopPropagation()}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="96vw" quality={95} priority /></div></div>}
  </div>;
}
