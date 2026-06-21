# SOP: Subir o site localmente

## Objetivo
Executar o site local da Cerne sem alterar o código da aplicação.

## Entradas
- Repositório clonado em `site/`
- Node.js e npm instalados

## Ferramentas
- `npm install`
- `npm run dev -- --host 127.0.0.1 --port 4173`
- Para preview de producao: `npm run build` + `HOST=127.0.0.1 PORT=4174 npm run start`

## Fluxo
1. Instalar dependências:
   - `npm install`
2. Iniciar servidor local de desenvolvimento:
   - `npm run dev -- --host 127.0.0.1 --port 4173`
3. Abrir no navegador:
   - `http://127.0.0.1:4173/`

## Saída esperada
- Vite mostrando:
  - `VITE v7.x ready`
  - `Local: http://127.0.0.1:4173/`

## Edge cases
- Erro `EPERM listen`:
  - rodar o comando de dev fora de sandbox/restrição local.
- Porta ocupada:
  - usar outra porta, por exemplo `4174`.

## Regra importante
`npm run dev` e exclusivo para desenvolvimento local. Nunca usar `vite dev`, `@vite/client` ou React Refresh em producao. Para validar o build final localmente, use `directives/deploy_local_preview.md`.
