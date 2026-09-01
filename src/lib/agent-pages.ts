import { type Locale } from "@/lib/i18n";

export type AgentMarkdownBlock =
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type AgentPage = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  agentName: string;
  agentGroup: string;
  keywords: string[];
  content: string;
  blocks: AgentMarkdownBlock[];
};

const rawAgentModules = import.meta.glob("../../Agentes/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const agentGroupTranslations: Record<string, string> = {
  "Atendimento e Relacionamento com Cliente": "Customer Service and Relations",
  "Contabilidade e Fiscal": "Accounting and Tax",
  "Engenharia e Construção Civil": "Engineering and Construction",
  "Financeiro e Administrativo": "Finance and Administration",
  "Gestão e Produtividade do Gestor": "Management and Productivity",
  "Jurídico e Advocacia": "Legal and Law Practice",
  "Operação Alimentícia": "Food Operations",
  "Operação Analítica": "Analytical Operations",
  "Operação e Logística": "Operations and Logistics",
  "Recursos Humanos e Departamento Pessoal": "Human Resources and Personnel",
  "Saúde e Clínicas": "Healthcare and Clinics",
  "Segurança do Trabalho e Compliance": "Workplace Safety and Compliance",
  "Agentes CerneOps": "CerneOps Agents",
};

const agentNameTranslations: Record<string, string> = {
  "Adaptador de Receitas Inteligente": "Smart Recipe Adapter",
  "Analista de Enquadramento Tributário Simples":
    "Simple Tax Classification Analyst",
  "Analisador de Acidentes": "Accident Analyzer",
  "Analisador de Ciclo de Vendas": "Sales Cycle Analyzer",
  "Analisador de Clima Organizacional": "Organizational Climate Analyzer",
  "Analisador de Contratos (Extrator de Cláusulas Críticas)":
    "Contract Analyzer (Critical Clause Extractor)",
  "Analisador de Curva ABC de Estoque": "Inventory ABC Curve Analyzer",
  "Analisador de Desvio de Cronograma": "Schedule Deviation Analyzer",
  "Analisador de Fluxo de Caixa": "Cash Flow Analyzer",
  "Analisador de Glosas": "Denial Claims Analyzer",
  "Analisador de Incentivos Fiscais": "Tax Incentives Analyzer",
  "Analisador de KPIs": "KPI Analyzer",
  "Analisador de Objeções de Vendas": "Sales Objection Analyzer",
  "Analisador de Preços de Concorrentes": "Competitor Price Analyzer",
  "Analisador de Relatórios de Inspeção": "Inspection Report Analyzer",
  "Analisador de Sazonalidade": "Seasonality Analyzer",
  "Analisador de Sentimento de Avaliações (Reviews)":
    "Review Sentiment Analyzer",
  "Analisador de Tempo de Resposta": "Response Time Analyzer",
  "Analisador de Turnover": "Turnover Analyzer",
  "Auditor de Boas Práticas de Fabricação (BPF)":
    "Good Manufacturing Practices (GMP) Auditor",
  "Auditor de Conformidade": "Compliance Auditor",
  "Auditor de Conformidade de Imagens (Controle de Qualidade)":
    "Image Compliance Auditor (Quality Control)",
  "Auditor de Duplicidade de Pagamentos": "Duplicate Payment Auditor",
  "Calculador de Margem de Lucro": "Profit Margin Calculator",
  "Calculador de Perdas e Sobras": "Loss and Surplus Calculator",
  "Classificador e Roteador de E-mails/Tickets":
    "Email and Ticket Classifier and Router",
  "Comparador de Orçamentos de Fornecedores": "Supplier Quote Comparator",
  "Conciliador de Extrato Bancário Simples": "Simple Bank Statement Reconciler",
  "Conferente de Documentação de Admissão": "Admission Documentation Checker",
  "Estruturador de Prontuários e Evolução Clínica":
    "Medical Record and Clinical Note Structurer",
  "Extrator de Prazos e Intimações": "Deadlines and Legal Notices Extractor",
  "Extrator de Precedentes": "Precedent Extractor",
  "Extrator de Quantitativos de Projetos": "Project Quantity Extractor",
  "Extrator e Tabulador de Notas Fiscais/Recibos":
    "Invoice and Receipt Extractor and Tabulator",
  "Gerador de Argumentário de Vendas": "Sales Argument Generator",
  "Gerador de Cardápios para Eventos": "Event Menu Generator",
  "Gerador de Checklist de Estoque": "Inventory Checklist Generator",
  "Gerador de Cronograma de Obra": "Construction Schedule Generator",
  "Gerador de Diário de Obra": "Construction Daily Log Generator",
  "Gerador de Escalas de Trabalho": "Work Shift Schedule Generator",
  "Gerador de Fichas Técnicas de Produtos": "Product Technical Sheet Generator",
  "Gerador de Guia de Recolhimento": "Tax Payment Guide Generator",
  "Gerador de Matriz de Risco Simplificada": "Simplified Risk Matrix Generator",
  "Gerador de Parecer Jurídico": "Legal Opinion Generator",
  "Gerador de PDI": "Individual Development Plan Generator",
  "Gerador de Plano de Ação": "Action Plan Generator",
  "Gerador de Plano de Segurança": "Safety Plan Generator",
  "Gerador de Propostas Comerciais Personalizadas":
    "Personalized Sales Proposal Generator",
  "Gerador de Receita Médica": "Medical Prescription Draft Generator",
  "Gerador de Relatório Executivo": "Executive Report Generator",
  "Gerador de Respostas para Dúvidas Frequentes (FAQ)":
    "FAQ Response Generator",
  "Gerador de Rótulos Nutricionais": "Nutrition Label Generator",
  "Gerador de Resumo de Obrigações Acessórias":
    "Ancillary Obligations Summary Generator",
  "Gerador de Script de Atendimento": "Customer Service Script Generator",
  "Gerenciador de Validade e Estoque Perecível":
    "Expiration Date and Perishable Inventory Manager",
  "Limpador e Padronizador de Banco de Dados":
    "Database Cleaner and Standardizer",
  "Otimizador de Compras de Ingredientes": "Ingredient Purchasing Optimizer",
  "Otimizador de Rotas de Entrega/Visitas":
    "Delivery and Visit Route Optimizer",
  "Planejador de Conteúdo para Redes Sociais": "Social Media Content Planner",
  "Planejador de Produção Diária": "Daily Production Planner",
  "Previsão de Demanda": "Demand Forecaster",
  "Qualificador de Leads (Lead Scoring)": "Lead Qualifier (Lead Scoring)",
  "Selecionador e Ranqueador de Currículos": "Resume Selector and Ranker",
  "Sintetizador de Jurisprudência": "Case Law Synthesizer",
  "Sintetizador de Reuniões e Gerador de Atas":
    "Meeting Synthesizer and Minutes Generator",
  "Tradutor de Manuais Técnicos e POPs": "Technical Manual and SOP Translator",
  "Triador de Guias de Convênio": "Insurance Guide Triage Agent",
  "Validador de NFe": "Electronic Invoice Validator",
};

