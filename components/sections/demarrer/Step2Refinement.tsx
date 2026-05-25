"use client";

import { ArrowLeft } from "lucide-react";
import { refinements, type RefinementSlug } from "@/lib/data/refinements";
import { CompactChoiceCard } from "./CompactChoiceCard";
import { StepHeader } from "./StepHeader";

interface Step2RefinementProps {
  situation: RefinementSlug;
  onSelect: (index: number) => void;
  onBack: () => void;
}

/** Étape 2 (modale) — raffinement dynamique selon la situation (4 sous-options). */
export function Step2Refinement({
  situation,
  onSelect,
  onBack,
}: Step2RefinementProps) {
  const data = refinements[situation];

  return (
    <div>
      <StepHeader title={data.title} subtitle={data.subtitle} />
      <div className="mt-6 flex flex-col gap-3">
        {data.options.map((opt, i) => (
          <CompactChoiceCard
            key={opt.title}
            title={opt.title}
            description={opt.description}
            onSelect={() => onSelect(i)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onBack}
        className="text-body-s text-muted hover:text-ink group mt-6 inline-flex cursor-pointer items-center gap-1.5 transition-colors"
      >
        <ArrowLeft
          className="size-4 transition-transform group-hover:-translate-x-1"
          aria-hidden
        />
        Revenir à la page d&apos;accueil
      </button>
    </div>
  );
}
