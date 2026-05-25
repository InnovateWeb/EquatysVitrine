"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Text";

interface FaqItemProps {
  question: string;
  answer: string;
}

/**
 * Entrée de FAQ en accordéon. Question = <button> (focusable, Enter/Space),
 * `aria-expanded` + `aria-controls` reliés à la zone réponse. Ouverture animée
 * en hauteur via `grid-template-rows: 0fr → 1fr` (CSS pur, accessible, sans
 * calcul JS). Plusieurs entrées peuvent être ouvertes simultanément.
 */
export function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const panelId = `${id}-panel`;
  const btnId = `${id}-btn`;

  return (
    <div className="border-line border-t">
      <button
        type="button"
        id={btnId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-6 py-7 text-left"
      >
        <span className="text-ink group-hover:text-accent text-[1.0625rem] font-medium tracking-[-0.01em] transition-colors sm:text-[1.125rem]">
          {question}
        </span>
        <span
          className="text-muted group-hover:text-ink shrink-0 transition-colors"
          aria-hidden
        >
          {open ? <Minus className="size-5" /> : <Plus className="size-5" />}
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <Text tone="muted" className="max-w-[680px] pb-7 leading-[1.7]">
            {answer}
          </Text>
        </div>
      </div>
    </div>
  );
}
