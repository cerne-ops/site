import crypto from "node:crypto";
import fs from "node:fs";
import { createClient } from "@supabase/supabase-js";

const required = [
  "SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "DEMO_IDENTITY_EMAIL",
  "DEMO_IDENTITY_PASSWORD",
];
for (const name of required)
  if (!process.env[name]?.trim()) throw new Error(`Missing ${name}`);

const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};
const scenarioPath = getArg("--scenarios");
const outputPath = getArg("--out");
const limit = Number(getArg("--limit") || 0);
const offset = Number(getArg("--offset") || 0);
const maxTokensOverride = Number(getArg("--max-tokens") || 0);
const wordLimit = Number(getArg("--word-limit") || 0);
const requestedAgents = new Set(
  String(getArg("--agents") || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);
const coreApiUrl = String(
  process.env.CORE_API_URL || "https://core.cerneops.com.br/api/v1/claude",
).replace(/\/$/, "");
if (!scenarioPath || !outputPath) throw new Error("Use --scenarios and --out.");

const source = fs.readFileSync(scenarioPath, "utf8");
const match = source.match(/CORE_DEMO_SCENARIOS = (\[[\s\S]*\]) as const;/);
if (!match) throw new Error("Official scenarios not found.");
const scenarios = JSON.parse(match[1]);
const aliases = {
  LEAD_SCORING_AGENT_CODE: "qualificador_leads",
  OBJECTION_ANALYZER_AGENT_CODE: "analisador_objecoes_vendas",
  PROPOSAL_GENERATOR_AGENT_CODE: "gerador_propostas_comerciais",
  RESUME_RANKING_AGENT_CODE: "selecionador_ranqueador_curriculos",
  REVIEWS_SENTIMENT_AGENT_CODE: "analisador_sentimento_reviews",
};
const resolveCode = (scenario) =>
  aliases[scenario.agentCode] || scenario.agentCode || "gerador_respostas_faq";
const sliced = scenarios.slice(
  offset,
  limit > 0 ? offset + limit : scenarios.length,
);
const selected = requestedAgents.size
  ? sliced.filter((scenario) => requestedAgents.has(resolveCode(scenario)))
  : sliced;
if (process.env.DEMO_IDENTITY_USER_ID) {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY)
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY for ephemeral password rotation.",
    );
  const admin = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } },
  );
  const { error } = await admin.auth.admin.updateUserById(
    process.env.DEMO_IDENTITY_USER_ID,
    { password: process.env.DEMO_IDENTITY_PASSWORD },
  );
  if (error) throw error;
}
const client = createClient(
  process.env.SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  { auth: { persistSession: false } },
);
const { data: signed, error: signInError } =
  await client.auth.signInWithPassword({
    email: process.env.DEMO_IDENTITY_EMAIL,
    password: process.env.DEMO_IDENTITY_PASSWORD,
  });
if (signInError || !signed.session?.access_token)
  throw signInError || new Error("Synthetic identity authentication failed.");

function proposalItems(raw) {
  return String(raw || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [item, ...details] = line.split(" - ");
      return { item: item.trim(), details: details.join(" - ").trim() };
    });
}

