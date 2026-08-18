import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DEMO_INTRO_KEY = "cerneops:demo-intro-seen:v1";

export function DemoIntroModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/demo") return;

    try {
      if (window.localStorage.getItem(DEMO_INTRO_KEY)) return;
      const timer = window.setTimeout(() => setOpen(true), 700);
      return () => window.clearTimeout(timer);
    } catch {
      const timer = window.setTimeout(() => setOpen(true), 700);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const markAsSeen = () => {
    try {
      window.localStorage.setItem(DEMO_INTRO_KEY, "1");
    } catch {
      // The modal still works when storage is unavailable.
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) markAsSeen();
    setOpen(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid="demo-intro-modal"
        className="max-w-xl overflow-hidden rounded-2xl border-border bg-surface-elevated p-0"
      >
        <div className="relative p-7 sm:p-9">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: "var(--gradient-radial-ember)" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-25" />

          <div className="relative">
            <DialogHeader className="space-y-3 text-left">
              <div className="font-mono text-xs uppercase tracking-widest text-ember">
                / Demonstração CerneOps
              </div>
              <DialogTitle className="font-display text-3xl leading-tight sm:text-4xl">
                Teste uma demonstração de nossos agentes
              </DialogTitle>
              <DialogDescription className="text-base leading-relaxed text-foreground/80">
                Escolha um especialista, carregue um exemplo e veja como uma
                análise pode sair organizada para a sua operação.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <a
                href="/demo"
                onClick={markAsSeen}
                className="inline-flex items-center justify-center rounded-lg gradient-ember px-5 py-3.5 font-semibold text-primary-foreground shadow-ember transition hover:brightness-110"
              >
                Testar agora
              </a>
              <button
                type="button"
                onClick={() => {
                  markAsSeen();
                  setOpen(false);
                }}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-surface/60 px-5 py-3.5 font-medium text-foreground transition hover:bg-surface"
              >
                Testar depois
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
