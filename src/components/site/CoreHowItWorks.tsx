import { useEffect, useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Você escolhe o tipo de tarefa",
    body: "No dia a dia da sua empresa, você precisa: responder cliente, organizar demandas, estruturar ideias, analisar informações ou tomar decisões. No Core, você não começa escrevendo ou organizando do zero. Você escolhe o agente certo para o tipo de tarefa que precisa resolver.",
  },
  {
    n: "02",
    title: "Cada agente resolve uma coisa específica",
    body: "Em vez de uma IA genérica para tudo, você usa agentes especializados. Por exemplo: um agente foca em escrita, outro em organização de tarefas, outro em análise de conteúdo. Cada um já foi pensado para resolver aquele tipo de problema com eficiência, clareza e padrão.",
  },
  {
    n: "03",
    title: "A execução já sai estruturada",
    body: "O agente não só responde — ele organiza a execução. O conteúdo já vem claro, estruturado e com objetivo definido. Você não precisa revisar várias vezes, ajustar manualmente ou recomeçar. Grande parte do trabalho já vem pronta para uso.",
  },
  {
    n: "04",
    title: "Sua equipe trabalha com o mesmo padrão",
    body: "Sem o Core, cada pessoa resolve do seu jeito. Com o Core, todos usam os mesmos agentes para executar tarefas. Isso cria consistência, melhora a qualidade das entregas e reduz variação entre pessoas.",
  },
  {
    n: "05",
    title: "Você ganha velocidade e reduz retrabalho",
    body: "Tarefas que antes levavam tempo para pensar, estruturar e executar passam a acontecer muito mais rápido. Menos tempo organizando, menos erro, menos retrabalho. A equipe produz mais sem precisar aumentar esforço.",
  },
  {
    n: "06",
    title: "A operação começa a ficar organizada",
    body: "Quando a execução tem padrão, a operação naturalmente se organiza. Fica mais fácil entender o que está sendo feito, o que está travando e onde melhorar. Você começa a ter mais controle sem precisar acompanhar tudo manualmente.",
  },
];

export function CoreHowItWorks() {
  const sectionRef = useRef<HTMLElement | null>(null);

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
      { threshold: 0.16 },
    );

    reveals.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${index * 60}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="como-o-core-funciona" ref={sectionRef} className="relative py-28 border-y border-border">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial-circuit)" }}
      />
      <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 reveal-up">
            <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
              / Como o Core funciona
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              Sua operação executando melhor
              <br />
              com agentes especializados
              <br />
              <span className="text-gradient-ember">trabalhando com você todos os dias.</span>
            </h2>

            <div className="mt-7 space-y-4 text-muted-foreground leading-relaxed">
              <p>No Cerne Core, você não usa uma “IA genérica” para tentar resolver tudo.</p>
              <p>
                Você usa agentes, cada um preparado para executar uma parte real da sua operação.
              </p>
              <p>
                Um escreve com clareza e objetivo.
                <br />
                Outro organiza tarefas e prioridades.
                <br />
                Outro analisa informações e identifica o que importa.
                <br />
                Outro estrutura decisões com base no contexto.
              </p>
              <p>
                Na prática, é como ter pessoas focadas em cada tipo de trabalho, só que com mais
                velocidade, mais padrão e sem o desgaste de fazer tudo manualmente.
              </p>
              <p>
                O que antes exigia tempo para pensar, organizar e revisar,
                <br />
                agora já começa estruturado e pronto para execução.
              </p>
              <p>
                Sua equipe para de improvisar.
                <br />
                Para de retrabalhar.
                <br />
                Para de perder tempo com tarefas que não deveriam ser difíceis.
              </p>
              <p>
                E começa a produzir mais, com menos esforço, menos erro e muito mais consistência.
              </p>
            </div>

            <p className="mt-8 text-foreground/90 leading-relaxed text-lg">
              Se o Supra transforma a operação inteira,
              <br />
              <span className="text-gradient-ember">
                o Core melhora como cada tarefa é executada, todos os dias.
              </span>
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {steps.map((step) => (
              <div
                key={step.n}
                className="group reveal-up flex items-start gap-6 rounded-2xl border border-border bg-surface/40 p-6 hover:bg-surface hover:border-ember/30 transition-all"
              >
                <div className="font-mono text-sm text-ember w-10 shrink-0 pt-1">{step.n}</div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
                <div className="text-muted-foreground group-hover:text-ember group-hover:translate-x-1 transition-all text-xl">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
