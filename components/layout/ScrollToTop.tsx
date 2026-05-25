"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenisInstance } from "@/lib/animations/lenisStore";

/**
 * Remonte automatiquement en haut de page à chaque changement de route.
 * Utilise Lenis (immediate) si disponible, sinon fallback natif.
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
