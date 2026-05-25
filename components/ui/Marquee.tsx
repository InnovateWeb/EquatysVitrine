import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  /** Items à faire défiler (texte ou n'importe quel nœud, ex : ImagePlaceholder). */
  items: ReactNode[];
  /** Durée d'un cycle complet en secondes (défaut 40). */
  durationSec?: number;
  /** Sens du défilement : "left" (défaut, vers la gauche) ou "right". */
  direction?: "left" | "right";
  /** Séparateur entre items (défaut « · »). `null` pour aucun (mode boîtes). */
  separator?: ReactNode;
  /** Classe appliquée à chaque item — espacement des boîtes (ex : "pr-6"). */
  itemClassName?: string;
  /** Estompe les bords gauche/droite (mask-image), façon Linear/Stripe. */
  fade?: boolean;
  className?: string;
}

/**
 * Bandeau de défilement horizontal continu (CSS pur). Les items sont dupliqués
 * et le ruban translate de -50% → boucle **sans saut** (l'espacement est porté
 * par chaque item, donc la couture entre les deux copies reste régulière).
 * Pause au hover, statique en `prefers-reduced-motion`. Décoratif (`aria-hidden`),
 * n'intercepte pas le scroll tactile (aucun handler JS). Le style texte se passe
 * via `className` (hérité par les items).
 */
export function Marquee({
  items,
  durationSec = 40,
  direction = "left",
  separator = "·",
  itemClassName,
  fade = false,
  className,
}: MarqueeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex overflow-hidden select-none",
        fade && "marquee-mask",
        className,
      )}
    >
      <div
        className={cn(
          "marquee-track flex w-max shrink-0",
          direction === "right" && "marquee-track--reverse",
        )}
        style={{ "--marquee-duration": `${durationSec}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item, i) => (
              <li
                key={`${copy}-${i}`}
                className={cn(
                  "flex items-center whitespace-nowrap",
                  itemClassName,
                )}
              >
                {item}
                {separator != null && separator !== "" && (
                  <span className="px-[1.4ch]" aria-hidden>
                    {separator}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
