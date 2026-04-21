import { useSupraContactModal } from "@/components/site/SupraContactModal";

export function WhyCerneNotChat() {
  const { openModal } = useSupraContactModal();

  return (
    <section className="relative py-28 border-y border-border">
      <div className="absolute inset-0 bg-grid opacity-45 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-4xl mb-14">
          <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
            / Por que CerneOps e não chat de IA?
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.02]">
            Chat de IA ajuda pessoas.
            <br />
            <span className="text-gradient-ember">A CerneOps organiza e executa a operação.</span>
          </h2>
          <p className="mt-7 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Se você já usa IA, você já viu ganho.
            <br />
            Mas isso ainda não resolveu o principal: como sua operação roda no dia a dia.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface/55 p-7 lg:p-8 hover:bg-surface-elevated transition-colors">
            <h3 className="font-display text-2xl font-semibold mb-5">O que acontece hoje</h3>
            <ul className="space-y-3 text-sm text-foreground/90">
              {[
                "Cada pessoa usa IA do seu jeito",
                "O resultado depende de quem executa",
                "Parte do trabalho continua manual",
                "Informações ficam espalhadas",
                "Processos não seguem padrão",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-xl leading-tight">
              Você melhora tarefas.
              <br />
              <span className="text-gradient-ember">Mas a operação continua travando.</span>
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-surface/45 p-7 lg:p-8 hover:bg-surface transition-colors">
            <h3 className="font-display text-2xl font-semibold mb-5">Chat não cria operação</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Chat funciona assim:
              <br />→ você pede
              <br />→ ele responde
              <br />→ acabou
            </p>
            <div className="ember-divider my-6" />
            <ul className="space-y-3 text-sm text-foreground/90">
              {[
                "não mantém padrão",
                "não executa fluxo",
                "não conecta etapas",
                "não garante continuidade",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg font-display leading-tight">
              E sem isso, <span className="text-gradient-ember">não existe escala.</span>
            </p>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-ember/35 bg-surface-elevated/70 p-7 lg:p-8">
          <p className="font-display text-2xl sm:text-3xl leading-tight">
            IA sem processo continua sendo
            <br />
            <span className="text-gradient-ember">esforço manual disfarçado.</span>
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface/55 p-7 lg:p-8 hover:bg-surface-elevated transition-colors">
            <h3 className="font-display text-2xl font-semibold mb-5">
              Quando você usa IA do jeito certo
            </h3>
            <ul className="space-y-3 text-sm text-foreground/90">
              {[
                "sua equipe para de começar tudo do zero",
                "tarefas viram execução guiada, não improviso",
                "textos, análises e respostas já saem no padrão",
                "informações deixam de ficar soltas",
                "decisões ficam mais rápidas e consistentes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="ember-divider my-6" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Antes: alguém escreve, alguém revisa, alguém ajusta.
              <br />
              Depois: já sai estruturado e pronto.
            </p>
            <p className="mt-5 font-display text-xl leading-tight">
              Sua equipe produz mais no mesmo tempo.
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-surface/45 p-7 lg:p-8 hover:bg-surface transition-colors">
            <h3 className="font-display text-2xl font-semibold mb-5">
              Quando o problema não é tarefa , é a operação inteira
            </h3>
            <ul className="space-y-3 text-sm text-foreground/90">
              {[
                "tarefas deixam de existir como esforço manual",
                "processos passam a rodar automaticamente",
                "sistemas começam a conversar entre si",
                "dados viram informação em tempo real",
                "decisões deixam de depender de acompanhamento constante",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="ember-divider my-6" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sem Supra: pedido entra, alguém registra, alguém organiza, alguém acompanha,
              alguém cobra.
              <br />
              Com Supra: pedido entra, já estruturado, já encaminhado, já integrado ao fluxo,
              já visível para decisão.
            </p>
            <p className="mt-5 font-display text-xl leading-tight">
              A operação roda , sem depender de alguém empurrar.
            </p>
          </article>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-surface/55 p-7 lg:p-8">
            <h3 className="font-display text-2xl font-semibold mb-5">Core (Agentes)</h3>
            <ul className="space-y-3 text-sm text-foreground/90">
              {[
                "Mais produtividade por pessoa",
                "Menos erro e retrabalho",
                "Mais velocidade no dia a dia",
                "Mais organização",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="rounded-2xl border border-border bg-surface/45 p-7 lg:p-8">
            <h3 className="font-display text-2xl font-semibold mb-5">Supra (Operação)</h3>
            <ul className="space-y-3 text-sm text-foreground/90">
              {[
                "Menos custo operacional",
                "Menos dependência de pessoas",
                "Mais previsibilidade",
                "Mais escala sem aumentar equipe",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-6 rounded-2xl border border-ember/30 bg-surface-elevated/65 p-7 lg:p-8">
          <p className="font-display text-2xl sm:text-3xl leading-tight">
            Chat melhora quem executa.
            <br />
            <span className="text-gradient-ember">A CerneOps melhora o que é executado.</span>
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#plataforma"
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition"
          >
            Ver como isso funciona na prática
            <span aria-hidden>→</span>
          </a>
          <button
            type="button"
            onClick={() => openModal("why-cerne-not-chat")}
            className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-lg border border-border bg-surface/50 backdrop-blur px-6 py-3.5 font-medium hover:bg-surface transition"
          >
            Destravar minha operação agora
          </button>
        </div>
      </div>
    </section>
  );
}
