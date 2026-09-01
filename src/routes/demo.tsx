import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DemoWorkspace } from "@/components/site/DemoWorkspace";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Demo de Agentes | CerneOps" },
      {
        name: "description",
        content:
          "Teste uma demonstração simulada dos agentes IA especialistas da CerneOps.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cerneops.com.br/demo" }],
  }),
  component: DemoPage,
});

function DemoPage() {
  const { locale } = useI18n();

  useEffect(() => {
    document.title =
      locale === "en-US"
        ? "Agent Demo | CerneOps"
        : "Demo de Agentes | CerneOps";
  }, [locale]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <DemoWorkspace />
      </main>
      <Footer />
    </div>
  );
}
