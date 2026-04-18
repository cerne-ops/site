# SOP: Build e preview local (pre-publicação)

## Objetivo
Validar a versão de produção localmente antes de publicar, sem alterar código do produto.

## Entradas
- Projeto com dependências instaladas.
- Ambiente Node.js + npm disponível.

## Ferramentas
- `npm run build`
- `npm run preview -- --host 127.0.0.1 --port 4174`

## Fluxo padrão
1. Gerar build de produção:
   - `npm run build`
2. Subir preview local do build:
   - `npm run preview -- --host 127.0.0.1 --port 4174`
3. Validar no navegador:
   - `http://127.0.0.1:4174/`

## Checklist de validação visual
- Home carregando sem erro em branco.
- Header, hero, planos e CTA final renderizando.
- Assets críticos carregando (logo e imagens principais).
- Responsividade básica em largura reduzida.

## Saída esperada
- Build concluído sem erro.
- Preview local acessível por URL.

## Edge cases
- Porta `4174` ocupada:
  - trocar para `4175` mantendo o comando.
- Erro de permissão de porta (`EPERM`):
  - executar comando fora de sandbox/restrição local.
