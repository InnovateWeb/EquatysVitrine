import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Equatys Energy pour vos projets de technique du bâtiment sur l'Arc lémanique. Réponse sous 24 h — urgences 24/7.",
};

export default function ContactPage() {
  return <ContactSection />;
}
