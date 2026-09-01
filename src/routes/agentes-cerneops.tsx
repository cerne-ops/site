import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Bot, ChevronDown, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { getAgentPages, getAgentSlugByName } from "@/lib/agent-pages";
import { fetchLandingPlans } from "@/lib/plans";
import { useI18n } from "@/lib/i18n";

type Agent = {
  id: string;
  title: string;
  slug?: string;
  description: string;
  group: string;
  problem: string;
  operation: string;
  delivery: string;
  status: "ativo" | "inativo" | "manutencao" | "desenvolvimento";
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

const principlesEn = [
  {
    title: "zero code",
    body: "Data entry is manual and simple: file uploads, photos, basic spreadsheets, or copied text. There is no need to connect APIs or legacy systems.",
  },
  {
    title: "Bureaucracy reduction",
    body: "The agent does not add steps to the process; it replaces hours of repetitive human work with seconds of intelligent processing.",
  },
  {
    title: "Operational practicality",
    body: "Each agent has a clear function, a defined input, and an actionable deliverable, without overlapping scope.",
  },
];

function normalizeAgentsFromPlans(plans: Array<Record<string, unknown>>) {
  const byKey = new Map<string, Agent>();

  const normalizeGroupLabel = (raw: string) => {
    if (!raw) return "Sem grupo";
    const specialGroups: Record<string, string> = {
      rh_departamento_pessoal: "Recursos Humanos e Departamento Pessoal",
      vendas_comercial: "Vendas e Comercial",
      financeiro_administrativo: "Financeiro e Administrativo",
      atendimento_relacionamento: "Atendimento e Relacionamento com Cliente",
      operacao_logistica: "Operação e Logística",
      gestao_produtividade_gestor: "Gestão e Produtividade do Gestor",
    };
    const key = raw.trim().toLowerCase();
    if (specialGroups[key]) return specialGroups[key];
    return raw
      .replace(/_/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  };

  for (const plan of plans) {
    const planAgents = Array.isArray(plan.agents)
      ? (plan.agents as Array<Record<string, unknown>>)
      : [];

    for (const rawAgent of planAgents) {
      const title = String(rawAgent?.name ?? "").trim();
      if (!title) continue;

      const groupNameRaw = String(rawAgent?.group_name ?? "").trim();
      const groupRaw =
        String(rawAgent?.group ?? "Sem grupo").trim() || "Sem grupo";
      const group = groupNameRaw || normalizeGroupLabel(groupRaw);
      const description =
        String(rawAgent?.description ?? "").trim() ||
        "Descrição em atualização no painel administrativo.";
      const problem =
        String(rawAgent?.problem ?? "").trim() || "Em atualização no Admin.";
      const operation =
        String(rawAgent?.operation ?? "").trim() || "Em atualização no Admin.";
      const delivery =
        String(rawAgent?.delivery ?? "").trim() || "Em atualização no Admin.";
      const key = `${title.toLowerCase()}::${group.toLowerCase()}`;
      const rawStatus = String(rawAgent?.status ?? "ativo")
        .trim()
        .toLowerCase();
      const status: Agent["status"] =
        rawStatus === "inativo" ||
        rawStatus === "manutencao" ||
        rawStatus === "desenvolvimento"
          ? rawStatus
          : "ativo";

      if (!byKey.has(key)) {
        byKey.set(key, {
          id: key,
          title,
          slug: getAgentSlugByName(title),
          group,
          description,
          problem,
          operation,
          delivery,
          status,
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
    links: [
      { rel: "canonical", href: "https://cerneops.com.br/agentes-cerneops" },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const { locale } = useI18n();
  const en = locale === "en-US";
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  useEffect(() => {
    let alive = true;

    const loadAgents = async () => {
      try {
        if (alive) setHasError(false);
        if (locale === "en-US") {
          setAgents(
            getAgentPages("en-US").map((agent) => ({
              id: `${agent.agentName.toLowerCase()}::${agent.agentGroup.toLowerCase()}`,
              title: agent.agentName,
              slug: agent.slug,
              description: agent.metaDescription,
              group: agent.agentGroup,
              problem:
                "Manual, repetitive work consumes time and makes execution less consistent.",
              operation:
                "The user provides context and available inputs; CerneOps organizes the material into a structured flow.",
              delivery:
                "A reviewable operational output ready to support the next step.",
              status: "ativo",
            })),
          );
          setIsLoading(false);
          return;
        }

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
  }, [locale]);

  const groups = useMemo(
    () =>
      Array.from(new Set(agents.map((agent) => agent.group))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [agents],
  );

  const groupedAgents = useMemo(
    () =>
      groups.map((group) => {
        const groupAgents = agents
          .filter((agent) => agent.group === group)
          .sort((a, b) => a.title.localeCompare(b.title));
        return {
          group,
          agents: groupAgents,
          activeCount: groupAgents.filter((agent) => agent.status === "ativo")
            .length,
        };
      }),
    [agents, groups],
  );

  const activeAgentsTotal = useMemo(
    () => agents.filter((agent) => agent.status === "ativo").length,
    [agents],
  );

  const toggleGroup = (group: string) => {
    setExpandedGroups((current) => {
      const next = new Set(current);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  const statusBadge = (status: Agent["status"]) => {
    if (status === "inativo") {
      return {
        label: en ? "Inactive" : "Inativo",
        className: "border-red-500/35 bg-red-500/15 text-red-300",
      };
    }
    if (status === "manutencao") {
      return {
        label: en ? "Under Maintenance" : "Em Manutenção",
        className: "border-amber-500/35 bg-amber-500/15 text-amber-300",
      };
    }
    if (status === "desenvolvimento") {
      return {
        label: en ? "Coming Soon" : "Em Breve",
        className: "border-indigo-500/35 bg-indigo-500/15 text-indigo-300",
      };
    }
    return {
      label: en ? "Active" : "Ativo",
      className: "border-emerald-500/35 bg-emerald-500/15 text-emerald-300",
    };
  };

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
                {en ? "CerneOps Core Agents," : "Agentes Core da CerneOps,"}
                <br />
                <span className="text-muted-foreground">
                  {en
                    ? "Bureaucracy elimination with zero code."
                    : "Eliminação de Burocracia com zero código."}
                </span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                {en
                  ? "CerneOps Core was designed to address the root of inefficiency in small and medium-sized companies: manual and bureaucratic work. The goal is not to create complex systems, but to provide practical tools that business owners and operators can use immediately, without IT integrations, long training cycles, or drastic infrastructure changes."
                  : "O plano Core da CerneOps foi desenhado para atacar a raiz da ineficiência nas pequenas e médias empresas: o trabalho manual e burocrático. O objetivo não é criar sistemas complexos, mas sim fornecer ferramentas práticas que o empresário ou operador possa usar imediatamente, sem necessidade de integrações de TI, treinamentos longos ou mudanças drásticas na infraestrutura atual."}
              </p>
              <p className="mt-4 text-foreground/90 leading-relaxed">
                {en
                  ? 'These agents materialize the CerneOps principle: "One person with CerneOps operates with the performance of ten."'
                  : 'Esses agentes materializam o lema da CerneOps: "Uma pessoa com a CerneOps opera com a performance de dez."'}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-3xl font-semibold">
              {en
                ? "Context and Design Principles"
                : "Contexto e Princípios de Design"}
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {(en ? principlesEn : principles).map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-border bg-surface/55 p-6"
                >
                  <h3 className="font-display text-2xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="catalogo-agentes-core" className="mt-10 scroll-mt-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold">
                  Catálogo de Agentes Core
                </h2>
                {!isLoading && !hasError && agents.length > 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {en
                      ? `${agents.length} agents across ${groups.length} group${groups.length === 1 ? "" : "s"}.`
                      : `${agents.length} agentes em ${groups.length} grupo${groups.length === 1 ? "" : "s"}.`}
                  </p>
                ) : null}
              </div>
              {!isLoading && !hasError && agents.length > 0 ? (
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-surface/55 px-3 py-1">
                    {agents.length} total
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                    {activeAgentsTotal} {en ? "active" : "ativos"}
                  </span>
                </div>
              ) : null}
            </div>
            {isLoading && (
              <p className="mt-4 text-sm text-muted-foreground">
                {en
                  ? "Loading local agent catalog..."
                  : "Carregando catálogo oficial de agentes..."}
              </p>
            )}
            {hasError && !isLoading && (
              <p className="mt-4 text-sm text-amber-300">
                {en
                  ? "The catalog could not be loaded right now. Please try again shortly."
                  : "Não foi possível carregar o catálogo em tempo real agora. Tente novamente em instantes."}
              </p>
            )}
            {!isLoading && !hasError && groups.length === 0 && (
              <p className="mt-4 text-sm text-muted-foreground">
                {en
                  ? "No agents available for display right now."
                  : "Nenhum agente disponível para exibição no momento."}
              </p>
            )}
            <div className="mt-6 space-y-4">
              {groupedAgents.map((group) => {
                const expanded = expandedGroups.has(group.group);
                return (
                  <section key={group.group} className="space-y-4">
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.group)}
                      aria-expanded={expanded}
                      aria-controls={`agent-group-${group.group.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`}
                      className="flex w-full items-center justify-between gap-4 rounded-2xl border border-border bg-surface/55 p-5 text-left transition hover:border-ember/45 hover:bg-surface-elevated focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        {expanded ? (
                          <ChevronDown className="h-5 w-5 shrink-0 text-ember" />
                        ) : (
                          <ChevronRight className="h-5 w-5 shrink-0 text-ember" />
                        )}
                        <Bot className="h-5 w-5 shrink-0 text-ember" />
                        <span className="truncate font-display text-2xl font-semibold text-ember">
                          {group.group}
                        </span>
                      </span>
                      <span className="flex shrink-0 flex-wrap justify-end gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full border border-border px-2.5 py-1">
                          {group.agents.length} total
                        </span>
                        <span className="rounded-full border border-emerald-500/30 px-2.5 py-1 text-emerald-300">
                          {group.activeCount} {en ? "active" : "ativos"}
                        </span>
                      </span>
                    </button>
                    {expanded ? (
                      <div
                        id={`agent-group-${group.group.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()}`}
                        className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                      >
                        {group.agents.map((agent) => {
                          const badge = statusBadge(agent.status);
                          const card = (
                            <article
                              className={`h-full rounded-2xl border border-border bg-surface/55 p-6 transition ${
                                agent.slug ? "hover:border-ember/45" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="font-mono text-xs uppercase tracking-widest text-ember">
                                  {en ? "Agent" : "Agente"}
                                </div>
                                {badge ? (
                                  <span
                                    className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${badge.className}`}
                                  >
                                    {badge.label}
                                  </span>
                                ) : null}
                              </div>
                              <h4 className="mt-2 font-display text-2xl leading-tight font-semibold">
                                {agent.title}
                              </h4>
                              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                {agent.description}
                              </p>
                              <div className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                                <p>
                                  <span className="text-foreground font-medium">
                                    {en ? "Problem:" : "Problema:"}
                                  </span>{" "}
                                  {agent.problem}
                                </p>
                                <p>
                                  <span className="text-foreground font-medium">
                                    {en ? "Operation:" : "Operação:"}
                                  </span>{" "}
                                  {agent.operation}
                                </p>
                                <p>
                                  <span className="text-foreground font-medium">
                                    {en ? "Deliverable:" : "Entrega:"}
                                  </span>{" "}
                                  {agent.delivery}
                                </p>
                              </div>
                              {agent.slug ? (
                                <span className="mt-5 inline-flex text-sm font-medium text-ember transition group-hover:text-ember-light">
                                  {en ? "Learn more →" : "Saiba mais →"}
                                </span>
                              ) : null}
                            </article>
                          );
                          return agent.slug ? (
                            <a
                              key={agent.id}
                              href={`/agentes/${agent.slug}`}
                              aria-label={
                                en
                                  ? `Open public page for agent ${agent.title}`
                                  : `Abrir página pública do agente ${agent.title}`
                              }
                              className="group block h-full rounded-2xl focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
                            >
                              {card}
                            </a>
                          ) : (
                            <div key={agent.id}>{card}</div>
                          );
                        })}
                      </div>
                    ) : null}
                  </section>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-ember/35 bg-surface-elevated p-7">
              <h2 className="font-display text-3xl font-semibold">
                {en
                  ? "Conclusion: Core's impact"
                  : "Conclusão, O Impacto do Core"}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {en
                  ? "The strength of these agents is their operational simplicity. They do not require the business owner to change management software or hire an IT team. They act exactly where the pain is sharpest: between the physical world of papers, photos, audio, and messy spreadsheets, and the need for structured information."
                  : "A beleza destes agentes reside na sua simplicidade operacional. Eles não exigem que o empresário mude seu software de gestão ou contrate uma equipe de TI. Eles atuam exatamente onde a dor é mais aguda: na interface entre o mundo físico (papéis, fotos, áudios, planilhas desorganizadas) e a necessidade de informação estruturada."}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {en
                  ? "By adopting CerneOps Core, the business owner turns hours of manual and bureaucratic work into minutes of intelligent supervision, freeing their own time and the team's time to focus on what really matters: serving customers well and growing the business."
                  : "Ao adotar o plano Core da CerneOps, o empresário transforma horas de trabalho braçal e burocrático em minutos de supervisão inteligente, liberando seu tempo e o de sua equipe para focar no que realmente importa: atender bem o cliente e crescer o negócio."}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
