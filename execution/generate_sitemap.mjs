import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const siteUrl = "https://cerneops.com.br";
const rootDir = process.cwd();
const agentsDir = join(rootDir, "Agentes");
const sitemapPath = join(rootDir, "public", "sitemap.xml");

function readSlug(markdown) {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;
  const slugMatch = frontmatterMatch[1].match(
    /^slug:\s*["']?([^"'\n]+)["']?\s*$/m,
  );
  return slugMatch?.[1]?.trim() || null;
}

const agentSlugs = readdirSync(agentsDir)
  .filter((file) => file.endsWith(".md"))
  .map((file) => readSlug(readFileSync(join(agentsDir, file), "utf8")))
  .filter(Boolean)
  .sort((a, b) => a.localeCompare(b, "pt-BR"));

const paths = [
  "/",
  "/porque",
  "/agentes-cerneops",
  "/planos/trial",
  "/planos/start",
  "/planos/boost",
  "/planos/scale",
  "/planos/dominus",
  ...agentSlugs.map((slug) => `/agentes/${slug}`),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n  </url>`).join("\n")}
</urlset>
`;

writeFileSync(sitemapPath, xml);
console.log(`Generated sitemap with ${paths.length} URLs.`);
