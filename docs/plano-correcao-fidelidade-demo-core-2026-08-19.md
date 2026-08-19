# Plano de execução — fidelidade dos resultados Demo ao Core

Data: 2026-08-19
Risco: P2 — regressão funcional/visual relevante no Site
Autorização: implementação e publicação em produção aprovadas pelo usuário.

## Objetivo

Substituir a renderização genérica de snapshots por uma solução orientada aos contratos estruturados do Core, corrigindo rótulos, hierarquia, componentes e conteúdo do Extrator de Precedentes e estabelecendo uma base reutilizável para os demais agentes.

## Fase 1 — Pre-check e arquitetura

- [x] Confirmar repositório `site` e preservar alterações não relacionadas.
- [x] Ler o SOP `directives/deploy_vps.md`.
- [x] Comparar a tela real do Core com a Demo publicada.
- [x] Definir contrato de snapshot estruturado e fallback seguro.

## Fase 2 — Implementação

- [x] Corrigir extração dos rótulos oficiais em português.
- [x] Preservar resposta estruturada no snapshot público.
- [x] Implementar renderizador fiel para `extrator_precedentes`.
- [x] Evitar publicação silenciosa em layout genérico quando houver contrato conhecido.
- [x] Atualizar versão pública do Site.

## Fase 3 — QA

- [x] Revisão independente de código e riscos de regressão.
- [x] `git diff --check`.
- [x] Lint/testes aplicáveis.
- [x] Build de produção.
- [x] Comparação visual local no mesmo estado.
- [x] Validar português, somente leitura, CTA de Trial e responsividade.

## Fase 4 — Release

- [x] Commit e push intencionais em `main`.
- [x] Pre-check VPS, Nginx, PM2, commit e versão atual.
- [x] Atualização `ff-only`, build e restart de `cerne-site`.
- [x] Confirmar commit e versão servidos.

## Fase 5 — Smoke de produção

- [x] `/demo` responde com sucesso.
- [x] Extrator de Precedentes exibe os rótulos oficiais.
- [x] Resultado usa a composição estruturada equivalente ao Core.
- [x] `/`, `/planos/trial` e assets críticos respondem corretamente.
- [x] Ausência de runtime Vite/React Refresh em produção.
- [x] PM2 e porta 4173 saudáveis.

## Rollback

Manter o commit anterior identificado no pre-check. Se build, inicialização ou smoke crítico falhar, interromper a promoção; qualquer rollback destrutivo no checkout de produção será realizado somente conforme o SOP e com evidência do motivo.

## Fechamento

- DEV e QA devem ser encerrados sem subagentes pendentes.
- Relatório final deve registrar commit, versão, build, PM2, smokes e riscos residuais.
