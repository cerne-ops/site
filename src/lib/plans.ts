import startLogo from "@/assets/planos/START.png";
import boostLogo from "@/assets/planos/BOOST.png";
import scaleLogo from "@/assets/planos/SCALE.png";
import dominusLogo from "@/assets/planos/DOMINUS.png";
import trialLogo from "@/assets/planos/TRIAL.png";
import { type Locale } from "@/lib/i18n";

export type PlanSlug = "trial" | "start" | "boost" | "scale" | "dominus";

export type PlanDynamic = {
  price_monthly?: string | number | null;
  max_users?: string | number | null;
  max_agents?: string | number | null;
  tasks_day?: string | number | null;
  tasks_month?: string | number | null;
  uploads_day?: string | number | null;
  upload_size?: string | number | null;
  retention_days?: string | number | null;
  support_level?: string | null;
  priority?: string | null;
  short_description?: string | null;
  stripe_price_id?: string | null;
  agents?: Array<{
    name?: string | null;
    description?: string | null;
    group?: string | null;
    group_key?: string | null;
    group_name?: string | null;
    problem?: string | null;
    operation?: string | null;
    delivery?: string | null;
    status?: "ativo" | "inativo" | "manutencao" | "desenvolvimento" | null;
  }> | null;
};

type LandingApiPlan = {
  id?: string;
  slug?: string;
  name?: string;
  label?: string;
  price?: string | number | null;
  maxUsers?: string | number | null;
  maxAgents?: string | number | null;
  tasksDay?: string | number | null;
  tasksMonth?: string | number | null;
  uploadsDay?: string | number | null;
  uploadSize?: string | number | null;
  retentionDays?: string | number | null;
  supportLevel?: string | null;
  priority?: string | number | null;
  stripePriceId?: string | null;
  agents?: Array<{
    name?: string | null;
    description?: string | null;
    group?: string | null;
    group_key?: string | null;
    group_name?: string | null;
    problem?: string | null;
    operation?: string | null;
    delivery?: string | null;
    status?: "ativo" | "inativo" | "manutencao" | "desenvolvimento" | null;
  }> | null;
};

export type PlanStatic = {
  id: PlanSlug;
  name: string;
  label: string;
  logo: string;
  teaser: string;
  bullets: string[];
  heroIntent: string;
  audience: string;
  whatCanDo: string[];
  impact: string[];
  evolution: string;
};

export const planCatalog: PlanStatic[] = [
  {
    id: "trial",
    name: "Trial",
    label: "Descoberta",
    logo: trialLogo,
    teaser: "Destrave sua operação. Descubra o poder da CerneOps.",
    bullets: ["Todos os agentes", "Sem cartão", "10 tarefas Trial"],
    heroIntent:
      "Teste a CerneOps sem cobrança inicial e faça upgrade quando precisar continuar.",
    audience:
      "Para empresas que querem experimentar o Core antes de contratar um plano pago.",
    whatCanDo: [
      "Acessar todos os agentes",
      "Executar tarefas dentro do saldo Trial",
      "Conhecer o Core sem cartão",
      "Fazer upgrade ao final do teste",
    ],
    impact: ["Sem cobrança inicial", "Validação rápida", "Upgrade guiado"],
    evolution:
      "Ao consumir o saldo do Trial, escolha um plano pago em Configurações / Geral para continuar operando.",
  },
  {
    id: "start",
    name: "Start",
    label: "Entrada",
    logo: startLogo,
    teaser: "Para sair do manual e começar a organizar o dia a dia.",
    bullets: ["Execução com padrão", "Organização básica", "Uso individual"],
    heroIntent: "O primeiro passo para sair do manual.",
    audience:
      "Para quem ainda faz tudo manualmente e quer começar a organizar o dia a dia.",
    whatCanDo: [
      "Criar textos prontos",
      "Resumir conteúdos",
      "Organizar ideias",
      "Padronizar tarefas",
    ],
    impact: ["Mais velocidade", "Menos esforço", "Organização inicial"],
    evolution: "Suba para Boost quando sua operação começar a rodar em equipe.",
  },
  {
    id: "boost",
    name: "Boost",
    label: "Aceleração",
    logo: boostLogo,
    teaser: "Para operações que precisam ganhar velocidade.",
    bullets: ["Mais capacidade", "Uso em equipe", "Menos retrabalho"],
    heroIntent: "A operação começa a ganhar tração.",
    audience: "Para equipes que já sentem retrabalho e falta de padrão.",
    whatCanDo: [
      "Organizar equipe",
      "Padronizar execução",
      "Priorizar demandas",
      "Ajustar comunicação",
    ],
    impact: ["Menos retrabalho", "Mais consistência", "Equipe mais produtiva"],
    evolution:
      "Suba para Scale quando precisar de mais controle e previsibilidade.",
  },
  {
    id: "scale",
    name: "Scale",
    label: "Escala",
    logo: scaleLogo,
    teaser: "Para empresas que estruturam a operação.",
    bullets: [
      "Processos organizados",
      "Mais controle",
      "Produtividade por equipe",
    ],
    heroIntent: "A operação começa a escalar.",
    audience: "Para empresas que precisam estruturar a operação para crescer.",
    whatCanDo: [
      "Gerar relatórios",
      "Analisar dados",
      "Criar processos",
      "Melhorar atendimento",
    ],
    impact: ["Mais controle", "Mais visibilidade", "Decisão mais rápida"],
    evolution:
      "Suba para Dominus quando precisar de capacidade máxima da plataforma.",
  },
  {
    id: "dominus",
    name: "Dominus",
    label: "Domínio",
    logo: dominusLogo,
    teaser: "Capacidade máxima da plataforma.",
    bullets: [
      "Todos os agentes",
      "Máxima capacidade",
      "Prioridade operacional",
    ],
    heroIntent: "Capacidade máxima do Core.",
    audience: "Para operações que exigem máxima capacidade e controle total.",
    whatCanDo: [
      "Estruturar documentos",
      "Extrair dados",
      "Comparar cenários",
      "Detectar problemas",
      "Sugerir ações",
    ],
    impact: ["Mais autonomia", "Mais inteligência", "Mais capacidade"],
    evolution: "Quando o desafio for operação inteira, avance para o Supra.",
  },
];

