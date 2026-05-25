"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

interface ProgressLineOptions {
  /** Début du scrub (ScrollTrigger start). */
  start?: string;
  /** Fin du scrub (ScrollTrigger end). */
  end?: string;
}

/**
 * Anime le « tracé » d'une ligne verticale (`scaleY` 0 → 1, origine en haut)
 * en **scrub**, synchronisé à la position de scroll dans le conteneur.
 * `lineRef` doit avoir `transform-origin: top` (classe `origin-top`).
 * Reduced-motion → ligne entièrement tracée, sans scrub.
 */
export function useScrollProgressLine(
  containerRef: RefObject<HTMLElement | null>,
  lineRef: RefObject<HTMLElement | null>,
  options: ProgressLineOptions = {},
) {
  const { start = "top 65%", end = "bottom 85%" } = options;

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    if (prefersReducedMotion()) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: container, start, end, scrub: true },
        },
      );
    });

    return () => ctx.revert();
  }, [containerRef, lineRef, start, end]);
}
