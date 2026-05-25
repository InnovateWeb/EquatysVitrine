import { HashScrollHandler } from "@/components/layout";
import {
  BuildingTypesSection,
  FaqSection,
  HeroSection,
  IntegrationSection,
  IntentGridSection,
  MethodologySection,
  PartnersSection,
  PositionnementSection,
  TradesSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <HashScrollHandler />
      <HeroSection />
      <IntentGridSection />
      <TradesSection />
      <IntegrationSection />
      <PositionnementSection />
      <PartnersSection />
      <FaqSection />
    </>
  );
}
