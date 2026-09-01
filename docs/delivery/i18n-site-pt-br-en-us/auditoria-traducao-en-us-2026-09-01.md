# Auditoria de strings EN-US — Site CerneOps

Data: 2026-09-01  
Superfície: Site público CerneOps  
Worktree local: `.worktrees/site-i18n-local`  
Branch: `codex/site-i18n-local`  
Ambiente de validação: `http://127.0.0.1:4323`

## Escopo da auditoria

- Auditar strings visíveis que continuavam em PT-BR quando o seletor estava em EN-US.
- Traduzir as strings identificadas sem alterar layout, cor, posição, hierarquia visual ou identidade.
- Manter Demos funcionando em PT-BR e traduzir a experiência visível em EN-US por alternância estática de strings.
- Manter Academia omitida em EN-US.
- Evitar execução/tradução em tempo real de conteúdo externo; quando necessário, usar conteúdo estático local em EN-US.

## Principais fontes de vazamento encontradas

| Área | Problema encontrado | Correção aplicada |
|---|---|---|
| Planos na home | Cards recebiam `short_description` do Admin/API em PT-BR | EN-US passou a usar catálogo estático local traduzido; PT-BR mantém comportamento atual |
| Página `/planos/:slug` | Teaser, público, capacidade, CTAs e modal ainda misturavam PT-BR e EN-US | Página passou a usar copy localizada por idioma e preço BRL com sufixo textual `/month` em EN-US |
| Tradutor global de DOM | Walker sobrescrevia texto já renderizado em EN-US pelo React quando não havia tradução no mapa | Walker agora só altera nós com tradução explícita, sem desfazer conteúdo localizado por React |
| Home institucional | Seções Core/Supra, benefícios, setores e CTAs tinham entradas faltantes no catálogo | Strings adicionadas ao catálogo EN-US |
| `/porque` | Oito razões estavam totalmente em PT-BR | Criada versão estática EN-US das oito razões, preservando referências citadas no texto |
| `/agentes-cerneops` | Catálogo em EN-US ainda podia receber copy externa do Admin em PT-BR | EN-US usa catálogo local dos 68 agentes; PT-BR continua usando catálogo oficial do Admin |
| `/agentes/:slug` | Páginas dos agentes usavam Markdown PT-BR | Criada camada local de tradução para nomes, grupos, metadados e blocos recorrentes dos 68 agentes |
| Rodapé | Link “Planos do Core” permanecia em PT-BR | Tradução adicionada: “Core plans” |
| Academia | Conteúdo externo não deve aparecer em EN-US | Link continua omitido e rota não exibe embed em EN-US |
| Demo | Textos em PT-BR apareciam em EN-US | Congelamento i18n removido; página `/demo` passou a traduzir labels, grupos, agentes, campos, avisos, resultado simulado, CTA e título da aba em EN-US. PT-BR mantém os cenários oficiais e o QA automatizado dos 68 demos |

## Correções de tradução aplicadas

### Planos

- `Trial`, `Start`, `Boost`, `Scale`, `Dominus` receberam labels, teasers, bullets, público, impacto e evolução em EN-US.
- CTAs e modal de assinatura/trial foram traduzidos.
- Métricas traduzidas: `users`, `tasks/day`, `Trial tasks`, `tasks/month`, `uploads/day`, `retention days`, `support`, `priority`.
- Conteúdo externo do Admin não é usado como copy em EN-US.

### Home

Foram adicionadas traduções para as seções institucionais com textos ainda visíveis em PT-BR, incluindo:

- Benefícios e diferenciação Core/Supra.
- Blocos de operação padronizada, rastreabilidade, previsibilidade e escala.
- Textos descritivos do Core.
- Textos descritivos do Supra.
- Frases de setores e resultados operacionais.
- CTAs institucionais restantes.

### Página `/porque`

As oito razões foram traduzidas para EN-US mantendo:

- numeração original;
- estrutura dos cards;
- referências citadas no próprio texto: NFIB, U.S. Chamber of Commerce, AMA, SCORE, SBA, World Economic Forum, European Commission, U.S. Bank;
- argumento central sem adicionar nova fonte ou novo dado.

### Catálogo e páginas de agentes

- 68 nomes de agentes receberam mapeamento EN-US.
- Grupos de agentes receberam mapeamento EN-US.
- `/agentes-cerneops` em EN-US usa catálogo local estático, evitando copy externa em PT-BR.
- `/agentes/:slug` renderiza metadados e blocos recorrentes em EN-US.
- PT-BR permanece usando os arquivos Markdown originais.

## Evidência de validação

### Build

Comando executado:

```bash
npm run build
```

Resultado: aprovado.

Observação: o build ainda exibe warnings preexistentes em `DemoWorkspace.tsx` sobre chaves duplicadas em objetos literais. Esses warnings não foram alterados porque a rodada atual é de i18n e o QA funcional dos Demos permaneceu aprovado.

### Lint direcionado

Comando executado:

```bash
npx eslint src/lib/i18n.tsx src/lib/plans.ts src/lib/agent-pages.ts src/components/site/Plans.tsx src/routes/porque.tsx src/routes/agentes-cerneops.tsx 'src/routes/agentes.$slug.tsx' 'src/routes/planos.$slug.tsx'
```

Resultado: sem erros.

Observação: 3 warnings de Fast Refresh em `src/lib/i18n.tsx`, porque o arquivo exporta provider e utilitários. Não bloqueia build nem execução local.

### QA dos Demos

Comando executado:

```bash
npm run -s qa:demo-results
```

Resultado:

- status: aprovado;
- agentes: 68;
- cenários: 68;
- formatos validados: JSON, Markdown, tabelas, checklists, quotes, HTML breaks e arquétipos.

### Auditoria visual EN-US

Rotas auditadas no preview local `http://127.0.0.1:4323`:

| Rota | Resultado EN-US |
|---|---|
| `/` com `#planos` | sem strings PT-BR residuais |
| `/planos/trial` | sem strings PT-BR residuais |
| `/planos/boost` | sem strings PT-BR residuais |
| `/agentes-cerneops` | sem strings PT-BR residuais |
| `/agentes/selecionador-e-ranqueador-de-curriculos` | sem strings PT-BR residuais |
| `/porque` | sem strings PT-BR residuais |
| `/academia` em EN-US | sem embed externo e sem link Academia/Academy no header/rodapé |
| `/demo` | sem strings PT-BR residuais no texto visível após executar a análise em EN-US; título da aba validado como `Agent Demo | CerneOps` |

## Itens intencionalmente não alterados

- Fontes oficiais dos Demos (`CORE_DEMO_SCENARIOS` e golden results gerados) não foram reescritas manualmente.
- Em PT-BR, os Demos continuam validados pelo QA oficial de 68 agentes e 68 cenários.
- Em EN-US, a página Demo exibe resultado estático/localizado sem execução externa em tempo real.
- Layout, cores, espaçamentos, assets, identidade e imagens não foram alterados.
- Textos embutidos em imagens não foram alterados nesta rodada.
- Produção não foi alterada.

## Estado para aprovação

A versão local final está pronta para aprovação em:

```text
http://127.0.0.1:4323
```

Antes de produção, executar o gate normal de release do Site: revisão visual, aprovação explícita, commit/push, deploy VPS e smoke pós-deploy.
