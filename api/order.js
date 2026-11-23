// GET /api/order?payment_id=123  →  situação do pagamento e, se aprovado, links de download
import { downloadLinks, guidesFromReference, mercadoPago, query, sendJson } from "./_lib/shared.js";

export default async function handler(req, res) {
  const paymentId = query(req).get("payment_id");
  if (!paymentId || !/^\d+$/.test(paymentId)) return sendJson(res, 400, { error: "Pagamento não informado." });

  try {
    // Sempre consulta o Mercado Pago: o status que vem na URL de retorno não é confiável.
    const payment = await mercadoPago(`/v1/payments/${paymentId}`);
    const guides = guidesFromReference(payment.external_reference);
    const approved = payment.status === "approved";
    return sendJson(res, 200, {
      status: payment.status,
      guides: guides.map((guide) => ({ id: guide.id, title: guide.title })),
      downloads: approved ? downloadLinks(req, payment.id, guides) : [],
      email: approved ? payment.payer?.email || "" : "",
    });
  } catch (error) {
    return sendJson(res, error.status || 400, { error: error.message });
  }
}
