import logo from "@/assets/cerne-logo.png";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { isEnglish, t } = useI18n();

  return (
    <footer className="border-t border-border py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img
                src={logo}
                alt="CerneOps"
                className="h-9 w-9 object-contain"
              />
              <span className="font-brand text-[1.7rem]">
                <span className="brand-cerne">CERNE</span>
                <span className="brand-ops">OPS</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              {t(
                "Integração inteligente de operações. Gerenciamento de processos com inteligência.",
              )}
            </p>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
              {t("Produto")}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/#core" className="hover:text-foreground transition">
                  CerneOps Core
                </a>
              </li>
              <li>
                <a href="/#supra" className="hover:text-foreground transition">
                  CerneOps Supra
                </a>
              </li>
              <li>
                <a href="/#planos" className="hover:text-foreground transition">
                  {t("Planos")}
                </a>
              </li>
              <li>
                <a
                  href="/agentes-cerneops"
                  className="hover:text-foreground transition"
                >
                  {t("Agentes CerneOps")}
                </a>
              </li>
              {!isEnglish ? (
                <li>
                  <a
                    href="/academia"
                    className="hover:text-foreground transition"
                  >
                    Academia CerneOps
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
              {t("Acesso")}
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/#planos" className="hover:text-foreground transition">
                  {t("Planos do Core")}
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
          <div>{t("© 2026 CERNEOPS · TODOS OS DIREITOS RESERVADOS")}</div>
          <div>{t("INTEGRAÇÃO INTELIGENTE DE OPERAÇÕES")}</div>
        </div>
      </div>
    </footer>
  );
}
