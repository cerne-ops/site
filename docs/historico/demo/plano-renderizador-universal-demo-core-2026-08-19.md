# Plano de execução — renderizador universal dos Agentes DEMO

> **Status histórico:** plano concluído e publicado; a versão citada abaixo é a versão da entrega, não a versão pública atual.

Data: 2026-08-19  
Risco: P2 — regressão visual/funcional relevante no Site  
Autorização: implementação aprovada pelo usuário; publicação segue condicionada ao gate de QA e à autorização já concedida no contexto desta entrega.

## Objetivo

Fazer com que todos os Agentes DEMO apresentem os resultados reais captados do Core com a mesma linguagem visual e hierarquia de informação do produto, por meio de regras reutilizáveis — sem criar um layout artesanal por agente.

## Arquitetura-alvo

- Três arquétipos extraídos do Core: analítico/KPI, tabular/extrator e textual/documental.
- Um parser semântico capaz de reconhecer títulos, avisos, métricas, tabelas, listas, checklists, evidências, riscos e próximos passos.
- Um conjunto único de componentes visuais baseado nos tokens do Core.
- Seleção automática de composição conforme o conteúdo, com fallback estruturado seguro e nunca texto Markdown cru.
- Conteúdo dos snapshots preservado integralmente; somente a apresentação será normalizada.

## Fase 1 — descoberta e contrato

- [x] Mapear três resultados representativos e os componentes reais do Core.
- [x] Inventariar os 68 cenários, snapshots e formatos de saída do Site.
- [x] Definir contrato semântico, arquétipos e regras de seleção.
- [x] Identificar regressões atuais: inglês, Markdown cru, tabelas quebradas e conteúdo omitido.

## Fase 2 — implementação

- [x] Implementar parser semântico determinístico e testável.
- [x] Implementar componentes compartilhados de resultado.
- [x] Integrar o renderizador universal ao `DemoWorkspace`.
- [x] Remover a dependência de um renderer exclusivo por agente.
- [x] Manter entradas e saídas somente leitura e o CTA de Trial após o resultado.
- [x] Atualizar versão pública do Site para `0.S1.29`.

## Fase 3 — QA completo

- [x] Validar 100% dos agentes por script: cenário, snapshot, conteúdo não vazio e ausência de Markdown cru.
- [x] Validar português e ausência de rótulos técnicos em inglês na interface.
- [x] Validar os três arquétipos visualmente em desktop e mobile.
- [x] Validar acessibilidade básica, tabelas responsivas e navegação por teclado.
- [x] Executar lint direcionado, build e `git diff --check`.
- [x] Obter revisão independente e corrigir bloqueadores.

## Fase 4 — release do Site

- [x] Commit e push intencionais em `main`.
- [x] Pre-check da topologia VPS/Nginx/PM2 conforme `directives/deploy_vps.md`.
- [x] Atualização `ff-only`, build e restart do processo `cerne-site`.
- [x] Confirmar commit, versão e ausência de runtime de desenvolvimento.

## Fase 5 — smoke de produção

- [x] `/demo` e rotas principais respondem com sucesso.
- [x] Testar pelo menos um agente de cada arquétipo em produção.
- [x] Confirmar conteúdo real, tabelas/cards/listas, somente leitura e CTA de Trial.
- [x] Confirmar PM2, porta 4173 e cache de assets.

## Rollback

Registrar o commit anterior no pre-check. Se build, inicialização ou smoke crítico falhar, interromper a promoção e manter a versão anterior. Qualquer rollback destrutivo seguirá o SOP e exigirá evidência objetiva do motivo.

## Fechamento

- QA sem bloqueadores.
- Cobertura automatizada de todo o catálogo.
- DEV e QA fechados sem subagentes pendentes.
- Relatório final com commit, versão, build, PM2, smokes e riscos residuais.
