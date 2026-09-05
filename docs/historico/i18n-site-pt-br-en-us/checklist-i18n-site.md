# Checklist Amplo - I18n PT-BR / EN-US do Site

> **Status histórico:** checklist da preparação local. A internacionalização foi publicada posteriormente; itens não marcados abaixo preservam o estado da rodada original e não são pendências atuais confirmadas.

Status geral original: em execucao local.
Uso: marcar cada item como `OK`, `N/A`, `BLOQUEADO` ou `PENDENTE`, sempre com evidencia.

## Governanca e baseline

- [x] Repositorio alvo confirmado como `site/`.
- [x] Instrucoes globais do workspace lidas.
- [x] `site/AGENTS.md` lido.
- [x] Branch de trabalho registrada: `codex/site-i18n-local`.
- [x] Worktree de trabalho registrada: `.worktrees/site-i18n-local`.
- [x] HEAD base registrado: `1f4774dfb5b4e9caa2473c33d43e8a52d6711dac`.
- [x] Checkout principal preservado.
- [x] Alteracoes locais preexistentes no checkout principal nao foram revertidas.
- [x] Producao marcada como fora do escopo sem aprovacao explicita.

## Requisitos

- [x] RF-001 Locale padrao PT-BR.
- [x] RF-002 Locale EN-US selecionavel.
- [x] RF-003 Seletor semelhante ao Core.
- [x] RF-004 Alternancia por strings estaticas.
- [x] RF-004A Troca real de idioma persiste locale e força refresh da rota atual.
- [x] RF-005 Demos preservados em funcionamento e traduzidos em EN-US.
- [x] RF-006 Academia omitida em EN-US.
- [x] RF-007 Academia preservada em PT-BR.
- [x] RF-008 Cobertura EN-US completa das rotas auditadas, incluindo Demo. Evidencia: `auditoria-traducao-en-us-2026-09-01.md`; agentes usam camada local traduzida para 68 paginas.
- [x] RF-009 `html lang` atualizado no cliente.
- [ ] RF-010 Imagens com texto avaliadas/criadas quando possivel. Estado local: nao alterado nesta rodada; item opcional e nao bloqueante.
- [x] RNF-001 Sem alteracao intencional de layout/cor/posicao.
- [x] RNF-002 Build limpo: `npm run build`.
- [x] RNF-003 QA de Demo limpo: 68 agentes e 68 cenarios.
- [x] RNF-004 Sem PT-BR indevido em EN-US nas rotas auditadas, incluindo `/demo`. Evidencia: varredura visual local sem residuos em home, planos, agentes, `/porque`, `/academia` e `/demo`.
- [x] RNF-005 Sem traducao externa em runtime.
- [x] RNF-006 Performance preservada por catalogo local.
- [ ] RNF-007 Acessibilidade validada no browser.
- [x] RNF-008 Producao bloqueada.

## Arquitetura i18n

- [x] Locales suportados definidos como `pt-BR` e `en-US`.
- [x] Tipo `Locale` criado.
- [x] Locale padrao definido como `pt-BR`.
- [x] Catalogo estatico PT-BR -> EN-US criado.
- [x] Helper de fallback criado.
- [x] Provider/hook criado.
- [x] Persistencia local definida em localStorage e cookie.
- [x] Nenhuma chamada externa adicionada para traducao.
- [x] Nenhuma dependencia nova adicionada.

## Seletor de idioma

- [x] Seletor aparece no header desktop.
- [x] Seletor aparece no menu mobile.
- [x] Estado atual do idioma fica claro.
- [x] Alternancia PT-BR -> EN-US validada no browser em `http://127.0.0.1:4323/`.
- [x] Alternancia EN-US -> PT-BR corrigida no codigo para restaurar strings originais.
- [x] Alteracao PT-BR -> EN-US força reload observado no browser e preserva a rota atual `/demo`.
- [x] Alteracao EN-US -> PT-BR força reload observado no browser e preserva a rota atual `/demo`.
- [x] Escolha persiste apos reload validada no browser em `http://127.0.0.1:4323/`.
- [ ] Teclado/foco validado.
- [ ] Layout do header validado visualmente.

## Academia

- [x] Link removido do header desktop em EN-US.
- [x] Link removido do menu mobile em EN-US.
- [x] Link removido do footer em EN-US.
- [x] Rota direta EN-US nao carrega `SoroBlogEmbed`.
- [x] PT-BR continua exibindo Academia.
- [x] Conteudo externo nao foi traduzido.
- [x] Conteudo externo nao foi alterado.

