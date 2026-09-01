import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "pt-BR" | "en-US";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isEnglish: boolean;
  t: (text: string) => string;
};

const STORAGE_KEY = "cerneops:site-locale";
const COOKIE_KEY = "cerneops_site_locale";
const DEFAULT_LOCALE: Locale = "pt-BR";

const I18nContext = createContext<I18nContextValue | null>(null);

const textTranslations = new Map<string, string>([
  ["Início", "Home"],
  ["Plataforma", "Platform"],
  ["Agentes", "Agents"],
  ["Academia", "Academy"],
  ["Planos", "Plans"],
  ["Planos do Core", "Core plans"],
  ["Porque?", "Why?"],
  ["Como funciona", "How it works"],
  ["Setores", "Industries"],
  ["Contato", "Contact"],
  ["Produto", "Product"],
  ["Acesso", "Access"],
  ["Agentes CerneOps", "CerneOps Agents"],
  [
    "Integração inteligente de operações. Gerenciamento de processos com inteligência.",
    "Intelligent operations integration. Process management with intelligence.",
  ],
  ["Entrar", "Sign in"],
  ["Falar com a CerneOps", "Talk to CerneOps"],
  ["Abrir menu", "Open menu"],
  ["Fechar menu", "Close menu"],
  ["Destravar minha operação", "Unlock my operation"],
  ["INTEGRAÇÃO INTELIGENTE DE OPERAÇÕES", "INTELLIGENT OPERATIONS INTEGRATION"],
  ["Gerenciamento", "Process"],
  ["de processos", "management"],
  ["com inteligência.", "with intelligence."],
  [
    "Se hoje sua operação depende de alguém para lembrar, organizar e executar, você já tem um problema de escala.",
    "If your operation depends on someone remembering, organizing, and executing, you already have a scaling problem.",
  ],
  [
    "Não importa o tamanho da sua empresa, isso gera retrabalho, perda de tempo, erro humano e decisões sem visibilidade real.",
    "No matter your company size, this creates rework, wasted time, human error, and decisions without real visibility.",
  ],
  [
    "E quanto mais você cresce, mais isso piora.",
    "And the more you grow, the worse it gets.",
  ],
  ["A CerneOps resolve exatamente isso.", "CerneOps solves exactly that."],
  [
    "Ela pega o que hoje é manual, desorganizado e dependente de pessoas, e transforma em processos que rodam com padrão, clareza e controle.",
    "It turns what is manual, disorganized, and people-dependent today into processes that run with standards, clarity, and control.",
  ],
  ["Conheça os Agentes AI CerneOps", "Explore CerneOps AI Agents"],
  ["Ver como isso funciona na prática", "See how it works in practice"],
  [
    "Resolver minha operação com a CerneOps",
    "Solve my operation with CerneOps",
  ],
  [
    "Uma pessoa com a CerneOps opera como uma equipe",
    "One person with CerneOps operates like a team",
  ],
  ["Capacidade por pessoa", "Capacity per person"],
  ["Retrabalho operacional", "Operational rework"],
  ["Agentes em execução", "Agents running"],
  ["Auditável e rastreável", "Auditable and traceable"],
  [
    "/ Por que CerneOps e não chat de IA?",
    "/ Why CerneOps and not an AI chat?",
  ],
  ["Chat de IA ajuda pessoas.", "AI chat helps people."],
  [
    "A CerneOps organiza e executa a operação.",
    "CerneOps organizes and executes the operation.",
  ],
  [
    "Se você já usa IA, você já viu ganho.",
    "If you already use AI, you have already seen the upside.",
  ],
  [
    "Mas isso ainda não resolveu o principal: como sua operação roda no dia a dia.",
    "But that still has not solved the main issue: how your operation runs day to day.",
  ],
  ["O que acontece hoje", "What happens today"],
  ["Cada pessoa usa IA do seu jeito", "Each person uses AI their own way"],
  ["O resultado depende de quem executa", "The result depends on who executes"],
  ["Parte do trabalho continua manual", "Part of the work remains manual"],
  ["Informações ficam espalhadas", "Information stays scattered"],
  ["Processos não seguem padrão", "Processes do not follow a standard"],
  ["Você melhora tarefas.", "You improve tasks."],
  ["Mas a operação continua travando.", "But the operation still gets stuck."],
  ["Chat não cria operação", "Chat does not create an operation"],
  ["Chat funciona assim:", "Chat works like this:"],
  ["→ você pede", "-> you ask"],
  ["→ ele responde", "-> it answers"],
  ["→ acabou", "-> it ends"],
  ["não mantém padrão", "does not maintain standards"],
  ["não executa fluxo", "does not execute workflows"],
  ["não conecta etapas", "does not connect steps"],
  ["não garante continuidade", "does not guarantee continuity"],
  ["IA sem processo continua sendo", "AI without process is still"],
  ["esforço manual disfarçado.", "manual effort in disguise."],
  ["Core (Agentes)", "Core (Agents)"],
  ["Supra (Operação)", "Supra (Operation)"],
  ["Mais produtividade por pessoa", "More productivity per person"],
  ["Menos erro e retrabalho", "Less error and rework"],
  ["Mais velocidade no dia a dia", "More day-to-day speed"],
  ["Mais organização", "More organization"],
  ["Menos custo operacional", "Lower operating cost"],
  ["Menos dependência de pessoas", "Less dependence on people"],
  ["Mais previsibilidade", "More predictability"],
  ["Mais escala sem aumentar equipe", "More scale without growing the team"],
  ["Chat melhora quem executa.", "Chat improves the person executing."],
  [
    "A CerneOps melhora o que é executado.",
    "CerneOps improves what gets executed.",
  ],
  ["/ O que é a CerneOps", "/ What CerneOps is"],
  ["Implementação aplicada.", "Applied implementation."],
  ["Funcionamento real.", "Real operation."],
  ["Padronização de execução", "Execution standardization"],
  ["Controle real da operação", "Real operational control"],
  ["Repetibilidade com qualidade", "Repeatability with quality"],
  ["Rastreabilidade de ponta a ponta", "End-to-end traceability"],
  ["Organização que se mantém", "Organization that holds"],
  ["Escala com previsibilidade", "Scale with predictability"],
  ["/ Arquitetura da oferta", "/ Offer architecture"],
  ["Dois modelos.", "Two models."],
  ["Uma engenharia.", "One engineering approach."],
  ["PRODUTO SAAS", "SAAS PRODUCT"],
  ["CONSULTORIA HIGH-TOUCH", "HIGH-TOUCH CONSULTING"],
  [
    "Uma plataforma que executa tarefas do dia a dia da sua empresa com padrão e velocidade.",
    "A platform that executes your company's daily tasks with standards and speed.",
  ],
  [
    "A CerneOps entra na sua empresa e constrói a operação automatizada com você.",
    "CerneOps enters your company and builds the automated operation with you.",
  ],
  ["/ O que faz na prática", "/ What it does in practice"],
  ["/ O que fazemos na prática", "/ What we do in practice"],
  ["/ O que isso muda", "/ What this changes"],
  ["Ver planos", "View plans"],
  ["/ Como o Supra funciona", "/ How Supra works"],
  ["A operação no nível mais alto ,", "The highest level of operation,"],
  ["estruturada, automatizada", "structured, automated"],
  ["e sob medida com o SUPRA.", "and tailored with SUPRA."],
  [
    "O CerneOps Supra é o nível máximo da CerneOps.",
    "CerneOps Supra is the highest CerneOps level.",
  ],
  ["Se o Core melhora a execução,", "If Core improves execution,"],
  ["o Supra transforma a operação.", "Supra transforms the operation."],
  ["/ Como o Core funciona", "/ How Core works"],
  ["Sua operação executando melhor", "Your operation executing better"],
  ["com agentes especializados", "with specialized agents"],
  ["trabalhando com você todos os dias.", "working with you every day."],
  [
    "No CerneOps Core, você não usa uma “IA genérica” para tentar resolver tudo.",
    "In CerneOps Core, you do not use a generic AI to try to solve everything.",
  ],
  [
    "Você usa agentes, cada um preparado para executar uma parte real da sua operação.",
    "You use agents, each prepared to execute a real part of your operation.",
  ],
  ["Você escolhe o tipo de tarefa", "You choose the task type"],
  [
    "Cada agente resolve uma coisa específica",
    "Each agent solves one specific thing",
  ],
  ["A execução já sai estruturada", "Execution already comes structured"],
  [
    "Sua equipe trabalha com o mesmo padrão",
    "Your team works with the same standard",
  ],
  [
    "Você ganha velocidade e reduz retrabalho",
    "You gain speed and reduce rework",
  ],
  ["E sem isso, não existe escala.", "Without that, there is no scale."],
  ["E sem isso,", "Without that,"],
  ["não existe escala.", "there is no scale."],
  [
    "Se o Supra transforma a operação inteira,",
    "If Supra transforms the entire operation,",
  ],
  [
    "o Core melhora como cada tarefa é executada, todos os dias.",
    "Core improves how each task is executed, every day.",
  ],
  [
    "No dia a dia da sua empresa, você precisa: responder cliente, organizar demandas, estruturar ideias, analisar informações ou tomar decisões. No Core, você não começa escrevendo ou organizando do zero. Você escolhe o agente certo para o tipo de tarefa que precisa resolver.",
    "In your company’s day to day, you need to answer customers, organize demand, structure ideas, analyze information, or make decisions. In Core, you do not start by writing or organizing from scratch. You choose the right agent for the type of task you need to solve.",
  ],
  [
    "Em vez de uma IA genérica para tudo, você usa agentes especializados. Por exemplo: um agente foca em escrita, outro em organização de tarefas, outro em análise de conteúdo. Cada um já foi pensado para resolver aquele tipo de problema com eficiência, clareza e padrão.",
    "Instead of a generic AI for everything, you use specialized agents. For example: one agent focuses on writing, another on task organization, another on content analysis. Each one was designed to solve that type of problem with efficiency, clarity, and standards.",
  ],
  [
    "O agente não só responde , ele organiza a execução. O conteúdo já vem claro, estruturado e com objetivo definido. Você não precisa revisar várias vezes, ajustar manualmente ou recomeçar. Grande parte do trabalho já vem pronta para uso.",
    "The agent does not just answer; it organizes execution. The content already comes clear, structured, and with a defined objective. You do not need to review several times, adjust manually, or restart. Much of the work already comes ready to use.",
  ],
  [
    "Sem o Core, cada pessoa resolve do seu jeito. Com o Core, todos usam os mesmos agentes para executar tarefas. Isso cria consistência, melhora a qualidade das entregas e reduz variação entre pessoas.",
    "Without Core, each person solves things their own way. With Core, everyone uses the same agents to execute tasks. This creates consistency, improves delivery quality, and reduces variation between people.",
  ],
  [
    "Tarefas que antes levavam tempo para pensar, estruturar e executar passam a acontecer muito mais rápido. Menos tempo organizando, menos erro, menos retrabalho. A equipe produz mais sem precisar aumentar esforço.",
    "Tasks that used to take time to think through, structure, and execute start happening much faster. Less time organizing, fewer errors, less rework. The team produces more without needing more effort.",
  ],
  [
    "Quando a execução tem padrão, a operação naturalmente se organiza. Fica mais fácil entender o que está sendo feito, o que está travando e onde melhorar. Você começa a ter mais controle sem precisar acompanhar tudo manualmente.",
    "When execution has standards, the operation naturally becomes organized. It becomes easier to understand what is being done, what is stuck, and where to improve. You gain more control without needing to follow everything manually.",
  ],
  ["Quando você usa IA do jeito certo", "When you use AI the right way"],
  [
    "sua equipe para de começar tudo do zero",
    "your team stops starting everything from scratch",
  ],
  [
    "tarefas viram execução guiada, não improviso",
    "tasks become guided execution, not improvisation",
  ],
  [
    "textos, análises e respostas já saem no padrão",
    "texts, analyses, and responses already come out standardized",
  ],
  ["informações deixam de ficar soltas", "information stops being scattered"],
  [
    "decisões ficam mais rápidas e consistentes",
    "decisions become faster and more consistent",
  ],
  [
    "Antes: alguém escreve, alguém revisa, alguém ajusta.",
    "Before: someone writes, someone reviews, someone adjusts.",
  ],
  [
    "Depois: já sai estruturado e pronto.",
    "After: it already comes out structured and ready.",
  ],
  [
    "Sua equipe produz mais no mesmo tempo.",
    "Your team produces more in the same amount of time.",
  ],
  [
    "Quando o problema não é tarefa , é a operação inteira",
    "When the problem is not a task, but the entire operation",
  ],
  [
    "tarefas deixam de existir como esforço manual",
    "tasks stop existing as manual effort",
  ],
  [
    "sistemas começam a conversar entre si",
    "systems start talking to each other",
  ],
  [
    "dados viram informação em tempo real",
    "data becomes real-time information",
  ],
  [
    "decisões deixam de depender de acompanhamento constante",
    "decisions stop depending on constant follow-up",
  ],
  [
    "Sem Supra: pedido entra, alguém registra, alguém organiza, alguém acompanha, alguém cobra.",
    "Without Supra: a request comes in, someone records it, someone organizes it, someone follows up, someone chases it.",
  ],
  [
    "Com Supra: pedido entra, já estruturado, já encaminhado, já integrado ao fluxo, já visível para decisão.",
    "With Supra: a request comes in already structured, routed, integrated into the flow, and visible for decision-making.",
  ],
  [
    "A operação roda , sem depender de alguém empurrar.",
    "The operation runs without depending on someone pushing it forward.",
  ],
  ["Destravar minha operação agora", "Unlock my operation now"],
  [
    "Hoje, o mesmo processo pode ser executado de formas diferentes dentro da sua empresa , dependendo de quem faz.",
    "Today, the same process can be executed in different ways inside your company depending on who does it.",
  ],
  ["A CerneOps elimina essa variação.", "CerneOps eliminates that variation."],
  [
    "O que precisa ser feito passa a seguir um padrão claro, repetível e consistente, garantindo qualidade independente de quem executa.",
    "What needs to be done starts following a clear, repeatable, and consistent standard, ensuring quality regardless of who executes it.",
  ],
  [
    "Você deixa de depender de acompanhamento manual ou percepção.",
    "You stop depending on manual follow-up or perception.",
  ],
  [
    "Com a operação estruturada, você passa a enxergar o que está acontecendo de verdade , o que foi feito, o que está em andamento e o que está travando.",
    "With a structured operation, you can see what is really happening: what was done, what is in progress, and what is stuck.",
  ],
  [
    "O que hoje exige esforço constante passa a acontecer de forma organizada e previsível.",
    "What currently requires constant effort starts happening in an organized and predictable way.",
  ],
  [
    "A CerneOps transforma tarefas em processos que se repetem com padrão, mantendo qualidade mesmo com aumento de volume.",
    "CerneOps turns tasks into repeatable standardized processes, maintaining quality even as volume increases.",
  ],
  [
    "Você passa a ter histórico, contexto e visibilidade de tudo que acontece na operação.",
    "You gain history, context, and visibility into everything that happens in the operation.",
  ],
  [
    "A operação deixa de depender de esforço constante para se manter organizada.",
    "The operation no longer depends on constant effort to stay organized.",
  ],
  [
    "Processos bem definidos mantêm a estrutura funcionando no dia a dia, sem necessidade de reorganizar tudo o tempo todo.",
    "Well-defined processes keep the structure working day to day without needing to reorganize everything all the time.",
  ],
  [
    "Com a CerneOps, sua operação está preparada para crescer mantendo controle, padrão e eficiência , sem aumentar proporcionalmente a complexidade.",
    "With CerneOps, your operation is prepared to grow while maintaining control, standards, and efficiency without increasing complexity proportionally.",
  ],
  [
    "Você usa para escrever, organizar, analisar e estruturar tudo que hoje sua equipe faz manualmente , só que mais rápido, com padrão e sem retrabalho.",
    "You use it to write, organize, analyze, and structure everything your team currently does manually, only faster, with standards and without rework.",
  ],
  [
    "Gera textos, respostas e conteúdos prontos para uso (e-mail, atendimento, cobrança, comunicação)",
    "Generates ready-to-use texts, responses, and content (email, service, billing, communication)",
  ],
  [
    "Organiza tarefas e transforma demandas em listas executáveis",
    "Organizes tasks and turns demand into executable lists",
  ],
  [
    "Resume e estrutura informações (documentos, reuniões, ideias)",
    "Summarizes and structures information (documents, meetings, ideas)",
  ],
  [
    "Analisa dados simples e gera relatórios claros",
    "Analyzes simple data and generates clear reports",
  ],
  [
    "Reescreve conteúdos com objetivo específico (vender, cobrar, explicar)",
    "Rewrites content with a specific objective (sell, collect, explain)",
  ],
  [
    "Classifica e organiza informações automaticamente",
    "Classifies and organizes information automatically",
  ],
  [
    "Apoia decisões com base no que já foi processado",
    "Supports decisions based on what has already been processed",
  ],
  [
    "Sua equipe produz mais no mesmo tempo",
    "Your team produces more in the same time",
  ],
  ["Você reduz erro e retrabalho", "You reduce errors and rework"],
  ["A operação fica mais organizada", "The operation becomes more organized"],
  [
    "Você ganha clareza do que está acontecendo",
    "You gain clarity about what is happening",
  ],
  [
    "Aqui não é você usando uma ferramenta.",
    "Here, you are not just using a tool.",
  ],
  [
    "A gente entende sua operação, desenha os fluxos e entrega tudo funcionando , integrado ao seu dia a dia.",
    "We understand your operation, design the flows, and deliver everything working, integrated into your daily routine.",
  ],
  [
    "Mapeamos como sua operação funciona hoje",
    "We map how your operation works today",
  ],
  ["Desenhamos fluxos mais eficientes", "We design more efficient flows"],
  ["Automatizamos tarefas repetitivas", "We automate repetitive tasks"],
  [
    "Integramos sistemas que hoje não se conversam",
    "We integrate systems that currently do not talk to each other",
  ],
  [
    "Criamos relatórios automáticos da sua operação",
    "We create automatic reports for your operation",
  ],
  [
    "Organizamos dados para decisão em tempo real",
    "We organize data for real-time decisions",
  ],
  [
    "Sua operação para de depender de controle manual",
    "Your operation stops depending on manual control",
  ],
  ["Você reduz custo operacional", "You reduce operating cost"],
  [
    "Os processos passam a rodar com padrão",
    "Processes start running with standards",
  ],
  [
    "Você ganha escala sem aumentar equipe",
    "You gain scale without increasing the team",
  ],
  [
    "Você tem tudo que o Core oferece , no mais alto nível do Dominus , e ainda uma operação desenhada, adaptada e implantada para a sua realidade.",
    "You get everything Core offers at the highest Dominus level, plus an operation designed, adapted, and implemented for your reality.",
  ],
  ["Mapeamos onde você perde dinheiro", "We map where you lose money"],
  [
    "Entramos na sua operação para identificar gargalos, retrabalho e tarefas que não deveriam ser manuais. Aqui não é diagnóstico superficial, é entender o que realmente trava sua empresa.",
    "We enter your operation to identify bottlenecks, rework, and tasks that should not be manual. This is not superficial diagnosis; it is understanding what really blocks your company.",
  ],
  [
    "Reorganizamos sua operação com fluxos claros, simples e executáveis. Cada etapa passa a ter padrão, lógica e previsibilidade , sem depender de improviso.",
    "We reorganize your operation with clear, simple, executable flows. Each step gains standardization, logic, and predictability without depending on improvisation.",
  ],
  [
    "Você usa todos os agentes, recursos e capacidades do Dominus no nível mais completo. Organizados dentro do seu processo, não soltos como ferramenta. Tirando gaps, padronizando tarefas diárias e reduzindo desperdícios.",
    "You use all Dominus agents, resources, and capabilities at the most complete level, organized inside your process instead of loose as a tool, removing gaps, standardizing daily tasks, and reducing waste.",
  ],
  [
    "Construímos o que sua operação precisa",
    "We build what your operation needs",
  ],
  [
    "Criamos automações, integrações e estruturas específicas para o seu negócio. Se não existe pronto, a gente desenvolve.",
    "We create automations, integrations, and structures specific to your business. If it does not exist ready-made, we build it.",
  ],
  ["Implantamos até rodar de verdade", "We implement until it truly runs"],
  [
    "Nada fica no papel. A operação entra em funcionamento, é ajustada com sua equipe e passa a rodar com padrão, controle e previsibilidade.",
    "Nothing stays on paper. The operation goes live, is adjusted with your team, and starts running with standards, control, and predictability.",
  ],
  ["Menos papel. Mais cuidado.", "Less paperwork. More care."],
  ["Gestão que não dorme.", "Management that does not sleep."],
  [
    "Uma equipe de alto desempenho com menos esforço.",
    "A high-performance team with less effort.",
  ],
  [
    "Operação sincronizada, sem gargalos.",
    "Synchronized operation, without bottlenecks.",
  ],
  ["Gestão simples, foco no ensino.", "Simple management, focus on teaching."],
  ["Menos rotina, mais estratégia.", "Less routine, more strategy."],
  [
    "Experiência fluida, operação invisível.",
    "Fluid experience, invisible operation.",
  ],
  [
    "Processo padronizado, resultado confiável.",
    "Standardized process, reliable result.",
  ],
  [
    "Ordem, histórico e execução sem falhas.",
    "Order, history, and flawless execution.",
  ],
  [
    "Mais performance. Menos custo operacional.",
    "More performance. Lower operating cost.",
  ],
  [
    "Outro organiza tarefas e prioridades.",
    "Another organizes tasks and priorities.",
  ],
  [
    "Outro analisa informações e identifica o que importa.",
    "Another analyzes information and identifies what matters.",
  ],
  [
    "Outro estrutura decisões com base no contexto.",
    "Another structures decisions based on context.",
  ],
  [
    "Na prática, é como ter pessoas focadas em cada tipo de trabalho, só que com mais velocidade, mais padrão e sem o desgaste de fazer tudo manualmente.",
    "In practice, it is like having people focused on each type of work, only with more speed, more standardization, and without the burden of doing everything manually.",
  ],
  [
    "agora já começa estruturado e pronto para execução.",
    "now already starts structured and ready for execution.",
  ],
  [
    "Para de perder tempo com tarefas que não deveriam ser difíceis.",
    "Stop losing time on tasks that should not be difficult.",
  ],
  [
    "E começa a produzir mais, com menos esforço, menos erro e muito mais consistência.",
    "And start producing more, with less effort, fewer errors, and much more consistency.",
  ],
  [
    "A operação começa a ficar organizada",
    "The operation starts getting organized",
  ],
  ["/ Setores atendidos", "/ Industries served"],
  [
    "Atendemos empresas de todos os tamanhos",
    "We serve companies of all sizes",
  ],
  ["e de todos os setores.", "and all industries."],
  [
    "Se existe operação, existe ganho com a CerneOps.",
    "If there is an operation, CerneOps can improve it.",
  ],
  [
    "O problema não é o setor. É como a operação roda hoje.",
    "The issue is not the industry. It is how the operation runs today.",
  ],
  ["Saúde", "Healthcare"],
  ["Agronegócio", "Agribusiness"],
  ["Indústria", "Industry"],
  ["Comércio", "Retail"],
  ["Serviços", "Services"],
  ["Construção Civil", "Construction"],
  ["Logística", "Logistics"],
  ["Educação", "Education"],
  ["Jurídico", "Legal"],
  ["Hotelaria", "Hospitality"],
  ["Financeiro", "Finance"],
  ["Vendas e Comercial", "Sales and Commercial"],
  [
    "Atendimento e Relacionamento com Cliente",
    "Customer Service and Relations",
  ],
  ["Financeiro e Administrativo", "Finance and Administration"],
  ["Gestão e Produtividade do Gestor", "Management and Productivity"],
  ["Operação Alimentícia", "Food Operations"],
  ["Operação Analítica", "Analytical Operations"],
  ["Operação e Logística", "Operations and Logistics"],
  ["Segurança do Trabalho e Compliance", "Workplace Safety and Compliance"],
  ["Clínicas e Laboratórios", "Clinics and Laboratories"],
  ["Manutenção / Serviços Técnicos", "Maintenance / Technical Services"],
  ["PARA SUA EMPRESA", "FOR YOUR COMPANY"],
  ["Fechar", "Close"],
  [
    "Você não precisa se encaixar em um sistema.",
    "You do not need to fit into a system.",
  ],
  [
    "A sua operação é que precisa funcionar melhor.",
    "Your operation is what needs to work better.",
  ],
  ["/ Planos do Core", "/ Core plans"],
  ["Escolha o tamanho", "Choose the size"],
  ["da sua operação.", "of your operation."],
  [
    "Você começa simples e evolui conforme sua operação cresce.",
    "Start simple and evolve as your operation grows.",
  ],
  ["Descoberta", "Discovery"],
  ["Entrada", "Entry"],
  ["Aceleração", "Acceleration"],
  ["Escala", "Scale"],
  ["Domínio", "Mastery"],
  ["Gratuito", "Free"],
  ["MAIS ESCOLHIDO", "MOST CHOSEN"],
  ["Mais completo", "Most complete"],
  ["Ver detalhes", "View details"],
  ["/ Próximo passo", "/ Next step"],
  ["Pronto para fazer sua operação", "Ready to make your operation"],
  ["funcionar de verdade?", "truly work?"],
  [
    "Comece pelo Core ou converse com nosso time sobre uma implementação Supra dedicada.",
    "Start with Core or talk to our team about a dedicated Supra implementation.",
  ],
  ["Entrar no CerneOps Core", "Enter CerneOps Core"],
  ["Falar com Especialista", "Talk to a specialist"],
  ["/ Demonstração CerneOps", "/ CerneOps Demo"],
  ["Teste uma demonstração de nossos agentes", "Try a demo of our agents"],
  [
    "Escolha um especialista, carregue um exemplo e veja como uma análise pode sair organizada para a sua operação.",
    "Choose a specialist, load an example, and see how an analysis can come out organized for your operation.",
  ],
  ["Testar agora", "Try now"],
  ["Testar depois", "Try later"],
  ["/ CerneOps Supra", "/ CerneOps Supra"],
  ["Fale com um especialista", "Talk to a specialist"],
  [
    "Conte como sua operação roda hoje. Nosso time entra em contato para estruturar a melhor implementação Supra para sua empresa.",
    "Tell us how your operation runs today. Our team will contact you to structure the best Supra implementation for your company.",
  ],
  ["Nome completo", "Full name"],
  ["Empresa", "Company"],
  ["E-mail corporativo", "Business email"],
  ["Telefone / WhatsApp", "Phone / WhatsApp"],
  ["Descreva seu cenário e objetivos.", "Describe your scenario and goals."],
  [
    "Mensagem enviada com sucesso. Vamos falar com você em breve.",
    "Message sent successfully. We will contact you soon.",
  ],
  ["Enviando...", "Sending..."],
  ["Enviar para especialista", "Send to specialist"],
  ["/ Agentes CerneOps", "/ CerneOps Agents"],
  ["Agentes Core da CerneOps,", "CerneOps Core Agents,"],
  [
    "Eliminação de Burocracia com zero código.",
    "Bureaucracy elimination with zero code.",
  ],
  ["Contexto e Princípios de Design", "Context and Design Principles"],
  ["Catálogo de Agentes Core", "Core Agent Catalog"],
  [
    "Carregando catálogo oficial de agentes...",
    "Loading official agent catalog...",
  ],
  ["Ativo", "Active"],
  ["Inativo", "Inactive"],
  ["Em Manutenção", "Under Maintenance"],
  ["Em Breve", "Coming Soon"],
  ["Conhecer planos", "View plans"],
  ["Ver outros agentes", "See other agents"],
  ["Começar agora", "Start now"],
  ["Ver todos os agentes", "View all agents"],
  ["Agente Core", "Core Agent"],
  ["Voltar ao catálogo", "Back to catalog"],
  ["Experimente a CerneOps Core", "Try CerneOps Core"],
  ["/ Porque?", "/ Why?"],
  ["Porque a CerneOps", "Why CerneOps"],
  [
    "Se voce se identificar em alguns desses motivos, nao pense duas vezes.",
    "If you recognize yourself in some of these reasons, do not think twice.",
  ],
  ["Plano não encontrado", "Plan not found"],
  [
    "Esse plano não está disponível no momento.",
    "This plan is not available right now.",
  ],
  ["Voltar para planos", "Back to plans"],
  ["Para quem é este plano", "Who this plan is for"],
  ["Capacidade do plano", "Plan capacity"],
  ["O que muda na prática", "What changes in practice"],
  ["Quando subir de plano", "When to upgrade"],
  ["Pronto para operar melhor?", "Ready to operate better?"],
  ["Começar Trial", "Start Trial"],
  ["Assinar plano", "Subscribe to plan"],
  ["Falar com especialista", "Talk to a specialist"],
  ["usuários", "users"],
  ["tarefas/dia", "tasks/day"],
  ["tarefas Trial", "Trial tasks"],
  ["tarefas/mês", "tasks/month"],
  ["uploads/dia", "uploads/day"],
  ["retenção dias", "retention days"],
  ["suporte", "support"],
  ["prioridade", "priority"],
  ["/ Assinatura Core", "/ Core subscription"],
  ["Continuar cadastro", "Continue signup"],
  ["Ver planos novamente", "View plans again"],
  ["Voltar ao plano", "Back to plan"],
  ["Fechar modal Trial", "Close Trial modal"],
  [
    "© 2026 CERNEOPS · TODOS OS DIREITOS RESERVADOS",
    "© 2026 CERNEOPS · ALL RIGHTS RESERVED",
  ],
]);

