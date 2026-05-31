import type { Metadata } from "next";
import { LegalSection } from "@/components/sections/LegalSection";

const title = "Mentions légales";
const description =
  "Informations légales relatives au site equatys.ch : éditeur, hébergement, propriété intellectuelle et responsabilité.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.equatys.ch/mentions-legales" },
  robots: { index: false },
  openGraph: {
    title: `${title} — Equatys Energy`,
    description,
    url: "https://www.equatys.ch/mentions-legales",
    type: "website",
  },
};

const blocks = [
  {
    title: "Éditeur du site",
    content: (
      <ul>
        <li><strong>Raison sociale :</strong> Equatys Energy SARL</li>
        <li><strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)</li>
        <li><strong>IDE :</strong> CHE-255.632.676</li>
        <li><strong>Siège social :</strong> Chemin du Vallon 26, 1030 Bussigny, Suisse</li>
        <li><strong>Téléphone :</strong> <a href="tel:+41217012000">021 701 20 00</a></li>
        <li><strong>Courriel :</strong> <a href="mailto:info@equatys.ch">info@equatys.ch</a></li>
        <li><strong>Site web :</strong> <a href="https://www.equatys.ch">www.equatys.ch</a></li>
      </ul>
    ),
  },
  {
    title: "Hébergement",
    content: (
      <p>
        Ce site est hébergé par <strong>Infomaniak Network SA</strong>, Rue Eugène-Marziano 25,
        1227 Les Acacias (Genève), Suisse. Les données sont stockées exclusivement dans des
        centres de données suisses.{" "}
        <a href="https://www.infomaniak.com/en/legal/confidentiality-policy" target="_blank" rel="noopener noreferrer">
          Politique de confidentialité d&apos;Infomaniak
        </a>.
      </p>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, images, logos, graphismes,
        icônes) sont la propriété exclusive d&apos;Equatys Energy SARL ou de leurs auteurs
        respectifs. Toute reproduction, distribution, modification ou exploitation sans
        autorisation écrite préalable est strictement interdite.
      </p>
    ),
  },
  {
    title: "Limitation de responsabilité",
    content: (
      <p>
        Equatys Energy SARL s&apos;efforce de maintenir les informations publiées sur ce site
        à jour et exactes. Toutefois, elle ne peut garantir l&apos;exactitude, la complétude
        ou l&apos;actualité des contenus. La société décline toute responsabilité pour tout
        dommage direct ou indirect résultant de l&apos;utilisation du site ou de
        l&apos;impossibilité d&apos;y accéder.
      </p>
    ),
  },
  {
    title: "Liens hypertextes",
    content: (
      <p>
        Ce site peut contenir des liens vers des sites tiers. Equatys Energy SARL n&apos;exerce
        aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu
        ou leur disponibilité.
      </p>
    ),
  },
  {
    title: "Droit applicable",
    content: (
      <p>
        Les présentes mentions légales sont régies par le droit suisse. Tout litige relatif
        à l&apos;utilisation de ce site sera soumis à la juridiction exclusive des tribunaux
        compétents du Canton de Vaud.
      </p>
    ),
  },
];

export default function MentionsLegalesPage() {
  return <LegalSection eyebrow="Informations légales" title="Mentions légales" updatedAt="Mai 2026" blocks={blocks} />;
}
