import type { Metadata } from "next";
import { AProposSection } from "@/components/sections/AProposSection";

const title = "À propos";
const description =
  "Equatys Energy SARL : tous les corps de métier de la technique du bâtiment sous un même toit à Bussigny. Chauffage, ventilation, sanitaire, électricité, énergies renouvelables sur l'Arc lémanique.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.equatys.ch/a-propos",
  },
  openGraph: {
    title: `${title} — Equatys Energy`,
    description,
    url: "https://www.equatys.ch/a-propos",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} — Equatys Energy`,
    description,
    images: ["/og-image.png"],
  },
};

export default function AProposPage() {
  return <AProposSection />;
}
