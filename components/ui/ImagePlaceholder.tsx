import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Ratio = "16:9" | "4:3" | "1:1" | "16:7";

interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  ratio?: Ratio;
  /** Couvre 100% × 100% du parent (position absolute, sans ratio fixe). */
  fill?: boolean;
  /** Masque le texte visible (garde l'aria-label) — ex : fond vidéo du hero. */
  hideLabel?: boolean;
  /** Description du visuel attendu (affichée au centre, en monospace). */
  label: string;
}

const ratioClass: Record<Ratio, string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "16:7": "aspect-[16/7]",
};

/**
 * ⚠️ Le SEUL emplacement d'image/vidéo autorisé sur le site : un encadré
 * pointillé avec un label monospace. JAMAIS d'image réelle ni de placeholder
 * externe (unsplash, picsum…). Convention transversale du projet.
 *
 * `fill` → occupe tout le parent (ex : fond vidéo plein écran du hero).
 * `hideLabel` → cache le texte central (l'aria-label reste pour l'accessibilité).
 */
export function ImagePlaceholder({
  ratio = "16:9",
  fill = false,
  hideLabel = false,
  label,
  className,
  ...props
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "border-line flex items-center justify-center border-[1.5px] border-dashed bg-transparent p-6 text-center",
        fill
          ? "absolute inset-0 h-full w-full"
          : cn("w-full rounded-[6px]", ratioClass[ratio]),
        className,
      )}
      {...props}
    >
      {!hideLabel && (
        <span className="text-mono-s text-muted font-mono uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
