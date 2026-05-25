import type { Metadata } from "next";
import { Suspense } from "react";
import { DemarrerModal } from "@/components/sections/demarrer/DemarrerModal";

export const metadata: Metadata = {
  title: "Démarrer une demande",
  description:
    "Quelques questions pour orienter votre demande vers la bonne équipe Equatys — étude, réalisation, assainissement ou maintenance.",
};

export default function DemarrerPage() {
  // <Suspense> requis : DemarrerModal lit useSearchParams() pour le pré-remplissage.
  return (
    <Suspense>
      <DemarrerModal />
    </Suspense>
  );
}
