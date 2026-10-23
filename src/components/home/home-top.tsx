import { HeroSection } from "./hero-section";
import { HowItWorks } from "./how-it-works";
import { TrustStrip } from "./trust-strip";
import { WhoItsFor } from "./who-its-for";

export function HomeTop() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <TrustStrip />
      <WhoItsFor />
    </>
  );
}
