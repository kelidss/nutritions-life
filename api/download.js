// GET /api/download?t=TOKEN  →  entrega o PDF sem revelar onde ele está guardado
import { guideFileUrl, guidesFromReference, mercadoPago, query, readDownloadToken, sendJson } from "./_lib/shared.js";

export default async function handler(req, res) {
  try {
    const data = readDownloadToken(query(req).get("t"));
    if (!data) return sendJson(res, 403, { error: "Link inválido ou expirado. Fale com o Anderson pelo WhatsApp." });

    // Confere de novo se o pagamento continua aprovado (ex.: estornos).
    const payment = await mercadoPago(`/v1/payments/${data.paymentId}`);
    const owned = guidesFromReference(payment.external_reference).some((guide) => guide.id === data.guideId);
    if (payment.status !== "approved" || !owned) return sendJson(res, 403, { error: "Pagamento não aprovado para este guia." });

    const source = guideFileUrl(data.guideId);
    if (!source) return sendJson(res, 503, { error: "Arquivo ainda não configurado." });

    const file = await fetch(source);
    if (!file.ok) return sendJson(res, 502, { error: "Não foi possível buscar o arquivo." });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${data.guideId}.pdf"`);
    res.setHeader("Cache-Control", "private, no-store");
    res.end(Buffer.from(await file.arrayBuffer()));
  } catch (error) {
    return sendJson(res, error.status || 400, { error: error.message });
  }
}
