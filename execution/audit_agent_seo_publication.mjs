import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const SITE_URL = "https://cerneops.com.br";
const ROOT_DIR = process.cwd();
const AGENTS_DIR = join(ROOT_DIR, "Agentes");
const REPORT_PATH = join(AGENTS_DIR, "VALIDACAO_PUBLICACAO_SEO.md");
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const ROBOTS_URL = `${SITE_URL}/robots.txt`;

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([a-zA-Z0-9_]+):\s*["']?([^"'\n]+)["']?\s*$/))
      .filter(Boolean)
      .map((lineMatch) => [lineMatch[1], lineMatch[2].trim()]),
  );
}

function readAgentPages() {
  return readdirSync(AGENTS_DIR)
    .filter((file) => /^\d+-.*\.md$/.test(file))
    .map((file) => {
      const markdown = readFileSync(join(AGENTS_DIR, file), "utf8");
      const frontmatter = parseFrontmatter(markdown);
      return {
        file,
        slug: frontmatter.slug,
        title: frontmatter.title,
        metaTitle: frontmatter.meta_title,
        metaDescription: frontmatter.meta_description,
        agentName: frontmatter.agent_name || frontmatter.title,
        url: `${SITE_URL}/agentes/${frontmatter.slug}`,
      };
    })
    .filter((agent) => agent.slug)
    .sort((a, b) => a.slug.localeCompare(b.slug, "pt-BR"));
}

function extractSitemapUrls(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) =>
    match[1].trim(),
  );
}

function extractFirst(html, regex) {
  return html.match(regex)?.[1]?.trim() || "";
}

function hasNoindex(html, headers) {
  const robotsMeta = Array.from(
    html.matchAll(
      /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/gi,
    ),
    (match) => match[1].toLowerCase(),
  ).join(",");
  const xRobots = headers.get("x-robots-tag")?.toLowerCase() || "";
  return robotsMeta.includes("noindex") || xRobots.includes("noindex");
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "CerneOps SEO publication audit",
    },
  });
  const text = await response.text();
  return { response, text };
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

function statusIcon(ok) {
  return ok ? "OK" : "FALHA";
}

function uniqueProblems(values, label) {
  const counts = new Map();
  for (const value of values.filter(Boolean)) {
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([value, count]) => `${label} duplicado (${count}x): ${value}`);
}

function buildReport({
  agentPages,
  sitemapUrls,
  robotsText,
  sitemapStatus,
  robotsStatus,
  pageResults,
}) {
  const agentUrls = agentPages.map((agent) => agent.url);
  const sitemapAgentUrls = sitemapUrls.filter((url) =>
    url.startsWith(`${SITE_URL}/agentes/`),
  );
  const missingFromSitemap = agentUrls.filter(
    (url) => !sitemapUrls.includes(url),
  );
  const brokenPages = pageResults.filter((page) => page.status !== 200);
  const pagesWithProblems = pageResults.filter((page) => page.problems.length);
  const duplicateTitleProblems = uniqueProblems(
    pageResults.map((page) => page.title),
    "title",
  );
  const duplicateDescriptionProblems = uniqueProblems(
    pageResults.map((page) => page.description),
    "meta description",
  );
  const problems = [
    sitemapStatus === 200 ? null : `Sitemap retornou HTTP ${sitemapStatus}.`,
    robotsStatus === 200 ? null : `Robots retornou HTTP ${robotsStatus}.`,
    robotsText.includes("Sitemap: https://cerneops.com.br/sitemap.xml")
      ? null
      : "robots.txt nao declara o sitemap publico.",
    /disallow:\s*\/agentes/i.test(robotsText)
      ? "robots.txt bloqueia /agentes/."
      : null,
    missingFromSitemap.length
      ? `${missingFromSitemap.length} paginas de agentes ausentes do sitemap.`
      : null,
    brokenPages.length
      ? `${brokenPages.length} paginas nao retornaram 200.`
      : null,
    ...duplicateTitleProblems,
    ...duplicateDescriptionProblems,
    ...pagesWithProblems.flatMap((page) =>
      page.problems.map((problem) => `${page.url}: ${problem}`),
    ),
  ].filter(Boolean);

  const generatedAt = new Date().toISOString();
  const pageRows = pageResults
    .map(
      (page) =>
        `| ${page.url} | ${page.status} | ${statusIcon(page.hasTitle)} | ${statusIcon(page.hasDescription)} | ${statusIcon(page.hasCanonical)} | ${statusIcon(page.hasJsonLd)} | ${statusIcon(page.hasH1)} | ${statusIcon(!page.noindex)} | ${page.problems.join("; ") || "OK"} |`,
    )
    .join("\n");
  const urlList = agentUrls.map((url) => `- ${url}`).join("\n");
  const recommendationList = [
    "Enviar `https://cerneops.com.br/sitemap.xml` no Google Search Console.",
    "Usar Inspecao de URL para home, catalogo e agentes prioritarios.",
    "Validar GTM com Preview/Tag Assistant apos configurar `NEXT_PUBLIC_GTM_ID` no ambiente de deploy.",
    "Marcar `sign_up`, `trial_started` e `purchase` como key events no GA4 quando os eventos reais do Core/checkout estiverem chegando.",
    "Importar key events do GA4 para Google Ads depois de confirmar recebimento e deduplicacao.",
  ];

  return `# Validacao de publicacao SEO dos agentes CerneOps

Gerado em: ${generatedAt}

## Resumo

- Total de paginas de agentes encontradas localmente: ${agentPages.length}
- Total de URLs no sitemap publico: ${sitemapUrls.length}
- Total de paginas de agentes no sitemap publico: ${sitemapAgentUrls.length}
- Status do sitemap: HTTP ${sitemapStatus}
- Status do robots.txt: HTTP ${robotsStatus}
- Paginas de agentes ausentes do sitemap: ${missingFromSitemap.length}
- Paginas de agentes com HTTP diferente de 200: ${brokenPages.length}
- Paginas com problemas tecnicos detectados: ${pagesWithProblems.length}

## Validacao robots.txt

- Sitemap declarado: ${statusIcon(robotsText.includes("Sitemap: https://cerneops.com.br/sitemap.xml"))}
- Bloqueio de /agentes/: ${/disallow:\s*\/agentes/i.test(robotsText) ? "FALHA" : "OK"}

## URLs de agentes

${urlList}

## Status tecnico por URL

| URL | HTTP | title | meta description | canonical | JSON-LD | H1 | indexavel | problemas |
| --- | ---: | --- | --- | --- | --- | --- | --- | --- |
${pageRows}

## Problemas encontrados

${problems.length ? problems.map((problem) => `- ${problem}`).join("\n") : "- Nenhum problema tecnico bloqueante encontrado na auditoria automatizada."}

## Recomendacoes

${recommendationList.map((item) => `- ${item}`).join("\n")}

## Observacoes de escopo

- Esta auditoria nao altera conteudo Markdown, identidade visual, Admin, Core, planos ou dados dinamicos.
- Responsividade e eventos do dataLayer devem ser confirmados tambem em navegador/Tag Assistant, pois dependem do runtime client-side.
- Eventos de conversao finais como \`sign_up\`, \`trial_started\` e \`purchase\` devem ser emitidos no ambiente onde a acao real acontece, sem enviar dados sensiveis.
`;
}

