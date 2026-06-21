# SOP: Deploy do Site em producao via VPS

## Objetivo
Publicar o Site `cerneops.com.br` com seguranca operacional, usando o caminho real de producao atualmente ativo: VPS, Nginx e PM2.

## Topologia atual
- Dominio publico: `https://cerneops.com.br`
- VPS: `root@187.127.14.97`
- Checkout de producao: `/opt/cerne/site`
- Nginx: `/etc/nginx/sites-enabled/cerneops.com.br`
- Proxy Nginx: `127.0.0.1:4173`
- Processo PM2: `cerne-site`
- Comando PM2 atual: `HOST=127.0.0.1 PORT=4173 npm run start`
- Runtime publico: servidor Node de producao `server.mjs`, usando `dist/client` + `dist/server/index.js`.

## Regra de performance
Producao nunca deve rodar `vite dev`, `@vite/client`, React Refresh ou qualquer runtime de desenvolvimento. O build publicado deve:

- servir HTML/SSR pelo `server.mjs`;
- servir `/assets/*` com cache longo e `immutable`;
- servir imagens publicas estaveis com cache controlado;
- preservar a qualidade original das imagens, sem conversao destrutiva ou reducao visual sem QA;
- manter APIs sem cache.

## Variaveis obrigatorias
Para funcionalidades server-side de contato/email, o processo `cerne-site` deve ter:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` ou `RESEND_FROM`

Nunca imprimir esses valores em logs ou no chat. Validar apenas presenca/ausencia.
O `server.mjs` carrega o arquivo `.env` do checkout de producao e preserva variaveis ja injetadas no ambiente do processo.

## Regra critica
Mesmo que o repositorio contenha `wrangler.jsonc` ou artefatos Cloudflare, nao assumir deploy por Wrangler/Cloudflare sem validar a topologia ativa. A producao atual do Site responde via Nginx no VPS.

## Pre-check obrigatorio
1. Confirmar repo local e branch:
   - `git status --short --branch`
   - `git rev-parse HEAD`
2. Confirmar producao atual no VPS:
   - `ssh -o BatchMode=yes root@187.127.14.97 "cd /opt/cerne/site && git status --short --branch && git rev-parse HEAD"`
3. Confirmar Nginx e PM2:
   - `ssh -o BatchMode=yes root@187.127.14.97 "sed -n '1,80p' /etc/nginx/sites-enabled/cerneops.com.br && pm2 list | grep cerne-site"`
4. Confirmar versao atualmente servida:
   - `curl -sS --compressed https://cerneops.com.br | strings | rg -n 'cerneops-site-version'`
5. Confirmar que producao nao esta servindo runtime dev:
   - `curl -sS --compressed https://cerneops.com.br | strings | rg -n '/@vite/client|react-refresh|virtual:tanstack-start-client-entry'`
   - Esperado: nenhum resultado.
6. Quando a entrega envolver email/contato, confirmar presenca das variaveis Resend no ambiente do processo sem expor valores.

## Deploy
Executar no VPS:

```bash
cd /opt/cerne/site
git fetch origin
git merge --ff-only origin/main
npm run build
pm2 delete cerne-site
HOST=127.0.0.1 PORT=4173 pm2 start npm --name cerne-site -- run start
pm2 save --force
```

## Smoke pos-deploy
1. Confirmar processo e porta:
   - `ssh -o BatchMode=yes root@187.127.14.97 "ss -ltnp | grep ':4173' && pm2 list | grep cerne-site"`
2. Confirmar commit de producao:
   - `ssh -o BatchMode=yes root@187.127.14.97 "cd /opt/cerne/site && git status --short --branch && git rev-parse HEAD"`
3. Confirmar versao publica:
   - `curl -sS --compressed https://cerneops.com.br | strings | rg -n 'cerneops-site-version'`
4. Confirmar ausencia de runtime dev:
   - `curl -sS --compressed https://cerneops.com.br | strings | rg -n '/@vite/client|react-refresh|virtual:tanstack-start-client-entry'`
   - Esperado: nenhum resultado.
5. Confirmar cache de assets:
   - `curl -sSI https://cerneops.com.br/site-hero/Hero5.jpg`
   - `curl -sSI https://cerneops.com.br/assets/<arquivo-js-do-build>.js`
6. Confirmar rotas principais:
   - `curl -sSI https://cerneops.com.br`
   - `curl -sSI https://cerneops.com.br/planos/trial`
   - `curl -sSI https://cerneops.com.br/planos/boost`
7. Confirmar conteudo alterado da entrega atual com buscas especificas.
8. Quando a entrega envolver email/contato, executar teste real controlado de envio e confirmar recebimento.

## Rollback
Se o smoke falhar:

```bash
cd /opt/cerne/site
git log --oneline -5
git reset --hard <commit_anterior_aprovado>
npm run build
pm2 delete cerne-site
HOST=127.0.0.1 PORT=4173 pm2 start npm --name cerne-site -- run start
pm2 save --force
```

Rollback deve ser usado somente com autorizacao explicita do Supervisor/usuario, salvo indisponibilidade critica evidente.

## Evidencias minimas no fechamento
- Commit local/remoto.
- Commit em `/opt/cerne/site`.
- Resultado de `npm run build`.
- Status PM2 `cerne-site`.
- Versao publica em `cerneops-site-version`.
- Rotas validadas.
- Confirmacao de ausencia de runtime dev no HTML publico.
- Headers de cache de assets criticos.
