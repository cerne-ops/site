const plans = [
  {
    name: "Start",
    tag: "Entrada",
    desc: "Para times pequenos que querem provar valor da operação inteligente.",
    items: ["Agentes essenciais", "Até time inicial", "Suporte base"],
  },
  {
    name: "Boost",
    tag: "Aceleração",
    desc: "Para operações em crescimento que precisam reduzir gargalos rápido.",
    items: ["Mais agentes ativos", "Limites ampliados", "Onboarding guiado"],
  },
  {
    name: "Scale",
    tag: "Escala",
    desc: "Para empresas que padronizam a operação como diferencial competitivo.",
    items: ["Catálogo amplo de agentes", "Governança de equipe", "Auditoria completa"],
  },
  {
    name: "Dominus",
    tag: "Topo do Core",
    desc: "O plano mais completo dentro da plataforma Core. Capacidade total.",
    items: ["Todos os agentes do Core", "Limites máximos", "Prioridade operacional"],
    featured: true,
  },
];

export function Plans() {
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
            Todos os planos fazem parte da mesma plataforma. Dominus é o plano mais
            completo dentro do Core — não um produto à parte.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 ${
                p.featured
                  ? "border-ember/50 bg-surface-elevated shadow-ember"
                  : "border-border bg-surface/60 hover:border-ember/30"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-7 font-mono text-[10px] uppercase tracking-widest gradient-ember text-primary-foreground px-2 py-1 rounded">
                  Mais completo
                </div>
              )}
              <div className="font-mono text-xs text-ember uppercase tracking-widest mb-3">
                {p.tag}
              </div>
              <div className="font-display text-3xl font-bold mb-3">{p.name}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {p.desc}
              </p>
              <ul className="space-y-2.5 text-sm">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-ember shrink-0" />
                    <span className="text-foreground/90">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
