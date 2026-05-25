// Configuration centralisée du site — source unique pour Header, Footer et pages.
// Le téléphone d'urgence doit être présent sur toutes les pages (cf architecture).

export const siteConfig = {
  name: "Equatys Energy",
  legalName: "Equatys Energy SARL",
  tagline: "De l'étude à l'entretien, Equatys Energy accompagne particuliers, régies et professionnels dans tous leurs projets de technique du bâtiment.",
  location: "Bussigny — actif sur l'Arc lémanique.",
  phone: {
    display: "021 701 20 00",
    href: "tel:+41217012000",
  },
  emergencyLabel: "Urgence 24/7",
  email: "info@equatys.ch",
  address: {
    street: "Chemin du Vallon 26",
    city: "1030 Bussigny",
  },
} as const;

export interface Metier {
  slug: string;
  name: string;
  /** Sous-titre court affiché dans le mega-menu. */
  subtitle: string;
  /** Description technique (bloc 07 « Domaines techniques » + futures sous-pages). */
  description: string;
}

/** Les 8 métiers techniques. */
export const metiers: Metier[] = [
  {
    slug: "chauffage",
    name: "Chauffage",
    subtitle: "PAC, chaudières, solaire",
    description:
      "Pompes à chaleurs, géothermie, chaudières, cad, distributions, émissions de chaleur, radiateurs, plancher chauffant, convecteurs, équilibrage, traitement d’eau.",
  },
  {
    slug: "ventilation",
    name: "Ventilation",
    subtitle: "Double flux, qualité d’air",
    description:
      "Renouvellement et qualité de l’air, simple-flux, double-flux, récupération de chaleur, désenfumage, salle blanche, hygiènes aéraulique, maintenance régulière.",
  },
  {
    slug: "climatisation",
    name: "Climatisation",
    subtitle: "Splits, systèmes centralisés",
    description:
      "Splits, multi-splits, systèmes centralisés pour habitation, commerces et industries, installation, recharge gaz, mesures administratives, maintenance régulière.",
  },
  {
    slug: "sanitaire",
    name: "Sanitaires",
    subtitle: "Eau, distribution, évacuation",
    description:
      "Conduites de branchement, alimentations, évacuations, appareillage, production d’eau chaude, traitement d’eau, recherches de fuites, débouchage, interventions.",
  },
  {
    slug: "electricite",
    name: "Électricité",
    subtitle: "Tableaux, OIBT, domotique",
    description:
      "Tableaux électriques, raccordements, prises, éclairage, courant faible, courant fort, domotiques, bornes de recharges, contrôle et mise en conformité OIBT.",
  },
  {
    slug: "regulation",
    name: "Régulation et GTB",
    subtitle: "GTB, pilotage, optimisation",
    description:
      "Pilotage centralisé de vos installations techniques, thermostats intelligents, supervision à distance, suivi des consommations, économies durables.",
  },
  {
    slug: "energies-renouvelables",
    name: "Énergies renouvelables",
    subtitle: "Solaire, PAC, subventions",
    description:
      "Pompes à chaleur, solaire thermique, solaire photovoltaïques, batterie de stockage, bornes de recharge, dossiers de subventions, mise en conformité LVLne.",
  },
  {
    slug: "assainissement",
    name: "Chemisage de tuyauterie",
    subtitle: "Inspection, chemisage, réhabilitation",
    description:
      "Traitement sur conduites d’eau potable, conduites d’évacuation, réseau de distribution de chauffage, chemisage synthétique sans destruction du bâti.",
  },
];

/** Item de navigation : lien simple. */
export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Activités", href: "/#competences" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Protection des données", href: "/protection-donnees" },
  { label: "CGV", href: "/cgv" },
];
