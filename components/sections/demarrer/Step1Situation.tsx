"use client";

import { ArrowRight } from "lucide-react";
import { situationCards, type SituationParam } from "@/lib/data/refinements";
import { CompactChoiceCard } from "./CompactChoiceCard";
import { StepHeader } from "./StepHeader";
import { getIcon } from "./icons";

interface Step1SituationProps {
  /** Sélection d'une situation (urgence → écran urgence ; sinon → étape 2). */
  onPick: (key: SituationParam) => void;
  /** Lien échappatoire → étape 2 « Autre ». */
  onOther: () => void;
}

/** Étape 1 (modale) — choix de la situation en liste verticale compacte. */
export function Step1Situation({ onPick, onOther }: Step1SituationProps) {
  return (
    <div>
      <StepHeader
        title="Comment pouvons-nous vous aider ?"
        subtitle="Sélectionnez la situation qui correspond le mieux à votre besoin."
      />
      <div className="mt-6 flex flex-col gap-3">
        {situationCards.map((c) => (
          <CompactChoiceCard
            key={c.key}
            icon={getIcon(c.iconName)}
            eyebrow={`${c.num} · ${c.category}`}
            urgent={c.urgent}
            title={c.title}
            description={c.description}
            onSelect={() => onPick(c.key)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={onOther}
        className="text-body-s text-muted hover:text-ink group mt-6 inline-flex items-center gap-1.5 transition-colors"
      >
        Mon besoin ne correspond à aucune de ces situations
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </button>
    </div>
  );
}
