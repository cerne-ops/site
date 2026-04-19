export type PlanSlug = "start" | "boost" | "scale" | "dominus";

export type PlanDynamic = {
  price_monthly?: string | number | null;
  max_users?: string | number | null;
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
  }> | null;
};

type LandingApiPlan = {
  id?: string;
  slug?: string;
  name?: string;
  label?: string;
  price?: string | number | null;
  maxUsers?: string | number | null;
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
  }> | null;
};

export type PlanStatic = {
  id: PlanSlug;
  name: string;
  label: string;
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
    id: "start",
    name: "Start",
    label: "Entrada",
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
    evolution: "Suba para Scale quando precisar de mais controle e previsibilidade.",
  },
  {
    id: "scale",
    name: "Scale",
    label: "Escala",
    teaser: "Para empresas que estruturam a operação.",
    bullets: ["Processos organizados", "Mais controle", "Produtividade por equipe"],
    heroIntent: "A operação começa a escalar.",
    audience: "Para empresas que precisam estruturar a operação para crescer.",
    whatCanDo: [
      "Gerar relatórios",
      "Analisar dados",
      "Criar processos",
      "Melhorar atendimento",
    ],
    impact: ["Mais controle", "Mais visibilidade", "Decisão mais rápida"],
    evolution: "Suba para Dominus quando precisar de capacidade máxima da plataforma.",
  },
  {
    id: "dominus",
    name: "Dominus",
    label: "Topo do Core",
    teaser: "Capacidade máxima da plataforma.",
    bullets: ["Todos os agentes", "Máxima capacidade", "Prioridade operacional"],
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

export function formatPlanValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

function normalizeSlug(input: string | undefined | null) {
  return (input ?? "").trim().toLowerCase();
}

export function getStaticPlanBySlug(slug: string) {
  const normalized = normalizeSlug(slug);
  return planCatalog.find((plan) => plan.id === normalized);
}

export function mergePlanDynamic(slug: string, dynamic: PlanDynamic) {
  const plan = getStaticPlanBySlug(slug);
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
    tasks_day: plan.tasksDay ?? null,
    tasks_month: plan.tasksMonth ?? null,
    uploads_day: plan.uploadsDay ?? null,
    upload_size: plan.uploadSize ?? null,
    retention_days: plan.retentionDays ?? null,
    support_level: plan.supportLevel ?? null,
    priority: plan.priority ?? null,
    stripe_price_id: plan.stripePriceId ?? null,
    agents: Array.isArray(plan.agents) ? plan.agents : [],
  };
}

export async function fetchLandingPlans() {
  try {
    const response = await fetch(`${getPlansApiBase()}/api/plans/landing`);
    if (!response.ok) throw new Error("landing plans unavailable");
    const payload = (await response.json()) as { plans?: LandingApiPlan[] };
    if (!Array.isArray(payload?.plans)) throw new Error("invalid landing payload");
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
