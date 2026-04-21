import { useEffect, useRef } from "react";

const pillars = [
  {
    tag: "01",
    title: "Padronização de execução",
    blocks: [
      "Hoje, o mesmo processo pode ser executado de formas diferentes dentro da sua empresa , dependendo de quem faz.",
      "A CerneOps elimina essa variação.",
      "O que precisa ser feito passa a seguir um padrão claro, repetível e consistente, garantindo qualidade independente de quem executa.",
    ],
  },
  {
    tag: "02",
    title: "Controle real da operação",
    blocks: [
      "Você deixa de depender de acompanhamento manual ou percepção.",
      "Com a operação estruturada, você passa a enxergar o que está acontecendo de verdade , o que foi feito, o que está em andamento e o que está travando.",
    ],
  },
  {
    tag: "03",
    title: "Repetibilidade com qualidade",
    blocks: [
      "O que hoje exige esforço constante passa a acontecer de forma organizada e previsível.",
      "A CerneOps transforma tarefas em processos que se repetem com padrão, mantendo qualidade mesmo com aumento de volume.",
    ],
  },
  {
    tag: "04",
    title: "Rastreabilidade de ponta a ponta",
    blocks: [
      "Você passa a ter histórico, contexto e visibilidade de tudo que acontece na operação.",
      "Nada se perde, nada fica “no meio do caminho”, e qualquer etapa pode ser entendida, revisada ou ajustada.",
    ],
  },
  {
    tag: "05",
    title: "Organização que se mantém",
    blocks: [
      "A operação deixa de depender de esforço constante para se manter organizada.",
      "Processos bem definidos mantêm a estrutura funcionando no dia a dia, sem necessidade de reorganizar tudo o tempo todo.",
    ],
  },
  {
    tag: "06",
    title: "Escala com previsibilidade",
    blocks: [
      "Crescer sem estrutura aumenta o caos.",
      "Com a CerneOps, sua operação está preparada para crescer mantendo controle, padrão e eficiência , sem aumentar proporcionalmente a complexidade.",
    ],
  },
];

export function Pillars() {
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
      item.style.setProperty("--reveal-delay", `${index * 70}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="plataforma" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16 reveal-up">
          <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
            / O que é a CerneOps
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Implementação aplicada.
            <br />
            <span className="text-muted-foreground">Funcionamento real.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div
              key={p.tag}
              className="group reveal-up rounded-2xl border border-border bg-surface/60 p-8 lg:p-9 hover:bg-surface-elevated hover:border-ember/35 transition-all"
            >
              <div className="absolute top-0 left-0 right-0 h-px overflow-hidden rounded-t-2xl">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-ember to-transparent opacity-0 group-hover:opacity-100 animate-scan" />
              </div>
              <div className="font-mono text-xs text-ember mb-6">{p.tag}</div>
              <h3 className="font-display text-2xl font-semibold leading-snug mb-4">
                {p.title}
              </h3>
              <div className="space-y-3">
                {p.blocks.map((block) => (
                  <p key={block} className="text-muted-foreground leading-relaxed">
                    {block}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
