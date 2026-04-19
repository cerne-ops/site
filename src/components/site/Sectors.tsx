import { useEffect, useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSupraContactModal } from "@/components/site/SupraContactModal";

type Sector = {
  icon: string;
  title: string;
  impact: string;
  subheadline: string;
  points: string[];
  closing: string;
  cta: string;
  featured?: boolean;
};

export const sectors: Sector[] = [
  {
    icon: "🏥",
    title: "Saúde",
    impact: "Menos papel. Mais cuidado.",
    subheadline: "Agenda cheia, operação travada — isso não pode acontecer.",
    points: [
      "Confirmação automática de consultas e redução de faltas",
      "Organização de prontuários e atendimentos sem retrabalho",
      "Fluxo de atendimento mais rápido, sem depender da recepção",
      "Relatórios diários de atendimento e faturamento",
    ],
    closing: "Menos tempo organizando. Mais tempo atendendo.",
    cta: "Organizar minha clínica agora",
  },
  {
    icon: "🌾",
    title: "Agronegócio",
    impact: "Gestão que não dorme.",
    subheadline: "Produção rodando, mas sem controle fino — margem indo embora.",
    points: [
      "Consolidação automática de dados de campo (produção, insumos, custos)",
      "Alertas de falha operacional antes de virar prejuízo",
      "Relatórios de desempenho por área, safra ou operação",
      "Controle de atividades sem depender de comunicação informal",
    ],
    closing: "Você deixa de “achar” e passa a saber.",
    cta: "Controlar minha operação no campo",
  },
  {
    icon: "🏭",
    title: "Indústria",
    impact: "Processos que rodam sozinhos.",
    subheadline: "Produção não para — mas o retrabalho continua.",
    points: [
      "Checklists automáticos de linha de produção",
      "Registro e análise de falhas recorrentes",
      "Organização de ordens de produção e execução",
      "Visibilidade de gargalos em tempo real",
    ],
    closing: "Produzir mais sem aumentar custo.",
    cta: "Eliminar gargalos da produção",
  },
  {
    icon: "🛒",
    title: "Comércio",
    impact: "Estoque certo. Venda na hora certa.",
    subheadline: "Vende bem, mas perde no operacional.",
    points: [
      "Controle automático de estoque e reposição",
      "Organização de pedidos e atendimento (online e físico)",
      "Relatórios de vendas por período, produto e canal",
      "Alertas de ruptura ou excesso de estoque",
    ],
    closing: "Você para de perder venda por desorganização.",
    cta: "Controlar melhor minhas vendas",
  },
  {
    icon: "🏢",
    title: "Serviços",
    impact: "Uma equipe de alto desempenho com menos esforço.",
    subheadline: "Equipe ocupada não significa equipe produtiva.",
    points: [
      "Organização automática de tarefas e prioridades",
      "Padronização de entregas para todos os clientes",
      "Redução de dependência de pessoas-chave",
      "Controle de execução e acompanhamento de demandas",
    ],
    closing: "Mais entrega com a mesma equipe.",
    cta: "Aumentar produtividade da equipe",
  },
  {
    icon: "🏗️",
    title: "Construção Civil",
    impact: "Obra no prazo, com dado em tempo real.",
    subheadline: "Atraso e retrabalho custam caro — sempre.",
    points: [
      "Controle de etapas da obra com atualização em tempo real",
      "Registro de execução e acompanhamento remoto",
      "Alertas de desvios de cronograma",
      "Organização de comunicação entre equipe e gestão",
    ],
    closing: "Menos surpresa. Mais controle.",
    cta: "Controlar minhas obras melhor",
  },
  {
    icon: "🚚",
    title: "Logística",
    impact: "Operação sincronizada, sem gargalos.",
    subheadline: "Quando a operação trava, tudo para junto.",
    points: [
      "Acompanhamento de etapas logísticas em tempo real",
      "Organização de rotas, entregas e status",
      "Redução de falhas de comunicação",
      "Identificação rápida de gargalos operacionais",
    ],
    closing: "Você identifica o problema antes do cliente.",
    cta: "Destravar minha operação logística",
  },
  {
    icon: "🏫",
    title: "Educação",
    impact: "Gestão simples, foco no ensino.",
    subheadline: "A gestão consome tempo que deveria ir para o ensino.",
    points: [
      "Organização de matrículas, turmas e comunicação",
      "Automatização de processos administrativos",
      "Relatórios de operação e desempenho",
      "Redução de tarefas repetitivas da equipe",
    ],
    closing: "Mais foco no aluno, menos na burocracia.",
    cta: "Simplificar minha gestão",
  },
  {
    icon: "⚖️",
    title: "Jurídico",
    impact: "Menos rotina, mais estratégia.",
    subheadline: "Muito tempo gasto com rotina que não gera valor.",
    points: [
      "Organização de prazos e demandas jurídicas",
      "Estruturação de documentos e informações",
      "Redução de tarefas repetitivas",
      "Controle de processos sem depender de memória",
    ],
    closing: "Mais estratégia, menos operacional.",
    cta: "Ganhar eficiência no escritório",
  },
  {
    icon: "🏨",
    title: "Hotelaria",
    impact: "Experiência fluida, operação invisível.",
    subheadline: "Experiência do cliente depende da operação — sempre.",
    points: [
      "Organização de reservas, check-ins e fluxos internos",
      "Padronização do atendimento",
      "Controle de demandas operacionais do dia a dia",
      "Redução de falhas que impactam o hóspede",
    ],
    closing: "A operação invisível é a que mais importa.",
    cta: "Melhorar minha operação",
  },
  {
    icon: "💼",
    title: "Financeiro",
    impact: "Controle total, risco reduzido.",
    subheadline: "Decidir sem dado é assumir risco.",
    points: [
      "Consolidação automática de receitas, despesas e fluxo",
      "Relatórios financeiros prontos diariamente",
      "Identificação de desvios e inconsistências",
      "Visão clara de caixa e operação",
    ],
    closing: "Mais controle, menos risco.",
    cta: "Ter controle financeiro real",
  },
  {
    icon: "🧪",
    title: "Clínicas e Laboratórios",
    impact: "Processo padronizado, resultado confiável.",
    subheadline: "Erro operacional aqui não é opção.",
    points: [
      "Padronização de processos de coleta e análise",
      "Organização de resultados e dados",
      "Redução de falhas humanas",
      "Controle de fluxo de exames e entregas",
    ],
    closing: "Processo confiável, resultado seguro.",
    cta: "Padronizar minha operação",
  },
  {
    icon: "🛠️",
    title: "Manutenção / Serviços Técnicos",
    impact: "Ordem, histórico e execução sem falhas.",
    subheadline: "Sem controle, cada ordem vira um problema.",
    points: [
      "Gestão de ordens de serviço automatizada",
      "Histórico completo de atendimentos",
      "Padronização de execução técnica",
      "Acompanhamento de status em tempo real",
    ],
    closing: "Menos improviso. Mais execução.",
    cta: "Organizar minha operação técnica",
  },
  {
    icon: "🧩",
    title: "PARA SUA EMPRESA",
    impact: "Mais performance. Menos custo operacional.",
    subheadline: "Você já está perdendo performance sem perceber.",
    points: [
      "Tempo perdido em tarefas repetitivas",
      "Falta de padrão na execução",
      "Dependência de pessoas-chave",
      "Baixa visibilidade da operação",
    ],
    closing: "Sua operação pode entregar muito mais.",
    cta: "Destravar minha operação agora",
    featured: true,
  },
];

