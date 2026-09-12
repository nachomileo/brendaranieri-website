"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/images/hero-la-forma-del-agua-quieta-final.webp", alt: "Fuente cerámica de La forma del agua quieta sobre fondo blanco" },
  { src: "/images/hero-la-forma-del-agua-quieta-retouched.webp", alt: "La forma del agua quieta, fuente cerámica en funcionamiento" },
  { src: "/images/hero-cantera.webp", alt: "Cantera y lago mineral en el paisaje" },
];

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 3000);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="hero-carousel">
    <div className="hero-carousel-track">
      {slides.map((slide, index) => <div className="hero-carousel-slide" key={slide.src} hidden={index !== active}><Image src={slide.src} alt={slide.alt} fill unoptimized loading="eager" fetchPriority={index === 0 ? "high" : "auto"} sizes="100vw" /></div>)}
    </div>
  </div>;
}
