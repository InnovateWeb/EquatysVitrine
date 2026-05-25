"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { mainNav, siteConfig } from "@/lib/site";
import { getLenisInstance } from "@/lib/animations/lenisStore";
import { Logo } from "./Logo";

const navLinkBase =
  "rounded-[6px] px-3 py-2 text-body-s transition-colors focus-visible:outline-none";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const probeY = 32;
    const onScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>(
        "[data-section-theme]",
      );
      const first = sections[0];
      setScrolled(
        first ? first.getBoundingClientRect().top < -50 : window.scrollY > 50,
      );
      let dark = false;
      for (const s of sections) {
        const rect = s.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          dark = s.dataset.sectionTheme === "dark";
          break;
        }
      }
      setOverDark(dark);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const lenis = getLenisInstance();
    const scrollY = window.scrollY;
    const body = document.body;
    lenis?.stop();
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";
    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
      lenis?.start();
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navLink = cn(
    navLinkBase,
    overDark
      ? "text-white/75 hover:text-white focus-visible:text-white"
      : "text-muted hover:text-ink focus-visible:text-ink",
  );
  const surfaceBg = overDark
    ? "bg-[rgba(10,10,10,0.85)] backdrop-blur-md"
    : "bg-[rgba(250,250,250,0.85)] backdrop-blur-md";
  const surfaceBorder = overDark
    ? "border-[rgba(250,250,250,0.12)]"
    : "border-[rgba(10,10,10,0.1)]";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          !scrolled
            ? "border-b border-transparent"
            : cn("border-b", surfaceBorder, surfaceBg),
        )}
      >
        <Container>
          <div className="relative flex h-24 items-center gap-6">
            <Logo className="[&_img]:h-[4.25rem] lg:[&_img]:h-[4.75rem]" />

            {/* Navigation desktop — centrée absolument */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
              {mainNav.map((item) => {
                const hash = item.href.includes("#") ? item.href.split("#")[1] : null;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={navLink}
                    onClick={hash ? (e) => {
                      if (window.location.pathname === "/") {
                        e.preventDefault();
                        const lenis = getLenisInstance();
                        if (lenis) {
                          lenis.scrollTo(`#${hash}`, { duration: 1.2 });
                        } else {
                          document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                        }
                      }
                    } : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Urgence label + bouton téléphone desktop */}
            <div className="ml-auto hidden items-center gap-3 lg:flex">
              <span className={cn(
                "font-mono text-[10px] tracking-widest uppercase",
                overDark ? "text-white/40" : "text-muted",
              )}>
                Urgence 24/7
              </span>
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center gap-2 rounded-[6px] bg-accent px-4 h-9 text-body-s font-medium text-white transition-colors hover:bg-accent-hover"
              >
                <Phone className="size-3.5 shrink-0" aria-hidden />
                {siteConfig.phone.display}
              </a>
            </div>

            {/* Burger mobile */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
              className={cn(
                "ml-auto grid size-10 place-items-center rounded-[6px] lg:hidden",
                overDark ? "text-white" : "text-ink",
              )}
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </Container>
      </header>

      {/* Drawer mobile */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        {/* Voile */}
        <button
          type="button"
          tabIndex={mobileOpen ? 0 : -1}
          aria-label="Fermer le menu"
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-[rgba(10,10,10,0.4)] transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Panneau */}
        <div
          className={cn(
            "bg-surface absolute top-0 right-0 flex h-full w-[min(360px,85vw)] flex-col shadow-2xl transition-transform duration-300",
            overDark && "theme-dark",
            mobileOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="border-line flex h-16 items-center justify-end border-b px-6">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="text-ink grid size-10 place-items-center rounded-[6px]"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="space-y-1">
              {mainNav.map((item) => {
                const hash = item.href.includes("#") ? item.href.split("#")[1] : null;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-body-l text-ink block py-2"
                      onClick={(e) => {
                        if (hash && window.location.pathname === "/") {
                          e.preventDefault();
                          const lenis = getLenisInstance();
                          if (lenis) {
                            lenis.scrollTo(`#${hash}`, { duration: 1.2 });
                          } else {
                            document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                        setMobileOpen(false);
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
