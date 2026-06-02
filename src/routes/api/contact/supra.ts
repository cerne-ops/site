import { createFileRoute } from "@tanstack/react-router";

const SUPRA_CONTACT_TO = "supra@cerneops.com.br";
const MAX_LENGTHS = {
  nome: 120,
  empresa: 140,
  email: 160,
  telefone: 60,
  origem: 80,
  mensagem: 2400,
} as const;

type ContactPayload = {
  nome?: unknown;
  empresa?: unknown;
  email?: unknown;
  telefone?: unknown;
  origem?: unknown;
  mensagem?: unknown;
};

type NormalizedContact = {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  origem: string;
  mensagem: string;
};

export const Route = createFileRoute("/api/contact/supra")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: ContactPayload;
        try {
          payload = (await request.json()) as ContactPayload;
        } catch {
          return jsonError("Payload JSON invalido.", 400);
        }

        const normalized = normalizePayload(payload);
        if ("error" in normalized) {
          return jsonError(normalized.error, 400);
        }

        const apiKey = String(process.env.RESEND_API_KEY || "").trim();
        const fromEmail = String(
          process.env.RESEND_FROM_EMAIL || process.env.RESEND_FROM || "",
        ).trim();

        if (!apiKey || !fromEmail) {
          console.warn("[site/contact/supra] Resend nao configurado");
          return jsonError("Envio de email nao configurado.", 503);
        }

        const subject = `Novo contato Supra - Site${normalized.origem ? ` (${normalized.origem})` : ""}`;
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "CerneOps-Site/1.0",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [SUPRA_CONTACT_TO],
            reply_to: normalized.email,
            subject,
            text: buildTextEmail(normalized),
            html: buildHtmlEmail(normalized),
          }),
        });

        if (!response.ok) {
          console.warn("[site/contact/supra] Resend falhou", {
            status: response.status,
          });
          return jsonError("Falha ao enviar email.", 502);
        }

        return Response.json({ ok: true, message: "Mensagem enviada." });
      },
    },
  },
});

function normalizePayload(
  payload: ContactPayload,
): NormalizedContact | { error: string } {
  const nome = readField(payload.nome, MAX_LENGTHS.nome);
  const empresa = readField(payload.empresa, MAX_LENGTHS.empresa);
  const email = readField(payload.email, MAX_LENGTHS.email).toLowerCase();
  const telefone = readField(payload.telefone, MAX_LENGTHS.telefone);
  const origem = readField(payload.origem, MAX_LENGTHS.origem);
  const mensagem = readField(payload.mensagem, MAX_LENGTHS.mensagem);

  if (!nome || !empresa || !email || !mensagem) {
    return { error: "Nome, empresa, email e mensagem sao obrigatorios." };
  }

  if (!isValidEmail(email)) {
    return { error: "Email invalido." };
  }

  if (mensagem.length < 10) {
    return { error: "Mensagem muito curta." };
  }

  return { nome, empresa, email, telefone, origem, mensagem };
}

function readField(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonError(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

function buildTextEmail(data: NormalizedContact) {
  return [
    "Novo contato Supra - Site",
    "",
    `Nome: ${data.nome}`,
    `Empresa: ${data.empresa}`,
    `Email: ${data.email}`,
    `Telefone: ${data.telefone || "Nao informado"}`,
    `Origem: ${data.origem || "site"}`,
    "",
    "Mensagem:",
    data.mensagem,
  ].join("\n");
}

function buildHtmlEmail(data: NormalizedContact) {
  return `
    <h2>Novo contato Supra - Site</h2>
    <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><strong>Nome</strong></td><td>${escapeHtml(data.nome)}</td></tr>
      <tr><td><strong>Empresa</strong></td><td>${escapeHtml(data.empresa)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Telefone</strong></td><td>${escapeHtml(data.telefone || "Nao informado")}</td></tr>
      <tr><td><strong>Origem</strong></td><td>${escapeHtml(data.origem || "site")}</td></tr>
    </table>
    <h3>Mensagem</h3>
    <p>${escapeHtml(data.mensagem).replace(/\n/g, "<br />")}</p>
  `;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
