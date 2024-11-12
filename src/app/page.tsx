import Hero from "./components/hero";
import Examples from "./components/examples";
import CTA from "./components/cta";
import Details from "./components/details";
import Pricing from "./components/pricing";

export default function Home() {
  return (
    <main className="flex flex-col gap-6">
      <Hero />
      <Examples />
      <CTA />
      <Details />
      <Pricing />
    </main>
  );
}
