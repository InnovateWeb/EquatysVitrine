import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

const title = "Contact";
const description =
  "Contactez Equatys Energy pour vos projets de technique du bâtiment sur l'Arc lémanique. Formulaire, téléphone 24/7 et adresse à Bussigny.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://www.equatys.ch/contact",
  },
  openGraph: {
    title: `${title} — Equatys Energy`,
    description,
    url: "https://www.equatys.ch/contact",
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

export default function ContactPage() {
  return <ContactSection />;
}
