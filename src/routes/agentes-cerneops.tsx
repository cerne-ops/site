import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { fetchLandingPlans } from "@/lib/plans";

type Agent = {
  id: string;
  title: string;
  description: string;
  group: string;
};

const principles = [
  {
    title: "zero código",
    body: "A entrada de dados é feita de forma manual e simples (upload de arquivos, fotos, planilhas básicas ou textos copiados). Não há necessidade de conectar APIs ou sistemas legados.",
  },
  {
    title: "Redução de Burocracia",
    body: "O agente não adiciona passos ao processo; ele substitui horas de trabalho humano repetitivo por segundos de processamento inteligente.",
  },
  {
    title: "Praticidade Operacional",
    body: "Cada agente tem uma função clara, uma entrada definida e uma entrega acionável, sem sobreposição de escopo entre eles.",
  },
];

function normalizeAgentsFromPlans(plans: Array<Record<string, unknown>>) {
  const byKey = new Map<string, Agent>();

  for (const plan of plans) {
    const planAgents = Array.isArray(plan.agents)
      ? (plan.agents as Array<Record<string, unknown>>)
      : [];

    for (const rawAgent of planAgents) {
      const title = String(rawAgent?.name ?? "").trim();
      if (!title) continue;

      const group = String(rawAgent?.group ?? "Sem grupo").trim() || "Sem grupo";
      const description =
        String(rawAgent?.description ?? "").trim() ||
        "Descrição em atualização no painel administrativo.";
      const key = `${title.toLowerCase()}::${group.toLowerCase()}`;

      if (!byKey.has(key)) {
        byKey.set(key, {
          id: key,
          title,
          group,
          description,
        });
      }
    }
  }

  return Array.from(byKey.values());
}

export const Route = createFileRoute("/agentes-cerneops")({
  head: () => ({
    meta: [
      { title: "Agentes CerneOps | Agentes Core" },
      {
        name: "description",
        content:
          "Conheça os agentes Core da CerneOps para eliminar burocracia com zero código e acelerar a operação da sua empresa.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cerneops.com.br/agentes-cerneops" }],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let alive = true;

    const loadAgents = async () => {
      try {
        if (alive) setHasError(false);
        const plans = await fetchLandingPlans();
        if (!alive) return;
        if (!plans) {
          setAgents([]);
          setHasError(true);
          return;
        }

        setAgents(normalizeAgentsFromPlans(plans));
      } catch {
        if (!alive) return;
        setAgents([]);
        setHasError(true);
      } finally {
        if (alive) setIsLoading(false);
      }
    };

    void loadAgents();
    const refreshHandle = window.setInterval(() => {
      void loadAgents();
    }, 60_000);

    return () => {
      alive = false;
      window.clearInterval(refreshHandle);
    };
  }, []);

  const groups = useMemo(
    () => Array.from(new Set(agents.map((agent) => agent.group))).sort((a, b) => a.localeCompare(b)),
    [agents],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-36 pb-24">
        <section className="relative py-10">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
                / Agentes CerneOps
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.03]">
                Agentes Core da CerneOps,
                <br />
                <span className="text-muted-foreground">Eliminação de Burocracia com zero código.</span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                O plano Core da CerneOps foi desenhado para atacar a raiz da ineficiência nas pequenas e médias empresas: o trabalho manual e burocrático. O objetivo não é criar sistemas complexos, mas sim fornecer ferramentas práticas que o empresário ou operador possa usar imediatamente, sem necessidade de integrações de TI, treinamentos longos ou mudanças drásticas na infraestrutura atual.
              </p>
              <p className="mt-4 text-foreground/90 leading-relaxed">
                Esses agentes materializam o lema da CerneOps: "Uma pessoa com a CerneOps opera com a performance de dez."
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-3xl font-semibold">Contexto e Princípios de Design</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {principles.map((item) => (
                <article key={item.title} className="rounded-2xl border border-border bg-surface/55 p-6">
                  <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-3xl font-semibold">Catálogo de Agentes Core</h2>
            {isLoading && (
              <p className="mt-4 text-sm text-muted-foreground">
                Carregando catálogo oficial de agentes...
              </p>
            )}
            {hasError && !isLoading && (
              <p className="mt-4 text-sm text-amber-300">
                Não foi possível carregar o catálogo em tempo real agora. Tente novamente em instantes.
              </p>
            )}
            {!isLoading && !hasError && groups.length === 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                Nenhum agente disponível para exibição no momento.
              </p>
            )}
            {groups.map((group) => (
              <div key={group} className="mt-8">
                <h3 className="font-display text-2xl font-semibold text-ember">{group}</h3>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {agents
                    .filter((agent) => agent.group === group)
                    .map((agent) => (
                      <article key={agent.id} className="rounded-2xl border border-border bg-surface/55 p-6">
                        <div className="font-mono text-xs uppercase tracking-widest text-ember">Agente</div>
                        <h4 className="mt-2 font-display text-2xl leading-tight font-semibold">{agent.title}</h4>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {agent.description}
                        </p>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-ember/35 bg-surface-elevated p-7">
              <h2 className="font-display text-3xl font-semibold">Conclusão, O Impacto do Core</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A beleza destes agentes reside na sua simplicidade operacional. Eles não exigem que o empresário mude seu software de gestão ou contrate uma equipe de TI. Eles atuam exatamente onde a dor é mais aguda: na interface entre o mundo físico (papéis, fotos, áudios, planilhas desorganizadas) e a necessidade de informação estruturada.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ao adotar o plano Core da CerneOps, o empresário transforma horas de trabalho braçal e burocrático em minutos de supervisão inteligente, liberando seu tempo e o de sua equipe para focar no que realmente importa: atender bem o cliente e crescer o negócio.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
