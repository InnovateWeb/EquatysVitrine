import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
import { cn } from "@/lib/utils";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type DisplaySize = "xl" | "l" | "m";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Niveau sémantique ET taille par défaut. */
  level: HeadingLevel;
  /** Taille "display" (titres massifs) qui prime sur la taille du niveau. */
  display?: DisplaySize | false;
  /** Override de la balise rendue (découple sémantique et apparence). */
  as?: `h${HeadingLevel}`;
  /** Ref transmise à l'élément (animations GSAP, mesure…). */
  ref?: Ref<HTMLHeadingElement>;
  children: ReactNode;
}

const displaySizeClass: Record<DisplaySize, string> = {
  xl: "text-display-xl",
  l: "text-display-l",
  m: "text-display-m",
};

const levelSizeClass: Record<HeadingLevel, string> = {
  1: "text-h1",
  2: "text-h2",
  3: "text-h3",
  4: "text-h3",
  5: "text-body-l",
  6: "text-body",
};

/**
 * Titre flexible. Poids 500 et tracking serré sont portés par les tokens
 * `text-*` (cf design system). La couleur suit le thème (text-ink).
 */
export function Heading({
  level,
  display = false,
  as,
  ref,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag: ElementType = as ?? `h${level}`;
  const sizeClass = display ? displaySizeClass[display] : levelSizeClass[level];

  return (
    <Tag
      ref={ref}
      className={cn("text-ink font-medium text-balance", sizeClass, className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
