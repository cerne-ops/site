import fs from "node:fs";
import path from "node:path";

const siteRoot = process.cwd();
const tsModule = await import(
  path.join(siteRoot, "node_modules/typescript/lib/typescript.js")
);
const ts = tsModule.default || tsModule;
const configuredCoreRoot =
  process.env.CORE_REPO_PATH ||
  path.resolve(siteRoot, "../clientes/core-cerne");
const root = path.join(configuredCoreRoot, "app/(dashboard)/claude");

function propertyName(node) {
  if (!node?.name) return "";
  return node.name.text ?? node.name.escapedText ?? "";
}

const FIELD_LABELS = {
  reviewsInput: "Avaliações",
  criteriaInput: "Critérios de análise",
  ticketsInput: "Tickets e e-mails",
  rulesInput: "Regras de classificação e roteamento",
  supportBase: "Base de atendimento",
  sourceUrls: "Fontes e URLs",
  existingQuestions: "Perguntas existentes",
  taxType: "Tipo de tributo",
  period: "Período de apuração",
  companyInfo: "Dados da empresa",
  calculationData: "Dados de cálculo",
  reviewRules: "Regras de revisão",
  theme: "Tema ou tese buscada",
  caseContext: "Contexto do caso",
  precedentMaterial: "Material de precedentes fornecido",
  relevanceCriteria: "Critérios de relevância e cautelas",
};

const TITLE_ALIASES = {
  "Qualificador de Leads": "Qualificador de Leads (Lead Scoring)",
  "Gerador de Propostas Comerciais":
    "Gerador de Propostas Comerciais Personalizadas",
  "Analisador de Sentimento de Avaliacoes":
    "Analisador de Sentimento de Avaliações (Reviews)",
  "Analisador de Contratos":
    "Analisador de Contratos (Extrator de Cláusulas Críticas)",
  "Auditor de Conformidade de Imagens":
    "Auditor de Conformidade de Imagens (Controle de Qualidade)",
  "Extrator de Prazos de Intimacoes": "Extrator de Prazos e Intimações",
  "Validador NFe": "Validador de NFe",
};

const AGENT_CODE_BY_TITLE = {
  "Gerador de Respostas para Duvidas Frequentes (FAQ)": "gerador_respostas_faq",
};

const AGENT_CODE_ALIASES = {
  OBJECTION_ANALYZER_AGENT_CODE: "analisador_objecoes_vendas",
  PROPOSAL_GENERATOR_AGENT_CODE: "gerador_propostas_comerciais",
  LEAD_SCORING_AGENT_CODE: "qualificador_leads",
  RESUME_RANKING_AGENT_CODE: "selecionador_ranqueador_curriculos",
  REVIEWS_SENTIMENT_AGENT_CODE: "analisador_sentimento_reviews",
};

function resolveAgentCode(value) {
  return AGENT_CODE_ALIASES[value] || value;
}

function fieldLabel(key) {
  if (FIELD_LABELS[key]) return FIELD_LABELS[key];
  return key
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^./, (char) => char.toUpperCase());
}

function literal(node, sourceFile, env = new Map()) {
  if (!node) return "";
  if (ts.isParenthesizedExpression(node))
    return literal(node.expression, sourceFile, env);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))
    return node.text;
  if (ts.isNumericLiteral(node)) return node.text;
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isIdentifier(node) && env.has(node.text)) return env.get(node.text);
  if (ts.isTemplateExpression(node)) {
    let output = node.head.text;
    for (const span of node.templateSpans)
      output +=
        String(literal(span.expression, sourceFile, env)) + span.literal.text;
    return output;
  }
  if (ts.isArrayLiteralExpression(node))
    return node.elements.map((item) => literal(item, sourceFile, env));
  if (ts.isObjectLiteralExpression(node)) {
    const output = {};
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop))
        output[propertyName(prop)] = literal(prop.initializer, sourceFile, env);
      else if (ts.isShorthandPropertyAssignment(prop))
        output[propertyName(prop)] = env.get(propertyName(prop)) ?? "";
    }
    return output;
  }
  if (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === "join"
  ) {
    const target = literal(node.expression.expression, sourceFile, env);
    const separator = literal(node.arguments[0], sourceFile, env);
    return Array.isArray(target)
      ? target.join(String(separator ?? ","))
      : String(target ?? "");
  }
  if (ts.isPropertyAccessExpression(node)) {
    const target = literal(node.expression, sourceFile, env);
    return target && typeof target === "object"
      ? (target[node.name.text] ?? "")
      : "";
  }
  if (ts.isSpreadElement(node))
    return literal(node.expression, sourceFile, env);
  return node.getText(sourceFile).replace(/^['"]|['"]$/g, "");
}

function collectEnv(sourceFile) {
  const env = new Map();
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.initializer)
      env.set(
        node.name.getText(sourceFile),
        literal(node.initializer, sourceFile, env),
      );
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return env;
}

function findPageTitle(sourceFile) {
  let result = "";
  function visit(node) {
    if (result) return;
    const elementName = ts.isJsxSelfClosingElement(node)
      ? node.tagName.getText(sourceFile)
      : ts.isJsxElement(node)
        ? node.openingElement.tagName.getText(sourceFile)
        : "";
    if (elementName !== "PageTitleHelp") {
      ts.forEachChild(node, visit);
      return;
    }
    const attributes = ts.isJsxSelfClosingElement(node)
      ? node.attributes.properties
      : node.openingElement.attributes.properties;
    for (const attribute of attributes) {
      if (
        !ts.isJsxAttribute(attribute) ||
        attribute.name.text !== "title" ||
        !attribute.initializer
      )
        continue;
      if (ts.isStringLiteral(attribute.initializer))
        result = attribute.initializer.text;
      else if (ts.isJsxExpression(attribute.initializer))
        result = String(literal(attribute.initializer.expression, sourceFile));
    }
  }
  visit(sourceFile);
  return result;
}

