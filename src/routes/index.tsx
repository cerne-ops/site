import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { WhyCerneNotChat } from "@/components/site/WhyCerneNotChat";
import { Pillars } from "@/components/site/Pillars";
import { Products } from "@/components/site/Products";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Sectors } from "@/components/site/Sectors";
import { Plans } from "@/components/site/Plans";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";
import { SupraContactModalProvider } from "@/components/site/SupraContactModal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SupraContactModalProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <WhyCerneNotChat />
          <Pillars />
          <Products />
          <HowItWorks />
          <Sectors />
          <Plans />
          <CTA />
        </main>
        <Footer />
      </div>
    </SupraContactModalProvider>
  );
}
