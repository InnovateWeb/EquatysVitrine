import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import type { ReactNode } from "react";

interface LegalBlock {
  title: string;
  content: ReactNode;
}

interface LegalSectionProps {
  eyebrow: string;
  title: string;
  updatedAt: string;
  blocks: LegalBlock[];
}

export function LegalSection({ eyebrow, title, updatedAt, blocks }: LegalSectionProps) {
  return (
    <section
      data-section-theme="light"
      className="bg-white pt-40 pb-24"
    >
      <Container>
        {/* En-tête — même style que les sections de contenu du site */}
        <div className="max-w-[680px] lg:max-w-[65%]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading level={1} display="m" className="mt-4">
            {title}
          </Heading>
          <Text size="l" tone="muted" className="mt-6">
            Mis à jour en {updatedAt}
          </Text>
        </div>

        {/* Séparateur */}
        <div className="my-12 h-px bg-[rgba(10,10,10,0.08)]" />

        {/* Contenu */}
        <div className="flex flex-col gap-12">
          {blocks.map((block, i) => (
            <div key={i} className="flex flex-col gap-3">
              <h2 className="text-[17px] font-semibold text-ink">
                {i + 1}. {block.title}
              </h2>
              <div className="leading-relaxed text-muted [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:mt-2 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_ul]:pl-4 [&_li]:list-disc [&_li]:marker:text-accent">
                {block.content}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
