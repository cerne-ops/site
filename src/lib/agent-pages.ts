export type AgentMarkdownBlock =
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type AgentPage = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  agentName: string;
  agentGroup: string;
  keywords: string[];
  content: string;
  blocks: AgentMarkdownBlock[];
};

const rawAgentModules = import.meta.glob("../../Agentes/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatter(markdown: string) {
  if (!markdown.startsWith("---")) {
    return {
      frontmatter: {} as Record<string, string | string[]>,
      content: markdown.trim(),
    };
  }

  const end = markdown.indexOf("\n---", 3);
  if (end === -1) {
    return {
      frontmatter: {} as Record<string, string | string[]>,
      content: markdown.trim(),
    };
  }

  const yaml = markdown.slice(3, end).trim();
  const content = markdown.slice(end + 4).trim();
  const frontmatter: Record<string, string | string[]> = {};
  let currentListKey: string | null = null;

  for (const line of yaml.split(/\r?\n/)) {
    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && currentListKey) {
      const current = frontmatter[currentListKey];
      const nextValue = stripQuotes(listMatch[1] ?? "");
      frontmatter[currentListKey] = Array.isArray(current)
        ? [...current, nextValue]
        : [nextValue];
      continue;
    }

    const keyValueMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!keyValueMatch) continue;

    const key = keyValueMatch[1] ?? "";
    const value = keyValueMatch[2] ?? "";
    if (!value.trim()) {
      frontmatter[key] = [];
      currentListKey = key;
      continue;
    }

    frontmatter[key] = stripQuotes(value);
    currentListKey = null;
  }

  return { frontmatter, content };
}

function parseMarkdownBlocks(markdown: string): AgentMarkdownBlock[] {
  const blocks: AgentMarkdownBlock[] = [];
  const paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (!paragraphLines.length) return;
    blocks.push({ type: "paragraph", text: paragraphLines.join(" ").trim() });
    paragraphLines.length = 0;
  };

  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: "list", items: listItems });
    listItems = [];
  };

  for (const rawLine of markdown.split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length as 1 | 2 | 3 | 4,
        text: headingMatch[2] ?? "",
      });
      continue;
    }

    const listMatch = line.match(/^[-*]\s+(.+)$/);
    if (listMatch) {
      flushParagraph();
      listItems.push(listMatch[1] ?? "");
      continue;
    }

    flushList();
    paragraphLines.push(line);
  }

  flushParagraph();
  flushList();
  return blocks;
}

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function asStringArray(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function hasLiteralTruncation(value: string) {
  return value.includes("…") || value.includes("...");
}

function normalizeAgentLookupKey(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

const agentPages = Object.values(rawAgentModules)
  .map((markdown) => {
    const { frontmatter, content } = parseFrontmatter(markdown);
    const title = asString(frontmatter.title);
    const slug = asString(frontmatter.slug);
    const agentName = asString(frontmatter.agent_name) || title;
    const metaTitle = asString(frontmatter.meta_title);
    const metaDescription = asString(frontmatter.meta_description);

    if (!slug || !title) return null;

    return {
      title,
      slug,
      metaTitle:
        metaTitle && !hasLiteralTruncation(metaTitle) ? metaTitle : title,
      metaDescription:
        metaDescription && !hasLiteralTruncation(metaDescription)
          ? metaDescription
          : title ||
            `Conheça o ${agentName} da CerneOps para reduzir burocracia e acelerar rotinas operacionais.`,
      agentName,
      agentGroup: asString(frontmatter.agent_group) || "Agentes CerneOps",
      keywords: asStringArray(frontmatter.keywords),
      content,
      blocks: parseMarkdownBlocks(content),
    } satisfies AgentPage;
  })
  .filter((agent): agent is AgentPage => Boolean(agent))
  .sort((a, b) => a.agentName.localeCompare(b.agentName, "pt-BR"));

const agentsBySlug = new Map(agentPages.map((agent) => [agent.slug, agent]));
const searchableAgentNames = agentPages.map((agent) => ({
  key: normalizeAgentLookupKey(agent.agentName),
  slug: agent.slug,
}));
const slugsByAgentName = new Map(
  searchableAgentNames.map((agent) => [agent.key, agent.slug]),
);

export function getAgentPages() {
  return agentPages;
}

export function getAgentPageBySlug(slug: string) {
  return agentsBySlug.get(slug);
}

export function getAgentSlugByName(agentName: string) {
  const normalized = normalizeAgentLookupKey(agentName);
  const exactMatch = slugsByAgentName.get(normalized);
  if (exactMatch) return exactMatch;

  const tokens = normalized.split(" ").filter((token) => token.length > 2);
  if (!tokens.length) return undefined;

  const matches = searchableAgentNames.filter((agent) => {
    const agentTokens = new Set(agent.key.split(" "));
    return tokens.every((token) => agentTokens.has(token));
  });

  return matches.length === 1 ? matches[0].slug : undefined;
}
