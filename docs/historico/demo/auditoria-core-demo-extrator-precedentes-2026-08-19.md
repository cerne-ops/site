# Auditoria comparativa — Extrator de Precedentes

> **Status histórico:** diagnóstico anterior às correções posteriores da Demo. As divergências descritas aqui não representam automaticamente a produção atual.

Data: 2026-08-19
Escopo: comparação somente leitura entre o resultado real aberto no Core e o resultado publicado na Demo do site.

## Diagnóstico executivo

A Demo não reproduz o contrato visual nem o contrato de dados do Extrator de Precedentes do Core. O Core consome uma resposta estruturada, normaliza os campos jurídicos e os distribui em componentes semânticos próprios. A Demo publica um snapshot textual em Markdown e o interpreta com um renderizador genérico que transforma títulos, parágrafos e listas em cartões independentes.

O desvio é arquitetural, não apenas de CSS. Ajustar cores, bordas ou espaçamentos no renderizador Markdown não produzirá fidelidade ao Core.

## 1. Entrada do agente

Saúde: crítica.

### Core

- Tema ou tese buscada
- Contexto do caso
- Material de precedentes fornecido
- Critérios de relevância e cautelas

### Demo

- Theme
- Case Context
- Precedent Material
- Relevance Criteria

### Causa confirmada

O gerador de cenários captura os nomes internos dos estados React (`theme`, `caseContext`, `precedentMaterial`, `relevanceCriteria`) e a função `fieldLabel` apenas separa camelCase e capitaliza a primeira letra. Como esses campos não estão no mapa de traduções, os nomes técnicos em inglês chegam ao snapshot público.

## 2. Estrutura do resultado

Saúde: crítica.

### Core

O resultado é uma composição única e especializada:

1. cabeçalho `Extração gerada`, contagem de tokens e exportações CSV, JSON, PDF e TXT;
2. aviso jurídico em destaque âmbar;
3. cartão de título e resumo;
4. tabela principal com `Tribunal`, `Número`, `Tese`, `Aderência` e `Cautela`;
5. cartões de trechos relevantes;
6. painéis de teses identificadas, lacunas, checklist de verificação e próximos passos.

### Demo

O snapshot é um documento Markdown longo. O renderizador genérico cria um cartão para cada título de nível 1 a 3 e cartões menores para fatos e itens de lista. O resultado fica excessivamente vertical, fragmentado e sem a hierarquia jurídica do Core.

### Evidência quantitativa da tela analisada

| Medida                    |                Core | Demo |
| ------------------------- | ------------------: | ---: |
| Títulos                   |                   7 |   25 |
| Seções/cartões principais | 0 cartões genéricos |   22 |
| Tabelas                   |                   1 |    1 |
| Ações de exportação       |                   4 |    1 |

A Demo apresentou ainda 118 elementos com tratamento visual ciano, reforçando uma linguagem visual inexistente no resultado real analisado.

## 3. Conteúdo e paridade

Saúde: insuficiente.

Embora as entradas-base sejam equivalentes, o snapshot da Demo não é o mesmo objeto estruturado utilizado pela interface do Core. A Demo mostra uma redação diferente e mais extensa, organizada em oito capítulos de Markdown. O Core mostra um resumo operacional, três precedentes em tabela e os blocos semânticos esperados pelo agente.

Isso impede rastreabilidade visual entre entrada, resposta capturada e experiência real do produto.

## 4. Riscos de experiência

- O visitante aprende uma interface que não encontrará no Core.
- Termos técnicos em inglês reduzem confiança e sugerem produto inacabado.
- A fragmentação em muitos cartões aumenta o esforço de leitura e dilui os achados jurídicos prioritários.
- A tabela central do Core, que permite comparação rápida entre precedentes, desaparece como estrutura principal.
- O fallback genérico mascara ausência de suporte visual específico e pode afetar outros agentes de forma silenciosa.

## 5. Solução recomendada

### Contrato do snapshot

Cada snapshot publicável deve preservar:

- `agentCode`;
- `rendererKey` ou `schemaKey`;
- campos de entrada com `key`, rótulo oficial em português e valor;
- resposta estruturada usada pelo Core;
- saída textual bruta apenas como apoio de exportação/auditoria;
- versão do contrato e data da captura.

### Renderização

Criar um registro de renderizadores por contrato ou família visual. Para `extrator_precedentes`, reutilizar a mesma normalização e reproduzir a composição do Core: cabeçalho, aviso, resumo, tabela de cinco colunas, trechos, teses, lacunas, checklist e próximos passos.

O renderizador Markdown deve permanecer somente como fallback técnico para conteúdo ainda não publicado. Um agente sem contrato visual suportado não deve entrar automaticamente em produção com aparência genérica; deve ficar pendente de validação.

### Escala para todos os agentes

Inventariar os contratos estruturados do Core e agrupá-los em famílias reutilizáveis — tabela, métricas, documento, checklist, timeline, comparação e cards semânticos. Agentes com estrutura singular recebem adaptador próprio. Isso evita 68 cópias rígidas sem sacrificar fidelidade.

## 6. Critérios de aceite

- 100% dos rótulos visíveis em português e iguais aos do Core.
- Mesma ordem, hierarquia e nomenclatura de seções do Core.
- Mesmas colunas e conteúdo semântico da tabela principal.
- Avisos, resumo, estados vazios e ações equivalentes ao produto real.
- Nenhum agente publicado usando o fallback Markdown genérico.
- Comparação visual no mesmo viewport e estado, com revisão lado a lado.
- Teste responsivo e de navegação por teclado sem perda de conteúdo.

## Limites da evidência

A auditoria cobre o estado real aberto do Extrator de Precedentes e o estado correspondente da Demo em produção. Não valida ainda os contratos visuais dos demais agentes; eles devem ser auditados por família antes de uma correção global.
