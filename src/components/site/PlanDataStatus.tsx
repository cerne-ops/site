import type { Locale } from "@/lib/i18n";

export function PlanDataStatus({
  status,
  locale,
  retry,
}: {
  status: "loading" | "ready" | "error";
  locale: Locale;
  retry: () => void;
}) {
  if (status === "ready") return null;
  const en = locale === "en-US";
  return (
    <div
      data-i18n-frozen="true"
      role="status"
      className="mb-6 text-sm text-muted-foreground"
    >
      {status === "loading"
        ? en
          ? "Loading plan prices and limits…"
          : "Carregando preços e limites dos planos…"
        : en
          ? "Plan prices and limits are temporarily unavailable."
          : "Preços e limites dos planos temporariamente indisponíveis."}
      {status === "error" ? (
        <button
          type="button"
          onClick={retry}
          className="ml-3 text-ember underline underline-offset-4"
        >
          {en ? "Try again" : "Tentar novamente"}
        </button>
      ) : null}
    </div>
  );
}
