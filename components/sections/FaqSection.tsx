"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { useScrollReveal } from "@/lib/animations/useScrollReveal";
import { useTextReveal } from "@/lib/animations/useTextReveal";
import { FaqItem } from "./FaqItem";

// Contenu volontairement en lorem ipsum , les vraies réponses seront fournies
// par le client. Structure et format seuls comptent ici.
const faqs = [
  {
    question: "Je suis particulier, pas régie. Vous m'acceptez quand même ?",
    answer:
      "Absolument. Nous travaillons avec des propriétaires de villas, des locataires, des copropriétaires PPE, exactement comme avec les régies. Aucune taille de chantier minimum : qu'il s'agisse de remplacer un mitigeur ou d'équiper un immeuble entier, vous êtes traité avec la même attention.",
  },
  {
    question: "Vous intervenez sur ma commune ?",
    answer:
      "Notre base est à Bussigny. Nous intervenons en standard sur tout le Canton de Vaud et l'Arc lémanique (Genève, Fribourg, Valais). Pour les projets d'envergure, nous étudions toute demande en Suisse romande. Un appel suffit pour vérifier.",
  },
  {
    question: "Vous êtes une jeune entreprise. Est-ce vraiment fiable ?",
    answer:
      "Equatys a été fondée fin 2025, oui, et c'est précisément pour cela que nous nous démarquons. Notre équipe cumule des dizaines d'années d'expérience dans la technique du bâtiment. Quelques mois après le lancement, nous gérons déjà 84 immeubles sous contrat de maintenance et plus de 60 interventions hebdomadaires. Des régies comme Wincasa, Privera, Publiaz, ou des partenaires comme la BCV, UBS, AXA, SUVA, Helvetia nous ont déjà choisis. La structure est jeune, l'expertise ne l'est pas.",
  },
  {
    question: "Vous avez vraiment toutes les certifications nécessaires ?",
    answer:
      "Oui. Personne du métier OIBT pour l'électricité, agrément SSIGE pour le gaz et l'eau, attestation OFEV pour la manipulation des fluides frigorigènes (ORRChim annexe 2.10), partenariats avec experts CECB agréés. Toutes nos interventions sont conformes aux normes SIA, AEAI et MoPEC.",
  },
  {
    question: "Comment se passe une intervention d'urgence la nuit ou un dimanche ?",
    answer:
      "Vous appelez le 021 701 20 00. Un collaborateur répond, qualifie la situation, et déclenche immédiatement le technicien de piquet le plus proche. Notre véhicule d'urgence est en permanence équipé pour les pannes courantes : pompes, joints, raccords, pièces de chaudières, outillage de débouchage. Délai typique : 1 à 2 heures.",
  },
  {
    question: "Vous travaillez avec mon assurance en cas de sinistre ?",
    answer:
      "Oui, et c'est l'une de nos forces. Nous établissons un rapport technique reconnu par les assureurs (ECA, Mobilière, Vaudoise, AXA, Helvetia, Generali, Baloise, Zurich, Allianz, etc.), coordonnons avec l'expert mandaté, suivons le dossier de A à Z. Facturation directe à l'assurance possible (subrogation).",
  },
  {
    question: "Je veux juste un devis. Est-ce gratuit et sans engagement ?",
    answer:
      "Le premier rendez-vous d'évaluation est gratuit et sans engagement. Pour les études techniques complexes (CECB Plus, dimensionnement détaillé, expertise contradictoire) nous proposons un devis honoraires transparent, conforme aux barèmes SIA 108.",
  },
];

/**
 * Bloc FAQ (fond clair) , section unique en bas de la page d'accueil. Tête
 * (eyebrow + H2 + sous-titre) puis accordéon de 7 entrées en lorem ipsum,
 * plusieurs ouvrables simultanément. Révélation au scroll : eyebrow → H2 mot à
 * mot → sous-titre → entrées en stagger.
 */
export function FaqSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useScrollReveal(eyebrowRef, { y: 8, duration: 0.4 });
  useTextReveal(titleRef, { y: 12, stagger: 0.06, delay: 0.1 });
  useScrollReveal(subtitleRef, { y: 8, duration: 0.4, delay: 0.3 });
  useScrollReveal(listRef, {
    y: 8,
    duration: 0.4,
    stagger: 0.05,
    delay: 0.4,
    start: "top 85%",
  });

  return (
    <Section theme="light" id="faq">
      <Container>
        <div className="max-w-[680px] lg:max-w-[65%]">
          <Eyebrow ref={eyebrowRef}>FAQ</Eyebrow>
          <Heading ref={titleRef} level={2} display="m" className="mt-5">
            On répond aux questions que vous n&apos;osez pas poser.
          </Heading>
          <Text
            ref={subtitleRef}
            size="l"
            tone="muted"
            className="mt-6 max-w-[55ch]"
          >
            Les réponses aux interrogations les plus fréquentes. Si la vôtre
            n&apos;est pas ici, contactez-nous directement.
          </Text>
        </div>

        <div
          ref={listRef}
          className="border-line mt-[clamp(40px,6vw,64px)] border-b"
        >
          {faqs.map((f) => (
            <FaqItem key={f.question} question={f.question} answer={f.answer} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
