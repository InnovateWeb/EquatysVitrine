"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "urgency";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Si fourni → lien. Routes internes via <Link> Next.js ;
   *  tel:/mailto:/externe/# via <a> natif. Sinon, rendu <button>. */
  href?: string;
  /** Handler optionnel (analytics, ouverture de menu…). */
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  /** Cible du lien (ex: "_blank") quand href est fourni. */
  target?: string;
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
}

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[6px] font-medium leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)] disabled:pointer-events-none disabled:opacity-50";

const variantClass: Record<ButtonVariant, string> = {
  // Fond accent, texte BLANC pur (lisible et net sur le bleu, quel que soit le thème).
  primary: "bg-accent text-white hover:bg-accent-hover",
  // Transparent + bordure fine ; hover teinté via la couleur d'encre du thème courant.
  ghost:
    "border border-line bg-transparent text-ink hover:bg-[color-mix(in_srgb,var(--ink)_6%,transparent)]",
  // Variante "urgence" : accent + texte blanc + halo léger pour attirer l'œil (téléphone 24/7).
  urgency:
    "bg-accent text-white shadow-[0_2px_20px_-4px_rgba(0,74,173,0.55)] hover:bg-accent-hover",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-body-s",
  md: "h-11 px-5 text-body",
  lg: "h-12 px-6 text-body-l",
};

/** tel:, mailto:, ancre ou URL absolue → <a> natif plutôt que <Link> Next.js. */
function isPlainAnchor(href: string): boolean {
  return /^(https?:|tel:|mailto:|#)/.test(href);
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  type = "button",
  disabled,
  target,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variantClass[variant], sizeClass[size], className);

  if (href) {
    const rel = target === "_blank" ? "noopener noreferrer" : undefined;
    if (isPlainAnchor(href) || target === "_blank") {
      return (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={classes}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
}
