// POST /api/checkout  { guides: ["temperos", ...] }  ou  { plan: 0, package: 2 }  →  { url } da página de pagamento do Mercado Pago
import { isTestToken, mercadoPago, priceGuides, pricePlan, readJson, sendJson, siteUrl } from "./_lib/shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Use POST." });

  try {
    const body = await readJson(req);
    const base = siteUrl(req);
    let item;
    let reference;
    let total;

    if (body.plan !== undefined) {
      // Pacote de consultas: valor total do pacote.
      const chosen = pricePlan(body.plan, body.package);
      total = chosen.total;
      reference = `plano:${Number(body.plan)}:${Number(body.package)}`;
      item = {
        id: reference,
        title: `${chosen.plan.title} · ${chosen.label}`,
        description: `Nutricionista Anderson Oliveira · ${chosen.plan.label} · ${chosen.plan.detail}`.slice(0, 250),
      };
    } else {
      const { guides, total: guidesTotal } = priceGuides(body.guides);
      total = guidesTotal;
      reference = `guias:${guides.map((guide) => guide.id).join(",")}`;
      item = {
        id: guides.map((guide) => guide.id).join(","),
        title: guides.length === 1 ? guides[0].title : `${guides.length} guias Nutrition's Life`,
        description: guides.map((guide) => guide.title).join(", ").slice(0, 250),
      };
    }

    const preference = await mercadoPago("/checkout/preferences", {
      method: "POST",
      body: JSON.stringify({
        items: [{ ...item, quantity: 1, currency_id: "BRL", unit_price: total }],
        external_reference: reference,
        back_urls: {
          success: `${base}/?pagamento=aprovado`,
          pending: `${base}/?pagamento=pendente`,
          failure: `${base}/?pagamento=falhou`,
        },
        // O Mercado Pago só aceita retorno automático para endereços https (no localhost o comprador volta pelo botão).
        auto_return: base.startsWith("https://") ? "approved" : undefined,
        notification_url: base.startsWith("https://") ? `${base}/api/webhook` : undefined,
        statement_descriptor: "NUTRITIONSLIFE",
        payment_methods: { installments: 12 },
      }),
    });

    // Credenciais de conta de teste (painel novo) usam o checkout normal; o endereço "sandbox" só com tokens antigos TEST-.
    const url = isTestToken() && process.env.MP_ACCESS_TOKEN?.startsWith("TEST-") ? preference.sandbox_init_point || preference.init_point : preference.init_point;
    return sendJson(res, 200, { url, total });
  } catch (error) {
    return sendJson(res, error.status || 400, { error: error.message });
  }
}
