"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";

/** Bouton X de la modale /demarrer — ferme et revient à l'accueil (routing client). */
export function CloseButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      aria-label="Fermer et retourner à l'accueil"
      className="text-muted hover:text-ink absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full transition-colors hover:bg-white/[0.08]"
    >
      <X className="size-[18px]" aria-hidden />
    </button>
  );
}
