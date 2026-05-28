import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";

const reasons = [
  {
    number: "01",
    title: "Tempo operacional",
    body: "Pequeno empresario sofre por falta de tempo operacional, equipe instavel, custos, comunicacao desorganizada, controles ruins e atraso financeiro.",
  },
  {
    number: "02",
    title: "Dono preso na execucao",
    body: "O gargalo principal e tempo operacional; o dono fica preso na execucao e nao escala.",
  },
  {
    number: "03",
    title: "Equipe instavel",
    body: "Dificuldade de contratar, treinar e manter pessoas qualificadas quebra consistencia operacional.",
  },
  {
    number: "04",
    title: "Custo sob pressao",
    body: "Custos pressionam margem; contratar mais pessoas pode nao ser viavel.",
  },
  {
    number: "05",
    title: "Trabalho repetitivo",
    body: "Tarefas administrativas e repetitivas consomem tempo e geram desgaste.",
  },
  {
    number: "06",
    title: "Operacao reativa",
    body: "Desorganizacao causa falhas de estoque, atrasos financeiros, perda de controle e experiencia ruim.",
  },
  {
    number: "07",
    title: "Estrutura antes de tecnologia",
    body: "O problema nao e usar tecnologia, e estruturar operacao; automacao reduz erro e esforco manual.",
  },
  {
    number: "08",
    title: "Previsibilidade para crescer",
    body: "A CerneOps existe para padronizar, reduzir dependencia, eliminar retrabalho e trazer previsibilidade.",
  },
];

export const Route = createFileRoute("/porque")({
  head: () => ({
    meta: [
      { title: "Porque a CerneOps | CerneOps" },
      {
        name: "description",
        content:
          "Entenda os motivos operacionais que fazem a CerneOps existir para pequenas e médias empresas.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cerneops.com.br/porque" }],
  }),
  component: WhyCernePage,
});

function WhyCernePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-36 pb-24">
        <section className="relative py-10">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
                / Porque?
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.03]">
                Porque a CerneOps
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg max-w-3xl">
                Se voce se identificar em alguns desses motivos, nao pense duas vezes.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {reasons.map((reason) => (
                <article
                  key={reason.number}
                  className="rounded-2xl border border-border bg-surface/55 p-6 transition hover:border-ember/45 hover:bg-surface-elevated"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ember/30 bg-ember/10 font-mono text-sm text-ember">
                      {reason.number}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-semibold">
                        {reason.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {reason.body}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14">
          <div className="mx-auto max-w-7xl px-6">
            <div className="ember-divider" />
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
