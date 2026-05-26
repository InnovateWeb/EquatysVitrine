import {
  ArrowRight,
  Award,
  Droplets,
  FileCheck,
  Leaf,
  Snowflake,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

/* -------------------------------------------------------------------------- */
/*  Utilitaires locaux                                                          */
/* -------------------------------------------------------------------------- */

const Divider = () => (
  <div className="border-t-[1.5px] border-dashed border-line" />
);

/* -------------------------------------------------------------------------- */
/*  Données                                                                     */
/* -------------------------------------------------------------------------- */

const engagements = [
  {
    title: "Un seul interlocuteur",
    desc: "Un chargé d'affaires dédié qui pilote l'ensemble des intervenants, du devis à la mise en service.",
  },
  {
    title: "Une seule responsabilité",
    desc: "Pas de cascade entre prestataires. Une responsabilité globale sur l'ouvrage, du chantier au SAV.",
  },
  {
    title: "Une transparence totale",
    desc: "Du planning au reporting, vous savez en permanence où en est votre projet.",
  },
];

const certifs = [
  {
    icon: Zap,
    title: "Personne du métier OIBT",
    desc: "Installations électriques (courant fort et faible)",
  },
  {
    icon: Droplets,
    title: "Agrément SSIGE",
    desc: "Gaz et eau (Société Suisse de l'Industrie du Gaz et des Eaux)",
  },
  {
    icon: Snowflake,
    title: "Attestation OFEV",
    desc: "Fluides frigorigènes, ORRChim annexe 2.10",
  },
  {
    icon: Award,
    title: "Chemisage agréé OFSP",
    desc: "Eau potable, chauffage, évacuations, garantie 10 ans",
  },
  {
    icon: Leaf,
    title: "Experts CECB agréés",
    desc: "Partenariats pour les certifications énergétiques cantonales",
  },
  {
    icon: FileCheck,
    title: "Honoraires SIA 108",
    desc: "Études techniques conformes aux barèmes officiels suisses",
  },
];

/* -------------------------------------------------------------------------- */
/*  Composant                                                                   */
/* -------------------------------------------------------------------------- */

export function AProposSection() {
  return (
    <>
      {/* ================================================================== */}
      {/* HERO — dark                                                          */}
      {/* ================================================================== */}
      <div className="theme-dark bg-[#0a0a0a]">
        <section
          data-section-theme="dark"
          className="relative flex min-h-dvh flex-col overflow-hidden"
        >
          <Container className="my-auto py-24">
            <Eyebrow>À propos</Eyebrow>
            <Heading level={1} display="xl" className="mt-5 max-w-[22ch]">
              La technique du bâtiment, en intégration totale.
            </Heading>
            <Text size="l" className="mt-6 max-w-[65ch] text-[rgba(250,250,250,0.8)]">
              Une entreprise vaudoise indépendante, basée à Bussigny, qui réunit
              sous un même toit l'ensemble des corps de métier de la technique du
              bâtiment. Pour les régies, les fonds immobiliers, les assurances et
              les propriétaires privés de l'Arc lémanique.
            </Text>
          </Container>
        </section>
        <Divider />
      </div>

      {/* ================================================================== */}
      {/* IDENTITÉ — blanc                                                     */}
      {/* ================================================================== */}
      <div className="bg-[#fafafa]">
        <section data-section-theme="light" className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <Eyebrow>Notre identité</Eyebrow>
            <Heading level={2} display="m" className="mt-4 max-w-[36ch]">
              Une structure jeune, une expertise mature.
            </Heading>
            <div className="mt-8 flex max-w-[72ch] flex-col gap-5">
              <Text size="l" tone="muted">
                Equatys Energy a été fondée fin 2025 avec une conviction simple :
                la technique du bâtiment moderne ne peut plus se traiter en silos.
                Une pompe à chaleur dialogue avec le photovoltaïque, la ventilation
                double-flux avec le chauffage, la GTB orchestre l'ensemble. Quand
                chaque métier reste isolé, ce sont les interfaces qui deviennent
                les premiers points de défaillance.
              </Text>
              <Text size="l" tone="muted">
                Notre équipe cumule plusieurs décennies d'expérience dans le
                chauffage, la ventilation, la climatisation, le sanitaire,
                l'électricité, la régulation et les énergies renouvelables.
              </Text>
            </div>
          </Container>
        </section>
        <Divider />
      </div>

      {/* ================================================================== */}
      {/* APPROCHE + CERTIFICATIONS — dark                                     */}
      {/* ================================================================== */}
      <div className="theme-dark bg-[#0a0a0a]">
        <section data-section-theme="dark" className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <Eyebrow>Notre approche</Eyebrow>
            <Heading level={2} display="m" className="mt-4 max-w-[36ch]">
              L'intégration n'est pas un slogan. C'est notre méthode.
            </Heading>
            <Text size="l" tone="muted" className="mt-8 max-w-[72ch]">
              Chez Equatys, l'étude commence toujours par l'ensemble. Nous
              dimensionnons, installons et régulons les installations comme un tout
              cohérent : production de chaleur, émission, distribution, ventilation,
              régulation, gestion de l'énergie. C'est dans cette vue d'ensemble
              que se gagnent réellement les économies d'énergie et la fiabilité
              long terme, pas dans la juxtaposition d'optimisations métier par métier.
            </Text>
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {engagements.map(({ title, desc }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 rounded-r-[12px] border border-white/[0.08] bg-[#0a0a0a] p-7 border-l-[3px] border-l-accent"
                >
                  <p className="text-body-l font-medium text-white">{title}</p>
                  <p className="text-body text-white/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <Divider />

        <section data-section-theme="dark" className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <Eyebrow>Engagements qualité</Eyebrow>
            <Heading level={2} display="m" className="mt-4 max-w-[36ch]">
              Des certifications et agréments documentés.
            </Heading>
            <Text size="l" tone="muted" className="mt-8 max-w-[72ch]">
              Toutes nos interventions sont menées dans le respect strict des
              normes suisses en vigueur. Nous disposons des qualifications
              réglementaires nécessaires à l'exercice de chaque métier.
            </Text>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {certifs.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 py-3"
                >
                  <Icon className="size-7 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-body font-medium text-white">{title}</p>
                    <p className="mt-0.5 text-body-s text-white/55 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-r-[8px] border-l-[3px] border-accent bg-accent/[0.06] px-6 py-4">
              <p className="text-body text-white/80 leading-relaxed">
                Nos interventions sont conformes aux normes{" "}
                <strong className="font-medium text-white">SIA</strong>{" "}
                (Société suisse des ingénieurs et architectes),{" "}
                <strong className="font-medium text-white">AEAI</strong>{" "}
                (Association des établissements cantonaux d'assurance incendie) et{" "}
                <strong className="font-medium text-white">MoPEC</strong>{" "}
                (Modèles de prescriptions énergétiques des cantons).
              </p>
            </div>
          </Container>
        </section>
        <Divider />
      </div>

      {/* ================================================================== */}
      {/* ZONE D'INTERVENTION — blanc                                          */}
      {/* ================================================================== */}
      <div className="bg-[#fafafa]">
        <section data-section-theme="light" className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <Eyebrow>Zone d'intervention</Eyebrow>
            <Heading level={2} display="m" className="mt-4 max-w-[30ch]">
              Présents sur tout l'Arc lémanique.
            </Heading>
            <div className="mt-8 flex max-w-[72ch] flex-col gap-5">
              <Text size="l" tone="muted">
                Notre siège opérationnel est situé à{" "}
                <strong className="font-medium text-ink">Bussigny</strong>{" "}
                (canton de Vaud), à quelques kilomètres de Lausanne, idéalement
                positionné pour intervenir rapidement sur l'ensemble de l'Arc lémanique.
              </Text>
              <Text size="l" tone="muted">
                En standard, nous intervenons sur les cantons de{" "}
                <strong className="font-medium text-ink">
                  Vaud, Genève, Fribourg et Valais
                </strong>
                . Pour les projets d'envergure (chemisage de tuyauterie,
                assainissement énergétique, rénovation multi-techniques), nous
                étudions toute demande sur le territoire de la{" "}
                <strong className="font-medium text-ink">Suisse romande</strong>.
              </Text>
              <Text size="l" tone="muted">
                Pour les urgences sous contrat d'entretien, notre service de piquet
                est disponible{" "}
                <strong className="font-medium text-ink">24h/24 et 7j/7</strong>,
                avec un délai d'intervention typique de 1 à 2 heures sur l'Arc lémanique.
              </Text>
            </div>
          </Container>
        </section>
        <Divider />
      </div>

      {/* ================================================================== */}
      {/* ENGAGEMENT FINAL — dark                                              */}
      {/* ================================================================== */}
      <div className="theme-dark bg-[#0a0a0a]">
        <section data-section-theme="dark" className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <Eyebrow>Notre engagement</Eyebrow>
            <Heading level={2} display="m" className="mt-4 max-w-[28ch]">
              Une promesse simple.
            </Heading>
            <div className="mt-8 flex max-w-[72ch] flex-col gap-5">
              <Text size="l" tone="muted">
                Nous voulons rendre la technique du bâtiment simple et lisible pour
                ceux qui en dépendent : propriétaires, gérants, syndics. Sans
                jargon, sans zones grises, sans renvois entre intervenants.
              </Text>
              <Text size="l" tone="muted">
                <strong className="font-medium text-white">
                  Cette page « À propos » n'est pas un exercice de communication.
                  C'est un engagement.
                </strong>
              </Text>
            </div>
          </Container>
        </section>

      </div>

      <Divider />

      {/* ================================================================== */}
      {/* CTA CONTACT — blanc                                                  */}
      {/* ================================================================== */}
      <div className="bg-[#fafafa]">
        <section data-section-theme="light" className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <div className="flex flex-col items-center text-center">
              <Eyebrow>Contact</Eyebrow>
              <Heading level={2} display="m" className="mt-4 max-w-[22ch]">
                Parlons de votre projet.
              </Heading>
              <Text size="l" tone="muted" className="mt-6 max-w-[50ch]">
                Décrivez-nous votre besoin en quelques mots. Notre équipe vous
                répond dans la journée ouvrée.
              </Text>
              <Button href="/contact" size="lg" className="mt-10">
                Nous contacter
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