const headingTranslations: Record<string, string> = {
  "Introdução com dor do cliente": "Introduction: customer pain",
  "Principais desafios do processo manual":
    "Main challenges in the manual process",
  "Como funciona o Selecionador e Ranqueador de Currículos da CerneOps":
    "How this CerneOps agent works",
  "Benefícios para empresas": "Benefits for companies",
  "Redução de tempo": "Time reduction",
  "Mais organização": "More organization",
  "Padronização do processo": "Process standardization",
  "Apoio à decisão": "Decision support",
  "Quem pode utilizar essa solução?": "Who can use this solution?",
  "A IA substitui o profissional responsável?":
    "Does AI replace the responsible professional?",
  "Cuidados e limites importantes": "Important safeguards and limits",
  "Perguntas frequentes": "Frequently asked questions",
  "1. Informe os dados necessários": "1. Provide the required data",
  "2. A plataforma organiza as informações":
    "2. The platform organizes the information",
  "3. Receba uma entrega estruturada": "3. Receive a structured deliverable",
  "Quais dados preciso informar para começar?":
    "What data do I need to provide to start?",
  "O resultado pode ser usado sem revisão humana?":
    "Can the result be used without human review?",
  "Essa solução exige integração com outros sistemas?":
    "Does this solution require integration with other systems?",
  "Por que escolher a CerneOps?": "Why choose CerneOps?",
};

export function getLocalizedAgentName(agentName: string, locale: Locale) {
  if (locale !== "en-US") return agentName;
  return agentNameTranslations[agentName] ?? agentName;
}