## Demos

- [x] Arquivos gerados de cenarios nao foram alterados manualmente.
- [x] Arquivos gerados de golden results nao foram alterados manualmente.
- [x] `DemoWorkspace` removido da area congelada para i18n por mudanca de escopo em 2026-09-01.
- [x] 68 cenarios permanecem disponiveis.
- [x] 68 resultados permanecem disponiveis.
- [x] `npm run -s qa:demo-results` passou.
- [x] Demo validado no browser em EN-US com carregamento, campos, resultado e CTA traduzidos.
- [x] Demo validado por QA automatizado em PT-BR com 68 agentes e 68 cenarios preservados.

## Rotas publicas e conteudo

- [ ] Home PT-BR validada.
- [x] Home EN-US validada.
- [ ] `/porque` PT-BR validada.
- [x] `/porque` EN-US validada.
- [ ] `/agentes-cerneops` PT-BR validada.
- [x] `/agentes-cerneops` EN-US validada.
- [x] `/demo` PT-BR validada por `qa:demo-results`.
- [x] `/demo` EN-US validada sem PT-BR residual no texto visivel apos executar a analise.
- [ ] `/academia` PT-BR validada.
- [x] `/academia` EN-US validada sem embed.
- [ ] Paginas de planos PT-BR validadas.
- [x] Paginas de planos EN-US validadas em amostra `/planos/trial` e `/planos/boost`.
- [ ] Amostra de paginas de agentes PT-BR validada.
- [x] Amostra de paginas de agentes EN-US validada em `/agentes/selecionador-e-ranqueador-de-curriculos`.

## Planos e comercial

- [x] Nomes dos planos preservados.
- [x] Valores preservados.
- [x] Moeda preservada como BRL.
- [x] Nenhuma integracao externa alterada.
- [x] Labels e CTAs de planos validados em EN-US.
- [x] Modal Trial traduzido e incluido na validacao de pagina Trial.
- [ ] Modal de assinatura validado.

## QA tecnico

- [x] `npm run lint` executado com escopo focado nos arquivos tocados; sem erros, 3 warnings de Fast Refresh em `src/lib/i18n.tsx`.
- [x] `npm run build` executado e aprovado; avisos preexistentes de chaves duplicadas em `DemoWorkspace.tsx`.
- [x] `npm run -s qa:demo-results` executado.
- [x] Servidor local iniciado em `http://127.0.0.1:4323/` via `npm run build` + `npm run start`.
- [x] Console browser sem erro regressivo relevante em `http://127.0.0.1:4323/`.
- [ ] Smoke desktop executado.
- [ ] Smoke mobile executado.
- [x] Reload apos troca de idioma validado em `http://127.0.0.1:4323/`.
- [x] Persistencia de idioma validada em `http://127.0.0.1:4323/`.
- [x] Navegacao interna EN-US validada em amostra automatizada de rotas principais: `/`, `/planos/trial`, `/planos/boost`, `/agentes-cerneops`, `/agentes/selecionador-e-ranqueador-de-curriculos`, `/porque`, `/academia`, `/demo`.
- [x] Browser QA especifico da Demo EN-US executado em `http://127.0.0.1:4323/demo?qa=i18n-demo-en-final2`: titulo `Agent Demo | CerneOps`, conteudo nao vazio, sem overlay, sem logs `error/warn`, resultado visivel, residuos PT-BR visiveis `[]`.
- [x] Browser QA especifico de refresh de idioma executado em `http://127.0.0.1:4323/demo?qa=i18n-final-reload-labels`: PT-BR -> EN-US com reload observado, titulo `Agent Demo | CerneOps`, resultado visivel e residuos PT-BR visiveis `[]`.

## Gate futuro de producao

- [ ] Usuario aprovou a versao local.
- [ ] Git limpo.
- [ ] Commit criado.
- [ ] Push autorizado e executado.
- [ ] PR/merge definido quando aplicavel.
- [ ] Diretiva de deploy vigente relida.
- [ ] Alvo produtivo confirmado.
- [ ] SHA de rollback registrado.
- [ ] Deploy autorizado.
- [ ] Smoke de producao executado.
- [ ] Versao publica confirmada.
