// POST /api/webhook  ←  aviso do Mercado Pago quando um pagamento muda de situação
import crypto from "node:crypto";
import { downloadLinks, env, guidesFromReference, mercadoPago, query, readJson, sendDownloadEmail, sendJson } from "./_lib/shared.js";

/** Confere a assinatura x-signature do Mercado Pago, quando MP_WEBHOOK_SECRET estiver configurado. */
function validSignature(req, dataId) {
  const secret = env("MP_WEBHOOK_SECRET");
  if (!secret) return true;
  const header = String(req.headers["x-signature"] || "");
  const parts = Object.fromEntries(header.split(",").map((part) => part.trim().split("=")));
  const manifest = `id:${dataId};request-id:${req.headers["x-request-id"] || ""};ts:${parts.ts};`;
  const expected = crypto.createHmac("sha256", secret).update(manifest).digest("hex");
  return Boolean(parts.v1) && expected.length === parts.v1.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts.v1));
}

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Use POST." });

  try {
    const body = await readJson(req).catch(() => ({}));
    const params = query(req);
    const type = body.type || params.get("type") || params.get("topic");
    const paymentId = String(body.data?.id || params.get("data.id") || params.get("id") || "");
    if (type !== "payment" || !/^\d+$/.test(paymentId)) return sendJson(res, 200, { ignored: true });
    if (!validSignature(req, paymentId)) return sendJson(res, 401, { error: "Assinatura inválida." });

    const payment = await mercadoPago(`/v1/payments/${paymentId}`);
    if (payment.status === "approved") {
      const guides = guidesFromReference(payment.external_reference);
      if (guides.length) {
        await sendDownloadEmail({
          to: payment.payer?.email,
          name: payment.payer?.first_name,
          links: downloadLinks(req, payment.id, guides),
        });
      }
    }
    return sendJson(res, 200, { received: true });
  } catch (error) {
    // Responder 200 evita reenvios infinitos; o erro fica no log da hospedagem.
    console.error("webhook", error);
    return sendJson(res, 200, { received: true, error: error.message });
  }
}