export function getLocalizedAgentGroup(agentGroup: string, locale: Locale) {
  if (locale !== "en-US") return agentGroup;
  return agentGroupTranslations[agentGroup] ?? agentGroup;
}

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(markdown: string) {
  if (!markdown.startsWith("---")) {
    return {
      frontmatter: {} as Record<string, string | string[]>,
      content: markdown.trim(),
    };
  }

  const end = markdown.indexOf("\n---", 3);
  if (end === -1) {
    return {
      frontmatter: {} as Record<string, string | string[]>,
      content: markdown.trim(),
    };
  }

  const yaml = markdown.slice(3, end).trim();
  const content = markdown.slice(end + 4).trim();
  const frontmatter: Record<string, string | string[]> = {};
  let currentListKey: string | null = null;

  for (const line of yaml.split(/\r?\n/)) {
    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && currentListKey) {
      const current = frontmatter[currentListKey];
      const nextValue = stripQuotes(listMatch[1] ?? "");
      frontmatter[currentListKey] = Array.isArray(current)
        ? [...current, nextValue]
        : [nextValue];
      continue;
    }

    const keyValueMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!keyValueMatch) continue;

    const key = keyValueMatch[1] ?? "";
    const value = keyValueMatch[2] ?? "";
    if (!value.trim()) {
      frontmatter[key] = [];
      currentListKey = key;
      continue;
    }

    frontmatter[key] = stripQuotes(value);
    currentListKey = null;
  }

  return { frontmatter, content };
}

