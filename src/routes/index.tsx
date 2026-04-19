import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { WhyCerneNotChat } from "@/components/site/WhyCerneNotChat";
import { Pillars } from "@/components/site/Pillars";
import { Products } from "@/components/site/Products";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Sectors } from "@/components/site/Sectors";
import { CoreHowItWorks } from "@/components/site/CoreHowItWorks";
import { Plans } from "@/components/site/Plans";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <WhyCerneNotChat />
        <Pillars />
        <Products />
        <HowItWorks />
        <Sectors />
        <CoreHowItWorks />
        <Plans />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
