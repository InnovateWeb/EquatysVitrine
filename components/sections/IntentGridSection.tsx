"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";
import { siteConfig } from "@/lib/site";
import { IntentCard } from "./IntentCard";

const intents = [
  {
    num: "01",
    category: "Urgent",
    title: "J'ai une panne ou une urgence.",
    description:
      "Plus de chauffage, plus d'eau chaude, écoulement bouché, ventilation en panne. 24h/24 et 7j/7.",
    ctaLabel: "Continuer",
    href: "/demarrer?situation=urgence",
    variant: "link" as const,
    wide: true,
    urgentEyebrow: true,
    phoneHref: siteConfig.phone.href,
    phoneLabel: siteConfig.phone.display,
  },
  {
    num: "02",
    category: "Concevoir",
    title: "J'ai un projet à concevoir.",
    description:
      "Étude, concept énergétique, dimensionnement, plans d'exécution, CECB. Pour cadrer techniquement votre projet.",
    ctaLabel: "Continuer",
    href: "/demarrer?situation=etude",
    variant: "link" as const,
  },
  {
    num: "03",
    category: "Construire",
    title: "J'ai des travaux à réaliser.",
    description:
      "Construction neuve, rénovation complète, installation ponctuelle. De la villa au bâtiment industriel.",
    ctaLabel: "Continuer",
    href: "/demarrer?situation=realisation",
    variant: "link" as const,
  },
  {
    num: "04",
    category: "Assainir",
    title: "J'assainis mon bâtiment.",
    description:
      "Remplacement chaudière mazout ou gaz, rénovation énergétique, mise aux normes LVLEne, dossier de subventions, chemisage de tuyauterie.",
    ctaLabel: "Continuer",
    href: "/demarrer?situation=assainissement",
    variant: "link" as const,
  },
  {
    num: "05",
    category: "Entretenir",
    title: "J'entretiens mes installations.",
    description:
      "Contrat d'entretien régulier, maintenance préventive et corrective, adoucisseurs, traitement d'eau, contrôle OIBT.",
    ctaLabel: "Continuer",
    href: "/demarrer?situation=maintenance",
    variant: "link" as const,
  },
];

/**
 * Bloc Parcours par intention (fond sombre). 6 cartes pour que le visiteur
 * s'identifie en quelques secondes. Révélation au scroll : H2 mot à mot →
 * sous-titre → cartes en stagger. (Pas d'eyebrow.)
 */
export function IntentGridSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef, { y: 12, stagger: 0.06 });
  useScrollReveal(subtitleRef, { y: 8, duration: 0.4, delay: 0.2 });
  useScrollReveal(gridRef, {
    y: 12,
    duration: 0.4,
    stagger: 0.08,
    delay: 0.4,
    start: "top 80%",
  });

  return (
    <Section theme="dark" id="parcours">
      <Container>
        <div className="max-w-[680px] lg:max-w-[65%]">
          <Heading ref={titleRef} level={2} display="m">
            Quelle est votre situation ?
          </Heading>
          <Text
            ref={subtitleRef}
            size="l"
            tone="muted"
            className="mt-6 max-w-[55ch]"
          >
            Choisissez la situation qui vous correspond. 
          </Text>
        </div>

        <div
          ref={gridRef}
          className="mt-[clamp(48px,8vw,80px)] grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {intents.map((intent) => (
            <IntentCard key={intent.num} {...intent} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
