import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Bot,
  Check,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  FileText,
  Loader2,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getAgentPages, getAgentSlugByName } from "@/lib/agent-pages";
import { CORE_DEMO_SCENARIOS } from "@/lib/core-demo-scenarios.generated";
import { fetchLandingPlans } from "@/lib/plans";

type DemoAgent = {
  id: string;
  title: string;
  slug?: string;
  description: string;
  group: string;
  problem: string;
  operation: string;
  delivery: string;
  status: string;
};

type DemoField = {
  key: string;
  label: string;
  placeholder: string;
  rows: number;
  value: string;
};

type DemoTable = {
  title: string;
  columns: string[];
  rows: Array<Record<string, string>>;
};

type DemoMetric = {
  label: string;
  value: string;
  detail: string;
  tone?: "positive" | "warning" | "neutral";
};

type DemoResult = {
  title: string;
  reviewNotice: string;
  summary: string;
  metrics: DemoMetric[];
  inputReference: Array<{ label: string; value: string }>;
  premises: string[];
  uncertainties: string[];
  highlights: string[];
  tables: DemoTable[];
  sections: Array<{ title: string; items: string[] }>;
  nextSteps: string[];
  rawOutput?: string;
};

type GoldenSnapshot = { title: string; output: string };

const SPECIAL_GROUPS: Record<string, string> = {
  rh_departamento_pessoal: "Recursos Humanos e Departamento Pessoal",
  vendas_comercial: "Vendas e Comercial",
  financeiro_administrativo: "Financeiro e Administrativo",
  atendimento_relacionamento: "Atendimento e Relacionamento com Cliente",
  operacao_logistica: "Operação e Logística",
  gestao_produtividade_gestor: "Gestão e Produtividade do Gestor",
};

function normalizeGroupLabel(raw: string) {
  const key = raw.trim().toLowerCase();
  if (SPECIAL_GROUPS[key]) return SPECIAL_GROUPS[key];
  return (
    raw
      .replace(/_/g, " ")
      .split(" ")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ") || "Sem grupo"
  );
}

function normalizeAgentsFromPlans(plans: Array<Record<string, unknown>>) {
  const byKey = new Map<string, DemoAgent>();

  for (const plan of plans) {
    const planAgents = Array.isArray(plan.agents)
      ? (plan.agents as Array<Record<string, unknown>>)
      : [];

    for (const rawAgent of planAgents) {
      const title = String(rawAgent.name ?? "").trim();
      if (!title) continue;

      const groupName = String(rawAgent.group_name ?? "").trim();
      const group =
        groupName || normalizeGroupLabel(String(rawAgent.group ?? "Sem grupo"));
      const key = `${title.toLowerCase()}::${group.toLowerCase()}`;

      if (byKey.has(key)) continue;
      byKey.set(key, {
        id: key,
        title,
        slug: getAgentSlugByName(title),
        group,
        description:
          String(rawAgent.description ?? "").trim() ||
          "Agente especializado para organizar uma rotina operacional.",
        problem:
          String(rawAgent.problem ?? "").trim() ||
          "Reduz trabalho manual e dispersão de informações.",
        operation:
          String(rawAgent.operation ?? "").trim() ||
          "Recebe informações fornecidas pelo usuário em texto estruturado.",
        delivery:
          String(rawAgent.delivery ?? "").trim() ||
          "Entrega uma saída estruturada, revisável e acionável.",
        status: String(rawAgent.status ?? "ativo")
          .trim()
          .toLowerCase(),
      });
    }
  }

  return Array.from(byKey.values()).sort((a, b) =>
    a.title.localeCompare(b.title, "pt-BR"),
  );
}

function getLocalFallbackAgents() {
  return getAgentPages().map((page) => {
    const firstParagraph = page.blocks.find(
      (block) => block.type === "paragraph",
    );
    return {
      id: `${page.agentName.toLowerCase()}::${page.agentGroup.toLowerCase()}`,
      title: page.agentName,
      slug: page.slug,
      description:
        firstParagraph?.type === "paragraph"
          ? firstParagraph.text
          : page.metaDescription,
      group: page.agentGroup,
      problem: "Reduz trabalho manual e dispersão de informações.",
      operation:
        "Recebe informações fornecidas pelo usuário em texto estruturado.",
      delivery: "Entrega uma saída estruturada, revisável e acionável.",
      status: "ativo",
    } satisfies DemoAgent;
  });
}

function isKpiAgent(agent: DemoAgent) {
  return agent.title.toLowerCase().includes("kpi");
}

function normalizeDemoKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizeDemoBaseKey(value: string) {
  return normalizeDemoKey(value.replace(/\([^)]*\)/g, " "));
}

function getDemoScenario(agent: DemoAgent) {
  const key = normalizeDemoKey(agent.title);
  const exactScenario = CORE_DEMO_SCENARIOS.find(
    (scenario) => normalizeDemoKey(scenario.title) === key,
  );
  if (exactScenario) return exactScenario;

  const baseKey = normalizeDemoBaseKey(agent.title);
  return CORE_DEMO_SCENARIOS.find(
    (scenario) => normalizeDemoBaseKey(scenario.title) === baseKey,
  );
}

function getGoldenResult(
  agent: DemoAgent,
  snapshots: readonly GoldenSnapshot[],
) {
  const key = normalizeDemoKey(agent.title);
  const exact = snapshots.find(
    (snapshot) => normalizeDemoKey(snapshot.title) === key,
  );
  if (exact) return exact;
  const baseKey = normalizeDemoBaseKey(agent.title);
  return snapshots.find(
    (snapshot) => normalizeDemoBaseKey(snapshot.title) === baseKey,
  );
}

function createFields(agent: DemoAgent): DemoField[] {
  const scenario = getDemoScenario(agent);
  if (!scenario) return [];

  return scenario.fields.flatMap((field) => {
    const value = scenario.values[field.key];
    if (value === undefined || value === null || String(value).trim() === "") {
      return [];
    }
    const rows = Math.max(4, Math.min(14, Number(field.rows) || 8));
    return [
      {
        key: field.key,
        label: field.label || field.key,
        rows,
        placeholder: field.placeholder || "",
        value: String(value),
      },
    ];
  });
}

function createDemoResult(
  agent: DemoAgent,
  fields: DemoField[],
  golden?: GoldenSnapshot,
): DemoResult {
  const inputReference = fields.map(({ label, value }) => ({ label, value }));
  if (golden) {
    return {
      title: `${agent.title} — resultado do Core`,
      reviewNotice:
        "Snapshot gerado pelo Agente IA Especialista no Core CerneOps com as entradas oficiais do botão Exemplo. Revise antes de qualquer uso operacional.",
      summary: "",
      metrics: [],
      inputReference,
      premises: [],
      uncertainties: [],
      highlights: [],
      tables: [],
      sections: [],
      nextSteps: [],
      rawOutput: golden.output,
    };
  }
  if (isKpiAgent(agent)) {
    return {
      title: "Análise de KPIs",
      reviewNotice:
        "Análise gerencial revisável. KPIs podem refletir dados incompletos, recortes e correlações aparentes; não trate como causalidade definitiva.",
      summary:
        "Os dados indicam piora em NPS, tempo médio de espera, conversão e churn no período informado. A troca de ferramenta, o aumento de tickets e a ausência de analistas aparecem como hipóteses que precisam ser conferidas, não como causas definitivas.",
      metrics: [
        {
          label: "KPIs abaixo da meta",
          value: "4",
          detail: "NPS, espera, conversão e SLA",
          tone: "warning",
        },
        {
          label: "Maior desvio",
          value: "+5 min",
          detail: "Tempo médio de espera",
          tone: "warning",
        },
        {
          label: "SLA realizado",
          value: "82%",
          detail: "Meta informada: 90%",
          tone: "warning",
        },
        {
          label: "Confiança da leitura",
          value: "Média",
          detail: "Há dados pendentes do dia 12",
          tone: "neutral",
        },
      ],
      inputReference,
      premises: [
        "Período observado: abril, conforme os dados de exemplo.",
        "A comparação usa os valores informados pelo usuário e a meta de SLA de 90%.",
        "Parte dos dados de atendimento do dia 12 não foi consolidada.",
      ],
      uncertainties: [
        "A amostra não informa volume total, segmentação por canal ou distribuição por equipe.",
        "Correlação entre a troca de ferramenta e a queda dos indicadores ainda precisa de validação.",
      ],
      highlights: [
        "NPS caiu de 72 para 61 e o tempo médio de espera subiu de 3 para 8 minutos.",
        "Conversão caiu de 18% para 14% e churn mensal subiu de 2,1% para 3,4%.",
        "SLA realizado ficou em 82%, abaixo da meta informada de 90%.",
      ],
      tables: [
        {
          title: "KPIs avaliados",
          columns: ["KPI", "Valor", "Meta", "Desvio", "Leitura", "Confiança"],
          rows: [
            {
              KPI: "NPS",
              Valor: "61",
              Meta: "72",
              Desvio: "-11 pts",
              Leitura: "Abaixo",
              Confiança: "Média",
            },
            {
              KPI: "Tempo médio de espera",
              Valor: "8 min",
              Meta: "3 min",
              Desvio: "+5 min",
              Leitura: "Atenção",
              Confiança: "Média",
            },
            {
              KPI: "Conversão comercial",
              Valor: "14%",
              Meta: "18%",
              Desvio: "-4 p.p.",
              Leitura: "Abaixo",
              Confiança: "Média",
            },
            {
              KPI: "SLA",
              Valor: "82%",
              Meta: "90%",
              Desvio: "-8 p.p.",
              Leitura: "Abaixo",
              Confiança: "Baixa",
            },
          ],
        },
      ],
      sections: [
        {
          title: "Hipóteses e ações",
          items: [
            "Verificar se a troca de ferramenta alterou o registro do tempo de espera e do SLA.",
            "Comparar os indicadores por canal, equipe e semana antes de atribuir causa.",
            "Reprocessar os dados do dia 12 e registrar a lacuna na próxima leitura.",
          ],
        },
      ],
      nextSteps: [
        "Validar os dados com responsáveis por atendimento e comercial.",
        "Recalcular os KPIs após consolidar os dados faltantes.",
        "Revisar as hipóteses com o contexto operacional completo.",
      ],
    };
  }

  return createCoreFaithfulResult(
    agent,
    fields,
    inputReference,
    getDemoScenario(agent)?.agentCode ?? "",
  );
}