const originalText = new WeakMap<Text, string>();

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export function translateText(text: string, locale: Locale) {
  if (locale !== "en-US") return text;
  return textTranslations.get(normalizeText(text)) ?? text;
}

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage?.getItem(STORAGE_KEY);
    if (stored === "en-US" || stored === "pt-BR") return stored;
  } catch {
    // Some embedded browser contexts disable localStorage.
  }

  const cookieLocale = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${COOKIE_KEY}=`))
    ?.split("=")[1];
  return cookieLocale === "en-US" || cookieLocale === "pt-BR"
    ? cookieLocale
    : DEFAULT_LOCALE;
}

function persistLocale(locale: Locale) {
  try {
    window.localStorage?.setItem(STORAGE_KEY, locale);
  } catch {
    // Cookie persistence below keeps the selector usable.
  }

  try {
    document.cookie = `${COOKIE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // If cookies are also blocked, the in-memory React state still changes.
  }
}

function shouldSkipNode(node: Node) {
  const parent = node.parentElement;
  return Boolean(
    parent?.closest("[data-i18n-frozen='true'], script, style, noscript"),
  );
}

function applyTextCatalog(locale: Locale) {
  if (typeof document === "undefined") return;

  document.documentElement.lang = locale;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);

  for (const node of nodes) {
    if (shouldSkipNode(node)) continue;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue ?? "");
    const source = originalText.get(node) ?? "";
    const translated = translateText(source, locale);

    if (locale === "en-US" && translated === source) {
      continue;
    }

    if (locale === "en-US" && translated !== source) {
      const prefix = source.match(/^\s*/)?.[0] ?? "";
      const suffix = source.match(/\s*$/)?.[0] ?? "";
      node.nodeValue = `${prefix}${translated}${suffix}`;
    } else {
      node.nodeValue = source;
    }
  }
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    setLocaleState(readStoredLocale());
  }, []);

  useEffect(() => {
    applyTextCatalog(locale);
    const observer = new MutationObserver(() => applyTextCatalog(locale));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    const currentLocale = readStoredLocale();
    if (nextLocale === currentLocale) {
      setLocaleState(nextLocale);
      return;
    }
    persistLocale(nextLocale);
    window.location.reload();
  }, []);

  const t = useCallback(
    (text: string) => translateText(text, locale),
    [locale],
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, isEnglish: locale === "en-US", t }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

export function getInitialLocaleScript() {
  return `try{var l=(window.localStorage&&window.localStorage.getItem('${STORAGE_KEY}'))||'';if(l!=='en-US'&&l!=='pt-BR'){var m=document.cookie.match(/(?:^|; )${COOKIE_KEY}=([^;]+)/);l=m?decodeURIComponent(m[1]):'';}if(l==='en-US'||l==='pt-BR'){document.documentElement.lang=l;}}catch(e){}`;
}
