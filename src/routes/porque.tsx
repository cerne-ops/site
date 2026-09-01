import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CTA } from "@/components/site/CTA";
import { useI18n } from "@/lib/i18n";

const reasons = [
  {
    number: "01",
    text: "Porque a CerneOps? 1. O pequeno empresário sofre menos por “falta de tecnologia” e mais por falta de tempo operacional, equipe instável, custos subindo, trabalho administrativo demais, comunicação desorganizada, falhas de rotina, controle ruim de demanda/estoque e atraso no financeiro. Em 2025, NFIB apontou taxes, labor quality, inflation e labor costs entre os principais problemas dos pequenos negócios; a Câmara de Comércio dos EUA destacou custos crescentes como uma das maiores barreiras ao crescimento; e no varejo alimentar independente houve pressão simultânea de turnover, shrink e despesas operacionais. Na saúde, a AMA segue apontando carga administrativa e falta de equipe como fatores relevantes de desgaste operacional.",
  },
  {
    number: "02",
    text: "Porque a CerneOps? 2. O maior gargalo não é conhecimento nem tecnologia, é tempo operacional. O empresário acumula funções, divide atenção entre financeiro, atendimento e gestão, e ainda executa tarefas básicas do negócio. Pesquisas indicam que donos de pequenas empresas gastam grande parte do tempo em atividades administrativas em vez de crescimento [SCORE], e mesmo trabalhando longas horas não conseguem acompanhar a operação [SBA]. O resultado é simples: o negócio não escala porque o dono está preso na execução.",
  },
  {
    number: "03",
    text: "Porque a CerneOps? 3. A dificuldade de contratar, treinar e manter pessoas qualificadas impacta diretamente a consistência da operação. A qualidade da mão de obra segue entre os principais problemas dos pequenos negócios [NFIB], e a escassez de mão de obra, limita crescimento e aumenta o estresse operacional [World Economic Forum]. Isso cria um ambiente onde tudo depende de quem executa, e não de um processo confiável.",
  },
  {
    number: "04",
    text: "Porque a CerneOps? 4. Os custos seguem pressionando o negócio em todas as frentes. Inflação, aumento de salários e insumos reduzem margem e limitam capacidade de investimento [NFIB], enquanto custos crescentes continuam sendo uma das maiores barreiras ao crescimento [U.S. Chamber of Commerce]. Nesse contexto, contratar mais pessoas para resolver problemas operacionais deixa de ser viável, e muitas vezes piora o cenário.",
  },
  {
    number: "05",
    text: "Porque a CerneOps? 5. Grande parte dos problemas vem do excesso de tarefas administrativas e operacionais repetitivas. O tempo da equipe é consumido por controles manuais, organização de informação, comunicação desestruturada e retrabalho. A carga administrativa reduz o tempo disponível para atividades essenciais [European Commission], e é uma das principais causas de desgaste operacional em setores como saúde [American Medical Association]. O negócio passa a operar no limite, sem espaço para evoluir.",
  },
  {
    number: "06",
    text: "Porque a CerneOps? 6. Desorganização gera um efeito cascata direto na operação: falhas de estoque, atrasos financeiros, perda de controle e experiência ruim para o cliente. Sem visibilidade e padronização, decisões são tomadas no escuro. E não por acaso, problemas de fluxo de caixa continuam entre as principais causas de falência de pequenos negócios [U.S. Bank]. A operação deixa de ser previsível, e passa a ser reativa.",
  },
  {
    number: "07",
    text: "Porque a CerneOps? 7. É claro que o problema não é “usar tecnologia”, mas estruturar a operação. Ferramentas isoladas ajudam pontualmente, mas não resolvem o fluxo como um todo. É por isso que a automação aplicada à operação tem impacto direto: pode reduzir erros em até 70% e liberar tempo para atividades estratégicas . Quando tarefas deixam de depender de execução manual, a operação ganha consistência.",
  },
  {
    number: "08",
    text: "Porque a CerneOps? 8. A CerneOps nasce exatamente desse ponto: o empresário não precisa de mais ferramentas, precisa de uma operação que funcione. Isso significa padronizar tarefas, reduzir dependência de pessoas, eliminar retrabalho e trazer previsibilidade para o dia a dia. No fim, não se trata de tecnologia, mas de capacidade operacional. Porque o que limita o crescimento do pequeno negócio não é falta de acesso à IA, é a falta de estrutura para operar melhor todos os dias.",
  },
];