function walk(node, callback, parent = null) {
  callback(node, parent);
  ts.forEachChild(node, (child) => walk(child, callback, node));
}

function findDefinitionObjects(sourceFile, env) {
  const records = [];
  walk(sourceFile, (node) => {
    if (!ts.isObjectLiteralExpression(node)) return;
    const props = new Map(
      node.properties
        .filter(ts.isPropertyAssignment)
        .map((prop) => [propertyName(prop), prop.initializer]),
    );
    if (!props.has("agentCode") || !props.has("exampleValues")) return;
    const fields = literal(props.get("fields"), sourceFile, env);
    const values = literal(props.get("exampleValues"), sourceFile, env);
    records.push({
      agentCode: resolveAgentCode(
        String(literal(props.get("agentCode"), sourceFile, env)),
      ),
      title: String(literal(props.get("title"), sourceFile, env)),
      fields: Array.isArray(fields)
        ? fields.map((field) => ({
            key: field.key,
            label: field.label,
            rows: field.rows,
            placeholder: field.placeholder,
          }))
        : [],
      values: values && typeof values === "object" ? values : {},
      kind: "definition",
    });
  });
  return records;
}

function findCustomRecord(sourceFile, env, filePath) {
  const values = {};
  const fieldKeys = [];
  const ignoredKeys =
    /^(result|resultText|resultStructured|usage|feedback|sourceFileName|selectedFileName|fileName|runs|loading|processing|status|error|runtimeConfig|agentConfig|modal|toast|preview|message|leads|results|summary|proposal|selectedRunId)$/i;
  walk(sourceFile, (node) => {
    const functionName = ts.isFunctionDeclaration(node)
      ? node.name?.text
      : ts.isVariableDeclaration(node) &&
          node.initializer &&
          ts.isArrowFunction(node.initializer)
        ? node.name.getText(sourceFile)
        : "";
    if (
      !/^(handleExample|handleExemplo|handleUseExample|fillExample|loadExample|loadExampleCase)$/.test(
        functionName,
      )
    )
      return;
    const body = ts.isFunctionDeclaration(node)
      ? node.body
      : node.initializer.body;
    if (!body || !ts.isBlock(body)) return;
    body.statements.forEach((statement) => {
      if (
        !ts.isExpressionStatement(statement) ||
        !ts.isCallExpression(statement.expression)
      )
        return;
      const call = statement.expression;
      if (
        !ts.isIdentifier(call.expression) ||
        !call.expression.text.startsWith("set")
      )
        return;
      const stateName = call.expression.text.slice(3);
      if (!call.arguments.length) return;
      const sourceValue = literal(call.arguments[0], sourceFile, env);
      const key = stateName.charAt(0).toLowerCase() + stateName.slice(1);
      if (
        ignoredKeys.test(key) ||
        sourceValue === "" ||
        sourceValue === null ||
        sourceValue === undefined
      )
        return;
      values[key] =
        typeof sourceValue === "string"
          ? sourceValue
          : JSON.stringify(sourceValue);
      fieldKeys.push(key);
    });
  });
  if (!fieldKeys.length) return null;
  const title =
    findPageTitle(sourceFile) || path.basename(path.dirname(filePath));
  const agentCode = (() => {
    let value = "";
    walk(sourceFile, (node) => {
      if (
        !ts.isVariableDeclaration(node) ||
        node.name.getText(sourceFile) !== "AGENT_CODE"
      )
        return;
      value = String(literal(node.initializer, sourceFile, env));
    });
    return value;
  })();
  return {
    agentCode: resolveAgentCode(agentCode) || AGENT_CODE_BY_TITLE[title] || "",
    title,
    fields: fieldKeys.map((key) => ({ key, label: fieldLabel(key), rows: 8 })),
    values,
    kind: "custom",
  };
}

if (!fs.existsSync(root)) {
  console.log(
    `Core checkout not found at ${root}; keeping the committed demo scenario snapshot.`,
  );
  process.exit(0);
}

const files = [];
function collectFiles(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (/^(Construction|Health)AgentPage\.tsx$/.test(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectFiles(full);
    else if (entry.name.endsWith(".tsx") && !entry.name.startsWith("_"))
      files.push(full);
  }
}
collectFiles(root);
files.sort();
const records = [];
for (const filePath of files) {
  const text = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const env = collectEnv(sourceFile);
  records.push(...findDefinitionObjects(sourceFile, env));
  if (
    !records.some(
      (record) =>
        record.kind === "definition" &&
        record.title === findPageTitle(sourceFile),
    )
  ) {
    const custom = findCustomRecord(sourceFile, env, filePath);
    if (custom) records.push(custom);
  }
}

const deduped = [];
for (const record of records) {
  if (!record.title || !Object.keys(record.values).length) continue;
  record.title = TITLE_ALIASES[record.title] || record.title;
  const key = record.agentCode || record.title;
  if (!deduped.some((item) => (item.agentCode || item.title) === key))
    deduped.push(record);
}
deduped.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
const outputPath = path.join(
  siteRoot,
  "src/lib/core-demo-scenarios.generated.ts",
);
const header =
  "/* eslint-disable prettier/prettier */\n/* Generated from Core agent Exemplo definitions. Run npm run generate:demo-scenarios. */\n\n";
const output = `${header}export const CORE_DEMO_SCENARIOS = ${JSON.stringify(deduped, null, 2)} as const;\n`;
fs.writeFileSync(outputPath, output);
console.log(`Generated ${deduped.length} Core demo scenarios at ${outputPath}`);
