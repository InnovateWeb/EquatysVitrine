import { ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type IntentVariant = "link" | "urgency";

interface IntentCardProps {
  /** Numéro affiché dans l'eyebrow (ex : "01"). */
  num: string;
  /** Catégorie de l'eyebrow (ex : "Urgent"). */
  category: string;
  title: string;
  description: string;
  ctaLabel: string;
  /** Lien (mode home). Ignoré si `onSelect` est fourni. */
  href?: string;
  /** Action de sélection (mode /demarrer : avance l'étape au lieu de naviguer). */
  onSelect?: () => void;
  /** `urgency` = CTA bouton plein accent ; `link` = texte + flèche. */
  variant?: IntentVariant;
  /** Carte large : 2 colonnes (`md:col-span-2`). */
  wide?: boolean;
  /** Eyebrow en rouge (carte urgence). */
  urgentEyebrow?: boolean;
  /** Si fourni, affiche un bouton téléphone à côté du CTA. */
  phoneHref?: string;
  phoneLabel?: string;
}

/**
 * Carte « parcours par intention ». Teintes adaptatives (`var(--ink)`) → OK sur
 * fond clair comme sombre. Toute la carte est cliquable (stretched link/bouton via
 * `::after`). Deux modes : `href` (lien, home) ou `onSelect` (bouton, /demarrer).
 */
export function IntentCard({
  num,
  category,
  title,
  description,
  ctaLabel,
  href,
  onSelect,
  variant = "link",
  wide = false,
  urgentEyebrow = false,
  phoneHref,
  phoneLabel,
}: IntentCardProps) {
  const ctaClass =
    variant === "urgency"
      ? "bg-accent text-body group-hover:bg-accent-hover inline-flex items-center gap-2 rounded-[6px] px-5 py-2.5 font-medium text-white transition-colors after:absolute after:inset-0"
      : "text-body text-ink group-hover:text-accent inline-flex items-center gap-1.5 font-medium transition-colors after:absolute after:inset-0";

  const ctaInner =
    variant === "urgency" ? (
      <>
        <Phone className="size-4" aria-hidden />
        {ctaLabel}
      </>
    ) : (
      <>
        {ctaLabel}
        <ArrowRight
          className="size-4 transition-transform duration-[250ms] group-hover:translate-x-1"
          aria-hidden
        />
      </>
    );

  const cta = onSelect ? (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`${title} — ${ctaLabel}`}
      className={cn("text-left", ctaClass)}
    >
      {ctaInner}
    </button>
  ) : (
    <a href={href} aria-label={`${title} — ${ctaLabel}`} className={ctaClass}>
      {ctaInner}
    </a>
  );

  return (
    <article
      className={cn(
        "group border-line relative flex flex-col rounded-[6px] border bg-[color-mix(in_srgb,var(--ink)_3%,transparent)] px-7 py-8 transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--ink)_20%,transparent)] md:min-h-[300px]",
        wide && "md:col-span-2",
      )}
    >
      <Eyebrow className={urgentEyebrow ? "text-[#E63946]" : undefined}>
        {num} · {category}
      </Eyebrow>
      <Heading
        level={3}
        className={cn("mt-4", wide && "lg:text-[1.5rem] lg:tracking-[-0.02em]")}
      >
        {title}
      </Heading>
      <Text tone="muted" className="mt-3 max-w-[46ch]">
        {description}
      </Text>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
        {cta}
        {phoneHref && (
          <a
            href={phoneHref}
            className="relative z-10 inline-flex items-center gap-2 rounded-[6px] bg-accent px-4 py-2 text-body-s font-medium text-white transition-colors hover:bg-accent-hover"
            onClick={(e) => e.stopPropagation()}
          >
            <Phone className="size-3.5 shrink-0" aria-hidden />
            {phoneLabel ?? phoneHref}
          </a>
        )}
      </div>
    </article>
  );
}
