# Design QA — Demo de Agentes CerneOps

## Escopo

Validação do protótipo navegável escolhido pelo usuário a partir da referência visual:

- Referência: `/Users/matheusnascimento/.codex/generated_images/01a0157a-f115-70d0-bdd8-2ec29a960031/exec-7c0ff209-e2ca-4080-8ff6-eef52dbc36b7.png`
- Implementação: `/Users/matheusnascimento/Repositórios/cerne_dev/site/src/components/site/DemoWorkspace.tsx`
- Evidência desktop inicial revisada: `/Users/matheusnascimento/Repositórios/cerne_dev/site/.tmp/demo-core-aligned-initial.png`
- Evidência desktop resultado revisada: `/Users/matheusnascimento/Repositórios/cerne_dev/site/.tmp/demo-core-aligned-result.png`
- Evidência desktop CTA inline revisada: `/Users/matheusnascimento/Repositórios/cerne_dev/site/.tmp/demo-core-aligned-trial-inline.png`
- Evidência mobile revisada: `/Users/matheusnascimento/Repositórios/cerne_dev/site/.tmp/demo-core-aligned-mobile.png`
- URL local: `http://127.0.0.1:4173/demo`
- Viewport desktop: 1440×1024 CSS px; captura 1440×1024 px; device scale 1.
- Viewport mobile: 390×844 CSS px; área útil observada 375×844 px; device scale 1.
- A referência fornecida e as capturas foram comparadas em escala 1:1, sem downsample ou moldura de dispositivo.
- Comparação full-view: composição do workspace, header, sidebar, formulário e hierarquia do resultado.
- Comparação focada: estrutura do resultado do KPI e CTA de Trial abaixo do conteúdo; não foi usada sobreposição de modal.

## Critérios verificados

| Critério | Resultado |
| --- | --- |
| Identidade CerneOps: fundo escuro, grid, laranja, glass panels, header e footer existentes | Passou |
| Modal de primeiro acesso fora da rota `/demo` | Passou |
| CTA “Testar agora” navega para `/demo` | Passou |
| “Testar depois” fecha e registra a decisão no `localStorage` | Passou |
| Agentes agrupados por setor, com busca e expansão | Passou |
| Agente inicial “Analisador de KPIs” selecionado | Passou |
| Interface fiel ao fluxo do Core, com três textareas, exemplo, execução e resultado estruturado | Passou |
| Entradas simuladas carregadas automaticamente e campos somente leitura | Passou |
| Aviso explícito de demonstração simulada | Passou |
| Copy atualizado: “simulados”, disclaimer sem promessa de envio/processamento e CTA com fidelidade aos Agentes IA Especialistas do Core CerneOps | Passou |
| Execução simulada sem chamada de API/Core | Passou |
| Resultado simulado com resumo, premissas, incertezas, destaques, tabela, hipóteses e próximos passos | Passou |
| CTA pós-demo inline com link para `https://cerneops.com.br/planos/trial` | Passou |
| Resultado permanece totalmente visível, sem modal sobrepondo o conteúdo | Passou |
| Compatibilidade automática com novos agentes vindos do catálogo existente | Passou |
| Desktop em 1440×1024 | Passou |
| Mobile em 390×844 sem overflow horizontal após ajuste | Passou |
| Console do navegador sem erros ou warnings durante o fluxo final | Passou |
| Troca rápida de agente não reapresenta resultado de uma execução anterior | Passou |
| “Exportar relatório” gera arquivo local da saída simulada | Passou |

## Interações executadas

1. Abertura da home e confirmação do modal “Teste uma demonstração de nossos agentes”.
2. Clique em “Testar agora” e navegação para `/demo`.
3. Busca/expansão de setores e seleção do agente.
4. Execução direta da demonstração com entradas simuladas somente leitura.
5. Confirmação do resultado estruturado alinhado ao Core.
6. Confirmação do href exato do CTA de Trial.
7. Confirmação de que não existe dialog aberto após a execução.
8. Validação mobile e confirmação de overflow horizontal desativado.

## Ajustes encontrados durante a QA

- A seleção inicial foi ajustada para priorizar “Analisador de KPIs”, mantendo a referência de demonstração imediatamente compreensível.
- Os campos do KPI foram alinhados à definição real do Core: “KPIs e metas”, “Contexto e eventos” e “Foco da análise”, usando textareas e exemplos do agente.
- O resultado foi refeito para seguir o contrato visual do `ConstructionAgentPage` real: aviso de revisão, resumo, listas, tabela e próximos passos.
- O modal de Trial foi removido e substituído por um CTA inline abaixo do resultado, eliminando a obstrução apontada.
- Os campos de entrada foram convertidos para `readOnly`, sem `onChange`, sem redimensionamento e sem elementos `contenteditable`.
- O botão “Novo” apenas reinicia os valores simulados; não limpa nem abre edição de entrada.
- O painel lateral recebeu `min-w-0 overflow-hidden` para evitar overflow horizontal em telas estreitas.

## Histórico de comparação

- Iteração anterior — P1: cards de métricas e modal de Trial divergiam do fluxo real do Core e cobriam o resultado.
- Correção aplicada: substituição por resultado estruturado do agente e CTA inline pós-resultado.
- Evidência pós-correção: `demo-core-aligned-result.png` e `demo-core-aligned-trial-inline.png`; nenhum P0/P1/P2 restante.
- QA independente encontrou uma condição de corrida durante troca rápida de agente e um exportador sem ação.
- Correção aplicada: token de execução invalida timers antigos ao trocar/reiniciar agente; exportação implementada como `.txt` local.
- Evidência pós-correção: troca rápida sem `demo-result`, exportação acionável e logs limpos.
- Iteração atual: campos de entrada identificados como editáveis no protótipo.
- Correção aplicada: entradas pré-carregadas, `readOnly`, saída visual não editável e fluxo executável sem digitação.
- Evidência pós-correção: `demo-core-aligned-initial.png`, `demo-core-aligned-result.png` e `demo-core-aligned-mobile.png`.

## Verificações técnicas

- `npm run build`: passou; sitemap gerado com 78 URLs.
- ESLint direcionado aos arquivos alterados: passou.
- `npm run lint` geral: permanece com erros de formatação preexistentes em arquivos fora deste protótipo; não foram introduzidos como parte do fluxo Demo.
- ESLint direcionado após a correção: passou.
- Fluxo mobile: `overflow=false`, CTA visível, `dialogCount=0`.
- Estado somente leitura: 3 textareas, `allReadOnly=true`, `contentEditableCount=0`.
- Logs finais do navegador: nenhum erro ou warning.

## Resultado

final result: passed
