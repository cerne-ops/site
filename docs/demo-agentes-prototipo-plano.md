# Protótipo Demo de Agentes — Plano de execução

## Escopo aprovado

- Criar modal de primeiro acesso com os botões `Testar agora` e `Testar depois`.
- Criar a rota pública `/demo` com catálogo de agentes separado por setores.
- Reproduzir a gramática visual do Core com entrada, exemplo, execução e resultado.
- Manter entradas e saídas totalmente simuladas, sem chamadas ao Core ou consumo de tarefas.
- Exibir entradas e saídas como conteúdo somente leitura; nenhuma entrada do agente pode ser editada.
- Após uma execução simulada, exibir a conversão para o Trial em um CTA inline abaixo do resultado, sem bloquear a leitura.
- CTA do Trial: `https://cerneops.com.br/planos/trial`.
- Preparar o catálogo para incluir novos agentes automaticamente pela fonte dinâmica já usada na página pública de Agentes.

## Checklist

- [x] Implementar modal global de primeiro acesso.
- [x] Implementar `/demo` e seletor por setor/agente.
- [x] Implementar botão `Exemplo` e execução simulada.
- [x] Bloquear edição manual das entradas e manter saída visual não editável.
- [x] Implementar resultado estruturado simulado.
- [x] Implementar CTA pós-demo inline com CTA para Trial, sem modal sobre o resultado.
- [x] Adicionar `/demo` ao header e sitemap.
- [x] Executar build e lint direcionado aos arquivos alterados.
- [x] Validar fluxo desktop e mobile no navegador.
- [x] Registrar QA visual contra o protótipo selecionado em `design-qa.md`.

## Limites

Este trabalho é um protótipo local do site. Não altera Core, Admin, banco de dados, integrações, autenticação ou produção.
