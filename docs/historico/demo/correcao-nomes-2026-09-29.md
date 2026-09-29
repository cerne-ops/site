# Correção dos nomes na Demo — 2026-09-29

Autorização: Matheus autorizou corrigir e publicar em produção, preservando as demais partes do Site.

## Escopo e causa
O catálogo global de tradução memoriza o primeiro texto de cada nó DOM e o restaura em mutações posteriores. React reutiliza os nós de título e descrição ao selecionar outro agente. Reprodução local: selecionar Analisador de Sazonalidade manteve título/descrição de KPIs enquanto os campos mudaram.

Aplicar `data-i18n-frozen="true"` somente ao painel dinâmico da Demo, que já traduz seus textos explicitamente. Nenhuma alteração no tradutor global, nas outras páginas ou nos cenários. Versão 0.S1.32.

## Validação
- Build passou preservando o snapshot versionado: `CORE_REPO_PATH=/tmp/site-demo-use-committed-scenarios npm run build`.
- `npm run qa:demo-results` passou com os 68 cenários versionados.
- Seleção dos 68 agentes em PT-BR no build final: zero títulos divergentes.
- Seleção dos 68 agentes em EN-US no código final: zero títulos divergentes.
- A geração contra o Core local foi descartada: produzia diferenças fora do escopo e cenário incompatível. Snapshot original preservado integralmente.
- Alteração local preexistente em directives/deploy_vps.md preservada e excluída do commit.

## Manifesto de publicação e observação
- Alvo: Site público, `/opt/cerne/site`, PM2 `cerne-site`, porta 4173.
- Estável anterior: `3fb67449dfedc21668e4c0515da67db7844bb5a9`, versão 0.S1.31.
- Rollback materializado: `/opt/cerne/site-rollback/3fb67449dfedc21668e4c0515da67db7844bb5a9`, contendo dist, server.mjs, package.json e package-lock.json; node_modules e .env referenciam os recursos inalterados do checkout ativo.
- Candidata: commit desta correção, a registrar no fechamento; build no checkout após preservar rollback.
- Responsável: Cerne nesta execução; observação de cinco minutos após reinício, com smokes de rotas, versão, assets e seleção de agentes.
- Interromper diante de erro HTTP, versão incorreta, falha de assets ou título divergente. Rollback recuperável pelo servidor preservado, sem reconstrução.
- Não há proposta de exclusão de artefatos. Manter uma ativa e a estável anterior. Sem mudanças de processos de outras superfícies.
