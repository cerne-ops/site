import { createReadStream, statSync } from "node:fs";
import { dirname, extname, join, normalize, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { createServer } from "node:http";
import handler from "./dist/server/index.js";

const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 4173);
const ROOT_DIR = dirname(fileURLToPath(import.meta.url));
const CLIENT_DIR = join(ROOT_DIR, "dist", "client");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function isSafeStaticPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const normalized = normalize(decoded).replace(/^[/\\]+/, "");
  const absolute = join(CLIENT_DIR, normalized);
  return relative(CLIENT_DIR, absolute).startsWith("..") ? null : absolute;
}

function getCacheControl(pathname) {
  if (/^\/assets\/.+\.[a-z0-9]+$/i.test(pathname)) {
    return "public, max-age=31536000, immutable";
  }

  if (
    /^\/site-hero\//.test(pathname) ||
    /^\/(?:logo|favicon|og-[^/]+|og-image(?:-logo-cerne)?)\.(?:png|jpg|jpeg|webp|avif|ico)$/i.test(
      pathname,
    )
  ) {
    return "public, max-age=86400";
  }

  if (pathname === "/robots.txt" || pathname === "/sitemap.xml") {
    return "public, max-age=300";
  }

  return "no-cache";
}

function serveStatic(pathname, requestMethod, response) {
  const absolute = isSafeStaticPath(pathname);
  if (!absolute) return false;

  let stats;
  try {
    stats = statSync(absolute);
  } catch {
    return false;
  }

  if (!stats.isFile()) return false;

  const ext = extname(absolute).toLowerCase();
  response.writeHead(200, {
    "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
    "Content-Length": String(stats.size),
    "Cache-Control": getCacheControl(pathname),
    "X-Content-Type-Options": "nosniff",
  });

  if (requestMethod === "HEAD") {
    response.end();
    return true;
  }

  createReadStream(absolute).pipe(response);
  return true;
}

function buildRequest(nodeRequest, body) {
  const proto = nodeRequest.headers["x-forwarded-proto"] || "http";
  const host = nodeRequest.headers.host || `${HOST}:${PORT}`;
  const url = new URL(nodeRequest.url || "/", `${proto}://${host}`);

  return new Request(url, {
    method: nodeRequest.method,
    headers: nodeRequest.headers,
    body,
    duplex: body ? "half" : undefined,
  });
}

async function sendFetchResponse(fetchResponse, requestMethod, nodeResponse, pathname) {
  const headers = new Headers(fetchResponse.headers);

  if (pathname.startsWith("/api/")) {
    headers.set("Cache-Control", "no-store");
  } else if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "no-cache");
  }

  headers.set("X-Content-Type-Options", "nosniff");

  nodeResponse.writeHead(
    fetchResponse.status,
    Object.fromEntries(headers.entries()),
  );

  if (requestMethod === "HEAD" || !fetchResponse.body) {
    nodeResponse.end();
    return;
  }

  Readable.fromWeb(fetchResponse.body).pipe(nodeResponse);
}

const server = createServer(async (nodeRequest, nodeResponse) => {
  try {
    const pathname = new URL(
      nodeRequest.url || "/",
      `http://${nodeRequest.headers.host || "localhost"}`,
    ).pathname;

    if (nodeRequest.method === "GET" || nodeRequest.method === "HEAD") {
      if (serveStatic(pathname, nodeRequest.method, nodeResponse)) return;
    }

    const hasBody =
      nodeRequest.method &&
      !["GET", "HEAD"].includes(nodeRequest.method.toUpperCase());
    const request = buildRequest(nodeRequest, hasBody ? nodeRequest : undefined);
    const fetchResponse = await handler.fetch(request, process.env, {});
    await sendFetchResponse(fetchResponse, nodeRequest.method, nodeResponse, pathname);
  } catch (error) {
    console.error("[cerne-site] request failed", error);
    nodeResponse.writeHead(500, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    });
    nodeResponse.end("Internal Server Error");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[cerne-site] production server listening on ${HOST}:${PORT}`);
});
