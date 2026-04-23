import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

type Agent = {
  id: number;
  title: string;
  problem: string;
  operation: string;
  delivery: string;
  group: string;
};

const principles = [
  {
    title: "Integração Zero",
    body: "A entrada de dados é feita de forma manual e simples (upload de arquivos, fotos, planilhas básicas ou textos copiados). Não há necessidade de conectar APIs ou sistemas legados.",
  },
  {
    title: "Redução de Burocracia",
    body: "O agente não adiciona passos ao processo; ele substitui horas de trabalho humano repetitivo por segundos de processamento inteligente.",
  },
  {
    title: "Praticidade Operacional",
    body: "Cada agente tem uma função clara, uma entrada definida e uma entrega acionável, sem sobreposição de escopo entre eles.",
  },
];

const agents: Agent[] = [
  {
    id: 1,
    group: "Recursos Humanos e Departamento Pessoal",
    title: "Selecionador e Ranqueador de Currículos",
    problem:
      "Ler dezenas de currículos em PDF/Word para encontrar o candidato ideal consome horas do gestor ou do RH.",
    operation:
      "O usuário faz upload de um lote de currículos e cola a descrição da vaga. O agente lê todos os documentos, cruza as experiências e habilidades com os requisitos da vaga e gera um ranking.",
    delivery:
      "Uma tabela com os candidatos pontuados de 0 a 100, destacando os pontos fortes, os gaps de cada um e sugerindo os top 3 para entrevista.",
  },
  {
    id: 2,
    group: "Recursos Humanos e Departamento Pessoal",
    title: "Conferente de Documentação de Admissão",
    problem:
      "O processo de admissão exige a conferência de múltiplos documentos (RG, CPF, comprovante de residência, exames). Um documento faltando ou ilegível atrasa a contratação.",
    operation:
      "O usuário faz upload do pacote de documentos do novo funcionário. O agente verifica contra um checklist padrão de admissão.",
    delivery:
      "Um relatório de conformidade indicando quais documentos estão corretos, quais estão ilegíveis e quais estão faltando, pronto para ser enviado ao candidato.",
  },
  {
    id: 3,
    group: "Vendas e Comercial",
    title: "Qualificador de Leads (Lead Scoring)",
    problem:
      "Vendedores perdem tempo ligando para contatos frios enquanto leads quentes esfriam na base.",
    operation:
      "O usuário faz upload de uma planilha simples com os leads da semana (nome, empresa, cargo, origem, observações da captação).",
    delivery:
      "A lista devolvida com uma classificação de temperatura (Quente, Morno, Frio) baseada no perfil do cliente ideal (ICP) da empresa, indicando por quem o vendedor deve começar a ligar hoje.",
  },
  {
    id: 4,
    group: "Vendas e Comercial",
    title: "Gerador de Propostas Comerciais Personalizadas",
    problem:
      "Montar propostas comerciais em Word/PDF copiando e colando dados de clientes frequentemente gera erros (como esquecer o nome do cliente anterior) e toma tempo.",
    operation:
      "O usuário insere os dados básicos do cliente e os itens/serviços orçados. O agente utiliza o template padrão da empresa.",
    delivery:
      "O texto completo da proposta comercial, com linguagem persuasiva, dados corretos e formatação impecável, pronto para ser exportado em PDF.",
  },
  {
    id: 5,
    group: "Vendas e Comercial",
    title: "Analisador de Objeções de Vendas",
    problem:
      "Vendedores registram os motivos de perda de vendas (\"muito caro\", \"fechou com concorrente\"), mas ninguém consolida isso para melhorar o argumento de vendas.",
    operation:
      "O usuário cola o histórico de conversas do WhatsApp ou anotações do CRM de vendas perdidas no mês.",
    delivery:
      "Um relatório categorizando as principais objeções, com sugestões práticas de scripts de contorno (o que o vendedor deve responder na próxima vez que ouvir aquela objeção).",
  },
  {
    id: 6,
    group: "Financeiro e Administrativo",
    title: "Extrator e Tabulador de Notas Fiscais/Recibos",
    problem:
      "Digitar dados de dezenas de notas fiscais e recibos de despesas em planilhas de controle financeiro é tedioso e sujeito a erros de digitação.",
    operation:
      "O usuário faz upload de fotos ou PDFs de notas fiscais e recibos acumulados na semana.",
    delivery:
      "Uma planilha estruturada (CSV/Excel) contendo data, fornecedor, CNPJ, valor total e categoria da despesa, pronta para ser importada no sistema financeiro ou enviada ao contador.",
  },
  {
    id: 7,
    group: "Financeiro e Administrativo",
    title: "Comparador de Orçamentos de Fornecedores",
    problem:
      "Cotar materiais com três fornecedores diferentes resulta em orçamentos em formatos distintos (PDF, corpo do email, foto), dificultando a comparação.",
    operation: "O usuário faz upload dos três orçamentos recebidos.",
    delivery:
      "Uma tabela comparativa lado a lado, padronizando os itens, destacando o menor preço por item, o menor preço global, diferenças de frete e prazos de pagamento.",
  },
  {
    id: 8,
    group: "Financeiro e Administrativo",
    title: "Conciliador de Extrato Bancário Simples",
    problem:
      "Bater o extrato do banco com a planilha de controle interno linha por linha para achar onde está a diferença de centavos.",
    operation:
      "O usuário faz upload do extrato em PDF/CSV e da sua planilha de controle interno.",
    delivery:
      "Um relatório apontando exatamente quais lançamentos estão no banco e não na planilha (e vice-versa), destacando as divergências de valores.",
  },
  {
    id: 9,
    group: "Atendimento e Relacionamento com Cliente",
    title: "Classificador e Roteador de E-mails/Tickets",
    problem:
      "A caixa de entrada genérica (contato@empresa) fica lotada, e o gestor perde tempo lendo tudo para decidir quem deve responder o quê.",
    operation:
      "O usuário exporta os e-mails do dia ou cola os textos das mensagens recebidas.",
    delivery:
      "Uma lista categorizada (Dúvida, Reclamação, Orçamento, Financeiro) com indicação de prioridade (Urgente, Normal) e sugestão de qual departamento deve assumir.",
  },
  {
    id: 10,
    group: "Atendimento e Relacionamento com Cliente",
    title: "Analisador de Sentimento de Avaliações (Reviews)",
    problem:
      "A empresa recebe dezenas de avaliações no Google Meu Negócio ou iFood, mas não tem tempo de ler todas para entender o que precisa melhorar.",
    operation: "O usuário cola o texto das avaliações do último mês.",
    delivery:
      "Um painel de insights resumindo os principais elogios (o que manter) e as principais reclamações (o que corrigir urgentemente), classificando o sentimento geral da clientela.",
  },
  {
    id: 11,
    group: "Atendimento e Relacionamento com Cliente",
    title: "Gerador de Respostas para Dúvidas Frequentes (FAQ)",
    problem:
      "Responder repetidamente às mesmas perguntas no WhatsApp ou Instagram consome a energia do atendente.",
    operation:
      "O usuário cola a pergunta do cliente e fornece um documento base (como o cardápio, manual do produto ou política de trocas).",
    delivery:
      "Uma resposta educada, clara e completa, baseada exclusivamente nas regras da empresa, pronta para ser copiada e enviada ao cliente.",
  },
  {
    id: 12,
    group: "Operação e Logística",
    title: "Otimizador de Rotas de Entrega/Visitas",
    problem:
      "Planejar a ordem das entregas do dia ou das visitas técnicas olhando no mapa consome tempo e frequentemente resulta em rotas ineficientes, gastando mais combustível.",
    operation: "O usuário cola a lista de endereços que precisam ser visitados no dia.",
    delivery:
      "A lista ordenada de forma lógica para minimizar a distância e o tempo de deslocamento, agrupada por bairros ou regiões próximas.",
  },
  {
    id: 13,
    group: "Operação e Logística",
    title: "Analisador de Curva ABC de Estoque",
    problem:
      "O empresário sabe o que vende, mas não tem clareza matemática de quais produtos representam 80% do seu faturamento (Curva A) e quais estão apenas ocupando espaço (Curva C).",
    operation:
      "O usuário faz upload de uma planilha simples de vendas do último trimestre (produto, quantidade vendida, valor unitário).",
    delivery:
      "A classificação ABC do estoque, indicando claramente quais produtos nunca podem faltar (A) e quais devem entrar em liquidação para liberar caixa (C).",
  },
  {
    id: 14,
    group: "Operação e Logística",
    title: "Tradutor de Manuais Técnicos e POPs",
    problem:
      "Equipamentos importados vêm com manuais em inglês ou mandarim, dificultando o treinamento da equipe operacional.",
    operation: "O usuário faz upload do manual técnico em PDF.",
    delivery:
      "O manual traduzido para português claro e acessível, formatado como um Procedimento Operacional Padrão (POP) em passos numerados para a equipe de chão de fábrica.",
  },
  {
    id: 15,
    group: "Gestão e Produtividade do Gestor",
    title: "Sintetizador de Reuniões e Gerador de Atas",
    problem:
      "Reuniões longas terminam sem clareza do que foi decidido e quem fará o quê, exigindo que alguém perca horas redigindo uma ata.",
    operation:
      "O usuário faz upload do áudio da reunião ou da transcrição bruta gerada pelo Teams/Meet.",
    delivery:
      "Uma ata executiva contendo: Resumo dos temas discutidos, Decisões tomadas e, o mais importante, um Plano de Ação (Tarefa, Responsável, Prazo).",
  },
  {
    id: 16,
    group: "Gestão e Produtividade do Gestor",
    title: "Limpador e Padronizador de Banco de Dados",
    problem:
      "A lista de clientes da empresa está uma bagunça: nomes em minúsculo, telefones com e sem DDD, CPFs com e sem pontuação. Isso impede o uso em campanhas de marketing.",
    operation: "O usuário faz upload da planilha bagunçada.",
    delivery:
      "A planilha devolvida com os dados higienizados: nomes capitalizados corretamente, telefones no padrão (XX) 9XXXX-XXXX, CPFs formatados e linhas duplicadas removidas.",
  },
  {
    id: 17,
    group: "Gestão e Produtividade do Gestor",
    title: "Analisador de Contratos (Extrator de Cláusulas Críticas)",
    problem:
      "Assinar contratos longos de aluguel, prestação de serviços ou parcerias sem ler os detalhes por falta de tempo, correndo riscos jurídicos e financeiros.",
    operation: "O usuário faz upload do contrato em PDF.",
    delivery:
      "Um resumo executivo destacando apenas as cláusulas críticas: Objeto, Valor, Prazo de Vigência, Multas Rescisórias, Condições de Quebra e Obrigações principais.",
  },
  {
    id: 18,
    group: "Gestão e Produtividade do Gestor",
    title: "Gerador de Escalas de Trabalho",
    problem:
      "Montar a escala de folgas e turnos da equipe (em hospitais, restaurantes, portarias) respeitando as regras trabalhistas e as preferências da equipe é um quebra-cabeça semanal.",
    operation:
      "O usuário insere a lista de funcionários, os turnos necessários e as restrições (ex: \"João não pode na terça\", \"Maria precisa de um domingo no mês\").",
    delivery:
      "Uma sugestão de escala de trabalho equilibrada, garantindo a cobertura de todos os turnos sem ferir as restrições informadas.",
  },
  {
    id: 19,
    group: "Gestão e Produtividade do Gestor",
    title: "Auditor de Conformidade de Imagens (Controle de Qualidade)",
    problem:
      "Em franquias, obras ou redes de lojas, o gestor precisa garantir que o padrão visual (vitrine, EPIs, limpeza) está sendo seguido, mas não pode estar em todos os lugares.",
    operation:
      "O gerente local tira fotos da vitrine/obra e faz o upload. O agente compara com as regras de padrão visual da empresa.",
    delivery:
      "Um relatório apontando o que está fora do padrão (ex: \"Falta a etiqueta de preço no produto X\", \"Funcionário sem capacete na foto 2\"), agilizando a auditoria remota.",
  },
  {
    id: 20,
    group: "Gestão e Produtividade do Gestor",
    title: "Planejador de Conteúdo para Redes Sociais",
    problem:
      "O pequeno empresário sabe que precisa postar no Instagram, mas perde horas pensando no que escrever e acaba não postando nada.",
    operation:
      "O usuário digita os produtos em promoção na semana ou os serviços que deseja destacar.",
    delivery:
      "Um calendário semanal com sugestões de posts, incluindo o texto da legenda (copy), sugestão de imagem/vídeo a ser gravado e as hashtags relevantes para o nicho.",
  },
];

