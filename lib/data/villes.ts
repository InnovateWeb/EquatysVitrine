export interface VilleData {
  slug: string;
  name: string;
  /** Communes proches affichées dans la section zones */
  zones: string[];
}

export const villes: VilleData[] = [
  {
    slug: "lausanne",
    name: "Lausanne",
    zones: [
      "Lausanne", "Pully", "Prilly", "Renens", "Ecublens", "Chavannes-près-Renens",
      "Le Mont-sur-Lausanne", "Epalinges", "Belmont-sur-Lausanne", "Paudex",
      "Saint-Sulpice", "Jouxtens-Mézery", "Romanel-sur-Lausanne", "Cheseaux-sur-Lausanne",
      "Crissier", "Villars-Sainte-Croix", "Lutry", "Savigny", "Bussigny",
    ],
  },
  {
    slug: "morges",
    name: "Morges",
    zones: [
      "Morges", "Échandens", "Lonay", "Préverenges", "Saint-Prex", "Tolochenaz",
      "Denges", "Lully", "Etoy", "Aubonne", "Allaman", "Féchy",
      "Bussigny", "Crissier", "Ecublens", "Saint-Sulpice", "Lausanne",
    ],
  },
  {
    slug: "nyon",
    name: "Nyon",
    zones: [
      "Nyon", "Gland", "Prangins", "Rolle", "Coppet", "Founex",
      "Commugny", "Tannay", "Mies", "Allaman", "Féchy", "Perroy",
      "Aubonne", "Bursinel",
    ],
  },
  {
    slug: "renens",
    name: "Renens",
    zones: [
      "Renens", "Prilly", "Ecublens", "Chavannes-près-Renens", "Crissier",
      "Villars-Sainte-Croix", "Jouxtens-Mézery", "Lausanne", "Bussigny",
      "Lonay", "Préverenges", "Saint-Sulpice",
    ],
  },
  {
    slug: "prilly",
    name: "Prilly",
    zones: [
      "Prilly", "Renens", "Lausanne", "Ecublens", "Crissier",
      "Jouxtens-Mézery", "Chavannes-près-Renens", "Villars-Sainte-Croix",
      "Le Mont-sur-Lausanne", "Romanel-sur-Lausanne", "Bussigny",
    ],
  },
  {
    slug: "ecublens",
    name: "Ecublens",
    zones: [
      "Ecublens", "Renens", "Saint-Sulpice", "Chavannes-près-Renens", "Crissier",
      "Lonay", "Préverenges", "Bussigny", "Villars-Sainte-Croix",
      "Lausanne", "Prilly", "Morges",
    ],
  },
  {
    slug: "gland",
    name: "Gland",
    zones: [
      "Gland", "Prangins", "Nyon", "Rolle", "Allaman", "Tartegnin",
      "Bursinel", "Coppet", "Founex", "Commugny", "Féchy",
    ],
  },
  {
    slug: "vevey",
    name: "Vevey",
    zones: [
      "Vevey", "Corseaux", "Corsier-sur-Vevey", "Bourg-en-Lavaux",
      "Grandvaux", "Villette", "Cully", "Lutry", "Savigny",
      "Puidoux", "Pully",
    ],
  },
  {
    slug: "rolle",
    name: "Rolle",
    zones: [
      "Rolle", "Allaman", "Féchy", "Perroy", "Gland", "Aubonne",
      "Bursinel", "Tartegnin", "Prangins", "Nyon", "Morges",
    ],
  },
  {
    slug: "pully",
    name: "Pully",
    zones: [
      "Pully", "Lausanne", "Belmont-sur-Lausanne", "Paudex", "Lutry",
      "Savigny", "Grandvaux", "Epalinges", "Bourg-en-Lavaux",
    ],
  },
  {
    slug: "lutry",
    name: "Lutry",
    zones: [
      "Lutry", "Pully", "Savigny", "Grandvaux", "Cully",
      "Bourg-en-Lavaux", "Villette", "Paudex", "Lausanne",
      "Belmont-sur-Lausanne", "Puidoux",
    ],
  },
  {
    slug: "bussigny",
    name: "Bussigny",
    zones: [
      "Bussigny", "Crissier", "Ecublens", "Renens", "Chavannes-près-Renens",
      "Villars-Sainte-Croix", "Prilly", "Lausanne", "Lonay",
      "Préverenges", "Morges", "Saint-Sulpice",
    ],
  },
];

export function getVilleBySlug(slug: string): VilleData | undefined {
  return villes.find((v) => v.slug === slug);
}
