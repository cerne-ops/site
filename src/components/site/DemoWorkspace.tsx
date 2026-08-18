import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Bot,
  Check,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  FileText,
  Loader2,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getAgentPages, getAgentSlugByName } from "@/lib/agent-pages";
import { CORE_DEMO_SCENARIOS } from "@/lib/core-demo-scenarios.generated";
import { fetchLandingPlans } from "@/lib/plans";

type DemoAgent = {
  id: string;
  title: string;
  slug?: string;
  description: string;
  group: string;
  problem: string;
  operation: string;
  delivery: string;
  status: string;
};

type DemoField = {
  key: string;
  label: string;
  placeholder: string;
  rows: number;
  value: string;
};

type DemoTable = {
  title: string;
  columns: string[];
  rows: Array<Record<string, string>>;
};

type DemoResult = {
  title: string;
  reviewNotice: string;
  summary: string;
  inputReference: Array<{ label: string; value: string }>;
  premises: string[];
  uncertainties: string[];
  highlights: string[];
  tables: DemoTable[];
  sections: Array<{ title: string; items: string[] }>;
  nextSteps: string[];
};

const SPECIAL_GROUPS: Record<string, string> = {
  rh_departamento_pessoal: "Recursos Humanos e Departamento Pessoal",
  vendas_comercial: "Vendas e Comercial",
  financeiro_administrativo: "Financeiro e Administrativo",
  atendimento_relacionamento: "Atendimento e Relacionamento com Cliente",
  operacao_logistica: "Operação e Logística",
  gestao_produtividade_gestor: "Gestão e Produtividade do Gestor",
};

