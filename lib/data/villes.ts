/** Liste complète des communes dans le rayon de 25 km de Bussigny */
export const allZones = [
  // Lausanne & agglomération
  "Bussigny", "Lausanne", "Renens", "Prilly", "Ecublens",
  "Chavannes-près-Renens", "Crissier", "Villars-Sainte-Croix",
  "Jouxtens-Mézery", "Romanel-sur-Lausanne", "Cheseaux-sur-Lausanne",
  "Le Mont-sur-Lausanne", "Epalinges", "Saint-Sulpice", "Pully",
  "Paudex", "Belmont-sur-Lausanne",
  // District de Morges
  "Morges", "Échandens", "Lonay", "Préverenges", "Tolochenaz",
  "Denges", "Saint-Prex", "Lully", "Etoy", "Aubonne",
  // Lavaux
  "Lutry", "Savigny", "Grandvaux", "Puidoux", "Cully",
  "Bourg-en-Lavaux", "Villette",
  // Ouest / Gros-de-Vaud
  "Cossonay", "La Sarraz", "Penthalaz", "Penthaz",
  "Daillens", "Eclépens", "Chevilly",
  // District de Nyon
  "Gland", "Prangins", "Nyon", "Rolle", "Allaman",
  "Féchy", "Perroy", "Coppet", "Founex",
  "Commugny", "Tannay", "Mies",
  // Vevey / Riviera
  "Vevey", "Corseaux", "Corsier-sur-Vevey",
  // Genève rive gauche
  "Bernex", "Plan-les-Ouates",
];

export interface VilleData {
  slug: string;
  name: string;
}

export const villes: VilleData[] = [
  { slug: "lausanne",  name: "Lausanne"  },
  { slug: "morges",    name: "Morges"    },
  { slug: "nyon",      name: "Nyon"      },
  { slug: "renens",    name: "Renens"    },
  { slug: "prilly",    name: "Prilly"    },
  { slug: "ecublens",  name: "Ecublens"  },
  { slug: "gland",     name: "Gland"     },
  { slug: "vevey",     name: "Vevey"     },
  { slug: "rolle",     name: "Rolle"     },
  { slug: "pully",     name: "Pully"     },
  { slug: "lutry",     name: "Lutry"     },
  { slug: "bussigny",  name: "Bussigny"  },
];

export function getVilleBySlug(slug: string): VilleData | undefined {
  return villes.find((v) => v.slug === slug);
}
