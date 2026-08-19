/* eslint-disable prettier/prettier */
/* Generated from Core agent Exemplo definitions. Run npm run generate:demo-scenarios. */

export const CORE_DEMO_SCENARIOS = [
  {
    "agentCode": "adaptador_receitas_inteligente",
    "title": "Adaptador de Receitas Inteligente",
    "fields": [
      {
        "key": "originalRecipe",
        "label": "Receita original",
        "rows": "10",
        "placeholder": "Ingredientes, quantidades, rendimento atual, modo de preparo e observações relevantes."
      },
      {
        "key": "adaptationGoal",
        "label": "Objetivo da adaptação",
        "rows": "5",
        "placeholder": "Ex.: aumentar para 80 porções, reduzir açúcar, substituir leite, manter textura e custo-alvo."
      },
      {
        "key": "constraints",
        "label": "Restrições e premissas",
        "rows": "4",
        "placeholder": "Ex.: equipamentos, ingredientes indisponíveis, alergênicos, perdas esperadas e arredondamentos."
      }
    ],
    "values": {
      "originalRecipe": "Bolo de cenoura para 12 fatias: 300 g de cenoura, 3 ovos, 240 ml de óleo, 360 g de açúcar, 300 g de farinha, 15 g de fermento. Forno 180 C por 40 min.",
      "adaptationGoal": "Adaptar para 48 fatias, reduzir açúcar em 15%, manter massa úmida e indicar arredondamentos práticos por ingrediente.",
      "constraints": "Produção em assadeira retangular, balança com precisão de 5 g, evitar leite e sinalizar alergênicos comuns."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_acidentes",
    "title": "Analisador de Acidentes",
    "fields": [
      {
        "key": "incidentReport",
        "label": "Relato do incidente",
        "rows": 8
      },
      {
        "key": "contextData",
        "label": "Dados de contexto",
        "rows": 8
      },
      {
        "key": "investigationScope",
        "label": "Escopo da investigação",
        "rows": 8
      },
      {
        "key": "internalRules",
        "label": "Regras internas",
        "rows": 8
      }
    ],
    "values": {
      "incidentReport": "Incidente informado: tecnico de manutencao sofreu corte superficial na mao esquerda durante ajuste de protecao em uma maquina de embalagem.\nData/hora: 14/05/2026, aproximadamente 10h20.\nLocal: linha 2 de embalagem.\nRelato inicial: a maquina estava parada, mas a protecao removivel estava apoiada em bancada estreita. Ao reposicionar a peca, o tecnico encostou em borda metalica sem acabamento.\nConsequencia: atendimento ambulatorial interno, sem afastamento informado no relato.",
      "contextData": "Informacoes adicionais:\n- tecnico usava oculos e calcado, mas luva anticorte nao estava disponivel no carrinho;\n- a ordem de servico mencionava ajuste mecanico, sem detalhar bordas cortantes;\n- nao havia registro recente de inspecao da protecao removivel;\n- supervisor interrompeu a atividade e isolou a peca para avaliacao.",
      "investigationScope": "Organizar hipoteses de causa, fatores contribuintes, lacunas, perguntas para investigacao e acoes preventivas. Nao concluir culpa nem emitir laudo.",
      "internalRules": "Usar o relato como unica fonte. Qualquer recomendacao deve ser validada por SESMT/CIPA/responsavel habilitado antes de virar acao formal."
    },
    "kind": "custom"
  },
  {
    "agentCode": "analisador_ciclo_vendas",
    "title": "Analisador de Ciclo de Vendas",
    "fields": [
      {
        "key": "pipelineContext",
        "label": "Contexto do funil",
        "rows": "6",
        "placeholder": "Ex.: segmento, ticket medio, etapas do funil, periodo analisado, meta e principais canais."
      },
      {
        "key": "pipelineData",
        "label": "Dados estruturados do ciclo",
        "rows": "10",
        "placeholder": "Ex.: leads por etapa, conversoes, tempo medio em cada etapa, perdas por motivo, oportunidades paradas e observacoes do CRM."
      },
      {
        "key": "analysisLimits",
        "label": "Limites e premissas",
        "rows": "4",
        "placeholder": "Ex.: dados incompletos em uma etapa, sazonalidade, mudanca de campanha, meta apenas referencial."
      }
    ],
    "values": {
      "pipelineContext": "Empresa B2B ficticia com ticket medio de R$ 18 mil, ciclo consultivo e periodo analisado de 90 dias. Etapas: lead, diagnostico, proposta, negociacao e ganho/perdido.",
      "pipelineData": "Leads: 180; diagnostico: 92; proposta: 46; negociacao: 21; ganhos: 9. Tempo medio: lead 3 dias, diagnostico 8 dias, proposta 12 dias, negociacao 18 dias. Perdas recorrentes: timing, preco percebido e falta de decisor.",
      "analysisLimits": "Nao tratar forecast como garantia. Considerar dados de CRM incompletos em origem de lead e registrar incertezas antes de recomendar acoes."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_clima_organizacional",
    "title": "Analisador de Clima Organizacional",
    "fields": [
      {
        "key": "surveyContext",
        "label": "Contexto da pesquisa",
        "rows": "6",
        "placeholder": "Ex.: pesquisa de clima do 1o semestre, areas avaliadas, escala usada, taxa de resposta e objetivo da analise."
      },
      {
        "key": "surveyData",
        "label": "Dados agregados e comentarios anonimizados",
        "rows": "10",
        "placeholder": "Ex.: medias por tema, distribuicoes por area sem identificar pessoas, comentarios anonimizados e temas recorrentes."
      },
      {
        "key": "analysisFocus",
        "label": "Foco, limites e cuidados",
        "rows": "4",
        "placeholder": "Ex.: focar lideranca e comunicacao; evitar citacoes identificaveis; considerar grupos pequenos como sensiveis."
      }
    ],
    "values": {
      "surveyContext": "Pesquisa ficticia de clima do 1o semestre de 2026 com 118 respostas anonimizadas. Escala de 1 a 5 para lideranca, comunicacao, carreira, ferramentas e bem-estar.",
      "surveyData": "Media geral 3,7/5. Lideranca 3,2; comunicacao 3,1; carreira 2,9; ferramentas 3,8; bem-estar 3,6. Comentarios anonimizados indicam duvidas sobre plano de carreira, elogios ao suporte entre pares e preocupacao com sobrecarga em dois times.",
      "analysisFocus": "Gerar leitura agregada por tema, evitar identificacao de pessoas, destacar riscos de vies e sugerir acoes revisaveis por RH e liderancas."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_contratos",
    "title": "Analisador de Contratos (Extrator de Cláusulas Críticas)",
    "fields": [
      {
        "key": "contractText",
        "label": "Texto do contrato",
        "rows": 8
      },
      {
        "key": "keyClauses",
        "label": "Cláusulas-chave",
        "rows": 8
      },
      {
        "key": "contractType",
        "label": "Tipo de contrato",
        "rows": 8
      }
    ],
    "values": {
      "contractText": "CONTRATO DE PRESTACAO DE SERVICOS DE SUPORTE OPERACIONAL\n\nPartes: Alfa Comercio Ltda. (contratante) e Beta Servicos Administrativos Ltda. (contratada).\n\nVigencia: 12 meses, com inicio em 01/06/2026 e renovacao automatica por igual periodo se nenhuma das partes notificar a outra com 30 dias de antecedencia.\n\nPagamento: mensalidade de R$ 8.500,00 com vencimento todo dia 10. Atrasos superiores a 10 dias geram multa de 2% e juros de 1% ao mes.\n\nRescisao: qualquer parte podera rescindir mediante aviso previo de 45 dias. Rescisao sem aviso implica multa equivalente a 2 mensalidades.\n\nConfidencialidade: as partes manterao sigilo por 5 anos apos o encerramento do contrato.\n\nDados pessoais: a contratada podera tratar dados de colaboradores da contratante para execucao do servico, mas o contrato nao detalha base legal, operadores, incidentes ou descarte.\n\nSLA: atendimento em ate 4 horas uteis para chamados criticos. O contrato nao define penalidades por descumprimento.\n\nForo: comarca de Sao Paulo/SP.",
      "keyClauses": "rescisao sem justa causa, renovacao automatica, LGPD e tratamento de dados, SLA sem penalidade, multa por atraso e multa rescisoria",
      "contractType": "Prestacao de servicos B2B"
    },
    "kind": "custom"
  },
  {
    "agentCode": "analisador_curva_abc_estoque",
    "title": "Analisador de Curva ABC de Estoque",
    "fields": [
      {
        "key": "period",
        "label": "Período de apuração",
        "rows": 8
      },
      {
        "key": "manualData",
        "label": "Dados informados manualmente",
        "rows": 8
      }
    ],
    "values": {
      "period": "Ultimos 6 meses",
      "manualData": "item_id,nome_produto,custo_unitario,quantidade\n001,Parafuso M8,1.50,1000\n002,Tinta Branca 18L,250.00,10\n003,Placa de Circuito,150.00,100\n004,Cabo HDMI,25.00,120\n005,Embalagem Papel Kraft,2.30,1500\n006,Fonte 12V,48.00,80"
    },
    "kind": "custom"
  },
  {
    "agentCode": "analisador_desvio_cronograma",
    "title": "Analisador de Desvio de Cronograma",
    "fields": [
      {
        "key": "baselineSchedule",
        "label": "Cronograma base informado",
        "rows": "7",
        "placeholder": "Ex.: atividades previstas, datas planejadas, duracoes, marcos e dependencias relevantes."
      },
      {
        "key": "actualProgress",
        "label": "Avanco real e fatos ocorridos",
        "rows": "8",
        "placeholder": "Ex.: atividades concluidas, atrasos, frentes paradas, materiais pendentes, restricoes e evidencias textuais."
      },
      {
        "key": "analysisOptions",
        "label": "Foco da analise",
        "rows": "4",
        "placeholder": "Ex.: apontar desvios por atividade, separar causa provavel de evidencia, sugerir plano de recuperacao preliminar."
      }
    ],
    "values": {
      "baselineSchedule": "Cronograma ficticio previa demolicao semana 1, drywall semanas 2 e 3, eletrica semana 3, pintura semana 4 e piso semana 5. Marco de entrega: fim da semana 5.",
      "actualProgress": "No fim da semana 3, drywall da sala 401 concluido, sala 402 pendente por falta de liberacao eletrica. Material de piso atrasado 5 dias. Pintura nao iniciou.",
      "analysisOptions": "Comparar planejado versus realizado, listar desvios, indicar evidencias textuais e sugerir acoes preliminares sem pleito oficial."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_fluxo_caixa",
    "title": "Analisador de Fluxo de Caixa",
    "fields": [
      {
        "key": "cashContext",
        "label": "Contexto financeiro",
        "rows": "5",
        "placeholder": "Ex.: empresa ficticia, moeda, periodo analisado, saldo inicial, sazonalidade e objetivo da projecao."
      },
      {
        "key": "cashData",
        "label": "Dados de entradas, saidas e provisoes",
        "rows": "11",
        "placeholder": "Ex.: saldo inicial R$ 120.000; receitas previstas por semana; despesas fixas, fornecedores, folha, impostos e vencimentos relevantes."
      },
      {
        "key": "projectionRules",
        "label": "Premissas e limites",
        "rows": "4",
        "placeholder": "Ex.: considerar 60 dias, despesas variaveis por media historica, dados incompletos em recebiveis."
      }
    ],
    "values": {
      "cashContext": "Empresa ficticia de servicos B2B, moeda BRL, saldo inicial de R$ 120.000 em 01/06/2026 e horizonte desejado de 60 dias.",
      "cashData": "Receitas previstas: semana 1 R$ 45.000, semana 2 R$ 32.000, semana 3 R$ 58.000, semana 4 R$ 40.000. Saidas: folha R$ 70.000 dia 05, fornecedores R$ 38.000 dia 10, impostos R$ 22.000 dia 20, aluguel R$ 12.000 dia 07. Contas a receber com risco de atraso: cliente Alfa R$ 25.000.",
      "projectionRules": "Nao tratar como previsao definitiva. Registrar premissas de recebimento, possiveis atrasos e necessidade de conferencia antes de antecipar recebiveis ou renegociar pagamentos."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_glosas",
    "title": "Analisador de Glosas",
    "fields": [
      {
        "key": "denialStatement",
        "label": "Demonstrativo ou motivo da glosa",
        "rows": "10",
        "placeholder": "Cole convenio, lote, itens glosados, codigos/motivos, valores e observacoes recebidas."
      },
      {
        "key": "evidenceData",
        "label": "Evidencias informadas pela clinica",
        "rows": "8",
        "placeholder": "Cole trechos de guia, evolucao, pedido, justificativa, autorizacao ou comprovantes ja disponiveis em texto."
      },
      {
        "key": "appealRules",
        "label": "Regras internas ou prazo de recurso",
        "rows": "4",
        "placeholder": "Ex.: prazo de recurso, tabela TUSS/CBHPM usada, politica interna e formato desejado."
      }
    ],
    "values": {
      "denialStatement": "Convenio ficticio VidaSaude. Lote 45890. Item glosado: taxa de sala R$ 400,00 por motivo ausencia de justificativa. Item glosado: material cirurgico R$ 150,00 por quantidade divergente.",
      "evidenceData": "Evidencia textual: guia assinada informa procedimento ambulatorial. Evolucao descreve observacao por 4 horas. Registro de enfermagem esta completo para primeira e segunda hora, mas incompleto nas horas finais.",
      "appealRules": "Prazo de recurso: 30 dias. Usar linguagem administrativa objetiva. Separar glosa devida, indevida e pendente de evidencia."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_incentivos_fiscais",
    "title": "Analisador de Incentivos Fiscais",
    "fields": [
      {
        "key": "companyTaxProfile",
        "label": "Perfil fiscal da empresa",
        "rows": "7",
        "placeholder": "Ex.: CNAE principal/secundarios, regime tributario, UF, municipio, faturamento aproximado e atividades."
      },
      {
        "key": "productsServices",
        "label": "Produtos, servicos e NCMs informados",
        "rows": "8",
        "placeholder": "Ex.: lista textual de NCMs, servicos, origem/destino, principais receitas e observacoes de cadastro."
      },
      {
        "key": "taxFocus",
        "label": "Foco, perfil de risco e limites",
        "rows": "5",
        "placeholder": "Ex.: ICMS e PIS/COFINS, perfil conservador, sem afirmar enquadramento definitivo ou economia garantida."
      }
    ],
    "values": {
      "companyTaxProfile": "Empresa ficticia de software e equipamentos para agronegocio, CNAE principal 62.01-5-01, CNAE secundario 28.33-0-00, Lucro Real, SP, atua com desenvolvimento sob encomenda e venda de equipamentos.",
      "productsServices": "Produtos informados: maquinas agricolas NCM 8432.80.00, sensores para irrigacao, servicos de desenvolvimento de software e manutencao. Parte do cadastro usa NCM generico a revisar.",
      "taxFocus": "Foco em oportunidades federais e estaduais, perfil conservador, listar apenas hipoteses para avaliacao da contabilidade e nao prometer economia."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_kpis",
    "title": "Analisador de KPIs",
    "fields": [
      {
        "key": "kpiData",
        "label": "KPIs e metas",
        "rows": "10",
        "placeholder": "Ex.: NPS, TME, conversao, churn, margem, SLA, metas, periodos e variacao."
      },
      {
        "key": "businessContext",
        "label": "Contexto e eventos",
        "rows": "6",
        "placeholder": "Ex.: mudancas de equipe, campanha, sazonalidade, incidentes, alteracao de processo ou dados faltantes."
      },
      {
        "key": "analysisFocus",
        "label": "Foco da analise",
        "rows": "4",
        "placeholder": "Ex.: priorizar desvios de meta, correlacoes provaveis, riscos de dados incompletos e proximos passos."
      }
    ],
    "values": {
      "kpiData": "NPS caiu de 72 para 61 em abril. Tempo medio de espera subiu de 3 para 8 minutos. Conversao comercial caiu de 18% para 14%. Churn mensal subiu de 2,1% para 3,4%. Meta de SLA era 90%, realizado 82%.",
      "businessContext": "Em abril houve troca de ferramenta de atendimento, aumento de tickets e ausencia de dois analistas. Parte dos dados de atendimento do dia 12 nao foi consolidada.",
      "analysisFocus": "Evitar causalidade definitiva. Separar hipoteses, evidencias, riscos de dados incompletos e acoes revisaveis para gestores."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_objecoes_vendas",
    "title": "Analisador de Objecoes de Vendas",
    "fields": [
      {
        "key": "interactionText",
        "label": "Conteúdo das interações",
        "rows": 8
      },
      {
        "key": "catalogText",
        "label": "Conteúdo do catálogo",
        "rows": 8
      }
    ],
    "values": {
      "interactionText": "Vendedor: Temos um plano que automatiza follow-up comercial e reduz perda de oportunidades.\nCliente: Parece bom, mas esta muito caro para o meu momento.\nVendedor: Entendo. Hoje qual faixa de investimento voce considera viavel?\nCliente: Outra empresa me ofereceu algo parecido por um valor menor.\nVendedor: Perfeito, podemos comparar os escopos para garantir equivalencia.\nCliente: Tambem nao sei se preciso disso agora, talvez no proximo trimestre.",
      "catalogText": "Preco: enfatizar retorno em produtividade e reducao de perda de oportunidades.\nConcorrencia: comparar escopo, suporte e resultados entregues.\nTiming: propor piloto curto com meta mensuravel em 30 dias."
    },
    "kind": "custom"
  },
  {
    "agentCode": "analisador_precos_concorrentes",
    "title": "Analisador de Preços de Concorrentes",
    "fields": [
      {
        "key": "ownPrices",
        "label": "Preços próprios",
        "rows": "7",
        "placeholder": "Produto, tamanho/gramatura, preço, canal, custo, margem desejada e data."
      },
      {
        "key": "competitorPrices",
        "label": "Preços de concorrentes permitidos",
        "rows": "9",
        "placeholder": "Concorrente, produto, tamanho, preço, canal, data da coleta e observações de comparabilidade."
      },
      {
        "key": "pricingPolicy",
        "label": "Política e limites",
        "rows": "4",
        "placeholder": "Ex.: não reduzir abaixo de margem mínima, manter posicionamento premium, considerar delivery."
      }
    ],
    "values": {
      "ownPrices": "Hambúrguer artesanal 180 g R$ 32, custo estimado R$ 14, margem alvo 55%. Combo hambúrguer + batata R$ 45.",
      "competitorPrices": "Concorrente A: hambúrguer 160 g R$ 29 no salão em 20/06/2026. Concorrente B: hambúrguer 180 g R$ 36 no delivery, taxa separada. Concorrente C: combo similar R$ 42.",
      "pricingPolicy": "Não recomendar preço abaixo de margem de contribuição de 45%. Considerar posicionamento artesanal premium."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_relatorios_inspecao",
    "title": "Analisador de Relatorios de Inspecao",
    "fields": [
      {
        "key": "unit",
        "label": "Unit",
        "rows": 8
      },
      {
        "key": "inspectionType",
        "label": "Tipo de inspeção",
        "rows": 8
      },
      {
        "key": "referenceDate",
        "label": "Data de referência",
        "rows": 8
      },
      {
        "key": "criteria",
        "label": "Critérios",
        "rows": 8
      },
      {
        "key": "reportText",
        "label": "Conteúdo do relatório",
        "rows": 8
      }
    ],
    "values": {
      "unit": "CD Campinas - almoxarifado e doca",
      "inspectionType": "Inspecao preventiva mensal",
      "referenceDate": "18/05/2026",
      "criteria": "Politica interna de circulacao, acesso a equipamentos de emergencia, uso de EPI e registros de checklist.",
      "reportText": "Relatorio de inspecao interna - Almoxarifado e doca de recebimento\nData: 18/05/2026\nUnidade: CD Campinas\nTipo: inspecao preventiva mensal\nObservacoes:\n- Corredor B com paletes fora da faixa demarcada, reduzindo area de circulacao.\n- Extintor proximo a doca 2 com acesso parcialmente obstruido por carrinho de separacao.\n- Dois colaboradores relataram uso irregular de protetor auricular durante descarga.\n- Checklist de empilhadeira preenchido, mas sem assinatura do operador no turno da manha.\n- Piso da doca 1 com ponto de oleo sinalizado pela equipe, aguardando limpeza definitiva.\nEvidencias textuais: fotos foram mencionadas no relatorio original, mas nao estao coladas aqui."
    },
    "kind": "custom"
  },
  {
    "agentCode": "analisador_sazonalidade",
    "title": "Analisador de Sazonalidade",
    "fields": [
      {
        "key": "salesHistory",
        "label": "Historico de vendas estruturado",
        "rows": "11",
        "placeholder": "Ex.: vendas mensais por categoria nos ultimos 24 meses, picos, vales, campanhas e eventos relevantes."
      },
      {
        "key": "eventsContext",
        "label": "Eventos, campanhas e contexto",
        "rows": "5",
        "placeholder": "Ex.: Black Friday, feriados locais, sazonalidade climatica, ruptura de estoque ou vendas B2B atipicas."
      },
      {
        "key": "analysisSettings",
        "label": "Nivel de agregacao e limites",
        "rows": "4",
        "placeholder": "Ex.: analisar por categoria, sensibilidade media, remover outliers conhecidos e sinalizar dados insuficientes."
      }
    ],
    "values": {
      "salesHistory": "Categoria Eletronicos: Jan 70, Fev 74, Mar 92, Abr 95, Mai 110, Jun 96, Jul 90, Ago 106, Set 97, Out 101, Nov 138, Dez 142 nos anos 2024 e 2025. Categoria Climatizacao tem pico em Jan/Fev e queda em Jun/Jul.",
      "eventsContext": "Eventos conhecidos: Dia das Maes em maio, Dia dos Pais em agosto, Black Friday em novembro, Natal em dezembro. Houve ruptura parcial de estoque em novembro de 2025 para notebooks.",
      "analysisSettings": "Agrupar por categoria, sensibilidade media, tratar eventos como hipoteses e evitar conclusoes definitivas sobre compras futuras."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_sentimento_reviews",
    "title": "Analisador de Sentimento de Avaliações (Reviews)",
    "fields": [
      {
        "key": "reviewsInput",
        "label": "Avaliações",
        "rows": 8
      },
      {
        "key": "criteriaInput",
        "label": "Critérios de análise",
        "rows": 8
      }
    ],
    "values": {
      "reviewsInput": "Entrega super rapida e produto excelente. Recomendo demais.\nO atendimento foi educado, mas meu problema nao foi resolvido.\nAchei o preco acima do esperado para a qualidade entregue.\nInterface intuitiva e facil de usar no dia a dia.\nDemorou para responder no suporte e fiquei sem retorno por 2 dias.",
      "criteriaInput": "atendimento ao cliente, tempo de entrega, qualidade do produto, preco"
    },
    "kind": "custom"
  },
  {
    "agentCode": "analisador_tempo_resposta",
    "title": "Analisador de Tempo de Resposta",
    "fields": [
      {
        "key": "slaContext",
        "label": "Contexto de SLA e atendimento",
        "rows": "6",
        "placeholder": "Ex.: canais, horarios uteis, regras de SLA, fila, periodo e tipo de cliente."
      },
      {
        "key": "responseData",
        "label": "Dados de tempos e tickets",
        "rows": "10",
        "placeholder": "Ex.: tickets por canal, primeira resposta, tempo de resolucao, backlog, casos fora do SLA e observacoes de escala."
      },
      {
        "key": "dataLimits",
        "label": "Premissas e dados incompletos",
        "rows": "4",
        "placeholder": "Ex.: fuso horario, tickets sem data de encerramento, mudanca de equipe, feriados nao tratados."
      }
    ],
    "values": {
      "slaContext": "Operacao ficticia de suporte B2B com atendimento em dias uteis das 8h as 18h. SLA de primeira resposta em ate 4h e resolucao em ate 48h para tickets padrao.",
      "responseData": "Periodo de 30 dias: 420 tickets. Primeira resposta media 3h20, p90 7h10. Resolucao media 34h, p90 72h. Backlog atual 38 tickets. Canais: email 60%, chat 30%, telefone 10%. Casos fora do SLA concentrados em segunda-feira e fila tecnica.",
      "dataLimits": "Alguns tickets nao possuem encerramento, feriados nao foram normalizados e horarios fora do expediente podem distorcer media simples."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analisador_turnover",
    "title": "Analisador de Turnover",
    "fields": [
      {
        "key": "turnoverContext",
        "label": "Contexto e periodo analisado",
        "rows": "6",
        "placeholder": "Ex.: periodo, efetivo medio, total de desligamentos, meta interna e recortes autorizados."
      },
      {
        "key": "turnoverData",
        "label": "Dados agregados de desligamentos e efetivo",
        "rows": "10",
        "placeholder": "Ex.: desligamentos por area/cargo/tempo de casa, motivos agregados, efetivo medio e dados anonimizados."
      },
      {
        "key": "analysisLimits",
        "label": "Foco, limites e cuidados",
        "rows": "4",
        "placeholder": "Ex.: foco em turnover voluntario, grupos pequenos devem ser mascarados, conclusoes como hipoteses revisaveis."
      }
    ],
    "values": {
      "turnoverContext": "Analise ficticia de turnover dos ultimos 12 meses. Efetivo medio de 240 pessoas, 42 desligamentos, meta interna de turnover anual ate 12%.",
      "turnoverData": "Dados agregados: Vendas 18 desligamentos, Atendimento 10, Tecnologia 6, Administrativo 8. Motivos anonimizados: remuneracao 32%, lideranca 24%, carreira 21%, sobrecarga 18%, outros 5%. Grupos com menos de 5 casos devem ser tratados como sensiveis.",
      "analysisLimits": "Analisar tendencias agregadas, destacar incertezas e evitar causalidade definitiva. Nao gerar ranking individual nem recomendacao de demissao ou punicao."
    },
    "kind": "definition"
  },
  {
    "agentCode": "analista_enquadramento_tributario_simples",
    "title": "Analista de Enquadramento Tributario Simples",
    "fields": [
      {
        "key": "companyProfile",
        "label": "Perfil da empresa",
        "rows": 8
      },
      {
        "key": "revenue",
        "label": "Revenue",
        "rows": 8
      },
      {
        "key": "expenses",
        "label": "Expenses",
        "rows": 8
      },
      {
        "key": "payroll",
        "label": "Payroll",
        "rows": 8
      },
      {
        "key": "currentRegime",
        "label": "Regime atual",
        "rows": 8
      },
      {
        "key": "regimes",
        "label": "Regimes",
        "rows": 8
      },
      {
        "key": "constraints",
        "label": "Restrições",
        "rows": 8
      }
    ],
    "values": {
      "companyProfile": "Empresa de servicos de tecnologia em SP, CNAE 6201-5/01, 18 colaboradores e dois socios.",
      "revenue": "Receita bruta dos ultimos 12 meses: R$ 2.180.000,00. Projecao proximo ano: R$ 2.650.000,00.",
      "expenses": "Despesas operacionais anuais informadas: R$ 840.000,00. Margem operacional estimada: 22% antes de impostos.",
      "payroll": "Folha anual informada: R$ 760.000,00, incluindo encargos estimados conforme dados internos.",
      "currentRegime": "Regime atual: Simples Nacional. A empresa quer avaliar se deve permanecer ou comparar com Lucro Presumido.",
      "regimes": "Comparar Simples Nacional, Lucro Presumido e Lucro Real apenas como simulacao preliminar.",
      "constraints": "Nao emitir parecer definitivo. Indicar lacunas para contador revisar fator R, anexos, sublimites e atividades vedadas."
    },
    "kind": "custom"
  },
  {
    "agentCode": "auditor_boas_praticas_fabricacao",
    "title": "Auditor de Boas Práticas de Fabricação (BPF)",
    "fields": [
      {
        "key": "bpfEvidence",
        "label": "Evidências observadas",
        "rows": "10",
        "placeholder": "Descrição textual de área, manipulação, higiene, armazenamento, temperatura, pragas, EPIs e registros."
      },
      {
        "key": "checklistCriteria",
        "label": "Critérios/checklist interno",
        "rows": "6",
        "placeholder": "Critérios internos, POPs, frequência, responsáveis e requisitos informados pela empresa."
      },
      {
        "key": "auditGoal",
        "label": "Objetivo da auditoria",
        "rows": "4",
        "placeholder": "Ex.: priorizar não conformidades, criar plano de ação e separar evidência de hipótese."
      }
    ],
    "values": {
      "bpfEvidence": "Área de manipulação com pia exclusiva, sabonete disponível, lixeira com pedal. Registro de temperatura da câmara incompleto em 3 dias. Ingredientes secos em prateleira alta, dois potes sem etiqueta de abertura.",
      "checklistCriteria": "Checklist interno exige identificação de lote/data de abertura, registro diário de temperatura, uniforme completo e limpeza registrada por turno.",
      "auditGoal": "Classificar riscos por severidade, listar evidências, perguntas de confirmação e ações corretivas revisáveis."
    },
    "kind": "definition"
  },
  {
    "agentCode": "auditor_conformidade",
    "title": "Auditor de Conformidade",
    "fields": [
      {
        "key": "documentContent",
        "label": "Conteudo ou processo a auditar",
        "rows": "11",
        "placeholder": "Ex.: politica, procedimento, controles, clausulas ou processo descrito em texto."
      },
      {
        "key": "referenceRules",
        "label": "Norma, politica ou criterio de referencia",
        "rows": "7",
        "placeholder": "Ex.: LGPD, ISO, politica interna, checklist regulatorio ou criterios de auditoria informados pelo usuario."
      },
      {
        "key": "auditSettings",
        "label": "Rigor, escopo e limites",
        "rows": "4",
        "placeholder": "Ex.: rigor moderado, foco em riscos altos, sem concluir conformidade legal definitiva."
      }
    ],
    "values": {
      "documentContent": "Politica interna de privacidade informa coleta de nome, e-mail e telefone para atendimento. Nao descreve prazo de retencao, canal do titular ou rotina de exclusao. Equipe comercial exporta listas para planilha compartilhada.",
      "referenceRules": "Referencial informado pelo usuario: principios de finalidade, transparencia, minimizacao, seguranca, retencao limitada e canal para exercicio de direitos.",
      "auditSettings": "Rigor moderado, priorizar riscos altos e sugestoes revisaveis. Nao emitir laudo final nem afirmar conformidade legal definitiva."
    },
    "kind": "definition"
  },
  {
    "agentCode": "auditor_conformidade_imagens",
    "title": "Auditor de Conformidade de Imagens (Controle de Qualidade)",
    "fields": [
      {
        "key": "rules",
        "label": "Regras",
        "rows": 8
      },
      {
        "key": "context",
        "label": "Contexto",
        "rows": 8
      }
    ],
    "values": {
      "rules": "Toda oferta deve informar prazo de validade e condicao principal.\nNao usar promessa de resultado garantido.\nDepoimentos exigem registro de autorizacao.\nQuando a regra depender de leitura visual real, marcar como nao_avaliavel e pedir revisao humana.",
      "context": "Campanha B2B para redes sociais em junho. Publico: gestores de pequenas empresas. Revisao final sera feita por marketing e juridico."
    },
    "kind": "custom"
  },
  {
    "agentCode": "auditor_duplicidade_pagamentos",
    "title": "Auditor de Duplicidade de Pagamentos",
    "fields": [
      {
        "key": "auditContext",
        "label": "Contexto da auditoria",
        "rows": "5",
        "placeholder": "Ex.: periodo, origem dos dados, moeda, janela de comparacao e tolerancia de valor."
      },
      {
        "key": "paymentData",
        "label": "Lista de pagamentos",
        "rows": "11",
        "placeholder": "Ex.: 10/04 Fornecedor A NF 123 R$ 4.500 boleto; 12/04 Fornecedor A NF 123 R$ 4.500 PIX; inclua observacoes conhecidas."
      },
      {
        "key": "auditRules",
        "label": "Regras, tolerancias e excecoes",
        "rows": "4",
        "placeholder": "Ex.: tolerancia R$ 0,05; janela 30 dias; pagamentos recorrentes de aluguel nao devem ser marcados como duplicidade sem evidencia."
      }
    ],
    "values": {
      "auditContext": "Auditoria ficticia de pagamentos em BRL, periodo abril/2026, janela de 30 dias e tolerancia de R$ 0,05 para arredondamento.",
      "paymentData": "10/04/2026 Tech Equipamentos NF 987 R$ 7.500 boleto; 10/04/2026 Tech Equipamentos transferencia PIX R$ 7.500 doc 987; 15/04/2026 Limpeza Brilho NF 1452 R$ 4.500; 18/04/2026 Limpeza Brilho NF 1452 R$ 4.500; 05/04/2026 Papelaria Central recibo R$ 850; 25/04/2026 Papelaria Central recibo R$ 850.",
      "auditRules": "Classificar apenas como suspeita, considerar pagamentos recorrentes e exigir conferencia humana antes de qualquer contato com fornecedor."
    },
    "kind": "definition"
  },
  {
    "agentCode": "calculador_margem_lucro",
    "title": "Calculador de Margem de Lucro",
    "fields": [
      {
        "key": "marginContext",
        "label": "Contexto da analise",
        "rows": "5",
        "placeholder": "Ex.: periodo, moeda, tipo de produto/servico, criterio de margem e objetivo da analise."
      },
      {
        "key": "salesCostData",
        "label": "Dados de vendas, custos e despesas",
        "rows": "11",
        "placeholder": "Ex.: Produto A: preco R$ 150, custo direto R$ 95, qtd 120; Produto B: preco R$ 80, custo R$ 76, qtd 300; despesas fixas R$ 45.000."
      },
      {
        "key": "calculationRules",
        "label": "Premissas, rateio e limites",
        "rows": "4",
        "placeholder": "Ex.: margem alvo 30%, rateio por faturamento, impostos fora da base, arredondamento em duas casas."
      }
    ],
    "values": {
      "marginContext": "Analise ficticia de rentabilidade mensal em BRL para portfolio de produtos e servicos, periodo abril/2026.",
      "salesCostData": "Produto Alpha: preco unitario R$ 150, custo direto R$ 95, quantidade 120. Produto Beta: preco R$ 80, custo direto R$ 76, quantidade 300. Servico Premium: preco R$ 5.000, custo direto R$ 700, quantidade 8. Despesas fixas do periodo: R$ 42.000.",
      "calculationRules": "Calcular margem bruta e contribuicao estimada. Ratear despesas por faturamento quando aplicavel. Nao considerar impostos se nao informados."
    },
    "kind": "definition"
  },
  {
    "agentCode": "calculador_perdas_sobras",
    "title": "Calculador de Perdas e Sobras",
    "fields": [
      {
        "key": "productionSalesData",
        "label": "Produção, vendas e sobras",
        "rows": "10",
        "placeholder": "Ex.: item, produzido, vendido, sobra, descarte, custo unitário, período e turno."
      },
      {
        "key": "lossContext",
        "label": "Contexto das perdas",
        "rows": "5",
        "placeholder": "Ex.: clima, evento, erro de previsão, validade, ruptura, devolução ou falha de processo."
      },
      {
        "key": "analysisGoal",
        "label": "Objetivo da análise",
        "rows": "4",
        "placeholder": "Ex.: reduzir desperdício, ajustar produção, identificar itens críticos e priorizar ações."
      }
    ],
    "values": {
      "productionSalesData": "Segunda: sanduíche natural produzido 120, vendido 87, sobra 25, descarte 8, custo R$ 5,80. Salada pote produzido 90, vendido 72, sobra 12, descarte 6, custo R$ 7,20.",
      "lossContext": "Chuva forte reduziu fluxo no almoço. Houve pedido corporativo cancelado às 10h. Validade dos sanduíches era o mesmo dia.",
      "analysisGoal": "Calcular perdas estimadas, separar hipóteses de evidências e sugerir ajustes revisáveis para próxima semana."
    },
    "kind": "definition"
  },
  {
    "agentCode": "classificador_roteador_tickets",
    "title": "Classificador e Roteador de E-mails/Tickets",
    "fields": [
      {
        "key": "ticketsInput",
        "label": "Tickets e e-mails",
        "rows": 8
      },
      {
        "key": "rulesInput",
        "label": "Regras de classificação e roteamento",
        "rows": 8
      }
    ],
    "values": {
      "ticketsInput": "ID: joao@empresa.com | Assunto: Cobranca duplicada | Mensagem: Fui cobrado duas vezes no cartao este mes. Preciso estorno hoje.\nID: maria@empresa.com | Assunto: Erro no acesso | Mensagem: Nao consigo entrar no sistema desde as 14h. Aparece erro 500 urgente.\nID: paulo@empresa.com | Assunto: Duvida comercial | Mensagem: Gostaria de cotacao para plano anual com 25 usuarios.",
      "rulesInput": "Cobranca, nota fiscal e boleto -> Financeiro.\nErro de login, indisponibilidade e bug -> Suporte.\nCotacao, proposta e upgrade -> Vendas.\nCliente VIP ou sistema fora do ar -> prioridade alta."
    },
    "kind": "custom"
  },
  {
    "agentCode": "comparador_orcamentos_fornecedores",
    "title": "Comparador de Orcamentos de Fornecedores",
    "fields": [
      {
        "key": "criteria",
        "label": "Critérios",
        "rows": 8
      },
      {
        "key": "manualInput",
        "label": "Entrada manual",
        "rows": 8
      }
    ],
    "values": {
      "criteria": "Priorizar menor preco total com prazo de entrega ate 7 dias.\nConsiderar impostos e frete no custo final.\nPreferir condicao de pagamento minima de 30 dias.",
      "manualInput": "Fornecedor A\n- Item: Caixa organizadora 50L\n- Quantidade: 20\n- Preco unitario: R$ 115,00\n- Frete: R$ 0,00\n- Prazo entrega: 5 dias\n- Pagamento: 30 dias\n\nFornecedor B\n- Item: Caixa organizadora 50L\n- Quantidade: 20\n- Preco unitario: R$ 109,00\n- Frete: R$ 180,00\n- Prazo entrega: 3 dias\n- Pagamento: 15 dias\n\nFornecedor C\n- Item: Caixa organizadora 50L\n- Quantidade: 20\n- Preco unitario: R$ 112,00\n- Frete: R$ 50,00\n- Prazo entrega: 7 dias\n- Pagamento: 45 dias"
    },
    "kind": "custom"
  },
  {
    "agentCode": "conciliador_extrato_bancario",
    "title": "Conciliador de Extrato Bancario Simples",
    "fields": [
      {
        "key": "manualStatement",
        "label": "Extrato informado manualmente",
        "rows": 8
      },
      {
        "key": "manualRules",
        "label": "Regras informadas manualmente",
        "rows": 8
      },
      {
        "key": "suggestCategories",
        "label": "Suggest Categories",
        "rows": 8
      },
      {
        "key": "ignoreLowValue",
        "label": "Ignore Low Value",
        "rows": 8
      }
    ],
    "values": {
      "manualStatement": "2026-04-20;PIX CLIENTE ALFA;2500.00;credito\n2026-04-20;PAGAMENTO FORNECEDOR XPTO;-1500.00;debito\n2026-04-21;SAQUE 24H AG 1234;-200.00;debito",
      "manualRules": "PIX CLIENTE=Recebimentos\nFORNECEDOR=Fornecedores\nSAQUE=Retirada de Caixa",
      "suggestCategories": "true",
      "ignoreLowValue": "true"
    },
    "kind": "custom"
  },
  {
    "agentCode": "conferente_documentacao_admissao",
    "title": "Conferente de Documentacao de Admissao",
    "fields": [
      {
        "key": "admissionType",
        "label": "Tipo de admissão",
        "rows": 8
      },
      {
        "key": "validationRigor",
        "label": "Validation Rigor",
        "rows": 8
      },
      {
        "key": "nationality",
        "label": "Nationality",
        "rows": 8
      },
      {
        "key": "candidateName",
        "label": "Nome do candidato",
        "rows": 8
      },
      {
        "key": "candidateCpf",
        "label": "Candidate Cpf",
        "rows": 8
      },
      {
        "key": "birthDate",
        "label": "Data de nascimento",
        "rows": 8
      },
      {
        "key": "expectedStartDate",
        "label": "Data prevista de início",
        "rows": 8
      },
      {
        "key": "role",
        "label": "Função",
        "rows": 8
      },
      {
        "key": "candidateEmail",
        "label": "E-mail do candidato",
        "rows": 8
      },
      {
        "key": "documentsText",
        "label": "Conteúdo dos documentos",
        "rows": 8
      },
      {
        "key": "customRequirements",
        "label": "Custom Requirements",
        "rows": 8
      }
    ],
    "values": {
      "admissionType": "clt\" as AdmissionType",
      "validationRigor": "medium\" as ValidationRigor",
      "nationality": "br\" as const",
      "candidateName": "Maria Eduarda Almeida Santos",
      "candidateCpf": "529.982.247-25",
      "birthDate": "1994-08-17",
      "expectedStartDate": "2026-05-20",
      "role": "Assistente Administrativo",
      "candidateEmail": "maria.eduarda.exemplo@empresa.com.br",
      "documentsText": "DOCUMENTO: RG / Documento de identificacao com foto\nNome: Maria Eduarda Almeida Santos\nRG: 45.789.123-4 SSP/SP\nCPF: 529.982.247-25\nData de nascimento: 17/08/1994\nData de emissao: 12/03/2022\nValidade: indeterminada\n\nDOCUMENTO: CPF\nNome: Maria Eduarda Almeida Santos\nCPF: 529.982.247-25\nSituacao cadastral: regular\n\nDOCUMENTO: Comprovante de residencia\nTitular: Maria Eduarda Almeida Santos\nEndereco: Rua das Acacias, 120, Apto 42, Sao Paulo/SP\nCompetencia: 04/2026\nData de emissao: 18/04/2026\n\nDOCUMENTO: ASO - Exame admissional\nNome: Maria Eduarda Almeida Santos\nCPF: 529.982.247-25\nCargo: Assistente Administrativo\nResultado: apta\nData do exame: 30/04/2026\n\nDOCUMENTO: Dados bancarios\nNome: Maria Eduarda Almeida Santos\nBanco: 341 - Itau\nAgencia: 1234\nConta: 98765-4",
      "customRequirements": "Checklist obrigatorio para admissao CLT:\n- Documento de identificacao com foto (RG, CNH ou RNE)\n- CPF regular\n- Comprovante de residencia emitido nos ultimos 3 meses\n- ASO admissional com resultado apto\n- Dados bancarios em nome do candidato\n\nCriterios de aceite:\n- Todos os documentos devem pertencer a mesma pessoa.\n- Comprovante de residencia deve ter emissao/competencia dentro de 3 meses.\n- ASO deve estar apto e coerente com o cargo informado."
    },
    "kind": "custom"
  },
  {
    "agentCode": "estruturador_prontuarios_evolucao_clinica",
    "title": "Estruturador de Prontuarios e Evolucao Clinica",
    "fields": [
      {
        "key": "patientContext",
        "label": "Dados do paciente e atendimento",
        "rows": "6",
        "placeholder": "Ex.: iniciais, idade, prontuario, especialidade, data, profissional e tipo de atendimento. Evite dados pessoais desnecessarios."
      },
      {
        "key": "clinicalNotes",
        "label": "Anotacoes clinicas fornecidas",
        "rows": "12",
        "placeholder": "Cole queixa, evolucao, exame, achados, conduta informada e orientacoes registradas pelo profissional."
      },
      {
        "key": "preferences",
        "label": "Preferencias de estruturacao",
        "rows": "4",
        "placeholder": "Ex.: SOAP completo, simplificado, incluir prescricoes mencionadas, incluir proxima consulta mencionada."
      }
    ],
    "values": {
      "patientContext": "Paciente ficticio: iniciais J.S., 42 anos, atendimento ambulatorial em ortopedia, consulta de retorno, prontuario interno 12345.",
      "clinicalNotes": "Paciente relata dor lombar ha 7 dias apos esforco fisico. Nega febre e perda de forca. Exame informado: dor a palpacao lombar baixa, Lasegue negativo, marcha preservada. Profissional registrou conduta de analgesia conforme criterio medico, orientacao postural, fisioterapia e retorno em 14 dias.",
      "preferences": "Gerar evolucao SOAP completa, separar informacoes subjetivas, objetivas, avaliacao informada e plano informado. Nao criar diagnostico novo."
    },
    "kind": "definition"
  },
  {
    "agentCode": "extrator_prazos_intimacoes",
    "title": "Extrator de Prazos e Intimações",
    "fields": [
      {
        "key": "caseInfo",
        "label": "Case Info",
        "rows": 8
      },
      {
        "key": "intimationText",
        "label": "Texto da intimação",
        "rows": 8
      },
      {
        "key": "baseDates",
        "label": "Base Dates",
        "rows": 8
      },
      {
        "key": "rules",
        "label": "Regras",
        "rows": 8
      },
      {
        "key": "constraints",
        "label": "Restrições",
        "rows": 8
      }
    ],
    "values": {
      "caseInfo": "Processo ficticio 0001234-56.2026.8.26.0000, acao de cobranca, parte autora Empresa Alfa e parte re Beta.",
      "intimationText": "Intimacao ficticia: fica a parte re intimada para apresentar manifestacao sobre documentos juntados pela parte autora, no prazo de 15 dias. Publicacao considerada em 20/05/2026. O texto nao informa feriados locais nem suspensoes processuais.",
      "baseDates": "Data de publicacao informada pelo usuario: 20/05/2026. Ciencia efetiva ainda pendente de confirmacao no sistema do tribunal.",
      "rules": "Considerar apenas prazos informados no texto. Nao calcular data fatal definitiva sem calendario oficial, feriados locais e confirmacao de ciencia.",
      "constraints": "Resultado deve servir como triagem operacional. Revisao humana obrigatoria antes de cadastrar ou cumprir qualquer prazo."
    },
    "kind": "custom"
  },
  {
    "agentCode": "extrator_precedentes",
    "title": "Extrator de Precedentes",
    "fields": [
      {
        "key": "theme",
        "label": "Tema ou tese buscada",
        "rows": 8
      },
      {
        "key": "caseContext",
        "label": "Contexto do caso",
        "rows": 8
      },
      {
        "key": "precedentMaterial",
        "label": "Material de precedentes fornecido",
        "rows": 8
      },
      {
        "key": "relevanceCriteria",
        "label": "Critérios de relevância e cautelas",
        "rows": 8
      }
    ],
    "values": {
      "theme": "Rescisao contratual por inadimplemento substancial em contrato empresarial de servicos recorrentes",
      "caseContext": "Empresa contratante avalia rescisao motivada apos atrasos sucessivos. O objetivo e organizar precedentes informados pela equipe para revisao da tese antes de peca ou parecer.",
      "precedentMaterial": "Material fornecido pelo usuario para organizacao:\n1) TJSP, Apelacao 1000000-00.2024.8.26.0100, ementa informada: rescisao contratual por inadimplemento substancial exige prova de descumprimento relevante e oportunidade de saneamento.\n2) STJ, numero informado pelo usuario REsp 0000000/UF, trecho informado: multa de rescisao pode ser afastada ou modulada quando a ruptura decorre de descumprimento da parte contraria.\n3) TJRJ, Apelacao 2000000-00.2023.8.19.0001, nota interna: atraso reiterado em entregas essenciais autorizou tutela para continuidade operacional.\nObservacao: numeros e trechos acima sao ficticios para exemplo e exigem verificacao oficial antes de uso.",
      "relevanceCriteria": "Separar tese, aderencia, cautelas de verificacao e lacunas. Nao pesquisar bases externas. Marcar todo numero, trecho e ementa como material informado pelo usuario ou pendente de verificacao oficial."
    },
    "kind": "custom"
  },
  {
    "agentCode": "extrator_quantitativos_projetos",
    "title": "Extrator de Quantitativos de Projetos",
    "fields": [
      {
        "key": "projectScope",
        "label": "Escopo e contexto do projeto",
        "rows": "6",
        "placeholder": "Ex.: reforma de pavimento comercial, disciplinas consideradas, etapa do projeto e objetivo do levantamento."
      },
      {
        "key": "sourceData",
        "label": "Dados textuais/estruturados de origem",
        "rows": "10",
        "placeholder": "Ex.: ambientes, dimensoes, itens, unidades, materiais e trechos ja transcritos de projeto ou memorial."
      },
      {
        "key": "extractionOptions",
        "label": "Criterios de agrupamento",
        "rows": "4",
        "placeholder": "Ex.: separar por ambiente, disciplina e unidade; destacar dados ausentes e premissas de calculo."
      }
    ],
    "values": {
      "projectScope": "Levantamento preliminar ficticio de quantitativos para reforma de escritorio corporativo. Escopo textual cobre drywall, pintura e piso vinilico, sem leitura automatica de pranchas.",
      "sourceData": "Sala reuniao A: parede drywall 3,20m x 2,70m, duas faces. Sala reuniao B: pintura paredes 42 m2 informados. Area open space: piso vinilico 86 m2 informados. Circulacao: rodape 38 m lineares informados.",
      "extractionOptions": "Agrupar por ambiente e servico, preservar unidade original, indicar quando o dado vem informado pelo usuario e quando dependeria de conferencia tecnica."
    },
    "kind": "definition"
  },
  {
    "agentCode": "extrator_tabulador_notas_recibos",
    "title": "Extrator e Tabulador de Notas Fiscais/Recibos",
    "fields": [
      {
        "key": "customRules",
        "label": "Regras personalizadas",
        "rows": 8
      }
    ],
    "values": {
      "customRules": "Extrair campos: data_emissao, cnpj_cpf_emissor, nome_emissor, valor_total, impostos_total, itens.\nNormalizar valores em BRL.\nClassificar categoria da despesa por contexto (material, servico, transporte, utilidades, tributos, outros).\nSinalizar confianca baixa (< 0.85) em inconsistencias."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_argumentario_vendas",
    "title": "Gerador de Argumentario de Vendas",
    "fields": [
      {
        "key": "offerContext",
        "label": "Oferta, publico e canal",
        "rows": "6",
        "placeholder": "Ex.: produto/servico, ICP, etapa da venda, canal e tom permitido."
      },
      {
        "key": "objections",
        "label": "Objecoes e evidencias permitidas",
        "rows": "9",
        "placeholder": "Ex.: objecoes frequentes, provas sociais autorizadas, diferenciais reais, limites de desconto e promessas proibidas."
      },
      {
        "key": "policyLimits",
        "label": "Politicas e limites comerciais",
        "rows": "4",
        "placeholder": "Ex.: desconto maximo depende de aprovacao; nao prometer prazo sem estoque; evitar linguagem de urgencia artificial."
      }
    ],
    "values": {
      "offerContext": "Servico B2B ficticio de automacao operacional para pequenas empresas, venda consultiva por WhatsApp e reuniao online, tom claro, educado e direto.",
      "objections": "Objecoes: preco alto, medo de implantacao demorada, duvida sobre suporte e preferencia por planilha atual. Evidencias autorizadas: reducao de retrabalho em pilotos internos e suporte assistido no onboarding.",
      "policyLimits": "Nao prometer resultado financeiro garantido, nao oferecer desconto sem aprovacao e evitar pressao artificial. Argumentos devem ser consultivos e verificaveis."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_cardapios_eventos",
    "title": "Gerador de Cardápios para Eventos",
    "fields": [
      {
        "key": "eventProfile",
        "label": "Perfil do evento",
        "rows": "6",
        "placeholder": "Quantidade de pessoas, horário, duração, tipo de serviço, ocasião e perfil do público."
      },
      {
        "key": "budgetAndRestrictions",
        "label": "Orçamento e restrições",
        "rows": "6",
        "placeholder": "Valor por pessoa, restrições alimentares, alergênicos, preferências e itens proibidos."
      },
      {
        "key": "operationContext",
        "label": "Estrutura operacional",
        "rows": "4",
        "placeholder": "Equipe, equipamentos, logística, armazenamento, montagem, reposição e limitações."
      }
    ],
    "values": {
      "eventProfile": "Evento corporativo para 80 pessoas, coffee break das 15h às 17h, público misto, serviço em buffet, duração de 2 horas.",
      "budgetAndRestrictions": "Orçamento de R$ 48 por pessoa. Incluir opções vegetarianas, sem castanhas, sinalizar lactose e glúten.",
      "operationContext": "Cozinha compacta, montagem 1 hora antes, equipe de 4 pessoas, sem fritura no local e reposição em duas ondas."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_checklist_estoque",
    "title": "Gerador de Checklist de Estoque",
    "fields": [
      {
        "key": "inventoryContext",
        "label": "Categoria e ambiente",
        "rows": "5",
        "placeholder": "Ex.: alimentos pereciveis em camara fria, eletronicos em prateleira seca ou pecas automotivas em paletes."
      },
      {
        "key": "qualityCriteria",
        "label": "Criterios de qualidade e riscos",
        "rows": "9",
        "placeholder": "Ex.: temperatura entre 2 e 6 graus, PVPS, embalagem integra, produtos afastados do piso, identificacao visivel, acoes corretivas."
      },
      {
        "key": "checklistRules",
        "label": "Frequencia, tamanho e formato",
        "rows": "4",
        "placeholder": "Ex.: inspecao diaria, checklist medio com ate 18 itens, campos para responsavel, prazo e visto do supervisor."
      }
    ],
    "values": {
      "inventoryContext": "Checklist ficticio para alimentos pereciveis armazenados em camara fria de uma unidade de distribuicao.",
      "qualityCriteria": "Verificar temperatura entre 2 e 6 graus, porta vedando, piso limpo, produtos afastados do piso e paredes, PVPS, validade visivel, embalagem integra e separacao de crus e prontos.",
      "checklistRules": "Frequencia diaria, tamanho medio, formato para impressao e espaco para nao conformidade, acao corretiva, responsavel e prazo."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_cronograma_obra",
    "title": "Gerador de Cronograma de Obra",
    "fields": [
      {
        "key": "workScope",
        "label": "Escopo da obra e entregaveis",
        "rows": "7",
        "placeholder": "Ex.: tipo de obra, principais frentes, entregaveis, marco inicial e marco desejado."
      },
      {
        "key": "constraints",
        "label": "Restricoes, dependencias e recursos",
        "rows": "8",
        "placeholder": "Ex.: equipes disponiveis, lead time de materiais, dependencias entre servicos, janelas de trabalho e riscos conhecidos."
      },
      {
        "key": "budgetData",
        "label": "Premissas de duracao e prioridade",
        "rows": "5",
        "placeholder": "Ex.: duracoes estimadas por etapa, prioridade de frentes, calendario de trabalho e folgas desejadas."
      }
    ],
    "values": {
      "workScope": "Obra ficticia de retrofit de pavimento comercial com demolicao leve, drywall, instalacoes eletricas, pintura e piso vinilico. Marco inicial previsto: semana 1.",
      "constraints": "Equipe drywall disponivel a partir da semana 2. Material eletrico depende de entrega em 10 dias. Pintura so inicia apos liberacao de paredes. Trabalho permitido de segunda a sexta.",
      "budgetData": "Duracoes estimadas: demolicao 3 dias, drywall 8 dias, eletrica 6 dias, pintura 5 dias, piso 4 dias. Priorizar liberacao de salas de reuniao antes do open space."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_diario_obra",
    "title": "Gerador de Diario de Obra",
    "fields": [
      {
        "key": "workInfo",
        "label": "Identificacao da obra e data",
        "rows": "5",
        "placeholder": "Ex.: obra, frente, data, clima informado, equipe presente, contratadas e responsavel pelo registro."
      },
      {
        "key": "dailyNotes",
        "label": "Ocorrencias e atividades do dia",
        "rows": "10",
        "placeholder": "Ex.: atividades executadas, materiais recebidos, interferencias, pendencias, seguranca, qualidade e fotos descritas em texto."
      },
      {
        "key": "nextDayPlanning",
        "label": "Planejamento e pendencias",
        "rows": "4",
        "placeholder": "Ex.: atividades previstas para o proximo dia, restricoes, materiais pendentes e pontos que exigem conferencia."
      }
    ],
    "values": {
      "workInfo": "Obra ficticia Torre Norte, pavimento 4, data 26/05/2026. Equipe informada: 6 instaladores drywall, 2 eletricistas, 1 encarregado. Clima sem impacto informado.",
      "dailyNotes": "Executada montagem de guias e montantes na sala 401. Recebidos 120 chapas de drywall, conferir nota fiscal. Interferencia: passagem eletrica pendente no corredor. Sem acidente informado. Foto 1 descrita: estrutura sala 401 iniciada.",
      "nextDayPlanning": "Planejar fechamento parcial de paredes apos liberacao eletrica. Conferir estoque de parafusos e fita. Registrar pendencia da passagem eletrica antes de avancar."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_escalas_trabalho",
    "title": "Gerador de Escalas de Trabalho",
    "fields": [
      {
        "key": "employees",
        "label": "Employees",
        "rows": 8
      },
      {
        "key": "rules",
        "label": "Regras",
        "rows": 8
      },
      {
        "key": "startDate",
        "label": "Data inicial",
        "rows": 8
      },
      {
        "key": "endDate",
        "label": "Data final",
        "rows": 8
      },
      {
        "key": "coverage",
        "label": "Coverage",
        "rows": 8
      }
    ],
    "values": {
      "employees": "Nome,Cargo,Departamento,Carga semanal,Disponibilidade,Restricoes\nAna Ribeiro,Atendente,Loja,36h,segunda a sabado 08:00-14:00,nao trabalha domingos\nBruno Lima,Atendente,Loja,36h,segunda a sabado 14:00-20:00,folga preferencial quarta\nCarla Mendes,Supervisora,Loja,40h,segunda a sexta 09:00-18:00,pode cobrir sabado pela manha\nDiego Santos,Atendente,Loja,30h,terca a domingo 16:00-22:00,indisponivel quinta\nElisa Rocha,Atendente,Loja,30h,sexta a domingo 10:00-22:00,preferencia por finais de semana",
      "rules": "Periodo de maior movimento: sexta a domingo.\nCobertura minima: 2 atendentes por turno e 1 supervisao em horario comercial.\nEvitar alocar colaborador em dois turnos no mesmo dia.\nSinalizar qualquer descanso insuficiente, hora extra potencial ou restricao nao atendida.\nPrioridade: cobertura e distribuicao equilibrada, com validacao final do RH/DP.",
      "startDate": "2026-06-01",
      "endDate": "2026-06-07",
      "coverage": "Manha 08:00-14:00, Tarde 14:00-20:00, Noite 16:00-22:00 quando houver demanda."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_fichas_tecnicas_produtos",
    "title": "Gerador de Fichas Técnicas de Produtos",
    "fields": [
      {
        "key": "productRecipe",
        "label": "Produto e formulação",
        "rows": "10",
        "placeholder": "Nome do produto, ingredientes, quantidades, rendimento, perdas, preparo e embalagem."
      },
      {
        "key": "costAndProcess",
        "label": "Custos e processo",
        "rows": "6",
        "placeholder": "Custos por ingrediente, mão de obra, embalagem, tempo, equipamentos e pontos críticos."
      },
      {
        "key": "reviewNotes",
        "label": "Validade, alérgenos e revisão",
        "rows": "5",
        "placeholder": "Validade estimada, armazenamento, alergênicos, informações ausentes e responsável por revisão."
      }
    ],
    "values": {
      "productRecipe": "Cookie de chocolate 80 g. Farinha 1 kg, manteiga 600 g, açúcar mascavo 500 g, açúcar refinado 300 g, ovos 6 un, chocolate 700 g, fermento 20 g. Rendimento estimado 38 unidades.",
      "costAndProcess": "Custo farinha R$ 5/kg, manteiga R$ 42/kg, chocolate R$ 38/kg. Mistura 20 min, descanso 30 min, forno 180 C por 14 min.",
      "reviewNotes": "Contém glúten, leite e ovos. Pode conter soja. Validade sugerida precisa validação interna; armazenamento em pote fechado."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_guia_recolhimento",
    "title": "Gerador de Guia de Recolhimento",
    "fields": [
      {
        "key": "taxType",
        "label": "Tipo de tributo",
        "rows": 8
      },
      {
        "key": "period",
        "label": "Período de apuração",
        "rows": 8
      },
      {
        "key": "companyInfo",
        "label": "Dados da empresa",
        "rows": 8
      },
      {
        "key": "calculationData",
        "label": "Dados de cálculo",
        "rows": 8
      },
      {
        "key": "reviewRules",
        "label": "Regras de revisão",
        "rows": 8
      }
    ],
    "values": {
      "taxType": "IRPJ estimado",
      "period": "05/2026",
      "companyInfo": "Cerne Comercio Ltda | CNPJ 12.345.678/0001-90 | Lucro Presumido | SP",
      "calculationData": "Empresa: Cerne Comercio Ltda\nCNPJ: 12.345.678/0001-90\nRegime informado: Lucro Presumido\nPeriodo de apuracao: 05/2026\nTributo: IRPJ estimado para conferencia\nBase informada: R$ 185.000,00\nAliquota informada pela contabilidade: 15%\nAdicional informado: R$ 1.250,00\nMulta: R$ 0,00\nJuros: R$ 0,00\nObservacao: validar codigo de receita e vencimento no sistema oficial antes de preencher a guia.",
      "reviewRules": "Conferir codigo de receita, vencimento e valores no sistema oficial antes do preenchimento. Revisao obrigatoria por contador responsavel."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_matriz_risco_simplificada",
    "title": "Gerador de Matriz de Risco Simplificada",
    "fields": [
      {
        "key": "activity",
        "label": "Activity",
        "rows": 8
      },
      {
        "key": "exposed",
        "label": "Exposed",
        "rows": 8
      },
      {
        "key": "criteria",
        "label": "Critérios",
        "rows": 8
      },
      {
        "key": "existingControls",
        "label": "Existing Controls",
        "rows": 8
      },
      {
        "key": "context",
        "label": "Contexto",
        "rows": 8
      }
    ],
    "values": {
      "activity": "Descarga de caminhoes com empilhadeira e movimentacao manual na doca",
      "exposed": "Operadores de empilhadeira, auxiliares de recebimento, conferente e motoristas terceiros.",
      "criteria": "Escala qualitativa simples: probabilidade baixa/media/alta e impacto baixo/medio/alto; nivel final baixo/medio/alto/critico.",
      "existingControls": "Faixa pintada no piso, cones, checklist diario de empilhadeira, EPI basico e supervisor de turno.",
      "context": "Atividade: descarga de caminhoes com empilhadeira e movimentacao manual de volumes na doca.\nExpostos: operadores de empilhadeira, auxiliares de recebimento, conferente e motoristas terceiros.\nFrequencia: diaria, dois turnos, pico entre 8h e 11h.\nPerigos observados:\n- Cruzamento de pedestres com rota de empilhadeira.\n- Paletes temporariamente posicionados fora da faixa demarcada.\n- Ruido elevado durante descarga simultanea de dois veiculos.\n- Piso com risco de escorregamento quando ha vazamento de oleo ou chuva na doca.\nControles existentes: faixa pintada no piso, cones, checklist diario de empilhadeira, EPI basico e supervisor de turno.\nLacunas conhecidas: sem medicao recente de ruido; treinamento de reciclagem planejado mas nao concluido."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_parecer_juridico",
    "title": "Gerador de Parecer Juridico",
    "fields": [
      {
        "key": "area",
        "label": "Área",
        "rows": 8
      },
      {
        "key": "legalQuestion",
        "label": "Legal Question",
        "rows": 8
      },
      {
        "key": "caseFacts",
        "label": "Case Facts",
        "rows": 8
      },
      {
        "key": "providedMaterial",
        "label": "Provided Material",
        "rows": 8
      },
      {
        "key": "reviewConstraints",
        "label": "Restrições para revisão",
        "rows": 8
      }
    ],
    "values": {
      "area": "Contratos empresariais",
      "legalQuestion": "Quais sao os fundamentos e riscos para rescisao motivada de contrato de servicos recorrentes diante de atrasos sucessivos?",
      "caseFacts": "Cliente: empresa de tecnologia contratante de servicos recorrentes.\nContrato assinado em 10/02/2025 com prazo inicial de 24 meses.\nClausula de rescisao preve aviso previo de 60 dias e multa proporcional de 20% sobre parcelas vincendas.\nFornecedor atrasou entregas criticas em marco, abril e maio de 2026.\nHouve notificacao extrajudicial enviada em 08/05/2026 com pedido de saneamento em 10 dias.\nO fornecedor respondeu reconhecendo atraso, mas atribuiu a dependencia de informacoes do cliente.\nObjetivo: avaliar caminhos de rescisao motivada, riscos de multa e documentos adicionais para decisao.",
      "providedMaterial": "Trecho contratual informado pelo usuario:\n- Clausula 8.2: descumprimento material nao sanado em 10 dias permite rescisao por justa causa.\n- Clausula 9.1: multa por rescisao imotivada sera proporcional ao saldo contratual.\nMaterial de apoio informado pelo usuario:\n- Notificacao extrajudicial de 08/05/2026.\n- E-mails de acompanhamento com cronograma revisado.\n- Ata de reuniao de 17/05/2026 com reconhecimento de pendencias.",
      "reviewConstraints": "Nao usar bases externas. Tratar citacoes como material informado pelo usuario. Destacar lacunas documentais e revisar com advogado responsavel antes de qualquer notificacao ou decisao."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_pdi",
    "title": "Gerador de PDI",
    "fields": [
      {
        "key": "employeeContext",
        "label": "Dados do colaborador e objetivo",
        "rows": "6",
        "placeholder": "Ex.: cargo atual, tempo de empresa, objetivo de desenvolvimento, cargo-alvo opcional e contexto da area."
      },
      {
        "key": "performanceFeedback",
        "label": "Feedbacks, competencias e gaps",
        "rows": "10",
        "placeholder": "Ex.: pontos fortes, oportunidades, competencias avaliadas, feedback do gestor e evidencias comportamentais."
      },
      {
        "key": "planPreferences",
        "label": "Preferencias do PDI",
        "rows": "4",
        "placeholder": "Ex.: duracao de 6 meses, metodologia 70/20/10, foco em lideranca, dados e comunicacao."
      }
    ],
    "values": {
      "employeeContext": "Caso ficticio: Analista de Marketing Pleno ha 2 anos na empresa, com objetivo de preparar evolucao para coordenacao em 12 meses, sem decisao automatizada de promocao.",
      "performanceFeedback": "Pontos fortes: criatividade, relacionamento com pares e execucao de campanhas. Oportunidades: lideranca de projetos complexos, analise de indicadores e priorizacao. Feedbacks indicam necessidade de mais autonomia e comunicacao com stakeholders.",
      "planPreferences": "PDI de 6 meses, metodologia 70/20/10, foco equilibrado entre comportamento e tecnica, metas revisaveis mensalmente por gestor, RH e colaborador."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_plano_acao",
    "title": "Gerador de Plano de Acao",
    "fields": [
      {
        "key": "goal",
        "label": "Objetivo",
        "rows": 8
      },
      {
        "key": "owner",
        "label": "Owner",
        "rows": 8
      },
      {
        "key": "targetDate",
        "label": "Data-alvo",
        "rows": 8
      },
      {
        "key": "constraints",
        "label": "Restrições",
        "rows": 8
      },
      {
        "key": "context",
        "label": "Contexto",
        "rows": 8
      }
    ],
    "values": {
      "goal": "Recuperar SLA critico do suporte B2B para 95% ate o fim de junho.",
      "owner": "Coordenacao de suporte",
      "targetDate": "30/06/2026",
      "constraints": "Sem contratacao imediata; limite de R$ 6 mil mensais para automacao e treinamento.",
      "context": "Problema: aumento do tempo medio de resposta no suporte B2B.\nMeta atual: responder 95% dos chamados criticos em ate 4 horas uteis.\nResultado atual: 84% dentro do SLA nas ultimas 4 semanas.\nCausas levantadas: triagem manual, falta de base de conhecimento atualizada e fila concentrada em dois analistas senior.\nRestricoes: sem contratacao imediata; orcamento mensal disponivel de R$ 6 mil para automacao e treinamento.\nPrazo alvo: recuperar SLA ate o fim de junho.\nRecursos: coordenador de suporte, dois analistas senior, tres analistas junior e apoio parcial de produto."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_plano_seguranca",
    "title": "Gerador de Plano de Seguranca",
    "fields": [
      {
        "key": "activityContext",
        "label": "Contexto da atividade",
        "rows": 8
      },
      {
        "key": "riskData",
        "label": "Dados de risco",
        "rows": 8
      },
      {
        "key": "legalContext",
        "label": "Contexto jurídico",
        "rows": 8
      },
      {
        "key": "objectives",
        "label": "Objectives",
        "rows": 8
      }
    ],
    "values": {
      "activityContext": "Atividade: manutencao preventiva em esteiras transportadoras de uma industria alimenticia.\nAmbiente: area produtiva com circulacao de operadores, energia eletrica, pontos de esmagamento e limpeza umida.\nEquipe: manutencao propria com 4 tecnicos e apoio do supervisor de producao.\nRotina: paradas programadas quinzenais, com necessidade de bloqueio, sinalizacao e liberacao da area.",
      "riskData": "Riscos informados:\n- choque eletrico em paineis e motores;\n- aprisionamento ou esmagamento em partes moveis;\n- escorregamento por piso umido;\n- interferencia de operadores durante a manutencao;\n- falha de comunicacao na liberacao da maquina.\n\nControles atuais: bloqueio eletrico com cadeado, permissao de trabalho simples, treinamento anual e uso de luvas, oculos e calcado de seguranca.",
      "legalContext": "Considerar revisao interna alinhada a procedimentos de seguranca aplicaveis, sem declarar conformidade legal definitiva. Exigir validacao por responsavel habilitado antes de uso formal.",
      "objectives": "Gerar minuta operacional com riscos prioritarios, controles, plano de acao, treinamentos, EPIs/EPCs, indicadores, lacunas e proximos passos."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_propostas_comerciais",
    "title": "Gerador de Propostas Comerciais Personalizadas",
    "fields": [
      {
        "key": "clientName",
        "label": "Nome do cliente",
        "rows": 8
      },
      {
        "key": "companyName",
        "label": "Nome da empresa",
        "rows": 8
      },
      {
        "key": "clientContext",
        "label": "Contexto do cliente",
        "rows": 8
      },
      {
        "key": "offerDetails",
        "label": "Detalhes da oferta",
        "rows": 8
      },
      {
        "key": "itemsText",
        "label": "Dados dos itens",
        "rows": 8
      },
      {
        "key": "templateText",
        "label": "Conteúdo do modelo",
        "rows": 8
      }
    ],
    "values": {
      "clientName": "Mariana Ribeiro",
      "companyName": "Clínica Vida Plena",
      "clientContext": "A Clínica Vida Plena possui duas unidades em Belo Horizonte e quer reduzir faltas em consultas, melhorar o acompanhamento de pacientes recorrentes e organizar campanhas de retorno.\n\nHoje a equipe comercial e recepção usam WhatsApp, planilhas e lembretes manuais, o que gera retrabalho e perda de oportunidades.\n\nA decisão será tomada pela diretora administrativa e pelo sócio médico, com foco em implantação rápida, segurança dos dados e clareza no retorno esperado.",
      "offerDetails": "Implantação de uma solução de CRM e automação de relacionamento para clínicas, incluindo funil de atendimento, lembretes automatizados, campanhas de reativação e painel gerencial.\n\nA proposta deve destacar redução de faltas, padronização do atendimento, visão de indicadores e ganho de produtividade da equipe.\n\nCondições comerciais: contrato anual, implantação em até 21 dias, treinamento remoto e suporte mensal incluso.",
      "itemsText": "Diagnóstico operacional - Mapeamento dos fluxos atuais de atendimento, agenda, retorno e reativação de pacientes.\nConfiguração do CRM - Cadastro de etapas, responsáveis, campos personalizados, automações e modelos de comunicação.\nCampanhas de reativação - Segmentação de pacientes inativos e criação de jornadas de contato por perfil.\nTreinamento da equipe - Duas sessões remotas para recepção, coordenação e gestão.\nSuporte mensal - Acompanhamento de indicadores, ajustes finos e apoio operacional por 12 meses.",
      "templateText": "Modelo padrão da empresa:\n1. Abertura consultiva com contexto do cliente.\n2. Objetivos do projeto e desafios identificados.\n3. Solução proposta em linguagem simples e comercial.\n4. Escopo, investimento, condições de pagamento e validade.\n5. Próximos passos claros, com convite para aprovação e início do projeto.\nTom de voz: profissional, próximo, objetivo e persuasivo, sem exageros."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_receita_medica",
    "title": "Gerador de Receita Medica",
    "fields": [
      {
        "key": "prescriptionNotes",
        "label": "Prescricao ou ditado do profissional",
        "rows": "10",
        "placeholder": "Ex.: medicamento, apresentacao, posologia, duracao, orientacoes, exames ou atestado informados pelo profissional."
      },
      {
        "key": "patientData",
        "label": "Dados clinicos contextuais",
        "rows": "5",
        "placeholder": "Ex.: iniciais, idade, peso se informado, alergias mencionadas e observacoes relevantes. Evite dados pessoais desnecessarios."
      },
      {
        "key": "documentOptions",
        "label": "Tipo de documento desejado",
        "rows": "4",
        "placeholder": "Ex.: receita simples, pedido de exame, atestado, orientacoes de uso. Nao gerar assinatura ou envio."
      }
    ],
    "values": {
      "prescriptionNotes": "Profissional informou: amoxicilina 500mg de 8 em 8 horas por 7 dias; dipirona 500mg se dor ou febre; soro fisiologico nasal 4 vezes ao dia; retorno se piora clinica.",
      "patientData": "Paciente ficticio adulto, sem peso informado. Alergia nao informada. Registro para rascunho interno antes de revisao e assinatura do medico.",
      "documentOptions": "Organizar como rascunho de receita simples e orientacoes gerais. Nao incluir assinatura, carimbo, envio externo ou decisao autonoma."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_relatorio_executivo",
    "title": "Gerador de Relatorio Executivo",
    "fields": [
      {
        "key": "objective",
        "label": "Objetivo",
        "rows": 8
      },
      {
        "key": "period",
        "label": "Período de apuração",
        "rows": 8
      },
      {
        "key": "audience",
        "label": "Audience",
        "rows": 8
      },
      {
        "key": "detailLevel",
        "label": "Nível de detalhe",
        "rows": 8
      },
      {
        "key": "inputs",
        "label": "Inputs",
        "rows": 8
      }
    ],
    "values": {
      "objective": "Gerar relatorio executivo mensal de performance operacional para decisao da diretoria.",
      "period": "Maio/2026",
      "audience": "Diretoria executiva e lideres de operacao",
      "detailLevel": "executivo completo",
      "inputs": "Periodo: Maio/2026\nObjetivo: consolidar desempenho operacional para diretoria.\nReceita recorrente: R$ 428 mil, crescimento de 8% contra abril.\nChurn: 2,1%, queda de 0,4 p.p. no mes.\nSLA de atendimento: 91% dentro do prazo, abaixo da meta de 95%.\nBacklog critico: 18 tickets, concentrados nos clientes Alfa, Bento e Norte.\nEquipe: duas vagas abertas em suporte nivel 2; absenteismo operacional de 3,8%.\nRisco principal: crescimento do backlog pode comprometer renovacoes enterprise em junho.\nOportunidade: automacao de triagem reduziu 14 horas semanais na operacao piloto."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_respostas_faq",
    "title": "Gerador de Respostas para Duvidas Frequentes (FAQ)",
    "fields": [
      {
        "key": "supportBase",
        "label": "Base de atendimento",
        "rows": 8
      },
      {
        "key": "sourceUrls",
        "label": "Fontes e URLs",
        "rows": 8
      },
      {
        "key": "existingQuestions",
        "label": "Perguntas existentes",
        "rows": 8
      }
    ],
    "values": {
      "supportBase": "Politica de trocas: Troca em ate 7 dias corridos com nota fiscal e produto sem sinais de uso.\nPrazo de entrega: Capitais em ate 3 dias uteis. Interior em ate 7 dias uteis.\nAtendimento: Segunda a sexta, 9h as 18h, exceto feriados nacionais.\nGarantia: 12 meses contra defeitos de fabricacao.",
      "sourceUrls": "https://empresa.com/politica-de-troca\nhttps://empresa.com/faq",
      "existingQuestions": "Como funciona a troca?\nQual o prazo de entrega?\nQual o horario de atendimento?"
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_resumo_obrigacoes_acessorias",
    "title": "Gerador de Resumo de Obrigacoes Acessorias",
    "fields": [
      {
        "key": "obligationType",
        "label": "Tipo de obrigação",
        "rows": 8
      },
      {
        "key": "period",
        "label": "Período de apuração",
        "rows": 8
      },
      {
        "key": "taxRegime",
        "label": "Tax Regime",
        "rows": 8
      },
      {
        "key": "sources",
        "label": "Sources",
        "rows": 8
      },
      {
        "key": "financialData",
        "label": "Dados financeiros",
        "rows": 8
      },
      {
        "key": "taxParameters",
        "label": "Tax Parameters",
        "rows": 8
      },
      {
        "key": "notes",
        "label": "Notes",
        "rows": 8
      }
    ],
    "values": {
      "obligationType": "EFD Contribuicoes",
      "period": "Abril/2026",
      "taxRegime": "Lucro Presumido, empresa de servicos em SP.",
      "sources": "Relatorio mensal de faturamento, resumo de compras, relatorio de retencoes e conciliacao de notas emitidas.",
      "financialData": "Receita bruta informada: R$ 185.000,00.\nServicos tributados: R$ 172.000,00.\nCancelamentos: R$ 3.500,00.\nRetencoes informadas: PIS R$ 1.100,00, COFINS R$ 5.080,00, CSLL R$ 1.850,00.\nCompras e despesas com documentos pendentes: R$ 24.700,00.",
      "taxParameters": "CNAE informado: 6201-5/01. Parametros e aliquotas devem ser conferidos pela contabilidade antes de entrega oficial.",
      "notes": "Nao transmitir declaracao. Preparar checklist de revisao e campos ausentes para o responsavel fiscal."
    },
    "kind": "custom"
  },
  {
    "agentCode": "gerador_rotulos_nutricionais",
    "title": "Gerador de Rótulos Nutricionais",
    "fields": [
      {
        "key": "formulaAndPortion",
        "label": "Formulação e porção",
        "rows": "10",
        "placeholder": "Ingredientes, quantidades, rendimento, porção, perdas e modo de preparo."
      },
      {
        "key": "nutritionData",
        "label": "Dados nutricionais disponíveis",
        "rows": "7",
        "placeholder": "Valores por ingrediente, laudos, bases usadas, energia, macros, sódio, fibras e dados ausentes."
      },
      {
        "key": "labelWarnings",
        "label": "Alérgenos e avisos",
        "rows": "5",
        "placeholder": "Alérgenos, contém/pode conter, glúten, lactose, público-alvo e revisão técnica necessária."
      }
    ],
    "values": {
      "formulaAndPortion": "Granola 1 kg: aveia 500 g, mel 180 g, castanha 120 g, uva passa 100 g, coco 60 g, óleo 40 g. Rendimento final 920 g. Porção pretendida 40 g.",
      "nutritionData": "Dados nutricionais disponíveis são estimativas internas por ingrediente. Energia e macros precisam revisão. Não há laudo laboratorial.",
      "labelWarnings": "Contém aveia e castanhas. Pode conter amendoim. Avaliar glúten conforme fornecedor. Revisão por nutricionista obrigatória."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerador_script_atendimento",
    "title": "Gerador de Script de Atendimento",
    "fields": [
      {
        "key": "serviceContext",
        "label": "Contexto do atendimento",
        "rows": "6",
        "placeholder": "Ex.: tipo de solicitacao, canal, perfil do cliente, tom desejado e objetivo do contato."
      },
      {
        "key": "policyAndFlow",
        "label": "Politicas, fluxo e limites de alcada",
        "rows": "9",
        "placeholder": "Ex.: o que o atendente pode resolver, quando escalar, prazos oficiais e informacoes que nao devem ser prometidas."
      },
      {
        "key": "variationNeeds",
        "label": "Variacoes desejadas",
        "rows": "4",
        "placeholder": "Ex.: abertura, sondagem, resposta para cliente irritado, encerramento e follow-up."
      }
    ],
    "values": {
      "serviceContext": "Atendimento ficticio via chat para cliente que pergunta sobre atraso de entrega. Tom empatico, objetivo e sem prometer prazo nao confirmado.",
      "policyAndFlow": "Atendente pode consultar status interno informado pelo cliente, registrar protocolo e escalar casos acima de 48h. Nao prometer reembolso, prioridade ou data exata sem aprovacao.",
      "variationNeeds": "Incluir abertura, perguntas de identificacao minima, resposta empatica, caminhos de escalonamento e encerramento com protocolo."
    },
    "kind": "definition"
  },
  {
    "agentCode": "gerenciador_validade_estoque_perecivel",
    "title": "Gerenciador de Validade e Estoque Perecível",
    "fields": [
      {
        "key": "inventoryValidity",
        "label": "Estoque e validade",
        "rows": "10",
        "placeholder": "Item, lote, quantidade, validade, data de abertura, armazenamento, custo e giro."
      },
      {
        "key": "salesAndProductionPlan",
        "label": "Vendas e produção planejadas",
        "rows": "6",
        "placeholder": "Pedidos, produção, promoções permitidas, consumo previsto e restrições."
      },
      {
        "key": "validityRules",
        "label": "Regras sanitárias e internas",
        "rows": "5",
        "placeholder": "Ex.: bloquear vencidos, priorizar FEFO, limites de desconto, descarte e responsáveis."
      }
    ],
    "values": {
      "inventoryValidity": "Iogurte lote A: 48 un, validade 02/07/2026, custo R$ 3,20, giro 12 un/dia. Frango desfiado lote B: 8 kg, validade 30/06/2026, aberto em 27/06, uso médio 3 kg/dia.",
      "salesAndProductionPlan": "Produção de wraps amanhã usa 5 kg de frango. Promoção permitida para itens com 2 dias de validade, desde que não estejam vencidos.",
      "validityRules": "FEFO obrigatório. Produto vencido não pode ser vendido. Descarte precisa registro e aprovação do gerente."
    },
    "kind": "definition"
  },
  {
    "agentCode": "limpador_padronizador_banco_dados",
    "title": "Limpador e Padronizador de Banco de Dados",
    "fields": [
      {
        "key": "dataInput",
        "label": "Dados de entrada",
        "rows": 8
      },
      {
        "key": "rulesInput",
        "label": "Regras de classificação e roteamento",
        "rows": 8
      },
      {
        "key": "removeDuplicates",
        "label": "Remove Duplicates",
        "rows": 8
      },
      {
        "key": "fixDates",
        "label": "Fix Dates",
        "rows": 8
      },
      {
        "key": "capitalizeNames",
        "label": "Capitalize Names",
        "rows": 8
      },
      {
        "key": "normalizeEmails",
        "label": "Normalize Emails",
        "rows": 8
      }
    ],
    "values": {
      "dataInput": "id,nome,email,cpf,data_nascimento,cidade\n1, joao silva ,JOAO@EXEMPLO.COM,123.456.789-01,15/01/1980,Sao paulo\n2,MARIA  SOUZA,maria.souza@exemplo.com,98765432109,1992-05-20,Rio de janeiro\n3,Joao Silva,joao@exemplo.com,12345678901,1980/01/15,Sao Paulo\n4,Ana Lima,,111.222.333-44,,Curitiba",
      "rulesInput": "Remover espacos extras em nomes.\nPadronizar emails em minusculas.\nCPF deve conter apenas numeros.\nDatas devem ficar no formato YYYY-MM-DD.\nSinalizar duplicatas por CPF e email.",
      "removeDuplicates": "true",
      "fixDates": "true",
      "capitalizeNames": "true",
      "normalizeEmails": "true"
    },
    "kind": "custom"
  },
  {
    "agentCode": "otimizador_compras_ingredientes",
    "title": "Otimizador de Compras de Ingredientes",
    "fields": [
      {
        "key": "inventoryAndDemand",
        "label": "Estoque, consumo e produção planejada",
        "rows": "10",
        "placeholder": "Ingredientes, estoque atual, consumo médio, receitas/eventos, demanda prevista e unidade de medida."
      },
      {
        "key": "validitySuppliers",
        "label": "Validade, fornecedores e lead time",
        "rows": "5",
        "placeholder": "Validade atual, prazo de entrega, lote mínimo, preço, capacidade de armazenamento e restrições."
      },
      {
        "key": "purchaseRules",
        "label": "Regras de compra",
        "rows": "4",
        "placeholder": "Ex.: priorizar perecíveis, estoque de segurança, limite de orçamento, evitar compras com validade curta."
      }
    ],
    "values": {
      "inventoryAndDemand": "Farinha 35 kg em estoque, consumo médio 8 kg/dia, produção planejada 420 pães e 60 bolos. Ovos 14 dúzias, consumo 4 dúzias/dia. Leite 24 L, consumo 9 L/dia.",
      "validitySuppliers": "Fornecedor A entrega em 2 dias, lote mínimo farinha 25 kg. Leite vence em 5 dias. Ovos vencem em 12 dias. Orçamento semanal R$ 1.800.",
      "purchaseRules": "Manter estoque de segurança de 2 dias, reduzir perda por validade e sinalizar itens críticos antes de recomendar compra."
    },
    "kind": "definition"
  },
  {
    "agentCode": "otimizador_rotas",
    "title": "Otimizador de Rotas de Entrega/Visitas",
    "fields": [
      {
        "key": "pointsInput",
        "label": "Dados dos pontos",
        "rows": 8
      },
      {
        "key": "fleetInput",
        "label": "Dados da frota",
        "rows": 8
      },
      {
        "key": "rulesInput",
        "label": "Regras de classificação e roteamento",
        "rows": 8
      }
    ],
    "values": {
      "pointsInput": "Rua A, 120 - Centro - Curitiba/PR | janela: 09:00-10:00 | prioridade: alta\nAv. B, 455 - Batel - Curitiba/PR | janela: 10:30-12:00 | prioridade: media\nRua C, 88 - Agua Verde - Curitiba/PR | janela: 13:00-15:00 | prioridade: alta\nRua D, 1020 - Portao - Curitiba/PR | janela: 15:30-17:30 | prioridade: baixa",
      "fleetInput": "VAN_01 | capacidade: 900kg | inicio: 08:00 | fim: 18:00 | deposito: Rua X, 10 - Curitiba/PR\nMOTO_03 | capacidade: 80kg | inicio: 08:00 | fim: 17:00 | deposito: Rua X, 10 - Curitiba/PR",
      "rulesInput": "Evitar vias com restricao para caminhoes.\nPriorizar entregas de alta prioridade no periodo da manha.\nTempo medio de parada por ponto: 15 minutos."
    },
    "kind": "custom"
  },
  {
    "agentCode": "planejador_conteudo_redes_sociais",
    "title": "Planejador de Conteudo para Redes Sociais",
    "fields": [
      {
        "key": "objective",
        "label": "Objetivo",
        "rows": 8
      },
      {
        "key": "audience",
        "label": "Audience",
        "rows": 8
      },
      {
        "key": "channels",
        "label": "Channels",
        "rows": 8
      },
      {
        "key": "period",
        "label": "Período de apuração",
        "rows": 8
      },
      {
        "key": "tone",
        "label": "Tone",
        "rows": 8
      },
      {
        "key": "pillars",
        "label": "Pillars",
        "rows": 8
      },
      {
        "key": "constraints",
        "label": "Restrições",
        "rows": 8
      }
    ],
    "values": {
      "objective": "Planejar duas semanas de conteudo para divulgar o Plano Pro e gerar conversas qualificadas sem prometer retorno garantido.",
      "audience": "Donos e gestores de pequenas empresas de servicos que precisam organizar atendimento, vendas e rotina operacional.",
      "channels": "Instagram Feed, Instagram Stories, LinkedIn",
      "period": "2026-06-01 a 2026-06-14, com 3 publicacoes por semana e stories de apoio.",
      "tone": "Consultivo, direto, pratico e confiavel.",
      "pillars": "Educacao: dicas praticas de produtividade para pequenas empresas.\nProva social: bastidores, depoimentos autorizados e aprendizados de clientes sem promessa garantida.\nOferta: apresentar o Plano Pro com foco em rotina operacional.\nRelacionamento: perguntas para gerar conversa com gestores.",
      "constraints": "Evitar promessas absolutas. Toda oferta deve incluir condicao principal e convite para diagnostico."
    },
    "kind": "custom"
  },
  {
    "agentCode": "planejador_producao_diaria",
    "title": "Planejador de Produção Diária",
    "fields": [
      {
        "key": "dailyDemand",
        "label": "Demanda e pedidos do dia",
        "rows": "8",
        "placeholder": "Pedidos, previsão, itens prioritários, horários de entrega, quantidades e restrições."
      },
      {
        "key": "capacityStock",
        "label": "Capacidade, equipe e estoque",
        "rows": "7",
        "placeholder": "Equipe disponível, equipamentos, tempos, estoque, validade e gargalos."
      },
      {
        "key": "planningRules",
        "label": "Regras de priorização",
        "rows": "4",
        "placeholder": "Ex.: priorizar validade curta, entregas B2B, limpeza entre alergênicos e pausas da equipe."
      }
    ],
    "values": {
      "dailyDemand": "Produzir 180 marmitas até 11h, 60 saladas até 10h, 40 bolos individuais até 15h. Pedido corporativo de 80 marmitas sai às 10h30.",
      "capacityStock": "Equipe: 3 cozinheiros e 2 auxiliares. Forno comporta 8 formas por ciclo. Arroz suficiente para 220 porções, frango vence amanhã, salada tem validade de 1 dia.",
      "planningRules": "Priorizar itens com entrega cedo e ingredientes com validade curta. Separar preparo com glúten e sem glúten."
    },
    "kind": "definition"
  },
  {
    "agentCode": "previsao_demanda",
    "title": "Previsao de Demanda",
    "fields": [
      {
        "key": "demandHistory",
        "label": "Historico de demanda e vendas",
        "rows": "10",
        "placeholder": "Ex.: vendas mensais por SKU/categoria, tendencia, sazonalidade, rupturas conhecidas e eventos."
      },
      {
        "key": "stockPosition",
        "label": "Estoque, lead time e restricoes",
        "rows": "7",
        "placeholder": "Ex.: estoque atual por item, prazo de reposicao, pedidos em aberto, lote minimo e restricoes de fornecedor."
      },
      {
        "key": "forecastSettings",
        "label": "Horizonte e objetivo",
        "rows": "4",
        "placeholder": "Ex.: horizonte 60 dias, nivel de servico 95%, priorizar alertas de ruptura sem prometer compra ideal."
      }
    ],
    "values": {
      "demandHistory": "SKU A vendeu 120, 130, 125, 160 e 190 unidades nos ultimos meses, com pico em campanhas. SKU B vendeu 80 unidades mensais, mas teve ruptura em dois periodos. Categoria acessorios fica estavel entre 95 e 105 unidades.",
      "stockPosition": "SKU A tem 70 unidades em estoque e lead time de 20 dias. SKU B tem 15 unidades, pedido em aberto de 50 unidades e lead time de 30 dias. SKU C tem 500 unidades com giro baixo.",
      "forecastSettings": "Horizonte de 60 dias, nivel de servico desejado 95%, sinalizar risco e sugestoes revisaveis sem ordem automatica de compra."
    },
    "kind": "definition"
  },
  {
    "agentCode": "qualificador_leads",
    "title": "Qualificador de Leads (Lead Scoring)",
    "fields": [
      {
        "key": "criteriaText",
        "label": "Critérios de análise",
        "rows": 8
      },
      {
        "key": "freeText",
        "label": "Texto livre",
        "rows": 8
      }
    ],
    "values": {
      "criteriaText": "ICP prioritario: empresas B2B de tecnologia, logistica ou servicos profissionais com 50 a 500 colaboradores.\nDar mais peso para decisores comerciais, financeiros e operacionais com dor clara de automacao, reducao de retrabalho ou aumento de produtividade.\nPriorizar leads vindos de indicacao, formulario do site, demo solicitada ou interacao recente com materiais comerciais.\nReduzir prioridade quando houver apenas curiosidade inicial, cargo sem poder de decisao ou ausencia de urgencia declarada.",
      "freeText": "Lead 1\nNome: Ana Beatriz Rocha\nEmail: ana.rocha@alphatech.com.br\nTelefone: (11) 98877-1122\nEmpresa: AlphaTech Sistemas\nCargo: Diretora Comercial\nSetor: Tecnologia B2B\nOrigem: Solicitou demo no site\nObservacoes: Empresa com 180 colaboradores, equipe comercial em expansao e necessidade declarada de priorizar oportunidades com IA ainda neste trimestre.\n\nLead 2\nNome: Marcos Vinicius Prado\nEmail: marcos.prado@varejomax.com.br\nTelefone: (21) 97766-4421\nEmpresa: VarejoMax\nCargo: Coordenador de Marketing\nSetor: Varejo\nOrigem: Baixou material educativo\nObservacoes: Demonstrou interesse inicial, mas ainda esta comparando solucoes e nao informou prazo de contratacao.\n\nLead 3\nNome: Camila Souza\nEmail: camila.souza@email.com\nTelefone: (31) 96655-7788\nEmpresa: Autonoma\nCargo: Consultora independente\nSetor: Consultoria\nOrigem: Mensagem em rede social\nObservacoes: Busca entender precos para uso individual e nao possui equipe comercial estruturada."
    },
    "kind": "custom"
  },
  {
    "agentCode": "selecionador_ranqueador_curriculos",
    "title": "Selecionador e Ranqueador de Curriculos",
    "fields": [
      {
        "key": "jobTitle",
        "label": "Cargo",
        "rows": 8
      },
      {
        "key": "jobDescription",
        "label": "Descrição da vaga",
        "rows": 8
      },
      {
        "key": "required",
        "label": "Requisitos obrigatórios",
        "rows": 8
      },
      {
        "key": "desired",
        "label": "Desired",
        "rows": 8
      },
      {
        "key": "resumes",
        "label": "Resumes",
        "rows": 8
      },
      {
        "key": "weightsMode",
        "label": "Weights Mode",
        "rows": 8
      },
      {
        "key": "minExperience",
        "label": "Min Experience",
        "rows": 8
      },
      {
        "key": "expectedEducation",
        "label": "Expected Education",
        "rows": 8
      },
      {
        "key": "minScore",
        "label": "Min Score",
        "rows": 8
      },
      {
        "key": "recommendedCount",
        "label": "Recommended Count",
        "rows": 8
      },
      {
        "key": "reportStyle",
        "label": "Estilo do relatório",
        "rows": 8
      }
    ],
    "values": {
      "jobTitle": "Analista de Departamento Pessoal",
      "jobDescription": "Empresa de servicos B2B em crescimento busca Analista de Departamento Pessoal para atuar em admissao, rescisao, ferias, ponto eletronico, beneficios e suporte aos gestores. A pessoa sera responsavel por conferir documentos admissionais, alimentar sistemas de folha, acompanhar prazos legais e apoiar a comunicacao com colaboradores. A vaga exige rotina presencial hibrida, organizacao, sigilo com dados sensiveis e boa comunicacao com areas internas.",
      "required": "Experiencia comprovada em Departamento Pessoal.\nConhecimento em admissao, rescisao, ferias, folha de pagamento e controle de ponto.\nDominio de Excel ou Google Sheets para controles operacionais.\nConhecimento basico de eSocial, DCTFWeb e prazos trabalhistas.\nBoa comunicacao, organizacao e atencao a detalhes.",
      "desired": "Experiencia com sistema Domínio, Sênior ou similar.\nVivencia em empresas de servicos ou consultorias.\nConhecimento em beneficios corporativos e atendimento a colaboradores.\nNoções de indicadores de RH e auditoria documental.",
      "resumes": "CURRICULO 1 - Mariana Lopes\nEmail: mariana.lopes@email.com\nExperiencia: 4 anos em Departamento Pessoal, atuando com admissoes, rescisões, ferias, folha mensal, beneficios e controle de ponto para empresa com 180 colaboradores. Utiliza Excel avancado, sistema Domínio e acompanha eventos do eSocial. Formação: Tecnologa em Gestao de Recursos Humanos. Pontos fortes: organizada, boa comunicacao com colaboradores e historico de reducao de pendencias documentais.\n\n---\n\nCURRICULO 2 - Bruno Almeida\nEmail: bruno.almeida@email.com\nExperiencia: 2 anos como assistente administrativo com apoio ao RH. Realizou controle de ponto, arquivo de documentos, atendimento a colaboradores e lancamentos simples de beneficios. Pouca experiencia com rescisao e folha. Formação: cursando Administracao. Pontos fortes: disponibilidade imediata, perfil analitico e facilidade com planilhas.\n\n---\n\nCURRICULO 3 - Camila Ferreira\nEmail: camila.ferreira@email.com\nExperiencia: 6 anos em Departamento Pessoal em consultoria contábil, atendendo multiplos clientes. Forte vivencia em admissao, rescisao, ferias, folha, eSocial, DCTFWeb e atendimento a fiscalizacoes. Conhece sistemas Sênior e Domínio. Formação: Bacharel em Ciências Contábeis. Pontos fortes: autonomia, profundidade técnica e experiência em alto volume.",
      "weightsMode": "default",
      "minExperience": "3",
      "expectedEducation": "graduacao",
      "minScore": "70",
      "recommendedCount": "3",
      "reportStyle": "executivo"
    },
    "kind": "custom"
  },
  {
    "agentCode": "sintetizador_jurisprudencia",
    "title": "Sintetizador de Jurisprudencia",
    "fields": [
      {
        "key": "legalQuestion",
        "label": "Legal Question",
        "rows": 8
      },
      {
        "key": "precedentText",
        "label": "Material de precedentes",
        "rows": 8
      },
      {
        "key": "context",
        "label": "Contexto",
        "rows": 8
      },
      {
        "key": "criteria",
        "label": "Critérios",
        "rows": 8
      },
      {
        "key": "constraints",
        "label": "Restrições",
        "rows": 8
      }
    ],
    "values": {
      "legalQuestion": "Sintetizar entendimentos sobre multa contratual em atraso de entrega de servico B2B, usando apenas os trechos ficticios abaixo.",
      "precedentText": "Trecho ficticio 1: TJ/SP, Apelacao 0000001-00.2025.8.26.0000, ementa informada pelo usuario indica reducao equitativa de multa quando ha excesso manifesto. Trecho ficticio 2: STJ, referencia informada pelo usuario, menciona necessidade de observar proporcionalidade e prova do prejuizo. Trecho ficticio 3: TJ/MG, ementa informada aponta manutencao da multa quando pactuada entre empresas e sem abusividade demonstrada.",
      "context": "Caso interno: contrato de prestacao de servicos entre empresas, atraso de 18 dias e clausula penal de 20% sobre valor mensal.",
      "criteria": "Separar convergencias, divergencias e riscos. Nao assumir que as referencias foram consultadas em base oficial.",
      "constraints": "Resultado deve apoiar revisao de advogado. Nao declarar pesquisa completa, atualizada ou oficial."
    },
    "kind": "custom"
  },
  {
    "agentCode": "sintetizador_reunioes_atas",
    "title": "Sintetizador de Reunioes e Gerador de Atas",
    "fields": [
      {
        "key": "title",
        "label": "Título",
        "rows": 8
      },
      {
        "key": "meetingDate",
        "label": "Data da reunião",
        "rows": 8
      },
      {
        "key": "place",
        "label": "Place",
        "rows": 8
      },
      {
        "key": "participants",
        "label": "Participants",
        "rows": 8
      },
      {
        "key": "agenda",
        "label": "Agenda",
        "rows": 8
      },
      {
        "key": "transcript",
        "label": "Transcript",
        "rows": 8
      }
    ],
    "values": {
      "title": "Reuniao semanal de operacoes",
      "meetingDate": "22/05/2026",
      "place": "Sala online - Operacoes",
      "participants": "Marina Costa, Rafael Lima, Camila Torres",
      "agenda": "1. Revisar atraso do cliente Alfa\n2. Definir responsaveis por comunicacao e estoque\n3. Registrar proximos passos e prazo de acompanhamento",
      "transcript": "Reuniao semanal de operacoes - 22/05/2026\nMarina abriu a reuniao revisando o atraso de 12 pedidos do cliente Alfa.\nRafael explicou que o gargalo principal foi a conferencia manual de estoque.\nDecidiu-se migrar a conferencia do lote Alfa para o painel de ruptura ate sexta-feira.\nCamila ficara responsavel por enviar comunicado ao cliente com novo prazo ate 23/05.\nA equipe tambem alinhou que toda divergencia acima de 3 itens deve virar ticket no mesmo dia.\nProxima reuniao sugerida para 29/05/2026 as 10h."
    },
    "kind": "custom"
  },
  {
    "agentCode": "tradutor_manuais_pops",
    "title": "Tradutor de Manuais Tecnicos e POPs",
    "fields": [
      {
        "key": "targetLanguage",
        "label": "Idioma de destino",
        "rows": 8
      },
      {
        "key": "manualText",
        "label": "Texto informado manualmente",
        "rows": 8
      },
      {
        "key": "glossary",
        "label": "Glossary",
        "rows": 8
      }
    ],
    "values": {
      "targetLanguage": "en",
      "manualText": "MANUAL TECNICO - TROCA DO FILTRO PRINCIPAL\nEquipamento: Unidade de filtragem industrial UF-300\nAntes de iniciar o procedimento, desligue a alimentacao eletrica no painel principal e confirme ausencia de pressao na linha.\n1. Feche a valvula de entrada.\n2. Aguarde 3 minutos para alivio de pressao residual.\n3. Remova a tampa superior utilizando chave Allen 6 mm.\n4. Substitua o elemento filtrante e confira se a vedacao O-ring esta corretamente posicionada.\n5. Reinstale a tampa e abra lentamente a valvula de entrada.\nCriterio de aceite: nao deve haver vazamento visivel durante 5 minutos de operacao.",
      "glossary": "Unidade de filtragem = filtration unit\nVálvula de entrada = inlet valve\nAlívio de pressão residual = residual pressure relief\nElemento filtrante = filter element\nCritério de aceite = acceptance criterion"
    },
    "kind": "custom"
  },
  {
    "agentCode": "triador_guias_convenio",
    "title": "Triador de Guias de Convenio",
    "fields": [
      {
        "key": "guideData",
        "label": "Dados da guia",
        "rows": "10",
        "placeholder": "Cole numero da guia, paciente, convenio, plano, procedimento, datas, valores e campos preenchidos."
      },
      {
        "key": "clinicalJustification",
        "label": "Justificativa clinica informada",
        "rows": "7",
        "placeholder": "Cole diagnostico, indicacao, laudo ou observacoes fornecidas pelo profissional."
      },
      {
        "key": "payerRules",
        "label": "Regras conhecidas do convenio",
        "rows": "4",
        "placeholder": "Ex.: cobertura conhecida, autorizacoes necessarias, limites, exigencias documentais ou observacoes internas."
      }
    ],
    "values": {
      "guideData": "Guia ficticia 98765. Convenio Saude Plus, plano executivo. Procedimento solicitado: ressonancia de coluna lombar. Diagnostico informado: lombalgia persistente. Data da guia 20/05/2026. Valor informado R$ 620,00. Numero de autorizacao pendente.",
      "clinicalJustification": "Paciente com dor lombar persistente ha 6 semanas, sem melhora com medidas iniciais. Profissional informa necessidade de exame para avaliacao complementar.",
      "payerRules": "Regra interna conhecida: exames de imagem exigem autorizacao previa, pedido medico com CID e justificativa clinica. Conferir carencia e frequencia."
    },
    "kind": "definition"
  },
  {
    "agentCode": "validador_nfe",
    "title": "Validador de NFe",
    "fields": [
      {
        "key": "nfeData",
        "label": "Dados da NFe",
        "rows": 8
      },
      {
        "key": "orderData",
        "label": "Dados do pedido",
        "rows": 8
      },
      {
        "key": "toleranceRules",
        "label": "Regras de tolerância",
        "rows": 8
      },
      {
        "key": "reviewContext",
        "label": "Contexto da revisão",
        "rows": 8
      }
    ],
    "values": {
      "nfeData": "NFe: 55890\nEmissor: Distribuidora Alfa Ltda\nCNPJ emissor: 23.456.789/0001-10\nValor produtos: R$ 15.250,00\nFrete: R$ 200,00\nValor total: R$ 15.450,00\nItens:\n- Notebook Pro 14 | 10 un | R$ 800,00 | total R$ 8.000,00\n- Monitor 27 | 50 un | R$ 105,00 | total R$ 5.250,00\n- Cabo USB-C | 40 un | R$ 50,00 | total R$ 2.000,00",
      "orderData": "Pedido: PC-1045\nFornecedor negociado: Distribuidora Alfa Ltda\nFrete negociado: CIF por conta do fornecedor\nValor total negociado: R$ 14.500,00\nItens:\n- Notebook Pro 14 | 10 un | R$ 800,00 | total R$ 8.000,00\n- Monitor 27 | 50 un | R$ 100,00 | total R$ 5.000,00\n- Cabo USB-C | 30 un | R$ 50,00 | total R$ 1.500,00",
      "toleranceRules": "Divergencias de valor acima de R$ 50,00 ou quantidade diferente devem ir para revisao humana. Frete divergente exige validacao do comprador.",
      "reviewContext": "Conferencia antes de liberar pagamento ao fornecedor. Nao tomar decisao automatica; registrar recomendacao para financeiro e compras."
    },
    "kind": "custom"
  }
] as const;
