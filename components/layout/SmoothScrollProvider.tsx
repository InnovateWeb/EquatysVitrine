"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenisInstance } from "@/lib/animations/lenisStore";

/**
 * Initialise Lenis (smooth scroll) au mount et synchronise sa boucle RAF avec
 * le ticker GSAP, en branchant ScrollTrigger sur l'événement scroll de Lenis.
 * À placer dans le layout racine, autour de {children}.
 *
 * Respecte prefers-reduced-motion : on n'active pas le smooth scroll dans ce cas.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    setLenisInstance(lenis);

    const onTick = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker = secondes, Lenis.raf attend des ms
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);

  return <>{children}</>;
}