type ResultFocus = {
  finding: string;
  action: string;
  risk: string;
  metricLabel: string;
  metricValue: string;
  metricDetail: string;
};

const RESULT_FOCUS_BY_AGENT: Record<string, ResultFocus> = {
  "adaptador de receitas inteligente": {
    finding:
      "A escala para 48 fatias exige multiplicador de 4x e redução controlada de açúcar.",
    action: "Validar um lote-piloto antes de padronizar a ficha de produção.",
    risk: "Ajustes de umidade e forno devem ser testados na assadeira informada.",
    metricLabel: "Escala proposta",
    metricValue: "4x",
    metricDetail: "12 para 48 fatias",
  },
  "analisador de acidentes": {
    finding:
      "O relato aponta borda metálica sem acabamento e indisponibilidade de luva anticorte como fatores relevantes.",
    action:
      "Manter a peça isolada, registrar evidência e validar ações com SESMT/CIPA.",
    risk: "O relato inicial não permite atribuir causa definitiva ou responsabilidade.",
    metricLabel: "Fatores críticos",
    metricValue: "2",
    metricDetail: "Borda exposta e EPI indisponível",
  },
  "analisador de ciclo de vendas": {
    finding:
      "A maior permanência está em negociação (18 dias), com perda recorrente por timing, preço percebido e ausência de decisor.",
    action:
      "Criar cadência de avanço para negociações paradas e qualificar decisor antes da proposta.",
    risk: "Origem de lead incompleta reduz a confiança na leitura por canal.",
    metricLabel: "Conversão final",
    metricValue: "5,0%",
    metricDetail: "9 ganhos em 180 leads",
  },
  "analisador de clima organizacional": {
    finding:
      "Carreira (2,9) e comunicação (3,1) concentram a pior percepção entre 118 respostas anonimizadas.",
    action:
      "Priorizar comunicação de critérios de carreira e escutas por time com proteção de anonimato.",
    risk: "Não interpretar grupos pequenos nem comentários isolados como diagnóstico individual.",
    metricLabel: "Menor indicador",
    metricValue: "2,9/5",
    metricDetail: "Carreira",
  },
  "analisador de contratos extrator de clausulas criticas": {
    finding:
      "A renovação automática, multa de duas mensalidades e lacunas de LGPD/SLA merecem revisão prioritária.",
    action:
      "Submeter cláusulas de dados, penalidade de SLA e rescisão à revisão jurídica antes da assinatura.",
    risk: "Este resultado não substitui parecer jurídico nem validação contratual.",
    metricLabel: "Cláusulas críticas",
    metricValue: "4",
    metricDetail: "Rescisão, renovação, LGPD e SLA",
  },
  "analisador de curva abc de estoque": {
    finding:
      "O valor movimentado se concentra em itens de maior custo; a classificação orienta reposição e revisão de giro.",
    action:
      "Proteger os itens A de ruptura e revisar política de compra dos itens C.",
    risk: "A apuração depende de custo e quantidade corretos para cada item.",
    metricLabel: "Itens analisados",
    metricValue: "6",
    metricDetail: "Base de exemplo",
  },
  "analisador de desvio de cronograma": {
    finding:
      "O comparativo separa avanço real, dependências e impactos antes de definir uma recuperação.",
    action:
      "Validar frente crítica, responsável e replanejamento com a equipe de obra.",
    risk: "Não usar como pleito, aditivo ou conclusão contratual definitiva.",
    metricLabel: "Leitura",
    metricValue: "Prioritária",
    metricDetail: "Desvios e dependências",
  },
  "analisador de fluxo de caixa": {
    finding:
      "A projeção organiza saldo, entradas, saídas e provisões para identificar janelas de maior pressão de caixa.",
    action:
      "Confirmar vencimentos e priorizar ações antes do período de menor cobertura.",
    risk: "Projeções não representam saldo bancário nem decisão financeira definitiva.",
    metricLabel: "Horizonte",
    metricValue: "Projetado",
    metricDetail: "Conforme período de exemplo",
  },
  "analisador de glosas": {
    finding:
      "A análise organiza motivos de glosa, evidências disponíveis e pendências de recurso.",
    action:
      "Priorizar itens com prazo próximo e anexar evidências antes da revisão do faturamento.",
    risk: "Não há garantia de reversão ou pagamento.",
    metricLabel: "Prioridade",
    metricValue: "Revisar",
    metricDetail: "Motivos e evidências",
  },
  "analisador de incentivos fiscais": {
    finding:
      "Foram separadas oportunidades potenciais dos requisitos que dependem de validação tributária atualizada.",
    action:
      "Conferir CNAE, NCM, regime e vigência da regra com contador responsável.",
    risk: "A demonstração não emite parecer nem estima economia garantida.",
    metricLabel: "Status",
    metricValue: "Potencial",
    metricDetail: "Sujeito a validação fiscal",
  },
  "analisador de objecoes de vendas": {
    finding:
      "As objeções devem ser tratadas por categoria, evidência permitida e resposta consultiva.",
    action:
      "Treinar o time com respostas para preço, timing e valor percebido sem promessas indevidas.",
    risk: "Scripts precisam respeitar política comercial e contexto do cliente.",
    metricLabel: "Saída",
    metricValue: "Scripts",
    metricDetail: "Por objeção priorizada",
  },
  "analisador de precos de concorrentes": {
    finding:
      "A comparação separa preço, posicionamento e escopo para evitar equivalência indevida entre ofertas.",
    action:
      "Revisar faixa competitiva junto da margem mínima antes de alterar preço.",
    risk: "Fontes, tamanhos e promoções precisam ser comparáveis.",
    metricLabel: "Decisão",
    metricValue: "Faixa",
    metricDetail: "Preço e posicionamento",
  },
  "analisador de relatorios de inspecao": {
    finding:
      "O relato foi organizado em não conformidades, evidências e severidade para revisão técnica.",
    action:
      "Tratar primeiro os achados de maior severidade e registrar evidência de correção.",
    risk: "Não substitui vistoria, laudo ou inspeção oficial.",
    metricLabel: "Saída",
    metricValue: "Achados",
    metricDetail: "Com severidade e ação",
  },
  "analisador de sazonalidade": {
    finding:
      "A leitura diferencia padrão recorrente, eventos pontuais e lacunas da série informada.",
    action:
      "Planejar estoque e equipe com base no padrão confirmado e monitorar desvios.",
    risk: "Sazonalidade não garante demanda futura.",
    metricLabel: "Leitura",
    metricValue: "Tendência",
    metricDetail: "Com premissas explícitas",
  },
  "analisador de sentimento de avaliacoes reviews": {
    finding:
      "As cinco avaliações de exemplo indicam elogios à entrega e à interface, com alertas em suporte e preço.",
    action:
      "Responder rapidamente aos relatos de suporte e investigar percepção de preço versus qualidade.",
    risk: "A amostra é pequena e não representa toda a base de clientes.",
    metricLabel: "Avaliações",
    metricValue: "5",
    metricDetail: "Cenário oficial do Core",
  },
  "analisador de tempo de resposta": {
    finding:
      "A análise evidencia tempo de primeira resposta, resolução, backlog e risco de SLA por recorte informado.",
    action:
      "Atacar filas com maior espera e revisar distribuição por canal e horário.",
    risk: "Fuso, horário útil e tickets incompletos alteram os indicadores.",
    metricLabel: "Foco",
    metricValue: "SLA",
    metricDetail: "Resposta, resolução e backlog",
  },
  "analisador de turnover": {
    finding:
      "Os desligamentos agregados são organizados por período e hipótese de retenção, sem leitura individual.",
    action:
      "Validar causas com RH e lideranças antes de priorizar ações de retenção.",
    risk: "Amostras pequenas podem expor pessoas ou produzir conclusões frágeis.",
    metricLabel: "Análise",
    metricValue: "Agregada",
    metricDetail: "Privacidade preservada",
  },
  "analista de enquadramento tributario simples": {
    finding:
      "Os cenários tributários são comparados com premissas declaradas e pontos obrigatórios de conferência.",
    action:
      "Revisar projeções com contador antes de alterar regime ou recolhimento.",
    risk: "Não substitui parecer tributário nem decisão fiscal.",
    metricLabel: "Cenários",
    metricValue: "Comparados",
    metricDetail: "Com premissas",
  },
  "auditor de boas praticas de fabricacao bpf": {
    finding:
      "Os relatos foram convertidos em achados de higiene, armazenamento, manipulação e documentação.",
    action:
      "Corrigir itens de maior risco e manter evidência de verificação no processo.",
    risk: "Não emite certificação ou conformidade sanitária definitiva.",
    metricLabel: "Saída",
    metricValue: "Achados",
    metricDetail: "Risco e ação recomendada",
  },
  "auditor de conformidade": {
    finding:
      "O conteúdo foi confrontado com os critérios informados, destacando lacunas e evidências a confirmar.",
    action:
      "Designar responsável, evidência esperada e prazo para cada lacuna priorizada.",
    risk: "Não equivale a certificação, laudo ou parecer legal.",
    metricLabel: "Leitura",
    metricValue: "Conformidade",
    metricDetail: "Critérios e evidências",
  },
  "auditor de conformidade de imagens controle de qualidade": {
    finding:
      "A demonstração organiza os itens de padrão visual e os pontos que exigem evidência fotográfica.",
    action:
      "Validar cada desvio com a imagem original e responsável local antes de registrar não conformidade.",
    risk: "O cenário público não processa imagens reais.",
    metricLabel: "Saída",
    metricValue: "Checklist",
    metricDetail: "Padrões e evidências",
  },
  "auditor de duplicidade de pagamentos": {
    finding:
      "As suspeitas são classificadas por evidência, tolerância e possibilidade de falso positivo.",
    action:
      "Conferir documento, fornecedor e autorização antes de qualquer contato ou estorno.",
    risk: "Similaridade de valor ou data não prova duplicidade.",
    metricLabel: "Status",
    metricValue: "Suspeitas",
    metricDetail: "Exigem conferência",
  },
  "calculador de margem de lucro": {
    finding:
      "A margem é separada por preço, custo, rateio e premissas de cálculo.",
    action:
      "Revisar itens abaixo da margem mínima e validar critério de rateio.",
    risk: "Preço ou custo ausente altera o resultado e não define preço obrigatório.",
    metricLabel: "Saída",
    metricValue: "Margens",
    metricDetail: "Com fórmulas e alertas",
  },
  "calculador de perdas e sobras": {
    finding:
      "A relação entre produção, vendas, sobras e perdas evidencia pontos de desperdício a investigar.",
    action:
      "Atuar primeiro no item com maior impacto de custo e registrar causa da perda.",
    risk: "Custos e medições de produção precisam estar atualizados.",
    metricLabel: "Foco",
    metricValue: "Desperdício",
    metricDetail: "Perdas e sobras",
  },
  "classificador e roteador de e mails tickets": {
    finding:
      "Os tickets são organizados por categoria, prioridade e área responsável para reduzir a fila manual.",
    action:
      "Aplicar a rota sugerida e revisar casos urgentes antes do encaminhamento.",
    risk: "Prioridade depende do contexto completo e das regras de SLA.",
    metricLabel: "Saída",
    metricValue: "Roteamento",
    metricDetail: "Categoria e prioridade",
  },
  "comparador de orcamentos de fornecedores": {
    finding:
      "A comparação padroniza item, preço, frete, prazo e condição para apoiar a decisão de compra.",
    action:
      "Conferir equivalência técnica antes de selecionar apenas pelo menor preço.",
    risk: "Itens incomparáveis e tributos podem distorcer o total.",
    metricLabel: "Saída",
    metricValue: "Comparativo",
    metricDetail: "Preço, prazo e frete",
  },
  "conciliador de extrato bancario simples": {
    finding:
      "Os lançamentos são separados em conciliados, ausentes e divergentes para conferência financeira.",
    action:
      "Investigar primeiro divergências de valor e itens sem contrapartida.",
    risk: "A conciliação depende de datas, identificadores e valores completos.",
    metricLabel: "Saída",
    metricValue: "Divergências",
    metricDetail: "Banco versus controle",
  },
  "conferente de documentacao de admissao": {
    finding:
      "O checklist indica documentos presentes, pendências e legibilidade para a admissão.",
    action:
      "Solicitar somente a pendência necessária e registrar nova conferência.",
    risk: "Regras e documentos obrigatórios devem ser validados pelo RH.",
    metricLabel: "Saída",
    metricValue: "Checklist",
    metricDetail: "Presença e pendências",
  },
  "estruturador de prontuarios e evolucao clinica": {
    finding:
      "As anotações são organizadas em estrutura clínica revisável, preservando o texto informado.",
    action:
      "Submeter a evolução ao profissional habilitado antes de registrar no prontuário.",
    risk: "Não diagnostica, prescreve ou substitui atendimento profissional.",
    metricLabel: "Estrutura",
    metricValue: "SOAP",
    metricDetail: "Para revisão humana",
  },
  "extrator de prazos e intimacoes": {
    finding:
      "A triagem destaca partes, eventos, prazos sugeridos e pontos de atenção do texto informado.",
    action:
      "Conferir prazo legal e responsável com advogado antes de qualquer protocolo.",
    risk: "Não substitui leitura jurídica nem controle oficial de prazo.",
    metricLabel: "Saída",
    metricValue: "Triagem",
    metricDetail: "Prazos e alertas",
  },
  "extrator de precedentes": {
    finding:
      "Os trechos são organizados em tese, fundamento, aderência e limitação ao caso em análise.",
    action:
      "Validar fonte, vigência e aplicabilidade com advogado responsável.",
    risk: "Não realiza pesquisa oficial nem define estratégia jurídica.",
    metricLabel: "Saída",
    metricValue: "Precedentes",
    metricDetail: "Tese e aderência",
  },
  "extrator de quantitativos de projetos": {
    finding:
      "Os quantitativos são agrupados com unidade, fonte e premissas para conferência técnica.",
    action:
      "Conferir medições e origem de cada quantitativo antes de orçamento ou execução.",
    risk: "Não substitui leitura CAD/BIM, medição ou responsabilidade técnica.",
    metricLabel: "Saída",
    metricValue: "Quantitativos",
    metricDetail: "Com fonte e unidade",
  },
  "extrator e tabulador de notas fiscais recibos": {
    finding:
      "Os documentos são organizados em campos financeiros e fiscais para conferência e exportação.",
    action:
      "Validar CNPJ, data, valor e categoria antes da importação financeira.",
    risk: "Campos ilegíveis ou ausentes exigem conferência do documento original.",
    metricLabel: "Saída",
    metricValue: "Tabela",
    metricDetail: "Campos extraídos",
  },
  "gerador de argumentario de vendas": {
    finding:
      "As objeções, evidências permitidas e limites comerciais foram convertidos em argumentos consultivos revisáveis.",
    action:
      "Aprovar os argumentos com a liderança comercial antes de uso pelo time.",
    risk: "Não prometer desconto, resultado ou condição fora da política.",
    metricLabel: "Saída",
    metricValue: "Argumentário",
    metricDetail: "Por objeção",
  },
  "gerador de cardapios para eventos": {
    finding:
      "O cardápio equilibra público, restrições, orçamento e capacidade operacional do evento informado.",
    action:
      "Confirmar porções, equipamentos e restrições alimentares antes da compra.",
    risk: "Custos e disponibilidade dos fornecedores podem alterar a composição.",
    metricLabel: "Saída",
    metricValue: "Cardápio",
    metricDetail: "Itens e porções estimadas",
  },
  "gerador de checklist de estoque": {
    finding:
      "Os critérios de inspeção foram organizados em checklist com evidência esperada e ação corretiva.",
    action:
      "Executar a rotina no local e registrar somente evidências observadas.",
    risk: "Não substitui inventário físico ou auditoria oficial.",
    metricLabel: "Saída",
    metricValue: "Checklist",
    metricDetail: "Itens e evidências",
  },
  "gerador de cronograma de obra": {
    finding:
      "As etapas, dependências, restrições e durações formam um cronograma preliminar de acompanhamento.",
    action:
      "Confirmar caminho crítico e recursos com o responsável técnico da obra.",
    risk: "Não define prazo, custo ou compromisso contratual definitivo.",
    metricLabel: "Saída",
    metricValue: "Cronograma",
    metricDetail: "Etapas e dependências",
  },
  "gerador de diario de obra": {
    finding:
      "As ocorrências do dia foram estruturadas em atividades, equipe, condições e pendências.",
    action:
      "Conferir informações com o responsável antes de formalizar o registro.",
    risk: "Não substitui diário oficial, assinatura técnica ou prova contratual.",
    metricLabel: "Saída",
    metricValue: "RDO",
    metricDetail: "Rascunho revisável",
  },
  "gerador de escalas de trabalho": {
    finding:
      "A escala organiza cobertura, turnos e restrições informadas para revisão do gestor.",
    action:
      "Validar disponibilidade, jornada e regras locais antes de comunicar a equipe.",
    risk: "Não substitui conferência trabalhista nem acordo coletivo aplicável.",
    metricLabel: "Saída",
    metricValue: "Escala",
    metricDetail: "Cobertura e restrições",
  },
  "gerador de fichas tecnicas de produtos": {
    finding:
      "Ingredientes, rendimento, preparo, custo e pontos de controle foram reunidos em uma ficha revisável.",
    action: "Testar rendimento e custo real antes de padronizar a produção.",
    risk: "Dados de insumo, perda e embalagem precisam ser confirmados.",
    metricLabel: "Saída",
    metricValue: "Ficha técnica",
    metricDetail: "Custo e preparo",
  },
  "gerador de guia de recolhimento": {
    finding:
      "Os dados de período, código, valor e vencimento foram organizados como rascunho de conferência.",
    action:
      "Conferir dados com o contador antes de preencher ou emitir qualquer guia.",
    risk: "Não emite DARF, GPS, DAS ou guia oficial.",
    metricLabel: "Saída",
    metricValue: "Rascunho",
    metricDetail: "Dados para conferência",
  },
  "gerador de matriz de risco simplificada": {
    finding:
      "Perigos, controles e critérios informados foram organizados por severidade, probabilidade e prioridade.",
    action:
      "Validar classificação e controles com responsável técnico habilitado.",
    risk: "Não substitui PGR, laudo ou avaliação ocupacional oficial.",
    metricLabel: "Saída",
    metricValue: "Matriz",
    metricDetail: "Risco e controle",
  },
  "gerador de parecer juridico": {
    finding:
      "Fatos, pergunta, premissas e documentos foram organizados em minuta de análise jurídica revisável.",
    action:
      "Submeter fundamentos e conclusão preliminar à revisão de advogado responsável.",
    risk: "Não constitui parecer jurídico final nem orientação definitiva.",
    metricLabel: "Saída",
    metricValue: "Minuta",
    metricDetail: "Para revisão profissional",
  },
  "gerador de pdi": {
    finding:
      "Objetivos, competências, feedbacks e ações de desenvolvimento foram organizados em plano revisável.",
    action: "Acordar metas e acompanhamento entre colaborador, gestor e RH.",
    risk: "Não deve decidir promoção, punição, salário ou avaliação definitiva.",
    metricLabel: "Saída",
    metricValue: "PDI",
    metricDetail: "Metas e acompanhamento",
  },
  "gerador de plano de acao": {
    finding:
      "O objetivo foi desdobrado em ações, responsáveis, prazo, dependências e critérios de acompanhamento.",
    action: "Validar responsáveis e capacidade antes de iniciar o plano.",
    risk: "Custos e prazo são estimativos e dependem de confirmação operacional.",
    metricLabel: "Saída",
    metricValue: "5W2H",
    metricDetail: "Ações e responsáveis",
  },
  "gerador de plano de seguranca": {
    finding:
      "Riscos, controles e objetivos foram convertidos em plano operacional de ações e evidências.",
    action:
      "Revisar o plano com SESMT ou responsável técnico antes da aplicação.",
    risk: "Não substitui PGR, PCMSO, LTCAT, ART ou documento regulatório.",
    metricLabel: "Saída",
    metricValue: "Plano",
    metricDetail: "5W2H/PDCA preliminar",
  },
  "gerador de propostas comerciais personalizadas": {
    finding:
      "Os dados do cliente e da oferta foram organizados em proposta comercial com narrativa e itens revisáveis.",
    action:
      "Conferir escopo, preço, vigência e aprovação comercial antes de enviar.",
    risk: "Condições comerciais devem respeitar política e aprovação vigente.",
    metricLabel: "Saída",
    metricValue: "Proposta",
    metricDetail: "Pronta para revisão",
  },
  "gerador de receita medica": {
    finding:
      "O texto fornecido foi estruturado como rascunho documental para conferência profissional.",
    action:
      "Revisar integralmente com profissional habilitado antes de assinar ou entregar.",
    risk: "Não escolhe medicamento, ajusta dose nem prescreve autonomamente.",
    metricLabel: "Saída",
    metricValue: "Rascunho",
    metricDetail: "Documento revisável",
  },
  "gerador de relatorio executivo": {
    finding:
      "Os dados foram consolidados em resumo, indicadores, alertas e recomendações para leitura da liderança.",
    action:
      "Confirmar números e responsáveis pelos próximos passos antes da reunião.",
    risk: "Indicadores incompletos ou de recortes distintos podem alterar a interpretação.",
    metricLabel: "Saída",
    metricValue: "Executivo",
    metricDetail: "Resumo e decisões",
  },
  "gerador de respostas para duvidas frequentes faq": {
    finding:
      "A pergunta foi respondida com base no conteúdo e nas regras informadas no cenário.",
    action:
      "Aprovar a redação e manter a fonte da política vinculada à resposta.",
    risk: "Não extrapolar condições que não estejam documentadas na base.",
    metricLabel: "Saída",
    metricValue: "Resposta",
    metricDetail: "Clara e revisável",
  },
  "gerador de resumo de obrigacoes acessorias": {
    finding:
      "A obrigação foi organizada em campos, valores, status de conferência e pendências.",
    action:
      "Validar dados fiscais e prazo com a contabilidade antes da transmissão.",
    risk: "Não assina, transmite ou substitui obrigação oficial.",
    metricLabel: "Saída",
    metricValue: "Resumo",
    metricDetail: "Campos e alertas",
  },
  "gerador de rotulos nutricionais": {
    finding:
      "Ingredientes, porção, alergênicos e informações fornecidas foram estruturados para revisão técnica.",
    action:
      "Conferir composição e valores com nutricionista ou responsável técnico.",
    risk: "Não substitui validação regulatória ou rotulagem oficial.",
    metricLabel: "Saída",
    metricValue: "Rótulo",
    metricDetail: "Rascunho revisável",
  },
  "gerador de script de atendimento": {
    finding:
      "O fluxo de atendimento foi transformado em etapas, falas sugeridas e critérios de escalonamento.",
    action:
      "Treinar a equipe e ajustar o script aos limites de autoridade do canal.",
    risk: "Evitar coleta excessiva de dados e promessas fora de alçada.",
    metricLabel: "Saída",
    metricValue: "Script",
    metricDetail: "Etapas e escalonamento",
  },
  "gerenciador de validade e estoque perecivel": {
    finding:
      "Lotes, validade, consumo previsto e prioridades foram ordenados para reduzir risco de perda.",
    action:
      "Separar itens de vencimento próximo e planejar uso ou ação de redução de perda.",
    risk: "Quantidades e datas precisam ser conferidas fisicamente.",
    metricLabel: "Saída",
    metricValue: "FEFO",
    metricDetail: "Prioridade por validade",
  },
  "limpador e padronizador de banco de dados": {
    finding:
      "O cenário demonstra padronização, detecção de duplicidade e identificação de campos que exigem conferência.",
    action:
      "Validar a amostra e manter backup antes de substituir qualquer base real.",
    risk: "Regras de normalização devem ser confirmadas para cada campo sensível.",
    metricLabel: "Saída",
    metricValue: "Base limpa",
    metricDetail: "Padronização e duplicidade",
  },
  "otimizador de compras de ingredientes": {
    finding:
      "Estoque, validade, consumo e restrições foram organizados em prioridades de compra e uso.",
    action:
      "Comprar somente após conferir cobertura, pedidos e disponibilidade do fornecedor.",
    risk: "Consumo real, substituições e perdas podem alterar a recomendação.",
    metricLabel: "Saída",
    metricValue: "Prioridades",
    metricDetail: "Compra e validade",
  },
  "otimizador de rotas de entrega visitas": {
    finding:
      "Os pontos de entrega foram sequenciados para reduzir deslocamento e tornar a rota executável.",
    action:
      "Confirmar endereços, janela de atendimento e restrições antes da saída.",
    risk: "O cenário não consulta trânsito, mapa ou condições externas em tempo real.",
    metricLabel: "Saída",
    metricValue: "Rota",
    metricDetail: "Sequência sugerida",
  },
  "planejador de conteudo para redes sociais": {
    finding:
      "Produtos, objetivos e canais foram convertidos em calendário com pauta, formato e direção de conteúdo.",
    action:
      "Validar promoções, tom de voz e disponibilidade de mídia antes de publicar.",
    risk: "Resultados de alcance e conversão não são garantidos.",
    metricLabel: "Saída",
    metricValue: "Calendário",
    metricDetail: "Pautas e formatos",
  },
  "planejador de producao diaria": {
    finding:
      "Pedidos, estoque, equipe e capacidade foram organizados em sequência diária de produção.",
    action:
      "Confirmar insumos críticos e tempo de equipamento antes de iniciar o turno.",
    risk: "Alterações de pedido ou capacidade exigem replanejamento.",
    metricLabel: "Saída",
    metricValue: "Sequência",
    metricDetail: "Produção diária",
  },
  "previsao de demanda": {
    finding:
      "Histórico, estoque, lead time e horizonte foram convertidos em projeção com cobertura e premissas.",
    action:
      "Revisar a previsão no ciclo seguinte e ajustar compra conforme consumo real.",
    risk: "Não garante demanda, ruptura ou compra ideal.",
    metricLabel: "Saída",
    metricValue: "Projeção",
    metricDetail: "Cobertura e risco",
  },
  "qualificador de leads lead scoring": {
    finding:
      "Os leads são priorizados por aderência ao perfil, intenção e sinais disponíveis no cenário.",
    action:
      "Começar pelos leads quentes e registrar retorno para recalibrar o critério.",
    risk: "A pontuação não substitui a avaliação comercial do contexto.",
    metricLabel: "Saída",
    metricValue: "Score",
    metricDetail: "Quente, morno e frio",
  },
  "selecionador e ranqueador de curriculos": {
    finding:
      "Os currículos são comparados com os requisitos informados, separando aderência, gaps e pontos de entrevista.",
    action:
      "Usar o ranking como apoio e revisar critérios com RH antes de convidar candidatos.",
    risk: "Não automatiza decisão de contratação nem substitui avaliação humana.",
    metricLabel: "Saída",
    metricValue: "Ranking",
    metricDetail: "Aderência e gaps",
  },
  "sintetizador de jurisprudencia": {
    finding:
      "As decisões fornecidas foram organizadas em teses, fundamentos, convergências e riscos argumentativos.",
    action:
      "Validar fonte e aplicabilidade com advogado antes de usar em peça ou estratégia.",
    risk: "Não realiza busca oficial externa nem define conclusão jurídica final.",
    metricLabel: "Saída",
    metricValue: "Síntese",
    metricDetail: "Teses e fundamentos",
  },
  "sintetizador de reunioes e gerador de atas": {
    finding:
      "A transcrição foi convertida em resumo, decisões, responsáveis e prazos de acompanhamento.",
    action:
      "Confirmar responsáveis e datas com os participantes antes de distribuir a ata.",
    risk: "Pontos não registrados na transcrição não podem ser inferidos como decisão.",
    metricLabel: "Saída",
    metricValue: "Ata",
    metricDetail: "Decisões e plano de ação",
  },
  "tradutor de manuais tecnicos e pops": {
    finding:
      "O conteúdo técnico é reorganizado em linguagem operacional e passos de POP para revisão.",
    action:
      "Validar termos críticos e requisitos de segurança com especialista antes de uso.",
    risk: "Não substitui manual homologado nem procedimento de segurança oficial.",
    metricLabel: "Saída",
    metricValue: "POP",
    metricDetail: "Passos operacionais",
  },
  "triador de guias de convenio": {
    finding:
      "Os dados da guia foram avaliados quanto a lacunas, inconsistências e risco administrativo.",
    action:
      "Corrigir pendências antes do envio e registrar evidência de conferência.",
    risk: "Não garante cobertura, autorização ou aprovação do convênio.",
    metricLabel: "Saída",
    metricValue: "Checklist",
    metricDetail: "Riscos e pendências",
  },
  "validador de nfe": {
    finding:
      "NFe e pedido são confrontados em quantidade, preço, frete e impostos conforme tolerância informada.",
    action:
      "Conferir divergências antes do recebimento, entrada em estoque ou pagamento.",
    risk: "Não toma decisão automática de pagamento, devolução ou estoque.",
    metricLabel: "Saída",
    metricValue: "Divergências",
    metricDetail: "NFe versus pedido",
  },
};

