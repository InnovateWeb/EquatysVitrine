import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Header, ScrollToTop, SmoothScrollProvider } from "@/components/layout";
import { siteConfig } from "@/lib/site";

// Variable fonts auto-hébergées (cf design system : --font-inter / --font-jetbrains-mono).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const BASE_URL = "https://www.equatys.ch";
const title = "Equatys Energy — Technique du bâtiment, partenaire unique";
const description =
  "Chauffage, ventilation, climatisation, sanitaire, électricité, régulation, énergies renouvelables et assainissement — un seul interlocuteur sur l'Arc lémanique. Urgences 24/7.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#004aad",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: siteConfig.name,
    title,
    description,
    url: BASE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Equatys Energy — Technique du bâtiment, partenaire unique sur l'Arc lémanique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Pas de vignette image dans les résultats Google (l'og-image reste
      // utilisée pour les partages sociaux, qui ne dépendent pas de ceci).
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  JSON-LD — LocalBusiness (rich snippets + Google Maps pack)                 */
/* -------------------------------------------------------------------------- */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#organization`,
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  description: siteConfig.tagline,
  url: BASE_URL,
  logo: `${BASE_URL}/logo.svg`,
  image: `${BASE_URL}/og-image.png`,
  telephone: "+41217012000",
  email: siteConfig.email,
  foundingDate: "2025",
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: "Bussigny",
    postalCode: "1030",
    addressRegion: "VD",
    addressCountry: "CH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.551,
    longitude: 6.5519,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "07:30",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Friday",
      opens: "07:30",
      closes: "15:30",
    },
  ],
  areaServed: [
    { "@type": "AdministrativeArea", name: "Canton de Vaud" },
    { "@type": "AdministrativeArea", name: "Canton de Genève" },
    { "@type": "AdministrativeArea", name: "Canton de Fribourg" },
    { "@type": "AdministrativeArea", name: "Canton du Valais" },
    { "@type": "Place", name: "Arc lémanique" },
  ],
  knowsAbout: [
    "Chauffage",
    "Pompes à chaleur",
    "Ventilation",
    "Climatisation",
    "Sanitaire",
    "Électricité",
    "Régulation et GTB",
    "Énergies renouvelables",
    "Photovoltaïque",
    "Chemisage de tuyauterie",
  ],
  sameAs: [
    "https://www.linkedin.com/company/equatys-energy",
    "https://www.instagram.com/equatysenergy/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SmoothScrollProvider>
          <ScrollToTop />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
