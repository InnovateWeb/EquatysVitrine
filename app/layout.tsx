import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Header, SmoothScrollProvider } from "@/components/layout";
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

const title = "Equatys Energy — Technique du bâtiment, partenaire unique";
const description =
  "Chauffage, ventilation, climatisation, sanitaire, électricité, régulation, énergies renouvelables et assainissement — un seul interlocuteur sur l'Arc lémanique. Urgences 24/7.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.equatys.ch"),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "fr_CH",
    siteName: siteConfig.name,
    title,
    description,
    url: "/",
  },
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
      <body className="flex min-h-dvh flex-col">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
