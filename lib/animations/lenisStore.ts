import type Lenis from "lenis";

// Petit singleton pour partager l'instance Lenis entre le SmoothScrollProvider
// (qui la crée) et les composants qui doivent stopper le scroll (ex : header,
// quand le drawer mobile est ouvert).
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}
