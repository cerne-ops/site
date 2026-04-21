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
                Uma plataforma que executa tarefas do dia a dia da sua empresa com padrão e velocidade.
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-9">
                Você usa para escrever, organizar, analisar e estruturar tudo que hoje
                sua equipe faz manualmente , só que mais rápido, com padrão e sem retrabalho.
              </p>

              <div className="font-mono text-[11px] uppercase tracking-widest text-ember mb-4">
                / O que faz na prática
              </div>
              <ul className="space-y-3.5 mb-8 text-[15px] leading-relaxed">
                {[
                  "Gera textos, respostas e conteúdos prontos para uso (e-mail, atendimento, cobrança, comunicação)",
                  "Organiza tarefas e transforma demandas em listas executáveis",
                  "Resume e estrutura informações (documentos, reuniões, ideias)",
                  "Analisa dados simples e gera relatórios claros",
                  "Padroniza a forma como sua equipe executa atividades",
                  "Reescreve conteúdos com objetivo específico (vender, cobrar, explicar)",
                  "Classifica e organiza informações automaticamente",
                  "Apoia decisões com base no que já foi processado",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="font-mono text-[11px] uppercase tracking-widest text-ember mb-4">
                / O que isso muda
              </div>
              <ul className="space-y-3.5 mb-7 text-[15px] leading-relaxed">
                {[
                  "Sua equipe produz mais no mesmo tempo",
                  "Você reduz erro e retrabalho",
                  "A operação fica mais organizada",
                  "Você ganha clareza do que está acontecendo",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

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
                A Cerne entra na sua empresa e constrói a operação automatizada com você.
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-9">
                Aqui não é você usando uma ferramenta.
                <br />
                A gente entende sua operação, desenha os fluxos e entrega tudo funcionando , integrado ao seu dia a dia.
              </p>

              <div className="font-mono text-[11px] uppercase tracking-widest text-ember mb-4">
                / O que fazemos na prática
              </div>
              <ul className="space-y-3.5 mb-8 text-[15px] leading-relaxed">
                {[
                  "Mapeamos como sua operação funciona hoje",
                  "Identificamos gargalos, retrabalho e falhas",
                  "Desenhamos fluxos mais eficientes",
                  "Automatizamos tarefas repetitivas",
                  "Integramos sistemas que hoje não se conversam",
                  "Criamos relatórios automáticos da sua operação",
                  "Organizamos dados para decisão em tempo real",
                  "Implantamos tudo com sua equipe usando de verdade",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="font-mono text-[11px] uppercase tracking-widest text-ember mb-4">
                / O que isso muda
              </div>
              <ul className="space-y-3.5 mb-7 text-[15px] leading-relaxed">
                {[
                  "Sua operação para de depender de controle manual",
                  "Você reduz custo operacional",
                  "Os processos passam a rodar com padrão",
                  "Você ganha escala sem aumentar equipe",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-ember shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

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