function promptFor(scenario, agentCode) {
  const values = scenario.values || {};
  if (agentCode === "extrator_tabulador_notas_recibos") {
    const files = parseArray(values.files);
    return [
      "Voce e um extrator e tabulador de notas fiscais e recibos.",
      "Modo exemplo: estes arquivos sao apenas metadados de demonstracao e nao contem OCR/conteudo fiscal real. Nao invente emissor, datas, numeros, valores, impostos ou itens. Quando o conteudo nao estiver disponivel, deixe o campo vazio, use confianca 0 e registre inconsistencia indicando conteudo_documento ausente.",
      "Retorne JSON puro (sem markdown) com summary, rows, inconsistencies e export.csv_preview.",
      "Cada arquivo deve aparecer em rows e ter uma inconsistencia explicita sobre a ausencia de conteudo.",
      "Arquivos recebidos:",
      ...files.map(
        (file, index) =>
          `${index + 1}. ${file.name} (${file.type}, ${Number(file.size || 0)} bytes)`,
      ),
      `Regras personalizadas:\n${values.customRules || "Sem regras personalizadas."}`,
    ].join("\n");
  }
  if (agentCode === "gerador_propostas_comerciais") {
    const offerItems = proposalItems(values.itemsText);
    return [
      "Voce e o Agente Gerador de Propostas Comerciais Personalizadas da CerneOps.",
      "Retorne apenas JSON valido no schema commercial_proposal_v1.",
      "CONFIGURACAO DA EMPRESA",
      "tone_of_voice=formal_persuasivo",
      "currency=BRL",
      "price_format=R$ 0.000,00",
      "validity_days=30",
      "proposal_language=pt-BR",
      "DADOS DE ENTRADA",
      `client_name=${values.clientName}`,
      `company_name=${values.companyName}`,
      `client_context=${values.clientContext}`,
      `offer_details=${values.offerDetails}`,
      `template_reference=${values.templateText}`,
      `offer_items=${JSON.stringify(offerItems)}`,
      "SCHEMA",
      JSON.stringify({
        schema_version: "commercial_proposal_v1",
        resumo: {
          cliente_nome: "string",
          empresa_cliente: "string",
          titulo_proposta: "string",
          validade_dias: "number",
          idioma: "string",
        },
        secoes: [{ ordem: "number", titulo: "string", conteudo: "string" }],
        investimento: {
          moeda: "string",
          valor_total: "string",
          condicoes_pagamento: "string",
          observacoes: "string",
        },
        proximos_passos: {
          call_to_action: "string",
          prazo_resposta: "string",
          contato_responsavel: "string",
        },
        beneficios_chave: ["string"],
        riscos_mitigados: ["string"],
        anexos_sugeridos: ["string"],
        mensagem_final: "string",
      }),
    ].join("\n");
  }
  if (agentCode === "tradutor_manuais_pops") {
    return [
      "Voce e o Tradutor de Manuais Tecnicos e POPs da CerneOps.",
      "Traduza o material tecnico mantendo precisao terminologica, contexto operacional e clareza para execucao.",
      "Retorne apenas JSON valido no schema technical_manual_translation_v1, sem markdown.",
      "Estrutura obrigatoria: resumo, documentos, termos_chave, relatorio_qualidade, observacoes.",
      `Idioma de destino: ${values.targetLanguage}`,
      `Glossario/terminologia preferencial:\n${values.glossary}`,
      `Texto original informado manualmente:\n${values.manualText}`,
    ].join("\n");
  }
  if (agentCode === "analisador_sentimento_reviews") {
    return [
      "Voce e um analisador de sentimento de avaliacoes de clientes.",
      "Retorne JSON valido no schema review_sentiment_analysis_v1, sem markdown.",
      `Criterios personalizados:\n${values.criteriaInput}`,
      "FORMATO OBRIGATORIO DE RESPOSTA:",
      JSON.stringify({
        resumo_geral: {
          total_avaliacoes: "number",
          percentual_positivo: "number",
          percentual_neutro: "number",
          percentual_negativo: "number",
        },
        topicos_mais_mencionados: [
          {
            topico: "string",
            sentimento_predominante: "positivo|neutro|negativo|indefinido",
            total_mencoes: "number",
          },
        ],
        sugestoes_acao: ["string"],
        avaliacoes: [
          {
            id_avaliacao: "string",
            texto_trecho: "string",
            sentimento: "positivo|neutro|negativo|indefinido",
            confianca: "number",
            topicos: ["string"],
          },
        ],
        relatorio_executivo: "string opcional",
      }),
      "Use exatamente esses nomes de campos.",
      `Avaliacoes para analise:\n${values.reviewsInput}`,
    ].join("\n");
  }
  if (agentCode === "extrator_precedentes") {
    return [
      "Voce e o Agente Extrator de Precedentes da CerneOps.",
      "Extraia e organize apenas precedentes, teses, ementas, trechos e numeros informados pelo usuario.",
      "Nao consulte, simule ou alegue pesquisa em bases oficiais externas. Nao afirme atualidade, vigencia, completude ou tese dominante sem verificacao oficial.",
      "Retorne apenas JSON valido no schema precedent_extraction_v1, sem markdown.",
      "FORMATO OBRIGATORIO:",
      JSON.stringify({
        titulo: "string",
        aviso_revisao: "string",
        resumo: "string",
        precedentes: [
          {
            tribunal: "string",
            numero_processo: "string",
            tipo: "string",
            tese: "string",
            trecho_relevante: "string",
            aderencia: "string",
            cautela_verificacao: "string",
          },
        ],
        teses_identificadas: [
          {
            tese: "string",
            precedentes_relacionados: "string",
            uso_sugerido: "string",
          },
        ],
        lacunas: ["string"],
        checklist_verificacao: ["string"],
        proximos_passos: ["string"],
      }),
      `Tema ou tese buscada: ${values.theme}`,
      `Contexto do caso: ${values.caseContext}`,
      `Criterios de relevancia: ${values.relevanceCriteria}`,
      `Material de precedentes fornecido pelo usuario:\n${values.precedentMaterial}`,
    ].join("\n\n");
  }
  const fields = scenario.fields.filter((field) =>
    Object.hasOwn(scenario.values, field.key),
  );
  return [
    `Execute o agente ${scenario.title} usando exclusivamente os dados abaixo, preenchidos pelo botão Exemplo do Core CerneOps.`,
    "Entregue a análise no formato e no nível de detalhe definidos pelo próprio agente. Não mencione que se trata de uma demonstração.",
    ...(wordLimit > 0
      ? [
          `Requisito de completude: conclua todas as seções essenciais em no máximo ${wordLimit} palavras. Priorize dados quantitativos, conclusões, riscos e ações; elimine repetições e não interrompa a resposta no meio.`,
        ]
      : []),
    ...fields.map(
      (field) => `${field.label || field.key}:\n${scenario.values[field.key]}`,
    ),
  ].join("\n\n");
}

