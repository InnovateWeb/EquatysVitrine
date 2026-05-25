"use client";

import { useEffect } from "react";
import { getLenisInstance } from "@/lib/animations/lenisStore";

/**
 * Au chargement d'une page portant un hash (#parcours…), défile en douceur
 * vers la section ciblée — via Lenis si disponible, sinon scroll natif.
 * Décale du header sticky (~72px). Monté sur l'accueil pour la nav one-page
 * (ex : retour depuis la modale /demarrer vers #parcours).
 */
export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.length < 2) return;

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;

    const headerOffset = 72;
    const scroll = () => {
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(target, { offset: -headerOffset, duration: 1.1 });
      } else {
        const top =
          target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    // Laisse Lenis + GSAP/ScrollTrigger s'initialiser avant de défiler.
    // Un double-RAF suffit quand on est déjà sur la page ; quand on arrive
    // depuis une autre route, il faut un délai plus long (~150 ms).
    const timer = setTimeout(scroll, 150);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
