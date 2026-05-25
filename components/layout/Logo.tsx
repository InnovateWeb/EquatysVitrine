import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/**
 * Logo Equatys Energy — rendu TEL QUEL depuis public/logo.svg (couleurs
 * d'origine de la maquette : « equatys » + flèches en gris #b9b9c3,
 * « energy » en bleu #004AAD). Aucune recoloration.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Equatys Energy — accueil"
      className={cn("inline-flex items-center", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG statique servi tel quel, optimisation next/image inutile */}
      <img
        src="/logo.svg"
        alt="Equatys Energy"
        width={462}
        height={185}
        className="h-[5rem] w-auto"
      />
    </Link>
  );
}
