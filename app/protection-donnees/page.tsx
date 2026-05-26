import type { Metadata } from "next";
import { LegalSection } from "@/components/sections/LegalSection";

const title = "Protection des données";
const description =
  "Politique de confidentialité d'Equatys Energy SARL conformément à la loi fédérale suisse sur la protection des données (nLPD).";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.equatys.ch/protection-donnees" },
  robots: { index: false },
  openGraph: {
    title: `${title} — Equatys Energy`,
    description,
    url: "https://www.equatys.ch/protection-donnees",
    type: "website",
  },
};

const blocks = [
  {
    title: "Responsable du traitement",
    content: (
      <ul>
        <li><strong>Equatys Energy SARL</strong></li>
        <li>Chemin du Vallon 26, 1030 Bussigny</li>
        <li><a href="mailto:info@equatys.ch">info@equatys.ch</a></li>
        <li><a href="tel:+41217012000">021 701 20 00</a></li>
      </ul>
    ),
  },
  {
    title: "Données collectées et finalités",
    content: (
      <>
        <p className="mb-3">
          Dans le cadre de l&apos;utilisation de ce site, nous collectons uniquement les
          données strictement nécessaires au traitement de vos demandes :
        </p>
        <ul>
          <li><strong>Formulaire de contact :</strong> nom, prénom, adresse e-mail, numéro de téléphone (optionnel), objet et contenu du message. Ces données sont utilisées exclusivement pour répondre à votre demande.</li>
          <li><strong>Formulaire de démarrage de projet :</strong> type de demande, coordonnées, informations relatives à votre projet. Ces données permettent d&apos;orienter votre demande vers le bon interlocuteur.</li>
          <li><strong>Données de navigation :</strong> adresse IP, navigateur, pages visitées, collectées à des fins de sécurité et de bon fonctionnement du site. Aucun cookie de traçage tiers n&apos;est utilisé.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Base juridique du traitement",
    content: (
      <p>
        Le traitement de vos données repose sur votre <strong>consentement</strong> (art. 6
        nLPD) lorsque vous soumettez un formulaire, et sur notre <strong>intérêt légitime</strong>{" "}
        à assurer la sécurité et le bon fonctionnement du site pour les données de navigation.
      </p>
    ),
  },
  {
    title: "Durée de conservation",
    content: (
      <p>
        Les données issues de vos formulaires sont conservées pendant la durée nécessaire au
        traitement de votre demande, puis archivées pendant <strong>5 ans</strong> conformément
        aux obligations légales suisses en matière de conservation des correspondances
        commerciales, avant suppression définitive.
      </p>
    ),
  },
  {
    title: "Transmission à des tiers",
    content: (
      <p>
        Vos données ne sont ni vendues ni transmises à des tiers à des fins commerciales.
        Elles peuvent être communiquées à nos sous-traitants techniques (hébergeur Vercel)
        dans le cadre strict de leur mission, sous couvert d&apos;un accord de traitement
        des données conforme au droit suisse.
      </p>
    ),
  },
  {
    title: "Vos droits",
    content: (
      <>
        <p className="mb-3">
          Conformément à la loi fédérale sur la protection des données (nLPD), vous disposez des droits suivants :
        </p>
        <ul>
          <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles.</li>
          <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes.</li>
          <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données.</li>
          <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré.</li>
          <li><strong>Droit d&apos;opposition :</strong> vous opposer à un traitement fondé sur notre intérêt légitime.</li>
        </ul>
        <p className="mt-3">
          Pour exercer ces droits, contactez-nous à{" "}
          <a href="mailto:info@equatys.ch">info@equatys.ch</a>.
          Nous répondrons dans un délai de 30 jours.
        </p>
      </>
    ),
  },
  {
    title: "Sécurité",
    content: (
      <p>
        Nous mettons en place des mesures techniques et organisationnelles appropriées pour
        protéger vos données contre tout accès non autorisé, perte, destruction ou
        divulgation. Le site est servi exclusivement en HTTPS.
      </p>
    ),
  },
  {
    title: "Modifications de la politique",
    content: (
      <p>
        Cette politique peut être mise à jour pour refléter des évolutions légales ou
        opérationnelles. La date de dernière mise à jour est indiquée en haut de cette page.
        Nous vous encourageons à la consulter régulièrement.
      </p>
    ),
  },
  {
    title: "Contact et réclamations",
    content: (
      <p>
        Pour toute question relative à la protection de vos données ou pour déposer une
        réclamation, contactez-nous à{" "}
        <a href="mailto:info@equatys.ch">info@equatys.ch</a>. Vous avez également le droit
        de vous adresser au{" "}
        <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer">
          Préposé fédéral à la protection des données et à la transparence (PFPDT)
        </a>.
      </p>
    ),
  },
];

export default function ProtectionDonneesPage() {
  return (
    <LegalSection
      eyebrow="Confidentialité (nLPD)"
      title="Protection des données"
      updatedAt="Mai 2026"
      blocks={blocks}
    />
  );
}
