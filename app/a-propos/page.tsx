import type { Metadata } from "next";
import { AProposSection } from "@/components/sections/AProposSection";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Equatys Energy SARL : tous les corps de métier de la technique du bâtiment sous un même toit à Bussigny. Chauffage, ventilation, sanitaire, électricité, énergies renouvelables sur l'Arc lémanique.",
};

export default function AProposPage() {
  return <AProposSection />;
}
