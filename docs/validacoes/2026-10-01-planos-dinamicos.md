# Correção local — integração visual dos planos

Data: 2026-10-01. Escopo aprovado: implementação e validação local do Site. Sem publicação, migration ou alteração do Admin/Core.

## Causa confirmada

No build original `15acf6dbf384f818a089923ca8199c49fe3585c5`, a página Boost conservava preço e limites como `—` e mostrava 9 agentes. Abrindo seu modal, os mesmos dados em memória eram exibidos corretamente: R$ 139,00/mês, 5 usuários e 25 agentes. A API pública respondia corretamente.

O `applyTextCatalog` conserva o primeiro conteúdo do nó em `originalText` e restaura esse valor em PT-BR nas varreduras do MutationObserver. Os campos assíncronos atualizados pelo React podiam voltar aos placeholders ou aos valores estáticos iniciais. A correção usa a exclusão já existente `data-i18n-frozen` somente nos campos com formatação/tradução explícita, sem mudar o tradutor global.

## Alteração

- Preço, descrição dinâmica, contagem de agentes, valores de capacidade e resumo do modal ficam sob controle do React.
- Hook compartilhado identifica a consulta por plano e tentativa; descarta respostas de páginas desmontadas e não reaproveita dados de outro plano durante navegação.
- Carregamento e falha têm mensagem PT-BR/EN-US; o usuário pode tentar novamente.
- Consulta sem resposta termina em 15 segundos; catálogo vazio é tratado como indisponibilidade.
- Removido o fallback estático de quantidade de agentes dos planos pagos. Preços continuam exclusivamente vindos do Admin.

## Validação executada

1. Build original: reprodução em navegador, divergência entre página e modal confirmada.
2. Build corrigido (`npm run build`, preservando cenários versionados com `CORE_REPO_PATH=/tmp/site-demo-use-committed-scenarios`): sucesso.
3. Navegador no adaptador Node de produção: home e cinco páginas de plano em PT-BR e EN-US, navegação home/detalhe/home, preços, contagens e capacidades conferidos com API pública. Modal Boost aberto/fechado sem restaurar placeholders. Sem erros de console nessa validação.
4. API pública observada:

| Plano | Preço BRL/mês | Usuários | Agentes | Tarefas/dia | Tarefas/mês |
| --- | ---: | ---: | ---: | ---: | ---: |
| Trial | 0 | 1 | 58 | 10 | 10 |
| Start | 59 | 1 | 12 | 10 | 200 |
| Boost | 139 | 5 | 25 | 40 | 1200 |
| Scale | 279 | 15 | 40 | 120 | 4000 |
| Dominus | 479 | 30 | 58 | 300 | 10000 |

Esses valores são evidência datada, não configuração do produto. Retenção do Dominus veio nula da API e permanece como `—`; não foi inventado um limite.

5. Build separado contra simulador HTTP local, usando cópia da resposta pública: HTTP 503, catálogo vazio e resposta pendente geraram indisponibilidade explícita; nova tentativa com atraso de 2,5 segundos recuperou os dados. Mensagens verificadas em ambos os idiomas. Timeout de 15 segundos conferido na home. Nenhuma simulação alterou serviços remotos.
6. Build final regenerado sem a variável do simulador e confirmado novamente com a API real.
7. ESLint dos cinco arquivos alterados, `git diff --check` e `npm run qa:demo-results`: sucesso.
8. `tsc --noEmit`: 17 erros TS1117 preexistentes em `DemoWorkspace.tsx`; saída comparada byte a byte com o checkout original, sem novos erros. Verificação global de TypeScript não passa na base atual.
9. GET público de `/login` e `/signup?plan=boost` do Core: HTTP 200. Não foram submetidos cadastro, e-mail ou pagamento; isso não constitui validação funcional desses fluxos.

## Limites e preservação

- Validação feita pelo mesmo executor; não representa QA independente.
- O servidor Vite local apresentou 404 na entrada virtual do cliente; os testes foram concluídos no adaptador Node de produção, inclusive os cenários simulados.
- Alteração preexistente em `site/directives/deploy_vps.md` preservada. `origin/main` foi atualizado via fetch e correspondia ao SHA base acima.
- Branch isolada: `codex/site-planos-20261001`. Não houve push, merge ou deploy.
- Publicação depende de autorização específica e do SOP vigente do Site, com versão, SHA de release/rollback, smoke e observação.
