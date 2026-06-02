# Checklist operacional rapido

## Antes de mexer no site
- Confirmar dependências instaladas (`npm install`).
- Confirmar servidor de desenvolvimento ativo.
- Confirmar URL local acessível em `http://127.0.0.1:4173/`.
- Para publicacao em producao, consultar `directives/deploy_vps.md` antes de assumir qualquer outro caminho de deploy.
- Confirmar se o dominio publico esta sendo servido por VPS/Nginx/PM2 ou por outro provedor antes de publicar.

## Durante execução
- Não alterar arquivos de interface sem solicitação explícita.
- Priorizar ajustes operacionais (ambiente/comandos) para garantir uso do site.

## Após subir
- Validar navegação básica na home.
- Validar carregamento de assets principais (`src/assets/cerne-logo.png`).
- Em producao, validar `cerneops-site-version`, rotas de planos e PM2 `cerne-site` online.
