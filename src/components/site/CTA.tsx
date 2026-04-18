import { useSupraContactModal } from "@/components/site/SupraContactModal";

export function CTA() {
  const { openModal } = useSupraContactModal();

  return (
    <section id="contato" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative rounded-3xl overflow-hidden border border-ember/30 p-12 lg:p-20 text-center">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "var(--gradient-radial-ember)" }}
          />
          <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ember/5 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="font-mono text-xs uppercase tracking-widest text-ember mb-6">
              / Próximo passo
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-bold leading-[1.05] max-w-3xl mx-auto">
              Pronto para fazer sua operação{" "}
              <span className="text-gradient-ember">funcionar de verdade?</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Comece pelo Core ou converse com nosso time sobre uma implementação
              Supra dedicada.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://core.cerneops.com.br"
                className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-7 py-4 shadow-ember hover:brightness-110 transition"
              >
                Entrar no Cerne Core
                <span aria-hidden>→</span>
              </a>
              <button
                type="button"
                onClick={() => openModal("cta-section")}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/60 backdrop-blur px-7 py-4 font-medium hover:bg-surface transition"
              >
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
