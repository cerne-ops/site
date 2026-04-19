import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  fetchPlanBySlug,
  formatPlanValue,
  getStaticPlanBySlug,
  mergePlanDynamic,
  type PlanDynamic,
} from "@/lib/plans";

declare global {
  interface Window {
    openCheckout?: (priceId: string) => void;
  }
}

function getPlanMeta(slug: string) {
  const plan = getStaticPlanBySlug(slug);
  if (!plan) {
    return {
      title: "Plano Cerne",
      description: "Detalhes de plano da Cerne.",
    };
  }
  return {
    title: `Cerne ${plan.name} — Detalhes do plano`,
    description: `${plan.name}: ${plan.teaser}`,
  };
}

const AGENT_GROUP_LABELS: Record<string, string> = {
  comunicacao_conteudo: "Comunicacao e Conteudo",
  organizacao_execucao: "Organizacao e Execucao",
  conhecimento_estruturacao: "Conhecimento e Estruturacao",
  atendimento_relacionamento: "Atendimento e Relacionamento",
  dados_inteligencia_operacional: "Dados e Inteligencia Operacional",
};

function normalizeGroupLabel(groupKey?: string) {
  const normalized = String(groupKey || "")
    .trim()
    .toLowerCase();
  if (!normalized) return "Outros agentes";
  return AGENT_GROUP_LABELS[normalized] || "Outros agentes";
}

export const Route = createFileRoute("/planos/$slug")({
  head: ({ params }) => {
    const meta = getPlanMeta(params.slug);
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.description },
      ],
    };
  },
  component: PlanRoutePage,
});

