type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsPayload = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Array<AnalyticsPayload & { event?: string }>;
  }
}

export function getGtmId() {
  return (
    import.meta.env.NEXT_PUBLIC_GTM_ID ||
    import.meta.env.VITE_GTM_ID ||
    ""
  ).trim();
}

export function getPagePath() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`;
}

export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function trackAgentPageView(params: {
  agent_name: string;
  agent_slug: string;
  agent_group?: string;
}) {
  trackEvent("agent_page_view", {
    ...params,
    page_path: getPagePath(),
  });
}

export function trackAgentCtaClicked(params: {
  agent_name: string;
  agent_slug: string;
  cta_label: string;
  cta_position: "hero" | "middle" | "footer";
}) {
  trackEvent("agent_cta_clicked", params);
}

export function trackAgentCatalogClicked(sourceAgentSlug?: string) {
  trackEvent("agent_catalog_clicked", {
    source_agent_slug: sourceAgentSlug,
    page_path: getPagePath(),
  });
}

export function trackPricingViewed(params: {
  plan_count: number;
  plan_slugs: string;
}) {
  trackEvent("pricing_viewed", {
    ...params,
    page_path: getPagePath(),
  });
}

export function trackPlanSelected(params: {
  plan_slug: string;
  plan_name: string;
  plan_price_monthly?: string | number | null;
  source: string;
}) {
  trackEvent("plan_selected", {
    ...params,
    page_path: getPagePath(),
  });
}

export function trackCheckoutStarted(params: {
  plan_slug: string;
  plan_name: string;
  plan_price_monthly?: string | number | null;
  checkout_type: "trial" | "paid";
}) {
  trackEvent("checkout_started", {
    ...params,
    page_path: getPagePath(),
  });
}
