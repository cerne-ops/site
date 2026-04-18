const pillars = [
  {
    tag: "01",
    title: "Chat de IA melhora a pessoa.",
    body: "Cerne melhora a operação. Não vendemos chat genérico — entregamos capacidade operacional repetível, padronizada e mensurável.",
  },
  {
    tag: "02",
    title: "Agentes que executam, não respondem.",
    body: "Cada agente é uma capacidade funcional dentro da plataforma, organizada por grupos, permissões e estado operacional.",
  },
  {
    tag: "03",
    title: "Você não compra plano. Destrava capacidade.",
    body: "A Cerne remove gargalos, amplia o time e dá escala sem contratar proporcionalmente. O plano é apenas o tamanho da operação.",
  },
];

export function Pillars() {
  return (
    <section id="plataforma" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
            / O que é a Cerne
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Implementação aplicada.
            <br />
            <span className="text-muted-foreground">Funcionamento real.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {pillars.map((p) => (
            <div
              key={p.tag}
              className="group bg-surface/60 p-8 lg:p-10 hover:bg-surface-elevated transition-colors relative"
            >
              <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-ember to-transparent opacity-0 group-hover:opacity-100 animate-scan" />
              </div>
              <div className="font-mono text-xs text-ember mb-6">{p.tag}</div>
              <h3 className="font-display text-2xl font-semibold leading-snug mb-4">
                {p.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