async function main() {
  const agentPages = readAgentPages();
  const [
    { response: sitemapResponse, text: sitemapXml },
    { response: robotsResponse, text: robotsText },
  ] = await Promise.all([fetchText(SITEMAP_URL), fetchText(ROBOTS_URL)]);
  const sitemapUrls = extractSitemapUrls(sitemapXml);

  const pageResults = await mapWithConcurrency(agentPages, 8, async (agent) => {
    try {
      const { response, text } = await fetchText(agent.url);
      const canonical = extractFirst(
        text,
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i,
      );
      const title = extractFirst(text, /<title[^>]*>([^<]+)<\/title>/i);
      const description = extractFirst(
        text,
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
      );
      const h1 = extractFirst(text, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(
        /<[^>]+>/g,
        "",
      );
      const hasJsonLd =
        /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i.test(text);
      const hasOpenGraph =
        /<meta[^>]+property=["']og:title["'][^>]+content=/i.test(text) &&
        /<meta[^>]+property=["']og:description["'][^>]+content=/i.test(text);
      const hasTwitterCard =
        /<meta[^>]+name=["']twitter:card["'][^>]+content=/i.test(text) &&
        /<meta[^>]+name=["']twitter:title["'][^>]+content=/i.test(text);
      const hasCta =
        text.includes("/planos/trial") || text.includes("/#planos");
      const hasCatalogLink = text.includes("/agentes-cerneops");
      const noindex = hasNoindex(text, response.headers);
      const expectedCanonical = agent.url;
      const problems = [
        response.status === 200 ? null : `HTTP ${response.status}`,
        title ? null : "title ausente",
        description ? null : "meta description ausente",
        canonical === expectedCanonical
          ? null
          : `canonical inesperado (${canonical || "ausente"})`,
        h1 ? null : "H1 ausente",
        hasJsonLd ? null : "JSON-LD ausente",
        hasOpenGraph ? null : "Open Graph incompleto",
        hasTwitterCard ? null : "Twitter Card incompleto",
        hasCta ? null : "CTA nao encontrado no HTML inicial",
        hasCatalogLink ? null : "link interno para catalogo ausente",
        noindex ? "noindex detectado" : null,
      ].filter(Boolean);

      return {
        url: agent.url,
        status: response.status,
        title,
        description,
        hasTitle: Boolean(title),
        hasDescription: Boolean(description),
        hasCanonical: canonical === expectedCanonical,
        hasJsonLd,
        hasH1: Boolean(h1),
        noindex,
        problems,
      };
    } catch (error) {
      return {
        url: agent.url,
        status: 0,
        title: "",
        description: "",
        hasTitle: false,
        hasDescription: false,
        hasCanonical: false,
        hasJsonLd: false,
        hasH1: false,
        noindex: false,
        problems: [`falha ao buscar URL: ${error.message}`],
      };
    }
  });

  mkdirSync(dirname(REPORT_PATH), { recursive: true });
  writeFileSync(
    REPORT_PATH,
    buildReport({
      agentPages,
      sitemapUrls,
      robotsText,
      sitemapStatus: sitemapResponse.status,
      robotsStatus: robotsResponse.status,
      pageResults,
    }),
  );

  console.log(`Agent pages: ${agentPages.length}`);
  console.log(`Sitemap URLs: ${sitemapUrls.length}`);
  console.log(
    `Sitemap agent URLs: ${
      sitemapUrls.filter((url) => url.startsWith(`${SITE_URL}/agentes/`)).length
    }`,
  );
  console.log(
    `Pages with problems: ${
      pageResults.filter((page) => page.problems.length).length
    }`,
  );
  console.log(`Report: ${REPORT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
