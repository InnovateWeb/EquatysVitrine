import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect côté client (anime avant le paint → pas de flash),
 * useEffect côté serveur (évite le warning SSR de React).
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
