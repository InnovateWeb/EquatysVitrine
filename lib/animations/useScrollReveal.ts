"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export interface RevealOptions {
  /** "scroll" (défaut) = au scroll via ScrollTrigger ; "load" = au mount. */
  trigger?: "scroll" | "load";
  /** Délai en secondes (mode "load"). */
  delay?: number;
  duration?: number;
  /** translateY initial en px. */
  y?: number;
  /** translateX initial en px (défaut 0). */
  x?: number;
  ease?: string;
  /** Si défini, anime les enfants directs en stagger au lieu de l'élément. */
  stagger?: number;
  /** Point de déclenchement ScrollTrigger (mode "scroll"). */
  start?: string;
  once?: boolean;
}

/**
 * Apparition générique fade + translateY, au scroll ou au chargement.
 * Respecte prefers-reduced-motion (contenu laissé visible, sans animation).
 */
export function useScrollReveal(
  ref: RefObject<HTMLElement | null>,
  options: RevealOptions = {},
) {
  const {
    trigger = "scroll",
    delay = 0,
    duration = 0.5,
    y = 12,
    x = 0,
    ease = "power3.out",
    stagger,
    start = "top 85%",
    once = true,
  } = options;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const targets = stagger != null ? Array.from(el.children) : el;

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, x, y });
      gsap.to(targets, {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        ease,
        stagger,
        delay,
        // Rend la main au CSS après coup (sinon la transform inline GSAP
        // écraserait un éventuel hover:translate sur l'élément révélé).
        clearProps: "transform",
        ...(trigger === "scroll"
          ? { scrollTrigger: { trigger: el, start, once } }
          : {}),
      });
    });

    return () => ctx.revert();
  }, [ref, trigger, delay, duration, x, y, ease, stagger, start, once]);
}
