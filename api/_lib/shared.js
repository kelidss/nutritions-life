// Utilitários compartilhados pelas funções de servidor (Vercel /api e servidor local do Vite).
import crypto from "node:crypto";
import { guides, guidesTotal } from "../../src/data/content.js";

const MP_API = "https://api.mercadopago.com";

export function env(name, fallback = "") {
  return process.env[name] ?? fallback;
}

export function siteUrl(req) {
  const configured = env("SITE_URL").replace(/\/$/, "");
  if (configured) return configured;
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || (String(host).startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

export async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

export function query(req) {
  return new URL(req.url, "http://local").searchParams;
}

/** Valida a lista de guias e calcula o preço no servidor (o valor enviado pelo navegador é ignorado). */
export function priceGuides(ids) {
  if (!Array.isArray(ids)) throw new Error("Lista de guias inválida.");
  const unique = [...new Set(ids)];
  const chosen = unique.map((id) => guides.find((guide) => guide.id === id));
  if (!chosen.length || chosen.some((guide) => !guide)) throw new Error("Guia não encontrado.");
  return { guides: chosen, total: guidesTotal(chosen.length) };
}

export function guidesFromReference(reference) {
  return String(reference || "")
    .replace(/^guias:/, "")
    .split(",")
    .map((id) => guides.find((guide) => guide.id === id))
    .filter(Boolean);
}

export async function mercadoPago(path, options = {}) {
  const token = env("MP_ACCESS_TOKEN");
  if (!token) {
    const error = new Error("Pagamento online ainda não configurado (MP_ACCESS_TOKEN ausente).");
    error.status = 503;
    throw error;
  }
  const response = await fetch(`${MP_API}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `Mercado Pago respondeu ${response.status}.`);
    error.status = 502;
    throw error;
  }
  return data;
}

export function isTestToken() {
  return env("MP_ACCESS_TOKEN").startsWith("TEST-");
}

// ------------------------------------------------------------------ links de download assinados
const DAY = 24 * 60 * 60 * 1000;

function secret() {
  const value = env("DOWNLOAD_SECRET");
  if (!value) {
    const error = new Error("DOWNLOAD_SECRET ausente.");
    error.status = 503;
    throw error;
  }
  return value;
}

function sign(payload) {
  return crypto.createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Token que libera um guia de um pagamento por alguns dias. */
export function downloadToken(paymentId, guideId, days = Number(env("DOWNLOAD_DAYS", "7"))) {
  const payload = `${paymentId}.${guideId}.${Date.now() + days * DAY}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

export function readDownloadToken(token) {
  const [encoded, signature] = String(token || "").split(".");
  if (!encoded || !signature) return null;
  const payload = Buffer.from(encoded, "base64url").toString("utf8");
  const expected = sign(payload);
  if (expected.length !== signature.length || !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
  const [paymentId, guideId, expires] = payload.split(".");
  if (Date.now() > Number(expires)) return null;
  return { paymentId, guideId };
}

export function downloadLinks(req, paymentId, list) {
  const base = siteUrl(req);
  return list.map((guide) => ({ id: guide.id, title: guide.title, url: `${base}/api/download?t=${downloadToken(paymentId, guide.id)}` }));
}

/** Onde cada PDF está guardado. GUIDE_FILES é um JSON { "id-do-guia": "https://endereco-privado/arquivo.pdf" }. */
export function guideFileUrl(guideId) {
  const map = JSON.parse(env("GUIDE_FILES", "{}"));
  return map[guideId] || "";
}

// ------------------------------------------------------------------ e-mail (opcional, via Resend)
export async function sendDownloadEmail({ to, name, links }) {
  const key = env("RESEND_API_KEY");
  if (!key || !to) return false;
  const items = links.map((link) => `<li style="margin:8px 0"><a href="${link.url}">${link.title}</a></li>`).join("");
  const days = env("DOWNLOAD_DAYS", "7");
  const html = `<div style="font-family:Arial,sans-serif;color:#1b332d;max-width:520px">
    <h2 style="font-weight:normal">Obrigado pela compra${name ? `, ${name}` : ""}!</h2>
    <p>Seus guias da Nutrition's Life já estão liberados. Os links valem por ${days} dias:</p>
    <ul>${items}</ul>
    <p>Qualquer dúvida, é só responder no WhatsApp.<br>Anderson Oliveira · Nutricionista · CRN 14913</p>
  </div>`;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: env("EMAIL_FROM", "Nutrition's Life <guias@nutritionslife.com.br>"), to, subject: "Seus guias da Nutrition's Life", html }),
  });
  return response.ok;
}
