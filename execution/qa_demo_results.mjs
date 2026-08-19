import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createHash } from "node:crypto";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function readGeneratedArray(relativePath, exportName) {
  const source = await readFile(path.join(root, relativePath), "utf8");
  const prefix = `export const ${exportName} = `;
  const start = source.indexOf(prefix);
  const end = source.lastIndexOf("] as const;");
  if (start < 0 || end < 0) {
    throw new Error(`Não foi possível ler ${exportName} em ${relativePath}.`);
  }
  return JSON.parse(source.slice(start + prefix.length, end + 1));
}

function meaningful(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value !== "object") return true;
  if (Array.isArray(value)) return value.some(meaningful);
  return Object.values(value).some(meaningful);
}

function markdownShape(output) {
  const fenceCount = (output.match(/```/g) || []).length;
  return {
    headings: (output.match(/^#{1,6}\s+.+$/gm) || []).length,
    tables: (output.match(/^\|.+\|\s*\n\|(?:\s*:?-{3,}:?\s*\|)+/gm) || [])
      .length,
    fences: fenceCount / 2,
    balancedFences: fenceCount % 2 === 0,
  };
}

function classify(value, output) {
  let flatRecordArrays = 0;
  let numericScalars = 0;
  const inspect = (item) => {
    if (Array.isArray(item)) {
      if (
        item.length &&
        item.every(
          (row) =>
            row &&
            typeof row === "object" &&
            !Array.isArray(row) &&
            Object.values(row).every(
              (cell) => cell === null || typeof cell !== "object",
            ),
        )
      )
        flatRecordArrays += 1;
      item.forEach(inspect);
      return;
    }
    if (!item || typeof item !== "object") return;
    for (const child of Object.values(item)) {
      if (
        typeof child === "number" ||
        (typeof child === "string" && /(?:R\$\s*)?\d+[\d.,]*%?/.test(child))
      )
        numericScalars += 1;
      else inspect(child);
    }
  };
  inspect(value);
  const tables = markdownShape(output).tables;
  if (flatRecordArrays || tables >= 2) return "tabular";
  if (
    numericScalars >= 3 ||
    /\b(?:KPI|indicador|métrica|percentual)\b/i.test(output)
  )
    return "analitico";
  return "documental";
}

const [scenarios, snapshots] = await Promise.all([
  readGeneratedArray(
    "src/lib/core-demo-scenarios.generated.ts",
    "CORE_DEMO_SCENARIOS",
  ),
  readGeneratedArray(
    "src/lib/core-demo-golden-results.generated.ts",
    "CORE_DEMO_GOLDEN_RESULTS",
  ),
]);

const errors = [];
const scenarioCodes = new Set(scenarios.map((item) => item.agentCode));
const snapshotCodes = new Set(snapshots.map((item) => item.agentCode));

if (scenarioCodes.size !== scenarios.length)
  errors.push("Há cenários duplicados.");
if (snapshotCodes.size !== snapshots.length)
  errors.push("Há snapshots duplicados.");

for (const code of scenarioCodes) {
  if (!snapshotCodes.has(code)) errors.push(`Snapshot ausente: ${code}.`);
}
for (const code of snapshotCodes) {
  if (!scenarioCodes.has(code)) errors.push(`Cenário ausente: ${code}.`);
}

const internalField =
  /^(?:files?|structuredResult|activeRunId|inviteEmailDrafts|inviteSendingKey|inviteModal|result|resultText|resultStructured|usage|feedback|loading|processing|runtimeConfig|agentConfig)$/i;
const englishLabel =
  /\b(?:Analysis|Date|Job|Description|Files?|Input|Rules?|Context|Period|Report|Required|Criteria|Current|Target|Source|Details?|Goal|Type|Name|Text|Document|Company|Client|Items?|Scope|Format|Language|Currency|Quantity|Category|Review|Role|Title|Objective|Constraints?|Profile|Result|Active|Modal|Sending|Drafts?|Statement|Start|End|Tolerance|Financial|Fleet|Incident|Inspection|Interaction|Investigation|Offer|Order|Points|Precedent|Reference|Template)\b/i;
for (const scenario of scenarios) {
  const fieldKeys = new Set();
  for (const field of scenario.fields || []) {
    if (fieldKeys.has(field.key))
      errors.push(`Campo duplicado em ${scenario.agentCode}: ${field.key}.`);
    fieldKeys.add(field.key);
    if (internalField.test(field.key))
      errors.push(
        `Estado interno exposto em ${scenario.agentCode}: ${field.key}.`,
      );
    if (!meaningful(scenario.values?.[field.key]))
      errors.push(`Entrada vazia em ${scenario.agentCode}: ${field.key}.`);
    if (englishLabel.test(String(field.label || "")))
      errors.push(
        `Rótulo não localizado em ${scenario.agentCode}: ${field.label}.`,
      );
  }
}

const stats = {
  json: 0,
  markdown: 0,
  tables: 0,
  fencedVisuals: 0,
  checklists: 0,
  quotes: 0,
  htmlBreaks: 0,
  archetypes: { analitico: 0, tabular: 0, documental: 0 },
};
for (const snapshot of snapshots) {
  const output = String(snapshot.output || "").trim();
  if (!output) {
    errors.push(`Resultado vazio: ${snapshot.agentCode}.`);
    continue;
  }
  const checksum = createHash("sha256").update(output).digest("hex");
  if (snapshot.checksum && checksum !== snapshot.checksum)
    errors.push(`Checksum divergente: ${snapshot.agentCode}.`);
  let parsed;
  try {
    parsed = JSON.parse(output);
    stats.json += 1;
    if (!meaningful(parsed))
      errors.push(`JSON sem conteúdo útil: ${snapshot.agentCode}.`);
  } catch {
    stats.markdown += 1;
    const shape = markdownShape(output);
    stats.tables += shape.tables;
    stats.fencedVisuals += shape.fences;
    stats.checklists += (
      output.match(/^\s*[-*]\s+\[[ xX]\]\s+/gm) || []
    ).length;
    stats.quotes += (output.match(/^\s*>\s?/gm) || []).length;
    stats.htmlBreaks += (output.match(/<br\s*\/?>/gi) || []).length;
    if (!shape.balancedFences)
      errors.push(`Bloco visual não fechado: ${snapshot.agentCode}.`);
    if (!shape.headings && output.length < 80)
      errors.push(
        `Resposta textual sem estrutura suficiente: ${snapshot.agentCode}.`,
      );
  }
  stats.archetypes[classify(parsed, output)] += 1;
}

if (errors.length) {
  console.error("QA dos resultados DEMO falhou:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    JSON.stringify(
      {
        status: "aprovado",
        agentes: snapshots.length,
        cenarios: scenarios.length,
        formatos: stats,
      },
      null,
      2,
    ),
  );
}