const planCatalogEn: Record<
  PlanSlug,
  Omit<PlanStatic, "id" | "name" | "logo">
> = {
  trial: {
    label: "Discovery",
    teaser: "Unlock your operation. Discover the power of CerneOps.",
    bullets: ["All agents", "No credit card", "10 Trial tasks"],
    heroIntent:
      "Try CerneOps with no upfront charge and upgrade whenever you need to keep operating.",
    audience:
      "For companies that want to experience Core before choosing a paid plan.",
    whatCanDo: [
      "Access every agent",
      "Run tasks within the Trial balance",
      "Explore Core without a credit card",
      "Upgrade at the end of the test",
    ],
    impact: ["No upfront charge", "Fast validation", "Guided upgrade"],
    evolution:
      "After using the Trial balance, choose a paid plan in Settings / General to keep operating.",
  },
  start: {
    label: "Entry",
    teaser: "For leaving manual work behind and organizing daily execution.",
    bullets: ["Standardized execution", "Basic organization", "Individual use"],
    heroIntent: "The first step out of manual work.",
    audience:
      "For teams still doing everything manually and ready to organize daily operations.",
    whatCanDo: [
      "Create ready-to-use text",
      "Summarize content",
      "Organize ideas",
      "Standardize tasks",
    ],
    impact: ["More speed", "Less effort", "Initial organization"],
    evolution: "Move to Boost when your operation starts running as a team.",
  },
  boost: {
    label: "Acceleration",
    teaser: "For operations that need to gain speed.",
    bullets: ["More capacity", "Team use", "Less rework"],
    heroIntent: "The operation starts gaining traction.",
    audience: "For teams already feeling rework and lack of standardization.",
    whatCanDo: [
      "Organize the team",
      "Standardize execution",
      "Prioritize demand",
      "Adjust communication",
    ],
    impact: ["Less rework", "More consistency", "A more productive team"],
    evolution: "Move to Scale when you need more control and predictability.",
  },
  scale: {
    label: "Scale",
    teaser: "For companies structuring their operation.",
    bullets: ["Organized processes", "More control", "Team productivity"],
    heroIntent: "The operation starts scaling.",
    audience: "For companies that need to structure operations to grow.",
    whatCanDo: [
      "Generate reports",
      "Analyze data",
      "Create processes",
      "Improve service",
    ],
    impact: ["More control", "More visibility", "Faster decisions"],
    evolution: "Move to Dominus when you need maximum platform capacity.",
  },
  dominus: {
    label: "Mastery",
    teaser: "Maximum platform capacity.",
    bullets: ["All agents", "Maximum capacity", "Operational priority"],
    heroIntent: "Maximum Core capacity.",
    audience: "For operations that require maximum capacity and full control.",
    whatCanDo: [
      "Structure documents",
      "Extract data",
      "Compare scenarios",
      "Detect problems",
      "Suggest actions",
    ],
    impact: ["More autonomy", "More intelligence", "More capacity"],
    evolution: "When the challenge is the entire operation, move to Supra.",
  },
};

