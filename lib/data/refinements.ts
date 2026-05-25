// Données du parcours qualifié /demarrer : cartes situation (étape 1) et
// raffinements dynamiques (étape 2, 4 sous-options par situation).

/** Situations passées en paramètre d'URL (?situation=). */
export type SituationParam =
  | "etude"
  | "realisation"
  | "assainissement"
  | "maintenance"
  | "urgence";

const SITUATION_PARAMS: SituationParam[] = [
  "etude",
  "realisation",
  "assainissement",
  "maintenance",
  "urgence",
];

/** Valide un paramètre d'URL `situation` (enum strict, sinon null). */
export function parseSituationParam(
  value: string | null | undefined,
): SituationParam | null {
  return value && (SITUATION_PARAMS as string[]).includes(value)
    ? (value as SituationParam)
    : null;
}

/** Carte de l'étape 1 (situation). */
export type SituationCard = {
  key: SituationParam;
  num: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
  /** Carte urgence (accent rouge dans la modale). */
  urgent?: boolean;
};

export const situationCards: SituationCard[] = [
  {
    key: "urgence",
    num: "01",
    category: "Urgent",
    title: "J'ai une panne ou une urgence.",
    description:
      "Plus de chauffage, fuite d'eau, panne électrique, climatisation HS. Intervention sous 2h, 24h/24 et 7j/7.",
    iconName: "Siren",
    urgent: true,
  },
  {
    key: "etude",
    num: "02",
    category: "Concevoir",
    title: "J'ai un projet à concevoir.",
    description:
      "Étude, concept énergétique, dimensionnement, plans d'exécution, CECB.",
    iconName: "PencilRuler",
  },
  {
    key: "realisation",
    num: "03",
    category: "Construire",
    title: "J'ai des travaux à réaliser.",
    description:
      "Construction neuve, rénovation complète, installation ponctuelle.",
    iconName: "HardHat",
  },
  {
    key: "assainissement",
    num: "04",
    category: "Assainir",
    title: "J'assainis mon bâtiment.",
    description:
      "Remplacement chaudière mazout ou gaz, rénovation énergétique, LVLEne, subventions, chemisage de tuyauterie",
    iconName: "Recycle",
  },
  {
    key: "maintenance",
    num: "05",
    category: "Entretenir",
    title: "J'entretiens mes installations.",
    description:
      "Contrat d'entretien, service annuel, contrôle OIBT, contrôle OPair.",
    iconName: "Wrench",
  },
];

export type RefinementOption = {
  title: string;
  description: string;
  /** Nom d'icône Lucide (mappé dans RefinementCard). */
  iconName: string;
};

/** Clé de raffinement (étape 2) — inclut "autre" (lien échappatoire). */
export type RefinementSlug =
  | "etude"
  | "realisation"
  | "assainissement"
  | "maintenance"
  | "autre";

export type RefinementSituation = {
  slug: RefinementSlug;
  title: string;
  subtitle: string;
  /** Département de routage (récap étape 3 + écran succès). */
  department: string;
  options: RefinementOption[]; // 4 options
};

export const refinements: Record<RefinementSlug, RefinementSituation> = {
  etude: {
    slug: "etude",
    title: "Quel est votre projet ?",
    subtitle: "Partagez-nous les détails en votre possession, nous analysons votre demande et revenons vers vous rapidement sans aucun engagement de votre part.",
    department: "Étude",
    options: [
      {
        title: "Concept énergétique / étude de faisabilité",
        description: "PAC, solaire PV, ventilation double-flux, géothermie",
        iconName: "Brain",
      },
      {
        title: "Conception et descriptif d'installations",
        description: "Plans, schémas et cahier des charges",
        iconName: "Ruler",
      },
      {
        title: "CECB / CECB+",
        description: "Certificat énergétique cantonal des bâtiments",
        iconName: "BarChart3",
      },
      {
        title: "Audit ou expertise technique",
        description: "Diagnostic d'installation existante",
        iconName: "Search",
      },
    ],
  },
  realisation: {
    slug: "realisation",
    title: "De quel type de travaux s'agit-il ?",
    subtitle: "Pour cadrer rapidement votre demande.",
    department: "Réalisation",
    options: [
      {
        title: "Construction neuve",
        description: "Villa, immeuble, bâtiment industriel",
        iconName: "HardHat",
      },
      {
        title: "Rénovation",
        description: "Rénovation, transformation légère et transformation lourde",
        iconName: "Hammer",
      },
      {
        title: "Installation ponctuelle",
        description: "Remplacement d'appareil, modification d'installation",
        iconName: "Wrench",
      },
      {
        title: "Assainissement de tuyauterie",
        description: "Traitement contre la corrosion et chemisage synthétique de tout type de tuyauterie",
        iconName: "PackageOpen",
      },
    ],
  },
  assainissement: {
    slug: "assainissement",
    title: "Quel est votre objectif principal ?",
    subtitle: "Votre projet peut combiner plusieurs aspects.",
    department: "Assainissement",
    options: [
      {
        title: "Remplacement de mon système de chauffage",
        description: "Conformément à la loi vaudoise sur l'énergie (LVLEne)",
        iconName: "Recycle",
      },
      {
        title: "Optimisation énergétique de mon bâtiment",
        description: "Production de chaleur, utilisation des énergies, régulation et équilibrage",
        iconName: "Home",
      },
      {
        title: "Profiter du Programme Bâtiments / subventions",
        description: "Profiter d'un concept optimal, clé en main incluant le montage du dossier pour les subventions",
        iconName: "Coins",
      },
      {
        title: "Assainissement de tuyauterie",
        description: "Traitement contre la corrosion et chemisage synthétique de tout type de tuyauterie",
        iconName: "TrendingUp",
      },
    ],
  },
  maintenance: {
    slug: "maintenance",
    title: "Que souhaitez-vous entretenir ?",
    subtitle: "Pour orienter vers le bon technicien.",
    department: "Maintenance",
    options: [
      {
        title: "Contrat d'entretien régulier",
        description: "PAC, chaudière, brûleur, système de ventilation, climatisation, solaire, installation sanitaire, système de pompage, régulation, défense incendie",
        iconName: "RefreshCw",
      },
      {
        title: "Service de détartrage",
        description: "Détartrage de chauffe-eau, détartrage de vos échangeurs, détartrage des tuyauteries",
        iconName: "CalendarCheck",
      },
      {
        title: "Traitement d'eau",
        description: "Installation et maintenance d'adoucisseur, traitement eau de chauffage et climatisation, selon norme SICC BT 102-01",
        iconName: "Droplets",
      },
      {
        title: "Contrôle OIBT (électricité)",
        description: "Contrôle périodique et mise en conformité de votre installation",
        iconName: "Zap",
      },
    ],
  },
  autre: {
    slug: "autre",
    title: "Décrivez-nous votre besoin",
    subtitle: "Nous vous orientons vers la bonne personne en interne.",
    department: "Service client",
    options: [
      {
        title: "Demande de devis générale",
        description: "Plusieurs corps de métier",
        iconName: "FileText",
      },
      {
        title: "Information sur une prestation",
        description: "Question avant projet",
        iconName: "MessageCircle",
      },
      {
        title: "Partenariat / collaboration",
        description: "Sous-traitance, fournisseur",
        iconName: "Handshake",
      },
      {
        title: "Recrutement / candidature",
        description: "Postuler chez Equatys",
        iconName: "UserPlus",
      },
    ],
  },
};
