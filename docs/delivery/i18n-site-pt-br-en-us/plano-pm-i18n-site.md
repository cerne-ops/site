# Plano PM - Internacionalizacao PT-BR / EN-US do Site

Status: aprovado para preparacao local testavel; producao bloqueada ate aprovacao explicita do usuario.
Repositorio alvo: `site/`, site publico CerneOps.
Branch local de trabalho: `codex/site-i18n-local`.
Base local verificada: `1f4774dfb5b4e9caa2473c33d43e8a52d6711dac`.
Data do plano: 2026-08-31.

## Objetivo

Entregar uma versao local do Site com suporte a PT-BR e EN-US, mantendo a experiencia PT-BR atual intacta, com seletor de idioma semelhante ao Core, alternancia somente de strings estaticas e sem qualquer mudanca visual, estrutural, operacional ou produtiva antes da aprovacao do usuario.

## Escopo aprovado

- Criar base local de internacionalizacao para o Site.
- Manter PT-BR como idioma padrao.
- Adicionar seletor de idioma no header desktop e mobile, com escolha persistida e refresh forçado da rota atual a cada alteração real de idioma.
- Usar apenas catalogos estaticos versionados no codigo, sem traducao por API, IA, job ou servico externo em runtime.
- Traduzir strings publicas do Site para EN-US sem alterar layout, cores, hierarquia visual, componentes, posicoes ou identidade.
- Preservar os Demos como funcionam hoje em PT-BR e traduzir a experiencia visivel da pagina Demo em EN-US.
- Omitir Academia em EN-US, pois e conteudo externo e nao deve ser traduzido.
- Avaliar imagens com texto embutido como item opcional, sem bloquear a entrega local.
- Gerar checklist amplo de cobertura e aceite.
- Subir uma versao local testavel antes de qualquer producao.

## Fora de escopo

- Deploy, merge, push, PR ou publicacao em producao.
- Traducao em runtime, browser auto-translate ou qualquer chamada externa para idioma.
- Alteracao de precos, planos, moeda, checkout, integracao externa ou origem de dados.
- Reescrever fontes oficiais dos Demos, golden results ou comportamento funcional dos Demos. A exibicao EN-US pode usar strings estaticas/localizadas sem execucao externa em runtime.
- Traduzir ou carregar Academia em EN-US.
- Recriar imagens ou mudar composicao, marca, identidade, layout ou conteudo visual alem de texto.
- Alterar Core, Admin, Template-Base, Supra ou qualquer outro repositorio.

## Referencia do Core

O Core implementou internacionalizacao ampla e operacional: catalogos `pt-BR` e `en-US`, provider, seletor, persistencia de preferencia, resolucao de locale, fallback, dimensoes de locale e cobertura de testes. No Core, o locale influencia a experiencia end-to-end, incluindo execucoes, historico, resultados e exports.

Para o Site, a arquitetura correta e menor: seletor, catalogos estaticos, fallback previsivel, escolha explicita do usuario e QA de paridade visual. Nao devem ser copiados contexto de execucao por locale, Supabase, Gateway, historico, exports, jurisdicao, moeda, rollout operacional ou qualquer traducao sob demanda.

## Estado atual do Site

- Stack: TanStack Start, React 19 e Vite.
- Checkout local principal verificado em `main`, `1f4774d`, adiante de `origin/main`.
- Havia alteracoes locais preexistentes no checkout principal: `AGENTS.md`, `directives/README.md`, `directives/deploy_vps.md` e `docs/README.md`.
- Para preservar esse estado, a implementacao local ocorre na worktree `.worktrees/site-i18n-local`.
- O Site nao possuia i18n dedicado.
- O HTML raiz usava `lang="pt-BR"`.
- Header e Footer possuiam links para Academia.
- A rota `academia` carregava `SoroBlogEmbed`.
- Ha 68 agentes e 68 cenarios/golden results de Demo.

## Requisitos funcionais

- RF-001: PT-BR deve ser o idioma padrao.
- RF-002: EN-US deve ser selecionavel.
- RF-003: o seletor deve seguir o conceito do Core e aparecer no header desktop/mobile.
- RF-004: a alternancia deve ocorrer somente por strings estaticas versionadas.
- RF-004A: ao alterar o idioma, a pagina atual deve ser recarregada para carregar as strings do locale persistido.
- RF-005: Demos devem continuar funcionando como em PT-BR e exibir strings EN-US quando o seletor estiver em EN-US.
- RF-006: Academia deve ser omitida em EN-US.
- RF-007: Academia deve continuar existindo em PT-BR.
- RF-008: paginas publicas devem exibir strings EN-US onde cobertas pelo catalogo.
- RF-009: `html lang` deve acompanhar o locale no cliente.
- RF-010: imagens com texto sao opcionais e so podem ser alteradas se a mudanca for puramente textual.

## Requisitos nao funcionais

- RNF-001: nenhuma cor, layout, posicao, hierarquia ou responsividade deve mudar.
- RNF-002: `npm run build` deve passar.
- RNF-003: `npm run -s qa:demo-results` deve passar.
- RNF-004: fallback PT-BR em EN-US deve ser rastreado no checklist e eliminado das rotas auditadas quando fizer parte do escopo aprovado.
- RNF-005: nao deve haver chamada externa para traducao.
- RNF-006: performance deve ser preservada.
- RNF-007: acessibilidade do seletor, header e menu mobile deve ser preservada.
- RNF-008: producao permanece bloqueada ate aprovacao explicita.

## Plano de execucao

1. Preservar baseline Git e criar worktree limpa.
2. Registrar plano e checklist em Markdown.
3. Criar fundacao i18n local e estatica.
4. Adicionar seletor de idioma.
5. Conectar provider no root.
6. Ocultar Academia em EN-US no header, menu mobile e footer.
7. Bloquear exposicao do embed de Academia quando EN-US estiver ativo.
8. Traduzir a experiencia visivel da Demo em EN-US sem alterar as fontes oficiais dos cenarios.
9. Traduzir strings publicas via catalogo estatico.
10. Rodar `qa:demo-results`.
11. Rodar build.
12. Subir servidor local e entregar URL para aprovacao.

## Criterios de aceite

- O usuario consegue abrir PT-BR e EN-US localmente.
- PT-BR continua funcional e visualmente igual.
- EN-US troca apenas strings cobertas, sem mudancas de layout, cores ou posicoes.
- Seletor funciona em desktop e mobile.
- Demos passam no QA automatizado e continuam utilizaveis.
- Academia aparece em PT-BR e nao aparece em EN-US.
- Acesso direto a Academia em EN-US nao carrega o embed externo.
- Build passa.
- Checklist fica preenchido com evidencias e pendencias.
- Nada e publicado em producao.

## Gate de producao

Producao esta bloqueada. Para publicar depois da aprovacao local, sera necessario aprovar explicitamente, revisar Git limpo, criar commit, definir push/PR/merge, reler a diretiva de deploy, confirmar alvo VPS/Nginx/PM2, registrar SHA de deploy e rollback, executar deploy autorizado e validar smoke de producao.
