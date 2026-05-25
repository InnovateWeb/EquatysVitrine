import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  legalLinks,
  siteConfig,
} from "@/lib/site";
import { Logo } from "./Logo";

const linkClass =
  "text-body-s text-muted transition-colors hover:text-ink focus-visible:text-ink focus-visible:outline-none";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

const hours = [
  { day: "Lun – Jeu", time: "07:30 – 17:00" },
  { day: "Pause", time: "12:00 – 13:30" },
  { day: "Ven", time: "07:30 – 15:30" },
  { day: "Sam – Dim", time: "Fermé" },
  { day: "Service de piquet", time: "24/7" },
];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-section-theme="dark"
      className="theme-dark bg-surface text-ink border-t border-line"
    >
      <Container>
        <div className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12">

          {/* Marque */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="text-body-s text-muted max-w-[34ch] leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/equatys-energy"
                target="_blank"
                rel="noopener noreferrer"
                className="border-line text-muted hover:text-ink grid size-8 place-items-center rounded-[6px] border transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.instagram.com/equatysenergy/"
                target="_blank"
                rel="noopener noreferrer"
                className="border-line text-muted hover:text-ink grid size-8 place-items-center rounded-[6px] border transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Navigation + Métiers accordéon */}
          <nav aria-label="Navigation">
            <Eyebrow as="h2">Navigation</Eyebrow>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <Eyebrow as="h2">Contact</Eyebrow>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={siteConfig.phone.href} className="text-body-s text-muted hover:text-ink transition-colors">
                  {siteConfig.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="text-body-s text-muted hover:text-ink transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-body-s text-muted">
                {siteConfig.address.street}<br />
                {siteConfig.address.city}
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <Eyebrow as="h2">Horaires</Eyebrow>
            <ul className="mt-5 space-y-2.5">
              {hours.map(({ day, time }) => (
                <li key={day} className="flex items-baseline justify-between gap-3">
                  <span className="text-body-s text-muted">{day}</span>
                  <span className="text-body-s text-muted tabular-nums">{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-line flex flex-col items-center gap-4 border-t py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-s text-muted text-center sm:text-left">
            © {year} {siteConfig.legalName} — Tous droits réservés.
          </p>
          <nav aria-label="Liens légaux" className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