function normalizeGroupLabel(raw: string) {
  const key = raw.trim().toLowerCase();
  if (SPECIAL_GROUPS[key]) return SPECIAL_GROUPS[key];
  return (
    raw
      .replace(/_/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ") || "Sem grupo"
  );
}

function normalizeAgentsFromPlans(plans: Array<Record<string, unknown>>) {
  const byKey = new Map<string, DemoAgent>();

  for (const plan of plans) {
    const planAgents = Array.isArray(plan.agents)
      ? (plan.agents as Array<Record<string, unknown>>)
      : [];

    for (const rawAgent of planAgents) {
      const title = String(rawAgent.name ?? "").trim();
      if (!title) continue;

      const groupName = String(rawAgent.group_name ?? "").trim();
      const group =
        groupName || normalizeGroupLabel(String(rawAgent.group ?? "Sem grupo"));
      const key = `${title.toLowerCase()}::${group.toLowerCase()}`;

      if (byKey.has(key)) continue;
      byKey.set(key, {
        id: key,
        title,
        slug: getAgentSlugByName(title),
        group,
        description:
          String(rawAgent.description ?? "").trim() ||
          "Agente especializado para organizar uma rotina operacional.",
        problem:
          String(rawAgent.problem ?? "").trim() ||
          "Reduz trabalho manual e dispersão de informações.",
        operation:
          String(rawAgent.operation ?? "").trim() ||
          "Recebe informações fornecidas pelo usuário em texto estruturado.",
        delivery:
          String(rawAgent.delivery ?? "").trim() ||
          "Entrega uma saída estruturada, revisável e acionável.",
        status: String(rawAgent.status ?? "ativo")
          .trim()
          .toLowerCase(),
      });
    }
  }

  return Array.from(byKey.values()).sort((a, b) =>
    a.title.localeCompare(b.title, "pt-BR"),
  );
}

function getLocalFallbackAgents() {
  return getAgentPages().map((page) => {
    const firstParagraph = page.blocks.find(
      (block) => block.type === "paragraph",
    );
    return {
      id: `${page.agentName.toLowerCase()}::${page.agentGroup.toLowerCase()}`,
      title: page.agentName,
      slug: page.slug,
      description:
        firstParagraph?.type === "paragraph"
          ? firstParagraph.text
          : page.metaDescription,
      group: page.agentGroup,
      problem: "Reduz trabalho manual e dispersão de informações.",
      operation:
        "Recebe informações fornecidas pelo usuário em texto estruturado.",
      delivery: "Entrega uma saída estruturada, revisável e acionável.",
      status: "ativo",
    } satisfies DemoAgent;
  });
}

function isKpiAgent(agent: DemoAgent) {
  return agent.title.toLowerCase().includes("kpi");
}

function normalizeDemoKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function getDemoScenario(agent: DemoAgent) {
  const key = normalizeDemoKey(agent.title);
  return CORE_DEMO_SCENARIOS.find(
    (scenario) => normalizeDemoKey(scenario.title) === key,
  );
}

function createFields(agent: DemoAgent): DemoField[] {
  const scenario = getDemoScenario(agent);
  if (!scenario) return [];

  return scenario.fields.flatMap((field) => {
    const value = scenario.values[field.key];
    if (value === undefined || value === null || String(value).trim() === "") {
      return [];
    }
    const rows = Math.max(4, Math.min(14, Number(field.rows) || 8));
    return [
      {
        key: field.key,
        label: field.label || field.key,
        rows,
        placeholder: field.placeholder || "",
        value: String(value),
      },
    ];
  });
}

function createMockResult(agent: DemoAgent, fields: DemoField[]): DemoResult {
  const inputReference = fields.map(({ label, value }) => ({ label, value }));
  if (isKpiAgent(agent)) {
    return {
      title: "Análise de KPIs",
      reviewNotice:
        "Análise gerencial revisável. KPIs podem refletir dados incompletos, recortes e correlações aparentes; não trate como causalidade definitiva.",
      summary:
        "Os dados indicam piora em NPS, tempo médio de espera, conversão e churn no período informado. A troca de ferramenta, o aumento de tickets e a ausência de analistas aparecem como hipóteses que precisam ser conferidas, não como causas definitivas.",
      inputReference,
      premises: [
        "Período observado: abril, conforme os dados de exemplo.",
        "A comparação usa os valores informados pelo usuário e a meta de SLA de 90%.",
        "Parte dos dados de atendimento do dia 12 não foi consolidada.",
      ],
      uncertainties: [
        "A amostra não informa volume total, segmentação por canal ou distribuição por equipe.",
        "Correlação entre a troca de ferramenta e a queda dos indicadores ainda precisa de validação.",
      ],
      highlights: [
        "NPS caiu de 72 para 61 e o tempo médio de espera subiu de 3 para 8 minutos.",
        "Conversão caiu de 18% para 14% e churn mensal subiu de 2,1% para 3,4%.",
        "SLA realizado ficou em 82%, abaixo da meta informada de 90%.",
      ],
      tables: [
        {
          title: "KPIs avaliados",
          columns: ["KPI", "Valor", "Meta", "Desvio", "Leitura", "Confiança"],
          rows: [
            {
              KPI: "NPS",
              Valor: "61",
              Meta: "72",
              Desvio: "-11 pts",
              Leitura: "Abaixo",
              Confiança: "Média",
            },
            {
              KPI: "Tempo médio de espera",
              Valor: "8 min",
              Meta: "3 min",
              Desvio: "+5 min",
              Leitura: "Atenção",
              Confiança: "Média",
            },
            {
              KPI: "Conversão comercial",
              Valor: "14%",
              Meta: "18%",
              Desvio: "-4 p.p.",
              Leitura: "Abaixo",
              Confiança: "Média",
            },
            {
              KPI: "SLA",
              Valor: "82%",
              Meta: "90%",
              Desvio: "-8 p.p.",
              Leitura: "Abaixo",
              Confiança: "Baixa",
            },
          ],
        },
      ],
      sections: [
        {
          title: "Hipóteses e ações",
          items: [
            "Verificar se a troca de ferramenta alterou o registro do tempo de espera e do SLA.",
            "Comparar os indicadores por canal, equipe e semana antes de atribuir causa.",
            "Reprocessar os dados do dia 12 e registrar a lacuna na próxima leitura.",
          ],
        },
      ],
      nextSteps: [
        "Validar os dados com responsáveis por atendimento e comercial.",
        "Recalcular os KPIs após consolidar os dados faltantes.",
        "Revisar as hipóteses com o contexto operacional completo.",
      ],
    };
  }

  return {
    title: `${agent.title} — resultado da demonstração`,
    reviewNotice:
      "Material de apoio operacional. A saída é simulada, revisável e não substitui a análise do responsável pelo processo.",
    summary: `A demonstração do ${agent.title} considerou exatamente os dados de exemplo do Core exibidos acima e organizou os pontos que merecem revisão humana antes de qualquer decisão operacional.`,
    inputReference,
    premises: [
      "A leitura considera apenas os valores do cenário oficial carregado pelo botão Exemplo do Core.",
      `Foram consideradas ${fields.length} entradas: ${fields.map((field) => field.label).join(", ")}.`,
    ],
    uncertainties: [
      "Dados ausentes ou incompletos podem alterar a leitura final.",
      "A demonstração não consulta sistemas, arquivos ou fontes externas.",
    ],
    highlights: [
      `${agent.delivery} O resultado é uma simulação para visualização do fluxo.`,
      "As premissas foram separadas dos achados para facilitar conferência e rastreabilidade.",
    ],
    tables: [],
    sections: [
      {
        title: "Hipóteses e ações",
        items: [
          "Conferir as entradas com o responsável pela rotina.",
          "Priorizar os pontos de atenção antes de tomar qualquer decisão.",
          "Registrar evidências e limitações para a próxima revisão.",
        ],
      },
    ],
    nextSteps: [
      "Validar o resultado com o responsável pelo processo.",
      "Complementar os dados e repetir a análise quando necessário.",
    ],
  };
}

function buildDemoResultText(result: DemoResult) {
  return [
    `# ${result.title}`,
    result.reviewNotice,
    "",
    "## Entradas utilizadas nesta simulação",
    ...result.inputReference.flatMap((input) => [
      `### ${input.label}`,
      input.value,
      "",
    ]),
    "## Resumo",
    result.summary,
    "",
    "## Premissas e fontes",
    ...result.premises.map((item) => `- ${item}`),
    "",
    "## Incertezas e limitações",
    ...result.uncertainties.map((item) => `- ${item}`),
    "",
    "## Destaques",
    ...result.highlights.map((item) => `- ${item}`),
    "",
    ...result.tables.flatMap((table) => [
      `## ${table.title}`,
      table.columns.join(" | "),
      ...table.rows.map((row) =>
        table.columns.map((column) => row[column] ?? "-").join(" | "),
      ),
      "",
    ]),
    ...result.sections.flatMap((section) => [
      `## ${section.title}`,
      ...section.items.map((item) => `- ${item}`),
      "",
    ]),
    "## Próximos passos",
    ...result.nextSteps.map((item) => `- ${item}`),
  ].join("\n");
}

function downloadDemoResult(result: DemoResult) {
  const blob = new Blob([buildDemoResultText(result)], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "cerneops-demo-resultado.txt";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DemoWorkspace() {
  const [agents, setAgents] = useState<DemoAgent[]>([]);
  const [isLoadingAgents, setIsLoadingAgents] = useState(true);
  const [hasAgentError, setHasAgentError] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [fields, setFields] = useState<DemoField[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [result, setResult] = useState<DemoResult | null>(null);
  const executionRef = useRef(0);

  useEffect(() => {
    let alive = true;

    const loadAgents = async () => {
      try {
        const plans = await fetchLandingPlans();
        if (!alive) return;
        const nextAgents = plans
          ? normalizeAgentsFromPlans(plans)
          : getLocalFallbackAgents();
        const resolvedAgents = nextAgents.length
          ? nextAgents
          : getLocalFallbackAgents();
        const preferredAgent =
          resolvedAgents.find(isKpiAgent) ?? resolvedAgents[0];
        setAgents(resolvedAgents);
        setSelectedId(preferredAgent?.id ?? "");
        setFields(preferredAgent ? createFields(preferredAgent) : []);
        setOpenGroups(
          preferredAgent ? new Set([preferredAgent.group]) : new Set(),
        );
        setHasAgentError(!plans);
      } catch {
        if (!alive) return;
        setAgents(getLocalFallbackAgents());
        setHasAgentError(true);
      } finally {
        if (alive) setIsLoadingAgents(false);
      }
    };

    void loadAgents();
    return () => {
      alive = false;
    };
  }, []);

  const selectedAgent = useMemo(
    () => agents.find((agent) => agent.id === selectedId) ?? agents[0],
    [agents, selectedId],
  );

  const canRun = useMemo(
    () => fields.length > 0 && status !== "loading",
    [fields, status],
  );

  useEffect(() => {
    if (!selectedAgent) return;
    setSelectedId((current) => current || selectedAgent.id);
    setFields(createFields(selectedAgent));
    setOpenGroups((current) => {
      if (current.size) return current;
      return new Set([selectedAgent.group]);
    });
  }, [selectedAgent]);

  const groupedAgents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const groups = new Map<string, DemoAgent[]>();
    for (const agent of agents) {
      if (
        normalizedSearch &&
        !agent.title.toLowerCase().includes(normalizedSearch) &&
        !agent.group.toLowerCase().includes(normalizedSearch)
      ) {
        continue;
      }
      const current = groups.get(agent.group) ?? [];
      current.push(agent);
      groups.set(agent.group, current);
    }
    return Array.from(groups.entries()).sort(([a], [b]) =>
      a.localeCompare(b, "pt-BR"),
    );
  }, [agents, search]);

  const selectAgent = (agent: DemoAgent) => {
    executionRef.current += 1;
    setSelectedId(agent.id);
    setFields(createFields(agent));
    setResult(null);
    setStatus("idle");
    setOpenGroups((current) => new Set(current).add(agent.group));
  };

  const handleNew = () => {
    if (!selectedAgent) return;
    executionRef.current += 1;
    setFields(createFields(selectedAgent));
    setResult(null);
    setStatus("idle");
  };

  const handleExample = () => {
    if (!selectedAgent) return;
    executionRef.current += 1;
    setFields(createFields(selectedAgent));
    setResult(null);
    setStatus("idle");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAgent || !canRun) return;
    const executionId = ++executionRef.current;
    setStatus("loading");
    setResult(null);
    window.setTimeout(() => {
      if (executionRef.current !== executionId) return;
      setResult(createMockResult(selectedAgent, fields));
      setStatus("success");
    }, 850);
  };

  const toggleGroup = (group: string) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-hero pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ember">
            <span>/</span>
            <span>Demo de agentes</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[350px_minmax(0,1fr)]">
            <aside className="min-w-0 overflow-x-clip rounded-2xl border border-border bg-background/65 p-5 shadow-elevated backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-semibold">
                    Selecione um agente por setor
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Escolha o setor e o agente que deseja testar.
                  </p>
                </div>
                <Bot className="mt-1 h-5 w-5 shrink-0 text-ember" />
              </div>

              <label className="relative mt-5 block">
                <span className="sr-only">Buscar setor ou agente</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar setor ou agente"
                  className="h-11 w-full rounded-lg border border-border bg-surface/50 pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground/75 focus:border-ember/60 focus:ring-2 focus:ring-ember/20"
                />
              </label>

              {isLoadingAgents ? (
                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-ember" />
                  Carregando catálogo oficial...
                </div>
              ) : null}

              {hasAgentError ? (
                <p className="mt-4 text-xs leading-relaxed text-amber-200">
                  Catálogo dinâmico indisponível. Exibindo a cópia local dos
                  agentes para a demonstração.
                </p>
              ) : null}

              <div className="mt-5 space-y-2">
                {groupedAgents.map(([group, groupAgents]) => {
                  const isOpen = openGroups.has(group);
                  return (
                    <div
                      key={group}
                      className="rounded-xl border border-border/80 bg-surface/30"
                    >
                      <button
                        type="button"
                        onClick={() => toggleGroup(group)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition hover:bg-surface/70"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <Bot className="h-4 w-4 shrink-0 text-ember" />
                          <span className="truncate text-sm font-medium">
                            {group}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                          {groupAgents.length} agentes
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      </button>

                      {isOpen ? (
                        <div className="border-t border-border/70 p-2">
                          {groupAgents.map((agent) => {
                            const selected = selectedAgent?.id === agent.id;
                            return (
                              <button
                                key={agent.id}
                                type="button"
                                onClick={() => selectAgent(agent)}
                                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                  selected
                                    ? "bg-ember/15 text-foreground ring-1 ring-ember"
                                    : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                                }`}
                              >
                                <span className="min-w-0 truncate">
                                  {agent.title}
                                </span>
                                {selected ? (
                                  <Check className="h-4 w-4 shrink-0 text-ember" />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl border border-circuit/25 bg-circuit/5 p-4 text-sm leading-relaxed text-muted-foreground">
                <ShieldCheck className="mb-2 h-5 w-5 text-circuit" />
                Todos os agentes operam com{" "}
                <span className="font-medium text-foreground">zero código</span>
                , seguindo os princípios Core de simplicidade, redução de
                burocracia e praticidade operacional.
              </div>
            </aside>

            <main className="min-w-0 space-y-6">
              {selectedAgent ? (
                <section className="rounded-2xl border border-border bg-background/65 p-5 shadow-elevated backdrop-blur-sm sm:p-7">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-ember">
                        Agente selecionado
                      </div>
                      <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                        {selectedAgent.title}
                      </h1>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {selectedAgent.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={handleNew}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/55 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-elevated"
                      >
                        <Plus className="h-4 w-4" />
                        Novo
                      </button>
                      <button
                        type="button"
                        onClick={handleExample}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/55 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-elevated"
                      >
                        <Sparkles className="h-4 w-4" />
                        Exemplo
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Dados preenchidos pelo botão “Exemplo” do Core CerneOps.
                      As entradas são exibidas exatamente como no fluxo do
                      agente e permanecem somente leitura.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {fields.map((field, index) => (
                        <label
                          key={field.key}
                          className={`block space-y-2 ${index === 2 ? "md:col-span-2" : ""}`}
                        >
                          <span className="text-xs text-muted-foreground">
                            {index + 1}. {field.label}
                          </span>
                          <textarea
                            value={field.value}
                            rows={field.rows}
                            readOnly
                            aria-readonly="true"
                            placeholder={field.placeholder}
                            className="w-full resize-none rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm leading-6 outline-none placeholder:text-muted-foreground/65"
                          />
                        </label>
                      ))}
                    </div>

                    {!fields.length ? (
                      <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
                        O cenário oficial de demonstração deste agente ainda
                        está em preparação. A execução ficará disponível assim
                        que o exemplo do Core for publicado.
                      </div>
                    ) : null}

                    <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                      <p>
                        Demonstração simulando uma análise real do Agente IA
                        Especialista.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        Entradas e resultado são simulados e somente leitura
                        para você conhecer o fluxo do Core.
                      </p>
                      <button
                        type="submit"
                        disabled={!canRun}
                        className="inline-flex items-center gap-2 rounded-lg gradient-ember px-5 py-3 font-semibold text-primary-foreground shadow-ember transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                      >
                        {status === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        {status === "loading"
                          ? "Executando demonstração..."
                          : "Executar análise"}
                      </button>
                    </div>
                  </form>
                </section>
              ) : (
                <section className="rounded-2xl border border-border bg-background/65 p-8 text-center text-muted-foreground">
                  Selecione um agente para iniciar a demonstração.
                </section>
              )}

              {result && selectedAgent ? (
                <section
                  data-testid="demo-result"
                  className="rounded-2xl border border-border bg-background/65 p-5 shadow-elevated backdrop-blur-sm sm:p-7"
                >
                  <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ember">
                        <CircleCheck className="h-4 w-4 text-emerald-400" />
                        Resultado estruturado
                      </div>
                      <h2 className="mt-2 font-display text-2xl font-semibold">
                        {result.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Revise antes de qualquer uso operacional.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadDemoResult(result)}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-surface/55 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      <FileText className="h-4 w-4" />
                      Exportar relatório
                    </button>
                  </div>

                  <div className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
                    {result.reviewNotice}
                  </div>

                  <div className="mt-4 rounded-lg border border-circuit/25 bg-circuit/5 p-4">
                    <h3 className="text-sm font-semibold text-foreground">
                      Entradas utilizadas nesta simulação
                    </h3>
                    <div className="mt-3 grid gap-3 lg:grid-cols-2">
                      {result.inputReference.map((input) => (
                        <div
                          key={input.label}
                          className="rounded-lg border border-border/70 bg-surface/30 p-3"
                        >
                          <p className="text-xs font-medium text-muted-foreground">
                            {input.label}
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-foreground/85">
                            {input.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg border border-border bg-surface/30 p-4">
                    <h3 className="text-base font-semibold">Resumo</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {result.summary}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <ResultList
                      title="Premissas e fontes"
                      items={result.premises}
                      empty="Sem premissas informadas."
                    />
                    <ResultList
                      title="Incertezas e limitações"
                      items={result.uncertainties}
                      empty="Sem incertezas informadas."
                      tone="warning"
                    />
                  </div>
                  <ResultList
                    title="Destaques"
                    items={result.highlights}
                    empty="Sem destaques informados."
                  />

                  {result.tables.map((table) => (
                    <div
                      key={table.title}
                      className="mt-4 overflow-x-auto rounded-lg border border-border"
                    >
                      <table className="min-w-full divide-y divide-border text-sm">
                        <caption className="bg-surface/30 px-4 py-3 text-left font-semibold text-foreground">
                          {table.title}
                        </caption>
                        <thead className="bg-surface/55 text-left text-muted-foreground">
                          <tr>
                            {table.columns.map((column) => (
                              <th
                                key={column}
                                className="whitespace-nowrap px-3 py-2 font-medium"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/60">
                          {table.rows.map((row, rowIndex) => (
                            <tr key={`${table.title}-${rowIndex}`}>
                              {table.columns.map((column) => (
                                <td
                                  key={column}
                                  className="whitespace-nowrap px-3 py-2 text-muted-foreground"
                                >
                                  {row[column] || "-"}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    {result.sections.map((section) => (
                      <ResultList
                        key={section.title}
                        title={section.title}
                        items={section.items}
                        empty="Sem itens informados."
                      />
                    ))}
                    <ResultList
                      title="Próximos passos"
                      items={result.nextSteps}
                      empty="Sem próximos passos."
                      tone="warning"
                    />
                  </div>
                </section>
              ) : null}

              {result ? <TrialCta /> : null}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

function ResultList({
  title,
  items,
  empty,
  tone = "default",
}: {
  title: string;
  items: string[];
  empty: string;
  tone?: "default" | "warning";
}) {
  const classes =
    tone === "warning"
      ? "border-amber-500/30 bg-amber-500/10"
      : "border-border bg-surface/30";
  return (
    <div className={`rounded-lg border p-4 ${classes}`}>
      <h3 className="text-sm font-semibold">{title}</h3>
      {items.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>- {item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground/70">{empty}</p>
      )}
    </div>
  );
}

function TrialCta() {
  return (
    <section
      data-testid="demo-trial-cta"
      className="rounded-2xl border border-ember/35 bg-ember/10 p-5 shadow-elevated sm:p-6"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ember/40 bg-ember/15 text-ember">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ember">
              Próximo passo
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight">
              Agora veja os ganhos em sua empresa na prática,{" "}
              <span className="text-ember">
                teste nosso trial gratuitamente
              </span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Leve o fluxo para os dados e rotinas reais da sua empresa. A
              demonstração reflete fielmente os Agentes IA Especialistas do Core
              CerneOps, teste!.
            </p>
          </div>
        </div>
        <a
          href="https://cerneops.com.br/planos/trial"
          className="inline-flex shrink-0 items-center justify-center rounded-lg gradient-ember px-5 py-3 font-semibold text-primary-foreground shadow-ember transition hover:brightness-110"
        >
          Testar o Trial gratuitamente
        </a>
      </div>
    </section>
  );
}
