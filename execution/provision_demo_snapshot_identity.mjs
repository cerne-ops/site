#!/usr/bin/env node
/**
 * Creates the synthetic Core identity used solely to generate public Demo
 * snapshots. This is an operational script: it never prints credentials,
 * operates on one explicit company, and validates the full Auth -> profile ->
 * agent-team chain before returning success.
 *
 * Required environment variables (provided only by the trusted Core runtime):
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   DEMO_COMPANY_KEY
 *   DEMO_IDENTITY_EMAIL
 *   DEMO_IDENTITY_PASSWORD
 *
 * Optional:
 *   DEMO_IDENTITY_NAME (default: Demo Snapshot Runner)
 */

import { createClient } from "@supabase/supabase-js";

const required = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "DEMO_COMPANY_KEY",
  "DEMO_IDENTITY_EMAIL",
  "DEMO_IDENTITY_PASSWORD",
];

for (const key of required) {
  if (!process.env[key]?.trim()) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

const companyKey = process.env.DEMO_COMPANY_KEY.trim();
const email = process.env.DEMO_IDENTITY_EMAIL.trim().toLowerCase();
const password = process.env.DEMO_IDENTITY_PASSWORD;
const name = process.env.DEMO_IDENTITY_NAME?.trim() || "Demo Snapshot Runner";

if (!companyKey.startsWith("codex-lote12-smoke-")) {
  throw new Error("Refusing to provision an identity outside the dedicated demo company.");
}
if (!email.endsWith("@example.invalid")) {
  throw new Error("Refusing a non-synthetic email address.");
}
if (password.length < 24) {
  throw new Error("The synthetic identity password must have at least 24 characters.");
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data: existingProfiles, error: existingProfilesError } = await supabase
  .from("profiles")
  .select("id, company_key, role, blocked")
  .eq("company_key", companyKey);
if (existingProfilesError) throw existingProfilesError;
if ((existingProfiles || []).length > 0) {
  throw new Error("Refusing to create: the dedicated demo company already has a profile.");
}

const { data: team, error: teamError } = await supabase
  .from("company_agent_selections")
  .select("agent_code")
  .eq("company_key", companyKey)
  .eq("is_contracted", true);
if (teamError) throw teamError;
if ((team || []).length !== 68) {
  throw new Error(`Refusing to create: expected 68 selected agents, found ${(team || []).length}.`);
}

const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
  user_metadata: { nome: name, cargo: "Demo snapshot runner", company_key: companyKey },
  app_metadata: { provisioned_for: "site_demo_golden_snapshots" },
});
if (createError) throw createError;
if (!created.user?.id) throw new Error("Auth user creation returned no user id.");

const userId = created.user.id;
const { error: profileError } = await supabase.from("profiles").upsert({
  id: userId,
  company_key: companyKey,
  nome: name,
  cargo: "Demo snapshot runner",
  role: "admin",
  permissions: ["dashboard", "agentes-ia", "tarefas"],
  blocked: false,
});
if (profileError) throw profileError;

const { data: profile, error: profileReadError } = await supabase
  .from("profiles")
  .select("id, company_key, role, blocked")
  .eq("id", userId)
  .single();
if (profileReadError) throw profileReadError;
if (profile.company_key !== companyKey || profile.role !== "admin" || profile.blocked) {
  throw new Error("Profile verification failed after provisioning.");
}

console.log(JSON.stringify({
  status: "ok",
  companyKey,
  userId,
  selectedAgents: team.length,
  emailConfirmed: Boolean(created.user.email_confirmed_at),
}));
