"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { useCounter } from "@/lib/animations/useCounter";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";
import { cn } from "@/lib/utils";

const stats = [
  { value: 84, suffix: "", label: "Immeubles sous contrat" },
  { value: 30, suffix: "+", label: "Interventions par semaine" },
  { value: 25, suffix: "+", label: "Clients partenaires" },
];

/**
 * Bloc Positionnement (fond clair). Crédibilise la jeune entreprise.
 * Révélation au scroll : eyebrow → H2 mot à mot → paragraphe → 3 chiffres
 * en stagger, chacun avec un compteur animé (une seule fois).
 */
export function PositionnementSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const c0 = useRef<HTMLSpanElement>(null);
  const c1 = useRef<HTMLSpanElement>(null);
  const c2 = useRef<HTMLSpanElement>(null);
  const counterRefs = [c0, c1, c2];

  // Séquence au scroll (chaque élément se révèle à son entrée, légers délais).
  useScrollReveal(eyebrowRef, { y: 8, duration: 0.4 });
  useTextReveal(titleRef, { y: 12, stagger: 0.06, delay: 0.1 });
  useScrollReveal(paragraphRef, { y: 8, duration: 0.4, delay: 0.25 });
  useScrollReveal(statsRef, {
    y: 8,
    duration: 0.4,
    stagger: 0.2,
    start: "top 80%",
  });

  // Compteurs (déclenchés une seule fois à l'entrée des chiffres).
  useCounter(c0, 84, { start: "top 85%" });
  useCounter(c1, 30, { suffix: "+", start: "top 85%" });
  useCounter(c2, 25, { suffix: "+", start: "top 85%" });

  return (
    <Section theme="light" id="positionnement">
      <Container>
        <div className="max-w-[680px] lg:max-w-[65%]">
          <Eyebrow ref={eyebrowRef}>Positionnement</Eyebrow>
          <Heading ref={titleRef} level={2} display="m" className="mt-5">
            L&apos;expertise reconnue d&apos;une équipe à votre service.
          </Heading>
        </div>

        <Text
          ref={paragraphRef}
          size="l"
          tone="muted"
          className="mt-6 max-w-[50ch]"
        >
          Opérationnelle sur l&apos;Arc lémanique, déjà la confiance de régies
          majeures, fonds immobiliers et compagnies d&apos;assurance. Une
          exigence technique sans concession, des partenariats choisis avec
          soin.
        </Text>

        <div
          ref={statsRef}
          className="mt-[clamp(48px,8vw,100px)] grid grid-cols-1 sm:grid-cols-3"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                // Barre verticale à gauche de CHAQUE colonne (desktop) — la 1re
                // tombe à l'aplomb de l'eyebrow/H2. Espacement identique partout.
                "border-line py-6 sm:border-l sm:px-10 sm:py-0",
                // Séparateur horizontal entre colonnes empilées (mobile, sauf 1re).
                i > 0 && "border-t sm:border-t-0",
              )}
            >
              <span
                ref={counterRefs[i]}
                className="text-ink block font-mono text-[clamp(48px,6vw,80px)] leading-none font-medium tabular-nums"
              >
                {stat.value}
                {stat.suffix}
              </span>
              <span className="text-mono-s text-muted mt-4 block font-mono uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
