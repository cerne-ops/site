import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { HeroCarousel } from "@/components/site/HeroCarousel";
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
  head: () => ({
    meta: [
      { title: "CerneOps | Integração Inteligente de Operações" },
      {
        name: "description",
        content:
          "Transforme processos manuais em uma operação inteligente com automação, integração e agentes que executam tarefas por você.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cerneops.com.br" },
      { property: "og:title", content: "Integração inteligente de operações" },
      {
        property: "og:description",
        content:
          "Automatize, organize e escale sua operação com agentes inteligentes. Mais performance, menos retrabalho.",
      },
      {
        property: "og:image",
        content: "https://cerneops.com.br/og-social.jpg",
      },
      { property: "og:image:width", content: "1024" },
      { property: "og:image:height", content: "1024" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:site_name", content: "CerneOps" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Integração inteligente de operações" },
      {
        name: "twitter:description",
        content:
          "Sistema operacional de agentes para empresas. Automatize e escale sua operação.",
      },
      {
        name: "twitter:image",
        content: "https://cerneops.com.br/og-social.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "https://cerneops.com.br" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <HeroCarousel />
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
