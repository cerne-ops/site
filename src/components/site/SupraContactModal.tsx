import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SupraContactContextValue = {
  openModal: (source?: string) => void;
};

const SupraContactModalContext = createContext<SupraContactContextValue | null>(null);

type FormStatus = "idle" | "loading" | "success" | "error";

export function SupraContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("site");
  const [status, setStatus] = useState<FormStatus>("idle");

  const ctx = useMemo<SupraContactContextValue>(
    () => ({
      openModal: (nextSource = "site") => {
        setSource(nextSource);
        setStatus("idle");
        setOpen(true);
      },
    }),
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    data.set("_subject", `Novo contato Supra (${source})`);
    data.set("_captcha", "false");
    data.set("_template", "table");

    try {
      const response = await fetch("https://formsubmit.co/ajax/contato@cerneops.com.br", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error("Falha no envio do formulário.");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <SupraContactModalContext.Provider value={ctx}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl rounded-2xl border-border bg-surface-elevated p-0 overflow-hidden">
          <div className="relative p-7 sm:p-8 lg:p-9">
            <div
              className="absolute inset-0 pointer-events-none opacity-35"
              style={{ background: "var(--gradient-radial-ember)" }}
            />
            <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

            <div className="relative">
              <DialogHeader className="space-y-3 text-left">
                <div className="font-mono text-xs uppercase tracking-widest text-ember">
                  / CerneOps Supra
                </div>
                <DialogTitle className="font-display text-3xl leading-tight">
                  Fale com um especialista
                </DialogTitle>
                <DialogDescription className="text-base text-foreground/80 leading-relaxed">
                  Conte como sua operação roda hoje. Nosso time entra em contato para
                  estruturar a melhor implementação Supra para sua empresa.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                <input type="hidden" name="origem" value={source} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="nome"
                    required
                    placeholder="Nome completo"
                    className="h-11 border-border/70 bg-background/70"
                  />
                  <Input
                    name="empresa"
                    required
                    placeholder="Empresa"
                    className="h-11 border-border/70 bg-background/70"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="E-mail corporativo"
                    className="h-11 border-border/70 bg-background/70"
                  />
                  <Input
                    name="telefone"
                    placeholder="Telefone / WhatsApp"
                    className="h-11 border-border/70 bg-background/70"
                  />
                </div>

                <Textarea
                  name="mensagem"
                  required
                  placeholder="Descreva seu cenário e objetivos."
                  className="min-h-28 border-border/70 bg-background/70"
                />

                {status === "success" ? (
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                    Mensagem enviada com sucesso. Vamos falar com você em breve.
                  </div>
                ) : null}

                {status === "error" ? (
                  <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                    Não foi possível enviar agora. Tente novamente em instantes.
                  </div>
                ) : null}

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 rounded-lg gradient-ember text-primary-foreground font-semibold px-6 py-3.5 shadow-ember hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar para especialista"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium hover:bg-surface transition"
                  >
                    Fechar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SupraContactModalContext.Provider>
  );
}

export function useSupraContactModal() {
  const context = useContext(SupraContactModalContext);
  if (!context) {
    throw new Error("useSupraContactModal deve ser usado dentro de SupraContactModalProvider");
  }
  return context;
}
