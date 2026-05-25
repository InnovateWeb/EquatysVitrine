import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

interface StepHeaderProps {
  title: string;
  subtitle?: string;
}

/** Tête d'étape dans la modale : titre (taille modérée) + sous-titre muté. */
export function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <div>
      <Heading
        level={2}
        className="text-[1.5rem] tracking-[-0.02em] sm:text-[1.75rem]"
      >
        {title}
      </Heading>
      {subtitle && (
        <Text size="s" tone="muted" className="mt-2">
          {subtitle}
        </Text>
      )}
    </div>
  );
}
