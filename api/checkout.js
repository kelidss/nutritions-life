// POST /api/checkout  { guides: ["temperos", ...] }  →  { url } da página de pagamento do Mercado Pago
import { isTestToken, mercadoPago, priceGuides, readJson, sendJson, siteUrl } from "./_lib/shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Use POST." });

  try {
    const body = await readJson(req);
    const { guides, total } = priceGuides(body.guides);
    const base = siteUrl(req);
    const titles = guides.map((guide) => guide.title).join(", ");

    const preference = await mercadoPago("/checkout/preferences", {
      method: "POST",
      body: JSON.stringify({
        items: [{
          id: guides.map((guide) => guide.id).join(","),
          title: guides.length === 1 ? guides[0].title : `${guides.length} guias Nutrition's Life`,
          description: titles.slice(0, 250),
          quantity: 1,
          currency_id: "BRL",
          unit_price: total,
        }],
        external_reference: `guias:${guides.map((guide) => guide.id).join(",")}`,
        back_urls: {
          success: `${base}/?pagamento=aprovado`,
          pending: `${base}/?pagamento=pendente`,
          failure: `${base}/?pagamento=falhou`,
        },
        auto_return: "approved",
        notification_url: base.startsWith("https://") ? `${base}/api/webhook` : undefined,
        statement_descriptor: "NUTRITIONSLIFE",
        payment_methods: { installments: 12 },
      }),
    });

    const url = isTestToken() ? preference.sandbox_init_point || preference.init_point : preference.init_point;
    return sendJson(res, 200, { url, total });
  } catch (error) {
    return sendJson(res, error.status || 400, { error: error.message });
  }
}