function summarizeInput(value: string, limit = 150) {
  const compact = value.replace(/\s+/g, " ").trim();
  return compact.length > limit
    ? `${compact.slice(0, limit - 1).trimEnd()}…`
    : compact;
}

function createSentimentResult(
  inputReference: Array<{ label: string; value: string }>,
): DemoResult {
  return {
    title: "Análise de Sentimento de Avaliações",
    reviewNotice:
      "Leitura demonstrativa estruturada no mesmo contrato de saída do Core: resumo geral, tópicos, sugestões de ação e classificação por avaliação.",
    summary:
      "O cenário de exemplo reúne cinco avaliações. Duas são positivas, uma é neutra e duas são negativas: a experiência de entrega e a interface são pontos fortes; suporte sem retorno e percepção de preço concentram a oportunidade de melhoria.",
    metrics: [
      {
        label: "Total de avaliações",
        value: "5",
        detail: "Cenário Exemplo do Core",
        tone: "neutral",
      },
      {
        label: "Positivas",
        value: "40%",
        detail: "Entrega e interface",
        tone: "positive",
      },
      {
        label: "Neutras",
        value: "20%",
        detail: "Atendimento educado",
        tone: "neutral",
      },
      {
        label: "Negativas",
        value: "40%",
        detail: "Suporte e preço",
        tone: "warning",
      },
    ],
    inputReference,
    premises: [
      "Foram analisadas as cinco avaliações carregadas pelo Exemplo do Core.",
      "Os critérios considerados foram atendimento, entrega, qualidade e preço.",
    ],
    uncertainties: [
      "A amostra é demonstrativa e não representa a distribuição de toda a base de clientes.",
      "O sentimento classifica o texto informado; ele não comprova causa raiz operacional.",
    ],
    highlights: [
      "Entrega rápida e interface intuitiva são os atributos positivos mais claros do lote.",
      "Dois dias sem retorno no suporte é o ponto mais crítico para investigação imediata.",
      "Preço acima do esperado deve ser avaliado junto de valor percebido e qualidade entregue.",
    ],
    tables: [
      {
        title: "Classificação das avaliações",
        columns: ["ID", "Trecho", "Sentimento", "Confiança", "Tópicos"],
        rows: [
          {
            ID: "1",
            Trecho: "Entrega super rápida e produto excelente.",
            Sentimento: "Positivo",
            Confiança: "0,97",
            Tópicos: "tempo de entrega, qualidade",
          },
          {
            ID: "2",
            Trecho: "Atendimento educado, mas problema não resolvido.",
            Sentimento: "Neutro",
            Confiança: "0,84",
            Tópicos: "atendimento, resolução",
          },
          {
            ID: "3",
            Trecho: "Preço acima do esperado para a qualidade entregue.",
            Sentimento: "Negativo",
            Confiança: "0,93",
            Tópicos: "preço, qualidade",
          },
          {
            ID: "4",
            Trecho: "Interface intuitiva e fácil de usar.",
            Sentimento: "Positivo",
            Confiança: "0,96",
            Tópicos: "produto, usabilidade",
          },
          {
            ID: "5",
            Trecho: "Suporte demorou e fiquei dois dias sem retorno.",
            Sentimento: "Negativo",
            Confiança: "0,98",
            Tópicos: "atendimento, tempo de resposta",
          },
        ],
      },
      {
        title: "Tópicos mais mencionados",
        columns: ["Tópico", "Sentimento predominante", "Menções", "Leitura"],
        rows: [
          {
            Tópico: "Atendimento",
            "Sentimento predominante": "Negativo",
            Menções: "2",
            Leitura: "Priorizar tempo de resposta e solução",
          },
          {
            Tópico: "Qualidade",
            "Sentimento predominante": "Misto",
            Menções: "2",
            Leitura: "Bom produto, mas valor percebido em risco",
          },
          {
            Tópico: "Tempo de entrega",
            "Sentimento predominante": "Positivo",
            Menções: "1",
            Leitura: "Manter padrão atual",
          },
        ],
      },
    ],
    sections: [
      {
        title: "Ações sugeridas",
        items: [
          "Retornar e resolver os casos de suporte com mais de um dia sem atualização.",
          "Criar resposta de recuperação para avaliações negativas, sem prometer solução fora da política.",
          "Investigar se a crítica de preço se concentra em um produto, canal ou expectativa de entrega específica.",
        ],
      },
    ],
    nextSteps: [
      "Validar o lote completo de avaliações no Core.",
      "Acompanhar semanalmente o tema de suporte e a proporção de avaliações negativas.",
    ],
  };
}

