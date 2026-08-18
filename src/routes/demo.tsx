import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { DemoWorkspace } from "@/components/site/DemoWorkspace";

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
