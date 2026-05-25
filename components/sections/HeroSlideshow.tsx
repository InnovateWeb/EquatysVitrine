"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const IMAGES = [
  "/hero/hero-1.jpeg",
  "/hero/hero-2.jpeg",
  "/hero/hero-3.jpeg",
  "/hero/hero-4.jpeg",
  "/hero/hero-5.jpeg",
];

const INTERVAL = 3000; // ms par image

interface HeroSlideshowProps {
  children: ReactNode;
}

/**
 * Fond plein écran en diaporama : crossfade automatique toutes les 3 s.
 * 3 couches : photos (z-0) → overlay sombre (z-10) → contenu (z-20).
 * Responsive via fill + object-cover sur chaque image.
 */
export function HeroSlideshow({ children }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Couche 1 — photos en crossfade (z-0) */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={[
              "object-cover transition-opacity duration-1000 ease-in-out",
              i === current ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        ))}
      </div>

      {/* Couche 2 — overlay sombre pour la lisibilité du texte (z-10) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[rgba(10,10,10,0.65)]"
      />

      {/* Couche 2b — vignette sur tous les bords (z-11) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-11"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Couche 3 — contenu (z-20) */}
      <div className="relative z-20 flex flex-1 flex-col">{children}</div>
    </>
  );
}
