import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  fetchPlanBySlug,
  formatPlanPriceBRL,
  formatPlanValue,
  getStaticPlanBySlug,
  mergePlanDynamic,
  type PlanDynamic,
} from "@/lib/plans";

const SITE_URL = "https://cerneops.com.br";
const CORE_SIGNUP_BASE =
  (import.meta.env.VITE_CORE_SIGNUP_BASE as string | undefined)?.replace(
    /\/+$/,
    "",
  ) || "https://core.cerneops.com.br";

function getPlanMeta(slug: string) {
  const plan = getStaticPlanBySlug(slug);
  if (!plan) {
    return {
      title: "Plano CerneOps",
      description: "Detalhes de plano da CerneOps.",
    };
  }
  return {
    title: `CerneOps ${plan.name} — Detalhes do plano`,
    description: `${plan.name}: ${plan.teaser}`,
  };
}

const PLAN_AGENT_COUNT: Record<string, number> = {
  start: 5,
  boost: 9,
  scale: 14,
  dominus: 20,
};

const TRIAL_TASK_LIMIT_FALLBACK = 10;

export const Route = createFileRoute("/planos/$slug")({
  head: ({ params }) => {
    const meta = getPlanMeta(params.slug);
    const canonical = `${SITE_URL}/planos/${params.slug}`;
    return {
      meta: [
        { title: meta.title },
        { name: "description", content: meta.description },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:title", content: meta.title },
        { property: "og:description", content: meta.description },
        { property: "og:site_name", content: "CerneOps" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: meta.title },
        { name: "twitter:description", content: meta.description },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: PlanRoutePage,
});

function PlanRoutePage() {
  const { slug } = Route.useParams();
  const staticPlan = useMemo(() => getStaticPlanBySlug(slug), [slug]);
  const [dynamic, setDynamic] = useState<PlanDynamic>({});
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const isTrialPlan = slug === "trial";

  useEffect(() => {
    let mounted = true;
    fetchPlanBySlug(slug).then((payload) => {
      if (!mounted || !payload) return;
      setDynamic({
        price_monthly: payload.price_monthly as
          | string
          | number
          | null
          | undefined,
        max_users: payload.max_users as string | number | null | undefined,
        max_agents: payload.max_agents as string | number | null | undefined,
        tasks_day: payload.tasks_day as string | number | null | undefined,
        tasks_month: payload.tasks_month as string | number | null | undefined,
        uploads_day: payload.uploads_day as string | number | null | undefined,
        upload_size: payload.upload_size as string | number | null | undefined,
        retention_days: payload.retention_days as
          | string
          | number
          | null
          | undefined,
        support_level: payload.support_level as string | null | undefined,
        priority: payload.priority as string | null | undefined,
        short_description: payload.short_description as
          | string
          | null
          | undefined,
        stripe_price_id: payload.stripe_price_id as string | null | undefined,
      });
    });
    return () => {
      mounted = false;
    };
  }, [slug]);

  const plan = useMemo(
    () => (staticPlan ? mergePlanDynamic(slug, dynamic) : null),
    [slug, dynamic, staticPlan],
  );
  const hasDynamicAgentCount =
    dynamic.max_agents !== null &&
    dynamic.max_agents !== undefined &&
    dynamic.max_agents !== "";
  const parsedAgentCount = Number(dynamic.max_agents);
  const planAgentCount =
    hasDynamicAgentCount && Number.isFinite(parsedAgentCount)
      ? Math.trunc(parsedAgentCount)
      : (PLAN_AGENT_COUNT[slug] ?? 0);
  const agentCountLabel =
    isTrialPlan && !hasDynamicAgentCount
      ? "Todos os agentes disponíveis no Core"
      : `${planAgentCount} agentes`;
  const trialTaskLimit =
    isTrialPlan &&
    (dynamic.tasks_month === null ||
      dynamic.tasks_month === undefined ||
      dynamic.tasks_month === "")
      ? TRIAL_TASK_LIMIT_FALLBACK
      : dynamic.tasks_month;
  const planJsonLd = useMemo(() => {
    if (!plan) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `CerneOps ${plan.name}`,
      provider: {
        "@type": "Organization",
        name: "CerneOps",
        url: SITE_URL,
      },
      description: plan.dynamic.short_description || plan.teaser,
      url: `${SITE_URL}/planos/${slug}`,
      areaServed: "BR",
    };
  }, [plan, slug]);

  const handleSubscribe = () => {
    setSubscribeOpen(true);
  };

  const handleConfirmSubscribe = () => {
    if (typeof window === "undefined") return;
    const target = new URL("/signup", CORE_SIGNUP_BASE);
    target.searchParams.set("plan", slug);
    window.location.assign(target.toString());
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="pt-40 pb-24">
          <div className="mx-auto max-w-4xl px-6">
            <h1 className="font-display text-4xl font-bold">
              Plano não encontrado
            </h1>
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
        {planJsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(planJsonLd) }}
          />
        ) : null}
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
                  <div className="mt-4 font-mono text-[15px] text-foreground/80">
                    {isTrialPlan
                      ? "Gratuito"
                      : formatPlanPriceBRL(plan.dynamic.price_monthly)}
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
                      {isTrialPlan ? "Começar Trial" : "Assinar plano"}
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
                      className={`relative h-auto object-contain opacity-95 ${
                        isTrialPlan
                          ? "w-[300px] sm:w-[384px] lg:w-[432px] xl:w-[480px]"
                          : "w-[250px] sm:w-[320px] lg:w-[360px] xl:w-[400px]"
                      }`}
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
              <h2 className="font-display text-2xl font-semibold">
                Para quem é este plano
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {plan.audience}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold">
                Agentes CerneOps inclusos nesse plano:{" "}
                <span className="text-ember">{agentCountLabel}</span>
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {isTrialPlan
                  ? "Experimente todos os agentes disponíveis no Core enquanto houver saldo Trial."
                  : "Contrate o time de agentes conforme sua necessidade"}
              </p>
              <div className="mt-5">
                <a
                  href="/agentes-cerneops"
                  className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-5 py-3 shadow-ember hover:brightness-110 transition"
                >
                  Confira nossos agentes disponíveis
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold mb-4">
                Capacidade do plano
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard
                  value={formatPlanValue(plan.dynamic.max_users)}
                  label="usuários"
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.tasks_day)}
                  label="tarefas/dia"
                />
                <StatCard
                  value={formatPlanValue(trialTaskLimit)}
                  label={isTrialPlan ? "tarefas Trial" : "tarefas/mês"}
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.uploads_day)}
                  label="uploads/dia"
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.upload_size)}
                  label="upload size"
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.retention_days)}
                  label="retenção dias"
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.support_level)}
                  label="suporte"
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.priority)}
                  label="prioridade"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold mb-4">
                O que muda na prática
              </h2>
              <div className="flex flex-wrap gap-2">
                {plan.impact.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-border/80 bg-background/35 px-3 py-1.5 text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold">
                Quando subir de plano
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {plan.evolution}
              </p>
            </div>

            <div className="rounded-2xl border border-ember/35 bg-surface-elevated p-7">
              <h2 className="font-display text-3xl font-semibold">
                Pronto para operar melhor?
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                >
                  {isTrialPlan ? "Começar Trial" : "Assinar plano"}
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
      <Dialog open={subscribeOpen} onOpenChange={setSubscribeOpen}>
        <DialogContent className="max-w-2xl rounded-2xl border-border bg-surface-elevated p-0 overflow-hidden">
          <div className="relative p-7 sm:p-8 lg:p-9">
            <div
              className="absolute inset-0 pointer-events-none opacity-35"
              style={{ background: "var(--gradient-radial-ember)" }}
            />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <div className="relative">
              <DialogHeader className="space-y-3 text-left">
                <div className="font-mono text-xs uppercase tracking-widest text-ember">
                  / Assinatura Core
                </div>
                <DialogTitle className="font-display text-3xl leading-tight">
                  {isTrialPlan ? "Começar Trial" : `Assinar plano ${plan.name}`}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                  {isTrialPlan
                    ? "Você está iniciando o cadastro Trial da CerneOps. A criação da empresa, da conta no Core e a confirmação de email acontecem no ambiente seguro do Core, sem cartão ou cobrança."
                    : "Você está iniciando a contratação do CerneOps Core. O cadastro da sua empresa e a criação da sua conta acontecem no ambiente seguro do Core antes da etapa de pagamento."}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                    Plano
                  </div>
                  <div className="mt-2 font-display text-xl leading-none">
                    {plan.name}
                  </div>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                    Valor
                  </div>
                  <div className="mt-2 font-display text-xl leading-none">
                    {isTrialPlan
                      ? "Gratuito"
                      : formatPlanPriceBRL(plan.dynamic.price_monthly)}
                  </div>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                    Capacidade
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-foreground/85">
                    {isTrialPlan ? (
                      <>
                        {agentCountLabel}
                        <br />
                        {formatPlanValue(trialTaskLimit)} tarefas Trial
                      </>
                    ) : (
                      <>
                        {formatPlanValue(plan.dynamic.max_users)} usuários
                        <br />
                        {planAgentCount} agentes
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-ember/25 bg-ember/10 px-4 py-3 text-sm leading-relaxed text-foreground/85">
                {isTrialPlan
                  ? "Ao continuar, você será direcionado para o Core para criar sua conta, confirmar seu email e ativar o Trial. Nenhum checkout, cartão ou cobrança é solicitado nesta página."
                  : "Ao continuar, você será direcionado para o Core para criar sua conta, confirmar seu email e seguir para o pagamento em ambiente seguro. Nenhum checkout é criado nesta página."}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleConfirmSubscribe}
                  className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                >
                  Continuar cadastro
                  <span aria-hidden>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubscribeOpen(false)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium hover:bg-surface transition"
                >
                  Voltar ao plano
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
