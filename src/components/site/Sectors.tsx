import { useEffect, useRef } from "react";

type Sector = {
  icon: string;
  title: string;
  impact: string;
  featured?: boolean;
};

export const sectors: Sector[] = [
  { icon: "🏥", title: "Saúde", impact: "Menos papel. Mais cuidado." },
  { icon: "🌾", title: "Agronegócio", impact: "Gestão que não dorme." },
  { icon: "🏭", title: "Indústria", impact: "Processos que rodam sozinhos." },
  { icon: "🛒", title: "Comércio", impact: "Estoque certo. Venda na hora certa." },
  {
    icon: "🏢",
    title: "Serviços",
    impact: "Uma equipe de alto desempenho com menos esforço.",
  },
  {
    icon: "🏗️",
    title: "Construção Civil",
    impact: "Obra no prazo, com dado em tempo real.",
  },
  { icon: "🚚", title: "Logística", impact: "Operação sincronizada, sem gargalos." },
  { icon: "🏫", title: "Educação", impact: "Gestão simples, foco no ensino." },
  { icon: "⚖️", title: "Jurídico", impact: "Menos rotina, mais estratégia." },
  { icon: "🏨", title: "Hotelaria", impact: "Experiência fluida, operação invisível." },
  { icon: "💼", title: "Financeiro", impact: "Controle total, risco reduzido." },
  {
    icon: "🧪",
    title: "Clínicas e Laboratórios",
    impact: "Processo padronizado, resultado confiável.",
  },
  {
    icon: "🛠️",
    title: "Manutenção / Serviços Técnicos",
    impact: "Ordem, histórico e execução sem falhas.",
  },
  {
    icon: "🧩",
    title: "PARA SUA EMPRESA",
    impact: "Mais performance. Menos custo operacional.",
    featured: true,
  },
];

function SectorCard({ icon, title, impact, featured }: Sector) {
  return (
    <article
      className={`sector-card reveal-up rounded-2xl border border-border bg-surface/65 p-6 lg:p-7 ${
        featured ? "sector-card--featured" : ""
      }`}
    >
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ember/35 bg-background/60 text-2xl leading-none transition-transform duration-300 sector-icon">
        {icon}
      </div>
      <h3 className="font-display text-2xl font-semibold leading-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{impact}</p>
    </article>
  );
}

export function Sectors() {
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
      { threshold: 0.16 }
    );

    reveals.forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${index * 65}ms`);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 bg-background/95">
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
            <SectorCard key={sector.title} {...sector} />
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