function parseMarkdownBlocks(markdown: string): AgentMarkdownBlock[] {
  const blocks: AgentMarkdownBlock[] = [];
  const paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ").trim() });
    paragraphLines.length = 0;
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "list", items: listItems });
    listItems = [];
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length as 1 | 2 | 3 | 4,
        text: headingMatch[2] ?? "",
      });
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1] ?? "");
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function asStringArray(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function hasLiteralTruncation(value: string) {
  return value.includes("…") || value.includes("...");
}

function normalizeAgentLookupKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

const agentPages = Object.values(rawAgentModules)
  .map((markdown) => {
    const { frontmatter, content } = parseFrontmatter(markdown);
    const title = asString(frontmatter.title);
    const slug = asString(frontmatter.slug);
    const agentName = asString(frontmatter.agent_name) || title;
    const metaTitle = asString(frontmatter.meta_title);
    const metaDescription = asString(frontmatter.meta_description);

    if (!slug || !title) return null;

    return {
      title,
      slug,
      metaTitle:
        metaTitle && !hasLiteralTruncation(metaTitle) ? metaTitle : title,
      metaDescription:
        metaDescription && !hasLiteralTruncation(metaDescription)
          ? metaDescription
          : title ||
            `Conheça o ${agentName} da CerneOps para reduzir burocracia e acelerar rotinas operacionais.`,
      agentName,
      agentGroup: asString(frontmatter.agent_group) || "Agentes CerneOps",
      keywords: asStringArray(frontmatter.keywords),
      content,
      blocks: parseMarkdownBlocks(content),
    } satisfies AgentPage;
  })
  .filter((agent): agent is AgentPage => Boolean(agent))
  .sort((a, b) => a.agentName.localeCompare(b.agentName, "pt-BR"));

const agentsBySlug = new Map(agentPages.map((agent) => [agent.slug, agent]));
const searchableAgentNames = agentPages.map((agent) => ({
  key: normalizeAgentLookupKey(agent.agentName),
  slug: agent.slug,
}));
const slugsByAgentName = new Map(
  searchableAgentNames.map((agent) => [agent.key, agent.slug]),
);

function hasPortugueseMarker(value: string) {
  return /[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]|\b(você|empresa|operação|processo|dados|revisão|agente|solução|informações|responsável|integração|começar|escolher|conheça|apoio)\b/i.test(
    value,
  );
}

const operationTranslations: Record<string, string> = {
  análise: "analysis",
  auditoria: "auditing",
  automação: "automation",
  cálculo: "calculation",
  classificação: "classification",
  comparação: "comparison",
  conciliação: "reconciliation",
  extração: "extraction",
  geração: "generation",
  otimização: "optimization",
  previsão: "forecasting",
  produtividade: "productivity",
  qualificação: "qualification",
  seleção: "selection",
  síntese: "synthesis",
  tradução: "translation",
  validação: "validation",
};

function translateOperation(value: string) {
  return operationTranslations[value.trim().toLowerCase()] ?? value;
}

function translateOperationInText(value: string) {
  return Object.entries(operationTranslations).reduce(
    (current, [source, target]) =>
      current.replace(new RegExp(source, "gi"), target),
    value,
  );
}

function translateAgentHeading(text: string, agent: AgentPage) {
  const agentName = getLocalizedAgentName(agent.agentName, "en-US");
  const exact = headingTranslations[text];
  if (exact) return exact;

  if (text.startsWith(`O ${agent.agentName} entrega`)) {
    return `Does ${agentName} deliver an automatic decision?`;
  }

  if (text.includes(agent.agentName)) {
    return translateOperationInText(text)
      .replace(agent.agentName, agentName)
      .replace(": IA para ", ": AI for ")
      .replace(" em empresas", " in companies");
  }

  const introMatch = text.match(/^O que é (.+) com IA\?$/);
  if (introMatch)
    return `What is ${translateOperation(introMatch[1] ?? "")} with AI?`;

  if (text.startsWith("Como funciona ")) {
    return `How ${agentName} works in CerneOps`;
  }

  if (text.startsWith(`O ${agent.agentName} entrega`)) {
    return `Does ${agentName} deliver an automatic decision?`;
  }

  if (text.startsWith(`Experimente o ${agent.agentName}`)) {
    return `Try ${agentName}`;
  }

  if (text.startsWith("# ")) return text;
  return text;
}

function translateAgentParagraph(text: string, agent: AgentPage) {
  const agentName = getLocalizedAgentName(agent.agentName, "en-US");
  const agentGroup = getLocalizedAgentGroup(agent.agentGroup, "en-US");
  const groupLower = agentGroup.toLowerCase();

  if (text.startsWith("Empresas pequenas e médias convivem")) {
    return `Small and medium-sized companies deal every day with routines that look simple but consume time, attention, and energy from qualified people. In ${groupLower}, information is often spread across messages, spreadsheets, PDFs, notes, and old templates. When this work depends on manual effort, the operation loses pace and consistency.`;
  }

  if (text.startsWith(`O ${agent.agentName} da CerneOps foi criado`)) {
    return `${agentName} was created by CerneOps to support this kind of routine in ${groupLower}. It turns information provided by the user into an organized, reviewable output that is useful for the next step of the process.`;
  }

  if (text.startsWith("Na prática, a dor que esse agente endereça")) {
    return "In practice, the pain this agent addresses is direct: repetitive operational work consumes time and reduces consistency. This is not only a productivity issue; it also affects quality, traceability, standardization, and response capacity.";
  }

  if (text.includes("é o uso de inteligência artificial para organizar")) {
    return `AI support here means using artificial intelligence to organize operational information and generate a structured deliverable from data provided by the company. The technology does not remove human responsibility or turn incomplete data into a definitive truth; it acts as a support layer for reading, categorization, synthesis, comparison, drafting, or prioritization.`;
  }

  if (text.startsWith(`No contexto do ${agent.agentName}`)) {
    return `In the context of ${agentName}, AI receives the material provided by the user and applies an organization logic focused on the business process. The goal is to reduce repetitive work, lower rework, and improve how information is presented.`;
  }

  if (text.startsWith("Esse tipo de solução combina bem")) {
    return "This type of solution fits small and medium-sized companies because it starts from what the team already has: copied text, simple structured data, documents, descriptions, internal criteria, and business context. CerneOps keeps the experience practical and oriented to daily use, with zero integration as a guiding principle.";
  }

  if (text.startsWith("O primeiro desafio é")) {
    return "The first challenge is information dispersion. Relevant data may be scattered across files, WhatsApp messages, emails, internal spreadsheets, PDFs, or observations recorded by different people. Even when everything exists, bringing the material into one coherent view takes time and continuous attention.";
  }

  if (text.startsWith("O segundo desafio é")) {
    return "The second challenge is lack of standardization. Each person may organize the same routine differently, with different field names, varied criteria, and different levels of detail. This makes it harder to compare periods, teams, clients, suppliers, or similar cases.";
  }

  if (text.startsWith("O terceiro desafio é")) {
    return "The third challenge is the risk of incomplete reading. In repetitive tasks, important points can easily go unnoticed. The manual process depends heavily on the memory and individual care of whoever is executing it.";
  }

  if (text.startsWith("O quarto desafio é")) {
    return "The fourth challenge is the delay in turning data into action. Many companies have the information they need, but cannot quickly convert it into a report, checklist, draft, ranking, analysis, plan, or next step.";
  }

  if (text.startsWith(`Para usar o ${agent.agentName}`)) {
    return `To use ${agentName}, the user provides context and the available data for analysis. The more complete the input data, the more useful the output structure tends to be. It is recommended to include internal criteria, the period analyzed, the goal of the request, known limitations, and any rule the company already uses.`;
  }

  if (text.startsWith("A CerneOps processa")) {
    return "CerneOps processes the provided content and organizes the data according to the agent's purpose. The work may involve reading text, separating fields, identifying patterns, summarizing relevant points, building tables, drafting content, or structuring operational recommendations.";
  }

  if (text.startsWith("A entrega esperada para")) {
    return `The expected deliverable from ${agentName} is structured support material for review, checking, and operational use. It can accelerate a meeting, guide a check, prepare a response, support triage, or make a decision better documented. Final analysis remains with the people who know the business and its rules.`;
  }

  if (text.startsWith("O principal ganho operacional")) {
    return "The main operational gain is reducing time spent on repetitive tasks. Instead of building the structure manually, the team can start from an organized version and review the content with more focus.";
  }

  if (text.startsWith("O agente ajuda a transformar")) {
    return "The agent helps turn loose information into a structure that is easier to understand. Fields, topics, alerts, recommendations, and next steps become easier to locate.";
  }

  if (text.startsWith("Quando uma rotina passa")) {
    return "When a routine starts using a similar input and output format, the company gains consistency. Standardization improves comparison between cases and reduces dependence on individual styles.";
  }

  if (text.startsWith(`O ${agent.agentName} não decide`)) {
    return `${agentName} does not decide for the company, but improves the quality of the material used in the decision. By highlighting relevant points, gaps, hypotheses, and cautions, the agent helps the team review the case with more method.`;
  }

  if (text.startsWith("Essa solução pode ser utilizada")) {
    return `This solution can be used by teams and companies that need to handle ${groupLower} in a more organized way, but do not yet have the structure, time, or budget for complex implementations.`;
  }

  if (text.startsWith("Também pode ser útil")) {
    return "It can also be useful for growing businesses that already feel rising operational volume and need to create standards before the routine becomes chaotic. The agent supports teams that want to document work better, reduce rework, and gain speed in preparing materials.";
  }

  if (text.startsWith("Consultorias, escritórios especializados")) {
    return `Consultancies, specialized offices, and service providers may also use ${agentName} as internal support, as long as they keep technical review and professional responsibility over sensitive deliverables.`;
  }

  if (text.startsWith(`Não. O ${agent.agentName} apoia`)) {
    return `No. ${agentName} supports organization, analysis, and draft generation, but it does not replace the professional responsible for the process. Sensitive decisions require human review, context validation, and respect for the company's internal rules.`;
  }

  if (text.startsWith("Em rotinas de pessoas")) {
    return "In people-related routines, AI should support triage, organization, and drafting without making automatic decisions about candidates, employees, promotions, terminations, salaries, or disciplinary measures.";
  }

  if (text.startsWith("Em saúde")) {
    return "In healthcare, AI should support documentation and administrative routines. It does not diagnose, prescribe, define clinical conduct, or replace a licensed professional.";
  }

  if (text.startsWith("Em operação e logística")) {
    return "In operations and logistics, the agent supports planning and standardization, but depends on correct data, local context, and validation by people who understand real route, inventory, team, and safety constraints.";
  }

  if (text.startsWith("Em gestão")) {
    return "In management routines, AI organizes information and generates structured drafts. Strategic decisions, formal commitments, and sensitive communications require review by responsible people.";
  }

  if (text.startsWith(`O uso responsável do ${agent.agentName}`)) {
    return `Responsible use of ${agentName} starts with the quality of the data provided. If the user provides incomplete, outdated, or context-free information, the output can reflect those limitations.`;
  }

  if (text.startsWith("Também é importante observar os limites descritos")) {
    return `It is also important to respect the limits described for this agent. ${agentName} was designed for a specific routine and should not be used to expand scope, create formal commitments without review, or replace original document checking when that checking is necessary.`;
  }

  if (text.startsWith("Empresas devem evitar inserir")) {
    return "Companies should avoid entering unnecessary, sensitive, or excessive data. Whenever personal, health, legal, financial, or internal information is involved, the team should apply privacy, necessity, and confidentiality policies.";
  }

  if (text.startsWith("Não. O agente estrutura")) {
    return "No. The agent structures information and provides support material for analysis, but it should not be treated as an automatic decision. The result must be interpreted by responsible people considering context, internal rules, complete data, and the practical impact of the specific case.";
  }

  if (text.startsWith("Os dados dependem")) {
    return `The required data depends on the agent's routine, but usually includes context, objective, raw information, analysis criteria, and known limitations. For ${agentName}, the expected operation is to provide the information needed for the platform to organize the process and generate a structured output.`;
  }

  if (text.startsWith("Não. O resultado deve ser revisado")) {
    return "No. The result must be reviewed before any sensitive, external, or definitive use. CerneOps helps accelerate preparation, organization, and drafting, but final validation belongs to the company, manager, or qualified professional responsible for the area.";
  }

  if (text.startsWith("Não necessariamente")) {
    return "Not necessarily. CerneOps Core is designed for practical use with zero integration, based on information provided by the user. In many cases, it is enough to paste data, describe the context, or send simple material according to the agent's intended routine.";
  }

  if (text.startsWith("A CerneOps é uma plataforma")) {
    return "CerneOps is an AI agent platform designed to reduce bureaucracy and accelerate business routines. Instead of creating a complex technical project for each problem, the platform brings together specialized agents for clear tasks, simple inputs, and structured deliverables.";
  }

  if (text.startsWith("Para pequenas e médias empresas")) {
    return "For small and medium-sized companies, this means access to practical automation across HR, sales, finance, service, operations, legal, tax, healthcare, engineering, management, and food operations. The focus is to support real teams in real processes, with objective language, explicit limits, and human review.";
  }

  if (text.startsWith("Conheça o CerneOps Core")) {
    return `Explore CerneOps Core and see how ${agentName} can support your company in ${groupLower}. Start a trial, compare the available plans, and choose the best way to incorporate AI agents into your business routines responsibly, clearly, and with operational focus.`;
  }

  return hasPortugueseMarker(text)
    ? `This CerneOps agent supports ${groupLower} routines with organized, reviewable outputs based on information provided by the user. It is designed to reduce manual effort, improve consistency, and keep human review responsible for final decisions.`
    : text;
}

export function localizeAgentPage(agent: AgentPage, locale: Locale) {
  if (locale !== "en-US") return agent;
  const agentName = getLocalizedAgentName(agent.agentName, locale);
  const agentGroup = getLocalizedAgentGroup(agent.agentGroup, locale);
  const metaDescription = `Meet ${agentName} from CerneOps: an AI agent for ${agentGroup.toLowerCase()} routines, with structured output, operational organization, standardization, and human review.`;

  return {
    ...agent,
    title: `${agentName}: AI for business operations`,
    metaTitle: `${agentName}: AI for business operations`,
    metaDescription,
    agentName,
    agentGroup,
    keywords: [
      `${agentName} CerneOps`,
      `AI for ${agentGroup.toLowerCase()}`,
      "business process automation",
      "AI agents for operations",
    ],
    blocks: agent.blocks.map((block) => {
      if (block.type === "heading") {
        return {
          ...block,
          text: translateAgentHeading(block.text, agent),
        };
      }
      if (block.type === "list") {
        return {
          ...block,
          items: block.items.map((item) =>
            translateAgentParagraph(item, agent),
          ),
        };
      }
      return {
        ...block,
        text: translateAgentParagraph(block.text, agent),
      };
    }),
  } satisfies AgentPage;
}

export function getAgentPages(locale: Locale = "pt-BR") {
  return agentPages.map((agent) => localizeAgentPage(agent, locale));
}

export function getAgentPageBySlug(slug: string, locale: Locale = "pt-BR") {
  const agent = agentsBySlug.get(slug);
  return agent ? localizeAgentPage(agent, locale) : undefined;
}

export function getAgentSlugByName(agentName: string) {
  const normalized = normalizeAgentLookupKey(agentName);
  const exactMatch = slugsByAgentName.get(normalized);
  if (exactMatch) return exactMatch;

  const tokens = normalized.split(" ").filter((token) => token.length > 2);
  if (!tokens.length) return undefined;

  const matches = searchableAgentNames.filter((agent) => {
    const agentTokens = new Set(agent.key.split(" "));
    return tokens.every((token) => agentTokens.has(token));
  });

  return matches.length === 1 ? matches[0].slug : undefined;
}
