"use client";

import { useRef } from "react";
import { Layers, ShieldCheck, UserCheck, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";
import { metiers } from "@/lib/site";
import { TradeCard } from "./TradeCard";

const usps = [
  {
    icon: UserCheck,
    label: "Un seul interlocuteur",
    sub: "Chargé d'affaires dédié",
  },
  {
    icon: Users,
    label: "Communication directe",
    sub: "Équipe sous un même toit",
  },
  {
    icon: ShieldCheck,
    label: "Une seule responsabilité",
    sub: "De la conception au SAV",
  },
];

/**
 * Bloc — Domaines techniques (fond clair). Huit métiers maîtrisés en interne.
 * Carte valeur ajoutée + bento grid 4 colonnes taille uniforme.
 */
export function TradesSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useTextReveal(titleRef, { y: 12, stagger: 0.06 });
  useScrollReveal(subtitleRef, { y: 8, duration: 0.4, delay: 0.2 });
  useScrollReveal(cardRef, { y: 10, duration: 0.4, delay: 0.3 });
  useScrollReveal(gridRef, {
    y: 12,
    duration: 0.4,
    stagger: 0.06,
    delay: 0.4,
    start: "top 80%",
  });

  return (
    <Section theme="light" id="competences" className="border-b-[1.5px] border-dashed border-line">
      <Container>
        {/* En-tête */}
        <div className="max-w-[680px] lg:max-w-[65%]">
          <Eyebrow>Activités</Eyebrow>
          <Heading ref={titleRef} level={2} display="m" className="mt-4">
            Nos domaines de compétences.
          </Heading>
          <Text
            ref={subtitleRef}
            size="l"
            tone="muted"
            className="mt-6 max-w-[55ch]"
          >
            Nous couvrons l'intégralité de la technique du bâtiment, de la
            conception de votre projet jusqu'à son entretien. Un seul mandataire
            pour l'ensemble de vos besoins, une seule responsabilité, un seul
            interlocuteur. Une transparence totale du devis à la mise en service.
          </Text>
        </div>

        {/* Carte proposition de valeur */}
        <div
          ref={cardRef}
          className="mt-[clamp(40px,6vw,64px)] rounded-[8px] border border-accent/25 bg-accent/[0.06] p-6"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
            <div className="flex-1">
              <div className="mb-5 flex size-12 items-center justify-center rounded-[10px] bg-accent/15">
                <Layers className="text-accent size-6" aria-hidden />
              </div>
              <p className="font-mono text-[0.65rem] tracking-[0.12em] text-accent uppercase mb-3">
                Notre proposition de valeur
              </p>
              <Heading level={3} className="text-[1.25rem] tracking-[-0.02em] sm:text-[1.375rem]">
                Travaux multi-techniques. Un seul partenaire.
              </Heading>
              <Text tone="muted" size="s" className="mt-3 max-w-[56ch]">
                Plusieurs corps de métier orchestrés en interne. Un planning
                unique, coordonné avec vous en toute transparence. Une
                responsabilité globale sur l'ensemble de l'ouvrage.
              </Text>
            </div>
          </div>

          {/* USP */}
          <div className="border-line mt-6 flex flex-col gap-2 border-t pt-6 sm:flex-row sm:gap-24">
            {usps.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="text-accent size-5 shrink-0" aria-hidden />
                <div className="border-l border-black/[0.10] pl-3">
                  <p className="text-body-s text-ink font-medium">{label}</p>
                  <p className="text-body-s text-muted">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grille 8 métiers */}
        <div
          ref={gridRef}
          className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metiers.map((m) => (
            <TradeCard key={m.slug} metier={m} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