export function getPlanCatalog(locale: Locale = "pt-BR") {
  if (locale !== "en-US") return planCatalog;
  return planCatalog.map((plan) => ({
    ...plan,
    ...planCatalogEn[plan.id],
  }));
}

export function formatPlanValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

export function formatPlanPriceBRL(
  value: string | number | null | undefined,
  locale: Locale = "pt-BR",
) {
  if (value === null || value === undefined || value === "") return "—";

  const toCurrency = (amount: number) =>
    `${new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)}${locale === "en-US" ? "/month" : "/mês"}`;

  if (typeof value === "number" && Number.isFinite(value)) {
    return toCurrency(value);
  }

  const raw = String(value).trim();
  const normalized = raw
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");
  const parsed = Number(normalized);

  if (Number.isFinite(parsed)) {
    return toCurrency(parsed);
  }

  return raw;
}

function normalizeSlug(input: string | undefined | null) {
  return (input ?? "").trim().toLowerCase();
}

export function getStaticPlanBySlug(slug: string, locale: Locale = "pt-BR") {
  const normalized = normalizeSlug(slug);
  return getPlanCatalog(locale).find((plan) => plan.id === normalized);
}

export function mergePlanDynamic(
  slug: string,
  dynamic: PlanDynamic,
  locale: Locale = "pt-BR",
) {
  const plan = getStaticPlanBySlug(slug, locale);
  if (!plan) return null;
  return { ...plan, dynamic };
}

function getPlansApiBase() {
  const configured = import.meta.env.VITE_PLANS_API_BASE as string | undefined;
  const fallback = "https://admin.cerneops.com.br";
  return (configured || fallback).replace(/\/+$/, "");
}

function mapApiPlanToLegacy(plan: LandingApiPlan): Record<string, unknown> {
  const slug = String(plan.slug || plan.id || "").toLowerCase();
  return {
    id: slug,
    slug,
    name: plan.name,
    label: plan.label,
    price_monthly: plan.price ?? null,
    max_users: plan.maxUsers ?? null,
    max_agents: plan.maxAgents ?? null,
    tasks_day: plan.tasksDay ?? null,
    tasks_month: plan.tasksMonth ?? null,
    uploads_day: plan.uploadsDay ?? null,
    upload_size: plan.uploadSize ?? null,
    retention_days: plan.retentionDays ?? null,
    support_level: plan.supportLevel ?? null,
    priority: plan.priority ?? null,
    stripe_price_id: plan.stripePriceId ?? null,
    agents: Array.isArray(plan.agents)
      ? plan.agents.map((agent) => ({
          name: agent?.name ?? null,
          description: agent?.description ?? null,
          group: agent?.group ?? null,
          group_key: agent?.group_key ?? null,
          group_name: agent?.group_name ?? null,
          problem: agent?.problem ?? null,
          operation: agent?.operation ?? null,
          delivery: agent?.delivery ?? null,
          status: agent?.status ?? "ativo",
        }))
      : [],
  };
}

export async function fetchLandingPlans() {
  try {
    const response = await fetch(`${getPlansApiBase()}/api/plans/landing`);
    if (!response.ok) throw new Error("landing plans unavailable");
    const payload = (await response.json()) as { plans?: LandingApiPlan[] };
    if (!Array.isArray(payload?.plans))
      throw new Error("invalid landing payload");
    return payload.plans.map(mapApiPlanToLegacy);
  } catch {
    return null;
  }
}

export async function fetchPlanBySlug(slug: string) {
  try {
    const response = await fetch(`${getPlansApiBase()}/api/plans/${slug}`);
    if (!response.ok) throw new Error("plan unavailable");
    const payload = (await response.json()) as { plan?: LandingApiPlan | null };
    if (!payload?.plan) return null;
    return mapApiPlanToLegacy(payload.plan);
  } catch {
    return null;
  }
}
