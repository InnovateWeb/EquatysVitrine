import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  /** Libellés des étapes (ex : ["Situation", "Précision", "Coordonnées"]). */
  steps: string[];
  /** Index de l'étape courante (0-based). */
  current: number;
}

/**
 * Indicateur de progression du parcours /demarrer : cercles numérotés reliés.
 * Pleins (accent) jusqu'à l'étape courante, vides ensuite. Statut annoncé via
 * une zone `aria-live`.
 */
export function ProgressIndicator({ steps, current }: ProgressIndicatorProps) {
  return (
    <div className="mx-auto max-w-[420px]">
      <p className="sr-only" aria-live="polite">
        Étape {current + 1} sur {steps.length} : {steps[current]}
      </p>
      <ol className="flex items-start" aria-hidden="true">
        {steps.map((label, i) => {
          const reached = i <= current;
          const done = i < current;
          const last = i === steps.length - 1;
          return (
            <Fragment key={label}>
              <li className="flex shrink-0 flex-col items-center gap-2">
                <span
                  className={cn(
                    "grid size-8 place-items-center rounded-full border font-mono text-[0.75rem] transition-colors duration-300",
                    reached
                      ? "border-accent bg-accent text-white"
                      : "border-line text-muted",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-mono text-[0.7rem] tracking-[0.1em] uppercase",
                    i === current ? "text-ink" : "text-muted",
                  )}
                >
                  {label}
                </span>
              </li>
              {!last && (
                <span
                  className={cn(
                    "mt-4 h-px flex-1 transition-colors duration-300",
                    done ? "bg-accent" : "bg-line",
                  )}
                  aria-hidden="true"
                />
              )}
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}
