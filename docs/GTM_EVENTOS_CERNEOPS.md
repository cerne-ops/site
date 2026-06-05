# GTM_EVENTOS_CERNEOPS

## Objetivo

Configurar os eventos de negocio da CerneOps no Google Tag Manager e envia-los ao GA4.

## IDs oficiais

- GTM: `GTM-N4ZTB68V`
- GA4 Measurement ID: `G-5WV3GPKEZX`

## Eventos implementados

- `agent_page_view`
- `agent_cta_clicked`
- `pricing_viewed`
- `plan_selected`
- `checkout_started`
- `sign_up`
- `trial_started`

## Evento preparado, mas ainda nao ativado

- `purchase`

O evento `purchase` nao deve ser criado artificialmente por clique. Ele so deve ser ativado quando houver confirmacao confiavel via Stripe/webhook ou uma pagina/endpoint de sucesso pos-checkout com dados confirmados e idempotencia.

## Variaveis de Data Layer

Crie no GTM uma variavel de Data Layer para cada parametro usado pelos eventos.

### Agentes

| Nome da variavel GTM | Nome no Data Layer |
| --- | --- |
| `DLV - agent_name` | `agent_name` |
| `DLV - agent_slug` | `agent_slug` |
| `DLV - agent_group` | `agent_group` |
| `DLV - page_path` | `page_path` |
| `DLV - cta_label` | `cta_label` |
| `DLV - cta_position` | `cta_position` |

### Planos

| Nome da variavel GTM | Nome no Data Layer |
| --- | --- |
| `DLV - plan_name` | `plan_name` |
| `DLV - plan_slug` | `plan_slug` |
| `DLV - billing_cycle` | `billing_cycle` |
| `DLV - value` | `value` |
| `DLV - currency` | `currency` |

### Signup e Trial

| Nome da variavel GTM | Nome no Data Layer |
| --- | --- |
| `DLV - method` | `method` |
| `DLV - plan_name` | `plan_name` |
| `DLV - plan_slug` | `plan_slug` |

## Triggers

Crie um trigger de Evento Personalizado para cada evento.

Configuracao padrao:

- Tipo: `Evento personalizado`
- Condicao: `Event name equals nome_do_evento`

### Lista de triggers

| Nome sugerido | Event name |
| --- | --- |
| `CE - agent_page_view` | `agent_page_view` |
| `CE - agent_cta_clicked` | `agent_cta_clicked` |
| `CE - pricing_viewed` | `pricing_viewed` |
| `CE - plan_selected` | `plan_selected` |
| `CE - checkout_started` | `checkout_started` |
| `CE - sign_up` | `sign_up` |
| `CE - trial_started` | `trial_started` |

## Tags GA4 Event

Crie uma tag GA4 Event para cada evento.

Configuracao padrao:

- Tipo: `Google Analytics: Evento do GA4`
- Measurement ID: `G-5WV3GPKEZX`
- Event Name: mesmo nome do evento
- Trigger: trigger correspondente

## Parametros por evento

### `agent_page_view`

Parametros:

- `agent_name`: `{{DLV - agent_name}}`
- `agent_slug`: `{{DLV - agent_slug}}`
- `agent_group`: `{{DLV - agent_group}}`
- `page_path`: `{{DLV - page_path}}`

### `agent_cta_clicked`

Parametros:

- `agent_name`: `{{DLV - agent_name}}`
- `agent_slug`: `{{DLV - agent_slug}}`
- `agent_group`: `{{DLV - agent_group}}`
- `cta_label`: `{{DLV - cta_label}}`
- `cta_position`: `{{DLV - cta_position}}`

### `pricing_viewed`

Parametros:

- `page_path`: `{{DLV - page_path}}`

### `plan_selected`

Parametros:

- `plan_name`: `{{DLV - plan_name}}`
- `plan_slug`: `{{DLV - plan_slug}}`
- `billing_cycle`: `{{DLV - billing_cycle}}`
- `value`: `{{DLV - value}}`
- `currency`: `{{DLV - currency}}`

### `checkout_started`

Parametros:

- `plan_name`: `{{DLV - plan_name}}`
- `plan_slug`: `{{DLV - plan_slug}}`
- `value`: `{{DLV - value}}`
- `currency`: `{{DLV - currency}}`

### `sign_up`

Parametros:

- `method`: `{{DLV - method}}`

### `trial_started`

Parametros:

- `plan_name`: `{{DLV - plan_name}}`
- `plan_slug`: `{{DLV - plan_slug}}`

## Key Events no GA4

Marcar como Key Events:

- `sign_up`
- `trial_started`
- `checkout_started`

Nao marcar como Key Events:

- `agent_page_view`
- `agent_cta_clicked`
- `pricing_viewed`
- `plan_selected`

Futuramente, quando existir confirmacao confiavel:

- `purchase`

## Validacao no Tag Assistant

1. Abrir a home.
2. Rolar ate a secao de planos e confirmar `pricing_viewed`.
3. Clicar em um card de plano e confirmar `plan_selected`.
4. Abrir uma pagina individual de agente e confirmar `agent_page_view`.
5. Clicar em CTA de agente e confirmar `agent_cta_clicked`.
6. No Core, concluir cadastro e confirmar `sign_up`.
7. No Core, iniciar checkout e confirmar `checkout_started`.
8. No Core, confirmar Trial e confirmar `trial_started`.

## Validacao no GA4 DebugView

Depois de publicar o container:

1. Abrir o DebugView do GA4.
2. Executar os fluxos acima.
3. Confirmar que cada evento aparece no fluxo de debug.
4. Confirmar que os parametros chegaram sem dados sensiveis.

## Regras de privacidade

Nao enviar:

- prompts;
- respostas de agentes;
- documentos;
- dados medicos;
- dados fiscais;
- dados juridicos;
- CPF;
- CNPJ;
- emails de terceiros;
- conteudo de clientes;
- nomes de clientes;
- dados pessoais fora dos metadados seguros listados neste documento.

Enviar apenas metadados operacionais seguros.