function SectorCard({ icon, title, impact, featured }: Sector) {
  return (
    <div
      className={`sector-card reveal-up rounded-2xl border border-border bg-surface/65 p-6 lg:p-7 ${
        featured ? "sector-card--featured" : ""
      }`}
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ember/35 bg-background/60 text-2xl leading-none transition-transform duration-300 sector-icon">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{impact}</p>
    </div>
  );
}

export function Sectors() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { openModal } = useSupraContactModal();

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const reveals = root.querySelectorAll<HTMLElement>(".reveal-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    reveals.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${index * 65}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="setores" ref={sectionRef} className="relative py-28 bg-background/95">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl mb-14 reveal-up">
          <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
            / Setores atendidos
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02] uppercase">
            Atendemos empresas de todos os tamanhos
            <br />
            e de todos os setores
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Se existe operação, existe ganho com a Cerne.
            <br />
            O problema não é o setor. É como a operação roda hoje.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector) => (
            <Dialog key={sector.title}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="text-left rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/45"
                >
                  <SectorCard {...sector} />
                </button>
              </DialogTrigger>
              <DialogContent
                className="max-w-2xl rounded-2xl border-border bg-surface-elevated p-0 overflow-hidden"
                onCloseAutoFocus={(event) => event.preventDefault()}
              >
                <div className="border-b border-border/80 p-6 sm:p-7 bg-background/35">
                  <DialogHeader className="text-left space-y-3">
                    <div className="inline-flex items-center gap-2">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ember/45 bg-background/60 text-2xl leading-none">
                        {sector.icon}
                      </span>
                      <DialogTitle className="font-display text-3xl leading-none tracking-tight">
                        {sector.title}
                      </DialogTitle>
                    </div>
                    <DialogDescription className="text-base text-foreground/85 leading-relaxed">
                      {sector.subheadline}
                    </DialogDescription>
                  </DialogHeader>
                </div>

                <div className="p-6 sm:p-7">
                  <ul className="space-y-3">
                    {sector.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm sm:text-base">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                        <span className="text-foreground/90 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-lg font-display text-gradient-ember leading-tight">
                    {sector.closing}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <DialogClose asChild>
                      <button
                        type="button"
                        onClick={() => {
                          setTimeout(() => openModal(`setor-${sector.title}`), 0);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-5 py-3 shadow-ember hover:brightness-110 transition"
                      >
                        {sector.cta}
                      </button>
                    </DialogClose>
                    <DialogClose asChild>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/45 px-5 py-3 font-medium hover:bg-background/70 transition"
                      >
                        Fechar
                      </button>
                    </DialogClose>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-12 reveal-up">
          <p className="text-xl sm:text-2xl font-display leading-tight">
            Você não precisa se encaixar em um sistema.
            <br />
            <span className="text-gradient-ember">
              A sua operação é que precisa funcionar melhor.
            </span>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 reveal-up">
          <a
            href="#planos"
            className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
          >
            Destravar minha operação
          </a>
          <a
            href="#plataforma"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 backdrop-blur px-6 py-3.5 font-medium hover:bg-surface transition"
          >
            Ver como isso funciona na prática
          </a>
        </div>
      </div>
    </section>
  );
}