export const Route = createFileRoute("/agentes-cerneops")({
  head: () => ({
    meta: [
      { title: "Agentes CerneOps | Agentes Core" },
      {
        name: "description",
        content:
          "Conheça os agentes Core da CerneOps para eliminar burocracia com integração zero e acelerar a operação da sua empresa.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cerneops.com.br/agentes-cerneops" }],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const groups = Array.from(new Set(agents.map((agent) => agent.group)));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-36 pb-24">
        <section className="relative py-10">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="max-w-4xl">
              <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
                / Agentes CerneOps
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.03]">
                Agentes Core da CerneOps,
                <br />
                <span className="text-muted-foreground">Eliminação de Burocracia com Integração Zero.</span>
              </h1>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                O plano Core da CerneOps foi desenhado para atacar a raiz da ineficiência nas pequenas e médias empresas: o trabalho manual e burocrático. O objetivo não é criar sistemas complexos, mas sim fornecer ferramentas práticas que o empresário ou operador possa usar imediatamente, sem necessidade de integrações de TI, treinamentos longos ou mudanças drásticas na infraestrutura atual.
              </p>
              <p className="mt-4 text-foreground/90 leading-relaxed">
                Esses agentes materializam o lema da CerneOps: "Uma pessoa com a CerneOps opera com a performance de dez."
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-3xl font-semibold">Contexto e Princípios de Design</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {principles.map((item) => (
                <article key={item.title} className="rounded-2xl border border-border bg-surface/55 p-6">
                  <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-3xl font-semibold">Catálogo de Agentes Core</h2>
            {groups.map((group) => (
              <div key={group} className="mt-8">
                <h3 className="font-display text-2xl font-semibold text-foreground/90">{group}</h3>
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {agents
                    .filter((agent) => agent.group === group)
                    .map((agent) => (
                      <article key={agent.id} className="rounded-2xl border border-border bg-surface/55 p-6">
                        <div className="font-mono text-xs uppercase tracking-widest text-ember">Agente {agent.id}</div>
                        <h4 className="mt-2 font-display text-2xl leading-tight font-semibold">{agent.title}</h4>
                        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                          <p>
                            <span className="text-foreground font-medium">O Problema:</span> {agent.problem}
                          </p>
                          <p>
                            <span className="text-foreground font-medium">Operação:</span> {agent.operation}
                          </p>
                          <p>
                            <span className="text-foreground font-medium">Entrega:</span> {agent.delivery}
                          </p>
                        </div>
                      </article>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-ember/35 bg-surface-elevated p-7">
              <h2 className="font-display text-3xl font-semibold">Conclusão, O Impacto do Core</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                A beleza destes agentes reside na sua simplicidade operacional. Eles não exigem que o empresário mude seu software de gestão ou contrate uma equipe de TI. Eles atuam exatamente onde a dor é mais aguda: na interface entre o mundo físico (papéis, fotos, áudios, planilhas desorganizadas) e a necessidade de informação estruturada.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Ao adotar o plano Core da CerneOps, o empresário transforma horas de trabalho braçal e burocrático em minutos de supervisão inteligente, liberando seu tempo e o de sua equipe para focar no que realmente importa: atender bem o cliente e crescer o negócio.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
