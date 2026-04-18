const steps = [
  {
    n: "01",
    title: "Mapeamos a operação",
    body: "Identificamos onde sua equipe perde tempo, onde há retrabalho e quais tarefas são repetíveis.",
  },
  {
    n: "02",
    title: "Ativamos os agentes",
    body: "Cada agente assume uma capacidade funcional clara, com permissões, limites e auditoria.",
  },
  {
    n: "03",
    title: "Integramos no fluxo",
    body: "Os agentes operam dentro do processo — não como ferramenta paralela, como parte da execução.",
  },
  {
    n: "04",
    title: "Escalamos com previsibilidade",
    body: "Você cresce a operação sem crescer custo proporcionalmente. Padronização vira vantagem.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-28 border-y border-border">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
              / Como funciona
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              IA dentro da
              <br />
              operação,
              <br />
              <span className="text-gradient-ember">não ao lado dela.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              IA genérica resolve tarefas pontuais. A Cerne organiza IA dentro do
              processo, transformando uso eventual em execução repetível.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="group flex items-start gap-6 rounded-2xl border border-border bg-surface/40 p-6 hover:bg-surface hover:border-ember/30 transition-all"
              >
                <div className="font-mono text-sm text-ember w-10 shrink-0 pt-1">
                  {s.n}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
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
