"use client";

import { useState } from "react";
import { Phone, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { siteConfig } from "@/lib/site";
import { DarkMap } from "./DarkMap";

/* -------------------------------------------------------------------------- */
/*  Styles inputs                                                               */
/* -------------------------------------------------------------------------- */

const inputClass =
  "text-body text-ink placeholder:text-muted border-line h-12 w-full rounded-[6px] border bg-white/[0.03] px-4 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(0,74,173,0.2)]";

const labelClass = "text-body-s text-ink mb-2 block font-medium";

/* Séparateur pointillé identique à la page d'accueil */
const Divider = () => (
  <div className="border-t-[1.5px] border-dashed border-line" />
);

/* -------------------------------------------------------------------------- */
/*  Composant                                                                   */
/* -------------------------------------------------------------------------- */

export function ContactSection() {
  const [toast, setToast] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

  function showToast(type: "success" | "error") {
    setToast(type);
    setTimeout(() => setToast(null), 5000);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget; // sauvegardé avant le premier await
    const fd = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "contact",
          prenom: fd.get("prenom"),
          nom: fd.get("nom"),
          email: fd.get("email"),
          tel: fd.get("tel") || undefined,
          sujet: fd.get("sujet"),
          message: fd.get("message"),
        }),
      });
      if (!res.ok) throw new Error();
      form.reset();
      showToast("success");
    } catch {
      showToast("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <div className="theme-dark bg-[#0a0a0a] text-white">

      {/* ================================================================== */}
      {/* HERO                                                                 */}
      {/* ================================================================== */}
      <section
        data-section-theme="dark"
        className="relative flex min-h-dvh flex-col overflow-hidden"
      >
        <Container className="my-auto py-24">
          <Eyebrow>Contact</Eyebrow>
          <Heading level={1} display="xl" className="mt-5 max-w-[20ch]">
            Parlons de votre projet.
          </Heading>
          <Text size="l" className="mt-6 max-w-[60ch] text-[rgba(250,250,250,0.8)]">
            Quatre questions rapides pour cerner votre besoin. Notre équipe
            vous rappelle dans la journée ouvrée, souvent plus rapidement.
          </Text>
        </Container>
      </section>

      <Divider />

      {/* ================================================================== */}
      {/* BANDEAU URGENCE                                                      */}
      {/* ================================================================== */}
      <section data-section-theme="dark" className="py-[clamp(60px,8vw,100px)]">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className="mb-6 font-mono text-mono-s tracking-mono uppercase text-[#E63946]">
                Urgence
              </p>
              <Heading level={2} display="m" className="mb-5 max-w-[28ch]">
                Une urgence ? Un seul numéro, 24/7.
              </Heading>
              <Text size="l" tone="muted" className="max-w-[50ch]">
                Fuite d'eau, panne de chauffage, dégât, panne électrique : n'attendez pas.
                Un humain qualifié décroche, quelle que soit l'heure.
                Intervention sous 2h sur l'Arc lémanique.
              </Text>
            </div>
            <div className="lg:justify-self-end">
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-accent h-11 px-5 text-body font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {siteConfig.phone.display}
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      {/* ================================================================== */}
      {/* FORMULAIRE                                                           */}
      {/* ================================================================== */}
      <section data-section-theme="dark" className="py-[clamp(80px,12vw,160px)]">
        <Container>
          <Eyebrow>Formulaire</Eyebrow>
          <Heading level={2} display="m" className="mt-4">Écrivez-nous.</Heading>
          <Text tone="muted" className="mt-4 max-w-[50ch]">
            Décrivez votre besoin en quelques mots. Nous vous rappelons dans
            la journée ouvrée.
          </Text>

          <form onSubmit={handleSubmit} className="mt-16 flex flex-col gap-8" noValidate>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="prenom">
                    Prénom <span className="font-normal text-accent">*</span>
                  </label>
                  <input id="prenom" name="prenom" type="text" required autoComplete="given-name" placeholder="Jean" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="nom">
                    Nom <span className="font-normal text-accent">*</span>
                  </label>
                  <input id="nom" name="nom" type="text" required autoComplete="family-name" placeholder="Dupont" className={inputClass} />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="email">
                    E-mail <span className="font-normal text-accent">*</span>
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="jean@exemple.ch" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="tel">Téléphone</label>
                  <input id="tel" name="tel" type="tel" autoComplete="tel" placeholder="+41 79 123 45 67" className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="sujet">
                  Sujet <span className="font-normal text-accent">*</span>
                </label>
                <input id="sujet" name="sujet" type="text" required placeholder="Ex : Rénovation chauffage, panne électrique…" className={inputClass} />
              </div>

              <div>
                <label className={labelClass} htmlFor="message">
                  Message <span className="font-normal text-accent">*</span>
                </label>
                <textarea id="message" name="message" required rows={6} placeholder="Décrivez votre projet ou votre demande…" className={cn(inputClass, "h-auto resize-y py-3 min-h-[160px]")} />
              </div>

              <div className="flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-body-s text-white/50">
                  Champs marqués <span className="text-accent">*</span> obligatoires.
                </p>
                <Button type="submit" disabled={loading} className="shrink-0">
                  {loading ? "Envoi en cours…" : (
                    <><Send className="size-4" aria-hidden /> Envoyer le message</>
                  )}
                </Button>
              </div>

            </form>
        </Container>
      </section>

      <Divider />

      {/* ================================================================== */}
      {/* NOUS JOINDRE                                                         */}
      {/* ================================================================== */}
      <section data-section-theme="dark" className="py-[clamp(60px,8vw,100px)]">
        <Container>
          <Eyebrow>Nous joindre</Eyebrow>
          <Heading level={2} display="m" className="mt-4">Aucun standard, aucun répondeur.</Heading>
          <Text size="l" tone="muted" className="mt-4 max-w-[60ch]">
            Un humain qualifié décroche, quelle que soit l'heure. Pour une
            urgence, c'est même la voie la plus rapide.
          </Text>

          <div className="mt-16 grid gap-10 sm:grid-cols-3">
            <div className="flex flex-col gap-3 border-l-[3px] border-l-accent pl-5">
              <p className="font-mono text-mono-s tracking-mono uppercase text-white/50">Téléphone</p>
              <a href={siteConfig.phone.href} className="text-h3 font-medium leading-tight text-white transition-colors hover:text-accent">
                {siteConfig.phone.display}
              </a>
              <p className="font-mono text-mono-s text-white/50">24h/24, 7j/7</p>
            </div>
            <div className="flex flex-col gap-3 border-l-[3px] border-l-accent pl-5">
              <p className="font-mono text-mono-s tracking-mono uppercase text-white/50">E-mail</p>
              <a href={`mailto:${siteConfig.email}`} className="text-h3 font-medium leading-tight text-white transition-colors hover:text-accent">
                {siteConfig.email}
              </a>
              <p className="font-mono text-mono-s text-white/50">Réponse sous 24h ouvrées</p>
            </div>
            <div className="flex flex-col gap-3 border-l-[3px] border-l-accent pl-5">
              <p className="font-mono text-mono-s tracking-mono uppercase text-white/50">Adresse</p>
              <p className="text-h3 font-medium leading-tight text-white">{siteConfig.address.street}</p>
              <p className="font-mono text-mono-s text-white/50">{siteConfig.address.city}</p>
            </div>
          </div>
        </Container>
      </section>

      <Divider />

      {/* ================================================================== */}
      {/* CARTE                                                                */}
      {/* ================================================================== */}
      <section data-section-theme="dark" className="py-[clamp(80px,12vw,160px)]">
        <Container>
          <Eyebrow>Localisation</Eyebrow>
          <Heading level={2} display="m" className="mt-4">
            Bussigny, au cœur de l'Arc lémanique.
          </Heading>
          <Text size="l" tone="muted" className="mt-4 max-w-[60ch]">
            Notre base est idéalement située pour intervenir rapidement sur
            Lausanne, Morges, Renens, Nyon et l'ensemble de la région.
          </Text>
          <div className="mt-16 overflow-hidden rounded-[20px] border border-white/[0.12]">
            <DarkMap />
          </div>
        </Container>
      </section>

    </div>

      {/* Toast */}
      <div
        aria-live="polite"
        className={cn(
          "fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 transition-all duration-300",
          toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none",
        )}
      >
        {toast === "success" && (
          <div className="flex items-center gap-3 rounded-[10px] bg-[#16a34a] px-5 py-3.5 shadow-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><polyline points="20 6 9 17 4 12"/></svg>
            <p className="text-body-s font-medium text-white">Message envoyé avec succès !</p>
          </div>
        )}
        {toast === "error" && (
          <div className="flex items-center gap-3 rounded-[10px] bg-[#dc2626] px-5 py-3.5 shadow-xl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <p className="text-body-s font-medium text-white">Erreur lors de l'envoi. Veuillez réessayer.</p>
          </div>
        )}
      </div>
    </>
  );
}
