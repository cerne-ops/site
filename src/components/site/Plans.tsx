import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSupraContactModal } from "@/components/site/SupraContactModal";

type PlanDynamic = {
  price_monthly?: string | number | null;
  max_users?: string | number | null;
  tasks_day?: string | number | null;
  tasks_month?: string | number | null;
  uploads_day?: string | number | null;
  upload_size?: string | number | null;
  retention_days?: string | number | null;
  support_level?: string | null;
  priority?: string | null;
};

type PlanStatic = {
  id: "start" | "boost" | "scale" | "dominus";
  name: string;
  label: string;
  description: string;
  bullets: string[];
  modalHeadline: string;
  modalDescription: string;
  modalWhatItDoes: string[];
  modalImpact: string[];
  modalCta: string;
  isHighlighted?: boolean;
};

type PlanView = PlanStatic & {
  dynamic: PlanDynamic;
};

const planCatalog: PlanStatic[] = [
  {
    id: "start",
    name: "Start",
    label: "Entrada",
    description: "Para sair do manual e começar a organizar o dia a dia.",
    bullets: ["Execução com padrão", "Organização básica", "Uso individual"],
    modalHeadline: "O primeiro passo para sair do manual",
    modalDescription:
      "Você começa a organizar tarefas básicas e parar de fazer tudo do zero.",
    modalWhatItDoes: [
      "Criar textos prontos",
      "Resumir informações",
      "Organizar tarefas",
      "Padronizar execuções",
    ],
    modalImpact: ["Mais velocidade", "Menos esforço manual", "Início da organização"],
    modalCta: "Começar agora",
  },
  {
    id: "boost",
    name: "Boost",
    label: "Aceleração",
    description: "Para operações que precisam ganhar velocidade.",
    bullets: ["Mais capacidade", "Uso em equipe", "Menos retrabalho"],
    modalHeadline: "A operação começa a ganhar tração",
    modalDescription: "Você sai do uso individual e entra na operação real.",
    modalWhatItDoes: [
      "Organizar equipe",
      "Padronizar execução",
      "Ajustar comunicação",
      "Priorizar tarefas",
    ],
    modalImpact: ["Menos retrabalho", "Mais consistência", "Mais produtividade"],
    modalCta: "Acelerar minha operação",
  },
  {
    id: "scale",
    name: "Scale",
    label: "Escala",
    description: "Para empresas que estruturam a operação.",
    bullets: ["Processos organizados", "Mais controle", "Produtividade por equipe"],
    modalHeadline: "A operação começa a escalar",
    modalDescription: "A IA passa a estruturar como a empresa funciona.",
    modalWhatItDoes: [
      "Gerar relatórios",
      "Analisar dados",
      "Criar processos",
      "Organizar fluxos",
    ],
    modalImpact: ["Mais controle", "Mais visibilidade", "Decisão mais rápida"],
    modalCta: "Escalar minha operação",
  },
  {
    id: "dominus",
    name: "Dominus",
    label: "Topo do Core",
    description: "Capacidade máxima da plataforma.",
    bullets: ["Todos os agentes", "Máxima capacidade", "Prioridade operacional"],
    modalHeadline: "Capacidade máxima do Core",
    modalDescription: "Tudo que a plataforma pode entregar, no nível mais alto.",
    modalWhatItDoes: [
      "Estruturar documentos",
      "Organizar dados",
      "Comparar cenários",
      "Identificar problemas",
      "Sugerir ações",
    ],
    modalImpact: ["Mais autonomia", "Mais inteligência", "Mais decisão"],
    modalCta: "Operar no nível máximo",
    isHighlighted: true,
  },
];

declare global {
  interface Window {
    __CERNE_PLANS__?: Record<string, PlanDynamic>;
    openCheckout?: (planId: string) => void;
  }
}

function formatValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

function handlePlanClick(planId: string) {
  if (typeof window !== "undefined" && typeof window.openCheckout === "function") {
    window.openCheckout(planId);
  }
}

