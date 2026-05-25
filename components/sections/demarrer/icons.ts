// Map nom (string des données) → composant d'icône Lucide. Imports explicites
// pour rester tree-shakeable (pas d'import du package d'icônes entier).
import {
  BarChart3,
  Brain,
  Building2,
  CalendarCheck,
  Coins,
  Droplets,
  Compass,
  Factory,
  FileText,
  Hammer,
  Handshake,
  HardHat,
  Home,
  MessageCircle,
  PackageOpen,
  PencilRuler,
  Recycle,
  RefreshCw,
  Ruler,
  Search,
  Siren,
  TrendingUp,
  UserPlus,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  // Situations (étape 1)
  Siren,
  PencilRuler,
  HardHat,
  Recycle,
  Wrench,
  // Raffinements (étape 2)
  Brain,
  Ruler,
  BarChart3,
  Search,
  Hammer,
  PackageOpen,
  Home,
  Coins,
  TrendingUp,
  RefreshCw,
  CalendarCheck,
  Droplets,
  Zap,
  Wind,
  FileText,
  MessageCircle,
  Handshake,
  UserPlus,
  // Profils (étape 3)
  Building2,
  Compass,
  Factory,
};

/** Récupère un composant d'icône par nom (fallback `Search` si inconnu). */
export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Search;
}
