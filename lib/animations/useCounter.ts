"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { prefersReducedMotion } from "./prefersReducedMotion";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export interface CounterOptions {
  duration?: number;
  ease?: string;
  /** Suffixe affiché à la fin du comptage (ex : "+"). Ignoré si `format` est fourni. */
  suffix?: string;
  /**
   * Formatage personnalisé de la valeur (prioritaire sur `suffix`), appliqué
   * pendant ET à la fin du comptage. Ex : `(v) => `−${v}%``.
   */
  format?: (value: number) => string;
  /** "scroll" (défaut) = via ScrollTrigger ; "load" = au mount (élément au-dessus de la ligne de flottaison). */
  trigger?: "scroll" | "load";
  /** Délai avant le comptage (utile en mode "load"). */
  delay?: number;
  start?: string;
  startValue?: number;
}

/**
 * Compteur animé de `startValue` jusqu'à `target`, déclenché une seule fois
 * quand l'élément entre dans le viewport. Le suffixe (ex : "+") n'apparaît
 * qu'à la fin. SSR/no-JS et reduced-motion → valeur finale affichée d'emblée.
 *
 * ⚠️ Rendre la valeur finale dans le JSX (ex : <span ref>84</span>) pour le SEO ;
 * le hook la remet à `startValue` au mount avant d'animer.
 */
export function useCounter(
  ref: RefObject<HTMLElement | null>,
  target: number,
  options: CounterOptions = {},
) {
  const {
    duration = 1.2,
    ease = "power2.out",
    suffix = "",
    format,
    trigger = "scroll",
    delay = 0,
    start = "top 80%",
    startValue = 0,
  } = options;

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (value: number) => (format ? format(value) : `${value}`);
    const renderFinal = () => (format ? format(target) : `${target}${suffix}`);

    if (prefersReducedMotion()) {
      el.textContent = renderFinal();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const proxy = { val: startValue };
    el.textContent = render(Math.round(startValue));

    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        val: target,
        duration,
        ease,
        delay,
        // Mode "load" : pas de ScrollTrigger (l'élément est déjà visible au mount).
        ...(trigger === "scroll"
          ? { scrollTrigger: { trigger: el, start, once: true } }
          : {}),
        onUpdate: () => {
          el.textContent = render(Math.round(proxy.val));
        },
        onComplete: () => {
          el.textContent = renderFinal();
        },
      });
    });

    return () => ctx.revert();
  }, [
    ref,
    target,
    duration,
    ease,
    suffix,
    format,
    trigger,
    delay,
    start,
    startValue,
  ]);
}
