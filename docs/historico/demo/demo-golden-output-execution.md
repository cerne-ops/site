# Demo Core — snapshots reais dos 68 agentes

> **Status histórico:** coleta e publicação concluídas. O estado vigente da Demo deve ser conferido em `docs/README.md`, no código atual e na produção pública.

## Resultado

- [x] 68 cenários oficiais do botão `Exemplo` inventariados.
- [x] 68 agentes contratados na organização produtiva sintética e isolada `Codex Smoke Lote 12`.
- [x] 68 execuções aprovadas pelo Core real, sem fallback genérico e sem truncamento.
- [x] Todas as execuções finais confirmaram `usage.non_billable=true` por usarem a política oficial `example_preview`.
- [x] Entradas preservadas em modo somente leitura e vinculadas ao resultado correspondente.
- [x] Artefato público sanitizado: sem credenciais, tokens, ids internos, modelo, consumo ou dados de clientes.
- [x] Resultados carregados sob demanda apenas após o CTA `Executar análise`.

## Arquivos

- Cenários de entrada: `src/lib/core-demo-scenarios.generated.ts`.
- Snapshots públicos: `src/lib/core-demo-golden-results.generated.ts`.
- Coletor repetível: `execution/run_core_demo_snapshots.mjs`.
- Renderização: `src/components/site/DemoWorkspace.tsx`.

## Controles da coleta

1. Identidade `@example.invalid`, vinculada exclusivamente à empresa sintética.
2. Senha efêmera rotacionada em cada execução e nunca persistida no artefato.
3. Chamada interna ao Core em Produção, uma por vez, sem alteração de código, schema, configuração ou runtime.
4. Política oficial do frontend: `mode=example_preview` e `source=core_agent_example`.
5. Checkpoint após cada agente e retomada por `agent_code`.
6. Até três tentativas para HTTP 502/503/504, saída vazia ou truncada.
7. Falha isolada por agente; os demais continuam e os pendentes entram em nova passada.
8. Agentes longos podem receber limite editorial de palavras para concluir dentro do timeout, sem remover entradas ou seções essenciais.

## Gates de qualidade

- 68 resultados e 68 códigos únicos.
- Nenhum agente ausente ou adicional.
- Entradas byte a byte iguais ao cenário oficial inventariado.
- Checksum SHA-256 da saída válido.
- `non_billable=true` em todas as execuções.
- Nenhuma resposta truncada, vazia ou com fallback textual genérico.
- Verificação semântica reforçada para Sentimentos, Propostas, Notas/Recibos e Tradução.
- Lint direcionado e build de produção verdes.
- QA visual desktop/mobile, sem overflow horizontal e sem scroll interno na sidebar.
- CTA do Trial exibido abaixo do resultado, sem modal cobrindo a análise.

## Evidências do QA semântico

- Sentimentos: 5 avaliações; distribuição 40% positiva, 20% neutra e 40% negativa.
- Proposta Comercial: cliente `Mariana Ribeiro`, empresa `Clínica Vida Plena`, 6 seções e 7 benefícios.
- Notas/Recibos: 2 arquivos metadata-only, 2 linhas e 4 inconsistências explícitas, sem inventar conteúdo fiscal.
- Tradução: 1 manual traduzido para inglês e 7 termos-chave.

## Publicação

O trabalho foi publicado posteriormente. Novas publicações continuam exigindo autorização explícita e devem seguir `directives/deploy_vps.md`, com commit/push, deploy VPS, smoke público e validação da versão ativa.
