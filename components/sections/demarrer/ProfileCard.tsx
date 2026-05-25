"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

/** Carte profil (étape 3) — icône en haut, sélection unique (radio). */
export function ProfileCard({
  icon: Icon,
  title,
  description,
  selected,
  onSelect,
}: ProfileCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex flex-col items-start gap-2 rounded-[8px] px-5 py-4 text-left transition-all duration-200 focus-visible:outline-none",
        selected
          ? "border-accent border-2 bg-[rgba(0,74,173,0.05)]"
          : "border-line hover:border-ink/25 border bg-white/[0.03]",
      )}
    >
      <Icon
        className={cn("size-7", selected ? "text-accent" : "text-muted")}
        aria-hidden
      />
      <span className="text-ink text-body font-medium">{title}</span>
      <span className="text-muted text-body-s">{description}</span>
    </button>
  );
}
