import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { WhyCerneNotChat } from "@/components/site/WhyCerneNotChat";
import { Pillars } from "@/components/site/Pillars";
import { Products } from "@/components/site/Products";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Sectors } from "@/components/site/Sectors";
import { CoreHowItWorks } from "@/components/site/CoreHowItWorks";
import { Plans } from "@/components/site/Plans";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <SectionQuote
          text="Porque a CerneOps? 1. O pequeno empresário sofre menos por “falta de tecnologia” e mais por falta de tempo operacional, equipe instável, custos subindo, trabalho administrativo demais, comunicação desorganizada, falhas de rotina, controle ruim de demanda/estoque e atraso no financeiro. Em 2025, NFIB apontou taxes, labor quality, inflation e labor costs entre os principais problemas dos pequenos negócios; a Câmara de Comércio dos EUA destacou custos crescentes como uma das maiores barreiras ao crescimento; e no varejo alimentar independente houve pressão simultânea de turnover, shrink e despesas operacionais. Na saúde, a AMA segue apontando carga administrativa e falta de equipe como fatores relevantes de desgaste operacional."
        />
        <WhyCerneNotChat />
        <SectionQuote
          text="Porque a CerneOps? 2. O maior gargalo não é conhecimento nem tecnologia, é tempo operacional. O empresário acumula funções, divide atenção entre financeiro, atendimento e gestão, e ainda executa tarefas básicas do negócio. Pesquisas indicam que donos de pequenas empresas gastam grande parte do tempo em atividades administrativas em vez de crescimento [SCORE], e mesmo trabalhando longas horas não conseguem acompanhar a operação [SBA]. O resultado é simples: o negócio não escala porque o dono está preso na execução."
        />
        <Pillars />
        <SectionQuote
          text="Porque a CerneOps? 3. A dificuldade de contratar, treinar e manter pessoas qualificadas impacta diretamente a consistência da operação. A qualidade da mão de obra segue entre os principais problemas dos pequenos negócios [NFIB], e a escassez de mão de obra, limita crescimento e aumenta o estresse operacional [World Economic Forum]. Isso cria um ambiente onde tudo depende de quem executa, e não de um processo confiável."
        />
        <Products />
        <SectionQuote
          text="Porque a CerneOps? 4. Os custos seguem pressionando o negócio em todas as frentes. Inflação, aumento de salários e insumos reduzem margem e limitam capacidade de investimento [NFIB], enquanto custos crescentes continuam sendo uma das maiores barreiras ao crescimento [U.S. Chamber of Commerce]. Nesse contexto, contratar mais pessoas para resolver problemas operacionais deixa de ser viável, e muitas vezes piora o cenário."
        />
        <HowItWorks />
        <SectionQuote
          text="Porque a CerneOps? 5. Grande parte dos problemas vem do excesso de tarefas administrativas e operacionais repetitivas. O tempo da equipe é consumido por controles manuais, organização de informação, comunicação desestruturada e retrabalho. A carga administrativa reduz o tempo disponível para atividades essenciais [European Commission], e é uma das principais causas de desgaste operacional em setores como saúde [American Medical Association]. O negócio passa a operar no limite, sem espaço para evoluir."
        />
        <Sectors />
        <SectionQuote
          text="Porque a CerneOps? 6. Desorganização gera um efeito cascata direto na operação: falhas de estoque, atrasos financeiros, perda de controle e experiência ruim para o cliente. Sem visibilidade e padronização, decisões são tomadas no escuro. E não por acaso, problemas de fluxo de caixa continuam entre as principais causas de falência de pequenos negócios [U.S. Bank]. A operação deixa de ser previsível, e passa a ser reativa."
        />
        <CoreHowItWorks />
        <SectionQuote
          text="Porque a CerneOps? 7. É claro que o problema não é “usar tecnologia”, mas estruturar a operação. Ferramentas isoladas ajudam pontualmente, mas não resolvem o fluxo como um todo. É por isso que a automação aplicada à operação tem impacto direto: pode reduzir erros em até 70% e liberar tempo para atividades estratégicas . Quando tarefas deixam de depender de execução manual, a operação ganha consistência."
        />
        <Plans />
        <SectionQuote
          text="Porque a CerneOps? 8. A CerneOps nasce exatamente desse ponto: o empresário não precisa de mais ferramentas, precisa de uma operação que funcione. Isso significa padronizar tarefas, reduzir dependência de pessoas, eliminar retrabalho e trazer previsibilidade para o dia a dia. No fim, não se trata de tecnologia, mas de capacidade operacional. Porque o que limita o crescimento do pequeno negócio não é falta de acesso à IA, é a falta de estrutura para operar melhor todos os dias."
        />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function SectionQuote({ text }: { text: string }) {
  return (
    <section className="relative py-8 sm:py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center italic text-sm sm:text-base lg:text-lg leading-relaxed text-foreground/75">
          {text}
        </p>
      </div>
    </section>
  );
}
