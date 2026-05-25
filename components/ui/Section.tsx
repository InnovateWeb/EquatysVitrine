import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionTheme = "light" | "dark";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** `dark` pose .theme-dark : bg-surface/text-ink/text-muted/border-line basculent automatiquement. */
  theme?: SectionTheme;
  /** Ancre pour la navigation one-page (#methodologie, etc.). */
  id?: string;
  children: ReactNode;
}

/**
 * Bande pleine largeur avec padding vertical responsive (--section-py).
 * Peint son propre fond/texte via les tokens sémantiques ; mettre un
 * <Container> à l'intérieur pour contraindre la largeur du contenu.
 */
export function Section({
  theme = "light",
  id,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      data-section-theme={theme}
      className={cn(
        "bg-surface text-ink py-[var(--section-py)]",
        theme === "dark" && "theme-dark",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
