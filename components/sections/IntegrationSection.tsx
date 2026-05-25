"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Marquee } from "@/components/ui/Marquee";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";

const metiersKeywords = [
  "Chauffage",
  "Ventilation",
  "Climatisation",
  "Sanitaire",
  "Électricité",
  "Régulation",
  "Énergies renouvelables",
  "Assainissement",
];

/**
 * Bloc 05 — Intégration des métiers (fond sombre). LE bloc différenciateur :
 * diptyque « Le problème » / « Notre approche » + marquee des 8 métiers.
 * 2ᵉ rupture sombre du parcours (après le Positionnement).
 */
export function IntegrationSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const diptyqueRef = useRef<HTMLDivElement>(null);

  useScrollReveal(eyebrowRef, { y: 8, duration: 0.4 });
  useTextReveal(titleRef, { y: 12, stagger: 0.06, delay: 0.1 });
  useScrollReveal(marqueeRef, { y: 8, duration: 0.4, delay: 0.5 });
  useScrollReveal(diptyqueRef, { y: 12, duration: 0.6, delay: 0.7 });

  return (
    <Section theme="dark" id="integration">
      <Container>
        <div className="max-w-[760px] lg:max-w-[70%]">
          <Eyebrow ref={eyebrowRef}>Intégration</Eyebrow>
          <Heading ref={titleRef} level={2} display="m" className="mt-5">
            Vos installations ne sont pas indépendantes. Nos métiers non plus.
          </Heading>
        </div>

        {/* Marquee des 8 métiers — défilement continu subtil */}
        <div ref={marqueeRef} className="mt-16">
          <Marquee
            items={metiersKeywords}
            durationSec={40}
            className="text-body-s font-mono tracking-[0.15em] text-[rgba(250,250,250,0.3)] uppercase"
          />
        </div>

        {/* Diptyque : le problème vs notre approche */}
        <div
          ref={diptyqueRef}
          className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-0"
        >
          <div className="lg:pr-16">
            <Eyebrow>Le problème</Eyebrow>
            <Text
              size="l"
              className="mt-4 max-w-[45ch] text-[rgba(250,250,250,0.85)]"
            >
              La pompe à chaleur dépend du photovoltaïque. La ventilation
              double-flux dialogue avec le chauffage. La régulation GTB
              orchestre tout. Quand chaque métier est traité isolément, les
              interfaces deviennent vos pires ennemis.
            </Text>
          </div>
          <div className="border-line lg:border-l lg:pl-16">
            <Eyebrow tone="accent">Notre approche</Eyebrow>
            <Text
              size="l"
              className="mt-4 max-w-[45ch] text-[rgba(250,250,250,0.85)]"
            >
              Chez Equatys, l&apos;étude commence toujours par l&apos;ensemble.
              Nous dimensionnons, installons et régulons l&apos;intégralité du
              système comme un tout cohérent. C&apos;est là que se gagnent les
              économies d&apos;énergie et la fiabilité.
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  );
}
