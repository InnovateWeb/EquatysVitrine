import type { Metadata } from "next";
import { Suspense } from "react";
import { DemarrerModal } from "@/components/sections/demarrer/DemarrerModal";

const title = "Démarrer une demande";
const description =
  "Quelques questions pour orienter votre demande vers la bonne équipe Equatys — étude, réalisation, assainissement ou maintenance.";

export const metadata: Metadata = {
  title,
  description,
  // Page-lanceur de formulaire (nécessite ?situation=...) : sans paramètre elle
  // redirige vers /#parcours. On la garde hors de l'index Google.
  robots: { index: false, follow: true },
  openGraph: {
    title: `${title} — Equatys Energy`,
    description,
    url: "https://www.equatys.ch/demarrer",
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

export default function DemarrerPage() {
  // <Suspense> requis : DemarrerModal lit useSearchParams() pour le pré-remplissage.
  return (
    <Suspense>
      <DemarrerModal />
    </Suspense>
  );
}
