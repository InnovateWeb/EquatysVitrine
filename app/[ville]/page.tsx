import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Phone, ArrowRight, Zap, Wrench, Thermometer, Droplets } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LocalTimeline } from "@/components/sections/LocalTimeline";
import { villes, getVilleBySlug } from "@/lib/data/villes";
import { siteConfig } from "@/lib/site";

const BASE_URL = "https://www.equatys.ch";

/* -------------------------------------------------------------------------- */
/*  SSG — génère les 12 pages statiques                                        */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return villes.map((v) => ({ ville: v.slug }));
}

/* -------------------------------------------------------------------------- */
/*  Métadonnées SEO par ville                                                  */
/* -------------------------------------------------------------------------- */

export async function generateMetadata(
  { params }: { params: Promise<{ ville: string }> }
): Promise<Metadata> {
  const { ville: slug } = await params;
  const ville = getVilleBySlug(slug);
  if (!ville) return {};

  const title = `Dépannage urgence à ${ville.name} — Equatys Energy`;
  const description = `Panne de chauffage, plomberie, électricité à ${ville.name} ? Equatys Energy intervient sous 1 à 2 heures, 24h/24, 7j/7. Appelez le ${siteConfig.phone.display}.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${ville.slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${ville.slug}`,
    },
    robots: { index: true, follow: true },
  };
}

/* -------------------------------------------------------------------------- */
/*  Services                                                                    */
/* -------------------------------------------------------------------------- */

const services = [
  {
    icon: Thermometer,
    title: "Panne de chauffage",
    description: "Plus de chauffage, radiateurs froids, chaudière en défaut. Intervention prioritaire.",
  },
  {
    icon: Droplets,
    title: "Panne eau chaude",
    description: "Chauffe-eau, boiler, production d'eau chaude sanitaire. Diagnostic et réparation.",
  },
  {
    icon: Zap,
    title: "Urgence électrique",
    description: "Disjoncteur, panne de courant, court-circuit. Intervention conforme OIBT.",
  },
  {
    icon: Wrench,
    title: "Dépannage plomberie",
    description: "Fuite, écoulement bouché, rupture de canalisation. Intervention rapide.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Page                                                                        */
/* -------------------------------------------------------------------------- */

export default async function VillePage(
  { params }: { params: Promise<{ ville: string }> }
) {
  const { ville: slug } = await params;
  const ville = getVilleBySlug(slug);
  if (!ville) notFound();

  return (
    <>
      {/* ── HERO ── */}
      <section
        data-section-theme="dark"
        className="theme-dark bg-surface text-ink min-h-dvh flex items-center"
      >
        <Container>
          <div className="max-w-[720px]">
            <Eyebrow className="text-[#E63946]">Urgence 24h/24 · {ville.name}</Eyebrow>
            <Heading level={1} display="l" className="mt-4">
              Dépannage chauffage d&apos;urgence à {ville.name}.
            </Heading>
            <Text size="l" tone="muted" className="mt-6 max-w-[55ch]">
              Panne de chauffage, plus d&apos;eau chaude, fuite ? Equatys Energy intervient
              à {ville.name} et ses environs sous <strong className="text-ink">1 à 2 heures</strong>,
              7j/7, 24h/24.
            </Text>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center gap-2 rounded-[6px] bg-[#E63946] px-6 py-3.5 font-medium text-white transition-colors hover:bg-red-600"
              >
                <Phone className="size-4" aria-hidden />
                {siteConfig.phone.display} — Appel d&apos;urgence
              </a>
              <a
                href="/demarrer?situation=urgence"
                className="border-line inline-flex items-center gap-2 rounded-[6px] border px-6 py-3.5 font-medium text-ink transition-colors hover:border-white/30"
              >
                Formulaire urgence
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── SERVICES ── */}
      <div className="bg-[#fafafa]">
        <section data-section-theme="light" className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <div className="max-w-[600px]">
              <Eyebrow>Nos interventions à {ville.name}</Eyebrow>
              <Heading level={2} display="m" className="mt-4">
                On intervient sur toutes les pannes.
              </Heading>
              <Text size="l" tone="muted" className="mt-4">
                Chauffage, plomberie, électricité, ventilation — un seul numéro,
                une seule équipe.
              </Text>
            </div>
            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 rounded-r-[12px] border border-black/[0.08] bg-white p-7 border-l-[3px] border-l-accent"
                >
                  <Icon className="size-6 shrink-0 text-accent" aria-hidden />
                  <p className="text-body-l font-medium text-[#0a0a0a]">{title}</p>
                  <p className="text-body text-black/50 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>

      {/* ── PROCESSUS ── */}
      <div className="theme-dark bg-[#0a0a0a]">
        <section data-section-theme="dark" className="py-[clamp(80px,12vw,160px)]">
          <Container>
            <div className="max-w-[600px] mb-14">
              <Eyebrow>Comment ça se passe</Eyebrow>
              <Heading level={2} display="m" className="mt-4">
                De l&apos;appel à la réparation.
              </Heading>
            </div>
            <LocalTimeline />
          </Container>
        </section>
      </div>

      {/* ── ZONES ── */}
      <Section theme="light">
        <Container>
          <div className="max-w-[600px]">
            <Eyebrow>Zone d&apos;intervention</Eyebrow>
            <Heading level={2} display="m" className="mt-4">
              On intervient autour de {ville.name}.
            </Heading>
            <Text size="l" tone="muted" className="mt-4">
              Nos techniciens couvrent {ville.name} et toutes les communes
              environnantes, généralement en moins de 30 minutes.
            </Text>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {ville.zones.map((zone) => (
              <span
                key={zone}
                className="border-line rounded-full border px-4 py-1.5 text-body-s text-ink"
              >
                {zone}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA FINAL ── */}
      <section
        data-section-theme="dark"
        className="theme-dark bg-surface text-ink py-[clamp(60px,10vw,100px)]"
      >
        <Container>
          <div className="flex flex-col items-center text-center gap-6 max-w-[560px] mx-auto">
            <Eyebrow className="text-[#E63946]">Urgence maintenant</Eyebrow>
            <Heading level={2} display="m">
              Une panne à {ville.name} ? On arrive.
            </Heading>
            <Text size="l" tone="muted">
              Appelez-nous directement ou remplissez le formulaire —
              nous vous rappelons dans les 5 minutes.
            </Text>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center gap-2 rounded-[6px] bg-[#E63946] px-6 py-3.5 font-medium text-white transition-colors hover:bg-red-600"
              >
                <Phone className="size-4" aria-hidden />
                {siteConfig.phone.display}
              </a>
              <Button variant="ghost" href="/demarrer?situation=urgence">
                Formulaire urgence
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
