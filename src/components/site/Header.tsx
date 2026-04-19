import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/cerne-logo.png";
import { useSupraContactModal } from "@/components/site/SupraContactModal";

const nav = [
  { label: "Início", to: "/#topo" },
  { label: "Plataforma", to: "/#plataforma" },
  { label: "Planos", to: "/#planos" },
  { label: "Como funciona", to: "/#como-funciona" },
  { label: "Setores", to: "/#setores" },
  { label: "Contato", to: "/#contato" },
];

const desktopNav = [
  { label: "Plataforma", to: "/#plataforma" },
  { label: "Core", to: "/#core" },
  { label: "Supra", to: "/#supra" },
  { label: "Planos", to: "/#planos" },
];

export function Header() {
  const { openModal } = useSupraContactModal();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    if (menuOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div className="glass rounded-2xl px-4 sm:px-6 py-2.5 md:py-3 flex items-center justify-between min-h-14">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="Cerne"
              className="h-8 w-8 md:h-9 md:w-9 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-display text-base md:text-lg tracking-tight">
              <span className="text-ember">CER</span>
              <span className="text-foreground/80">NE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {desktopNav.map((item) => (
              <a
                key={item.label}
                href={item.to}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://core.cerneops.com.br"
              className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2"
            >
              Entrar
            </a>
            <button
              type="button"
              onClick={() => openModal("header-cta")}
              className="hidden md:inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-medium text-sm px-4 py-2.5 shadow-ember hover:brightness-110 transition"
            >
              Falar com a Cerne
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-surface/50 text-foreground hover:border-ember/45 hover:text-ember transition"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div className="md:hidden fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-background/75 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 right-0 w-[86%] max-w-sm border-l border-border bg-surface-elevated p-6 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between mb-8">
              <div className="font-display text-lg tracking-tight">
                <span className="text-ember">CER</span>
                <span className="text-foreground/80">NE</span>
              </div>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-border bg-surface/50 text-foreground hover:border-ember/45 hover:text-ember transition"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-2">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-foreground/90 hover:bg-background/50 hover:text-foreground transition"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openModal("mobile-menu-cta");
              }}
              className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-5 py-3.5 shadow-ember hover:brightness-110 transition"
            >
              Destravar minha operação
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