function parseArray(value) {
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(String(value || "[]"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function countRecords(value, marker) {
  const text = String(value || "").trim();
  if (!text) return 0;
  if (marker) return Math.max(1, (text.match(marker) || []).length);
  return text.split(/\n+/).filter(Boolean).length;
}

function analysisContextFor(scenario, agentCode) {
  const values = scenario.values || {};
  const base = {
    ...values,
    source: "core_agent_example",
    demo_snapshot: true,
    __cerne_usage_mode: "example_preview",
    __cerne_usage_source: "core_agent_example",
  };
  if (agentCode === "analisador_objecoes_vendas") {
    return {
      ...base,
      interaction_text: values.interactionText,
      interaction_count: 1,
      catalog_text: values.catalogText,
    };
  }
  if (agentCode === "qualificador_leads") {
    return {
      ...base,
      lead_count: countRecords(values.freeText, /^Lead\s+\d+/gim),
      criteria_text: values.criteriaText,
      free_text: values.freeText,
    };
  }
  if (agentCode === "gerador_propostas_comerciais") {
    const offerItems = proposalItems(values.itemsText);
    return {
      ...base,
      client_name: values.clientName,
      company_name: values.companyName,
      product_details: values.offerDetails,
      offer_items: offerItems,
    };
  }
  if (agentCode === "conferente_documentacao_admissao") {
    const documentText = String(values.documentsText || "");
    return {
      ...base,
      candidate: {
        name: values.candidateName,
        cpf: values.candidateCpf,
        birth_date: values.birthDate,
        role: values.role,
        expected_start_date: values.expectedStartDate,
      },
      documents: [
        {
          file_name: "exemplo-documentacao-admissional.txt",
          declared_type: "documentacao_admissional",
          extracted_text: documentText,
        },
      ],
      documents_text_length: documentText.length,
    };
  }
  if (agentCode === "extrator_tabulador_notas_recibos")
    return {
      ...base,
      files: parseArray(values.files).map((file) => ({
        ...file,
        size: Number(file.size || 0),
      })),
      extracted_files: [],
      extraction_proofs: [],
      input_mode: "example_metadata_only",
    };
  if (agentCode === "comparador_orcamentos_fornecedores")
    return {
      ...base,
      files: parseArray(values.files),
      quotes_count: countRecords(values.manualInput, /^Fornecedor\s+/gim),
    };
  if (agentCode === "analisador_curva_abc_estoque")
    return {
      ...base,
      files: parseArray(values.files),
      records_count_hint: Math.max(0, countRecords(values.manualData) - 1),
    };
  if (agentCode === "tradutor_manuais_pops")
    return {
      ...base,
      documents: [],
      files: [],
      extraction_proofs: [],
      target_language: values.targetLanguage,
      glossary: values.glossary,
      manual_text_provided: true,
    };
  if (agentCode === "analisador_sentimento_reviews")
    return {
      ...base,
      records_count: countRecords(values.reviewsInput),
      reviews_input: values.reviewsInput,
      criteria: values.criteriaInput,
      config: {
        language: "pt-BR",
        confidence_threshold: 0.7,
        topic_extraction_enabled: true,
        executive_report_enabled: true,
        max_reviews_per_batch: 1000,
      },
    };
  return base;
}

function exactGatewayContract(agentCode, maxTokens) {
  const contracts = {
    extrator_tabulador_notas_recibos: [
      "extraction",
      "invoice_receipt_extraction_v1",
    ],
    gerador_propostas_comerciais: [
      "document_generation",
      "commercial_proposal_v1",
    ],
    tradutor_manuais_pops: [
      "document_generation",
      "technical_manual_translation_v1",
    ],
    analisador_sentimento_reviews: [
      "structured_analysis",
      "review_sentiment_analysis_v1",
    ],
    extrator_precedentes: ["extraction", "precedent_extraction_v1"],
  };
  const contract = contracts[agentCode];
  return contract
    ? {
        agent_code: agentCode,
        task_type: contract[0],
        response_mode: "json",
        schema_key: contract[1],
        max_output_tokens: maxTokens,
        priority: "quality",
        fallback_enabled: true,
        contract_version: "gateway_agent_contract_v1",
      }
    : null;
}

function resumeCountFor(scenario, agentCode) {
  if (agentCode === "selecionador_ranqueador_curriculos")
    return countRecords(scenario.values?.resumes, /^Candidato\s+/gim);
  if (
    agentCode === "tradutor_manuais_pops" &&
    String(scenario.values?.manualText || "").trim()
  )
    return 1;
  return undefined;
}

const existingState = fs.existsSync(outputPath)
  ? JSON.parse(fs.readFileSync(outputPath, "utf8"))
  : {};
const results = existingState.results || [];
const failures = existingState.failures || [];
const checkpoint = () =>
  fs.writeFileSync(
    outputPath,
    JSON.stringify({ version: 1, results, failures }, null, 2),
    { mode: 0o600 },
  );

function normalizeOutput(payload) {
  for (const key of ["content", "response", "result", "output"]) {
    const value = payload?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (value && typeof value === "object")
      return JSON.stringify(value, null, 2);
  }
  for (const key of ["structured_content", "structuredContent", "data"]) {
    const value = payload?.[key];
    if (value && typeof value === "object")
      return JSON.stringify(value, null, 2);
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function parseStructuredResult(value) {
  if (value && typeof value === "object") return value;
  if (typeof value !== "string" || !value.trim()) return null;
  const raw = value
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  try {
    const parsed = JSON.parse(
      start >= 0 && end > start ? raw.slice(start, end + 1) : raw,
    );
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function isValidStructuredResult(agentCode, value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  if (agentCode !== "extrator_precedentes") return true;
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
      (key) => typeof value[key] === "string" && value[key].trim(),
    ) ||
    !requiredLists.every((key) => Array.isArray(value[key]))
  )
    return false;
  const validPrecedents = value.precedentes.every(
    (item) =>
      item &&
      typeof item === "object" &&
      [
        "tribunal",
        "numero_processo",
        "tipo",
        "tese",
        "trecho_relevante",
        "aderencia",
        "cautela_verificacao",
      ].every((key) => typeof item[key] === "string" && item[key].trim()),
  );
  const validTheses = value.teses_identificadas.every(
    (item) =>
      item &&
      typeof item === "object" &&
      ["tese", "precedentes_relacionados", "uso_sugerido"].every(
        (key) => typeof item[key] === "string" && item[key].trim(),
      ),
  );
  const validLists = [
    value.lacunas,
    value.checklist_verificacao,
    value.proximos_passos,
  ].every((items) =>
    items.every((item) => typeof item === "string" && item.trim()),
  );
  return validPrecedents && validTheses && validLists;
}

function structuredResultFrom(payload, content, agentCode) {
  for (const key of [
    "structured_content",
    "structuredContent",
    "structured_response",
    "structuredResponse",
  ]) {
    const parsed = parseStructuredResult(payload?.[key]);
    if (isValidStructuredResult(agentCode, parsed)) return parsed;
  }
  const parsedContent = parseStructuredResult(content);
  return isValidStructuredResult(agentCode, parsedContent)
    ? parsedContent
    : null;
}

for (const scenario of selected) {
  const agentCode = resolveCode(scenario);
  if (results.some((result) => result.agentCode === agentCode)) continue;
  const prompt = promptFor(scenario, agentCode);
  const analysisContext = analysisContextFor(scenario, agentCode);
  const resumeCount = resumeCountFor(scenario, agentCode);
  const specialMaxTokens =
    agentCode === "extrator_tabulador_notas_recibos"
      ? 3000
      : agentCode === "tradutor_manuais_pops"
        ? 3600
        : 3200;
  const maxTokens =
    maxTokensOverride > 0 ? maxTokensOverride : specialMaxTokens;
  const exactContract = exactGatewayContract(agentCode, maxTokens);
  const inputChecksum = crypto
    .createHash("sha256")
    .update(JSON.stringify(scenario.values))
    .digest("hex");
  const startedAt = Date.now();
  let response;
  let payload = {};
  let content = "";
  let truncated = false;
  let nonBillableExample = false;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    response = await fetch(coreApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${signed.session.access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "cerneops-demo-snapshot-runner/1.0",
      },
      body: JSON.stringify({
        agent_code: agentCode,
        max_tokens: maxTokens,
        prompt,
        ...(agentCode === "tradutor_manuais_pops"
          ? {
              system:
                "Execute traducao operacional de manuais tecnicos e POPs. Nao escolha provedor/modelo; use apenas o contrato Gateway recebido pelo backend.",
            }
          : {}),
        ...(resumeCount ? { resume_count: resumeCount } : {}),
        analysis_context: analysisContext,
        usage_policy: { mode: "example_preview", source: "core_agent_example" },
        ...(exactContract
          ? { gateway_contract: exactContract }
          : maxTokensOverride > 0
            ? { gateway_contract: { max_output_tokens: maxTokensOverride } }
            : {}),
      }),
    });
    payload = await response.json().catch(() => ({}));
    content = normalizeOutput(payload);
    truncated = Boolean(
      payload.gateway_truncated || payload.runtime_config?.gateway_truncated,
    );
    nonBillableExample = payload.usage?.non_billable === true;
    if (response.ok && content && !truncated && nonBillableExample) break;
    if (response.ok && content && !truncated && !nonBillableExample) break;
    const retryable =
      [502, 503, 504].includes(response.status) ||
      (response.ok && (!content || truncated));
    if (!retryable || attempt === 3) break;
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const structuredResult = structuredResultFrom(payload, content, agentCode);
  const invalidStructuredResult =
    agentCode === "extrator_precedentes" && !structuredResult;
  if (
    !response.ok ||
    !content ||
    truncated ||
    !nonBillableExample ||
    invalidStructuredResult
  ) {
    const reason = !response.ok
      ? `http_${response.status}`
      : truncated
        ? "gateway_truncated"
        : !content
          ? "empty_output"
          : !nonBillableExample
            ? "unexpected_billable_execution"
            : "invalid_structured_result";
    const payloadKeys =
      Object.keys(payload || {})
        .sort()
        .join(",") || "none";
    const priorFailure = failures.findIndex(
      (failure) => failure.agentCode === agentCode,
    );
    const failure = {
      agentCode,
      title: scenario.title,
      reason,
      payloadKeys,
      failedAt: new Date().toISOString(),
    };
    if (priorFailure >= 0) failures[priorFailure] = failure;
    else failures.push(failure);
    checkpoint();
    console.error(JSON.stringify({ status: "failed", ...failure }));
    continue;
  }
  const priorFailure = failures.findIndex(
    (failure) => failure.agentCode === agentCode,
  );
  if (priorFailure >= 0) failures.splice(priorFailure, 1);
  results.push({
    agentCode,
    title: scenario.title,
    inputs: scenario.values,
    inputChecksum,
    output: content,
    structuredResult,
    ...(agentCode === "extrator_precedentes"
      ? {
          contractVersion: "core-demo-snapshot-v2",
          schemaKey: "precedent_extraction_v1",
          rendererKey: "precedent_extraction_v1",
        }
      : {}),
    usage: payload.usage || null,
    model: payload.model || null,
    durationMs: Date.now() - startedAt,
    generatedAt: new Date().toISOString(),
    checksum: crypto.createHash("sha256").update(content).digest("hex"),
  });
  checkpoint();
  console.log(
    JSON.stringify({ status: "ok", agentCode, title: scenario.title }),
  );
}
checkpoint();
console.log(
  JSON.stringify({
    status: failures.length ? "complete_with_failures" : "complete",
    count: results.length,
    failures: failures.length,
    outputPath,
  }),
);
