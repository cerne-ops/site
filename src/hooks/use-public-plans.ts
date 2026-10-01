import { useEffect, useState } from "react";
import { fetchLandingPlans, fetchPlanBySlug } from "@/lib/plans";

type PlanData = Array<Record<string, unknown>>;
type RequestState = {
  key: string;
  attempt: number;
  data: PlanData | null;
  status: "loading" | "ready" | "error";
};

export function usePublicPlans(slug?: string) {
  const key = slug ?? "landing";
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<RequestState | null>(null);

  useEffect(() => {
    let active = true;
    const request = slug
      ? fetchPlanBySlug(slug).then((plan) => (plan ? [plan] : null))
      : fetchLandingPlans();
    request.then((data) => {
      if (!active) return;
      setResult({
        key,
        attempt,
        data,
        status: data?.length ? "ready" : "error",
      });
    });
    return () => {
      active = false;
    };
  }, [slug, key, attempt]);

  // Never show the preceding plan's data during navigation or a retry.
  const current =
    result?.key === key && result.attempt === attempt ? result : null;
  return {
    data: current?.data ?? null,
    status: current?.status ?? "loading",
    retry: () => setAttempt((value) => value + 1),
  };
}
