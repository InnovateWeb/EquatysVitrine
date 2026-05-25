"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";
import { splitWords } from "./splitWords";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import type { RevealOptions } from "./useScrollReveal";

/**
 * Révélation d'un titre MOT PAR MOT (fade + translateY en stagger).
 * Utilisé sur le H1 du hero (mode "load") et le H2 du positionnement
 * (mode "scroll"). Respecte prefers-reduced-motion.
 */
export function useTextReveal(
  ref: RefObject<HTMLElement | null>,
  options: RevealOptions = {},
) {
  const {
    trigger = "scroll",
    delay = 0,
    duration = 0.5,
    y = 12,
    ease = "power3.out",
    stagger = 0.05,
    start = "top 85%",
    once = true,
  } = options;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const words = splitWords(el);

    const ctx = gsap.context(() => {
      gsap.set(words, { opacity: 0, y });
      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger,
        delay,
        ...(trigger === "scroll"
          ? { scrollTrigger: { trigger: el, start, once } }
          : {}),
      });
    });

    return () => ctx.revert();
  }, [ref, trigger, delay, duration, y, ease, stagger, start, once]);
}