function PlanRoutePage() {
  const { slug } = Route.useParams();
  const staticPlan = useMemo(() => getStaticPlanBySlug(slug), [slug]);
  const [dynamic, setDynamic] = useState<PlanDynamic>({});
  const [agents, setAgents] = useState<Array<{ name?: string; description?: string; group?: string }>>(
    [],
  );
  const groupedAgents = useMemo(() => {
    const groups = new Map<string, Array<{ name?: string; description?: string; group?: string }>>();
    for (const agent of agents) {
      const label = normalizeGroupLabel(agent.group);
      const current = groups.get(label) || [];
      current.push(agent);
      groups.set(label, current);
    }
    return Array.from(groups.entries()).map(([groupLabel, items]) => ({ groupLabel, items }));
  }, [agents]);

  useEffect(() => {
    let mounted = true;
    fetchPlanBySlug(slug).then((payload) => {
      if (!mounted || !payload) return;
      setDynamic({
        price_monthly: payload.price_monthly as string | number | null | undefined,
        max_users: payload.max_users as string | number | null | undefined,
        tasks_day: payload.tasks_day as string | number | null | undefined,
        tasks_month: payload.tasks_month as string | number | null | undefined,
        uploads_day: payload.uploads_day as string | number | null | undefined,
        upload_size: payload.upload_size as string | number | null | undefined,
        retention_days: payload.retention_days as string | number | null | undefined,
        support_level: payload.support_level as string | null | undefined,
        priority: payload.priority as string | null | undefined,
        short_description: payload.short_description as string | null | undefined,
        stripe_price_id: payload.stripe_price_id as string | null | undefined,
      });
      if (Array.isArray(payload.agents)) {
        setAgents(
          payload.agents.map((agent) => ({
            name: String((agent as { name?: unknown }).name ?? ""),
            description: String((agent as { description?: unknown }).description ?? ""),
            group: String((agent as { group?: unknown }).group ?? ""),
          })),
        );
      }
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const plan = useMemo(() => (staticPlan ? mergePlanDynamic(slug, dynamic) : null), [slug, dynamic, staticPlan]);

  const handleSubscribe = () => {
    const priceId = dynamic.stripe_price_id;
    if (!priceId) return;
    if (typeof window !== "undefined" && typeof window.openCheckout === "function") {
      window.openCheckout(priceId);
    }
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-40 pb-24">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="font-display text-4xl font-bold">Plano não encontrado</h1>
            <p className="mt-4 text-muted-foreground">
              Esse plano não está disponível no momento.
            </p>
            <a
              href="/#planos"
              className="mt-8 inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
            >
              Voltar para planos
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-36 pb-24">
        <section className="relative">
          <div className="absolute inset-0 bg-grid opacity-35 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="rounded-3xl border border-border bg-surface/55 p-8 lg:p-12">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                <div className="lg:col-span-6">
                  <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
                    {plan.label}
                  </div>
                  <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[0.95]">
                    {plan.name}
                  </h1>
                  <div className="mt-4 font-mono text-sm text-foreground/80">
                    {formatPlanValue(plan.dynamic.price_monthly)}
                  </div>
                  <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
                    {plan.dynamic.short_description || plan.teaser}
                  </p>
                  <p className="mt-3 text-foreground/90">{plan.heroIntent}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleSubscribe}
                      className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                    >
                      Assinar plano
                    </button>
                    <a
                      href="/#contato"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium hover:bg-surface transition"
                    >
                      Falar com especialista
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute h-28 w-44 sm:h-36 sm:w-56 lg:h-44 lg:w-64 rounded-full bg-white/15 blur-3xl pointer-events-none" />
                    <img
                      src={plan.logo}
                      alt={`${plan.name} logo`}
                      className="relative w-[250px] sm:w-[320px] lg:w-[360px] xl:w-[400px] h-auto object-contain opacity-95"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mx-auto max-w-7xl px-6 grid gap-6">
            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold">Para quem é este plano</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{plan.audience}</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold mb-4">O que você consegue fazer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {plan.whatCanDo.map((item) => (
                  <div key={item} className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold mb-4">Capacidade do plano</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard value={formatPlanValue(plan.dynamic.max_users)} label="usuários" />
                <StatCard value={formatPlanValue(plan.dynamic.tasks_day)} label="tarefas/dia" />
                <StatCard value={formatPlanValue(plan.dynamic.tasks_month)} label="tarefas/mês" />
                <StatCard value={formatPlanValue(plan.dynamic.uploads_day)} label="uploads/dia" />
                <StatCard value={formatPlanValue(plan.dynamic.upload_size)} label="upload size" />
                <StatCard value={formatPlanValue(plan.dynamic.retention_days)} label="retenção dias" />
                <StatCard value={formatPlanValue(plan.dynamic.support_level)} label="suporte" />
                <StatCard value={formatPlanValue(plan.dynamic.priority)} label="prioridade" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold mb-4">Agentes incluídos</h2>
              {groupedAgents.length > 0 ? (
                <div className="space-y-5">
                  {groupedAgents.map(({ groupLabel, items }) => (
                    <div key={groupLabel} className="space-y-3">
                      <h3 className="font-display text-lg font-semibold text-foreground/90">{groupLabel}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {items.map((agent, index) => (
                          <div
                            key={`${groupLabel}-${agent.name}-${index}`}
                            className="rounded-xl border border-border/80 bg-background/35 p-4"
                          >
                            <div className="font-semibold">{agent.name || "Agente"}</div>
                            {agent.description ? (
                              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-border/80 bg-background/35 p-4 text-sm text-muted-foreground">
                  Nenhum agente disponivel para este plano no momento.
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold mb-4">O que muda na prática</h2>
              <div className="flex flex-wrap gap-2">
                {plan.impact.map((item) => (
                  <span key={item} className="inline-flex items-center rounded-full border border-border/80 bg-background/35 px-3 py-1.5 text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold">Quando subir de plano</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{plan.evolution}</p>
            </div>

            <div className="rounded-2xl border border-ember/35 bg-surface-elevated p-7">
              <h2 className="font-display text-3xl font-semibold">Pronto para operar melhor?</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                >
                  Assinar plano
                </button>
                <a
                  href="/#contato"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium hover:bg-surface transition"
                >
                  Falar com especialista
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
      <div className="font-display text-xl leading-none">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
