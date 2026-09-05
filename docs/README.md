# Documentação do Site CerneOps

Estado verificado em 2026-09-05 contra o código em `main`, o histórico Git e a produção pública.

## Fonte vigente

| Área | Fonte de autoridade | Estado verificado |
| --- | --- | --- |
| Operação local | [`run_site_local.md`](../directives/run_site_local.md) e [`deploy_local_preview.md`](../directives/deploy_local_preview.md) | Desenvolvimento via Vite; validação do build via `server.mjs` |
| Produção | [`deploy_vps.md`](../directives/deploy_vps.md) | VPS + Nginx + PM2, processo `cerne-site` |
| Versão pública | `src/lib/release.ts` e meta `cerneops-site-version` | `0.S1.31` no código e em produção |
| Catálogo público | [`Agentes/README.md`](../Agentes/README.md) e `Agentes/*.md` | 68 páginas documentadas |
| Demo | `src/components/site/DemoWorkspace.tsx` e artefatos gerados em `src/lib/` | Rota `/demo` publicada |
| Analytics | `docs/GTM_EVENTOS_CERNEOPS.md` e `src/lib/analytics.ts` | Eventos implementados; `purchase` depende de confirmação confiável |

## Estado atual do Site

- Rotas principais confirmadas em produção: `/`, `/demo`, `/planos/trial`, `/planos/boost` e `/academia`.
- PT-BR é o idioma padrão e EN-US usa catálogo estático versionado.
- A Academia permanece disponível em PT-BR e é omitida da experiência EN-US.
- A Demo mantém 68 cenários e resultados versionados, com execução demonstrativa sem chamada ao Core durante o uso público.
- A publicação vigente usa o adaptador Node de produção; `npm run preview` não é o caminho canônico deste repositório.

## Roadmap documental

Não há macroentrega funcional futura aprovada registrada neste repositório. Os próximos controles documentais são contínuos:

1. atualizar este índice quando uma entrega mudar comportamento, rota, topologia ou versão pública;
2. registrar planos encerrados em `docs/historico/`, sem tratá-los como instrução vigente;
3. manter SOPs em `directives/` alinhados ao runtime real;
4. validar links e evidências antes de mover ou renomear documentos;
5. manter planos futuros fora do histórico enquanto estiverem ativos.

## Documentos vigentes

- [`GTM_EVENTOS_CERNEOPS.md`](GTM_EVENTOS_CERNEOPS.md): contrato de eventos e configuração de GTM/GA4.
- [`directives/README.md`](../directives/README.md): índice de SOPs operacionais.
- [`execution/README.md`](../execution/README.md): índice dos comandos determinísticos.
- [`Agentes/README.md`](../Agentes/README.md): índice das páginas públicas dos Agentes CerneOps.
- [`Agentes/AUDITORIA_SEO_AGENTES.md`](../Agentes/AUDITORIA_SEO_AGENTES.md): evidência de auditoria do conteúdo SEO.

## Histórico

Planos, auditorias e evidências de entregas concluídas ficam em `docs/historico/`. Eles preservam decisões e rastreabilidade, mas não substituem as fontes vigentes acima.

- [`historico/demo/`](historico/demo/): protótipo, snapshots, correções, renderizador e QA da Demo.
- [`historico/i18n-site-pt-br-en-us/`](historico/i18n-site-pt-br-en-us/): plano, checklist e auditoria da internacionalização publicada.
