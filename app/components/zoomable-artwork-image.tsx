"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
type Props = {
  image: { src: string; alt: string; width?: number; height?: number };
  className?: string;
  sizes: string;
};

export function ZoomableArtworkImage({ image, className = "", sizes }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button className={`zoomable-artwork-image ${className}`} type="button" onClick={() => setOpen(true)} aria-label={`Ampliar imagen: ${image.alt}`}>
        <Image src={image.src} alt={image.alt} width={image.width ?? 1600} height={image.height ?? 1200} sizes={sizes} quality={88} />
      </button>
      {open && (
        <div className="artwork-lightbox" role="dialog" aria-modal="true" aria-label={`Vista ampliada: ${image.alt}`} onClick={() => setOpen(false)}>
          <button className="artwork-lightbox-close" type="button" onClick={() => setOpen(false)} aria-label="Cerrar imagen">Cerrar ×</button>
          <div className="artwork-lightbox-image" onClick={(event) => event.stopPropagation()}>
            <Image src={image.src} alt={image.alt} width={image.width ?? 1600} height={image.height ?? 1200} sizes="96vw" quality={95} priority />
          </div>
        </div>
      )}
    </>
  );
}
