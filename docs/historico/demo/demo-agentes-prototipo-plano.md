# Protótipo Demo de Agentes — Plano de execução

> **Status histórico:** plano concluído e preservado como evidência da entrega.

## Escopo aprovado

- Criar modal de primeiro acesso com os botões `Testar agora` e `Testar depois`.
- Criar a rota pública `/demo` com catálogo de agentes separado por setores.
- Reproduzir a gramática visual do Core com entrada, exemplo, execução e resultado.
- Manter entradas e saídas totalmente simuladas, sem chamadas ao Core ou consumo de tarefas.
- Exibir entradas e saídas como conteúdo somente leitura; nenhuma entrada do agente pode ser editada.
- Usar exatamente os cenários preenchidos pelo botão `Exemplo` do Core, sem fallback genérico por agente.
- Gerar um snapshot versionado dos exemplos do Core e preservar a relação entre entradas exibidas e saída simulada.
- Após uma execução simulada, exibir a conversão para o Trial em um CTA inline abaixo do resultado, sem bloquear a leitura.
- CTA do Trial: `https://cerneops.com.br/planos/trial`.
- Preparar o catálogo para incluir novos agentes automaticamente pela fonte dinâmica já usada na página pública de Agentes.

## Checklist

- [x] Implementar modal global de primeiro acesso.
- [x] Implementar `/demo` e seletor por setor/agente.
- [x] Implementar botão `Exemplo` e execução simulada.
- [x] Bloquear edição manual das entradas e manter saída visual não editável.
- [x] Implementar resultado estruturado simulado.
- [x] Gerar 68 cenários de exemplo a partir das definições e handlers oficiais do Core.
- [x] Exibir no resultado as entradas efetivamente utilizadas na simulação.
- [x] Bloquear silenciosamente nenhum agente: cenário ausente deve ser informado, sem inventar entradas.
- [x] Implementar CTA pós-demo inline com CTA para Trial, sem modal sobre o resultado.
- [x] Adicionar `/demo` ao header e sitemap.
- [x] Executar build e lint direcionado aos arquivos alterados.
- [x] Validar fluxo desktop e mobile no navegador.
- [x] Registrar QA visual contra o protótipo selecionado em `design-qa.md`.

## Limites

Este trabalho é um protótipo local do site. O gerador lê o checkout do Core quando disponível e grava um artefato sanitizado/versionado no Site; a Demo não chama Core, Admin, banco de dados, Gateway ou autenticação durante a execução. As saídas continuam mockadas, pois o botão `Exemplo` do Core fornece entradas, não uma resposta golden.
