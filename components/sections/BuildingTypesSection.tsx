"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";

const buildingTypes = [
  {
    num: "01",
    type: "Villa / Maison individuelle",
    target: "Propriétaire occupant",
  },
  { num: "02", type: "Immeuble locatif", target: "Régie & propriétaire" },
  { num: "03", type: "PPE / Copropriété", target: "Administrateur" },
  { num: "04", type: "Tertiaire / Bureau", target: "Entreprise" },
  { num: "05", type: "Commerce / Restaurant", target: "Exploitant" },
  { num: "06", type: "Industriel", target: "Process, atelier" },
  { num: "07", type: "Médical / EMS", target: "Cabinet, clinique" },
  { num: "08", type: "Hôtellerie", target: "Hôtel, parahôtelier" },
];

/**
 * Bloc 06 — Typologie de bâtiments (fond clair). Entrée par TYPE d'objet
 * (complément du bloc 03 qui propose l'entrée par intention). Format « index
 * typographique » : liste numérotée, hover net, énumération au scroll (translateX).
 */
export function BuildingTypesSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useScrollReveal(eyebrowRef, { y: 8, duration: 0.4 });
  useTextReveal(titleRef, { y: 12, stagger: 0.06, delay: 0.1 });
  useScrollReveal(subtitleRef, { y: 8, duration: 0.4, delay: 0.3 });
  useScrollReveal(listRef, {
    x: -12,
    y: 0,
    duration: 0.5,
    stagger: 0.07,
    delay: 0.5,
    start: "top 80%",
  });

  return (
    <Section
      theme="light"
      id="typologies"
      className="border-line border-t-[1.5px] border-dashed"
    >
      <Container>
        <div className="max-w-[680px] lg:max-w-[65%]">
          <Eyebrow ref={eyebrowRef}>Typologies</Eyebrow>
          <Heading ref={titleRef} level={2} display="m" className="mt-5">
            Vous êtes plutôt…
          </Heading>
          <Text
            ref={subtitleRef}
            size="l"
            tone="muted"
            className="mt-6 max-w-[55ch]"
          >
            Chaque type de bâtiment a ses spécificités : normes, réseaux,
            intervenants. Nous adaptons notre approche au vôtre.
          </Text>
        </div>

        <ul
          ref={listRef}
          className="border-line mt-[clamp(40px,6vw,64px)] border-b"
        >
          {buildingTypes.map((b) => (
            <li key={b.num}>
              <a
                href="#"
                aria-label={`${b.type} — ${b.target}`}
                className="group border-line flex items-center gap-5 border-t py-7 transition-colors hover:bg-[rgba(10,10,10,0.02)]"
              >
                <span className="text-body group-hover:text-accent w-10 shrink-0 font-mono text-[rgba(10,10,10,0.4)] transition-colors sm:w-20">
                  {b.num}
                </span>
                <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <span className="text-ink text-[1.25rem] font-medium tracking-[-0.02em] transition-transform group-hover:translate-x-2 sm:text-[1.5rem]">
                    {b.type}
                  </span>
                  <span className="sm:text-body-s font-mono text-[0.8rem] text-[rgba(10,10,10,0.6)] sm:w-[280px] sm:shrink-0">
                    {b.target}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
