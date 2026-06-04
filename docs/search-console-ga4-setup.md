# Configuracao Search Console, GTM, GA4 e Google Ads

Este guia cobre a etapa manual depois da publicacao das paginas SEO dos agentes CerneOps. Ele nao exige alteracao de conteudo, planos, Admin ou Core.

## Pre-requisitos

- Confirmar que `https://cerneops.com.br/sitemap.xml` retorna HTTP 200.
- Confirmar que `https://cerneops.com.br/robots.txt` declara `Sitemap: https://cerneops.com.br/sitemap.xml`.
- Configurar `NEXT_PUBLIC_GTM_ID` no ambiente de deploy do site. O site tambem aceita `VITE_GTM_ID` como compatibilidade local.
- Publicar no GTM uma tag GA4 Configuration/Google tag e tags de evento GA4 lendo eventos do `dataLayer`.

## Google Search Console

1. Criar uma propriedade de dominio para `cerneops.com.br`.
2. Validar o dominio pelo metodo indicado pelo Google, normalmente DNS.
3. Enviar o sitemap `https://cerneops.com.br/sitemap.xml`.
4. Usar Inspecao de URL para:
   - `https://cerneops.com.br/`
   - `https://cerneops.com.br/agentes-cerneops`
   - 10 agentes prioritarios definidos pelo time comercial.
5. Quando a URL estiver indexavel no teste ao vivo, solicitar indexacao.
6. Acompanhar Cobertura/Indexacao e corrigir apenas erros reais.

Referencia oficial: https://support.google.com/webmasters/answer/9012289

## Google Tag Manager

1. Abrir o container do site no Google Tag Manager.
2. Entrar em Preview.
3. Conectar `https://cerneops.com.br`.
4. Testar:
   - home;
   - `/agentes-cerneops`;
   - uma pagina `/agentes/[slug]`;
   - uma pagina `/planos/[slug]`;
   - clique nos CTAs dos agentes;
   - selecao de plano;
   - continuar cadastro/checkout.
5. Confirmar que as tags GA4 disparam com os parametros esperados.
6. Publicar uma versao do container depois da validacao.

Referencia oficial: https://support.google.com/tagmanager/answer/6107056

## Eventos do dataLayer no Site

Eventos implementados no site:

| Evento                  | Quando dispara                             | Parametros seguros                                                           |
| ----------------------- | ------------------------------------------ | ---------------------------------------------------------------------------- |
| `agent_page_view`       | Visualizacao de pagina publica de agente   | `agent_name`, `agent_slug`, `agent_group`, `page_path`                       |
| `agent_cta_clicked`     | Clique nos CTAs das paginas de agente      | `agent_name`, `agent_slug`, `cta_label`, `cta_position`                      |
| `agent_catalog_clicked` | Clique para voltar/ver catalogo de agentes | `source_agent_slug`, `page_path`                                             |
| `pricing_viewed`        | Renderizacao da secao de planos da home    | `plan_count`, `plan_slugs`, `page_path`                                      |
| `plan_selected`         | Clique em card ou CTA de plano             | `plan_slug`, `plan_name`, `plan_price_monthly`, `source`, `page_path`        |
| `checkout_started`      | Continuar cadastro/checkout para Core      | `plan_slug`, `plan_name`, `plan_price_monthly`, `checkout_type`, `page_path` |

Eventos que devem ser emitidos no ambiente onde a conversao real acontece:

| Evento          | Origem esperada      | Observacao                                     |
| --------------- | -------------------- | ---------------------------------------------- |
| `sign_up`       | Core/Auth            | Disparar quando a conta for realmente criada.  |
| `trial_started` | Core                 | Disparar quando o Trial for realmente ativado. |
| `purchase`      | Checkout/Stripe/Core | Disparar quando a compra for confirmada.       |

## GA4

1. Criar tags GA4 Event no GTM para cada evento do `dataLayer`.
2. Mapear parametros sem enviar dados sensiveis.
3. Usar DebugView para validar eventos durante o Preview do GTM.
4. Marcar como key events:
   - `sign_up`;
   - `trial_started`;
   - `purchase`;
   - opcionalmente `checkout_started`.
5. Manter `agent_cta_clicked`, `agent_page_view`, `pricing_viewed` e `plan_selected` como eventos de diagnostico/audiencia.

Referencia oficial DebugView: https://support.google.com/analytics/answer/7201382
Referencia oficial key events/conversoes: https://support.google.com/analytics/answer/9356034

## Google Ads

1. Vincular Google Ads e GA4.
2. Importar conversoes do GA4 para Google Ads.
3. Usar como conversoes principais:
   - `purchase`;
   - `trial_started`;
   - `sign_up`.
4. Usar como sinais secundarios:
   - `checkout_started`;
   - `agent_cta_clicked`.
5. Aguardar janela de processamento antes de concluir que uma conversao nao chegou.

Referencia oficial: https://support.google.com/google-ads/answer/2375435

## Politica de dados sensiveis

Nao enviar ao `dataLayer`, GA4, GTM ou Google Ads:

- prompt;
- resposta de agente;
- conteudo de documento;
- texto colado;
- nome de cliente final;
- CPF/CNPJ;
- e-mail de terceiros;
- dados medicos;
- dados juridicos sensiveis;
- dados fiscais sensiveis;
- dados internos de empresas usuarias.

Enviar apenas metadados operacionais seguros, como slug, nome publico do plano/agente, posicao do CTA e caminho da pagina.

## Checklist operacional de 30 dias

### Semana 1

- Conferir `sitemap.xml`.
- Solicitar indexacao da home, catalogo e 10 agentes prioritarios.
- Testar GTM no Tag Assistant.
- Verificar eventos no GA4 DebugView.

### Semana 2

- Verificar paginas descobertas no Search Console.
- Corrigir eventuais erros de cobertura.
- Acompanhar primeiras impressoes.

### Semana 3

- Revisar CTR por pagina.
- Identificar paginas com impressoes e poucos cliques.
- Ajustar meta title/meta description apenas se houver dados indicando necessidade.

### Semana 4

- Listar top 10 agentes por:
  - impressoes;
  - cliques;
  - CTR;
  - trials;
  - assinaturas.
- Cruzar dados de Search Console, GA4 e Ads.
- Definir backlog de melhorias SEO baseado em evidencia.
