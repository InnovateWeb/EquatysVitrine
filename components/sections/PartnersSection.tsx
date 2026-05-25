"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Marquee } from "@/components/ui/Marquee";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";

// Partenaires réels répartis sur 3 marquees. Les encadrés pointillés sont des
// emplacements logos — le client remplacera chacun par le vrai logo.
const partnerRows = [
  {
    direction: "left" as const,
    labels: [
      "Base Aparthotels",
      "Omnilos",
      "Maison du Sport",
      "AXA",
      "Consult Building",
      "Roland Savary Immobilier",
      "GreenImmo",
      "Eldora",
      "SUVA",
    ],
  },
  {
    direction: "right" as const,
    labels: [
      "Luigia",
      "Publiaz Immobilier",
      "Energa",
      "Gendre & Emonet",
      "MGE-Immo",
      "Fondation Graap",
      "UBS",
      "Café du Nord",
      "BCV",
    ],
  },
  {
    direction: "left" as const,
    labels: [
      "Wincasa",
      "ABC Stores",
      "Helsana",
      "Helvetia",
      "Beefor",
      "Dumnica SA",
      "Privera",
      "Centre Auto des Marais",
    ],
  },
];

/**
 * Bloc 08 — Partenaires (fond sombre). Social proof visuel : un trio de marquees
 * (sens alterné gauche / droite / gauche) de logos placeholder typés, suggérant
 * un écosystème dense sans citations ni chiffres. Pleine largeur viewport, bords
 * estompés. Apparition au scroll : eyebrow → H2 → sous-titre → marquees en stagger.
 */
export function PartnersSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const marqueesRef = useRef<HTMLDivElement>(null);

  useScrollReveal(eyebrowRef, { y: 8, duration: 0.4 });
  useTextReveal(titleRef, { y: 12, stagger: 0.06, delay: 0.1 });
  useScrollReveal(subtitleRef, { y: 8, duration: 0.4, delay: 0.3 });
  useScrollReveal(marqueesRef, {
    y: 8,
    duration: 0.3,
    stagger: 0.15,
    delay: 0.5,
    start: "top 80%",
  });

  return (
    <Section theme="dark" id="partenaires">
      <Container>
        <div className="max-w-[680px] lg:max-w-[65%]">
          <Eyebrow ref={eyebrowRef}>Écosystème</Eyebrow>
          <Heading ref={titleRef} level={2} display="m" className="mt-5">
            Plus de 25 partenaires déjà à nos côtés.
          </Heading>
          <Text
            ref={subtitleRef}
            size="l"
            tone="muted"
            className="mt-6 max-w-[60ch]"
          >
            Régies, entreprises, hôtels, restaurants, fondations, propriétaires
            institutionnels, compagnies d&apos;assurance. Des partenariats solides, choisis avec exigence.
          </Text>
        </div>
      </Container>

      {/* Trio de marquees — calé sur la largeur max du site (Container) */}
      <Container>
        <div
          ref={marqueesRef}
          className="mt-[clamp(48px,8vw,80px)] flex flex-col gap-6"
        >
          {partnerRows.map((row, r) => (
            <Marquee
              key={r}
              direction={row.direction}
              durationSec={50}
              separator={null}
              itemClassName="pr-6"
              fade
              items={row.labels.map((label) => (
                <ImagePlaceholder
                  key={label}
                  ratio="16:7"
                  label={label}
                  className="w-[170px] shrink-0 rounded-full p-3 whitespace-normal"
                />
              ))}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
