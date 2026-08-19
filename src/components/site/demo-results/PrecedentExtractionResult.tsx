import { AlertTriangle, CheckCircle2, FileText } from "lucide-react";

type Precedent = {
  tribunal: string;
  numero_processo: string;
  tipo: string;
  tese: string;
  trecho_relevante: string;
  aderencia: string;
  cautela_verificacao: string;
};

type Thesis = {
  tese: string;
  precedentes_relacionados: string;
  uso_sugerido: string;
};

type PrecedentExtraction = {
  titulo: string;
  aviso_revisao: string;
  resumo: string;
  precedentes: Precedent[];
  teses_identificadas: Thesis[];
  lacunas: string[];
  checklist_verificacao: string[];
  proximos_passos: string[];
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function normalizePrecedentExtraction(
  value: unknown,
): PrecedentExtraction | null {
  const root = asRecord(value);
  const requiredText = ["titulo", "aviso_revisao", "resumo"];
  const requiredLists = [
    "precedentes",
    "teses_identificadas",
    "lacunas",
    "checklist_verificacao",
    "proximos_passos",
  ];
  if (
    !requiredText.every(
      (key) => typeof root[key] === "string" && root[key].trim(),
    ) ||
    !requiredLists.every((key) => Array.isArray(root[key]))
  )
    return null;

  const precedentes = (root.precedentes as unknown[]).flatMap((item) => {
    const source = asRecord(item);
    const keys = [
      "tribunal",
      "numero_processo",
      "tipo",
      "tese",
      "trecho_relevante",
      "aderencia",
      "cautela_verificacao",
    ];
    if (
      !keys.every(
        (key) => typeof source[key] === "string" && source[key].trim(),
      )
    )
      return [];
    return [source as Precedent];
  });
  if (precedentes.length !== (root.precedentes as unknown[]).length)
    return null;

  const tesesIdentificadas = (root.teses_identificadas as unknown[]).flatMap(
    (item) => {
      const source = asRecord(item);
      const keys = ["tese", "precedentes_relacionados", "uso_sugerido"];
      if (
        !keys.every(
          (key) => typeof source[key] === "string" && source[key].trim(),
        )
      )
        return [];
      return [source as Thesis];
    },
  );
  if (
    tesesIdentificadas.length !== (root.teses_identificadas as unknown[]).length
  )
    return null;

  const stringList = (key: string) => {
    const items = root[key] as unknown[];
    return items.every((item) => typeof item === "string" && item.trim())
      ? (items as string[])
      : null;
  };
  const lacunas = stringList("lacunas");
  const checklist = stringList("checklist_verificacao");
  const proximosPassos = stringList("proximos_passos");
  if (!lacunas || !checklist || !proximosPassos) return null;

  return {
    titulo: root.titulo as string,
    aviso_revisao: root.aviso_revisao as string,
    resumo: root.resumo as string,
    precedentes,
    teses_identificadas: tesesIdentificadas,
    lacunas,
    checklist_verificacao: checklist,
    proximos_passos: proximosPassos,
  };
}

// Exported alongside the renderer so UI and download share one validated contract.
// eslint-disable-next-line react-refresh/only-export-components
export function buildPrecedentExtractionText(value: unknown) {
  const result = normalizePrecedentExtraction(value);
  if (!result) return "Resultado estruturado indisponível.";
  return [
    result.titulo,
    "",
    result.aviso_revisao,
    "",
    result.resumo,
    "",
    "Precedentes",
    ...result.precedentes.map(
      (item) =>
        `- ${item.tribunal} | ${item.numero_processo} | ${item.tese} | Aderência: ${item.aderencia} | Cautela: ${item.cautela_verificacao}`,
    ),
    "",
    "Trechos relevantes",
    ...result.precedentes.map(
      (item) => `- ${item.tipo} — ${item.tribunal}: ${item.trecho_relevante}`,
    ),
    "",
    "Teses identificadas",
    ...result.teses_identificadas.map(
      (item) =>
        `- ${item.tese} | ${item.precedentes_relacionados} | Uso: ${item.uso_sugerido}`,
    ),
    "",
    "Lacunas",
    ...result.lacunas.map((item) => `- ${item}`),
    "",
    "Checklist de verificação oficial",
    ...result.checklist_verificacao.map((item) => `- ${item}`),
    "",
    "Próximos passos",
    ...result.proximos_passos.map((item) => `- ${item}`),
  ].join("\n");
}

function ResultList({
  title,
  items,
  empty,
  tone = "default",
}: {
  title: string;
  items: string[];
  empty: string;
  tone?: "default" | "warning";
}) {
  return (
    <section
      className={`rounded-xl border p-4 ${
        tone === "warning"
          ? "border-amber-500/30 bg-amber-500/[0.07]"
          : "border-border bg-surface/25"
      }`}
    >
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      {items.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="flex gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-circuit" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">{empty}</p>
      )}
    </section>
  );
}

