import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { trackPlanSelected, trackPricingViewed } from "@/lib/analytics";
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
import { useI18n, type Locale } from "@/lib/i18n";

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

function formatUploadSize(value: string | number | null | undefined) {
  const formatted = formatPlanValue(value);
  if (formatted === "—") return formatted;
  return /[a-zA-Z]/.test(formatted) ? formatted : `${formatted} MB`;
}

function formatAgentCountLabel(
  count: number,
  isTrialPlan: boolean,
  hasDynamicAgentCount: boolean,
  locale: Locale,
) {
  if (isTrialPlan && !hasDynamicAgentCount) {
    return locale === "en-US"
      ? "All agents available in Core"
      : "Todos os agentes disponíveis no Core";
  }
  return locale === "en-US" ? `${count} agents` : `${count} agentes`;
}

function getPlanPageCopy(locale: Locale, isTrialPlan: boolean) {
  const en = locale === "en-US";
  return {
    free: en ? "Free" : "Gratuito",
    startTrial: en ? "Start Trial" : "Começar Trial",
    subscribePlan: en ? "Subscribe to plan" : "Assinar plano",
    talkSpecialist: en ? "Talk to a specialist" : "Falar com especialista",
    audienceTitle: en ? "Who this plan is for" : "Para quem é este plano",
    includedTitle: en
      ? "CerneOps Agents included in this plan:"
      : "Agentes CerneOps inclusos nesse plano:",
    includedBody: isTrialPlan
      ? en
        ? "Try all agents available in Core while your Trial balance is available."
        : "Experimente todos os agentes disponíveis no Core enquanto houver saldo Trial."
      : en
        ? "Hire the agent team according to your needs."
        : "Contrate o time de agentes conforme sua necessidade",
    viewAgents: en
      ? "Explore available agents"
      : "Confira nossos agentes disponíveis",
    capacityTitle: en ? "Plan capacity" : "Capacidade do plano",
    users: en ? "users" : "usuários",
    tasksDay: en ? "tasks/day" : "tarefas/dia",
    tasksTrial: en ? "Trial tasks" : "tarefas Trial",
    tasksMonth: en ? "tasks/month" : "tarefas/mês",
    uploadsDay: en ? "uploads/day" : "uploads/dia",
    uploadSize: en ? "upload size" : "upload size",
    retentionDays: en ? "retention days" : "retenção dias",
    support: en ? "support" : "suporte",
    priority: en ? "priority" : "prioridade",
    practicalTitle: en ? "What changes in practice" : "O que muda na prática",
    upgradeTitle: en ? "When to upgrade" : "Quando subir de plano",
    readyTitle: en ? "Ready to operate better?" : "Pronto para operar melhor?",
    subscriptionEyebrow: en ? "/ Core subscription" : "/ Assinatura Core",
    modalTitle: isTrialPlan
      ? en
        ? "Start for free in less than 2 minutes"
        : "Comece gratuitamente em menos de 2 minutos"
      : "",
    modalDescription: isTrialPlan
      ? en
        ? "Try CerneOps for free and access digital specialists ready to support your operation. No card, no charge, no commitment."
        : "Teste a CerneOps gratuitamente e acesse especialistas digitais prontos para apoiar sua operação. Sem cartão, sem cobrança e sem compromisso."
      : en
        ? "You are starting a CerneOps Core subscription. Your company registration and account creation happen in the secure Core environment before payment."
        : "Você está iniciando a contratação do CerneOps Core. O cadastro da sua empresa e a criação da sua conta acontecem no ambiente seguro do Core antes da etapa de pagamento.",
    specialists: en ? "Specialists" : "Especialistas",
    plan: en ? "Plan" : "Plano",
    executions: en ? "Executions" : "Execuções",
    value: en ? "Price" : "Valor",
    security: en ? "Security" : "Segurança",
    capacity: en ? "Capacity" : "Capacidade",
    specialistsValue: en
      ? "58 digital specialists"
      : "58 especialistas digitais",
    executionsValue: en ? "10 free executions" : "10 execuções gratuitas",
    noCard: en ? "No credit card" : "Sem cartão de crédito",
    trialNotice: en
      ? "Your access will be created securely in Core. No checkout, card, or charge will be requested."
      : "Seu acesso será criado com segurança no Core. Nenhum checkout, cartão ou cobrança será solicitado.",
    paidNotice: en
      ? "When you continue, you will be redirected to Core to create your account, confirm your email, and proceed to payment in a secure environment. No checkout is created on this page."
      : "Ao continuar, você será direcionado para o Core para criar sua conta, confirmar seu email e seguir para o pagamento em ambiente seguro. Nenhum checkout é criado nesta página.",
    startFree: en ? "Start for free" : "Começar gratuitamente",
    continueSignup: en ? "Continue signup" : "Continuar cadastro",
    viewPlansAgain: en ? "View plans again" : "Ver planos novamente",
    backToPlan: en ? "Back to plan" : "Voltar ao plano",
    closeTrial: en ? "Close Trial modal" : "Fechar modal Trial",
  };
}

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
  const { locale } = useI18n();
  const { slug } = Route.useParams();
  const staticPlan = useMemo(
    () => getStaticPlanBySlug(slug, locale),
    [slug, locale],
  );
  const [dynamic, setDynamic] = useState<PlanDynamic>({});
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const isTrialPlan = slug === "trial";
  const copy = useMemo(
    () => getPlanPageCopy(locale, isTrialPlan),
    [isTrialPlan, locale],
  );

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
    () => (staticPlan ? mergePlanDynamic(slug, dynamic, locale) : null),
    [slug, dynamic, locale, staticPlan],
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
  const agentCountLabel = formatAgentCountLabel(
    planAgentCount,
    isTrialPlan,
    hasDynamicAgentCount,
    locale,
  );
  const trialTaskLimit =
    isTrialPlan &&
    (dynamic.tasks_month === null ||
      dynamic.tasks_month === undefined ||
      dynamic.tasks_month === "")
      ? TRIAL_TASK_LIMIT_FALLBACK
      : dynamic.tasks_month;
  const signupHref = useMemo(() => {
    const target = new URL("/signup", CORE_SIGNUP_BASE);
    target.searchParams.set("plan", slug);
    return target.toString();
  }, [slug]);
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
      description:
        locale === "pt-BR"
          ? plan.dynamic.short_description || plan.teaser
          : plan.teaser,
      url: `${SITE_URL}/planos/${slug}`,
      areaServed: "BR",
    };
  }, [locale, plan, slug]);

  useEffect(() => {
    trackPricingViewed();
  }, [slug]);

  const handleSubscribe = () => {
    if (plan) {
      trackPlanSelected({
        planName: plan.name,
        planSlug: plan.id,
        billingCycle: "monthly",
        value: plan.dynamic.price_monthly,
      });
    }
    setSubscribeOpen(true);
  };

  const handleConfirmSubscribe = () => {
    if (typeof window === "undefined") return;
    window.location.assign(signupHref);
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
                      ? copy.free
                      : formatPlanPriceBRL(plan.dynamic.price_monthly, locale)}
                  </div>
                  <p className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed">
                    {locale === "pt-BR"
                      ? plan.dynamic.short_description || plan.teaser
                      : plan.teaser}
                  </p>
                  <p className="mt-3 text-foreground/90">{plan.heroIntent}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {isTrialPlan ? (
                      <a
                        href="#trial-signup-modal"
                        onClick={() =>
                          trackPlanSelected({
                            planName: plan.name,
                            planSlug: plan.id,
                            billingCycle: "monthly",
                            value: plan.dynamic.price_monthly,
                          })
                        }
                        className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                      >
                        {copy.startTrial}
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubscribe}
                        className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                      >
                        {copy.subscribePlan}
                      </button>
                    )}
                    <a
                      href="/#contato"
                      className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium hover:bg-surface transition"
                    >
                      {copy.talkSpecialist}
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
                {copy.audienceTitle}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {plan.audience}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold">
                {copy.includedTitle}{" "}
                <span className="text-ember">{agentCountLabel}</span>
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {copy.includedBody}
              </p>
              <div className="mt-5">
                <a
                  href="/agentes-cerneops"
                  className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-5 py-3 shadow-ember hover:brightness-110 transition"
                >
                  {copy.viewAgents}
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold mb-4">
                {copy.capacityTitle}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <StatCard
                  value={formatPlanValue(plan.dynamic.max_users)}
                  label={copy.users}
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.tasks_day)}
                  label={copy.tasksDay}
                />
                <StatCard
                  value={formatPlanValue(trialTaskLimit)}
                  label={isTrialPlan ? copy.tasksTrial : copy.tasksMonth}
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.uploads_day)}
                  label={copy.uploadsDay}
                />
                <StatCard
                  value={formatUploadSize(plan.dynamic.upload_size)}
                  label={copy.uploadSize}
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.retention_days)}
                  label={copy.retentionDays}
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.support_level)}
                  label={copy.support}
                />
                <StatCard
                  value={formatPlanValue(plan.dynamic.priority)}
                  label={copy.priority}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface/55 p-7">
              <h2 className="font-display text-2xl font-semibold mb-4">
                {copy.practicalTitle}
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
                {copy.upgradeTitle}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {plan.evolution}
              </p>
            </div>

            <div className="rounded-2xl border border-ember/35 bg-surface-elevated p-7">
              <h2 className="font-display text-3xl font-semibold">
                {copy.readyTitle}
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {isTrialPlan ? (
                  <a
                    href="#trial-signup-modal"
                    onClick={() =>
                      trackPlanSelected({
                        planName: plan.name,
                        planSlug: plan.id,
                        billingCycle: "monthly",
                        value: plan.dynamic.price_monthly,
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                  >
                    {copy.startTrial}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubscribe}
                    className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                  >
                    {copy.subscribePlan}
                  </button>
                )}
                <a
                  href="/#contato"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium hover:bg-surface transition"
                >
                  {copy.talkSpecialist}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      {isTrialPlan ? (
        <TrialSignupAnchorModal
          signupHref={signupHref}
          slug={slug}
          locale={locale}
        />
      ) : null}
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
                  {copy.subscriptionEyebrow}
                </div>
                <DialogTitle className="font-display text-3xl leading-tight">
                  {isTrialPlan
                    ? copy.modalTitle
                    : locale === "en-US"
                      ? `Subscribe to ${plan.name}`
                      : `Assinar plano ${plan.name}`}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                  {isTrialPlan ? copy.modalDescription : copy.modalDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                    {isTrialPlan ? copy.specialists : copy.plan}
                  </div>
                  <div className="mt-2 font-display text-xl leading-tight">
                    {isTrialPlan ? copy.specialistsValue : plan.name}
                  </div>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                    {isTrialPlan ? copy.executions : copy.value}
                  </div>
                  <div className="mt-2 font-display text-xl leading-tight">
                    {isTrialPlan
                      ? copy.executionsValue
                      : formatPlanPriceBRL(plan.dynamic.price_monthly, locale)}
                  </div>
                </div>
                <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                    {isTrialPlan ? copy.security : copy.capacity}
                  </div>
                  <div
                    className={`mt-2 ${
                      isTrialPlan
                        ? "font-display text-xl leading-tight"
                        : "text-sm leading-relaxed text-foreground/85"
                    }`}
                  >
                    {isTrialPlan ? (
                      copy.noCard
                    ) : (
                      <>
                        {formatPlanValue(plan.dynamic.max_users)} {copy.users}
                        <br />
                        {formatAgentCountLabel(
                          planAgentCount,
                          false,
                          true,
                          locale,
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={`mt-5 rounded-xl px-4 py-3 text-sm leading-relaxed ${
                  isTrialPlan
                    ? "border border-emerald-400/25 bg-emerald-500/10 text-emerald-50/90"
                    : "border border-ember/25 bg-ember/10 text-foreground/85"
                }`}
              >
                {isTrialPlan ? copy.trialNotice : copy.paidNotice}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleConfirmSubscribe}
                  className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
                >
                  {isTrialPlan ? copy.startFree : copy.continueSignup}
                  <span aria-hidden>→</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubscribeOpen(false)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium hover:bg-surface transition"
                >
                  {isTrialPlan ? copy.viewPlansAgain : copy.backToPlan}
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

function TrialSignupAnchorModal({
  signupHref,
  slug,
  locale,
}: {
  signupHref: string;
  slug: string;
  locale: Locale;
}) {
  const copy = getPlanPageCopy(locale, true);
  return (
    <>
      <style>{`
        #trial-signup-modal {
          display: none;
        }
        #trial-signup-modal:target {
          display: flex;
        }
      `}</style>
      <div
        id="trial-signup-modal"
        className="fixed inset-0 z-50 items-center justify-center bg-background/80 px-4 py-8 backdrop-blur-sm"
      >
        <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface-elevated">
          <div
            className="absolute inset-0 pointer-events-none opacity-35"
            style={{ background: "var(--gradient-radial-ember)" }}
          />
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative p-7 sm:p-8 lg:p-9">
            <div className="font-mono text-xs uppercase tracking-widest text-ember">
              {copy.subscriptionEyebrow}
            </div>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
              {copy.modalTitle}
            </h2>
            <p className="mt-3 text-base text-foreground/80 leading-relaxed">
              {copy.modalDescription}
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                  {copy.specialists}
                </div>
                <div className="mt-2 font-display text-xl leading-tight">
                  {copy.specialistsValue}
                </div>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                  {copy.executions}
                </div>
                <div className="mt-2 font-display text-xl leading-tight">
                  {copy.executionsValue}
                </div>
              </div>
              <div className="rounded-xl border border-border/80 bg-background/35 px-4 py-3">
                <div className="font-mono text-[11px] uppercase tracking-widest text-ember">
                  {copy.security}
                </div>
                <div className="mt-2 font-display text-xl leading-tight">
                  {copy.noCard}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm leading-relaxed text-emerald-50/90">
              {copy.trialNotice}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={signupHref}
                className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
              >
                {copy.startFree}
                <span aria-hidden>→</span>
              </a>
              <a
                href={`/planos/${slug}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium hover:bg-surface transition"
              >
                {copy.viewPlansAgain}
              </a>
            </div>

            <a
              href={`/planos/${slug}`}
              aria-label={copy.closeTrial}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/60 text-foreground/75 hover:bg-surface"
            >
              ×
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
