export function Products() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
            / Arquitetura da oferta
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Dois modelos.
            <br />
            <span className="text-muted-foreground">Uma engenharia.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Core */}
          <div
            id="core"
            className="relative rounded-3xl border border-border bg-surface/60 p-8 lg:p-12 overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ background: "var(--gradient-radial-ember)" }}
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl gradient-ember flex items-center justify-center font-mono text-sm font-bold text-primary-foreground">
                  C
                </div>
                <div>
                  <div className="font-mono text-xs text-ember uppercase tracking-widest">
                    Produto SaaS
                  </div>
                  <div className="font-display text-xl font-semibold">Cerne Core</div>
                </div>
              </div>

              <h3 className="font-display text-3xl font-bold leading-tight mb-4">
                A plataforma de operação inteligente baseada em agentes.
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Multiempresa, escalável, com planos definidos e oferta padronizada
                de agentes. Acesso rápido para quem quer ganho operacional imediato.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Plataforma multi-tenant com isolamento lógico rígido",
                  "Agentes por grupos, permissões e plano",
                  "Administração de usuários, perfis e auditoria",
                  "Quatro planos: Start, Boost, Scale e Dominus",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <a
                  href="https://core.cerneops.com.br"
                  className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-5 py-3 shadow-ember hover:brightness-110 transition text-sm"
                >
                  Acessar o Core
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#planos"
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  Ver planos →
                </a>
              </div>
            </div>
          </div>

          {/* Supra */}
          <div
            id="supra"
            className="relative rounded-3xl border border-border bg-surface/40 p-8 lg:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-strong opacity-40 pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl border border-ember/40 flex items-center justify-center font-mono text-sm font-bold text-ember">
                  S
                </div>
                <div>
                  <div className="font-mono text-xs text-ember uppercase tracking-widest">
                    Consultoria High-Touch
                  </div>
                  <div className="font-display text-xl font-semibold">Cerne Supra</div>
                </div>
              </div>

              <h3 className="font-display text-3xl font-bold leading-tight mb-4">
                Operação construída sob medida, do zero ao funcionamento real.
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Ambiente dedicado, todos os agentes liberados, aplicações
                desenvolvidas para a operação específica do cliente. Sem limites
                de plano.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Subdomínio dedicado: [cliente].cerneops.com.br",
                  "Aplicações e agentes desenhados sob medida",
                  "Operação modelada com a equipe Cerne",
                  "Sem teto de plano. Profundidade total.",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contato"
                className="inline-flex items-center gap-2 rounded-lg border border-ember/40 text-ember font-semibold px-5 py-3 hover:bg-ember/10 transition text-sm"
              >
                Conversar com a Cerne
                <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
