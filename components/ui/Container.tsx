import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "full";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Largeur max du contenu. `lg` (défaut) = 1280px (--container-max). */
  size?: ContainerSize;
  children: ReactNode;
}

const sizeClass: Record<ContainerSize, string> = {
  sm: "max-w-[720px]", // pages légales, colonnes de texte
  md: "max-w-[960px]",
  lg: "max-w-[var(--container-max)]", // 1280px
  full: "max-w-none",
};

/**
 * Centre le contenu et applique la gouttière horizontale responsive
 * (--container-px : clamp(24px, 5vw, 80px)).
 */
export function Container({
  size = "lg",
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--container-px)]",
        sizeClass[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
