import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SupraContactModalProvider } from "@/components/site/SupraContactModal";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Cerne",
  url: "https://cerneops.com.br",
  logo: "https://cerneops.com.br/logo.png",
  description:
    "Consultoria e plataforma de inteligência operacional com automação, integração de sistemas e agentes inteligentes para empresas.",
  sameAs: [],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Cerne | Integração Inteligente de Operações" },
      {
        name: "description",
        content:
          "Transforme processos manuais em uma operação inteligente com automação, integração e agentes que executam tarefas por você.",
      },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Cerne" },
      { name: "theme-color", content: "#0E0F12" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://cerneops.com.br" },
      { property: "og:title", content: "Integração inteligente de operações" },
      {
        property: "og:description",
        content:
          "Automatize, organize e escale sua operação com agentes inteligentes. Mais performance, menos retrabalho.",
      },
      { property: "og:image", content: "https://cerneops.com.br/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:site_name", content: "Cerne" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Integração inteligente de operações" },
      {
        name: "twitter:description",
        content:
          "Sistema operacional de agentes para empresas. Automatize e escale sua operação.",
      },
      { name: "twitter:image", content: "https://cerneops.com.br/og-image.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "canonical", href: "https://cerneops.com.br" },
      { rel: "icon", href: "https://cerneops.com.br/favicon.ico" },
      { rel: "apple-touch-icon", href: "https://cerneops.com.br/logo.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <SupraContactModalProvider>
      <Outlet />
    </SupraContactModalProvider>
  );
}
