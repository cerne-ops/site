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
- Comando PM2 atual: `npm run dev -- --host 127.0.0.1 --port 4173`

## Variaveis obrigatorias
Para funcionalidades server-side de contato/email, o processo `cerne-site` deve ter:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` ou `RESEND_FROM`

Nunca imprimir esses valores em logs ou no chat. Validar apenas presenca/ausencia.

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
5. Quando a entrega envolver email/contato, confirmar presenca das variaveis Resend no ambiente do processo sem expor valores.

## Deploy
Executar no VPS:

```bash
cd /opt/cerne/site
git fetch origin
git merge --ff-only origin/main
npm run build
pm2 restart cerne-site --update-env
```

## Smoke pos-deploy
1. Confirmar processo e porta:
   - `ssh -o BatchMode=yes root@187.127.14.97 "ss -ltnp | grep ':4173' && pm2 list | grep cerne-site"`
2. Confirmar commit de producao:
   - `ssh -o BatchMode=yes root@187.127.14.97 "cd /opt/cerne/site && git status --short --branch && git rev-parse HEAD"`
3. Confirmar versao publica:
   - `curl -sS --compressed https://cerneops.com.br | strings | rg -n 'cerneops-site-version'`
4. Confirmar rotas principais:
   - `curl -sSI https://cerneops.com.br`
   - `curl -sSI https://cerneops.com.br/planos/trial`
   - `curl -sSI https://cerneops.com.br/planos/boost`
5. Confirmar conteudo alterado da entrega atual com buscas especificas.
6. Quando a entrega envolver email/contato, executar teste real controlado de envio e confirmar recebimento.

## Rollback
Se o smoke falhar:

```bash
cd /opt/cerne/site
git log --oneline -5
git reset --hard <commit_anterior_aprovado>
npm run build
pm2 restart cerne-site --update-env
```

Rollback deve ser usado somente com autorizacao explicita do Supervisor/usuario, salvo indisponibilidade critica evidente.

## Evidencias minimas no fechamento
- Commit local/remoto.
- Commit em `/opt/cerne/site`.
- Resultado de `npm run build`.
- Status PM2 `cerne-site`.
- Versao publica em `cerneops-site-version`.
- Rotas validadas.
