"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { prefersReducedMotion } from "@/lib/animations/prefersReducedMotion";
import { useIsomorphicLayoutEffect } from "@/lib/animations/useIsomorphicLayoutEffect";
import { useScrollProgressLine } from "@/lib/animations/useScrollProgressLine";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Écoute & contexte",
    description:
      "Premier rendez-vous gratuit. Nous écoutons votre besoin réel, votre budget, vos contraintes — avant de proposer la moindre solution.",
  },
  {
    num: "02",
    title: "Diagnostic technique",
    description:
      "Relevé sur site, mesures, inspection caméra si nécessaire, analyse des plans existants. Tout est documenté avant la moindre proposition.",
  },
  {
    num: "03",
    title: "Étude & variantes",
    description:
      "Calculs SIA, dimensionnement, deux à trois variantes chiffrées avec leurs pour/contre, retour sur investissement, subventions activables.",
  },
  {
    num: "04",
    title: "Réalisation",
    description:
      "Planning détaillé, équipe dédiée, contrôle qualité à chaque étape. Coordination multi-CVCSE en interne, donc aucune zone grise entre métiers.",
  },
  {
    num: "05",
    title: "Mise en service",
    description:
      "Commissioning méthodique, équilibrage, mesures de réception, procès-verbaux SSIGE/AEAI, DOE complet, formation utilisateur.",
  },
  {
    num: "06",
    title: "Suivi & maintenance",
    description:
      "Contrat de maintenance préventive, optimisation continue par exploitation des données, service de piquet 24/7 — nous restons votre interlocuteur sur la durée.",
  },
];

/**
 * Bloc 04 — Méthodologie (fond clair). Timeline verticale : le trait se trace
 * en scrub au scroll, chaque point s'allume et chaque étape apparaît (translateX)
 * à son entrée. Reduced-motion → trait plein + points allumés, sans animation.
 */
export function MethodologySection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLOListElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useScrollReveal(eyebrowRef, { y: 8, duration: 0.4 });
  useTextReveal(titleRef, { y: 12, stagger: 0.06, delay: 0.1 });
  useScrollReveal(subtitleRef, { y: 8, duration: 0.4, delay: 0.3 });
  useScrollProgressLine(timelineRef, lineRef);

  // Allumage des points + apparition des étapes (translateX), une seule fois.
  useIsomorphicLayoutEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    const stepEls = el.querySelectorAll<HTMLLIElement>("[data-step]");

    if (prefersReducedMotion()) {
      stepEls.forEach((s) => {
        const dot = s.querySelector<HTMLElement>("[data-dot]");
        if (dot) {
          dot.style.backgroundColor = "var(--color-accent)";
          dot.style.borderColor = "var(--color-accent)";
        }
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      stepEls.forEach((stepEl) => {
        const dot = stepEl.querySelector("[data-dot]");
        const content = stepEl.querySelector("[data-content]");
        const trigger = { trigger: stepEl, start: "top 75%", once: true };
        gsap.fromTo(
          content,
          { opacity: 0, x: -12 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: trigger,
          },
        );
        gsap.to(dot, {
          backgroundColor: "#004aad",
          borderColor: "#004aad",
          duration: 0.3,
          scrollTrigger: trigger,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      theme="light"
      id="methodologie"
      className="border-line border-t-[1.5px] border-dashed"
    >
      <Container>
        <div className="max-w-[680px] lg:max-w-[65%]">
          <Eyebrow ref={eyebrowRef}>Méthodologie</Eyebrow>
          <Heading ref={titleRef} level={2} display="m" className="mt-5">
            Une méthode rigoureuse, de la première visite à l&apos;exploitation.
          </Heading>
          <Text
            ref={subtitleRef}
            size="l"
            tone="muted"
            className="mt-6 max-w-[55ch]"
          >
            Six étapes structurantes appliquées à chaque projet — qu&apos;il
            s&apos;agisse d&apos;une villa, d&apos;un immeuble, ou d&apos;un
            parc entier. Notre rigueur n&apos;est jamais à géométrie variable.
          </Text>
        </div>

        <ol ref={timelineRef} className="relative mt-[clamp(48px,8vw,96px)]">
          {/* Trait de fond (faible) */}
          <span
            aria-hidden
            className="bg-line absolute top-2 bottom-2 left-[15px] w-px lg:left-[29px]"
          />
          {/* Trait de progression (accent, scrubbé) */}
          <span
            ref={lineRef}
            aria-hidden
            className="bg-accent absolute top-2 bottom-2 left-[15px] w-px origin-top lg:left-[29px]"
            style={{ transform: "scaleY(0)" }}
          />

          {steps.map((step, i) => (
            <li
              key={step.num}
              data-step
              className={cn(
                "relative pl-12 lg:pl-20",
                i > 0 && "mt-[clamp(56px,8vw,96px)]",
              )}
            >
              <span
                data-dot
                aria-hidden
                className="border-line bg-surface absolute top-2 left-[10px] size-3 rounded-full border lg:left-[24px]"
              />
              <div data-content>
                <Eyebrow>Étape {step.num}</Eyebrow>
                <Heading level={3} className="mt-3">
                  {step.title}
                </Heading>
                <Text tone="muted" className="mt-3 max-w-[60ch]">
                  {step.description}
                </Text>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