function getFallbackFocus(title: string): ResultFocus {
  const normalized = normalizeDemoKey(title);
  if (
    /proposta|faq|script|parecer|receita medica|rotulos|fichas tecnicas|diario|atas|relatorio|tradutor/.test(
      normalized,
    )
  ) {
    return {
      finding:
        "O caso de exemplo foi convertido em um rascunho estruturado, com conteúdo pronto para revisão e adaptação pelo responsável.",
      action:
        "Revisar linguagem, dados obrigatórios e aprovação antes de compartilhar ou formalizar o documento.",
      risk: "O material é de apoio e não substitui validação técnica, profissional ou regulatória quando aplicável.",
      metricLabel: "Entrega",
      metricValue: "Rascunho",
      metricDetail: "Estruturado para revisão",
    };
  }
  if (
    /plano|cronograma|escala|rota|cardapio|compras|producao|checklist|pdi/.test(
      normalized,
    )
  ) {
    return {
      finding:
        "As prioridades, dependências e restrições do cenário foram organizadas em uma sequência operacional revisável.",
      action:
        "Confirmar responsáveis, capacidade e prazo antes de iniciar a execução do plano.",
      risk: "Restrições não informadas podem alterar a sequência e as prioridades propostas.",
      metricLabel: "Entrega",
      metricValue: "Plano",
      metricDetail: "Ações e responsáveis",
    };
  }
  if (/leads|curriculos|guias|validor|limpador/.test(normalized)) {
    return {
      finding:
        "Os registros foram estruturados para facilitar classificação, conferência e priorização da próxima ação.",
      action:
        "Revisar os itens de maior prioridade antes de aprovar, encaminhar ou atualizar a base.",
      risk: "Registros incompletos ou ambíguos devem ser conferidos na fonte original.",
      metricLabel: "Entrega",
      metricValue: "Triagem",
      metricDetail: "Prioridades e pendências",
    };
  }
  return {
    finding:
      "O cenário oficial foi transformado em uma leitura estruturada com achados, evidências e ações revisáveis.",
    action:
      "Validar os pontos priorizados com o responsável pela rotina antes de qualquer decisão operacional.",
    risk: "Dados adicionais ou regras internas podem alterar a conclusão da análise.",
    metricLabel: "Entrega",
    metricValue: "Análise",
    metricDetail: "Achados e próximos passos",
  };
}

