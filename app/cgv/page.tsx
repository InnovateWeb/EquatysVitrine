import type { Metadata } from "next";
import { LegalSection } from "@/components/sections/LegalSection";

const title = "Conditions générales de vente";
const description =
  "Conditions générales de vente et de prestation de services d'Equatys Energy SARL, applicables à toutes nos interventions de technique du bâtiment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://www.equatys.ch/cgv" },
  robots: { index: false },
  openGraph: {
    title: `${title} — Equatys Energy`,
    description,
    url: "https://www.equatys.ch/cgv",
    type: "website",
  },
};

const blocks = [
  {
    title: "Objet et champ d'application",
    content: (
      <p>
        Les présentes conditions générales de vente (CGV) s&apos;appliquent à
        l&apos;ensemble des prestations de services fournies par <strong>Equatys Energy SARL</strong>{" "}
        (ci-après «&nbsp;Equatys&nbsp;»), incluant les études, installations, réalisations,
        maintenances, dépannages et travaux d&apos;assainissement dans le domaine de la
        technique du bâtiment. Tout bon de commande ou acceptation de devis vaut acceptation
        pleine et entière des présentes CGV.
      </p>
    ),
  },
  {
    title: "Devis et commandes",
    content: (
      <>
        <p className="mb-3">
          Tout devis établi par Equatys est valable <strong>30 jours</strong> à compter de sa
          date d&apos;émission, sauf mention contraire. La commande n&apos;est définitive
          qu&apos;après réception de l&apos;acceptation écrite du devis (courrier, e-mail
          ou signature) par le client.
        </p>
        <p>
          Des travaux modificatifs ou supplémentaires non prévus au devis initial feront
          l&apos;objet d&apos;un avenant chiffré soumis à acceptation avant exécution.
        </p>
      </>
    ),
  },
  {
    title: "Prix et modalités de paiement",
    content: (
      <>
        <p className="mb-3">
          Les prix sont indiqués en francs suisses (CHF), hors taxe sur la valeur ajoutée
          (TVA) sauf indication contraire. La TVA applicable est celle en vigueur au jour de
          la facturation.
        </p>
        <ul>
          <li>Les factures sont payables dans un délai de <strong>30 jours</strong> à compter de leur date d&apos;émission.</li>
          <li>Tout retard de paiement entraîne de plein droit des intérêts moratoires au taux légal suisse en vigueur.</li>
          <li>Un acompte peut être demandé à la commande pour les prestations d&apos;un montant significatif.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Délais d'intervention et d'exécution",
    content: (
      <p>
        Les délais communiqués sont indicatifs et donnés de bonne foi. Equatys s&apos;engage
        à informer le client de tout retard prévisible. Les délais ne peuvent être garantis
        en cas de circonstances indépendantes de notre volonté (retard de livraison de
        matériaux, conditions météorologiques, décisions administratives, etc.).
        Les interventions d&apos;urgence sont assurées <strong>24h/24, 7j/7</strong>.
      </p>
    ),
  },
  {
    title: "Obligations du client",
    content: (
      <ul>
        <li>Permettre l&apos;accès aux locaux et installations concernés aux dates et heures convenues.</li>
        <li>Fournir les plans, documents techniques et informations nécessaires à l&apos;exécution des travaux.</li>
        <li>Vérifier la conformité des travaux à leur réception et signaler tout défaut apparent dans un délai de <strong>10 jours</strong>.</li>
      </ul>
    ),
  },
  {
    title: "Garanties et responsabilité",
    content: (
      <>
        <p className="mb-3">
          Equatys garantit ses travaux contre les défauts de conformité et les vices cachés
          selon les dispositions du Code des obligations suisse (CO). La garantie légale sur
          les ouvrages est de <strong>5 ans</strong> pour les défauts cachés (art. 371 CO).
        </p>
        <p>
          La responsabilité d&apos;Equatys est limitée aux dommages directs résultant d&apos;une
          faute prouvée dans l&apos;exécution de la prestation. Elle ne saurait être engagée
          pour des dommages indirects ou immatériels.
        </p>
      </>
    ),
  },
  {
    title: "Force majeure",
    content: (
      <p>
        Equatys ne pourra être tenue responsable de l&apos;inexécution ou du retard dans
        l&apos;exécution de ses obligations en cas de force majeure, incluant notamment les
        catastrophes naturelles, grèves, pandémies, pénuries de matières premières, ou
        toute autre cause échappant à son contrôle raisonnable.
      </p>
    ),
  },
  {
    title: "Droit applicable et for juridique",
    content: (
      <p>
        Les présentes CGV sont régies exclusivement par le <strong>droit suisse</strong>.
        Tout litige découlant de leur interprétation ou de leur exécution sera soumis à la
        compétence exclusive des tribunaux du <strong>Canton de Vaud</strong>, sous réserve
        d&apos;un recours à une procédure de médiation amiable préalable.
      </p>
    ),
  },
];

export default function CGVPage() {
  return (
    <LegalSection
      eyebrow="Documents contractuels"
      title="Conditions générales de vente"
      updatedAt="Mai 2026"
      blocks={blocks}
    />
  );
}
