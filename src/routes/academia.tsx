import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SoroBlogEmbed } from "@/components/site/SoroBlogEmbed";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/academia")({
  head: () => ({
    meta: [
      { title: "Academia CerneOps | Artigos sobre IA operacional" },
      {
        name: "description",
        content:
          "Artigos, guias e ideias práticas da Academia CerneOps para aplicar IA, automação e processos inteligentes na operação da sua empresa.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cerneops.com.br/academia" },
      { property: "og:title", content: "Academia CerneOps" },
      {
        property: "og:description",
        content:
          "Artigos, guias e ideias práticas para aplicar IA, automação e processos inteligentes na operação da sua empresa.",
      },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Academia CerneOps" },
      {
        name: "twitter:description",
        content:
          "Conteúdo prático da CerneOps sobre IA operacional, automação, processos e agentes.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cerneops.com.br/academia" }],
  }),
  component: AcademiaPage,
});

function AcademiaPage() {
  const { isEnglish } = useI18n();

  if (isEnglish) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-36 pb-24" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-36 pb-24">
        <section className="relative py-10">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
                / Academia CerneOps
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.03]">
                Opere melhor com especialistas digitais.
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg max-w-3xl">
                Estratégias, guias e aplicações práticas para reduzir trabalho
                manual, acelerar decisões e aumentar a capacidade operacional da
                sua empresa.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed text-lg max-w-4xl">
                Aprenda como empresas utilizam especialistas digitais em RH,
                Comercial, Financeiro, Atendimento, Jurídico, Fiscal,
                Engenharia, Saúde e Operações para transformar horas de trabalho
                em minutos de execução.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
              <label className="block rounded-2xl border border-border bg-surface/55 p-4">
                <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-ember">
                  Buscar na Academia
                </span>
                <span className="flex items-center gap-3 rounded-xl border border-border bg-background/70 px-4 py-3">
                  <Search className="h-5 w-5 shrink-0 text-ember" />
                  <input
                    type="search"
                    placeholder="Busque por IA, automação, processos, agentes..."
                    className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    aria-label="Buscar artigos da Academia CerneOps"
                  />
                </span>
              </label>

              <div className="rounded-2xl border border-border bg-surface/55 p-4">
                <div className="font-mono text-xs uppercase tracking-widest text-ember">
                  Temas
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {["IA operacional", "Automação", "Processos", "Agentes"].map(
                    (topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-border bg-background/60 px-3 py-1"
                      >
                        {topic}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-5">
              <div>
                <h2 className="font-display text-3xl font-semibold">
                  Artigos publicados
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Cada publicação pode ser aberta e compartilhada diretamente a
                  partir da lista carregada pela Academia.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-6">
            <SoroBlogEmbed />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
