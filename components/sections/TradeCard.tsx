import {
  Droplets,
  Flame,
  Network,
  SlidersHorizontal,
  Snowflake,
  Sun,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { type Metier } from "@/lib/site";

const metierIcons: Record<string, LucideIcon> = {
  chauffage: Flame,
  ventilation: Wind,
  climatisation: Snowflake,
  sanitaire: Droplets,
  electricite: Zap,
  regulation: SlidersHorizontal,
  "energies-renouvelables": Sun,
  assainissement: Network,
};

const metierBadges: Record<string, string[]> = {
  assainissement: ["Agréé OFSP", "Garantie 10 ans"],
};

interface TradeCardProps {
  metier: Metier;
  className?: string;
}

export function TradeCard({ metier, className }: TradeCardProps) {
  const Icon = metierIcons[metier.slug] ?? Network;
  const badges = metierBadges[metier.slug];

  return (
    <article
      className={cn(
        "border-line flex flex-col rounded-[8px] border bg-black/[0.02] p-6 min-h-[280px] transition-colors duration-200 hover:bg-black/[0.04]",
        className,
      )}
    >
      <Icon className="text-accent size-7" aria-hidden />
      <Heading level={3} className="mt-5 text-[1rem] font-semibold">
        {metier.name}
      </Heading>
      <Text size="s" tone="muted" className="mt-2 flex-1">
        {metier.description}
      </Text>
      {badges && badges.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((b) => (
            <span
              key={b}
              className="border-line text-muted rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] tracking-[0.08em] uppercase"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