function createCoreFaithfulResult(
  agent: DemoAgent,
  fields: DemoField[],
  inputReference: Array<{ label: string; value: string }>,
  agentCode: string,
): DemoResult {
  const titleKey = normalizeDemoKey(agent.title);
  if (
    agentCode === "REVIEWS_SENTIMENT_AGENT_CODE" ||
    titleKey.includes("sentimento de avaliacoes")
  ) {
    return createSentimentResult(inputReference);
  }

  const focus =
    RESULT_FOCUS_BY_AGENT[titleKey] ?? getFallbackFocus(agent.title);
  const evidenceRows = fields.slice(0, 3).map((field, index) => ({
    Evidência: `${index + 1}. ${field.label}`,
    "Trecho considerado": summarizeInput(field.value),
    Uso:
      index === 0
        ? "Base principal da leitura"
        : "Contexto e critério de validação",
  }));

  return {
    title: `${agent.title} — resultado estruturado`,
    reviewNotice:
      "Resultado demonstrativo pré-calculado a partir do mesmo cenário do botão Exemplo do Core. A estrutura reproduz a leitura, rastreabilidade e revisão humana esperadas no agente.",
    summary: focus.finding,
    metrics: [
      {
        label: focus.metricLabel,
        value: focus.metricValue,
        detail: focus.metricDetail,
        tone: "positive",
      },
      {
        label: "Entradas consideradas",
        value: String(fields.length),
        detail: "Campos oficiais do Exemplo",
        tone: "neutral",
      },
      {
        label: "Rastreabilidade",
        value: "100%",
        detail: "Evidências do cenário visíveis",
        tone: "positive",
      },
      {
        label: "Revisão humana",
        value: "Necessária",
        detail: "Antes de uso operacional",
        tone: "warning",
      },
    ],
    inputReference,
    premises: [
      "A análise considera somente o cenário de exemplo oficial exibido acima.",
      `Foram considerados ${fields.length} campo${fields.length === 1 ? "" : "s"}: ${fields.map((field) => field.label).join(", ")}.`,
    ],
    uncertainties: [
      focus.risk,
      "A demonstração não consulta sistemas, anexos ou fontes externas.",
    ],
    highlights: [focus.finding, focus.action],
    tables: [
      {
        title: "Evidências consideradas no cenário de exemplo",
        columns: ["Evidência", "Trecho considerado", "Uso"],
        rows: evidenceRows,
      },
      {
        title: "Leitura operacional",
        columns: ["Prioridade", "Achado", "Ação recomendada", "Validação"],
        rows: [
          {
            Prioridade: "Alta",
            Achado: focus.finding,
            "Ação recomendada": focus.action,
            Validação: "Responsável pelo processo",
          },
          {
            Prioridade: "Controle",
            Achado: focus.risk,
            "Ação recomendada": "Registrar premissa e complementar evidência",
            Validação: "Revisão humana",
          },
        ],
      },
    ],
    sections: [
      {
        title: "Recomendação de execução",
        items: [
          focus.action,
          "Manter as evidências do caso vinculadas à decisão ou ao documento de trabalho.",
          "Registrar uma nova execução quando houver dados adicionais ou mudança de contexto.",
        ],
      },
    ],
    nextSteps: [
      "Conferir os dados exibidos no formulário do Exemplo.",
      "Validar o resultado com o responsável pela rotina no Core.",
    ],
  };
}