export function PrecedentExtractionResult({ value }: { value: unknown }) {
  const result = normalizePrecedentExtraction(value);

  if (!result) {
    return (
      <section className="rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-4">
        <div className="flex items-start gap-3 text-amber-100">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h3 className="font-semibold">Resultado indisponível</h3>
            <p className="mt-1 text-sm leading-6 text-amber-100/80">
              Este agente exige um snapshot estruturado válido para reproduzir
              fielmente o resultado do Core.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-amber-500/30 bg-amber-500/[0.07] p-4 text-sm leading-6 text-amber-100">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>{result.aviso_revisao}</p>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-background/45 p-4 sm:p-5">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {result.titulo}
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {result.resumo}
        </p>
      </section>

      <div className="overflow-x-auto rounded-xl border border-border/80">
        <table className="min-w-[680px] divide-y divide-border/60 text-left text-sm md:min-w-full">
          <caption className="sr-only">
            Precedentes organizados por tribunal, número, tese, aderência e
            cautela de verificação
          </caption>
          <thead className="bg-surface/55 text-muted-foreground">
            <tr>
              {["Tribunal", "Número", "Tese", "Aderência", "Cautela"].map(
                (column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-3 py-3 font-medium"
                  >
                    {column}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50 bg-background/35">
            {result.precedentes.length ? (
              result.precedentes.map((item, index) => (
                <tr key={`${item.numero_processo}-${index}`}>
                  <td className="px-3 py-3 align-top font-medium">
                    {item.tribunal}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {item.numero_processo}
                  </td>
                  <td className="max-w-sm px-3 py-3 align-top leading-6">
                    {item.tese}
                  </td>
                  <td className="px-3 py-3 align-top">{item.aderencia}</td>
                  <td className="max-w-xs px-3 py-3 align-top leading-6 text-amber-100/85">
                    {item.cautela_verificacao}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-muted-foreground">
                  Nenhum precedente estruturado informado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <section className="space-y-3 rounded-xl border border-border bg-surface/25 p-4">
        <h4 className="text-sm font-semibold text-foreground">
          Trechos relevantes
        </h4>
        {result.precedentes.length ? (
          result.precedentes.map((item, index) => (
            <article
              key={`${item.trecho_relevante}-${index}`}
              className="rounded-lg border border-border/70 bg-background/45 p-4"
            >
              <p className="flex items-center gap-2 text-sm font-semibold">
                <FileText className="h-4 w-4 text-circuit" />
                {item.tipo} — {item.tribunal}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.trecho_relevante}
              </p>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            Sem trechos estruturados.
          </p>
        )}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <ResultList
          title="Teses identificadas"
          items={result.teses_identificadas.map(
            (item) =>
              `${item.tese} | ${item.precedentes_relacionados} | Uso: ${item.uso_sugerido}`,
          )}
          empty="Sem teses identificadas."
        />
        <ResultList
          title="Lacunas"
          items={result.lacunas}
          empty="Sem lacunas informadas."
          tone="warning"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ResultList
          title="Checklist de verificação oficial"
          items={result.checklist_verificacao}
          empty="Sem checklist informado."
        />
        <ResultList
          title="Próximos passos"
          items={result.proximos_passos}
          empty="Sem próximos passos."
        />
      </div>
    </div>
  );
}
