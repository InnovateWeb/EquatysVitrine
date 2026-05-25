"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompactChoiceCardProps {
  /** Eyebrow optionnel (ex : "01 · URGENT"). */
  eyebrow?: string;
  /** Accent rouge (carte urgence). */
  urgent?: boolean;
  title: string;
  description: string;
  onSelect: () => void;
}

export function CompactChoiceCard({
  eyebrow,
  urgent,
  title,
  description,
  onSelect,
}: CompactChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group border-line hover:border-ink/25 flex w-full cursor-pointer items-center gap-4 rounded-[8px] border bg-white/[0.03] px-5 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.05] sm:gap-5"
    >
      <span className="min-w-0 flex-1">
        {eyebrow && (
          <span
            className={cn(
              "block font-mono text-[0.7rem] tracking-[0.1em] uppercase",
              urgent ? "text-[#E63946]" : "text-muted",
            )}
          >
            {eyebrow}
          </span>
        )}
        <span className="text-ink mt-0.5 block text-[1.05rem] font-medium">
          {title}
        </span>
        <span className="text-muted text-body-s mt-1 block">{description}</span>
      </span>
      <ArrowRight
        className="text-muted group-hover:text-accent size-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden
      />
    </button>
  );
}
