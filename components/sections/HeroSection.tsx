"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";
import { HeroVideo } from "./HeroVideo";

/**
 * Bloc 01 — Hero plein écran. Fond vidéo (placeholder pour l'instant), overlay
 * sombre, contenu (eyebrow + H1 + sous-titre) dans le tiers inférieur, indicateur
 * de scroll. Timeline GSAP de révélation au chargement.
 *
 * Les 4 portes d'entrée par intention NE sont PAS dans le hero (cf correction) :
 * elles iront dans le bloc 03 « parcours par intention ».
 */
export function HeroSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Séquence au chargement : eyebrow → H1 (mot à mot) → sous-titre → scroll.
  useScrollReveal(eyebrowRef, {
    trigger: "load",
    delay: 0,
    y: 8,
    duration: 0.4,
  });
  useTextReveal(titleRef, {
    trigger: "load",
    delay: 0.2,
    y: 12,
    stagger: 0.05,
  });
  useScrollReveal(subtitleRef, {
    trigger: "load",
    delay: 1.0,
    y: 8,
    duration: 0.4,
  });
  useScrollReveal(scrollRef, {
    trigger: "load",
    delay: 1.5,
    y: 0,
    duration: 0.4,
  });

  return (
    <section
      data-section-theme="dark"
      className="theme-dark bg-surface relative flex min-h-dvh flex-col overflow-hidden"
    >
      <HeroVideo>
        <Container className="my-auto py-24">
          <div className="max-w-[820px]">
            <Eyebrow ref={eyebrowRef}>Technique du bâtiment</Eyebrow>
            <Heading ref={titleRef} level={1} display="xl" className="mt-5">
              Un seul partenaire
            </Heading>
            <Text
              ref={subtitleRef}
              size="l"
              className="mt-6 max-w-[60ch] text-[rgba(250,250,250,0.8)]"
            >
              Étude · Réalisation · Maintenance · Dépannage · Assainissement
            </Text>
          </div>
        </Container>
      </HeroVideo>

      {/* Indicateur de scroll (centré via flex, sans transform que GSAP écraserait) */}
      <div
        ref={scrollRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-10 z-20 flex flex-col items-center gap-2"
      >
        <span className="scroll-hint-line block h-8 w-px bg-white/60" />
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
