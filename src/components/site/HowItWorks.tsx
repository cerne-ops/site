import supraLogo from "@/assets/planos/SUPRA.png";

const steps = [
  {
    n: "01",
    title: "Mapeamos onde você perde dinheiro",
    body: "Entramos na sua operação para identificar gargalos, retrabalho e tarefas que não deveriam ser manuais. Aqui não é diagnóstico superficial — é entender o que realmente trava sua empresa.",
  },
  {
    n: "02",
    title: "Desenhamos processos que funcionam",
    body: "Reorganizamos sua operação com fluxos claros, simples e executáveis. Cada etapa passa a ter padrão, lógica e previsibilidade — sem depender de improviso.",
  },
  {
    n: "03",
    title: "Aplicamos todo o poder do Core Dominus",
    body: "Você usa todos os agentes, recursos e capacidades do Dominus no nível mais completo. Organizados dentro do seu processo, não soltos como ferramenta. Tirando gaps, padronizando tarefas diárias e reduzindo desperdícios.",
  },
  {
    n: "04",
    title: "Construímos o que sua operação precisa",
    body: "Criamos automações, integrações e estruturas específicas para o seu negócio. Se não existe pronto, a gente desenvolve.",
  },
  {
    n: "05",
    title: "Implantamos até rodar de verdade",
    body: "Nada fica no papel. A operação entra em funcionamento, é ajustada com sua equipe e passa a rodar com padrão, controle e previsibilidade.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-28 border-y border-border">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
              / Como o Supra funciona
            </div>
            <img
              src={supraLogo}
              alt="Supra"
              className="mb-5 h-11 w-11 object-contain opacity-80"
            />
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              A operação no nível mais alto —
              <br />
              estruturada, automatizada
              <br />
              <span className="text-gradient-ember">e sob medida com o SUPRA.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              O Cerne Supra é o nível máximo da Cerne.
              <br />
              <br />
              Você tem tudo que o Core oferece — no mais alto nível do Dominus —
              e ainda uma operação desenhada, adaptada e implantada para a sua realidade.
            </p>
            <p className="mt-8 text-foreground/90 leading-relaxed font-display text-xl">
              Se o Core melhora a execução,
              <br />
              <span className="text-gradient-ember">o Supra transforma a operação.</span>
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="group flex items-start gap-6 rounded-2xl border border-border bg-surface/40 p-6 hover:bg-surface hover:border-ember/30 transition-all"
              >
                <div className="font-mono text-sm text-ember w-10 shrink-0 pt-1">
                  {s.n}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
                <div className="text-muted-foreground group-hover:text-ember group-hover:translate-x-1 transition-all text-xl">
                  →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
