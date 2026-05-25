import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

interface HeroVideoProps {
  /** Chemin vidéo MP4. Sans `src` → placeholder pointillé plein écran. */
  src?: string;
  /** Chemin vidéo WebM (fallback poids optimisé). */
  webmSrc?: string;
  /** Image de fallback en attendant le chargement de la vidéo. */
  poster?: string;
  children: ReactNode;
}

/**
 * Fond plein écran du hero en 3 couches : vidéo (ou placeholder) → overlay
 * sombre → contenu (`children`). Prêt à recevoir une vidéo plus tard via `src`
 * sans refactor. À placer dans un parent `relative` à hauteur définie.
 */
export function HeroVideo({ src, webmSrc, poster, children }: HeroVideoProps) {
  return (
    <>
      {/* Couche 1 — fond vidéo (z-0) */}
      {src ? (
        <video
          className="absolute inset-0 z-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={poster}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <ImagePlaceholder
          fill
          hideLabel
          label="Vidéo de fond du hero (à fournir)"
          className="z-0"
        />
      )}

      {/* Couche 2 — overlay sombre (z-10) : lisibilité du texte par-dessus la vidéo. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[rgba(10,10,10,0.35)]"
      />

      {/* Couche 3 — contenu (z-20) */}
      <div className="relative z-20 flex flex-1 flex-col">{children}</div>
    </>
  );
}