export function Plans() {
  const { openModal } = useSupraContactModal();

  const plans = useMemo<PlanView[]>(() => {
    if (typeof window === "undefined") {
      return planCatalog.map((plan) => ({ ...plan, dynamic: {} }));
    }
    const source = window.__CERNE_PLANS__ ?? {};
    return planCatalog.map((plan) => ({ ...plan, dynamic: source[plan.id] ?? {} }));
  }, []);

  return (
    <section id="planos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
            / Planos do Core
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Escolha o tamanho
            <br />
            <span className="text-muted-foreground">da sua operação.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Você começa simples e evolui conforme sua operação cresce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <Dialog key={plan.id}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className={`text-left relative rounded-2xl p-7 border transition-all hover:-translate-y-1 hover:shadow-ember ${
                    plan.isHighlighted
                      ? "border-ember/55 bg-surface-elevated ring-1 ring-ember/30"
                      : "border-border bg-surface/60 hover:border-ember/35"
                  }`}
                >
                  {plan.isHighlighted ? (
                    <div className="absolute -top-3 left-7 font-mono text-[10px] uppercase tracking-widest gradient-ember text-primary-foreground px-2 py-1 rounded">
                      Mais completo
                    </div>
                  ) : null}
                  <div className="font-mono text-xs text-ember uppercase tracking-widest mb-2">
                    {plan.label}
                  </div>
                  <div className="font-display text-3xl font-bold mb-1">{plan.name}</div>
                  <div className="font-mono text-xs text-foreground/70 mb-4">
                    {formatValue(plan.dynamic.price_monthly)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {plan.description}
                  </p>
                  <ul className="space-y-2.5 text-sm mb-6">
                    {plan.bullets.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-ember shrink-0" />
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1 text-sm text-ember font-medium">
                    Ver detalhes <span aria-hidden>→</span>
                  </span>
                </button>
              </DialogTrigger>

              <DialogContent className="w-[calc(100vw-1rem)] h-[calc(100dvh-1rem)] sm:h-auto sm:max-w-2xl rounded-2xl border-border bg-surface-elevated p-0 overflow-hidden">
                <div className="flex h-full flex-col">
                  <div className="border-b border-border/80 p-6 sm:p-7 bg-background/35">
                    <DialogHeader className="text-left space-y-3">
                      <div className="font-mono text-xs uppercase tracking-widest text-ember">
                        {plan.label} / {plan.name}
                      </div>
                      <DialogTitle className="font-display text-3xl leading-tight tracking-tight">
                        {plan.modalHeadline}
                      </DialogTitle>
                      <DialogDescription className="text-base text-foreground/85 leading-relaxed">
                        {plan.modalDescription}
                      </DialogDescription>
                    </DialogHeader>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 sm:p-7">
                    <div className="font-mono text-[11px] uppercase tracking-widest text-ember mb-3">
                      / O que faz
                    </div>
                    <ul className="space-y-3 text-sm">
                      {plan.modalWhatItDoes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-ember shrink-0" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="font-mono text-[11px] uppercase tracking-widest text-ember mt-7 mb-3">
                      / Limites do plano
                    </div>
                    <ul className="space-y-2.5 text-sm text-foreground/90">
                      <li>Até {formatValue(plan.dynamic.max_users)} usuário(s)</li>
                      <li>{formatValue(plan.dynamic.tasks_day)} tarefas/dia</li>
                      <li>{formatValue(plan.dynamic.tasks_month)} tarefas/mês</li>
                      <li>{formatValue(plan.dynamic.uploads_day)} uploads/dia</li>
                      <li>Tamanho de upload: {formatValue(plan.dynamic.upload_size)}</li>
                      <li>Retenção: {formatValue(plan.dynamic.retention_days)} dias</li>
                      <li>Suporte: {formatValue(plan.dynamic.support_level)}</li>
                      <li>Prioridade: {formatValue(plan.dynamic.priority)}</li>
                    </ul>

                    <div className="font-mono text-[11px] uppercase tracking-widest text-ember mt-7 mb-3">
                      / Impacto
                    </div>
                    <ul className="space-y-3 text-sm">
                      {plan.modalImpact.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-ember shrink-0" />
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="font-mono text-[11px] uppercase tracking-widest text-ember mt-7 mb-3">
                      / Expansão conforme crescimento
                    </div>
                    <ul className="space-y-2.5 text-sm text-foreground/90">
                      <li>usuários adicionais</li>
                      <li>pacotes de tarefas</li>
                      <li>capacidade sob demanda</li>
                    </ul>
                  </div>

                  <div className="sticky bottom-0 border-t border-border/80 p-5 sm:p-6 bg-surface-elevated/95 backdrop-blur">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handlePlanClick(plan.id)}
                        className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-5 py-3 shadow-ember hover:brightness-110 transition"
                      >
                        {plan.modalCta}
                        <span aria-hidden>→</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => openModal(`plans-${plan.id}`)}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/45 px-5 py-3 font-medium hover:bg-background/70 transition"
                      >
                        Falar com especialista
                      </button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