const reasonsEn = [
  {
    number: "01",
    text: "Why CerneOps? 1. Small business owners suffer less from “lack of technology” and more from lack of operational time, unstable teams, rising costs, excessive administrative work, disorganized communication, routine failures, poor demand/inventory control, and financial delays. In 2025, NFIB listed taxes, labor quality, inflation, and labor costs among small businesses’ top problems; the U.S. Chamber of Commerce highlighted rising costs as one of the biggest barriers to growth; and independent food retail faced simultaneous pressure from turnover, shrink, and operating expenses. In healthcare, the AMA continues to point to administrative burden and lack of staff as relevant factors in operational strain.",
  },
  {
    number: "02",
    text: "Why CerneOps? 2. The biggest bottleneck is not knowledge or technology; it is operational time. The business owner accumulates functions, splits attention between finance, customer service, and management, and still executes basic business tasks. Research indicates that small business owners spend a large share of their time on administrative activities instead of growth [SCORE], and even when working long hours they cannot keep up with operations [SBA]. The result is simple: the business does not scale because the owner is trapped in execution.",
  },
  {
    number: "03",
    text: "Why CerneOps? 3. The difficulty of hiring, training, and retaining qualified people directly affects operational consistency. Labor quality remains among small businesses’ top problems [NFIB], and labor shortages limit growth and increase operational stress [World Economic Forum]. This creates an environment where everything depends on who executes the task, not on a reliable process.",
  },
  {
    number: "04",
    text: "Why CerneOps? 4. Costs continue to pressure the business on every front. Inflation, wage increases, and input costs reduce margins and limit investment capacity [NFIB], while rising costs remain one of the biggest barriers to growth [U.S. Chamber of Commerce]. In this context, hiring more people to solve operational problems becomes unfeasible and often worsens the scenario.",
  },
  {
    number: "05",
    text: "Why CerneOps? 5. A large share of problems comes from excessive repetitive administrative and operational tasks. The team’s time is consumed by manual controls, information organization, unstructured communication, and rework. Administrative burden reduces the time available for essential activities [European Commission] and is one of the main causes of operational strain in sectors such as healthcare [American Medical Association]. The business starts operating at its limit, with no room to evolve.",
  },
  {
    number: "06",
    text: "Why CerneOps? 6. Disorganization creates a direct cascade effect across the operation: inventory failures, financial delays, loss of control, and a poor customer experience. Without visibility and standardization, decisions are made in the dark. It is no coincidence that cash-flow problems remain among the main causes of small business failure [U.S. Bank]. The operation stops being predictable and becomes reactive.",
  },
  {
    number: "07",
    text: "Why CerneOps? 7. The problem is clearly not “using technology,” but structuring the operation. Isolated tools help in specific points, but they do not solve the full flow. That is why automation applied to operations has direct impact: it can reduce errors by up to 70% and free time for strategic activities. When tasks stop depending on manual execution, the operation gains consistency.",
  },
  {
    number: "08",
    text: "Why CerneOps? 8. CerneOps was born exactly from this point: the business owner does not need more tools; they need an operation that works. That means standardizing tasks, reducing dependence on people, eliminating rework, and bringing predictability to daily execution. In the end, this is not about technology, but operational capacity. What limits small business growth is not lack of access to AI; it is the lack of structure to operate better every day.",
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
  const { locale } = useI18n();
  const en = locale === "en-US";
  const visibleReasons = en ? reasonsEn : reasons;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-36 pb-24">
        <section className="relative py-10">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
                {en ? "/ Why?" : "/ Porque?"}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.03]">
                {en ? "Why CerneOps" : "Porque a CerneOps"}
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg max-w-3xl">
                {en
                  ? "If you recognize yourself in some of these reasons, do not think twice."
                  : "Se voce se identificar em alguns desses motivos, nao pense duas vezes."}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {visibleReasons.map((reason) => (
                <article
                  key={reason.number}
                  className="rounded-2xl border border-border bg-surface/55 p-6 transition hover:border-ember/45 hover:bg-surface-elevated"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ember/30 bg-ember/10 font-mono text-sm text-ember">
                      {reason.number}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {reason.text}
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
