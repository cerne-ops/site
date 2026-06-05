type DataLayerEvent = Record<string, unknown> & {
  event: string;
};

type AgentAnalyticsPayload = {
  agentName: string;
  agentSlug: string;
  agentGroup: string;
};

type AgentCtaPayload = AgentAnalyticsPayload & {
  ctaLabel: string;
  ctaPosition: "hero" | "middle" | "footer";
};

type PlanAnalyticsPayload = {
  planName: string;
  planSlug: string;
  billingCycle?: string | null;
  value?: string | number | null;
};

type PurchaseAnalyticsPayload = {
  transactionId: string;
  value?: string | number | null;
  planName: string;
  planSlug: string;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

function getDataLayer() {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

function pushDataLayer(event: DataLayerEvent) {
  const dataLayer = getDataLayer();
  if (!dataLayer) return;

  try {
    dataLayer.push(event);
  } catch {
    // Analytics must never break the product experience.
  }
}

function getPagePath() {
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

function normalizeValue(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return undefined;
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;

  const normalized = value
    .trim()
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.-]/g, "");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function trackAgentPageView(payload: AgentAnalyticsPayload) {
  pushDataLayer({
    event: "agent_page_view",
    agent_name: payload.agentName,
    agent_slug: payload.agentSlug,
    agent_group: payload.agentGroup,
    page_path: getPagePath(),
  });
}

export function trackAgentCtaClicked(payload: AgentCtaPayload) {
  pushDataLayer({
    event: "agent_cta_clicked",
    agent_name: payload.agentName,
    agent_slug: payload.agentSlug,
    agent_group: payload.agentGroup,
    cta_label: payload.ctaLabel,
    cta_position: payload.ctaPosition,
  });
}

export function trackPricingViewed(pagePath = getPagePath()) {
  pushDataLayer({
    event: "pricing_viewed",
    page_path: pagePath,
  });
}

export function trackPlanSelected(payload: PlanAnalyticsPayload) {
  pushDataLayer({
    event: "plan_selected",
    plan_name: payload.planName,
    plan_slug: payload.planSlug,
    billing_cycle: payload.billingCycle || "monthly",
    value: normalizeValue(payload.value),
    currency: "BRL",
  });
}

export function trackCheckoutStarted(payload: PlanAnalyticsPayload) {
  pushDataLayer({
    event: "checkout_started",
    plan_name: payload.planName,
    plan_slug: payload.planSlug,
    value: normalizeValue(payload.value),
    currency: "BRL",
  });
}

export function trackSignUp(method = "email") {
  pushDataLayer({
    event: "sign_up",
    method,
  });
}

export function trackTrialStarted(payload: Pick<PlanAnalyticsPayload, "planName" | "planSlug">) {
  pushDataLayer({
    event: "trial_started",
    plan_name: payload.planName,
    plan_slug: payload.planSlug,
  });
}

export function trackPurchase(payload: PurchaseAnalyticsPayload) {
  pushDataLayer({
    event: "purchase",
    transaction_id: payload.transactionId,
    value: normalizeValue(payload.value),
    currency: "BRL",
    plan_name: payload.planName,
    plan_slug: payload.planSlug,
  });
}
