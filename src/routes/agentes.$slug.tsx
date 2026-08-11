import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bot, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import {
  trackAgentCtaClicked,
  trackAgentPageView,
} from "@/lib/analytics";
import {
  getAgentPageBySlug,
  type AgentMarkdownBlock,
  type AgentPage,
} from "@/lib/agent-pages";

const SITE_URL = "https://cerneops.com.br";
const OG_IMAGE = `${SITE_URL}/og-social.jpg`;

export const Route = createFileRoute("/agentes/$slug")({
  loader: ({ params }) => {
    const agent = getAgentPageBySlug(params.slug);
    if (!agent) {
      throw notFound();
    }
    return agent;
  },
  head: ({ loaderData }) => {
    const agent = loaderData as AgentPage | undefined;
    if (!agent) {
      return {
        meta: [{ title: "Agente não encontrado | CerneOps" }],
      };
    }

    const canonical = `${SITE_URL}/agentes/${agent.slug}`;
    return {
      meta: [
        { title: agent.metaTitle },
        { name: "description", content: agent.metaDescription },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        { property: "og:title", content: agent.metaTitle },
        { property: "og:description", content: agent.metaDescription },
        { property: "og:image", content: OG_IMAGE },
        { property: "og:site_name", content: "CerneOps" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: agent.metaTitle },
        { name: "twitter:description", content: agent.metaDescription },
        { name: "twitter:image", content: OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: canonical }],
    };
  },
  component: AgentPageRoute,
});

function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
        }
        return <span key={`${part}-${index}`}>{part}</span>;
      })}
    </>
  );
}