function humanizeResultKey(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isResultRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function ResultJsonValue({
  value,
  depth = 0,
}: {
  value: unknown;
  depth?: number;
}) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-muted-foreground/70">Não informado</span>;
  }
  if (typeof value !== "object") {
    return (
      <span className="whitespace-pre-wrap break-words">{String(value)}</span>
    );
  }
  if (Array.isArray(value)) {
    if (!value.length)
      return <span className="text-muted-foreground/70">Sem itens.</span>;
    const records = value.filter(isResultRecord);
    const columns = Array.from(
      new Set(records.flatMap((item) => Object.keys(item))),
    );
    const isFlatTable =
      records.length === value.length &&
      columns.length > 0 &&
      columns.length <= 8 &&
      records.every((item) =>
        Object.values(item).every(
          (cell) => cell === null || typeof cell !== "object",
        ),
      );
    if (isFlatTable) {
      return (
        <div className="overflow-x-auto rounded-lg border border-border/70">
          <table className="min-w-full divide-y divide-border/60 text-left text-sm">
            <thead className="bg-surface/55 text-muted-foreground">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="whitespace-nowrap px-3 py-2 font-medium"
                  >
                    {humanizeResultKey(column)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {records.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td
                      key={column}
                      className="max-w-sm whitespace-pre-wrap px-3 py-2 align-top text-foreground/80"
                    >
                      {String(row[column] ?? "-")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-border/70 bg-background/35 p-3"
          >
            <ResultJsonValue value={item} depth={depth + 1} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={depth ? "space-y-3" : "grid gap-4 lg:grid-cols-2"}>
      {Object.entries(value).map(([key, item]) => (
        <section
          key={key}
          className="min-w-0 rounded-lg border border-border/70 bg-surface/25 p-4"
        >
          <h4 className="mb-2 text-sm font-semibold text-foreground">
            {humanizeResultKey(key)}
          </h4>
          <div className="text-sm leading-6 text-muted-foreground">
            <ResultJsonValue value={item} depth={depth + 1} />
          </div>
        </section>
      ))}
    </div>
  );
}

function CoreResultOutput({ output }: { output: string }) {
  try {
    const parsed = JSON.parse(output) as unknown;
    return <ResultJsonValue value={parsed} />;
  } catch {
    const lines = output.split(/\r?\n/);
    return (
      <div className="space-y-2 text-sm leading-7 text-foreground/85">
        {lines.map((line, index) => {
          const text = line.trim();
          if (!text) return <div key={index} className="h-2" />;
          if (text.startsWith("### "))
            return (
              <h4
                key={index}
                className="pt-2 text-base font-semibold text-foreground"
              >
                {text.slice(4)}
              </h4>
            );
          if (text.startsWith("## "))
            return (
              <h3
                key={index}
                className="pt-3 font-display text-xl font-semibold text-foreground"
              >
                {text.slice(3)}
              </h3>
            );
          if (text.startsWith("# "))
            return (
              <h3
                key={index}
                className="font-display text-2xl font-semibold text-foreground"
              >
                {text.slice(2)}
              </h3>
            );
          if (/^[-*]\s/.test(text))
            return (
              <p key={index} className="pl-4 text-muted-foreground">
                • {text.slice(2)}
              </p>
            );
          if (text.includes("|") && text.startsWith("|"))
            return (
              <pre
                key={index}
                className="overflow-x-auto whitespace-pre text-xs text-muted-foreground"
              >
                {line}
              </pre>
            );
          return (
            <p
              key={index}
              className="whitespace-pre-wrap text-muted-foreground"
            >
              {line}
            </p>
          );
        })}
      </div>
    );
  }
}

function buildDemoResultText(result: DemoResult) {
  if (result.rawOutput) {
    return [
      `# ${result.title}`,
      result.reviewNotice,
      "",
      "## Entradas utilizadas nesta simulação",
      ...result.inputReference.flatMap((input) => [
        `### ${input.label}`,
        input.value,
        "",
      ]),
      "## Resultado",
      result.rawOutput,
    ].join("\n");
  }
  return [
    `# ${result.title}`,
    result.reviewNotice,
    "",
    "## Entradas utilizadas nesta simulação",
    ...result.inputReference.flatMap((input) => [
      `### ${input.label}`,
      input.value,
      "",
    ]),
    "## Resumo",
    result.summary,
    "",
    "## Indicadores do resultado",
    ...result.metrics.map(
      (metric) => `- ${metric.label}: ${metric.value} (${metric.detail})`,
    ),
    "",
    "## Premissas e fontes",
    ...result.premises.map((item) => `- ${item}`),
    "",
    "## Incertezas e limitações",
    ...result.uncertainties.map((item) => `- ${item}`),
    "",
    "## Destaques",
    ...result.highlights.map((item) => `- ${item}`),
    "",
    ...result.tables.flatMap((table) => [
      `## ${table.title}`,
      table.columns.join(" | "),
      ...table.rows.map((row) =>
        table.columns.map((column) => row[column] ?? "-").join(" | "),
      ),
      "",
    ]),
    ...result.sections.flatMap((section) => [
      `## ${section.title}`,
      ...section.items.map((item) => `- ${item}`),
      "",
    ]),
    "## Próximos passos",
    ...result.nextSteps.map((item) => `- ${item}`),
  ].join("\n");
}

function downloadDemoResult(result: DemoResult) {
  const blob = new Blob([buildDemoResultText(result)], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "cerneops-demo-resultado.txt";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DemoWorkspace() {
  const [agents, setAgents] = useState<DemoAgent[]>([]);
  const [isLoadingAgents, setIsLoadingAgents] = useState(true);
  const [hasAgentError, setHasAgentError] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const [fields, setFields] = useState<DemoField[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [result, setResult] = useState<DemoResult | null>(null);
  const executionRef = useRef(0);

  useEffect(() => {
    let alive = true;

    const loadAgents = async () => {
      try {
        const plans = await fetchLandingPlans();
        if (!alive) return;
        const nextAgents = plans
          ? normalizeAgentsFromPlans(plans)
          : getLocalFallbackAgents();
        const resolvedAgents = nextAgents.length
          ? nextAgents
          : getLocalFallbackAgents();
        const preferredAgent =
          resolvedAgents.find(isKpiAgent) ?? resolvedAgents[0];
        setAgents(resolvedAgents);
        setSelectedId(preferredAgent?.id ?? "");
        setFields(preferredAgent ? createFields(preferredAgent) : []);
        setOpenGroups(
          preferredAgent ? new Set([preferredAgent.group]) : new Set(),
        );
        setHasAgentError(!plans);
      } catch {
        if (!alive) return;
        setAgents(getLocalFallbackAgents());
        setHasAgentError(true);
      } finally {
        if (alive) setIsLoadingAgents(false);
      }
    };

    void loadAgents();
    return () => {
      alive = false;
    };
  }, []);

  const selectedAgent = useMemo(
    () => agents.find((agent) => agent.id === selectedId) ?? agents[0],
    [agents, selectedId],
  );

  const canRun = useMemo(
    () => fields.length > 0 && status !== "loading",
    [fields, status],
  );

  useEffect(() => {
    if (!selectedAgent) return;
    setSelectedId((current) => current || selectedAgent.id);
    setFields(createFields(selectedAgent));
    setOpenGroups((current) => {
      if (current.size) return current;
      return new Set([selectedAgent.group]);
    });
  }, [selectedAgent]);

  const groupedAgents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    const groups = new Map<string, DemoAgent[]>();
    for (const agent of agents) {
      if (
        normalizedSearch &&
        !agent.title.toLowerCase().includes(normalizedSearch) &&
        !agent.group.toLowerCase().includes(normalizedSearch)
      ) {
        continue;
      }
      const current = groups.get(agent.group) ?? [];
      current.push(agent);
      groups.set(agent.group, current);
    }
    return Array.from(groups.entries()).sort(([a], [b]) =>
      a.localeCompare(b, "pt-BR"),
    );
  }, [agents, search]);

  const selectAgent = (agent: DemoAgent) => {
    executionRef.current += 1;
    setSelectedId(agent.id);
    setFields(createFields(agent));
    setResult(null);
    setStatus("idle");
    setOpenGroups((current) => new Set(current).add(agent.group));
  };

  const handleNew = () => {
    if (!selectedAgent) return;
    executionRef.current += 1;
    setFields(createFields(selectedAgent));
    setResult(null);
    setStatus("idle");
  };

  const handleExample = () => {
    if (!selectedAgent) return;
    executionRef.current += 1;
    setFields(createFields(selectedAgent));
    setResult(null);
    setStatus("idle");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAgent || !canRun) return;
    const executionId = ++executionRef.current;
    setStatus("loading");
    setResult(null);
    window.setTimeout(() => {
      if (executionRef.current !== executionId) return;
      void import("@/lib/core-demo-golden-results.generated").then(
        ({ CORE_DEMO_GOLDEN_RESULTS }) => {
          if (executionRef.current !== executionId) return;
          const golden = getGoldenResult(
            selectedAgent,
            CORE_DEMO_GOLDEN_RESULTS,
          );
          setResult(createDemoResult(selectedAgent, fields, golden));
          setStatus("success");
        },
      );
    }, 850);
  };

  const toggleGroup = (group: string) => {
    setOpenGroups((current) => {
      const next = new Set(current);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-hero pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ember">
            <span>/</span>
            <span>Demo de agentes</span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[350px_minmax(0,1fr)]">
            <aside className="min-w-0 overflow-x-clip rounded-2xl border border-border bg-background/65 p-5 shadow-elevated backdrop-blur-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-semibold">
                    Selecione um agente por setor
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Escolha o setor e o agente que deseja testar.
                  </p>
                </div>
                <Bot className="mt-1 h-5 w-5 shrink-0 text-ember" />
              </div>

              <label className="relative mt-5 block">
                <span className="sr-only">Buscar setor ou agente</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar setor ou agente"
                  className="h-11 w-full rounded-lg border border-border bg-surface/50 pl-10 pr-3 text-sm outline-none transition placeholder:text-muted-foreground/75 focus:border-ember/60 focus:ring-2 focus:ring-ember/20"
                />
              </label>

              {isLoadingAgents ? (
                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-ember" />
                  Carregando catálogo oficial...
                </div>
              ) : null}

              {hasAgentError ? (
                <p className="mt-4 text-xs leading-relaxed text-amber-200">
                  Catálogo dinâmico indisponível. Exibindo a cópia local dos
                  agentes para a demonstração.
                </p>
              ) : null}

              <div className="mt-5 space-y-2">
                {groupedAgents.map(([group, groupAgents]) => {
                  const isOpen = openGroups.has(group);
                  return (
                    <div
                      key={group}
                      className="rounded-xl border border-border/80 bg-surface/30"
                    >
                      <button
                        type="button"
                        onClick={() => toggleGroup(group)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition hover:bg-surface/70"
                      >
                        <span className="flex min-w-0 items-center gap-2">
                          <Bot className="h-4 w-4 shrink-0 text-ember" />
                          <span className="truncate text-sm font-medium">
                            {group}
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                          {groupAgents.length} agentes
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      </button>

                      {isOpen ? (
                        <div className="border-t border-border/70 p-2">
                          {groupAgents.map((agent) => {
                            const selected = selectedAgent?.id === agent.id;
                            return (
                              <button
                                key={agent.id}
                                type="button"
                                onClick={() => selectAgent(agent)}
                                className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                  selected
                                    ? "bg-ember/15 text-foreground ring-1 ring-ember"
                                    : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
                                }`}
                              >
                                <span className="min-w-0 truncate">
                                  {agent.title}
                                </span>
                                {selected ? (
                                  <Check className="h-4 w-4 shrink-0 text-ember" />
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl border border-circuit/25 bg-circuit/5 p-4 text-sm leading-relaxed text-muted-foreground">
                <ShieldCheck className="mb-2 h-5 w-5 text-circuit" />
                Todos os agentes operam com{" "}
                <span className="font-medium text-foreground">zero código</span>
                , seguindo os princípios Core de simplicidade, redução de
                burocracia e praticidade operacional.
              </div>
            </aside>

            <main className="min-w-0 space-y-6">
              {selectedAgent ? (
                <section className="rounded-2xl border border-border bg-background/65 p-5 shadow-elevated backdrop-blur-sm sm:p-7">
                  <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-ember">
                        Agente selecionado
                      </div>
                      <h1 className="mt-2 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                        {selectedAgent.title}
                      </h1>
                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                        {selectedAgent.description}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={handleNew}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/55 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-elevated"
                      >
                        <Plus className="h-4 w-4" />
                        Novo
                      </button>
                      <button
                        type="button"
                        onClick={handleExample}
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/55 px-4 py-2.5 text-sm font-medium transition hover:bg-surface-elevated"
                      >
                        <Sparkles className="h-4 w-4" />
                        Exemplo
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Dados preenchidos pelo botão “Exemplo” do Core CerneOps.
                      As entradas são exibidas exatamente como no fluxo do
                      agente e permanecem somente leitura.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      {fields.map((field, index) => (
                        <label
                          key={field.key}
                          className={`block space-y-2 ${index === 2 ? "md:col-span-2" : ""}`}
                        >
                          <span className="text-xs text-muted-foreground">
                            {index + 1}. {field.label}
                          </span>
                          <textarea
                            value={field.value}
                            rows={field.rows}
                            readOnly
                            aria-readonly="true"
                            placeholder={field.placeholder}
                            className="w-full resize-none rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm leading-6 outline-none placeholder:text-muted-foreground/65"
                          />
                        </label>
                      ))}
                    </div>

                    {!fields.length ? (
                      <div className="rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
                        O cenário oficial de demonstração deste agente ainda
                        está em preparação. A execução ficará disponível assim
                        que o exemplo do Core for publicado.
                      </div>
                    ) : null}

                    <div className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                      <p>
                        Demonstração simulando uma análise real do Agente IA
                        Especialista.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        Entradas e resultado são simulados e somente leitura
                        para você conhecer o fluxo do Core.
                      </p>
                      <button
                        type="submit"
                        disabled={!canRun}
                        className="inline-flex items-center gap-2 rounded-lg gradient-ember px-5 py-3 font-semibold text-primary-foreground shadow-ember transition hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
                      >
                        {status === "loading" ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4" />
                        )}
                        {status === "loading"
                          ? "Executando demonstração..."
                          : "Executar análise"}
                      </button>
                    </div>
                  </form>
                </section>
              ) : (
                <section className="rounded-2xl border border-border bg-background/65 p-8 text-center text-muted-foreground">
                  Selecione um agente para iniciar a demonstração.
                </section>
              )}

              {result && selectedAgent ? (
                <section
                  data-testid="demo-result"
                  className="rounded-2xl border border-border bg-background/65 p-5 shadow-elevated backdrop-blur-sm sm:p-7"
                >
                  <div className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ember">
                        <CircleCheck className="h-4 w-4 text-emerald-400" />
                        Resultado estruturado
                      </div>
                      <h2 className="mt-2 font-display text-2xl font-semibold">
                        {result.title}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Revise antes de qualquer uso operacional.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => downloadDemoResult(result)}
                      className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-border bg-surface/55 px-3 py-2 text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      <FileText className="h-4 w-4" />
                      Exportar relatório
                    </button>
                  </div>

                  <div className="mt-5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm leading-relaxed text-amber-100">
                    {result.reviewNotice}
                  </div>

                  {result.metrics.length ? (
                    <div className="mt-4 rounded-lg border border-circuit/25 bg-circuit/5 p-4">
                      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {result.metrics.map((metric) => {
                          const tone =
                            metric.tone === "warning"
                              ? "border-amber-500/30 bg-amber-500/10"
                              : metric.tone === "positive"
                                ? "border-emerald-500/25 bg-emerald-500/5"
                                : "border-border/70 bg-surface/30";
                          return (
                            <div
                              key={metric.label}
                              className={`rounded-lg border p-3 ${tone}`}
                            >
                              <p className="text-xs text-muted-foreground">
                                {metric.label}
                              </p>
                              <p className="mt-1 font-display text-xl font-semibold text-foreground">
                                {metric.value}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                                {metric.detail}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 rounded-lg border border-circuit/25 bg-circuit/5 p-4">
                    <h3 className="text-sm font-semibold text-foreground">
                      Entradas do Exemplo utilizadas nesta simulação
                    </h3>
                    <div className="mt-3 grid gap-3 lg:grid-cols-2">
                      {result.inputReference.map((input) => (
                        <div
                          key={input.label}
                          className="rounded-lg border border-border/70 bg-surface/30 p-3"
                        >
                          <p className="text-xs font-medium text-muted-foreground">
                            {input.label}
                          </p>
                          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-foreground/85">
                            {input.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {result.rawOutput ? (
                    <div className="mt-4 rounded-xl border border-circuit/30 bg-background/50 p-4 sm:p-5">
                      <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                        <Bot className="h-4 w-4 text-circuit" />
                        <h3 className="text-base font-semibold">
                          Resultado gerado pelo Agente no Core
                        </h3>
                      </div>
                      <CoreResultOutput output={result.rawOutput} />
                    </div>
                  ) : (
                    <>
                      <div className="mt-4 rounded-lg border border-border bg-surface/30 p-4">
                        <h3 className="text-base font-semibold">Resumo</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {result.summary}
                        </p>
                      </div>

                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <ResultList
                          title="Premissas e fontes"
                          items={result.premises}
                          empty="Sem premissas informadas."
                        />
                        <ResultList
                          title="Incertezas e limitações"
                          items={result.uncertainties}
                          empty="Sem incertezas informadas."
                          tone="warning"
                        />
                      </div>
                      <ResultList
                        title="Destaques"
                        items={result.highlights}
                        empty="Sem destaques informados."
                      />

                      {result.tables.map((table) => (
                        <div
                          key={table.title}
                          className="mt-4 overflow-x-auto rounded-lg border border-border"
                        >
                          <table className="min-w-full divide-y divide-border text-sm">
                            <caption className="bg-surface/30 px-4 py-3 text-left font-semibold text-foreground">
                              {table.title}
                            </caption>
                            <thead className="bg-surface/55 text-left text-muted-foreground">
                              <tr>
                                {table.columns.map((column) => (
                                  <th
                                    key={column}
                                    className="whitespace-nowrap px-3 py-2 font-medium"
                                  >
                                    {column}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/60">
                              {table.rows.map((row, rowIndex) => (
                                <tr key={`${table.title}-${rowIndex}`}>
                                  {table.columns.map((column) => (
                                    <td
                                      key={column}
                                      className="whitespace-nowrap px-3 py-2 text-muted-foreground"
                                    >
                                      {row[column] || "-"}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}

                      <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        {result.sections.map((section) => (
                          <ResultList
                            key={section.title}
                            title={section.title}
                            items={section.items}
                            empty="Sem itens informados."
                          />
                        ))}
                        <ResultList
                          title="Próximos passos"
                          items={result.nextSteps}
                          empty="Sem próximos passos."
                          tone="warning"
                        />
                      </div>
                    </>
                  )}
                </section>
              ) : null}

              {result ? <TrialCta /> : null}
            </main>
          </div>
        </div>
      </div>
    </>
  );
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
  const classes =
    tone === "warning"
      ? "border-amber-500/30 bg-amber-500/10"
      : "border-border bg-surface/30";
  return (
    <div className={`rounded-lg border p-4 ${classes}`}>
      <h3 className="text-sm font-semibold">{title}</h3>
      {items.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
          {items.map((item, index) => (
            <li key={`${item}-${index}`}>- {item}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground/70">{empty}</p>
      )}
    </div>
  );
}

function TrialCta() {
  return (
    <section
      data-testid="demo-trial-cta"
      className="rounded-2xl border border-ember/35 bg-ember/10 p-5 shadow-elevated sm:p-6"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ember/40 bg-ember/15 text-ember">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ember">
              Próximo passo
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold leading-tight">
              Agora veja os ganhos em sua empresa na prática,{" "}
              <span className="text-ember">
                teste nosso trial gratuitamente
              </span>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Leve o fluxo para os dados e rotinas reais da sua empresa. A
              demonstração reflete fielmente os Agentes IA Especialistas do Core
              CerneOps, teste!.
            </p>
          </div>
        </div>
        <a
          href="https://cerneops.com.br/planos/trial"
          className="inline-flex shrink-0 items-center justify-center rounded-lg gradient-ember px-5 py-3 font-semibold text-primary-foreground shadow-ember transition hover:brightness-110"
        >
          Testar o Trial gratuitamente
        </a>
      </div>
    </section>
  );
}
