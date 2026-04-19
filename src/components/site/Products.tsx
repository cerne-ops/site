import { useSupraContactModal } from "@/components/site/SupraContactModal";

export function Products() {
  const { openModal } = useSupraContactModal();

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
                    PRODUTO SAAS
                  </div>
                  <div className="font-display text-xl font-semibold">Cerne Core</div>
                </div>
              </div>

              <h3 className="font-display text-3xl font-bold leading-tight mb-4">
                Sua operação rodando melhor todos os dias — sem depender de ninguém.
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-9">
                Hoje, boa parte do seu tempo ainda é consumida por tarefas repetitivas,
                decisões sem dado e retrabalho silencioso. O Core organiza, executa e
                dá controle — para sua empresa produzir mais com o que já tem.
              </p>

              <ul className="space-y-3.5 mb-8 text-[15px] leading-relaxed">
                {[
                  "Execução padronizada — sem depender de quem faz",
                  "Fim do retrabalho causado por erro ou falta de processo",
                  "Tarefas repetitivas deixam de consumir sua equipe",
                  "Processos organizados que não travam no dia a dia",
                  "Mais clareza do que está acontecendo na operação",
                  "Decisão baseada em informação, não em feeling",
                  "Redução de gargalos invisíveis que travam crescimento",
                  "Equipe mais produtiva sem precisar aumentar estrutura",
                  "Menos tempo apagando incêndio operacional",
                  "Mais tempo focando em crescimento e estratégia",
                  "Organização que se mantém, não depende de esforço constante",
                  "Sua operação começa a escalar sem perder controle",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <p className="text-foreground/85 leading-relaxed mb-7">
                Você não precisa trabalhar mais.
                <br />
                Precisa de uma operação que funcione melhor.
              </p>

              <div className="flex items-center gap-4">
                <a
                  href="#planos"
                  className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-5 py-3 shadow-ember hover:brightness-110 transition text-sm"
                >
                  Destravar minha operação
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#planos"
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  Ver planos
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
                    CONSULTORIA HIGH-TOUCH
                  </div>
                  <div className="font-display text-xl font-semibold">Cerne Supra</div>
                </div>
              </div>

              <h3 className="font-display text-3xl font-bold leading-tight mb-4">
                Quando sua operação exige mais do que ferramenta — exige solução construída para você.
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-9">
                Se sua operação já é complexa, o problema não é falta de ferramenta
                — é falta de estrutura. A Cerne entra para desenhar, conectar e fazer
                funcionar de verdade.
              </p>

              <ul className="space-y-3.5 mb-8 text-[15px] leading-relaxed">
                {[
                  "Diagnóstico real do que está travando sua operação",
                  "Solução desenhada exatamente para o seu cenário",
                  "Automação de processos críticos do seu negócio",
                  "Integração entre sistemas que hoje não se conversam",
                  "Eliminação de retrabalho estrutural",
                  "Redução de falhas humanas em processos-chave",
                  "Operação mais previsível e controlada",
                  "Implementação acompanhada até funcionar na prática",
                  "Ajustes contínuos conforme sua operação evolui",
                  "Ganho de eficiência sem aumentar complexidade",
                  "Escala operacional sem aumentar proporcionalmente o custo",
                  "Estrutura preparada para crescimento real",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <p className="text-foreground/85 leading-relaxed mb-7">
                Aqui não é sobre usar IA.
                <br />
                É sobre sua operação finalmente funcionar como deveria.
              </p>

              <button
                type="button"
                onClick={() => openModal("products-supra")}
                className="inline-flex items-center gap-2 rounded-lg border border-ember/40 text-ember font-semibold px-5 py-3 hover:bg-ember/10 transition text-sm"
              >
                Resolver minha operação com a Cerne
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
