import logo from "@/assets/cerne-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Cerne" className="h-9 w-9 object-contain" />
              <span className="font-display text-lg tracking-tight">
                <span className="text-ember">CER</span>
                <span className="text-foreground/80">NE</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Integração inteligente de operações. Gerenciamento de processos com
              inteligência.
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
              Produto
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/#core" className="hover:text-foreground transition">
                  Cerne Core
                </a>
              </li>
              <li>
                <a href="/#supra" className="hover:text-foreground transition">
                  Cerne Supra
                </a>
              </li>
              <li>
                <a href="/#planos" className="hover:text-foreground transition">
                  Planos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
              Acesso
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://core.cerneops.com.br"
                  className="hover:text-foreground transition"
                >
                  core.cerneops.com.br
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@cerneops.com.br"
                  className="hover:text-foreground transition"
                >
                  contato@cerneops.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="ember-divider my-10" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div>© 2026 CERNE · TODOS OS DIREITOS RESERVADOS</div>
          <div>INTEGRAÇÃO INTELIGENTE DE OPERAÇÕES</div>
        </div>
      </div>
    </footer>
  );
}