function MarkdownBlock({ block }: { block: AgentMarkdownBlock }) {
  if (block.type === "heading") {
    if (block.level === 1) {
      return (
        <h2 className="font-display text-4xl font-bold leading-tight text-foreground">
          {block.text}
        </h2>
      );
    }
    if (block.level === 2) {
      return (
        <h2 className="pt-6 font-display text-3xl font-semibold leading-tight text-foreground">
          {block.text}
        </h2>
      );
    }
    return (
      <h3 className="pt-3 font-display text-2xl font-semibold leading-tight text-foreground">
        {block.text}
      </h3>
    );
  }

  if (block.type === "list") {
    return (
      <ul className="space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-ember" />
            <span className="leading-relaxed">
              <InlineText text={item} />
            </span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="text-base leading-8 text-muted-foreground">
      <InlineText text={block.text} />
    </p>
  );
}

function ConversionBand({ agent }: { agent: AgentPage }) {
  return (
    <aside className="my-12 rounded-2xl border border-ember/35 bg-surface-elevated p-7 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="font-display text-3xl font-semibold">
            Transforme essa rotina em minutos com a CerneOps
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Use agentes especializados para reduzir burocracia, organizar
            informações e acelerar tarefas operacionais sem aumentar a
            complexidade da empresa.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/#planos"
            onClick={() =>
              trackAgentCtaClicked({
                agentName: agent.agentName,
                agentSlug: agent.slug,
                agentGroup: agent.agentGroup,
                ctaLabel: "Conhecer planos",
                ctaPosition: "middle",
              })
            }
            className="inline-flex items-center gap-2 rounded-lg gradient-ember px-5 py-3 font-semibold text-primary-foreground shadow-ember transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
          >
            Conhecer planos
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="/agentes-cerneops"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-5 py-3 font-medium transition hover:bg-surface focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
          >
            Ver outros agentes
          </a>
        </div>
      </div>
    </aside>
  );
}

function AgentPageRoute() {
  const agent = Route.useLoaderData();
  const canonical = `${SITE_URL}/agentes/${agent.slug}`;
  const middleIndex = Math.max(4, Math.floor(agent.blocks.length * 0.45));
  const firstBlocks = agent.blocks.slice(0, middleIndex);
  const lastBlocks = agent.blocks.slice(middleIndex);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: agent.agentName,
    description: agent.metaDescription,
    applicationCategory: agent.agentGroup,
    brand: {
      "@type": "Brand",
      name: "CerneOps",
    },
    url: canonical,
    operatingSystem: "Web",
  };

  useEffect(() => {
    trackAgentPageView({
      agentName: agent.agentName,
      agentSlug: agent.slug,
      agentGroup: agent.agentGroup,
    });
  }, [agent.agentGroup, agent.agentName, agent.slug]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-36 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <section className="relative py-10">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              <a href="/" className="transition hover:text-ember">
                Início
              </a>
              <span>/</span>
              <a
                href="/agentes-cerneops"
                className="transition hover:text-ember"
              >
                Agentes
              </a>
              <span>/</span>
              <span className="text-ember">{agent.agentName}</span>
            </nav>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
              <div className="max-w-4xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-ember/35 bg-ember/10 px-3 py-1 text-xs font-medium text-ember">
                  <Bot className="h-3.5 w-3.5" />
                  {agent.agentGroup}
                </div>
                <h1 className="font-display text-4xl font-bold leading-[1.03] sm:text-5xl lg:text-6xl">
                  {agent.agentName}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                  {agent.metaDescription}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="/planos/trial"
                    onClick={() =>
                      trackAgentCtaClicked({
                        agentName: agent.agentName,
                        agentSlug: agent.slug,
                        agentGroup: agent.agentGroup,
                        ctaLabel: "Começar agora",
                        ctaPosition: "hero",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg gradient-ember px-6 py-3.5 font-semibold text-primary-foreground shadow-ember transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
                  >
                    Começar agora
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/agentes-cerneops"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium transition hover:bg-surface focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
                  >
                    Ver todos os agentes
                  </a>
                </div>
              </div>

              <aside className="rounded-2xl border border-border bg-surface/55 p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-ember">
                  Agente Core
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Página pública indexável com conteúdo SEO do agente, descrição
                  operacional e direcionamento para os planos CerneOps.
                </p>
                <a
                  href="/agentes-cerneops"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ember transition hover:text-ember-light focus:outline-none focus:ring-2 focus:ring-ember"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar ao catálogo
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="mx-auto max-w-4xl px-6">
            <article className="space-y-6">
              {firstBlocks.map((block, index) => (
                <MarkdownBlock key={`${block.type}-${index}`} block={block} />
              ))}
              <ConversionBand agent={agent} />
              {lastBlocks.map((block, index) => (
                <MarkdownBlock
                  key={`${block.type}-tail-${index}`}
                  block={block}
                />
              ))}
            </article>
          </div>
        </section>

        <section className="mt-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-2xl border border-ember/35 bg-surface-elevated p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <h2 className="font-display text-4xl font-semibold">
                    Experimente a CerneOps Core
                  </h2>
                  <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">
                    Escolha um plano, acesse os agentes disponíveis e comece a
                    transformar tarefas repetitivas em entregas operacionais
                    mais rápidas e organizadas.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/planos/trial"
                    onClick={() =>
                      trackAgentCtaClicked({
                        agentName: agent.agentName,
                        agentSlug: agent.slug,
                        agentGroup: agent.agentGroup,
                        ctaLabel: "Começar agora",
                        ctaPosition: "footer",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg gradient-ember px-6 py-3.5 font-semibold text-primary-foreground shadow-ember transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
                  >
                    Começar agora
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="/#planos"
                    onClick={() =>
                      trackAgentCtaClicked({
                        agentName: agent.agentName,
                        agentSlug: agent.slug,
                        agentGroup: agent.agentGroup,
                        ctaLabel: "Ver planos",
                        ctaPosition: "footer",
                      })
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-6 py-3.5 font-medium transition hover:bg-surface focus:outline-none focus:ring-2 focus:ring-ember focus:ring-offset-2 focus:ring-offset-background"
                  >
                    Ver planos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
