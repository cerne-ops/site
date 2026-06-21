import { useEffect, useRef, useState } from "react";

const DEFAULT_SORO_EMBED_URL =
  "https://app.trysoro.com/api/embed/f53f5980-f082-408f-bf91-0ceb83221de5?theme=dark";

const SORO_CONTAINER_ID = "soro-blog";
const SORO_SCRIPT_ID = "soro-blog-embed-script";

function getSoroEmbedUrl() {
  return (
    (import.meta.env.VITE_SORO_BLOG_EMBED_URL as string | undefined) ||
    DEFAULT_SORO_EMBED_URL
  ).trim();
}

export function SoroBlogEmbed() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );

  useEffect(() => {
    const host = hostRef.current;
    const embedUrl = getSoroEmbedUrl();

    if (!host || !embedUrl) {
      setStatus("error");
      return;
    }

    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let timeoutId: number | undefined;

    function loadEmbed() {
      if (cancelled) return;

      setStatus("loading");
      const container = document.getElementById(SORO_CONTAINER_ID);
      if (container) container.innerHTML = "";

      const existingScript = document.getElementById(
        SORO_SCRIPT_ID,
      ) as HTMLScriptElement | null;

      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement("script");
      script.id = SORO_SCRIPT_ID;
      script.src = embedUrl;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        if (!cancelled) setStatus("ready");
      };
      script.onerror = () => {
        if (!cancelled) setStatus("error");
      };

      document.body.appendChild(script);
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            loadEmbed();
          }
        },
        { rootMargin: "240px 0px" },
      );
      observer.observe(host);
    } else {
      loadEmbed();
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="academy-soro-shell w-full"
    >
      <div
        id={SORO_CONTAINER_ID}
        className="min-h-[320px] w-full overflow-hidden bg-transparent"
      />

      {status === "idle" || status === "loading" ? (
        <div className="mt-4 text-sm text-muted-foreground">
          Carregando artigos da Academia CerneOps...
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-4 text-sm text-muted-foreground">
          Não foi possível carregar os artigos agora. Atualize a página em
          instantes.
        </div>
      ) : null}
    </div>
  );
}
