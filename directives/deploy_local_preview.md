# SOP: Build e preview local (pre-publicação)

## Objetivo
Validar a versão de produção localmente antes de publicar, sem alterar código do produto.

## Entradas
- Projeto com dependências instaladas.
- Ambiente Node.js + npm disponível.

## Ferramentas
- `npm run build`
- `HOST=127.0.0.1 PORT=4174 npm run start`

> Observacao: neste projeto, `npm run preview` nao e o caminho canonico de validacao de producao porque o build TanStack Start atual publica a entrada SSR em `dist/server/index.js`. O preview seguro usa o mesmo adaptador Node de producao (`server.mjs`) apontando para outra porta.

## Fluxo padrão
1. Gerar build de produção:
   - `npm run build`
2. Subir preview local do build:
   - `HOST=127.0.0.1 PORT=4174 npm run start`
3. Validar no navegador:
   - `http://127.0.0.1:4174/`

## Checklist de validação visual
- Home carregando sem erro em branco.
- Header, hero, planos e CTA final renderizando.
- Assets críticos carregando (logo e imagens principais).
- Responsividade básica em largura reduzida.
- HTML sem `@vite/client`, React Refresh ou entrada virtual de dev.
- Assets de build em `/assets/*` com cache longo.

## Saída esperada
- Build concluído sem erro.
- Preview local acessível por URL.
- Mesmo runtime usado em producao, sem servidor de desenvolvimento.

## Edge cases
- Porta `4174` ocupada:
  - trocar para `4175` mantendo o comando.
- Erro de permissão de porta (`EPERM`):
  - executar comando fora de sandbox/restrição local.
