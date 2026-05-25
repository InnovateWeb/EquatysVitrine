import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

type TextSize = "l" | "base" | "s";
type TextTone = "primary" | "muted";

interface TextProps extends HTMLAttributes<HTMLElement> {
  size?: TextSize;
  tone?: TextTone;
  /** Balise rendue (défaut `p`). */
  as?: ElementType;
  /** Ref transmise à l'élément (animations GSAP, mesure…). */
  ref?: Ref<HTMLElement>;
  children: ReactNode;
}

const sizeClass: Record<TextSize, string> = {
  l: "text-body-l",
  base: "text-body",
  s: "text-body-s",
};

const toneClass: Record<TextTone, string> = {
  primary: "text-ink",
  muted: "text-muted",
};

/** Texte courant. line-height 1.6 porté par les tokens body. */
export function Text({
  size = "base",
  tone = "primary",
  as,
  ref,
  className,
  children,
  ...props
}: TextProps) {
  const Tag: ElementType = as ?? "p";

  return (
    <Tag
      ref={ref}
      className={cn(sizeClass[size], toneClass[tone], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
