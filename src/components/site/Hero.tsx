import logo from "@/assets/cerne-logo.png";

export function Hero() {
  return (
    <section className="relative pt-40 pb-28 overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial-ember)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial-circuit)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-mono text-muted-foreground mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-glow" />
              INTEGRAÇÃO INTELIGENTE DE OPERAÇÕES
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              Gerenciamento
              <br />
              de processos
              <br />
              <span className="text-gradient-ember">com inteligência.</span>
            </h1>

            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
              A Cerne transforma operações fragmentadas em sistemas inteligentes,
              integrados e de alto desempenho. Reduza retrabalho, elimine gargalos
              e dê escala à sua equipe — sem contratar proporcionalmente.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#core"
                className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
              >
                Conhecer o Cerne Core
                <span aria-hidden>→</span>
              </a>
              <a
                href="#supra"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/40 backdrop-blur px-6 py-3.5 font-medium hover:bg-surface transition"
              >
                Falar com Especialista Supra
              </a>
            </div>

            <div className="mt-12 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="h-px w-10 bg-ember/60" />
              <span className="font-mono uppercase tracking-widest text-xs">
                Uma pessoa com a Cerne opera com a performance de dez
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 rounded-full bg-ember/20 blur-3xl animate-pulse-glow" />
              <div className="absolute inset-8 rounded-full border border-ember/30" />
              <div className="absolute inset-16 rounded-full border border-ember/20" />
              <div className="absolute inset-24 rounded-full border border-ember/10" />
              <img
                src={logo}
                alt="Logo Cerne"
                className="relative w-full h-full object-contain animate-float"
              />
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border">
          {[
            { k: "10x", v: "Capacidade por pessoa" },
            { k: "−70%", v: "Retrabalho operacional" },
            { k: "24/7", v: "Agentes em execução" },
            { k: "100%", v: "Auditável e rastreável" },
          ].map((s) => (
            <div key={s.v} className="bg-background/80 backdrop-blur px-6 py-7">
              <div className="font-display text-3xl font-bold text-ember">{s.k}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
