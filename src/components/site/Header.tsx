import { Link } from "@tanstack/react-router";
import logo from "@/assets/cerne-logo.png";

const nav = [
  { label: "Plataforma", to: "/#plataforma" },
  { label: "Core", to: "/#core" },
  { label: "Supra", to: "/#supra" },
  { label: "Planos", to: "/#planos" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="Cerne"
              className="h-9 w-9 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-display text-lg tracking-tight">
              <span className="text-ember">CER</span>
              <span className="text-foreground/80">NE</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {nav.map((item) => (
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
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-medium text-sm px-4 py-2.5 shadow-ember hover:brightness-110 transition"
            >
              Falar com a Cerne
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
