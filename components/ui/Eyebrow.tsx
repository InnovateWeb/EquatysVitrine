import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

type EyebrowTone = "muted" | "accent";

interface EyebrowProps extends HTMLAttributes<HTMLElement> {
  /** Balise rendue (défaut `p`). */
  as?: ElementType;
  /** Couleur : `muted` (défaut) ou `accent` (#004AAD, lisible clair comme sombre). */
  tone?: EyebrowTone;
  /** Ref transmise à l'élément (animations GSAP, mesure…). */
  ref?: Ref<HTMLElement>;
  children: ReactNode;
}

const toneClass: Record<EyebrowTone, string> = {
  muted: "text-muted",
  accent: "text-accent",
};

/**
 * Petit label monospace majuscule au-dessus des titres de section.
 * Ex : MÉTHODOLOGIE, MÉTIERS, URGENCE. Tracking 0.1em et taille 0.75rem
 * sont portés par le token `text-mono-s`.
 */
export function Eyebrow({
  as,
  tone = "muted",
  ref,
  className,
  children,
  ...props
}: EyebrowProps) {
  const Tag: ElementType = as ?? "p";

  return (
    <Tag
      ref={ref}
      className={cn(
        "text-mono-s font-mono uppercase",
        toneClass[tone],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
