import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge ne connaît pas nos tokens custom. Sans ça, il considère
// text-mono-s (TAILLE) et text-muted (COULEUR) comme le même groupe `text-*`
// et supprime la taille. On lui déclare donc nos noms de taille comme
// "font-size" — ils cessent d'entrer en conflit avec les couleurs text-*.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-xl",
            "display-l",
            "display-m",
            "h1",
            "h2",
            "h3",
            "body-l",
            "body",
            "body-s",
            "mono-s",
          ],
        },
      ],
    },
  },
});

/**
 * Fusionne des classes conditionnelles (clsx) puis dédoublonne les classes
 * Tailwind en conflit (tailwind-merge, étendu à nos tokens). Helper standard.
 *
 * @example cn("px-4", condition && "px-8") // => "px-8"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
