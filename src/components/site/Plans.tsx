import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { fetchLandingPlans, formatPlanValue, planCatalog, type PlanDynamic } from "@/lib/plans";

type PlanView = (typeof planCatalog)[number] & { dynamic: PlanDynamic };

export function Plans() {
  const [landingData, setLandingData] = useState<Array<Record<string, unknown>> | null>(null);

  const plans = useMemo<PlanView[]>(() => {
    return planCatalog.map((plan) => {
      const fromApi = landingData?.find((item) => {
        const slug = String(item.slug ?? item.id ?? "").toLowerCase();
        return slug === plan.id;
      });
      const dynamic: PlanDynamic = {
        price_monthly: fromApi?.price_monthly as string | number | null | undefined,
        max_users: fromApi?.max_users as string | number | null | undefined,
        tasks_day: fromApi?.tasks_day as string | number | null | undefined,
        tasks_month: fromApi?.tasks_month as string | number | null | undefined,
        uploads_day: fromApi?.uploads_day as string | number | null | undefined,
        upload_size: fromApi?.upload_size as string | number | null | undefined,
        retention_days: fromApi?.retention_days as string | number | null | undefined,
        support_level: fromApi?.support_level as string | null | undefined,
        priority: fromApi?.priority as string | null | undefined,
        short_description: fromApi?.short_description as string | null | undefined,
      };
      return { ...plan, dynamic };
    });
  }, [landingData]);

  useEffect(() => {
    let mounted = true;
    fetchLandingPlans().then((data) => {
      if (!mounted) return;
      setLandingData(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="planos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-ember mb-4">
            / Planos do Core
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            Escolha o tamanho
            <br />
            <span className="text-muted-foreground">da sua operação.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Você começa simples e evolui conforme sua operação cresce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-7 border transition-all hover:-translate-y-1 hover:shadow-ember ${
                plan.id === "dominus"
                  ? "border-ember/55 bg-surface-elevated ring-1 ring-ember/30"
                  : "border-border bg-surface/60 hover:border-ember/35"
              }`}
            >
              {plan.id === "dominus" ? (
                <div className="absolute -top-3 left-7 font-mono text-[10px] uppercase tracking-widest gradient-ember text-primary-foreground px-2 py-1 rounded">
                  Mais completo
                </div>
              ) : null}
              <div className="font-mono text-xs text-ember uppercase tracking-widest mb-2">
                {plan.label}
              </div>
              <div className="mb-2 flex justify-center">
                <img
                  src={plan.logo}
                  alt={`${plan.name} logo`}
                  className={`w-auto object-contain opacity-95 pointer-events-none ${
                    plan.id === "dominus"
                      ? "h-[55px]"
                      : plan.id === "scale"
                        ? "h-[51px]"
                        : plan.id === "boost"
                          ? "h-12"
                          : "h-11"
                  }`}
                />
              </div>
              <div className="font-mono text-xs text-foreground/70 mb-4">
                {formatPlanValue(plan.dynamic.price_monthly)}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {plan.dynamic.short_description || plan.teaser}
              </p>
              <ul className="space-y-2.5 text-sm mb-6">
                {plan.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-ember shrink-0" />
                    <span className="text-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/planos/$slug"
                params={{ slug: plan.id }}
                className="inline-flex items-center gap-1 text-sm text-ember font-medium"
              >
                Ver detalhes <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
